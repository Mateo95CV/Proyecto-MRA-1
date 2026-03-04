import { poolPromise, sql } from "../db.js";

export async function agregarProducto(req, res) {
  try {
    const { productoId, cantidad } = req.body;
    const usuarioId = req.usuario.id;
    const pool = await poolPromise;

    // lógica SQL aquí

    res.json({ mensaje: "Producto agregado" });

  } catch (error) {
    res.status(500).json({ mensaje: "Error interno" });
  }
}


export async function obtenerOCrearCarrito(usuarioId) {
  const pool = await poolPromise;

  let result = await pool.request()
    .input("usuarioId", sql.Int, usuarioId)
    .query(`
      SELECT * FROM carrito 
      WHERE usuario_id = @usuarioId AND estado = 'Activo'
    `);

  if (result.recordset.length > 0) {
    return result.recordset[0].id;
  }

  const nuevo = await pool.request()
    .input("usuarioId", sql.Int, usuarioId)
    .query(`
      INSERT INTO carrito (usuario_id)
      OUTPUT INSERTED.id
      VALUES (@usuarioId)
    `);

  return nuevo.recordset[0].id;
}
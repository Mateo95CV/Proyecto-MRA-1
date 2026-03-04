import express from "express";
import { verificarToken } from "../middlewares/auth.js";
import { obtenerOCrearCarrito, agregarProducto } from "../controllers/carritoController.js";
import { poolPromise, sql } from "../db.js";

const router = express.Router();

router.post("/agregar", verificarToken, agregarProducto);

router.post("/agregar", verificarToken, async (req, res) => {
  const { productoId, cantidad } = req.body;
  const usuarioId = req.usuario.id;

  const carritoId = await obtenerOCrearCarrito(usuarioId);
  const pool = await poolPromise;

  await pool.request()
    .input("carritoId", sql.Int, carritoId)
    .input("productoId", sql.Int, productoId)
    .input("cantidad", sql.Int, cantidad)
    .query(`
      INSERT INTO carrito_detalle (carrito_id, producto_id, cantidad)
      VALUES (@carritoId, @productoId, @cantidad)
    `);

  res.json({ mensaje: "Producto agregado" });
});

export default router;
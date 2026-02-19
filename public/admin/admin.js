const token = localStorage.getItem("token");
const rol = localStorage.getItem("rol");

if (!token || rol !== "Admin") {
  window.location.href = "/public/usuarios/login.html";
}

app.get("/api/admin/productos", auth, roles("Admin"), async (req, res) => {
  try {
    const result = await pool.request()
      .query("SELECT * FROM productos ORDER BY fecha_creacion DESC");

    res.json(result.recordset);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener productos" });
  }
});

// Pa crear productos
app.post("/api/admin/productos", auth, roles("Admin"), async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, marca, forma_rostro, estilo, imagen } = req.body;

    await pool.request()
      .input("nombre", nombre)
      .input("descripcion", descripcion)
      .input("precio", precio)
      .input("categoria", categoria)
      .input("marca", marca)
      .input("forma_rostro", forma_rostro)
      .input("estilo", estilo)
      .input("imagen", imagen)
      .query(`
        INSERT INTO productos 
        (nombre, descripcion, precio, categoria, marca, forma_rostro, estilo, imagen)
        VALUES (@nombre, @descripcion, @precio, @categoria, @marca, @forma_rostro, @estilo, @imagen)
      `);

    res.json({ mensaje: "Producto creado correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear producto" });
  }
});

// Pa editar productos
app.put("/api/admin/productos/:id", auth, roles("Admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio } = req.body;

    await pool.request()
      .input("id", id)
      .input("nombre", nombre)
      .input("descripcion", descripcion)
      .input("precio", precio)
      .query(`
        UPDATE productos
        SET nombre = @nombre,
            descripcion = @descripcion,
            precio = @precio
        WHERE id = @id
      `);

    res.json({ mensaje: "Producto actualizado" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar" });
  }
});

// Pa eliminar productos
app.delete("/api/admin/productos/:id", auth, roles("Admin"), async (req, res) => {
  try {
    const { id } = req.params;

    await pool.request()
      .input("id", id)
      .query(`
        UPDATE productos
        SET estado = 0
        WHERE id = @id
      `);

    res.json({ mensaje: "Producto desactivado" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar" });
  }
});

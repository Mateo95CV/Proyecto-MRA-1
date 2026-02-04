const express = require("express");
const router = express.Router();
const { sql, pool } = require("./db");

/* GET */
router.get("/", async (req, res) => {
  const p = await pool;
  const result = await p.request().query("SELECT * FROM usuarios");
  res.json(result.recordset);
});

/* POST */
router.post("/", async (req, res) => {
  const { nombre, email, rol, estado } = req.body;

  const p = await pool;
  await p.request()
    .input("nombre", sql.NVarChar, nombre)
    .input("email", sql.NVarChar, email)
    .input("rol", sql.NVarChar, rol)
    .input("estado", sql.NVarChar, estado)
    .query(`
      INSERT INTO usuarios (nombre, email, rol, estado)
      VALUES (@nombre, @email, @rol, @estado)
    `);

  res.sendStatus(201);
});

/* PUT */
router.put("/:id", async (req, res) => {
  const { nombre, email, rol, estado } = req.body;
  const { id } = req.params;

  const p = await pool;
  await p.request()
    .input("id", sql.Int, id)
    .input("nombre", sql.NVarChar, nombre)
    .input("email", sql.NVarChar, email)
    .input("rol", sql.NVarChar, rol)
    .input("estado", sql.NVarChar, estado)
    .query(`
      UPDATE usuarios
      SET nombre=@nombre, email=@email, rol=@rol, estado=@estado
      WHERE id=@id
    `);

  res.sendStatus(200);
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const p = await pool;
  await p.request()
    .input("id", sql.Int, id)
    .query("DELETE FROM usuarios WHERE id=@id");

  res.sendStatus(200);
});

module.exports = router;

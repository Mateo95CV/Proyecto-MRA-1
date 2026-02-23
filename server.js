const express = require("express");
const cors = require("cors");
const { poolPromise } = require("./backend/db");

const app = express();
app.use(cors());
app.use(express.json());

const usuariosRoutes = require("./backend/usuarios.routes");
app.use("/api/usuarios", usuariosRoutes);

app.get("/", (req, res) => {
  res.send("API MRA funcionando correctamente");
});

const authRoutes = require("./backend/auth.routes");
app.use("/api", authRoutes);

app.get("/api/productos", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM productos");
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener productos" });
  }
});

app.listen(3000, () =>
  console.log("🚀 API corriendo en http://localhost:3000")
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server on port ${port}`);
});

module.exports = app;
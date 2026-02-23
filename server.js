const express = require("express");
const cors = require("cors");
// const { poolPromise } = require("./db");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Este es pa cargar los archivos estaticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
});

const usuariosRoutes = require("./usuarios.routes");
app.use("/api/usuarios", usuariosRoutes);

app.get("/", (req, res) => {
  res.send("API MRA funcionando correctamente");
});

// app.use('/api/auth', require('./auth.routes'));
// app.use('/api/usuarios', require('./usuarios.routes'));

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

const port = process.env.PORT || 3000;

console.log(`Server en el puerto http://localhost:${port}`);

module.exports = app;
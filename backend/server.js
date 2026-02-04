const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const usuariosRoutes = require("./usuarios.routes");
app.use("/api/usuarios", usuariosRoutes);

app.listen(3000, () =>
  console.log("🚀 API corriendo en http://localhost:3000")
);

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const usuariosRoutes = require("./usuarios.routes");
app.use("/api/usuarios", usuariosRoutes);

app.get("/", (req, res) => {
  res.send("API MRA funcionando correctamente");
});

app.listen(3000, () =>
  console.log("🚀 API corriendo en http://localhost:3000")
);

const authRoutes = require("./auth.routes");
app.use("/api", authRoutes);

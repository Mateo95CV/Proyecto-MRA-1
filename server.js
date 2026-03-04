import express from 'express';
import cors from 'cors';
import { poolPromise } from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './auth.routes.js';
import usuariosRoutes from './usuarios.routes.js';
import carritoRoutes from "./routes/carritoRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path. dirname(__filename);

// Este es pa cargar los archivos estaticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/pages/:name', (req, res) => {
  const pageName = req.params.name;
  res.sendFile(path.join(__dirname, 'public', 'pages', `${pageName}.html`));
});

// Apis
app.use("/api/carrito", carritoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);

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

app.listen(port, () => {
  console.log(`Server en el puerto http://localhost:${port}`);
});

export default app;
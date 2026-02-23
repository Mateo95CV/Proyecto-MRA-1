import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { poolPromise, sql } from './db.js';

import auth from './middlewares/auth.js';
import roles from './middlewares/roles.js';


const SECRET = "mra_secret_key"; // luego se mueve a .env

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const pool = await poolPromise;
  const result = await pool.request()
    .input("email", sql.NVarChar, email)
    .query("SELECT * FROM usuarios WHERE email=@email AND estado='Activo'");

  const user = result.recordset[0];
  if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign(
    { id: user.id, rol: user.rol },
    SECRET,
    { expiresIn: "8h" }
  );

  res.json({
    token,
    rol: user.rol,
    nombre: user.nombre
  });
});

export default router;
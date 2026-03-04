import bcrypt from 'bcryptjs';
import { poolPromise, sql } from './db.js';

(async () => {
  const pool = await poolPromise;

  const hash = await bcrypt.hash("Mateo", 10);

  await pool.request()
    .input("nombre", sql.NVarChar, "Mateo Castaño")
    .input("email", sql.NVarChar, "mateo@mra.com")
    .input("password", sql.NVarChar, hash)
    .input("rol", sql.NVarChar, "Usuario")
    .input("estado", sql.NVarChar, "Activo")
    .query(`
      INSERT INTO usuarios (nombre, email, password, rol, estado)
      VALUES (@nombre, @email, @password, @rol, @estado)
    `);

  console.log("✔ Usuario creado");
  process.exit();
})();
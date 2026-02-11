const bcrypt = require("bcryptjs");
const { poolPromise, sql } = require("./db");

(async () => {
  const pool = await poolPromise;

  const hash = await bcrypt.hash("admin123", 10);

  await pool.request()
    .input("nombre", sql.NVarChar, "Administrador")
    .input("email", sql.NVarChar, "admin@mra.com")
    .input("password", sql.NVarChar, hash)
    .input("rol", sql.NVarChar, "Admin")
    .input("estado", sql.NVarChar, "Activo")
    .query(`
      INSERT INTO usuarios (nombre, email, password, rol, estado)
      VALUES (@nombre, @email, @password, @rol, @estado)
    `);

  console.log("✔ Admin creado");
  process.exit();
})();

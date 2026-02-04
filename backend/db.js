const sql = require("mssql");

const config = {
  user: "TU_USUARIO_SQL",
  password: "TU_PASSWORD",
  server: "localhost",
  database: "MRA_DB",
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

const pool = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("✔ Conectado a SQL Server");
    return pool;
  })
  .catch(err => console.error("❌ Error SQL:", err));

module.exports = { sql, pool };

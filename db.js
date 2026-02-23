const sql = require("mssql");

const config = {
  user: process.env.DB_USER || "mra_user",
  password: process.env.DB_PASSWORD || "TuClaveSegura123",
  server: process.env.DB_SERVER || "localhost",
  database: process.env.DB_NAME || "MRA_DB",
  port: process.env.DB_PORT || 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("✔ Conectado a SQL Server");
    return pool;
  })
  .catch(err => {
    console.error("❌ Error SQL:", err);
    throw err;
  });

module.exports = {
  sql,
  poolPromise
};

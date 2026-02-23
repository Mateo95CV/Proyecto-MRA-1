const sql = require("mssql");

const config = {
  user: "mra_user",
  password: "TuClaveSegura123",
  server: "localhost",
  database: "MRA_DB",
  port: 1433,
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

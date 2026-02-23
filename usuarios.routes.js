const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("./db");

/* GET */
router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM usuarios");
    res.json(result.recordset);
  } catch (err) {
    console.error("🔥 ERROR SQL:", err);
    res.status(500).send("Error SQL");
  }
});

module.exports = router;

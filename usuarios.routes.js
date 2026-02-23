import express from 'express';
const router = express.Router();
import { sql, poolPromise } from './db.js';

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
export default router;

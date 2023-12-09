const express = require("express");
const { pool } = require("../db/db.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT $1::text as message", [
      "Hello, PostgreSQL",
    ]);
    const message = result.rows[0].message;
    client.release();
    res.json({ message });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

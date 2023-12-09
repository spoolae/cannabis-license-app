const express = require("express");
const { pool, createTables } = require("../db/db.js");

const router = express.Router();

router.post("/create-tables", async (req, res) => {
  try {
    await createTables();
    res.json({ message: "Tables created successfully" });
  } catch (error) {
    console.error("Error creating tables", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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

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

router.post("/add-medications", async (req, res) => {
  try {
    const { medications } = req.body;

    if (!medications || !Array.isArray(medications)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      for (const medication of medications) {
        const { name, image_url, vendor_code } = medication;

        await client.query(
          `
            INSERT INTO medications (name, image_url, vendor_code) 
            VALUES ($1, $2, $3)
          `,
          [name, image_url, vendor_code]
        );
      }

      await client.query("COMMIT");

      res.json({ message: "Medications added successfully" });
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error adding medications", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error parsing request body", error);
    res.status(400).json({ error: "Bad Request" });
  }
});

module.exports = router;

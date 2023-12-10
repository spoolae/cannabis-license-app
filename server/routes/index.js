const express = require("express");
const bcrypt = require("bcrypt");
const { pool, createTables } = require("../models");

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

router.post("/create-user", async (req, res) => {
  try {
    const {
      role,
      first_name,
      last_name,
      father_name,
      gender,
      phone_number,
      email,
      password,
    } = req.body;

    if (
      !role ||
      !first_name ||
      !last_name ||
      !father_name ||
      !gender ||
      !phone_number ||
      !email ||
      !password
    ) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Хэшируем пароль

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Вставляем данные в таблицу users
      const result = await client.query(
        `
          INSERT INTO users (role, first_name, last_name, father_name, gender, phone_number, email, password)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING user_id;
        `,
        [
          role,
          first_name,
          last_name,
          father_name,
          gender,
          phone_number,
          email,
          hashedPassword,
        ]
      );

      const userId = result.rows[0].user_id;

      // Вставляем данные в зависимую таблицу (например, medics или patients) в зависимости от роли
      if (role === "medic") {
        // Вставляем данные в таблицу medics
        await client.query(
          `
            INSERT INTO medics (user_id, position)
            VALUES ($1, $2)
          `,
          [userId, req.body.position]
        );
      } else if (role === "patient") {
        // Вставляем данные в таблицу patients
        await client.query(
          `
            INSERT INTO patients (user_id, license_number, health_description)
            VALUES ($1, $2, $3)
          `,
          [userId, req.body.license_number, req.body.health_description]
        );
      }

      await client.query("COMMIT");

      res.json({ message: "User created successfully" });
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error creating user", error);
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

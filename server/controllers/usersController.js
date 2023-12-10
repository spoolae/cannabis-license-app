const express = require("express");
const bcrypt = require("bcrypt");
const { pool } = require("../models");

const router = express.Router();

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

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

      if (role === "medic") {
        await client.query(
          `
            INSERT INTO medics (user_id, position)
            VALUES ($1, $2)
          `,
          [userId, req.body.position]
        );
      } else if (role === "patient") {
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

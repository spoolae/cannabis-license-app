const express = require("express");
const bcrypt = require("bcrypt");
const { pool } = require("../models");

const router = express.Router();

router.post("/create-user", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const result = await client.query(
        `
          INSERT INTO users (email, password)
          VALUES ($1, $2)
          RETURNING *; -- возвращаем все поля
        `,
        [email, hashedPassword]
      );

      const user = result.rows[0];

      const medicResult = await client.query(
        `
          INSERT INTO medics (user_id, position)
          VALUES ($1, $2)
          RETURNING *; -- возвращаем все поля
        `,
        [user.user_id, "Doctor"]
      );

      const medic = medicResult.rows[0];

      await client.query("COMMIT");

      res.json({ user, medic, message: "User created successfully" });
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

router.post("/authenticate", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const client = await pool.connect();

    try {
      const userResult = await client.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (userResult.rows.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = userResult.rows[0];

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      if (user.role === "medic") {
        const medicResult = await client.query(
          "SELECT * FROM medics WHERE user_id = $1",
          [user.user_id]
        );
        const medic = medicResult.rows[0];
        return res.json({ user, medic });
      } else if (user.role === "patient") {
        const patientResult = await client.query(
          "SELECT * FROM patients WHERE user_id = $1",
          [user.user_id]
        );
        const patient = patientResult.rows[0];
        return res.json({ user, patient });
      } else {
        return res.json({ user });
      }
    } catch (error) {
      console.error("Error authenticating user", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error parsing request body", error);
    res.status(400).json({ error: "Bad Request" });
  }
});

router.post("/update-profile", async (req, res) => {
  try {
    const { user_id, last_name, first_name, father_name, gender } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const updateUserResult = await client.query(
        `
          UPDATE users
          SET
            last_name = $2,
            first_name = $3,
            father_name = $4,
            gender = $5
          WHERE user_id = $1
          RETURNING *; -- возвращаем все поля
        `,
        [user_id, last_name, first_name, father_name, gender]
      );

      const updatedUser = updateUserResult.rows[0];

      await client.query("COMMIT");

      res.json({ user: updatedUser, message: "Profile updated successfully" });
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error updating profile", error);
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

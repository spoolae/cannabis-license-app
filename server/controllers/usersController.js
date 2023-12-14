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
          INSERT INTO patients (user_id, health_description) VALUES ($1, $2)
          `,
          [userId, req.body.health_description]
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

router.post("/authenticate", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const client = await pool.connect();

    try {
      // Находим пользователя по email
      const userResult = await client.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (userResult.rows.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = userResult.rows[0];

      // Сравниваем введенный пароль с хешированным паролем в базе данных
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Если пароль совпадает, возвращаем полную информацию о пользователе
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

module.exports = router;

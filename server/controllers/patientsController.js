const express = require("express");
const { pool } = require("../models");

const router = express.Router();

router.post("/add-patient", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      father_name,
      gender,
      phone_number,
      email,
      password,
      license_number,
      health_description,
    } = req.body;

    const existingUserQuery = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUserQuery.rows.length > 0) {
      res.status(409).json({ error: "User with this email already exists" });
    } else {
      const newUserQuery = await pool.query(
        "INSERT INTO users (role, first_name, last_name, father_name, gender, phone_number, email, password) VALUES ('patient', $1, $2, $3, $4, $5, $6, $7) RETURNING user_id",
        [
          first_name,
          last_name,
          father_name,
          gender,
          phone_number,
          email,
          password,
        ]
      );

      const userId = newUserQuery.rows[0].user_id;

      await pool.query(
        "INSERT INTO patients (user_id, license_number, health_description) VALUES ($1, $2, $3)",
        [userId, license_number, health_description]
      );

      res.status(201).json({ message: "Patient added successfully" });
    }
  } catch (error) {
    console.error("Error adding patient", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-patients", async (req, res) => {
  try {
    const allPatientsQuery = await pool.query(`
      SELECT
        users.*,
        patients.*,
        users.first_name AS patient_first_name,
        users.last_name AS patient_last_name,
        users.father_name AS patient_father_name
      FROM patients
      INNER JOIN users ON patients.user_id = users.user_id
    `);

    res.status(200).json(allPatientsQuery.rows);
  } catch (error) {
    console.error("Error getting patients", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete-patient/:user_id", async (req, res) => {
  const userId = req.params.user_id;

  try {
    const deletePatientQuery = await pool.query(
      "DELETE FROM patients WHERE user_id = $1",
      [userId]
    );

    if (deletePatientQuery.rowCount === 1) {
      await pool.query("DELETE FROM users WHERE user_id = $1", [userId]);

      res.status(200).json({ message: "Patient deleted successfully" });
    } else {
      res.status(404).json({ error: "Patient not found" });
    }
  } catch (error) {
    console.error("Error deleting patient", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const maxResults = req.query.maxResults || 3;

    const queryString = `
        SELECT users.*, patients.*
        FROM patients
        JOIN users ON patients.user_id = users.user_id
        WHERE CONCAT(users.first_name, ' ', users.last_name, ' ', users.father_name) ILIKE $1
        LIMIT $2;
    `;

    const result = await pool.query(queryString, [
      `%${searchTerm}%`,
      maxResults,
    ]);

    res.json(result.rows);
  } catch (error) {
    console.error("Error searching for patients", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

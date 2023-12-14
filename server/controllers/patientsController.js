const express = require("express");
const { pool } = require("../models");

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const maxResults = req.query.maxResults || 5;

    const queryString = `
        SELECT patients.*, users.first_name, users.last_name, users.father_name
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

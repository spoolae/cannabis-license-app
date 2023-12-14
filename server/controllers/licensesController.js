const express = require("express");
const { pool } = require("../models");

const router = express.Router();

router.post("/add-license", async (req, res) => {
  try {
    const { patient_id, issue_date, expiration_date } = req.body;

    const existingLicenseQuery = await pool.query(
      "SELECT * FROM licenses WHERE patient_id = $1",
      [patient_id]
    );

    if (existingLicenseQuery.rows.length > 0) {
      await pool.query(
        "UPDATE licenses SET issue_date = $1, expiration_date = $2 WHERE patient_id = $3",
        [issue_date, expiration_date, patient_id]
      );
      res.status(200).json({ message: "License updated successfully" });
    } else {
      await pool.query(
        "INSERT INTO licenses (patient_id, issue_date, expiration_date) VALUES ($1, $2, $3)",
        [patient_id, issue_date, expiration_date]
      );
      res.status(201).json({ message: "License added successfully" });
    }
  } catch (error) {
    console.error("Error adding license", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

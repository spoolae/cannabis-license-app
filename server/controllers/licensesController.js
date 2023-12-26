const express = require("express");
const { pool } = require("../models");

const router = express.Router();

router.post("/add-license", async (req, res) => {
  try {
    const { patient_id, issue_date, expiration_date, license_number } =
      req.body;

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
        "INSERT INTO licenses (patient_id, issue_date, expiration_date, license_number) VALUES ($1, $2, $3, $4)",
        [patient_id, issue_date, expiration_date, license_number]
      );
      res.status(201).json({ message: "License added successfully" });
    }
  } catch (error) {
    console.error("Error adding or updating license", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-licenses", async (req, res) => {
  try {
    const allLicensesQuery = await pool.query("SELECT * FROM licenses");
    res.status(200).json(allLicensesQuery.rows);
  } catch (error) {
    console.error("Error getting licenses", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete-license/:license_id", async (req, res) => {
  const licenseId = req.params.license_id;

  try {
    const deleteLicenseQuery = await pool.query(
      "DELETE FROM licenses WHERE license_id = $1",
      [licenseId]
    );

    if (deleteLicenseQuery.rowCount === 1) {
      res.status(200).json({ message: "License deleted successfully" });
    } else {
      res.status(404).json({ error: "License not found" });
    }
  } catch (error) {
    console.error("Error deleting license", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

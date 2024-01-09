const express = require("express");
const multer = require("multer");
const fs = require("fs").promises;
const { pool } = require("../models");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/add-medication", upload.single("image"), async (req, res) => {
  try {
    const { name, vendor_code } = req.body;

    const existingMedicationQuery = await pool.query(
      "SELECT * FROM medications WHERE vendor_code = $1",
      [vendor_code]
    );

    if (existingMedicationQuery.rows.length > 0) {
      res
        .status(409)
        .json({ error: "Medication with the same vendor code already exists" });
    } else {
      let imageUrl;

      if (req.file) {
        const imageName = `${Date.now()}-${req.file.originalname}`;
        const imagePath = `../public/images/${imageName}`;
        await fs.writeFile(imagePath, req.file.buffer);
        imageUrl = `http://localhost:5000/images/${imageName}`;
      } else {
        imageUrl = req.body.image_url;
      }

      await pool.query(
        "INSERT INTO medications (name, image_url, vendor_code) VALUES ($1, $2, $3)",
        [name, imageUrl, vendor_code]
      );
      res.status(201).json({ message: "Medication added successfully" });
    }
  } catch (error) {
    console.error("Error adding medication", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-medications", async (req, res) => {
  try {
    const allMedicationsQuery = await pool.query("SELECT * FROM medications");
    res.status(200).json(allMedicationsQuery.rows);
  } catch (error) {
    console.error("Error getting medications", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete-medication/:medication_id", async (req, res) => {
  const medicationId = req.params.medication_id;

  try {
    const deleteMedicationQuery = await pool.query(
      "DELETE FROM medications WHERE medication_id = $1",
      [medicationId]
    );

    if (deleteMedicationQuery.rowCount === 1) {
      res.status(200).json({ message: "Medication deleted successfully" });
    } else {
      res.status(404).json({ error: "Medication not found" });
    }
  } catch (error) {
    console.error("Error deleting medication", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

const express = require("express");
const { createTables } = require("../models");
const {
  usersController,
  patientsController,
  licensesController,
  medicationsController,
} = require("../controllers");

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

router.use("/users", usersController);
router.use("/patients", patientsController);
router.use("/licenses", licensesController);
router.use("/medications", medicationsController);

module.exports = router;

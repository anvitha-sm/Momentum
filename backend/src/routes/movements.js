const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Movement = mongoose.model("movement");

router.get("/api/movements", async (req, res) => {
  try {
    const movements = await Movement.find();
    res.json(movements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/api/movements/add", async (req, res) => {
  try {
    const { name, muscleGroup, imageUrl } = req.body;
    const newMovement = new Movement({
      name,
      muscleGroup,
      imageUrl,
    });
    await newMovement.save();
    res.json(newMovement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

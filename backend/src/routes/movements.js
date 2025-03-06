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

router.get("/api/movements/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movement = await Movement.findById(id);

    if (!movement) {
      return res.status(404).json({ error: "Movement not found" });
    }

    res.json(movement);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid ID format" });
    }
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

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Workout = mongoose.model("workout");
const User = mongoose.model("user");
const authenticate = require("../middleware/authenticate");

router.post("/api/users/:userId/schedule", authenticate, async (req, res) => {
  try {
    const user = req.user;
    const { day, workoutId } = req.body;
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    if (!Object.keys(user.schedule).includes(day)) {
      return res.status(404).json({ error: "Invalid day" });
    }

    if (user.schedule[day].length >= 2) {
      return res.status(404).json({ error: "Only 2 workouts per day" });
    }

    user.schedule[day].push(workoutId);
    await user.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/api/users/:userId/schedule", authenticate, async (req, res) => {
  try {
    const user = req.user;
    const { day, workoutId } = req.body;
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    if (!Object.keys(user.schedule).includes(day)) {
      return res.status(404).json({ error: "Invalid day" });
    }

    if (!user.schedule[day].includes(workoutId)) {
      return res
        .status(400)
        .json({ error: "Workout not previously scheduled" });
    }

    user.schedule[day] = user.schedule[day].filter(
      (id) => id.toString() !== workoutId
    );
    await user.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/api/users/:userId/schedule", authenticate, async (req, res) => {
  try {
    const user = req.user;
    if (!user.schedule) {
      return res.status(404).json({ error: "Schedule not found." });
    }
    res.status(200).json(user.schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

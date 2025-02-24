const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Workout = mongoose.model("workout");
const User = mongoose.model("user");
const authenticate = require("../middleware/authenticate");
const fs = require("fs");
const path = require("path");

// Get all workouts
router.get("/api/workouts", async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all user-saved workouts
router.get("/api/workouts/saved", authenticate, async (req, res) => {
  try {
    const user = req.user;
    const savedWorkouts = await Workout.find({
      _id: { $in: user.savedWorkouts },
    });
    res.status(200).json(savedWorkouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new workout
router.post("/api/workouts/create", authenticate, async (req, res) => {
  try {
    const { name, description, bodyRegion, movements } = req.body;
    const user = req.user;
    const data = fs.readFileSync(
      path.join(__dirname, "image-urls.txt"),
      "utf8"
    );
    const urls = data.split("\n").filter(Boolean);
    console.log(user);
    // Select a random image
    const randomIndex = Math.floor(Math.random() * urls.length);
    const imageUrl = urls[randomIndex];

    const newWorkout = new Workout({
      name,
      description,
      movements,
      bodyRegion,
      imageUrl,
    });
    await newWorkout.save();
    user.savedWorkouts.push(newWorkout._id);
    await user.save();
    res.json(newWorkout);
  } catch (error) {
    if (error.code === 11000) {
      // ensure workout names are unique
      res
        .status(400)
        .json({ error: "A workout with this name already exists." });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Save an existing workout
router.post("/api/workouts/:workoutId/save", authenticate, async (req, res) => {
  try {
    const { workoutId } = req.body;
    const workout = await Workout.findById(workoutId);
    if (!workout) return res.status(404).json({ error: "Workout not found" });

    const user = req.user;

    if (!user.savedWorkouts.includes(workoutId)) {
      user.savedWorkouts.push(workoutId);
      await user.save();
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a workout (from user-saved)
router.delete(
  "/api/workouts/:workoutId/delete",
  authenticate,
  async (req, res) => {
    try {
      const user = req.user;
      const { workoutId } = req.params;

      if (!user.savedWorkouts.includes(workoutId)) {
        return res.status(404).json({ error: "Workout not saved" });
      }

      user.savedWorkouts = user.savedWorkouts.filter(
        (id) => id.toString() !== workoutId
      );
      await user.save();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;

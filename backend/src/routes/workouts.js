const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Workout = mongoose.model("workout");
const User = mongoose.model("user");
const authenticate = require("../middleware/authenticate");

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
router.get("/api/workouts/saved/:userId", async (req, res) => {
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

// Get all user-created workouts
router.get("/api/workouts/created/:userId", async (req, res) => {
  try {
    const user = req.user;
    const createdWorkouts = await Workout.find({ createdUser: user._id });
    res.status(200).json(createdWorkouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new workout
router.post("/api/workouts/create", async (req, res) => {
  try {
    const { name, description, movements } = req.body;
    const user = req.user;
    const newWorkout = new Workout({
      name,
      description,
      movements,
      createdUser: user._id,
    });
    await newWorkout.save();

    user.savedWorkouts.push(newWorkout._id);
    await user.save();
    res.json(newWorkout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save an existing workout
router.post("/api/workouts/save/:workoutId", async (req, res) => {
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
router.delete("/api/workouts/delete/:workoutId", async (req, res) => {
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
});

module.exports = router;

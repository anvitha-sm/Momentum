const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Workout = mongoose.model("workout");
const LoggedWorkout = mongoose.model("LoggedWorkout");
const User = mongoose.model("user");
const authenticate = require("../middleware/authenticate");

router.post("/api/workouts/log", authenticate, async (req, res) => {
  try {
    const user = req.user;
    const { workoutId, movements, totalDuration, notes } = req.body;

    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return res.status(405).json({ error: "Workout not found" });
    }

    if (!movements || !Array.isArray(movements) || movements.length === 0) {
      return res.status(400).json({ error: "Movements data is required" });
    }

    const loggedWorkout = new LoggedWorkout({
      workouts: workout,
      movements,
      totalDuration,
      notes,
    });
    await loggedWorkout.save();
    user.loggedWorkouts.push(loggedWorkout._id);
    await user.save();
    res.json(loggedWorkout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/api/workouts/logged", authenticate, async (req, res) => {
  try {
    const user = req.user;
    const savedWorkouts = await LoggedWorkout.find({
      _id: { $in: user.loggedWorkouts },
    })
      .populate("workouts")
      .populate({
        path: "movements",
        populate: {
          path: "movement",
          model: "movement",
        },
      });
    res.status(200).json(savedWorkouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

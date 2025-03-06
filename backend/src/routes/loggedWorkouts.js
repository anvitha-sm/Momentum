const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Workout = mongoose.model("workout");
const LoggedWorkout = mongoose.model("LoggedWorkout");
//const LoggedWorkout = require("../collections/LoggedWorkout");
const User = mongoose.model("user");
const authenticate = require("../middleware/authenticate");

router.post("/api/workouts/log", authenticate, async (req, res) => {
  try {
    const user = req.user;
    const { workoutId, movements, totalDuration, notes } = req.body;

    console.log(workoutId);
    const workout = await Workout.findById(workoutId);
    console.log(workout);
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

// router.get("/api/workouts/logged", authenticate, async (req, res) => {
//   try {
//     const user = req.user;

//     // Ensure there are logged workouts to look up
//     if (!user.loggedWorkouts || user.loggedWorkouts.length === 0) {
//       return res.status(200).json([]); // Returns an empty array if no workouts
//     }

//     // Fetch the full LoggedWorkout documents using the IDs stored in user.loggedWorkouts
//     console.log(user.loggedWorkouts);
//     const workouts = await LoggedWorkout.find({
//       _id: { $in: user.loggedWorkouts },
//     }).populate("workout");
//     console.log(workouts);

//     res.status(200).json(workouts);
//   } catch (error) {
//     console.error("Failed to retrieve logged workouts:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

router.get("/api/workouts/logged", authenticate, async (req, res) => {
  try {
    const user = req.user;
    const savedWorkouts = await LoggedWorkout.find({
      _id: { $in: user.loggedWorkouts },
    })
      .populate("workouts") // This will populate the 'workouts' field
      .exec();
    res.status(200).json(savedWorkouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

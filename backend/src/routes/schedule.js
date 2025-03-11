const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Workout = mongoose.model("workout");
const User = mongoose.model("user");
const authenticate = require("../middleware/authenticate");

router.post("/api/users/schedule/add", authenticate, async (req, res) => {
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
    return res.json("working");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/api/schedule/remove", authenticate, async (req, res) => {
  console.log("test");
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
    return res.json("working");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/api/users/schedule/get", authenticate, async (req, res) => {
  try {
    const userId = req.user._id;
    const userWithSchedule = await User.findById(userId)
      .populate("schedule.monday")
      .populate("schedule.tuesday")
      .populate("schedule.wednesday")
      .populate("schedule.thursday")
      .populate("schedule.friday")
      .populate("schedule.saturday")
      .populate("schedule.sunday");

    if (!userWithSchedule || !userWithSchedule.schedule) {
      return res.status(404).json({ error: "Schedule not found." });
    }

    res.status(200).json(userWithSchedule.schedule);
  } catch (error) {
    console.error("Failed to fetch schedule:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

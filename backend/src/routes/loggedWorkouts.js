const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Workout = mongoose.model("workout");
const authenticate = require("../middleware/authenticate");

router.post("/api/workouts/log", authenticate, async (req, res) => {
    try {
        const user = req.user;
        const { workoutId, movements, totalDuration, notes } = req.body;

        const workout = await Workout.findById(workoutId);

        if (!workout) {
        return res.status(404).json({ error: "Workout not found" });
        }

        if (!movements || !Array.isArray(movements) || movements.length === 0) {
        return res.status(400).json({ error: "Movements data is required" });
        }

        const loggedWorkout = new LoggedWorkout({
            workout: workoutId,
            movements,
            totalDuration,
            notes,
        });
        await loggedWorkout.save();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/api/workouts/logged", authenticate, async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user.loggedWorkouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
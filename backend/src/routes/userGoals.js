const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("user");
const authenticate = require("../middleware/authenticate");

router.get("/api/user/goals", authenticate, async (req, res) => {
  try {
    const user = req.user;
    res.status(201).json(user.goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/api/user/goals/save", authenticate, async (req, res) => {
  try {
    const user = req.user;
    const { movementId, goal } = req.body;
    if (goal <= 0) {
      return res.status(400).json({ error: "Invalid goal" });
    }
    const goalIndex = user.goals.findIndex((goalObj) => {
      return String(goalObj.movement) === String(movementId);
    });
    if (goalIndex !== -1) {
      user.goals[goalIndex].goal = goal;
    } else {
      user.goals.push({ movement: movementId, goal: goal });
    }
    await user.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("user");
const authenticate = require("../middleware/authenticate");

router.post("/api/friends/add", authenticate, async (req, res) => {
  const user = req.user;
  const { friendId } = req.body;
  try {
    if (user._id == friendId) {
      return res.status(400).json({ message: "Cannot friend yourself." });
    }

    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ message: "Friend not found." });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Already friends." });
    }
    user.friends.push(friendId);
    await user.save();
    return res.json("working");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/api/friends/remove", authenticate, async (req, res) => {
  const user = req.user;
  const { friendId } = req.body;
  try {
    if (!user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Not previously friends." });
    }

    user.friends = user.friends.filter((id) => id.toString() != friendId);
    await user.save();
    return res.json("working");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

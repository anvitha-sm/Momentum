const express = require("express");
const router = express.Router();
const Movement = require("../models/Movement");

router.get("/", async (req, res) => {
    try {
        const movements = await Movement.find();
        res.json(movements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    movements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movement"}],
    createdUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    difficulty: { type: mongoose.Schema.Types.ObjectID, ref: "Difficulty" }
});

const Workout = mongoose.model('workouts', WorkoutSchema);
module.exports = Workout;

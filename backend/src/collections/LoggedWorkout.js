const mongoose = require("mongoose");

const LoggedWorkoutSchema = new mongoose.Schema({
  workouts: { type: mongoose.Schema.Types.ObjectId, ref: "Workout", required: true },
  date: { type: Date, default: Date.now },
  movements: [
    {
        movement: { type: mongoose.Schema.Types.ObjectId, ref: "Movement", required: true },
        sets: { type: Number, required: true},
        reps: { type: Number },
        duration: { type: Number },
        highestData: { type: Number } // customizable number for best mile time, heaviest weight, etc.
    }
  ],
  totalDuration: { type: Number },
  notes: { type: String }
});

mongoose.model("loggedWorkout", LoggedWorkoutSchema);

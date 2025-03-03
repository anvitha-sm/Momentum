const mongoose = require("mongoose");

const LoggedWorkoutSchema = new mongoose.Schema({
  workouts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workout",
    required: true,
  },
  date: { type: Date, default: Date.now },
  movements: [
    {
      movement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movement",
        required: true,
      },
      sets: { type: Number, required: true },
      metricType: { type: String },
      metricValue: { type: Number, default: 1 },
      highestData: { type: Number }, // customizable number for best mile time, heaviest weight, etc.
    },
  ],
  totalDuration: { type: Number },
  notes: { type: String },
});

// const LoggedWorkout = mongoose.model("LoggedWorkout", LoggedWorkoutSchema);
// module.exports = LoggedWorkout;

mongoose.model("LoggedWorkout", LoggedWorkoutSchema);

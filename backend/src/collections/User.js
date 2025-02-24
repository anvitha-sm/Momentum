const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedWorkouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  schedule: {
    monday: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],
    tuesday: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],
    wednesday: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],
    thursday: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],
    friday: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],
    saturday: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],
    sunday: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],
  },
  loggedWorkouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "LoggedWorkout" }]
});

mongoose.model("user", UserSchema);

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedWorkouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "workout" }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  schedule: {
    monday: [{ type: mongoose.Schema.Types.ObjectId, ref: "workout" }],
    tuesday: [{ type: mongoose.Schema.Types.ObjectId, ref: "workout" }],
    wednesday: [{ type: mongoose.Schema.Types.ObjectId, ref: "workout" }],
    thursday: [{ type: mongoose.Schema.Types.ObjectId, ref: "workout" }],
    friday: [{ type: mongoose.Schema.Types.ObjectId, ref: "workout" }],
    saturday: [{ type: mongoose.Schema.Types.ObjectId, ref: "workout" }],
    sunday: [{ type: mongoose.Schema.Types.ObjectId, ref: "workout" }],
  },
  loggedWorkouts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "LoggedWorkout" },
  ],
});

mongoose.model("user", UserSchema);

const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  bodyReigion: { type: String },
  movements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movement" }],
  imageUrl: { type: String },
});

mongoose.model("workout", WorkoutSchema);

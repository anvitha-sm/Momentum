const mongoose = require("mongoose");

const MovementSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  muscleGroup: [String],
  imageUrl: { type: String },
});

mongoose.model("movement", MovementSchema);

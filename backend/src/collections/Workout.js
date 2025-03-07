const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  bodyRegion: { type: String },
  movements: [
    {
      movement: { type: mongoose.Schema.Types.ObjectId, ref: "Movement" },
      sets: { type: Number, required: true },
      metricType: { type: String },
      metricValue: { type: Number, default: 1 },
    },
  ],
  imageUrl: { type: String },
});

mongoose.model("workout", WorkoutSchema);

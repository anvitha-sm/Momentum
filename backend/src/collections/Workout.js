const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  bodyRegion: { type: String },
  movements: [
    { 
      movement: { type: mongoose.Schema.Types.ObjectId, ref: "Movement" },
      sets: { type: Number, default: 1},
      reps: { type: Number, default: null },
      duration: { type: Number, default: null }
    }
  ],
  imageUrl: { type: String },
});

WorkoutSchema.path("movements").validate((movements) => {
  return movements.every((move) => move.reps === null != move.duration === null);
}, "Reps OR duration exclusively is required for each movement")

mongoose.model("workout", WorkoutSchema);

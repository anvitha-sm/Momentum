const mongoose = require("mongoose")

const MovementSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    muscleGroup: [String]
});

const Movement = mongoose.model('movements', MovementSchema);
module.exports = Movement;
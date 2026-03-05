const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  experience: { type: Number, required: true }, // Years of experience
  specialization: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String }, // Image URL
  createdAt: { type: Date, default: Date.now },
});

const Trainer = mongoose.model("Trainer", trainerSchema);
module.exports = Trainer;

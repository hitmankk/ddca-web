const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String }, // Image URL
  awardedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Player or trainer
  createdAt: { type: Date, default: Date.now },
});

const Achievement = mongoose.model("Achievement", achievementSchema);
module.exports = Achievement;

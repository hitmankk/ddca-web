const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't send password by default in queries
    },
    age: {
      type: Number,
    },
    phone: {
      type: String,
    },
    skillLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    playingRole: {
      type: String,
      enum: ["Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"],
      default: "Batsman",
    },
    experience: {
      type: String,
    },
    // Dashboard related fields
    stats: {
      matchesPlayed: { type: Number, default: 0 },
      runsScored: { type: Number, default: 0 },
      wicketsTaken: { type: Number, default: 0 },
      battingAverage: { type: Number, default: 0 },
      bowlingAverage: { type: Number, default: 0 },
    },
    subscription: {
      active: Boolean,
      expiresAt: Date,
      isMonthlyPaid: Boolean,
    },
    personalTrainerAssigned: { type: Boolean, default: false },
    attendance: [{ date: Date }],
    schedule: [
      {
        date: Date,
        activity: String,
      },
    ],

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Password encryption (before save)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare Password (for login)
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // token expires in 30 days
  });
};
// Generate Reset Password Token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);

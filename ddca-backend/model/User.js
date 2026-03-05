const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// Payment Schema for tracking payments made by user
const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  month: { type: String, required: true }, // Format: YYYY-MM
  paidAt: { type: Date, default: Date.now },
});

// Attendance Schema (stores dates)
const attendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    address: { type: String, required: true },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6, select: false },
    age: { type: Number },
    phone: { type: String },

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
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    experience: { type: String },

    // Stats that can be edited by Admin
    stats: {
      matchesPlayed: { type: Number, default: 0 },
      runsScored: { type: Number, default: 0 },
      wicketsTaken: { type: Number, default: 0 },
      battingAverage: { type: Number, default: 0 },
      bowlingAverage: { type: Number, default: 0 },
    },

    // Subscription that auto-expires after month ends
    subscription: {
      active: { type: Boolean, default: false },
      expiresAt: { type: Date },
      isMonthlyPaid: { type: Boolean, default: false },
    },

    // Payments history array
    payments: [paymentSchema],

    // Personal Trainer Assignment
    personalTrainerAssigned: { type: Boolean, default: false },

    // Attendance Records
    attendance: [attendanceSchema],

    // Optional Schedule
    schedule: [
      {
        date: Date,
        activity: String,
      },
    ],

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Auto-deactivate subscription if expired (middleware)
userSchema.pre("save", function (next) {
  if (this.subscription && this.subscription.expiresAt) {
    if (this.subscription.expiresAt < Date.now()) {
      this.subscription.active = false;
      this.subscription.isMonthlyPaid = false;
    }
  }
  next();
});

// Password encryption
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Reset Password Token
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

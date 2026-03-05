const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/errorHandler");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register User

exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      age,
      playingRole,
      skillLevel,
      personalTrainerAssigned,
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      name,
      email,
      password, // make sure you hash it with bcrypt if needed
      phone,
      age,
      playingRole,
      skillLevel,
      personalTrainerAssigned: personalTrainerAssigned || false,
      role: "user", // ✅ auto-assigning role as "user"
      subscription: {
        isMonthlyPaid: false,
      },
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

// Login User
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password ", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
};
exports.getUserDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        stats: user.stats,
        subscription: user.subscription,
        schedule: user.schedule,
        personalTrainerAssigned: user.personalTrainerAssigned,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

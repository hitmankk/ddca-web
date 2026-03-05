const express = require("express");
const router = express.Router();
const {
  loginUser,
  getUserDashboard,
} = require("../controllers/userControllers");
const { addStudent } = require("../controllers/adminController");
const { isAuthenticated } = require("../middleware/auth");

router.post("/register", addStudent);
router.post("/login", loginUser);
router.get("/dashboard", isAuthenticated, getUserDashboard);

module.exports = router;

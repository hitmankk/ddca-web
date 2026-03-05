const express = require("express");
const {
  addExpense,
  getRevenueStats,
  getAllRevenue,
} = require("../controllers/revenueController");
// const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

// Admin Middleware Protection
// router.use(isAuthenticatedUser, authorizeRoles("admin"));

// Add Expense Entry
router.post("/expense", addExpense);

// Get Monthly Revenue Stats
router.get("/stats", getRevenueStats);

// Get All Revenue Records (for CSV export)
router.get("/all", getAllRevenue);

module.exports = router;

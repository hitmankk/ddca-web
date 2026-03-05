const express = require("express");
const router = express.Router();
const {
  addStudent,
  getAdminStats,
  getAllAttendance,
  getStudentAttendance,
  updateStats,
  // getUserById,
  updateStudent,
  getAllUsers,
  updateUser,
  deleteUser,
  markAttendance,
  toggleSubscription,
  getAcademyFinance,

  downloadFinanceCSV,
  downloadStudentsCSV,
  updateStudentPayment,
} = require("../controllers/adminController");
const { addExpense } = require("../controllers/revenueController");
// const adminController = require("../controllers/adminController");
const { addPayment } = require("../controllers/revenueController");

// console.log("👀 Admin Controller Functions: ", adminController);

const { isAdminAuthenticated, isAdmin } = require("../middleware/isAdmin");

// GET dashboard data
router.get("/stats", getAdminStats);

// POST add new expense
router.post("/expense", addExpense);

// GET all students
router.get("/students", getAllUsers);
// router.post("/revenue", addRevenue);
router.get("/finance", getAcademyFinance);

router.post("/students", addStudent);

// PUT update student
router.put("/students/:id", updateUser);

// DELETE student
router.delete("/students/:id", deleteUser);
router.get("/students/download", downloadStudentsCSV);
router.get("/finance/download", downloadFinanceCSV);
router.patch("/students/:id", updateStudent);
router.patch("/students/:id/payment", updateStudentPayment);
// POST mark attendance
router.patch(
  "/students/:id/attendance",

  markAttendance
);

// PATCH toggle subscription (paid/unpaid)
router.patch(
  "/students/:id/subscription",
  isAdminAuthenticated,
  isAdmin,
  toggleSubscription
);

module.exports = router;
// Add Payment for Student
router.post("/students/:id/payment", addPayment);

// Edit Player Stats (Runs, Matches, Wickets)
router.patch("/students/:id/stats", updateStats);
// // Get Student By ID (for editing in frontend modals)
// router.get("/students/:id", getUserById);
router.get("/attendance/:id", getStudentAttendance);
router.get("/attendance", getAllAttendance);

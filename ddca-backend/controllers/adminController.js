// controllers/adminController.js

const User = require("../model/User");
const Expense = require("../model/Expense");
const Revenue = require("../model/Revenue");
const moment = require("moment");
// POST: Add Student (Admin only)
exports.addStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      age,
      fatherName,
      address,
      phone,
      skillLevel,
      playingRole,
      experience,
      subscription,
      personalTrainerAssigned,
    } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user with role: "user"
    const newUser = await User.create({
      name,
      email,
      password, // make sure pre-save hook hashes this
      age,
      fatherName,
      address,
      phone,
      skillLevel,
      playingRole,
      experience,
      subscription: {
        isMonthlyPaid: subscription?.isMonthlyPaid || false,
        plan: subscription?.plan || "Monthly",
      },
      role: "user",
      personalTrainerAssigned: personalTrainerAssigned || false,
    });

    res.status(201).json({ message: "Student added successfully", newUser });
  } catch (error) {
    console.error("Add student error:", error);
    res.status(500).json({ message: "Failed to add student" });
  }
};
//GET: All Attendance

exports.getAllAttendance = async (req, res) => {
  try {
    const { month } = req.query; // Optional month filter (format: YYYY-MM)

    const filter = { role: "user" };
    if (month) {
      filter.attendance = { $elemMatch: { $regex: `^${month}` } };
    }

    const students = await User.find({ role: "user" }).select(
      "name email attendance"
    );

    const formatted = students.map((s) => ({
      _id: s._id,
      name: s.name,
      email: s.email,
      attendance: month
        ? s.attendance.filter((d) => d.startsWith(month))
        : s.attendance,
    }));

    res.status(200).json({ success: true, students: formatted });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch attendance" });
  }
};
//GET: get specific student attendance

exports.getStudentAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { month } = req.query; // Optional month filter

    const student = await User.findById(id).select("name email attendance");
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    const filteredAttendance = month
      ? student.attendance.filter((d) => d.startsWith(month))
      : student.attendance;

    res.status(200).json({
      success: true,
      student: {
        _id: student._id,
        name: student.name,
        email: student.email,
        attendance: filteredAttendance,
      },
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch attendance" });
  }
};

// GET: Admin Dashboard Stats
//
exports.getAdminStats = async (req, res) => {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"

    const monthFilter = req.query.month || dayjs().format("YYYY-MM");
    const users = await User.find({ role: "user" });
    const expenses = await Expense.find({ month: currentMonth });

    const paid = users.filter((u) =>
      u.payments?.some((p) => p.month === monthFilter)
    ).length;
    const revenues = await Revenue.find({ type: "income", month: monthFilter });
    const unpaid = users.length - paid;
    const ptAssigned = users.filter((u) => u.personalTrainerAssigned).length;

    // const revenue = paid * 2500;
    const totalRevenue = revenues.reduce((sum, r) => sum + r.amount, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const profit = totalRevenue - totalExpenses;

    res.json({
      totalStudents: users.length,
      paid,
      unpaid,
      personalTraining: ptAssigned,
      revenues: totalRevenue,
      totalExpenses,
      profit,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};
exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;
    const month = new Date().toISOString().slice(0, 7);

    const expense = await Expense.create({ title, amount, category, month });
    res.status(201).json({ message: "Expense added", expense });
  } catch (err) {
    res.status(500).json({ message: "Failed to add expense" });
  }
};
//attendance
// PATCH /api/v1/admin/students/:id/attendance
exports.updateAttendance = async (req, res) => {
  const student = await User.findById(req.params.id);
  student.attendance = req.body.attendance;
  await student.save();
  res.status(200).json({ success: true, student });
};

exports.addRevenue = async (req, res) => {
  try {
    const { amount, source } = req.body;
    const month = new Date().toISOString().slice(0, 7);

    const revenue = await Revenue.create({ amount, source, month });
    res.status(201).json({ message: "Revenue added", revenue });
  } catch (err) {
    res.status(500).json({ message: "Failed to add revenue" });
  }
};

//get: Expense
exports.getExpense = async (req, res) => {
  try {
    const expense = await Expense;
    res.json(expense);
  } catch {
    res.status(500).json({ message: "Failed to get Expense" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { keyword = "", filter = "", month = "" } = req.query;
    const query = {};

    // 🗓️ Determine the target month (default = current)
    const targetMonth = month ? moment(month, "YYYY-MM") : moment();
    const formattedMonth = targetMonth.format("YYYY-MM");
    const startOfMonth = targetMonth.startOf("month").toDate();
    const endOfMonth = targetMonth.endOf("month").toDate();

    // 🔍 Keyword search
    if (keyword.trim()) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
      ];
    }

    // 🎯 Filter logic
    if (filter === "paid") {
      // Users who have a payment record for that month
      query["payments.month"] = formattedMonth;
    } else if (filter === "unpaid") {
      // Users who have NOT paid for that month

      query.$and = [
        {
          // No payment in payments array for this month
          $or: [
            { payments: { $exists: false } },
            { payments: { $size: 0 } },
            { "payments.month": { $nin: [formattedMonth] } },
          ],
        },
        {
          // Subscription expired or expiring in this month
          $or: [
            { "subscription.isMonthlyPaid": false },
            {
              "subscription.expiresAt": {
                $gte: startOfMonth,
                $lte: endOfMonth,
              },
            },
          ],
        },
      ];
    } else if (filter === "pt-assigned") {
      query.personalTrainerAssigned = true;
    }

    // ⚙️ Fetch users
    const students = await User.find(query).sort({ createdAt: -1 });

    res.status(200).json(students);
  } catch (err) {
    console.error("GetAllUsers Error:", err);
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

// PUT: Update Student
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "User updated", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update student" });
  }
};

// DELETE: Remove Student
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Student removed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove student" });
  }
};

// POST: Mark Attendance
exports.markAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Student not found" });

    const today = new Date();
    const alreadyMarked = user.attendance.some(
      (entry) => entry.date.toDateString() === today.toDateString()
    );

    if (alreadyMarked) {
      return res
        .status(400)
        .json({ message: "Attendance already marked today" });
    }

    user.attendance.push({ date: today });
    await user.save();
    res.status(200).json({ message: "Attendance marked", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error marking attendance", error: err.message });
  }
};

// PATCH: Toggle Subscription Status
exports.toggleSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.subscription = {
      ...user.subscription,
      isMonthlyPaid: !user.subscription?.isMonthlyPaid,
    };

    await user.save();
    res.json({
      message: "Subscription status updated",
      subscription: user.subscription,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle subscription" });
  }
};

exports.getFilteredStudents = async (req, res) => {
  const { filter } = req.query;
  let condition = { role: "user" };

  if (filter === "paid") condition["subscription.isMonthlyPaid"] = true;
  if (filter === "unpaid") condition["subscription.isMonthlyPaid"] = false;
  if (filter === "pt") condition["personalTrainerAssigned"] = true;

  const students = await User.find(condition);
  res.json(students);
};

// Expenses + revenue with month filter
exports.getAcademyFinance = async (req, res) => {
  const { month } = req.query;
  const filterMonth = month || new Date().toISOString().slice(0, 7);

  const expenses = await Expense.find({ month: filterMonth });
  const revenues = await Revenue.find({ month: filterMonth });

  res.json({ expenses, revenues });
};

const { downloadCSV } = require("../utils/csvDownload");

exports.downloadStudentsCSV = async (req, res) => {
  const { filter } = req.query;
  let condition = { role: "user" };

  if (filter === "paid") condition["subscription.isMonthlyPaid"] = true;
  if (filter === "unpaid") condition["subscription.isMonthlyPaid"] = false;
  if (filter === "pt") condition["personalTrainerAssigned"] = true;

  const students = await User.find(condition);
  const fields = [
    "name",
    "email",
    "phone",
    "subscription.isMonthlyPaid",
    "personalTrainerAssigned",
  ];
  downloadCSV(res, students, fields, "students.csv");
};

exports.downloadFinanceCSV = async (req, res) => {
  const { month } = req.query;
  const filterMonth = month || new Date().toISOString().slice(0, 7);

  const expenses = await Expense.find({ month: filterMonth });
  const revenues = await Revenue.find({ month: filterMonth });

  const expenseFields = ["title", "amount", "category", "month"];
  const revenueFields = ["source", "amount", "month"];

  const combined = [
    ...revenues.map((r) => ({ type: "Revenue", ...r.toObject() })),
    ...expenses.map((e) => ({ type: "Expense", ...e.toObject() })),
  ];

  const fields = ["type", "title", "source", "amount", "category", "month"];
  downloadCSV(res, combined, fields, "academy_finance.csv");
};
// @desc    Update Student Info by Admin
// @route   PATCH /api/v1/admin/students/:id
// @access  Admin only
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      fatherName,
      address,
      email,
      age,
      phone,
      skillLevel,
      playingRole,
      experience,
      personalTrainerAssigned,
      stats,
      subscription,
    } = req.body;

    const student = await User.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Update basic info
    student.name = name || student.name;
    student.fatherName = fatherName || student.fatherName;
    student.address = address || student.address;
    student.email = email || student.email;
    student.age = age || student.age;
    student.phone = phone || student.phone;
    student.skillLevel = skillLevel || student.skillLevel;
    student.playingRole = playingRole || student.playingRole;
    student.experience = experience || student.experience;
    student.personalTrainerAssigned =
      personalTrainerAssigned ?? student.personalTrainerAssigned;

    // Update stats if provided
    if (stats) {
      student.stats.matchesPlayed =
        stats.matchesPlayed ?? student.stats.matchesPlayed;
      student.stats.runsScored = stats.runsScored ?? student.stats.runsScored;
      student.stats.wicketsTaken =
        stats.wicketsTaken ?? student.stats.wicketsTaken;
      student.stats.battingAverage =
        stats.battingAverage ?? student.stats.battingAverage;
      student.stats.bowlingAverage =
        stats.bowlingAverage ?? student.stats.bowlingAverage;
    }

    // Update subscription if provided
    if (subscription) {
      student.subscription.active =
        subscription.active ?? student.subscription.active;
      student.subscription.isMonthlyPaid =
        subscription.isMonthlyPaid ?? student.subscription.isMonthlyPaid;
      student.subscription.expiresAt =
        subscription.expiresAt || student.subscription.expiresAt;
    }

    await student.save();

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student,
    });
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update student",
      error: err.message,
    });
  }
};

exports.updateStudentPayment = async (req, res) => {
  const { id } = req.params;
  const { amount, month } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const existing = user.subscription.payments.find((p) => p.month === month);
    if (existing) {
      existing.amount = amount;
      existing.paidAt = new Date();
    } else {
      user.subscription.payments.push({ amount, month });
    }

    user.subscription.isMonthlyPaid = true;
    await user.save();

    res.json({
      message: "Payment updated",
      payments: user.subscription.payments,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update payment" });
  }
};

//update player Stats
exports.updateStats = async (req, res) => {
  try {
    const { id } = req.params;
    const { matchesPlayed, runsScored, wicketsTaken } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Student not found" });

    if (matchesPlayed !== undefined) user.stats.matchesPlayed = matchesPlayed;
    if (runsScored !== undefined) user.stats.runsScored = runsScored;
    if (wicketsTaken !== undefined) user.stats.wicketsTaken = wicketsTaken;

    await user.save();
    res.status(200).json({ message: "Stats updated successfully", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating stats", error: err.message });
  }
};

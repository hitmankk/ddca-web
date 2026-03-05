const Revenue = require("../model/Revenue");
const User = require("../model/User");
const Expense = require("../model/Expense");
const dayjs = require("dayjs");
const { Parser } = require("json2csv");

exports.getMonthlyStats = async (req, res) => {
  const { month } = req.query;
  const start = dayjs(month).startOf("month").toDate();
  const end = dayjs(month).endOf("month").toDate();

  const transactions = await Revenue.find({ date: { $gte: start, $lte: end } });

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  res.json({
    month,
    revenue: income,
    totalExpenses: expenses,
    profit: income - expenses,
    transactions,
  });
};

//Add Expense to Revenue
exports.addExpense = async (req, res) => {
  const { title, amount, category, month } = req.body;

  try {
    // 1️⃣ Create Expense first
    const expense = await Expense.create({ title, amount, category, month });

    // 2️⃣ Add to Revenue referencing the Expense
    await Revenue.create({
      amount,
      type: "expense",
      expense: expense._id,
      month,
    });

    res.status(201).json({ message: "✅ Expense recorded successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "❌ Error adding expense", error: err.message });
  }
};

exports.downloadCSV = async (req, res) => {
  const { month } = req.query;
  const start = dayjs(month).startOf("month").toDate();
  const end = dayjs(month).endOf("month").toDate();

  const data = await Revenue.find({
    date: { $gte: start, $lte: end },
  }).populate("student", "name email");

  const fields = [
    { label: "Type", value: "type" },
    { label: "Amount", value: "amount" },
    { label: "Category", value: "category" },
    { label: "Date", value: "date" },
    { label: "Student", value: (row) => row.student?.name || "" },
    { label: "Email", value: (row) => row.student?.email || "" },
  ];

  const parser = new Parser({ fields });
  const csv = parser.parse(data);

  res.header("Content-Type", "text/csv");
  res.attachment(`ddca-revenue-${month}.csv`);
  return res.send(csv);
};

exports.addPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, month } = req.body;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Student not found" });

    user.payments.push({ amount, month, paidAt: new Date() });

    user.subscription = {
      active: true,
      expiresAt: new Date(`${month}-31`),
      isMonthlyPaid: true,
    };

    await user.save();

    const revenue = await Revenue.create({
      amount,
      type: "income",
      user: user._id,
      month,
    });
    console.log("Revenue Created => ", revenue);

    res.status(200).json({ message: "Payment recorded successfully", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error recording payment", error: err.message });
  }
};
// Get Revenue/Expense Summary By Month
exports.getRevenueStats = async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    const incomes = await Revenue.find({ type: "income", month });
    const expenses = await Revenue.find({ type: "expense", month });

    const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
    const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    res.status(200).json({
      success: true,
      totalIncome,
      totalExpense,
      profit: totalIncome - totalExpense,
      incomes,
      expenses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Get All Revenue Data (for CSV export)
exports.getAllRevenue = async (req, res) => {
  try {
    const { month } = req.query;
    const filter = month ? { month } : {};

    const records = await Revenue.find(filter)
      .populate("expense")
      .populate("user")
      .sort({ createdAt: -1 });

    const formattedRecords = records.map((r) => ({
      _id: r._id,
      title:
        r.type === "expense"
          ? r.expense?.title || "Unknown Expense"
          : `Payment by ${r.user?.name || "Unknown User"}`,
      amount: r.amount,
      type: r.type === "expense" ? "expense" : "income",
      createdAt: r.createdAt,
    }));

    res.status(200).json({ success: true, records: formattedRecords });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

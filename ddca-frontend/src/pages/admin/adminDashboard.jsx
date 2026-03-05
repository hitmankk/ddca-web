import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import "./adminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [expenses, setExpenses] = useState({
    title: "",
    amount: "",
    category: "",
  });
  const [students, setStudents] = useState([]);
  const [payment, setPayment] = useState({
    studentId: "",
    amount: "",
    month: dayjs().format("YYYY-MM"),
  });

  const fetchStudents = async () => {
    try {
      const { data } = await axios.get("/api/v1/admin/students");
      console.log(data);
      setStudents(data);
      console.log(students);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to fetch students");
    }
  };
  const [month, setMonth] = useState(dayjs().format("YYYY-MM"));
  const navigate = useNavigate();

  const fetchStats = async () => {
    const { data } = await axios.get(`/api/v1/admin/stats?month=${month}`);
    setStats(data);
  };

  const handleNavigate = (filter) => {
    if (filter === "revenue") navigate("/admin/revenue?month=" + month);
    else navigate(`/admin/studentManagement?filter=${filter}&month=${month}`);
  };
  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/admin/expense", {
        title: expenses.title,
        amount: expenses.amount,
        category: expenses.category,
        month, // add month separately, not inside expenses
      });

      alert("✅ Expense added successfully");
      setExpenses({ title: "", amount: "", category: "" });
      fetchStats();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add expense");
    }
  };
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/v1/admin/students/${payment.studentId}/payment`, {
        amount: payment.amount,
        month: payment.month,
      });
      alert("✅ Payment recorded successfully");
      setPayment({
        studentId: "",
        amount: "",
        month: dayjs().format("YYYY-MM"),
      });
      fetchStats();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to record payment");
    }
  };
  useEffect(() => {
    fetchStats();
    fetchStudents();
  }, [month]);

  return (
    <div className="admin-dashboard p-6 text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🏏 DDCA Admin Dashboard</h1>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      {/* <h1>{month}</h1> */}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div
          onClick={() => handleNavigate("all")}
          className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg border hover:border-blue-600"
        >
          <p className="text-sm text-gray-500">Total Students</p>
          <h2 className="text-2xl font-bold">{stats.totalStudents}</h2>
        </div>
        <div
          onClick={() => handleNavigate("paid")}
          className="cursor-pointer bg-green-100 p-6 rounded-xl shadow hover:shadow-lg border hover:border-green-600"
        >
          <p className="text-sm text-gray-600">Paid This Month</p>
          <h2 className="text-2xl font-bold text-green-800">{stats.paid}</h2>
        </div>
        <div
          onClick={() => handleNavigate("unpaid")}
          className="cursor-pointer bg-red-100 p-6 rounded-xl shadow hover:shadow-lg border hover:border-red-600"
        >
          <p className="text-sm text-gray-600">Unpaid This Month</p>
          <h2 className="text-2xl font-bold text-red-800">{stats.unpaid}</h2>
        </div>
        <div
          onClick={() => handleNavigate("pt")}
          className="cursor-pointer bg-blue-100 p-6 rounded-xl shadow hover:shadow-lg border hover:border-blue-600"
        >
          <p className="text-sm text-gray-600">PT Assigned</p>
          <h2 className="text-2xl font-bold text-blue-800">
            {stats.personalTraining}
          </h2>
        </div>
        <div className="bg-purple-100 p-6 rounded-xl shadow border">
          <p className="text-sm text-gray-600">Revenue</p>
          <h2 className="text-2xl font-bold text-purple-800">
            ₹{stats.revenues}
          </h2>
        </div>
        <div
          onClick={() => handleNavigate("revenue")}
          className="cursor-pointer bg-yellow-100 p-6 rounded-xl shadow hover:shadow-lg border hover:border-yellow-600"
        >
          <p className="text-sm text-gray-600">Profit Overview</p>
          <h2 className="text-2xl font-bold text-yellow-800">
            ₹{stats.profit} (📉 ₹{stats.totalExpenses} exp)
          </h2>
        </div>
      </div>

      {/* Add Expense Form */}
      <form
        onSubmit={handleExpenseSubmit}
        className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto border border-gray-200"
      >
        <h2 className="text-xl font-bold mb-4">➕ Add Expense</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={expenses.title}
            onChange={(e) =>
              setExpenses({ ...expenses, title: e.target.value })
            }
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Amount"
            value={expenses.amount}
            onChange={(e) =>
              setExpenses({ ...expenses, amount: e.target.value })
            }
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={expenses.category}
            onChange={(e) =>
              setExpenses({ ...expenses, category: e.target.value })
            }
            required
            className="border p-2 rounded"
          />
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Expense
          </button>
        </div>
      </form>
      <form
        onSubmit={handlePaymentSubmit}
        className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto border border-gray-200 mt-8"
      >
        <h2 className="text-xl font-bold mb-4">💵 Add Payment for Student</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={payment.studentId}
            onChange={(e) =>
              setPayment({ ...payment, studentId: e.target.value })
            }
            required
            className="border p-2 rounded"
          >
            <option value="">Select Student</option>
            {students
              ?.filter((s) => s.role === "user")
              .map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} ({s.email})
                </option>
              ))}
          </select>

          <input
            type="number"
            placeholder="Amount"
            value={payment.amount}
            onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
            required
            className="border p-2 rounded"
          />

          <input
            type="month"
            value={payment.month}
            onChange={(e) => setPayment({ ...payment, month: e.target.value })}
            className="border p-2 rounded"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminDashboard;

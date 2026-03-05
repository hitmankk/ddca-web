import React, { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import dayjs from "dayjs";
import "./adminDashboard.css";

const AdminRevenue = () => {
  const [records, setRecords] = useState([]);
  const [month, setMonth] = useState(dayjs().format("YYYY-MM"));

  useEffect(() => {
    fetchRecords();
  }, [month]);

  const fetchRecords = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/admin/revenue/all?month=${month}`
      );
      console.log(data); // 👈 Check what this logs
      setRecords(data.records); // ✅ Use data.records if response is { records: [...] }
    } catch (error) {
      alert("Failed to fetch records");
    }
  };

  const totalIncome = (records || [])
    .filter((r) => r.type === "income")
    .reduce((acc, cur) => acc + cur.amount, 0);

  const totalExpenses = (records || [])
    .filter((r) => r.type === "expense")
    .reduce((acc, cur) => acc + cur.amount, 0);

  const profit = totalIncome - totalExpenses;

  return (
    <div className="admin-dashboard p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📊 Academy Revenue Overview</h1>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded shadow">
          <p className="text-gray-600">Total Income</p>
          <h2 className="text-2xl font-bold text-green-700">₹{totalIncome}</h2>
        </div>
        <div className="bg-red-100 p-4 rounded shadow">
          <p className="text-gray-600">Total Expenses</p>
          <h2 className="text-2xl font-bold text-red-700">₹{totalExpenses}</h2>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <p className="text-gray-600">Profit</p>
          <h2 className="text-2xl font-bold text-yellow-700">₹{profit}</h2>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <CSVLink
          data={records.map(({ title, amount, category, createdAt }) => ({
            Title: title,
            Amount: amount,
            Category: category,
            Date: dayjs(createdAt).format("DD-MM-YYYY"),
          }))}
          filename={`Academy_Revenue_${month}.csv`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download CSV
        </CSVLink>
      </div>

      <table className="min-w-full border bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Amount (₹)</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => (
            <tr key={rec._id} className="text-center border-t">
              <td className="p-2">{rec.title}</td>
              <td className="p-2">{rec.amount}</td>
              <td className="p-2 capitalize">{rec.type}</td>
              <td className="p-2">
                {dayjs(rec.createdAt).format("DD-MM-YYYY")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRevenue;

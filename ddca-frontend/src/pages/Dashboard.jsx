import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./Dashboard.css";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  // useEffect(() => {
  //   const fetchDashboard = async () => {
  //     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //     if (!userInfo) {
  //       window.location.href = "/login";
  //       return;
  //     }
  //     const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
  //     const { data } = await axios.get("/api/v1/user/dashboard", config);
  //     setDashboard(data.data);
  //   };
  //   fetchDashboard();
  // }, []);
  const calculateProgress = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const totalDays = 30; // assuming 30-day subscription
    const daysLeft = Math.max(
      0,
      Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
    );
    const used = totalDays - daysLeft;
    return Math.min(100, (used / totalDays) * 100);
  };

  const dummyBarData = [
    { name: "Matches", value: dashboard?.stats?.matchesPlayed || 100 },
    { name: "Runs", value: dashboard?.stats?.runsScored || 8000 },
    { name: "Wickets", value: dashboard?.stats?.wicketsTaken || 10 },
  ];

  const dummyPieData = [
    { name: "Active", value: dashboard?.subscription?.active ? 1 : 0 },
    { name: "Inactive", value: dashboard?.subscription?.active ? 0 : 1 },
  ];

  const pieColors = ["#00c49f", "#ff8042"];

  return (
    <div className="dashboard-container">
      <section className="hero-banner">
        <h1>🏏 Welcome {dashboard?.name}!</h1>
        <p>Here's a quick look at your cricket journey.</p>
      </section>

      <div className="dashboard-cards">
        <div className="card gradient-card">
          <h3>Subscription Status</h3>
          <p>{dashboard?.subscription?.active ? "✅ Active" : "❌ Inactive"}</p>
          {dashboard?.subscription?.expiresAt && (
            <p>
              Expires:{" "}
              {new Date(dashboard.subscription.expiresAt).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="card gradient-card-alt">
          <h3>Personal Trainer</h3>
          <p>
            {dashboard?.personalTrainerAssigned
              ? "🧑‍🏫 Assigned"
              : "Not Assigned"}
          </p>
        </div>
      </div>

      <div className="dashboard-charts">
        <h3>Performance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dummyBarData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6c5ce7" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="dashboard-subscription">
        <h3>Subscription Progress</h3>
        {dashboard?.subscription?.active ? (
          <>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{
                  width: `${
                    dashboard?.subscription?.expiresAt
                      ? calculateProgress(dashboard.subscription.expiresAt)
                      : 100
                  }%`,
                }}
              ></div>
            </div>
            <p>
              Expires on:{" "}
              {new Date(dashboard.subscription.expiresAt).toLocaleDateString()}
            </p>
          </>
        ) : (
          <p>Your subscription is inactive.</p>
        )}
      </div>

      <div className="dashboard-schedule">
        <h3>Upcoming Schedule</h3>
        {dashboard?.schedule && dashboard.schedule.length > 0 ? (
          <ul>
            {dashboard.schedule.map((item, idx) => (
              <li key={idx}>
                <strong>{new Date(item.date).toLocaleDateString()}</strong>{" "}
                &mdash; {item.activity}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events scheduled yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

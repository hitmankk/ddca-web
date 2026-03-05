// import express from "express";
// const cookieParser = require("cookie-parser");
const path = require("path");
// export const app = express();
const express = require("express");

const app = express();

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "ddca-backend/config/config.env" });
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// app.use(cookieParser());

const user = require("./routes/userRoutes");
app.use("/api/v1", user);
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/v1/admin", adminRoutes);
const revenueRoutes = require("./routes/revenueRoutes");
app.use("/api/v1/admin/revenue", revenueRoutes);

app.use(express.static(path.resolve("./ddca-frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("./ddca-frontend/build/index.html"));
});

module.exports = app;

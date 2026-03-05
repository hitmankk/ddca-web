const express = require("express");
const connectDB = require("./config/db");
const app = require("./App");
require("dotenv").config({ path: "ddca-backend/config/config.env" });

// Middleware
// app.use(express.json());
// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "ddca-backend/config/config.env" });
}
// Connect to MongoDB
connectDB();
const server = app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
// // Test Route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // Server Listening
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

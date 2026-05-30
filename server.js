require("dotenv").config();


const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes")

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes)

// Test Route
app.get("/", (req, res) => {
  res.send("API Running");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
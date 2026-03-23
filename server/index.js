require("dotenv").config();

const express = require("express");
const cors = require("cors");

const interviewRoutes = require("./routes/interviewRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

const app = express(); // ✅ PEHLE APP BANAA

// ✅ CORS (sirf ek baar use kar)
app.use(cors({
  origin: ["https://interview-simulatorr.vercel.app"],
  credentials: true
}));

app.use(express.json());

// ✅ DB connect
connectDB();

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
require("dotenv").config();
const interviewRoutes = require("./routes/interviewRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://interview-simulatorr.vercel.app"
  ],
  credentials: true
}));

const app = express();
connectDB();
app.use(
  cors({
    origin: "*", // allow all (for now)
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
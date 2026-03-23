const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  status: String, // solved / unsolved
  timeTaken: Number,
  code: String,
}, { timestamps: true });

module.exports = mongoose.model("Interview", interviewSchema);
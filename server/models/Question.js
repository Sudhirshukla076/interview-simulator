const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: String,
  topic: String,
});

module.exports = mongoose.model("Question", questionSchema);
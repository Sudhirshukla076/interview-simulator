const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Question = require("./models/Question");

const seedQuestions = async () => {
  try {
    await connectDB();

    await Question.deleteMany(); // clear old data

    await Question.insertMany([
      {
        title: "Two Sum",
        description: "Find two numbers that add up to target",
        difficulty: "Easy",
        topic: "Array",
      },
      {
        title: "Reverse a String",
        description: "Reverse a given string",
        difficulty: "Easy",
        topic: "String",
      },
      {
        title: "Binary Search",
        description: "Search element in sorted array",
        difficulty: "Medium",
        topic: "Array",
      },
      {
        title: "DFS Traversal",
        description: "Perform depth-first search",
        difficulty: "Medium",
        topic: "Graph",
      },
      {
        title: "Dijkstra Algorithm",
        description: "Find shortest path",
        difficulty: "Hard",
        topic: "Graph",
      },
    ]);

    console.log("Questions added");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedQuestions();
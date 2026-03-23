const Interview = require("../models/Interview");
const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const authMiddleware = require("../middleware/authMiddleware");

// Start Interview → get random question
router.get("/start", authMiddleware, async (req, res) => {
  try {
    const count = await Question.countDocuments();

    const random = Math.floor(Math.random() * count);

    const question = await Question.findOne().skip(random);

    res.json(question);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
// Submit Interview
router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const { questionId, status, timeTaken } = req.body;

    const interview = new Interview({
      userId: req.user.id,
      questionId,
      status,
      timeTaken,
    });

    await interview.save();

    res.json({ message: "Interview submitted" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
// Get User Performance + Weak Topics
router.get("/results", authMiddleware, async (req, res) => {
  try {
    const interviews = await Interview.find({ userId: req.user.id })
      .populate("questionId");

    const total = interviews.length;

    const solved = interviews.filter(i => i.status === "solved").length;

    const accuracy = total === 0 ? 0 : (solved / total) * 100;

    // Topic analysis
    const topicStats = {};

    interviews.forEach(i => {
      const topic = i.questionId.topic;

      if (!topicStats[topic]) {
        topicStats[topic] = { total: 0, solved: 0 };
      }

      topicStats[topic].total++;

      if (i.status === "solved") {
        topicStats[topic].solved++;
      }
    });

    // Find weak topics
    const weakTopics = [];

    for (let topic in topicStats) {
      const t = topicStats[topic];
      const acc = (t.solved / t.total) * 100;

      if (acc < 50) {
        weakTopics.push(topic);
      }
    }

    res.json({
      total,
      solved,
      accuracy: accuracy.toFixed(2),
      weakTopics,
      data: interviews
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
// Leaderboard with Names + Rank
router.get("/leaderboard", async (req, res) => {
  try {
    let leaderboard = await Interview.aggregate([
      {
        $group: {
          _id: "$userId",
          total: { $sum: 1 },
          solved: {
            $sum: {
              $cond: [{ $eq: ["$status", "solved"] }, 1, 0],
            },
          },
        },
      },
      {
        $addFields: {
          accuracy: {
            $multiply: [
              { $divide: ["$solved", "$total"] },
              100,
            ],
          },
        },
      },
      {
        $sort: { solved: -1, accuracy: -1 },
      },
      {
        $lookup: {
          from: "users", // collection name in MongoDB
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          name: "$user.name",
          email: "$user.email",
          total: 1,
          solved: 1,
          accuracy: { $round: ["$accuracy", 2] },
        },
      },
    ]);

    // Add rank manually
    leaderboard = leaderboard.map((user, index) => ({
      rank: index + 1,
      ...user,
    }));

    res.json(leaderboard);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
import { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";

function Dashboard() {
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("// Write your code here...");

  // Start Interview
  const startInterview = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/interview/start",
        {
          headers: { Authorization: token },
        }
      );

      console.log("QUESTION:", res.data); // debug
      setQuestion(res.data);
    } catch (error) {
      console.log(error);
      alert("Error starting interview ❌");
    }
  };

  // Submit Interview
  const submitInterview = async (status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/interview/submit",
        {
          questionId: question._id,
          status: status,
          timeTaken: 120,
          code: code,
        },
        {
          headers: { Authorization: token },
        }
      );

      alert("Interview submitted 🚀");
      setQuestion(null);
    } catch (error) {
      console.log(error);
      alert("Error submitting ❌");
    }
  };

  return (
    <div className="container">

      {/* NAV */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => window.location.href = "/dashboard"}>Dashboard</button>
        <button onClick={() => window.location.href = "/results"}>Results</button>
        <button onClick={() => window.location.href = "/leaderboard"}>Leaderboard</button>
        <button onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}>Logout</button>
      </div>

      <h2>🚀 Interview Dashboard</h2>

      <button onClick={startInterview}>
        Start Interview 🚀
      </button>

      {/* QUESTION + EDITOR */}
      {question ? (
        <div className="card">

          <h3>{question.title}</h3>
          <p>{question.description}</p>
          <p><b>Difficulty:</b> {question.difficulty}</p>
          <p><b>Topic:</b> {question.topic}</p>

          {/* 🔥 MONACO EDITOR FIXED */}
          <div style={{ marginTop: "20px", border: "1px solid #333" }}>
            <Editor
              height="400px"
              width="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
            />
          </div>

          <div style={{ marginTop: "15px" }}>
            <button onClick={() => submitInterview("solved")}>
              ✅ Solved
            </button>

            <button onClick={() => submitInterview("unsolved")}>
              ❌ Unsolved
            </button>
          </div>

        </div>
      ) : (
        <p style={{ marginTop: "20px" }}>Click "Start Interview" to begin</p>
      )}

    </div>
  );
}

export default Dashboard;
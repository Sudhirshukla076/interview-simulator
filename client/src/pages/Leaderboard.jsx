import { useEffect, useState } from "react";
import axios from "axios";

function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(
        "https://interview-backend-u5yp.onrender.com/api/interview/leaderboard",
   
        

      setData(res.data);
    } catch (error) {
      console.log(error);
      alert("Error fetching leaderboard ❌");
    }
  };

  return (
    <div className="container">
      <h2>🏆 Leaderboard</h2>

      {data.map((user) => (
        <div className="card" key={user.rank}>
          <p><b>#{user.rank}</b> — {user.name}</p>
          <p>Solved: {user.solved}</p>
          <p>Accuracy: {user.accuracy}%</p>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;
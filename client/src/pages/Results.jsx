import { useEffect, useState } from "react";
import axios from "axios";

function Results() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
  "https://interview-backend-u5yp.onrender.com/api/interview/results",
  {
    headers: {
      Authorization: token,
    },
  }
);

      setData(res.data);
    } catch (error) {
      console.log(error);
      alert("Error fetching results ❌");
    }
  };

  if (!data) return <h3>Loading...</h3>;

  return (
    <div className="container">
      <h2>📊 Performance</h2>

      <div className="card">
        <p><b>Total:</b> {data.total}</p>
        <p><b>Solved:</b> {data.solved}</p>
        <p><b>Accuracy:</b> {data.accuracy}%</p>

        <h3>Weak Topics:</h3>
        {data.weakTopics.length === 0
          ? <p>None 🎉</p>
          : data.weakTopics.map((t, i) => <p key={i}>{t}</p>)
        }
      </div>
    </div>
  );
}

export default Results;
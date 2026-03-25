import { useState } from "react";
import axios from "axios";

function Signup() {
  const [name, setName] = useState(""); // ✅ FIXED
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post(
        "https://interview-backend-u5yp.onrender.com/api/auth/signup",
        {
          name,        // ✅ FIXED
          email,
          password,
        }
      );

      alert("Signup successful 🎉");
      window.location.href = "/";
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Signup failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Signup</h2>

      {/* NAME */}
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      <button
        onClick={handleSignup}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "15px",
          cursor: "pointer",
        }}
      >
        Signup
      </button>
    </div>
  );
}

export default Signup;
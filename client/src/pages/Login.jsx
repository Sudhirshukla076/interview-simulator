import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 NORMAL LOGIN
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://interview-backend-u5yp.onrender.com/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      alert("Login successful 🚀");
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
      alert("Login failed ❌");
    }
  };

  // 🔥 DEMO AUTO LOGIN (NO PASSWORD SHOWN)
  const handleDemoLogin = async () => {
    try {
      const res = await axios.post(
        "https://interview-backend-u5yp.onrender.com/api/auth/login",
        {
          email: "sudhir@test.com",
          password: "123456",
        }
      );

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      console.log(err);
      alert("Demo login failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "15px",
          cursor: "pointer",
        }}
      >
        Login
      </button>

      {/* 🔥 DEMO LOGIN CARD */}
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          borderRadius: "10px",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "white",
          textAlign: "center",
        }}
      >
        <p style={{ fontWeight: "bold" }}>🚀 Try Demo</p>

        <button
          onClick={handleDemoLogin}
          style={{
            marginTop: "10px",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login as Demo User
        </button>
      </div>

      {/* 🔥 SIGNUP LINK */}
      <p style={{ marginTop: "15px", textAlign: "center" }}>
        New user?{" "}
        <span
          onClick={() => (window.location.href = "/signup")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Sign up here
        </span>
      </p>
    </div>
  );
}

export default Login;
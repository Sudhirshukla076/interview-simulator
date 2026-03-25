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

  // 🔥 DEMO AUTO LOGIN (ONE CLICK)
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

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          borderRadius: "6px",
        }}
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          borderRadius: "6px",
        }}
      />

      {/* LOGIN BUTTON */}
      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "15px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Login
      </button>

      {/* 🔥 DEMO BUTTON (FINAL CLEAN) */}
      <button
        onClick={handleDemoLogin}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          borderRadius: "10px",
          border: "none",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        🚀 Try Demo
      </button>

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
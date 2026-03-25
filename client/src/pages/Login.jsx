import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://interview-backend-u5yp.onrender.com/api/auth/login",
        { email, password }
      );

      console.log(res.data);

      // Save token
      localStorage.setItem("token", res.data.token);

      alert("Login successful 🚀");
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
      alert("Login failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "8px" }}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "8px" }}
      />
      <br /><br />

      <button onClick={handleLogin} style={{ width: "100%", padding: "10px" }}>
        Login
      </button>

      {/* 🔥 DEMO BOX */}
      <div
        style={{
          marginTop: "20px",
          padding: "12px",
          borderRadius: "8px",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "white",
          textAlign: "center"
        }}
      >
        <p style={{ fontWeight: "bold" }}>🚀 Try Demo Account</p>
        <p>Email: sudhir@test.com</p>
        <p>Password: 123456</p>

        {/* 🔥 AUTOFILL BUTTON */}
        <button
          onClick={() => {
            setEmail("sudhir@test.com");
            setPassword("123456");
          }}
          style={{
            marginTop: "10px",
            padding: "8px 12px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Fill Demo Credentials
        </button>
      </div>
    </div>
  );
}

export default Login;
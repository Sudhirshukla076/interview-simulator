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
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
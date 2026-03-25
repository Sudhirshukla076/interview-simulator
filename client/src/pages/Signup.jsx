import { useState } from "react";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post(
        "https://interview-backend-u5yp.onrender.com/api/auth/register",
        { email, password }
      );

      alert("Signup successful 🎉");
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      alert("Signup failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Signup</h2>

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

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;
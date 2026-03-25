import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Results from "./pages/Results";
import Leaderboard from "./pages/Leaderboard";
import Signup from "./pages/Signup";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
      />

      <Route
        path="/dashboard"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
      />

      <Route
        path="/results"
        element={isLoggedIn ? <Results /> : <Navigate to="/" />}
      />

      <Route
        path="/leaderboard"
        element={<Leaderboard />}
      />
      <Route path="/signup" 
      element={<Signup />}
      />
    </Routes>
  );
}

export default App;
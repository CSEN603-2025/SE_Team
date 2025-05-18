// FINAL/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "./utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = authenticateUser(email, password);
    if (user) {
      localStorage.setItem("role", user.role);
      switch (user.role) {
        case "student":
          navigate("/student");
          break;
        case "prostudent":
          navigate("/prostudent");
          break;
        case "faculty":
          navigate("/faculty");
          break;
        case "company":
          navigate("/company");
          break;
        case "scad":
          navigate("/scad");
          break;
        default:
          alert("Invalid user role");
      }
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>SCAD System Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

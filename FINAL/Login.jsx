// FINAL/Login.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "./data";
import "./App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem("userRole", user.role);
      switch (user.role) {
        case "student":
          navigate("/student");
          break;
        case "prostudent":
          navigate("/prostudent");
          break;
        case "company":
          navigate("/company");
          break;
        case "faculty":
          navigate("/faculty");
          break;
        case "scad":
          navigate("/scad");
          break;
        default:
          break;
      }
    } else {
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>Login to SCAD System</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

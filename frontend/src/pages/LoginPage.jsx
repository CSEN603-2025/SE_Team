// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple hardcoded login logic
    if (userType === 'student' && email === 'student@guc.edu.eg' && password === 'guc123') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userType', 'student');
      navigate('/student/dashboard');
    } else if (userType === 'faculty' && email === 'faculty@guc.edu.eg' && password === 'guc123') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userType', 'faculty');
      navigate('/faculty/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>{userType === 'student' ? 'Student Login' : 'Faculty Login'}</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Login as:</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

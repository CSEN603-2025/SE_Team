// FINAL/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from './data';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!credentials.email || !credentials.password) {
      setError('Please fill in all fields');
      return;
    }

    // Find user with matching credentials
    const user = users.find(u => 
      u.email === credentials.email && 
      u.password === credentials.password
    );

    if (user) {
      // Store user info in localStorage
      localStorage.setItem('userType', user.role);
      localStorage.setItem('userEmail', user.email);
      
      // Redirect based on user role
      const redirectPaths = {
        'student': '/student',
        'scad': '/scad',
        'faculty': '/faculty',
        'company': '/company',
        'prostudent': '/pro-student'
      };
      
      navigate(redirectPaths[user.role]);
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;


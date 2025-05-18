import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../data/dummyData';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

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

    if (!credentials.email || !credentials.password) {
      setError('Please fill in all fields');
      return;
    }

    // Find user in our dummy data
    const userEntry = Object.values(users).find(
      user => user.email === credentials.email && user.password === credentials.password
    );

    if (!userEntry) {
      setError('Invalid credentials');
      return;
    }

    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(userEntry));
    localStorage.setItem('isAuthenticated', 'true');

    // Navigate based on user type
    switch (userEntry.type) {
      case 'student':
        navigate('/dashboard');
        break;
      case 'pro-student':
        navigate('/pro-student-dashboard');
        break;
      case 'company':
        navigate('/company-dashboard');
        break;
      case 'faculty':
        navigate('/faculty-dashboard');
        break;
      case 'scad':
        navigate('/scad-dashboard');
        break;
      default:
        navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      {/* Navigation buttons - invisible but clickable */}
      <div className="nav-buttons">
        <button className="nav-button" onClick={() => navigate('/')} aria-label="Home">
          &nbsp;
        </button>
        <button className="nav-button" onClick={() => navigate('/dashboard')} aria-label="Dashboard">
          &nbsp;
        </button>
        <button className="nav-button" onClick={() => navigate('/register')} aria-label="Register">
          &nbsp;
        </button>
      </div>

      {/* Login form - now visible with Windows 98 style */}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            aria-label="Email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            aria-label="Password"
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      {/* Error message */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Login; 
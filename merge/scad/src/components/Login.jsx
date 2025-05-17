// src/components/Login.js
import React, { useState } from 'react';
import './Login.css';

export default function Login({ onLogin }) {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (onLogin(email.trim(), password)) {
      // success → App will rerender
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>SCAD System Login</h2>
        {error && <div className="error">{error}</div>}
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

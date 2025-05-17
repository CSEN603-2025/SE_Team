// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const USERS = [
  { email: 'student@guc.com',    password: 'pass', role: 'student' },
  { email: 'prostudent@guc.com', password: 'pass', role: 'prostudent' },
  { email: 'scad@guc.com',       password: 'pass', role: 'scad' },
  { email: 'company@guc.com',    password: 'pass', role: 'company' },
  { email: 'faculty@guc.com',    password: 'pass', role: 'faculty' },
];

export default function Login() {
  const [email, setEmail]     = useState('');
  const [password, setPwd]    = useState('');
  const [error, setError]     = useState('');
  const navigate              = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const u = USERS.find(u => u.email === email && u.password === password);
    if (!u) {
      setError('Invalid credentials');
      return;
    }
    navigate(`/${u.role}`);   // push to /student or /scad etc.
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:320,margin:'2em auto'}}>
      <h1>Login</h1>
      <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={e=>setEmail(e.target.value)}
        required 
      /><br/><br/>
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={e=>setPwd(e.target.value)}
        required 
      /><br/><br/>
      <button type="submit">Log In</button>
      {error && <p style={{color:'red'}}>{error}</p>}
    </form>
  );
}

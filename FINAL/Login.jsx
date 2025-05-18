// FINAL/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // CSS is in the same directory

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

    // Basic validation
    if (!credentials.email || !credentials.password) {
      setError('Please fill in all fields');
      return;
    }

    // Check credentials against sample data
    let userType;
    if (credentials.email === 'student@guc.edu.eg' && credentials.password === 'student123') {
      userType = 'student';
    } else if (credentials.email === 'prostudent@guc.edu.eg' && credentials.password === 'pro123') {
      userType = 'pro-student';
    } else if (credentials.email === 'company@guc.edu.eg' && credentials.password === 'company123') {
      userType = 'company';
    } else if (credentials.email === 'faculty@guc.edu.eg' && credentials.password === 'faculty123') {
      userType = 'faculty';
    } else if (credentials.email === 'scad@guc.edu.eg' && credentials.password === 'scad123') {
      userType = 'scad';
    } else {
      setError('Invalid credentials');
      return;
    }

    // Set authentication data
    localStorage.setItem('userType', userType);
    localStorage.setItem('isAuthenticated', 'true');

    // Set user data based on type
    const userData = {
      id: `${userType}123`,
      email: credentials.email,
      type: userType,
      name: userType.charAt(0).toUpperCase() + userType.slice(1) + ' User',
      major: userType === 'student' || userType === 'pro-student' ? 'Computer Science' : undefined,
      semester: userType === 'student' || userType === 'pro-student' ? '6' : undefined,
      skills: userType === 'student' || userType === 'pro-student' ? ['JavaScript', 'React', 'Node.js', 'Python'] : [],
      interests: userType === 'student' || userType === 'pro-student' ? ['Web Development', 'Mobile Apps', 'Machine Learning'] : []
    };
    localStorage.setItem('user', JSON.stringify(userData));

    // Navigate to the appropriate dashboard based on user type
    switch (userType) {
      case 'student':
        navigate('/student');
        break;
      case 'pro-student':
        navigate('/pro-student');
        break;
      case 'company':
        navigate('/company');
        break;
      case 'faculty':
        navigate('/faculty');
        break;
      case 'scad':
        navigate('/scad');
        break;
      default:
        navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome to SCAD Internship Platform</h2>
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
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="sample-credentials">
          <h3>Sample Credentials:</h3>
          <ul>
            <li>Student: student@guc.edu.eg / student123</li>
            <li>Pro Student: prostudent@guc.edu.eg / pro123</li>
            <li>Company: company@guc.edu.eg / company123</li>
            <li>Faculty: faculty@guc.edu.eg / faculty123</li>
            <li>SCAD: scad@guc.edu.eg / scad123</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;


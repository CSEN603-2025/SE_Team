// FINAL/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    // Clear all relevant localStorage items
    localStorage.clear();
    // Navigate to login page
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-brand">
        <i className="fas fa-briefcase"></i>
        <span>SCAD Internship System</span>
      </div>
      {role && (
        <div className="navbar-actions">
          <button onClick={handleLogout} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

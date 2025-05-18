// FINAL/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="navbar">
      <span>SCAD Internship System</span>
      {role && (
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;

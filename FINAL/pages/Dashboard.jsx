import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaFileAlt, FaGlobe, FaGraduationCap, FaBuilding, FaClipboardList, FaComments, FaSearch } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Welcome to your Student Dashboard</h1>

      <div className="dashboard-grid">
        {/* Top Row */}
        <Link to="/profile" className="dashboard-card">
          <FaUser className="card-icon" />
          <span>View/Edit Profile</span>
        </Link>

        <Link to="/applications" className="dashboard-card">
          <FaFileAlt className="card-icon" />
          <span>My Applications</span>
        </Link>

        <Link to="/submit-report" className="dashboard-card">
          <FaClipboardList className="card-icon" />
          <span>Submit Report</span>
        </Link>

        <Link to="/my-internships" className="dashboard-card">
          <FaGlobe className="card-icon" />
          <span>My Internships</span>
        </Link>

        {/* Bottom Row */}
        <Link to="/major-courses" className="dashboard-card">
          <FaGraduationCap className="card-icon" />
          <span>Major Courses</span>
        </Link>

        <Link to="/suggested-companies" className="dashboard-card">
          <FaBuilding className="card-icon" />
          <span>Suggested Companies</span>
        </Link>

        <Link to="/select-major" className="dashboard-card">
          <FaGraduationCap className="card-icon" />
          <span>Select Major & Semester</span>
        </Link>

        <Link to="/company-evaluation" className="dashboard-card">
          <FaComments className="card-icon" />
          <span>Company Evaluation</span>
        </Link>

        {/* Additional Cards */}
        <Link to="/internship-report" className="dashboard-card">
          <FaFileAlt className="card-icon" />
          <span>Internship Report</span>
        </Link>

        <Link to="/course-feedback" className="dashboard-card">
          <FaComments className="card-icon" />
          <span>Course Feedback</span>
        </Link>

        <Link to="/explore-internships" className="dashboard-card">
          <FaSearch className="card-icon" />
          <span>Explore Internships</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard; 
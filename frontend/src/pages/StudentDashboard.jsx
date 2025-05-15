import React from 'react';
import './StudentDashboard.css';
import { Link } from 'react-router-dom';
import {
  FaUserEdit, FaClipboardList, FaFileAlt, FaGraduationCap, FaBuilding,
  FaClipboardCheck, FaComments, FaSearch, FaGlobe, FaBook
} from 'react-icons/fa';

export default function StudentDashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Welcome to your Student Dashboard</h1>

        <div className="dashboard-grid">
          <Link to="/profile" className="dashboard-button"><FaUserEdit /> View/Edit Profile</Link>
          <Link to="/applications" className="dashboard-button"><FaClipboardList /> My Applications</Link>
          <Link to="/submit-report" className="dashboard-button"><FaFileAlt /> Submit Report</Link>

          <Link to="/internships" className="dashboard-button"><FaGlobe /> My Internships</Link>
          <Link to="/courses" className="dashboard-button"><FaBook /> Major Courses</Link>
          <Link to="/suggested-companies" className="dashboard-button"><FaBuilding /> Suggested Companies</Link>

          <Link to="/select-major" className="dashboard-button"><FaGraduationCap /> Select Major & Semester</Link>
          <Link to="/company-evaluation" className="dashboard-button"><FaClipboardCheck /> Company Evaluation</Link>
          <Link to="/internship-report" className="dashboard-button"><FaFileAlt /> Internship Report</Link>

          <Link to="/course-feedback" className="dashboard-button"><FaComments /> Course Feedback</Link>
          <Link to="/explore-internships" className="dashboard-button"><FaSearch /> Explore Internships</Link>
        </div>
      </div>
    </div>
  );
}

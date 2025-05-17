// FINAL/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import StudentDashboard from './StudentDashboard';
import ProStudentDashboard from './ProStudentDashboard';
import CompanyDashboard from './CompanyDashboard';
import FacultyDashboard from './FacultyDashboard';
import ScadDashboard from './ScadDashboard';

import './App.css';
import Sidebar from './components/Sidebar';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/prostudent" element={<ProStudentDashboard />} />
            <Route path="/company" element={<CompanyDashboard />} />
            <Route path="/faculty" element={<FacultyDashboard />} />
            <Route path="/scad" element={<ScadDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './FINAL/Login';
import StudentDashboard from './FINAL/StudentDashboard';
import ProStudentDashboard from './FINAL/ProStudentDashboard';
import CompanyDashboard from './FINAL/CompanyDashboard';
import FacultyDashboard from './FINAL/FacultyDashboard';
import ScadDashboard from './FINAL/ScadDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/prostudent" element={<ProStudentDashboard />} />
        <Route path="/company" element={<CompanyDashboard />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/scad" element={<ScadDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

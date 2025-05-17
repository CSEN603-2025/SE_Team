//src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login               from './pages/Login.jsx';
import StudentDashboard    from './pages/Student/StudentDashboard.jsx';
import ProStudentDashboard from './pages/ProStudent/ProStudentDashboard.jsx';
import ScadDashboard       from './pages/SCAD/ScadDashboard.jsx';
import CompanyDashboard    from './pages/Company/CompanyDashboard.jsx';
import FacultyDashboard    from './pages/Faculty/FacultyDashboard.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<Login />} />
        <Route path="/student"    element={<StudentDashboard />} />
        <Route path="/prostudent" element={<ProStudentDashboard />} />
        <Route path="/scad"       element={<ScadDashboard />} />
        <Route path="/company"    element={<CompanyDashboard />} />
        <Route path="/faculty"    element={<FacultyDashboard />} />
        <Route path="*"            element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

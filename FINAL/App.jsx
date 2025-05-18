import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ─── Core Layout Components ───────────────────────
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// ─── Auth ─────────────────────────────────────────
import Login from "./Login";

// ─── Dashboards by Role ───────────────────────────
import StudentDashboard from "./StudentDashboard";
import ProStudentDashboard from "./ProStudentDashboard";
import CompanyDashboard from "./CompanyDashboard";
import FacultyDashboard from "./FacultyDashboard";
import ScadDashboard from "./ScadDashboard";

// ─── Student Pages ────────────────────────────────
import StudentProfile from "./components/StudentProfile";
import Internships from "./pages/Internships";
import Applications from "./pages/Applications";
import Reports from "./pages/Reports";
import Courses from "./pages/Courses";
import Evaluations from "./pages/Evaluations";

// ─── Pro Student Pages ────────────────────────────
import Assessment from "./pages/Assessment";
import Workshops from "./pages/Workshops";
import ProfileViews from "./pages/ProfileViews";
import Appointments from "./pages/Appointments";
import VideoCall from "./pages/VideoCall";

// ─── Company Pages ────────────────────────────────
import CompanyProfile from "./components/CompanyProfile";
import InternshipPost from "./components/InternshipPost";
import Applicants from "./pages/Applicants";
import CompanyEvaluations from "./pages/Evaluations"; // reuse of same Eval component

// ─── Faculty Pages ────────────────────────────────
import FacultyReports from "./pages/facultyreports";
import StudentList from "./pages/StudentList";

// ─── SCAD Pages ───────────────────────────────────
import ScadCompanies from "./pages/CompanyProfile";
import ScadReports from "./pages/ScadReports";
import Statistics from "./pages/Statistics";
import InternshipRecommendations from './components/InternshipRecommendations';

// Initialize sample data
import initializeData from './data';

function App() {
  useEffect(() => {
    // Initialize sample data when the app starts
    initializeData();
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Login route */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="/student/*"
            element={
              <div className="dashboard-layout">
                <Navbar />
                <Sidebar />
                <div className="main-content">
                  <StudentDashboard />
                </div>
              </div>
            }
          />

          <Route
            path="/pro-student/*"
            element={
              <div className="dashboard-layout">
                <Navbar />
                <Sidebar />
                <div className="main-content">
                  <ProStudentDashboard />
                </div>
              </div>
            }
          />

          <Route
            path="/company/*"
            element={
              <div className="dashboard-layout">
                <Navbar />
                <Sidebar />
                <div className="main-content">
                  <CompanyDashboard />
                </div>
              </div>
            }
          />

          <Route
            path="/faculty/*"
            element={
              <div className="dashboard-layout">
                <Navbar />
                <Sidebar />
                <div className="main-content">
                  <FacultyDashboard />
                </div>
              </div>
            }
          />

          <Route
            path="/scad/*"
            element={
              <div className="dashboard-layout">
                <Navbar />
                <Sidebar />
                <div className="main-content">
                  <ScadDashboard />
                </div>
              </div>
            }
          />

          {/* Redirect any unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

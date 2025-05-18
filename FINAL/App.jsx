import React from "react";
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
import './data/sampleData';

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <div className="main-content">
        <Routes>
          {/* ─── Auth ───────────────────────────────── */}
          <Route path="/" element={<Login />} />

          {/* ─── Dashboards ────────────────────────── */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/pro-student" element={<ProStudentDashboard />} />
          <Route path="/company" element={<CompanyDashboard />} />
          <Route path="/faculty" element={<FacultyDashboard />} />
          <Route path="/scad" element={<ScadDashboard />} />

          {/* ─── Student Routes ─────────────────────── */}
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/internships" element={<Internships />} />
          <Route path="/student/applications" element={<Applications />} />
          <Route path="/student/reports" element={<Reports />} />
          <Route path="/student/courses" element={<Courses />} />
          <Route path="/student/evaluations" element={<Evaluations />} />

          {/* ─── Pro Student Routes ─────────────────── */}
          <Route path="/pro-student/profile" element={<StudentProfile />} />
          <Route path="/pro-student/internships" element={<Internships />} />
          <Route path="/pro-student/applications" element={<Applications />} />
          <Route path="/pro-student/reports" element={<Reports />} />
          <Route path="/pro-student/reports/new" element={<Reports mode="create" />} />
          <Route path="/pro-student/courses" element={<Courses />} />
          <Route path="/pro-student/evaluations" element={<Evaluations />} />
          <Route path="/pro-student/assessment" element={<Assessment />} />
          <Route path="/pro-student/workshops" element={<Workshops />} />
          <Route path="/pro-student/profile-views" element={<ProfileViews />} />
          <Route path="/pro-student/appointments" element={<Appointments />} />
          <Route path="/pro-student/video-call/:appointmentId" element={<VideoCall />} />

          {/* ─── Company Routes ─────────────────────── */}
          <Route path="/company/profile" element={<CompanyProfile />} />
          <Route path="/company/posts" element={<InternshipPost />} />
          <Route path="/company/applicants" element={<Applicants />} />
          <Route path="/company/evaluations" element={<CompanyEvaluations />} />

          {/* ─── Faculty Routes ─────────────────────── */}
          <Route path="/faculty/reports" element={<FacultyReports />} />
          <Route path="/faculty/students" element={<StudentList />} />

          {/* ─── SCAD Routes ────────────────────────── */}
          <Route path="/scad/companies" element={<ScadCompanies />} />
          <Route path="/scad/reports" element={<ScadReports />} />
          <Route path="/scad/statistics" element={<Statistics />} />
          
          {/* Add routes for student profile and recommendations with proper path */}
          <Route path="/student/profile/:studentId" element={<StudentProfile />} />
          <Route path="/student/recommendations/:studentId" element={<InternshipRecommendations />} />

          {/* ─── Redirect to Login if no other route matches ─────────────────── */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

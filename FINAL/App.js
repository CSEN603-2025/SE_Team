import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import Internships from "./pages/Internships";
import Applications from "./pages/Applications";
import Reports from "./pages/Reports";
import Courses from "./pages/Courses";
import Evaluations from "./pages/Evaluations";

// ─── Pro Student Pages ────────────────────────────
import Assessment from "./pages/Assessment";
import Workshops from "./pages/Workshops";

// ─── Company Pages ────────────────────────────────
import InternshipPosts from "./pages/InternshipPosts";
import Applicants from "./pages/Applicants";
import CompanyEvaluations from "./pages/Evaluations"; // reuse of same Eval component

// ─── Faculty Pages ────────────────────────────────
import FacultyReports from "./pages/facultyreports";
import StudentList from "./pages/StudentList";

// ─── SCAD Pages ───────────────────────────────────
import ScadCompanies from "./pages/CompanyProfile";
import ScadReports from "./pages/ScadReports";
import Statistics from "./pages/Statistics";

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>

        {/* ─── Auth ───────────────────────────────── */}
        <Route path="/" element={<Login />} />

        {/* ─── Dashboards ────────────────────────── */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/prostudent" element={<ProStudentDashboard />} />
        <Route path="/company" element={<CompanyDashboard />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/scad" element={<ScadDashboard />} />

        {/* ─── Student Routes ─────────────────────── */}
        <Route path="/student/internships" element={<Internships />} />
        <Route path="/student/applications" element={<Applications />} />
        <Route path="/student/reports" element={<Reports />} />
        <Route path="/student/courses" element={<Courses />} />
        <Route path="/student/evaluations" element={<Evaluations />} />

        {/* ─── Pro Student Routes ─────────────────── */}
        <Route path="/prostudent/assessment" element={<Assessment />} />
        <Route path="/prostudent/workshops" element={<Workshops />} />

        {/* ─── Company Routes ─────────────────────── */}
        <Route path="/company/posts" element={<InternshipPosts />} />
        <Route path="/company/applicants" element={<Applicants />} />
        <Route path="/company/evaluations" element={<CompanyEvaluations />} />

        {/* ─── Faculty Routes ─────────────────────── */}
        <Route path="/faculty/reports" element={<FacultyReports />} />
        <Route path="/faculty/students" element={<StudentList />} />

        {/* ─── SCAD Routes ────────────────────────── */}
        <Route path="/scad/companies" element={<ScadCompanies />} />
        <Route path="/scad/reports" element={<ScadReports />} />
        <Route path="/scad/statistics" element={<Statistics />} />

      </Routes>
    </Router>
  );
}

export default App;

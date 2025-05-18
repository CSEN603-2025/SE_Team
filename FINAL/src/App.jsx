import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Page imports
import Login from './pages/Login'
import StudentDashboard from './pages/dashboards/StudentDashboard'
import CompanyDashboard from './pages/dashboards/CompanyDashboard'
import FacultyDashboard from './pages/dashboards/FacultyDashboard'
import ScadDashboard from './pages/dashboards/ScadDashboard'
import ProStudentDashboard from './pages/dashboards/ProStudentDashboard'

// Student pages
import Profile from './pages/student/Profile'
import Applications from './pages/student/Applications'
import SubmitReport from './pages/student/SubmitReport'
import Internships from './pages/student/Internships'
import Courses from './pages/student/Courses'
import Companies from './pages/student/Companies'
import AcademicInfo from './pages/student/AcademicInfo'
import Evaluation from './pages/student/Evaluation'
import Report from './pages/student/Report'
import Feedback from './pages/student/Feedback'
import ExploreInternships from './pages/student/ExploreInternships'

// Protected Route component
const ProtectedRoute = ({ children, allowedTypes = [] }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  const user = JSON.parse(localStorage.getItem('user'))
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (allowedTypes.length > 0 && !allowedTypes.includes(user?.type)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  )

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true')
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <div className="app">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Login />} />

        {/* Dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company-dashboard"
          element={
            <ProtectedRoute allowedTypes={['company']}>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty-dashboard"
          element={
            <ProtectedRoute allowedTypes={['faculty']}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scad-dashboard"
          element={
            <ProtectedRoute allowedTypes={['scad']}>
              <ScadDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pro-student-dashboard"
          element={
            <ProtectedRoute allowedTypes={['pro-student']}>
              <ProStudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Student routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedTypes={['student', 'pro-student']}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute allowedTypes={['student', 'pro-student']}>
              <Applications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submit-report"
          element={
            <ProtectedRoute allowedTypes={['student', 'pro-student']}>
              <SubmitReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/internships"
          element={
            <ProtectedRoute allowedTypes={['student', 'pro-student']}>
              <Internships />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute allowedTypes={['student', 'pro-student']}>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/companies"
          element={
            <ProtectedRoute allowedTypes={['student', 'pro-student']}>
              <Companies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/academic-info"
          element={
            <ProtectedRoute allowedTypes={['student', 'pro-student']}>
              <AcademicInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/evaluation"
          element={
            <ProtectedRoute allowedTypes={['student', 'pro-student']}>
              <Evaluation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute allowedTypes={['student', 'pro-student']}>
              <Report />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute allowedTypes={['student', 'pro-student']}>
              <Feedback />
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute allowedTypes={['student', 'pro-student']}>
              <ExploreInternships />
            </ProtectedRoute>
          }
        />

        {/* Faculty routes */}
        <Route
          path="/view-reports"
          element={
            <ProtectedRoute allowedTypes={['faculty']}>
              <div>View Reports Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-list"
          element={
            <ProtectedRoute allowedTypes={['faculty']}>
              <div>Student List Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/review-reports"
          element={
            <ProtectedRoute allowedTypes={['faculty']}>
              <div>Review Reports Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/filter-reports"
          element={
            <ProtectedRoute allowedTypes={['faculty']}>
              <div>Filter Reports Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/accept-reports"
          element={
            <ProtectedRoute allowedTypes={['faculty']}>
              <div>Accept Reports Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/flag-reports"
          element={
            <ProtectedRoute allowedTypes={['faculty']}>
              <div>Flag Reports Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/submit-comments"
          element={
            <ProtectedRoute allowedTypes={['faculty']}>
              <div>Submit Comments Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/search-reports"
          element={
            <ProtectedRoute allowedTypes={['faculty']}>
              <div>Search Reports Page</div>
            </ProtectedRoute>
          }
        />

        {/* Company routes */}
        <Route
          path="/post-internship"
          element={
            <ProtectedRoute allowedTypes={['company']}>
              <div>Post Internship Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-applications"
          element={
            <ProtectedRoute allowedTypes={['company']}>
              <div>Manage Applications Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/internship-reports"
          element={
            <ProtectedRoute allowedTypes={['company']}>
              <div>Internship Reports Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/performance"
          element={
            <ProtectedRoute allowedTypes={['company']}>
              <div>Performance Analytics Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/current-interns"
          element={
            <ProtectedRoute allowedTypes={['company']}>
              <div>Current Interns Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/evaluations"
          element={
            <ProtectedRoute allowedTypes={['company']}>
              <div>Evaluations Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company-profile"
          element={
            <ProtectedRoute allowedTypes={['company']}>
              <div>Company Profile Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/search-students"
          element={
            <ProtectedRoute allowedTypes={['company']}>
              <div>Search Students Page</div>
            </ProtectedRoute>
          }
        />

        {/* SCAD routes */}
        <Route
          path="/manage-students"
          element={
            <ProtectedRoute allowedTypes={['scad']}>
              <div>Manage Students Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/partner-companies"
          element={
            <ProtectedRoute allowedTypes={['scad']}>
              <div>Partner Companies Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/internship-programs"
          element={
            <ProtectedRoute allowedTypes={['scad']}>
              <div>Internship Programs Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute allowedTypes={['scad']}>
              <div>Analytics & Reports Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty-management"
          element={
            <ProtectedRoute allowedTypes={['scad']}>
              <div>Faculty Management Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/templates"
          element={
            <ProtectedRoute allowedTypes={['scad']}>
              <div>Document Templates Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedTypes={['scad']}>
              <div>System Settings Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/advanced-search"
          element={
            <ProtectedRoute allowedTypes={['scad']}>
              <div>Advanced Search Page</div>
            </ProtectedRoute>
          }
        />

        {/* ProStudent routes */}
        <Route
          path="/academic-progress"
          element={
            <ProtectedRoute allowedTypes={['pro-student']}>
              <div>Academic Progress Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute allowedTypes={['pro-student']}>
              <div>Professional Projects Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/portfolio"
          element={
            <ProtectedRoute allowedTypes={['pro-student']}>
              <div>Portfolio Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/skills"
          element={
            <ProtectedRoute allowedTypes={['pro-student']}>
              <div>Skills Development Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute allowedTypes={['pro-student']}>
              <div>Schedule Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/network"
          element={
            <ProtectedRoute allowedTypes={['pro-student']}>
              <div>Professional Network Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/certifications"
          element={
            <ProtectedRoute allowedTypes={['pro-student']}>
              <div>Certifications Page</div>
            </ProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App 
import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import { ToastProvider } from './components/ToastProvider'
import { NotificationProvider } from './components/NotificationProvider'

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
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (allowedTypes.length > 0 && !allowedTypes.includes(user?.type)) {
    return <Navigate to="/dashboard" replace />
  }

  return <ErrorBoundary>{children}</ErrorBoundary>
}

import ManageStudents from './pages/scad/ManageStudents';
import PartnerCompanies from './pages/scad/PartnerCompanies';
import InternshipPrograms from './pages/scad/InternshipPrograms';
import Analytics from './pages/scad/Analytics';
import FacultyManagement from './pages/scad/FacultyManagement';
import DocumentTemplates from './pages/scad/DocumentTemplates';
import SystemSettings from './pages/scad/SystemSettings';
import AdvancedSearch from './pages/scad/AdvancedSearch';
import PostInternship from '../pages/PostInternship';
import ManageApplications from '../pages/ManageApplications';
import InternshipReports from '../pages/InternshipReports';
import Performance from '../pages/Performance';
import CurrentInterns from '../pages/CurrentInterns';
import Evaluations from '../pages/Evaluations';
import CompanyProfile from '../pages/CompanyProfile';
import SearchStudents from '../pages/SearchStudents';

// Pro Student feature pages
import ProStudentProfile from './pages/prostudent/Profile';
import Portfolio from './pages/prostudent/Portfolio';
import Skills from './pages/prostudent/Skills';
import Certifications from './pages/prostudent/Certifications';
import Schedule from './pages/prostudent/Schedule';
import Network from './pages/prostudent/Network';
import Projects from './pages/prostudent/Projects';
import MyInternships from './pages/prostudent/MyInternships';
import Reports from './pages/prostudent/Reports';
import CompanyEvaluation from './pages/prostudent/CompanyEvaluation';
import Notifications from './pages/prostudent/Notifications';
import OnlineAssessments from './pages/prostudent/OnlineAssessments';
import Workshops from './pages/prostudent/Workshops';
import Appointments from './pages/prostudent/Appointments';
import ProStudentSettings from './pages/prostudent/Settings';
import AcademicProgress from '../pages/AcademicProgress';
import ViewReports from './pages/faculty/ViewReports';
import StudentList from './pages/faculty/StudentList';
import ReviewReports from './pages/faculty/ReviewReports';
import FilterReports from './pages/faculty/FilterReports';
import AcceptReports from './pages/faculty/AcceptReports';
import FlagReports from './pages/faculty/FlagReports';
import SubmitComments from './pages/faculty/SubmitComments';
import SearchReports from './pages/faculty/SearchReports';

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
    <NotificationProvider>
      <ToastProvider>
        <ErrorBoundary>
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
                    <ViewReports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student-list"
                element={
                  <ProtectedRoute allowedTypes={['faculty']}>
                    <StudentList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/review-reports"
                element={
                  <ProtectedRoute allowedTypes={['faculty']}>
                    <ReviewReports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/filter-reports"
                element={
                  <ProtectedRoute allowedTypes={['faculty']}>
                    <FilterReports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/accept-reports"
                element={
                  <ProtectedRoute allowedTypes={['faculty']}>
                    <AcceptReports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/flag-reports"
                element={
                  <ProtectedRoute allowedTypes={['faculty']}>
                    <FlagReports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/submit-comments"
                element={
                  <ProtectedRoute allowedTypes={['faculty']}>
                    <SubmitComments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/search-reports"
                element={
                  <ProtectedRoute allowedTypes={['faculty']}>
                    <SearchReports />
                  </ProtectedRoute>
                }
              />

              {/* Company routes */}
              <Route
                path="/post-internship"
                element={
                  <ProtectedRoute allowedTypes={['company']}>
                    <PostInternship />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manage-applications"
                element={
                  <ProtectedRoute allowedTypes={['company']}>
                    <ManageApplications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/internship-reports"
                element={
                  <ProtectedRoute allowedTypes={['company']}>
                    <InternshipReports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/performance"
                element={
                  <ProtectedRoute allowedTypes={['company']}>
                    <Performance />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/current-interns"
                element={
                  <ProtectedRoute allowedTypes={['company']}>
                    <CurrentInterns />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/evaluations"
                element={
                  <ProtectedRoute allowedTypes={['company']}>
                    <Evaluations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/company-profile"
                element={
                  <ProtectedRoute allowedTypes={['company']}>
                    <CompanyProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/search-students"
                element={
                  <ProtectedRoute allowedTypes={['company']}>
                    <SearchStudents />
                  </ProtectedRoute>
                }
              />

              {/* SCAD routes */}
              <Route
                path="/manage-students"
                element={
                  <ProtectedRoute allowedTypes={['scad']}>
                    <ManageStudents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/partner-companies"
                element={
                  <ProtectedRoute allowedTypes={['scad']}>
                    <PartnerCompanies />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/internship-programs"
                element={
                  <ProtectedRoute allowedTypes={['scad']}>
                    <InternshipPrograms />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute allowedTypes={['scad']}>
                    <Analytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/faculty-management"
                element={
                  <ProtectedRoute allowedTypes={['scad']}>
                    <FacultyManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/templates"
                element={
                  <ProtectedRoute allowedTypes={['scad']}>
                    <DocumentTemplates />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute allowedTypes={['scad']}>
                    <SystemSettings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/advanced-search"
                element={
                  <ProtectedRoute allowedTypes={['scad']}>
                    <AdvancedSearch />
                  </ProtectedRoute>
                }
              />

              {/* ProStudent routes */}
              <Route
                path="/academic-progress"
                element={
                  <ProtectedRoute allowedTypes={['pro-student']}>
                    <AcademicProgress />
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

              {/* Pro Student feature pages */}
              <Route
                path="/prostudent/profile"
                element={
                  <ProtectedRoute allowedTypes={['pro-student']}>
                    <ProStudentProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prostudent/portfolio"
                element={
                  <ProtectedRoute allowedTypes={['pro-student']}>
                    <Portfolio />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prostudent/skills"
                element={
                  <ProtectedRoute allowedTypes={['pro-student']}>
                    <Skills />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prostudent/certifications"
                element={
                  <ProtectedRoute allowedTypes={['pro-student']}>
                    <Certifications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prostudent/schedule"
                element={
                  <ProtectedRoute allowedTypes={['pro-student']}>
                    <Schedule />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prostudent/network"
                element={
                  <ProtectedRoute allowedTypes={['pro-student']}>
                    <Network />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prostudent/projects"
                element={
                  <ProtectedRoute allowedTypes={['pro-student']}>
                    <Projects />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prostudent/myinternships"
                element={
                  <ProtectedRoute allowedTypes={['pro-student']}>
                    <MyInternships />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prostudent/reports"
                element={
                  <ProtectedRoute allowedTypes={['pro-student']}>
                    <Reports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prostudent/companyevaluation"
                element={
                  <ProtectedRoute allowedTypes={['pro-student']}>
                    <CompanyEvaluation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prostudent/notifications"
                element={
                  <ProtectedRoute allowedTypes={['pro-student']}>
                    <Notifications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prostudent/onlineassessments"
                element={
                  <ProtectedRoute allowedTypes={['pro-student']}>
                    <OnlineAssessments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prostudent/workshops"
                element={
                  <ProtectedRoute allowedTypes={['pro-student']}>
                    <Workshops />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prostudent/appointments"
                element={
                  <ProtectedRoute allowedTypes={['pro-student']}>
                    <Appointments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prostudent/settings"
                element={
                  <ProtectedRoute allowedTypes={['pro-student']}>
                    <ProStudentSettings />
                  </ProtectedRoute>
                }
              />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </ErrorBoundary>
      </ToastProvider>
    </NotificationProvider>
  )
}

export default App 
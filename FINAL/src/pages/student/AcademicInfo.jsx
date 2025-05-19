import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FaGraduationCap } from 'react-icons/fa';

const AcademicInfo = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const academicInfo = {
    gpa: 3.7,
    totalCredits: 120,
    completedCredits: 90,
    major: user.major,
    semester: user.semester,
    advisor: 'Dr. Smith',
    status: 'Good Standing'
  };

  return (
    <DashboardLayout title="Academic Information">
      <div className="profile-card">
        <div className="profile-header">
          <FaGraduationCap size={40} style={{ marginRight: 16, color: '#4F8A8B' }} />
          <div>
            <h2 style={{ margin: 0 }}>Academic Information</h2>
            <p style={{ margin: 0, color: '#888' }}>{user.name}</p>
          </div>
        </div>
        <div className="profile-section">
          <h3>General Information</h3>
          <p><strong>Major:</strong> {academicInfo.major}</p>
          <p><strong>Semester:</strong> {academicInfo.semester}</p>
          <p><strong>Academic Advisor:</strong> {academicInfo.advisor}</p>
          <p><strong>Status:</strong> {academicInfo.status}</p>
        </div>
        <div className="profile-section">
          <h3>Academic Progress</h3>
          <p><strong>GPA:</strong> {academicInfo.gpa}</p>
          <p><strong>Total Credits Required:</strong> {academicInfo.totalCredits}</p>
          <p><strong>Completed Credits:</strong> {academicInfo.completedCredits}</p>
          <p><strong>Remaining Credits:</strong> {academicInfo.totalCredits - academicInfo.completedCredits}</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AcademicInfo; 
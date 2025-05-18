import React from 'react';

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
    <div className="win98-container">
      <div className="title-bar">
        <div className="title-bar-text">Academic Information</div>
      </div>
      
      <div className="window-body">
        <div className="academic-info">
          <div className="info-section">
            <h3>General Information</h3>
            <p><strong>Major:</strong> {academicInfo.major}</p>
            <p><strong>Semester:</strong> {academicInfo.semester}</p>
            <p><strong>Academic Advisor:</strong> {academicInfo.advisor}</p>
            <p><strong>Status:</strong> {academicInfo.status}</p>
          </div>

          <div className="info-section">
            <h3>Academic Progress</h3>
            <p><strong>GPA:</strong> {academicInfo.gpa}</p>
            <p><strong>Total Credits Required:</strong> {academicInfo.totalCredits}</p>
            <p><strong>Completed Credits:</strong> {academicInfo.completedCredits}</p>
            <p><strong>Remaining Credits:</strong> {academicInfo.totalCredits - academicInfo.completedCredits}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicInfo; 
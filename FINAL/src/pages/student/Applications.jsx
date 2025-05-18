import React from 'react';
import { applications } from '../../data/dummyData';

const Applications = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userApplications = applications.filter(app => app.studentId === user.id);

  return (
    <div>
      <h1>My Applications</h1>
      <div className="applications-list">
        {userApplications.map(app => (
          <div key={app.id} className="application-card">
            <h3>Application #{app.id}</h3>
            <p>Status: {app.status}</p>
            <p>Applied Date: {app.appliedDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications; 
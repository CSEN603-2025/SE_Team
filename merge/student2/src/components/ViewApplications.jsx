import React from 'react';
import './ViewApplications.css';

const dummyApplications = [
  {
    id: 1,
    studentName: "Sarah Mostafa",
    company: "Vodafone",
    status: "Approved",
  },
  {
    id: 2,
    studentName: "Mohamed Tarek",
    company: "IBM",
    status: "Pending",
  },
  {
    id: 3,
    studentName: "Laila Samir",
    company: "Microsoft",
    status: "Rejected",
  },
];

const ViewApplications = () => {
  return (
    <div className="view-container">
      <h2 className="page-title">Submitted Internship Applications</h2>
      <div className="application-list">
        {dummyApplications.map(app => (
          <div key={app.id} className={`application-card ${app.status.toLowerCase()}`}>
            <div className="card-header">
              <span className="student-name">{app.studentName}</span>
              <span className="application-status">{app.status}</span>
            </div>
            <div className="card-body">
              <p><strong>Company:</strong> {app.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewApplications;

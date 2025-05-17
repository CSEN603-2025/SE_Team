import React from 'react';
import './ProfessionalViewPage.css';

const dummyData = [
  { id: 1, title: 'Internship at Vodafone', date: '2025-04-12', status: 'Approved' },
  { id: 2, title: 'Internship at Microsoft', date: '2025-04-08', status: 'Pending' },
  { id: 3, title: 'Internship at Orange', date: '2025-03-30', status: 'Rejected' },
];

const ProfessionalViewPage = () => {
  return (
    <div className="professional-container">
      <header className="header">
        <h1>My Internship Submissions</h1>
        <p className="subtitle">Track the status of your internship applications</p>
      </header>

      <section className="card-section">
        {dummyData.map((item) => (
          <div key={item.id} className={`card ${item.status.toLowerCase()}`}>
            <div className="card-header">
              <h2>{item.title}</h2>
              <span className="status">{item.status}</span>
            </div>
            <div className="card-body">
              <p><strong>Submission Date:</strong> {item.date}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProfessionalViewPage;

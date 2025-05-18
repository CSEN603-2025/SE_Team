import React from 'react';

const Companies = () => {
  const dummyCompanies = [
    {
      id: 1,
      name: 'Tech Corp',
      industry: 'Software Development',
      openPositions: 3,
      location: 'Cairo'
    },
    {
      id: 2,
      name: 'Data Systems',
      industry: 'Data Analytics',
      openPositions: 2,
      location: 'Alexandria'
    }
  ];

  return (
    <div className="win98-container">
      <div className="title-bar">
        <div className="title-bar-text">Partner Companies</div>
      </div>
      
      <div className="window-body">
        <div className="companies-list">
          {dummyCompanies.map(company => (
            <div key={company.id} className="company-card">
              <h3>{company.name}</h3>
              <p><strong>Industry:</strong> {company.industry}</p>
              <p><strong>Location:</strong> {company.location}</p>
              <p><strong>Open Positions:</strong> {company.openPositions}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies; 
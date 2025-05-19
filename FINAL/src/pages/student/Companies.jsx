import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FaBuilding } from 'react-icons/fa';

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
    <DashboardLayout title="Partner Companies">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <FaBuilding size={28} style={{ marginRight: 12, color: '#4F8A8B' }} />
        <h2 style={{ margin: 0 }}>Partner Companies</h2>
      </div>
      <table className="modern-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Industry</th>
            <th>Location</th>
            <th>Open Positions</th>
          </tr>
        </thead>
        <tbody>
          {dummyCompanies.map(company => (
            <tr key={company.id}>
              <td>{company.name}</td>
              <td>{company.industry}</td>
              <td>{company.location}</td>
              <td>{company.openPositions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default Companies; 
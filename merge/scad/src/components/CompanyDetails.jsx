import React from 'react';
import './CompanyDetails.css';

export default function CompanyDetails({ company, onBack }) {
  return (
    <div className="company-details">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h2>{company.name}</h2>
      <p><strong>Industry:</strong> {company.industry}</p>
      <p><strong>Status:</strong> {company.status}</p>
      <p><strong>Contact:</strong> {company.contact}</p>
      <p><strong>Description:</strong> {company.description}</p>
    </div>
  );
}

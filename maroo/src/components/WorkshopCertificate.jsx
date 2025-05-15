// WorkshopCertificate.jsx
import React from 'react';
import './WorkshopCertificate.css';

const WorkshopCertificate = ({ workshop }) => {
  const safeWorkshop = workshop || {
    title: 'Untitled Workshop',
    date: 'Unknown Date',
  };

  const handleDownload = () => {
    alert('Certificate download would start now');
  };

  return (
    <div className="workshop-certificate">
      <h3>Certificate of Attendance</h3>
      <div className="certificate-preview">
        <div className="certificate-content">
          <h4>Certificate of Completion</h4>
          <p>This is to certify that</p>
          <p className="student-name">[Your Name]</p>
          <p>has successfully attended the workshop</p>
          <p className="workshop-title">{safeWorkshop.title}</p>
          <p>on {safeWorkshop.date}</p>
          <div className="signatures">
            <div>
              <p>_________________________</p>
              <p>Workshop Presenter</p>
            </div>
            <div>
              <p>_________________________</p>
              <p>SCAD Office</p>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleDownload}>Download Certificate</button>
    </div>
  );
};

export default WorkshopCertificate;

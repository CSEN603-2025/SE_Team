// src/components/DocumentList.jsx
import React, { useState } from 'react';
import { initialDocuments } from '../data';
import './DocumentList.css';

export default function DocumentList() {
  const [feedback, setFeedback] = useState(null);

  return (
    <div className="documents-list">
      <h2>SCAD Documents</h2>
      {feedback && <div className="feedback" role="status">{feedback}</div>}
      <ul>
        {initialDocuments.length > 0 ? (
          initialDocuments.map(doc => (
            <li key={doc.id} className="document-item">
              <div className="doc-info">
                <span className="doc-icon" aria-hidden="true">📄</span>
                <span className="doc-name">{doc.name}</span>
              </div>
              <div className="doc-actions">
                <a
                  href={doc.url}
                  download
                  className="download-btn"
                  aria-label={`Download ${doc.name}`}
                  onClick={() => {
                    setFeedback('Download started.');
                    setTimeout(() => setFeedback(null), 1500);
                  }}
                >
                  Download PDF
                </a>
              </div>
            </li>
          ))
        ) : (
          <li className="empty-state">
            <div className="empty-icon" aria-hidden="true">📁</div>
            <div>No documents available.</div>
          </li>
        )}
      </ul>
    </div>
  );
}

import React from 'react';
import '../styles/ConfirmDialog.css';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog win98-container">
        <div className="title-bar">
          <div className="title-bar-text">{title}</div>
          <div className="title-bar-controls">
            <button className="win98-button" onClick={onCancel} aria-label="Close">X</button>
          </div>
        </div>
        <div className="window-body">
          <p>{message}</p>
          <div className="button-group">
            <button className="win98-button" onClick={onConfirm}>Yes</button>
            <button className="win98-button" onClick={onCancel}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog; 
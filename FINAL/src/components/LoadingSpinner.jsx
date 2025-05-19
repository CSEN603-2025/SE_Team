import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import '../styles/LoadingSpinner.css';

const LoadingSpinner = ({ size = 'md', fullScreen = false }) => {
  const spinnerClass = `spinner ${size} ${fullScreen ? 'fullscreen' : ''}`;
  
  return (
    <div className={spinnerClass}>
      <FaSpinner className="spinner-icon" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner; 
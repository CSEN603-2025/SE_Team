import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const userType = localStorage.getItem('userType');

  if (!user || !userType) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user is trying to access the correct route for their type
  const currentPath = location.pathname.split('/')[1]; // Get first part of path
  if (currentPath !== userType) {
    // Redirect to their correct dashboard if trying to access wrong route
    return <Navigate to={`/${userType}`} replace />;
  }

  return children;
};

export default ProtectedRoute; 
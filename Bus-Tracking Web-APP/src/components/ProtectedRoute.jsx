import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
//   const userType = localStorage.getItem('userType'); // admin, student, driver
const userType='admin';

  if (!userType || userType !== allowedRole) {
    // If the user is not logged in or doesn't have the correct role, redirect to error page
    return <Navigate to="/error" replace />;
  }

  return children;
};

export default ProtectedRoute;

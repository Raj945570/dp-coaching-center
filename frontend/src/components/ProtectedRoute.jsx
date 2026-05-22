import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, tokenKey = 'token', redirectTo = '/login' }) => {
  const token = localStorage.getItem(tokenKey);
  
  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;

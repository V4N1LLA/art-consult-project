// frontend/src/components/ProtectedRoute.tsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const auth = useContext(AuthContext);
  if (!auth?.user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loader from './common/Loader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, checkAuth } = useAuth();

  useEffect(() => {
    // Check auth only when protected route is accessed
    if (!isAuthenticated && !loading) {
      checkAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Loading..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;

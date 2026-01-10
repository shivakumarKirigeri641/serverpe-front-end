import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * AdminProtectedRoute - Protects admin-only routes
 * Checks both authentication and admin status
 * Redirects non-authenticated users to /auth
 * Redirects authenticated non-admin users to /dashboard
 */
const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, checkAuth, loading } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!isAuthenticated) {
        await checkAuth();
      }
      setIsChecking(false);
    };

    verifyAuth();
  }, [isAuthenticated, checkAuth]);

  // Show loading spinner while checking authentication
  if (loading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="text-center">
          <div className="spinner w-16 h-16 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Redirect to dashboard if authenticated but not admin
  if (!isAdmin) {
    return (
      <Navigate 
        to="/dashboard" 
        replace 
        state={{ 
          error: 'Admin access required. You do not have permission to access the admin portal.' 
        }} 
      />
    );
  }

  // User is authenticated and admin - render the protected content
  return children;
};

export default AdminProtectedRoute;

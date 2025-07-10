import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RoleProtectedRoute = ({ children, allowedRoles = [], requireAuth = true, redirectTo = "/auth/login" }) => {
  const { isAuthenticated, userProfile, loading } = useAuth();
  const location = useLocation();

  // Show loading state while authentication is being checked
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-azellar-light via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-azellar-teal border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if authentication is required and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (allowedRoles.length > 0 && userProfile) {
    const hasRequiredRole = allowedRoles.includes(userProfile.role);
    if (!hasRequiredRole) {
      // Redirect based on user role
      if (userProfile.role === 'admin') {
        return <Navigate to="/admin" replace />;
      } else if (userProfile.role === 'client') {
        return <Navigate to="/support" replace />;
      } else if (userProfile.role === 'student') {
        return <Navigate to="/dashboard" replace />;
      } else {
        return <Navigate to="/" replace />;
      }
    }
  }

  // If all checks pass, render the protected component
  return children;
};

export default RoleProtectedRoute;
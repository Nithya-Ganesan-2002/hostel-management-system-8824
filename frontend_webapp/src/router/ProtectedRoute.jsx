import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../modules/auth/AuthContext';

/**
 * PUBLIC_INTERFACE
 * ProtectedRoute wraps child elements to enforce authentication and role authorization.
 * Params:
 * - allowedRoles: array of roles allowed to access the route
 * Children:
 * - The component to render when access is permitted
 * Returns: element or Navigate redirect to /login
 */
function ProtectedRouteComponent({ allowedRoles = [], children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Not authenticated: redirect to login preserving target location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Authenticated but not authorized: send to landing
    return <Navigate to="/" replace />;
  }

  return children;
}

// PUBLIC_INTERFACE
export const ProtectedRoute = ProtectedRouteComponent;
export default ProtectedRouteComponent;

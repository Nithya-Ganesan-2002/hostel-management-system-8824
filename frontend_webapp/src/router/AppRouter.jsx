import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../screens/LandingPage';
import LoginPage from '../screens/auth/LoginPage';
import SignupPage from '../screens/auth/SignupPage';
import StudentLayout from '../screens/layouts/StudentLayout';
import AdminLayout from '../screens/layouts/AdminLayout';
import DashboardHome from '../screens/dashboard/DashboardHome';
import { ProtectedRoute } from './ProtectedRoute';
import Rooms from '../screens/student/Rooms';
import Applications from '../screens/student/Applications';
import Complaints from '../screens/student/Complaints';
import Payments from '../screens/student/Payments';
import RoomsAdmin from '../screens/admin/RoomsAdmin';
import ComplaintsAdmin from '../screens/admin/ComplaintsAdmin';
import PaymentsAdmin from '../screens/admin/PaymentsAdmin';

/**
 * PUBLIC_INTERFACE
 * AppRouter sets up top-level routes for the application, including public and protected routes.
 * - Public: Landing, Login, Signup
 * - Protected: Student and Admin portals with nested pages
 */
export default function AppRouter() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Student portal - protected */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome role="student" />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="applications" element={<Applications />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="payments" element={<Payments />} />
      </Route>

      {/* Admin portal - protected */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome role="admin" />} />
        <Route path="rooms" element={<RoomsAdmin />} />
        <Route path="complaints" element={<ComplaintsAdmin />} />
        <Route path="payments" element={<PaymentsAdmin />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

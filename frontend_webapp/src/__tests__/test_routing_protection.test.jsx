import React from 'react';
import { screen, act } from '@testing-library/react';
import AppRouter from '../router/AppRouter';
import { renderWithProviders, resetMockStorage } from '../test-utils/renderWithProviders';
import { AuthProvider } from '../modules/auth/AuthContext';

describe('Protected routes', () => {
  beforeEach(() => {
    resetMockStorage();
  });

  test('unauthenticated user is redirected to /login for /student', async () => {
    renderWithProviders(<AppRouter />, { routeEntries: ['/student'] });
    // Wait effect cycles
    await act(async () => {});
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
  });

  test('student cannot access /admin and is redirected to landing', async () => {
    // Pre-set a student user in storage
    localStorage.setItem('hms_user', JSON.stringify({ id: '2', email: 'student@hostel.test', role: 'student', name: 'Student' }));
    renderWithProviders(<AppRouter />, { routeEntries: ['/admin'] });
    await act(async () => {});
    // Should land on landing page content
    expect(screen.getByText(/Modern Hostel Management/i)).toBeInTheDocument();
  });

  test('student can access /student and see dashboard', async () => {
    localStorage.setItem('hms_user', JSON.stringify({ id: '2', email: 'student@hostel.test', role: 'student', name: 'Student' }));
    renderWithProviders(<AppRouter />, { routeEntries: ['/student'] });
    await act(async () => {});
    // Dashboard header is rendered within Student layout path index
    expect(screen.getByText(/Student Dashboard/i)).toBeInTheDocument();
  });

  test('admin can access /admin', async () => {
    localStorage.setItem('hms_user', JSON.stringify({ id: '1', email: 'admin@hostel.test', role: 'admin', name: 'Admin' }));
    renderWithProviders(<AppRouter />, { routeEntries: ['/admin'] });
    await act(async () => {});
    expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
  });
});

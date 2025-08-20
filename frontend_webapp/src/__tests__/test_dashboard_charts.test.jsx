import React from 'react';
import { screen, act } from '@testing-library/react';
import AppRouter from '../router/AppRouter';
import { renderWithProviders, resetMockStorage } from '../test-utils/renderWithProviders';

describe('Dashboard charts', () => {
  beforeEach(() => {
    resetMockStorage();
    // Log in as admin to reach /admin dashboard
    localStorage.setItem('hms_user', JSON.stringify({ id: '1', email: 'admin@hostel.test', role: 'admin', name: 'Admin User' }));
  });

  test('PieChart and LineChart render', async () => {
    renderWithProviders(<AppRouter />, { routeEntries: ['/admin'] });
    await act(async () => {});

    // Basic smoke checks: titles and some SVG presence
    expect(screen.getByText(/Payments/i)).toBeInTheDocument();
    expect(screen.getByText(/Occupancy/i)).toBeInTheDocument();

    // Recharts renders svg; query for svg in cards
    const svgs = document.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });
});

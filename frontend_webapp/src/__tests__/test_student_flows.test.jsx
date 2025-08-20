import React from 'react';
import { screen, fireEvent, act, within } from '@testing-library/react';
import AppRouter from '../router/AppRouter';
import { renderWithProviders, resetMockStorage } from '../test-utils/renderWithProviders';

describe('Student flows', () => {
  beforeEach(() => {
    resetMockStorage();
    // Seed default mock DB via dataService on demand
    // Log in as student
    localStorage.setItem('hms_user', JSON.stringify({ id: '2', email: 'student@hostel.test', role: 'student', name: 'Student User' }));
  });

  test('Apply for a room from Rooms page shows toast', async () => {
    renderWithProviders(<AppRouter />, { routeEntries: ['/student/rooms'] });
    await act(async () => {});
    // Find first Apply button that is not disabled (room not full)
    const applyButtons = screen.getAllByRole('button', { name: /apply|full/i });
    const activeApply = applyButtons.find(btn => btn.textContent.toLowerCase().includes('apply'));
    expect(activeApply).toBeTruthy();
    fireEvent.click(activeApply);
    // Toast should appear
    const toast = await screen.findByText(/Application submitted/i);
    expect(toast).toBeInTheDocument();
  });

  test('Submit a complaint adds to list and shows toast', async () => {
    renderWithProviders(<AppRouter />, { routeEntries: ['/student/complaints'] });
    await act(async () => {});
    const input = screen.getByPlaceholderText(/describe your issue/i);
    fireEvent.change(input, { target: { value: 'Water leakage in room 101' } });
    const submit = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submit);
    // Toast + table row
    expect(await screen.findByText(/Complaint submitted/i)).toBeInTheDocument();
    expect(await screen.findByText(/Water leakage/i)).toBeInTheDocument();
  });
});

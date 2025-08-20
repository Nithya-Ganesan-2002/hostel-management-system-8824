import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import AppRouter from '../router/AppRouter';
import { renderWithProviders, resetMockStorage } from '../test-utils/renderWithProviders';

describe('Admin flows', () => {
  beforeEach(() => {
    resetMockStorage();
    localStorage.setItem('hms_user', JSON.stringify({ id: '1', email: 'admin@hostel.test', role: 'admin', name: 'Admin User' }));
  });

  test('RoomsAdmin: add, edit, and delete room', async () => {
    renderWithProviders(<AppRouter />, { routeEntries: ['/admin/rooms'] });
    await act(async () => {});

    // Add Room
    fireEvent.click(screen.getByRole('button', { name: /add room/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const numberInput = screen.getByLabelText(/room number/i);
    const typeInput = screen.getByLabelText(/^type$/i);
    const capacityInput = screen.getByLabelText(/capacity/i);
    const occupiedInput = screen.getByLabelText(/occupied/i);

    fireEvent.change(numberInput, { target: { value: '301' } });
    fireEvent.change(typeInput, { target: { value: 'Single' } });
    fireEvent.change(capacityInput, { target: { value: '1' } });
    fireEvent.change(occupiedInput, { target: { value: '0' } });

    fireEvent.click(screen.getByRole('button', { name: /create/i }));
    expect(await screen.findByText(/Room added/i)).toBeInTheDocument();
    expect(screen.getByText('301')).toBeInTheDocument();

    // Edit first listed room
    const editBtns = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editBtns[0]);
    const capLabel = screen.getByLabelText(/capacity/i);
    fireEvent.change(capLabel, { target: { value: '2' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(await screen.findByText(/Room updated/i)).toBeInTheDocument();

    // Delete a room
    const delBtns = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(delBtns[0]);
    expect(await screen.findByText(/Room deleted/i)).toBeInTheDocument();
  });

  test('PaymentsAdmin: add, edit, delete payment', async () => {
    renderWithProviders(<AppRouter />, { routeEntries: ['/admin/payments'] });
    await act(async () => {});

    // Add Payment
    fireEvent.click(screen.getByRole('button', { name: /add payment/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/^student$/i), { target: { value: 'Student User' } });
    fireEvent.change(screen.getByLabelText(/^amount$/i), { target: { value: '500' } });
    fireEvent.change(screen.getByLabelText(/^status$/i), { target: { value: 'Pending' } });
    // date prefilled, keep as-is
    fireEvent.click(screen.getByRole('button', { name: /create/i }));
    expect(await screen.findByText(/Payment added/i)).toBeInTheDocument();
    expect(screen.getAllByText(/\$500/).length).toBeGreaterThan(0);

    // Edit payment
    const editBtns = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editBtns[0]);
    fireEvent.change(screen.getByLabelText(/^amount$/i), { target: { value: '650' } });
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));
    expect(await screen.findByText(/Payment updated/i)).toBeInTheDocument();
    expect(screen.getAllByText(/\$650/).length).toBeGreaterThan(0);

    // Delete payment
    const delBtns = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(delBtns[0]);
    expect(await screen.findByText(/Payment deleted/i)).toBeInTheDocument();
  });
});

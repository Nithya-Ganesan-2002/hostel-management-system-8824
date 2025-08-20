import React from 'react';
import { screen } from '@testing-library/react';
import AppRouter from '../router/AppRouter';
import { renderWithProviders, resetMockStorage } from '../test-utils/renderWithProviders';

describe('Pages smoke tests', () => {
  beforeEach(() => {
    resetMockStorage();
  });

  test('Landing page renders headline and CTA links', async () => {
    renderWithProviders(<AppRouter />, { routeEntries: ['/'] });
    expect(screen.getByText(/Modern Hostel Management/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /get started/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /already have an account/i })).toBeInTheDocument();
  });

  test('Login page renders form fields', async () => {
    renderWithProviders(<AppRouter />, { routeEntries: ['/login'] });
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
  });

  test('Signup page renders form fields', async () => {
    renderWithProviders(<AppRouter />, { routeEntries: ['/signup'] });
    expect(screen.getByText(/Create your account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
  });
});

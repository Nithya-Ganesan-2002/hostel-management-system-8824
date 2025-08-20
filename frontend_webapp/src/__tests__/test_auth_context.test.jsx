import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../modules/auth/AuthContext';
import { resetMockStorage } from '../test-utils/renderWithProviders';

function TestConsumer() {
  const { user, login, signup, logout, loading, error } = useAuth();
  return (
    <div>
      <div data-testid="loading">{String(loading)}</div>
      <div data-testid="user">{user ? user.email : ''}</div>
      <div data-testid="error">{error}</div>
      <button onClick={() => login('admin@hostel.test', 'admin123', 'admin')}>login-ok</button>
      <button onClick={() => login('bad@hostel.test', 'nope', 'student')}>login-fail</button>
      <button onClick={() => signup({ email: 'new@hostel.test', password: 'p', name: 'N', role: 'student' })}>signup</button>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    resetMockStorage();
    // trigger default seeders by importing services implicitly via provider usage
  });

  test('login success updates user and persists', async () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    expect(screen.getByTestId('loading').textContent).toBe('true');
    // loading flips to false after effect cycle
    await act(async () => {});

    await act(async () => {
      screen.getByText('login-ok').click();
    });
    expect(screen.getByTestId('user').textContent).toBe('admin@hostel.test');
    const stored = JSON.parse(localStorage.getItem('hms_user') || '{}');
    expect(stored.email).toBe('admin@hostel.test');
  });

  test('login failure sets error', async () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    await act(async () => {});
    await act(async () => {
      screen.getByText('login-fail').click();
    });
    expect(screen.getByTestId('error').textContent).toMatch(/invalid/i);
  });

  test('signup creates user and sets it', async () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    await act(async () => {});
    await act(async () => {
      screen.getByText('signup').click();
    });
    expect(screen.getByTestId('user').textContent).toBe('new@hostel.test');
  });

  test('logout clears user and localStorage', async () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    await act(async () => {});
    await act(async () => {
      screen.getByText('login-ok').click();
    });
    expect(localStorage.getItem('hms_user')).toBeTruthy();
    await act(async () => {
      screen.getByText('logout').click();
    });
    expect(screen.getByTestId('user').textContent).toBe('');
    expect(localStorage.getItem('hms_user')).toBeNull();
  });
});

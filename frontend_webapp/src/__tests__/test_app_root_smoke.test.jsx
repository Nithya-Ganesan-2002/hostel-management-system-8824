import React from 'react';
import { render } from '@testing-library/react';
import '../index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../modules/auth/AuthContext';
import { UIProvider } from '../modules/ui/UIContext';
import AppRouter from '../router/AppRouter';

describe('App root smoke', () => {
  test('mounts providers and router without crashing', () => {
    const { unmount } = render(
      <UIProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </AuthProvider>
      </UIProvider>
    );
    unmount();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../modules/auth/AuthContext';
import { UIProvider } from '../modules/ui/UIContext';

/**
 * Utility to render a component wrapped with providers and MemoryRouter.
 * Accepts:
 * - ui: JSX to render
 * - options: { routeEntries?: string[], authWrapper?: React.FC, uiWrapper?: React.FC }
 * PUBLIC_INTERFACE
 */
export function renderWithProviders(ui, { routeEntries = ['/'], authWrapper: AuthWrap = AuthProvider, uiWrapper: UIWrap = UIProvider } = {}) {
  const Wrapper = ({ children }) => (
    <UIWrap>
      <AuthWrap>
        <MemoryRouter initialEntries={routeEntries}>{children}</MemoryRouter>
      </AuthWrap>
    </UIWrap>
  );
  return render(ui, { wrapper: Wrapper });
}

/**
 * Clears localStorage keys used by the app between tests.
 * PUBLIC_INTERFACE
 */
export function resetMockStorage() {
  try {
    localStorage.clear();
  } catch {}
}

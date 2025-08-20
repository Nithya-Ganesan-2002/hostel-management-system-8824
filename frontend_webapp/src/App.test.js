import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './modules/auth/AuthContext';
import AppRouter from './router/AppRouter';

test('renders landing page headline', () => {
  render(
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
  const headline = screen.getByText(/Modern Hostel Management/i);
  expect(headline).toBeInTheDocument();
});

/* eslint-disable import/no-extraneous-dependencies */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import './test-utils/polyfills';

/* Mocks for heavy UI libs in test env */
// Reduce animation complexity by mocking framer-motion components to no-ops
jest.mock('framer-motion', () => require('./__mocks__/framer-motion'));
/* Simplify recharts to passthrough components */
jest.mock('recharts', () => require('./__mocks__/recharts'));

/* Light mock for Navigate to ease redirect assertions (keeps most of RRD intact) */
jest.mock('react-router-dom', () => require('./__mocks__/react-router-dom'));

/* Ensure a clean localStorage between tests to avoid cross-test leakage */
beforeEach(() => {
  try {
    localStorage.clear();
  } catch {}
});

/* Reduce noisy console errors from known async warnings to keep CI logs clean */
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    const msg = args.join(' ');
    // Filter common, non-actionable test warnings
    if (msg.includes('Warning: An update to') && msg.includes('inside a test was not wrapped in act')) return;
    if (msg.includes('MemoryRouter') && msg.includes('You cannot render a <Router> inside another Router')) return;
    originalError(...args);
  };
});
afterAll(() => {
  console.error = originalError;
});

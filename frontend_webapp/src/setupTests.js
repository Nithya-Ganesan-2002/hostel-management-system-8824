/* eslint-disable import/no-extraneous-dependencies */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import './test-utils/polyfills';

/* Mocks for heavy UI libs in test env */
// Reduce animation complexity by mocking framer-motion components to no-ops
// Use inline factory mocks to avoid recursive resolution issues.
jest.mock('framer-motion', () => ({
  __esModule: true,
  motion: new Proxy({}, { get: () => (({children, ...rest}) => ({ type: 'div', props: { ...rest, children } })) }),
  AnimatePresence: ({ children }) => children,
}));
/* Simplify recharts to passthrough components */
jest.mock('recharts', () => ({
  __esModule: true,
  ResponsiveContainer: ({ children }) => children,
  PieChart: ({ children, ...p }) => ({ type: 'div', props: { ...p, children } }),
  Pie: ({ children, ...p }) => ({ type: 'div', props: { ...p, children } }),
  Cell: (p) => ({ type: 'div', props: p }),
  Tooltip: (p) => ({ type: 'div', props: p }),
  LineChart: ({ children, ...p }) => ({ type: 'div', props: { ...p, children } }),
  Line: (p) => ({ type: 'div', props: p }),
  XAxis: (p) => ({ type: 'div', props: p }),
  YAxis: (p) => ({ type: 'div', props: p }),
  CartesianGrid: (p) => ({ type: 'div', props: p }),
  Legend: (p) => ({ type: 'div', props: p }),
}));

/* Light mock for Navigate to ease redirect assertions (keeps most of RRD intact) */
// react-router-dom is not globally mocked to avoid circular issues in Jest.

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

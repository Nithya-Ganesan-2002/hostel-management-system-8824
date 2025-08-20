const React = require('react');

// Proxy to allow importing named exports while overriding Navigate for test inspection
const actual = jest.requireActual('react-router-dom');

function NavigateMock(props) {
  // Render a simple marker div for assertions in tests when needed
  return React.createElement('div', { 'data-navigate-to': props.to }, null);
}

module.exports = {
  ...actual,
  Navigate: NavigateMock,
};

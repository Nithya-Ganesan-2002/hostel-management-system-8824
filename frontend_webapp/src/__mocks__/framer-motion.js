const React = require('react');

const Noop = ({ children, ...rest }) => React.createElement('div', rest, children);

module.exports = {
  motion: new Proxy({}, {
    get: () => Noop
  }),
  AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
};

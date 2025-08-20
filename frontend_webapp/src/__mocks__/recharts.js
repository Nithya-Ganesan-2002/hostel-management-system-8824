const React = require('react');

function passthrough(name) {
  return function Passthrough(props) {
    return React.createElement('div', { 'data-recharts': name, ...props }, props.children);
  };
}

module.exports = {
  ResponsiveContainer: passthrough('ResponsiveContainer'),
  PieChart: passthrough('PieChart'),
  Pie: passthrough('Pie'),
  Cell: passthrough('Cell'),
  Tooltip: passthrough('Tooltip'),
  LineChart: passthrough('LineChart'),
  Line: passthrough('Line'),
  XAxis: passthrough('XAxis'),
  YAxis: passthrough('YAxis'),
  CartesianGrid: passthrough('CartesianGrid'),
  Legend: passthrough('Legend'),
};

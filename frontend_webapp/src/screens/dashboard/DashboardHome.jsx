import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { dataService } from '../../services/mock/dataService';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'];

export default function DashboardHome({ role }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    dataService.getStats().then(setStats);
  }, []);

  const paymentsData = [
    { name: 'Paid', value: stats?.payments.paid || 0 },
    { name: 'Pending', value: stats?.payments.pending || 0 },
  ];

  const occupancyLine = [
    { name: 'Capacity', value: stats?.capacity || 0 },
    { name: 'Occupied', value: stats?.occupied || 0 },
  ].map((d, i) => ({ ...d, index: i + 1 }));

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader title={`${role === 'admin' ? 'Admin' : 'Student'} Dashboard`} subtitle="Overview of key metrics" />
        <CardBody>
          {!stats ? (
            <div className="text-sm text-[var(--muted)]">Loading...</div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Stat title="Total Rooms" value={stats.totalRooms} />
              <Stat title="Capacity" value={stats.capacity} />
              <Stat title="Occupied" value={stats.occupied} />
              <Stat title="Occupancy Rate" value={`${stats.occupancyRate}%`} />
            </div>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Payments" subtitle="Paid vs Pending" />
        <CardBody>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={paymentsData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={5}>
                  {paymentsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader title="Occupancy" subtitle="Capacity vs Occupied" />
        <CardBody>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={occupancyLine}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" name="Count" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="rounded-xl border border-[var(--border)] p-3">
      <div className="text-sm text-[var(--muted)]">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

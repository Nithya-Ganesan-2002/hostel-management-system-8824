import React from 'react';

export default function DashboardHome({ role }) {
  return (
    <div className="dash">
      <h2>{role === 'admin' ? 'Admin Dashboard' : 'Student Dashboard'}</h2>
      <p>This is the starting point for your {role} portal. More features will be added in subsequent milestones.</p>
      <style>{`
        .dash h2 { margin-bottom: 8px; }
        .dash p { color: #6b7280; }
      `}</style>
    </div>
  );
}

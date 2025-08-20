import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../modules/auth/AuthContext';

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="logo">HMS Admin</div>
        <nav className="menu">
          <Link to="/admin">Dashboard</Link>
          {/* Future: rooms, allocations, complaints, payments */}
        </nav>
      </aside>
      <main className="content">
        <header className="topbar">
          <div />
          <div className="user">
            <span>{user?.name}</span>
            <button className="btn btn--ghost" onClick={logout}>Logout</button>
          </div>
        </header>
        <section className="page">
          <Outlet />
        </section>
      </main>
      <style>{styles}</style>
    </div>
  );
}

const styles = `
.layout { display:flex; min-height:100vh; }
.sidebar { width: 220px; border-right: 1px solid #e5e7eb; padding: 16px; }
.logo { font-weight: 700; margin-bottom: 10px; }
.menu { display:grid; gap: 6px; }
.menu a { text-decoration: none; color: #111827; padding: 8px; border-radius: 8px; }
.menu a:hover { background: #eff6ff; }
.content { flex:1; display:flex; flex-direction:column; }
.topbar { display:flex; justify-content:space-between; align-items:center; padding: 10px 14px; border-bottom: 1px solid #e5e7eb; }
.user { display:flex; align-items:center; gap: 10px; }
.page { padding: 16px; }
.btn { border: 1px solid #e2e8f0; background: white; color: #0f172a; padding: 6px 10px; border-radius: 8px; text-decoration: none; font-weight: 600; cursor: pointer; }
.btn--ghost { background: transparent; }
`;

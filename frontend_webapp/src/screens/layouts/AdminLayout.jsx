import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../modules/auth/AuthContext';
import { useUI } from '../../modules/ui/UIContext';
import Button from '../../components/ui/Button';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { toggleTheme, theme } = useUI();

  return (
    <div className="min-h-screen flex">
      <aside className="hidden md:block w-56 border-r border-[var(--border)] p-4">
        <div className="font-bold mb-3">HMS Admin</div>
        <nav className="grid gap-1">
          <Link className="px-3 py-2 rounded-lg hover:bg-gray-50/60 dark:hover:bg-white/5" to="/admin">Dashboard</Link>
          <Link className="px-3 py-2 rounded-lg hover:bg-gray-50/60 dark:hover:bg-white/5" to="/admin/rooms">Rooms</Link>
          <Link className="px-3 py-2 rounded-lg hover:bg-gray-50/60 dark:hover:bg-white/5" to="/admin/complaints">Complaints</Link>
          <Link className="px-3 py-2 rounded-lg hover:bg-gray-50/60 dark:hover:bg-white/5" to="/admin/payments">Payments</Link>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="flex justify-between items-center px-4 py-3 border-b border-[var(--border)]">
          <div className="md:hidden font-bold">HMS Admin</div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</Button>
            <span className="text-sm">{user?.name}</span>
            <Button variant="ghost" onClick={logout}>Logout</Button>
          </div>
        </header>
        <section className="p-4">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';
import { useAuth } from '../modules/auth/AuthContext';
import { useUI } from '../modules/ui/UIContext';

export default function LandingPage() {
  const { user, logout } = useAuth();
  const { toggleTheme, theme } = useUI();

  return (
    <div className="landing">
      <nav className="landing__nav">
        <div className="brand">Hostel Manager</div>
        <div className="nav-actions">
          <button className="btn btn--ghost" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {!user ? (
            <>
              <Link className="btn btn--primary" to="/login">Login</Link>
              <Link className="btn btn--ghost" to="/signup">Signup</Link>
            </>
          ) : (
            <>
              <span className="welcome">Hello, {user.name} ({user.role})</span>
              {user.role === 'student' && <Link className="btn btn--primary" to="/student">Student Portal</Link>}
              {user.role === 'admin' && <Link className="btn btn--primary" to="/admin">Admin Portal</Link>}
              <button className="btn btn--ghost" onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </nav>

      <main className="landing__hero">
        <h1>Modern Hostel Management</h1>
        <p>Apply for rooms, manage allocations, track payments, and resolve complaints — all in one place.</p>
        <div className="cta">
          <Link to="/signup" className="btn btn--primary">Get Started</Link>
          <Link to="/login" className="btn btn--ghost">I already have an account</Link>
        </div>
      </main>

      <footer className="landing__footer">
        <small>Demo credentials — Admin: admin@hostel.test / admin123, Student: student@hostel.test / student123</small>
      </footer>
    </div>
  );
}

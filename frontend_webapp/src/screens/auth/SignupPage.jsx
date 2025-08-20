import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../modules/auth/AuthContext';

export default function SignupPage() {
  const { signup, error } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const u = await signup(form);
      navigate(u.role === 'admin' ? '/admin' : '/student', { replace: true });
    } catch {
      // handled via context
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="card">
        <h2>Create your account</h2>
        <p>Get access to the hostel portal.</p>
        <form onSubmit={onSubmit} className="form">
          <label>
            Full name
            <input name="name" type="text" required value={form.name} onChange={onChange} />
          </label>
          <label>
            Email
            <input name="email" type="email" required value={form.email} onChange={onChange} />
          </label>
          <label>
            Password
            <input name="password" type="password" required value={form.password} onChange={onChange} />
          </label>
          <label>
            Role
            <select name="role" value={form.role} onChange={onChange}>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          {error && <div className="error">{error}</div>}
          <button className="btn btn--primary" type="submit" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create account'}
          </button>
        </form>
        <div className="switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
      <style>{styles}</style>
    </div>
  );
}

const styles = `
.auth-page {
  min-height: 100vh; display:flex; align-items:center; justify-content:center; padding: 24px;
}
.card {
  width: 100%; max-width: 420px; border:1px solid #e2e8f0; border-radius:12px; padding:20px;
}
.form { display:grid; gap:12px; margin-top:12px; }
label { display:grid; gap:6px; font-size:.9rem; }
input, select { padding:10px 12px; border:1px solid #e2e8f0; border-radius:8px; }
.error { color: #b91c1c; background:#fee2e2; border:1px solid #fecaca; padding:8px 10px; border-radius:8px; }
.btn { margin-top:4px; }
.switch { margin-top: 10px; font-size: .9rem; }
.btn { border: 1px solid #e2e8f0; background: white; color: #0f172a; padding: 8px 14px; border-radius: 8px; text-decoration: none; font-weight: 600; cursor: pointer; }
.btn--primary { background: #3b82f6; border-color: #3b82f6; color: white; }
`;

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthShell from '../components/AuthShell';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(form);
      navigate(data.role === 'ADMIN' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not log in — please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to see your applications and messages from the Tarnaka desk."
      sideTitle="Your file, one login"
      sideText="Track cases, pick up where you left the enquiry, and keep documents in one place — without waiting for a callback just to know the status."
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </div>
        {error && <div className="form-error">{error}</div>}
        <button className="btn-primary auth-submit" type="submit" disabled={loading}>
          {loading ? 'Logging in…' : 'Log in'}
        </button>
        <p className="auth-switch">
          Don&apos;t have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </AuthShell>
  );
}

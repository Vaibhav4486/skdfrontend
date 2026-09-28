import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthShell from '../components/AuthShell';

const emptyForm = { fullName: '', email: '', phone: '', password: '' };

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      const body = err.response?.data;
      if (body?.fieldErrors) setFieldErrors(body.fieldErrors);
      else setGeneralError(body?.message || 'Could not create your account — please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Sign up to start an enquiry, save your details, and track the file after your Tarnaka sitting."
      sideTitle="Start before you even visit"
      sideText="Create an account in a minute. When you walk into Vijayapuri Colony, your name and service interest are already with us."
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Full name</label>
          <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
          {fieldErrors.fullName && <div className="form-error">{fieldErrors.fullName}</div>}
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          {fieldErrors.email && <div className="form-error">{fieldErrors.email}</div>}
        </div>
        <div className="field">
          <label>Phone</label>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile number" />
          {fieldErrors.phone && <div className="form-error">{fieldErrors.phone}</div>}
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          {fieldErrors.password && <div className="form-error">{fieldErrors.password}</div>}
        </div>
        {generalError && <div className="form-error">{generalError}</div>}
        <button className="btn-primary auth-submit" type="submit" disabled={loading}>
          {loading ? 'Creating account…' : 'Sign up'}
        </button>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </AuthShell>
  );
}

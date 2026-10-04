import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllCasesForAdmin, createCase, addStatusUpdate } from '../../api/casesApi';

const emptyCaseForm = { applicantName: '', phone: '', email: '', serviceType: '', assignedAdvisor: '' };
const emptyUpdateForm = { stage: '', note: '' };

export default function AdminCases() {
  const location = useLocation();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  // if we arrived here via "Create Case" on a Lead, start the form
  // pre-filled with that lead's details instead of blank
  const [caseForm, setCaseForm] = useState(() => ({
    ...emptyCaseForm,
    ...(location.state?.prefill || {})
  }));
  const [caseError, setCaseError] = useState('');
  const [activeCaseId, setActiveCaseId] = useState(null);
  const [updateForm, setUpdateForm] = useState(emptyUpdateForm);
  const [updateError, setUpdateError] = useState('');

  function load() {
    setLoading(true);
    getAllCasesForAdmin().then((res) => setCases(res.data)).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleCreateCase(e) {
    e.preventDefault();
    setCaseError('');
    try {
      await createCase(caseForm);
      setCaseForm(emptyCaseForm);
      load();
    } catch (err) {
      setCaseError(err.response?.data?.message || 'Could not create this case.');
    }
  }

  async function handleAddUpdate(e, caseId) {
    e.preventDefault();
    setUpdateError('');
    try {
      await addStatusUpdate(caseId, updateForm);
      setUpdateForm(emptyUpdateForm);
      setActiveCaseId(null);
      load();
    } catch (err) {
      setUpdateError(err.response?.data?.message || 'Could not add this update.');
    }
  }

  return (
    <div className="page wrap">
      <div className="section-head">
        <p className="eyebrow">Admin</p>
        <h2>Application Cases</h2>
        <p>Internal case tracking — the customer sees only the reference number and status timeline, never this list.</p>
      </div>

      <form className="card" onSubmit={handleCreateCase} style={{ marginBottom: 30 }}>
        <h3>Create a new case</h3>
        {location.state?.prefill && (
          <p style={{ fontSize: '0.85rem', color: 'var(--green-dark, #188a5f)', marginTop: -8, marginBottom: 16 }}>
            Pre-filled from an enquiry — check the details before creating.
          </p>
        )}
        <div className="grid-2">
          <div className="field"><label>Applicant name</label><input value={caseForm.applicantName} onChange={(e) => setCaseForm({ ...caseForm, applicantName: e.target.value })} required /></div>
          <div className="field"><label>Phone</label><input value={caseForm.phone} onChange={(e) => setCaseForm({ ...caseForm, phone: e.target.value })} placeholder="10-digit mobile number" required /></div>
          <div className="field"><label>Email (optional)</label><input value={caseForm.email} onChange={(e) => setCaseForm({ ...caseForm, email: e.target.value })} /></div>
          <div className="field"><label>Service type</label><input value={caseForm.serviceType} onChange={(e) => setCaseForm({ ...caseForm, serviceType: e.target.value })} required /></div>
          <div className="field"><label>Assigned advisor (optional)</label><input value={caseForm.assignedAdvisor} onChange={(e) => setCaseForm({ ...caseForm, assignedAdvisor: e.target.value })} /></div>
        </div>
        {caseError && <div className="form-error">{caseError}</div>}
        <button className="btn-primary" type="submit">Create case</button>
      </form>

      {loading && <p className="loading-msg">Loading…</p>}
      {cases.map((c) => (
        <div key={c.id} className="card" style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <strong>{c.referenceNumber}</strong> — {c.applicantName} · {c.serviceType}
            </div>
            <span className="pill pill-contacted">{c.currentStage}</span>
          </div>

          {c.statusUpdates?.length > 0 && (
            <div style={{ marginTop: 10, fontSize: '0.85rem', color: '#5B6B78' }}>
              Last update: {c.statusUpdates[c.statusUpdates.length - 1].stage} — {new Date(c.statusUpdates[c.statusUpdates.length - 1].updatedAt).toLocaleString()}
            </div>
          )}

          {activeCaseId === c.id ? (
            <form onSubmit={(e) => handleAddUpdate(e, c.id)} style={{ marginTop: 14, borderTop: '1px solid #e3e7ea', paddingTop: 14 }}>
              <div className="field"><label>New stage</label><input value={updateForm.stage} onChange={(e) => setUpdateForm({ ...updateForm, stage: e.target.value })} placeholder="e.g. Under Bank Review" required /></div>
              <div className="field"><label>Note (optional)</label><textarea value={updateForm.note} onChange={(e) => setUpdateForm({ ...updateForm, note: e.target.value })} /></div>
              {updateError && <div className="form-error">{updateError}</div>}
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn-primary" type="submit">Save update</button>
                <button type="button" className="btn-ghost" onClick={() => setActiveCaseId(null)}>Cancel</button>
              </div>
            </form>
          ) : (
            <button className="btn-ghost" style={{ marginTop: 12 }} onClick={() => setActiveCaseId(c.id)}>Add status update</button>
          )}
        </div>
      ))}
    </div>
  );
}
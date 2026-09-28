import { useState } from 'react';
import { getCaseByReferenceNumber } from '../api/casesApi';

export default function TrackApplication() {
  const [refNumber, setRefNumber] = useState('');
  const [caseData, setCaseData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setCaseData(null);
    setLoading(true);
    try {
      const { data } = await getCaseByReferenceNumber(refNumber.trim());
      setCaseData(data);
    } catch (err) {
      setError(err.response?.data?.message || 'No application found for this reference number.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page wrap">
      <div className="section-head">
        <span className="eyebrow-pill">Stay updated</span>
        <h2>Track your application</h2>
        <p>Enter the reference number your advisor gave you.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, maxWidth: 480, marginBottom: 30 }}>
        <input
          value={refNumber}
          onChange={(e) => setRefNumber(e.target.value)}
          placeholder="e.g. SKD-2026-00482"
          style={{ flex: 1, padding: '11px 13px', border: '1px solid #e3e7ea', borderRadius: 7 }}
          required
        />
        <button className="btn-primary" type="submit" disabled={loading}>{loading ? 'Checking…' : 'Track'}</button>
      </form>

      {error && <div className="error-box">{error}</div>}

      {caseData && (
        <div className="card" style={{ maxWidth: 640 }}>
          <p style={{ fontSize: '0.8rem', color: '#5B6B78' }}>REFERENCE</p>
          <h3>{caseData.referenceNumber}</h3>
          <p><strong>Applicant:</strong> {caseData.applicantName}</p>
          <p><strong>Service:</strong> {caseData.serviceType}</p>
          <p><strong>Current stage:</strong> <span className="pill pill-contacted">{caseData.currentStage}</span></p>

          {caseData.statusUpdates?.length > 0 && (
            <>
              <h3 style={{ marginTop: 20 }}>Timeline</h3>
              {caseData.statusUpdates.map((u, i) => (
                <div key={i} style={{ borderLeft: '2px solid #1F9E6D', paddingLeft: 14, marginBottom: 14 }}>
                  <strong>{u.stage}</strong>
                  <div style={{ fontSize: '0.85rem', color: '#5B6B78' }}>{new Date(u.updatedAt).toLocaleString()}</div>
                  {u.note && <p style={{ fontSize: '0.9rem', marginTop: 4 }}>{u.note}</p>}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

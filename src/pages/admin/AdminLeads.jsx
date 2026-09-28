import { useEffect, useState } from 'react';
import { getAllLeads, updateLeadStatus } from '../../api/leadsApi';

const STATUSES = ['NEW', 'CONTACTED', 'CONVERTED', 'CLOSED'];

function pillClass(status) {
  const map = { NEW: 'pill-new', CONTACTED: 'pill-contacted', CONVERTED: 'pill-converted', CLOSED: 'pill-closed' };
  return map[status] || 'pill-new';
}

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    getAllLeads(filter || undefined).then((res) => setLeads(res.data)).finally(() => setLoading(false));
  }

  useEffect(load, [filter]);

  async function handleStatusChange(id, value) {
    await updateLeadStatus(id, value);
    load();
  }

  return (
    <div className="page wrap">
      <div className="section-head">
        <p className="eyebrow">Admin</p>
        <h2>Enquiries</h2>
      </div>

      <div style={{ marginBottom: 20 }}>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: 7, border: '1px solid #e3e7ea' }}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {loading && <p className="loading-msg">Loading…</p>}
      {!loading && leads.length === 0 && <p className="empty-msg">No enquiries found.</p>}

      {!loading && leads.length > 0 && (
        <table>
          <thead>
            <tr><th>Name</th><th>Phone</th><th>Service</th><th>Message</th><th>Status</th></tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id}>
                <td>{l.fullName}</td>
                <td>{l.phone}</td>
                <td>{l.serviceInterested}</td>
                <td style={{ maxWidth: 240 }}>{l.message}</td>
                <td>
                  <select
                    className={`pill ${pillClass(l.status)}`}
                    style={{ border: 'none', fontWeight: 600 }}
                    value={l.status}
                    onChange={(e) => handleStatusChange(l.id, e.target.value)}
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

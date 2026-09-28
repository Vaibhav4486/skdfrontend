import { useEffect, useState } from 'react';
import { getAllTestimonialsForAdmin, approveTestimonial } from '../../api/testimonialsApi';

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    getAllTestimonialsForAdmin().then((res) => setTestimonials(res.data)).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleApprove(id) {
    await approveTestimonial(id);
    load();
  }

  return (
    <div className="page wrap">
      <div className="section-head">
        <p className="eyebrow">Admin</p>
        <h2>Testimonials</h2>
        <p>Only approved testimonials are shown on the public site.</p>
      </div>

      {loading && <p className="loading-msg">Loading…</p>}
      {!loading && testimonials.length === 0 && <p className="empty-msg">No testimonials submitted yet.</p>}

      <div className="grid-2">
        {testimonials.map((t) => (
          <div key={t.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <strong>{t.clientName}</strong>
              <span className={`pill ${t.approved ? 'pill-approved' : 'pill-pending'}`}>
                {t.approved ? 'Approved' : 'Pending'}
              </span>
            </div>
            <p style={{ color: '#5B6B78' }}>{t.serviceUsed} {t.location ? `· ${t.location}` : ''} · {t.rating}★</p>
            <p style={{ fontStyle: 'italic' }}>&ldquo;{t.quote}&rdquo;</p>
            {!t.approved && (
              <button className="btn-primary" onClick={() => handleApprove(t.id)}>Approve</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

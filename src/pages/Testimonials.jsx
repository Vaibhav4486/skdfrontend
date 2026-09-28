import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import PageHero from '../components/PageHero';
import Icon from '../components/Icon';
import { getApprovedTestimonials, submitTestimonial } from '../api/testimonialsApi';
import servicesData from '../data/servicesData';
import { staticTestimonials } from '../data/testimonialsData';
import { IMG } from '../data/images';

const emptyForm = { clientName: '', clientRole: '', serviceUsed: servicesData[0].name, quote: '', rating: 5, location: 'Tarnaka, Hyderabad' };

export default function Testimonials() {
  const [fromApi, setFromApi] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getApprovedTestimonials()
      .then((res) => setFromApi(Array.isArray(res.data) ? res.data : []))
      .catch(() => {});
    if (window.location.hash === '#leave-review') {
      window.setTimeout(() => document.getElementById('leave-review')?.scrollIntoView({ behavior: 'smooth' }), 250);
    }
  }, []);

  const extras = fromApi.filter((t) => !staticTestimonials.some((s) => s.quote === t.quote));
  const list = [...staticTestimonials, ...extras];

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await submitTestimonial({ ...form, rating: Number(form.rating) });
      setSubmitted(true);
      setForm(emptyForm);
    } catch {
      setError('Could not submit your testimonial right now — please try again, or message us from Contact.');
    }
  }

  function scrollToForm() {
    document.getElementById('leave-review')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div>
      <PageHero
        compact
        image={IMG.keys}
        eyebrow="Testimonials"
        title="Stories from East Hyderabad"
        lead="Neighbours who sat with us for a home, a car, GST, or tax — and told us how the file felt."
      />

      <div className="page wrap">
        <Reveal>
          <div className="cta-row" style={{ marginTop: 0 }}>
            <button type="button" className="btn-primary pulse-cta" onClick={scrollToForm}>
              Leave us a review
            </button>
            <p className="muted-inline">Two minutes. We read every note before it goes public.</p>
          </div>
        </Reveal>

        <div className="grid-3" style={{ marginBottom: 56 }}>
          {list.map((t, i) => (
            <Reveal key={t.id || `${t.clientName}-${i}`} delay={i * 50}>
              <article className="testi-card testi-lift">
                <div className="quote-icon"><Icon name="quote" size={28} /></div>
                <div className="testi-stars">{'★'.repeat(t.rating || 5)}</div>
                <p className="quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="testi-who">
                  <div className="testi-avatar">{t.clientName?.[0] || '?'}</div>
                  <div>
                    <strong>{t.clientName}</strong>
                    <span>{t.serviceUsed}{t.location ? ` · ${t.location}` : ''}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div id="leave-review">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow-pill">Your turn</span>
              <h2>Leave us a review</h2>
              <p>Submitted stories are reviewed by our team before they appear publicly. Kind or candid — both help the next family in Tarnaka.</p>
            </div>
          </Reveal>

          {submitted ? (
            <Reveal>
              <p className="form-success" style={{ textAlign: 'center' }}>
                Thank you — your review has been submitted. We will read it with care.
              </p>
            </Reveal>
          ) : (
            <Reveal>
              <form className="form-card form-glow" onSubmit={handleSubmit} style={{ maxWidth: 520, margin: '0 auto' }}>
                <div className="field">
                  <label>Your name</label>
                  <input value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} required />
                </div>
                <div className="field">
                  <label>Your role (optional)</label>
                  <input value={form.clientRole} onChange={(e) => setForm({ ...form, clientRole: e.target.value })} placeholder="Home buyer, shop owner…" />
                </div>
                <div className="field">
                  <label>Service used</label>
                  <select value={form.serviceUsed} onChange={(e) => setForm({ ...form, serviceUsed: e.target.value })}>
                    {servicesData.map((s) => <option key={s.slug}>{s.name}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Your review</label>
                  <textarea value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} required placeholder="How did the sitting and the file feel?" />
                </div>
                <div className="field">
                  <label>Rating</label>
                  <select value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}>
                    {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Location</label>
                  <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                </div>
                {error && <div className="form-error">{error}</div>}
                <button className="btn-primary" type="submit" style={{ width: '100%' }}>Leave us a review</button>
              </form>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
}

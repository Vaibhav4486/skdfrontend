import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import PageHero from '../components/PageHero';
import Icon from '../components/Icon';
import { createLead } from '../api/leadsApi';
import servicesData from '../data/servicesData';
import { IMG } from '../data/images';
import SafeImage from '../components/SafeImage';

const emptyForm = { fullName: '', phone: '', email: '', serviceInterested: servicesData[0].name, message: '' };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError('');
    try {
      await createLead(form);
      setSubmitted(true);
      setForm(emptyForm);
    } catch (err) {
      const body = err.response?.data;
      if (body?.fieldErrors) setFieldErrors(body.fieldErrors);
      else setGeneralError(body?.message || 'Something went wrong — please try again.');
    }
  }

  return (
    <div>
      <PageHero
        compact
        image={IMG.contact}
        eyebrow="Get in touch"
        title="Visit us in Tarnaka, Hyderabad"
        lead="Walk in, write in, or book a sitting. We would rather hear an awkward question than leave you guessing."
      />

      <div className="page wrap">
        <Reveal>
          <p className="prose" style={{ maxWidth: 720, margin: '0 auto 36px', textAlign: 'center' }}>
            Our desk is in Vijayapuri Colony, Tarnaka — easy from Habsiguda, Secunderabad, Uppal,
            and Nacharam. Bring what papers you have; we will tell you what is missing.
          </p>
        </Reveal>

        <div className="grid-2" style={{ gap: 40, alignItems: 'start' }}>
          <Reveal>
            {submitted ? (
              <div className="form-card form-glow">
                <p className="form-success">Thanks — we have received your enquiry and will get back to you shortly.</p>
              </div>
            ) : (
              <form className="form-card form-glow" onSubmit={handleSubmit}>
                <h3>Send us a message</h3>
                <div className="field">
                  <label>Name</label>
                  <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
                  {fieldErrors.fullName && <div className="form-error">{fieldErrors.fullName}</div>}
                </div>
                <div className="field">
                  <label>Phone</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile number" required />
                  {fieldErrors.phone && <div className="form-error">{fieldErrors.phone}</div>}
                </div>
                <div className="field">
                  <label>Email (optional)</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  {fieldErrors.email && <div className="form-error">{fieldErrors.email}</div>}
                </div>
                <div className="field">
                  <label>Service interested in</label>
                  <select value={form.serviceInterested} onChange={(e) => setForm({ ...form, serviceInterested: e.target.value })}>
                    {servicesData.map((s) => <option key={s.slug}>{s.name}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Message</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your home, plot, tax, GST, or licence…" />
                </div>
                {generalError && <div className="form-error">{generalError}</div>}
                <button className="btn-primary" type="submit" style={{ width: '100%' }}>Send enquiry</button>
              </form>
            )}
          </Reveal>

          <Reveal delay={80}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="svc-card">
                <div className="svc-icon-panel"><Icon name="pin" /></div>
                <h3>Visit us</h3>
                <p>
                  H.No. 12-5-16/4, Vijayapuri Colony,<br />
                  Tarnaka, Hyderabad – 500017
                </p>
              </div>
              <div className="svc-card">
                <div className="svc-icon-panel"><Icon name="mail" /></div>
                <h3>Email us</h3>
                <p>skdfinance@gmail.com</p>
              </div>
              <div className="svc-card">
                <div className="svc-icon-panel"><Icon name="clock" /></div>
                <h3>Business hours</h3>
                <p>Monday – Saturday: 9:30 AM – 7:00 PM<br />Sunday: Closed</p>
              </div>
              <div className="photo-frame">
                <SafeImage src={IMG.hyderabadCity} alt="Hyderabad city view" className="contact-city-img" />
              </div>
              <Link to="/track" className="btn-ghost" style={{ textAlign: 'center' }}>Already applied? Track your application →</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCustomerDashboard } from '../api/dashboardApi';
import { useAuth } from '../context/AuthContext';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';

function statusPillClass(status) {
  const map = { NEW: 'pill-new', CONTACTED: 'pill-contacted', CONVERTED: 'pill-converted', CLOSED: 'pill-closed' };
  return map[status] || 'pill-new';
}

function firstName(fullName) {
  return fullName?.trim()?.split(/\s+/)[0] || 'there';
}

function getApplicationProgress(stage) {
  const value = String(stage || '').toUpperCase();
  if (value.includes('CLOSE') || value.includes('COMPLET')) return 100;
  if (value.includes('APPROV')) return 82;
  if (value.includes('PROCESS') || value.includes('VERIF')) return 62;
  if (value.includes('DOC')) return 42;
  if (value.includes('SUBMIT') || value.includes('NEW')) return 22;
  return 50;
}

function formatStage(stage) {
  if (!stage) return 'In progress';
  return String(stage)
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCustomerDashboard()
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  const summary = useMemo(() => {
    if (!data) return { enquiries: 0, testimonials: 0, applications: 0, active: 0 };
    return {
      enquiries: data.myEnquiries?.length || 0,
      testimonials: data.myTestimonials?.length || 0,
      applications: data.myApplications?.length || 0,
      active: (data.myApplications || []).filter((item) => !String(item.currentStage || '').toUpperCase().includes('CLOSE')).length,
    };
  }, [data]);

  if (loading) {
    return (
      <div className="dashboard-shell dashboard-loading">
        <div className="dashboard-skeleton hero-skeleton" />
        <div className="dashboard-skeleton-grid">
          <div className="dashboard-skeleton" /><div className="dashboard-skeleton" /><div className="dashboard-skeleton" />
        </div>
      </div>
    );
  }

  if (!data) {
    return <div className="page wrap"><p className="error-box">Could not load your dashboard. Please try again.</p></div>;
  }

  const enquiries = data.myEnquiries || [];
  const testimonials = data.myTestimonials || [];
  const applications = data.myApplications || [];

  return (
    <div className="dashboard-shell">
      <section className="dashboard-hero">
        <div className="dashboard-orb dashboard-orb-one" />
        <div className="dashboard-orb dashboard-orb-two" />
        <div className="dashboard-grid-lines" />
        <div className="wrap dashboard-hero-inner">
          <Reveal className="dashboard-hero-copy">
            <div className="dashboard-kicker"><span className="live-dot" /> Your private finance space</div>
            <h1>Welcome back, {firstName(user?.fullName)}.</h1>
            <p>Everything you have shared with SKD Finance, organised in one calm place.</p>
            <div className="dashboard-hero-actions">
              <Link to="/contact" className="dashboard-primary-action"><Icon name="mail" size={17} /> Start an enquiry</Link>
              <Link to="/track" className="dashboard-secondary-action"><Icon name="trending" size={17} /> Track an application</Link>
            </div>
          </Reveal>

          <Reveal delay={120} className="dashboard-hero-card">
            <div className="hero-card-top">
              <span>Account overview</span>
              <span className="secure-chip"><Icon name="shield" size={14} /> Secure</span>
            </div>
            <div className="hero-card-name">{user?.fullName || 'Customer'}</div>
            <div className="hero-card-email">{user?.email || 'Your registered account'}</div>
            <div className="hero-card-line" />
            <div className="hero-card-footer"><span>SKD Finance Service</span><span>2026</span></div>
          </Reveal>
        </div>
      </section>

      <main className="dashboard-content wrap">
        <Reveal className="dashboard-stat-grid">
          <div className="dashboard-stat-card stat-blue">
            <div className="stat-icon"><Icon name="mail" size={19} /></div>
            <div><span>Enquiries</span><strong>{summary.enquiries}</strong></div>
            <div className="stat-spark"><i /><i /><i /><i /><i /></div>
          </div>
          <div className="dashboard-stat-card stat-green">
            <div className="stat-icon"><Icon name="briefcase" size={19} /></div>
            <div><span>Applications</span><strong>{summary.applications}</strong></div>
            <div className="stat-spark"><i /><i /><i /><i /><i /></div>
          </div>
          <div className="dashboard-stat-card stat-gold">
            <div className="stat-icon"><Icon name="clock" size={19} /></div>
            <div><span>Active cases</span><strong>{summary.active}</strong></div>
            <div className="stat-spark"><i /><i /><i /><i /><i /></div>
          </div>
          <div className="dashboard-stat-card stat-purple">
            <div className="stat-icon"><Icon name="quote" size={19} /></div>
            <div><span>Testimonials</span><strong>{summary.testimonials}</strong></div>
            <div className="stat-spark"><i /><i /><i /><i /><i /></div>
          </div>
        </Reveal>

        <section className="dashboard-section dashboard-actions-section">
          <Reveal>
            <div className="dashboard-section-heading">
              <div><span className="section-mini-label">QUICK ACCESS</span><h2>What would you like to do?</h2></div>
              <p>Jump straight to the next thing you need.</p>
            </div>
          </Reveal>
          <div className="dashboard-action-grid">
            {[
              { icon: 'wallet', title: 'Explore a service', text: 'Compare the finance and compliance services we offer.', to: '/services' },
              { icon: 'receipt', title: 'Calculate your EMI', text: 'Estimate your monthly repayment before applying.', to: '/emi-calculator' },
              { icon: 'file-text', title: 'Check documents', text: 'See what paperwork you may need for your service.', to: '/documents' },
              { icon: 'phone', title: 'Talk to us', text: 'Send an enquiry and our team can follow up with you.', to: '/contact' },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 70} className="dashboard-action-wrap">
                <Link to={item.to} className="dashboard-action-card">
                  <span className="dashboard-action-icon"><Icon name={item.icon} size={20} /></span>
                  <span className="dashboard-action-copy"><strong>{item.title}</strong><span>{item.text}</span></span>
                  <span className="action-arrow">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <Reveal>
            <div className="dashboard-section-heading">
              <div><span className="section-mini-label">YOUR ACTIVITY</span><h2>Enquiries</h2></div>
              <span className="section-count">{enquiries.length} total</span>
            </div>
          </Reveal>
          {enquiries.length === 0 ? (
            <Reveal><div className="dashboard-empty-card">
              <div className="empty-icon"><Icon name="mail" size={24} /></div>
              <div><h3>No enquiries yet</h3><p>When you contact SKD Finance about a service, your conversations will appear here.</p></div>
              <Link to="/contact" className="btn-primary-sm">Get in touch →</Link>
            </div></Reveal>
          ) : (
            <div className="dashboard-list">
              {enquiries.map((item, index) => (
                <Reveal key={item.id} delay={index * 70}>
                  <article className="dashboard-record-card">
                    <div className="record-leading enquiry-leading"><Icon name="mail" size={18} /></div>
                    <div className="record-main"><div className="record-title-row"><h3>{item.serviceInterested}</h3><span className={`pill ${statusPillClass(item.status)}`}>{item.status}</span></div><p>{item.message || 'No message provided.'}</p></div>
                    <span className="record-index">{String(index + 1).padStart(2, '0')}</span>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </section>

        <section className="dashboard-two-col">
          <div className="dashboard-section compact-section">
            <Reveal>
              <div className="dashboard-section-heading"><div><span className="section-mini-label">YOUR VOICE</span><h2>Testimonials</h2></div><span className="section-count">{testimonials.length}</span></div>
            </Reveal>
            {testimonials.length === 0 ? (
              <Reveal><div className="dashboard-empty-card compact-empty"><div className="empty-icon"><Icon name="quote" size={22} /></div><div><h3>Share your experience</h3><p>Your approved testimonial can help future customers understand the service.</p></div></div></Reveal>
            ) : testimonials.map((item, index) => (
              <Reveal key={item.id} delay={index * 70}>
                <article className="testimonial-dashboard-card">
                  <div className="quote-mark">“</div>
                  <p>“{item.quote}”</p>
                  <div className="testimonial-meta"><strong>{item.serviceUsed}</strong><span className={`pill ${item.approved ? 'pill-approved' : 'pill-pending'}`}>{item.approved ? 'Approved' : 'Pending review'}</span></div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="dashboard-section compact-section">
            <Reveal>
              <div className="dashboard-section-heading"><div><span className="section-mini-label">APPLICATIONS</span><h2>Application progress</h2></div><span className="section-count">{applications.length}</span></div>
            </Reveal>
            {applications.length === 0 ? (
              <Reveal><div className="dashboard-empty-card compact-empty"><div className="empty-icon"><Icon name="briefcase" size={22} /></div><div><h3>No linked applications</h3><p>Once an application is linked to your account, its progress will appear here.</p></div></div></Reveal>
            ) : applications.map((item, index) => {
              const progress = getApplicationProgress(item.currentStage);
              return (
                <Reveal key={item.id} delay={index * 70}>
                  <article className="application-dashboard-card">
                    <div className="application-head"><div><span className="application-ref">{item.referenceNumber}</span><h3>{item.serviceType}</h3></div><span className="stage-chip">{formatStage(item.currentStage)}</span></div>
                    <div className="application-progress-label"><span>Progress</span><strong>{progress}%</strong></div>
                    <div className="application-progress"><span style={{ width: `${progress}%` }} /></div>
                    <div className="application-footer"><span>Reference saved to your account</span><Link to="/track">View tracking →</Link></div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <Reveal>
          <section className="dashboard-bottom-cta">
            <div className="cta-glow" />
            <div><span className="section-mini-label">NEED A HAND?</span><h2>Have a question about your next financial step?</h2><p>Speak with SKD Finance and get clear guidance on the documents, process and next steps.</p></div>
            <Link to="/contact" className="dashboard-primary-action">Contact SKD Finance <span>→</span></Link>
          </section>
        </Reveal>
      </main>
    </div>
  );
}

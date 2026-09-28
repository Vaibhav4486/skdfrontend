import { useParams, Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import SafeImage from '../components/SafeImage';
import { getServiceBySlug } from '../data/servicesData';
import servicesData from '../data/servicesData';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <div className="page wrap">
        <div className="error-box">This service could not be found.</div>
        <Link to="/services" style={{ color: 'var(--green-dark)', fontWeight: 600 }}>← Back to all services</Link>
      </div>
    );
  }

  const others = servicesData.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <div>
      <section className="hero page-hero page-hero-compact">
        <SafeImage className="hero-bg ken-burns" src={service.image} alt="" />
        <div className="hero-overlay mesh-overlay" />
        <div className="wrap">
          <div className="hero-content" style={{ maxWidth: 640 }}>
            <Reveal>
              <div className="svc-icon-panel" style={{ background: 'rgba(31,158,109,0.18)', marginBottom: 18 }}>
                <Icon name={service.icon} size={26} />
              </div>
            </Reveal>
            <Reveal delay={60}><h1>{service.name}</h1></Reveal>
            <Reveal delay={120}><p className="lead">{service.tagline}</p></Reveal>
          </div>
        </div>
      </section>

      <section className="page wrap">
        <Link to="/services" style={{ color: 'var(--ink-soft)', fontSize: '0.88rem' }}>← All services</Link>

        <div className="grid-2" style={{ marginTop: 24, alignItems: 'start', gap: 40 }}>
          <div>
            <Reveal>
              <h2>Overview</h2>
              <p className="prose">{service.description}</p>
              {service.extra && <p className="prose">{service.extra}</p>}
            </Reveal>

            <Reveal delay={60}>
              <h2>Key features</h2>
              <div className="doc-list" style={{ marginBottom: 30 }}>
                {service.keyFeatures.map((f) => (
                  <div key={f} className="doc-list-item"><Icon name="checkCircle" size={17} /><span>{f}</span></div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <h2>Eligibility</h2>
              <div className="notes-box">
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {service.eligibility.map((e) => <li key={e}>{e}</li>)}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <div className="sticky-facts">
              <h3 style={{ fontSize: '0.95rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '.03em', marginBottom: 14 }}>
                Quick facts
              </h3>
              <div className="grid-2" style={{ gap: 12 }}>
                <div className="stat-card"><strong>{service.quickFacts.rate}</strong><span>Rate / Fee</span></div>
                <div className="stat-card"><strong>{service.quickFacts.amount}</strong><span>Amount</span></div>
                <div className="stat-card"><strong>{service.quickFacts.tenure}</strong><span>Tenure</span></div>
                <div className="stat-card"><strong>{service.quickFacts.processing}</strong><span>Processing</span></div>
              </div>
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link to="/emi-calculator" className="btn-primary" style={{ textAlign: 'center' }}>Check EMI & eligibility</Link>
                <Link to="/contact" className="btn-ghost" style={{ textAlign: 'center' }}>Enquire about this service</Link>
                <Link to="/documents" className="btn-ghost" style={{ textAlign: 'center' }}>View required documents</Link>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="section-head left" style={{ marginTop: 56 }}>
            <h2>Other services you can open from here</h2>
          </div>
          <div className="grid-4">
            {others.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="svc-card">
                <div className="svc-icon-panel"><Icon name={s.icon} /></div>
                <h3>{s.name}</h3>
                <p>{s.tagline}</p>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
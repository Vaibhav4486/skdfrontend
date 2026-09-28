import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import PageHero from '../components/PageHero';
import Icon from '../components/Icon';
import SafeImage from '../components/SafeImage';
import servicesData from '../data/servicesData';
import { IMG } from '../data/images';

export default function Services() {
  return (
    <div>
      <PageHero
        compact
        image={IMG.modernHome}
        eyebrow="Our services"
        title="Eight financial services for Hyderabad life"
        lead="Buying a home in Tarnaka, expanding a shop in Uppal, filing GST, or licensing a site team — pick a service. Hover the Services menu anytime to jump straight to Home Loans, GST, and the rest."
      />

      <div className="page wrap">
        <Reveal>
          <p className="prose" style={{ maxWidth: 720, margin: '0 auto 40px', textAlign: 'center' }}>
            Each card opens a full page: who it is for, indicative rates, eligibility, and the papers
            we will ask for in our Tarnaka sitting. Nothing is buried in a PDF.
          </p>
        </Reveal>

        <div className="grid-3" style={{ marginBottom: 56 }}>
          {servicesData.map((s, i) => (
            <Reveal key={s.slug} delay={i * 50}>
              <Link to={`/services/${s.slug}`} className="svc-card svc-photo-card">
                <div className="svc-photo">
                  <SafeImage src={s.image} alt="" />
                  <span className="svc-photo-label">View {s.name}</span>
                </div>
                <div className="svc-icon-panel"><Icon name={s.icon} /></div>
                <h3>{s.name}</h3>
                <p>{s.tagline}</p>
                <p className="svc-extra">{s.extra}</p>
                <span className="svc-link">Learn more <Icon name="chevronDown" size={14} /></span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="section-head left">
            <h2>At a glance</h2>
            <p>Indicative market ranges — your file is priced after we see income, property, and lender appetite.</p>
          </div>
        </Reveal>
        <Reveal>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr><th>Service</th><th>Rate / Fee</th><th>Tenure / Validity</th></tr>
              </thead>
              <tbody>
                {servicesData.map((s) => (
                  <tr key={s.slug}>
                    <td><Link to={`/services/${s.slug}`} style={{ fontWeight: 600, color: 'var(--navy)' }}>{s.name}</Link></td>
                    <td>{s.quickFacts.rate}</td>
                    <td>{s.quickFacts.tenure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
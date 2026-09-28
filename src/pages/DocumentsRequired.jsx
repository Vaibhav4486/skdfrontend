import { useState } from 'react';
import Reveal from '../components/Reveal';
import PageHero from '../components/PageHero';
import Icon from '../components/Icon';
import servicesData from '../data/servicesData';
import { IMG } from '../data/images';

export default function DocumentsRequired() {
  const [activeSlug, setActiveSlug] = useState(servicesData[0].slug);
  const active = servicesData.find((s) => s.slug === activeSlug);

  return (
    <div>
      <PageHero
        compact
        image={IMG.documents}
        eyebrow="Be prepared"
        title="Documents required"
        lead="Know what to bring to Tarnaka. Pick a service — the list is the same one we use in the sitting so there are fewer surprises."
      />
      <div className="page wrap">
      <Reveal>
        <p className="prose" style={{ maxWidth: 720, marginBottom: 28 }}>
          Originals stay with you until verification. Bring self-attested copies to the Tarnaka sitting
          and we will tell you if a lender needs anything extra for your profile.
        </p>
      </Reveal>

      <Reveal>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 26 }}>
          {servicesData.map((s) => (
            <button
              key={s.slug}
              onClick={() => setActiveSlug(s.slug)}
              className={activeSlug === s.slug ? 'btn-primary-sm' : 'btn-ghost-sm'}
            >
              {s.name}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="doc-card">
          <div className="doc-card-head">
            <div className="svc-icon-panel" style={{ marginBottom: 0 }}><Icon name={active.icon} /></div>
            <div>
              <h3 style={{ margin: 0 }}>{active.name}</h3>
              <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: '0.88rem' }}>Required documents for application</p>
            </div>
          </div>
          <div className="doc-list">
            {active.documents.map((d) => (
              <div key={d} className="doc-list-item"><Icon name="checkCircle" size={17} /><span>{d}</span></div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="notes-box">
          <h4>Important Notes</h4>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>All documents should be self-attested (signed by the applicant).</li>
            <li>Original documents may be required for verification at the time of submission.</li>
            <li>Additional documents may be requested based on your specific case and lender requirements.</li>
            <li>For NRIs, additional documents like passport, visa, and overseas employment proof may be required.</li>
          </ul>
        </div>
      </Reveal>

      <Reveal>
        <div className="section-head left" style={{ marginTop: 50 }}>
          <h2>All Requirements at a Glance</h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr><th>Service</th><th>Key Documents</th></tr>
            </thead>
            <tbody>
              {servicesData.map((s) => (
                <tr key={s.slug}>
                  <td style={{ fontWeight: 600, color: 'var(--navy)', whiteSpace: 'nowrap' }}>{s.name}</td>
                  <td>{s.documents.slice(0, 3).join(', ')}...</td>
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

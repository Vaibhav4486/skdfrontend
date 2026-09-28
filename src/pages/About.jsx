import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import PageHero from '../components/PageHero';
import Icon from '../components/Icon';
import { IMG } from '../data/images';
import SafeImage from '../components/SafeImage';

const VALUES = [
  { icon: 'shield', title: 'Integrity', text: 'We operate with complete transparency. No hidden fees, no false promises — just honest advice you can repeat to family.' },
  { icon: 'checkCircle', title: 'Client first', text: 'Every recommendation is made in your interest, not to push a product that looks good on a target sheet.' },
  { icon: 'award', title: 'Precision', text: 'Files stall on missing pages. We treat documentation as craft so lenders and departments have less reason to bounce you.' },
  { icon: 'trending', title: 'Always current', text: 'Rates, GST rules, and labour filings change. We keep learning so your sitting in Tarnaka reflects today, not last year\'s rumour.' }
];

export default function About() {
  return (
    <div>
      <PageHero
        image={IMG.skylineDusk}
        eyebrow="About SKD Finance"
        title="A Hyderabad desk built for the next file — yours"
        lead="Personal attention, transparent fees, and an advisor who stays with the case. Based in Tarnaka, working across East Hyderabad."
      />

      <section className="page">
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: 'center', gap: 48 }}>
            <Reveal>
              <div>
                <span className="eyebrow-pill">Our story</span>
                <h2>Why we opened in Tarnaka</h2>
                <p className="prose">
                  SKD Finance started with a simple rule: the person who takes your first call should
                  be the one who sees the loan, the ITR, or the licence through to the end — not a
                  rotating queue of agents you never meet.
                </p>
                <p className="prose">
                  We chose Tarnaka because East Hyderabad is where homes, plots, small businesses,
                  and new jobs keep arriving. People here want a desk they can walk to, a checklist
                  they can trust, and language that does not hide behind “processing.” That is the
                  standard we hold ourselves to on every sitting.
                </p>
                <p className="prose">
                  Momentum is our calling card. We invest in a calm room, clear process, and modern
                  tracking — so the experience feels established from the first handshake, and the
                  work speaks louder than a timeline on a wall.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="photo-frame tilt-in">
                <SafeImage src={IMG.advisorDesk} alt="Advisor reviewing documents with a client" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="page" style={{ background: 'var(--bg-soft)' }}>
        <div className="wrap grid-2" style={{ alignItems: 'center', gap: 40 }}>
          <Reveal>
            <div className="photo-frame">
              <SafeImage src={IMG.team} alt="Collaborative meeting" />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <span className="eyebrow-pill">How we work</span>
            <h2>Neighbourhood enough to visit. Organised enough to scale with you.</h2>
            <p className="prose">
              Walk in with salary slips or a GST login. Walk out with a written next step. Between
              sittings, you can message us or track a case online. That mix — human first, digital
              where it helps — is what we believe Hyderabad families and shop owners actually need.
            </p>
            <ul className="tick-list">
              <li>In-person sittings at Vijayapuri Colony, Tarnaka</li>
              <li>Service for Habsiguda, Uppal, Nacharam, Mallapur, Secunderabad</li>
              <li>Loans and compliance under one coordinated file</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="page navy-section">
        <div className="wrap">
          <div className="grid-3">
            <Reveal>
              <div className="feature-card">
                <h4>Our mission</h4>
                <p>Make loans, tax, GST, and licences feel understandable — so clients in East Hyderabad can decide with a clear head.</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="feature-card">
                <h4>Our vision</h4>
                <p>Be the Tarnaka name people recommend when a cousin asks “who should I sit with for this file?”</p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="feature-card">
                <h4>Our promise</h4>
                <p>Personal attention, honest advice, and complete transparency on fees and process — every time, not only on good days.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="page">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow-pill">Our core values</span>
              <h2>What we will not compromise</h2>
            </div>
          </Reveal>
          <div className="grid-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="svc-card">
                  <div className="svc-icon-panel"><Icon name={v.icon} /></div>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="cta-row">
              <Link to="/services" className="btn-primary">Explore services</Link>
              <Link to="/contact" className="btn-ghost">Visit Tarnaka</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
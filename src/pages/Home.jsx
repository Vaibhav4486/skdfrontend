import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import SafeImage from '../components/SafeImage';
import servicesData from '../data/servicesData';
import faqData from '../data/faqData';
import { staticTestimonials } from '../data/testimonialsData';
import { IMG } from '../data/images';
import { useState } from 'react';

const WHY_US = [
  { icon: 'clock', title: 'Fast, honest first sitting', text: 'Bring your papers to Tarnaka and leave with a realistic timeline, EMI sketch, and a document list — not a hard sell.' },
  { icon: 'shield', title: 'East Hyderabad on the ground', text: 'We work the property, plot, and compliance norms people actually face in Tarnaka, Habsiguda, Uppal, and Secunderabad.' },
  { icon: 'wallet', title: 'Transparent fees', text: 'No hidden charges. Every fee is spoken out loud before you commit to anything.' },
  { icon: 'check', title: 'Documentation done right', text: 'We handle paperwork, verification, and compliance checks so files do not stall for a missing page.' },
  { icon: 'trending', title: 'One advisor, full file', text: 'The person who takes your first call stays with the case through disbursement, filing, or licence issue.' },
  { icon: 'award', title: 'Loans and compliance together', text: 'Home, plot, vehicle, business finance plus ITR, GST, and labour licensing — one desk instead of three agents.' }
];

const HOW_IT_WORKS = [
  { title: 'Talk it through', text: 'Share the goal — a house in Hyderabad, a GST filing, a car, a licence. We map what fits your income and papers.' },
  { title: 'Build the file', text: 'You get a precise checklist. We review copies, flag gaps, and keep the lender or department from bouncing the file.' },
  { title: 'Submit with intent', text: 'We prepare and submit so you are not shopping rates in the dark. Terms are explained before you sign.' },
  { title: 'Stay until the finish', text: 'Approval, disbursement, acknowledgement, or licence in hand — we do not disappear after the enquiry form.' }
];

const NEIGHBOURHOODS = ['Tarnaka', 'Habsiguda', 'Secunderabad', 'Uppal', 'Nacharam', 'Mallapur'];

export default function Home() {
  return (
    <div>
      <section className="hero hero-tall">
        <SafeImage className="hero-bg ken-burns" src={IMG.heroHome} alt="" />
        <div className="hero-overlay mesh-overlay" />
        <div className="orb orb-a" aria-hidden="true" />
        <div className="orb orb-b" aria-hidden="true" />
        <div className="wrap">
          <div className="hero-content">
            <Reveal>
              <span className="badge-pill glow-pill">
                <Icon name="pin" size={16} /> Tarnaka, Hyderabad
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1>Finance that feels <span className="accent">personal</span> in East Hyderabad</h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="lead">
                SKD Finance is your neighbourhood desk for home, plot, vehicle and business loans —
                plus income tax, GST, and labour licences. One advisor, clear fees, and a sitting
                you can walk to in Tarnaka.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="hero-ctas">
                <Link to="/emi-calculator" className="btn-primary pulse-cta">Calculate Your EMI</Link>
                <Link to="/contact" className="btn-ghost-light">Book a Tarnaka sitting</Link>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="trust-row">
                <div><Icon name="checkCircle" size={17} /> 8 services, one roof</div>
                <div><Icon name="checkCircle" size={17} /> Transparent, upfront fees</div>
                <div><Icon name="checkCircle" size={17} /> Walk-in friendly desk</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="strip-marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...NEIGHBOURHOODS, ...NEIGHBOURHOODS, ...NEIGHBOURHOODS].map((n, i) => (
            <span key={`${n}-${i}`}>{n} · Loans · Tax · GST</span>
          ))}
        </div>
      </section>

      <section className="page">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow-pill">Our Services</span>
              <h2>Eight ways we can help — hover and pick one</h2>
              <p>
                Need a home in Hyderabad, working capital, a car, or a GST filing? Open a card to
                see the full story, rates, and documents. Hover Services in the menu anytime to jump straight in.
              </p>
            </div>
          </Reveal>
          <div className="grid-4">
            {servicesData.map((s, i) => (
              <Reveal key={s.slug} delay={i * 55}>
                <Link to={`/services/${s.slug}`} className="svc-card svc-photo-card">
                  <div className="svc-photo">
                    <SafeImage src={s.image} alt="" />
                    <span className="svc-photo-label">Open {s.name}</span>
                  </div>
                  <div className="svc-icon-panel"><Icon name={s.icon} /></div>
                  <h3>{s.name}</h3>
                  <p>{s.tagline}</p>
                  <span className="svc-link">Learn more <Icon name="chevronDown" size={14} /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page split-story">
        <div className="wrap grid-2" style={{ alignItems: 'center', gap: 48 }}>
          <Reveal>
            <div className="photo-stack">
              <SafeImage src={IMG.interior} alt="A bright Hyderabad home interior" />
              <SafeImage className="photo-stack-float" src={IMG.handshake} alt="Advisor meeting a client" />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <span className="eyebrow-pill">Why this desk exists</span>
            <h2>A calm first conversation beats a crowded call centre</h2>
            <p className="prose">
              Most people in Tarnaka and Secunderabad do not need another portal. They need someone
              who will sit with salary slips, a plot sketch, or a GST login and say — clearly —
              what is possible this month.
            </p>
            <p className="prose">
              SKD Finance is built for that sitting. We are a focused Hyderabad practice: close
              enough to visit, modern enough to track your file online, and serious about fees being
              spoken before you sign. Momentum, not mythology — that is how we earn the next referral.
            </p>
            <div className="mini-stats">
              <div><strong>8</strong><span>Services</span></div>
              <div><strong>1</strong><span>Advisor per file</span></div>
              <div><strong>500017</strong><span>Tarnaka PIN</span></div>
            </div>
            <Link to="/about" className="btn-ghost" style={{ marginTop: 18 }}>Read our story</Link>
          </Reveal>
        </div>
      </section>

      <section className="page" style={{ background: 'var(--bg-soft)' }}>
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow-pill">How It Works</span>
              <h2>From first sitting to a finished file</h2>
              <p>A simple path designed around Hyderabad paperwork — not around keeping you on hold.</p>
            </div>
          </Reveal>
          <div className="grid-4">
            {HOW_IT_WORKS.map((step, i) => (
              <Reveal key={step.title} delay={i * 90}>
                <div className="step-card">
                  <div className="step-num">{i + 1}</div>
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page navy-section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow-pill" style={{ background: 'rgba(31,158,109,0.18)', color: '#4fd399' }}>Why Choose Us</span>
              <h2>Why walk into SKD Finance?</h2>
              <p>Local attention with a modern file — for people who want answers, not a brochure.</p>
            </div>
          </Reveal>
          <div className="grid-3">
            {WHY_US.map((f, i) => (
              <Reveal key={f.title} delay={i * 70}>
                <div className="feature-card">
                  <div className="svc-icon-panel"><Icon name={f.icon} /></div>
                  <h4>{f.title}</h4>
                  <p>{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow-pill">Testimonials</span>
              <h2>What neighbours tell us after the file closes</h2>
              <p>Real-feeling stories from East Hyderabad homes and shops — the kind of feedback we work for every week.</p>
            </div>
          </Reveal>
          <div className="grid-3">
            {staticTestimonials.slice(0, 3).map((t, i) => (
              <Reveal key={t.id} delay={i * 90}>
                <article className="testi-card testi-lift">
                  <div className="quote-icon"><Icon name="quote" size={28} /></div>
                  <div className="testi-stars">{'★'.repeat(t.rating)}</div>
                  <p className="quote">&ldquo;{t.quote}&rdquo;</p>
                  <div className="testi-who">
                    <div className="testi-avatar">{t.clientName[0]}</div>
                    <div>
                      <strong>{t.clientName}</strong>
                      <span>{t.serviceUsed} · {t.location}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="cta-row">
              <Link to="/testimonials" className="btn-ghost">Read all stories</Link>
              <Link to="/testimonials#leave-review" className="btn-primary">Leave us a review</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="page" style={{ background: 'var(--bg-soft)' }}>
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow-pill">FAQ</span>
              <h2>Questions people ask before they visit Tarnaka</h2>
            </div>
          </Reveal>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <FaqPreview />
          </div>
          <Reveal>
            <div className="faq-contact-strip">
              <div>
                <h3>Don’t see your question?</h3>
                <p>Every file is a little different. Write to us or walk into Tarnaka — we will answer in plain language.</p>
              </div>
              <Link to="/contact" className="btn-primary">Contact us</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cta-banner">
        <SafeImage src={IMG.cta} alt="" />
        <div className="overlay" />
        <div className="wrap">
          <Reveal>
            <h2>Ready for a sitting in Tarnaka?</h2>
            <p>No obligation — bring the requirement and we will tell you honestly what fits, what papers you need, and what the EMI really looks like.</p>
            <Link to="/contact" className="btn-primary pulse-cta">Book a consultation</Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function FaqPreview() {
  const [openIndex, setOpenIndex] = useState(null);
  const preview = faqData.slice(0, 5);

  return (
    <div>
      {preview.map((f, i) => (
        <div className={`acc-item ${openIndex === i ? 'open' : ''}`} key={f.q}>
          <button className="acc-head" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
            <span>{f.q}</span>
            <Icon name="chevronDown" size={18} />
          </button>
          <div className="acc-body-wrap">
            <div className="acc-body-inner">
              <div className="acc-body">{f.a}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import faqData from '../data/faqData';
import { IMG } from '../data/images';
import PageHero from '../components/PageHero';
import { useState } from 'react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div>
      <PageHero
        compact
        image={IMG.laptopWork}
        eyebrow="Questions"
        title="Frequently asked questions"
        lead="Straight answers about loans, tax, GST, and visiting our Tarnaka desk. If your situation is not listed, contact us — we would rather hear it."
      />

      <div className="page wrap">
        <Reveal>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {faqData.map((f, i) => (
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
        </Reveal>

        <Reveal>
          <div className="faq-contact-strip faq-contact-roomy">
            <div>
              <h3>Still looking for an answer?</h3>
              <p>
                Joint income, NRI papers, a tax notice, a plot without a clean layout — those do not
                always fit a FAQ. Send a note or walk into Tarnaka and we will sit with the details.
              </p>
            </div>
            <div className="cta-row" style={{ margin: 0 }}>
              <Link to="/contact" className="btn-primary">Contact us</Link>
              <Link to="/emi-calculator" className="btn-ghost">Try the EMI calculator</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';
import servicesData from '../data/servicesData';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <div className="footer-brand">
            <svg viewBox="0 0 48 48" fill="none" width="26" height="26">
              <path d="M24 6L42 18H6L24 6Z" fill="#fff" />
              <rect x="9" y="19" width="4.5" height="18" rx="1.5" fill="#fff" />
              <rect x="17.5" y="19" width="4.5" height="18" rx="1.5" fill="#fff" />
              <rect x="26" y="19" width="4.5" height="18" rx="1.5" fill="#fff" />
              <rect x="34.5" y="19" width="4.5" height="18" rx="1.5" fill="#fff" />
              <rect x="6" y="39" width="33" height="3" rx="1.5" fill="#fff" />
              <path d="M22 24L28 18L34 22L43 11" stroke="#1F9E6D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            SKD Finance
          </div>
          <p style={{ maxWidth: 300 }}>
            Loans, tax filing, GST and labour licences from a desk in Tarnaka, Hyderabad —
            one advisor from first sitting to a finished file.
          </p>
        </div>

        <div>
          <h5>Services</h5>
          {servicesData.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`}>{s.name}</Link>
          ))}
        </div>

        <div>
          <h5>Quick links</h5>
          <Link to="/documents">Documents Required</Link>
          <Link to="/emi-calculator">EMI Calculator</Link>
          <Link to="/testimonials">Testimonials</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/track">Track Application</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>

      <div className="wrap footer-copy">
        <span>© 2026 SKD Finance Service</span>
        <span>H.No. 12-5-16/4, Vijayapuri Colony, Tarnaka, Hyderabad – 500017</span>
      </div>
    </footer>
  );
}

import { IMG } from '../data/images';
import SafeImage from './SafeImage';

export default function AuthShell({ title, subtitle, children, sideTitle, sideText }) {
  return (
    <div className="auth-stage">
      <div className="auth-mesh" aria-hidden="true" />
      <div className="auth-orb auth-orb-1" aria-hidden="true" />
      <div className="auth-orb auth-orb-2" aria-hidden="true" />
      <div className="auth-orb auth-orb-3" aria-hidden="true" />
      <div className="auth-grid">
        <aside className="auth-visual">
          <SafeImage src={IMG.auth} alt="" />
          <div className="auth-visual-shade" />
          <div className="auth-visual-copy">
            <p className="auth-kicker">SKD Finance · Tarnaka, Hyderabad</p>
            <h2>{sideTitle}</h2>
            <p>{sideText}</p>
            <ul className="auth-ticks">
              <li>One advisor from first call to disbursement</li>
              <li>Loans, tax, GST and licences at one desk</li>
              <li>Walk in to Tarnaka or start from here</li>
            </ul>
          </div>
        </aside>
        <div className="auth-panel">
          <div className="auth-card float-in">
            <h2>{title}</h2>
            <p className="auth-sub">{subtitle}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
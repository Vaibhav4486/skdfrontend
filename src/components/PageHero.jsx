import Reveal from './Reveal';
import SafeImage from './SafeImage';
import { IMG } from '../data/images';

export default function PageHero({ eyebrow, title, lead, image, compact }) {
  return (
    <section className={`hero page-hero ${compact ? 'page-hero-compact' : ''}`}>
      <SafeImage className="hero-bg ken-burns" src={image || IMG.hyderabadCity} alt="" />
      <div className="hero-overlay mesh-overlay" />
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />
      <div className="wrap">
        <div className="hero-content">
          {eyebrow && (
            <Reveal>
              <span className="badge-pill glow-pill">{eyebrow}</span>
            </Reveal>
          )}
          <Reveal delay={70}>
            <h1>{title}</h1>
          </Reveal>
          {lead && (
            <Reveal delay={140}>
              <p className="lead">{lead}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
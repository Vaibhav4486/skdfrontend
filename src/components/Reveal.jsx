import useReveal from '../hooks/useReveal';

/**
 * Wrap anything in <Reveal> and it fades/slides up once scrolled into view.
 * `delay` (ms) staggers a group of siblings — pass i * 80 in a .map() loop.
 */
export default function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}

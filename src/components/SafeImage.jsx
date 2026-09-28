import { useState } from 'react';

/**
 * Drop-in replacement for <img>. If the image fails to load (dead link,
 * hotlink block, network hiccup — whatever), it swaps to a soft brand-colour
 * gradient panel instead of the browser's broken-image icon, so a single
 * bad photo URL never leaves a visible hole in the page. Keeps whatever
 * className you pass (e.g. "hero-bg ken-burns" or nothing) so it drops into
 * existing layouts without any other changes.
 */
export default function SafeImage({ src, alt = '', className = '' }) {
  const [errored, setErrored] = useState(false);

  if (errored || !src) {
    return <div className={`${className} img-fallback`.trim()} role={alt ? 'img' : undefined} aria-label={alt || undefined} />;
  }

  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setErrored(true)} />;
}
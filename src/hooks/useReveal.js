import { useEffect, useRef, useState } from 'react';

/**
 * Attach the returned ref to any element; `visible` flips to true once it
 * scrolls into view, then stays true (the observer disconnects itself —
 * no point re-animating something the user already scrolled past once).
 */
export default function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '80px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

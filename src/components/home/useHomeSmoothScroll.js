import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function useHomeSmoothScroll(mobile = false) {
  useEffect(() => {
    if (mobile) return;
    let destination = window.scrollY;
    let tween;

    const stop = () => {
      tween?.kill();
      tween = null;
      destination = window.scrollY;
    };

    const wheel = event => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || !event.deltaY) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (document.querySelector('.nintendo-intro, dialog[open]')) return;
      if (['hidden', 'clip'].includes(getComputedStyle(document.body).overflowY)) return;

      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest('.home-news-mobile')) return;
      for (let node = target; node && node !== document.documentElement; node = node.parentElement) {
        const overflow = getComputedStyle(node).overflowY;
        if (node.scrollHeight > node.clientHeight + 1 && ['auto', 'scroll'].includes(overflow)) return;
      }

      const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      if (!maximum) return;
      const multiplier = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? window.innerHeight : 1;
      const base = tween?.isActive() ? destination : window.scrollY;
      destination = Math.max(0, Math.min(maximum, base + event.deltaY * multiplier));
      event.preventDefault();
      tween?.kill();
      tween = gsap.to(window, {
        scrollTo: { y: destination, autoKill: true },
        duration: 0.65,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    window.addEventListener('wheel', wheel, { passive: false });
    window.addEventListener('pointerdown', stop, { passive: true });
    window.addEventListener('touchstart', stop, { passive: true });
    window.addEventListener('keydown', stop);
    return () => {
      window.removeEventListener('wheel', wheel);
      window.removeEventListener('pointerdown', stop);
      window.removeEventListener('touchstart', stop);
      window.removeEventListener('keydown', stop);
      stop();
    };
  }, [mobile]);
}

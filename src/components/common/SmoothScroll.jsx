import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      syncTouch: false,
      autoRaf: false,
      virtualScroll: ({ event }) => {
        if (!event.defaultPrevented) return true;
        // Console cards and modal/intro controls own this input. Also cancel
        // any previous inertia so it cannot carry the page past the console.
        lenis.scrollTo(window.scrollY, { immediate: true, force: true });
        return false;
      },
    });

    const update = (time) => {
      if (getComputedStyle(document.body).overflowY === 'hidden') {
        lenis.stop();
        lenis.scrollTo(window.scrollY, { immediate: true, force: true });
        return;
      }
      if (lenis.isStopped) lenis.start();
      // Hero transitions and browser navigation can reposition the page
      // directly. Discard stale inertia instead of undoing that position.
      if (Math.abs(lenis.actualScroll - lenis.animatedScroll) > 1) {
        lenis.scrollTo(lenis.actualScroll, { immediate: true, force: true });
      }
      lenis.raf(time * 1000);
    };
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);

  return null;
}

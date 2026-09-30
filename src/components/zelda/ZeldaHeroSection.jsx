import { useEffect, useRef } from 'react';

export default function ZeldaHeroSection() {
  const heroRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const updateScrollHint = () => {
      frame = 0;
      const hero = heroRef.current;
      if (!hero) return;
      const { top, height } = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -top / Math.max(1, height / 2)));
      const easedProgress = progress * progress * (3 - 2 * progress);
      hero.style.setProperty('--scroll-hint-exit', String(easedProgress));
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollHint);
    };

    updateScrollHint();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={heroRef} className="zelda-hero" aria-labelledby="zelda-title">
      <img className="zelda-hero__background" src={`${import.meta.env.BASE_URL}images/zelda/hero.png`} alt="" fetchPriority="high" />
      <h1 className="zelda-hero__title" id="zelda-title" aria-label="The Legend of Zelda" tabIndex={-1}>
        <img src={`${import.meta.env.BASE_URL}images/zelda/logo.svg`} alt="" />
      </h1>
      <span className="zelda-hero__scroll">Scroll Down</span>
      <span className="zelda-hero__scroll-line" aria-hidden="true" />
    </section>
  );
}

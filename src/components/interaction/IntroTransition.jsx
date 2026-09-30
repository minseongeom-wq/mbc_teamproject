import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './IntroTransition.css';

gsap.registerPlugin(ScrollTrigger);

export default function IntroTransition({ symbolSrc, smallTitle, mainVisualSelector, children }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context((self) => {
      const symbol = root.querySelector('.intro-transition__symbol');
      const small = root.querySelector('.intro-transition__small-title');
      const line = root.querySelector('.intro-transition__line');
      const redContent = root.querySelector('.intro-transition__red-content');
      const mainVisual = root.querySelector(mainVisualSelector);

      gsap.set([symbol, small, redContent], { autoAlpha: 0 });
      gsap.set(line, { scaleX: 0, scaleY: 1 / root.offsetHeight, transformOrigin: '50% 50%' });
      if (mainVisual) gsap.set(mainVisual, { autoAlpha: 0, scale: 0.85, transformOrigin: '50% 50%' });

      self.add('activateScroll', () => {
        const scroll = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: () => `+=${root.offsetHeight}`,
            scrub: 0.8,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            refreshPriority: 1,
            invalidateOnRefresh: true,
          },
        });
        scroll.to(redContent, { yPercent: -42, ease: 'none' }, 0);
        ScrollTrigger.refresh();
      });

      self.activateScroll();
      const intro = gsap.timeline();

      intro
        .fromTo(symbol, { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.65, ease: 'power3.out' }, 0.2)
        .fromTo(small, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.42)
        .to(line, { scaleX: () => Math.min(1, 1920 / root.clientWidth), duration: 0.72, ease: 'power3.inOut' }, 0.98)
        .to([symbol, small], { autoAlpha: 0, duration: 0.24, ease: 'power2.in' }, 1.6)
        .to(line, { scaleX: 1, scaleY: 1, duration: 1.05, ease: 'power4.inOut' }, 1.83)
        .to(redContent, { autoAlpha: 1, duration: 0.22 }, 2.53);

      if (mainVisual) {
        intro.to(mainVisual, { autoAlpha: 1, scale: 1, duration: 0.82, ease: 'power3.out' }, 2.58);
      }
    }, root);

    return () => {
      ctx.revert();
    };
  }, [mainVisualSelector]);

  return (
    <section className="intro-transition" ref={rootRef} aria-label="Nintendo history intro">
      <div className="intro-transition__white">
        <img className="intro-transition__symbol" src={symbolSrc} alt="" />
        <h1 className="intro-transition__small-title">{smallTitle}</h1>
      </div>
      <div className="intro-transition__line" aria-hidden="true" />
      <div className="intro-transition__red-content">{children}</div>
    </section>
  );
}

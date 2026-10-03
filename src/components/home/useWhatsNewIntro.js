import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useWhatsNewIntro(sectionRef, mobile) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (mobile || !section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      const words = [...section.querySelectorAll(mobile
        ? '.home-news-mobile__intro-word'
        : '.home-news__intro-word')];
      const pixels = mobile ? [] : [
        '.home-news__dot-3',
        '.home-news__dot',
        '.home-news__dot-2',
      ].map(selector => section.querySelector(selector)).filter(Boolean);
      const description = section.querySelector(mobile ? '.home-news-mobile__text-2' : '.home-news__text');
      const discover = section.querySelector(mobile ? '.home-news-mobile__text-3' : '.home-news__text-2');
      if (words.length !== 2 || !description || !discover) return;

      gsap.set(words, { autoAlpha: 0, scale: 0.86, y: 26, transformOrigin: '50% 60%' });
      if (pixels.length) gsap.set(pixels, { autoAlpha: 0, scale: 0.7, y: 8, transformOrigin: 'center center' });
      gsap.set([description, discover], { autoAlpha: 0, y: 14 });

      const timeline = gsap.timeline({ paused: true });
      timeline.to(words[0], { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0)
        .to(words[1], { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.12);
      pixels.forEach((pixel, index) => {
        timeline.to(pixel, { autoAlpha: 1, scale: 1, y: 0, duration: 0.28, ease: 'back.out(1.4)' }, 0.25 + index * 0.08);
      });
      timeline.to(description, { autoAlpha: 1, y: 0, duration: 0.38, ease: 'power2.out' }, 0.65)
        .to(discover, { autoAlpha: 1, y: 0, duration: 0.38, ease: 'power2.out' }, 0.8);

      ScrollTrigger.create({
        trigger: section,
        start: 'top 12%',
        animation: timeline,
        toggleActions: 'play none play reverse',
      });
    }, section);

    return () => context.revert();
  }, [sectionRef, mobile]);
}

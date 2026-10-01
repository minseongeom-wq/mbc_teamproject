import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useWhatsNewParallax(sectionRef, mobile) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || mobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      const characters = [...section.querySelectorAll('[data-news-parallax]')];
      if (!characters.length) return;

      gsap.to(characters, {
        y: (_, character) => -Number(character.dataset.newsParallax),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => context.revert();
  }, [sectionRef, mobile]);
}

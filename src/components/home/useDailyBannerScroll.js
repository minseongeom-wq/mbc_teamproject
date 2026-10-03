import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Figma frames 07 1 → 07 2 → 07 3 → 07 4 → 07 5.
const frames = [
  { x: 0, putting: -24, smiles: 0, block: 0, onThe: 0, faces: 0, art: 0 },
  { x: 155, putting: 0, smiles: -23.5, block: 0, onThe: 0, faces: 0, art: -1 },
  { x: 302, putting: 0, smiles: .5, block: -14, onThe: 0, faces: 0, art: 0 },
  { x: 435, putting: 0, smiles: .5, block: 0, onThe: -23.5, faces: 0, art: 0 },
  { x: 580, putting: 0, smiles: .5, block: 0, onThe: -.5, faces: -24, art: 0 },
];

export default function useDailyBannerScroll(sectionRef, mobile) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (mobile || !section) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      let active = true;
      let refreshFrame;
      let timeline;
      const context = gsap.context(() => {
        const mario = section.querySelector('[data-banner-mario]');
        const art = section.querySelector('[data-banner-mario-art]');
        const block = section.querySelector('[data-banner-block]');
        const words = Object.fromEntries(['putting', 'smiles', 'on-the', 'faces'].map(word =>
          [word, section.querySelector(`[data-banner-word="${word}"]`)]));
        const canvas = section.closest('.home-page__canvas');
        const zoom = () => Number.parseFloat(getComputedStyle(canvas).zoom) || 1;
        const setPinY = gsap.quickSetter(section, 'y', 'px');
        const updatePin = self => {
          const travel = Math.max(0, Math.min(self.end - self.start, -self.spacer.getBoundingClientRect().top));
          setPinY(travel / zoom());
        };
        gsap.set(words.putting, { y: frames[0].putting });
        timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: 'daily-nintendo-banner', trigger: section,
            // Start only when the viewport-height section has fully entered.
            // ScrollTrigger temporarily removes the spacer while refreshing.
            // Measure the reverted section itself in real document pixels so
            // earlier CSS-zoom pins cannot start this timeline during entry.
            start: () => section.getBoundingClientRect().top + window.scrollY,
            end: () => `+=${window.innerHeight * 3}`,
            pin: true, pinType: 'transform', scrub: true, invalidateOnRefresh: true,
            onUpdate: updatePin,
            onRefresh: self => {
              const spacing = (self.end - self.start) / zoom();
              self.spacer.style.paddingBottom = `${spacing}px`;
              self.spacer.style.height = `${section.offsetHeight + spacing}px`;
              updatePin(self);
            },
          },
        });
        // Each reference frame has a scroll-controlled hold. No autoplay/timer.
        timeline.to({}, { duration: 8 }, 0);
        frames.slice(1).forEach((frame, index) => {
          const at = .6 + index * 2;
          timeline.to(mario, { x: frame.x, duration: 1 }, at)
            // One scroll-controlled jump between each pair of words. The feet
            // return to the original Figma position at every reference frame.
            .to(mario, { y: -72, duration: .5, ease: 'power2.out' }, at)
            .to(mario, { y: 0, duration: .5, ease: 'power2.in' }, at + .5)
            .to(mario, { scaleX: 1.08, scaleY: .9, duration: .1, ease: 'power1.out' }, at + .94)
            .to(mario, { scaleX: 1, scaleY: 1, duration: .16, ease: 'power1.out' }, at + 1.04)
            .to(art, { y: frame.art, duration: 1 }, at)
            .to(words.putting, { y: frame.putting, duration: 1 }, at)
            .to(words.smiles, { y: frame.smiles, duration: 1 }, at)
            .to(block, { y: frame.block, duration: 1 }, at)
            .to(words['on-the'], { y: frame.onThe, duration: 1 }, at)
            .to(words.faces, { y: frame.faces, duration: 1 }, at);
        });
      }, section);
      // Earlier Home pins correct their CSS-zoom spacers in onRefresh, after
      // the global pass measures downstream starts. Re-measure 07 once those
      // corrections have completed, including on browser resize and font load.
      const refreshStart = () => { if (active) timeline.scrollTrigger.refresh(); };
      ScrollTrigger.addEventListener('refresh', refreshStart);
      const refresh = () => {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => { if (active) ScrollTrigger.refresh(); });
      };
      const observer = new ResizeObserver(refresh);
      observer.observe(section);
      document.fonts.ready.then(refresh);
      return () => {
        active = false;
        ScrollTrigger.removeEventListener('refresh', refreshStart);
        observer.disconnect();
        cancelAnimationFrame(refreshFrame);
        context.revert();
      };
    });
    return () => media.revert();
  }, [sectionRef, mobile]);
}

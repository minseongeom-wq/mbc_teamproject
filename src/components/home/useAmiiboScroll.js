import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Matching shorthand avoids unequal interpolation when the browser serializes
// four inset values as two: both horizontal edges always share one value.
const CLOSED = 'inset(0% 50%)';
const OPEN = 'inset(0% 0%)';

export default function useAmiiboScroll(sectionRef, mobile) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      let refreshFrame;
      let active = true;
      let timeline;
      const context = gsap.context(() => {
        const prefix = mobile ? '.home-amiibo-mobile' : '.home-amiibo';
        const firstTitle = section.querySelector(`${prefix}__${mobile ? 'text' : 'text-2'}`);
        const secondTitle = section.querySelector(`${prefix}__${mobile ? 'text-2' : 'text-3'}`);
        const copy = section.querySelector(`${prefix}__${mobile ? 'text-3' : 'text'}`);
        const line = section.querySelector('.home-amiibo__image-13');
        const emphasis = [...section.querySelectorAll('.home-amiibo__layer-3, .home-amiibo__layer-6, .home-amiibo__layer-9')];
        const pixels = [...section.querySelectorAll('[data-name="Dot"]')];
        const tracks = [...section.querySelectorAll('.home-amiibo-track')];
        const canvas = section.closest('.home-page__canvas');
        const setPinY = gsap.quickSetter(section, 'y', 'px');
        const zoom = () => Number.parseFloat(getComputedStyle(canvas).zoom) || 1;
        const updatePin = self => {
          // Scroll distances are viewport pixels; transforms and spacer sizes
          // inside the existing zoomed canvas use unscaled design pixels.
          const travel = Math.max(0, Math.min(self.end - self.start, self.scroll() - self.start));
          setPinY(travel / zoom());
          section.toggleAttribute('data-amiibo-rolling', self.progress === 1);
        };
        const refreshPin = self => {
          const spacing = (self.end - self.start) / zoom();
          self.spacer.style.paddingBottom = `${spacing}px`;
          self.spacer.style.height = `${section.offsetHeight + spacing}px`;
          updatePin(self);
        };

        // Only transform offsets: zero always restores the original Figma slots.
        gsap.set(firstTitle, { x: mobile ? 12 : 60, y: mobile ? 9 : 35 });
        gsap.set(secondTitle, { x: mobile ? -10 : -40, y: mobile ? -9 : -35 });
        gsap.set(copy, { clipPath: CLOSED });
        if (line) gsap.set(line, { clipPath: CLOSED });
        if (emphasis.length || pixels.length) {
          gsap.set([...emphasis, ...pixels], { opacity: 0, scale: 0.5, transformOrigin: 'center center' });
        }
        tracks.forEach(track => {
          [...track.children].forEach((figure, index) => {
            gsap.set(figure, {
              opacity: 0, y: mobile ? 20 : 70, scale: 0.94,
              rotation: index % 2 ? 1.5 : -1.5, transformOrigin: '50% 100%',
            });
          });
        });

        timeline = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: section,
            start: () => {
              const header = document.querySelector('.common-header');
              const offset = header && getComputedStyle(header).position === 'fixed'
                ? Math.max(0, header.getBoundingClientRect().bottom) : 0;
              return `top top+=${offset}`;
            },
            end: () => `+=${window.innerHeight * 1.5}`,
            pin: section,
            pinType: 'transform',
            pinSpacing: true,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: updatePin,
            onRefresh: refreshPin,
          },
        });
        // Four timeline units map directly to scroll progress. The first 12%
        // is a real, reversible hold; the last frame is the original design.
        timeline.to({}, { duration: 4 }, 0)
          .to([firstTitle, secondTitle], { x: 0, y: 0, duration: 1.2 }, 0.48)
          .to(copy, { clipPath: OPEN, duration: 1.04 }, 1.28);
        if (line) timeline.to(line, { clipPath: OPEN, duration: 1.2, ease: 'none' }, 1.92);
        emphasis.forEach((element, index) => {
          timeline.to(element, { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' }, 2.28 + index * 0.06);
        });
        pixels.forEach((element, index) => {
          timeline.to(element, { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' }, 2.34 + index * 0.06);
        });
        tracks.forEach(track => {
          [...track.children].forEach((figure, index) => {
            const at = 2.8 + index * 0.06;
            timeline.to(figure, { opacity: 1, y: 0, scale: 1.02, rotation: 0, duration: 0.3, ease: 'power2.out' }, at)
              .to(figure, { scale: 1, duration: 0.12, ease: 'power1.inOut' }, at + 0.3);
          });
        });
      }, section);

      // Home's CSS zoom can settle after mount. Refresh only this trigger;
      // other Home transitions and their pinning remain untouched.
      const refresh = () => {
        if (refreshFrame !== undefined) cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => {
          refreshFrame = undefined;
          if (active) timeline.scrollTrigger.refresh();
        });
      };
      const observer = new ResizeObserver(refresh);
      observer.observe(section);
      document.fonts.ready.then(() => { if (active) refresh(); });
      return () => {
        active = false;
        observer.disconnect();
        if (refreshFrame !== undefined) cancelAnimationFrame(refreshFrame);
        context.revert();
        section.removeAttribute('data-amiibo-rolling');
      };
    });

    // Reduced motion renders the original final design without hidden content.
    return () => media.revert();
  }, [sectionRef, mobile]);
}

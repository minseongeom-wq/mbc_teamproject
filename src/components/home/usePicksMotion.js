import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import motion from './picksMotion.json';

gsap.registerPlugin(CustomEase, ScrollTrigger);
const easing = Object.fromEntries(Object.entries(motion.easing).map(([name, curve]) => [
  name, CustomEase.create(`picks-${name}`, curve.join(',')),
]));

// Exported snippet values from get_motion_context(2485:10400).
export default function usePicksMotion(sectionRef, mobile) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (mobile || !section) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      let active = true;
      let frame;
      let timeline;
      let trigger;
      const driver = section.parentElement;
      const originalPadding = driver.style.paddingBottom;
      const originalTranslate = section.style.translate;
      let extraDistance = 0;
      const measureDistance = () => {
        const rect = section.getBoundingClientRect();
        const zoom = rect.width / section.offsetWidth;
        const normalDistance = rect.height + window.innerHeight;
        extraDistance = normalDistance / zoom;
        driver.style.paddingBottom = `${extraDistance}px`;
        return normalDistance * 2;
      };
      const positionVisual = progress => {
        // Counter the added document distance without stretching or pinning the artwork.
        section.style.translate = `0 ${extraDistance * progress}px`;
      };
      const context = gsap.context(() => {
        // This coordinate axis is section progress, never elapsed playback time.
        timeline = gsap.timeline({ paused: true });
        timeline.to({}, { duration: 1 }, 0);
        const addTrack = (target, from, to, times, ease) => {
          gsap.set(target, from);
          timeline.to(target, {
            ...to, duration: times[2] - times[1], ease,
          }, times[1]);
        };
        for (const node of motion.nodes) {
          const element = section.querySelector(`[data-node-id="${node.nodeId}"]`);
          if (!element) throw new Error(`Missing Figma motion node ${node.nodeId}`);
          if (node.nodeId === '2485:10470') {
            const words = element.querySelectorAll('.home-picks__intro-word');
            const start = node.times.opacity[1];
            const span = node.times.opacity[2] - start;
            words.forEach((word, index) => {
              gsap.set(word, { autoAlpha: 0, scale: 0.86, y: 26, transformOrigin: '50% 60%' });
              timeline.to(word, {
                autoAlpha: 1, scale: 1, y: 0, duration: span * 0.8, ease: 'power3.out',
              }, start + span * 0.2 * index);
            });
          }
          if (node.kind === 'path') {
            addTrack(element.querySelector('path'), { attr: { 'stroke-dasharray': '0 1', 'stroke-dashoffset': 0 } },
              { attr: { 'stroke-dasharray': '1 1' } }, node.times.strokeDasharray, easing.easeInOut);
          } else {
            const opacityTarget = node.nodeId === '2485:10474'
              ? element.querySelector('.home-picks__badge-image') : element;
            addTrack(opacityTarget, { opacity: 0 }, { opacity: 1 }, node.times.opacity, easing.easeOut);
            if (node.kind === 'checkpoint') {
              addTrack(element, { scaleX: 0.55, scaleY: 0.55 }, { scaleX: 1, scaleY: 1 },
                node.times.scaleX, easing.checkpoint);
            } else {
              addTrack(element, { y: node.y }, { y: 0 }, node.times.y, easing.easeOut);
            }
          }
        }
        trigger = ScrollTrigger.create({
          trigger: section,
          start: () => driver.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.85,
          end: self => `+=${measureDistance() || self.trigger.offsetHeight}`,
          animation: timeline,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: self => positionVisual(self.progress),
          onRefresh: self => positionVisual(self.progress),
        });
      }, section);
      const refresh = () => {
        if (frame !== undefined) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          frame = undefined;
          if (active) trigger.refresh();
        });
      };
      const observer = new ResizeObserver(refresh);
      observer.observe(section);
      document.fonts.ready.then(() => { if (active) refresh(); });
      return () => {
        active = false;
        observer.disconnect();
        if (frame !== undefined) cancelAnimationFrame(frame);
        context.revert();
        driver.style.paddingBottom = originalPadding;
        section.style.translate = originalTranslate;
      };
    });
    return () => media.revert();
  }, [sectionRef, mobile]);
}

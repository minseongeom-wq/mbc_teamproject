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
          start: 'top bottom',
          end: 'bottom top',
          animation: timeline,
          scrub: true,
          invalidateOnRefresh: true,
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
      };
    });
    return () => media.revert();
  }, [sectionRef, mobile]);
}

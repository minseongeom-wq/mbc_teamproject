import { createElement, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HistoryBrandStatement01 from './HistoryBrandStatement01';
import HistoryBrandStatement02 from './HistoryBrandStatement02';
import HistoryBrandStatement03 from './HistoryBrandStatement03';
import './HistoryServiceStack.css';

gsap.registerPlugin(ScrollTrigger);

const servicePanels = [
  { id: 'originality', Component: HistoryBrandStatement01 },
  { id: 'flexibility', Component: HistoryBrandStatement02 },
  { id: 'sincerity', Component: HistoryBrandStatement03 },
];

export default function HistoryServiceStack() {
  const stackRef = useRef(null);

  useLayoutEffect(() => {
    const stack = stackRef.current;
    if (!stack || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const panels = [...stack.querySelectorAll('.history-service-stack__panel')];
    const ctx = gsap.context(() => {
      panels.forEach((panel, index) => {
        const title = panel.querySelector('.history-service-motion__title-text');
        const image = panel.querySelector('.history-service-motion__image');
        const copy = panel.querySelectorAll('.history-service-motion__copy > strong, .history-service-motion__copy > p');
        const panelStart = () => stack.getBoundingClientRect().top + window.scrollY
          + panels.slice(0, index).reduce((height, previous) => height + previous.offsetHeight, 0);

        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: stack,
            start: () => panelStart() - window.innerHeight,
            end: () => panelStart() - (parseFloat(getComputedStyle(panel).top) || 0),
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        reveal
          .fromTo(title,
            { y: 55, scaleY: 1.12, clipPath: 'inset(0% 0% 100% 0%)' },
            { y: 0, scaleY: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.68, ease: 'none' }, 0)
          .fromTo(image,
            { y: 125, scale: 0.78, rotation: index % 2 === 0 ? 3 : -3 },
            { y: 0, scale: 1, rotation: 0, duration: 1, ease: 'none' }, 0)
          .fromTo(copy,
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.62, stagger: 0.04, ease: 'none' }, 0.12);
      });
    }, stack);

    return () => ctx.revert();
  }, []);

  return (
    <div className="history-service-stack" ref={stackRef}>
      <div className="history-service-stack__entry-edge" aria-hidden="true" />
      {servicePanels.map(({ id, Component }, index) => (
        <div
          className={`history-service-stack__panel history-service-stack__panel--${id}`}
          style={{ zIndex: index + 1 }}
          key={id}
        >
          {createElement(Component)}
        </div>
      ))}
    </div>
  );
}

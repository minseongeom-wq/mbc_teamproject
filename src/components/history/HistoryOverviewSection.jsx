import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HistoryOverviewCanvas from './HistoryOverviewCanvas';
import { historyOverviewYears } from './historyOverviewData';
import { getOrbitPhase } from './historyOverviewOrbit';
import './HistoryOverviewSection.css';

gsap.registerPlugin(ScrollTrigger);

function HistoryOverviewSection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const sceneRenderRef = useRef(null);
  const progressRef = useRef(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const resize = () => {
      stage.style.setProperty('--overview-scale', Math.min(section.clientWidth / 1920, section.clientHeight / 1080));
    };
    const observer = new ResizeObserver(resize);
    observer.observe(section);
    resize();
    const render = (progress) => {
      const phase = getOrbitPhase(progress, historyOverviewYears.length);
      progressRef.current = phase;
      sceneRenderRef.current?.();
    };
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const state = { progress: 0 };
        gsap.to(state, {
          progress: 1, ease: 'none',
          onUpdate: () => render(state.progress),
          scrollTrigger: {
            trigger: section, start: 'top top',
            end: () => `+=${Math.round(window.innerHeight * historyOverviewYears.length * 1.8)}`,
            pin: true, pinSpacing: true, scrub: 0.9,
            invalidateOnRefresh: true, anticipatePin: 1,
          },
        });
        render(0);
      });
      media.add('(prefers-reduced-motion: reduce)', () => render(0));
    }, section);
    return () => { observer.disconnect(); context.revert(); };
  }, []);

  return (
    <section className="history-overview" ref={sectionRef} aria-label={`닌텐도 연혁: ${historyOverviewYears[0].year}년부터 ${historyOverviewYears.at(-1).year}년까지`}>
      <div className="history-overview__stage" ref={stageRef}>
        <div className="history-overview__canvas-host">
          <HistoryOverviewCanvas progressRef={progressRef} renderRef={sceneRenderRef} />
        </div>
        {historyOverviewYears.map((item) => (
          <div className="history-overview__sequence" key={item.year}>
            <span className="history-overview__sr-only">{item.description}</span>
          </div>
        ))}
        <div className="history-overview__headline-frame" aria-hidden="true">
          <div className="history-overview__headline"><span>FROM TODAY</span><span>1889-2026</span></div>
        </div>
        <div className="history-overview__subheadline-frame" aria-hidden="true">
          <span className="history-overview__subheadline">How Play evolved</span>
        </div>
        <div className="history-overview__location-frame" aria-hidden="true">
          <span className="history-overview__location">KYOTO, JAPAN</span>
        </div>
      </div>
    </section>
  );
}

export default HistoryOverviewSection;

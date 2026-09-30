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
  const surfaceRef = useRef(null);
  const sceneRenderRef = useRef(null);
  const progressRef = useRef(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const surface = surfaceRef.current;
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
        const canvas = stage.querySelector('.history-overview__canvas-host');
        const frame = stage.querySelectorAll('.history-overview__headline-frame, .history-overview__subheadline-frame, .history-overview__location-frame');
        const previousBackground = getComputedStyle(section.previousElementSibling).backgroundColor;
        const reveal = { progress: 0 };
        const showEntrance = () => {
          const p = reveal.progress;
          // The actual 08 surface travels above its document slot during entry.
          // Compensate its top without fixed positioning (the pin has a transform).
          const floating = p > 0 && p < 1;
          const radius = Math.hypot(window.innerWidth, window.innerHeight) / 2;
          gsap.set(surface, {
            y: floating ? -section.getBoundingClientRect().top : 0,
            clipPath: `circle(${p >= 1 ? radius + 2 : radius * Math.min(1, p / 0.78)}px at 50% 50%)`,
          });
          gsap.set(section, { backgroundColor: p < 1 ? previousBackground : 'transparent' });
          gsap.set(canvas, { opacity: gsap.utils.clamp(0, 1, (p - 0.55) / 0.3) });
          gsap.set(frame, { opacity: gsap.utils.clamp(0, 1, (p - 0.78) / 0.22) });
        };
        gsap.to(reveal, {
          progress: 1, ease: 'none', onUpdate: showEntrance,
          scrollTrigger: {
            trigger: section, start: 'top bottom', end: 'top top',
            scrub: true, invalidateOnRefresh: true, onRefresh: showEntrance,
          },
        });
        showEntrance();
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
      <div className="history-overview__surface" ref={surfaceRef}>
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
      </div>
    </section>
  );
}

export default HistoryOverviewSection;

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HistoryOverviewCanvas from './HistoryOverviewCanvas.jsx';
import { historyOverviewYears } from './historyOverviewData.js';

gsap.registerPlugin(ScrollTrigger);

export default function HistoryMobileOverview() {
  const trackRef = useRef(null);
  const sceneRef = useRef(null);
  const progressRef = useRef(0);
  const renderRef = useRef(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const scene = sceneRef.current;
    let refreshFrame;
    let active = true;
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const scale = () => track.getBoundingClientRect().width / 360;
        const scrollDistance = () => window.innerHeight * historyOverviewYears.length * 1.2;
        const updateHeight = () => { track.style.height = `${643 + scrollDistance() / scale()}px`; };
        updateHeight();
        const entrance = { progress: 0 };
        const showEntrance = () => {
          const p = entrance.progress;
          const inset = 50 * (1 - Math.min(1, p / .78));
          gsap.set(scene, {
            y: p > 0 && p < 1 ? -track.getBoundingClientRect().top / scale() : 0,
            clipPath: `inset(0% ${inset}%)`,
          });
          gsap.set(track, { backgroundColor: p < 1 ? '#e60012' : '#151515' });
        };
        gsap.to(entrance, {
          progress: 1, ease: 'none', onUpdate: showEntrance,
          scrollTrigger: { trigger: track, start: 'top bottom', end: 'top top', scrub: true, onRefresh: showEntrance },
        });
        const state = { progress: 0 };
        gsap.to(state, {
          progress: 1, ease: 'none',
          onUpdate: () => {
            progressRef.current = state.progress * (historyOverviewYears.length - 1 / 3);
            renderRef.current?.();
          },
          scrollTrigger: {
            trigger: track, start: 'top top', end: () => `+=${scrollDistance()}`,
            scrub: .6, invalidateOnRefresh: true, onRefreshInit: updateHeight,
          },
        });
        return () => { track.style.removeProperty('height'); };
      });
      media.add('(prefers-reduced-motion: reduce)', () => {
        progressRef.current = 0;
        renderRef.current?.();
      });
    }, track);
    const refresh = () => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => { if (active) ScrollTrigger.refresh(); });
    };
    // Observe the fixed artboard instead of the height extended for scrolling.
    const observer = new ResizeObserver(refresh);
    observer.observe(scene);
    window.addEventListener('resize', refresh);
    document.fonts.ready.then(refresh);
    refresh();
    return () => {
      active = false;
      observer.disconnect();
      window.removeEventListener('resize', refresh);
      cancelAnimationFrame(refreshFrame);
      context.revert();
    };
  }, []);

  return <div className="history-mobile__overview-track" ref={trackRef}>
    <section className="history-mobile__overview" ref={sceneRef} data-node-id="2119:6311" aria-label="1889년부터 이어진 놀이의 역사">
      <HistoryOverviewCanvas mobile progressRef={progressRef} renderRef={renderRef} />
      <p className="history-mobile__location">KYOTO, JAPAN</p>
      <h2>FROM TODAY<br />1889-2026</h2>
      <p className="history-mobile__evolved">How Play evolved</p>
      {historyOverviewYears.map(item => <span className="history-overview__sr-only" key={item.year}>{item.year}: {item.description}</span>)}
    </section>
  </div>;
}

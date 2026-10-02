import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ZeldaHeroSection from './ZeldaHeroSection';
import ZeldaVideoSection from './ZeldaVideoSection';
import ZeldaCharacterSection from './ZeldaCharacterSection';
import ZeldaContent2Section from './ZeldaContent2Section';
import ZeldaContent3Section from './ZeldaContent3Section';
import ZeldaContent4Section from './ZeldaContent4Section';
import ZeldaAboutSection from './ZeldaAboutSection';
import ZeldaStoreSection from './ZeldaStoreSection';
import './style.css';

export default function ZeldaContent() {
  const pageRef = useRef(null);
  const [activeDiamond, setActiveDiamond] = useState(0);
  const [gameplayOverlapPhase, setGameplayOverlapPhase] = useState('character');
  const gameplayOverlapComplete = gameplayOverlapPhase === 'complete';

  useEffect(() => {
    let frame = 0;
    const sections = [
      ['.zelda-hero', 0],
      ['.zelda-video__scroll-track', 0],
      ['.zelda-store', null],
    ].map(([selector, active]) => [pageRef.current?.querySelector(selector), active]);
    const updateDiamond = () => {
      frame = 0;
      const middle = window.innerHeight / 2;
      const sequence = pageRef.current?.querySelector('.zelda-character-gameplay');
      const sequenceBounds = sequence?.getBoundingClientRect();
      if (sequenceBounds?.top <= middle && sequenceBounds.bottom > middle) {
        const sceneHeight = sequence.querySelector('.zelda-character__stage')?.offsetHeight || window.innerHeight;
        const scrolled = -sequenceBounds.top;
        if (scrolled >= 16.65 * sceneHeight) setActiveDiamond(null);
        else if (scrolled >= 13.75 * sceneHeight) setActiveDiamond(4);
        else if (scrolled >= 10.85 * sceneHeight) setActiveDiamond(3);
        else setActiveDiamond(gameplayOverlapComplete ? 2 : 1);
        return;
      }
      const current = sections.find(([element]) => {
        if (!element) return false;
        const { top, bottom } = element.getBoundingClientRect();
        return top <= middle && bottom > middle;
      });
      setActiveDiamond(current ? current[1] : null);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateDiamond);
    };

    updateDiamond();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, [gameplayOverlapComplete]);

  useEffect(() => {
    let frame = 0;
    const clamp = value => Math.min(1, Math.max(0, value));
    const setProgress = (element, property, value) => {
      element.style.setProperty(property, String(value));
    };
    const updateTransitions = () => {
      frame = 0;
      const root = pageRef.current;
      if (!root) return;

      const sequence = root.querySelector('.zelda-character-gameplay');
      const gameplay = root.querySelector('.zelda-gameplay');
      const layers = [...root.querySelectorAll('[data-zelda-transition-layer]')];
      if (!sequence || !gameplay || layers.length !== 3) return;
      const pages = [gameplay, ...layers.map(layer => layer.firstElementChild)];
      const sceneHeight = sequence.querySelector('.zelda-character__stage')?.offsetHeight || window.innerHeight;
      const scrolled = -sequence.getBoundingClientRect().top;
      const transitionDistance = sceneHeight * 1.9;
      const starts = [9.9, 12.8, 15.7];
      const ends = [14.7, 17.6, 19.6];

      layers.forEach((layer, index) => {
        const incoming = layer.firstElementChild;
        const outgoing = pages[index];
        if (!incoming || !outgoing) return;

        const start = starts[index] * sceneHeight;
        const progress = clamp((scrolled - start) / transitionDistance);
        const active = scrolled >= start && scrolled < start + transitionDistance;
        layer.classList.toggle('zelda-transition-layer--visible', scrolled >= start && scrolled < ends[index] * sceneHeight);
        incoming.classList.toggle('zelda-transition-entering', active);
        outgoing.classList.toggle('zelda-transition-exiting', active);
        incoming.classList.toggle('zelda-transition-settled', scrolled >= start + transitionDistance && scrolled < ends[index] * sceneHeight);
        if (!active) return;

        const imageExit = clamp(progress * 3);
        const frameExit = clamp((progress - 1 / 6) * 3);
        const background = clamp((progress - 1 / 3) * 3);
        const frameEnter = clamp((progress - .5) * 3);
        const imageEnter = clamp((progress - 2 / 3) * 3);

        setProgress(outgoing, '--transition-background-opacity', 1);
        setProgress(outgoing, '--transition-frame-opacity', 1 - frameExit);
        setProgress(outgoing, '--transition-image-opacity', 1 - imageExit);
        setProgress(outgoing, '--transition-image-scale', 1 - .04 * imageExit);
        setProgress(outgoing, '--transition-frame-blur', `${8 * frameExit}px`);
        setProgress(incoming, '--transition-background-opacity', background);
        setProgress(incoming, '--transition-frame-opacity', frameEnter);
        setProgress(incoming, '--transition-image-opacity', imageEnter);
        setProgress(incoming, '--transition-image-scale', .96 + .04 * imageEnter);
        setProgress(incoming, '--transition-frame-blur', `${8 * (1 - frameEnter)}px`);
      });
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateTransitions);
    };

    updateTransitions();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const displayedDiamond = gameplayOverlapComplete && activeDiamond === 1 ? 2 : activeDiamond;

  return (
    <>
    <div className="zelda-content" ref={pageRef}>
      <ZeldaHeroSection />
      <ZeldaVideoSection />
      <div className="zelda-character-gameplay">
        <ZeldaCharacterSection onTransitionPhase={setGameplayOverlapPhase} />
        <ZeldaContent2Section overlapPhase={gameplayOverlapPhase} />
        <div className="zelda-transition-layer zelda-transition-layer--combat" data-zelda-transition-layer>
          <ZeldaContent3Section />
        </div>
        <div className="zelda-transition-layer zelda-transition-layer--villages" data-zelda-transition-layer>
          <ZeldaContent4Section />
        </div>
        <div className="zelda-transition-layer zelda-transition-layer--about" data-zelda-transition-layer>
          <ZeldaAboutSection />
        </div>
      </div>
      <ZeldaStoreSection />
    </div>
    {createPortal(
      <div className="zelda-page__diamond-bar" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} className={displayedDiamond === index ? 'zelda-page__diamond--active' : undefined} />
        ))}
      </div>,
      document.body,
    )}
    </>
  );
}

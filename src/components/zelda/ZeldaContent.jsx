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
      ['.zelda-character', 1],
      ['.zelda-gameplay', 2],
      ['.zelda-combat', 3],
      ['.zelda-villages', 4],
      ['.zelda-about', null],
      ['.zelda-store', null],
    ].map(([selector, active]) => [pageRef.current?.querySelector(selector), active]);
    const updateDiamond = () => {
      frame = 0;
      const middle = window.innerHeight / 2;
      const gameplay = pageRef.current?.querySelector('.zelda-gameplay');
      const gameplayBounds = gameplay?.getBoundingClientRect();
      if (gameplayOverlapComplete && gameplayBounds?.bottom > middle) {
        setActiveDiamond(2);
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

  const displayedDiamond = gameplayOverlapComplete && activeDiamond === 1 ? 2 : activeDiamond;

  return (
    <>
    <div className="zelda-content" ref={pageRef}>
      <ZeldaHeroSection />
      <ZeldaVideoSection />
      <div className="zelda-character-gameplay">
        <ZeldaCharacterSection onTransitionPhase={setGameplayOverlapPhase} />
        <ZeldaContent2Section overlapPhase={gameplayOverlapPhase} />
      </div>
      <ZeldaContent3Section />
      <ZeldaContent4Section />
      <ZeldaAboutSection />
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

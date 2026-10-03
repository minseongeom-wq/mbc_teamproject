import { useLayoutEffect, useRef, useState } from 'react';
import HeroSection from '../../components/home/HeroSection.jsx';
import GameDiscoverySection from '../../components/home/GameDiscoverySection.jsx';
import WhatsNewSection from '../../components/home/WhatsNewSection.jsx';
import AmiiboSection from '../../components/home/AmiiboSection.jsx';
import NintendoPicksSection from '../../components/home/NintendoPicksSection.jsx';
import DailyNintendoSection from '../../components/home/DailyNintendoSection.jsx';
import DailyNintendoBanner from '../../components/home/DailyNintendoBanner.jsx';
import NintendoIntro from '../../components/home/intro/NintendoIntro.jsx';
import useHomeSmoothScroll from '../../components/home/useHomeSmoothScroll.js';
import useHeroDiscoveryTransition from '../../components/home/useHeroDiscoveryTransition.jsx';
import useDiscoveryNewsDepthTransition from '../../components/home/useDiscoveryNewsDepthTransition.js';
import '../../components/home/home.css';
import '../../components/home/home-design.css';

export default function HomePage() {
  const container = useRef(null);
  const [width, setWidth] = useState(() => Math.min(window.innerWidth, 1920));
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 1023px)').matches);
  useHomeSmoothScroll(mobile);
  const heroTransition = useHeroDiscoveryTransition(container, mobile);
  useLayoutEffect(() => {
    const media = window.matchMedia('(max-width: 1023px)');
    const updateMobile = () => setMobile(media.matches);
    media.addEventListener('change', updateMobile);
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(container.current);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', updateMobile);
    };
  }, []);
  useDiscoveryNewsDepthTransition(container, mobile);
  return (
    <div className="home-page" ref={container}>
      {!mobile && <NintendoIntro />}
      <div key={mobile ? 'mobile' : 'desktop'} className="home-page__canvas" style={{ '--home-scale': width / (mobile ? 360 : 1920), '--home-width': mobile ? '360px' : '1920px' }}>
        <HeroSection mobile={mobile} onDiscover={heroTransition.start} />
        <GameDiscoverySection key={mobile ? 'mobile' : 'desktop'} mobile={mobile} />
        <WhatsNewSection mobile={mobile} />
        <AmiiboSection mobile={mobile} />
        <NintendoPicksSection mobile={mobile} />
        <DailyNintendoSection mobile={mobile} />
        <DailyNintendoBanner mobile={mobile} />
      </div>
      {heroTransition.overlay}
    </div>
  );
}

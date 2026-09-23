import { getHomeContent } from '../../services/homeService';
import HeroSection from '../../components/home/HeroSection';
import GameDiscoverySection from '../../components/home/GameDiscoverySection';
import WhatsNewSection from '../../components/home/WhatsNewSection';
import AmiiboSection from '../../components/home/AmiiboSection';
import NintendoPicksSection from '../../components/home/NintendoPicksSection';
import DailyNintendoSection from '../../components/home/DailyNintendoSection';
import DailyNintendoBanner from '../../components/home/DailyNintendoBanner';
import NintendoFooter from '../../components/layout/NintendoFooter';
import useDesignScale from '../../hooks/useDesignScale';
import './NintendoHomePage.css';

export default function NintendoHomePage() {
  const pageRef = useDesignScale();
  const { amiiboFigures } = getHomeContent();
  return (
    <div className="nintendo-home" ref={pageRef} id="top">
      <a className="skip-link" href="#main-content">본문 바로가기</a>
      <main id="main-content" className="nintendo-home__main">
        <h1 className="sr-only">Nintendo — 40년간 이어진 모험</h1>
        <HeroSection />
        <GameDiscoverySection />
        <WhatsNewSection />
        <AmiiboSection figures={amiiboFigures} />
        <NintendoPicksSection />
        <DailyNintendoSection />
        <DailyNintendoBanner />
      </main>
      <NintendoFooter />
    </div>
  );
}


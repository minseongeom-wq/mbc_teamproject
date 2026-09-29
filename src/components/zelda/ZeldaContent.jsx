import ZeldaHeroSection from './ZeldaHeroSection';
import ZeldaVideoSection from './ZeldaVideoSection';
import ZeldaCharacterSection from './ZeldaCharacterSection';
import ZeldaContent2Section from './ZeldaContent2Section';
import './style.css';

export default function ZeldaContent() {
  return (
    <div className="zelda-content">
      <ZeldaHeroSection />
      <ZeldaVideoSection />
      <ZeldaCharacterSection />
      <ZeldaContent2Section />
    </div>
  );
}

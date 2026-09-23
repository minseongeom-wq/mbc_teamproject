import Navigation from '../../common/navigation/Navigation';
import publicAsset from '../../../utils/publicAsset';
import './style.css';

export default function ZeldaContent() {
  return (
    <div className="zelda-content">
      <section className="zelda-hero" aria-labelledby="zelda-title">
        <img className="zelda-hero__background" src={publicAsset('/images/zelda/hero.png')} alt="" fetchPriority="high" />
        <div className="zelda-hero__navigation">
          <Navigation className="zelda-navigation" />
        </div>
        <h1 className="zelda-hero__title" id="zelda-title" tabIndex={-1}>
          <span className="sr-only">The Legend of Zelda</span>
          <img src={publicAsset('/images/zelda/logo.svg')} alt="" />
        </h1>
        <a className="zelda-hero__scroll" href="#zelda-explore">Scroll Down</a>
        <img className="zelda-hero__scroll-line" src={publicAsset('/images/zelda/scroll-line.svg')} alt="" />
      </section>
      <section className="zelda-explore" id="zelda-explore" aria-labelledby="zelda-explore-title">
        <div className="zelda-explore__diamonds" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => <span key={index} />)}
        </div>
        <h2 className="zelda-explore__title" id="zelda-explore-title">
          <span>EXPLORE</span>
          <span className="zelda-explore__divider" aria-hidden="true"><img src={publicAsset('/images/zelda/explore-line.svg')} alt="" /></span>
          <span>HYRULE</span>
        </h2>
      </section>
    </div>
  );
}

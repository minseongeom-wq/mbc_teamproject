import { Link } from 'react-router-dom';
import { routePaths } from '../../routes/routePaths.js';
import './zeldaAboutSection.css';

export default function ZeldaAboutSection() {
  return (
    <section className="zelda-about" aria-labelledby="zelda-about-title">
      <img className="zelda-about__background" src={`${import.meta.env.BASE_URL}images/zelda/about-background.png`} alt="" loading="lazy" />
      <div className="zelda-about__canvas">
        <div className="zelda-about__text">
          <h2 id="zelda-about-title">MORE<br />ABOUT</h2>
          <p>하이랄을 더 깊이 만나보세요</p>
        </div>
        <Link className="zelda-about__more" to={routePaths.store} aria-label="스토어에서 더 보기"><span>more</span></Link>
      </div>
    </section>
  );
}

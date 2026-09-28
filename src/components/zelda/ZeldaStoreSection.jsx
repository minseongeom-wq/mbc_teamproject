import { Link } from 'react-router-dom';
import { routePaths } from '../../routes/routePaths.js';
import './zeldaStoreSection.css';

const asset = name => `${import.meta.env.BASE_URL}images/zelda/store-${name}.svg`;

export default function ZeldaStoreSection() {
  return (
    <section className="zelda-store" aria-labelledby="zelda-store-title">
      <div className="zelda-store__canvas">
        <div className="zelda-store__logo">
          <img src={asset('logo-base')} alt="" />
          <img src={asset('logo')} alt="Nintendo Store" />
        </div>
        <h2 id="zelda-store-title">Nintendo Store에서<br />새로운 게임을 만나보세요</h2>
        <p className="zelda-store__description">다양한 Nintendo 게임을 만나보세요.<br />인기 타이틀과 신작을 한눈에 확인하고,<br />취향에 맞는 게임을 찾아 즐겨보세요.</p>
        <div className="zelda-store__details">
          <p>※ 일부 상품은 별도 구매가 필요합니다.</p>
          <p>※ 자세한 상품 정보는 Nintendo Store에서 확인해 주세요.</p>
          <Link className="zelda-store__link" to={routePaths.store}>
            <span className="zelda-store__link-icon" aria-hidden="true"><img src={asset('arrow')} alt="" /></span>
            <span className="zelda-store__link-text">자세한 내용은 이쪽에서</span>
          </Link>
        </div>
        <div className="zelda-store__art">
          <div className="zelda-store__diamond"><img src={asset('scene')} alt="" /></div>
          {[1, 2, 3, 4].map(index => <img className={`zelda-store__line zelda-store__line--${index}`} src={asset(`line-${index}`)} key={index} alt="" />)}
        </div>
        <img className="zelda-store__console" src={asset('console')} alt="Nintendo Switch 2" />
        <div className="zelda-store__diamonds" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => <span key={index} />)}
        </div>
      </div>
    </section>
  );
}

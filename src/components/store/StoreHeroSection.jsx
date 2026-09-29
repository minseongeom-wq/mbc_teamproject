import { Link, useNavigate } from 'react-router-dom';
import { routePaths } from '../../routes/routePaths.js';
import { storeImage } from './storeData.js';
import './StoreHeroSection.css';

const categories = ['전체상품', '디지털 상품', '실물 상품', '특집', 'Switch Online'];

export default function StoreHeroSection() {
  const navigate = useNavigate();

  function search(event) {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get('q')?.trim();
    navigate(query ? `${routePaths.productList}?q=${encodeURIComponent(query)}` : routePaths.productList);
  }

  return (
    <section className="store-hero" aria-label="Nintendo eShop">
      <div className="store-hero__red">
        <h1 className="store-hero__logo" aria-label="Nintendo Store">
          <img src={storeImage('5ea77.svg')} alt="Nintendo" />
          <img src={storeImage('8bbdf.svg')} alt="Store" />
        </h1>
        <nav className="store-hero__categories" aria-label="스토어 카테고리">
          {categories.map((category) => (
            <Link key={category} to={`${routePaths.productList}?category=${encodeURIComponent(category)}`}>{category}</Link>
          ))}
        </nav>
        <form className="store-hero__search" role="search" onSubmit={search}>
          <input name="q" type="search" aria-label="상품 검색" />
          <button type="submit" aria-label="검색" />
        </form>
      </div>
      <div className="store-hero__cta">
        <div className="store-hero__cta-copy">
          <h2>다음엔 어떤 게임을 즐겨볼까요?</h2>
          <p>좋아하는 캐릭터부터 새로운 모험까지, 나에게 딱 맞는 게임을 찾아보세요.</p>
        </div>
        <Link className="store-hero__cta-link" to={routePaths.productList}>TEXT</Link>
        <Link className="store-hero__cart" to={routePaths.orderReview} aria-label="장바구니 보기">
          <img src={storeImage('49392.svg')} alt="" />
          <img src={storeImage('eb545.svg')} alt="" />
        </Link>
      </div>
    </section>
  );
}

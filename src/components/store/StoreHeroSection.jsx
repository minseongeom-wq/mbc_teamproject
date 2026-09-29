import { Link, useNavigate } from 'react-router-dom';
import { routePaths } from '../../routes/routePaths.js';
import { storeImage } from './storeData.js';
import './StoreHeroSection.css';

const categories = ['전체상품', '디지털 상품', '실물 상품', '특집', 'Switch Online'];
const categoryUnderline = {
  '전체상품': '2e07c.svg',
  '디지털 상품': 'db9c0.svg',
  '실물 상품': '18def.svg',
  '특집': 'd7b56.svg',
  'Switch Online': '2be01.svg',
};

export default function StoreHeroSection({ compact = false, activeCategory = '' }) {
  const navigate = useNavigate();

  function search(event) {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get('q')?.trim();
    navigate(query ? `${routePaths.productList}?q=${encodeURIComponent(query)}` : routePaths.productList);
  }

  return (
    <section className={`store-hero${compact ? ' store-hero--compact' : ''}`} aria-label="Nintendo eShop">
      <div className="store-hero__red">
        <h1 className="store-hero__logo" aria-label="Nintendo Store">
          <img src={storeImage('5ea77.svg')} alt="Nintendo" />
          <img src={storeImage('8bbdf.svg')} alt="Store" />
        </h1>
        <nav className="store-hero__categories" aria-label="스토어 카테고리">
          {categories.map((category, index) => (
            <Link key={category} to={category === '전체상품' ? routePaths.store : `${routePaths.productList}?category=${encodeURIComponent(category)}`} aria-current={activeCategory === category ? 'page' : undefined}>
              {compact && index > 0 && <img className="store-hero__category-divider" src={storeImage('30979.svg')} alt="" />}
              <span className="store-hero__category-label">
                {category}
                <img className="store-hero__category-underline" src={storeImage(categoryUnderline[category])} alt="" />
              </span>
            </Link>
          ))}
        </nav>
        <form className="store-hero__search" role="search" onSubmit={search}>
          <input name="q" type="search" aria-label="상품 검색" />
          <button type="submit" aria-label="검색" />
        </form>
      </div>
      {!compact && <div className="store-hero__cta">
        <div className="store-hero__cta-copy">
          <h2>다음엔 어떤 게임을 즐겨볼까요?</h2>
          <p>좋아하는 캐릭터부터 새로운 모험까지, 나에게 딱 맞는 게임을 찾아보세요.</p>
        </div>
      </div>}
    </section>
  );
}

import { Link } from 'react-router-dom';
import { routePaths } from '../../routes/routePaths.js';
import { categoryCards, storeImage } from './storeData.js';
import './StoreCategoryGrid.css';

export default function StoreCategoryGrid() {
  return (
    <section className="store-category-grid" aria-label="추천 카테고리">
      {categoryCards.map((card) => (
        <Link className={`store-category-card store-category-card--${card.type} ${card.crop || ''}`} key={card.label} to={card.href || routePaths.productList} style={{ '--card-color': card.color, '--card-background': card.background }} aria-label={card.label}>
          <span className="store-category-card__art"><img src={storeImage(card.image)} alt="" /></span>
          {card.type !== 'promo' && <span className="store-category-card__caption">{card.lines ? card.lines.map((line) => <span key={line}>{line}</span>) : card.label}</span>}
          {card.type !== 'promo' && <span className="store-category-card__marker" />}
        </Link>
      ))}
    </section>
  );
}

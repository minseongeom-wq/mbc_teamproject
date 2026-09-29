import { Link } from 'react-router-dom';
import { routePaths } from '../../routes/routePaths.js';
import { featureCards, storeImage } from './storeData.js';
import './StoreFeatureGrid.css';

export default function StoreFeatureGrid() {
  return (
    <section className="store-feature-grid" aria-label="추천 상품 특집">
      {featureCards.map(([label, image, lines]) => (
        <Link key={label} className="store-feature-card" to={routePaths.productList}>
          <img src={storeImage(image)} alt="" loading="lazy" />
          <span>{lines ? lines.map((line) => <span key={line}>{line}</span>) : label}</span>
        </Link>
      ))}
    </section>
  );
}

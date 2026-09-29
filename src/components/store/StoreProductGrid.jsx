import { Link } from 'react-router-dom';
import { routePaths } from '../../routes/routePaths.js';
import { genreCards, storeImage } from './storeData.js';
import './StoreProductGrid.css';

export default function StoreProductGrid() {
  return (
    <section className="store-product-grid" aria-label="장르별 게임">
      {genreCards.map(([label, image, crop]) => (
        <Link key={label} className={`store-genre-card ${crop}`} to={`${routePaths.productList}?genre=${encodeURIComponent(label)}`}>
          <img src={storeImage(image)} alt="" loading="lazy" />
          <span>{label}</span>
        </Link>
      ))}
    </section>
  );
}

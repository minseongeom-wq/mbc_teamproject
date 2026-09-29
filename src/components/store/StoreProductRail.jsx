import { useState } from 'react';
import { Link } from 'react-router-dom';
import { productHref, storeImage } from './storeData.js';
import './StoreProductRail.css';

export default function StoreProductRail({ title, products, className = '', badge = false, sale = false }) {
  const [offset, setOffset] = useState(0);
  const visible = products.map((_, index) => products[(index + offset) % products.length]);

  return (
    <section className={`store-rail ${className}${sale ? ' store-rail--sale-cards' : ''}`} aria-label={title}>
      <h2>{title}</h2>
      <div className="store-rail__products">
        {visible.map((product) => (
          <Link className="store-product-card" key={product.name} to={productHref} aria-label={`${product.name}, ${product.price}`}>
            <span className={`store-product-card__image ${product.crop || ''}`}>
              <img src={storeImage(product.image)} alt="" loading="lazy" />
              {badge && <span className="store-product-card__badge"><img src={storeImage('5b27b.png')} alt="Nintendo Switch 2" /></span>}
            </span>
            <span className="store-product-card__name">{product.name}</span>
            <span className="store-product-card__price">{product.price}</span>
            {product.originalPrice && <span className="store-product-card__original-price">{product.originalPrice}</span>}
          </Link>
        ))}
        <button className="store-rail__next" type="button" aria-label={`${title} 다음 상품 보기`} onClick={() => setOffset((current) => (current + 1) % products.length)}>
          <img src={storeImage('4c4c3.svg')} alt="" />
        </button>
      </div>
    </section>
  );
}

import { useLayoutEffect, useRef, useState } from 'react';
import { useStoreCart } from './common/StoreCartContext.js';
import { storeImage } from './storeData.js';
import './StoreProductRail.css';

export default function StoreProductRail({ title, products, className = '', badge = false, sale = false, nextIcon = '4c4c3.svg' }) {
  const { addItem } = useStoreCart();
  const [offset, setOffset] = useState(0);
  const productsRef = useRef(null);
  const previousOffset = useRef(offset);
  const visible = products.map((_, index) => products[(index + offset) % products.length]);

  useLayoutEffect(() => {
    if (previousOffset.current === offset) return;
    previousOffset.current = offset;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const animations = [...productsRef.current.querySelectorAll('.store-product-card')].map((card, index) => card.animate([
      { translate: '28px 0', opacity: .65 },
      { translate: '0 0', opacity: 1 },
    ], { duration: 260, delay: Math.min(index, 5) * 12, easing: 'cubic-bezier(.2, .8, .2, 1)', fill: 'backwards' }));

    return () => animations.forEach(animation => animation.cancel());
  }, [offset]);

  return (
    <section className={`store-rail ${className}${sale ? ' store-rail--sale-cards' : ''}`} aria-label={title}>
      <h2>{title}</h2>
      <div className="store-rail__products" ref={productsRef}>
        {visible.map((product) => (
          <button type="button" className="store-product-card" key={`${product.name}-${product.image}`} onClick={(event) => addItem(product, event.currentTarget.querySelector('.store-product-card__image'))} aria-label={`${product.name}, ${product.price}, 장바구니에 추가`}>
            <span className={`store-product-card__image ${product.crop || ''}`}>
              <img src={storeImage(product.image)} alt="" loading="lazy" />
              {(badge || product.badge) && <span className="store-product-card__badge"><img src={storeImage('5b27b.png')} alt="Nintendo Switch 2" /></span>}
            </span>
            <span className="store-product-card__name">{product.name}</span>
            <span className="store-product-card__price">{product.price}</span>
            {product.originalPrice && <span className="store-product-card__original-price">{product.originalPrice}</span>}
          </button>
        ))}
        <button className="store-rail__next" type="button" aria-label={`${title} 다음 상품 보기`} onClick={() => setOffset((current) => (current + 1) % products.length)}>
          <img src={storeImage(nextIcon)} alt="" />
        </button>
      </div>
    </section>
  );
}

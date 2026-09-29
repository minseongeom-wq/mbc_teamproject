import { Link } from 'react-router-dom';
import { routePaths } from '../../../routes/routePaths.js';
import { storeImage } from '../storeData.js';
import { useStoreCart } from './StoreCartContext.js';
import { formatStorePrice } from './storeCartData.js';
import CartItem from './CartItem.jsx';
import './CartDrawer.css';

export default function CartDrawer({ ref, open, onClose, closeButtonRef }) {
  const { items, count, subtotal, increase, decrease, remove } = useStoreCart();

  return <>
    <button className={`store-cart-backdrop${open ? ' is-open' : ''}`} type="button" aria-label="장바구니 닫기" onClick={onClose} tabIndex={open ? 0 : -1} />
    <aside ref={ref} id="store-cart-drawer" className={`store-cart-drawer${open ? ' is-open' : ''}`} role="dialog" aria-modal={open ? 'true' : undefined} aria-labelledby="store-cart-title" aria-hidden={!open} inert={!open}>
      <header className="store-cart-drawer__header">
        <h2 id="store-cart-title">장바구니 ({count})</h2>
        <button ref={closeButtonRef} className="store-cart-drawer__close" type="button" aria-label="장바구니 닫기" onClick={onClose}>
          <img src={storeImage('1a2fe.svg')} alt="" />
        </button>
      </header>
      <div className="store-cart-drawer__items">
        {items.length ? items.map((item) => <CartItem key={item.id} item={item} onIncrease={increase} onDecrease={decrease} onRemove={remove} />) : <p className="store-cart-drawer__empty">장바구니에 담긴 상품이 없습니다.</p>}
      </div>
      <div className="store-cart-drawer__summary">
        <p className="store-cart-drawer__subtotal-label">소계</p>
        <p className="store-cart-drawer__subtotal-value">{formatStorePrice(subtotal)}</p>
        <p className="store-cart-drawer__vat">VAT 포함(10%)</p>
        <div className="store-cart-drawer__summary-divider" />
        <p className="store-cart-drawer__total-label">합계</p>
        <p className="store-cart-drawer__total-value">{formatStorePrice(subtotal)}</p>
        {items.length ? <Link className="store-cart-drawer__checkout" to={routePaths.checkout} onClick={onClose}>결제하기</Link> : <button className="store-cart-drawer__checkout" type="button" disabled>결제하기</button>}
      </div>
    </aside>
  </>;
}

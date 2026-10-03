import { storeImage } from '../storeData.js';
import './StoreCartButton.css';

export default function StoreCartButton({ ref, count, open, onClick }) {
  return <button ref={ref} className="store-cart-button" type="button" onClick={onClick} aria-label={`장바구니 열기, 상품 ${count}개`} aria-haspopup="dialog" aria-controls="store-cart-drawer" aria-expanded={open}>
    <img className="store-cart-button__circle" src={storeImage('49392.svg')} alt="" />
    <img className="store-cart-button__icon" src={storeImage('eb545.svg')} alt="" />
    <span className="store-cart-button__count" aria-hidden="true">{count}</span>
  </button>;
}

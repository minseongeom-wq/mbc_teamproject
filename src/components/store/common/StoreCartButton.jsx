import { storeImage } from '../storeData.js';
import './StoreCartButton.css';

export default function StoreCartButton({ ref, open, onClick }) {
  return <button ref={ref} className="store-cart-button" type="button" onClick={onClick} aria-label="장바구니 열기" aria-haspopup="dialog" aria-controls="store-cart-drawer" aria-expanded={open}>
    <img className="store-cart-button__circle" src={storeImage('49392.svg')} alt="" />
    <img className="store-cart-button__icon" src={storeImage('eb545.svg')} alt="" />
  </button>;
}

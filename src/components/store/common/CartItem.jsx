import { storeImage } from '../storeData.js';
import { formatStorePrice } from './storeCartData.js';
import './CartItem.css';

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return <article className="store-cart-item">
    <div className={`store-cart-item__image store-cart-item__image--${item.crop || 'cover'}`}>
      <img src={storeImage(item.image)} alt="" />
    </div>
    <h3 className="store-cart-item__name">{item.name}</h3>
    <p className="store-cart-item__price">{formatStorePrice(item.price * item.quantity)}</p>
    <div className="store-cart-item__quantity" aria-label={`${item.name} 수량`}>
      <button type="button" aria-label={`${item.name} 수량 감소`} onClick={() => onDecrease(item.id)} disabled={item.quantity === 1}>−</button>
      <span aria-live="polite">{item.quantity}</span>
      <button type="button" aria-label={`${item.name} 수량 증가`} onClick={() => onIncrease(item.id)}>+</button>
    </div>
    <button className="store-cart-item__remove" type="button" aria-label={`${item.name} 삭제`} onClick={() => onRemove(item.id)}>
      <img src={storeImage('144a4.svg')} alt="" />
    </button>
  </article>;
}

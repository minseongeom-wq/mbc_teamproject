import { useState } from 'react';
import { Link } from 'react-router-dom';
import { routePaths } from '../../../routes/routePaths.js';
import { useStoreCart } from './StoreCartContext.js';
import { formatStorePrice } from './storeCartData.js';
import CartItem from './CartItem.jsx';
import './CartDrawer.css';

export default function CartDrawer({ ref, open, onClose, closeButtonRef }) {
    const { items, count, subtotal, increase, decrease, remove } = useStoreCart();
    const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);
    const [showAgreementWarning, setShowAgreementWarning] = useState(false);

    const handleAgreementChange = (event) => {
        setPurchaseConfirmed(event.target.checked);
        setShowAgreementWarning(false);
    };

    const handleDisabledCheckout = () => {
        if (!showAgreementWarning) setShowAgreementWarning(true);
    };

    return (
        <>
            <button
                className={`store-cart-backdrop${open ? ' is-open' : ''}`}
                type="button"
                aria-label="장바구니 닫기"
                onClick={onClose}
                tabIndex={open ? 0 : -1}
            />
            <aside
                ref={ref}
                id="store-cart-drawer"
                className={`store-cart-drawer${open ? ' is-open' : ''}`}
                role="dialog"
                aria-modal={open ? 'true' : undefined}
                aria-labelledby="store-cart-title"
                aria-hidden={!open}
                inert={!open}
            >
                <header className="store-cart-drawer__header">
                    <h2 id="store-cart-title">장바구니 ({count})</h2>
                    <button
                        ref={closeButtonRef}
                        className="store-cart-drawer__close"
                        type="button"
                        aria-label="장바구니 닫기"
                        onClick={onClose}
                    >
                        <span aria-hidden="true" />
                    </button>
                </header>
                <div className="store-cart-drawer__items">
                    {items.length ? (
                        items.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onIncrease={increase}
                                onDecrease={decrease}
                                onRemove={remove}
                            />
                        ))
                    ) : (
                        <p className="store-cart-drawer__empty">장바구니에 담긴 상품이 없습니다.</p>
                    )}
                </div>
                <div className="store-cart-drawer__summary">
                    <p className="store-cart-drawer__notice">
                        결제 완료 후 바로 다운로드하여 이용할 수 있습니다.
                        <br />
                        다운로드 상품은 실물 배송되지 않으며, 구매한 계정에서 확인할 수 있습니다.
                    </p>
                    <p className="store-cart-drawer__download-note">디지털 다운로드 · 즉시 이용</p>
                    <label
                        className={`store-cart-drawer__agreement${showAgreementWarning ? ' is-warning' : ''}`}
                        onAnimationEnd={() => setShowAgreementWarning(false)}
                    >
                        <input
                            type="checkbox"
                            checked={purchaseConfirmed}
                            onChange={handleAgreementChange}
                        />
                        <span className="store-cart-drawer__checkbox" aria-hidden="true" />
                        <span>
                            <strong>구매 전 확인</strong>다운로드판은 구매 완료 후 취소 및 환불이
                            제한될 수 있습니다.
                        </span>
                    </label>
                    <span className="store-cart-drawer__count" aria-live="polite">
                        장바구니 상품 {count}개
                    </span>
                    <span className="store-cart-drawer__subtotal">
                        {formatStorePrice(subtotal)}
                    </span>
                    {items.length && purchaseConfirmed ? (
                        <Link
                            className="store-cart-drawer__checkout is-active"
                            to={routePaths.checkout}
                            onClick={onClose}
                        >
                            결제하기
                        </Link>
                    ) : (
                        <button
                            className="store-cart-drawer__checkout"
                            type="button"
                            disabled={!items.length}
                            aria-disabled="true"
                            onClick={items.length ? handleDisabledCheckout : undefined}
                        >
                            결제하기
                        </button>
                    )}
                </div>
            </aside>
        </>
    );
}

import { useState } from "react";
import { useStoreCart } from "../store/common/StoreCartContext.js";
import { formatStorePrice } from "../store/common/storeCartData.js";
import { storeImage, switchProducts } from "../store/storeData.js";
import PaymentOverlay from "./PaymentOverlay.jsx";
import "./payment.css";

const recommendedGames = switchProducts.slice(0, 6);

function ProductRow({ item, onIncrease, onDecrease, onRemove }) {
  function changeQuantity(nextQuantity) {
    const difference = nextQuantity - item.quantity;
    const update = difference > 0 ? onIncrease : onDecrease;
    for (let index = 0; index < Math.abs(difference); index += 1)
      update(item.id);
  }

  return (
    <article className="payment-product">
      <div
        className={`payment-product__image payment-product__image--${item.crop || "cover"}`}
      >
        <img src={storeImage(item.image)} alt="" />
      </div>
      <div className="payment-product__details">
        <h2>{item.name}</h2>
        <label className="payment-product__quantity">
          <span>수량</span>
          <span className="payment-product__select-wrap">
            <select
              value={item.quantity}
              onChange={(event) => changeQuantity(Number(event.target.value))}
              aria-label={`${item.name} 수량`}
            >
              {Array.from(
                { length: Math.max(10, item.quantity) },
                (_, index) => index + 1,
              ).map((quantity) => (
                <option key={quantity} value={quantity}>
                  {quantity}
                </option>
              ))}
            </select>
          </span>
        </label>
      </div>
      <p className="payment-product__price">
        {formatStorePrice(item.price * item.quantity)}
      </p>
      <button
        className="payment-product__remove"
        type="button"
        onClick={() => onRemove(item.id)}
        aria-label={`${item.name} 삭제`}
      >
        <img src={storeImage("144a4.svg")} alt="" />
      </button>
    </article>
  );
}

export default function PaymentPage() {
  const { items, subtotal, increase, decrease, remove } = useStoreCart();
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [recommendOffset, setRecommendOffset] = useState(0);
  const vat = Math.round(subtotal / 11);
  const visibleRecommendations = recommendedGames.map(
    (_, index) =>
      recommendedGames[(index + recommendOffset) % recommendedGames.length],
  );

  return (
    <div className="payment-page">
      <section className="payment-check" aria-labelledby="payment-check-title">
        <div className="payment-check__products">
          <h1 id="payment-check-title">제품 확인</h1>
          <div className="payment-check__list">
            {items.length ? (
              items.map((item) => (
                <ProductRow
                  key={item.id}
                  item={item}
                  onIncrease={increase}
                  onDecrease={decrease}
                  onRemove={remove}
                />
              ))
            ) : (
              <div className="payment-check__empty">
                <p>장바구니에 담긴 상품이 없습니다.</p>
                <span>게임을 장바구니에 담은 뒤 다시 확인해 주세요.</span>
              </div>
            )}
          </div>
        </div>

        <aside
          className="payment-summary"
          aria-labelledby="payment-summary-title"
        >
          <h2 id="payment-summary-title">요약</h2>
          <dl>
            <div className="payment-summary__subtotal">
              <dt>
                소계{" "}
                <span
                  className="payment-help"
                  title="상품 금액에는 VAT가 포함되어 있습니다."
                  aria-label="상품 금액에는 VAT가 포함되어 있습니다."
                >
                  ?
                </span>
              </dt>
              <dd>{formatStorePrice(subtotal)}</dd>
            </div>
            <div className="payment-summary__vat">
              <dt>VAT 포함(10%)</dt>
              <dd>{formatStorePrice(vat)}</dd>
            </div>
            <div className="payment-summary__total">
              <dt>Total</dt>
              <dd>{formatStorePrice(subtotal)}</dd>
            </div>
          </dl>
          <button
            className="payment-primary-button payment-check__pay-button"
            type="button"
            disabled={!items.length}
            onClick={() => setOverlayOpen(true)}
          >
            결제하기
          </button>
        </aside>
      </section>

      <section
        className="payment-recommend"
        aria-labelledby="payment-recommend-title"
      >
        <h2 id="payment-recommend-title">이런 게임은 어떠세요?</h2>
        <div className="payment-recommend__rail">
          {visibleRecommendations.map((game) => (
            <article className="payment-recommend__card" key={game.name}>
              <div className={`payment-recommend__image ${game.crop || ""}`}>
                <img src={storeImage(game.image)} alt="" loading="lazy" />
              </div>
              <h3>{game.name}</h3>
              <p>{game.price}</p>
            </article>
          ))}
          <button
            className="payment-recommend__next"
            type="button"
            aria-label="다음 추천 게임 보기"
            onClick={() =>
              setRecommendOffset(
                (current) => (current + 1) % recommendedGames.length,
              )
            }
          >
            <img src={storeImage("4c4c3.svg")} alt="" />
          </button>
        </div>
      </section>

      <PaymentOverlay
        open={overlayOpen}
        onClose={() => setOverlayOpen(false)}
        items={items}
        subtotal={subtotal}
        vat={vat}
      />
    </div>
  );
}

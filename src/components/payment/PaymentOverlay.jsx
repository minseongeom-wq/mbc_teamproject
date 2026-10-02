import { useEffect, useRef, useState } from "react";
import { formatStorePrice } from "../store/common/storeCartData.js";
import { storeImage } from "../store/storeData.js";

const paymentMethods = [
  { id: "toss", label: "토스페이", mark: "toss", icon: "toss.png" },
  {
    id: "kakao",
    label: "카카오페이",
    mark: "kakao",
    icon: "kakao-pay.svg",
  },
  {
    id: "card",
    label: "국내 신용/체크카드",
    mark: "card",
    icon: "domestic-card.png",
  },
];

const additionalPaymentMethods = [
  { id: "payco", label: "PAYCO", mark: "payco", icon: "payco.png" },
  {
    id: "international-card",
    label: "해외 신용카드",
    mark: "international-card",
    icon: "international-card.png",
  },
];

const paymentAsset = (fileName) =>
  `${import.meta.env.BASE_URL}images/payment/${fileName}`;

export default function PaymentOverlay({
  open,
  onClose,
  items,
  subtotal,
  vat,
}) {
  const [method, setMethod] = useState("toss");
  const [agreed, setAgreed] = useState(false);
  const [showAllMethods, setShowAllMethods] = useState(false);
  const [noticeHighlighted, setNoticeHighlighted] = useState(false);
  const [paymentPressing, setPaymentPressing] = useState(false);
  const [paymentCoolingDown, setPaymentCoolingDown] = useState(false);
  const [paymentDemoShown, setPaymentDemoShown] = useState(false);
  const [guideHighlighted, setGuideHighlighted] = useState(false);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const noticeTimerRef = useRef(null);
  const pressTimerRef = useRef(null);
  const guideTimerRef = useRef(null);
  const cooldownTimerRef = useRef(null);
  const paymentLockedRef = useRef(false);
  const firstItem = items[0];
  const canPay = agreed && Boolean(method) && items.length > 0;

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const focusable = [
        ...dialogRef.current.querySelectorAll(
          "button:not(:disabled), input:not(:disabled)",
        ),
      ];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(
    () => () => {
      window.clearTimeout(noticeTimerRef.current);
      window.clearTimeout(pressTimerRef.current);
      window.clearTimeout(guideTimerRef.current);
      window.clearTimeout(cooldownTimerRef.current);
    },
    [],
  );

  function handleAgreementChange(event) {
    const checked = event.target.checked;
    setAgreed(checked);
    if (checked) {
      window.clearTimeout(noticeTimerRef.current);
      setNoticeHighlighted(false);
    }
  }

  function handlePaymentClick(event) {
    if (canPay) {
      if (paymentLockedRef.current) return;
      paymentLockedRef.current = true;
      setPaymentPressing(true);
      pressTimerRef.current = window.setTimeout(() => {
        setPaymentPressing(false);
        setPaymentCoolingDown(true);
        setPaymentDemoShown(true);
        setGuideHighlighted(true);
        guideTimerRef.current = window.setTimeout(() => {
          setGuideHighlighted(false);
        }, 420);
        cooldownTimerRef.current = window.setTimeout(() => {
          setPaymentCoolingDown(false);
          paymentLockedRef.current = false;
        }, 700);
      }, 120);
      return;
    }
    event.preventDefault();
    if (agreed) return;

    window.clearTimeout(noticeTimerRef.current);
    setNoticeHighlighted(true);
    noticeTimerRef.current = window.setTimeout(() => {
      setNoticeHighlighted(false);
    }, 500);
  }

  if (!open) return null;

  return (
    <div
      className="payment-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        className="payment-overlay__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-overlay-title"
      >
        <button
          ref={closeRef}
          className="payment-overlay__close"
          type="button"
          onClick={onClose}
          aria-label="결제 창 닫기"
        >
          <span aria-hidden="true" />
        </button>

        <div className="payment-overlay__summary">
          <h2 id="payment-overlay-title">결제</h2>
          {firstItem && (
            <div
              className={`payment-overlay__product-image payment-overlay__product-image--${firstItem.crop || "cover"}`}
            >
              <img src={storeImage(firstItem.image)} alt="" />
            </div>
          )}
          {items.length > 1 && (
            <p className="payment-overlay__product-count">
              {firstItem.name} 외 {items.length - 1}개 상품
            </p>
          )}
          <dl>
            <div className="payment-overlay__subtotal">
              <dt>
                Subtotal{" "}
                <span className="payment-help" aria-hidden="true">
                  ?
                </span>
              </dt>
              <dd>{formatStorePrice(subtotal)}</dd>
            </div>
            <div className="payment-overlay__vat">
              <dt>VAT 포함(10%)</dt>
              <dd>{formatStorePrice(vat)}</dd>
            </div>
            <div className="payment-overlay__total">
              <dt>Total</dt>
              <dd>{formatStorePrice(subtotal)}</dd>
            </div>
          </dl>
        </div>

        <div
          className={`payment-overlay__checkout${showAllMethods ? " is-methods-expanded" : ""}`}
        >
          <p
            className={`payment-overlay__guide${guideHighlighted ? " is-payment-feedback" : ""}`}
          >
            {paymentDemoShown
              ? "이 화면에서는 실제 결제가 진행되지 않습니다."
              : "결제 수단을 선택하고 정보를 입력하세요."}
          </p>
          <h3>결제 수단</h3>
          <div
            className={`payment-overlay__methods${showAllMethods ? " is-expanded" : ""}`}
            role="radiogroup"
            aria-label="결제 수단"
          >
            {[
              ...paymentMethods,
              ...(showAllMethods ? additionalPaymentMethods : []),
            ].map((option) => (
              <button
                key={option.id}
                className={`payment-overlay__method${method === option.id ? " is-selected" : ""}`}
                type="button"
                role="radio"
                aria-checked={method === option.id}
                onClick={() => setMethod(option.id)}
              >
                <span
                  className={`payment-overlay__method-mark payment-overlay__method-mark--${option.mark}`}
                  aria-hidden="true"
                >
                  <img src={paymentAsset(option.icon)} alt="" />
                </span>
                <span>{option.label}</span>
                <span
                  className="payment-overlay__method-radio"
                  aria-hidden="true"
                />
              </button>
            ))}
            <button
              className="payment-overlay__method payment-overlay__method--more"
              type="button"
              aria-expanded={showAllMethods}
              onClick={() => setShowAllMethods((expanded) => !expanded)}
            >
              <span>{showAllMethods ? "접기" : "모든 결제 수단"}</span>
              <span
                className="payment-overlay__method-arrow"
                aria-hidden="true"
              />
            </button>
          </div>

          <label
            className={`payment-overlay__agreement${agreed ? " is-checked" : ""}${noticeHighlighted ? " is-highlighted" : ""}`}
          >
            <input
              type="checkbox"
              checked={agreed}
              onChange={handleAgreementChange}
            />
            <span>
              다운로드 구입에 관한 주의 사항을 확인했습니다.
              <small>(다운로드 상품은 실물로 배송되지 않는 상품입니다.)</small>
            </span>
          </label>

          <button
            className={`payment-primary-button${paymentCoolingDown ? " is-completed" : canPay ? " is-ready" : " is-inactive"}${paymentPressing ? " is-pressing" : ""}`}
            type="button"
            aria-disabled={!canPay || paymentCoolingDown}
            onClick={handlePaymentClick}
          >
            결제하기
          </button>
          <div className="payment-overlay__notice">
            <p>
              구입하신 소프트웨어 아이콘에서 [지금 다운로드]를 클릭하면 해당
              콘텐츠가 다운로드됩니다.
            </p>
            <p>
              실제로는 번호로 전송되지 않으며, [지금 다운로드] 완료 전에는
              환불이 불가능합니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

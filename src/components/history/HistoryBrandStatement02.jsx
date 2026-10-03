import "./HistoryBrandStatement02.css";

function HistoryBrandStatement02({ imageSrc = '/images/history/flexibility.png' }) {
  return (
    <section className="history-brand-02">
      <h2 className="history-brand-02__title">
        <span className="history-service-motion__title-text">FLEXIBILITY</span>
      </h2>

      <div className="history-brand-02__visual">
        <div className="history-service-motion__image">
          <img
            src={imageSrc}
            alt=""
          />
        </div>
      </div>

      <div className="history-brand-02__copy history-brand-02__copy--left history-service-motion__copy">
        <strong>02.</strong>

        <p>
          시대와 기술이 변해도
          <br />
          새로운 환경에 맞춰
          <br />
          놀이의 모습은
          <br />
          계속 변화해 왔습니다.
        </p>
      </div>

      <div className="history-brand-02__copy history-brand-02__copy--right history-service-motion__copy">
        <strong>유연성</strong>

        <p>
          카드에서 장난감으로,
          <br />
          게임에서 새로운 경험으로.
          <br />
          변화를 받아들이며
          <br />
          가능성을 넓혀갑니다.
        </p>
      </div>

      <div className="history-brand-02__bottom-block" />
    </section>
  );
}

export default HistoryBrandStatement02;

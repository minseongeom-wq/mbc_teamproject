import "./HistoryBrandStatement01.css";

function HistoryBrandStatement01({ imageSrc = '/images/history/originality.png' }) {
  return (
    <section className="history-brand-01">
      {/* 중앙 타이틀 */}
      <h2 className="history-brand-01__title">
        <span className="history-service-motion__title-text">ORIGINALITY</span>
      </h2>

      {/* 중앙 이미지 */}
      <div className="history-brand-01__visual">
        <div className="history-service-motion__image">
          <img
            src={imageSrc}
            alt=""
          />
        </div>
      </div>

      {/* 왼쪽 설명 */}
      <div className="history-brand-01__copy history-brand-01__copy--left history-service-motion__copy">
        <strong>01.</strong>

        <p>
          익숙한 것에서
          <br />
          새로운 가능성을 발견하고,
          <br />
          지금까지 없던
          <br />
          즐거움을 만들어갑니다.
        </p>
      </div>

      {/* 오른쪽 설명 */}
      <div className="history-brand-01__copy history-brand-01__copy--right history-service-motion__copy">
        <strong>독창성</strong>

        <p>
          정해진 방식을 따르기보다
          <br />
          새로운 놀이의 방법을
          <br />
          끊임없이 고민합니다.
        </p>
      </div>

      {/* 다음 섹션 연결용 회색 블록 */}
      <div className="history-brand-01__bottom-block" />
    </section>
  );
}

export default HistoryBrandStatement01;

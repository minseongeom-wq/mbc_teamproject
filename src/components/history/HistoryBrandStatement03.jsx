import "./HistoryBrandStatement03.css";

function HistoryBrandStatement03({ imageSrc = '/images/history/sincerity.png' }) {
  return (
    <section className="history-brand-03">
      <h2 className="history-brand-03__title">
        <span className="history-service-motion__title-text">SINCERITY</span>
      </h2>

      <div className="history-brand-03__visual">
        <div className="history-service-motion__image">
          <img
            src={imageSrc}
            alt=""
          />
        </div>
      </div>

      <div className="history-brand-03__copy history-brand-03__copy--left history-service-motion__copy">
        <strong>03.</strong>

        <p>
          즐거움을 만드는 모든 과정에
          <br />
          진심을 담아
          <br />
          사람들이 안심하고 즐길 수 있는
          <br />
          경험을 만들어갑니다.
        </p>
      </div>

      <div className="history-brand-03__copy history-brand-03__copy--right history-service-motion__copy">
        <strong>성실함</strong>

        <p>
          작은 디테일까지 고민하며
          <br />
          오랫동안 사랑받을 수 있는
          <br />
          즐거움을 이어갑니다.
        </p>
      </div>

      {/* 다음 섹션으로 이어지는 빨간 블록 */}
      <div className="history-brand-03__red history-brand-03__red--right" />
      <div className="history-brand-03__red history-brand-03__red--left" />
    </section>
  );
}

export default HistoryBrandStatement03;

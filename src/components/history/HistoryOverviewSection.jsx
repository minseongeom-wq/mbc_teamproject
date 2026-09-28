import './HistoryOverviewSection.css';

const imageBase = '/images/history';

function HistoryOverviewSection() {
  return (
    <section className="history-overview" aria-label="Nintendo history overview">
      {/* Keep the exported shader in its own layer so it can later be replaced by a live shader. */}
      <img
        className="history-overview__shader"
        src={`${imageBase}/history-overview-shader.png`}
        alt=""
        aria-hidden="true"
      />

      <figure className="history-overview__primary">
        <img className="history-overview__primary-paper" src={`${imageBase}/history-overview-primary-paper.svg`} alt="" aria-hidden="true" />
        <img className="history-overview__primary-image" src={`${imageBase}/history-overview-primary.png`} alt="1889년 교토의 닌텐도 초기 점포" />
        <figcaption className="history-overview__primary-caption">
          야마우치 후사지로는 일본 교토시 시모교구에서 일본 전통 화투인 하나후다를 제작해 판매하기 시작했습니다.
        </figcaption>
      </figure>

      <figure className="history-overview__secondary">
        <img className="history-overview__secondary-paper" src={`${imageBase}/history-overview-secondary-paper.svg`} alt="" aria-hidden="true" />
        <img className="history-overview__secondary-image" src={`${imageBase}/history-overview-secondary.png`} alt="닌텐도 Game & Watch 제품" />
        <figcaption className="history-overview__secondary-caption">
          미국 현지 법인인 Nintendo of America Inc. (NOA)를 전액 출자 자회사로 설립하고, Game & Watch™ 제품군의 판매를 시작했습니다.
        </figcaption>
      </figure>

      <div className="history-overview__headline-frame" aria-hidden="true">
        <div className="history-overview__headline">
          <span>FROM TODAY</span>
          <span>1889-2026</span>
        </div>
      </div>
      <div className="history-overview__subheadline-frame" aria-hidden="true">
        <span className="history-overview__subheadline">How Play evolved</span>
      </div>
      <div className="history-overview__location-frame" aria-hidden="true">
        <span className="history-overview__location">KYOTO, JAPAN</span>
      </div>
    </section>
  );
}

export default HistoryOverviewSection;

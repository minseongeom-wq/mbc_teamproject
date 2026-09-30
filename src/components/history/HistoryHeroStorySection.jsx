import "./HistoryHeroStorySection.css";

function HistoryHeroStorySection() {
  return (
    <section className="history-hero-story">
      <div className="history-hero-story__title" role="heading" aria-level="1">
        <p>A NINTENDO</p>
        <p>STORY</p>
      </div>

      <div className="history-hero-story__description">
        <p>닌텐도와 관련된</p>
        <p>모든 사람들의 얼굴에 웃음을.</p>
      </div>

      <p className="history-hero-story__company">
        Nintendo Co., Ltd.
      </p>

      <p className="history-hero-story__since">
        SINCE 1889
      </p>
    </section>
  );
}

export default HistoryHeroStorySection;

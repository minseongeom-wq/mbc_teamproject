import { Link } from 'react-router-dom';
import { routePaths } from '../../routes/routePaths.js';
import './HistoryBrandStoryDescriptionSection.css';

function HistoryBrandStoryDescriptionSection() {
  return (
    <section className="history-brand-story" aria-label="닌텐도의 변하지 않는 즐거움">
      <div className="history-brand-story__column history-brand-story__column--left">
        <h2>놀이의 모습은 계속 달라졌지만</h2>
        <p>1889년 교토에서 시작한 닌텐도는 오랜 시간 새로운 형태의 엔터테인먼트를 만들어 왔습니다. 시대에 따라 놀이의 모습은 달라졌지만, 독창적인 아이디어와 경험을 통해 사람들에게 즐거움을 전해왔습니다.</p>
      </div>
      <img className="history-brand-story__arrow" src="/images/history/history-brand-story-arrow.svg" alt="" aria-hidden="true" />
      <div className="history-brand-story__column history-brand-story__column--right">
        <h2>즐거움의 마음은 변하지 않습니다.</h2>
        <p>변하지 않은 것은 엔터테인먼트를 통해 사람들의 얼굴에 미소를 만들고자 하는 마음입니다. 닌텐도는 앞으로도 새로운 놀이와 경험을 통해 더 많은 사람들에게 즐거움을 전하고자 합니다.</p>
      </div>
      <Link className="history-brand-story__button" to={routePaths.home}>현재의 닌텐도 만나보기 →</Link>
    </section>
  );
}

export default HistoryBrandStoryDescriptionSection;

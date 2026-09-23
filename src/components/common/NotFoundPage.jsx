import AppLink from './AppLink';
import './basic-page/FeatureOverview.css';

export default function NotFoundPage() {
  return <div className="feature-overview">
    <p className="feature-overview__eyebrow">404</p>
    <h1 className="feature-overview__title" tabIndex={-1}>페이지를 찾을 수 없어요</h1>
    <p className="feature-overview__description">주소를 확인하거나 홈에서 다시 시작해 주세요.</p>
    <nav className="feature-overview__links"><AppLink className="feature-overview__link" to="/">홈으로 돌아가기</AppLink></nav>
  </div>;
}

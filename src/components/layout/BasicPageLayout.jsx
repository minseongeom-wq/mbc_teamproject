import { Outlet } from 'react-router-dom';
import Navigation from '../common/navigation/Navigation';
import AppLink from '../common/AppLink';
import { navigationRoutes } from '../common/navigation/navigationLinks';
import './BasicPageLayout.css';

export default function BasicPageLayout() {
  return (
    <div className="basic-page" id="top">
      <a className="skip-link" href="#main-content">본문 바로가기</a>
      <div className="basic-page__header"><Navigation variant="white" /></div>
      <main className="basic-page__main" id="main-content"><Outlet /></main>
      <footer className="basic-page__footer">
        <AppLink to={navigationRoutes.home}>Nintendo Renewal</AppLink>
        <nav aria-label="하단 메뉴"><AppLink to={navigationRoutes.history}>닌텐도 이야기</AppLink><AppLink to={navigationRoutes.support}>고객지원</AppLink></nav>
      </footer>
    </div>
  );
}

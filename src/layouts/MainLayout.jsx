import { generatePath, NavLink, Outlet, useLocation } from 'react-router-dom';
import { previewProductId, routePaths } from '../routes/routePaths.js';
import Navigation from '../components/common/navigation/Navigation.jsx';
import Footer from '../components/common/footer/Footer.jsx';
import './MainLayout.css';

const storeLinks = [
  ['E-shop', routePaths.store],
  ['상품 목록', routePaths.productList],
  ['임시 상품 상세 (이동 확인용)', generatePath(routePaths.productDetail, { id: previewProductId })],
  ['주문 확인', routePaths.orderReview],
  ['결제 페이지', routePaths.checkout],
];

export default function MainLayout() {
  const { pathname } = useLocation();
  const isStorePage = pathname === routePaths.store || pathname.startsWith(`${routePaths.store}/`);

  const isZelda = /^\/ip\/zelda\/?$/i.test(pathname);
  const whitePaths = [routePaths.store, routePaths.productList, routePaths.mypage];
  const isWhite = whitePaths.includes(pathname) || (pathname.startsWith('/store/products/'));
  const variant = isZelda ? 'zelda' : isWhite ? 'white' : 'red';

  return (
    <div className="site-shell">
      <Navigation key={pathname} variant={variant} />
      <main id="main-content">
        <Outlet />
        {isStorePage && (
          <nav aria-label="스토어 단계 이동">
            <p>이동 확인용 임시 화면입니다. 실제 상품·주문·결제 기능은 아직 연결되지 않았습니다.</p>
            <ol>
              {storeLinks.map(([label, to]) => (
                <li key={to}><NavLink to={to} end>{label}</NavLink></li>
              ))}
            </ol>
          </nav>
        )}
      </main>
      <Footer variant={isZelda ? 'zelda' : 'default'} />
    </div>
  );
}

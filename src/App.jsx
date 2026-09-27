import { generatePath, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import { routePaths } from './routes/routePaths.js';
import HomePage from './pages/home/HomePage.jsx';
import MarioPage from './pages/mario/MarioPage.jsx';
import ZeldaPage from './pages/zelda/ZeldaPage.jsx';
import SplatoonPage from './pages/splatoon/SplatoonPage.jsx';
import StorePage from './pages/store/StorePage.jsx';
import ProductListPage from './pages/product-list/ProductListPage.jsx';
import ProductDetailPage from './pages/product-detail/ProductDetailPage.jsx';
import OrderReviewPage from './pages/order-review/OrderReviewPage.jsx';
import CheckoutPage from './pages/checkout/CheckoutPage.jsx';
import SwitchPage from './pages/hardware/SwitchPage.jsx';
import HistoryPage from './pages/history/HistoryPage.jsx';
import CommunityPage from './pages/community/CommunityPage.jsx';
import SupportPage from './pages/support/SupportPage.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import SignupPage from './pages/signup/SignupPage.jsx';
import MyPage from './pages/mypage/MyPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={routePaths.home} element={<HomePage />} />
        <Route path={generatePath(routePaths.ipDetail, { slug: 'mario' })} element={<MarioPage />} />
        <Route path={generatePath(routePaths.ipDetail, { slug: 'zelda' })} element={<ZeldaPage />} />
        <Route path={generatePath(routePaths.ipDetail, { slug: 'splatoon' })} element={<SplatoonPage />} />
        <Route path={routePaths.store} element={<StorePage />} />
        <Route path={routePaths.productList} element={<ProductListPage />} />
        <Route path={routePaths.productDetail} element={<ProductDetailPage />} />
        <Route path={routePaths.orderReview} element={<OrderReviewPage />} />
        <Route path={routePaths.checkout} element={<CheckoutPage />} />
        <Route path={routePaths.hardware} element={<SwitchPage />} />
        <Route path={routePaths.history} element={<HistoryPage />} />
        <Route path={routePaths.community} element={<CommunityPage />} />
        <Route path={routePaths.support} element={<SupportPage />} />
        <Route path={routePaths.login} element={<LoginPage />} />
        <Route path={routePaths.signup} element={<SignupPage />} />
        <Route path={routePaths.mypage} element={<MyPage />} />
        <Route path="*" element={<h1>페이지를 찾을 수 없습니다.</h1>} />
      </Route>
    </Routes>
  );
}

import { Navigate, Route, Routes } from 'react-router-dom';
import NintendoHomePage from './pages/home/NintendoHomePage';
import BasicPageLayout from './pages/layout/BasicPageLayout';
import NotFoundPage from './pages/common/NotFoundPage';
import RouteEffects from './routes/RouteEffects';
import { navigationRoutes as paths } from './components/common/navigation/navigationLinks';
import IpDetailPage from './pages/ip-detail/IpDetailPage';
import GameExplorePage from './pages/store/games/GameExplorePage';
import GameDetailPage from './pages/store/game-detail/GameDetailPage';
import NintendoStorePage from './pages/store/NintendoStorePage';
import StoreProductDetailPage from './pages/store/product-detail/StoreProductDetailPage';
import OrderConfirmationPage from './pages/store/order-confirmation/OrderConfirmationPage';
import PaymentPage from './pages/store/payment/PaymentPage';
import NintendoSwitchPage from './pages/hardware/NintendoSwitchPage';
import NintendoAboutPage from './pages/history/NintendoAboutPage';
import CommunityListPage from './pages/community/CommunityListPage';
import CommunityWritePage from './pages/community/CommunityWritePage';
import SupportPage from './pages/support/SupportPage';
import InquiryListPage from './pages/support/InquiryListPage';
import MyNintendoPage from './pages/mypage/MyNintendoPage';
import ProfileEditPage from './pages/mypage/ProfileEditPage';
import LoginPage from './pages/login/LoginPage';
import SignUpPage from './pages/signup/SignUpPage';

import CommunityDetailPage from './pages/community/CommunityDetailPage';
import PaymentResultPage from './pages/store/payment/PaymentResultPage';
import OrderHistoryPage from './pages/mypage/OrderHistoryPage';
import RecentActivityPage from './pages/mypage/RecentActivityPage';
import MyReviewsPage from './pages/mypage/MyReviewsPage';
import FaqPage from './pages/support/FaqPage';
import SupportRequestPage from './pages/support/SupportRequestPage';

export default function App() {
  return <>
    <RouteEffects />
    <Routes>
      <Route path={paths.home} element={<NintendoHomePage />} />
      <Route element={<BasicPageLayout />}>
        <Route path={paths.ipDetail} element={<IpDetailPage />} />
        <Route path={paths.games} element={<GameExplorePage />} />
        <Route path={paths.gameDetail} element={<GameDetailPage />} />
        <Route path={paths.store} element={<NintendoStorePage />} />
        <Route path={paths.productDetail} element={<StoreProductDetailPage />} />
        <Route path={paths.orderConfirmation} element={<OrderConfirmationPage />} />
        <Route path={paths.payment} element={<PaymentPage />} />
        <Route path={paths.hardware} element={<NintendoSwitchPage />} />
        <Route path={paths.history} element={<NintendoAboutPage />} />
        <Route path={paths.community} element={<CommunityListPage />} />
        <Route path={paths.communityWrite} element={<CommunityWritePage />} />
        <Route path={paths.support} element={<SupportPage />} />
        <Route path={paths.inquiries} element={<InquiryListPage />} />
        <Route path={paths.mypage} element={<MyNintendoPage />} />
        <Route path={paths.profile} element={<ProfileEditPage />} />
        <Route path={paths.login} element={<LoginPage />} />
        <Route path={paths.signup} element={<SignUpPage />} />
        <Route path={paths.communityDetail} element={<CommunityDetailPage />} />
        <Route path={paths.paymentResult} element={<PaymentResultPage />} />
        <Route path={paths.orders} element={<OrderHistoryPage />} />
        <Route path={paths.activity} element={<RecentActivityPage />} />
        <Route path={paths.reviews} element={<MyReviewsPage />} />
        <Route path={paths.faq} element={<FaqPage />} />
        <Route path={paths.supportRequest} element={<SupportRequestPage />} />
        <Route path="/about" element={<Navigate to={paths.history} replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </>;
}

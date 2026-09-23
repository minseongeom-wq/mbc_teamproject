import publicAsset from '../../../utils/publicAsset';

// Shared IA paths for navigation, route registration and basic-page links.
export const navigationRoutes = {
  home: '/', mario: '/ip/mario', zelda: '/ip/zelda', splatoon: '/ip/splatoon',
  games: '/games', store: '/store', hardware: '/hardware', history: '/history',
  community: '/community', support: '/support', inquiries: '/inquiries',
  orderConfirmation: '/order-confirmation', payment: '/payment', login: '/login', signup: '/signup',
  mypage: '/mypage', profile: '/mypage/profile',
  orders: '/mypage/orders', activity: '/mypage/activity', reviews: '/mypage/reviews',
  faq: '/support/faq', supportRequest: '/support/request', paymentResult: '/payment/result',
  communityDetail: '/community/:postId', communityExample: '/community/sample-post',
  ipDetail: '/ip/:ipSlug', gameDetail: '/games/:productId',
  productDetail: '/store/:productId', communityWrite: '/community/write',
  gameExample: '/games/sample-game', productExample: '/store/sample-product',
};
export const navigationHref = (route) => publicAsset(route);
export const characterLinks = [
  { id: 'mario', label: 'Mario', route: navigationRoutes.mario, hoverImage: '61c06.png' },
  { id: 'zelda', label: 'Zelda', route: navigationRoutes.zelda, hoverImage: '9bb38.png' },
  { id: 'splatoon', label: 'Splatoon', route: navigationRoutes.splatoon, hoverImage: 'fbfae.png' },
];
export const utilityLinks = [
  { label: 'Home', route: navigationRoutes.home },
  { label: 'Games', route: navigationRoutes.games },
  { label: '주문 확인', route: navigationRoutes.orderConfirmation },
  { label: '내 문의', route: navigationRoutes.inquiries },
];
export function getAccountLinks(isAuthenticated) {
  return isAuthenticated
    ? [{ label: '마이 닌텐도', route: navigationRoutes.mypage }, { label: '프로필 수정', route: navigationRoutes.profile }]
    : [
      { label: '로그인', route: navigationRoutes.login },
      { label: '회원가입', route: navigationRoutes.signup },
    ];
}

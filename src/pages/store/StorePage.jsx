import PlaceholderPage from '../../components/common/PlaceholderPage.jsx';
import { routePaths } from '../../routes/routePaths.js';

export default function StorePage() {
  return (
    <PlaceholderPage
      english="NINTENDO STORE"
      title="닌텐도 스토어"
      description="게임과 제품을 한곳에서 살펴보는 공간입니다. 지금은 페이지 이동을 확인할 수 있습니다."
      cards={[["소프트웨어","게임별 소개와 상품 정보를 준비하고 있습니다."],["실물 제품","본체와 주변기기 정보를 소개할 예정입니다."],["구매 안내","주문부터 결제까지의 안내를 준비하고 있습니다."]]}
      links={[["상품 목록 보기", routePaths.productList], ["Nintendo Switch 보기", routePaths.hardware]]}
    />
  );
}

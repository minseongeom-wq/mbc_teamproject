import PlaceholderPage from '../../components/common/PlaceholderPage.jsx';
import { routePaths } from '../../routes/routePaths.js';

export default function ProductDetailPage() {
  return (
    <PlaceholderPage
      english="PRODUCT DETAILS"
      title="상품 상세"
      description="상품을 자세히 알아보는 공간입니다. 현재는 실제 판매 상품이 아닌 임시 안내 화면입니다."
      cards={[["상품 소개","게임과 제품의 특징을 소개할 예정입니다."],["이용 정보","지원 기기와 이용 조건을 안내할 예정입니다."],["구매 전 확인","가격과 옵션 등 실제 구매 정보는 아직 제공하지 않습니다."]]}
      links={[["주문 확인 화면 보기", routePaths.orderReview], ["상품 목록으로", routePaths.productList]]}
    />
  );
}

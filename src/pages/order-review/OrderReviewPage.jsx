import PlaceholderPage from '../../components/common/PlaceholderPage.jsx';
import { routePaths } from '../../routes/routePaths.js';

export default function OrderReviewPage() {
  return (
    <PlaceholderPage
      english="ORDER REVIEW"
      title="주문 확인"
      description="선택한 상품과 주문 내용을 확인하는 공간입니다. 현재 실제 주문은 생성되지 않습니다."
      cards={[["선택 상품","선택한 상품이 표시될 예정입니다."],["주문 정보","수량과 주문 정보를 확인할 수 있도록 준비합니다."],["최종 확인","금액과 주문 조건은 실제 기능 연결 후 제공됩니다."]]}
      links={[["결제 안내 화면으로", routePaths.checkout], ["상품 목록으로", routePaths.productList]]}
    />
  );
}

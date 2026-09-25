import PlaceholderPage from '../../components/common/PlaceholderPage.jsx';
import { routePaths } from '../../routes/routePaths.js';

export default function CheckoutPage() {
  return (
    <PlaceholderPage
      english="CHECKOUT"
      title="결제 / 결과 확인"
      description="결제 과정과 결과를 안내할 공간입니다. 결제 정보를 입력하거나 실제 결제할 수는 없습니다."
      cards={[["결제 수단","지원할 결제 수단을 안내할 예정입니다."],["결제 확인","안전한 결제를 위한 확인 절차를 준비합니다."],["결과 안내","결과와 후속 안내가 표시될 예정입니다."]]}
      links={[["주문 확인으로", routePaths.orderReview], ["마이페이지로", routePaths.mypage]]}
    />
  );
}

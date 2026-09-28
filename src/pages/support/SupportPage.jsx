import PlaceholderPage from '../../components/common/PlaceholderPage.jsx';
import { routePaths } from '../../routes/routePaths.js';

export default function SupportPage() {
  return (
    <PlaceholderPage
      english="SUPPORT"
      title="고객지원"
      description="서비스와 제품 이용에 필요한 도움말을 준비하고 있습니다."
      cards={[["자주 묻는 질문","궁금한 내용을 찾아볼 수 있도록 준비합니다."],["제품 이용 안내","게임기와 소프트웨어 이용 정보를 안내할 예정입니다."],["문의 안내","문의 접수와 처리 상태 기능은 준비 중입니다."]]}
      links={[["제품 페이지 보기", routePaths.hardware], ["마이페이지로", routePaths.mypage]]}
    />
  );
}

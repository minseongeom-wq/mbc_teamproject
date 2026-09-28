import PlaceholderPage from '../../components/common/PlaceholderPage.jsx';
import { routePaths } from '../../routes/routePaths.js';

export default function MyPage() {
  return (
    <PlaceholderPage
      english="MY NINTENDO"
      title="마이페이지"
      description="나의 정보와 활동을 한곳에서 확인할 공간입니다. 현재는 개인 데이터가 없는 미리보기 화면입니다."
      cards={[["프로필","개인 정보와 계정 설정을 관리할 예정입니다."],["구매 내역","주문과 구매 기록을 확인할 수 있도록 준비합니다."],["나의 활동","관심 있는 게임과 활동 기록을 모아볼 예정입니다."]]}
      links={[["스토어 둘러보기", routePaths.store], ["고객지원 보기", routePaths.support]]}
    />
  );
}

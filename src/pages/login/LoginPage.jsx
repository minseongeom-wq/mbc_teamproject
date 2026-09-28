import PlaceholderPage from '../../components/common/PlaceholderPage.jsx';
import { routePaths } from '../../routes/routePaths.js';

export default function LoginPage() {
  return (
    <PlaceholderPage
      english="LOGIN"
      title="로그인"
      description="계정으로 더 많은 서비스를 이용할 수 있도록 준비하고 있습니다. 현재 로그인 기능은 제공하지 않습니다."
      cards={[["계정 로그인","로그인 입력 화면은 추후 연결됩니다."],["계정 연결","계정 연동 기능을 준비하고 있습니다."],["나의 활동","로그인 후 이용할 개인 공간을 확인해 보세요."]]}
      links={[["회원가입 안내", routePaths.signup], ["마이페이지 미리보기", routePaths.mypage]]}
    />
  );
}

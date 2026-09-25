import PlaceholderPage from '../../components/common/PlaceholderPage.jsx';
import { routePaths } from '../../routes/routePaths.js';

export default function SignupPage() {
  return (
    <PlaceholderPage
      english="CREATE ACCOUNT"
      title="회원가입"
      description="닌텐도와 함께할 계정 생성 공간입니다. 아직 회원정보를 입력하거나 저장하지 않습니다."
      cards={[["기본 정보","가입에 필요한 정보를 안내할 예정입니다."],["이용 동의","이용 조건과 동의 절차를 준비하고 있습니다."],["가입 완료","가입 완료 후 이용 방법을 안내할 예정입니다."]]}
      links={[["로그인 안내", routePaths.login], ["메인으로", routePaths.home]]}
    />
  );
}

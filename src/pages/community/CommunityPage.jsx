import PlaceholderPage from '../../components/common/PlaceholderPage.jsx';
import { routePaths } from '../../routes/routePaths.js';

export default function CommunityPage() {
  return (
    <PlaceholderPage
      english="COMMUNITY"
      title="SNS형 피드"
      description="게임을 즐기는 다양한 이야기가 모일 공간입니다. 게시물과 참여 기능은 준비 중입니다."
      cards={[["플레이 이야기","즐거웠던 게임 경험을 나누는 공간을 준비합니다."],["게임별 소식","관심 있는 게임의 이야기를 모아볼 예정입니다."],["커뮤니티 참여","글 작성과 반응 기능은 아직 연결되지 않았습니다."]]}
      links={[["로그인 페이지로", routePaths.login], ["스토어 둘러보기", routePaths.store]]}
    />
  );
}

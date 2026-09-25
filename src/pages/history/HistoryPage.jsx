import { generatePath } from 'react-router-dom';
import PlaceholderPage from '../../components/common/PlaceholderPage.jsx';
import { routePaths } from '../../routes/routePaths.js';

export default function HistoryPage() {
  return (
    <PlaceholderPage
      english="OUR HISTORY"
      title="브랜드 / 역사"
      description="닌텐도가 걸어온 시간과 새로운 도전을 소개할 공간입니다."
      cards={[["닌텐도의 시작","브랜드의 출발과 배경을 정리하고 있습니다."],["게임기의 변화","시대별 게임기와 플레이 경험을 소개할 예정입니다."],["이어지는 이야기","캐릭터와 게임의 이야기를 이어갈 예정입니다."]]}
      links={[["Mario 알아보기", generatePath(routePaths.ipDetail, { slug: 'mario' })], ["메인으로", routePaths.home]]}
    />
  );
}

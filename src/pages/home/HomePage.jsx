import { generatePath } from 'react-router-dom';
import PlaceholderPage from '../../components/common/PlaceholderPage.jsx';
import { routePaths } from '../../routes/routePaths.js';

export default function HomePage() {
  return (
    <PlaceholderPage
      english="HOME"
      title="메인"
      description="닌텐도의 다양한 세계를 만나 보세요. 관심 있는 페이지부터 자유롭게 둘러볼 수 있습니다."
      cards={[["캐릭터와 세계관","Mario, Zelda, Splatoon의 소개 공간을 준비하고 있습니다."],["게임 둘러보기","게임과 상품을 탐색할 수 있는 스토어를 준비하고 있습니다."],["함께하는 이야기","닌텐도를 좋아하는 사람들의 이야기를 담을 예정입니다."]]}
      links={[["IP 둘러보기", generatePath(routePaths.ipDetail, { slug: 'mario' })], ["스토어로 이동", routePaths.store]]}
    />
  );
}

import PlaceholderPage from '../../components/common/PlaceholderPage.jsx';
import { routePaths } from '../../routes/routePaths.js';

export default function ZeldaPage() {
  return (
    <PlaceholderPage
      english="ZELDA WORLD"
      title="IP 상세 — Zelda"
      description="Zelda의 캐릭터와 세계를 소개할 공간입니다. 상세 콘텐츠를 준비하고 있습니다."
      cards={[
        ['캐릭터 소개', 'Zelda의 등장인물과 이야기를 소개할 예정입니다.'],
        ['세계관 탐색', '게임 속 다양한 장소와 배경을 소개할 예정입니다.'],
        ['관련 게임', '함께 살펴볼 게임과 상품 정보를 준비하고 있습니다.'],
      ]}
      links={[[ '스토어 둘러보기', routePaths.store ], [ '메인으로', routePaths.home ]]}
    />
  );
}

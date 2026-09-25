import { useParams } from 'react-router-dom';
import PlaceholderPage from '../../components/common/PlaceholderPage.jsx';
import { routePaths } from '../../routes/routePaths.js';

const ipNames = { mario: 'Mario', zelda: 'Zelda', splatoon: 'Splatoon' };

export default function IPDetailPage() {
  const { slug } = useParams();
  const name = Object.hasOwn(ipNames, slug) ? ipNames[slug] : null;
  return (
    <PlaceholderPage
      english={name ? `${name.toUpperCase()} WORLD` : 'IP NOT FOUND'}
      title={name ? `IP 상세 — ${name}` : 'IP 상세 — 찾을 수 없는 IP'}
      description={name ? `${name}의 캐릭터와 세계를 소개할 공간입니다. 상세 콘텐츠를 준비하고 있습니다.` : '이 주소에 해당하는 IP를 찾을 수 없습니다. 메인에서 다른 세계를 선택해 주세요.'}
      cards={[
        ['캐릭터 소개', name ? `${name}의 등장인물과 이야기를 소개할 예정입니다.` : '등록된 IP를 메인에서 확인해 주세요.'],
        ['세계관 탐색', '게임 속 다양한 장소와 배경을 소개할 예정입니다.'],
        ['관련 게임', '함께 살펴볼 게임과 상품 정보를 준비하고 있습니다.'],
      ]}
      links={[[ '스토어 둘러보기', routePaths.store ], [ '메인으로', routePaths.home ]]}
    />
  );
}

import PlaceholderPage from '../../components/common/PlaceholderPage.jsx';
import { routePaths } from '../../routes/routePaths.js';

export default function SwitchPage() {
  return (
    <PlaceholderPage
      english="NINTENDO SWITCH"
      title="실물제품"
      description="닌텐도와 함께하는 플레이 환경을 살펴보세요. 제품별 자세한 소개는 준비 중입니다."
      cards={[["게임기 본체","본체의 특징과 플레이 방식을 소개할 예정입니다."],["컨트롤러","함께 즐기는 다양한 조작 방식을 소개합니다."],["주변기기","플레이에 필요한 주변기기 정보를 준비합니다."]]}
      links={[["스토어로 이동", routePaths.store], ["고객지원 보기", routePaths.support]]}
    />
  );
}

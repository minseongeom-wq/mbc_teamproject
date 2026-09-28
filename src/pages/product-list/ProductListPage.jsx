import { generatePath } from 'react-router-dom';
import PlaceholderPage from '../../components/common/PlaceholderPage.jsx';
import { previewProductId, routePaths } from '../../routes/routePaths.js';

export default function ProductListPage() {
  return (
    <PlaceholderPage
      english="PRODUCTS"
      title="상품 목록"
      description="관심 있는 상품을 찾아보세요. 실제 상품 목록과 검색 기능은 준비 중입니다."
      cards={[["게임 소프트웨어","다양한 게임의 정보를 모아 제공할 예정입니다."],["제품과 주변기기","닌텐도 제품을 확인할 수 있는 공간입니다."],["상품 탐색","분류와 검색 기능은 추후 연결됩니다."]]}
      links={[["임시 상품 상세 보기", generatePath(routePaths.productDetail, { id: previewProductId })], ["스토어로 돌아가기", routePaths.store]]}
    />
  );
}

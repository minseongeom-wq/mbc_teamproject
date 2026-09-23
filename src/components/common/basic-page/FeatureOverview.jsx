import { useParams } from 'react-router-dom';
import { getBasicPageContent } from '../../../services/basicPageService';
import AppLink from '../AppLink';
import { navigationRoutes } from '../navigation/navigationLinks';
import './FeatureOverview.css';

const linkLabels = {
  home: '홈으로', mario: 'Mario', zelda: 'Zelda', splatoon: 'Splatoon',
  games: '게임 탐색', store: '스토어', hardware: 'Nintendo Switch',
  history: '닌텐도의 역사', community: '커뮤니티', support: '고객지원',
  orderConfirmation: '주문 확인', payment: '결제 화면', mypage: '마이 닌텐도',
  profile: '프로필 수정', inquiries: '내 문의', login: '로그인', signup: '회원가입',
  gameExample: '게임 상세 화면', productExample: '상품 상세 화면',
  orders: '주문 내역', activity: '최근 활동', reviews: '남긴 리뷰',
  faq: 'FAQ / 문제 검색', supportRequest: '상담 / 수리 접수', paymentResult: '결제 결과 화면',
  communityExample: '게시물 상세 화면',
  communityWrite: '게시글 작성',
};

export default function FeatureOverview({ pageId }) {
  const page = getBasicPageContent(pageId);
  const params = useParams();
  const detailId = params.productId ?? params.postId;
  return (
    <div className="feature-overview">
      <div className="feature-overview__intro">
        <p className="feature-overview__eyebrow">{page.eyebrow}</p>
        <h1 className="feature-overview__title" tabIndex={-1}>{page.title}</h1>
        <p className="feature-overview__description">{page.description}</p>
        <span className="feature-overview__status">준비 중</span>
        {detailId && <p className="feature-overview__detail-id">선택 항목: {detailId}</p>}
      </div>
      <section className="feature-overview__section" aria-label="페이지 구성">
        <h2 className="feature-overview__section-title">이곳에서 만나볼 수 있어요</h2>
        <div className="feature-overview__cards">
          {page.sections.map((section, index) => <article className="feature-overview__card" key={section}>
            <span className="feature-overview__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <h3>{section}</h3>
            <p>콘텐츠를 준비하고 있습니다.</p>
          </article>)}
        </div>
      </section>
      {page.links.length > 0 && <nav className="feature-overview__links" aria-label="관련 페이지">
        {page.links.map(key => <AppLink className="feature-overview__link" key={key} to={navigationRoutes[key]}>{linkLabels[key]} <span aria-hidden="true">↗</span></AppLink>)}
      </nav>}
    </div>
  );
}

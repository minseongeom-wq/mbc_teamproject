import { useSearchParams } from 'react-router-dom';
import StoreHeroSection from './StoreHeroSection.jsx';
import StoreProductRail from './StoreProductRail.jsx';
import { storeCategoryPages } from './storeCategoryData.js';
import { storeImage } from './storeData.js';
import './StoreCategoryPage.css';

const categoryKeys = {
  '디지털 상품': 'digital',
  '실물 상품': 'physical',
  '특집': 'feature',
  'Switch Online': 'online',
};

const badgeSlots = {
  digital: [[0, 1, 2, 3, 4, 5], [5], [0, 1, 3, 4, 5], [0, 2, 3], [1, 2]],
  physical: [[0, 1, 2, 3, 4, 5], [], [], [], []],
  feature: [[0, 1, 2, 3, 4, 5], [0, 2, 3, 4], []],
  online: [[], [], [], [1, 2], []],
};

const planBenefits = [
  ['온라인 플레이', '친구와 온라인으로 함께 플레이', true, true],
  ['게임챗', '음성 대화와 화면 공유 기능', true, true],
  ['Nintendo Classics', '다양한 추억의 게임을 자유롭게', true, true],
  ['가입자 한정 특전', '회원만을 위한 게임과 특별 혜택', true, true],
  ['Nintendo Switch 2 Edition', '대응 타이틀의 향상된 플레이 경험', false, true],
  ['유료 추가 콘텐츠', '인기 게임의 추가 콘텐츠 이용', false, true],
  ['그 외 서비스', '저장 데이터 보관 등 편리한 기능', true, true],
];

function OnlinePlanComparison() {
  return (
    <section className="store-online-plans" aria-labelledby="store-online-plans-title">
      <h2 id="store-online-plans-title">Nintendo Switch Online</h2>
      <div className="store-online-plans__panel">
        <h3>나에게 맞는 플랜을 비교해 보세요</h3>
        <p>Nintendo Switch Online 서비스와 추가 팩의 혜택을 한눈에 비교해 보세요.</p>
        <div className="store-online-plans__table-wrap">
          <table className="store-online-plans__table">
            <colgroup><col className="store-online-plans__item-col" /><col className="store-online-plans__basic-col" /><col /></colgroup>
            <thead><tr><th scope="col">비교 항목</th><th scope="col">Nintendo Switch Online</th><th scope="col">Nintendo Switch Online + 추가 팩</th></tr></thead>
            <tbody>{planBenefits.map(([name, description, basic, expansion], index) => (
              <tr key={name}>
                <th scope="row"><strong>{name}</strong><span>{description}</span></th>
                <td aria-label={basic ? '포함' : '미포함'}>{basic ? <img className="store-online-plans__check" src={storeImage('0ef95.svg')} width="54" height="54" alt="" /> : '—'}{index === 2 && <small>NES · SNES · Game Boy</small>}</td>
                <td aria-label={expansion ? '포함' : '미포함'}>{expansion ? <img className="store-online-plans__check" src={storeImage(index === 0 ? '51207.svg' : '0ef95.svg')} width="54" height="54" alt="" /> : '—'}{index === 2 && <small>Nintendo 64 · GBA · GameCube · Mega Drive</small>}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <p className="store-online-plans__note">※ 제공되는 서비스와 대상 타이틀은 이용권 종류에 따라 달라질 수 있습니다.</p>
        <a className="store-online-plans__link" href="#store-online-passes">이용권 확인하기 →</a>
      </div>
    </section>
  );
}

export default function StoreCategoryPage() {
  const [params] = useSearchParams();
  const category = params.get('category') || '디지털 상품';
  const query = params.get('q')?.trim() || '';
  const pageKey = categoryKeys[category] || 'digital';
  const page = storeCategoryPages[pageKey];
  const rails = query
    ? Object.values(storeCategoryPages).flatMap((entry) => entry.rails).map((rail) => ({
      ...rail,
      products: rail.products.filter((product) => product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())),
    })).filter((rail) => rail.products.length)
    : page.rails;

  return (
    <div className={`store-page store-subpage store-subpage--${query ? 'search' : pageKey}`} style={{ '--store-subpage-height': `${query ? 0 : page.height}px` }}>
      <StoreHeroSection compact activeCategory={query ? '' : category} />
      <div className="store-subpage__intro">
        <div><h2>{query ? `‘${query}’ 검색 결과` : page.title}</h2><p>{query ? `${rails.reduce((total, rail) => total + rail.products.length, 0)}개의 상품을 찾았습니다.` : page.description}</p></div>
      </div>
      <div className="store-subpage__body">
        {pageKey === 'online' && !query && <OnlinePlanComparison />}
        <div className="store-subpage__rails">
          {rails.length ? rails.map((rail, index) => (
            <div id={pageKey === 'online' && index === 0 ? 'store-online-passes' : undefined} key={`${rail.title}-${index}`}>
            <StoreProductRail title={rail.title} products={rail.products.map((product, productIndex) => ({ ...product, badge: pageKey === 'digital' || badgeSlots[pageKey]?.[index]?.includes(productIndex) }))} className={((pageKey === 'feature' || pageKey === 'physical') && index === 1) ? 'store-rail--highlight-prices' : ''} sale={pageKey === 'digital' && index === 1} nextIcon={pageKey === 'digital' ? '1e22d.svg' : undefined} />
            </div>
          )) : <p className="store-subpage__empty">일치하는 상품이 없습니다.</p>}
        </div>
      </div>
    </div>
  );
}

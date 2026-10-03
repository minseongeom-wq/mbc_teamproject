import { useMemo, useState } from 'react';
import searchIcon from '../support/assets/icons/search.svg';
import accountIcon from '../support/assets/icons/account.svg';
import gameIcon from '../support/assets/icons/game.svg';
import familyIcon from '../support/assets/icons/family.svg';
import friendIcon from '../support/assets/icons/friend-main.svg';
import mobileAppImage from '../support/assets/mobile-app.png';
import switchConsoleImage from '../support/assets/switch-console.png';
import './support2.css';

const categories = [
  '계정 및 프로필',
  '가족 및 온라인 안전 정보',
  '구독 및 청구',
  '게임 및 앱',
  '하드웨어 및 네트워킹',
  '친구 및 소셜 활동',
];

const results = [
  {
    category: '계정 및 프로필',
    title: 'Nintendo 계정 로그인 및 프로필 설정',
    description: '로그인, 비밀번호 변경, 닉네임과 계정 정보를 확인해 보세요.',
    keywords: '계정 로그인 아이디 비밀번호 프로필 닉네임',
    image: accountIcon,
    imageType: 'icon',
  },
  {
    category: '가족 및 온라인 안전 정보',
    title: '자녀 보호 기능과 온라인 안전 설정',
    description: '가족 그룹과 연령별 이용 제한을 안전하게 설정하는 방법입니다.',
    keywords: '가족 자녀 보호 온라인 안전 연령 제한',
    image: gameIcon,
    imageType: 'icon',
  },
  {
    category: '구독 및 청구',
    title: 'Nintendo Switch Online 구독 및 결제',
    description: '이용권, 자동 갱신, 결제 내역과 청구 관련 도움말을 확인하세요.',
    keywords: '구독 청구 결제 이용권 온라인 자동 갱신',
    image: familyIcon,
    imageType: 'icon',
  },
  {
    category: '게임 및 앱',
    title: 'Nintendo Switch 모바일 앱 소개',
    description: '게임과 앱 설치, 업데이트 및 모바일 앱 이용 방법을 안내합니다.',
    keywords: '게임 앱 모바일 설치 업데이트 소프트웨어',
    image: mobileAppImage,
  },
  {
    category: '하드웨어 및 네트워킹',
    title: '본체 설정과 네트워크 연결 문제 해결',
    description: 'Nintendo Switch 본체, 컨트롤러, Wi-Fi 연결을 점검해 보세요.',
    keywords: '본체 하드웨어 네트워크 와이파이 연결 컨트롤러 스위치',
    image: switchConsoleImage,
  },
  {
    category: '친구 및 소셜 활동',
    title: '친구 추가 및 소셜 기능 이용 안내',
    description: '친구 코드, 온라인 상태와 소셜 활동 공개 범위를 관리하세요.',
    keywords: '친구 소셜 활동 친구 코드 온라인 상태',
    image: friendIcon,
    imageType: 'icon',
  },
];

export default function Support2Content({ initialQuery = '', initialSection = '', onBack }) {
  const [query, setQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [activeSection, setActiveSection] = useState(initialSection);

  const visibleResults = useMemo(() => {
    if (activeSection) return results.filter((item) => item.category === activeSection);
    const normalizedQuery = activeQuery.trim().toLocaleLowerCase('ko-KR');
    if (!normalizedQuery) return results;
    return results.filter((item) => (
      `${item.category} ${item.title} ${item.description} ${item.keywords}`
        .toLocaleLowerCase('ko-KR')
        .includes(normalizedQuery)
    ));
  }, [activeQuery, activeSection]);

  const submitSearch = (event) => {
    event.preventDefault();
    setActiveQuery(query.trim());
    setActiveSection('');
  };

  const selectSection = (section) => {
    setQuery('');
    setActiveQuery('');
    setActiveSection(section);
  };

  const heading = activeSection || (activeQuery ? `'${activeQuery}' 검색 결과` : '전체 지원 결과');

  return (
    <div className="support2-content">
      <section className="support2-results" aria-labelledby="support2-heading">
        <aside className="support2-sidebar">
          <button className="support2-back" type="button" onClick={onBack}>
            <span aria-hidden="true">←</span> 고객지원으로 돌아가기
          </button>

          <form className="support2-search" role="search" onSubmit={submitSearch}>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="지원 결과 검색"
              placeholder="무엇을 도와드릴까요?"
            />
            {query && (
              <button className="support2-search__clear" type="button" onClick={() => setQuery('')} aria-label="검색어 지우기">
                ×
              </button>
            )}
            <button className="support2-search__submit" type="submit" aria-label="검색">
              <img src={searchIcon} alt="" />
            </button>
          </form>

          <div className="support2-sidebar__summary" aria-live="polite">
            <strong>{heading}</strong>
            <span>{visibleResults.length}개의 도움말</span>
          </div>

          <div className="support2-related">
            <h2>관련 문제</h2>
            {visibleResults.slice(0, 3).map((item) => (
              <button type="button" key={item.category} onClick={() => selectSection(item.category)}>
                <img src={searchIcon} alt="" />
                {item.category}
              </button>
            ))}
          </div>
        </aside>

        <div className="support2-main">
          <nav className="support2-filters" aria-label="지원 섹션 선택">
            {categories.map((category) => {
              const count = results.filter((item) => item.category === category).length;
              return (
                <button
                  type="button"
                  key={category}
                  className={activeSection === category ? 'is-active' : ''}
                  aria-pressed={activeSection === category}
                  onClick={() => selectSection(category)}
                >
                  <span>{category}</span>
                  <small>{count}</small>
                </button>
              );
            })}
          </nav>

          <header className="support2-main__heading">
            <h1 id="support2-heading">{heading}</h1>
            <span>{visibleResults.length}개</span>
          </header>

          {visibleResults.length > 0 ? (
            <div className="support2-grid">
              {visibleResults.map((item) => (
                <article className="support2-card" key={item.category} tabIndex="0">
                  <div className={`support2-card__image${item.imageType === 'icon' ? ' is-icon' : ''}`}>
                    <img src={item.image} alt="" />
                  </div>
                  <p>{item.category}</p>
                  <h2>{item.title}</h2>
                  <span>{item.description}</span>
                </article>
              ))}
            </div>
          ) : (
            <div className="support2-empty">
              <strong>검색 결과가 없습니다.</strong>
              <p>검색어를 바꾸거나 위의 지원 섹션을 선택해 주세요.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

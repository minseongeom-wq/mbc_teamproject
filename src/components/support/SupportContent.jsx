import { useRef, useState } from 'react';
import heroImage from './assets/hero.png';
import mobileAppImage from './assets/mobile-app.png';
import accessoriesImage from './assets/accessories.png';
import storageImage from './assets/storage.png';
import switchBoxImage from './assets/switch-box.png';
import switchConsoleImage from './assets/switch-console.png';
import searchIcon from './assets/icons/search.svg';
import dividerIcon from './assets/icons/divider.svg';
import accountIcon from './assets/icons/account.svg';
import familyIcon from './assets/icons/family.svg';
import gameIcon from './assets/icons/game.svg';
import networkIcon from './assets/icons/network.svg';
import friendMainIcon from './assets/icons/friend-main.svg';
import friendA7adfIcon from './assets/icons/friend-a7adf.svg';
import friendBd2bdIcon from './assets/icons/friend-bd2bd.svg';
import './support.css';

const sections = [
  { label: '계정 및 프로필', icons: [accountIcon] },
  { label: '가족 및 온라인 안전 정보', icons: [gameIcon] },
  { label: '구독 및 청구', icons: [familyIcon] },
  { label: '게임 및 앱', icons: [friendMainIcon] },
  { label: '하드웨어 및 네트워킹', icons: [networkIcon] },
  { label: '친구 및 소셜 활동', icons: [friendBd2bdIcon, friendA7adfIcon] },
];

export default function SupportContent() {
  const switchSectionRef = useRef(null);
  const [query, setQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [status, setStatus] = useState('');

  const normalizedQuery = activeQuery.trim().toLocaleLowerCase('ko-KR');
  const matchesSearch = (text) => normalizedQuery && text.toLocaleLowerCase('ko-KR').includes(normalizedQuery);
  const revealSwitchContent = () => switchSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const selectSection = (label) => {
    setSelectedSection(label);
    setStatus(`${label} 섹션을 선택했습니다.`);
    if (label === '게임 및 앱' || label === '하드웨어 및 네트워킹') revealSwitchContent();
  };

  const searchSupport = (event) => {
    event.preventDefault();
    const nextQuery = query.trim();
    setActiveQuery(nextQuery);
    if (!nextQuery) {
      setStatus('검색어를 입력해 주세요.');
      return;
    }

    const searchableText = 'Nintendo Switch 모바일 앱 게임 악세서리 액세서리 연결 게임 용량 최적화 하드웨어 네트워킹 본체';
    const found = searchableText.toLocaleLowerCase('ko-KR').includes(nextQuery.toLocaleLowerCase('ko-KR'));
    setStatus(found ? `'${nextQuery}' 관련 항목을 표시했습니다.` : `'${nextQuery}'에 대한 항목을 찾지 못했습니다.`);
    if (found) revealSwitchContent();
  };

  return (
    <div className="support-content">
      <section className="support-hero" aria-labelledby="support-title">
        <img className="support-hero__image" src={heroImage} alt="가족이 닌텐도 게임을 즐기는 모습" />
        <div className="support-hero__copy">
          <h1 id="support-title">안녕하세요, 어떻게 도와드릴까요?</h1>
          <form className="support-search" role="search" aria-label="고객 지원 검색" onSubmit={searchSupport}>
            <img src={searchIcon} alt="" />
            <input value={query} onChange={(event) => { setQuery(event.target.value); setActiveQuery(''); }} placeholder="예: 본체를 다시 설정하는 방법" aria-label="지원 항목 검색" />
            {query && <button type="button" className="support-search__clear" onClick={() => { setQuery(''); setActiveQuery(''); setStatus(''); }} aria-label="검색어 지우기">×</button>}
          </form>
          <p className="support-search__status" aria-live="polite">{status}</p>
        </div>
      </section>

      <section className="support-sections" aria-labelledby="support-sections-title">
        <div className="support-container">
          <h2 id="support-sections-title">섹션 선택</h2>
          <div className="support-sections__grid">
            {sections.map(({ label, icons }) => (
              <button type="button" className={`support-sections__item${selectedSection === label ? ' is-selected' : ''}`} key={label} onClick={() => selectSection(label)} aria-pressed={selectedSection === label}>
                <span className="support-sections__icon" aria-hidden="true">
                  {icons.map((icon, index) => <img key={icon} src={icon} alt="" className={`support-sections__glyph support-sections__glyph--${index}`} />)}
                  <img className="support-sections__divider" src={dividerIcon} alt="" />
                </span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="support-switch" aria-labelledby="support-switch-title" ref={switchSectionRef}>
        <div className="support-container">
          <h2 id="support-switch-title">Nintendo Switch 관련 문제</h2>
          <div className="support-switch__cards">
            <article className={`support-card support-card--feature${matchesSearch('Nintendo Switch 모바일 앱') ? ' is-search-match' : ''}`} tabIndex="0">
              <img src={mobileAppImage} alt="Nintendo Switch 모바일 앱" />
              <h3>Nintendo Switch 모바일 앱 소개</h3>
            </article>
            <div className="support-card-stack">
              <article className={`support-card support-card--wide${matchesSearch('게임 악세서리 액세서리 연결') ? ' is-search-match' : ''}`} tabIndex="0"><h3>게임 악세서리<br />연결</h3><img src={accessoriesImage} alt="게임 액세서리를 사용하는 모습" /></article>
              <article className={`support-card support-card--wide${matchesSearch('게임 용량 최적화 방법') ? ' is-search-match' : ''}`} tabIndex="0"><h3>게임 용량<br />최적화 방법</h3><img src={storageImage} alt="게임을 즐기는 가족" /></article>
            </div>
          </div>
          <div className="support-products" aria-label="Nintendo Switch 제품 이미지">
            <img src={switchBoxImage} alt="Nintendo Switch 2 패키지" />
            <img src={switchConsoleImage} alt="Nintendo Switch 2 본체" />
          </div>
        </div>
      </section>
    </div>
  );
}

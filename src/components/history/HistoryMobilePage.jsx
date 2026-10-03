import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { routePaths } from '../../routes/routePaths.js';
import HistoryHeroStorySection from './HistoryHeroStorySection.jsx';
import HistoryBrandStatement01 from './HistoryBrandStatement01.jsx';
import HistoryBrandStatement02 from './HistoryBrandStatement02.jsx';
import HistoryBrandStatement03 from './HistoryBrandStatement03.jsx';
import HistoryMobileOverview from './HistoryMobileOverview.jsx';
import './HistoryMobilePage.css';

const asset = name => `${import.meta.env.BASE_URL}images/history/mobile/${name}`;
const awards = [
  ['The Game Awards', '(2023)'], ['BAFTA Games Awards', '(2024)'],
  ['Japan Game Awards', '(2024)'], ['D.I.C.E. Awards', '(2018)'], ['GDCA', '(2018)'],
];
const logos = [
  ['18e5c.png', 87.5, 24.868], ['0b9dc.png', 87.5, 56], ['84008.png', 87.5, 56.6], ['b7f0b.png', 87.5, 28.133],
  ['a030c.png', 87.5, 25.521], ['e5fd0.png', 87.5, 68.72], ['36fa7.png', 87.5, 51.5], ['b22a8.png', 87.5, 87.5],
  ['ea95f.svg', 87.5, 42.6561], ['8796c.png', 87.5, 58.4], ['46921.png', 87.5, 70.38], ['ffccd.png', 87.5, 43.75],
];
const rays = [
  ['2e2e1.svg', 180.93, 384, 0, 128, 'rotate(-90deg)'],
  ['32eae.svg', 123.79, 384, 56.129, 114, 'rotate(-63.79deg) scaleY(.79) skewX(-37.57deg)'],
  ['01657.svg', 58, 384, 122.105, 66, 'rotate(-28.39deg) scaleY(.93) skewX(-20.93deg)'],
  ['6a42f.svg', 179.3, 384, 56.129, 114, 'rotate(-116.21deg) scaleY(-.79) skewX(37.57deg)'],
  ['75235.svg', 179.12, 384, 122.105, 66, 'rotate(-151.61deg) scaleY(-.93) skewX(20.93deg)'],
];

// Mobile is a separate, unpinned artboard. Desktop components retain their timelines.
export default function HistoryMobilePage() {
  const rootRef = useRef(null);
  useLayoutEffect(() => {
    const root = rootRef.current;
    let width = root.clientWidth;
    let frame;
    const update = () => {
      const scale = root.clientWidth / 360;
      root.style.setProperty('--history-mobile-scale', scale);
      root.closest('.site-shell').style.setProperty('--history-mobile-scale', scale);
    };
    update();
    const observer = new ResizeObserver(() => {
      if (root.clientWidth === width) return;
      width = root.clientWidth;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    });
    observer.observe(root);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      root.closest('.site-shell')?.style.removeProperty('--history-mobile-scale');
    };
  }, []);
  return <main ref={rootRef} className="history-page history-page--mobile">
    <div className="history-mobile" data-node-id="2092:5008">
      <section className="history-mobile__intro" data-node-id="2092:4964" aria-label="닌텐도의 역사">
        <img className="history-mobile__star" src={asset('e4cd6.svg')} alt="" />
        <h1>A NINTENDO STORY</h1>
        <img className="history-mobile__intro-line" src={asset('57049.svg')} alt="" />
        <p>1889 - TODAY</p>
      </section>
      <HistoryHeroStorySection />
      <section className="history-mobile__beginning" data-node-id="2092:5012" aria-label="닌텐도의 시작과 철학">
        <img src={asset('cb6ef.png')} alt="교토 닌텐도 사옥" />
        <div className="history-mobile__beginning-mask history-mobile__beginning-mask--left" />
        <div className="history-mobile__beginning-mask history-mobile__beginning-mask--right" />
        <div className="history-mobile__beginning-copy">
          <h2>OUR BEGINNING</h2>
          <p>1889년 교토에서<br />화투 제작으로<br />시작한 닌텐도는<br />시대의 변화와 함께 새로운<br />놀이의 형태를 만들어 왔습니다.</p>
        </div>
        <div className="history-mobile__philosophy-copy">
          <h2>OUR PHILOSOPHY</h2>
          <p>형태는 달라져도<br />놀이가 주는 즐거움은<br />변하지 않습니다.<br />닌텐도는 언제나<br />새로운 방식으로<br />사람과 사람을 연결해 왔습니다.</p>
        </div>
      </section>
      <HistoryBrandStatement01 imageSrc={asset('e662e.svg')} />
      <HistoryBrandStatement02 imageSrc={asset('49d53.svg')} />
      <HistoryBrandStatement03 imageSrc={asset('ed0ef.svg')} />
      <section className="history-mobile__gallery" data-node-id="2119:5203" aria-labelledby="history-mobile-gallery-title">
        <h2 id="history-mobile-gallery-title">HOW<br />NINTENDO PLAYS</h2>
        {['d158a.png', 'e6b6d.png', '80981.png'].map((image, index) => <article className={`history-mobile__card history-mobile__card--${index}`} key={image}>
          <div className="history-mobile__card-crop"><img src={asset(image)} alt={['새로운 놀이를 만드는 과정', '닌텐도 게임과 기기', '함께 게임을 즐기는 가족'][index]} /></div>
          <h3>CREATE</h3>
          <p>익숙한 방식에 머무르지 않고<br />새로운 아이디어와 기술을 통해<br />지금까지 없던 놀이를 만들어갑니다</p>
        </article>)}
      </section>
      <HistoryMobileOverview />
      <section className="history-mobile__awards" data-node-id="2287:4076" aria-labelledby="history-mobile-awards-title">
        <img className="history-mobile__award-grid" src={asset('awards-grid.png')} alt="" />
        <h2 id="history-mobile-awards-title">Awards<span>수상기록들</span></h2>
        <div className="history-mobile__featured-award">
          <img src={asset('ee2f9.svg')} alt="The Game Awards" />
          <h3>The Legend of Zelda:<br />Tears of the Kingdom</h3>
          <p className="history-mobile__prize">Japan Game Awards 2024</p>
          <p className="history-mobile__prize-detail">Grand Award / Best Sales Award<br />/ Award for Excellence</p>
        </div>
        <ul>{awards.map(([name, year]) => <li key={name}><span>{name}</span><span>{year}</span></li>)}</ul>
      </section>
      <section className="history-mobile__logos" data-node-id="2312:326" aria-label="닌텐도를 빛낸 작품들">
        <h2>Awards<span>닌텐도를 빛낸 작품들</span></h2>
        <div className="history-mobile__logo-scroll" tabIndex={0} role="region" aria-label="작품 로고, 좌우로 스크롤">
          <div className="history-mobile__logo-grid">{logos.map(([image, width, height]) => <div key={image}><img src={asset(image)} alt="" style={image.endsWith('.svg') ? undefined : { width, height }} /></div>)}</div>
        </div>
      </section>
      <section className="history-mobile__next" data-node-id="2332:349" aria-label="앞으로 이어질 닌텐도의 놀이">
        <p className="history-mobile__the">THE</p><h2>NEXT</h2><p className="history-mobile__play">PLAY</p>
        <img className="history-mobile__baseline" src={asset('c5604.svg')} alt="" />
        {rays.map(([image, left, top, width, height, transform]) => <div className="history-mobile__ray" key={image} style={{ left, top, width, height }}><img src={asset(image)} alt="" style={{ transform }} /></div>)}
        <p className="history-mobile__still">AND STILL<br />PLAYING</p><p className="history-mobile__since">SINCE 1889</p>
        <div className="history-mobile__story-arrow"><img src={asset('03d33.svg')} alt="" /></div>
        <div className="history-mobile__story-copy history-mobile__story-copy--first">
          <h3>놀이의 모습은<br />계속 달라졌지만</h3>
          <p>1889년 교토에서 시작한 닌텐도는 오랜 시간 새로운 형태의 엔터테인먼트를 만들어 왔습니다. 시대에 따라 놀이의 모습은 달라졌지만, 독창적인 아이디어와 경험을 통해 사람들에게 즐거움을 전해왔습니다.</p>
        </div>
        <div className="history-mobile__story-copy history-mobile__story-copy--second">
          <h3>즐거움의 마음은<br />변하지 않습니다.</h3>
          <p>변하지 않은 것은 엔터테인먼트를 통해 사람들의 얼굴에 미소를 만들고자 하는 마음입니다. 닌텐도는 앞으로도 새로운 놀이와 경험을 통해 더 많은 사람들에게 즐거움을 전하고자 합니다.</p>
        </div>
        <Link className="history-mobile__home-link" to={routePaths.home}>현재의 닌텐도 만나보기<img src={asset('8a662.svg')} alt="" /></Link>
      </section>
      <footer className="history-mobile__footer" data-node-id="2332:2368">
        <nav aria-label="푸터 메뉴">
          <Link to={routePaths.support}>온라인고객 상담</Link>
          <a href="https://www.nintendo.com/kr/common/account.html" target="_blank" rel="noreferrer">이용약관</a>
          <a href="https://www.nintendo.com/kr/common/privacy.html" target="_blank" rel="noreferrer">개인정보 처리방침</a>
        </nav>
        <div className="history-mobile__footer-contact">
          <p>상담연락처</p>
          <a href="tel:1670-9900">대표전화 : 1670-9900</a>
          <a href="tel:02-2192-1700">법인 전용 전화: 02-2192-1700</a>
        </div>
        <div className="history-mobile__footer-company">
          <p>(주)한국닌텐도주식회사</p>
          <div><span>대표이사: 미우라 타카히로</span><a href="mailto:privacy@nintendo.co.kr">privacy@nintendo.co.kr</a></div>
          <p>사업자등록번호: 120-87-03578</p>
          <p>서울특별시 중구 마른내로 27, TOWER107 6층</p>
        </div>
        <p className="history-mobile__copyright">ⓒ 2006 Nintendo of Korea Co., Ltd. All Rights Reserved.</p>
      </footer>
    </div>
  </main>;
}

import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { routePaths } from '../../../routes/routePaths.js';
import './footer.css';

// Official links verified against nintendo.com/kr/assets/js/ncommon.js.
const socials = [
  ['Instagram', 'https://www.instagram.com/nintendo_kor/', 'd7108.png', 'instagram'],
  ['Youtube', 'https://www.youtube.com/channel/UCRCK5FCJtomQT3b88jXI_DA', '7dc39.png', 'youtube'],
  ['X', 'https://twitter.com/Nintendo_Korea', '34e9a.png', 'x'],
  ['카카오톡 채널', 'https://pf.kakao.com/_Xxiwzxj', '90994.png', 'kakao'],
];

export default function Footer({ variant = 'default' }) {
  const wordmark = useRef(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    setScale(wordmark.current.clientWidth / 1759);
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1759));
    observer.observe(wordmark.current);
    return () => observer.disconnect();
  }, []);
  const zelda = variant === 'zelda';
  const arrow = `${import.meta.env.BASE_URL}images/common/${zelda ? 'ff059.svg' : 'd06d6.svg'}`;
  function backToTop() {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.querySelector('.navigation__logo')?.focus({ preventScroll: true });
  }
  return <footer className={`common-footer common-footer--${variant}`}>
    <div className="common-footer__inner">
      <button type="button" className="common-footer__top" onClick={backToTop}><img src={`${import.meta.env.BASE_URL}images/common/${zelda ? '6f9ac.svg' : 'd839f.svg'}`} alt="" />Back to top</button>
      <div className="common-footer__links">
        <nav className="common-footer__support" aria-label="푸터 메뉴">
          <Link to={routePaths.support}>온라인 고객 상담<img src={arrow} alt="" /></Link>
          <a href="https://www.nintendo.com/kr/common/account.html" target="_blank" rel="noreferrer">이용약관<img src={arrow} alt="" /></a>
          <a href="https://www.nintendo.com/kr/common/privacy.html" target="_blank" rel="noreferrer">개인정보 처리방침<img src={arrow} alt="" /></a>
        </nav>
        <nav className="common-footer__social" aria-label="공식 SNS">
          {socials.map(([label, href, icon, name]) => <a key={name} href={href} target="_blank" rel="noreferrer">{label}<span className={`common-footer__social-icon common-footer__social-icon--${name}`}><img src={`${import.meta.env.BASE_URL}images/common/${icon}`} alt="" /></span></a>)}
        </nav>
      </div>
      <div className="common-footer__contact-row">
        <Link className="common-footer__emblem" to={routePaths.home} aria-label="메인"><span /></Link>
        <div className="common-footer__contact"><a href="mailto:privacy@nintendo.co.kr">privacy@nintendo.co.kr</a><a href="tel:1670-9900">1670-9900</a></div>
      </div>
      <div className="common-footer__company-row">
        <a href="https://www.nintendo.com/kr/" target="_blank" rel="noreferrer">한국닌텐도주식회사<br />Nintendo of Korea</a>
        <div><p>ⓒ 2006 Nintendo of Korea Co., Ltd. All Rights Reserved.</p><p>비공식 리뉴얼 프로젝트 · 실제 상품 판매 및 결제 서비스가 아닙니다.</p></div>
      </div>
      <div className="common-footer__wordmark" ref={wordmark}><img src={`${import.meta.env.BASE_URL}images/common/${zelda ? '283f0.svg' : 'e4eaa.svg'}`} style={{ zoom: scale }} alt="Nintendo" /></div>
    </div>
  </footer>;
}

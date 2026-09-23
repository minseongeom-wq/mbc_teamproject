import publicAsset from '../../utils/publicAsset';
import { useEffect, useRef, useState } from 'react';
import './NintendoHeader.css';

const sections = [['game-discovery', 'GAME DISCOVERY'], ['whats-new', "WHAT'S NEW?"], ['amiibo-section', 'AMIIBO'], ['nintendo-picks', 'NINTENDO PICKS'], ['daily-nintendo', 'DAILY NINTENDO']];

export default function NintendoHeader({ className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  useEffect(() => {
    if (!isOpen) return;
    const outside = (e) => { if (!headerRef.current.contains(e.target)) setIsOpen(false); };
    const escape = (e) => { if (e.key === 'Escape') { setIsOpen(false); menuRef.current.focus(); } };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
  }, [isOpen]);
  return <header className={`nintendo-header ${className}`} ref={headerRef}>
    <div className="nintendo-header__primary">
      <a className="nintendo-header__brand" href="#top" aria-label="Nintendo 메인페이지 맨 위로">
        <span className="nintendo-header__logo"><img src={publicAsset('/images/banners/59d10.svg')} alt="Nintendo" /></span>
        <span>Nintendo and co. NintendoKorea</span>
      </a>
      <button className="nintendo-header__menu-button" type="button" ref={menuRef} aria-expanded={isOpen} aria-controls="home-navigation" onClick={() => setIsOpen(!isOpen)}>MENU</button>
    </div>
    <a className="nintendo-header__account" href="https://my.nintendo.com/" aria-label="공식 My Nintendo 방문"><img src={publicAsset('/images/banners/d2eda.svg')} alt="" /><span>MY NINTENDO</span></a>
    {isOpen && <nav id="home-navigation" className="nintendo-header__navigation" aria-label="메인페이지 섹션">
      {sections.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setIsOpen(false)}>{label}</a>)}
    </nav>}
  </header>;
}

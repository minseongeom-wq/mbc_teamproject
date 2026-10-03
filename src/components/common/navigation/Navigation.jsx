import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { routePaths } from '../../../routes/routePaths.js';
import DropdownMenu from './DropdownMenu.jsx';
import './navigation.css';

export default function Navigation({ variant = 'red' }) {
  const [phase, setPhase] = useState('closed');
  const open = phase === 'open';
  const visible = phase !== 'closed';
  const header = useRef(null);
  const trigger = useRef(null);
  useEffect(() => {
    if (phase !== 'closing') return;
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 260;
    const timeout = window.setTimeout(() => setPhase('closed'), duration);
    return () => window.clearTimeout(timeout);
  }, [phase]);
  useEffect(() => {
    if (!open) return;
    function dismiss(event) {
      if (event.type === 'keydown' && event.key === 'Escape') {
        setPhase('closing');
        trigger.current?.focus();
      } else if (event.type === 'pointerdown' && !header.current?.contains(event.target)) {
        setPhase('closing');
      }
    }
    document.addEventListener('keydown', dismiss);
    document.addEventListener('pointerdown', dismiss);
    return () => {
      document.removeEventListener('keydown', dismiss);
      document.removeEventListener('pointerdown', dismiss);
    };
  }, [open]);
  const activeVariant = visible ? 'white' : variant;
  const logo = { red: '59d10.svg', white: '5c836.svg', zelda: '7282b.svg' }[activeVariant];
  return (
    <>
    {visible && <div className={`navigation-backdrop${phase === 'closing' ? ' navigation-backdrop--closing' : ''}`} aria-hidden="true" />}
    <header ref={header} className={`common-header common-header--${activeVariant}${visible ? ' common-header--open' : ''}${phase === 'closing' ? ' common-header--closing' : ''}`}>
      <div className="navigation">
        <div className="navigation__primary">
          <div className="navigation__identity">
            <Link className="navigation__logo" to={routePaths.home} aria-label="Nintendo Korea 홈">
              <img className="navigation__logo-desktop" src={`${import.meta.env.BASE_URL}images/common/${logo}`} alt="" />
            </Link>
            <span className="navigation__tagline">Nintendo and co. NintendoKorea</span>
          </div>
          <button type="button" ref={trigger} className="navigation__toggle" aria-expanded={open} aria-controls="main-menu" onClick={() => setPhase(open ? 'closing' : 'open')}>MENU</button>
        </div>
        <Link to={routePaths.mypage} className="navigation__account" aria-label="MY NINTENDO">
          <img className="navigation__sparkle" src={`${import.meta.env.BASE_URL}images/common/${activeVariant === 'white' ? '16767.svg' : 'd2eda.svg'}`} alt="" />
          <span>MY NINTENDO</span>
        </Link>
      </div>
      {visible && <DropdownMenu isClosing={phase === 'closing'} onNavigate={() => { setPhase('closing'); trigger.current?.focus(); }} />}
    </header>
    </>
  );
}

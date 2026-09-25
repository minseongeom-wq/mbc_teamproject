import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { routePaths } from '../../../routes/routePaths.js';
import DropdownMenu from './DropdownMenu.jsx';
import './navigation.css';

export default function Navigation({ variant = 'red' }) {
  const [open, setOpen] = useState(false);
  const header = useRef(null);
  const trigger = useRef(null);
  useEffect(() => {
    if (!open) return;
    function dismiss(event) {
      if (event.type === 'keydown' && event.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      } else if (event.type === 'pointerdown' && !header.current?.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', dismiss);
    document.addEventListener('pointerdown', dismiss);
    return () => {
      document.removeEventListener('keydown', dismiss);
      document.removeEventListener('pointerdown', dismiss);
    };
  }, [open]);
  const logo = { red: '59d10.svg', white: '5c836.svg', zelda: '7282b.svg' }[variant];
  return (
    <header ref={header} className={`common-header common-header--${variant}${open ? ' common-header--open' : ''}`}>
      <div className="navigation">
        <div className="navigation__primary">
          <div className="navigation__identity">
            <Link className="navigation__logo" to={routePaths.home} aria-label="Nintendo Korea 홈">
              <img className="navigation__logo-desktop" src={`/images/common/${logo}`} alt="" />
              <img className="navigation__logo-open" src="/images/common/5c836.svg" alt="" />
            </Link>
            <span className="navigation__tagline">Nintendo and co. NintendoKorea</span>
          </div>
          <button type="button" ref={trigger} className="navigation__toggle" aria-expanded={open} aria-controls="main-menu" onClick={() => setOpen(!open)}>MENU</button>
        </div>
        <Link to={routePaths.mypage} className="navigation__account" aria-label="MY NINTENDO">
          <img className="navigation__sparkle" src={`/images/common/${variant === 'white' ? '16767.svg' : 'd2eda.svg'}`} alt="" />
          <img className="navigation__sparkle-open" src="/images/common/d2341.svg" alt="" />
          <span>MY NINTENDO</span>
        </Link>
      </div>
      {open && <DropdownMenu onNavigate={() => setOpen(false)} />}
    </header>
  );
}

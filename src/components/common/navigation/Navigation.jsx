import AppLink from '../AppLink';
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import publicAsset from '../../../utils/publicAsset';
import DropdownMenu from './DropdownMenu';
import { navigationRoutes } from './navigationLinks';
import './Navigation.css';

// Authentication is owned by the future app/store, not this visual component.
export default function Navigation({ className = '', variant = 'red', isAuthenticated = false, profileImage, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  const focusFirstRef = useRef(false);
  const menuId = useId();
  const isWhite = variant === 'white';
  const accountRoute = isAuthenticated ? navigationRoutes.mypage : navigationRoutes.login;

  useLayoutEffect(() => {
    if (!isOpen) return;
    const positionPanel = () => {
      const bottom = headerRef.current.getBoundingClientRect().bottom;
      const top = Math.min(Math.max(8, bottom + 8), Math.max(8, window.innerHeight - 120));
      panelRef.current.style.top = `${top}px`;
      panelRef.current.style.maxHeight = `${window.innerHeight - top - 16}px`;
    };
    positionPanel();
    if (focusFirstRef.current) {
      panelRef.current.querySelector('a')?.focus();
      focusFirstRef.current = false;
    }
    window.addEventListener('resize', positionPanel);
    window.addEventListener('scroll', positionPanel, { passive: true });
    return () => {
      window.removeEventListener('resize', positionPanel);
      window.removeEventListener('scroll', positionPanel);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const outside = (event) => {
      if (!headerRef.current.contains(event.target) && !panelRef.current?.contains(event.target)) setIsOpen(false);
    };
    const escape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current.focus();
      }
      // Keep the portal in the header's logical keyboard order.
      if (event.key === 'Tab' && panelRef.current?.contains(event.target)) {
        const links = panelRef.current.querySelectorAll('a, button');
        if (event.shiftKey && event.target === links[0]) {
          event.preventDefault();
          buttonRef.current.focus();
        } else if (!event.shiftKey && event.target === links[links.length - 1]) {
          event.preventDefault();
          setIsOpen(false);
          headerRef.current.querySelector('.navigation__account').focus();
        }
      }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('focusin', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('focusin', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [isOpen]);

  return (
    <header className={`navigation navigation--${isWhite ? 'white' : 'red'} ${isOpen ? 'navigation--open' : ''} ${className}`} ref={headerRef} data-node-id={isWhite ? '1224:9278' : '1224:9279'}>
      <div className="navigation__primary">
        <AppLink className="navigation__brand" to={navigationRoutes.home} aria-label="Nintendo 홈" onClick={() => setIsOpen(false)}>
          <span className="navigation__logo"><img src={publicAsset(isWhite ? '/images/navigation/5c836.svg' : '/images/banners/59d10.svg')} alt="Nintendo" /></span>
          <span className="navigation__brand-caption">Nintendo and co. NintendoKorea</span>
        </AppLink>
        <button className="navigation__menu-button" type="button" ref={buttonRef} aria-expanded={isOpen} aria-controls={menuId} onClick={() => setIsOpen(open => !open)} onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (isOpen) panelRef.current.querySelector('a')?.focus();
            else { focusFirstRef.current = true; setIsOpen(true); }
          }
          if (event.key === 'Tab' && !event.shiftKey && isOpen) {
            event.preventDefault();
            panelRef.current.querySelector('a')?.focus();
          }
        }}>MENU<span className="sr-only"> {isOpen ? '닫기' : '열기'}</span></button>
      </div>
      <AppLink className="navigation__account" to={accountRoute} aria-label={isAuthenticated ? '마이 닌텐도' : '마이 닌텐도 로그인'} onClick={() => setIsOpen(false)}>
        <img className={profileImage && isAuthenticated ? 'navigation__avatar' : ''} src={isAuthenticated && profileImage ? profileImage : publicAsset(isWhite ? '/images/navigation/16767.svg' : '/images/banners/d2eda.svg')} alt="" />
        <span>MY NINTENDO</span>
      </AppLink>
      {isOpen && createPortal(<DropdownMenu id={menuId} panelRef={panelRef} isAuthenticated={isAuthenticated} onLogout={onLogout} onSelect={() => setIsOpen(false)} />, document.body)}
    </header>
  );
}

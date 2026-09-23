import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const title = document.querySelector('main h1');
    document.title = pathname === '/' ? 'Nintendo Renewal — Character & Game Experience' : `${title?.textContent ?? 'Nintendo'} | Nintendo Renewal`;
    if (pathname !== '/') title?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}

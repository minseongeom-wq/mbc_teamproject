import { useLayoutEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { homeNewsAsset } from './homeNewsData.js';
import './HomeNewsModal.css';

export default function HomeNewsModal({ item, onClose }) {
  const dialog = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useLayoutEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const root = document.documentElement;
    const previousGutter = root.style.scrollbarGutter;
    // Keep the Home canvas width unchanged when the page scrollbar is hidden.
    if (window.innerWidth > root.clientWidth && getComputedStyle(root).scrollbarGutter === 'auto') {
      root.style.scrollbarGutter = 'stable';
    }
    document.body.style.overflow = 'hidden';
    element.showModal();
    element.querySelector('button').focus({ preventScroll: true });
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      root.style.scrollbarGutter = previousGutter;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  return createPortal(
    <dialog ref={dialog} className="home-news-modal" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId}
      onCancel={event => { event.preventDefault(); onClose(); }}
      onKeyDown={event => {
        if (event.key !== 'Tab') return;
        const controls = dialog.current.querySelectorAll('button, a[href]');
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
      }}>
      <div className="home-news-modal__layout">
        <img className="home-news-modal__hero" src={item.image} alt={item.title.join(' ')} />
        <div className="home-news-modal__info">
          <button className="home-news-modal__close" type="button" aria-label="소식 상세 닫기" onClick={onClose}>
            <img src={homeNewsAsset('close.svg')} alt="" />
          </button>
          <h2 className="home-news-modal__title" id={titleId}>{item.title.map(line => <span key={line}>{line}</span>)}</h2>
          <p className="home-news-modal__description" id={descriptionId}>{item.description.map(line => <span key={line}>{line}</span>)}</p>
          <Link className="home-news-modal__cta" to={item.link} onClick={onClose}>
            <span>{item.buttonText}</span>
            <img src={homeNewsAsset('arrow.svg')} alt="" />
          </Link>
          <img className="home-news-modal__wordmark" src={homeNewsAsset('nintendo.png')} alt="Nintendo" width="200" height="49" />
        </div>
      </div>
    </dialog>, document.body,
  );
}

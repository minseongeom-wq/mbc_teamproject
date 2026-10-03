import { useEffect, useMemo, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { StoreCartContext } from './StoreCartContext.js';
import { initialStoreCartItems, storeCartStorageKey } from './storeCartData.js';
import StoreCartButton from './StoreCartButton.jsx';
import CartDrawer from './CartDrawer.jsx';
import useCartAddAnimation from './useCartAddAnimation.js';

function readCart() {
  try {
    const saved = localStorage.getItem(storeCartStorageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Storage may be unavailable; the cart still works for this visit.
  }
  return initialStoreCartItems;
}

export default function StoreCartLayout() {
  const [items, setItems] = useState(readCart);
  const [isOpen, setIsOpen] = useState(false);
  const [notice, setNotice] = useState(null);
  const cartButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const drawerRef = useRef(null);
  const animateAdd = useCartAddAnimation(cartButtonRef);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(null), 2500);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  useEffect(() => {
    try { localStorage.setItem(storeCartStorageKey, JSON.stringify(items)); } catch { /* Storage is optional. */ }
  }, [items]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const previousScrollbarGutter = document.documentElement.style.scrollbarGutter;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousLeft = document.body.style.left;
    const previousWidth = document.body.style.width;
    const previousBoxSizing = document.body.style.boxSizing;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const scrollbarGutterWidth = window.innerWidth - document.documentElement.getBoundingClientRect().width;
    if (scrollbarGutterWidth > 0) {
      document.documentElement.style.scrollbarGutter = 'stable';
    }
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.width = '100%';
    document.body.style.boxSizing = 'border-box';
    closeButtonRef.current?.focus({ preventScroll: true });
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        cartButtonRef.current?.focus({ preventScroll: true });
      } else if (event.key === 'Tab') {
        const controls = [...drawerRef.current.querySelectorAll('button:not(:disabled), a[href]')];
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.left = previousLeft;
      document.body.style.width = previousWidth;
      document.body.style.boxSizing = previousBoxSizing;
      document.documentElement.style.scrollbarGutter = previousScrollbarGutter;
      window.scrollTo(scrollX, scrollY);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const cart = useMemo(() => ({
    items,
    count,
    subtotal,
    addItem(product, source) {
      animateAdd(source);
      setNotice({ message: `${product.name} 상품을 장바구니에 추가했습니다.` });
      const id = product.id || product.image || product.name;
      const price = typeof product.price === 'number' ? product.price : Number(String(product.price).replace(/[^\d]/g, ''));
      setItems((current) => {
        const existing = current.find((item) => item.id === id);
        return existing
          ? current.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
          : [...current, { id, name: product.name, price, image: product.image, quantity: 1 }];
      });
    },
    increase(id) { setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)); },
    decrease(id) { setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item)); },
    remove(id) { setItems((current) => current.filter((item) => item.id !== id)); },
  }), [items, count, subtotal, animateAdd]);

  function closeCart() {
    setIsOpen(false);
    cartButtonRef.current?.focus({ preventScroll: true });
  }

  return <StoreCartContext.Provider value={cart}>
    <Outlet />
    <div className="store-cart-notice" role="status" aria-live="polite" aria-atomic="true">{notice?.message}</div>
    <StoreCartButton ref={cartButtonRef} count={count} open={isOpen} onClick={() => setIsOpen(true)} />
    <CartDrawer ref={drawerRef} open={isOpen} onClose={closeCart} closeButtonRef={closeButtonRef} />
  </StoreCartContext.Provider>;
}

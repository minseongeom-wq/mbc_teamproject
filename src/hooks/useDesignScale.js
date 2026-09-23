import { useLayoutEffect, useRef } from 'react';

// Keep the Figma desktop composition proportional without transforming the DOM.
// Each section owns its layout and can adopt a separate mobile layout later.
export default function useDesignScale() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const element = ref.current;
    const update = () => element.style.setProperty('--home-scale', element.clientWidth / 1920);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// Preserve pre-existing inline values and priorities; release is idempotent.
export function lockIntroScroll(panel) {
  const html = document.documentElement;
  const body = document.body;
  const app = document.getElementById('root');
  const previouslyFocused = document.activeElement;
  const wasInert = app?.inert;
  const saved = [];
  const set = (element, property, value) => {
    saved.push([element, property, element.style.getPropertyValue(property), element.style.getPropertyPriority(property)]);
    element.style.setProperty(property, value);
  };
  if (window.innerWidth > html.clientWidth) set(html, 'scrollbar-gutter', 'stable');
  set(html, 'overflow', 'hidden');
  set(body, 'overflow', 'hidden');
  if (app) app.inert = true;
  panel.focus({ preventScroll: true });
  const preventScroll = event => event.preventDefault();
  const preventScrollKeys = event => {
    if ([' ', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(event.key)) event.preventDefault();
  };
  document.addEventListener('wheel', preventScroll, { passive: false });
  document.addEventListener('touchmove', preventScroll, { passive: false });
  document.addEventListener('keydown', preventScrollKeys);
  let released = false;
  return () => {
    if (released) return;
    released = true;
    document.removeEventListener('wheel', preventScroll);
    document.removeEventListener('touchmove', preventScroll);
    document.removeEventListener('keydown', preventScrollKeys);
    saved.reverse().forEach(([element, property, value, priority]) => {
      if (value) element.style.setProperty(property, value, priority);
      else element.style.removeProperty(property);
    });
    if (app) app.inert = wasInert;
    if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true });
  };
}

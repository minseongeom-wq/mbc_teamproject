import { useEffect, useRef } from 'react';
import { getAwardsGridMetrics } from './historyAwardsGrid';

const LIFETIME = 650;
const MAX_PIXELS = 24;
const SHADES = [21, 65, 115, 170, 218];

function AwardsPixelTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    const grid = section?.querySelector('.history-awards__grid');
    const context = canvas?.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!section || !grid || !context || reducedMotion.matches) return undefined;

    let pixels = [];
    let frame = 0;
    let lastCell = '';

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(section.clientWidth * ratio);
      canvas.height = Math.round(section.clientHeight * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (now) => {
      frame = 0;
      context.clearRect(0, 0, section.clientWidth, section.clientHeight);
      pixels = pixels.filter((pixel) => now - pixel.created < LIFETIME);

      for (const pixel of pixels) {
        const progress = Math.min((now - pixel.created) / LIFETIME, 1);
        const shade = SHADES[Math.min(Math.floor(progress * SHADES.length), SHADES.length - 1)];
        const opacity = progress > 0.8 ? (1 - progress) / 0.2 : 1;
        context.fillStyle = `rgba(${shade}, ${shade}, ${shade}, ${opacity})`;
        context.fillRect(pixel.x, pixel.y, pixel.width, pixel.height);
      }

      if (pixels.length) frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event) => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      const bounds = section.getBoundingClientRect();
      const localX = (event.clientX - bounds.left) * section.clientWidth / bounds.width;
      const localY = (event.clientY - bounds.top) * section.clientHeight / bounds.height;
      const { originX, originY, stepX, stepY, pixelWidth, pixelHeight } = getAwardsGridMetrics(grid);
      const column = Math.floor((localX - originX) / stepX);
      const row = Math.floor((localY - originY) / stepY);
      const x = originX + column * stepX;
      const y = originY + row * stepY;
      const cell = `${column}:${row}`;
      if (cell === lastCell || localX < 0 || localY < 0 || localX >= section.clientWidth || localY >= section.clientHeight) return;

      lastCell = cell;
      pixels = pixels.filter((pixel) => pixel.cell !== cell);
      pixels.push({ cell, x, y, width: pixelWidth, height: pixelHeight, created: performance.now() });
      if (pixels.length > MAX_PIXELS) pixels.shift();
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onPointerLeave = () => { lastCell = ''; };
    const observer = new ResizeObserver(resize);
    observer.observe(section);
    resize();
    section.addEventListener('pointermove', onPointerMove);
    section.addEventListener('pointerleave', onPointerLeave);

    return () => {
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerleave', onPointerLeave);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas className="history-awards__pixel-trail" ref={canvasRef} aria-hidden="true" />;
}

export default AwardsPixelTrail;

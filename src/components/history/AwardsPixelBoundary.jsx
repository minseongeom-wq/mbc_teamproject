import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAwardsGridMetrics } from './historyAwardsGrid';

gsap.registerPlugin(ScrollTrigger);

const ROWS = 4;

function cellNoise(column, row) {
  let hash = Math.imul(column + 1, 73856093) ^ Math.imul(row + 1, 19349663);
  hash = Math.imul(hash ^ (hash >>> 16), 0x45d9f3b);
  return ((hash ^ (hash >>> 16)) >>> 0) / 0x100000000;
}

function AwardsPixelBoundary() {
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const surface = canvas?.parentElement;
    const section = surface?.parentElement;
    const grid = surface?.querySelector('.history-awards__grid');
    const context = canvas?.getContext('2d');
    if (!section || !surface || !grid || !context) return undefined;

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      let metrics;
      let width = 0;

      const draw = () => {
        if (!metrics) return;
        const top = section.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        const entering = top > 0 && top < viewportHeight;

        // Awards holds its composition during entry, then continues in
        // document flow once its section reaches the top of the viewport.
        surface.style.transform = entering ? `translateY(${-top}px)` : '';
        canvas.style.display = entering ? 'block' : 'none';
        if (!entering) {
          surface.style.clipPath = '';
          return;
        }

        const { originX, originY, stepX, stepY } = metrics;
        const progress = 1 - top / viewportHeight;
        const edge = viewportHeight - progress * (viewportHeight + stepY * 3);
        const firstRow = Math.floor((edge - originY) / stepY) - 1;
        const bandTop = originY + firstRow * stepY;
        const alignedBandTop = Math.ceil(bandTop);

        // Clip the entire Awards surface so the outgoing 08 content stays
        // visible above the edge and scrolls upward after its pin releases.
        canvas.style.top = `${alignedBandTop}px`;
        surface.style.clipPath = `inset(${Math.max(0, alignedBandTop)}px 0 0 0)`;
        context.clearRect(0, 0, width, stepY * ROWS);

        const firstColumn = Math.floor(-originX / stepX);
        const lastColumn = Math.ceil((width - originX) / stepX);
        for (let row = 0; row < ROWS; row += 1) {
          const globalRow = firstRow + row;
          const y = originY + globalRow * stepY;
          for (let column = firstColumn; column < lastColumn; column += 1) {
            const noise = cellNoise(column, globalRow);
            const reveal = (y + stepY / 2 - edge) / stepY + (noise - 0.5) * 1.5;
            if (reveal >= 0.7) continue;
            context.fillStyle = reveal < -0.4 ? '#151515' : reveal < 0.15 ? '#414141' : '#737373';
            context.fillRect(originX + column * stepX, row * stepY, stepX + 0.5, stepY + 0.5);
          }
        }
      };

      const resize = () => {
        metrics = getAwardsGridMetrics(grid);
        width = surface.clientWidth;
        const height = metrics.stepY * ROWS;
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.style.height = `${height}px`;
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        draw();
      };

      const observer = new ResizeObserver(resize);
      observer.observe(surface);
      observer.observe(grid);
      grid.addEventListener('load', resize);
      resize();
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'top top',
        onUpdate: draw,
        onRefresh: draw,
      });

      return () => {
        observer.disconnect();
        grid.removeEventListener('load', resize);
        trigger.kill();
        surface.style.transform = '';
        surface.style.clipPath = '';
        canvas.style.display = 'none';
      };
    });
    return () => media.revert();
  }, []);

  return <canvas className="history-awards__pixel-boundary" ref={canvasRef} aria-hidden="true" />;
}

export default AwardsPixelBoundary;

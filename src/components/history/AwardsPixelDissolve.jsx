import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAwardsGridMetrics } from './historyAwardsGrid';

gsap.registerPlugin(ScrollTrigger);

function AwardsPixelDissolve() {
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const surface = canvas?.parentElement;
    const section = surface?.parentElement;
    const content = surface?.querySelector('.history-awards__content');
    const grid = surface?.querySelector('.history-awards__grid');
    const context = canvas?.getContext('2d');
    if (!section || !surface || !content || !grid || !context) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let cells = [];
    let progress = 0;
    // Reserve most of the natural section entry for the bottom-to-top reveal.
    const coverFraction = 0.1;

    const draw = () => {
      const width = surface.clientWidth;
      const height = surface.clientHeight;
      context.clearRect(0, 0, width, height);
      if (progress < coverFraction) {
        const coverage = progress / coverFraction;
        for (const cell of cells) {
          const lead = coverage - cell.coverThreshold;
          if (lead < 0) continue;
          const shade = lead < 0.08 ? 51 : 21;
          context.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
          context.fillRect(cell.x, cell.y, cell.width, cell.height);
        }
        return;
      }
      if (progress >= 1) return;

      const reveal = (progress - coverFraction) / (1 - coverFraction);
      context.fillStyle = '#151515';
      context.fillRect(0, 0, width, height);

      for (const cell of cells) {
        const lead = reveal - cell.threshold;
        if (lead >= 0) {
          // A whole grid cell reveals the actual Awards section beneath it.
          // Clear the 1px gutter too, so the ivory grid line below is revealed.
          context.clearRect(cell.x, cell.y, cell.stepX, cell.stepY);
        } else if (lead > -0.055) {
          const shade = Math.round(21 + ((lead + 0.055) / 0.055) * 104);
          context.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
          context.fillRect(cell.x, cell.y, cell.width, cell.height);
        }
      }
    };

    const resize = () => {
      const width = surface.clientWidth;
      const height = surface.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const { originX, originY, stepX, stepY, pixelWidth, pixelHeight } = getAwardsGridMetrics(grid);
      cells = [];
      for (let row = 0; originY + row * stepY < height; row++) {
        for (let column = 0; originX + column * stepX < width; column++) {
          const x = originX + column * stepX;
          const y = originY + row * stepY;
          const scatter = ((column * 73856093 ^ row * 19349663) >>> 0) % 1000 / 1000;
          const fromBottom = 1 - Math.min(1, (y + pixelHeight / 2) / height);
          const jitter = (scatter - 0.5) * 0.07;
          cells.push({ x, y, width: pixelWidth, height: pixelHeight, stepX, stepY,
            coverThreshold: gsap.utils.clamp(0, 1, fromBottom + jitter),
            threshold: gsap.utils.clamp(0, 1, fromBottom + jitter) });
        }
      }
      draw();
    };

    const sync = (value) => {
      progress = value;
      const top = section.getBoundingClientRect().top;
      // Keep the real 09 surface in the viewport during its natural entry.
      gsap.set(surface, { y: top > 0 && top <= window.innerHeight ? -top : 0 });
      gsap.set(content, { autoAlpha: progress >= coverFraction ? 1 : 0 });
      draw();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(surface);
    observer.observe(grid);
    resize();
    const scope = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'top top',
        invalidateOnRefresh: true,
        onUpdate: (self) => sync(self.progress),
        onRefresh: (self) => sync(self.progress),
      });
    }, section);

    return () => {
      observer.disconnect();
      scope.revert();
    };
  }, []);

  return <canvas className="history-awards__dissolve-mask" ref={canvasRef} aria-hidden="true" />;
}

export default AwardsPixelDissolve;

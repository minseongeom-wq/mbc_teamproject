import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const results = { measuredAt: new Date().toISOString(), browser: browser.version() };

function installProbe() {
  const p = window.__probe = { renderers: [], renders: [], commits: 0, raf: [], longTasks: [], lenis: new Set(), lenisCreated: 0, canvasClears: {}, phase: 'initial' };
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { supportsFiber: true, renderers: new Map(), inject(renderer) { this.renderers.set(1, renderer); return 1; }, onCommitFiberRoot: () => p.commits++, onCommitFiberUnmount() {}, onScheduleFiberRoot() {} };
  const nativeRAF = requestAnimationFrame.bind(window);
  const nativeCancel = cancelAnimationFrame.bind(window);
  const callbacks = new WeakMap();
  const pending = new Map();
  window.requestAnimationFrame = fn => {
    let item = callbacks.get(fn);
    if (!item) { item = { name: fn.name, source: new Error().stack.split('\n').slice(2, 5).join('\n'), calls: 0, ms: 0, pending: 0 }; callbacks.set(fn, item); p.raf.push(item); }
    item.pending++;
    const id = nativeRAF(t => { pending.delete(id); item.pending--; const start = performance.now(); try { fn(t); } finally { item.calls++; item.ms += performance.now() - start; } });
    pending.set(id, item); return id;
  };
  window.cancelAnimationFrame = id => { const item = pending.get(id); if (item) { item.pending--; pending.delete(id); } return nativeCancel(id); };
  new PerformanceObserver(list => p.longTasks.push(...list.getEntries().map(e => ({ phase: p.phase, start: e.startTime, duration: e.duration })))).observe({ type: 'longtask', buffered: true });
  const originalClear = CanvasRenderingContext2D.prototype.clearRect;
  CanvasRenderingContext2D.prototype.clearRect = function (...args) { const key = this.canvas.className; p.canvasClears[key] = (p.canvasClears[key] || 0) + 1; return originalClear.apply(this, args); };
  window.__THREE_DEVTOOLS__ = new EventTarget();
  window.__THREE_DEVTOOLS__.addEventListener('observe', event => {
    const renderer = event.detail;
    if (!renderer.isWebGLRenderer) return;
    const item = { renderer, disposed: false, scene: null, drawGroups: {} };
    p.renderers.push(item);
    const originalRender = renderer.render;
    const originalDispose = renderer.dispose;
    const originalDirect = renderer.renderBufferDirect;
    renderer.dispose = function (...args) { item.disposed = true; return originalDispose.apply(this, args); };
    renderer.renderBufferDirect = function (camera, scene, geometry, material, object, group) {
      let root = object; while (root.parent && root.parent !== scene) root = root.parent;
      const id = root.uuid; item.drawGroups[id] = (item.drawGroups[id] || 0) + 1;
      return originalDirect.call(this, camera, scene, geometry, material, object, group);
    };
    renderer.render = function (scene, camera) {
      item.scene = scene; item.drawGroups = {};
      const start = performance.now();
      const value = originalRender.call(this, scene, camera);
      const bounds = renderer.domElement.getBoundingClientRect();
      p.renders.push({ phase: p.phase, at: start, ms: performance.now() - start, calls: renderer.info.render.calls, triangles: renderer.info.render.triangles, offscreen: bounds.bottom <= 0 || bounds.top >= innerHeight, groups: { ...item.drawGroups } });
      return value;
    };
  });
}

async function makePage(port, dev = false) {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('pageerror', error => console.log('PAGE ERROR', error.message));
  await page.addInitScript(installProbe);
  if (dev) await page.route('**/src/components/common/SmoothScroll.jsx*', async route => {
    const response = await route.fetch();
    const body = (await response.text()).replace(/lenis\.on\(/, 'window.__probe.lenis.add(lenis); window.__probe.lenisCreated++; lenis.on(').replace(/lenis\.destroy\(\)/, 'window.__probe.lenis.delete(lenis); lenis.destroy()');
    await route.fulfill({ response, body });
  });
  await page.goto(`http://127.0.0.1:${port}/about/history`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  return page;
}

if (!process.env.LIFECYCLE_ONLY) {
const page = await makePage(4174);
results.environment = await page.evaluate(() => {
  const r = __probe.renderers.find(x => !x.disposed).renderer;
  const gl = r.getContext(), ext = gl.getExtension('WEBGL_debug_renderer_info');
  return { viewport: [innerWidth, innerHeight], dpr: devicePixelRatio, webgl: ext && gl.getParameter(ext.UNMASKED_RENDERER_WEBGL), canvasPixels: [r.domElement.width, r.domElement.height], antialias: gl.getContextAttributes().antialias, hardwareConcurrency: navigator.hardwareConcurrency };
});
results.initial = await page.evaluate(() => ({ renderersCreated: __probe.renderers.length, renders: __probe.renders, longTasks: __probe.longTasks, resources: performance.getEntriesByType('resource').filter(x => /\.glb/.test(x.name)).map(x => ({ url: x.name, transfer: x.transferSize, duration: x.duration })), commits: __probe.commits }));
results.scene = await page.evaluate(() => {
  const item = __probe.renderers.find(x => !x.disposed);
  return { memory: item.renderer.info.memory, objects: item.scene.children.map(root => {
    let triangles = 0, meshes = 0; const textures = new Map();
    root.traverse(object => {
      if (object.isMesh) { meshes++; triangles += (object.geometry.index?.count ?? object.geometry.attributes.position.count) / 3; }
      for (const mat of [].concat(object.material || [])) for (const value of Object.values(mat)) if (value?.isTexture) textures.set(value.uuid, { width: value.image?.width, height: value.image?.height, source: value.source.uuid, mipmaps: value.generateMipmaps, format: value.format });
    });
    return { uuid: root.uuid, name: root.name, type: root.type, triangles, meshes, scale: root.scale.toArray(), visible: root.visible, model: root.userData.baseScale != null, textures: [...textures.values()] };
  }) };
});

async function sample(name, startY, delta = 0, cursor = false, duration = 1800) {
  await page.evaluate(y => scrollTo(0, y), startY);
  await page.waitForTimeout(1200);
  return await page.evaluate(async ({ name, startY, delta, cursor, duration }) => {
    const p = __probe; p.phase = name; const r0 = p.renders.length, c0 = p.commits, nodes = document.getElementsByTagName('*').length;
    const clears = { ...p.canvasClears }; const raf = p.raf.map(x => x.calls);
    const times = []; let last, start;
    await new Promise(resolve => {
      function measure(t) {
        if (start == null) start = t;
        if (last != null) times.push(t - last); last = t;
        const f = Math.min(1, (t - start) / duration);
        if (delta) scrollTo(0, startY + delta * f);
        if (cursor) {
          const el = document.querySelector('.history-awards__content');
          el.dispatchEvent(new PointerEvent('pointermove', { clientX: 100 + f * 1600, clientY: 500 + Math.sin(f * 20) * 100, pointerType: 'mouse', bubbles: true }));
        }
        if (f < 1) requestAnimationFrame(measure); else resolve();
      }
      requestAnimationFrame(measure);
    });
    const frames = p.renders.slice(r0), sorted = [...times].sort((a,b) => a-b);
    return { name, ms: times.reduce((a,b)=>a+b,0), frames: times.length, rafFps: times.length / (times.reduce((a,b)=>a+b,0) / 1000), frameP95: sorted[Math.floor(sorted.length*.95)], over25ms: times.filter(x=>x>25).length, reactCommits: p.commits-c0, nodeDelta: document.getElementsByTagName('*').length-nodes, renders: frames.length, renderMs: frames.map(x=>x.ms), drawCalls: frames.length ? [Math.min(...frames.map(x=>x.calls)),Math.max(...frames.map(x=>x.calls))] : [], triangles: frames.length ? [Math.min(...frames.map(x=>x.triangles)),Math.max(...frames.map(x=>x.triangles))] : [], lastRender: frames.at(-1), canvasClears: Object.fromEntries(Object.entries(p.canvasClears).map(([k,v])=>[k,v-(clears[k]||0)])), raf: p.raf.map((x,i)=>({name:x.name,calls:x.calls-(raf[i]||0),pending:x.pending,source:x.source})).filter(x=>x.calls) };
  }, { name, startY, delta, cursor, duration });
}
const positions = await page.evaluate(() => {
  const el = document.querySelector('.history-overview');
  const spacer = el.parentElement;
  return { overview: spacer.getBoundingClientRect().top + scrollY, awards: document.querySelector('.history-awards').getBoundingClientRect().top + scrollY, vh: innerHeight };
});
results.positions = positions;
results.samples = [];
for (const args of [
  ['offscreen-idle-before', 0],
  ['story-scroll', 2500, 700],
  ['orbit-early', positions.overview+500, 1100],
  ['orbit-middle', positions.overview+positions.vh*5, 1100],
  ['orbit-final', positions.awards-positions.vh*2.5, 1100],
  ['transition', positions.awards-positions.vh+20, positions.vh-40],
  ['offscreen-idle-after', positions.awards+100],
  ['cursor', positions.awards+100, 0, true],
  ['cursor-settled', positions.awards+100],
]) { const value = await sample(...args); results.samples.push(value); console.log(JSON.stringify({ sample: value.name, fps: value.rafFps, renders: value.renders, calls: value.drawCalls, triangles: value.triangles, reactCommits: value.reactCommits, canvasClears: value.canvasClears })); }
results.longTasks = await page.evaluate(() => __probe.longTasks);
await writeFile('reports/performance/runtime.json', JSON.stringify(results, null, 2));
await page.close();
}

const dev = await makePage(4173, true);
await dev.evaluate(async () => {
  const resources = performance.getEntriesByType('resource').map(x => x.name);
  window.__gsap = (await import(resources.find(x => /\/gsap\.js\?/.test(x)))).default;
  window.__st = (await import(resources.find(x => /\/gsap_ScrollTrigger\.js\?/.test(x)))).ScrollTrigger;
});
const inspect = () => dev.evaluate(() => ({ lenisActive: __probe.lenis.size, lenisCreated: __probe.lenisCreated, lenisOptions: [...__probe.lenis].map(x=>({autoRaf:x.options.autoRaf})), tickerListeners: __gsap.ticker._listeners.map(x=>({name:x.name,body:x.toString().slice(0,150)})), triggers: __st.getAll().map(x=>({class:x.trigger?.className,start:x.start,end:x.end,pin:!!x.pin})), activeRenderers: __probe.renderers.filter(x=>!x.disposed).length, renderersCreated: __probe.renderers.length, pendingRAF: __probe.raf.filter(x=>x.pending).map(x=>({name:x.name,pending:x.pending,source:x.source})) }));
const lifecycle = [{ phase: 'initial-history', ...(await inspect()) }];
console.log('Initial lifecycle', JSON.stringify(lifecycle));
for (let i=0;i<2;i++) {
  await dev.locator('.navigation__logo').click(); await dev.waitForTimeout(300);
  lifecycle.push({phase:`home-${i}`, ...(await inspect())});
  await dev.goBack();
  await dev.waitForTimeout(1800);
  lifecycle.push({phase:`history-${i}`, ...(await inspect())});
}
await writeFile('reports/performance/lifecycle.json', JSON.stringify(lifecycle, null, 2));
console.log(JSON.stringify(lifecycle.map(x=>({phase:x.phase,lenis:x.lenisActive,created:x.lenisCreated,triggers:x.triggers.length,tickers:x.tickerListeners.length,renderers:x.activeRenderers}))));
await browser.close();

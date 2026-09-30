import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
const cdp = await page.context().newCDPSession(page);
const events = [];
cdp.on('Tracing.dataCollected', event => events.push(...event.value));
await cdp.send('Performance.enable');
await cdp.send('Tracing.start', { categories: 'devtools.timeline,blink.user_timing,disabled-by-default-devtools.timeline', transferMode: 'ReportEvents' });
await page.goto('http://127.0.0.1:4174/about/history', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
const positions = await page.evaluate(() => ({
  overview: document.querySelector('.history-overview').parentElement.getBoundingClientRect().top + scrollY,
  awards: document.querySelector('.history-awards').getBoundingClientRect().top + scrollY,
}));
const metrics = async () => Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(x => [x.name, x.value]));
const results = [];
for (const [name, startY, delta, cursor, throttle] of [
  ['orbit-dpr2', positions.overview + 3500, 1800, false, 1],
  ['transition-dpr2', positions.awards - 1040, 1020, false, 1],
  ['cursor-dpr2', positions.awards + 100, 0, true, 1],
  ['orbit-dpr2-cpu4x', positions.overview + 3500, 1800, false, 4],
]) {
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: throttle });
  await page.evaluate(y => scrollTo(0, y), startY); await page.waitForTimeout(1200);
  const before = await metrics();
  const value = await page.evaluate(async ({ name, startY, delta, cursor }) => {
    performance.mark(name + '-start');
    const frames = []; let start, previous;
    await new Promise(resolve => {
      function tick(time) {
        if (start == null) start = time;
        if (previous != null) frames.push(time - previous); previous = time;
        const p = Math.min(1, (time - start) / 2400);
        if (delta) scrollTo(0, startY + delta * p);
        if (cursor) document.querySelector('.history-awards__content').dispatchEvent(new PointerEvent('pointermove', { clientX: 100 + p * 1600, clientY: 500, pointerType: 'mouse', bubbles: true }));
        if (p < 1) requestAnimationFrame(tick); else resolve();
      }
      requestAnimationFrame(tick);
    });
    performance.mark(name + '-end');
    const sorted = [...frames].sort((a,b)=>a-b);
    return { frames: frames.length, fps: frames.length / (frames.reduce((a,b)=>a+b,0)/1000), p95: sorted[Math.floor(sorted.length*.95)], over25ms: frames.filter(x=>x>25).length };
  }, { name, startY, delta, cursor });
  const after = await metrics();
  const entry = { name, ...value, metricsDelta: Object.fromEntries(['TaskDuration','ScriptDuration','LayoutDuration','RecalcStyleDuration','LayoutCount','RecalcStyleCount'].map(k=>[k,after[k]-before[k]])) };
  results.push(entry); console.log(JSON.stringify(entry));
}
const completed = new Promise(resolve => cdp.once('Tracing.tracingComplete', resolve));
await cdp.send('Tracing.end'); await completed;
await writeFile('reports/performance/browser-trace.json', JSON.stringify({ traceEvents: events }));
for (const result of results) {
  const start = events.find(x=>x.name===result.name+'-start');
  const end = events.find(x=>x.name===result.name+'-end');
  const region = events.filter(x=>x.ph==='X' && x.ts>=start.ts && x.ts<end.ts && x.pid===start.pid && x.tid===start.tid);
  result.mainThreadEvents = {};
  for (const e of region) { const v = result.mainThreadEvents[e.name] ||= { count: 0, ms: 0, maxMs: 0 }; v.count++; v.ms += (e.dur||0)/1000; v.maxMs = Math.max(v.maxMs,(e.dur||0)/1000); }
}
await writeFile('reports/performance/trace-summary.json', JSON.stringify(results,null,2));
await browser.close();

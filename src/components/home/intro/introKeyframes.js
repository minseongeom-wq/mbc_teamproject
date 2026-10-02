import keyframes from './figma-keyframes.json';

export const INTRO_FRAME = { width: 1920, height: 1080 };
export const LOGO_ORIGIN = { x: 75 + 1770.0235595703125 / 2, y: 471 + 138.82382202148438 };

// Exact vector pairs, not the rotated parent-frame bounding boxes.
const pairs = [
  ['N', '3432:7008', '1233:4900', 1.48, 42],
  ['i', '3432:7007', '1233:4917', 1.30, -24],
  ['n-first', '3432:7002', '1233:4905', 1.40, 32],
  ['t', '3432:7006', '1233:4920', 1.28, -30],
  ['e', '3432:7003', '1233:4908', 1.45, -42],
  ['n-second', '3432:7004', '1233:4911', 1.36, 26],
  ['d', '3432:7005', '1233:4903', 1.44, -34],
  ['o', '3432:7000', '1233:4914', 1.38, 30],
  ['registered', '3432:7009', '1233:4924', 1.32, -18],
];

function center(node) {
  const [[a, c, x], [b, d, y]] = node.m;
  return { x: x + a * node.w / 2 + c * node.h / 2, y: y + b * node.w / 2 + d * node.h / 2 };
}

export const INTRO_LETTERS = pairs.map(([id, sourceId, targetId, duration, curve], index) => {
  const source = keyframes.start.letters.find(node => node.id === sourceId);
  const target = keyframes.scatter.letters.find(node => node.id === targetId);
  const start = center(source);
  const end = center(target);
  const parts = [{ asset: id === 'registered' ? 'registered-ring' : id, x: -source.w / 2, y: -source.h / 2 }];
  if (id === 'registered') {
    const r = keyframes.start.letters.find(node => node.id === '3432:7001');
    parts.push({ asset: 'registered-r', x: r.m[0][2] - start.x, y: r.m[1][2] - start.y });
  }
  return {
    id, sourceId, targetId, start, parts, duration, curve, delay: index * 0.018,
    target: {
      x: end.x,
      y: end.y,
      rotation: Math.atan2(target.m[1][0], target.m[0][0]) * 180 / Math.PI,
      scaleX: target.w / source.w,
      scaleY: target.h / source.h,
    },
  };
});

import { getLevel } from '../src/data/levels/index';

const level = getLevel(26); // Level 27 "Pipe Labyrinth"
const plats = level.platforms.map(p => ({
  x: p.x, y: p.y, w: p.w, h: p.h, type: p.type,
  left: p.x - p.w/2,
  right: p.x + p.w/2,
  top: p.y - p.h/2,
}));

plats.sort((a, b) => a.x - b.x);

for (let i = 0; i < plats.length; i++) {
  console.log(`  #${i}: x=${plats[i].x.toFixed(1)} y=${plats[i].y.toFixed(0)} w=${plats[i].w} h=${plats[i].h} type=${plats[i].type} left=${plats[i].left.toFixed(1)} right=${plats[i].right.toFixed(1)}`);
  if (i > 0) {
    const gap = Math.max(plats[i].left - plats[i-1].right, 0);
    if (gap > 0) {
      const vDiff = plats[i].top - plats[i-1].top;
      console.log(`  >>> GAP from #${i-1} to #${i}: ${gap.toFixed(1)}px vDiff=${vDiff.toFixed(1)}`);
    }
  }
}

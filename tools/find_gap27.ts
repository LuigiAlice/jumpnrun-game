import { getLevel } from '../src/data/levels/index';

const lv = getLevel(26);
const plats = lv.platforms.map(p => ({ x: p.x, left: p.x - p.w/2, right: p.x + p.w/2 }))
  .sort((a, b) => a.x - b.x);
let maxGap = 0, maxIdx = -1;
for (let i = 1; i < plats.length; i++) {
  const gap = Math.max(plats[i].left - plats[i-1].right, 0);
  if (gap > maxGap) { maxGap = gap; maxIdx = i; }
}
console.log(`MAX GAP: ${maxGap}px between platform ${maxIdx-1} and ${maxIdx}`);
console.log(`Prev: x=${plats[maxIdx-1].x}, right=${plats[maxIdx-1].right}`);
console.log(`Next: x=${plats[maxIdx].x}, left=${plats[maxIdx].left}`);

// Show ALL gaps > 300
console.log("\nAll gaps > 300px:");
for (let i = 1; i < plats.length; i++) {
  const gap = Math.max(plats[i].left - plats[i-1].right, 0);
  if (gap > 300) {
    console.log(`  Gap ${gap}px: idx ${i-1} (x=${plats[i-1].x.toFixed(0)}, right=${plats[i-1].right.toFixed(0)}) -> idx ${i} (x=${plats[i].x.toFixed(0)}, left=${plats[i].left.toFixed(0)})`);
  }
}

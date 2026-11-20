import { expect, it } from 'vitest';
import { ALL_LEVELS, type Platform } from '../src/data/levels';
import { LEVEL_IDENTITIES } from '../src/data/levels/variety';
import { getBiomeGravity } from '../src/config';

const top = (p: Platform) => p.y - p.h / 2;
const left = (p: Platform) => p.x - p.w / 2;
const right = (p: Platform) => p.x + p.w / 2;
const oneWay = (p: Platform) => p.type.startsWith('platform_');

/** Sample full-height, walk-speed jumps with a 24px-wide body. Unlike the
 * reachability solver, reject ceiling/side hits and land on the first surface.
 * This is an offline clearance regression, not a substitute for browser playtests. */
function canTraverse(platforms: Platform[], gravity: number, start: number, goal: number, bodyHeight: number) {
  const points = (p: Platform) => [...new Set([16, 48, 96, 144, 192].flatMap(inset =>
    inset < p.w / 2 ? [left(p) + inset, right(p) - inset] : []).concat(p.x))];
  function land(from: number, launchX: number, aimX: number): number {
    const startY = top(platforms[from]);
    let x = launchX, feet = startY;
    for (let frame = 1; frame <= 360; frame++) {
      const dt = 1 / 120, t = frame * dt;
      const nx = x + Math.sign(aimX - x) * Math.min(Math.abs(aimX - x), 300 * dt);
      const nf = startY - 900 * t + gravity * t * t / 2;
      const landing: number[] = [];
      for (let i = 0; i < platforms.length; i++) {
        const p = platforms[i], py = top(p);
        if (nx + 12 <= left(p) || nx - 12 >= right(p)) continue;
        if (nf > feet && feet <= py + 0.01 && nf >= py) landing.push(i);
        else if (!oneWay(p) && nf > py + 0.01 && nf - bodyHeight < p.y + p.h / 2 - 0.01) return -1;
      }
      if (landing.length) return landing.sort((a, b) => top(platforms[a]) - top(platforms[b]))[0];
      x = nx; feet = nf;
    }
    return -1;
  }
  const queue = [start], reached = new Set(queue);
  for (const from of queue) {
    if (from === goal) return true;
    const p = platforms[from];
    for (let to = 0; to < platforms.length; to++) {
      if (reached.has(to)) continue;
      const target = platforms[to];
      const rise = top(p) - top(target);
      const gap = Math.max(left(target) - right(p), left(p) - right(target), 0);
      if (rise > 900 ** 2 / (2 * gravity) || rise < -1000 || gap > 800) continue;
      // Walking across touching floors or small downhill steps needs no jump.
      if (gap === 0 && rise <= 0 && rise >= -32) {
        reached.add(to); queue.push(to); continue;
      }
      let landed = false;
      for (const launch of points(p)) {
        // A launch position must have enough headroom for the whole player.
        if (platforms.some((roof, i) => i !== from && !oneWay(roof)
          && launch + 12 > left(roof) && launch - 12 < right(roof)
          && top(p) > top(roof) && top(p) - bodyHeight < roof.y + roof.h / 2)) continue;
        for (const aim of points(target)) if (land(from, launch, aim) === to) { landed = true; break; }
        if (landed) break;
      }
      if (landed) { reached.add(to); queue.push(to); }
    }
  }
  return false;
}

it('provides a sampled collision-clear walk-speed route for both small and big players through every rewrite', () => {
  const failures: string[] = [];
  for (const level of ALL_LEVELS.filter(level => LEVEL_IDENTITIES[level.id])) {
    const platforms = level.platforms.filter(p => p.type !== 'lava' && p.type !== 'hidden');
    const support = (x: number, y: number) => platforms.findIndex(p => x >= left(p) && x <= right(p) && top(p) >= y && top(p) - y < 60);
    const start = support(level.playerStart.x, level.playerStart.y), goal = support(level.goal.x, level.goal.y);
    expect(start, `L${level.id} start`).toBeGreaterThanOrEqual(0);
    expect(goal, `L${level.id} goal`).toBeGreaterThanOrEqual(0);
    for (const height of [32, 48]) if (!canTraverse(platforms, getBiomeGravity(level.biome), start, goal, height)) failures.push(`L${level.id} body height ${height}`);
  }
  expect(failures, 'Ceiling/side collisions may block the nominal ballistic path').toEqual([]);
}, 30000);

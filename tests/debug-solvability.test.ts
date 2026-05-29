import { describe, it } from 'vitest';
import { getLevel } from '../src/data/levels/index';
import { Physics } from '../src/engine/Physics';

describe('debug', () => {
  it('analyze level 25', () => {
    const level = getLevel(24);
    const physics = new Physics(level.platforms as any[], level.width, level.height, level.movingPlatforms as any[] || []);
    console.log('goal on plat', physics.isGoalOnPlatform(level.goal.x, level.goal.y));
    console.log('solvable', physics.isSolvable(level.playerStart.x, level.playerStart.y, level.goal.x, level.goal.y));
    console.log('path', physics.findPath(level.playerStart.x, level.playerStart.y, level.goal.x, level.goal.y)?.length);
    console.log('reachable', physics.getReachablePlatforms(level.playerStart.x, level.playerStart.y).length);
    console.log('platforms', level.platforms.map(p => ({ x: p.x, y: p.y, w: p.w, type: p.type })));
  });

  it('analyze level 16', () => {
    const level = getLevel(15);
    const physics = new Physics(level.platforms as any[], level.width, level.height, level.movingPlatforms as any[] || []);
    const startPlat = physics.findPlatformUnderPoint(level.playerStart.x, level.playerStart.y);
    const goalOnPlat = physics.isGoalOnPlatform(level.goal.x, level.goal.y);
    console.log('start plat', startPlat);
    console.log('goal on plat', goalOnPlat, 'goal', level.goal);
    console.log('solvable', physics.isSolvable(level.playerStart.x, level.playerStart.y, level.goal.x, level.goal.y));

    const sorted = [...level.platforms].sort((a, b) => a.x - b.x);
    for (let i = 0; i < sorted.length - 1; i++) {
      const a = sorted[i];
      const b = sorted[i + 1];
      const aRight = a.x + a.w / 2;
      const bLeft = b.x - b.w / 2;
      const hGap = bLeft - aRight;
      const vDiff = (b.y - b.h / 2) - (a.y - a.h / 2);
      if (hGap > 600 && Math.abs(vDiff) < 200) {
        console.log('large gap', { a: { x: a.x, y: a.y, type: a.type }, b: { x: b.x, y: b.y, type: b.type }, hGap, vDiff });
      }
    }
  });
});

import { getLevel, getLevelCount } from '../src/data/levels/index';
import { Physics } from '../src/engine/Physics';

for (let i = 0; i < getLevelCount(); i++) {
  const level = getLevel(i);
  const physics = new Physics(level.platforms as any[], level.width, level.height, level.movingPlatforms as any[] || []);
  const solvable = physics.isSolvable(level.playerStart.x, level.playerStart.y, level.goal.x, level.goal.y);
  if (!solvable) {
    console.log(`\nLevel ${level.id} (${level.name}): UNSOLVABLE`);
    const unreachable = physics.isFullyTraversableToGoal(level.playerStart.x, level.playerStart.y, level.goal.x);
    if (unreachable.unreachablePlatforms.length > 0) {
      const firstFew = unreachable.unreachablePlatforms.slice(0, 5);
      firstFew.forEach(p => console.log(`  Unreachable: (${p.x.toFixed(1)}, ${p.y.toFixed(1)}, ${p.w}x${p.h}, ${p.type})`));
    }
    const path = physics.findPath(level.playerStart.x, level.playerStart.y, level.goal.x, level.goal.y);
    if (path && path.length > 0) {
      const last = path[path.length - 1];
      console.log(`  Last reachable: (${last.x.toFixed(1)}, ${last.y.toFixed(1)}, ${last.w}x${last.h}, ${last.type})`);
      console.log(`  Goal: (${level.goal.x.toFixed(1)}, ${level.goal.y.toFixed(1)})`);

      // Find closest platform to goal
      let closest: any = null;
      let minDist = Infinity;
      for (const p of level.platforms) {
        if (p.x <= level.goal.x + 1000) {
          const d = Math.abs(p.x - last.x) + Math.abs(p.y - last.y);
          if (d < minDist) { minDist = d; closest = p; }
        }
      }
      if (closest) {
        const gap = Math.max((closest.x - closest.w/2) - (last.x + last.w/2), 0);
        console.log(`  Closest unreachable platform: (${closest.x.toFixed(1)}, ${closest.y.toFixed(1)}, ${closest.w}x${closest.h}, ${closest.type}) gap=${gap.toFixed(1)}`);
      }
    }
  }
}

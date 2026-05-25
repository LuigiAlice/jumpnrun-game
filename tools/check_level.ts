import { getLevel } from '../src/data/levels/index';
import { Physics } from '../src/engine/Physics';

for (const idx of [26, 29, 37]) {
  const level = getLevel(idx);
  console.log(`\n=== Level ${level.id} (${level.name}) ===`);
  const physics = new Physics(level.platforms as any[], level.width, level.height, level.movingPlatforms as any[] || []);
  
  const path = physics.findPath(level.playerStart.x, level.playerStart.y, level.goal.x, level.goal.y);
  if (path) {
    console.log(`Path found: ${path.length} platforms`);
    const last = path[path.length - 1];
    console.log(`Last reachable: (${last.x.toFixed(1)}, ${last.y.toFixed(1)}, ${last.w}x${last.h}, ${last.type})`);
    console.log(`Goal: (${level.goal.x.toFixed(1)}, ${level.goal.y.toFixed(1)})`);
    
    // Find platforms close to goal
    const nearGoal = level.platforms
      .filter(p => p.x > last.x + 100)
      .sort((a, b) => a.x - b.x)
      .slice(0, 3);
    for (const p of nearGoal) {
      const gap = Math.max((p.x - p.w/2) - (last.x + last.w/2), 0);
      const vDiff = (p.y - p.h/2) - (last.y - last.h/2);
      console.log(`  Next: (${p.x.toFixed(1)}, ${p.y.toFixed(1)}, ${p.w}x${p.h}, ${p.type}) gap=${gap.toFixed(1)} vDiff=${vDiff.toFixed(1)}`);
    }
  } else {
    console.log(`No path found!`);
    const sorted = [...level.platforms].sort((a, b) => a.x - b.x);
    console.log(`First 3 platforms:`, sorted.slice(0, 3).map(p => `(${p.x.toFixed(1)}, ${p.y.toFixed(1)}, ${p.type})`).join(', '));
    console.log(`Player start: (${level.playerStart.x}, ${level.playerStart.y})`);
    
    // Check if player start is on a platform
    const startPlat = physics.findPlatformUnderPoint(level.playerStart.x, level.playerStart.y);
    console.log(`Start platform:`, startPlat ? `(${startPlat.x.toFixed(1)}, ${startPlat.y.toFixed(1)}, ${startPlat.type})` : 'NONE');
  }
}

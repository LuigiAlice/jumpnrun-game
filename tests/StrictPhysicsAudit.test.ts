import { it, expect } from 'vitest';
import { ALL_LEVELS } from '../src/data/levels';
import { Physics } from '../src/engine/Physics';
import { getBiomeGravity } from '../src/config';

it('reaches every authored goal and bonus platform with real biome ballistics', () => {
  const missingGoals: number[] = [];
  const missingPlatforms: {id:number; count:number; examples:string[]}[] = [];
  for (const level of ALL_LEVELS) {
    const solver = new Physics(level.platforms, level.width, level.height, level.movingPlatforms || [], getBiomeGravity(level.biome));
    if (!solver.isSolvable(level.playerStart.x, level.playerStart.y, level.goal.x, level.goal.y)) missingGoals.push(level.id);
    const result = solver.isFullyTraversableToGoal(level.playerStart.x, level.playerStart.y, level.goal.x);
    if (!result.traversable) missingPlatforms.push({id:level.id, count:result.unreachablePlatforms.length, examples:result.unreachablePlatforms.slice(0,3).map(p=>`${p.x},${p.y},${p.type}`)});
  }
  expect(missingGoals, 'Physically unreachable goals').toEqual([]);
  expect(missingPlatforms, JSON.stringify(missingPlatforms)).toEqual([]);
});

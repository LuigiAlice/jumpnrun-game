import { describe, expect, it } from 'vitest';
import type { LevelData } from '../src/data/levels';
import { ALL_LEVELS } from '../src/data/levels';
import { NATURE_IDENTITY_IDS, rewriteNatureLevel } from '../src/data/levels/variety/nature';
import { Physics } from '../src/engine/Physics';
import { getBiomeGravity } from '../src/config';

const levels = NATURE_IDENTITY_IDS.map(id => rewriteNatureLevel(ALL_LEVELS[id - 1]));
const top = (p: LevelData['platforms'][number]) => p.y - p.h / 2;

describe('Nature level identities', () => {
  it('replaces six routes deterministically without moving the other levels or mutating inputs', () => {
    const input = structuredClone(ALL_LEVELS[7]);
    const snapshot = structuredClone(input);
    expect(rewriteNatureLevel(input)).toEqual(rewriteNatureLevel(snapshot));
    expect(input).toEqual(snapshot);
    expect(rewriteNatureLevel(rewriteNatureLevel(input))).toEqual(rewriteNatureLevel(input));
    expect(rewriteNatureLevel(ALL_LEVELS[0])).toBe(ALL_LEVELS[0]);
    expect(levels.every(level => level.width < 5000)).toBe(true);
    expect(new Set(levels.map(level => level.name)).size).toBe(6);
  });

  it('keeps every main route and reward reachable with walk ballistics and without special elements', () => {
    for (const level of levels) {
      const solver = new Physics(level.platforms, level.width, level.height, [], getBiomeGravity(level.biome));
      expect(solver.isSolvable(level.playerStart.x, level.playerStart.y, level.goal.x, level.goal.y), `L${level.id} goal`).toBe(true);
      const result = solver.isFullyTraversableToGoal(level.playerStart.x, level.playerStart.y, level.goal.x);
      expect(result.unreachablePlatforms, `L${level.id} unreachable: ${JSON.stringify(result.unreachablePlatforms)}`).toEqual([]);
      expect(solver.isGoalOnPlatform(level.goal.x, level.goal.y), `L${level.id} goal support`).toBe(true);
      expect(level.platforms.every(p => p.x + p.w / 2 <= level.width), `L${level.id} bounds`).toBe(true);
      expect(level.enemies.every(enemy => enemy.x - level.playerStart.x >= 500), `L${level.id} spawn buffer`).toBe(true);
      expect(level.enemies.some(enemy => enemy.type === 'robot')).toBe(false);
    }
  });

  it('makes the desert descend deeply, the snow run on ice, and the forest sustain two routes', () => {
    const desert = levels.find(level => level.id === 8)!;
    expect(Math.max(...desert.platforms.map(top)) - top(desert.platforms[0])).toBeGreaterThan(700);
    const ice = levels.find(level => level.id === 20)!;
    expect(ice.platforms.filter(p => p.type === 'ice' && p.w >= 490)).toHaveLength(3);
    expect(ice.platforms.filter(p => p.type === 'snow' && p.w >= 250).length).toBeGreaterThanOrEqual(4);
    const forest = levels.find(level => level.id === 32)!;
    for (const x of [1100, 1700, 2150, 2550, 3050]) {
      const bands = forest.platforms.filter(p => Math.abs(p.x - x) < p.w / 2).map(top);
      expect(Math.max(...bands) - Math.min(...bands), `fork at ${x}`).toBeGreaterThan(240);
    }
  });

  it('gives water three basins, village two real courtyards, and beach alternative piers', () => {
    const water = levels.find(level => level.id === 14)!;
    expect(water.waterZones).toHaveLength(3);
    expect(water.platforms.filter(p => top(p) >= 790 && p.w >= 450)).toHaveLength(3);
    const village = levels.find(level => level.id === 38)!;
    expect(village.platforms.filter(p => top(p) >= 760 && p.x > 1000)).toHaveLength(2);
    expect(village.platforms.filter(p => p.type === 'wood' && top(p) <= 450 && p.w >= 400)).toHaveLength(3);
    const beach = levels.find(level => level.id === 44)!;
    expect(beach.waterZones).toHaveLength(2);
    expect(beach.platforms.filter(p => p.type === 'wood' && top(p) <= 540)).toHaveLength(3);
  });

  it('keeps question blocks clear and all fixed collision surfaces physically separate', () => {
    for (const level of levels) {
      for (const qb of level.questionBlocks) {
        for (const p of level.platforms) {
          if (Math.abs(p.x - qb.x) >= p.w / 2 + 16) continue;
          const gap = qb.y - 16 - (p.y + p.h / 2);
          if (gap >= 0) expect(gap, `L${level.id} QB ${qb.x}`).toBeGreaterThanOrEqual(56);
          expect(!(qb.y + 16 > top(p) && qb.y - 16 < p.y + p.h / 2), `L${level.id} QB inside terrain`).toBe(true);
        }
      }
      for (const coin of level.coins) {
        expect(level.platforms.some(p => Math.abs(p.x - coin.x) < p.w / 2 + 7 && coin.y + 7 > top(p) && coin.y - 7 < p.y + p.h / 2), `L${level.id} coin buried at ${coin.x},${coin.y}`).toBe(false);
      }
      const types = new Set(level.platforms.map(p => p.type));
      const heights = new Set(level.platforms.map(top));
      expect(types.size, `L${level.id} types`).toBeGreaterThanOrEqual(3);
      expect(heights.size, `L${level.id} heights`).toBeGreaterThanOrEqual(4);
    }
  });
});

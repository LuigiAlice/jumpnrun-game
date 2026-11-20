import { describe, expect, it } from 'vitest';
import type { LevelData } from '../src/data/levels';
const source = (id: number) => ({ id, name: 'obsolete', width: 15000, height: 900, biome: 'factory', platforms: [], coins: [], questionBlocks: [], enemies: [], decorations: [], playerStart: { x: 100, y: 500 }, goal: { x: 14500, y: 500 }, timeBonus: 100, coinGoal: 50, cannons: [{ x: 13000, y: 500, dir: 1 }], springs: [{ x: 12000, y: 500 }], spikes: [{ x: 11000, y: 500 }] } as LevelData);
import { CHALLENGE_VARIETY_IDS, rewriteChallengeLevel } from '../src/data/levels/variety/challenge';
import { Physics } from '../src/engine/Physics';
import { getBiomeGravity } from '../src/config';

const levels = CHALLENGE_VARIETY_IDS.map(id => rewriteChallengeLevel(source(id)));
const top = (p: { y: number; h: number }) => p.y - p.h / 2;

describe('Challenge level identities', () => {
  it('keeps every new goal and bonus platform reachable without movers or special actions', () => {
    for (const level of levels) {
      const solver = new Physics(level.platforms, level.width, level.height, [], getBiomeGravity(level.biome));
      expect(solver.isSolvable(level.playerStart.x, level.playerStart.y, level.goal.x, level.goal.y), `L${level.id} goal`).toBe(true);
      const result = solver.isFullyTraversableToGoal(level.playerStart.x, level.playerStart.y, level.goal.x);
      expect(result.unreachablePlatforms, `L${level.id} unreachable`).toEqual([]);
      expect(solver.isGoalOnPlatform(level.goal.x, level.goal.y), `L${level.id} goal support`).toBe(true);
    }
  });

  it('folds the machine route across three floors instead of extending one horizontal strip', () => {
    const level = levels[0];
    expect(level.width).toBeLessThan(4000);
    expect(top(level.platforms[0]) - top(level.platforms[level.platforms.length - 1])).toBeGreaterThan(900);
    // The return-floor west stair is essential: the final floor cannot be reached directly.
    const withoutWestStairs = level.platforms.filter(p => !(p.x < 900 && top(p) >= 580 && top(p) <= 700));
    const solver = new Physics(withoutWestStairs, level.width, level.height, [], getBiomeGravity(level.biome));
    expect(solver.isSolvable(level.playerStart.x, level.playerStart.y, level.goal.x, level.goal.y)).toBe(false);
  });

  it('makes the crater descend into a broad calm basin and rise through a shorter exit', () => {
    const level = levels[1];
    const basin = level.platforms.find(p => p.w >= 800 && top(p) === 940)!;
    expect(basin).toBeDefined();
    expect(top(basin) - top(level.platforms[0])).toBe(560);
    expect(level.goal.y).toBeGreaterThan(level.playerStart.y);
    expect(level.enemies.some(enemy => enemy.type === 'bobomb')).toBe(true);
    expect(level.checkpoints?.some(point => point.x >= basin.x - basin.w / 2 && point.x <= basin.x + basin.w / 2)).toBe(true);
  });

  it('varies gallery headroom and a tall stair hall around separate ghost encounters', () => {
    const level = levels[2];
    const lowRoof = level.platforms.find(p => p.x === 770)!;
    expect(800 - (lowRoof.y + lowRoof.h / 2)).toBeGreaterThanOrEqual(100);
    expect(850 - Math.min(...level.platforms.map(top))).toBeGreaterThanOrEqual(300);
    expect(level.enemies.filter(enemy => enemy.type === 'boo')).toHaveLength(3);
    expect(level.width).toBeLessThan(5000);
  });

  it('offers a continuous low canyon route when the exposed bridge has crumbled', () => {
    const level = levels[3];
    const withoutBridge = level.platforms.filter(p => !p.crumble);
    const solver = new Physics(withoutBridge, level.width, level.height, [], getBiomeGravity(level.biome));
    expect(solver.isSolvable(level.playerStart.x, level.playerStart.y, level.goal.x, level.goal.y)).toBe(true);
    expect(level.platforms.some(p => p.w > 1200 && top(p) === 980)).toBe(true);
    expect(level.coins.filter(coin => coin.y > 900)).toHaveLength(9);
  });

  it('is deterministic, clears obsolete coordinates and leaves untouched levels identical', () => {
    for (const id of CHALLENGE_VARIETY_IDS) {
      const original = structuredClone(source(id));
      const snapshot = structuredClone(original);
      const rewritten = rewriteChallengeLevel(original);
      expect(original).toEqual(snapshot);
      expect(rewriteChallengeLevel(rewritten)).toEqual(rewritten);
      expect(rewritten.coinGoal).toBeUndefined();
      expect(rewritten.cannons).toBeUndefined();
      expect(rewritten.springs).toBeUndefined();
      expect(rewritten.spikes).toBeUndefined();
    }
    const final = source(90);
    expect(rewriteChallengeLevel(final)).toBe(final);
  });
});

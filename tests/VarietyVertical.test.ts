import { describe, expect, it } from 'vitest';
import type { LevelData, Platform } from '../src/data/levels';
import { rewriteVerticalLevel } from '../src/data/levels/variety/vertical';
import { Physics } from '../src/engine/Physics';
import { getBiomeGravity } from '../src/config';

const source = (id: number): LevelData => ({
  id, biome: id === 28 ? 'sky-clouds' : 'space-star', name: 'Old horizontal run',
  width: 14000, height: 900, platforms: [], coins: [], questionBlocks: [], enemies: [], decorations: [],
  playerStart: { x: 0, y: 0 }, goal: { x: 13900, y: 800 }, timeBonus: 100,
  springs: [{ x: 100, y: 100 }], spikes: [{ x: 200, y: 100 }], coinGoal: 30,
  keys: [{ x: 300, y: 100 }], cannons: [{ x: 400, y: 100, dir: 1 }],
});
const top = (p: Platform) => p.y - p.h / 2;
const solve = (level: LevelData) => new Physics(level.platforms, level.width, level.height, [], getBiomeGravity(level.biome));

describe('Distinct vertical and orbital main routes', () => {
  it('replaces the long cloud run with a genuinely tall switchback climb and safe retries', () => {
    const level = rewriteVerticalLevel(source(28));
    expect(level.width).toBeLessThanOrEqual(2600);
    expect(level.height).toBeGreaterThanOrEqual(2400);
    expect(level.playerStart.y - level.goal.y).toBeGreaterThan(2000);
    const ordered = level.platforms;
    const directions = ordered.slice(1).map((p, i) => Math.sign(p.x - ordered[i].x));
    const reversals = directions.slice(1).filter((direction, i) => direction !== directions[i]);
    expect(reversals.length).toBeGreaterThanOrEqual(4);
    // No skipped tier can bridge two rises, so horizontal movement alone cannot bypass the tower.
    for (let i = 1; i < ordered.length - 1; i++) expect(top(ordered[i - 1]) - top(ordered[i])).toBe(180);
    expect(level.checkpoints).toHaveLength(3);
    expect(ordered.filter(p => p.w >= 440)).toHaveLength(4);
    expect(level.enemies.some(enemy => enemy.type === 'parakoopa')).toBe(true);
  });

  it('uses five large orbit bodies with long air crossings and only one optional satellite', () => {
    const level = rewriteVerticalLevel(source(80));
    const bodies = level.platforms.filter(p => p.w >= 600);
    expect(bodies).toHaveLength(5);
    expect(level.platforms).toHaveLength(6);
    expect(new Set(bodies.map(top)).size).toBeGreaterThanOrEqual(4);
    for (let i = 1; i < bodies.length; i++) {
      const from = bodies[i - 1], to = bodies[i];
      const gap = to.x - to.w / 2 - (from.x + from.w / 2);
      expect(gap).toBeGreaterThanOrEqual(300);
    }
    const withoutSatellite = { ...level, platforms: bodies };
    expect(solve(withoutSatellite).isSolvable(level.playerStart.x, level.playerStart.y, level.goal.x, level.goal.y)).toBe(true);
    // The tall third-to-fourth crossing specifically relies on this biome's normal gravity,
    // rather than a spring or an unmodelled movement boost.
    expect(new Physics(bodies, level.width, level.height, [], 2000)
      .isSolvable(level.playerStart.x, level.playerStart.y, level.goal.x, level.goal.y)).toBe(false);
  });

  it('keeps both full authored routes and their rewards reachable without movers or special launches', () => {
    for (const id of [28, 80]) {
      const level = rewriteVerticalLevel(source(id));
      const solver = solve(level);
      expect(solver.isSolvable(level.playerStart.x, level.playerStart.y, level.goal.x, level.goal.y), `L${id} goal`).toBe(true);
      expect(solver.isFullyTraversableToGoal(level.playerStart.x, level.playerStart.y, level.goal.x).unreachablePlatforms, `L${id} rewards`).toEqual([]);
      expect(solver.isGoalOnPlatform(level.goal.x, level.goal.y)).toBe(true);
      expect(level.movingPlatforms).toEqual([]);
      expect(level.springs).toBeUndefined();
      expect(level.spikes).toBeUndefined();
      for (const cp of level.checkpoints ?? []) {
        const support = solver.findPlatformUnderPoint(cp.x, cp.y);
        expect(support).not.toBeNull();
        expect(cp.y + 24).toBeLessThanOrEqual(top(support!));
      }
      expect(new Set(level.platforms.map(p => p.type)).size).toBeGreaterThanOrEqual(3);
    }
  });

  it('replaces stale optional fields deterministically without mutating or touching other levels', () => {
    for (const id of [28, 80]) {
      const original = source(id), before = JSON.stringify(original);
      const rewritten = rewriteVerticalLevel(original);
      expect(JSON.stringify(original)).toBe(before);
      expect(rewriteVerticalLevel(rewritten)).toEqual(rewritten);
      for (const key of ['keys', 'cannons', 'coinGoal', 'spikes', 'springs'] as const) expect(rewritten[key]).toBeUndefined();
    }
    const other = source(79);
    expect(rewriteVerticalLevel(other)).toBe(other);
  });
});

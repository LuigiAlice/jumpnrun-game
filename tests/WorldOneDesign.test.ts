import { describe, expect, it } from 'vitest';
import { GRASSLANDS_LEVELS } from '../src/data/levels/grasslands';
import { Physics } from '../src/engine/Physics';
import { getBiomeGravity } from '../src/config';

const top = (p: { y: number; h: number }) => p.y - p.h / 2;
const left = (p: { x: number; w: number }) => p.x - p.w / 2;
const right = (p: { x: number; w: number }) => p.x + p.w / 2;

describe('World one: staged landscape and discoveries', () => {
  it('introduces hills in a compact second level before advanced enemy roles and traps', () => {
    const level = GRASSLANDS_LEVELS[1];
    expect(level.width).toBeLessThanOrEqual(8000);
    expect(level.enemies.length).toBeLessThanOrEqual(8);
    expect(level.enemies.every(e => e.type === 'goomba' || e.type === 'koopa')).toBe(true);
    expect(level.spikes || []).toHaveLength(0);
    expect(level.platforms.some(p => p.crumble)).toBe(false);
    const hill = level.platforms.filter(p => p.type === 'grass' && left(p) >= 1100 && right(p) <= 2090);
    expect(hill.length).toBeGreaterThanOrEqual(3);
    for (let i = 1; i < hill.length; i++) {
      expect(left(hill[i])).toBe(right(hill[i - 1]));
      expect(Math.abs(top(hill[i]) - top(hill[i - 1]))).toBeLessThanOrEqual(60);
    }
  });

  it('grounds low grass terrain while keeping high optional islands open underneath', () => {
    for (const level of GRASSLANDS_LEVELS) {
      const lowLand = level.platforms.filter(p => p.type === 'grass' && top(p) >= 480);
      expect(lowLand.length, level.name).toBeGreaterThanOrEqual(3);
      expect(lowLand.every(p => p.y + p.h / 2 === 800), level.name).toBe(true);
    }
    // The high L3 reward island must not become a 350px wall across the lower route.
    const island = GRASSLANDS_LEVELS[2].platforms.find(p => p.x === 4900 && top(p) === 130);
    expect(island?.h).toBe(40);
  });

  it('offers sheltered bonus alcoves with hidden blocks and full-height headroom', () => {
    for (const level of GRASSLANDS_LEVELS.slice(1, 3)) {
      expect(level.platforms.some(p => p.type === 'hidden')).toBe(true);
      const reward = level.questionBlocks.find(q => q.contents === 'oneup');
      expect(reward).toBeDefined();
      const roof = level.platforms.find(p => p.type === 'wood' && p.w >= 250
        && reward!.x > left(p) && reward!.x < right(p) && p.y < reward!.y);
      expect(roof).toBeDefined();
      expect(reward!.y - 16 - (roof!.y + roof!.h / 2)).toBeGreaterThanOrEqual(56);
      const floor = level.platforms.find(p => p.x - p.w / 2 < reward!.x && p.x + p.w / 2 > reward!.x
        && top(p) > reward!.y + 16 && top(p) < reward!.y + 100);
      expect(floor).toBeDefined();
    }
  });

  it('places world-one reward coins outside solid terrain', () => {
    const failures: string[] = [];
    for (const level of GRASSLANDS_LEVELS) for (const coin of level.coins) {
      for (const p of level.platforms) {
        const intersects = coin.x + 10 > left(p) && coin.x - 10 < right(p)
          && coin.y + 10 > top(p) && coin.y - 10 < p.y + p.h / 2;
        if (intersects) failures.push(`L${level.id} coin (${coin.x},${coin.y}) inside ${p.type} (${p.x},${p.y})`);
      }
    }
    expect(failures, failures.join('\n')).toEqual([]);
  });

  it('keeps every world-one goal reachable without movers, springs or hidden blocks', () => {
    for (const level of GRASSLANDS_LEVELS) {
      const permanent = level.platforms.filter(p => p.type !== 'hidden' && !p.crumble);
      const physics = new Physics(permanent, level.width, level.height, [], getBiomeGravity(level.biome));
      expect(physics.isFullyTraversableToGoal(level.playerStart.x, level.playerStart.y, level.goal.x).traversable, level.name).toBe(true);
    }
  });
});

import { describe, expect, it } from 'vitest';
import { LEVEL_IDENTITIES } from '../src/data/levels/variety';
import { ALL_LEVELS } from '../src/data/levels';
import { Physics } from '../src/engine/Physics';
import { getBiomeGravity } from '../src/config';

const levels = ALL_LEVELS.filter(level => level.id >= 49);
// Authored recovery/reward landmarks between each level's own set pieces.
const refuges: Record<number, number> = {
  49: 3640, 50: 3510, 51: 3740, 52: 4450, 53: 3900, 54: 6300,
  55: 3450, 56: 5100, 57: 6350, 58: 3920, 59: 8150, 60: 4050,
  61: 3900, 62: 5720, 63: 3375, 64: 5900, 65: 5775, 66: 8990,
  67: 5700, 68: 5125, 69: 4325, 70: 9250, 71: 6800, 72: 7425,
  73: 3600, 74: 4500, 75: 5650, 76: 5350, 77: 5850, 78: 4800,
  79: 5875, 80: 4575, 81: 5250, 82: 8825, 83: 7775, 84: 8925,
  85: 3900, 86: 5200, 87: 4625, 88: 8600, 89: 11400,
};

describe('Challenge world pacing and discovery', () => {
  it('provides a broad recovery deck and reward between set pieces in every challenge level', () => {
    expect(levels).toHaveLength(42);
    for (const level of levels.filter(level => level.id !== 90 && !LEVEL_IDENTITIES[level.id])) {
      const x = refuges[level.id];
      const support = level.platforms.find(p => p.w >= 450 && p.type !== 'lava'
        && Math.abs(p.x - x) < p.w / 2);
      expect(support, `L${level.id} recovery deck`).toBeDefined();
      expect(level.coins.filter(coin => Math.abs(coin.x - x) <= 60).length,
        `L${level.id} optional reward`).toBeGreaterThanOrEqual(3);
      expect(level.enemies.filter(enemy => Math.abs(enemy.x - x) < 280),
        `L${level.id} should give the player time to read the next section`).toHaveLength(0);
    }
  });

  it('keeps the route solvable without the small discovery caches', () => {
    for (const level of levels) {
      const withoutCaches = level.platforms.filter(p => !(p.w === 32 && p.h === 32
        && ['hidden', 'brick_secret', 'brick_multi'].includes(p.type)));
      const physics = new Physics(withoutCaches, level.width, level.height,
        level.movingPlatforms || [], getBiomeGravity(level.biome));
      expect(physics.isFullyTraversableToGoal(level.playerStart.x, level.playerStart.y, level.goal.x).traversable,
        `L${level.id} must not require a secret block`).toBe(true);
    }
  });

  it('leaves Big-player headroom below the thickened terrain and chamber roofs', () => {
    for (const level of levels) {
      for (const block of level.questionBlocks) {
        for (const p of level.platforms) {
          const overlapsX = Math.abs(p.x - block.x) < p.w / 2 + 16;
          const gap = block.y - 16 - (p.y + p.h / 2);
          if (overlapsX && gap >= 0) {
            expect(gap, `L${level.id} question block at ${block.x} needs headroom`).toBeGreaterThanOrEqual(56);
          }
        }
      }
    }
  });

  it('retains the first lava crossing recovery landing outside the rewritten machine shaft', () => {
    for (const [id, x, top] of [[55, 2780, 540]]) {
      const level = levels.find(level => level.id === id)!;
      const landing = level.platforms.find(p => p.x === x && p.y - p.h / 2 === top);
      expect(landing, `L${id} missed jumps need a recovery landing`).toBeDefined();
      const maxRise = 900 ** 2 / (2 * getBiomeGravity(level.biome));
      expect(level.platforms.some(p => p !== landing && top - (p.y - p.h / 2) > 0
        && top - (p.y - p.h / 2) < maxRise && Math.abs(p.x - x) < 220),
      `L${id} recovery landing needs an exit within actual jump height`).toBe(true);
    }
  });

  it('uses a compact readable boss duel with guaranteed fire power on the ground route', () => {
    const arena = levels.find(level => level.id === 90)!;
    expect(arena.width).toBeLessThanOrEqual(8000);
    expect(arena.enemies.map(enemy => enemy.type)).toEqual(['boss']);
    expect(arena.questionBlocks.find(block => block.x < 1000)?.contents).toBe('flower');
    expect(arena.questionBlocks.filter(block => block.contents === 'flower').length).toBeGreaterThanOrEqual(2);
    expect(arena.coinGoal).toBeUndefined();
    expect(arena.springs || []).toHaveLength(0);
    expect(arena.spikes || []).toHaveLength(0);
    expect(arena.cannons || []).toHaveLength(0);
    expect(levels.find(level => level.id === 89)!.coinGoal).toBe(33);
  });
});

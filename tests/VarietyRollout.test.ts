import { expect, it } from 'vitest';
import { ALL_LEVELS } from '../src/data/levels';
import { applyLevelIdentity, LEVEL_IDENTITIES } from '../src/data/levels/variety';

it('loads twelve complete main-route identities while leaving the other seventy-eight levels untouched', () => {
  const rewritten = ALL_LEVELS.filter(level => LEVEL_IDENTITIES[level.id]);
  expect(rewritten.map(level => level.id)).toEqual([8, 14, 20, 28, 32, 38, 44, 50, 58, 62, 74, 80]);
  expect(new Set(Object.values(LEVEL_IDENTITIES).map(identity => identity.shape)).size).toBe(12);
  for (const level of ALL_LEVELS) {
    if (!LEVEL_IDENTITIES[level.id]) {
      expect(applyLevelIdentity(level)).toBe(level);
      continue;
    }
    expect(level.cameraMode).toBe('bidirectional');
    expect(applyLevelIdentity(level)).toEqual(level);
    expect(level.width).toBeLessThan(5000);
    expect(level.movingPlatforms ?? []).toHaveLength(0);
    for (const cp of level.checkpoints ?? []) {
      const ground = level.platforms.find(p => p.type !== 'lava' && Math.abs(p.x - cp.x) < p.w / 2
        && p.y - p.h / 2 >= cp.y && p.y - p.h / 2 - cp.y < 60);
      expect(ground, `L${level.id} checkpoint support`).toBeDefined();
      // GameScene respawns 40px above the marker; Big player must not start in terrain.
      expect(cp.y - 40 + 24).toBeLessThanOrEqual(ground!.y - ground!.h / 2);
    }
    for (const coin of level.coins) {
      expect(level.platforms.some(p => p.type !== 'lava'
        && Math.abs(p.x - coin.x) < p.w / 2 + 7
        && coin.y + 7 > p.y - p.h / 2 && coin.y - 7 < p.y + p.h / 2),
      `L${level.id} buried coin at ${coin.x},${coin.y}`).toBe(false);
    }
    for (const enemy of level.enemies) {
      if (enemy.type === 'parakoopa') for (const offset of [-48, 48]) {
        expect(level.platforms.some(p => Math.abs(p.x - enemy.x) < p.w / 2 + 17
          && enemy.y + offset + 17 > p.y - p.h / 2
          && enemy.y + offset - 17 < p.y + p.h / 2), `L${level.id} full winged flight arc`).toBe(false);
      }
      expect(Math.abs(enemy.x - level.playerStart.x), `L${level.id} enemy spawn grace`).toBeGreaterThanOrEqual(500);
      if (['goomba', 'koopa', 'spiny', 'robot', 'crab', 'buzzy_beetle', 'bobomb'].includes(enemy.type)) {
        expect(level.platforms.some(p => p.type !== 'lava' && Math.abs(p.x - enemy.x) < p.w / 2
          && p.y - p.h / 2 >= enemy.y && p.y - p.h / 2 - enemy.y <= 60), `L${level.id} grounded enemy`).toBe(true);
      }
    }
  }
});

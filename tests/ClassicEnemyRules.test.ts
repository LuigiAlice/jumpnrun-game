import { describe, expect, it } from 'vitest';
import { enemyContact } from '../src/engine/EnemyRules';
import { advanceBombFuse, BOMB_FUSE_MS, fireHitEffect, isInBombBlast, parakoopaOffset } from '../src/engine/ClassicEnemyRules';

describe('Classic enemy roles', () => {
  it('removes wings on the first stomp while an ordinary koopa becomes a shell', () => {
    expect(enemyContact('parakoopa', 'walking', true, false, false)).toBe('dewing');
    expect(enemyContact('koopa', 'walking', true, false, false)).toBe('stomp');
    expect(enemyContact('parakoopa', 'walking', false, false, false)).toBe('damage');
    expect(parakoopaOffset(0)).toBeCloseTo(parakoopaOffset(2400));
    expect(parakoopaOffset(600)).toBe(48);
    expect(parakoopaOffset(1800)).toBe(-48);
  });
  it('makes armored beetles resist fire but retain shell interactions', () => {
    expect(fireHitEffect('buzzy_beetle')).toBe('resist');
    expect(fireHitEffect('parakoopa')).toBe('defeat');
    expect(enemyContact('buzzy_beetle', 'walking', true, false, false)).toBe('stomp');
    expect(enemyContact('buzzy_beetle', 'shell_moving', true, false, false)).toBe('stop-shell');
    expect(enemyContact('buzzy_beetle', 'shell_idle', false, false, false)).toBe('kick');
    expect(enemyContact('buzzy_beetle', 'walking', false, true, false)).toBe('star-kill');
  });
  it('arms bombs on a stomp or fireball and gives the player time to escape', () => {
    expect(enemyContact('bobomb', 'walking', true, false, false)).toBe('ignite');
    expect(enemyContact('bobomb', 'walking', false, false, false)).toBe('damage');
    expect(enemyContact('bobomb', 'fused', false, false, false)).toBe('ignore');
    expect(fireHitEffect('bobomb')).toBe('ignite');
    expect(advanceBombFuse(BOMB_FUSE_MS, 1499).explode).toBe(false);
    expect(advanceBombFuse(BOMB_FUSE_MS, 1500).explode).toBe(true);
    expect(advanceBombFuse(100, -20).remainingMs).toBe(100);
  });
  it('uses game-time fuse duration at different frame rates and bounds the blast', () => {
    for (const hz of [30, 60, 120]) {
      let remaining = BOMB_FUSE_MS;
      for (let i = 0; i < hz; i++) remaining = advanceBombFuse(remaining, 1000 / hz).remainingMs;
      expect(remaining).toBeCloseTo(500, 6);
    }
    expect(isInBombBlast(100, 100, 190, 100)).toBe(true);
    expect(isInBombBlast(100, 100, 191, 100)).toBe(false);
    expect(isInBombBlast(100, 100, 170, 170)).toBe(false);
  });
});

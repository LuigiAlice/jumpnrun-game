import { describe, expect, it } from 'vitest';
import { advanceProtection, enemyContact, pipeEntryAligned, powerUpMotion, stepPiranha } from '../src/engine/EnemyRules';

describe('Readable enemy and power-up rules', () => {
  it('keeps hit protection separate from star attacks', () => {
    expect(enemyContact('goomba', 'walking', false, false, true)).toBe('ignore');
    expect(enemyContact('goomba', 'walking', false, true, false)).toBe('star-kill');
    expect(enemyContact('koopa', 'shell_moving', false, true, false)).toBe('star-kill');
    expect(enemyContact('boss', 'walking', false, true, false)).toBe('ignore');
    expect(advanceProtection({ hitMs: 2000, starMs: 5000 }, 2500)).toEqual({ hitMs: 0, starMs: 2500 });
  });
  it('stops moving shells from above and treats spines as dangerous', () => {
    expect(enemyContact('koopa', 'shell_moving', true, false, false)).toBe('stop-shell');
    expect(enemyContact('koopa', 'shell_moving', false, false, false)).toBe('damage');
    expect(enemyContact('koopa', 'shell_idle', false, false, false)).toBe('kick');
    expect(enemyContact('spiny', 'walking', true, false, false)).toBe('damage');
    expect(enemyContact('goomba', 'walking', true, false, false)).toBe('stomp');
  });
  it('gives flowers, walking mushrooms and bouncing stars distinct motion', () => {
    expect(powerUpMotion('flower')).toEqual({ vx: 0, launchY: 0, bounceY: 0, gravity: false });
    expect(powerUpMotion('mushroom').vx).toBeGreaterThan(0);
    expect(powerUpMotion('mushroom').launchY).toBe(0);
    expect(powerUpMotion('star').launchY).toBeLessThan(-300);
  });
  it('enters pipes by foot position for both small and big players', () => {
    for (const halfHeight of [16, 24]) {
      const centerY = 494 - halfHeight;
      expect(pipeEntryAligned(2050, centerY + halfHeight, 2050, 494, 80)).toBe(true);
    }
    expect(pipeEntryAligned(2110, 494, 2050, 494, 80)).toBe(false);
    expect(pipeEntryAligned(2050, 450, 2050, 494, 80)).toBe(false);
  });
  it('holds hidden piranhas near the player and resumes after the player leaves', () => {
    const held = stepPiranha({ phase: 'hidden', elapsedMs: 1700 }, 500, true);
    expect(held.exposure).toBe(0);
    expect(held.state.phase).toBe('hidden');
    const emerging = stepPiranha(held.state, 325, false);
    expect(emerging.state.phase).toBe('rising');
    expect(emerging.exposure).toBeCloseTo(0.5);
    const open = stepPiranha(emerging.state, 325, false);
    expect(open.exposure).toBe(1);
    const hidden = stepPiranha(open.state, 2050, false);
    expect(hidden.state.phase).toBe('hidden');
    expect(hidden.exposure).toBe(0);
  });
});

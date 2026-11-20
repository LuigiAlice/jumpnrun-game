import { describe, expect, it, vi } from 'vitest';
vi.mock('phaser', () => ({ default: { Scene: class {} } }));
import { GameScene } from '../src/scenes/GameScene';

function fixture(unlocked = true) {
  const body = {
    enable: true, moves: true, allowGravity: true,
    velocity: { x: 400, y: 550 }, acceleration: { x: 120, y: 200 },
    setVelocity(x: number, y: number) { this.velocity = { x, y }; },
    setAcceleration(x: number, y: number) { this.acceleration = { x, y }; },
    setAllowGravity(value: boolean) { this.allowGravity = value; },
  };
  const player = {
    x: 950, y: 420, body, texture: 'player_jump',
    setFlipX: vi.fn(), setScale: vi.fn().mockReturnThis(), setAlpha: vi.fn().mockReturnThis(),
    clearTint: vi.fn().mockReturnThis(), setTexture(key: string) { this.texture = key; },
  };
  const text = { y: 360, setOrigin: vi.fn().mockReturnThis(), setDepth: vi.fn().mockReturnThis() };
  const delayed: (() => void)[] = [];
  const scene = {
    player, goal: { y: 450 }, isTransitioning: false, isDead: false, isQuitting: false,
    isPlayerBig: false, isPlayerFire: false, score: 0, lives: 3,
    timerEvent: { paused: false }, goalUnlocked: () => unlocked,
    playGoalSound: vi.fn(), stopMusic: vi.fn(), showScorePopup: vi.fn(), nextLevel: vi.fn(),
    tweens: { killTweensOf: vi.fn(), add: vi.fn() }, add: { text: vi.fn(() => text) },
    time: { delayedCall: vi.fn((_ms: number, callback: () => void) => delayed.push(callback)) },
  };
  const finish = () => (GameScene.prototype as any).reachGoal.call(scene, 250);
  return { scene, body, player, delayed, finish };
}

describe('Safe goal finish', () => {
  it('holds the player at the reached position through the entire finish without falling or walking off', () => {
    const { scene, body, player, delayed, finish } = fixture();
    finish();
    expect(body.velocity).toEqual({ x: 0, y: 0 });
    expect(body.acceleration).toEqual({ x: 0, y: 0 });
    expect([body.enable, body.moves, body.allowGravity]).toEqual([false, false, false]);
    expect(scene.tweens.killTweensOf).toHaveBeenCalledWith(player);
    expect(player.texture).toBe('player_idle');
    expect(scene.timerEvent.paused).toBe(true);
    // Run every finish callback, including any future tween completions. Neither may
    // restore player gravity or introduce a player-position tween before restart.
    for (const [tween] of scene.tweens.add.mock.calls as any[]) {
      expect(tween.targets).not.toBe(player);
      tween.onComplete?.();
    }
    delayed.forEach(callback => callback());
    expect([player.x, player.y]).toEqual([950, 420]);
    expect([body.enable, body.moves, body.allowGravity]).toEqual([false, false, false]);
    expect(scene.nextLevel).toHaveBeenCalledOnce();
    expect(scene.lives).toBe(3);
    const score = scene.score;
    finish();
    expect(scene.score).toBe(score);
    expect(scene.time.delayedCall).toHaveBeenCalledOnce();
  });

  it('leaves a locked goal fully playable and rejects dead or quitting players', () => {
    for (const state of ['locked', 'dead', 'quitting'] as const) {
      const { scene, body, finish } = fixture(state !== 'locked');
      scene.isDead = state === 'dead'; scene.isQuitting = state === 'quitting';
      finish();
      expect(scene.isTransitioning).toBe(false);
      expect([body.enable, body.moves, body.allowGravity]).toEqual([true, true, true]);
      expect(body.velocity).toEqual({ x: 400, y: 550 });
      expect(scene.time.delayedCall).not.toHaveBeenCalled();
    }
  });

  it('keeps big and fire finish poses at their native player size', () => {
    for (const fire of [false, true]) {
      const { scene, player, finish } = fixture();
      scene.isPlayerBig = true; scene.isPlayerFire = fire;
      finish();
      expect(player.texture).toBe(fire ? 'player_fire_idle' : 'player_big_idle');
    }
  });
});

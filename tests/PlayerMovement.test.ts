import { describe, expect, it } from 'vitest';
import { createJumpState, PLAYER_MOVEMENT, stepHorizontalVelocity, stepJump, type JumpState } from '../src/engine/PlayerMovement';

describe('Player movement feel', () => {
  const drive = (hz: number, velocity: number, direction: -1 | 0 | 1, seconds: number) => {
    for (let frame = 0; frame < hz * seconds; frame++) velocity = stepHorizontalVelocity(velocity, direction, false, true, 'ice', 1000 / hz);
    return velocity;
  };

  it('keeps the authored solver walk speed and adds an optional sprint instantly', () => {
    for (const grounded of [true, false]) {
      for (const surface of ['normal', 'snow'] as const) {
        expect(stepHorizontalVelocity(0, 1, false, grounded, surface, 16)).toBe(300);
        expect(stepHorizontalVelocity(0, -1, true, grounded, surface, 16)).toBe(-400);
        expect(stepHorizontalVelocity(400, 1, false, grounded, surface, 16)).toBe(300);
      }
    }
  });

  it('stops and reverses immediately on normal terrain, snow and in the air', () => {
    for (const grounded of [true, false]) {
      for (const surface of ['normal', 'snow', 'ice'] as const) {
        if (grounded && surface === 'ice') continue;
        expect(stepHorizontalVelocity(300, 0, false, grounded, surface, 16)).toBe(0);
        expect(stepHorizontalVelocity(-400, 0, true, grounded, surface, 16)).toBe(0);
        expect(stepHorizontalVelocity(300, -1, false, grounded, surface, 16)).toBe(-300);
        expect(stepHorizontalVelocity(-300, 1, true, grounded, surface, 16)).toBe(400);
      }
    }
  });

  it('gives the same direct response at 30, 60 and 144 Hz', () => {
    for (const hz of [30, 60, 144]) {
      for (const grounded of [true, false]) {
        expect(stepHorizontalVelocity(0, 1, false, grounded, 'normal', 1000 / hz)).toBe(300);
        expect(stepHorizontalVelocity(300, -1, false, grounded, 'normal', 1000 / hz)).toBe(-300);
        expect(stepHorizontalVelocity(300, 0, false, grounded, 'normal', 1000 / hz)).toBe(0);
      }
    }
  });

  it('accelerates and reverses gradually only while standing on ice', () => {
    const start = stepHorizontalVelocity(0, 1, false, true, 'ice', 16);
    expect(start).toBeGreaterThan(0);
    expect(start).toBeLessThan(300);
    expect(stepHorizontalVelocity(300, -1, false, true, 'ice', 16)).toBeGreaterThan(0);
    const drift = stepHorizontalVelocity(300, 0, false, true, 'ice', 1000 / 60);
    expect(drift).toBeCloseTo(300 * 0.96, 8);
  });

  it('keeps ice acceleration, reversal and drag independent of frame rate', () => {
    for (const hz of [30, 60, 144]) {
      expect(drive(hz, 0, 1, 0.5)).toBeCloseTo(drive(60, 0, 1, 0.5), 6);
      expect(drive(hz, 300, -1, 0.5)).toBeCloseTo(drive(60, 300, -1, 0.5), 6);
      expect(drive(hz, 300, 0, 0.5)).toBeCloseTo(drive(60, 300, 0, 0.5), 6);
    }
  });
});

describe('Buffered variable jumps', () => {
  const frame = (state: JumpState, options: Partial<Parameters<typeof stepJump>[1]> = {}) => stepJump(state, {
    grounded: false, jumpDown: false, velocityY: 0, deltaMs: 16, ...options,
  });

  it('allows a short coyote jump but rejects an expired ledge grace', () => {
    const grounded = frame(createJumpState(), { grounded: true }).state;
    expect(frame(grounded, { jumpDown: true, deltaMs: 80 }).jumped).toBe(true);
    expect(frame(grounded, { jumpDown: true, deltaMs: 100 }).jumped).toBe(false);
  });

  it('buffers a press just before landing and expires old presses', () => {
    const pressed = frame(createJumpState(), { jumpDown: true, velocityY: 100 }).state;
    expect(frame(pressed, { grounded: true, jumpDown: true, deltaMs: 100 }).jumped).toBe(true);
    expect(frame(pressed, { grounded: true, jumpDown: true, deltaMs: 140 }).jumped).toBe(false);
  });

  it('does not auto-bounce or double-jump when holding jump', () => {
    const jump = frame(createJumpState(), { grounded: true, jumpDown: true });
    expect(jump.jumped).toBe(true);
    expect(frame(jump.state, { grounded: true, jumpDown: true, velocityY: -880 }).jumped).toBe(false);
    expect(frame(jump.state, { grounded: true, jumpDown: true, velocityY: 0 }).jumped).toBe(false);
  });

  it('shortens only player-owned jumps on release, once', () => {
    const jump = frame(createJumpState(), { grounded: true, jumpDown: true });
    expect(jump.velocityY).toBe(PLAYER_MOVEMENT.jumpVelocity);
    const cut = frame(jump.state, { velocityY: -850 });
    expect(cut.velocityY).toBe(-360);
    expect(frame(cut.state, { velocityY: -330 }).velocityY).toBe(-330);
    expect(frame(createJumpState(), { velocityY: -1350 }).velocityY).toBe(-1350);
  });

  it('leaves spring launches, stomps, swimming and pipe entry to their owner', () => {
    const jump = frame(createJumpState(), { grounded: true, jumpDown: true });
    const spring = frame(jump.state, { externalLaunch: true, velocityY: -1350 });
    expect(spring.velocityY).toBe(-1350);
    expect(frame(spring.state, { velocityY: -1300 }).velocityY).toBe(-1300);
    expect(frame(createJumpState(), { grounded: true, jumpDown: true, suppressed: true }).jumped).toBe(false);
  });
});

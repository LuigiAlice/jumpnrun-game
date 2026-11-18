/** Small, renderer-independent rules shared by runtime and regression tests. */
export type EnemyContact = 'ignore' | 'damage' | 'stomp' | 'kick' | 'stop-shell' | 'star-kill';
export const NON_STOMPABLE_ENEMIES = new Set([
  'piranha', 'thwomp', 'boo', 'lakitu', 'bullet_bill', 'fireball', 'boss', 'spiny',
]);

export function enemyContact(type: string, state: string, fromAbove: boolean, star: boolean, hitShield: boolean): EnemyContact {
  if (star) return type === 'boss' ? 'ignore' : 'star-kill';
  if (state === 'shell_moving') return fromAbove ? 'stop-shell' : hitShield ? 'ignore' : 'damage';
  if (state === 'shell_idle') return 'kick';
  if (NON_STOMPABLE_ENEMIES.has(type)) return hitShield ? 'ignore' : 'damage';
  if (fromAbove) return 'stomp';
  return hitShield ? 'ignore' : 'damage';
}

export interface Protection { hitMs: number; starMs: number }
export function advanceProtection(protection: Protection, deltaMs: number): Protection {
  return {
    hitMs: Math.max(0, protection.hitMs - Math.max(0, deltaMs)),
    starMs: Math.max(0, protection.starMs - Math.max(0, deltaMs)),
  };
}

export function powerUpMotion(type: string): { vx: number; launchY: number; bounceY: number; gravity: boolean } {
  if (type === 'flower') return { vx: 0, launchY: 0, bounceY: 0, gravity: false };
  if (type === 'star') return { vx: 100, launchY: -420, bounceY: 0, gravity: true };
  return { vx: 75, launchY: 0, bounceY: 0, gravity: true };
}

export function pipeEntryAligned(playerX: number, feetY: number, pipeX: number, pipeTop: number, pipeWidth: number): boolean {
  return Math.abs(playerX - pipeX) <= Math.min(24, pipeWidth / 2 - 12) && Math.abs(feetY - pipeTop) <= 8;
}

export type PiranhaPhase = 'hidden' | 'rising' | 'open' | 'falling';
export interface PiranhaState { phase: PiranhaPhase; elapsedMs: number }
const PIRANHA_DURATIONS: Record<PiranhaPhase, number> = { hidden: 1800, rising: 650, open: 1400, falling: 650 };
const NEXT_PHASE: Record<PiranhaPhase, PiranhaPhase> = { hidden: 'rising', rising: 'open', open: 'falling', falling: 'hidden' };
export function stepPiranha(state: PiranhaState, deltaMs: number, playerNear: boolean): { state: PiranhaState; exposure: number } {
  let phase = state.phase;
  let elapsedMs = state.elapsedMs + Math.max(0, deltaMs);
  while (elapsedMs >= PIRANHA_DURATIONS[phase]) {
    if (phase === 'hidden' && playerNear) {
      elapsedMs = PIRANHA_DURATIONS.hidden;
      break;
    }
    elapsedMs -= PIRANHA_DURATIONS[phase];
    phase = NEXT_PHASE[phase];
  }
  const exposure = phase === 'hidden' ? 0 : phase === 'open' ? 1
    : phase === 'rising' ? elapsedMs / PIRANHA_DURATIONS.rising : 1 - elapsedMs / PIRANHA_DURATIONS.falling;
  return { state: { phase, elapsedMs }, exposure };
}

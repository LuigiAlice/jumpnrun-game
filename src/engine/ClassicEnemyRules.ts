/** Renderer-independent behavior for the extra classic platform-game enemy roles. */
export const BOMB_FUSE_MS = 1500;
export const BOMB_BLAST_RADIUS = 90;

export function parakoopaOffset(gameTimeMs: number, phaseMs = 0): number {
  return Math.sin((gameTimeMs + phaseMs) * Math.PI * 2 / 2400) * 48;
}

export function advanceBombFuse(remainingMs: number, deltaMs: number): { remainingMs: number; explode: boolean; lit: boolean } {
  const remaining = Math.max(0, remainingMs - Math.max(0, deltaMs));
  return { remainingMs: remaining, explode: remaining === 0, lit: Math.floor(remaining / 100) % 2 === 0 };
}

export function fireHitEffect(type: string): 'resist' | 'ignite' | 'defeat' {
  return type === 'buzzy_beetle' ? 'resist' : type === 'bobomb' ? 'ignite' : 'defeat';
}

export function isInBombBlast(x: number, y: number, targetX: number, targetY: number): boolean {
  return (x - targetX) ** 2 + (y - targetY) ** 2 <= BOMB_BLAST_RADIUS ** 2;
}

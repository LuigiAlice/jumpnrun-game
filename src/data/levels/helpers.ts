// Level creation helpers - separated to avoid circular imports
import type { PlatformType, EnemyType, QuestionBlockContent, DecorationType, Platform, Goal, MovingPlatform, LevelData } from './index';
import { Physics } from '../../engine/Physics';
import { getBiomeGravity } from '../../config';

export type { LevelData };
export const createPlat = (x: number, y: number, w: number, h: number, type: PlatformType): Platform => ({ x, y, w, h, type });
export const createCoin = (x: number, y: number) => ({ x, y });
export const createQB = (x: number, y: number, contents: QuestionBlockContent) => ({ x, y, contents });
export const createEnemy = (x: number, y: number, type: EnemyType) => ({ x, y, type });
export const createDeco = (x: number, y: number, type: DecorationType) => ({ x, y, type });
export const createGoal = (x: number, y: number, points: number, difficulty: Goal['difficulty']): Goal => ({ x, y, points, difficulty });
export const createMovingPlat = (x: number, y: number, w: number, h: number, type: PlatformType, moveType: 'horizontal' | 'vertical' | 'circular', range: number, speed: number): MovingPlatform => ({ x, y, w, h, type, moveType, range, speed });
export const createSpring = (x: number, y: number) => ({ x, y });
export const createSpike = (x: number, y: number) => ({ x, y });

// ---------------------------------------------------------------------------
// Phase 9: diverse level building blocks
// Geometry helpers below take ABSOLUTE coordinates (no S scaling) and a
// `baseTop` value = top edge (y) of the ground they sit on. This keeps the
// vertical math exact: platform center y = top + h/2.
// ---------------------------------------------------------------------------

const PLATFORM_H = 24;

/** Solid segment from left/right edge + top edge (top = y - h/2). Single source for biome files. */
export const seg = (l: number, r: number, top: number, h: number, type: PlatformType): Platform =>
  createPlat((l + r) / 2, top + h / 2, r - l, h, type);

export const createCrumblePlat = (x: number, y: number, w: number, h: number, type: PlatformType = 'platform_medium'): Platform =>
  ({ x, y, w, h, type, crumble: true });

export const createConveyorPlat = (x: number, y: number, w: number, h: number, type: PlatformType, dir: 1 | -1, speed: number = 80): Platform =>
  ({ x, y, w, h, type, conveyor: dir * speed });

export const createIcePlat = (x: number, y: number, w: number, h: number, type: PlatformType = 'ice'): Platform =>
  ({ x, y, w, h, type });

export const createCheckpoint = (x: number, y: number) => ({ x, y });
export const createWindZone = (x: number, y: number, w: number, h: number, strength: number = 140, intervalMs: number = 3000) =>
  ({ x, y, w, h, strength, intervalMs });
export const createWaterZone = (x: number, y: number, w: number, h: number) => ({ x, y, w, h });
export const createKey = (x: number, y: number) => ({ x, y });
export const createDoor = (x: number, y: number, w: number, h: number) => ({ x, y, w, h });
export const createCannon = (x: number, y: number, dir: 1 | -1, intervalMs: number = 2500, speed: number = 260) =>
  ({ x, y, dir, intervalMs, speed });

/** Ascending steps. startX = left edge, baseTop = ground top edge. */
export const staircase = (startX: number, baseTop: number, steps: number, rise: number = 70, width: number = 140, gapX: number = 40, type: PlatformType = 'platform_medium'): Platform[] => {
  const plats: Platform[] = [];
  for (let i = 0; i < steps; i++) {
    plats.push(createPlat(startX + i * (width + gapX) + width / 2, baseTop - rise * (i + 1) + PLATFORM_H / 2, width, PLATFORM_H, type));
  }
  return plats;
};

/** Hand-placed multi-level terrain. Each spec: dx/dy from startX/baseTop. */
export const plateauSection = (startX: number, baseTop: number, specs: { dx: number; dy: number; w: number; h?: number; type?: PlatformType }[]): Platform[] =>
  specs.map(s => {
    const h = s.h ?? 40;
    return createPlat(startX + s.dx + s.w / 2, baseTop - s.dy + h / 2, s.w, h, s.type ?? 'stone');
  });

/** Pit floor below the surrounding ground (the surrounding ground forms the ledges). */
export const pitWithLedges = (pitStart: number, baseTop: number, pitWidth: number, pitDepth: number = 160, type: PlatformType = 'stone'): Platform[] => {
  const floor = createPlat(pitStart + pitWidth / 2, baseTop + pitDepth + 20, pitWidth, 40, type);
  return [floor];
};

/** Two parallel routes: safe lower ground, risky upper route. */
export const twoTierSection = (startX: number, baseTop: number, length: number, lowerType: PlatformType = 'stone', upperType: PlatformType = 'platform_medium'): Platform[] => {
  const plats: Platform[] = [];
  plats.push(createPlat(startX + length / 2, baseTop + 20, length, 40, lowerType));
  const upperTop = baseTop - 160;
  const segW = Math.min(180, length / 3 - 60);
  for (let i = 0; i < 3; i++) {
    const cx = startX + length * (i + 0.5) / 3;
    plats.push(createPlat(cx, upperTop + PLATFORM_H / 2, segW, PLATFORM_H, upperType));
  }
  return plats;
};

/** Floating island cluster with explicit absolute offsets. */
export const islandCluster = (startX: number, baseTop: number, specs: { dx: number; dy: number; w: number; type?: PlatformType }[]): Platform[] =>
  specs.map(s => createPlat(startX + s.dx + s.w / 2, baseTop - s.dy + PLATFORM_H / 2, s.w, PLATFORM_H, s.type ?? 'platform_medium'));

/** Alternating zig-zag climb (less symmetric than verticalClimb). */
export const zigzagClimb = (startX: number, baseTop: number, steps: number = 6, rise: number = 90, width: number = 110, swing: number = 130, type: PlatformType = 'platform_medium'): Platform[] => {
  const plats: Platform[] = [];
  for (let i = 0; i < steps; i++) {
    const dir = i % 2 === 0 ? 1 : -1;
    plats.push(createPlat(startX + swing * dir, baseTop - rise * (i + 1) + PLATFORM_H / 2, width, PLATFORM_H, type));
  }
  return plats;
};

/** Ceiling overhang with a gap: forces a low/high route decision. */
export const overhangSection = (startX: number, baseTop: number, width: number, gapStart: number, gapWidth: number, type: PlatformType = 'stone'): Platform[] => {
  const plats: Platform[] = [];
  const h = 40;
  const leftW = Math.max(40, gapStart - startX);
  plats.push(createPlat(startX + leftW / 2, baseTop + 20, leftW, h, type));
  const rightW = Math.max(40, startX + width - (gapStart + gapWidth));
  plats.push(createPlat(gapStart + gapWidth + rightW / 2, baseTop + 20, rightW, h, type));
  return plats;
};

/** Arc of coins following a jump trajectory. */
export const coinArc = (cx: number, cy: number, count: number = 5, radius: number = 70, height: number = 70) => {
  const coins: { x: number; y: number }[] = [];
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const angle = Math.PI * t;
    coins.push({ x: cx + Math.cos(Math.PI - angle) * radius, y: cy - Math.sin(angle) * height });
  }
  return coins;
};

/** Diamond shaped coin cluster (risk/reward marker). */
export const coinDiamond = (cx: number, cy: number, size: number = 60) => ([
  { x: cx, y: cy - size / 2 },
  { x: cx - size / 2, y: cy },
  { x: cx + size / 2, y: cy },
  { x: cx, y: cy + size / 2 },
]);

/** Evenly spaced coin trail between two points. */
export const coinTrail = (x1: number, y1: number, x2: number, y2: number, count: number) => {
  const coins: { x: number; y: number }[] = [];
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0.5 : i / (count - 1);
    coins.push({ x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t });
  }
  return coins;
};

/** Vertical coin ladder (marks a climb). */
export const coinLadder = (x: number, yBottom: number, yTop: number, count: number = 5) =>
  coinTrail(x, yBottom, x, yTop, count);


export const canBreakBrick = (isBig: boolean, platformType: string, isLoadBearing: boolean): boolean =>
  platformType === 'brick' && isBig && !isLoadBearing;

export function isBrickLoadBearing(level: LevelData, brick: { x: number; y: number; type: string }): boolean {
  const indices: number[] = [];
  level.platforms.forEach((p, idx) => {
    if ((p.type as string) === brick.type && p.x === brick.x && p.y === brick.y) {
      indices.push(idx);
    }
  });
  if (indices.length === 0) return false;
  const gravity = getBiomeGravity(level.biome);
  for (const idx of indices) {
    const remaining = level.platforms.filter((_, j) => j !== idx);
    const physics = new Physics(remaining, level.width, level.height, level.movingPlatforms || [], gravity);
    const result = physics.isFullyTraversableToGoal(level.playerStart.x, level.playerStart.y, level.goal.x);
    if (!result.traversable) return true;
  }
  return false;
}

export interface GapPlatformOptions {
  /** Platform widths in px, cycled; default 100. */
  widths?: number[];
  /** Vertical offsets above baseY, cycled; default 60 + i*20. */
  dy?: number[];
  /** Platform types, cycled; default easy/medium/hard. */
  types?: PlatformType[];
  /** Per-platform static x offset added to computed position (deterministic). */
  xOffsets?: number[];
}

export const gapWithPlatforms = (S: number, startX: number, baseY: number, gapWidth: number, platformCount: number, opts?: GapPlatformOptions): any[] => {
  const plats = [];
  const scaledGap = gapWidth * S;
  const startPx = startX * S;
  const stepSize = scaledGap / (platformCount + 1);
  
  for (let i = 0; i < platformCount; i++) {
    const px = startPx + stepSize * (i + 1) + (opts?.xOffsets?.[i % (opts.xOffsets.length || 1)] ?? 0) * S;
    const py = opts?.dy ? baseY - opts.dy[i % opts.dy.length] : baseY - 60 - (i * 20);
    const pw = opts?.widths ? opts.widths[i % opts.widths.length] * S : 100;
    const ptype: PlatformType = opts?.types
      ? opts.types[i % opts.types.length]
      : (i % 3 === 0 ? 'platform_easy' : (i % 3 === 1 ? 'platform_medium' : 'platform_hard'));
    plats.push(createPlat(px, py, pw, 24, ptype));
  }
  return plats;
};

export const pipeSection = (S: number, startX: number, y: number, pipeCount: number): any[] => {
  const plats = [];
  for (let i = 0; i < pipeCount; i++) {
    const px = (startX + 300 + i * 350) * S;
    const ph = 64;
    plats.push(createPlat(px, y, 64, ph, 'pipe'));
    plats.push(createPlat(px, y - ph / 2 - 12, 80, 24, 'pipe_top'));
  }
  return plats;
};

export const verticalClimb = (S: number, startX: number, baseY: number, groundType: PlatformType = 'grass'): any[] => {
  const plats = [];
  plats.push(createPlat(startX * S, baseY - 60, 100 * S, 24, 'platform_easy'));
  plats.push(createPlat((startX + 180) * S, baseY - 100, 100 * S, 24, 'platform_medium'));
  plats.push(createPlat((startX + 360) * S, baseY - 140, 100 * S, 24, 'platform_hard'));
  plats.push(createPlat((startX + 540) * S, baseY - 180, 120 * S, 28, 'platform_medium'));
  plats.push(createPlat((startX + 720) * S, baseY - 140, 100 * S, 24, 'platform_hard'));
  plats.push(createPlat((startX + 900) * S, baseY - 100, 100 * S, 24, 'platform_medium'));
  plats.push(createPlat((startX + 1080) * S, baseY - 60, 100 * S, 24, 'platform_easy'));
  return plats;
};
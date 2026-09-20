import { describe, it, expect } from 'vitest';
import { ALL_LEVELS, getLevel, getLevelCount, isBrickLoadBearing } from '../src/data/levels/index';
import { Physics } from '../src/engine/Physics';
import { getBiomeGravity } from '../src/config';
import type { LevelData } from '../src/data/levels/index';

/**
 * Scoped audit for a single biome during the Phase 9 rollout.
 * Usage: BIOME=grasslands npx vitest run tests/BiomeAudit.test.ts
 */
const biome = process.env.BIOME;

const indices: number[] = [];
for (let i = 0; i < getLevelCount(); i++) {
  if (ALL_LEVELS[i].biome === biome) indices.push(i);
}
const rawLevels: LevelData[] = indices.map(i => ALL_LEVELS[i]);
const levels: LevelData[] = indices.map(i => getLevel(i));

const label = (level: LevelData): string => `L${level.id} "${level.name}" (${level.biome})`;

const platformTop = (p: { y: number; h: number }): number => p.y - p.h / 2;

const findSpringSupport = (level: LevelData, spring: { x: number; y: number }): boolean =>
  level.platforms.some(p => Math.abs(platformTop(p) - spring.y) < 0.5 && Math.abs(p.x - spring.x) <= p.w / 2);

const findSpikeSupport = (level: LevelData, spike: { x: number; y: number }): boolean =>
  level.platforms.some(p => Math.abs(platformTop(p) - (spike.y + 8)) < 0.5 && Math.abs(p.x - spike.x) <= p.w / 2 - 12);

describe.skipIf(!biome)(`BiomeAudit: ${biome}`, () => {
  it('has exactly 6 levels', () => {
    expect(levels).toHaveLength(6);
  });

  it('every level is traversable to the goal', { timeout: 60000 }, () => {
    const failures: string[] = [];
    for (const level of levels) {
      const physics = new Physics(level.platforms, level.width, level.height, level.movingPlatforms || [], getBiomeGravity(level.biome));
      const result = physics.isFullyTraversableToGoal(level.playerStart.x, level.playerStart.y, level.goal.x);
      if (!result.traversable) {
        const unreachable = result.unreachablePlatforms.slice(0, 5).map(p => `(${p.x}, ${p.y}, ${p.type})`).join(', ');
        failures.push(`${label(level)}: not traversable — ${unreachable}`);
      }
    }
    expect(failures, failures.join('\n')).toHaveLength(0);
  });

  it('levels are authored solvable (ensureSolvable adds nothing)', () => {
    const failures: string[] = [];
    rawLevels.forEach((level, i) => {
      const fixed = levels[i];
      if (fixed.platforms.length !== level.platforms.length) {
        failures.push(`${label(level)}: ensureSolvable had to add ${fixed.platforms.length - level.platforms.length} platform(s)`);
      }
    });
    expect(failures, failures.join('\n')).toHaveLength(0);
  });

  it('playerStart and goal sit on platforms', () => {
    for (const level of levels) {
      const physics = new Physics(level.platforms, level.width, level.height, level.movingPlatforms || [], getBiomeGravity(level.biome));
      expect(physics.findPlatformUnderPoint(level.playerStart.x, level.playerStart.y), `${label(level)} playerStart`).not.toBeNull();
      expect(physics.isGoalOnPlatform(level.goal.x, level.goal.y), `${label(level)} goal`).toBe(true);
    }
  });

  it('springs rest exactly on a platform top edge', () => {
    const failures: string[] = [];
    for (const level of levels) {
      for (const spring of level.springs || []) {
        if (!findSpringSupport(level, spring)) failures.push(`${label(level)}: spring (${spring.x}, ${spring.y}) ungrounded`);
      }
    }
    expect(failures, failures.join('\n')).toHaveLength(0);
  });

  it('spike rules hold (grounded, distances, max 4)', () => {
    const failures: string[] = [];
    for (const level of levels) {
      if ((level.spikes || []).length > 4) failures.push(`${label(level)}: >4 spikes`);
      for (const spike of level.spikes || []) {
        if (!findSpikeSupport(level, spike)) failures.push(`${label(level)}: spike (${spike.x}, ${spike.y}) ungrounded`);
        for (const qb of level.questionBlocks || []) {
          if (Math.hypot(spike.x - qb.x, spike.y - qb.y) < 100) failures.push(`${label(level)}: spike too close to QB`);
        }
        if (Math.hypot(spike.x - level.goal.x, spike.y - level.goal.y) < 96) failures.push(`${label(level)}: spike too close to goal`);
        if (Math.hypot(spike.x - level.playerStart.x, spike.y - level.playerStart.y) < 150) failures.push(`${label(level)}: spike too close to start`);
      }
    }
    expect(failures, failures.join('\n')).toHaveLength(0);
  });

  it('coinGoal never exceeds coin count (max 3 gated levels per biome)', () => {
    const gated = levels.filter(l => l.coinGoal !== undefined);
    expect(gated.length).toBeLessThanOrEqual(3);
    for (const level of gated) {
      expect(level.coinGoal!).toBeGreaterThan(0);
      expect(level.coinGoal!).toBeLessThanOrEqual(level.coins.length);
    }
  });

  it('variety: 3+ platform types, 4+ heights, 3+ widths, no stamp over 65%', () => {
    const failures: string[] = [];
    for (const level of levels) {
      const types = new Set(level.platforms.map(p => p.type));
      const heights = new Set(level.platforms.map(p => Math.round(platformTop(p))));
      const widths = new Set(level.platforms.map(p => Math.round(p.w)));
      const stamps = new Map<string, number>();
      for (const p of level.platforms) {
        const key = `${Math.round(p.w)}x${Math.round(p.h)}`;
        stamps.set(key, (stamps.get(key) || 0) + 1);
      }
      const maxStamp = Math.max(...stamps.values());
      if (types.size < 3) failures.push(`${label(level)}: ${types.size} platform types`);
      if (heights.size < 4) failures.push(`${label(level)}: ${heights.size} distinct heights`);
      if (widths.size < 3) failures.push(`${label(level)}: ${widths.size} distinct widths`);
      if (maxStamp / level.platforms.length > 0.65) failures.push(`${label(level)}: one stamp (${maxStamp}/${level.platforms.length})`);
    }
    expect(failures, failures.join('\n')).toHaveLength(0);
  });

  it('brick removal stays safe (load-bearing invariant)', { timeout: 120000 }, () => {
    const failures: string[] = [];
    for (const level of levels) {
      const brickIndices: number[] = [];
      level.platforms.forEach((p, idx) => { if (p.type === 'brick') brickIndices.push(idx); });
      for (const idx of brickIndices) {
        const brick = level.platforms[idx];
        const remaining = level.platforms.filter((_, j) => j !== idx);
        const physics = new Physics(remaining, level.width, level.height, level.movingPlatforms || [], getBiomeGravity(level.biome));
        const result = physics.isFullyTraversableToGoal(level.playerStart.x, level.playerStart.y, level.goal.x);
        if (!result.traversable && !isBrickLoadBearing(level, { x: brick.x, y: brick.y, type: 'brick' })) {
          failures.push(`${label(level)}: brick (${brick.x}, ${brick.y}) unsafe`);
        }
      }
    }
    expect(failures, failures.join('\n')).toHaveLength(0);
  });

  it('phase 9 feature expectations for this biome', () => {
    const has = (fn: (l: LevelData) => boolean) => levels.some(fn);
    const featureMap: Record<string, Record<string, boolean>> = {
      'grasslands': { windZones: true, checkpoints: false },
      'desert': { windZones: true, keys: true, goals: true },
      'water': { waterZones: true, rising: true },
      'ice-snow': { ice: true },
      'sky-clouds': { crumble: true, windZones: true },
      'forest': { crumble: false },
      'village': { windZones: true, keys: true, checkpoints: true },
      'beach-island': { waterZones: true, rising: true },
      'factory': { conveyor: true, cannons: true },
      'volcano-lava': { crumble: false, rising: true },
      'haunted-mansion': { keys: true, hidden: true },
      'ruins': { crumble: true, keys: true, hidden: true },
      'canyon-base': { crumble: true, windZones: true, cannons: true },
      'space-star': { crumble: true },
      'castle-final': { cannons: true, keys: true },
    };
    const expected = featureMap[biome!] || {};
    if (expected.crumble) expect(has(l => l.platforms.some(p => p.crumble)), 'crumble platforms missing').toBe(true);
    if (expected.ice) {
      const iceLevels = levels.filter(l => l.platforms.some(p => p.type === 'ice'));
      expect(iceLevels.length, 'ice platforms needed in >=2 levels').toBeGreaterThanOrEqual(2);
    }
    if (expected.conveyor) {
      const beltLevels = levels.filter(l => l.platforms.some(p => p.conveyor !== undefined));
      expect(beltLevels.length, 'conveyor belts needed in >=2 levels').toBeGreaterThanOrEqual(2);
    }
    if (expected.windZones) expect(has(l => (l.windZones || []).length > 0), 'wind zones missing').toBe(true);
    if (expected.waterZones) expect(has(l => (l.waterZones || []).length > 0), 'water zones missing').toBe(true);
    if (expected.cannons) expect(has(l => (l.cannons || []).length > 0), 'cannons missing').toBe(true);
    if (expected.keys) expect(has(l => (l.keys || []).length > 0), 'keys/doors missing').toBe(true);
    if (expected.goals) expect(has(l => (l.goals || []).length > 0), 'multi-goal flags missing').toBe(true);
    if (expected.rising) expect(has(l => !!l.rising), 'rising hazard missing').toBe(true);
    if (expected.hidden) expect(has(l => l.platforms.some(p => p.type === 'hidden' || p.type === 'brick_secret' || p.type === 'brick_multi')), 'hidden/secret bricks missing').toBe(true);
    if (expected.checkpoints) {
      const long = levels.filter(l => l.width >= 16000);
      for (const level of long) expect((level.checkpoints || []).length, `${label(level)} needs checkpoints`).toBeGreaterThan(0);
    }
  });
});

import { describe, it, expect } from 'vitest';
import { ALL_LEVELS, getLevel, getLevelCount, ensureSolvable } from '../src/data/levels/index';
import {
  createPlat, createCrumblePlat, createConveyorPlat, createIcePlat, createCheckpoint,
  createWindZone, createWaterZone, createKey, createDoor, createCannon,
  staircase, plateauSection, pitFloor, twoTierSection, islandCluster, zigzagClimb,
  overhangSection, coinArc, coinDiamond, coinTrail, coinLadder, canBreakBrick, isBrickLoadBearing,
} from '../src/data/levels/helpers';
import type { LevelData } from '../src/data/levels/index';
import { Physics } from '../src/engine/Physics';
import { getBiomeGravity } from '../src/config';

const levels = ALL_LEVELS;
const playable = (): LevelData[] => Array.from({ length: getLevelCount() }, (_, i) => getLevel(i));

const label = (level: LevelData): string => `L${level.id} "${level.name}" (${level.biome})`;

const biomesWith = (predicate: (l: LevelData) => boolean): Set<string> =>
  new Set(levels.filter(predicate).map(l => l.biome));

const hasSupport = (level: LevelData, point: { x: number; y: number }, range = 90): boolean =>
  level.platforms.some(p => {
    const top = p.y - p.h / 2;
    const withinX = Math.abs(point.x - p.x) <= p.w / 2 + 24;
    const withinY = point.y >= top - range && point.y <= top + 24;
    return p.type !== 'lava' && withinX && withinY;
  });

describe('Phase 9: helper building blocks', () => {
  it('crumble and conveyor helpers carry their extra data', () => {
    const crumble = createCrumblePlat(100, 200, 120, 24);
    expect(crumble.crumble).toBe(true);
    expect(crumble.type).toBe('platform_medium');
    const beltR = createConveyorPlat(200, 300, 160, 24, 'metal', 1, 90);
    expect(beltR.conveyor).toBe(90);
    const beltL = createConveyorPlat(300, 300, 160, 24, 'metal', -1, 60);
    expect(beltL.conveyor).toBe(-60);
    expect(createIcePlat(50, 60, 100, 24).type).toBe('ice');
  });

  it('staircase rises monotonically and stays jumpable', () => {
    const steps = staircase(1000, 530, 5, 70, 140, 40);
    expect(steps).toHaveLength(5);
    const tops = steps.map(p => p.y - p.h / 2);
    for (let i = 1; i < tops.length; i++) expect(tops[i]).toBeLessThan(tops[i - 1]);
    const rises = tops.slice(0, -1).map((t, i) => t - tops[i + 1]);
    expect(Math.max(...rises)).toBeLessThanOrEqual(160);
    expect(new Set(steps.map(p => p.w)).size).toBe(1);
  });

  it('plateauSection, pitFloor and overhangSection build terrain', () => {
    const plats = plateauSection(1000, 530, [{ dx: 0, dy: 0, w: 300 }, { dx: 400, dy: 160, w: 200 }]);
    expect(plats).toHaveLength(2);
    expect(plats[1].y).toBeLessThan(plats[0].y);
    const pit = pitFloor(1500, 530, 240, 160);
    expect(pit[0].y - pit[0].h / 2).toBeGreaterThan(530);
    const over = overhangSection(2000, 530, 500, 2100, 120);
    expect(over).toHaveLength(2);
    expect(over[0].x + over[0].w / 2).toBeLessThanOrEqual(2100);
    expect(over[1].x - over[1].w / 2).toBeGreaterThanOrEqual(2220);
  });

  it('twoTierSection, islandCluster and zigzagClimb add vertical variety', () => {
    const tiers = twoTierSection(3000, 530, 600);
    const lower = tiers.filter(p => Math.abs(p.y - 550) < 5);
    const upper = tiers.filter(p => p.y < 420);
    expect(lower.length).toBe(1);
    expect(upper.length).toBeGreaterThanOrEqual(3);
    const islands = islandCluster(4000, 530, [
      { dx: 0, dy: 0, w: 120 }, { dx: 200, dy: 90, w: 90 }, { dx: 380, dy: 40, w: 160 },
    ]);
    expect(islands).toHaveLength(3);
    expect(new Set(islands.map(p => Math.round(p.y))).size).toBe(3);
    const zig = zigzagClimb(5000, 530, 4, 90, 110, 130);
    expect(zig).toHaveLength(4);
    expect(zig[0].x).not.toBe(zig[1].x);
    expect(zig[0].x).toBe(zig[2].x);
  });

  it('coin pattern helpers produce distinct deterministic layouts', () => {
    const arc = coinArc(1000, 400, 5, 80, 60);
    expect(arc).toHaveLength(5);
    expect(arc[2].y).toBeLessThan(arc[0].y);
    expect(arc[0].x).toBeLessThan(arc[4].x);
    const diamond = coinDiamond(500, 300, 80);
    expect(diamond).toHaveLength(4);
    expect(new Set(diamond.map(c => `${c.x},${c.y}`)).size).toBe(4);
    const trail = coinTrail(0, 0, 100, 200, 6);
    expect(trail).toHaveLength(6);
    expect(trail[5].y).toBe(200);
    const ladder = coinLadder(700, 500, 300, 5);
    expect(ladder[0].y).toBe(500);
    expect(ladder[4].y).toBe(300);
  });
});

describe('Phase 9: data-driven level elements', () => {
  it('crumble platforms appear in the finale biomes (sky, ruins, canyon, space)', () => {
    const crumbleBiomes = biomesWith(l => l.platforms.some(p => p.crumble));
    for (const biome of ['sky-clouds', 'ruins', 'canyon-base', 'space-star']) {
      expect(crumbleBiomes.has(biome), `no crumble platforms in ${biome}`).toBe(true);
    }
    expect(crumbleBiomes.size).toBeGreaterThanOrEqual(6);
  });

  it('ice platforms exist in ice-snow and nowhere else', () => {
    const iceLevels = levels.filter(l => l.platforms.some(p => p.type === 'ice'));
    expect(iceLevels.filter(l => l.biome === 'ice-snow').length).toBeGreaterThanOrEqual(2);
    expect(iceLevels.every(l => l.biome === 'ice-snow')).toBe(true);
  });

  it('conveyor belts exist in factory levels', () => {
    const beltLevels = levels.filter(l => l.platforms.some(p => p.conveyor !== undefined));
    expect(beltLevels.filter(l => l.biome === 'factory').length).toBeGreaterThanOrEqual(2);
    expect(beltLevels.every(l => l.biome === 'factory')).toBe(true);
    expect(beltLevels.some(l => l.platforms.some(p => (p.conveyor ?? 0) < 0))).toBe(true);
    expect(beltLevels.some(l => l.platforms.some(p => (p.conveyor ?? 0) > 0))).toBe(true);
  });

  it('checkpoints have safe support and protect every long level', () => {
    const cpLevels = levels.filter(l => (l.checkpoints || []).length > 0);
    expect(cpLevels.length).toBeGreaterThanOrEqual(8);
    for (const level of levels.filter(l => l.width >= 16000)) {
      expect(level.checkpoints?.length, `${label(level)} needs a checkpoint`).toBeGreaterThan(0);
    }
    for (const level of cpLevels) {
      for (const cp of level.checkpoints || []) {
        expect(hasSupport(level, cp), `${label(level)}: checkpoint (${cp.x}, ${cp.y}) floating`).toBe(true);
      }
    }
  });

  it('wind zones appear in at least four windy biomes', () => {
    const windBiomes = biomesWith(l => (l.windZones || []).length > 0);
    expect(windBiomes.size).toBeGreaterThanOrEqual(4);
    for (const biome of ['grasslands', 'desert', 'sky-clouds', 'village', 'canyon-base']) {
      expect(windBiomes.has(biome), `no wind zones in ${biome}`).toBe(true);
    }
    for (const level of levels) {
      for (const z of level.windZones || []) {
        expect(z.w).toBeGreaterThan(0);
        expect(z.h).toBeGreaterThan(0);
        expect(z.strength).toBeGreaterThan(0);
        expect(z.x).toBeGreaterThanOrEqual(0);
        expect(z.x + z.w).toBeLessThanOrEqual(level.width + 1);
      }
    }
  });

  it('water zones appear in water and beach-island', () => {
    const waterBiomes = biomesWith(l => (l.waterZones || []).length > 0);
    expect(waterBiomes.has('water')).toBe(true);
    expect(waterBiomes.has('beach-island')).toBe(true);
    const levelsWithZones = levels.filter(l => (l.waterZones || []).length > 0);
    expect(levelsWithZones.length).toBeGreaterThanOrEqual(4);
  });

  it('goal and extra goals stay inside the level width', () => {
    const failures: string[] = [];
    for (const level of levels) {
      if (level.goal.x > level.width) {
        failures.push(`${label(level)}: goal.x ${level.goal.x} > width ${level.width}`);
      }
      for (const g of level.goals || []) {
        if (!(g.x > 0 && g.x < level.width)) {
          failures.push(`${label(level)}: extra goal x=${g.x} outside (0, ${level.width})`);
        }
      }
    }
    expect(failures, failures.join('\n')).toHaveLength(0);
  });

  it('every wide level has at least one checkpoint', () => {
    const failures: string[] = [];
    for (const level of levels) {
      if (level.width >= 16000 && (level.checkpoints || []).length < 1) {
        failures.push(`${label(level)}: width ${level.width} but no checkpoint`);
      }
    }
    expect(failures, failures.join('\n')).toHaveLength(0);
  });

  it('keys and doors are paired and never block start or goal', () => {
    const keyLevels = levels.filter(l => (l.keys || []).length > 0);
    expect(keyLevels.length).toBeGreaterThanOrEqual(3);
    for (const level of levels) {
      const doors = level.doors || [];
      if (doors.length > 0) {
        expect((level.keys || []).length, `${label(level)}: doors without keys`).toBeGreaterThan(0);
      }
      for (const door of doors) {
        expect(door.w).toBeGreaterThan(0);
        expect(door.h).toBeGreaterThan(0);
        expect(Math.abs(door.x - level.playerStart.x) > 150 || Math.abs(door.y - level.playerStart.y) > 120,
          `${label(level)}: door blocks player start`).toBe(true);
        const doorLeft = door.x - door.w / 2;
        const doorRight = door.x + door.w / 2;
        const goalInside = level.goal.x > doorLeft - 40 && level.goal.x < doorRight + 40;
        expect(goalInside, `${label(level)}: door blocks the goal`).toBe(false);
      }
    }
  });

  it('cannons exist in factory, castle and canyon', () => {
    const cannonBiomes = biomesWith(l => (l.cannons || []).length > 0);
    expect(cannonBiomes.has('factory')).toBe(true);
    expect(cannonBiomes.has('castle-final')).toBe(true);
    for (const level of levels) {
      for (const c of level.cannons || []) {
        expect([1, -1]).toContain(c.dir);
        if (c.intervalMs !== undefined) expect(c.intervalMs).toBeGreaterThanOrEqual(800);
        if (c.speed !== undefined) expect(c.speed).toBeGreaterThanOrEqual(60);
      }
    }
  });

  it('multi-goal levels offer extra scoring flags', () => {
    const multi = levels.filter(l => (l.goals || []).length > 0);
    expect(multi.length).toBeGreaterThanOrEqual(2);
    for (const level of multi) {
      for (const goal of level.goals || []) {
        expect(goal.points).toBeGreaterThan(0);
        expect(goal.x).toBeGreaterThan(0);
        expect(goal.x).toBeLessThan(level.width);
      }
    }
  });

  it('rising water and lava finales are data-driven', () => {
    expect(levels[17].rising?.kind).toBe('water');
    expect(levels[47].rising?.kind).toBe('water');
    expect(levels[59].rising?.kind).toBe('lava');
    for (const level of levels) {
      if (level.rising) expect(['lava', 'water']).toContain(level.rising.kind);
    }
  });

  it('time-gate levels are achievable within their time bonus', () => {
    const gated = levels.filter(l => l.timeGate !== undefined);
    expect(gated.length).toBeGreaterThanOrEqual(2);
    for (const level of gated) {
      expect(level.timeGate!).toBeGreaterThanOrEqual(5);
      expect(level.timeGate!).toBeLessThanOrEqual(level.timeBonus + 300);
    }
  });

  it('1-UP question blocks appear in several levels', () => {
    const withOneUp = levels.filter(l => l.questionBlocks.some(qb => qb.contents === 'oneup'));
    expect(withOneUp.length).toBeGreaterThanOrEqual(5);
  });

  it('hidden and secret brick types are used in multiple biomes', () => {
    const special = levels.filter(l => l.platforms.some(p =>
      p.type === 'hidden' || p.type === 'brick_secret' || p.type === 'brick_multi'));
    const biomes = new Set(special.map(l => l.biome));
    expect(special.length).toBeGreaterThanOrEqual(4);
    expect(biomes.size).toBeGreaterThanOrEqual(3);
  });
});

describe('Phase 9: diversity invariants', () => {
  it('no level is a flat single-line layout anymore (4+ distinct height levels)', () => {
    const failures: string[] = [];
    for (const level of levels) {
      const tops = new Set(level.platforms.map(p => Math.round(p.y - p.h / 2)));
      if (tops.size < 4) failures.push(`${label(level)}: only ${tops.size} distinct platform heights`);
    }
    expect(failures, failures.join('\n')).toHaveLength(0);
  });

  it('every level uses at least three distinct platform widths', () => {
    const failures: string[] = [];
    for (const level of levels) {
      const widths = new Set(level.platforms.map(p => Math.round(p.w)));
      if (widths.size < 3) failures.push(`${label(level)}: only ${widths.size} distinct widths`);
    }
    expect(failures, failures.join('\n')).toHaveLength(0);
  });

  it('no level consists of one repeated platform stamp (>65% identical w/h)', () => {
    const failures: string[] = [];
    for (const level of levels) {
      const counts = new Map<string, number>();
      for (const p of level.platforms) {
        const key = `${Math.round(p.w)}x${Math.round(p.h)}`;
        counts.set(key, (counts.get(key) || 0) + 1);
      }
      const max = Math.max(...counts.values());
      if (max / level.platforms.length > 0.65) {
        failures.push(`${label(level)}: ${max}/${level.platforms.length} platforms share one stamp`);
      }
    }
    expect(failures, failures.join('\n')).toHaveLength(0);
  });

  it('every biome spans varied terrain heights (>= 6 distinct heights overall)', () => {
    const failures: string[] = [];
    const byBiome = new Map<string, LevelData[]>();
    for (const level of levels) {
      const list = byBiome.get(level.biome) || [];
      list.push(level);
      byBiome.set(level.biome, list);
    }
    for (const [biome, list] of byBiome) {
      const tops = new Set<number>();
      for (const level of list) for (const p of level.platforms) tops.add(Math.round(p.y - p.h / 2));
      if (tops.size < 6) failures.push(`${biome}: only ${tops.size} distinct heights`);
    }
    expect(failures, failures.join('\n')).toHaveLength(0);
  });

  it('all levels are authored solvable (no ensureSolvable patchwork)', () => {
    const failures: string[] = [];
    for (let i = 0; i < getLevelCount(); i++) {
      const raw = ALL_LEVELS[i];
      const fixed = getLevel(i);
      if (fixed.platforms.length !== raw.platforms.length) {
        failures.push(`${label(raw)}: auto-fixer added ${fixed.platforms.length - raw.platforms.length} platform(s)`);
      }
    }
    expect(failures, failures.join('\n')).toHaveLength(0);
  });

  it('at least half of all levels contain a two-tier or pit structure', () => {
    const withTerrain = levels.filter(level => {
      const tops = level.platforms.map(p => p.y - p.h / 2).sort((a, b) => a - b);
      const span = tops[tops.length - 1] - tops[0];
      const hasHighLow = level.platforms.some(a => level.platforms.some(b => (b.y - b.h / 2) - (a.y - a.h / 2) > 220));
      return hasHighLow && span > 260;
    });
    expect(withTerrain.length).toBeGreaterThanOrEqual(45);
  });
});

describe('Phase 9: pinned level signatures stay intact', () => {
  it('grasslands L3 keeps its breakable brick at (1950, 420)', () => {
    const level = levels[2];
    const brick = level.platforms.find(p => p.type === 'brick' && Math.abs(p.x - 1950) < 2 && Math.abs(p.y - 420) < 3);
    expect(brick).toBeDefined();
    const loadBearing = isBrickLoadBearing(level, { x: brick!.x, y: brick!.y, type: 'brick' });
    expect(canBreakBrick(true, 'brick', loadBearing), 'e2e T3 needs a breakable brick').toBe(true);
  });

  it('village L37 keeps a load-bearing brick at (2400, 650)', () => {
    const level = levels[36];
    const brick = level.platforms.find(p => p.type === 'brick' && Math.abs(p.x - 2400) < 2 && Math.abs(p.y - 650) < 12);
    expect(brick).toBeDefined();
    expect(isBrickLoadBearing(level, { x: brick!.x, y: brick!.y, type: 'brick' }), 'e2e T4 needs a load-bearing brick').toBe(true);
  });

  it('grasslands L1 keeps exactly one spring and no spikes', () => {
    expect(levels[0].springs).toHaveLength(1);
    expect(levels[0].spikes || []).toHaveLength(0);
  });

  it('grasslands L1 keeps its pipeWarps', () => {
    const level = levels[0];
    const warps = level.pipeWarps || [];
    expect(warps).toHaveLength(2);
    for (const w of warps) {
      expect(w.pipeY).toBe(506);
      expect(w.pipeX).toBeGreaterThan(0);
      expect(w.pipeX, `pipeX ${w.pipeX} outside level`).toBeLessThan(level.width);
    }
    expect([...warps.map(w => w.targetLevelIndex)].sort((a, b) => a - b)).toEqual([2, 5]);
  });
});

describe('Phase 9: ensureSolvable preserves new fields', () => {
  it('ensureSolvable preserves checkpoints, zones, keys, doors, cannons, goals and timeGate', () => {
    const level: LevelData = {
      id: 4242,
      name: 'Phase9 Synthetic',
      width: 3000,
      height: 800,
      biome: 'grasslands',
      platforms: [
        createPlat(200, 500, 400, 40, 'grass'),
        createCrumblePlat(900, 470, 120, 24),
        createPlat(1800, 500, 600, 40, 'grass'),
      ],
      coins: [],
      questionBlocks: [],
      enemies: [],
      decorations: [],
      playerStart: { x: 200, y: 460 },
      goal: { x: 2100, y: 478 },
      timeBonus: 100,
      checkpoints: [createCheckpoint(400, 460)],
      windZones: [createWindZone(600, 300, 300, 200)],
      waterZones: [createWaterZone(1000, 400, 300, 200)],
      keys: [createKey(700, 400)],
      doors: [createDoor(1200, 460, 40, 90)],
      cannons: [createCannon(1500, 450, -1)],
      goals: [{ x: 2500, y: 460, points: 2000 }],
      timeGate: 30,
    };
    const fixed = ensureSolvable(level);
    expect(fixed.checkpoints).toEqual(level.checkpoints);
    expect(fixed.windZones).toEqual(level.windZones);
    expect(fixed.waterZones).toEqual(level.waterZones);
    expect(fixed.keys).toEqual(level.keys);
    expect(fixed.doors).toEqual(level.doors);
    expect(fixed.cannons).toEqual(level.cannons);
    expect(fixed.goals).toEqual(level.goals);
    expect(fixed.timeGate).toBe(30);
    expect(fixed.platforms.some(p => p.crumble)).toBe(true);
  });

  it('all 90 playable levels still solve with the new fields present', { timeout: 60000 }, () => {
    const failures: string[] = [];
    for (const level of playable()) {
      const physics = new Physics(level.platforms, level.width, level.height, level.movingPlatforms || [], getBiomeGravity(level.biome));
      const solvable = physics.isSolvable(level.playerStart.x, level.playerStart.y, level.goal.x, level.goal.y);
      if (!solvable) failures.push(`${label(level)}: isSolvable=false`);
    }
    expect(failures, failures.join('\n')).toHaveLength(0);
  });
});

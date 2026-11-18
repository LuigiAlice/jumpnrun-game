import { describe, expect, it } from 'vitest';
import { ALL_LEVELS } from '../src/data/levels/index';
import type { LevelData, Platform } from '../src/data/levels/index';
import { deepenSafeFoundation, NATURE_LEVEL_PLANS, polishNatureLevel } from '../src/data/levels/naturePolish';
import { Physics } from '../src/engine/Physics';
import { getBiomeGravity } from '../src/config';

const natureLevels = ALL_LEVELS.filter(level => NATURE_LEVEL_PLANS[level.id]);
const block: Platform = { x: 500, y: 620, w: 400, h: 40, type: 'sand' };
const fixture = (changes: Partial<LevelData> = {}): LevelData => ({
  id: 7, name: 'Safety fixture', biome: 'desert', width: 1600, height: 900,
  platforms: [block], coins: [], questionBlocks: [], enemies: [], decorations: [],
  playerStart: { x: 340, y: 580 }, goal: { x: 660, y: 592 }, timeBonus: 120,
  ...changes,
});

describe('Nature level polish', () => {
  it('gives all 42 nature levels a distinct authored idea and reward anchor', () => {
    expect(natureLevels).toHaveLength(42);
    expect(new Set(Object.values(NATURE_LEVEL_PLANS).map(plan => plan.idea)).size).toBe(42);
    for (const level of natureLevels) {
      const plan = NATURE_LEVEL_PLANS[level.id];
      expect(level.platforms.some(p => p.x === plan.reward && p.w >= 240), `L${level.id} reward shelf`).toBe(true);
      expect(level.platforms.some(p => p.x === plan.recovery && p.w >= 240), `L${level.id} recovery shelf`).toBe(true);
      expect(level.platforms.some(p => p.h >= (level.biome === 'sky-clouds' ? 60 : 184)), `L${level.id} has substantial scenery`).toBe(true);
    }
  });

  it('deepens terrain without changing jump tops or covering lower routes and collectibles', () => {
    const level = fixture();
    const deep = deepenSafeFoundation(level, block, 144);
    expect(deep.y - deep.h / 2).toBe(block.y - block.h / 2);
    expect(deep.h).toBe(184);
    expect(block.h).toBe(40);
    const floorBelow = { ...block, y: 780, h: 24 };
    expect(deepenSafeFoundation(fixture({ platforms: [block, floorBelow] }), block, 144)).toEqual(block);
    expect(deepenSafeFoundation(fixture({ coins: [{ x: 500, y: 720 }] }), block, 144)).toEqual(block);
    const mover = { x: 500, y: 760, w: 80, h: 24, type: 'platform_easy' as const, moveType: 'vertical' as const, range: 80, speed: 20 };
    expect(deepenSafeFoundation(fixture({ movingPlatforms: [mover] }), block, 144)).toEqual(block);
  });

  it('adds side-entry secret shelters off the main route with headroom for the big player', () => {
    for (const id of [7, 31]) {
      const level = natureLevels.find(level => level.id === id)!;
      const niche = NATURE_LEVEL_PLANS[id].niche!;
      const hiddenRoof = level.platforms.find(p => p.type === 'hidden' && p.x === niche.x)!;
      expect(hiddenRoof, `L${id} hidden reward roof`).toBeDefined();
      expect(niche.floorTop - (hiddenRoof.y + hiddenRoof.h / 2)).toBeGreaterThanOrEqual(64);
      expect(level.platforms.some(p => p.x === niche.x - 88 && p.h === 80)).toBe(true);
      expect(level.platforms.some(p => p.x === niche.x + 88 && p.h === 80)).toBe(false);
      const withoutBonus = level.platforms.filter(p => !(Math.abs(p.x - niche.x) <= 88 && p.y < niche.floorTop && p.y > niche.floorTop - 120));
      const solver = new Physics(withoutBonus, level.width, level.height, level.movingPlatforms || [], getBiomeGravity(level.biome));
      expect(solver.isFullyTraversableToGoal(level.playerStart.x, level.playerStart.y, level.goal.x).traversable).toBe(true);
    }
  });

  it('keeps natural enemy casts while preserving the pinned desert horde and village brick', () => {
    for (const level of natureLevels.filter(level => level.id !== 11)) {
      expect(level.enemies.some(enemy => enemy.type === 'robot'), `L${level.id} natural cast`).toBe(false);
    }
    const horde = natureLevels.find(level => level.id === 11)!;
    expect(horde.enemies.length).toBeGreaterThanOrEqual(15);
    expect(horde.enemies.length).toBeLessThanOrEqual(20);
    for (const type of ['crab','robot','spiny']) expect(horde.enemies.some(enemy => enemy.type === type)).toBe(true);
    expect(natureLevels.find(level => level.id === 37)!.platforms.some(p => p.x === 2400 && p.y === 650 && p.type === 'brick')).toBe(true);
  });

  it('does not mutate source route geometry when applying a curated plan', () => {
    const input = fixture({ platforms: [{ ...block, x: 400 }] });
    const before = JSON.stringify(input);
    const polished = polishNatureLevel(input);
    expect(JSON.stringify(input)).toBe(before);
    expect(polished.platforms[0].y - polished.platforms[0].h / 2).toBe(600);
    expect(polished.playerStart).toEqual(input.playerStart);
    expect(polished.goal).toEqual(input.goal);
  });
});

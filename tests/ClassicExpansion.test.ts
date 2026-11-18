import { describe, expect, it } from 'vitest';
import { ALL_LEVELS, getLevel } from '../src/data/levels/index';
import { CLASSIC_EXPANSION_PLANS, expandClassicLevel } from '../src/data/levels/classicExpansion';
import { Physics } from '../src/engine/Physics';
import { getBiomeGravity } from '../src/config';

const expanded = ALL_LEVELS.filter(level => CLASSIC_EXPANSION_PLANS[level.id]);
const top = (p: { y: number; h: number }) => p.y - p.h / 2;
const bottom = (p: { y: number; h: number }) => p.y + p.h / 2;

function solidAt(level: typeof ALL_LEVELS[number], x: number, y: number, radius: number): boolean {
  return level.platforms.some(p => p.type !== 'hidden' && p.type !== 'lava'
    && x + radius > p.x - p.w / 2 && x - radius < p.x + p.w / 2
    && y + radius > top(p) && y - radius < bottom(p));
}

describe('Classic adventure expansion rollout', () => {
  it('curates twenty-four levels across multiple biomes without overloading the introductory or boss levels', () => {
    expect(expanded).toHaveLength(24);
    expect(new Set(expanded.map(level => level.biome)).size).toBeGreaterThanOrEqual(10);
    expect(new Set(Object.values(CLASSIC_EXPANSION_PLANS).map(plan => plan.idea)).size).toBe(24);
    for (const id of [1, 2, 90]) {
      expect(CLASSIC_EXPANSION_PLANS[id]).toBeUndefined();
      const level = ALL_LEVELS[id - 1];
      expect(level.vines).toBeUndefined();
      expect(level.fireBars).toBeUndefined();
      expect(level.redCoinChallenges).toBeUndefined();
    }
    const types = expanded.flatMap(level => level.enemies.map(enemy => enemy.type));
    for (const type of ['parakoopa', 'buzzy_beetle', 'bobomb']) expect(types).toContain(type);
    const pinnedHorde = ALL_LEVELS[10];
    expect(pinnedHorde.enemies.length).toBeGreaterThanOrEqual(15);
    expect(pinnedHorde.enemies.length).toBeLessThanOrEqual(20);
    for (const type of ['crab', 'robot', 'spiny']) expect(pinnedHorde.enemies.some(enemy => enemy.type === type)).toBe(true);
  });

  it('keeps all ninety goals and bonus platforms solvable without expansion elements or auto-fixer additions', () => {
    for (const [index, level] of ALL_LEVELS.entries()) {
      const solver = new Physics(level.platforms, level.width, level.height, level.movingPlatforms || [], getBiomeGravity(level.biome));
      expect(solver.isFullyTraversableToGoal(level.playerStart.x, level.playerStart.y, level.goal.x).traversable, `L${level.id}`).toBe(true);
      expect(getLevel(index).platforms.length, `L${level.id} must be authored solvable`).toBe(level.platforms.length);
    }
  });

  it('grounds armoured and bomb patrols while giving winged patrols room for their full flight arc', () => {
    for (const level of expanded) for (const enemy of level.enemies) {
      if (enemy.type === 'bobomb' || enemy.type === 'buzzy_beetle') {
        const support = level.platforms.find(p => p.type !== 'lava' && p.type !== 'water'
          && Math.abs(p.x - enemy.x) < p.w / 2 && Math.abs(top(p) - (enemy.y + 18)) < 1);
        expect(support, `L${level.id} ${enemy.type} needs visible ground`).toBeDefined();
        expect(Math.abs(enemy.x - level.playerStart.x)).toBeGreaterThanOrEqual(500);
        expect(Math.abs(enemy.x - level.goal.x)).toBeGreaterThanOrEqual(250);
      }
      if (enemy.type === 'parakoopa') {
        expect(solidAt(level, enemy.x, enemy.y + 48, 17), `L${level.id} lower winged arc crosses terrain`).toBe(false);
        expect(solidAt(level, enemy.x, enemy.y - 48, 17), `L${level.id} upper winged arc crosses terrain`).toBe(false);
      }
    }
  });

  it('places slow fire arms overhead with a safe walking route beneath and clear checkpoint space', () => {
    const levels = expanded.filter(level => level.fireBars?.length);
    expect(levels.length).toBe(4);
    for (const level of levels) {
      expect(level.fireBars).toHaveLength(1);
      for (const arm of level.fireBars!) {
        const radius = arm.length * 16;
        expect(arm.length).toBeGreaterThanOrEqual(3);
        expect(arm.length).toBeLessThanOrEqual(5);
        expect(Math.abs(arm.angularSpeed!)).toBeLessThanOrEqual(1);
        const floor = level.platforms.find(p => p.w >= 600 && Math.abs(p.x - arm.x) + radius < p.w / 2
          && top(p) - arm.y - radius >= 64);
        expect(floor, `L${level.id} fire bar must leave an ordinary walking route`).toBeDefined();
        expect(Math.abs(arm.x - level.playerStart.x)).toBeGreaterThanOrEqual(500);
        expect(Math.abs(arm.x - level.goal.x)).toBeGreaterThanOrEqual(300);
        for (const point of [...level.questionBlocks, ...(level.checkpoints || [])]) {
          expect(Math.hypot(point.x - arm.x, point.y - arm.y), `L${level.id} fire arm crowds a block/checkpoint`).toBeGreaterThanOrEqual(160);
        }
      }
    }
  });

  it('offers timed red coins on contiguous safe shelves with comfortable time at walking speed', () => {
    const levels = expanded.filter(level => level.redCoinChallenges?.length);
    expect(levels.length).toBe(6);
    for (const level of levels) for (const challenge of level.redCoinChallenges!) {
      expect(challenge.coins.length).toBeGreaterThanOrEqual(6);
      expect(challenge.coins.length).toBeLessThanOrEqual(8);
      const points = [challenge, ...challenge.coins];
      const minX = Math.min(...points.map(point => point.x));
      const maxX = Math.max(...points.map(point => point.x));
      const shelf = level.platforms.find(p => p.type !== 'lava' && minX > p.x - p.w / 2 + 20
        && maxX < p.x + p.w / 2 - 20 && points.every(point => top(p) - point.y >= 40 && top(p) - point.y <= 100));
      expect(shelf, `L${level.id} red-coin challenge has no continuous safe shelf`).toBeDefined();
      for (const point of points) expect(solidAt(level, point.x, point.y, 10), `L${level.id} red coin/ring intersects terrain`).toBe(false);
      // A full back-and-forth traversal plus four seconds of reaction time fits the timer.
      expect(challenge.durationMs!).toBeGreaterThan((maxX - minX) / 300 * 2000 + 4000);
      expect(level.coinGoal === undefined || level.coinGoal <= level.coins.length).toBe(true);
    }
  });

  it('puts vines beside existing bonus ledges rather than inside the underside of a solid platform', () => {
    const levels = expanded.filter(level => level.vines?.length);
    expect(levels).toHaveLength(4);
    for (const level of levels) for (const vine of level.vines!) {
      expect(level.platforms.some(p => Math.abs(p.x - vine.x) < p.w / 2 - 12 && Math.abs(top(p) - vine.y) < 1), `L${level.id} vine foot`).toBe(true);
      const tip = vine.y - vine.height;
      expect(level.platforms.some(p => Math.abs(Math.abs(p.x - vine.x) - p.w / 2 - 24) < 1
        && top(p) - tip >= 32 && top(p) - tip <= 48), `L${level.id} vine must end beside a real reward ledge`).toBe(true);
      expect(solidAt(level, vine.x, tip, 10)).toBe(false);
      // Full-width Big-player corridor remains clear, not merely the decorative vine tip.
      for (const platform of level.platforms.filter(p => p.type !== 'hidden' && p.type !== 'lava')) {
        const blocksClimb = vine.x + 12 > platform.x - platform.w / 2
          && vine.x - 12 < platform.x + platform.w / 2
          && top(platform) < vine.y && bottom(platform) > tip - 12;
        expect(blocksClimb, `L${level.id} solid ${platform.type} obstructs the vine corridor`).toBe(false);
      }
    }
  });

  it('applies authored additions deterministically without mutating source arrays', () => {
    const original = ALL_LEVELS[89];
    expect(expandClassicLevel(original)).toBe(original);
    const source = { ...ALL_LEVELS[3], enemies: ALL_LEVELS[3].enemies.map(enemy => enemy.type === 'parakoopa' ? { ...enemy, type: 'koopa' as const, y: enemy.y + 72 } : enemy) };
    const before = JSON.stringify(source);
    expect(expandClassicLevel(source)).toEqual(expandClassicLevel(source));
    expect(JSON.stringify(source)).toBe(before);
  });
});

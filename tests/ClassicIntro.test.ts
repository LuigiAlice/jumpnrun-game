import { describe, expect, it } from 'vitest';
import { GRASSLANDS_LEVELS } from '../src/data/levels/grasslands';
import { PHYSICS } from '../src/config';

const level = GRASSLANDS_LEVELS[0];
const top = (p: { y: number; h: number }) => p.y - p.h / 2;
const left = (p: { x: number; w: number }) => p.x - p.w / 2;
const right = (p: { x: number; w: number }) => p.x + p.w / 2;

describe('Classic grasslands introduction', () => {
  it('provides a continuous safe running lane under the optional first hill', () => {
    const ground = level.platforms
      .filter(p => p.type === 'grass' && top(p) === 530)
      .sort((a, b) => left(a) - left(b));
    let coveredTo = 600;
    for (const p of ground) {
      if (left(p) > coveredTo) break;
      coveredTo = Math.max(coveredTo, right(p));
    }
    expect(coveredTo).toBeGreaterThanOrEqual(1800);
  });

  it('introduces reachable power-up and coin blocks between adjacent bricks', () => {
    for (const [x, contents] of [[300, 'mushroom'], [2350, 'coin']] as const) {
      const block = level.questionBlocks.find(q => q.x === x && q.contents === contents);
      expect(block).toBeDefined();
      if (!block) throw new Error(`Missing introductory block at ${x}`);
      for (const direction of [-1, 1]) {
        expect(level.platforms.some(p => p.type === 'brick'
          && p.x === block.x + direction * 32 && p.y === block.y && p.w === 32))
          .toBe(true);
      }
      const support = level.platforms.find(p => p.type === 'grass'
        && left(p) <= block.x && right(p) >= block.x && top(p) > block.y + 16);
      expect(support).toBeDefined();
      if (!support) throw new Error(`No safe floor below block at ${x}`);
      const clearance = top(support) - (block.y + 16);
      expect(clearance).toBeGreaterThanOrEqual(48);
      expect(clearance).toBeLessThan(PHYSICS.JUMP_SPEED ** 2 / (2 * PHYSICS.GRAVITY));
    }
  });

  it('ends with four contiguous solid steps with safe 32px rises', () => {
    const steps = level.platforms.filter(p => p.type === 'stone'
      && p.x > level.goal.x - 500 && p.x < level.goal.x).sort((a, b) => a.x - b.x);
    expect(steps).toHaveLength(4);
    steps.forEach((step, i) => {
      expect(step.y + step.h / 2).toBe(530);
      expect(step.h).toBe((i + 1) * 32);
      if (i > 0) {
        expect(left(step)).toBe(right(steps[i - 1]));
        expect(top(steps[i - 1]) - top(step)).toBe(32);
      }
    });
  });

  it('guides the final jump with coins above terrain rather than inside the steps', () => {
    const coins = level.coins.filter(c => c.x >= 5500 && c.x <= level.goal.x);
    expect(coins.length).toBeGreaterThanOrEqual(5);
    expect(coins.some(c => c.y < 350)).toBe(true);
    for (const coin of coins) {
      for (const platform of level.platforms) {
        const overlaps = coin.x + 10 > left(platform) && coin.x - 10 < right(platform)
          && coin.y + 10 > top(platform) && coin.y - 10 < platform.y + platform.h / 2;
        expect(overlaps, `Coin at (${coin.x}, ${coin.y}) intersects final terrain`).toBe(false);
      }
    }
  });
});

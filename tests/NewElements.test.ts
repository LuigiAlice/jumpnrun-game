import { describe, it, expect } from 'vitest';
import { ensureSolvable, getLevel, getLevelCount } from '../src/data/levels/index';
import { createSpring, createSpike, canBreakBrick, isBrickLoadBearing } from '../src/data/levels/helpers';
import { createPlat } from '../src/data/levels/helpers';
import { SPRING_VELOCITY, PHYSICS } from '../src/config';
import { Physics } from '../src/engine/Physics';
import { getBiomeGravity } from '../src/config';
import type { LevelData } from '../src/data/levels/index';

const makeLevel = (platforms: LevelData['platforms'], overrides: Partial<LevelData> = {}): LevelData => ({
    id: 999,
    name: 'Synthetic',
    width: 2000,
    height: 800,
    biome: 'grasslands',
    platforms,
    coins: [],
    questionBlocks: [],
    enemies: [],
    decorations: [],
    playerStart: { x: 150, y: 400 },
    goal: { x: 1000, y: 400 },
    timeBonus: 100,
    ...overrides,
});

describe('LevelData new optional fields', () => {
    it('ensureSolvable should preserve springs, spikes and coinGoal untouched', () => {
        const level: LevelData = {
            ...makeLevel([
                createPlat(200, 500, 400, 32, 'grass'),
                createPlat(1000, 500, 600, 32, 'grass'),
            ]),
            springs: [createSpring(300, 484), createSpring(420, 484)],
            spikes: [createSpike(600, 492)],
            coinGoal: 5,
        };
        const fixed = ensureSolvable(level);
        expect(fixed.springs).toEqual(level.springs);
        expect(fixed.spikes).toEqual(level.spikes);
        expect(fixed.coinGoal).toBe(5);
    });

    it('levels without new fields stay unchanged in shape', () => {
        // PILOT levels 1-12 (grasslands + desert) intentionally introduce
        // springs/spikes/coinGoal — see tests/PilotElements.test.ts.
        // This invariant now applies to all non-pilot levels.
        for (let i = 12; i < getLevelCount(); i++) {
            const level = getLevel(i);
            expect(level.springs).toBeUndefined();
            expect(level.spikes).toBeUndefined();
            expect(level.coinGoal).toBeUndefined();
        }
    });
});

describe('Spring launch physics', () => {
    it('spring jump height should exceed normal jump and stay within limits', () => {
        const gravity = PHYSICS.GRAVITY;
        const springHeight = (SPRING_VELOCITY * SPRING_VELOCITY) / (2 * gravity);
        const normalHeight = (PHYSICS.JUMP_SPEED * PHYSICS.JUMP_SPEED) / (2 * gravity);
        expect(springHeight).toBeGreaterThan(normalHeight);
        expect(springHeight).toBeGreaterThan(400);
        expect(springHeight).toBeLessThanOrEqual(500);
        expect(springHeight).toBeCloseTo(455.625, 2);
        expect(normalHeight).toBeCloseTo(202.5, 2);
    });

    it('SPRING_VELOCITY should exceed normal jump velocity', () => {
        expect(Math.abs(SPRING_VELOCITY)).toBeGreaterThan(PHYSICS.JUMP_SPEED);
    });
});

describe('Spike placement rules', () => {
    it('all levels with spikes must keep spikes at least 100px away from any question block and 150px from playerStart', () => {
        const violations: string[] = [];
        for (let i = 0; i < getLevelCount(); i++) {
            const level = getLevel(i);
            const spikes = level.spikes || [];
            if (spikes.length === 0) continue;
            for (const spike of spikes) {
                for (const qb of level.questionBlocks || []) {
                    const dist = Math.hypot(spike.x - qb.x, spike.y - qb.y);
                    if (dist < 100) {
                        violations.push(`Level ${level.id}: spike (${spike.x}, ${spike.y}) only ${dist.toFixed(0)}px from QB (${qb.x}, ${qb.y})`);
                    }
                }
                const startDist = Math.hypot(spike.x - level.playerStart.x, spike.y - level.playerStart.y);
                if (startDist < 150) {
                    violations.push(`Level ${level.id}: spike (${spike.x}, ${spike.y}) only ${startDist.toFixed(0)}px from playerStart`);
                }
            }
        }
        expect(violations, violations.slice(0, 10).join('\n')).toHaveLength(0);
    });

    it('spike helper coordinates flow through unchanged', () => {
        const spike = createSpike(640, 492);
        expect(spike.x).toBe(640);
        expect(spike.y).toBe(492);
    });
});

describe('Brick destruction invariant (no unfixable state)', () => {
    it('removing any brick either keeps the level traversable or is flagged load-bearing (all 90 levels)', () => {
        const unfixable: string[] = [];
        let loadBearingCount = 0;
        let totalBricks = 0;
        for (let i = 0; i < getLevelCount(); i++) {
            const level = getLevel(i);
            const gravity = getBiomeGravity(level.biome);
            const brickIndices: number[] = [];
            level.platforms.forEach((p, idx) => {
                if ((p.type as string) === 'brick') brickIndices.push(idx);
            });
            for (const idx of brickIndices) {
                totalBricks++;
                const brick = level.platforms[idx];
                const remaining = level.platforms.filter((_, j) => j !== idx);
                const physics = new Physics(remaining, level.width, level.height, (level.movingPlatforms || []) as any, gravity);
                const result = physics.isFullyTraversableToGoal(level.playerStart.x, level.playerStart.y, level.goal.x);
                if (!result.traversable) {
                    loadBearingCount++;
                    const flagged = isBrickLoadBearing(level, { x: brick.x, y: brick.y, type: brick.type as string });
                    if (!flagged) {
                        unfixable.push(`Level ${level.id} (${level.name}): brick (${brick.x}, ${brick.y}) breaks traversability but is not flagged load-bearing`);
                    }
                }
            }
        }
        expect(loadBearingCount).toBeGreaterThan(0);
        expect(totalBricks).toBeGreaterThan(0);
        expect(unfixable, unfixable.slice(0, 10).join('\n')).toHaveLength(0);
    }, 240000);

    it('canBreakBrick and isBrickLoadBearing combine into safe break decisions', () => {
        const level = getLevel(0);
        const brick = level.platforms.find(p => (p.type as string) === 'brick');
        if (brick) {
            const loadBearing = isBrickLoadBearing(level, brick);
            expect(canBreakBrick(true, brick.type as string, loadBearing)).toBe(!loadBearing);
            expect(canBreakBrick(false, brick.type as string, loadBearing)).toBe(false);
        }
    });
});

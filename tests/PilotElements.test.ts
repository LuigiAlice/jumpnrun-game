import { describe, it, expect } from 'vitest';
import { ALL_LEVELS, getLevel, getLevelCount } from '../src/data/levels/index';
import { Physics } from '../src/engine/Physics';
import { getBiomeGravity } from '../src/config';
import type { LevelData } from '../src/data/levels/index';

const PILOT_LEVEL_COUNT = 12;

const pilotLevels = (): LevelData[] => ALL_LEVELS.slice(0, PILOT_LEVEL_COUNT);

const platformTopEdge = (p: { y: number; h: number }): number => p.y - p.h / 2;

const findSpringSupport = (level: LevelData, spring: { x: number; y: number }): boolean =>
    level.platforms.some(
        p =>
            Math.abs(p.y - p.h / 2 - spring.y) < 0.01 &&
            spring.x >= p.x - p.w / 2 &&
            spring.x <= p.x + p.w / 2
    );

const findSpikeSupport = (level: LevelData, spike: { x: number; y: number }): boolean =>
    level.platforms.some(
        p =>
            Math.abs(p.y - p.h / 2 - 8 - spike.y) < 0.01 &&
            spike.x >= p.x - p.w / 2 + 12 &&
            spike.x <= p.x + p.w / 2 - 12
    );

describe('Pilot Levels (1-12): springs', () => {
    it('at least 5 of 6 levels per pilot biome have at least one spring', () => {
        for (const biome of ['grasslands', 'desert']) {
            const levels = ALL_LEVELS.filter(l => l.biome === biome);
            expect(levels).toHaveLength(6);
            const withSprings = levels.filter(l => (l.springs || []).length > 0);
            expect(withSprings.length).toBeGreaterThanOrEqual(5);
        }
    });

    it('every spring sits exactly on a platform top edge (never over gaps/deathzones)', () => {
        for (const level of pilotLevels()) {
            for (const spring of level.springs || []) {
                expect(
                    findSpringSupport(level, spring),
                    `Level ${level.id}: spring at (${spring.x}, ${spring.y}) must rest on a platform top edge`
                ).toBe(true);
            }
        }
    });

    it('levels must stay solvable without spring launches (springs ignored by solver)', () => {
        for (const level of pilotLevels()) {
            const fixed = getLevel(level.id - 1);
            const physics = new Physics(
                fixed.platforms as any[],
                fixed.width,
                fixed.height,
                fixed.movingPlatforms as any[] || [],
                getBiomeGravity(fixed.biome)
            );
            expect(
                physics.isFullyTraversableToGoal(fixed.playerStart.x, fixed.playerStart.y, fixed.goal.x).traversable,
                `Level ${level.id} must be traversable with springs ignored`
            ).toBe(true);
        }
    });

    it('tutorial levels keep a gentle single spring', () => {
        expect(ALL_LEVELS[0].springs).toHaveLength(1);
        expect(ALL_LEVELS[6].springs).toHaveLength(1);
    });
});

describe('Pilot Levels (1-12): spikes', () => {
    it('max 4 spikes per level', () => {
        for (const level of pilotLevels()) {
            expect((level.spikes || []).length, `Level ${level.id} spike count`).toBeLessThanOrEqual(4);
        }
    });

    it('no two spikes share a position', () => {
        for (const level of pilotLevels()) {
            const spikes = level.spikes || [];
            for (let i = 0; i < spikes.length; i++) {
                for (let j = i + 1; j < spikes.length; j++) {
                    const dist = Math.hypot(spikes[i].x - spikes[j].x, spikes[i].y - spikes[j].y);
                    expect(dist, `Level ${level.id}: spikes ${i}/${j} too close (${dist.toFixed(0)}px)`).toBeGreaterThanOrEqual(24);
                }
            }
        }
    });

    it('spikes are at least 96px from goal and 100px from QBs, grounded on a platform', () => {
        for (const level of pilotLevels()) {
            for (const spike of level.spikes || []) {
                const goalDist = Math.hypot(spike.x - level.goal.x, spike.y - level.goal.y);
                expect(goalDist, `Level ${level.id}: spike (${spike.x}, ${spike.y}) ${goalDist.toFixed(0)}px from goal`).toBeGreaterThanOrEqual(96);
                for (const qb of level.questionBlocks || []) {
                    const dist = Math.hypot(spike.x - qb.x, spike.y - qb.y);
                    expect(dist, `Level ${level.id}: spike (${spike.x}, ${spike.y}) ${dist.toFixed(0)}px from QB`).toBeGreaterThanOrEqual(100);
                }
                expect(
                    findSpikeSupport(level, spike),
                    `Level ${level.id}: spike (${spike.x}, ${spike.y}) must be grounded on a platform, not over a gap`
                ).toBe(true);
                expect(
                    (level.movingPlatforms || []).some(mp =>
                        Math.abs(mp.y - mp.h / 2 - 8 - spike.y) < 12 && Math.abs(mp.x - spike.x) < mp.w / 2 + 24
                    ),
                    `Level ${level.id}: spike must not sit on a moving platform`
                ).toBe(false);
            }
        }
    });

    it('tutorial grasslands level 1 has no spikes', () => {
        expect(ALL_LEVELS[0].spikes || []).toHaveLength(0);
    });

    it('desert level 11 keeps a crab/robot/spiny-heavy horde (15-20 enemies)', () => {
        const horde = ALL_LEVELS[10].enemies;
        expect(horde.length).toBeGreaterThanOrEqual(15);
        expect(horde.length).toBeLessThanOrEqual(20);
        const types = new Set(horde.map(e => e.type));
        expect(types.has('crab')).toBe(true);
        expect(types.has('robot')).toBe(true);
        expect(types.has('spiny')).toBe(true);
    });
});

describe('Pilot Levels (1-12): coinGoal', () => {
    it('coinGoal never exceeds the coin count of the level', () => {
        for (const level of pilotLevels()) {
            if (level.coinGoal === undefined) continue;
            expect(
                level.coinGoal,
                `Level ${level.id}: coinGoal ${level.coinGoal} vs ${level.coins.length} coins`
            ).toBeLessThanOrEqual(level.coins.length);
            expect(level.coinGoal).toBeGreaterThan(0);
        }
    });

    it('grasslands horde targets 25 and desert vertical targets 30 coins', () => {
        expect(ALL_LEVELS[4].coinGoal).toBe(25);
        expect(ALL_LEVELS[9].coinGoal).toBe(30);
    });
});

describe('Pilot Levels (1-12): variety', () => {
    it('each pilot level mixes at least 3 platform types', () => {
        for (const level of pilotLevels()) {
            const types = new Set(level.platforms.map(p => p.type));
            expect(types.size, `Level ${level.id} has ${types.size} platform types`).toBeGreaterThanOrEqual(3);
        }
    });

    it('pilot levels use varied moving platform types (not only horizontal)', () => {
        const moveTypes = new Set<string>();
        for (const level of pilotLevels()) {
            for (const mp of level.movingPlatforms || []) moveTypes.add(mp.moveType);
        }
        expect(moveTypes.has('vertical')).toBe(true);
        expect(moveTypes.has('circular')).toBe(true);
    });

    it('pilot levels keep the grasslands secret room intact and reachable', () => {
        const l1 = getLevel(0);
        const secret = l1.platforms.find(p => p.x === 520 && p.y === 400);
        expect(secret).toBeDefined();
        const physics = new Physics(
            l1.platforms as any[],
            l1.width,
            l1.height,
            l1.movingPlatforms as any[] || [],
            getBiomeGravity(l1.biome)
        );
        expect(physics.getReachablePlatforms(l1.playerStart.x, l1.playerStart.y).some(p => p === secret)).toBe(true);
    });

    it('ensureSolvable keeps springs, spikes and coinGoal for pilot levels', () => {
        for (const original of pilotLevels()) {
            const fixed = getLevel(original.id - 1);
            expect(fixed.springs).toEqual(original.springs);
            expect(fixed.spikes).toEqual(original.spikes);
            expect(fixed.coinGoal).toBe(original.coinGoal);
        }
    });

    it('all 90 levels still exist and pilot levels stay solvable', () => {
        expect(getLevelCount()).toBe(90);
        for (const level of pilotLevels()) {
            const fixed = getLevel(level.id - 1);
            const physics = new Physics(
                fixed.platforms as any[],
                fixed.width,
                fixed.height,
                fixed.movingPlatforms as any[] || [],
                getBiomeGravity(fixed.biome)
            );
            expect(physics.isSolvable(fixed.playerStart.x, fixed.playerStart.y, fixed.goal.x, fixed.goal.y),
                `Level ${level.id} solvable`).toBe(true);
        }
    });
});

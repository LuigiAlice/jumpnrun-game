import { describe, it, expect } from 'vitest';
import { getLevel, getLevelCount, isBrickLoadBearing } from '../src/data/levels/index';
import { Physics } from '../src/engine/Physics';
import { getBiomeGravity } from '../src/config';
import type { LevelData } from '../src/data/levels/index';

const levels: LevelData[] = [];
for (let i = 0; i < getLevelCount(); i++) {
    levels.push(getLevel(i));
}

const label = (i: number, level: LevelData): string =>
    `Level ${i} (id=${level.id}, "${level.name}", biome=${level.biome})`;

const isSolidPlatform = (p: { type: string }): boolean => p.type !== 'lava';

const onPlatformTop = (p: { x: number; y: number; w: number; h: number; type: string }, x: number, top: number): boolean =>
    isSolidPlatform(p) &&
    Math.abs((p.y - p.h / 2) - top) < 0.5 &&
    Math.abs(p.x - x) < p.w / 2;

const findSpringSupport = (level: LevelData, spring: { x: number; y: number }): boolean =>
    level.platforms.some(p => onPlatformTop(p, spring.x, spring.y));

const findSpikeSupport = (level: LevelData, spike: { x: number; y: number }): boolean =>
    level.platforms.some(p => onPlatformTop(p, spike.x, spike.y + 8));

describe('ElementMix: global invariants for all 90 levels', () => {
    it('every level is fully traversable to the goal with biome gravity', { timeout: 120000 }, () => {
        const failures: string[] = [];
        for (let i = 0; i < levels.length; i++) {
            const level = levels[i];
            const gravity = getBiomeGravity(level.biome);
            const physics = new Physics(
                level.platforms,
                level.width,
                level.height,
                level.movingPlatforms || [],
                gravity
            );
            const result = physics.isFullyTraversableToGoal(level.playerStart.x, level.playerStart.y, level.goal.x);
            if (!result.traversable) {
                const unreachable = result.unreachablePlatforms
                    .slice(0, 5)
                    .map(p => `(${p.x}, ${p.y}, ${p.type})`)
                    .join(', ');
                failures.push(`${label(i, level)}: not traversable — unreachable: ${unreachable}`);
            }
        }
        expect(failures, failures.join('\n')).toHaveLength(0);
    });

    it('every spring rests exactly on top of a solid platform edge', () => {
        const failures: string[] = [];
        for (let i = 0; i < levels.length; i++) {
            const level = levels[i];
            for (const spring of level.springs || []) {
                if (!findSpringSupport(level, spring)) {
                    failures.push(
                        `${label(i, level)}: spring at (${spring.x}, ${spring.y}) has no solid platform with top edge at y=${spring.y} underneath`
                    );
                }
            }
        }
        expect(failures, failures.join('\n')).toHaveLength(0);
    });

    describe('spike rules', () => {
        it('every spike is grounded on a solid platform (never over a gap, never on lava)', () => {
            const failures: string[] = [];
            for (let i = 0; i < levels.length; i++) {
                const level = levels[i];
                for (const spike of level.spikes || []) {
                    if (!findSpikeSupport(level, spike)) {
                        failures.push(
                            `${label(i, level)}: spike at (${spike.x}, ${spike.y}) is not grounded (no solid platform with top edge at y=${spike.y + 8} underneath)`
                        );
                    }
                }
            }
            expect(failures, failures.join('\n')).toHaveLength(0);
        });

        it('spikes keep >=100px horizontal distance to every question block', () => {
            const failures: string[] = [];
            for (let i = 0; i < levels.length; i++) {
                const level = levels[i];
                for (const spike of level.spikes || []) {
                    for (const qb of level.questionBlocks || []) {
                        const dist = Math.abs(spike.x - qb.x);
                        if (dist < 100) {
                            failures.push(
                                `${label(i, level)}: spike (${spike.x}, ${spike.y}) only ${dist.toFixed(0)}px (x) from question block (${qb.x}, ${qb.y})`
                            );
                        }
                    }
                }
            }
            expect(failures, failures.join('\n')).toHaveLength(0);
        });

        it('spikes keep >=96px to goal.x and >=150px to playerStart.x', () => {
            const failures: string[] = [];
            for (let i = 0; i < levels.length; i++) {
                const level = levels[i];
                for (const spike of level.spikes || []) {
                    const goalDist = Math.abs(spike.x - level.goal.x);
                    if (goalDist < 96) {
                        failures.push(
                            `${label(i, level)}: spike (${spike.x}, ${spike.y}) only ${goalDist.toFixed(0)}px from goal.x=${level.goal.x}`
                        );
                    }
                    const startDist = Math.abs(spike.x - level.playerStart.x);
                    if (startDist < 150) {
                        failures.push(
                            `${label(i, level)}: spike (${spike.x}, ${spike.y}) only ${startDist.toFixed(0)}px from playerStart.x=${level.playerStart.x}`
                        );
                    }
                }
            }
            expect(failures, failures.join('\n')).toHaveLength(0);
        });

        it('no level has more than 4 spikes', () => {
            const failures: string[] = [];
            for (let i = 0; i < levels.length; i++) {
                const level = levels[i];
                const count = (level.spikes || []).length;
                if (count > 4) {
                    failures.push(`${label(i, level)}: ${count} spikes (max 4)`);
                }
            }
            expect(failures, failures.join('\n')).toHaveLength(0);
        });
    });

    describe('coinGoal rules', () => {
        it('coinGoal is >=1 and never exceeds the level coin count', () => {
            const failures: string[] = [];
            for (let i = 0; i < levels.length; i++) {
                const level = levels[i];
                if (level.coinGoal === undefined) continue;
                if (level.coinGoal < 1) {
                    failures.push(`${label(i, level)}: coinGoal ${level.coinGoal} < 1`);
                }
                if (level.coinGoal > level.coins.length) {
                    failures.push(
                        `${label(i, level)}: coinGoal ${level.coinGoal} exceeds ${level.coins.length} coins in level`
                    );
                }
            }
            expect(failures, failures.join('\n')).toHaveLength(0);
        });

        it('at most 3 coinGoal levels per biome', () => {
            const failures: string[] = [];
            const perBiome = new Map<string, number[]>();
            for (let i = 0; i < levels.length; i++) {
                const level = levels[i];
                if (level.coinGoal === undefined) continue;
                const list = perBiome.get(level.biome) || [];
                list.push(level.id);
                perBiome.set(level.biome, list);
            }
            for (const [biome, ids] of perBiome) {
                if (ids.length > 3) {
                    failures.push(`Biome "${biome}": ${ids.length} coinGoal levels (ids: ${ids.join(', ')}) — max 3`);
                }
            }
            expect(failures, failures.join('\n')).toHaveLength(0);
        });
    });

    describe('variety rules', () => {
        it('every level uses at least 3 distinct platform types', () => {
            const failures: string[] = [];
            for (let i = 0; i < levels.length; i++) {
                const level = levels[i];
                const types = new Set(level.platforms.map(p => p.type));
                if (types.size < 3) {
                    failures.push(
                        `${label(i, level)}: only ${types.size} distinct platform types (${[...types].join(', ')})`
                    );
                }
            }
            expect(failures, failures.join('\n')).toHaveLength(0);
        });

        it('at least 60% of levels (>=54) contain a vertical or circular moving platform', () => {
            const withVerticalOrCircular: string[] = [];
            for (let i = 0; i < levels.length; i++) {
                const level = levels[i];
                const has = (level.movingPlatforms || []).some(
                    mp => mp.moveType === 'vertical' || mp.moveType === 'circular'
                );
                if (has) withVerticalOrCircular.push(label(i, level));
            }
            expect(
                withVerticalOrCircular.length,
                `only ${withVerticalOrCircular.length}/90 levels have vertical/circular moving platforms (need >=54)`
            ).toBeGreaterThanOrEqual(54);
        });
    });

    it(
        'removing any brick keeps the level traversable or the brick is flagged load-bearing',
        { timeout: 240000 },
        () => {
            const unfixable: string[] = [];
            let bricksChecked = 0;
            for (let i = 0; i < levels.length; i++) {
                const level = levels[i];
                const gravity = getBiomeGravity(level.biome);
                const brickIndices: number[] = [];
                level.platforms.forEach((p, idx) => {
                    if ((p.type as string) === 'brick') brickIndices.push(idx);
                });
                for (const idx of brickIndices) {
                    bricksChecked++;
                    const brick = level.platforms[idx];
                    const remaining = level.platforms.filter((_, j) => j !== idx);
                    const physics = new Physics(remaining, level.width, level.height, level.movingPlatforms || [], gravity);
                    const result = physics.isFullyTraversableToGoal(level.playerStart.x, level.playerStart.y, level.goal.x);
                    if (!result.traversable) {
                        const flagged = isBrickLoadBearing(level, { x: brick.x, y: brick.y, type: brick.type as string });
                        if (!flagged) {
                            unfixable.push(
                                `${label(i, level)}: brick (${brick.x}, ${brick.y}) breaks traversability when removed but is not flagged load-bearing`
                            );
                        }
                    }
                }
            }
            expect(bricksChecked, 'expected at least some brick platforms across all levels').toBeGreaterThan(0);
            expect(unfixable, unfixable.slice(0, 10).join('\n')).toHaveLength(0);
        }
    );
});

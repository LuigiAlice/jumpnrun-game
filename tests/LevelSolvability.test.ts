import { describe, it, expect } from 'vitest';
import { getLevel, getLevelCount, LevelData } from '../src/data/levels/index';
import { Physics } from '../src/engine/Physics';

describe('Level Loading', () => {
    it('should load level 1 (grasslands)', () => {
        const level = getLevel(0);
        expect(level.id).toBe(1);
        expect(level.biome).toBe('grasslands');
    });

    it('should load all 90 levels', () => {
        expect(getLevelCount()).toBe(90);
    });

    it('should load levels with valid structure', () => {
        for (let i = 0; i < getLevelCount(); i++) {
            const level = getLevel(i);
            expect(level.platforms).toBeDefined();
            expect(level.platforms.length).toBeGreaterThan(0);
            expect(level.playerStart).toBeDefined();
            expect(level.goal).toBeDefined();
        }
    });
});

describe('Biome Coverage', () => {
    it('should have all 15 biomes', () => {
        const biomes = new Set<string>();
        for (let i = 0; i < getLevelCount(); i++) {
            biomes.add(getLevel(i).biome);
        }
        expect(biomes.size).toBe(15);
    });

    it('should have 90 levels total', () => {
        expect(getLevelCount()).toBe(90);
    });
});

describe('Level Solvability - All 90 Levels', () => {
    const biomes = [
        { name: 'grasslands', start: 0, end: 5 },
        { name: 'desert', start: 6, end: 11 },
        { name: 'water', start: 12, end: 17 },
        { name: 'ice-snow', start: 18, end: 23 },
        { name: 'sky-clouds', start: 24, end: 29 },
        { name: 'forest', start: 30, end: 35 },
        { name: 'village', start: 36, end: 41 },
        { name: 'beach-island', start: 42, end: 47 },
        { name: 'factory', start: 48, end: 53 },
        { name: 'volcano-lava', start: 54, end: 59 },
        { name: 'haunted-mansion', start: 60, end: 65 },
        { name: 'ruins', start: 66, end: 71 },
        { name: 'canyon-base', start: 72, end: 77 },
        { name: 'space-star', start: 78, end: 83 },
        { name: 'castle-final', start: 84, end: 89 },
    ];

    biomes.forEach(biome => {
        it(`${biome.name} (levels ${biome.start}-${biome.end}): all levels should be solvable`, () => {
            for (let i = biome.start; i <= biome.end; i++) {
                const level = getLevel(i);
                const physics = new Physics(level.platforms as any[], level.width, level.height, level.movingPlatforms as any[] || []);
                const result = physics.isSolvable(
                    level.playerStart.x,
                    level.playerStart.y,
                    level.goal.x,
                    level.goal.y
                );
                expect(result, `Level ${i} (${biome.name}) should be solvable`).toBe(true);
            }
        });
    });
});

describe('Level Path Finding', () => {
    const biomes = [
        { name: 'grasslands', start: 0, end: 5 },
        { name: 'desert', start: 6, end: 11 },
        { name: 'water', start: 12, end: 17 },
        { name: 'ice-snow', start: 18, end: 23 },
        { name: 'sky-clouds', start: 24, end: 29 },
        { name: 'forest', start: 30, end: 35 },
        { name: 'village', start: 36, end: 41 },
        { name: 'beach-island', start: 42, end: 47 },
        { name: 'factory', start: 48, end: 53 },
        { name: 'volcano-lava', start: 54, end: 59 },
        { name: 'haunted-mansion', start: 60, end: 65 },
        { name: 'ruins', start: 66, end: 71 },
        { name: 'canyon-base', start: 72, end: 77 },
        { name: 'space-star', start: 78, end: 83 },
        { name: 'castle-final', start: 84, end: 89 },
    ];

    biomes.forEach(biome => {
        it(`${biome.name}: all levels should have a valid path to goal`, () => {
            for (let i = biome.start; i <= biome.end; i++) {
                const level = getLevel(i);
                const physics = new Physics(level.platforms as any[], level.width, level.height, level.movingPlatforms as any[] || []);
                const path = physics.findPath(
                    level.playerStart.x,
                    level.playerStart.y,
                    level.goal.x,
                    level.goal.y
                );
                expect(path, `Level ${i} (${biome.name}) should have a valid path`).not.toBeNull();
                expect(path!.length).toBeGreaterThan(0);
            }
        });
    });
});

describe('Player Start Position', () => {
    it('all levels should have playerStart on a valid platform', () => {
        const failures: { level: number; name: string; playerY: number; platformTop: number; gap: number }[] = [];
        const noPlatformFailures: { level: number; name: string; playerX: number; playerY: number }[] = [];

        for (let i = 0; i < getLevelCount(); i++) {
            const level = getLevel(i);
            const physics = new Physics(level.platforms as any[], level.width, level.height);

            const platform = physics.findPlatformUnderPoint(level.playerStart.x, level.playerStart.y);
            if (!platform) {
                noPlatformFailures.push({
                    level: i + 1,
                    name: level.name,
                    playerX: level.playerStart.x,
                    playerY: level.playerStart.y
                });
            } else {
                const platformTop = platform.y - platform.h / 2;
                const playerBottom = level.playerStart.y + 16;
                const gap = playerBottom - platformTop;
                if (gap > 32) {
                    failures.push({
                        level: i + 1,
                        name: level.name,
                        playerY: level.playerStart.y,
                        platformTop,
                        gap
                    });
                }
            }
        }

        if (noPlatformFailures.length > 0) {
            console.log('Player spawn - NO PLATFORM:');
            noPlatformFailures.forEach(f => {
                console.log(`  Level ${f.level} (${f.name}): player at x=${f.playerX}, y=${f.playerY} - NO PLATFORM FOUND`);
            });
        }
        if (failures.length > 0) {
            console.log('Player spawn issues (gap > 32px):');
            failures.forEach(f => {
                console.log(`  Level ${f.level} (${f.name}): playerY=${f.playerY}, platformTop=${f.platformTop.toFixed(0)}, gap=${f.gap.toFixed(0)}px`);
            });
        }
        expect(noPlatformFailures.length).toBe(0);
        expect(failures.length).toBe(0);
    });
});

describe('Full Level Traversability', () => {
    it('all platforms up to goal should be reachable from start', () => {
        const failures: { level: number; name: string; unreachableCount: number; totalCount: number; details: string }[] = [];

        for (let i = 0; i < getLevelCount(); i++) {
            const level = getLevel(i);
            const physics = new Physics(level.platforms as any[], level.width, level.height);

            const result = physics.isFullyTraversableToGoal(level.playerStart.x, level.playerStart.y, level.goal.x);

            if (!result.traversable) {
                const firstFew = result.unreachablePlatforms.slice(0, 3).map(p =>
                    `(${p.x.toFixed(0)}, ${p.y.toFixed(0)}, ${p.type})`
                ).join(', ');
                failures.push({
                    level: i + 1,
                    name: level.name,
                    unreachableCount: result.unreachablePlatforms.length,
                    totalCount: level.platforms.length,
                    details: firstFew + (result.unreachablePlatforms.length > 3 ? '...' : '')
                });
            }
        }

        if (failures.length > 0) {
            console.log('\nUnreachable platforms (before goal) found:');
            failures.forEach(f => {
                console.log(`  Level ${f.level} (${f.name}): ${f.unreachableCount}/${f.totalCount} unreachable - ${f.details}`);
            });
        }
        expect(failures.length).toBe(0);
    });
});

describe('Individual Level Tests', () => {
    it('level 1 (grasslands-1.1) should be solvable with path', () => {
        const level = getLevel(0);
        const physics = new Physics(level.platforms as any[], level.width, level.height, level.movingPlatforms as any[] || []);
        expect(physics.isSolvable(level.playerStart.x, level.playerStart.y, level.goal.x, level.goal.y)).toBe(true);
        const path = physics.findPath(level.playerStart.x, level.playerStart.y, level.goal.x, level.goal.y);
        expect(path).not.toBeNull();
        expect(path!.length).toBeGreaterThan(0);
    });

    it('level 90 (castle-final) should be solvable with path', () => {
        const level = getLevel(89);
        const physics = new Physics(level.platforms as any[], level.width, level.height, level.movingPlatforms as any[] || []);
        expect(physics.isSolvable(level.playerStart.x, level.playerStart.y, level.goal.x, level.goal.y)).toBe(true);
        const path = physics.findPath(level.playerStart.x, level.playerStart.y, level.goal.x, level.goal.y);
        expect(path).not.toBeNull();
        expect(path!.length).toBeGreaterThan(0);
    });

    it('all 90 levels should have platforms', () => {
        for (let i = 0; i < 90; i++) {
            const level = getLevel(i);
            expect(level.platforms.length, `Level ${i} should have platforms`).toBeGreaterThan(0);
        }
    });

    it('all 90 levels should have playerStart and goal', () => {
        for (let i = 0; i < 90; i++) {
            const level = getLevel(i);
            expect(level.playerStart).toBeDefined();
            expect(level.goal).toBeDefined();
        }
    });
});
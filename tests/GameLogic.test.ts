import { describe, it, expect } from 'vitest';
import { getLevel, getLevelCount, LevelData } from '../src/data/levels/index';
import { Physics, DEFAULT_PHYSICS } from '../src/engine/Physics';
import { createPlat, createCoin, createQB, createEnemy, createDeco, createGoal, createMovingPlat } from '../src/data/levels/helpers';

describe('Physics', () => {
    describe('canReach', () => {
        const physics = new Physics([], 800, 600);

        it('should allow horizontal jump within max distance', () => {
            const from = createPlat(100, 500, 100, 32, 'brick');
            const to = createPlat(400, 500, 100, 32, 'brick');
            expect((physics as any).canReach(from, to)).toBe(true);
        });

        it('should not allow jump beyond max distance', () => {
            const from = createPlat(100, 500, 100, 32, 'brick');
            const to = createPlat(1200, 500, 100, 32, 'brick');
            expect((physics as any).canReach(from, to)).toBe(false);
        });

        it('should allow upward jump within limit', () => {
            const from = createPlat(100, 500, 100, 32, 'brick');
            const to = createPlat(300, 300, 100, 32, 'brick');
            expect((physics as any).canReach(from, to)).toBe(true);
        });

        it('should not allow upward jump beyond limit', () => {
            const from = createPlat(100, 500, 100, 32, 'brick');
            const to = createPlat(300, 100, 100, 32, 'brick');
            expect((physics as any).canReach(from, to)).toBe(false);
        });

        it('should allow downward jump within limit', () => {
            const from = createPlat(100, 300, 100, 32, 'brick');
            const to = createPlat(400, 800, 100, 32, 'brick');
            expect((physics as any).canReach(from, to)).toBe(true);
        });

        it('should allow overlapping platforms', () => {
            const from = createPlat(100, 500, 100, 32, 'brick');
            const to = createPlat(150, 500, 100, 32, 'brick');
            expect((physics as any).canReach(from, to)).toBe(true);
        });
    });

    describe('isSolvable', () => {
        it('should return false for empty platforms', () => {
            const physics = new Physics([], 800, 600);
            expect(physics.isSolvable(100, 500, 700)).toBe(false);
        });

        it('should return true when goal is reachable', () => {
            const platforms = [
                createPlat(100, 500, 100, 32, 'brick'),
                createPlat(400, 500, 100, 32, 'brick'),
                createPlat(600, 500, 100, 32, 'brick'),
            ];
            const physics = new Physics(platforms as any, 800, 600);
            expect(physics.isSolvable(100, 450, 600, 500)).toBe(true);
        });

        it('should return false when goal is beyond any platform', () => {
            const platforms = [
                createPlat(100, 500, 100, 32, 'brick'),
                createPlat(5000, 500, 100, 32, 'brick'),
            ];
            const physics = new Physics(platforms as any, 10000, 600);
            expect(physics.isSolvable(100, 450, 15000, 500)).toBe(false);
        });
    });
});

describe('Helper Functions', () => {
    it('createPlat should create valid platform', () => {
        const plat = createPlat(100, 200, 64, 32, 'brick');
        expect(plat.x).toBe(100);
        expect(plat.y).toBe(200);
        expect(plat.w).toBe(64);
        expect(plat.h).toBe(32);
        expect(plat.type).toBe('brick');
    });

    it('createCoin should create valid coin', () => {
        const coin = createCoin(100, 200);
        expect(coin.x).toBe(100);
        expect(coin.y).toBe(200);
    });

    it('createQB should create valid question block', () => {
        const qb = createQB(100, 200, 'mushroom');
        expect(qb.x).toBe(100);
        expect(qb.y).toBe(200);
        expect(qb.contents).toBe('mushroom');
    });

    it('createEnemy should create valid enemy', () => {
        const enemy = createEnemy(100, 200, 'goomba');
        expect(enemy.x).toBe(100);
        expect(enemy.y).toBe(200);
        expect(enemy.type).toBe('goomba');
    });

    it('createDeco should create valid decoration', () => {
        const deco = createDeco(100, 200, 'bush');
        expect(deco.x).toBe(100);
        expect(deco.y).toBe(200);
        expect(deco.type).toBe('bush');
    });

    it('createGoal should create valid goal', () => {
        const goal = createGoal(100, 200, 1000, 'easy');
        expect(goal.x).toBe(100);
        expect(goal.y).toBe(200);
        expect(goal.points).toBe(1000);
        expect(goal.difficulty).toBe('easy');
    });

    it('createMovingPlat should create valid moving platform', () => {
        const mp = createMovingPlat(100, 200, 64, 32, 'platform_easy', 'horizontal', 100, 50);
        expect(mp.x).toBe(100);
        expect(mp.y).toBe(200);
        expect(mp.w).toBe(64);
        expect(mp.h).toBe(32);
        expect(mp.type).toBe('platform_easy');
        expect(mp.moveType).toBe('horizontal');
        expect(mp.range).toBe(100);
        expect(mp.speed).toBe(50);
    });
});

describe('Question Block Reachability', () => {
    const MIN_GAP_FOR_BIG_MARIO = 56;

    function findBlockingPlatform(qb: { x: number, y: number }, platforms: any[]): { plat: any, gap: number } | null {
        let closestAbove: { plat: any, gap: number } | null = null;

        for (const p of platforms) {
            const platBottom = p.y + p.h / 2;
            const qbTop = qb.y - 16;

            if (platBottom < qbTop && qb.x > p.x - p.w / 2 && qb.x < p.x + p.w / 2) {
                const gap = qbTop - platBottom;
                if (gap < MIN_GAP_FOR_BIG_MARIO) {
                    if (!closestAbove || gap < closestAbove.gap) {
                        closestAbove = { plat: p, gap };
                    }
                }
            }
        }

        return closestAbove;
    }

    it('should report all unreachable question blocks', () => {
        const unreachableQBs: { level: number, levelName: string, qb: any, gap: number }[] = [];

        for (let i = 0; i < getLevelCount(); i++) {
            const level = getLevel(i);

            for (const qb of level.questionBlocks || []) {
                const blocking = findBlockingPlatform(qb, level.platforms);
                if (blocking) {
                    unreachableQBs.push({
                        level: level.id,
                        levelName: level.name,
                        qb,
                        gap: blocking.gap
                    });
                }
            }
        }

        if (unreachableQBs.length > 0) {
            console.log(`Found ${unreachableQBs.length} unreachable question blocks:`);
            unreachableQBs.forEach(u => {
                console.log(`  Level ${u.level} (${u.levelName}): QB at x=${u.qb.x}, y=${u.qb.y}, gap=${u.gap}`);
            });
        }

        expect(unreachableQBs.length).toBeLessThan(50);
    });
});

describe('Level Data Integrity', () => {
    it('all levels should have playerStart and goal defined', () => {
        for (let i = 0; i < getLevelCount(); i++) {
            const level = getLevel(i);
            expect(level.playerStart).toBeDefined();
            expect(level.goal).toBeDefined();
            expect(typeof level.playerStart.x).toBe('number');
            expect(typeof level.playerStart.y).toBe('number');
            expect(typeof level.goal.x).toBe('number');
            expect(typeof level.goal.y).toBe('number');
        }
    });

    it('all platforms should have valid dimensions', () => {
        for (let i = 0; i < getLevelCount(); i++) {
            const level = getLevel(i);

            for (const p of level.platforms) {
                expect(p.w).toBeGreaterThan(0);
                expect(p.h).toBeGreaterThan(0);
            }
        }
    });

    it('all levels should have positive time bonus', () => {
        for (let i = 0; i < getLevelCount(); i++) {
            const level = getLevel(i);
            expect(level.timeBonus).toBeGreaterThan(0);
        }
    });
});

describe('DEFAULT_PHYSICS constants', () => {
    it('should have reasonable physics values', () => {
        expect(DEFAULT_PHYSICS.TILE_SIZE).toBe(32);
        expect(DEFAULT_PHYSICS.MAX_JUMP_DISTANCE).toBe(800);
        expect(DEFAULT_PHYSICS.MAX_JUMP_UP).toBe(350);
        expect(DEFAULT_PHYSICS.MAX_FALL_DOWN).toBe(1000);
    });
});

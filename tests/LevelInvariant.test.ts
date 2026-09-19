import { describe, it, expect } from 'vitest';
import { ALL_LEVELS, getLevel, getLevelCount } from '../src/data/levels/index';
import { Physics } from '../src/engine/Physics';
import { getBiomeGravity } from '../src/config';

function qbClearanceViolated(platX: number, platY: number, platW: number, qbX: number, qbY: number): boolean {
    return Math.abs(platX - qbX) < (platW / 2 + 16) &&
        platY > qbY - 16 - 56 - 12 &&
        platY < qbY + 16 + 12;
}

describe('Level Count Consistency', () => {
    it('getLevelCount() and ALL_LEVELS.length should both be 90', () => {
        expect(getLevelCount()).toBe(90);
        expect(ALL_LEVELS.length).toBe(90);
    });
});

describe('All Levels Fully Traversable', () => {
    it('all 90 levels should be fully traversable to goal (biome gravity)', () => {
        for (let i = 0; i < getLevelCount(); i++) {
            const level = getLevel(i);
            const physics = new Physics(
                level.platforms as any[],
                level.width,
                level.height,
                level.movingPlatforms as any[] || [],
                getBiomeGravity(level.biome)
            );
            const result = physics.isFullyTraversableToGoal(
                level.playerStart.x,
                level.playerStart.y,
                level.goal.x
            );
            expect(result.traversable, `Level ${i} (id=${level.id}, name="${level.name}") should be fully traversable; unreachable: ${result.unreachablePlatforms.slice(0, 3).map(p => `(${p.x.toFixed(0)}, ${p.y.toFixed(0)}, ${p.type})`).join(', ')}`).toBe(true);
        }
    });
});

describe('Auto-Fix QB Clearance Invariant', () => {
    it('auto-added platforms must never block a question block (all 90 levels)', () => {
        const violations: string[] = [];
        for (let i = 0; i < getLevelCount(); i++) {
            const fixed = getLevel(i);
            const original = ALL_LEVELS[i];
            const autoAdded = fixed.platforms.slice(original.platforms.length);
            for (const p of autoAdded) {
                for (const qb of fixed.questionBlocks || []) {
                    if (qbClearanceViolated(p.x, p.y, p.w, qb.x, qb.y)) {
                        violations.push(`Level ${i} (id=${fixed.id}, name="${fixed.name}"): platform_easy at (${p.x.toFixed(1)}, ${p.y.toFixed(1)}, w=${p.w}) blocks QB at (${qb.x}, ${qb.y})`);
                    }
                }
            }
        }
        expect(violations, violations.slice(0, 10).join('\n')).toHaveLength(0);
    });
});

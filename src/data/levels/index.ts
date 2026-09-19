// 100 Levels - 15 Biome (Super Mario inspired)

// Re-export helpers from separate file to avoid circular imports
export { createPlat, createCoin, createQB, createEnemy, createDeco, createGoal, createMovingPlat } from './helpers';

export type Biome = 
  | 'grasslands' | 'desert' | 'water' | 'ice-snow'
  | 'sky-clouds' | 'forest' | 'village' | 'beach-island'
  | 'factory' | 'volcano-lava' | 'haunted-mansion' | 'ruins'
  | 'canyon-base' | 'space-star' | 'castle-final';

export type PlatformType = 
  | 'grass' | 'dirt' | 'sandstone' | 'sand' | 'ice' | 'snow'
  | 'stone' | 'brick' | 'brick_secret' | 'brick_multi' | 'cave' | 'castle' | 'metal'
  | 'pipe' | 'pipe_top' | 'cloud' | 'platform_easy' | 'platform_medium' | 'platform_hard'
  | 'lava' | 'wood' | 'ruins' | 'space' | 'water' | 'bubble' | 'hidden';

export type EnemyType = 
  | 'goomba' | 'koopa' | 'piranha' | 'spiny' | 'boo' | 'thwomp'
  | 'lakitu' | 'bullet_bill' | 'fireball' | 'crab' | 'robot'
  | 'ghost' | 'squid' | 'ufo' | 'boss';

export type QuestionBlockContent = 'coin' | 'mushroom' | 'flower' | 'star' | 'oneup';

export type DecorationType = 
  | 'tree' | 'bush' | 'cloud' | 'pipe' | 'flag' | 'torch' | 'bat'
  | 'cactus' | 'bone' | 'rock' | 'pyramid' | 'skull'
  | 'seaweed' | 'bubble' | 'coral' | 'jellyfish' | 'shell'
  | 'snowflake' | 'icicle' | 'iceberg' | 'penguin'
  | 'balloon' | 'bird' | 'sun' | 'rainbow' | 'star'
  | 'mushroom' | 'log' | 'flower' | 'firefly' | 'vine'
  | 'house' | 'fence' | 'well' | 'cart' | 'barrel'
  | 'shell' | 'palm' | 'seagull' | 'crab' | 'sea'
  | 'gear' | 'crane' | 'smoke' | 'pipe' | 'conveyor'
  | 'fire' | 'ember' | 'rock' | 'lava-rock'
  | 'ghost' | 'ghost_decor' | 'coffin' | 'cobweb' | 'tombstone' | 'web'
  | 'pillar' | 'statue' | 'vine' | 'moss'
  | 'canyon-rock' | 'formation' | 'eagle'
  | 'planet' | 'rocket' | 'asteroid' | 'satellite'
  | 'banner' | 'chain' | 'switch' | 'lever' | 'boss-flag';

export interface Platform {
    x: number;
    y: number;
    w: number;
    h: number;
    type: PlatformType;
}

export interface MovingPlatform {
    x: number;
    y: number;
    w: number;
    h: number;
    type: PlatformType;
    moveType: 'horizontal' | 'vertical' | 'circular';
    range: number;
    speed: number;
}

export interface Goal {
    x: number;
    y: number;
    points: number;
    difficulty: 'easy' | 'medium' | 'hard';
}

export interface PipeWarp {
    pipeX: number;
    pipeY: number;
    targetLevelIndex: number;
}

export interface LevelData {
    id: number;
    name: string;
    width: number;
    height: number;
    biome: Biome;
    platforms: Platform[];
    movingPlatforms?: MovingPlatform[];
    coins: { x: number; y: number }[];
    questionBlocks: { x: number; y: number; contents: QuestionBlockContent }[];
    enemies: { x: number; y: number; type: EnemyType }[];
    decorations: { x: number; y: number; type: DecorationType }[];
    playerStart: { x: number; y: number };
    goal: { x: number; y: number; points?: number; difficulty?: Goal['difficulty'] };
    goals?: Goal[];
    pipeWarps?: PipeWarp[];
    timeBonus: number;
}

// Export all levels
import { GRASSLANDS_LEVELS } from './grasslands';
import { DESERT_LEVELS } from './desert';
import { WATER_LEVELS } from './water';
import { ICE_SNOW_LEVELS } from './ice-snow';
import { SKY_CLOUDS_LEVELS } from './sky-clouds';
import { FOREST_LEVELS } from './forest';
import { VILLAGE_LEVELS } from './village';
import { BEACH_ISLAND_LEVELS } from './beach-island';
import { FACTORY_LEVELS } from './factory';
import { VOLCANO_LAVA_LEVELS } from './volcano-lava';
import { HAUNTED_MANSION_LEVELS } from './haunted-mansion';
import { RUINS_LEVELS } from './ruins';
import { CANYON_BASE_LEVELS } from './canyon-base';
import { SPACE_STAR_LEVELS } from './space-star';
import { CASTLE_FINAL_LEVELS } from './castle-final';
import { Physics } from '../../engine/Physics';
import { getBiomeGravity } from '../../config';

export const ALL_LEVELS = [
    ...GRASSLANDS_LEVELS,
    ...DESERT_LEVELS,
    ...WATER_LEVELS,
    ...ICE_SNOW_LEVELS,
    ...SKY_CLOUDS_LEVELS,
    ...FOREST_LEVELS,
    ...VILLAGE_LEVELS,
    ...BEACH_ISLAND_LEVELS,
    ...FACTORY_LEVELS,
    ...VOLCANO_LAVA_LEVELS,
    ...HAUNTED_MANSION_LEVELS,
    ...RUINS_LEVELS,
    ...CANYON_BASE_LEVELS,
    ...SPACE_STAR_LEVELS,
    ...CASTLE_FINAL_LEVELS,
];

const NON_SOLID = new Set(['lava', 'pipe']);

export function ensureSolvable(level: LevelData): LevelData {
    const gravity = getBiomeGravity(level.biome);

    let iteration = 0;
    const maxIterations = 500;
    let platforms = [...level.platforms];
    let lastTraversable = false;

    while (iteration < maxIterations) {
        iteration++;
        const physics = new Physics(platforms, level.width, level.height, level.movingPlatforms || [], gravity);
        const result = physics.isFullyTraversableToGoal(level.playerStart.x, level.playerStart.y, level.goal.x);
        lastTraversable = result.traversable;
        if (result.traversable) break;

        const target = result.unreachablePlatforms.find(p => !NON_SOLID.has(p.type));
        if (!target) break;

        const reachable = physics.getReachablePlatforms(level.playerStart.x, level.playerStart.y);
        let bestFrom: typeof target | null = null;
        let bestGap = Infinity;

        for (const from of reachable) {
            const fromRight = from.x + from.w / 2;
            const toLeft = target.x - target.w / 2;
            const gap = toLeft - fromRight;
            if (gap > 0 && gap < bestGap) {
                const vDiff = (target.y - target.h / 2) - (from.y - from.h / 2);
                if (vDiff <= 1000 && vDiff >= -350) {
                    bestGap = gap;
                    bestFrom = from;
                }
            }
        }

        if (!bestFrom || bestGap >= 2000) break;

        const fromRight = bestFrom.x + bestFrom.w / 2;
        const fromTop = bestFrom.y - bestFrom.h / 2;
        const toTop = target.y - target.h / 2;

        const maxJump = (physics as unknown as { getMaxHorizontalJump(deltaY: number): number }).getMaxHorizontalJump(0);

        const gapFromReach = Math.min(maxJump * 0.85, bestGap * 0.45);
        const platX = fromRight + gapFromReach;
        let platY = Math.min(fromTop, toTop) - 30;
        const platW = Math.max(50, Math.min(70, bestGap * 0.25));

        for (const qb of level.questionBlocks || []) {
            if (Math.abs(qb.x - platX) < (platW / 2 + 16)) {
                const minPlatY = qb.y - 16 - 56 - 12;
                if (platY > minPlatY && platY < qb.y + 16 + 12) {
                    platY = Math.min(platY, minPlatY);
                }
            }
        }

        const overlapping = platforms.some(p =>
            Math.abs(p.x - platX) < 35 && Math.abs(p.y - platY) < 25
        );
        if (overlapping) break;

        platforms.push({
            x: platX, y: platY, w: platW, h: 24,
            type: 'platform_easy' as PlatformType
        });
    }

    if (!lastTraversable) {
        console.warn(`[ensureSolvable] Level ${level.id} (${level.name}) could not be fully fixed automatically`);
    }

    return { ...level, platforms };
}

export function getLevel(index: number): LevelData {
    const safeIndex = Math.max(0, Math.min(index, ALL_LEVELS.length - 1));
    return ensureSolvable(ALL_LEVELS[safeIndex]);
}

export function getLevelCount(): number {
    return ALL_LEVELS.length;
}

export function getBiome(levelIndex: number): Biome {
    return getLevel(levelIndex).biome;
}
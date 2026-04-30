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
  | 'stone' | 'brick' | 'cave' | 'castle' | 'metal'
  | 'pipe' | 'pipe_top' | 'cloud' | 'platform_easy' | 'platform_medium' | 'platform_hard'
  | 'lava' | 'wood' | 'ruins' | 'space' | 'water' | 'bubble';

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
  | 'ghost' | 'coffin' | 'cobweb' | 'tombstone' | 'web'
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

const ALL_LEVELS = [
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

export function getLevel(index: number): LevelData {
    const safeIndex = Math.max(0, Math.min(index, ALL_LEVELS.length - 1));
    return ALL_LEVELS[safeIndex];
}

export function getLevelCount(): number {
    return ALL_LEVELS.length;
}

export function getBiome(levelIndex: number): Biome {
    return getLevel(levelIndex).biome;
}
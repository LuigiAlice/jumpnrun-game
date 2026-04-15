// Level creation helpers - separated to avoid circular imports
import type { PlatformType, EnemyType, QuestionBlockContent, DecorationType, Platform, Goal, MovingPlatform, LevelData } from './index';

export type { LevelData };
export const createPlat = (x: number, y: number, w: number, h: number, type: PlatformType): Platform => ({ x, y, w, h, type });
export const createCoin = (x: number, y: number) => ({ x, y });
export const createQB = (x: number, y: number, contents: QuestionBlockContent) => ({ x, y, contents });
export const createEnemy = (x: number, y: number, type: EnemyType) => ({ x, y, type });
export const createDeco = (x: number, y: number, type: DecorationType) => ({ x, y, type });
export const createGoal = (x: number, y: number, points: number, difficulty: Goal['difficulty']): Goal => ({ x, y, points, difficulty });
export const createMovingPlat = (x: number, y: number, w: number, h: number, type: PlatformType, moveType: 'horizontal' | 'vertical' | 'circular', range: number, speed: number): MovingPlatform => ({ x, y, w, h, type, moveType, range, speed });
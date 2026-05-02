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

export const gapWithPlatforms = (S: number, startX: number, baseY: number, gapWidth: number, platformCount: number): any[] => {
  const plats = [];
  const platformSpacing = gapWidth / (platformCount + 1);
  for (let i = 0; i < platformCount; i++) {
    const px = (startX + platformSpacing * (i + 1)) * S;
    const py = baseY - 60 - (i * 25);
    const pw = 100;
    const ptype = i % 3 === 0 ? 'platform_easy' : (i % 3 === 1 ? 'platform_medium' : 'platform_hard');
    plats.push(createPlat(px, py, pw, 24, ptype));
  }
  return plats;
};

export const pipeSection = (S: number, startX: number, y: number, pipeCount: number): any[] => {
  const plats = [];
  for (let i = 0; i < pipeCount; i++) {
    const px = (startX + 300 + i * 350) * S;
    const ph = 64;
    plats.push(createPlat(px, y, 64, ph, 'pipe'));
    plats.push(createPlat(px - 8, y - ph / 2 - 12, 80, 24, 'pipe_top'));
  }
  return plats;
};

export const verticalClimb = (S: number, startX: number, baseY: number, groundType: PlatformType = 'grass'): any[] => {
  const plats = [];
  plats.push(createPlat(startX * S, baseY - 80, 120 * S, 28, 'platform_easy'));
  plats.push(createPlat((startX + 300) * S, baseY - 160, 120 * S, 28, 'platform_medium'));
  plats.push(createPlat((startX + 600) * S, baseY - 240, 120 * S, 28, 'platform_hard'));
  plats.push(createPlat((startX + 900) * S, baseY - 320, 150 * S, 40, groundType));
  plats.push(createPlat((startX + 1200) * S, baseY - 240, 120 * S, 28, 'platform_hard'));
  plats.push(createPlat((startX + 1500) * S, baseY - 160, 120 * S, 28, 'platform_medium'));
  plats.push(createPlat((startX + 1800) * S, baseY - 80, 120 * S, 28, 'platform_easy'));
  return plats;
};
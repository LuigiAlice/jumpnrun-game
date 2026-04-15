import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createGoal } from './helpers';

const canyonGroundSection = (S: number, startX: number, baseY: number, width: number): any[] => {
  const plats = [];
  const groundHeight = 40;
  const sectionWidth = 500;
  for (let x = startX * S; x < (startX + width) * S; x += sectionWidth * S) {
    const actualWidth = Math.min(sectionWidth * S, (startX + width) * S - x);
    if (actualWidth > 100 * S) {
      plats.push(createPlat(x, baseY, actualWidth, groundHeight, 'stone'));
    }
    if (x + sectionWidth * S < (startX + width) * S) {
      const gapWidth = 150 * S;
      const platformY = baseY - 80;
      const platformWidth = 100 * S;
      plats.push(createPlat(x + sectionWidth * S - gapWidth / 2, platformY, platformWidth, 24, 'platform_easy'));
    }
  }
  return plats;
};

const canyonWallSection = (S: number, startX: number, baseY: number, height: number): any[] => {
  const plats = [];
  const wallCount = 4;
  for (let i = 0; i < wallCount; i++) {
    const wallX = (startX + i * 120) * S;
    const wallHeight = 60;
    const wallY = baseY - wallHeight;
    plats.push(createPlat(wallX, wallY, 60 * S, wallHeight, 'brick'));
    const platY = wallY - 50;
    plats.push(createPlat(wallX - 20 * S, platY, 100 * S, 24, 'platform_medium'));
  }
  return plats;
};

const canyonFloatingPlatforms = (S: number, startX: number, baseY: number, count: number): any[] => {
  const plats = [];
  for (let i = 0; i < count; i++) {
    const px = (startX + i * 200) * S;
    const py = baseY - 60 - (i * 25);
    const pw = 100 * S;
    const ptype = i % 3 === 0 ? 'platform_easy' : (i % 3 === 1 ? 'platform_medium' : 'platform_hard');
    plats.push(createPlat(px, py, pw, 24, ptype));
  }
  return plats;
};

const canyonVerticalSection = (S: number, startX: number, baseY: number, steps: number): any[] => {
  const plats = [];
  const stepHeight = 80;
  const stepWidth = 120;
  for (let i = 0; i < steps; i++) {
    const py = baseY - i * stepHeight;
    const px = (startX + i * 100) * S;
    const ptype = i % 3 === 0 ? 'platform_easy' : (i % 3 === 1 ? 'platform_medium' : 'platform_hard');
    plats.push(createPlat(px, py, stepWidth * S, 28, ptype));
  }
  return plats;
};

export const CANYON_BASE_LEVELS: LevelData[] = [
  {
    id: 73,
    name: "Canyon Descent",
    width: 19460,
    height: 600,
    biome: 'canyon-base',
    platforms: (() => {
      const S = 0.556;
      const plats: any[] = [];
      plats.push(createPlat(0, 550, 800 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 800, 550, 3000));
      plats.push(...canyonWallSection(S, 3800, 550, 200));
      plats.push(...canyonFloatingPlatforms(S, 4200, 550, 8));
      plats.push(createPlat(5800 * S, 550, 1000 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 6800, 550, 2500));
      plats.push(...canyonVerticalSection(S, 9400, 550, 6));
      plats.push(createPlat(10100 * S, 350, 600 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 10700, 350, 3000));
      plats.push(...canyonWallSection(S, 13700, 350, 180));
      plats.push(...canyonFloatingPlatforms(S, 14100, 350, 10));
      plats.push(createPlat(16200 * S, 350, 800 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 17000, 350, 2500));
      plats.push(...canyonVerticalSection(S, 19600, 350, 5));
      plats.push(createPlat(20300 * S, 150, 600 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 20900, 150, 3000));
      plats.push(...canyonWallSection(S, 23900, 150, 200));
      plats.push(...canyonFloatingPlatforms(S, 24300, 150, 8));
      plats.push(createPlat(26400 * S, 150, 800 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 27200, 150, 2500));
      plats.push(...canyonVerticalSection(S, 29800, 150, 6));
      plats.push(createPlat(30600 * S, 150, 4000 * S, 40, 'stone'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.556;
      const coins: any[] = [];
      for (let x = 200 * S; x < 3800 * S; x += 150 * S) coins.push(createCoin(x, 500));
      for (let x = 4200 * S; x < 5800 * S; x += 120 * S) coins.push(createCoin(x, 380));
      for (let x = 5800 * S; x < 6800 * S; x += 150 * S) coins.push(createCoin(x, 500));
      for (let x = 6800 * S; x < 9300 * S; x += 150 * S) coins.push(createCoin(x, 500));
      for (let x = 9400 * S; x < 10100 * S; x += 100 * S) coins.push(createCoin(x, 280));
      for (let x = 10700 * S; x < 13700 * S; x += 150 * S) coins.push(createCoin(x, 300));
      for (let x = 14100 * S; x < 16200 * S; x += 120 * S) coins.push(createCoin(x, 220));
      for (let x = 17000 * S; x < 19600 * S; x += 150 * S) coins.push(createCoin(x, 300));
      for (let x = 20300 * S; x < 23900 * S; x += 150 * S) coins.push(createCoin(x, 100));
      for (let x = 24300 * S; x < 26400 * S; x += 120 * S) coins.push(createCoin(x, 80));
      for (let x = 27200 * S; x < 29800 * S; x += 150 * S) coins.push(createCoin(x, 100));
      for (let x = 30600 * S; x < 34000 * S; x += 150 * S) coins.push(createCoin(x, 100));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.556;
      return [
        createQB(1500 * S, 480, 'coin'),
        createQB(3200 * S, 480, 'mushroom'),
        createQB(5000 * S, 420, 'flower'),
        createQB(7200 * S, 480, 'star'),
        createQB(9600 * S, 320, 'mushroom'),
        createQB(11400 * S, 280, 'coin'),
        createQB(14800 * S, 250, 'flower'),
        createQB(17800 * S, 280, 'star'),
        createQB(20900 * S, 80, 'mushroom'),
        createQB(25000 * S, 80, 'coin'),
      ];
    })(),
    enemies: (() => {
      const S = 0.556;
      return [
        createEnemy(600 * S, 460, 'goomba'), createEnemy(900 * S, 460, 'goomba'), createEnemy(1200 * S, 460, 'koopa'),
        createEnemy(1800 * S, 460, 'crab'), createEnemy(2400 * S, 460, 'spiny'), createEnemy(3000 * S, 460, 'goomba'),
        createEnemy(3600 * S, 460, 'koopa'), createEnemy(4200 * S, 460, 'fireball'), createEnemy(4500 * S, 340, 'thwomp'),
        createEnemy(5100 * S, 460, 'crab'), createEnemy(5700 * S, 460, 'spiny'), createEnemy(6300 * S, 460, 'goomba'),
        createEnemy(6900 * S, 460, 'koopa'), createEnemy(7500 * S, 460, 'fireball'), createEnemy(10200 * S, 260, 'thwomp'),
        createEnemy(12000 * S, 460, 'goomba'), createEnemy(12600 * S, 460, 'koopa'), createEnemy(15500 * S, 230, 'thwomp'),
        createEnemy(18500 * S, 460, 'goomba'), createEnemy(22000 * S, 80, 'koopa'), createEnemy(25800 * S, 60, 'thwomp'),
        createEnemy(28500 * S, 80, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.556;
      return [
        createDeco(300 * S, 500, 'canyon-rock'), createDeco(900 * S, 450, 'formation'), createDeco(1800 * S, 400, 'eagle'),
        createDeco(3000 * S, 480, 'canyon-rock'), createDeco(4500 * S, 350, 'formation'), createDeco(6000 * S, 450, 'eagle'),
        createDeco(7500 * S, 400, 'canyon-rock'), createDeco(9500 * S, 280, 'formation'), createDeco(11500 * S, 350, 'eagle'),
        createDeco(14000 * S, 250, 'canyon-rock'), createDeco(16000 * S, 300, 'formation'), createDeco(19000 * S, 280, 'eagle'),
        createDeco(22000 * S, 80, 'canyon-rock'), createDeco(26000 * S, 60, 'formation'), createDeco(30000 * S, 80, 'eagle'),
      ];
    })(),
    playerStart: { x: 150, y: 460 },
    goal: createGoal(19460 - 500, 100, 1500, 'easy'),
    timeBonus: 180,
  },
  {
    id: 74,
    name: "Rocky Heights",
    width: 20000,
    height: 650,
    biome: 'canyon-base',
    platforms: (() => {
      const S = 0.526;
      const plats: any[] = [];
      plats.push(createPlat(0, 600, 900 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 900, 600, 3500));
      plats.push(...canyonWallSection(S, 4400, 600, 220));
      plats.push(...canyonFloatingPlatforms(S, 4800, 600, 10));
      plats.push(createPlat(6800 * S, 600, 1200 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 8000, 600, 3000));
      plats.push(...canyonVerticalSection(S, 11100, 600, 7));
      plats.push(createPlat(12000 * S, 380, 700 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 12700, 380, 3500));
      plats.push(...canyonWallSection(S, 16200, 380, 200));
      plats.push(...canyonFloatingPlatforms(S, 16600, 380, 12));
      plats.push(createPlat(18800 * S, 380, 900 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 19700, 380, 3000));
      plats.push(...canyonVerticalSection(S, 22800, 380, 6));
      plats.push(createPlat(23600 * S, 180, 700 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 24300, 180, 3500));
      plats.push(...canyonWallSection(S, 27800, 180, 200));
      plats.push(...canyonFloatingPlatforms(S, 28200, 180, 10));
      plats.push(createPlat(30400 * S, 180, 1000 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 31400, 180, 3000));
      plats.push(...canyonVerticalSection(S, 34500, 180, 7));
      plats.push(createPlat(35400 * S, 180, 2600 * S, 40, 'stone'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.526;
      const coins: any[] = [];
      for (let x = 200 * S; x < 4400 * S; x += 160 * S) coins.push(createCoin(x, 550));
      for (let x = 4800 * S; x < 6800 * S; x += 130 * S) coins.push(createCoin(x, 420));
      for (let x = 6800 * S; x < 8000 * S; x += 160 * S) coins.push(createCoin(x, 550));
      for (let x = 8000 * S; x < 11100 * S; x += 160 * S) coins.push(createCoin(x, 550));
      for (let x = 11100 * S; x < 12000 * S; x += 100 * S) coins.push(createCoin(x, 300));
      for (let x = 12700 * S; x < 16200 * S; x += 160 * S) coins.push(createCoin(x, 330));
      for (let x = 16600 * S; x < 18800 * S; x += 130 * S) coins.push(createCoin(x, 250));
      for (let x = 19700 * S; x < 22800 * S; x += 160 * S) coins.push(createCoin(x, 330));
      for (let x = 22800 * S; x < 23600 * S; x += 100 * S) coins.push(createCoin(x, 150));
      for (let x = 24300 * S; x < 27800 * S; x += 160 * S) coins.push(createCoin(x, 130));
      for (let x = 28200 * S; x < 30400 * S; x += 130 * S) coins.push(createCoin(x, 100));
      for (let x = 31400 * S; x < 34500 * S; x += 160 * S) coins.push(createCoin(x, 130));
      for (let x = 34500 * S; x < 35400 * S; x += 100 * S) coins.push(createCoin(x, 100));
      for (let x = 35400 * S; x < 37500 * S; x += 160 * S) coins.push(createCoin(x, 130));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.526;
      return [
        createQB(1800 * S, 530, 'mushroom'), createQB(3800 * S, 530, 'coin'), createQB(5600 * S, 480, 'flower'),
        createQB(7800 * S, 530, 'star'), createQB(10000 * S, 380, 'mushroom'), createQB(12200 * S, 320, 'coin'),
        createQB(15000 * S, 320, 'flower'), createQB(17500 * S, 310, 'star'), createQB(21000 * S, 310, 'mushroom'),
        createQB(23200 * S, 120, 'coin'), createQB(26800 * S, 120, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.526;
      return [
        createEnemy(700 * S, 510, 'goomba'), createEnemy(1100 * S, 510, 'crab'), createEnemy(1500 * S, 510, 'goomba'),
        createEnemy(1900 * S, 510, 'koopa'), createEnemy(2300 * S, 510, 'spiny'), createEnemy(2600 * S, 510, 'koopa'),
        createEnemy(3000 * S, 510, 'fireball'), createEnemy(3400 * S, 510, 'goomba'), createEnemy(3800 * S, 510, 'crab'),
        createEnemy(4200 * S, 390, 'thwomp'), createEnemy(5000 * S, 390, 'thwomp'), createEnemy(5800 * S, 510, 'spiny'),
        createEnemy(6200 * S, 510, 'goomba'), createEnemy(6600 * S, 510, 'koopa'), createEnemy(7000 * S, 510, 'crab'),
        createEnemy(7400 * S, 510, 'fireball'), createEnemy(7800 * S, 510, 'goomba'), createEnemy(8200 * S, 510, 'spiny'),
        createEnemy(8600 * S, 510, 'koopa'), createEnemy(9000 * S, 510, 'crab'), createEnemy(9400 * S, 510, 'goomba'),
        createEnemy(9800 * S, 510, 'fireball'), createEnemy(10200 * S, 510, 'spiny'), createEnemy(10600 * S, 510, 'koopa'),
        createEnemy(11500 * S, 290, 'thwomp'),
      ];
    })(),
    decorations: (() => {
      const S = 0.526;
      return [
        createDeco(400 * S, 520, 'canyon-rock'), createDeco(1100 * S, 470, 'formation'), createDeco(2200 * S, 420, 'eagle'),
        createDeco(3800 * S, 500, 'canyon-rock'), createDeco(5200 * S, 380, 'formation'), createDeco(7000 * S, 500, 'eagle'),
        createDeco(9000 * S, 420, 'canyon-rock'), createDeco(10800 * S, 320, 'formation'), createDeco(13000 * S, 340, 'eagle'),
        createDeco(15800 * S, 300, 'canyon-rock'), createDeco(18000 * S, 320, 'formation'), createDeco(21000 * S, 280, 'eagle'),
        createDeco(25000 * S, 120, 'canyon-rock'), createDeco(29000 * S, 80, 'formation'), createDeco(33000 * S, 100, 'eagle'),
      ];
    })(),
    playerStart: { x: 150, y: 510 },
    goal: createGoal(20000 - 500, 130, 1800, 'medium'),
    timeBonus: 200,
  },
  {
    id: 75,
    name: "Stone Passages",
    width: 20000,
    height: 700,
    biome: 'canyon-base',
    platforms: (() => {
      const S = 0.476;
      const plats: any[] = [];
      plats.push(createPlat(0, 650, 1000 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 1000, 650, 4000));
      plats.push(...canyonWallSection(S, 5000, 650, 250));
      plats.push(...canyonFloatingPlatforms(S, 5500, 650, 12));
      plats.push(createPlat(7800 * S, 650, 1400 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 9200, 650, 3500));
      plats.push(...canyonVerticalSection(S, 12800, 650, 8));
      plats.push(createPlat(13800 * S, 420, 800 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 14600, 420, 4000));
      plats.push(...canyonWallSection(S, 18600, 420, 220));
      plats.push(...canyonFloatingPlatforms(S, 19000, 420, 14));
      plats.push(createPlat(21400 * S, 420, 1000 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 22400, 420, 3500));
      plats.push(...canyonVerticalSection(S, 26000, 420, 7));
      plats.push(createPlat(27000 * S, 200, 800 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 27800, 200, 4000));
      plats.push(...canyonWallSection(S, 31800, 200, 250));
      plats.push(...canyonFloatingPlatforms(S, 32200, 200, 12));
      plats.push(createPlat(34600 * S, 200, 1200 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 35800, 200, 3500));
      plats.push(...canyonVerticalSection(S, 39400, 200, 8));
      plats.push(createPlat(40400 * S, 200, 1600 * S, 40, 'stone'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.476;
      const coins: any[] = [];
      for (let x = 200 * S; x < 5000 * S; x += 170 * S) coins.push(createCoin(x, 600));
      for (let x = 5500 * S; x < 7800 * S; x += 140 * S) coins.push(createCoin(x, 480));
      for (let x = 7800 * S; x < 9200 * S; x += 170 * S) coins.push(createCoin(x, 600));
      for (let x = 9200 * S; x < 12800 * S; x += 170 * S) coins.push(createCoin(x, 600));
      for (let x = 12800 * S; x < 13800 * S; x += 110 * S) coins.push(createCoin(x, 360));
      for (let x = 14600 * S; x < 18600 * S; x += 170 * S) coins.push(createCoin(x, 370));
      for (let x = 19000 * S; x < 21400 * S; x += 140 * S) coins.push(createCoin(x, 290));
      for (let x = 22400 * S; x < 26000 * S; x += 170 * S) coins.push(createCoin(x, 370));
      for (let x = 26000 * S; x < 27000 * S; x += 110 * S) coins.push(createCoin(x, 160));
      for (let x = 27800 * S; x < 31800 * S; x += 170 * S) coins.push(createCoin(x, 150));
      for (let x = 32200 * S; x < 34600 * S; x += 140 * S) coins.push(createCoin(x, 120));
      for (let x = 35800 * S; x < 39400 * S; x += 170 * S) coins.push(createCoin(x, 150));
      for (let x = 39400 * S; x < 40400 * S; x += 110 * S) coins.push(createCoin(x, 120));
      for (let x = 40400 * S; x < 41500 * S; x += 170 * S) coins.push(createCoin(x, 150));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.476;
      return [
        createQB(2200 * S, 580, 'coin'), createQB(4500 * S, 580, 'mushroom'), createQB(6500 * S, 540, 'flower'),
        createQB(8800 * S, 580, 'star'), createQB(11500 * S, 420, 'mushroom'), createQB(13400 * S, 360, 'coin'),
        createQB(16200 * S, 360, 'flower'), createQB(20000 * S, 350, 'star'), createQB(23200 * S, 350, 'mushroom'),
        createQB(26600 * S, 140, 'coin'), createQB(29600 * S, 140, 'flower'), createQB(33600 * S, 140, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.476;
      return [
        createEnemy(800 * S, 550, 'goomba'), createEnemy(1300 * S, 550, 'crab'), createEnemy(1800 * S, 550, 'goomba'),
        createEnemy(2300 * S, 550, 'koopa'), createEnemy(2800 * S, 550, 'spiny'), createEnemy(3300 * S, 550, 'goomba'),
        createEnemy(3800 * S, 550, 'fireball'), createEnemy(4300 * S, 550, 'crab'), createEnemy(4800 * S, 550, 'spiny'),
        createEnemy(5300 * S, 550, 'koopa'), createEnemy(5800 * S, 440, 'thwomp'), createEnemy(6600 * S, 550, 'goomba'),
        createEnemy(7100 * S, 550, 'crab'), createEnemy(7600 * S, 550, 'spiny'), createEnemy(8100 * S, 550, 'goomba'),
        createEnemy(8600 * S, 550, 'fireball'), createEnemy(9100 * S, 550, 'koopa'), createEnemy(9600 * S, 550, 'crab'),
        createEnemy(10100 * S, 550, 'spiny'), createEnemy(10600 * S, 550, 'goomba'), createEnemy(11100 * S, 550, 'fireball'),
        createEnemy(11800 * S, 550, 'koopa'), createEnemy(12300 * S, 550, 'crab'), createEnemy(12800 * S, 550, 'spiny'),
        createEnemy(13200 * S, 330, 'thwomp'),
      ];
    })(),
    decorations: (() => {
      const S = 0.476;
      return [
        createDeco(500 * S, 570, 'canyon-rock'), createDeco(1300 * S, 520, 'formation'), createDeco(2600 * S, 470, 'eagle'),
        createDeco(4300 * S, 550, 'canyon-rock'), createDeco(6000 * S, 420, 'formation'), createDeco(8200 * S, 520, 'eagle'),
        createDeco(10500 * S, 480, 'canyon-rock'), createDeco(12400 * S, 350, 'formation'), createDeco(14800 * S, 380, 'eagle'),
        createDeco(17800 * S, 350, 'canyon-rock'), createDeco(20500 * S, 320, 'formation'), createDeco(23800 * S, 320, 'eagle'),
        createDeco(27200 * S, 130, 'canyon-rock'), createDeco(30600 * S, 90, 'formation'), createDeco(35000 * S, 100, 'eagle'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: createGoal(20000 - 500, 150, 2000, 'medium'),
    timeBonus: 210,
  },
  {
    id: 76,
    name: "Canyon Climb",
    width: 19536,
    height: 680,
    biome: 'canyon-base',
    platforms: (() => {
      const S = 0.444;
      const plats: any[] = [];
      plats.push(createPlat(0, 630, 1100 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 1100, 630, 4500));
      plats.push(...canyonWallSection(S, 5600, 630, 280));
      plats.push(...canyonFloatingPlatforms(S, 6100, 630, 14));
      plats.push(createPlat(8600 * S, 630, 1500 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 10100, 630, 4000));
      plats.push(...canyonVerticalSection(S, 14200, 630, 9));
      plats.push(createPlat(15300 * S, 400, 900 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 16200, 400, 4500));
      plats.push(...canyonWallSection(S, 20700, 400, 250));
      plats.push(...canyonFloatingPlatforms(S, 21200, 400, 16));
      plats.push(createPlat(23800 * S, 400, 1100 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 24900, 400, 4000));
      plats.push(...canyonVerticalSection(S, 29000, 400, 8));
      plats.push(createPlat(30000 * S, 180, 900 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 30900, 180, 4500));
      plats.push(...canyonWallSection(S, 35400, 180, 280));
      plats.push(...canyonFloatingPlatforms(S, 35900, 180, 14));
      plats.push(createPlat(38500 * S, 180, 1200 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 39700, 180, 4000));
      plats.push(...canyonVerticalSection(S, 43800, 180, 9));
      plats.push(createPlat(44800 * S, 180, 200 * S, 40, 'stone'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.444;
      const coins: any[] = [];
      for (let x = 200 * S; x < 5600 * S; x += 180 * S) coins.push(createCoin(x, 580));
      for (let x = 6100 * S; x < 8600 * S; x += 150 * S) coins.push(createCoin(x, 480));
      for (let x = 8600 * S; x < 10100 * S; x += 180 * S) coins.push(createCoin(x, 580));
      for (let x = 10100 * S; x < 14200 * S; x += 180 * S) coins.push(createCoin(x, 580));
      for (let x = 14200 * S; x < 15300 * S; x += 120 * S) coins.push(createCoin(x, 380));
      for (let x = 16200 * S; x < 20700 * S; x += 180 * S) coins.push(createCoin(x, 350));
      for (let x = 21200 * S; x < 23800 * S; x += 150 * S) coins.push(createCoin(x, 280));
      for (let x = 24900 * S; x < 29000 * S; x += 180 * S) coins.push(createCoin(x, 350));
      for (let x = 29000 * S; x < 30000 * S; x += 120 * S) coins.push(createCoin(x, 180));
      for (let x = 30900 * S; x < 35400 * S; x += 180 * S) coins.push(createCoin(x, 130));
      for (let x = 35900 * S; x < 38500 * S; x += 150 * S) coins.push(createCoin(x, 100));
      for (let x = 39700 * S; x < 43800 * S; x += 180 * S) coins.push(createCoin(x, 130));
      for (let x = 43800 * S; x < 44800 * S; x += 120 * S) coins.push(createCoin(x, 100));
      for (let x = 44800 * S; x < 44800 * S; x += 180 * S) coins.push(createCoin(x, 130));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.444;
      return [
        createQB(2500 * S, 560, 'mushroom'), createQB(5000 * S, 560, 'coin'), createQB(7200 * S, 560, 'flower'),
        createQB(9400 * S, 560, 'star'), createQB(12000 * S, 380, 'mushroom'), createQB(14500 * S, 340, 'coin'),
        createQB(17400 * S, 340, 'flower'), createQB(22000 * S, 330, 'star'), createQB(25800 * S, 330, 'mushroom'),
        createQB(28600 * S, 120, 'coin'), createQB(32200 * S, 120, 'flower'), createQB(36800 * S, 120, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.444;
      return [
        createEnemy(900 * S, 530, 'goomba'), createEnemy(1400 * S, 530, 'crab'), createEnemy(1900 * S, 530, 'spiny'),
        createEnemy(2400 * S, 530, 'goomba'), createEnemy(2900 * S, 530, 'koopa'), createEnemy(3400 * S, 530, 'fireball'),
        createEnemy(3900 * S, 530, 'crab'), createEnemy(4400 * S, 530, 'spiny'), createEnemy(4900 * S, 530, 'goomba'),
        createEnemy(5400 * S, 530, 'koopa'), createEnemy(5900 * S, 530, 'fireball'), createEnemy(6400 * S, 420, 'thwomp'),
        createEnemy(7400 * S, 530, 'crab'), createEnemy(7900 * S, 530, 'spiny'), createEnemy(8400 * S, 530, 'goomba'),
        createEnemy(8900 * S, 530, 'koopa'), createEnemy(9400 * S, 530, 'fireball'), createEnemy(9900 * S, 530, 'crab'),
        createEnemy(10400 * S, 530, 'spiny'), createEnemy(10900 * S, 530, 'goomba'), createEnemy(11400 * S, 530, 'koopa'),
        createEnemy(11900 * S, 530, 'fireball'), createEnemy(12400 * S, 530, 'crab'), createEnemy(12900 * S, 530, 'spiny'),
        createEnemy(13400 * S, 530, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.444;
      return [
        createDeco(600 * S, 550, 'canyon-rock'), createDeco(1500 * S, 500, 'formation'), createDeco(2900 * S, 450, 'eagle'),
        createDeco(4800 * S, 530, 'canyon-rock'), createDeco(6800 * S, 400, 'formation'), createDeco(9400 * S, 500, 'eagle'),
        createDeco(11800 * S, 460, 'canyon-rock'), createDeco(13800 * S, 320, 'formation'), createDeco(16800 * S, 360, 'eagle'),
        createDeco(20000 * S, 320, 'canyon-rock'), createDeco(23000 * S, 300, 'formation'), createDeco(26800 * S, 300, 'eagle'),
        createDeco(30200 * S, 110, 'canyon-rock'), createDeco(33800 * S, 80, 'formation'), createDeco(38200 * S, 90, 'eagle'),
      ];
    })(),
    playerStart: { x: 150, y: 530 },
    goal: createGoal(19536 - 500, 130, 2200, 'hard'),
    timeBonus: 180,
  },
  {
    id: 77,
    name: "Eagle's Crossing",
    width: 20016,
    height: 700,
    biome: 'canyon-base',
    platforms: (() => {
      const S = 0.417;
      const plats: any[] = [];
      plats.push(createPlat(0, 650, 1200 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 1200, 650, 5000));
      plats.push(...canyonWallSection(S, 6200, 650, 300));
      plats.push(...canyonFloatingPlatforms(S, 6800, 650, 16));
      plats.push(createPlat(9400 * S, 650, 1600 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 11000, 650, 4500));
      plats.push(...canyonVerticalSection(S, 15600, 650, 10));
      plats.push(createPlat(16800 * S, 400, 1000 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 17800, 400, 5000));
      plats.push(...canyonWallSection(S, 22800, 400, 280));
      plats.push(...canyonFloatingPlatforms(S, 23400, 400, 18));
      plats.push(createPlat(26200 * S, 400, 1200 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 27400, 400, 4500));
      plats.push(...canyonVerticalSection(S, 32000, 400, 9));
      plats.push(createPlat(33200 * S, 180, 1000 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 34200, 180, 5000));
      plats.push(...canyonWallSection(S, 39200, 180, 300));
      plats.push(...canyonFloatingPlatforms(S, 39800, 180, 16));
      plats.push(createPlat(42600 * S, 180, 1400 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 44000, 180, 4000));
      return plats;
    })(),
    coins: (() => {
      const S = 0.417;
      const coins: any[] = [];
      for (let x = 200 * S; x < 6200 * S; x += 190 * S) coins.push(createCoin(x, 600));
      for (let x = 6800 * S; x < 9400 * S; x += 160 * S) coins.push(createCoin(x, 500));
      for (let x = 9400 * S; x < 11000 * S; x += 190 * S) coins.push(createCoin(x, 600));
      for (let x = 11000 * S; x < 15600 * S; x += 190 * S) coins.push(createCoin(x, 600));
      for (let x = 15600 * S; x < 16800 * S; x += 130 * S) coins.push(createCoin(x, 400));
      for (let x = 17800 * S; x < 22800 * S; x += 190 * S) coins.push(createCoin(x, 350));
      for (let x = 23400 * S; x < 26200 * S; x += 160 * S) coins.push(createCoin(x, 280));
      for (let x = 27400 * S; x < 32000 * S; x += 190 * S) coins.push(createCoin(x, 350));
      for (let x = 32000 * S; x < 33200 * S; x += 130 * S) coins.push(createCoin(x, 180));
      for (let x = 34200 * S; x < 39200 * S; x += 190 * S) coins.push(createCoin(x, 130));
      for (let x = 39800 * S; x < 42600 * S; x += 160 * S) coins.push(createCoin(x, 100));
      for (let x = 44000 * S; x < 47500 * S; x += 190 * S) coins.push(createCoin(x, 130));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.417;
      return [
        createQB(2800 * S, 580, 'coin'), createQB(5400 * S, 580, 'mushroom'), createQB(7800 * S, 580, 'flower'),
        createQB(10200 * S, 580, 'star'), createQB(13200 * S, 380, 'mushroom'), createQB(16000 * S, 340, 'coin'),
        createQB(19000 * S, 340, 'flower'), createQB(24200 * S, 330, 'star'), createQB(28200 * S, 330, 'mushroom'),
        createQB(31600 * S, 120, 'coin'), createQB(35400 * S, 120, 'flower'), createQB(40600 * S, 120, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.417;
      return [
        createEnemy(1000 * S, 550, 'goomba'), createEnemy(1600 * S, 550, 'crab'), createEnemy(2200 * S, 550, 'spiny'),
        createEnemy(2800 * S, 550, 'goomba'), createEnemy(3400 * S, 550, 'koopa'), createEnemy(4000 * S, 550, 'fireball'),
        createEnemy(4600 * S, 550, 'crab'), createEnemy(5200 * S, 550, 'spiny'), createEnemy(5800 * S, 550, 'goomba'),
        createEnemy(6400 * S, 550, 'koopa'), createEnemy(7000 * S, 550, 'fireball'), createEnemy(7600 * S, 550, 'crab'),
        createEnemy(8200 * S, 550, 'spiny'), createEnemy(8800 * S, 550, 'goomba'), createEnemy(9400 * S, 550, 'koopa'),
        createEnemy(10000 * S, 550, 'fireball'), createEnemy(10500 * S, 550, 'crab'), createEnemy(11000 * S, 550, 'spiny'),
        createEnemy(11500 * S, 550, 'goomba'), createEnemy(12000 * S, 550, 'koopa'), createEnemy(12500 * S, 550, 'fireball'),
        createEnemy(13000 * S, 550, 'crab'), createEnemy(13500 * S, 550, 'spiny'), createEnemy(14000 * S, 550, 'goomba'),
        createEnemy(14500 * S, 550, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.417;
      return [
        createDeco(700 * S, 570, 'canyon-rock'), createDeco(1700 * S, 520, 'formation'), createDeco(3200 * S, 470, 'eagle'),
        createDeco(5300 * S, 550, 'canyon-rock'), createDeco(7600 * S, 430, 'formation'), createDeco(10400 * S, 520, 'eagle'),
        createDeco(13000 * S, 480, 'canyon-rock'), createDeco(15200 * S, 330, 'formation'), createDeco(18600 * S, 370, 'eagle'),
        createDeco(22000 * S, 340, 'canyon-rock'), createDeco(25400 * S, 310, 'formation'), createDeco(29600 * S, 310, 'eagle'),
        createDeco(33600 * S, 120, 'canyon-rock'), createDeco(37400 * S, 90, 'formation'), createDeco(42000 * S, 100, 'eagle'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: createGoal(20016 - 500, 130, 2400, 'hard'),
    timeBonus: 200,
  },
  {
    id: 78,
    name: "Canyon Summit",
    width: 20000,
    height: 700,
    biome: 'canyon-base',
    platforms: (() => {
      const S = 0.4;
      const plats: any[] = [];
      plats.push(createPlat(0, 650, 1400 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 1400, 650, 5500));
      plats.push(...canyonWallSection(S, 6900, 650, 320));
      plats.push(...canyonFloatingPlatforms(S, 7600, 650, 18));
      plats.push(createPlat(10400 * S, 650, 1800 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 12200, 650, 5000));
      plats.push(...canyonVerticalSection(S, 17300, 650, 11));
      plats.push(createPlat(18600 * S, 380, 1100 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 19700, 380, 5500));
      plats.push(...canyonWallSection(S, 25200, 380, 300));
      plats.push(...canyonFloatingPlatforms(S, 25900, 380, 20));
      plats.push(createPlat(28900 * S, 380, 1400 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 30300, 380, 5000));
      plats.push(...canyonVerticalSection(S, 35400, 380, 10));
      plats.push(createPlat(36600 * S, 150, 1200 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 37800, 150, 5500));
      plats.push(...canyonWallSection(S, 43300, 150, 320));
      plats.push(...canyonFloatingPlatforms(S, 44000, 150, 18));
      plats.push(createPlat(47000 * S, 150, 3000 * S, 40, 'stone'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.4;
      const coins: any[] = [];
      for (let x = 200 * S; x < 6900 * S; x += 200 * S) coins.push(createCoin(x, 600));
      for (let x = 7600 * S; x < 10400 * S; x += 170 * S) coins.push(createCoin(x, 500));
      for (let x = 10400 * S; x < 12200 * S; x += 200 * S) coins.push(createCoin(x, 600));
      for (let x = 12200 * S; x < 17300 * S; x += 200 * S) coins.push(createCoin(x, 600));
      for (let x = 17300 * S; x < 18600 * S; x += 140 * S) coins.push(createCoin(x, 420));
      for (let x = 19700 * S; x < 25200 * S; x += 200 * S) coins.push(createCoin(x, 330));
      for (let x = 25900 * S; x < 28900 * S; x += 170 * S) coins.push(createCoin(x, 260));
      for (let x = 30300 * S; x < 35400 * S; x += 200 * S) coins.push(createCoin(x, 330));
      for (let x = 35400 * S; x < 36600 * S; x += 140 * S) coins.push(createCoin(x, 170));
      for (let x = 37800 * S; x < 43300 * S; x += 200 * S) coins.push(createCoin(x, 100));
      for (let x = 44000 * S; x < 47000 * S; x += 170 * S) coins.push(createCoin(x, 80));
      for (let x = 47000 * S; x < 49500 * S; x += 200 * S) coins.push(createCoin(x, 100));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.4;
      return [
        createQB(3000 * S, 580, 'coin'), createQB(5800 * S, 580, 'mushroom'), createQB(8400 * S, 580, 'flower'),
        createQB(11000 * S, 580, 'star'), createQB(14200 * S, 380, 'mushroom'), createQB(17200 * S, 340, 'coin'),
        createQB(20600 * S, 320, 'flower'), createQB(26800 * S, 310, 'star'), createQB(31000 * S, 310, 'mushroom'),
        createQB(35000 * S, 100, 'coin'), createQB(39000 * S, 100, 'flower'), createQB(45000 * S, 80, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.4;
      return [
        createEnemy(1100 * S, 550, 'goomba'), createEnemy(1800 * S, 550, 'crab'), createEnemy(2500 * S, 550, 'spiny'),
        createEnemy(3200 * S, 550, 'goomba'), createEnemy(3900 * S, 550, 'koopa'), createEnemy(4600 * S, 550, 'fireball'),
        createEnemy(5300 * S, 550, 'crab'), createEnemy(6000 * S, 550, 'spiny'), createEnemy(6700 * S, 550, 'goomba'),
        createEnemy(7400 * S, 550, 'koopa'), createEnemy(8100 * S, 550, 'fireball'), createEnemy(8800 * S, 550, 'crab'),
        createEnemy(9500 * S, 550, 'spiny'), createEnemy(10200 * S, 550, 'goomba'), createEnemy(10900 * S, 550, 'koopa'),
        createEnemy(11600 * S, 550, 'fireball'), createEnemy(12300 * S, 550, 'crab'), createEnemy(13000 * S, 550, 'spiny'),
        createEnemy(13700 * S, 550, 'goomba'), createEnemy(14400 * S, 550, 'koopa'), createEnemy(15100 * S, 550, 'fireball'),
        createEnemy(15800 * S, 550, 'crab'), createEnemy(16500 * S, 550, 'spiny'), createEnemy(17200 * S, 550, 'goomba'),
        createEnemy(17900 * S, 280, 'thwomp'),
      ];
    })(),
    decorations: (() => {
      const S = 0.4;
      return [
        createDeco(800 * S, 570, 'canyon-rock'), createDeco(1900 * S, 520, 'formation'), createDeco(3600 * S, 470, 'eagle'),
        createDeco(5900 * S, 550, 'canyon-rock'), createDeco(8500 * S, 430, 'formation'), createDeco(11600 * S, 520, 'eagle'),
        createDeco(14400 * S, 480, 'canyon-rock'), createDeco(16800 * S, 310, 'formation'), createDeco(20800 * S, 350, 'eagle'),
        createDeco(24400 * S, 320, 'canyon-rock'), createDeco(28000 * S, 290, 'formation'), createDeco(32800 * S, 290, 'eagle'),
        createDeco(37000 * S, 100, 'canyon-rock'), createDeco(41000 * S, 70, 'formation'), createDeco(46000 * S, 80, 'eagle'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: createGoal(20000 - 500, 100, 2600, 'hard'),
    timeBonus: 220,
  },
];

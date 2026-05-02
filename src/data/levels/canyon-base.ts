import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createGoal, createMovingPlat, pipeSection, verticalClimb, gapWithPlatforms } from './helpers';

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
  // ============================================================
  // LEVEL 73 — Canyon Descent (Tutorial)
  // Linear descent through descending stone ground sections.
  // Few enemies, lots of coins, learn the mechanics.
  // ============================================================
  {
    id: 73,
    name: "Canyon Descent",
    width: 17000,
    height: 600,
    biome: 'canyon-base',
    platforms: (() => {
      const S = 0.556;
      const plats: any[] = [];
      plats.push(createPlat(0, 550, 900 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 900, 550, 3000));
      plats.push(...gapWithPlatforms(S, 4100, 550, 600, 3));
      plats.push(createPlat(5000 * S, 470, 800 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 5800, 470, 2800));
      plats.push(...canyonWallSection(S, 8800, 470, 150));
      plats.push(createPlat(9300 * S, 390, 700 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 10000, 390, 2400));
      plats.push(...gapWithPlatforms(S, 12700, 390, 500, 3));
      plats.push(createPlat(13500 * S, 310, 700 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 14200, 310, 2000));
      plats.push(...canyonVerticalSection(S, 16600, 310, 5));
      plats.push(createPlat(17600 * S, 80, 800 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 18400, 80, 2000));
      plats.push(createPlat(20800 * S, 80, 1000 * S, 40, 'stone'));
      return plats;
    })(),
    movingPlatforms: (() => {
      const S = 0.556;
      return [
        createMovingPlat(4500 * S, 420, 150, 24, 'platform_medium', 'horizontal', 400, 18),
      ];
    })(),
    coins: (() => {
      const S = 0.556;
      const coins: any[] = [];
      for (let x = 200 * S; x < 3800 * S; x += 150 * S) coins.push(createCoin(x, 500));
      for (let x = 4400 * S; x < 5800 * S; x += 120 * S) coins.push(createCoin(x, 420));
      for (let x = 5800 * S; x < 8800 * S; x += 150 * S) coins.push(createCoin(x, 420));
      for (let x = 8800 * S; x < 9300 * S; x += 100 * S) coins.push(createCoin(x, 350));
      for (let x = 10000 * S; x < 12600 * S; x += 150 * S) coins.push(createCoin(x, 340));
      for (let x = 13000 * S; x < 14200 * S; x += 120 * S) coins.push(createCoin(x, 260));
      for (let x = 14200 * S; x < 16600 * S; x += 150 * S) coins.push(createCoin(x, 260));
      for (let x = 16600 * S; x < 17600 * S; x += 100 * S) coins.push(createCoin(x, 160));
      for (let x = 18400 * S; x < 20800 * S; x += 150 * S) coins.push(createCoin(x, 30));
      for (let x = 20800 * S; x < 21800 * S; x += 150 * S) coins.push(createCoin(x, 30));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.556;
      return [
        createQB(1500 * S, 480, 'coin'),
        createQB(4000 * S, 450, 'mushroom'),
        createQB(6800 * S, 400, 'coin'),
        createQB(10300 * S, 320, 'flower'),
        createQB(16200 * S, 220, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.556;
      return [
        createEnemy(1200 * S, 460, 'goomba'),
        createEnemy(6000 * S, 380, 'goomba'),
        createEnemy(10500 * S, 300, 'goomba'),
        createEnemy(18000 * S, 30, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.556;
      return [
        createDeco(500 * S, 500, 'canyon-rock'),
        createDeco(2000 * S, 480, 'formation'),
        createDeco(4500 * S, 400, 'eagle'),
        createDeco(7500 * S, 400, 'canyon-rock'),
        createDeco(11000 * S, 320, 'formation'),
        createDeco(15000 * S, 240, 'canyon-rock'),
        createDeco(19000 * S, 60, 'eagle'),
      ];
    })(),
    playerStart: { x: 100, y: 470 },
    goal: createGoal(21300 * 0.556, 48, 1200, 'easy'),
    timeBonus: 180,
  },

  // ============================================================
  // LEVEL 74 — Canyon Gaps (Gap-Strecke)
  // 5 gap sections across canyons with moving platforms.
  // ============================================================
  {
    id: 74,
    name: "Canyon Gaps",
    width: 22000,
    height: 650,
    biome: 'canyon-base',
    platforms: (() => {
      const S = 0.526;
      const plats: any[] = [];
      plats.push(createPlat(0, 600, 1000 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 1000, 600, 2500));
      // Gap 1
      plats.push(createPlat(3800 * S, 600, 600 * S, 40, 'stone'));
      plats.push(...gapWithPlatforms(S, 4400, 600, 800, 4));
      plats.push(createPlat(5600 * S, 600, 800 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 6400, 600, 2000));
      // Gap 2
      plats.push(createPlat(8700 * S, 550, 500 * S, 40, 'stone'));
      plats.push(...gapWithPlatforms(S, 9200, 550, 900, 5));
      plats.push(...canyonWallSection(S, 10500, 550, 160));
      plats.push(createPlat(11000 * S, 550, 900 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 11900, 550, 2000));
      // Gap 3
      plats.push(createPlat(14200 * S, 480, 500 * S, 40, 'stone'));
      plats.push(...gapWithPlatforms(S, 14700, 480, 700, 4));
      plats.push(createPlat(15800 * S, 480, 700 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 16500, 480, 2000));
      // Gap 4
      plats.push(createPlat(18800 * S, 420, 500 * S, 40, 'stone'));
      plats.push(...gapWithPlatforms(S, 19300, 420, 900, 5));
      plats.push(createPlat(20600 * S, 420, 600 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 21200, 420, 2000));
      plats.push(...canyonVerticalSection(S, 23500, 420, 4));
      // Gap 5
      plats.push(createPlat(24300 * S, 340, 400 * S, 40, 'stone'));
      plats.push(...gapWithPlatforms(S, 24700, 340, 600, 4));
      plats.push(createPlat(25700 * S, 340, 600 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 26300, 340, 2000));
      plats.push(...canyonWallSection(S, 28600, 340, 150));
      plats.push(createPlat(29100 * S, 260, 800 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 29900, 260, 2500));
      // Goal area
      plats.push(...canyonVerticalSection(S, 32700, 260, 4));
      plats.push(createPlat(33600 * S, 150, 800 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 34400, 150, 2000));
      plats.push(createPlat(36800 * S, 150, 600 * S, 40, 'stone'));
      return plats;
    })(),
    movingPlatforms: (() => {
      const S = 0.526;
      return [
        createMovingPlat(4900 * S, 480, 150, 24, 'platform_medium', 'horizontal', 500, 20),
        createMovingPlat(15000 * S, 380, 150, 24, 'platform_medium', 'vertical', 150, 18),
        createMovingPlat(20000 * S, 320, 150, 24, 'platform_medium', 'horizontal', 400, 22),
      ];
    })(),
    coins: (() => {
      const S = 0.526;
      const coins: any[] = [];
      for (let x = 200 * S; x < 3500 * S; x += 150 * S) coins.push(createCoin(x, 550));
      for (let x = 3800 * S; x < 6400 * S; x += 120 * S) coins.push(createCoin(x, 550));
      for (let x = 6400 * S; x < 8700 * S; x += 150 * S) coins.push(createCoin(x, 550));
      for (let x = 9200 * S; x < 11000 * S; x += 120 * S) coins.push(createCoin(x, 500));
      for (let x = 11000 * S; x < 14200 * S; x += 150 * S) coins.push(createCoin(x, 500));
      for (let x = 14200 * S; x < 16500 * S; x += 120 * S) coins.push(createCoin(x, 430));
      for (let x = 16500 * S; x < 18800 * S; x += 150 * S) coins.push(createCoin(x, 430));
      for (let x = 19300 * S; x < 21200 * S; x += 120 * S) coins.push(createCoin(x, 370));
      for (let x = 21200 * S; x < 23500 * S; x += 150 * S) coins.push(createCoin(x, 370));
      for (let x = 23500 * S; x < 24700 * S; x += 100 * S) coins.push(createCoin(x, 300));
      for (let x = 25700 * S; x < 28600 * S; x += 150 * S) coins.push(createCoin(x, 290));
      for (let x = 29100 * S; x < 32700 * S; x += 150 * S) coins.push(createCoin(x, 210));
      for (let x = 32700 * S; x < 34400 * S; x += 100 * S) coins.push(createCoin(x, 140));
      for (let x = 34400 * S; x < 36800 * S; x += 150 * S) coins.push(createCoin(x, 100));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.526;
      return [
        createQB(200 * S, 530, 'mushroom'),
        createQB(4100 * S, 530, 'coin'),
        createQB(6000 * S, 530, 'flower'),
        createQB(11400 * S, 480, 'coin'),
        createQB(16200 * S, 410, 'star'),
        createQB(26000 * S, 270, 'mushroom'),
        createQB(34000 * S, 80, 'coin'),
      ];
    })(),
    enemies: (() => {
      const S = 0.526;
      return [
        createEnemy(2000 * S, 510, 'goomba'),
        createEnemy(5000 * S, 510, 'spiny'),
        createEnemy(7000 * S, 510, 'crab'),
        createEnemy(10200 * S, 460, 'goomba'),
        createEnemy(12000 * S, 460, 'koopa'),
        createEnemy(14800 * S, 390, 'thwomp'),
        createEnemy(17500 * S, 390, 'spiny'),
        createEnemy(22000 * S, 330, 'crab'),
        createEnemy(27000 * S, 250, 'goomba'),
        createEnemy(35000 * S, 60, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.526;
      return [
        createDeco(800 * S, 520, 'canyon-rock'),
        createDeco(3200 * S, 500, 'formation'),
        createDeco(8000 * S, 460, 'eagle'),
        createDeco(13000 * S, 420, 'canyon-rock'),
        createDeco(18000 * S, 380, 'formation'),
        createDeco(24000 * S, 260, 'canyon-rock'),
        createDeco(31000 * S, 200, 'eagle'),
        createDeco(36000 * S, 100, 'formation'),
      ];
    })(),
    playerStart: { x: 100, y: 520 },
    goal: createGoal(37100 * 0.526, 118, 1500, 'medium'),
    timeBonus: 200,
  },

  // ============================================================
  // LEVEL 75 — Pipe Maze (Röhren-Labyrinth)
  // 6 pipe sections with piranhas. Navigate the pipe labyrinth.
  // ============================================================
  {
    id: 75,
    name: "Pipe Maze",
    width: 22000,
    height: 750,
    biome: 'canyon-base',
    platforms: (() => {
      const S = 0.5;
      const plats: any[] = [];
      plats.push(createPlat(0, 700, 800 * S, 40, 'stone'));
      // Pipe section 1
      plats.push(createPlat(1000 * S, 700, 500 * S, 40, 'stone'));
      plats.push(...pipeSection(S, 1200, 700, 3));
      plats.push(createPlat(2200 * S, 700, 400 * S, 40, 'stone'));
      // Pipe section 2
      plats.push(...canyonGroundSection(S, 2800, 700, 1200));
      plats.push(createPlat(4200 * S, 700, 600 * S, 40, 'stone'));
      plats.push(...pipeSection(S, 4500, 700, 4));
      plats.push(createPlat(5600 * S, 700, 500 * S, 40, 'stone'));
      // Pipe section 3
      plats.push(...canyonWallSection(S, 6300, 700, 160));
      plats.push(createPlat(6800 * S, 640, 400 * S, 40, 'stone'));
      plats.push(...pipeSection(S, 7000, 640, 3));
      plats.push(createPlat(7900 * S, 640, 500 * S, 40, 'stone'));
      // Pipe section 4
      plats.push(...canyonGroundSection(S, 8600, 640, 1500));
      plats.push(createPlat(10300 * S, 570, 500 * S, 40, 'stone'));
      plats.push(...pipeSection(S, 10500, 570, 4));
      plats.push(createPlat(11600 * S, 570, 600 * S, 40, 'stone'));
      // Pipe section 5
      plats.push(...canyonVerticalSection(S, 12500, 570, 3));
      plats.push(createPlat(13100 * S, 490, 400 * S, 40, 'stone'));
      plats.push(...pipeSection(S, 13300, 490, 3));
      plats.push(createPlat(14200 * S, 490, 600 * S, 40, 'stone'));
      // Pipe section 6
      plats.push(...canyonGroundSection(S, 15000, 490, 1500));
      plats.push(createPlat(16800 * S, 420, 500 * S, 40, 'stone'));
      plats.push(...pipeSection(S, 17000, 420, 4));
      plats.push(createPlat(18100 * S, 420, 700 * S, 40, 'stone'));
      // Goal area
      plats.push(...canyonWallSection(S, 19200, 420, 150));
      plats.push(...canyonVerticalSection(S, 19700, 420, 4));
      plats.push(createPlat(20600 * S, 330, 600 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 21200, 330, 2000));
      plats.push(createPlat(23600 * S, 250, 600 * S, 40, 'stone'));
      plats.push(...canyonFloatingPlatforms(S, 24200, 250, 6));
      plats.push(createPlat(25800 * S, 170, 800 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 26600, 170, 2000));
      plats.push(createPlat(29000 * S, 170, 1000 * S, 40, 'stone'));
      return plats;
    })(),
    movingPlatforms: (() => {
      const S = 0.5;
      return [
        createMovingPlat(5300 * S, 560, 150, 24, 'platform_medium', 'horizontal', 400, 20),
        createMovingPlat(23500 * S, 180, 150, 24, 'platform_medium', 'vertical', 150, 18),
      ];
    })(),
    coins: (() => {
      const S = 0.5;
      const coins: any[] = [];
      for (let x = 200 * S; x < 1000 * S; x += 120 * S) coins.push(createCoin(x, 650));
      for (let x = 1000 * S; x < 2800 * S; x += 130 * S) coins.push(createCoin(x, 650));
      for (let x = 2800 * S; x < 4200 * S; x += 150 * S) coins.push(createCoin(x, 650));
      for (let x = 4200 * S; x < 6300 * S; x += 130 * S) coins.push(createCoin(x, 650));
      for (let x = 6800 * S; x < 8600 * S; x += 150 * S) coins.push(createCoin(x, 590));
      for (let x = 8600 * S; x < 10300 * S; x += 130 * S) coins.push(createCoin(x, 590));
      for (let x = 10300 * S; x < 12500 * S; x += 120 * S) coins.push(createCoin(x, 520));
      for (let x = 12500 * S; x < 13300 * S; x += 100 * S) coins.push(createCoin(x, 450));
      for (let x = 13300 * S; x < 15000 * S; x += 130 * S) coins.push(createCoin(x, 440));
      for (let x = 15000 * S; x < 16800 * S; x += 150 * S) coins.push(createCoin(x, 440));
      for (let x = 16800 * S; x < 19200 * S; x += 120 * S) coins.push(createCoin(x, 370));
      for (let x = 19700 * S; x < 20600 * S; x += 100 * S) coins.push(createCoin(x, 290));
      for (let x = 21200 * S; x < 23600 * S; x += 150 * S) coins.push(createCoin(x, 280));
      for (let x = 24200 * S; x < 25800 * S; x += 100 * S) coins.push(createCoin(x, 190));
      for (let x = 25800 * S; x < 26600 * S; x += 130 * S) coins.push(createCoin(x, 120));
      for (let x = 26600 * S; x < 29000 * S; x += 150 * S) coins.push(createCoin(x, 120));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.5;
      return [
        createQB(3000 * S, 630, 'coin'),
        createQB(6000 * S, 630, 'mushroom'),
        createQB(9000 * S, 570, 'flower'),
        createQB(12100 * S, 500, 'coin'),
        createQB(15500 * S, 420, 'star'),
        createQB(20500 * S, 260, 'mushroom'),
        createQB(27000 * S, 100, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.5;
      return [
        createEnemy(600 * S, 650, 'goomba'),
        createEnemy(1400 * S, 650, 'piranha'),
        createEnemy(1600 * S, 650, 'piranha'),
        createEnemy(1900 * S, 650, 'piranha'),
        createEnemy(3200 * S, 650, 'goomba'),
        createEnemy(4700 * S, 650, 'piranha'),
        createEnemy(4900 * S, 650, 'piranha'),
        createEnemy(5100 * S, 650, 'piranha'),
        createEnemy(5400 * S, 650, 'piranha'),
        createEnemy(7200 * S, 590, 'piranha'),
        createEnemy(7400 * S, 590, 'piranha'),
        createEnemy(7700 * S, 590, 'piranha'),
        createEnemy(9000 * S, 590, 'crab'),
        createEnemy(10700 * S, 520, 'piranha'),
        createEnemy(10900 * S, 520, 'piranha'),
        createEnemy(11100 * S, 520, 'piranha'),
        createEnemy(11400 * S, 520, 'piranha'),
        createEnemy(13500 * S, 440, 'piranha'),
        createEnemy(13700 * S, 440, 'piranha'),
        createEnemy(14000 * S, 440, 'piranha'),
        createEnemy(15300 * S, 440, 'thwomp'),
        createEnemy(17200 * S, 370, 'piranha'),
        createEnemy(17400 * S, 370, 'piranha'),
        createEnemy(17600 * S, 370, 'piranha'),
        createEnemy(17900 * S, 370, 'piranha'),
        createEnemy(22000 * S, 280, 'spiny'),
        createEnemy(27200 * S, 120, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.5;
      return [
        createDeco(600 * S, 650, 'canyon-rock'),
        createDeco(2000 * S, 650, 'formation'),
        createDeco(4600 * S, 650, 'eagle'),
        createDeco(7000 * S, 590, 'canyon-rock'),
        createDeco(10000 * S, 520, 'formation'),
        createDeco(15000 * S, 440, 'canyon-rock'),
        createDeco(19500 * S, 370, 'eagle'),
        createDeco(25000 * S, 170, 'formation'),
        createDeco(28000 * S, 120, 'canyon-rock'),
      ];
    })(),
    playerStart: { x: 100, y: 620 },
    goal: createGoal(29500 * 0.5, 138, 1500, 'medium'),
    timeBonus: 210,
  },

  // ============================================================
  // LEVEL 76 — Vertical Climber (Vertikal-Kletterer)
  // 4 verticalClimb sections on canyon walls. Ascend through the heights.
  // ============================================================
  {
    id: 76,
    name: "Vertical Climber",
    width: 22000,
    height: 700,
    biome: 'canyon-base',
    platforms: (() => {
      const S = 0.476;
      const plats: any[] = [];
      plats.push(createPlat(0, 650, 800 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 800, 650, 2000));
      // verticalClimb 1
      plats.push(...verticalClimb(S, 3000, 650, 'stone'));
      plats.push(createPlat(5100 * S, 580, 600 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 5700, 580, 2000));
      plats.push(...canyonWallSection(S, 7900, 580, 150));
      // verticalClimb 2
      plats.push(...verticalClimb(S, 8500, 520, 'stone'));
      plats.push(createPlat(10600 * S, 440, 600 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 11200, 440, 2000));
      plats.push(...canyonFloatingPlatforms(S, 13400, 440, 8));
      plats.push(...canyonVerticalSection(S, 15200, 440, 3));
      // verticalClimb 3
      plats.push(...verticalClimb(S, 15800, 400, 'stone'));
      plats.push(createPlat(17900 * S, 300, 500 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 18400, 300, 2000));
      plats.push(...canyonWallSection(S, 20600, 300, 150));
      plats.push(...canyonFloatingPlatforms(S, 21200, 300, 6));
      // verticalClimb 4
      plats.push(...verticalClimb(S, 22600, 250, 'stone'));
      plats.push(createPlat(24700 * S, 150, 600 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 25300, 150, 2000));
      plats.push(...canyonVerticalSection(S, 27600, 150, 3));
      plats.push(createPlat(28200 * S, 100, 800 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 29000, 100, 2000));
      plats.push(createPlat(31400 * S, 100, 1000 * S, 40, 'stone'));
      return plats;
    })(),
    movingPlatforms: (() => {
      const S = 0.476;
      return [
        createMovingPlat(6000 * S, 450, 150, 24, 'platform_medium', 'horizontal', 420, 20),
        createMovingPlat(25000 * S, 220, 150, 24, 'platform_medium', 'vertical', 130, 18),
      ];
    })(),
    coins: (() => {
      const S = 0.476;
      const coins: any[] = [];
      for (let x = 200 * S; x < 2800 * S; x += 150 * S) coins.push(createCoin(x, 600));
      for (let x = 3000 * S; x < 5100 * S; x += 100 * S) coins.push(createCoin(x, 530));
      for (let x = 5700 * S; x < 7900 * S; x += 150 * S) coins.push(createCoin(x, 530));
      for (let x = 8500 * S; x < 10600 * S; x += 100 * S) coins.push(createCoin(x, 400));
      for (let x = 11200 * S; x < 13400 * S; x += 150 * S) coins.push(createCoin(x, 390));
      for (let x = 13400 * S; x < 15200 * S; x += 100 * S) coins.push(createCoin(x, 350));
      for (let x = 15200 * S; x < 15800 * S; x += 80 * S) coins.push(createCoin(x, 300));
      for (let x = 15800 * S; x < 17900 * S; x += 100 * S) coins.push(createCoin(x, 260));
      for (let x = 18400 * S; x < 20600 * S; x += 150 * S) coins.push(createCoin(x, 250));
      for (let x = 21200 * S; x < 22600 * S; x += 100 * S) coins.push(createCoin(x, 220));
      for (let x = 22600 * S; x < 24700 * S; x += 100 * S) coins.push(createCoin(x, 140));
      for (let x = 25300 * S; x < 27600 * S; x += 150 * S) coins.push(createCoin(x, 100));
      for (let x = 27600 * S; x < 28200 * S; x += 80 * S) coins.push(createCoin(x, 70));
      for (let x = 29000 * S; x < 31400 * S; x += 150 * S) coins.push(createCoin(x, 50));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.476;
      return [
        createQB(2000 * S, 580, 'mushroom'),
        createQB(5300 * S, 510, 'coin'),
        createQB(10800 * S, 380, 'flower'),
        createQB(18100 * S, 240, 'star'),
        createQB(24900 * S, 80, 'coin'),
        createQB(28400 * S, 30, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.476;
      return [
        createEnemy(1500 * S, 560, 'goomba'),
        createEnemy(4000 * S, 530, 'crab'),
        createEnemy(6500 * S, 490, 'spiny'),
        createEnemy(9500 * S, 400, 'thwomp'),
        createEnemy(11800 * S, 350, 'goomba'),
        createEnemy(14000 * S, 350, 'crab'),
        createEnemy(16400 * S, 280, 'spiny'),
        createEnemy(19000 * S, 210, 'goomba'),
        createEnemy(26000 * S, 60, 'koopa'),
        createEnemy(29600 * S, 10, 'spiny'),
      ];
    })(),
    decorations: (() => {
      const S = 0.476;
      return [
        createDeco(600 * S, 600, 'canyon-rock'),
        createDeco(3800 * S, 550, 'formation'),
        createDeco(9000 * S, 480, 'eagle'),
        createDeco(14000 * S, 390, 'canyon-rock'),
        createDeco(18000 * S, 280, 'formation'),
        createDeco(23500 * S, 200, 'eagle'),
        createDeco(29800 * S, 50, 'canyon-rock'),
      ];
    })(),
    playerStart: { x: 100, y: 570 },
    goal: createGoal(31900 * 0.476, 68, 1800, 'hard'),
    timeBonus: 200,
  },

  // ============================================================
  // LEVEL 77 — Enemy Horde (Gegner-Horde)
  // 18 enemies (goombas, spinys, crabs, thwomps).
  // Simple layout focused on combat.
  // ============================================================
  {
    id: 77,
    name: "Enemy Horde",
    width: 22000,
    height: 650,
    biome: 'canyon-base',
    platforms: (() => {
      const S = 0.455;
      const plats: any[] = [];
      plats.push(createPlat(0, 600, 900 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 900, 600, 4000));
      plats.push(createPlat(5200 * S, 600, 800 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 6000, 600, 3000));
      plats.push(...canyonWallSection(S, 9200, 600, 180));
      plats.push(createPlat(9700 * S, 540, 800 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 10500, 540, 3000));
      plats.push(...gapWithPlatforms(S, 13800, 540, 600, 4));
      plats.push(createPlat(14700 * S, 540, 800 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 15500, 540, 3000));
      plats.push(...canyonVerticalSection(S, 18800, 540, 4));
      plats.push(createPlat(19700 * S, 460, 700 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 20400, 460, 3000));
      plats.push(...canyonWallSection(S, 23600, 460, 150));
      plats.push(createPlat(24100 * S, 400, 700 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 24800, 400, 3000));
      plats.push(...gapWithPlatforms(S, 28100, 400, 500, 3));
      plats.push(createPlat(28900 * S, 340, 700 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 29600, 340, 3000));
      plats.push(...canyonVerticalSection(S, 32900, 340, 3));
      plats.push(createPlat(33500 * S, 260, 800 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 34300, 260, 2500));
      plats.push(createPlat(37200 * S, 260, 1000 * S, 40, 'stone'));
      return plats;
    })(),
    movingPlatforms: (() => {
      const S = 0.455;
      return [
        createMovingPlat(7100 * S, 480, 150, 24, 'platform_medium', 'horizontal', 450, 22),
        createMovingPlat(25500 * S, 320, 150, 24, 'platform_medium', 'vertical', 180, 20),
      ];
    })(),
    coins: (() => {
      const S = 0.455;
      const coins: any[] = [];
      for (let x = 200 * S; x < 4900 * S; x += 160 * S) coins.push(createCoin(x, 550));
      for (let x = 5200 * S; x < 9200 * S; x += 150 * S) coins.push(createCoin(x, 550));
      for (let x = 9700 * S; x < 13800 * S; x += 150 * S) coins.push(createCoin(x, 490));
      for (let x = 14100 * S; x < 15500 * S; x += 120 * S) coins.push(createCoin(x, 490));
      for (let x = 15500 * S; x < 18800 * S; x += 150 * S) coins.push(createCoin(x, 490));
      for (let x = 18800 * S; x < 20400 * S; x += 100 * S) coins.push(createCoin(x, 400));
      for (let x = 20400 * S; x < 23600 * S; x += 150 * S) coins.push(createCoin(x, 410));
      for (let x = 24100 * S; x < 28100 * S; x += 150 * S) coins.push(createCoin(x, 350));
      for (let x = 28400 * S; x < 29600 * S; x += 120 * S) coins.push(createCoin(x, 290));
      for (let x = 29600 * S; x < 32900 * S; x += 150 * S) coins.push(createCoin(x, 290));
      for (let x = 32900 * S; x < 33500 * S; x += 80 * S) coins.push(createCoin(x, 220));
      for (let x = 34300 * S; x < 37200 * S; x += 150 * S) coins.push(createCoin(x, 210));
      for (let x = 37200 * S; x < 38200 * S; x += 150 * S) coins.push(createCoin(x, 210));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.455;
      return [
        createQB(2200 * S, 530, 'mushroom'),
        createQB(7000 * S, 530, 'coin'),
        createQB(11200 * S, 470, 'flower'),
        createQB(16400 * S, 470, 'star'),
        createQB(21200 * S, 390, 'coin'),
        createQB(25800 * S, 330, 'mushroom'),
        createQB(35200 * S, 190, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.455;
      return [
        createEnemy(1500 * S, 510, 'goomba'),
        createEnemy(2500 * S, 510, 'spiny'),
        createEnemy(3500 * S, 510, 'crab'),
        createEnemy(4500 * S, 510, 'goomba'),
        createEnemy(5500 * S, 510, 'thwomp'),
        createEnemy(6500 * S, 510, 'spiny'),
        createEnemy(7500 * S, 510, 'crab'),
        createEnemy(8500 * S, 510, 'goomba'),
        createEnemy(10500 * S, 450, 'spiny'),
        createEnemy(11500 * S, 450, 'thwomp'),
        createEnemy(12500 * S, 450, 'crab'),
        createEnemy(13500 * S, 450, 'goomba'),
        createEnemy(16000 * S, 450, 'spiny'),
        createEnemy(17500 * S, 450, 'goomba'),
        createEnemy(18500 * S, 450, 'crab'),
        createEnemy(21000 * S, 370, 'thwomp'),
        createEnemy(22000 * S, 370, 'goomba'),
        createEnemy(23500 * S, 370, 'spiny'),
      ];
    })(),
    decorations: (() => {
      const S = 0.455;
      return [
        createDeco(600 * S, 550, 'canyon-rock'),
        createDeco(3000 * S, 530, 'formation'),
        createDeco(8000 * S, 500, 'eagle'),
        createDeco(13000 * S, 450, 'canyon-rock'),
        createDeco(18000 * S, 450, 'formation'),
        createDeco(23000 * S, 360, 'canyon-rock'),
        createDeco(30000 * S, 280, 'eagle'),
        createDeco(37000 * S, 200, 'formation'),
      ];
    })(),
    playerStart: { x: 100, y: 520 },
    goal: createGoal(37700 * 0.455, 228, 1600, 'medium'),
    timeBonus: 200,
  },

  // ============================================================
  // LEVEL 78 — Eagle's Nest (Adler-Nest Finale)
  // Ascend from canyon floor to eagle heights.
  // Highest point at the end, eagles watching.
  // ============================================================
  {
    id: 78,
    name: "Eagle's Nest",
    width: 22000,
    height: 800,
    biome: 'canyon-base',
    platforms: (() => {
      const S = 0.417;
      const plats: any[] = [];
      plats.push(createPlat(0, 750, 900 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 900, 750, 3000));
      plats.push(...canyonWallSection(S, 4100, 750, 180));
      plats.push(...canyonVerticalSection(S, 4600, 750, 4));
      plats.push(createPlat(5400 * S, 670, 800 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 6200, 670, 3000));
      plats.push(...canyonFloatingPlatforms(S, 9400, 670, 6));
      plats.push(...canyonWallSection(S, 10800, 590, 160));
      plats.push(...canyonVerticalSection(S, 11300, 590, 4));
      plats.push(createPlat(12100 * S, 500, 800 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 12900, 500, 3000));
      plats.push(...canyonFloatingPlatforms(S, 16100, 500, 8));
      plats.push(...canyonWallSection(S, 17900, 410, 150));
      plats.push(...canyonVerticalSection(S, 18400, 410, 3));
      plats.push(createPlat(19100 * S, 330, 700 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 19800, 330, 2500));
      plats.push(...canyonFloatingPlatforms(S, 22600, 330, 6));
      plats.push(...canyonVerticalSection(S, 24000, 330, 3));
      plats.push(createPlat(24700 * S, 240, 700 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 25400, 240, 3000));
      plats.push(...canyonWallSection(S, 28600, 240, 150));
      plats.push(...canyonVerticalSection(S, 29100, 240, 4));
      plats.push(createPlat(29900 * S, 150, 700 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 30600, 150, 2500));
      plats.push(...canyonFloatingPlatforms(S, 33400, 150, 4));
      plats.push(...canyonVerticalSection(S, 34400, 150, 3));
      plats.push(createPlat(35100 * S, 70, 800 * S, 40, 'stone'));
      plats.push(...canyonGroundSection(S, 35900, 70, 2500));
      plats.push(createPlat(38800 * S, 70, 1000 * S, 40, 'stone'));
      return plats;
    })(),
    movingPlatforms: (() => {
      const S = 0.417;
      return [
        createMovingPlat(6800 * S, 520, 150, 24, 'platform_medium', 'horizontal', 400, 22),
        createMovingPlat(19200 * S, 380, 150, 24, 'platform_medium', 'vertical', 180, 20),
        createMovingPlat(30800 * S, 180, 150, 24, 'platform_medium', 'horizontal', 350, 18),
      ];
    })(),
    coins: (() => {
      const S = 0.417;
      const coins: any[] = [];
      for (let x = 200 * S; x < 3800 * S; x += 160 * S) coins.push(createCoin(x, 700));
      for (let x = 4100 * S; x < 4600 * S; x += 100 * S) coins.push(createCoin(x, 660));
      for (let x = 4600 * S; x < 5400 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 6200 * S; x < 9400 * S; x += 150 * S) coins.push(createCoin(x, 620));
      for (let x = 9400 * S; x < 10800 * S; x += 100 * S) coins.push(createCoin(x, 560));
      for (let x = 11300 * S; x < 12100 * S; x += 100 * S) coins.push(createCoin(x, 450));
      for (let x = 12900 * S; x < 16100 * S; x += 150 * S) coins.push(createCoin(x, 450));
      for (let x = 16100 * S; x < 17900 * S; x += 100 * S) coins.push(createCoin(x, 400));
      for (let x = 18400 * S; x < 19100 * S; x += 80 * S) coins.push(createCoin(x, 300));
      for (let x = 19800 * S; x < 22600 * S; x += 150 * S) coins.push(createCoin(x, 280));
      for (let x = 22600 * S; x < 24000 * S; x += 100 * S) coins.push(createCoin(x, 250));
      for (let x = 24000 * S; x < 24700 * S; x += 80 * S) coins.push(createCoin(x, 200));
      for (let x = 25400 * S; x < 28600 * S; x += 150 * S) coins.push(createCoin(x, 190));
      for (let x = 29100 * S; x < 29900 * S; x += 100 * S) coins.push(createCoin(x, 120));
      for (let x = 30600 * S; x < 33400 * S; x += 150 * S) coins.push(createCoin(x, 100));
      for (let x = 33400 * S; x < 34400 * S; x += 100 * S) coins.push(createCoin(x, 70));
      for (let x = 34400 * S; x < 35100 * S; x += 80 * S) coins.push(createCoin(x, 50));
      for (let x = 35900 * S; x < 38800 * S; x += 150 * S) coins.push(createCoin(x, 20));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.417;
      return [
        createQB(2200 * S, 680, 'mushroom'),
        createQB(5600 * S, 600, 'coin'),
        createQB(12400 * S, 430, 'flower'),
        createQB(13800 * S, 430, 'star'),
        createQB(18500 * S, 340, 'mushroom'),
        createQB(23400 * S, 260, 'coin'),
        createQB(30200 * S, 80, 'flower'),
        createQB(31600 * S, 80, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.417;
      return [
        createEnemy(1200 * S, 660, 'goomba'),
        createEnemy(3000 * S, 660, 'spiny'),
        createEnemy(4700 * S, 580, 'crab'),
        createEnemy(7000 * S, 580, 'goomba'),
        createEnemy(9800 * S, 500, 'thwomp'),
        createEnemy(11500 * S, 440, 'spiny'),
        createEnemy(15000 * S, 410, 'crab'),
        createEnemy(18600 * S, 320, 'goomba'),
        createEnemy(20500 * S, 240, 'thwomp'),
        createEnemy(23000 * S, 240, 'spiny'),
        createEnemy(26000 * S, 150, 'crab'),
        createEnemy(29200 * S, 100, 'goomba'),
        createEnemy(32000 * S, 60, 'thwomp'),
        createEnemy(37000 * S, 20, 'spiny'),
      ];
    })(),
    decorations: (() => {
      const S = 0.417;
      return [
        createDeco(700 * S, 700, 'canyon-rock'),
        createDeco(2800 * S, 670, 'formation'),
        createDeco(8000 * S, 580, 'eagle'),
        createDeco(12000 * S, 500, 'canyon-rock'),
        createDeco(14000 * S, 460, 'eagle'),
        createDeco(17000 * S, 400, 'formation'),
        createDeco(20000 * S, 320, 'eagle'),
        createDeco(25000 * S, 200, 'canyon-rock'),
        createDeco(27000 * S, 190, 'eagle'),
        createDeco(30000 * S, 130, 'eagle'),
        createDeco(33000 * S, 80, 'formation'),
        createDeco(37000 * S, 40, 'eagle'),
      ];
    })(),
    playerStart: { x: 100, y: 670 },
    goal: createGoal(39300 * 0.417, 38, 2400, 'hard'),
    timeBonus: 220,
  },
];

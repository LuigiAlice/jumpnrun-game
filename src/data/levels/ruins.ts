// Ruins World - 6 Levels (IDs 67-72) - Long Horizontal Side-Scrolling Structure
// Ancient temple ruins biome with stone platforms, brick walls, and overgrown decorations

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat } from './helpers';

const gapWithPlatforms = (S: number, startX: number, baseY: number, gapWidth: number, platformCount: number): any[] => {
  const plats = [];
  const platformSpacing = gapWidth / (platformCount + 1);
  for (let i = 0; i < platformCount; i++) {
    const px = (startX + platformSpacing * (i + 1)) * S;
    const py = baseY - 60 - (i * 25);
    const pw = 100 * S;
    const ptype = i % 3 === 0 ? 'platform_easy' : (i % 3 === 1 ? 'platform_medium' : 'platform_hard');
    plats.push(createPlat(px, py, pw, 24, ptype));
  }
  return plats;
};

const pipeSection = (S: number, startX: number, y: number, pipeCount: number): any[] => {
  const plats = [];
  for (let i = 0; i < pipeCount; i++) {
    const px = (startX + 300 + i * 400) * S;
    const ph = 64;
    plats.push(createPlat(px, y, 64 * S, ph, 'pipe'));
  }
  return plats;
};

const verticalClimb = (S: number, startX: number, baseY: number): any[] => {
  const plats = [];
  plats.push(createPlat(startX * S, baseY - 80, 140 * S, 32, 'platform_easy'));
  plats.push(createPlat((startX + 350) * S, baseY - 160, 140 * S, 32, 'platform_medium'));
  plats.push(createPlat((startX + 700) * S, baseY - 240, 140 * S, 32, 'platform_hard'));
  plats.push(createPlat((startX + 1050) * S, baseY - 320, 180 * S, 48, 'stone'));
  plats.push(createPlat((startX + 1400) * S, baseY - 240, 140 * S, 32, 'platform_hard'));
  plats.push(createPlat((startX + 1750) * S, baseY - 160, 140 * S, 32, 'platform_medium'));
  plats.push(createPlat((startX + 2100) * S, baseY - 80, 140 * S, 32, 'platform_easy'));
  return plats;
};

export const RUINS_LEVELS: LevelData[] = [
  {
    id: 67, name: "Ancient Temple Entry", width: 18750, height: 600, biome: 'ruins',
    timeBonus: 120,
    platforms: (() => {
      const S = 0.625;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 550, 1200 * S, 50, 'ruins'));
      plats.push(createPlat(1700 * S, 550, 800 * S, 50, 'ruins'));
      plats.push(...gapWithPlatforms(S, 2700, 550, 500, 4));
      plats.push(createPlat(3800 * S, 550, 1500 * S, 50, 'ruins'));
      plats.push(...pipeSection(S, 5300, 550, 5));
      plats.push(createPlat(7500 * S, 550, 1800 * S, 50, 'ruins'));
      plats.push(...verticalClimb(S, 9500, 550));
      plats.push(createPlat(12000 * S, 550, 1000 * S, 50, 'ruins'));
      plats.push(...gapWithPlatforms(S, 13200, 550, 450, 4));
      plats.push(createPlat(14200 * S, 550, 1200 * S, 50, 'ruins'));
      plats.push(...pipeSection(S, 15400, 550, 4));
      plats.push(createPlat(17200 * S, 550, 1500 * S, 50, 'ruins'));
      plats.push(...gapWithPlatforms(S, 18900, 550, 500, 4));
      plats.push(createPlat(20000 * S, 550, 800 * S, 50, 'ruins'));
      plats.push(...pipeSection(S, 21000, 550, 5));
      plats.push(createPlat(23500 * S, 550, 2000 * S, 50, 'ruins'));
      plats.push(...gapWithPlatforms(S, 25700, 550, 500, 5));
      plats.push(createPlat(26800 * S, 550, 1200 * S, 50, 'ruins'));
      plats.push(...pipeSection(S, 28000, 550, 4));
      plats.push(createPlat(29600 * S, 550, 400 * S, 50, 'ruins'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.625;
      const coins: any[] = [];
      for (let x = 300 * S; x < 3800 * S; x += 100 * S) coins.push(createCoin(x, 500));
      for (let x = 3900 * S; x < 5300 * S; x += 100 * S) coins.push(createCoin(x, 500));
      for (let x = 7600 * S; x < 9400 * S; x += 100 * S) coins.push(createCoin(x, 500));
      coins.push(createCoin(9500 * S, 410), createCoin(9850 * S, 330), createCoin(10200 * S, 250), createCoin(10550 * S, 170));
      coins.push(createCoin(10900 * S, 250), createCoin(11250 * S, 330), createCoin(11600 * S, 410));
      for (let x = 12100 * S; x < 13100 * S; x += 100 * S) coins.push(createCoin(x, 500));
      for (let x = 14300 * S; x < 15400 * S; x += 100 * S) coins.push(createCoin(x, 500));
      for (let x = 17300 * S; x < 18800 * S; x += 100 * S) coins.push(createCoin(x, 500));
      for (let x = 20100 * S; x < 21000 * S; x += 100 * S) coins.push(createCoin(x, 500));
      for (let x = 23600 * S; x < 25600 * S; x += 100 * S) coins.push(createCoin(x, 500));
      for (let x = 26900 * S; x < 28000 * S; x += 100 * S) coins.push(createCoin(x, 500));
      for (let x = 29700 * S; x < 30000 * S; x += 100 * S) coins.push(createCoin(x, 500));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.625;
      return [
        createQB(800 * S, 480, 'mushroom'), createQB(2000 * S, 400, 'flower'), createQB(2900 * S, 480, 'mushroom'),
        createQB(4200 * S, 480, 'star'), createQB(5500 * S, 480, 'flower'), createQB(7800 * S, 480, 'mushroom'),
        createQB(9700 * S, 150, 'star'), createQB(11300 * S, 480, 'mushroom'), createQB(12400 * S, 480, 'flower'),
        createQB(14600 * S, 480, 'mushroom'), createQB(15800 * S, 480, 'star'), createQB(17600 * S, 480, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.625;
      return [
        createEnemy(700 * S, 510, 'goomba'), createEnemy(1900 * S, 510, 'goomba'), createEnemy(2900 * S, 510, 'koopa'),
        createEnemy(4100 * S, 510, 'goomba'), createEnemy(5400 * S, 470, 'piranha'), createEnemy(5750 * S, 470, 'piranha'),
        createEnemy(6100 * S, 470, 'piranha'), createEnemy(6450 * S, 470, 'piranha'), createEnemy(7900 * S, 510, 'goomba'),
        createEnemy(9900 * S, 510, 'koopa'), createEnemy(11800 * S, 510, 'goomba'), createEnemy(12800 * S, 470, 'spiny'),
        createEnemy(14400 * S, 510, 'koopa'), createEnemy(15600 * S, 510, 'goomba'), createEnemy(17500 * S, 510, 'koopa'),
        createEnemy(20400 * S, 470, 'piranha'), createEnemy(20750 * S, 470, 'piranha'), createEnemy(21100 * S, 470, 'piranha'),
        createEnemy(24100 * S, 510, 'goomba'), createEnemy(25500 * S, 510, 'koopa'), createEnemy(27200 * S, 510, 'goomba'),
        createEnemy(28500 * S, 470, 'piranha'), createEnemy(28850 * S, 470, 'piranha'), createEnemy(29200 * S, 470, 'piranha'),
      ];
    })(),
    decorations: (() => {
      const S = 0.625;
      const decos: any[] = [];
      for (let x = 300 * S; x < 30000 * S; x += 1200 * S) {
        const type = x % (4800 * S) === 300 * S ? 'pillar' : (x % (4800 * S) === 1500 * S ? 'statue' : (x % (4800 * S) === 2700 * S ? 'vine' : 'moss'));
        decos.push(createDeco(x, 510, type));
      }
      return decos;
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 18625, y: 523 },
    movingPlatforms: [
      createMovingPlat(2200 * 0.625, 500, 100, 24, 'platform_medium', 'horizontal', 200, 22),
      createMovingPlat(10000 * 0.625, 350, 100, 24, 'platform_medium', 'vertical', 180, 20),
      createMovingPlat(3162, 490, 120, 24, 'platform_medium', 'horizontal', 368, 20),
      createMovingPlat(5572, 490, 120, 24, 'platform_medium', 'horizontal', 372, 20),
      createMovingPlat(11531, 490, 120, 24, 'platform_medium', 'horizontal', 363, 20),
      createMovingPlat(15698, 490, 120, 24, 'platform_medium', 'horizontal', 435, 20),
    ],
  },
  {
    id: 68, name: "Pillar Passage", width: 18904, height: 620, biome: 'ruins',
    timeBonus: 140,
    platforms: (() => {
      const S = 0.556;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 570, 1400 * S, 50, 'ruins'));
      plats.push(createPlat(1900 * S, 570, 1000 * S, 50, 'ruins'));
      plats.push(...gapWithPlatforms(S, 3100, 570, 550, 5));
      plats.push(createPlat(4200 * S, 570, 1600 * S, 50, 'ruins'));
      plats.push(...pipeSection(S, 5800, 570, 6));
      plats.push(createPlat(8200 * S, 570, 2000 * S, 50, 'ruins'));
      plats.push(...verticalClimb(S, 10500, 570));
      plats.push(createPlat(12900 * S, 570, 1400 * S, 50, 'ruins'));
      plats.push(...gapWithPlatforms(S, 14500, 570, 500, 4));
      plats.push(createPlat(15500 * S, 570, 1800 * S, 50, 'ruins'));
      plats.push(...pipeSection(S, 17300, 570, 5));
      plats.push(createPlat(19800 * S, 570, 2200 * S, 50, 'ruins'));
      plats.push(...gapWithPlatforms(S, 22200, 570, 550, 5));
      plats.push(createPlat(23300 * S, 570, 1400 * S, 50, 'ruins'));
      plats.push(...verticalClimb(S, 25100, 570));
      plats.push(createPlat(27500 * S, 570, 1800 * S, 50, 'ruins'));
      plats.push(...pipeSection(S, 29300, 570, 6));
      plats.push(createPlat(32100 * S, 570, 1900 * S, 50, 'ruins'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.556;
      const coins: any[] = [];
      for (let x = 300 * S; x < 4200 * S; x += 100 * S) coins.push(createCoin(x, 520));
      for (let x = 4300 * S; x < 5800 * S; x += 100 * S) coins.push(createCoin(x, 520));
      for (let x = 8300 * S; x < 10400 * S; x += 100 * S) coins.push(createCoin(x, 520));
      coins.push(createCoin(10500 * S, 430), createCoin(10850 * S, 350), createCoin(11200 * S, 270), createCoin(11550 * S, 190));
      coins.push(createCoin(11900 * S, 270), createCoin(12250 * S, 350), createCoin(12600 * S, 430));
      for (let x = 13000 * S; x < 14400 * S; x += 100 * S) coins.push(createCoin(x, 520));
      for (let x = 15600 * S; x < 17400 * S; x += 100 * S) coins.push(createCoin(x, 520));
      for (let x = 19900 * S; x < 22100 * S; x += 100 * S) coins.push(createCoin(x, 520));
      for (let x = 23400 * S; x < 25000 * S; x += 100 * S) coins.push(createCoin(x, 520));
      coins.push(createCoin(25100 * S, 430), createCoin(25450 * S, 350), createCoin(25800 * S, 270), createCoin(26150 * S, 190));
      coins.push(createCoin(26500 * S, 270), createCoin(26850 * S, 350), createCoin(27200 * S, 430));
      for (let x = 27600 * S; x < 29400 * S; x += 100 * S) coins.push(createCoin(x, 520));
      for (let x = 32200 * S; x < 34000 * S; x += 100 * S) coins.push(createCoin(x, 520));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.556;
      return [
        createQB(1000 * S, 500, 'mushroom'), createQB(2300 * S, 420, 'flower'), createQB(3400 * S, 460, 'mushroom'),
        createQB(4600 * S, 500, 'star'), createQB(6200 * S, 500, 'flower'), createQB(8500 * S, 500, 'mushroom'),
        createQB(10700 * S, 170, 'star'), createQB(12200 * S, 500, 'mushroom'), createQB(13400 * S, 500, 'flower'),
        createQB(15100 * S, 490, 'mushroom'), createQB(16500 * S, 490, 'star'), createQB(18300 * S, 500, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.556;
      return [
        createEnemy(800 * S, 530, 'goomba'), createEnemy(2100 * S, 530, 'goomba'), createEnemy(3300 * S, 530, 'koopa'),
        createEnemy(4600 * S, 530, 'goomba'), createEnemy(5900 * S, 490, 'piranha'), createEnemy(6250 * S, 490, 'piranha'),
        createEnemy(6600 * S, 490, 'piranha'), createEnemy(6950 * S, 490, 'piranha'), createEnemy(7300 * S, 490, 'piranha'),
        createEnemy(8600 * S, 530, 'goomba'), createEnemy(9800 * S, 530, 'koopa'), createEnemy(11200 * S, 530, 'goomba'),
        createEnemy(12700 * S, 490, 'spiny'), createEnemy(14700 * S, 530, 'koopa'), createEnemy(15900 * S, 530, 'goomba'),
        createEnemy(17900 * S, 490, 'piranha'), createEnemy(18250 * S, 490, 'piranha'), createEnemy(18600 * S, 490, 'piranha'),
        createEnemy(20300 * S, 530, 'goomba'), createEnemy(22800 * S, 530, 'koopa'), createEnemy(24100 * S, 530, 'goomba'),
        createEnemy(26000 * S, 490, 'spiny'), createEnemy(28100 * S, 530, 'goomba'), createEnemy(29800 * S, 490, 'piranha'),
        createEnemy(30150 * S, 490, 'piranha'), createEnemy(30500 * S, 490, 'piranha'), createEnemy(30850 * S, 490, 'piranha'),
        createEnemy(32600 * S, 530, 'goomba'), createEnemy(33600 * S, 530, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.556;
      const decos: any[] = [];
      for (let x = 300 * S; x < 34000 * S; x += 1400 * S) {
        const type = x % (5600 * S) === 300 * S ? 'pillar' : (x % (5600 * S) === 1700 * S ? 'vine' : (x % (5600 * S) === 3100 * S ? 'statue' : 'rock'));
        decos.push(createDeco(x, 530, type));
      }
      return decos;
    })(),
    playerStart: { x: 150, y: 520 },
    goal: { x: 18376, y: 543 },
    movingPlatforms: [
      createMovingPlat(2200 * 0.556, 480, 100, 24, 'platform_medium', 'horizontal', 200, 20),
      createMovingPlat(10500 * 0.556, 350, 100, 24, 'platform_medium', 'vertical', 180, 22),
      createMovingPlat(9443, 510, 120, 24, 'platform_medium', 'horizontal', 375, 20),
      createMovingPlat(11993, 510, 120, 24, 'platform_medium', 'horizontal', 423, 20),
      createMovingPlat(16115, 510, 120, 24, 'platform_medium', 'horizontal', 375, 20),
    ],
  },
  {
    id: 69, name: "Forgotten Archive", width: 19000, height: 650, biome: 'ruins',
    timeBonus: 160,
    platforms: (() => {
      const S = 0.5;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 600, 1600 * S, 50, 'ruins'));
      plats.push(createPlat(2100 * S, 600, 1200 * S, 50, 'ruins'));
      plats.push(...gapWithPlatforms(S, 3500, 600, 600, 5));
      plats.push(createPlat(4800 * S, 600, 1800 * S, 50, 'ruins'));
      plats.push(...pipeSection(S, 6600, 600, 7));
      plats.push(createPlat(9400 * S, 600, 2200 * S, 50, 'ruins'));
      plats.push(...verticalClimb(S, 11900, 600));
      plats.push(createPlat(14400 * S, 600, 1600 * S, 50, 'ruins'));
      plats.push(...gapWithPlatforms(S, 16200, 600, 550, 5));
      plats.push(createPlat(17300 * S, 600, 2000 * S, 50, 'ruins'));
      plats.push(...pipeSection(S, 19300, 600, 6));
      plats.push(createPlat(22100 * S, 600, 2400 * S, 50, 'ruins'));
      plats.push(...gapWithPlatforms(S, 24700, 600, 600, 5));
      plats.push(createPlat(25900 * S, 600, 1600 * S, 50, 'ruins'));
      plats.push(...verticalClimb(S, 27900, 600));
      plats.push(createPlat(30400 * S, 600, 2000 * S, 50, 'ruins'));
      plats.push(...pipeSection(S, 32400, 600, 7));
      plats.push(createPlat(35300 * S, 600, 2700 * S, 50, 'ruins'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.5;
      const coins: any[] = [];
      for (let x = 300 * S; x < 4800 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 4900 * S; x < 6600 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 9500 * S; x < 11800 * S; x += 100 * S) coins.push(createCoin(x, 550));
      coins.push(createCoin(11900 * S, 470), createCoin(12250 * S, 390), createCoin(12600 * S, 310), createCoin(12950 * S, 230));
      coins.push(createCoin(13300 * S, 310), createCoin(13650 * S, 390), createCoin(14000 * S, 470));
      for (let x = 14500 * S; x < 16100 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 17400 * S; x < 19400 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 22200 * S; x < 24600 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 26000 * S; x < 27800 * S; x += 100 * S) coins.push(createCoin(x, 550));
      coins.push(createCoin(27900 * S, 470), createCoin(28250 * S, 390), createCoin(28600 * S, 310), createCoin(28950 * S, 230));
      coins.push(createCoin(29300 * S, 310), createCoin(29650 * S, 390), createCoin(30000 * S, 470));
      for (let x = 30500 * S; x < 32500 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 35400 * S; x < 38000 * S; x += 100 * S) coins.push(createCoin(x, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.5;
      return [
        createQB(1200 * S, 530, 'mushroom'), createQB(2700 * S, 450, 'flower'), createQB(4000 * S, 530, 'mushroom'),
        createQB(5300 * S, 530, 'star'), createQB(7000 * S, 530, 'flower'), createQB(9800 * S, 530, 'mushroom'),
        createQB(12100 * S, 210, 'star'), createQB(13800 * S, 530, 'mushroom'), createQB(15100 * S, 530, 'flower'),
        createQB(16800 * S, 530, 'mushroom'), createQB(18200 * S, 530, 'star'), createQB(19900 * S, 530, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.5;
      return [
        createEnemy(900 * S, 560, 'goomba'), createEnemy(2300 * S, 560, 'goomba'), createEnemy(3700 * S, 560, 'koopa'),
        createEnemy(5200 * S, 560, 'goomba'), createEnemy(6700 * S, 520, 'piranha'), createEnemy(7050 * S, 520, 'piranha'),
        createEnemy(7400 * S, 520, 'piranha'), createEnemy(7750 * S, 520, 'piranha'), createEnemy(8100 * S, 520, 'piranha'),
        createEnemy(8450 * S, 520, 'piranha'), createEnemy(9800 * S, 560, 'goomba'), createEnemy(11100 * S, 560, 'koopa'),
        createEnemy(12600 * S, 560, 'goomba'), createEnemy(14100 * S, 560, 'koopa'), createEnemy(15600 * S, 520, 'spiny'),
        createEnemy(16800 * S, 560, 'goomba'), createEnemy(18000 * S, 560, 'koopa'), createEnemy(19600 * S, 520, 'piranha'),
        createEnemy(19950 * S, 520, 'piranha'), createEnemy(20300 * S, 520, 'piranha'), createEnemy(20650 * S, 520, 'piranha'),
        createEnemy(21000 * S, 520, 'piranha'), createEnemy(22600 * S, 560, 'goomba'), createEnemy(24100 * S, 560, 'koopa'),
        createEnemy(25400 * S, 560, 'goomba'), createEnemy(27300 * S, 520, 'spiny'), createEnemy(28700 * S, 560, 'goomba'),
        createEnemy(30900 * S, 520, 'piranha'), createEnemy(31250 * S, 520, 'piranha'), createEnemy(31600 * S, 520, 'piranha'),
        createEnemy(31950 * S, 520, 'piranha'), createEnemy(32300 * S, 520, 'piranha'), createEnemy(32650 * S, 520, 'piranha'),
        createEnemy(35700 * S, 560, 'goomba'), createEnemy(37400 * S, 560, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.5;
      const decos: any[] = [];
      for (let x = 300 * S; x < 38000 * S; x += 1600 * S) {
        const type = x % (6400 * S) === 300 * S ? 'pillar' : (x % (6400 * S) === 1900 * S ? 'statue' : (x % (6400 * S) === 3500 * S ? 'vine' : 'moss'));
        decos.push(createDeco(x, 560, type));
      }
      return decos;
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 18325, y: 573 },
    movingPlatforms: [
      createMovingPlat(11750 * 0.5, 350, 100, 24, 'platform_medium', 'vertical', 200, 22),
      createMovingPlat(27500 * 0.5, 400, 100, 24, 'platform_medium', 'horizontal', 250, 20),
      createMovingPlat(9467, 540, 120, 24, 'platform_medium', 'horizontal', 367, 20),
      createMovingPlat(12013, 540, 120, 24, 'platform_medium', 'horizontal', 413, 20),
      createMovingPlat(16017, 540, 120, 24, 'platform_medium', 'horizontal', 367, 20),
    ],
  },
  {
    id: 70, name: "Temple Summit", width: 19110, height: 680, biome: 'ruins',
    timeBonus: 180,
    platforms: (() => {
      const S = 0.455;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 630, 1800 * S, 50, 'ruins'));
      plats.push(createPlat(2400 * S, 630, 1400 * S, 50, 'ruins'));
      plats.push(...gapWithPlatforms(S, 4000, 630, 650, 6));
      plats.push(createPlat(5300 * S, 630, 2000 * S, 50, 'ruins'));
      plats.push(...pipeSection(S, 7300, 630, 8));
      plats.push(createPlat(10300 * S, 630, 2400 * S, 50, 'ruins'));
      plats.push(...verticalClimb(S, 13100, 630));
      plats.push(createPlat(15600 * S, 630, 1800 * S, 50, 'ruins'));
      plats.push(...gapWithPlatforms(S, 17600, 630, 600, 5));
      plats.push(createPlat(18800 * S, 630, 2200 * S, 50, 'ruins'));
      plats.push(...pipeSection(S, 21000, 630, 7));
      plats.push(createPlat(24200 * S, 630, 2600 * S, 50, 'ruins'));
      plats.push(...gapWithPlatforms(S, 27000, 630, 650, 6));
      plats.push(createPlat(28300 * S, 630, 1800 * S, 50, 'ruins'));
      plats.push(...verticalClimb(S, 30500, 630));
      plats.push(createPlat(33000 * S, 630, 2200 * S, 50, 'ruins'));
      plats.push(...pipeSection(S, 35200, 630, 8));
      plats.push(createPlat(38500 * S, 630, 3500 * S, 50, 'ruins'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.455;
      const coins: any[] = [];
      for (let x = 300 * S; x < 5300 * S; x += 100 * S) coins.push(createCoin(x, 580));
      for (let x = 5400 * S; x < 7300 * S; x += 100 * S) coins.push(createCoin(x, 580));
      for (let x = 10400 * S; x < 13000 * S; x += 100 * S) coins.push(createCoin(x, 580));
      coins.push(createCoin(13100 * S, 490), createCoin(13450 * S, 410), createCoin(13800 * S, 330), createCoin(14150 * S, 250));
      coins.push(createCoin(14500 * S, 330), createCoin(14850 * S, 410), createCoin(15200 * S, 490));
      for (let x = 15700 * S; x < 17500 * S; x += 100 * S) coins.push(createCoin(x, 580));
      for (let x = 18900 * S; x < 21100 * S; x += 100 * S) coins.push(createCoin(x, 580));
      for (let x = 24300 * S; x < 26900 * S; x += 100 * S) coins.push(createCoin(x, 580));
      for (let x = 28400 * S; x < 30400 * S; x += 100 * S) coins.push(createCoin(x, 580));
      coins.push(createCoin(30500 * S, 490), createCoin(30850 * S, 410), createCoin(31200 * S, 330), createCoin(31550 * S, 250));
      coins.push(createCoin(31900 * S, 330), createCoin(32250 * S, 410), createCoin(32600 * S, 490));
      for (let x = 33100 * S; x < 35300 * S; x += 100 * S) coins.push(createCoin(x, 580));
      for (let x = 38600 * S; x < 42000 * S; x += 100 * S) coins.push(createCoin(x, 580));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.455;
      return [
        createQB(1400 * S, 560, 'mushroom'), createQB(3100 * S, 480, 'flower'), createQB(4600 * S, 560, 'mushroom'),
        createQB(6000 * S, 560, 'star'), createQB(7700 * S, 560, 'flower'), createQB(10600 * S, 560, 'mushroom'),
        createQB(13300 * S, 230, 'star'), createQB(15000 * S, 500, 'mushroom'), createQB(16300 * S, 500, 'flower'),
        createQB(17900 * S, 500, 'mushroom'), createQB(19400 * S, 500, 'star'), createQB(21400 * S, 520, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.455;
      return [
        createEnemy(1000 * S, 590, 'goomba'), createEnemy(2600 * S, 590, 'goomba'), createEnemy(4200 * S, 590, 'koopa'),
        createEnemy(5700 * S, 590, 'goomba'), createEnemy(7400 * S, 550, 'piranha'), createEnemy(7750 * S, 550, 'piranha'),
        createEnemy(8100 * S, 550, 'piranha'), createEnemy(8450 * S, 550, 'piranha'), createEnemy(8800 * S, 550, 'piranha'),
        createEnemy(9150 * S, 550, 'piranha'), createEnemy(9500 * S, 550, 'piranha'), createEnemy(10700 * S, 590, 'goomba'),
        createEnemy(12000 * S, 590, 'koopa'), createEnemy(13500 * S, 590, 'goomba'), createEnemy(15000 * S, 550, 'spiny'),
        createEnemy(16200 * S, 590, 'koopa'), createEnemy(17500 * S, 590, 'goomba'), createEnemy(19200 * S, 590, 'koopa'),
        createEnemy(21300 * S, 550, 'piranha'), createEnemy(21650 * S, 550, 'piranha'), createEnemy(22000 * S, 550, 'piranha'),
        createEnemy(22350 * S, 550, 'piranha'), createEnemy(22700 * S, 550, 'piranha'), createEnemy(23050 * S, 550, 'piranha'),
        createEnemy(23400 * S, 550, 'piranha'), createEnemy(24800 * S, 590, 'goomba'), createEnemy(26300 * S, 590, 'koopa'),
        createEnemy(27700 * S, 590, 'goomba'), createEnemy(29500 * S, 550, 'spiny'), createEnemy(31000 * S, 590, 'goomba'),
        createEnemy(33400 * S, 550, 'piranha'), createEnemy(33750 * S, 550, 'piranha'), createEnemy(34100 * S, 550, 'piranha'),
        createEnemy(34450 * S, 550, 'piranha'), createEnemy(34800 * S, 550, 'piranha'), createEnemy(35150 * S, 550, 'piranha'),
        createEnemy(35500 * S, 550, 'piranha'), createEnemy(35850 * S, 550, 'piranha'), createEnemy(39000 * S, 590, 'goomba'),
        createEnemy(41000 * S, 590, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.455;
      const decos: any[] = [];
      for (let x = 300 * S; x < 42000 * S; x += 1800 * S) {
        const type = x % (7200 * S) === 300 * S ? 'pillar' : (x % (7200 * S) === 2100 * S ? 'rock' : (x % (7200 * S) === 3900 * S ? 'statue' : 'vine'));
        decos.push(createDeco(x, 590, type));
      }
      return decos;
    })(),
    playerStart: { x: 150, y: 580 },
    goal: { x: 18314, y: 603 },
    movingPlatforms: [
      createMovingPlat(2400 * 0.455, 500, 100, 24, 'platform_medium', 'horizontal', 220, 20),
      createMovingPlat(10800 * 0.455, 360, 100, 24, 'platform_medium', 'vertical', 180, 22),
      createMovingPlat(5338, 570, 120, 24, 'platform_medium', 'horizontal', 641, 20),
      createMovingPlat(9366, 570, 120, 24, 'platform_medium', 'horizontal', 361, 20),
      createMovingPlat(11954, 570, 120, 24, 'platform_medium', 'horizontal', 401, 20),
      createMovingPlat(15827, 570, 120, 24, 'platform_medium', 'horizontal', 361, 20),
    ],
  },
  {
    id: 71, name: "Underground Catacombs", width: 19182, height: 700, biome: 'ruins',
    timeBonus: 200,
    platforms: (() => {
      const S = 0.417;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 650, 2000 * S, 50, 'ruins'));
      plats.push(createPlat(2600 * S, 650, 1600 * S, 50, 'ruins'));
      plats.push(...gapWithPlatforms(S, 4400, 650, 700, 6));
      plats.push(createPlat(5800 * S, 650, 2200 * S, 50, 'ruins'));
      plats.push(...pipeSection(S, 8000, 650, 9));
      plats.push(createPlat(11800 * S, 650, 2600 * S, 50, 'ruins'));
      plats.push(...verticalClimb(S, 14800, 650));
      plats.push(createPlat(17400 * S, 650, 2000 * S, 50, 'ruins'));
      plats.push(...gapWithPlatforms(S, 19600, 650, 650, 6));
      plats.push(createPlat(20900 * S, 650, 2400 * S, 50, 'ruins'));
      plats.push(...pipeSection(S, 23300, 650, 8));
      plats.push(createPlat(26700 * S, 650, 2800 * S, 50, 'ruins'));
      plats.push(...gapWithPlatforms(S, 29700, 650, 700, 6));
      plats.push(createPlat(31100 * S, 650, 2000 * S, 50, 'ruins'));
      plats.push(...verticalClimb(S, 33500, 650));
      plats.push(createPlat(36100 * S, 650, 2400 * S, 50, 'ruins'));
      plats.push(...pipeSection(S, 38500, 650, 9));
      plats.push(createPlat(42300 * S, 650, 3700 * S, 50, 'ruins'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.417;
      const coins: any[] = [];
      for (let x = 300 * S; x < 5800 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 5900 * S; x < 8000 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 11900 * S; x < 14700 * S; x += 100 * S) coins.push(createCoin(x, 600));
      coins.push(createCoin(14800 * S, 510), createCoin(15150 * S, 430), createCoin(15500 * S, 350), createCoin(15850 * S, 270));
      coins.push(createCoin(16200 * S, 350), createCoin(16550 * S, 430), createCoin(16900 * S, 510));
      for (let x = 17500 * S; x < 19500 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 21000 * S; x < 23400 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 26800 * S; x < 29600 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 31200 * S; x < 33400 * S; x += 100 * S) coins.push(createCoin(x, 600));
      coins.push(createCoin(33500 * S, 510), createCoin(33850 * S, 430), createCoin(34200 * S, 350), createCoin(34550 * S, 270));
      coins.push(createCoin(34900 * S, 350), createCoin(35250 * S, 430), createCoin(35600 * S, 510));
      for (let x = 36200 * S; x < 38600 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 42400 * S; x < 46000 * S; x += 100 * S) coins.push(createCoin(x, 600));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.417;
      return [
        createQB(1600 * S, 580, 'mushroom'), createQB(3500 * S, 500, 'flower'), createQB(5200 * S, 580, 'mushroom'),
        createQB(6600 * S, 580, 'star'), createQB(8500 * S, 580, 'flower'), createQB(12100 * S, 580, 'mushroom'),
        createQB(14500 * S, 250, 'star'), createQB(16200 * S, 580, 'mushroom'), createQB(17600 * S, 580, 'flower'),
        createQB(19300 * S, 580, 'mushroom'), createQB(20800 * S, 580, 'star'), createQB(22800 * S, 580, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.417;
      return [
        createEnemy(1100 * S, 610, 'goomba'), createEnemy(2800 * S, 610, 'goomba'), createEnemy(4600 * S, 610, 'koopa'),
        createEnemy(6200 * S, 610, 'goomba'), createEnemy(8100 * S, 570, 'piranha'), createEnemy(8450 * S, 570, 'piranha'),
        createEnemy(8800 * S, 570, 'piranha'), createEnemy(9150 * S, 570, 'piranha'), createEnemy(9500 * S, 570, 'piranha'),
        createEnemy(9850 * S, 570, 'piranha'), createEnemy(10200 * S, 570, 'piranha'), createEnemy(10550 * S, 570, 'piranha'),
        createEnemy(12200 * S, 610, 'goomba'), createEnemy(13600 * S, 610, 'koopa'), createEnemy(15200 * S, 610, 'goomba'),
        createEnemy(16800 * S, 570, 'spiny'), createEnemy(18000 * S, 610, 'koopa'), createEnemy(19400 * S, 610, 'goomba'),
        createEnemy(21200 * S, 610, 'koopa'), createEnemy(23700 * S, 570, 'piranha'), createEnemy(24050 * S, 570, 'piranha'),
        createEnemy(24400 * S, 570, 'piranha'), createEnemy(24750 * S, 570, 'piranha'), createEnemy(25100 * S, 570, 'piranha'),
        createEnemy(25450 * S, 570, 'piranha'), createEnemy(25800 * S, 570, 'piranha'), createEnemy(26150 * S, 570, 'piranha'),
        createEnemy(27200 * S, 610, 'goomba'), createEnemy(28900 * S, 610, 'koopa'), createEnemy(30400 * S, 610, 'goomba'),
        createEnemy(32300 * S, 570, 'spiny'), createEnemy(34000 * S, 610, 'goomba'), createEnemy(36500 * S, 570, 'piranha'),
        createEnemy(36850 * S, 570, 'piranha'), createEnemy(37200 * S, 570, 'piranha'), createEnemy(37550 * S, 570, 'piranha'),
        createEnemy(37900 * S, 570, 'piranha'), createEnemy(38250 * S, 570, 'piranha'), createEnemy(38600 * S, 570, 'piranha'),
        createEnemy(38950 * S, 570, 'piranha'), createEnemy(39300 * S, 570, 'piranha'), createEnemy(42800 * S, 610, 'goomba'),
        createEnemy(45000 * S, 610, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.417;
      const decos: any[] = [];
      for (let x = 300 * S; x < 46000 * S; x += 2000 * S) {
        const type = x % (8000 * S) === 300 * S ? 'pillar' : (x % (8000 * S) === 2300 * S ? 'vine' : (x % (8000 * S) === 4300 * S ? 'statue' : (x % (8000 * S) === 6300 * S ? 'rock' : 'moss')));
        decos.push(createDeco(x, 610, type));
      }
      return decos;
    })(),
    playerStart: { x: 150, y: 600 },
    goal: { x: 18411, y: 623 },
    movingPlatforms: [
      createMovingPlat(33000 * 0.417, 380, 100, 24, 'platform_medium', 'vertical', 200, 20),
      createMovingPlat(5803, 590, 120, 24, 'platform_medium', 'horizontal', 390, 20),
      createMovingPlat(9522, 590, 120, 24, 'platform_medium', 'horizontal', 356, 20),
      createMovingPlat(12062, 590, 120, 24, 'platform_medium', 'horizontal', 394, 20),
      createMovingPlat(15860, 590, 120, 24, 'platform_medium', 'horizontal', 356, 20),
    ],
  },
  {
    id: 72, name: "Throne of the Ancients", width: 20000, height: 700, biome: 'ruins',
    timeBonus: 220,
    platforms: (() => {
      const S = 0.4;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 650, 2200 * S, 50, 'ruins'));
      plats.push(createPlat(2900 * S, 650, 1800 * S, 50, 'ruins'));
      plats.push(...gapWithPlatforms(S, 4900, 650, 750, 7));
      plats.push(createPlat(6400 * S, 650, 2400 * S, 50, 'ruins'));
      plats.push(...pipeSection(S, 8800, 650, 10));
      plats.push(createPlat(12800 * S, 650, 2800 * S, 50, 'ruins'));
      plats.push(...verticalClimb(S, 16100, 650));
      plats.push(createPlat(18800 * S, 650, 2200 * S, 50, 'ruins'));
      plats.push(...gapWithPlatforms(S, 21200, 650, 700, 6));
      plats.push(createPlat(22600 * S, 650, 2600 * S, 50, 'ruins'));
      plats.push(...pipeSection(S, 25200, 650, 9));
      plats.push(createPlat(29000 * S, 650, 3000 * S, 50, 'ruins'));
      plats.push(...gapWithPlatforms(S, 32200, 650, 750, 7));
      plats.push(createPlat(33800 * S, 650, 2200 * S, 50, 'ruins'));
      plats.push(...verticalClimb(S, 36400, 650));
      plats.push(createPlat(39100 * S, 650, 2600 * S, 50, 'ruins'));
      plats.push(...pipeSection(S, 41700, 650, 10));
      plats.push(createPlat(46100 * S, 650, 3900 * S, 50, 'ruins'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.4;
      const coins: any[] = [];
      for (let x = 300 * S; x < 6400 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 6500 * S; x < 8800 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 12900 * S; x < 16000 * S; x += 100 * S) coins.push(createCoin(x, 600));
      coins.push(createCoin(16100 * S, 510), createCoin(16450 * S, 430), createCoin(16800 * S, 350), createCoin(17150 * S, 270));
      coins.push(createCoin(17500 * S, 350), createCoin(17850 * S, 430), createCoin(18200 * S, 510));
      for (let x = 18900 * S; x < 21100 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 22700 * S; x < 25300 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 29100 * S; x < 32100 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 33900 * S; x < 36300 * S; x += 100 * S) coins.push(createCoin(x, 600));
      coins.push(createCoin(36400 * S, 510), createCoin(36750 * S, 430), createCoin(37100 * S, 350), createCoin(37450 * S, 270));
      coins.push(createCoin(37800 * S, 350), createCoin(38150 * S, 430), createCoin(38500 * S, 510));
      for (let x = 39200 * S; x < 41800 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 46200 * S; x < 50000 * S; x += 100 * S) coins.push(createCoin(x, 600));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.4;
      return [
        createQB(1800 * S, 580, 'mushroom'), createQB(3900 * S, 500, 'flower'), createQB(5800 * S, 580, 'mushroom'),
        createQB(7200 * S, 580, 'star'), createQB(9200 * S, 580, 'flower'), createQB(13100 * S, 580, 'mushroom'),
        createQB(15700 * S, 250, 'star'), createQB(17400 * S, 580, 'mushroom'), createQB(18900 * S, 580, 'flower'),
        createQB(20700 * S, 580, 'mushroom'), createQB(22300 * S, 580, 'star'), createQB(24500 * S, 580, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.4;
      return [
        createEnemy(1200 * S, 610, 'goomba'), createEnemy(3100 * S, 610, 'goomba'), createEnemy(5100 * S, 610, 'koopa'),
        createEnemy(6800 * S, 610, 'goomba'), createEnemy(8900 * S, 570, 'piranha'), createEnemy(9250 * S, 570, 'piranha'),
        createEnemy(9600 * S, 570, 'piranha'), createEnemy(9950 * S, 570, 'piranha'), createEnemy(10300 * S, 570, 'piranha'),
        createEnemy(10650 * S, 570, 'piranha'), createEnemy(11000 * S, 570, 'piranha'), createEnemy(11350 * S, 570, 'piranha'),
        createEnemy(11700 * S, 570, 'piranha'), createEnemy(13200 * S, 610, 'goomba'), createEnemy(14700 * S, 610, 'koopa'),
        createEnemy(16400 * S, 610, 'goomba'), createEnemy(18100 * S, 570, 'spiny'), createEnemy(19400 * S, 610, 'koopa'),
        createEnemy(21000 * S, 610, 'goomba'), createEnemy(23000 * S, 610, 'koopa'), createEnemy(25600 * S, 570, 'piranha'),
        createEnemy(25950 * S, 570, 'piranha'), createEnemy(26300 * S, 570, 'piranha'), createEnemy(26650 * S, 570, 'piranha'),
        createEnemy(27000 * S, 570, 'piranha'), createEnemy(27350 * S, 570, 'piranha'), createEnemy(27700 * S, 570, 'piranha'),
        createEnemy(28050 * S, 570, 'piranha'), createEnemy(28400 * S, 570, 'piranha'), createEnemy(29500 * S, 610, 'goomba'),
        createEnemy(31400 * S, 610, 'koopa'), createEnemy(33100 * S, 610, 'goomba'), createEnemy(35100 * S, 570, 'spiny'),
        createEnemy(36900 * S, 610, 'goomba'), createEnemy(39500 * S, 570, 'piranha'), createEnemy(39850 * S, 570, 'piranha'),
        createEnemy(40200 * S, 570, 'piranha'), createEnemy(40550 * S, 570, 'piranha'), createEnemy(40900 * S, 570, 'piranha'),
        createEnemy(41250 * S, 570, 'piranha'), createEnemy(41600 * S, 570, 'piranha'), createEnemy(41950 * S, 570, 'piranha'),
        createEnemy(42300 * S, 570, 'piranha'), createEnemy(42650 * S, 570, 'piranha'), createEnemy(46600 * S, 610, 'goomba'),
        createEnemy(49000 * S, 610, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.4;
      const decos: any[] = [];
      for (let x = 300 * S; x < 50000 * S; x += 2200 * S) {
        const type = x % (8800 * S) === 300 * S ? 'pillar' : (x % (8800 * S) === 2500 * S ? 'statue' : (x % (8800 * S) === 4700 * S ? 'vine' : (x % (8800 * S) === 6900 * S ? 'rock' : 'moss')));
        decos.push(createDeco(x, 610, type));
      }
      return decos;
    })(),
    playerStart: { x: 150, y: 600 },
    goal: { x: 19220, y: 623 },
    movingPlatforms: [
      createMovingPlat(2600 * 0.4, 520, 100, 24, 'platform_medium', 'horizontal', 240, 20),
      createMovingPlat(11500 * 0.4, 380, 100, 24, 'platform_medium', 'vertical', 180, 22),
      createMovingPlat(6046, 590, 120, 24, 'platform_medium', 'horizontal', 416, 20),
      createMovingPlat(9874, 590, 120, 24, 'platform_medium', 'horizontal', 364, 20),
      createMovingPlat(12549, 590, 120, 24, 'platform_medium', 'horizontal', 399, 20),
      createMovingPlat(16474, 590, 120, 24, 'platform_medium', 'horizontal', 364, 20),
    ],
  },
];

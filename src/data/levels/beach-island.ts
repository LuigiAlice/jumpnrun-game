// Beach/Island World - 6 Side-Scrolling Levels (IDs 43-48)
// Tropical paradise with sandy beaches, boardwalks, and ocean views

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco } from './helpers';

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
    const px = (startX + 300 + i * 350) * S;
    const ph = 64;
    plats.push(createPlat(px, y, 64 * S, ph, 'pipe'));
  }
  return plats;
};

const boardwalkSection = (S: number, startX: number, y: number, length: number): any[] => {
  const plats = [];
  for (let x = startX; x < startX + length; x += 200) {
    plats.push(createPlat(x * S, y, 180 * S, 24, 'wood'));
  }
  return plats;
};

export const BEACH_ISLAND_LEVELS: LevelData[] = [
  {
    id: 43, name: "Sandy Shores", width: 20000, height: 600, biome: 'beach-island',
    platforms: (() => {
      const S = 0.625;
      const plats: any[] = [];
      plats.push(createPlat(250 * S, 550, 800 * S, 40, 'sand'));
      plats.push(createPlat(1200 * S, 550, 600 * S, 40, 'sand'));
      plats.push(...boardwalkSection(S, 1900, 550, 400));
      plats.push(...gapWithPlatforms(S, 2500, 550, 400, 3));
      plats.push(createPlat(3200 * S, 550, 1000 * S, 40, 'sand'));
      plats.push(...pipeSection(S, 4200, 550, 4));
      plats.push(createPlat(5800 * S, 550, 1200 * S, 40, 'sand'));
      plats.push(createPlat(7400 * S, 470, 120, 28, 'platform_easy'));
      plats.push(createPlat(7700 * S, 390, 120, 28, 'platform_medium'));
      plats.push(createPlat(8000 * S, 310, 120, 28, 'platform_hard'));
      plats.push(createPlat(8300 * S, 230, 150, 40, 'sand'));
      plats.push(createPlat(8700 * S, 310, 120, 28, 'platform_hard'));
      plats.push(createPlat(9000 * S, 390, 120, 28, 'platform_medium'));
      plats.push(createPlat(9300 * S, 470, 120, 28, 'platform_easy'));
      plats.push(createPlat(9600 * S, 550, 800 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 10600, 550, 350, 2));
      plats.push(createPlat(11200 * S, 550, 1000 * S, 40, 'sand'));
      plats.push(...pipeSection(S, 12200, 550, 3));
      plats.push(createPlat(13800 * S, 550, 1200 * S, 40, 'sand'));
      plats.push(...boardwalkSection(S, 15000, 550, 600));
      plats.push(...gapWithPlatforms(S, 15800, 550, 400, 3));
      plats.push(createPlat(16500 * S, 550, 800 * S, 40, 'sand'));
      plats.push(createPlat(17600 * S, 470, 120, 28, 'platform_easy'));
      plats.push(createPlat(17900 * S, 390, 120, 28, 'platform_medium'));
      plats.push(createPlat(18200 * S, 310, 120, 28, 'platform_hard'));
      plats.push(createPlat(18500 * S, 230, 150, 40, 'sand'));
      plats.push(createPlat(18900 * S, 310, 120, 28, 'platform_hard'));
      plats.push(createPlat(19200 * S, 390, 120, 28, 'platform_medium'));
      plats.push(createPlat(19500 * S, 470, 120, 28, 'platform_easy'));
      plats.push(createPlat(19800 * S, 550, 600 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 20600, 550, 400, 3));
      plats.push(createPlat(21300 * S, 550, 1000 * S, 40, 'sand'));
      plats.push(...pipeSection(S, 22300, 550, 4));
      plats.push(createPlat(24400 * S, 550, 1500 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 26100, 550, 450, 3));
      plats.push(createPlat(26900 * S, 550, 800 * S, 40, 'sand'));
      plats.push(...boardwalkSection(S, 27700, 550, 500));
      plats.push(createPlat(28700 * S, 550, 1200 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 30100, 550, 400, 3));
      plats.push(createPlat(30800 * S, 550, 1200 * S, 40, 'sand'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.625;
      const coins: any[] = [];
      for (let x = 300; x < 1900; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 2100; x < 3200; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 3300; x < 4200; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 5800; x < 7000; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(7400 * S, 410), createCoin(7700 * S, 330), createCoin(8000 * S, 250), createCoin(8300 * S, 170));
      coins.push(createCoin(8700 * S, 250), createCoin(9000 * S, 330), createCoin(9300 * S, 410));
      for (let x = 9600; x < 10400; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 11200; x < 12200; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 13800; x < 15000; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 15200; x < 15800; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(15900 * S, 380), createCoin(16200 * S, 320));
      for (let x = 16500; x < 17600; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(17600 * S, 410), createCoin(17900 * S, 330), createCoin(18200 * S, 250), createCoin(18500 * S, 170));
      coins.push(createCoin(18900 * S, 250), createCoin(19200 * S, 330), createCoin(19500 * S, 410));
      for (let x = 19800; x < 20600; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 21300; x < 22300; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 24400; x < 25900; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 26900; x < 27700; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 28700; x < 29900; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 30800; x < 32000; x += 100) coins.push(createCoin(x * S, 500));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.625;
      return [
        createQB(900 * S, 480, 'mushroom'), createQB(2100 * S, 400, 'coin'), createQB(3400 * S, 480, 'mushroom'),
        createQB(4400 * S, 480, 'flower'), createQB(6100 * S, 480, 'star'), createQB(7400 * S, 480, 'mushroom'),
        createQB(8400 * S, 160, 'flower'), createQB(9800 * S, 480, 'coin'), createQB(10400 * S, 480, 'mushroom'),
        createQB(11500 * S, 480, 'star'), createQB(12400 * S, 480, 'mushroom'), createQB(14200 * S, 480, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.625;
      return [
        createEnemy(500 * S, 510, 'goomba'), createEnemy(1300 * S, 510, 'robot'), createEnemy(2000 * S, 510, 'crab'),
        createEnemy(2800 * S, 510, 'goomba'), createEnemy(3500 * S, 510, 'koopa'), createEnemy(4300 * S, 480, 'piranha'),
        createEnemy(4650 * S, 480, 'piranha'), createEnemy(5000 * S, 480, 'piranha'), createEnemy(5350 * S, 480, 'piranha'),
        createEnemy(6100 * S, 510, 'spiny'), createEnemy(7000 * S, 510, 'crab'), createEnemy(8000 * S, 510, 'robot'),
        createEnemy(9400 * S, 510, 'goomba'), createEnemy(10500 * S, 510, 'crab'), createEnemy(11500 * S, 510, 'spiny'),
        createEnemy(12500 * S, 510, 'goomba'), createEnemy(14000 * S, 510, 'crab'), createEnemy(15200 * S, 510, 'robot'),
        createEnemy(16000 * S, 510, 'goomba'), createEnemy(17000 * S, 510, 'crab'), createEnemy(18000 * S, 510, 'spiny'),
        createEnemy(19000 * S, 510, 'goomba'), createEnemy(20000 * S, 510, 'crab'), createEnemy(21000 * S, 510, 'robot'),
        createEnemy(22500 * S, 510, 'goomba'), createEnemy(23500 * S, 510, 'crab'), createEnemy(24800 * S, 510, 'spiny'),
        createEnemy(26500 * S, 510, 'goomba'), createEnemy(27500 * S, 510, 'crab'), createEnemy(29100 * S, 510, 'robot'),
        createEnemy(30000 * S, 510, 'goomba'), createEnemy(31200 * S, 510, 'crab'),
      ];
    })(),
    decorations: (() => {
      const S = 0.625;
      return [
        createDeco(300 * S, 510, 'palm'), createDeco(800 * S, 510, 'rock'), createDeco(1500 * S, 510, 'palm'),
        createDeco(2200 * S, 510, 'seagull'), createDeco(3200 * S, 510, 'palm'), createDeco(4000 * S, 510, 'shell'),
        createDeco(5000 * S, 510, 'palm'), createDeco(6000 * S, 510, 'rock'), createDeco(7000 * S, 510, 'seagull'),
        createDeco(8500 * S, 510, 'palm'), createDeco(10000 * S, 510, 'shell'), createDeco(12000 * S, 510, 'palm'),
        createDeco(14000 * S, 510, 'rock'), createDeco(16000 * S, 510, 'seagull'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 19500, y: 508 },
    timeBonus: 120,
  },
  {
    id: 44, name: "Tropical Boardwalk", width: 20016, height: 650, biome: 'beach-island',
    platforms: (() => {
      const S = 0.556;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 600, 1800 * S, 40, 'sand'));
      plats.push(createPlat(2100 * S, 500, 120, 24, 'platform_easy'));
      plats.push(createPlat(2300 * S, 450, 120, 24, 'platform_medium'));
      plats.push(createPlat(3000 * S, 600, 1400 * S, 40, 'sand'));
      plats.push(createPlat(3300 * S, 540, 120, 24, 'platform_easy'));
      plats.push(createPlat(3450 * S, 480, 120, 24, 'platform_medium'));
      plats.push(createPlat(3600 * S, 420, 120, 24, 'platform_hard'));
      plats.push(...pipeSection(S, 4000, 600, 5));
      plats.push(createPlat(6200 * S, 600, 1500 * S, 40, 'sand'));
      plats.push(createPlat(8100 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(8400 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(8700 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(9000 * S, 280, 150, 40, 'sand'));
      plats.push(createPlat(9400 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(9700 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(10000 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(10300 * S, 600, 800 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 11300, 600, 400, 3));
      plats.push(createPlat(12100 * S, 600, 1000 * S, 40, 'sand'));
      plats.push(...pipeSection(S, 13100, 600, 4));
      plats.push(createPlat(15200 * S, 600, 1500 * S, 40, 'sand'));
      plats.push(...boardwalkSection(S, 16700, 600, 600));
      plats.push(...gapWithPlatforms(S, 17500, 600, 450, 4));
      plats.push(createPlat(18300 * S, 600, 800 * S, 40, 'sand'));
      plats.push(createPlat(19400 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(19700 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(20000 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(20300 * S, 280, 150, 40, 'sand'));
      plats.push(createPlat(20700 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(21000 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(21300 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(21600 * S, 600, 1000 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 22800, 600, 450, 3));
      plats.push(createPlat(23600 * S, 600, 1200 * S, 40, 'sand'));
      plats.push(...pipeSection(S, 24800, 600, 5));
      plats.push(createPlat(27200 * S, 600, 2000 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 29400, 600, 500, 4));
      plats.push(createPlat(30300 * S, 600, 1000 * S, 40, 'sand'));
      plats.push(...boardwalkSection(S, 31300, 600, 700));
      plats.push(createPlat(32600 * S, 600, 1500 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 34300, 600, 450, 3));
      plats.push(createPlat(35100 * S, 600, 900 * S, 40, 'sand'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.556;
      const coins: any[] = [];
      for (let x = 300; x < 1400; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 1500; x < 2300; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 3200; x < 4300; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 6300; x < 7800; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(8100 * S, 460), createCoin(8400 * S, 380), createCoin(8700 * S, 300), createCoin(9000 * S, 220));
      coins.push(createCoin(9400 * S, 300), createCoin(9700 * S, 380), createCoin(10000 * S, 460));
      for (let x = 10300; x < 11100; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 12100; x < 13100; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 15200; x < 16700; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 16900; x < 17500; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(17600 * S, 400), createCoin(17900 * S, 320), createCoin(18200 * S, 380));
      for (let x = 18300; x < 19400; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(19400 * S, 460), createCoin(19700 * S, 380), createCoin(20000 * S, 300), createCoin(20300 * S, 220));
      coins.push(createCoin(20700 * S, 300), createCoin(21000 * S, 380), createCoin(21300 * S, 460));
      for (let x = 21600; x < 22800; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 23600; x < 24800; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 27200; x < 29400; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 30300; x < 31300; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 32600; x < 34300; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 35100; x < 36000; x += 100) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.556;
      return [
        createQB(700 * S, 530, 'mushroom'), createQB(1600 * S, 530, 'coin'), createQB(2600 * S, 530, 'mushroom'),
        createQB(3600 * S, 530, 'flower'), createQB(4500 * S, 530, 'star'), createQB(6500 * S, 530, 'mushroom'),
        createQB(7900 * S, 530, 'coin'), createQB(9100 * S, 210, 'flower'), createQB(10500 * S, 530, 'mushroom'),
        createQB(11300 * S, 530, 'star'), createQB(12300 * S, 530, 'mushroom'), createQB(13400 * S, 530, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.556;
      return [
        createEnemy(600 * S, 560, 'goomba'), createEnemy(1600 * S, 560, 'robot'), createEnemy(2400 * S, 560, 'crab'),
        createEnemy(3300 * S, 560, 'koopa'), createEnemy(4400 * S, 520, 'piranha'), createEnemy(4750 * S, 520, 'piranha'),
        createEnemy(5100 * S, 520, 'piranha'), createEnemy(5450 * S, 520, 'piranha'), createEnemy(5800 * S, 520, 'spiny'),
        createEnemy(6600 * S, 560, 'goomba'), createEnemy(7600 * S, 560, 'crab'), createEnemy(8600 * S, 560, 'robot'),
        createEnemy(9600 * S, 560, 'goomba'), createEnemy(10600 * S, 560, 'crab'), createEnemy(12400 * S, 560, 'spiny'),
        createEnemy(13500 * S, 560, 'goomba'), createEnemy(15500 * S, 560, 'crab'), createEnemy(17000 * S, 560, 'robot'),
        createEnemy(18500 * S, 560, 'goomba'), createEnemy(19700 * S, 560, 'crab'), createEnemy(20800 * S, 560, 'spiny'),
        createEnemy(22000 * S, 560, 'goomba'), createEnemy(23000 * S, 560, 'crab'), createEnemy(24000 * S, 560, 'robot'),
        createEnemy(25200 * S, 560, 'goomba'), createEnemy(27600 * S, 560, 'crab'), createEnemy(29000 * S, 560, 'spiny'),
        createEnemy(30500 * S, 560, 'goomba'), createEnemy(32000 * S, 560, 'crab'), createEnemy(33500 * S, 560, 'robot'),
        createEnemy(35000 * S, 560, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.556;
      return [
        createDeco(300 * S, 560, 'palm'), createDeco(1000 * S, 560, 'shell'), createDeco(2000 * S, 560, 'seagull'),
        createDeco(3200 * S, 560, 'palm'), createDeco(4400 * S, 560, 'rock'), createDeco(5600 * S, 560, 'palm'),
        createDeco(7000 * S, 560, 'seagull'), createDeco(8500 * S, 560, 'shell'), createDeco(10000 * S, 560, 'palm'),
        createDeco(11500 * S, 560, 'rock'), createDeco(13000 * S, 560, 'seagull'), createDeco(15000 * S, 560, 'palm'),
        createDeco(17000 * S, 560, 'shell'), createDeco(19000 * S, 560, 'palm'), createDeco(21500 * S, 560, 'seagull'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 19516, y: 558 },
    timeBonus: 140,
  },
  {
    id: 45, name: "Coconut Grove", width: 20000, height: 700, biome: 'beach-island',
    platforms: (() => {
      const S = 0.5;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 650, 1200 * S, 40, 'sand'));
      plats.push(...boardwalkSection(S, 1500, 650, 600));
      plats.push(...gapWithPlatforms(S, 2200, 650, 500, 4));
      plats.push(createPlat(3100 * S, 650, 1500 * S, 40, 'sand'));
      plats.push(...pipeSection(S, 4600, 650, 6));
      plats.push(createPlat(7000 * S, 650, 1800 * S, 40, 'sand'));
      plats.push(createPlat(9200 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(9500 * S, 490, 120, 28, 'platform_medium'));
      plats.push(createPlat(9800 * S, 410, 120, 28, 'platform_hard'));
      plats.push(createPlat(10100 * S, 330, 120, 28, 'platform_hard'));
      plats.push(createPlat(10400 * S, 250, 150, 40, 'sand'));
      plats.push(createPlat(10800 * S, 330, 120, 28, 'platform_hard'));
      plats.push(createPlat(11100 * S, 410, 120, 28, 'platform_medium'));
      plats.push(createPlat(11400 * S, 490, 120, 28, 'platform_easy'));
      plats.push(createPlat(11700 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(12000 * S, 650, 1000 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 13200, 650, 500, 4));
      plats.push(createPlat(14100 * S, 650, 1200 * S, 40, 'sand'));
      plats.push(...pipeSection(S, 15300, 650, 5));
      plats.push(createPlat(18200 * S, 650, 2000 * S, 40, 'sand'));
      plats.push(...boardwalkSection(S, 20200, 650, 800));
      plats.push(...gapWithPlatforms(S, 21200, 650, 550, 4));
      plats.push(createPlat(22100 * S, 650, 1000 * S, 40, 'sand'));
      plats.push(createPlat(23400 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(23700 * S, 490, 120, 28, 'platform_medium'));
      plats.push(createPlat(24000 * S, 410, 120, 28, 'platform_hard'));
      plats.push(createPlat(24300 * S, 330, 150, 40, 'sand'));
      plats.push(createPlat(24700 * S, 410, 120, 28, 'platform_hard'));
      plats.push(createPlat(25000 * S, 490, 120, 28, 'platform_medium'));
      plats.push(createPlat(25300 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(25600 * S, 650, 1200 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 27000, 650, 500, 4));
      plats.push(createPlat(27900 * S, 650, 1500 * S, 40, 'sand'));
      plats.push(...pipeSection(S, 29400, 650, 5));
      plats.push(createPlat(32200 * S, 650, 2000 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 34400, 650, 550, 4));
      plats.push(createPlat(35300 * S, 650, 1200 * S, 40, 'sand'));
      plats.push(...boardwalkSection(S, 36500, 650, 700));
      plats.push(createPlat(37700 * S, 650, 1500 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 39400, 650, 500, 3));
      plats.push(createPlat(40200 * S, 650, 800 * S, 40, 'sand'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.5;
      const coins: any[] = [];
      for (let x = 300; x < 1500; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 1600; x < 2200; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 3200; x < 4600; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 7100; x < 8800; x += 100) coins.push(createCoin(x * S, 600));
      coins.push(createCoin(9200 * S, 510), createCoin(9500 * S, 430), createCoin(9800 * S, 350), createCoin(10100 * S, 270), createCoin(10400 * S, 190));
      coins.push(createCoin(10800 * S, 270), createCoin(11100 * S, 350), createCoin(11400 * S, 430), createCoin(11700 * S, 510));
      for (let x = 12000; x < 13200; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 14100; x < 15300; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 18200; x < 20200; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 20400; x < 21200; x += 100) coins.push(createCoin(x * S, 600));
      coins.push(createCoin(21300 * S, 400), createCoin(21600 * S, 320));
      for (let x = 22100; x < 23400; x += 100) coins.push(createCoin(x * S, 600));
      coins.push(createCoin(23400 * S, 510), createCoin(23700 * S, 430), createCoin(24000 * S, 350), createCoin(24300 * S, 270));
      coins.push(createCoin(24700 * S, 350), createCoin(25000 * S, 430), createCoin(25300 * S, 510));
      for (let x = 25600; x < 27000; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 27900; x < 29400; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 32200; x < 34400; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 35300; x < 36500; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 36700; x < 37700; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 37700; x < 39400; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 40200; x < 41000; x += 100) coins.push(createCoin(x * S, 600));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.5;
      return [
        createQB(800 * S, 580, 'mushroom'), createQB(1700 * S, 580, 'coin'), createQB(2800 * S, 580, 'mushroom'),
        createQB(3800 * S, 580, 'flower'), createQB(4800 * S, 580, 'star'), createQB(7200 * S, 580, 'mushroom'),
        createQB(8800 * S, 580, 'coin'), createQB(10500 * S, 180, 'flower'), createQB(12200 * S, 580, 'mushroom'),
        createQB(13000 * S, 580, 'star'), createQB(14300 * S, 580, 'mushroom'), createQB(15500 * S, 580, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.5;
      return [
        createEnemy(700 * S, 610, 'goomba'), createEnemy(1700 * S, 610, 'robot'), createEnemy(2500 * S, 610, 'crab'),
        createEnemy(3400 * S, 610, 'koopa'), createEnemy(4700 * S, 570, 'piranha'), createEnemy(5050 * S, 570, 'piranha'),
        createEnemy(5400 * S, 570, 'piranha'), createEnemy(5750 * S, 570, 'piranha'), createEnemy(6100 * S, 570, 'spiny'),
        createEnemy(6450 * S, 570, 'piranha'), createEnemy(7500 * S, 610, 'goomba'), createEnemy(8600 * S, 610, 'crab'),
        createEnemy(9900 * S, 610, 'robot'), createEnemy(10700 * S, 610, 'goomba'), createEnemy(12000 * S, 610, 'crab'),
        createEnemy(13500 * S, 610, 'spiny'), createEnemy(14500 * S, 610, 'goomba'), createEnemy(15600 * S, 610, 'crab'),
        createEnemy(17000 * S, 610, 'robot'), createEnemy(18500 * S, 610, 'goomba'), createEnemy(20500 * S, 610, 'crab'),
        createEnemy(21500 * S, 610, 'spiny'), createEnemy(22800 * S, 610, 'goomba'), createEnemy(23800 * S, 610, 'crab'),
        createEnemy(24800 * S, 610, 'robot'), createEnemy(26000 * S, 610, 'goomba'), createEnemy(27300 * S, 610, 'crab'),
        createEnemy(28400 * S, 610, 'spiny'), createEnemy(29600 * S, 610, 'goomba'), createEnemy(31500 * S, 610, 'crab'),
        createEnemy(33000 * S, 610, 'robot'), createEnemy(34500 * S, 610, 'goomba'), createEnemy(36000 * S, 610, 'crab'),
        createEnemy(37500 * S, 610, 'spiny'), createEnemy(38800 * S, 610, 'goomba'), createEnemy(40000 * S, 610, 'crab'),
      ];
    })(),
    decorations: (() => {
      const S = 0.5;
      return [
        createDeco(300 * S, 610, 'palm'), createDeco(1500 * S, 610, 'shell'), createDeco(2800 * S, 610, 'seagull'),
        createDeco(4200 * S, 610, 'palm'), createDeco(5800 * S, 610, 'rock'), createDeco(7500 * S, 610, 'palm'),
        createDeco(9200 * S, 610, 'seagull'), createDeco(11000 * S, 610, 'shell'), createDeco(12800 * S, 610, 'palm'),
        createDeco(14800 * S, 610, 'rock'), createDeco(16800 * S, 610, 'seagull'), createDeco(18800 * S, 610, 'palm'),
        createDeco(21500 * S, 610, 'shell'), createDeco(24000 * S, 610, 'palm'), createDeco(27000 * S, 610, 'seagull'),
      ];
    })(),
    playerStart: { x: 150, y: 600 },
    goal: { x: 19500, y: 608 },
    timeBonus: 160,
  },
  {
    id: 46, name: "Island Falls", width: 19980, height: 700, biome: 'beach-island',
    platforms: (() => {
      const S = 0.444;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 600, 1500 * S, 40, 'sand'));
      plats.push(createPlat(300 * S, 540, 100, 24, 'platform_easy'));
      plats.push(createPlat(550 * S, 500, 100, 24, 'platform_easy'));
      plats.push(...boardwalkSection(S, 1800, 600, 800));
      plats.push(...gapWithPlatforms(S, 2700, 600, 550, 4));
      plats.push(createPlat(3600 * S, 600, 1800 * S, 40, 'sand'));
      plats.push(...pipeSection(S, 5400, 600, 6));
      plats.push(createPlat(7800 * S, 600, 2000 * S, 40, 'sand'));
      plats.push(createPlat(10200 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(10500 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(10800 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(11100 * S, 280, 150, 40, 'sand'));
      plats.push(createPlat(11500 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(11800 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(12100 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(12400 * S, 600, 1000 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 13600, 600, 500, 4));
      plats.push(createPlat(14500 * S, 600, 1500 * S, 40, 'sand'));
      plats.push(...pipeSection(S, 16000, 600, 5));
      plats.push(createPlat(16650 * S, 550, 80, 24, 'platform_easy'));
      plats.push(createPlat(19000 * S, 600, 2000 * S, 40, 'sand'));
      plats.push(...boardwalkSection(S, 21000, 600, 1000));
      plats.push(...gapWithPlatforms(S, 22200, 600, 600, 5));
      plats.push(createPlat(23200 * S, 600, 1200 * S, 40, 'sand'));
      plats.push(createPlat(24700 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(25000 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(25300 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(25600 * S, 280, 120, 28, 'platform_hard'));
      plats.push(createPlat(25900 * S, 200, 150, 40, 'sand'));
      plats.push(createPlat(26300 * S, 280, 120, 28, 'platform_hard'));
      plats.push(createPlat(26600 * S, 360, 120, 28, 'platform_medium'));
      plats.push(createPlat(26900 * S, 440, 120, 28, 'platform_easy'));
      plats.push(createPlat(27200 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(27500 * S, 600, 1500 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 29200, 600, 600, 5));
      plats.push(createPlat(30200 * S, 600, 1800 * S, 40, 'sand'));
      plats.push(...pipeSection(S, 32000, 600, 6));
      plats.push(createPlat(35500 * S, 600, 2500 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 38200, 600, 600, 5));
      plats.push(createPlat(39200 * S, 600, 1500 * S, 40, 'sand'));
      plats.push(...boardwalkSection(S, 40700, 600, 800));
      plats.push(createPlat(42000 * S, 600, 2000 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 44200, 600, 600, 4));
      plats.push(createPlat(45200 * S, 600, 800 * S, 40, 'sand'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.444;
      const coins: any[] = [];
      for (let x = 300; x < 1800; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 1900; x < 2700; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 3700; x < 5400; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 7900; x < 9800; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(10200 * S, 460), createCoin(10500 * S, 380), createCoin(10800 * S, 300), createCoin(11100 * S, 220));
      coins.push(createCoin(11500 * S, 300), createCoin(11800 * S, 380), createCoin(12100 * S, 460));
      for (let x = 12400; x < 13600; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 14500; x < 16000; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 19000; x < 21000; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 21200; x < 22200; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(22300 * S, 420), createCoin(22600 * S, 340), createCoin(22900 * S, 380));
      for (let x = 23200; x < 24700; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(24700 * S, 460), createCoin(25000 * S, 380), createCoin(25300 * S, 300), createCoin(25600 * S, 220), createCoin(25900 * S, 140));
      coins.push(createCoin(26300 * S, 220), createCoin(26600 * S, 300), createCoin(26900 * S, 380), createCoin(27200 * S, 460));
      for (let x = 27500; x < 29200; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 30200; x < 32000; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 35500; x < 38200; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 39200; x < 40700; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 42000; x < 44200; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 45200; x < 46000; x += 100) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.444;
      return [
        createQB(1000 * S, 530, 'mushroom'), createQB(2000 * S, 530, 'coin'), createQB(3000 * S, 530, 'mushroom'),
        createQB(4000 * S, 530, 'flower'), createQB(5600 * S, 530, 'star'), createQB(8100 * S, 530, 'mushroom'),
        createQB(9600 * S, 530, 'coin'), createQB(11200 * S, 210, 'flower'), createQB(12600 * S, 530, 'mushroom'),
        createQB(13800 * S, 530, 'star'), createQB(14800 * S, 530, 'mushroom'), createQB(16200 * S, 530, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.444;
      return [
        createEnemy(800 * S, 560, 'goomba'), createEnemy(2000 * S, 560, 'robot'), createEnemy(3000 * S, 560, 'crab'),
        createEnemy(4200 * S, 560, 'koopa'), createEnemy(5500 * S, 520, 'piranha'), createEnemy(5850 * S, 520, 'piranha'),
        createEnemy(6200 * S, 520, 'piranha'), createEnemy(6550 * S, 520, 'piranha'), createEnemy(6900 * S, 520, 'spiny'),
        createEnemy(7250 * S, 520, 'piranha'), createEnemy(8200 * S, 560, 'goomba'), createEnemy(9400 * S, 560, 'crab'),
        createEnemy(10600 * S, 560, 'robot'), createEnemy(11400 * S, 560, 'goomba'), createEnemy(12800 * S, 560, 'crab'),
        createEnemy(14000 * S, 560, 'spiny'), createEnemy(15200 * S, 560, 'goomba'), createEnemy(16500 * S, 560, 'crab'),
        createEnemy(17800 * S, 560, 'robot'), createEnemy(19300 * S, 560, 'goomba'), createEnemy(21000 * S, 560, 'crab'),
        createEnemy(22500 * S, 560, 'spiny'), createEnemy(23800 * S, 560, 'goomba'), createEnemy(25000 * S, 560, 'crab'),
        createEnemy(26200 * S, 560, 'robot'), createEnemy(27800 * S, 560, 'goomba'), createEnemy(29000 * S, 560, 'crab'),
        createEnemy(30500 * S, 560, 'spiny'), createEnemy(32200 * S, 560, 'goomba'), createEnemy(34000 * S, 560, 'crab'),
        createEnemy(35800 * S, 560, 'robot'), createEnemy(37800 * S, 560, 'goomba'), createEnemy(39500 * S, 560, 'crab'),
        createEnemy(41200 * S, 560, 'spiny'), createEnemy(42800 * S, 560, 'goomba'), createEnemy(44200 * S, 560, 'crab'),
        createEnemy(45500 * S, 560, 'robot'),
      ];
    })(),
    decorations: (() => {
      const S = 0.444;
      return [
        createDeco(300 * S, 560, 'palm'), createDeco(1800 * S, 560, 'shell'), createDeco(3500 * S, 560, 'seagull'),
        createDeco(5200 * S, 560, 'palm'), createDeco(7000 * S, 560, 'rock'), createDeco(9000 * S, 560, 'palm'),
        createDeco(11000 * S, 560, 'seagull'), createDeco(13000 * S, 560, 'shell'), createDeco(15000 * S, 560, 'palm'),
        createDeco(17500 * S, 560, 'rock'), createDeco(20000 * S, 560, 'seagull'), createDeco(22500 * S, 560, 'palm'),
        createDeco(25000 * S, 560, 'shell'), createDeco(28000 * S, 560, 'palm'), createDeco(31000 * S, 560, 'seagull'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 19480, y: 558 },
    timeBonus: 180,
  },
  {
    id: 47, name: "Coral Reef", width: 19980, height: 700, biome: 'beach-island',
    platforms: (() => {
      const S = 0.417;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 600, 1800 * S, 40, 'sand'));
      plats.push(...boardwalkSection(S, 2200, 600, 1000));
      plats.push(...gapWithPlatforms(S, 3300, 600, 600, 5));
      plats.push(createPlat(4300 * S, 600, 2000 * S, 40, 'sand'));
      plats.push(...pipeSection(S, 6300, 600, 7));
      plats.push(createPlat(8800 * S, 600, 2500 * S, 40, 'sand'));
      plats.push(createPlat(11700 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(12000 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(12300 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(12600 * S, 280, 150, 40, 'sand'));
      plats.push(createPlat(13000 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(13300 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(13600 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(13900 * S, 600, 1200 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 15300, 600, 600, 5));
      plats.push(createPlat(16300 * S, 600, 1800 * S, 40, 'sand'));
      plats.push(...pipeSection(S, 18100, 600, 6));
      plats.push(createPlat(21500 * S, 600, 2500 * S, 40, 'sand'));
      plats.push(...boardwalkSection(S, 24000, 600, 1200));
      plats.push(...gapWithPlatforms(S, 25400, 600, 700, 5));
      plats.push(createPlat(26500 * S, 600, 1500 * S, 40, 'sand'));
      plats.push(createPlat(28400 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(28700 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(29000 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(29300 * S, 280, 120, 28, 'platform_hard'));
      plats.push(createPlat(29600 * S, 200, 150, 40, 'sand'));
      plats.push(createPlat(30000 * S, 280, 120, 28, 'platform_hard'));
      plats.push(createPlat(30300 * S, 360, 120, 28, 'platform_medium'));
      plats.push(createPlat(30600 * S, 440, 120, 28, 'platform_easy'));
      plats.push(createPlat(30900 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(31200 * S, 600, 1800 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 33200, 600, 700, 5));
      plats.push(createPlat(34300 * S, 600, 2000 * S, 40, 'sand'));
      plats.push(...pipeSection(S, 36300, 600, 7));
      plats.push(createPlat(40000 * S, 600, 3000 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 43200, 600, 700, 6));
      plats.push(createPlat(44300 * S, 600, 1800 * S, 40, 'sand'));
      plats.push(...boardwalkSection(S, 46100, 600, 1000));
      plats.push(createPlat(47600 * S, 600, 1400 * S, 40, 'sand'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.417;
      const coins: any[] = [];
      for (let x = 300; x < 2200; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 2400; x < 3300; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 4400; x < 6300; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 8900; x < 11400; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(11700 * S, 460), createCoin(12000 * S, 380), createCoin(12300 * S, 300), createCoin(12600 * S, 220));
      coins.push(createCoin(13000 * S, 300), createCoin(13300 * S, 380), createCoin(13600 * S, 460));
      for (let x = 13900; x < 15300; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 16300; x < 18100; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 21500; x < 24000; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 24200; x < 25400; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(25500 * S, 420), createCoin(25800 * S, 340), createCoin(26100 * S, 380));
      for (let x = 26500; x < 28400; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(28400 * S, 460), createCoin(28700 * S, 380), createCoin(29000 * S, 300), createCoin(29300 * S, 220), createCoin(29600 * S, 140));
      coins.push(createCoin(30000 * S, 220), createCoin(30300 * S, 300), createCoin(30600 * S, 380), createCoin(30900 * S, 460));
      for (let x = 31200; x < 33200; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 34300; x < 36300; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 40000; x < 43200; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 44300; x < 46100; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 46300; x < 47600; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 47600; x < 49000; x += 100) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.417;
      return [
        createQB(1200 * S, 530, 'mushroom'), createQB(2400 * S, 530, 'coin'), createQB(3600 * S, 530, 'mushroom'),
        createQB(4600 * S, 530, 'flower'), createQB(6600 * S, 530, 'star'), createQB(9200 * S, 530, 'mushroom'),
        createQB(11000 * S, 530, 'coin'), createQB(12700 * S, 200, 'flower'), createQB(14100 * S, 530, 'mushroom'),
        createQB(15000 * S, 530, 'star'), createQB(15800 * S, 530, 'mushroom'), createQB(16600 * S, 530, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.417;
      return [
        createEnemy(900 * S, 560, 'goomba'), createEnemy(2100 * S, 560, 'robot'), createEnemy(3200 * S, 560, 'crab'),
        createEnemy(4500 * S, 560, 'koopa'), createEnemy(5800 * S, 520, 'piranha'), createEnemy(6150 * S, 520, 'piranha'),
        createEnemy(6500 * S, 520, 'piranha'), createEnemy(6850 * S, 520, 'piranha'), createEnemy(7200 * S, 520, 'spiny'),
        createEnemy(7550 * S, 520, 'piranha'), createEnemy(7900 * S, 520, 'piranha'), createEnemy(9400 * S, 560, 'goomba'),
        createEnemy(10700 * S, 560, 'crab'), createEnemy(12000 * S, 560, 'robot'), createEnemy(13000 * S, 560, 'goomba'),
        createEnemy(14500 * S, 560, 'crab'), createEnemy(15800 * S, 560, 'spiny'), createEnemy(17000 * S, 560, 'goomba'),
        createEnemy(18300 * S, 560, 'crab'), createEnemy(19500 * S, 560, 'robot'), createEnemy(21000 * S, 560, 'goomba'),
        createEnemy(22500 * S, 560, 'crab'), createEnemy(23800 * S, 560, 'spiny'), createEnemy(25200 * S, 560, 'goomba'),
        createEnemy(26800 * S, 560, 'crab'), createEnemy(28200 * S, 560, 'robot'), createEnemy(29800 * S, 560, 'goomba'),
        createEnemy(31200 * S, 560, 'crab'), createEnemy(32800 * S, 560, 'spiny'), createEnemy(34500 * S, 560, 'goomba'),
        createEnemy(36500 * S, 560, 'crab'), createEnemy(38500 * S, 560, 'robot'), createEnemy(40500 * S, 560, 'goomba'),
        createEnemy(42500 * S, 560, 'crab'), createEnemy(44000 * S, 560, 'spiny'), createEnemy(45500 * S, 560, 'goomba'),
        createEnemy(47000 * S, 560, 'crab'), createEnemy(48000 * S, 560, 'robot'),
      ];
    })(),
    decorations: (() => {
      const S = 0.417;
      return [
        createDeco(300 * S, 560, 'palm'), createDeco(2000 * S, 560, 'shell'), createDeco(4000 * S, 560, 'seagull'),
        createDeco(6000 * S, 560, 'palm'), createDeco(8000 * S, 560, 'rock'), createDeco(10000 * S, 560, 'palm'),
        createDeco(12500 * S, 560, 'seagull'), createDeco(15000 * S, 560, 'shell'), createDeco(17500 * S, 560, 'palm'),
        createDeco(20000 * S, 560, 'rock'), createDeco(22500 * S, 560, 'seagull'), createDeco(25000 * S, 560, 'palm'),
        createDeco(28000 * S, 560, 'shell'), createDeco(31000 * S, 560, 'palm'), createDeco(34000 * S, 560, 'seagull'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 19480, y: 558 },
    timeBonus: 200,
  },
  {
    id: 48, name: "Lagoon Paradise", width: 20000, height: 700, biome: 'beach-island',
    platforms: (() => {
      const S = 0.4;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 600, 2000 * S, 40, 'sand'));
      plats.push(...boardwalkSection(S, 2400, 600, 1200));
      plats.push(...gapWithPlatforms(S, 3700, 600, 700, 5));
      plats.push(createPlat(4800 * S, 600, 2500 * S, 40, 'sand'));
      plats.push(...pipeSection(S, 7300, 600, 8));
      plats.push(createPlat(10500 * S, 600, 3000 * S, 40, 'sand'));
      plats.push(createPlat(13900 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(14200 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(14500 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(14800 * S, 280, 120, 28, 'platform_hard'));
      plats.push(createPlat(15100 * S, 200, 150, 40, 'sand'));
      plats.push(createPlat(15500 * S, 280, 120, 28, 'platform_hard'));
      plats.push(createPlat(15800 * S, 360, 120, 28, 'platform_medium'));
      plats.push(createPlat(16100 * S, 440, 120, 28, 'platform_easy'));
      plats.push(createPlat(16400 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(16700 * S, 600, 1500 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 18400, 600, 700, 5));
      plats.push(createPlat(19500 * S, 600, 2000 * S, 40, 'sand'));
      plats.push(...pipeSection(S, 21500, 600, 7));
      plats.push(createPlat(25500 * S, 600, 3000 * S, 40, 'sand'));
      plats.push(...boardwalkSection(S, 28500, 600, 1500));
      plats.push(...gapWithPlatforms(S, 30200, 600, 800, 6));
      plats.push(createPlat(31400 * S, 600, 1800 * S, 40, 'sand'));
      plats.push(createPlat(33600 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(33900 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(34200 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(34500 * S, 280, 120, 28, 'platform_hard'));
      plats.push(createPlat(34800 * S, 200, 150, 40, 'sand'));
      plats.push(createPlat(35200 * S, 280, 120, 28, 'platform_hard'));
      plats.push(createPlat(35500 * S, 360, 120, 28, 'platform_medium'));
      plats.push(createPlat(35800 * S, 440, 120, 28, 'platform_easy'));
      plats.push(createPlat(36100 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(36400 * S, 600, 2000 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 38600, 600, 800, 6));
      plats.push(createPlat(39800 * S, 600, 2500 * S, 40, 'sand'));
      plats.push(...pipeSection(S, 42300, 600, 8));
      plats.push(createPlat(46500 * S, 600, 3500 * S, 40, 'sand'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.4;
      const coins: any[] = [];
      for (let x = 300; x < 2400; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 2600; x < 3700; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 4900; x < 7300; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 10600; x < 13600; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(13900 * S, 460), createCoin(14200 * S, 380), createCoin(14500 * S, 300), createCoin(14800 * S, 220), createCoin(15100 * S, 140));
      coins.push(createCoin(15500 * S, 220), createCoin(15800 * S, 300), createCoin(16100 * S, 380), createCoin(16400 * S, 460));
      for (let x = 16700; x < 18400; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 19500; x < 21500; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 25500; x < 28500; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 28700; x < 30200; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(30300 * S, 420), createCoin(30600 * S, 340), createCoin(30900 * S, 380));
      for (let x = 31400; x < 33600; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(33600 * S, 460), createCoin(33900 * S, 380), createCoin(34200 * S, 300), createCoin(34500 * S, 220), createCoin(34800 * S, 140));
      coins.push(createCoin(35200 * S, 220), createCoin(35500 * S, 300), createCoin(35800 * S, 380), createCoin(36100 * S, 460));
      for (let x = 36400; x < 38600; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 39800; x < 42300; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 46500; x < 50000; x += 100) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.4;
      return [
        createQB(1500 * S, 530, 'mushroom'), createQB(2800 * S, 530, 'coin'), createQB(4200 * S, 530, 'mushroom'),
        createQB(5400 * S, 530, 'flower'), createQB(7600 * S, 530, 'star'), createQB(10000 * S, 530, 'mushroom'),
        createQB(12000 * S, 530, 'coin'), createQB(13500 * S, 530, 'mushroom'), createQB(14900 * S, 530, 'mushroom'),
        createQB(15200 * S, 130, 'flower'), createQB(16600 * S, 530, 'star'), createQB(17200 * S, 530, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.4;
      return [
        createEnemy(1000 * S, 560, 'goomba'), createEnemy(2400 * S, 560, 'robot'), createEnemy(3600 * S, 560, 'crab'),
        createEnemy(5000 * S, 560, 'koopa'), createEnemy(6400 * S, 520, 'piranha'), createEnemy(6750 * S, 520, 'piranha'),
        createEnemy(7100 * S, 520, 'piranha'), createEnemy(7450 * S, 520, 'piranha'), createEnemy(7800 * S, 520, 'spiny'),
        createEnemy(8150 * S, 520, 'piranha'), createEnemy(8500 * S, 520, 'piranha'), createEnemy(8850 * S, 520, 'piranha'),
        createEnemy(10800 * S, 560, 'goomba'), createEnemy(12200 * S, 560, 'crab'), createEnemy(13600 * S, 560, 'robot'),
        createEnemy(15000 * S, 560, 'goomba'), createEnemy(16400 * S, 560, 'crab'), createEnemy(17800 * S, 560, 'spiny'),
        createEnemy(19200 * S, 560, 'goomba'), createEnemy(20600 * S, 560, 'crab'), createEnemy(22000 * S, 560, 'robot'),
        createEnemy(23800 * S, 560, 'goomba'), createEnemy(25200 * S, 560, 'crab'), createEnemy(26800 * S, 560, 'spiny'),
        createEnemy(28500 * S, 560, 'goomba'), createEnemy(30000 * S, 560, 'crab'), createEnemy(31800 * S, 560, 'robot'),
        createEnemy(33500 * S, 560, 'goomba'), createEnemy(35000 * S, 560, 'crab'), createEnemy(36500 * S, 560, 'spiny'),
        createEnemy(38500 * S, 560, 'goomba'), createEnemy(40200 * S, 560, 'crab'), createEnemy(42000 * S, 560, 'robot'),
        createEnemy(44000 * S, 560, 'goomba'), createEnemy(45800 * S, 560, 'crab'), createEnemy(47500 * S, 560, 'spiny'),
        createEnemy(49200 * S, 560, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.4;
      return [
        createDeco(300 * S, 560, 'palm'), createDeco(2200 * S, 560, 'shell'), createDeco(4500 * S, 560, 'seagull'),
        createDeco(7000 * S, 560, 'palm'), createDeco(9500 * S, 560, 'rock'), createDeco(12000 * S, 560, 'palm'),
        createDeco(15000 * S, 560, 'seagull'), createDeco(18000 * S, 560, 'shell'), createDeco(21000 * S, 560, 'palm'),
        createDeco(24500 * S, 560, 'rock'), createDeco(27500 * S, 560, 'seagull'), createDeco(30500 * S, 560, 'palm'),
        createDeco(33500 * S, 560, 'shell'), createDeco(36500 * S, 560, 'palm'), createDeco(40000 * S, 560, 'seagull'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 19500, y: 558 },
    timeBonus: 220,
  },
];

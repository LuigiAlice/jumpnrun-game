// Beach/Island World - 6 distinct level types (IDs 43-48)
// Tutorial, Gap-Strecke, Röhren-Labyrinth, Vertikal-Kletterer, Gegner-Horde, Flut-Rennen
import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat, gapWithPlatforms, pipeSection, verticalClimb } from './helpers';

const boardwalkSection = (S: number, startX: number, y: number, length: number): any[] => {
  const plats = [];
  for (let x = startX; x < startX + length; x += 200) {
    plats.push(createPlat(x * S, y, 180 * S, 24, 'wood'));
  }
  return plats;
};

export const BEACH_ISLAND_LEVELS: LevelData[] = [
  // ============================================================
  // LEVEL 43: Tutorial — Sandy Shores — simple path, one gap, few enemies
  // S=0.625, width=10000
  // ============================================================
  {
    id: 43, name: "Sandy Shores", width: 10000, height: 600, biome: 'beach-island',
    platforms: (() => {
      const S = 0.625;
      const plats: any[] = [];
      plats.push(createPlat(250 * S, 550, 1800 * S, 40, 'sand'));
      plats.push(...boardwalkSection(S, 1700, 550, 400));
      plats.push(...gapWithPlatforms(S, 2300, 550, 400, 1));
      plats.push(createPlat(3000 * S, 550, 800 * S, 40, 'sand'));
      plats.push(...pipeSection(S, 3950, 550, 2));
      plats.push(createPlat(5400 * S, 550, 800 * S, 40, 'sand'));
      plats.push(...boardwalkSection(S, 6200, 550, 600));
      plats.push(createPlat(7200 * S, 550, 600 * S, 40, 'sand'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.625;
      const cs: any[] = [];
      for (let x = 300; x < 2000; x += 250) cs.push(createCoin(x * S, 500));
      for (let x = 2400; x < 3000; x += 100) cs.push(createCoin(x * S, 520));
      for (let x = 3000 * S; x < 3800 * S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 5400 * S; x < 6200 * S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 7200 * S; x < 7800 * S; x += 200) cs.push(createCoin(x, 500));
      return cs;
    })(),
    questionBlocks: (() => {
      const S = 0.625;
      return [
        createQB(600 * S, 480, 'mushroom'),
        createQB(1800 * S, 480, 'coin'),
        createQB(3200 * S, 480, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.625;
      return [
        createEnemy(500 * S, 510, 'goomba'),
        createEnemy(1800 * S, 510, 'crab'),
        createEnemy(3200 * S, 510, 'goomba'),
        createEnemy(4100 * S, 470, 'piranha'),
      ];
    })(),
    decorations: (() => {
      const S = 0.625;
      return [
        createDeco(400 * S, 510, 'palm'),
        createDeco(1800 * S, 510, 'seagull'),
        createDeco(5600 * S, 510, 'shell'),
        createDeco(7400 * S, 510, 'palm'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 7400 * 0.625, y: 528 },
    timeBonus: 100,
    movingPlatforms: [
      createMovingPlat(2600 * 0.625, 500, 120, 24, 'platform_medium', 'horizontal', 250, 18),
    ],
  },

  // ============================================================
  // LEVEL 44: Gap-Strecke — 5 gap sections with moving platforms
  // S=0.6, width=15000
  // ============================================================
  {
    id: 44, name: "Boardwalk Dash", width: 15000, height: 600, biome: 'beach-island',
    platforms: (() => {
      const S = 0.6;
      const plats: any[] = [];
      plats.push(createPlat(250 * S, 550, 1000 * S, 40, 'sand'));
      plats.push(...boardwalkSection(S, 1300, 550, 300));
      plats.push(...gapWithPlatforms(S, 1700, 550, 450, 3));
      plats.push(createPlat(2700 * S, 550, 500 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 3400, 550, 500, 4));
      plats.push(createPlat(4500 * S, 550, 600 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 5300, 550, 450, 3));
      plats.push(createPlat(6200 * S, 550, 700 * S, 40, 'sand'));
      plats.push(...boardwalkSection(S, 7100, 550, 400));
      plats.push(...gapWithPlatforms(S, 7800, 550, 500, 4));
      plats.push(createPlat(8800 * S, 550, 600 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 9600, 550, 450, 3));
      plats.push(createPlat(10500 * S, 550, 800 * S, 40, 'sand'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.6;
      const cs: any[] = [];
      for (let x = 300; x < 1200; x += 200) cs.push(createCoin(x * S, 500));
      for (let x = 2700 * S; x < 3200 * S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 4500 * S; x < 5100 * S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 6200 * S; x < 6900 * S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 8800 * S; x < 9400 * S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 10500 * S; x < 11300 * S; x += 200) cs.push(createCoin(x, 500));
      return cs;
    })(),
    questionBlocks: (() => {
      const S = 0.6;
      return [
        createQB(500 * S, 480, 'mushroom'),
        createQB(1900 * S, 430, 'coin'),
        createQB(4600 * S, 480, 'flower'),
        createQB(6400 * S, 480, 'mushroom'),
        createQB(10800 * S, 480, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.6;
      return [
        createEnemy(400 * S, 510, 'crab'),
        createEnemy(2100 * S, 510, 'goomba'),
        createEnemy(2900 * S, 510, 'crab'),
        createEnemy(3700 * S, 510, 'goomba'),
        createEnemy(5000 * S, 510, 'robot'),
        createEnemy(5800 * S, 510, 'crab'),
        createEnemy(6700 * S, 510, 'goomba'),
        createEnemy(8200 * S, 510, 'spiny'),
        createEnemy(9200 * S, 510, 'crab'),
        createEnemy(10100 * S, 510, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.6;
      return [
        createDeco(300 * S, 510, 'palm'),
        createDeco(1500 * S, 510, 'shell'),
        createDeco(4800 * S, 510, 'seagull'),
        createDeco(7500 * S, 510, 'palm'),
        createDeco(11000 * S, 510, 'shell'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 10800 * 0.6, y: 528 },
    timeBonus: 150,
    movingPlatforms: [
      createMovingPlat(1900 * 0.6, 490, 130, 24, 'platform_medium', 'horizontal', 320, 22),
      createMovingPlat(3800 * 0.6, 480, 130, 24, 'platform_medium', 'horizontal', 380, 20),
      createMovingPlat(5700 * 0.6, 490, 130, 24, 'platform_medium', 'horizontal', 330, 22),
      createMovingPlat(8300 * 0.6, 480, 120, 24, 'platform_medium', 'horizontal', 350, 24),
      createMovingPlat(10000 * 0.6, 490, 120, 24, 'platform_medium', 'horizontal', 300, 20),
    ],
  },

  // ============================================================
  // LEVEL 45: Röhren-Labyrinth — 7 pipe sections, many piranhas
  // S=0.556, width=16000
  // ============================================================
  {
    id: 45, name: "Coconut Grove", width: 16000, height: 750, biome: 'beach-island',
    platforms: (() => {
      const S = 0.556;
      const plats: any[] = [];
      plats.push(createPlat(250 * S, 550, 800 * S, 40, 'sand'));
      // Bridge to pipes
      plats.push(...gapWithPlatforms(S, 1200, 550, 400, 3));
      plats.push(...pipeSection(S, 1800, 550, 3));
      // Bridge after pipes 1
      plats.push(...gapWithPlatforms(S, 3400, 550, 600, 4));
      plats.push(createPlat(3400 * S, 550, 500 * S, 40, 'sand'));
      // Bridge to pipes 2
      plats.push(...gapWithPlatforms(S, 4100, 550, 600, 4));
      plats.push(...pipeSection(S, 4100, 550, 4));
      // Bridge after pipes 2
      plats.push(...gapWithPlatforms(S, 6100, 480, 600, 4));
      plats.push(createPlat(6100 * S, 480, 600 * S, 40, 'sand'));
      // Bridge to pipes 3
      plats.push(...gapWithPlatforms(S, 6900, 480, 400, 3));
      plats.push(...pipeSection(S, 6900, 480, 3));
      // Bridge after pipes 3
      plats.push(...gapWithPlatforms(S, 8600, 550, 400, 3));
      plats.push(createPlat(8600 * S, 550, 500 * S, 40, 'sand'));
      // Bridge to pipes 4
      plats.push(...gapWithPlatforms(S, 9300, 550, 600, 4));
      plats.push(...pipeSection(S, 9300, 550, 4));
      // Bridge after pipes 4 to higher platform
      plats.push(...gapWithPlatforms(S, 11500, 420, 400, 3));
      plats.push(createPlat(11300 * S, 420, 150, 28, 'platform_medium'));
      // Bridge to pipes 5
      plats.push(...gapWithPlatforms(S, 11900, 550, 600, 4));
      plats.push(...pipeSection(S, 11900, 550, 3));
      // Bridge after pipes 5
      plats.push(...gapWithPlatforms(S, 13500, 550, 400, 3));
      plats.push(createPlat(13500 * S, 550, 500 * S, 40, 'sand'));
      // Bridge to pipes 6
      plats.push(...gapWithPlatforms(S, 14200, 550, 400, 3));
      plats.push(...pipeSection(S, 14200, 550, 3));
      // Bridge to final ground
      plats.push(...gapWithPlatforms(S, 15900, 550, 400, 3));
      plats.push(createPlat(15900 * S, 550, 800 * S, 40, 'sand'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.556;
      const cs: any[] = [];
      for (let x = 300; x < 1100; x += 200) cs.push(createCoin(x * S, 500));
      for (let x = 3400 * S; x < 3900 * S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 6100 * S; x < 6700 * S; x += 200) cs.push(createCoin(x, 430));
      for (let x = 8600 * S; x < 9100 * S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 11500 * S; x < 11500 * S + 300; x += 100) cs.push(createCoin(x, 370));
      for (let x = 13500 * S; x < 14000 * S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 15900 * S; x < 16700 * S; x += 200) cs.push(createCoin(x, 500));
      return cs;
    })(),
    questionBlocks: (() => {
      const S = 0.556;
      return [
        createQB(500 * S, 480, 'mushroom'),
        createQB(2000 * S, 480, 'coin'),
        createQB(4200 * S, 480, 'flower'),
        createQB(6300 * S, 410, 'mushroom'),
        createQB(9500 * S, 480, 'star'),
        createQB(13700 * S, 480, 'coin'),
      ];
    })(),
    enemies: (() => {
      const S = 0.556;
      return [
        createEnemy(400 * S, 510, 'crab'),
        createEnemy(1900 * S, 510, 'piranha'),
        createEnemy(2400 * S, 510, 'piranha'),
        createEnemy(2800 * S, 510, 'piranha'),
        createEnemy(4300 * S, 510, 'piranha'),
        createEnemy(4700 * S, 510, 'piranha'),
        createEnemy(5200 * S, 510, 'piranha'),
        createEnemy(7100 * S, 440, 'piranha'),
        createEnemy(7500 * S, 440, 'piranha'),
        createEnemy(9500 * S, 510, 'piranha'),
        createEnemy(10000 * S, 510, 'piranha'),
        createEnemy(12100 * S, 510, 'piranha'),
        createEnemy(14400 * S, 510, 'piranha'),
        createEnemy(14800 * S, 510, 'piranha'),
        createEnemy(16200 * S, 510, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.556;
      return [
        createDeco(300 * S, 510, 'palm'),
        createDeco(3600 * S, 510, 'seagull'),
        createDeco(6300 * S, 440, 'shell'),
        createDeco(8800 * S, 510, 'palm'),
        createDeco(13700 * S, 510, 'seagull'),
        createDeco(16700 * S, 510, 'palm'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 16300 * 0.556, y: 528 },
    timeBonus: 180,
    movingPlatforms: [
      createMovingPlat(5500 * 0.556, 490, 130, 24, 'platform_medium', 'horizontal', 400, 22),
      createMovingPlat(10700 * 0.556, 470, 120, 24, 'platform_medium', 'vertical', 180, 20),
    ],
  },

  // ============================================================
  // LEVEL 46: Vertikal-Kletterer — 3× verticalClimb, mixed heights
  // S=0.5, width=16000
  // ============================================================
  {
    id: 46, name: "Island Falls", width: 16000, height: 900, biome: 'beach-island',
    platforms: (() => {
      const S = 0.5;
      const plats: any[] = [];
      plats.push(createPlat(250 * S, 550, 800 * S, 40, 'sand'));
      // Bridge to vertical climb 1
      plats.push(...gapWithPlatforms(S, 1200, 550, 400, 3));
      plats.push(...verticalClimb(S, 1200, 550, 'sand'));
      // Bridge after climb 1
      plats.push(...gapWithPlatforms(S, 3300, 550, 400, 3));
      plats.push(createPlat(3300 * S, 550, 800 * S, 40, 'sand'));
      // Bridge to vertical climb 2
      plats.push(...gapWithPlatforms(S, 4200, 550, 500, 4));
      plats.push(...gapWithPlatforms(S, 4800, 550, 350, 3));
      plats.push(createPlat(5600 * S, 550, 800 * S, 40, 'sand'));
      // Bridge to vertical climb 3
      plats.push(...gapWithPlatforms(S, 6500, 550, 400, 3));
      plats.push(...verticalClimb(S, 6500, 550, 'sand'));
      // Bridge after climb 3
      plats.push(...gapWithPlatforms(S, 8600, 550, 400, 3));
      plats.push(createPlat(8600 * S, 550, 800 * S, 40, 'sand'));
      // Bridge to vertical climb 4
      plats.push(...gapWithPlatforms(S, 9500, 550, 400, 3));
      plats.push(...verticalClimb(S, 9500, 550, 'sand'));
      // Bridge after climb 4
      plats.push(...gapWithPlatforms(S, 11600, 550, 400, 3));
      plats.push(createPlat(11600 * S, 550, 800 * S, 40, 'sand'));
      // Gap to final
      plats.push(...gapWithPlatforms(S, 12600, 550, 350, 3));
      plats.push(createPlat(13300 * S, 550, 800 * S, 40, 'sand'));
      // Bridge to goal
      plats.push(...gapWithPlatforms(S, 14200, 550, 400, 3));
      plats.push(createPlat(14800 * S, 550, 500 * S, 40, 'sand'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.5;
      const cs: any[] = [];
      for (let x = 300; x < 1100; x += 200) cs.push(createCoin(x * S, 500));
      for (let x = 2400; x < 3200; x += 150) cs.push(createCoin(x * S, 230));
      for (let x = 3400; x < 4100; x += 200) cs.push(createCoin(x * S, 500));
      for (let x = 5700; x < 6400; x += 200) cs.push(createCoin(x * S, 500));
      for (let x = 7700; x < 8500; x += 150) cs.push(createCoin(x * S, 230));
      for (let x = 8700; x < 9400; x += 200) cs.push(createCoin(x * S, 500));
      for (let x = 11700; x < 12500; x += 200) cs.push(createCoin(x * S, 500));
      for (let x = 13400; x < 14100; x += 200) cs.push(createCoin(x * S, 500));
      for (let x = 14900; x < 15500; x += 200) cs.push(createCoin(x * S, 500));
      return cs;
    })(),
    questionBlocks: (() => {
      const S = 0.5;
      return [
        createQB(600 * S, 480, 'mushroom'),
        createQB(3500 * S, 480, 'flower'),
        createQB(5900 * S, 480, 'coin'),
        createQB(8900 * S, 480, 'star'),
        createQB(11900 * S, 480, 'mushroom'),
        createQB(15200 * S, 480, 'coin'),
      ];
    })(),
    enemies: (() => {
      const S = 0.5;
      return [
        createEnemy(500 * S, 510, 'crab'),
        createEnemy(1600 * S, 300, 'goomba'),
        createEnemy(3500 * S, 510, 'robot'),
        createEnemy(4600 * S, 320, 'squid'),
        createEnemy(5800 * S, 510, 'crab'),
        createEnemy(7100 * S, 300, 'spiny'),
        createEnemy(8800 * S, 510, 'goomba'),
        createEnemy(10000 * S, 300, 'robot'),
        createEnemy(11800 * S, 510, 'crab'),
        createEnemy(12800 * S, 320, 'squid'),
        createEnemy(15000 * S, 510, 'crab'),
      ];
    })(),
    decorations: (() => {
      const S = 0.5;
      return [
        createDeco(500 * S, 510, 'palm'),
        createDeco(2500 * S, 230, 'seagull'),
        createDeco(3800 * S, 510, 'shell'),
        createDeco(7800 * S, 230, 'seagull'),
        createDeco(9200 * S, 510, 'palm'),
        createDeco(13700 * S, 510, 'seagull'),
        createDeco(15000 * S, 510, 'palm'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 14800 * 0.5 + 100, y: 528 },
    timeBonus: 200,
    movingPlatforms: [
      createMovingPlat(800, 490, 120, 24, 'platform_medium', 'horizontal', 250, 20),
      createMovingPlat(4400, 490, 130, 24, 'platform_medium', 'horizontal', 300, 18),
      createMovingPlat(10200, 490, 100, 24, 'platform_medium', 'vertical', 200, 22),
      createMovingPlat(12700, 490, 100, 24, 'platform_medium', 'horizontal', 250, 20),
    ],
  },

  // ============================================================
  // LEVEL 47: Gegner-Horde — 18 enemies (crabs, goombas, squids)
  // S=0.455, width=14000
  // ============================================================
  {
    id: 47, name: "Coral Reef", width: 14000, height: 600, biome: 'beach-island',
    platforms: (() => {
      const S = 0.455;
      const plats: any[] = [];
      plats.push(createPlat(250 * S, 550, 1800 * S, 40, 'sand'));
      plats.push(...boardwalkSection(S, 2300, 550, 400));
      plats.push(...gapWithPlatforms(S, 2900, 550, 300, 2));
      plats.push(createPlat(3800 * S, 550, 1600 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 6000, 550, 300, 2));
      plats.push(createPlat(6900 * S, 550, 1800 * S, 40, 'sand'));
      plats.push(...pipeSection(S, 8600, 550, 3));
      plats.push(createPlat(10600 * S, 550, 1600 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(S, 12600, 550, 350, 3));
      plats.push(createPlat(13800 * S, 550, 1000 * S, 40, 'sand'));
      // Bridge platforms to close BFS gaps
      plats.push(createPlat(764.4, 490, 100, 24, 'platform_easy'));
      plats.push(createPlat(2409.3, 430, 100, 24, 'platform_easy'));
      plats.push(createPlat(3775.3, 446, 100, 24, 'platform_easy'));
      plats.push(createPlat(5454.9, 430, 100, 24, 'platform_easy'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.455;
      const cs: any[] = [];
      for (let x = 300; x < 2200; x += 200) cs.push(createCoin(x * S, 500));
      for (let x = 3800 * S; x < 5400 * S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 6900 * S; x < 8700 * S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 10600 * S; x < 12200 * S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 13800 * S; x < 14800 * S; x += 200) cs.push(createCoin(x, 500));
      return cs;
    })(),
    questionBlocks: (() => {
      const S = 0.455;
      return [
        createQB(500 * S, 480, 'mushroom'),
        createQB(4000 * S, 480, 'coin'),
        createQB(7400 * S, 480, 'flower'),
        createQB(10800 * S, 480, 'mushroom'),
        createQB(14100 * S, 480, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.455;
      return [
        createEnemy(350 * S, 510, 'crab'),
        createEnemy(600 * S, 510, 'goomba'),
        createEnemy(900 * S, 510, 'squid'),
        createEnemy(1300 * S, 510, 'crab'),
        createEnemy(1600 * S, 510, 'goomba'),
        createEnemy(1900 * S, 510, 'squid'),
        createEnemy(3900 * S, 510, 'crab'),
        createEnemy(4400 * S, 510, 'goomba'),
        createEnemy(4900 * S, 510, 'crab'),
        createEnemy(5400 * S, 510, 'squid'),
        createEnemy(7200 * S, 510, 'goomba'),
        createEnemy(7700 * S, 510, 'crab'),
        createEnemy(8200 * S, 510, 'squid'),
        createEnemy(8700 * S, 510, 'piranha'),
        createEnemy(9100 * S, 510, 'piranha'),
        createEnemy(10800 * S, 510, 'goomba'),
        createEnemy(12000 * S, 510, 'squid'),
        createEnemy(15000 * S, 510, 'crab'),
      ];
    })(),
    decorations: (() => {
      const S = 0.455;
      return [
        createDeco(500 * S, 510, 'palm'),
        createDeco(4200 * S, 510, 'shell'),
        createDeco(7500 * S, 510, 'seagull'),
        createDeco(12000 * S, 510, 'palm'),
        createDeco(15000 * S, 510, 'shell'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 14300 * 0.455, y: 528 },
    timeBonus: 220,
    movingPlatforms: [
      createMovingPlat(2800, 490, 130, 24, 'platform_medium', 'horizontal', 300, 20),
      createMovingPlat(8000, 490, 120, 24, 'platform_medium', 'horizontal', 350, 22),
      createMovingPlat(11000, 490, 100, 24, 'platform_medium', 'horizontal', 250, 18),
    ],
  },

  // ============================================================
  // LEVEL 48: Flut-Rennen Finale — Ascending structure forces player upward
  // S=0.417, width=18000
  // ============================================================
  {
    id: 48, name: "Lagoon Paradise", width: 18000, height: 800, biome: 'beach-island',
    platforms: (() => {
      const S = 0.417;
      const plats: any[] = [];
      // Start ground
      plats.push(createPlat(250 * S, 550, 900 * S, 40, 'sand'));
      // First ascent
      plats.push(createPlat(1300 * S, 480, 120, 28, 'platform_easy'));
      plats.push(createPlat(1600 * S, 410, 120, 28, 'platform_medium'));
      plats.push(createPlat(1900 * S, 340, 120, 28, 'platform_hard'));
      plats.push(createPlat(2200 * S, 270, 150, 40, 'sand'));
      // Boardwalk at elevation
      plats.push(...boardwalkSection(S, 2600, 270, 400));
      // Gap with stepping platforms
      plats.push(...gapWithPlatforms(S, 3200, 270, 400, 3));
      // Mid-elevated ground
      plats.push(createPlat(4000 * S, 270, 600 * S, 40, 'sand'));
      // Second ascent — higher
      plats.push(createPlat(4800 * S, 200, 120, 28, 'platform_easy'));
      plats.push(createPlat(5100 * S, 140, 120, 28, 'platform_medium'));
      plats.push(createPlat(5400 * S, 100, 150, 40, 'sand'));
      // Peak area
      plats.push(...boardwalkSection(S, 5900, 100, 300));
      plats.push(...pipeSection(S, 6400, 100, 3));
      // First descent (medium height)
      plats.push(createPlat(8000 * S, 150, 120, 28, 'platform_hard'));
      plats.push(createPlat(8300 * S, 200, 120, 28, 'platform_medium'));
      plats.push(createPlat(8600 * S, 260, 150, 40, 'sand'));
      // Gap at mid height
      plats.push(...gapWithPlatforms(S, 9000, 260, 400, 3));
      // Second elevated ground
      plats.push(createPlat(9800 * S, 260, 600 * S, 40, 'sand'));
      // Third ascent — highest peak
      plats.push(createPlat(10600 * S, 190, 120, 28, 'platform_easy'));
      plats.push(createPlat(10900 * S, 130, 120, 28, 'platform_medium'));
      plats.push(createPlat(11200 * S, 90, 150, 40, 'sand'));
      // Descend to goal platform
      plats.push(createPlat(11800 * S, 140, 120, 28, 'platform_hard'));
      plats.push(createPlat(12100 * S, 200, 120, 28, 'platform_medium'));
      plats.push(createPlat(12400 * S, 270, 150, 40, 'sand'));
      // Final ground after goal
      plats.push(createPlat(12800 * S, 340, 120, 28, 'platform_hard'));
      plats.push(createPlat(13100 * S, 410, 120, 28, 'platform_medium'));
      plats.push(createPlat(13400 * S, 480, 120, 28, 'platform_easy'));
      plats.push(createPlat(13700 * S, 550, 900 * S, 40, 'sand'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.417;
      const cs: any[] = [];
      for (let x = 300; x < 1200; x += 200) cs.push(createCoin(x * S, 500));
      cs.push(createCoin(1600 * S, 350), createCoin(1900 * S, 280));
      for (let x = 2200 * S; x < 2600 * S; x += 200) cs.push(createCoin(x, 210));
      for (let x = 4000 * S; x < 4600 * S; x += 200) cs.push(createCoin(x, 210));
      cs.push(createCoin(5100 * S, 80), createCoin(5400 * S, 40));
      for (let x = 5600 * S; x < 6200 * S; x += 200) cs.push(createCoin(x, 40));
      for (let x = 8600 * S; x < 9000 * S; x += 200) cs.push(createCoin(x, 200));
      for (let x = 9800 * S; x < 10400 * S; x += 200) cs.push(createCoin(x, 200));
      cs.push(createCoin(10900 * S, 70), createCoin(11200 * S, 30));
      for (let x = 12200 * S; x < 12600 * S; x += 200) cs.push(createCoin(x, 210));
      for (let x = 13700 * S; x < 14600 * S; x += 200) cs.push(createCoin(x, 500));
      return cs;
    })(),
    questionBlocks: (() => {
      const S = 0.417;
      return [
        createQB(500 * S, 480, 'mushroom'),
        createQB(2000 * S, 200, 'star'),
        createQB(4200 * S, 200, 'flower'),
        createQB(5600 * S, 30, 'mushroom'),
        createQB(6800 * S, 30, 'coin'),
        createQB(8800 * S, 200, 'star'),
        createQB(10000 * S, 200, 'mushroom'),
        createQB(11400 * S, 20, 'flower'),
        createQB(14000 * S, 480, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.417;
      return [
        createEnemy(400 * S, 510, 'goomba'),
        createEnemy(1500 * S, 370, 'crab'),
        createEnemy(2200 * S, 235, 'squid'),
        createEnemy(3300 * S, 235, 'goomba'),
        createEnemy(4200 * S, 235, 'crab'),
        createEnemy(5000 * S, 160, 'squid'),
        createEnemy(5600 * S, 65, 'spiny'),
        createEnemy(6500 * S, 65, 'piranha'),
        createEnemy(7000 * S, 65, 'piranha'),
        createEnemy(8100 * S, 110, 'crab'),
        createEnemy(8800 * S, 220, 'goomba'),
        createEnemy(9200 * S, 220, 'squid'),
        createEnemy(10000 * S, 220, 'robot'),
        createEnemy(10700 * S, 150, 'crab'),
        createEnemy(11400 * S, 50, 'goomba'),
        createEnemy(12300 * S, 230, 'squid'),
        createEnemy(14000 * S, 510, 'crab'),
        createEnemy(14400 * S, 510, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.417;
      return [
        createDeco(300 * S, 510, 'palm'),
        createDeco(2300 * S, 230, 'seagull'),
        createDeco(4200 * S, 230, 'shell'),
        createDeco(5500 * S, 60, 'seagull'),
        createDeco(8900 * S, 220, 'palm'),
        createDeco(10100 * S, 220, 'shell'),
        createDeco(11500 * S, 50, 'palm'),
        createDeco(14500 * S, 510, 'seagull'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 12600 * 0.417, y: 248 },
    timeBonus: 240,
    movingPlatforms: [
      createMovingPlat(3600 * 0.417, 220, 120, 24, 'platform_medium', 'horizontal', 300, 22),
      createMovingPlat(9400 * 0.417, 200, 120, 24, 'platform_medium', 'horizontal', 350, 24),
      createMovingPlat(11800 * 0.417, 100, 120, 24, 'platform_medium', 'vertical', 150, 20),
    ],
  },
];

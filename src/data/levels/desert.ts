// Desert World - 6 distinctive level types (IDs 7-12)
// Level 7: Tutorial, 8: Gap-Strecke, 9: Röhren-Labyrinth
// Level 10: Vertikal-Kletterer, 11: Gegner-Horde, 12: Finale-Pyramide

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat, gapWithPlatforms, pipeSection, verticalClimb } from './helpers';

export const DESERT_LEVELS: LevelData[] = [
  // ============================================================
  // Level 7 (Tutorial): Simple sandy path, one pipe section, one
  // small gap. Few enemies (3: goomba, crab, goomba). S=0.65
  // ============================================================
  {
    id: 7, name: "Sandy Deserts", width: 5000, height: 600, biome: 'desert',
    platforms: (() => {
      const S = 0.65;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 550, 600 * S, 40, 'sand'));
      plats.push(createPlat(1100 * S, 550, 500 * S, 40, 'sand'));
      // Small gap
      plats.push(...gapWithPlatforms(S, 1800, 550, 350, 2));
      // After gap
      plats.push(createPlat(2300 * S, 550, 800 * S, 40, 'sand'));
      // Bridge to pipes
      plats.push(createPlat(3300 * S, 500, 100, 20, 'platform_easy'));
      // Pipe section (3 pipes)
      plats.push(...pipeSection(S, 3500, 550, 3));
      // Bridge after pipes
      plats.push(createPlat(4800 * S, 500, 100, 20, 'platform_easy'));
      // Final ground
      plats.push(createPlat(5000 * S, 550, 900 * S, 40, 'sand'));
      return plats;
    })(),
    movingPlatforms: [
      createMovingPlat(2500 * 0.65, 460, 120, 24, 'platform_easy', 'horizontal', 150, 20),
    ],
    coins: (() => {
      const S = 0.65;
      const coins: any[] = [];
      for (let x = 300; x < 900; x += 200) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(1200 * S, 500));
      coins.push(createCoin(1400 * S, 500));
      for (let x = 2400 * S; x < 3100 * S; x += 200) coins.push(createCoin(x, 500));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.65;
      return [
        createQB(500 * S, 480, 'mushroom'),
        createQB(1300 * S, 480, 'coin'),
        createQB(2700 * S, 480, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.65;
      return [
        createEnemy(600 * S, 510, 'goomba'),
        createEnemy(1500 * S, 510, 'crab'),
        createEnemy(3800 * S, 510, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.65;
      return [
        createDeco(400 * S, 510, 'cactus'),
        createDeco(1100 * S, 510, 'rock'),
        createDeco(2600 * S, 510, 'skull'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 5200 * 0.65, y: 528 },
    timeBonus: 120,
  },

  // ============================================================
  // Level 8 (Gap-Strecke): 5 gap sections connected by moving
  // platforms. Heavy on gapWithPlatforms. S=0.625
  // ============================================================
  {
    id: 8, name: "Pyramid Dunes", width: 6500, height: 600, biome: 'desert',
    platforms: (() => {
      const S = 0.625;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 550, 700 * S, 40, 'sand'));
      // Gap 1
      plats.push(...gapWithPlatforms(S, 1100, 550, 400, 3));
      // Ground
      plats.push(createPlat(1700 * S, 550, 600 * S, 40, 'sand'));
      // Gap 2
      plats.push(...gapWithPlatforms(S, 2600, 550, 400, 3));
      // Ground
      plats.push(createPlat(3200 * S, 550, 600 * S, 40, 'sand'));
      // Gap 3
      plats.push(...gapWithPlatforms(S, 4100, 550, 400, 3));
      // Ground
      plats.push(createPlat(4700 * S, 550, 700 * S, 40, 'sand'));
      // Gap 4
      plats.push(...gapWithPlatforms(S, 5600, 550, 400, 3));
      // Ground
      plats.push(createPlat(6200 * S, 550, 600 * S, 40, 'sand'));
      // Gap 5
      plats.push(...gapWithPlatforms(S, 7100, 550, 400, 3));
      // Final ground
      plats.push(createPlat(7700 * S, 550, 900 * S, 40, 'sand'));
      return plats;
    })(),
    movingPlatforms: [
      createMovingPlat(1400 * 0.625, 480, 120, 24, 'platform_medium', 'horizontal', 200, 22),
      createMovingPlat(3900 * 0.625, 460, 120, 24, 'platform_medium', 'vertical', 180, 20),
      createMovingPlat(6500 * 0.625, 480, 120, 24, 'platform_medium', 'horizontal', 200, 22),
    ],
    coins: (() => {
      const S = 0.625;
      const coins: any[] = [];
      for (let x = 300; x < 900; x += 200) coins.push(createCoin(x * S, 500));
      for (let x = 1700 * S; x < 2300 * S; x += 200) coins.push(createCoin(x, 500));
      for (let x = 3300 * S; x < 3800 * S; x += 200) coins.push(createCoin(x, 500));
      for (let x = 4800 * S; x < 5500 * S; x += 200) coins.push(createCoin(x, 500));
      for (let x = 6200 * S; x < 6800 * S; x += 200) coins.push(createCoin(x, 500));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.625;
      return [
        createQB(500 * S, 480, 'mushroom'),
        createQB(2000 * S, 480, 'coin'),
        createQB(3700 * S, 480, 'mushroom'),
        createQB(5300 * S, 480, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.625;
      return [
        createEnemy(500 * S, 510, 'goomba'),
        createEnemy(1300 * S, 510, 'spiny'),
        createEnemy(2100 * S, 510, 'crab'),
        createEnemy(2900 * S, 510, 'goomba'),
        createEnemy(3700 * S, 510, 'koopa'),
        createEnemy(4600 * S, 510, 'crab'),
        createEnemy(5400 * S, 510, 'goomba'),
        createEnemy(6500 * S, 510, 'spiny'),
      ];
    })(),
    decorations: (() => {
      const S = 0.625;
      return [
        createDeco(400 * S, 510, 'cactus'),
        createDeco(1500 * S, 510, 'rock'),
        createDeco(3500 * S, 510, 'skull'),
        createDeco(5500 * S, 510, 'pyramid'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 7900 * 0.625, y: 528 },
    timeBonus: 140,
  },

  // ============================================================
  // Level 9 (Röhren-Labyrinth): 5 pipe sections with piranhas.
  // Desert-style pipes connected by sand platforms. S=0.6
  // ============================================================
  {
    id: 9, name: "Scorpion Sands", width: 9000, height: 600, biome: 'desert',
    platforms: (() => {
      const S = 0.6;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 550, 700 * S, 40, 'sand'));
      
      // Stepping to pipe section 1
      plats.push(...gapWithPlatforms(S, 200, 550, 700, 4));
      
      // Pipe section 1
      plats.push(...pipeSection(S, 800, 550, 3));
      
      // Stepping to ground connector
      plats.push(...gapWithPlatforms(S, 1800, 550, 800, 4));
      
      // Ground connector
      plats.push(createPlat(2500 * S, 550, 600 * S, 40, 'sand'));
      
      // Stepping to pipe section 2
      plats.push(...gapWithPlatforms(S, 2500, 550, 700, 4));
      
      // Pipe section 2
      plats.push(...pipeSection(S, 3000, 550, 4));
      
      // Stepping to ground connector
      plats.push(...gapWithPlatforms(S, 4200, 550, 1000, 4));
      
      // Ground connector
      plats.push(createPlat(5100 * S, 550, 600 * S, 40, 'sand'));
      
      // Stepping to pipe section 3
      plats.push(...gapWithPlatforms(S, 5100, 550, 600, 4));
      
      // Pipe section 3
      plats.push(...pipeSection(S, 5600, 550, 4));
      
      // Stepping to ground connector
      plats.push(...gapWithPlatforms(S, 6800, 550, 1000, 4));
      
      // Ground connector
      plats.push(createPlat(7650 * S, 550, 500 * S, 40, 'sand'));
      
      // Stepping to pipe section 4
      plats.push(...gapWithPlatforms(S, 7650, 550, 600, 4));
      
      // Pipe section 4
      plats.push(...pipeSection(S, 8100, 550, 4));
      
      // Stepping to ground connector
      plats.push(...gapWithPlatforms(S, 9300, 550, 1000, 4));
      
      // Ground connector
      plats.push(createPlat(10200 * S, 550, 600 * S, 40, 'sand'));
      
      // Stepping to pipe section 5
      plats.push(...gapWithPlatforms(S, 10200, 550, 600, 4));
      
      // Pipe section 5
      plats.push(...pipeSection(S, 10700, 550, 3));
      
      // Stepping to final ground
      plats.push(...gapWithPlatforms(S, 11500, 550, 1200, 4));
      
      // Final ground
      plats.push(createPlat(12400 * S, 550, 800 * S, 40, 'sand'));
      return plats;
    })(),
    movingPlatforms: [
      createMovingPlat(2200 * 0.6, 480, 120, 24, 'platform_medium', 'vertical', 200, 22),
      createMovingPlat(7200 * 0.6, 460, 120, 24, 'platform_medium', 'horizontal', 250, 20),
      createMovingPlat(10500 * 0.6, 500, 120, 24, 'platform_easy', 'horizontal', 180, 18),
    ],
    coins: (() => {
      const S = 0.6;
      const coins: any[] = [];
      for (let x = 300; x < 900; x += 200) coins.push(createCoin(x * S, 500));
      for (let x = 2500 * S; x < 3100 * S; x += 200) coins.push(createCoin(x, 500));
      for (let x = 5200 * S; x < 5700 * S; x += 200) coins.push(createCoin(x, 500));
      for (let x = 7650 * S; x < 8100 * S; x += 200) coins.push(createCoin(x, 500));
      for (let x = 10200 * S; x < 10800 * S; x += 200) coins.push(createCoin(x, 500));
      coins.push(createCoin(12000 * S, 500));
      coins.push(createCoin(12200 * S, 500));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.6;
      return [
        createQB(500 * S, 480, 'mushroom'),
        createQB(2800 * S, 480, 'coin'),
        createQB(5400 * S, 480, 'flower'),
        createQB(7900 * S, 480, 'star'),
        createQB(10500 * S, 480, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.6;
      return [
        createEnemy(600 * S, 510, 'goomba'),
        createEnemy(1100 * S, 510, 'piranha'),
        createEnemy(1450 * S, 510, 'piranha'),
        createEnemy(2600 * S, 510, 'crab'),
        createEnemy(2900 * S, 510, 'goomba'),
        createEnemy(3300 * S, 510, 'piranha'),
        createEnemy(3650 * S, 510, 'piranha'),
        createEnemy(4000 * S, 510, 'piranha'),
        createEnemy(5400 * S, 510, 'spiny'),
        createEnemy(5900 * S, 510, 'piranha'),
        createEnemy(6250 * S, 510, 'piranha'),
        createEnemy(7900 * S, 510, 'crab'),
        createEnemy(8400 * S, 510, 'piranha'),
        createEnemy(8750 * S, 510, 'piranha'),
        createEnemy(10300 * S, 510, 'koopa'),
        createEnemy(11000 * S, 510, 'piranha'),
        createEnemy(11350 * S, 510, 'piranha'),
      ];
    })(),
    decorations: (() => {
      const S = 0.6;
      return [
        createDeco(400 * S, 510, 'cactus'),
        createDeco(3000 * S, 510, 'rock'),
        createDeco(5800 * S, 510, 'skull'),
        createDeco(9000 * S, 510, 'pyramid'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 12700 * 0.6, y: 528 },
    timeBonus: 160,
  },

  // ============================================================
  // Level 10 (Vertikal-Kletterer): 3-4 verticalClimb sections.
  // Platforms at varied heights, ascending and descending.
  // S=0.556, groundType='sand' for desert biome.
  // ============================================================
  {
    id: 10, name: "Tomb Raider", width: 7000, height: 700, biome: 'desert',
    platforms: (() => {
      const S = 0.556;
      const plats: any[] = [];
      // Start ground
      plats.push(createPlat(200 * S, 600, 700 * S, 40, 'sand'));
      // Vertical Climb 1: up to peak then down
      plats.push(...verticalClimb(S, 1100, 600, 'sand'));
      
      // Bridging to ground at 3100
      plats.push(...gapWithPlatforms(S, 1800, 600, 1400, 8));
      
      // Ground connector
      plats.push(createPlat(3100 * S, 600, 700 * S, 40, 'sand'));
      // Vertical Climb 2
      plats.push(...verticalClimb(S, 4000, 600, 'sand'));
      
      // Bridging to ground at 6100
      plats.push(...gapWithPlatforms(S, 4800, 600, 1400, 8));
      
      // Ground connector
      plats.push(createPlat(6100 * S, 600, 700 * S, 40, 'sand'));
      // Vertical Climb 3
      plats.push(...verticalClimb(S, 7000, 600, 'sand'));
      
      // Bridging to ground at 9100
      plats.push(...gapWithPlatforms(S, 7800, 600, 1400, 8));
      
      // Ground connector
      plats.push(createPlat(9100 * S, 600, 700 * S, 40, 'sand'));
      // Vertical Climb 4
      plats.push(...verticalClimb(S, 10000, 600, 'sand'));
      
      // Bridging to final ground
      plats.push(...gapWithPlatforms(S, 10800, 600, 1400, 8));
      
      // Final ground
      plats.push(createPlat(12000 * S, 600, 800 * S, 40, 'sand'));
      return plats;
    })(),
    movingPlatforms: [
      createMovingPlat(2900 * 0.556, 560, 120, 24, 'platform_medium', 'horizontal', 250, 20),
      createMovingPlat(6000 * 0.556, 500, 120, 24, 'platform_medium', 'vertical', 200, 22),
      createMovingPlat(9000 * 0.556, 560, 120, 24, 'platform_medium', 'horizontal', 250, 20),
    ],
    coins: (() => {
      const S = 0.556;
      const coins: any[] = [];
      for (let x = 300; x < 900; x += 200) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(1100 * S, 490));
      coins.push(createCoin(1500 * S, 410));
      coins.push(createCoin(2000 * S, 230));
      coins.push(createCoin(2400 * S, 410));
      coins.push(createCoin(2700 * S, 490));
      for (let x = 3200 * S; x < 3800 * S; x += 200) coins.push(createCoin(x, 550));
      coins.push(createCoin(4100 * S, 490));
      coins.push(createCoin(4500 * S, 410));
      coins.push(createCoin(4900 * S, 230));
      coins.push(createCoin(5400 * S, 410));
      coins.push(createCoin(5800 * S, 490));
      for (let x = 6200 * S; x < 6800 * S; x += 200) coins.push(createCoin(x, 550));
      coins.push(createCoin(7200 * S, 490));
      coins.push(createCoin(7600 * S, 410));
      coins.push(createCoin(7900 * S, 230));
      coins.push(createCoin(8400 * S, 410));
      coins.push(createCoin(8800 * S, 490));
      for (let x = 9200 * S; x < 9800 * S; x += 200) coins.push(createCoin(x, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.556;
      return [
        createQB(500 * S, 530, 'mushroom'),
        createQB(1500 * S, 440, 'coin'),
        createQB(3400 * S, 530, 'flower'),
        createQB(4500 * S, 440, 'star'),
        createQB(6400 * S, 530, 'mushroom'),
        createQB(7600 * S, 440, 'coin'),
        createQB(9400 * S, 530, 'flower'),
        createQB(10600 * S, 440, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.556;
      return [
        createEnemy(600 * S, 560, 'goomba'),
        createEnemy(1300 * S, 560, 'crab'),
        createEnemy(2000 * S, 560, 'goomba'),
        createEnemy(3400 * S, 560, 'koopa'),
        createEnemy(4300 * S, 560, 'spiny'),
        createEnemy(4900 * S, 560, 'goomba'),
        createEnemy(6400 * S, 560, 'crab'),
        createEnemy(7300 * S, 560, 'goomba'),
        createEnemy(7900 * S, 560, 'koopa'),
        createEnemy(9400 * S, 560, 'spiny'),
        createEnemy(10400 * S, 560, 'crab'),
        createEnemy(12200 * S, 560, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.556;
      return [
        createDeco(400 * S, 560, 'cactus'),
        createDeco(2300 * S, 560, 'rock'),
        createDeco(5300 * S, 560, 'skull'),
        createDeco(8300 * S, 560, 'pyramid'),
        createDeco(11300 * S, 560, 'cactus'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 12300 * 0.556, y: 578 },
    timeBonus: 180,
  },

  // ============================================================
  // Level 11 (Gegner-Horde): 15-20 enemies. Simpler platforms,
  // combat focus with goombas, crabs, spinys, koopas. S=0.5
  // ============================================================
  {
    id: 11, name: "Quicksand Canyon", width: 6500, height: 600, biome: 'desert',
    platforms: (() => {
      const S = 0.5;
      const plats: any[] = [];
      // Long first ground stretch
      plats.push(createPlat(200 * S, 550, 1800 * S, 40, 'sand'));
      // Gap - increased platforms
      plats.push(...gapWithPlatforms(S, 1700, 550, 1400, 8));
      // Long second ground
      plats.push(createPlat(2800 * S, 550, 2000 * S, 40, 'sand'));
      // Gap - increased platforms
      plats.push(...gapWithPlatforms(S, 4300, 550, 1400, 8));
      // Long third ground
      plats.push(createPlat(5600 * S, 550, 2000 * S, 40, 'sand'));
      // Pipe section (piranha danger)
      plats.push(...pipeSection(S, 6950, 550, 3));
      // Bridge after pipe to final ground
      plats.push(...gapWithPlatforms(S, 8000, 550, 1200, 7));
      // Final ground
      plats.push(createPlat(9000 * S, 550, 1000 * S, 40, 'sand'));
      return plats;
    })(),
    movingPlatforms: [
      createMovingPlat(2000 * 0.5, 480, 120, 24, 'platform_medium', 'horizontal', 200, 22),
      createMovingPlat(7000 * 0.5, 460, 120, 24, 'platform_medium', 'vertical', 180, 20),
    ],
    coins: (() => {
      const S = 0.5;
      const coins: any[] = [];
      for (let x = 300; x < 2000; x += 200) coins.push(createCoin(x * S, 500));
      for (let x = 2800 * S; x < 4800 * S; x += 200) coins.push(createCoin(x, 500));
      for (let x = 5700 * S; x < 7600 * S; x += 200) coins.push(createCoin(x, 500));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.5;
      return [
        createQB(500 * S, 480, 'mushroom'),
        createQB(1200 * S, 480, 'coin'),
        createQB(3200 * S, 480, 'mushroom'),
        createQB(4200 * S, 480, 'flower'),
        createQB(6200 * S, 480, 'star'),
        createQB(7200 * S, 480, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.5;
      return [
        createEnemy(400 * S, 510, 'goomba'),
        createEnemy(600 * S, 510, 'goomba'),
        createEnemy(800 * S, 510, 'crab'),
        createEnemy(1000 * S, 510, 'spiny'),
        createEnemy(1200 * S, 510, 'koopa'),
        createEnemy(1600 * S, 510, 'crab'),
        createEnemy(1800 * S, 510, 'goomba'),
        createEnemy(3000 * S, 510, 'spiny'),
        createEnemy(3300 * S, 510, 'goomba'),
        createEnemy(3600 * S, 510, 'koopa'),
        createEnemy(4000 * S, 510, 'crab'),
        createEnemy(4300 * S, 510, 'goomba'),
        createEnemy(4600 * S, 510, 'spiny'),
        createEnemy(5800 * S, 510, 'goomba'),
        createEnemy(6200 * S, 510, 'crab'),
        createEnemy(6600 * S, 510, 'koopa'),
        createEnemy(7000 * S, 510, 'goomba'),
        createEnemy(7250 * S, 510, 'piranha'),
        createEnemy(7600 * S, 510, 'piranha'),
        createEnemy(9400 * S, 510, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.5;
      return [
        createDeco(400 * S, 510, 'skull'),
        createDeco(1500 * S, 510, 'cactus'),
        createDeco(3800 * S, 510, 'rock'),
        createDeco(6500 * S, 510, 'pyramid'),
        createDeco(8500 * S, 510, 'cactus'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 9400 * 0.5, y: 528 },
    timeBonus: 200,
  },

  // ============================================================
  // Level 12 (Finale-Pyramide): Ascending spiral-like structure.
  // Climbing gradually higher toward the goal via stepped
  // platforms, pipes, and gaps. S=0.45
  // ============================================================
  {
    id: 12, name: "Pharaoh's Tomb", width: 5000, height: 700, biome: 'desert',
    platforms: (() => {
      const S = 0.45;
      const plats: any[] = [];
      // Starting ground at y=600
      plats.push(createPlat(200 * S, 600, 800 * S, 40, 'sand'));

      // --- Staircase 1: ascending ---
      plats.push(createPlat(1200 * S, 540, 120 * S, 28, 'platform_easy'));
      plats.push(createPlat(1500 * S, 480, 120 * S, 28, 'platform_medium'));
      plats.push(createPlat(1800 * S, 420, 120 * S, 28, 'platform_hard'));
      plats.push(createPlat(2200 * S, 360, 150 * S, 40, 'sand'));
      plats.push(createPlat(2600 * S, 300, 120 * S, 28, 'platform_hard'));
      plats.push(createPlat(3000 * S, 240, 150 * S, 40, 'sandstone'));

      // --- Pipe interlude: back down to ground level ---
      plats.push(createPlat(3400 * S, 540, 80, 20, 'platform_easy'));
      plats.push(createPlat(3600 * S, 480, 80, 20, 'platform_medium'));
      plats.push(...pipeSection(S, 3800, 550, 3));

      // --- Staircase 2: ascending from ground after pipes ---
      plats.push(createPlat(5200 * S, 540, 120 * S, 28, 'platform_easy'));
      plats.push(createPlat(5600 * S, 480, 120 * S, 28, 'platform_medium'));
      plats.push(createPlat(6000 * S, 420, 120 * S, 28, 'platform_hard'));

      // --- Gap ---
      plats.push(...gapWithPlatforms(S, 6300, 480, 400, 3));

      // --- Staircase 3: final ascent ---
      plats.push(createPlat(7000 * S, 360, 150 * S, 40, 'sandstone'));
      plats.push(createPlat(7600 * S, 300, 120 * S, 28, 'platform_hard'));
      plats.push(createPlat(8200 * S, 240, 120 * S, 28, 'platform_medium'));
      plats.push(createPlat(8800 * S, 180, 150 * S, 40, 'sand'));

      // Final ground
      plats.push(createPlat(9500 * S, 180, 800 * S, 40, 'sand'));

      return plats;
    })(),
    movingPlatforms: [
      createMovingPlat(1700 * 0.45, 360, 120, 24, 'platform_medium', 'vertical', 150, 18),
      createMovingPlat(5600 * 0.45, 420, 120, 24, 'platform_medium', 'horizontal', 250, 20),
      createMovingPlat(8500 * 0.45, 180, 120, 24, 'platform_easy', 'horizontal', 200, 22),
    ],
    coins: (() => {
      const S = 0.45;
      const coins: any[] = [];
      for (let x = 300; x < 1000; x += 200) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(1200 * S, 490));
      coins.push(createCoin(1500 * S, 430));
      coins.push(createCoin(1800 * S, 370));
      coins.push(createCoin(2200 * S, 310));
      coins.push(createCoin(2800 * S, 190));
      for (let x = 4000 * S; x < 4900 * S; x += 200) coins.push(createCoin(x, 500));
      coins.push(createCoin(5400 * S, 490));
      coins.push(createCoin(5800 * S, 430));
      coins.push(createCoin(6200 * S, 370));
      coins.push(createCoin(7400 * S, 310));
      coins.push(createCoin(8000 * S, 250));
      coins.push(createCoin(8600 * S, 190));
      coins.push(createCoin(9000 * S, 130));
      coins.push(createCoin(9400 * S, 130));
      coins.push(createCoin(9800 * S, 130));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.45;
      return [
        createQB(500 * S, 530, 'mushroom'),
        createQB(1400 * S, 410, 'coin'),
        createQB(2400 * S, 290, 'flower'),
        createQB(4600 * S, 480, 'star'),
        createQB(5800 * S, 410, 'mushroom'),
        createQB(7200 * S, 470, 'coin'),
        createQB(8300 * S, 170, 'flower'),
        createQB(9200 * S, 110, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.45;
      return [
        createEnemy(500 * S, 560, 'goomba'),
        createEnemy(900 * S, 560, 'crab'),
        createEnemy(1600 * S, 440, 'goomba'),
        createEnemy(2300 * S, 320, 'spiny'),
        createEnemy(2800 * S, 260, 'koopa'),
        createEnemy(4100 * S, 510, 'piranha'),
        createEnemy(4450 * S, 510, 'piranha'),
        createEnemy(5400 * S, 500, 'goomba'),
        createEnemy(6100 * S, 380, 'crab'),
        createEnemy(7200 * S, 320, 'koopa'),
        createEnemy(8000 * S, 260, 'spiny'),
        createEnemy(8700 * S, 200, 'goomba'),
        createEnemy(9100 * S, 140, 'crab'),
        createEnemy(9500 * S, 140, 'goomba'),
        createEnemy(9900 * S, 140, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.45;
      return [
        createDeco(400 * S, 560, 'pyramid'),
        createDeco(1500 * S, 560, 'cactus'),
        createDeco(2500 * S, 560, 'skull'),
        createDeco(4200 * S, 510, 'rock'),
        createDeco(6500 * S, 510, 'cactus'),
        createDeco(8000 * S, 560, 'pyramid'),
        createDeco(9000 * S, 560, 'skull'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 9850 * 0.45, y: 158 },
    timeBonus: 220,
  },
];

// Water World - 6 Levels (13-18)
// Tutorial → Gap-Strecke → Röhren-Labyrinth → Vertikal-Kletterer → Gegner-Horde → Tiefsee-Finale

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat, gapWithPlatforms, pipeSection, verticalClimb } from './helpers';

export const WATER_LEVELS: LevelData[] = [
  // ============================================================
  // LEVEL 13 (Tutorial) - Einfacher Unterwasser-Pfad
  // ============================================================
  {
    id: 13, name: "Aqua Depths", width: 8000, height: 600, biome: 'water',
    platforms: (() => {
      const S = 0.65;
      const plats: any[] = [];
      // Start ground
      plats.push(createPlat(100 * S, 500, 1200 * S, 40, 'water'));
      // Small bridge upward
      plats.push(createPlat(1150 * S, 440, 100, 24, 'platform_easy'));
      plats.push(createPlat(1350 * S, 370, 80, 24, 'platform_medium'));
      // Second ground
      plats.push(createPlat(2200 * S, 500, 1200 * S, 40, 'water'));
      // Pipe section (moved closer to ground)
      plats.push(...pipeSection(S, 2900, 500, 2));
      // Bridge after pipes
      plats.push(createPlat(3800 * S, 440, 100, 24, 'platform_easy'));
      plats.push(createPlat(4500 * S, 500, 1200 * S, 40, 'water'));
      // Small gap
      plats.push(...gapWithPlatforms(S, 5400, 500, 400, 2));
      // Final ground + goal
      plats.push(createPlat(6500 * S, 500, 1500 * S, 40, 'water'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.65;
      const coins: any[] = [];
      for (let x = 300; x < 1300; x += 200) coins.push(createCoin(x * S, 450));
      for (let x = 2300; x < 3400; x += 200) coins.push(createCoin(x * S, 450));
      coins.push(createCoin(1400 * S, 380), createCoin(1700 * S, 310));
      for (let x = 4600; x < 5800; x += 200) coins.push(createCoin(x * S, 450));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.65;
      return [
        createQB(500 * S, 430, 'mushroom'),
        createQB(2500 * S, 430, 'flower'),
        createQB(4800 * S, 430, 'star'),
        createQB(7000 * S, 430, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.65;
      return [
        createEnemy(800 * S, 480, 'squid'),
        createEnemy(3000 * S, 470, 'piranha'),
        createEnemy(3700 * S, 470, 'piranha'),
        createEnemy(6000 * S, 470, 'squid'),
      ];
    })(),
    decorations: (() => {
      const S = 0.65;
      return [
        createDeco(400 * S, 460, 'seaweed'),
        createDeco(1200 * S, 420, 'bubble'),
        createDeco(2600 * S, 460, 'coral'),
        createDeco(4000 * S, 420, 'shell'),
        createDeco(5300 * S, 460, 'seaweed'),
        createDeco(7200 * S, 460, 'bubble'),
      ];
    })(),
    movingPlatforms: (() => {
      const S = 0.65;
      return [
        createMovingPlat(6000 * S, 460, 100, 24, 'water', 'horizontal', 200, 20),
      ];
    })(),
    playerStart: { x: 150, y: 460 },
    goal: { x: 4225, y: 478 },
    timeBonus: 120,
  },

  // ============================================================
  // LEVEL 14 (Gap-Strecke) - Viele Lücken mit beweglichen Plattformen
  // ============================================================
  {
    id: 14, name: "Tidal Tunnels", width: 10000, height: 600, biome: 'water',
    platforms: (() => {
      const S = 0.625;
      const plats: any[] = [];
      // Start ground
      plats.push(createPlat(200 * S, 500, 600 * S, 40, 'water'));
      // Gap 1 - reduced startX from 1100 to 500 to close gap
      plats.push(...gapWithPlatforms(S, 500, 500, 300, 4));
      // Ground 2
      plats.push(createPlat(1200 * S, 500, 600 * S, 40, 'water'));
      // Gap 2 - reduced startX from 2600 to 1500
      plats.push(...gapWithPlatforms(S, 1500, 500, 400, 4));
      // Ground 3
      plats.push(createPlat(2300 * S, 500, 600 * S, 40, 'water'));
      // Gap 3 - reduced startX from 4200 to 2600
      plats.push(...gapWithPlatforms(S, 2600, 500, 350, 4));
      // Ground 4
      plats.push(createPlat(3400 * S, 500, 600 * S, 40, 'water'));
      // Gap 4 - reduced startX from 5700 to 3800
      plats.push(...gapWithPlatforms(S, 3800, 500, 400, 4));
      // Ground 5
      plats.push(createPlat(4900 * S, 500, 600 * S, 40, 'water'));
      // Gap 5 - reduced startX from 7300 to 5200
      plats.push(...gapWithPlatforms(S, 5200, 500, 350, 3));
      // Final ground + goal
      plats.push(createPlat(6000 * S, 500, 800 * S, 40, 'water'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.625;
      const coins: any[] = [];
      for (let x = 300; x < 900; x += 200) coins.push(createCoin(x * S, 450));
      for (let x = 1900; x < 2500; x += 200) coins.push(createCoin(x * S, 450));
      for (let x = 3500; x < 4100; x += 200) coins.push(createCoin(x * S, 450));
      for (let x = 5000; x < 5600; x += 200) coins.push(createCoin(x * S, 450));
      for (let x = 6600; x < 7200; x += 200) coins.push(createCoin(x * S, 450));
      for (let x = 8000; x < 9000; x += 200) coins.push(createCoin(x * S, 450));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.625;
      return [
        createQB(400 * S, 430, 'mushroom'),
        createQB(1400, 430, 'flower'),     // over gap 1
        createQB(2100 * S, 430, 'star'),
        createQB(3700 * S, 430, 'mushroom'),
        createQB(4600, 430, 'flower'),     // over gap 3
        createQB(5200 * S, 430, 'star'),
        createQB(8500 * S, 430, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.625;
      return [
        createEnemy(500 * S, 480, 'squid'),
        createEnemy(2000 * S, 480, 'crab'),
        createEnemy(3600 * S, 480, 'squid'),
        createEnemy(5200 * S, 480, 'robot'),
        createEnemy(6800 * S, 480, 'crab'),
        createEnemy(8300 * S, 480, 'squid'),
      ];
    })(),
    decorations: (() => {
      const S = 0.625;
      return [
        createDeco(300 * S, 460, 'seaweed'),
        createDeco(1300, 420, 'bubble'),
        createDeco(2200 * S, 460, 'coral'),
        createDeco(3800 * S, 420, 'shell'),
        createDeco(5400 * S, 460, 'seaweed'),
        createDeco(7000 * S, 420, 'bubble'),
        createDeco(8400 * S, 460, 'coral'),
      ];
    })(),
    movingPlatforms: (() => {
      const S = 0.625;
      return [
        createMovingPlat(1288, 470, 100, 24, 'water', 'horizontal', 260, 22),
        createMovingPlat(2750, 460, 100, 24, 'water', 'horizontal', 300, 20),
        createMovingPlat(4350, 450, 100, 24, 'water', 'horizontal', 280, 22),
        createMovingPlat(5850, 460, 100, 24, 'water', 'horizontal', 320, 20),
      ];
    })(),
    playerStart: { x: 150, y: 460 },
    goal: { x: 3750, y: 478 },  // 6000 * 0.625
    timeBonus: 140,
  },

  // ============================================================
  // LEVEL 15 (Röhren-Labyrinth) - 7 Pipe-Sektionen mit Piranhas
  // ============================================================
  {
    id: 15, name: "Coral Abyss", width: 16000, height: 600, biome: 'water',
    platforms: (() => {
      const S = 0.6;
      const plats: any[] = [];
      // Start ground
      plats.push(createPlat(100 * S, 500, 600 * S, 40, 'water'));
      // Pipe section 1 (3 pipes)
      plats.push(...pipeSection(S, 600, 500, 3));
      // Bridge - reduced startX from 2200 to 1300
      plats.push(...gapWithPlatforms(S, 1300, 440, 300, 4));
      plats.push(createPlat(1900 * S, 500, 400 * S, 40, 'water'));
      // Pipe section 2 (4 pipes)
      plats.push(...pipeSection(S, 2200, 500, 4));
      // Bridge - reduced startX from 4900 to 3200
      plats.push(...gapWithPlatforms(S, 3200, 440, 300, 4));
      plats.push(createPlat(3800 * S, 500, 400 * S, 40, 'water'));
      // Pipe section 3 (3 pipes)
      plats.push(...pipeSection(S, 4100, 500, 3));
      // Bridge - reduced startX from 7300 to 5300
      plats.push(...gapWithPlatforms(S, 5300, 440, 300, 4));
      plats.push(createPlat(5900 * S, 500, 400 * S, 40, 'water'));
      // Pipe section 4 (4 pipes)
      plats.push(...pipeSection(S, 6200, 500, 4));
      // Bridge - reduced startX from 10000 to 7500
      plats.push(...gapWithPlatforms(S, 7500, 440, 300, 4));
      plats.push(createPlat(8100 * S, 500, 400 * S, 40, 'water'));
      // Pipe section 5 (3 pipes) - reduced from 10900 to 8500
      plats.push(...pipeSection(S, 8500, 500, 3));
      // Bridge - reduced startX from 12400 to 9700
      plats.push(...gapWithPlatforms(S, 9700, 440, 300, 4));
      plats.push(createPlat(10300 * S, 500, 400 * S, 40, 'water'));
      // Pipe section 6 (4 pipes) - reduced from 13400 to 10600
      plats.push(...pipeSection(S, 10600, 500, 4));
      // Bridge - reduced startX from 15100 to 11800
      plats.push(...gapWithPlatforms(S, 11800, 440, 300, 4));
      plats.push(createPlat(12400 * S, 500, 400 * S, 40, 'water'));
      // Pipe section 7 (3 pipes) - reduced from 16000 to 12700
      plats.push(...pipeSection(S, 12700, 500, 3));
      // Final bridge - reduced from 17500 to 14200
      plats.push(...gapWithPlatforms(S, 14200, 440, 300, 4));
      plats.push(createPlat(15000 * S, 500, 1000 * S, 40, 'water'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.6;
      const coins: any[] = [];
      for (let x = 300; x < 700; x += 200) coins.push(createCoin(x * S, 450));
      for (let x = 2800; x < 3300; x += 200) coins.push(createCoin(x * S, 450));
      for (let x = 5500; x < 6000; x += 200) coins.push(createCoin(x * S, 450));
      for (let x = 7900; x < 8400; x += 200) coins.push(createCoin(x * S, 450));
      for (let x = 10600; x < 11100; x += 200) coins.push(createCoin(x * S, 450));
      for (let x = 13000; x < 13500; x += 200) coins.push(createCoin(x * S, 450));
      for (let x = 18100; x < 19200; x += 200) coins.push(createCoin(x * S, 450));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.6;
      return [
        createQB(400 * S, 430, 'mushroom'),
        createQB(1200 * S, 430, 'flower'),
        createQB(3000 * S, 430, 'star'),
        createQB(3700 * S, 430, 'mushroom'),
        createQB(4900 * S, 430, 'flower'),
        createQB(5700 * S, 430, 'mushroom'),
        createQB(6400 * S, 430, 'star'),
        createQB(8100 * S, 430, 'flower'),
        createQB(8800 * S, 430, 'mushroom'),
        createQB(10700 * S, 430, 'star'),
        createQB(13800 * S, 430, 'mushroom'),
        createQB(18400 * S, 430, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.6;
      return [
        // Pipe section 1
        createEnemy(1300 * S, 470, 'piranha'),
        createEnemy(1650 * S, 470, 'piranha'),
        createEnemy(2000 * S, 470, 'piranha'),
        // Pipe section 2
        createEnemy(3700 * S, 470, 'piranha'),
        createEnemy(4050 * S, 470, 'piranha'),
        createEnemy(4400 * S, 470, 'piranha'),
        createEnemy(4750 * S, 470, 'piranha'),
        // Pipe section 3
        createEnemy(6400 * S, 470, 'piranha'),
        createEnemy(6750 * S, 470, 'piranha'),
        createEnemy(7100 * S, 470, 'piranha'),
        // Pipe section 4
        createEnemy(8800 * S, 470, 'piranha'),
        createEnemy(9150 * S, 470, 'piranha'),
        createEnemy(9500 * S, 470, 'piranha'),
        createEnemy(9850 * S, 470, 'piranha'),
        // Pipe section 5
        createEnemy(11500 * S, 470, 'piranha'),
        createEnemy(11850 * S, 470, 'piranha'),
        createEnemy(12200 * S, 470, 'piranha'),
        // Pipe section 6
        createEnemy(13900 * S, 470, 'piranha'),
        createEnemy(14250 * S, 470, 'piranha'),
        createEnemy(14600 * S, 470, 'piranha'),
        createEnemy(14950 * S, 470, 'piranha'),
        // Pipe section 7
        createEnemy(16600 * S, 470, 'piranha'),
        createEnemy(16950 * S, 470, 'piranha'),
        createEnemy(17300 * S, 470, 'piranha'),
        // Squids on ground sections
        createEnemy(500 * S, 480, 'squid'),
        createEnemy(2900 * S, 480, 'squid'),
        createEnemy(5600 * S, 480, 'squid'),
      ];
    })(),
    decorations: (() => {
      const S = 0.6;
      const decos: any[] = [];
      for (let x = 200; x < 19000; x += 800) {
        const type = x % 3200 === 200 ? 'seaweed' : (x % 3200 === 1000 ? 'coral' : (x % 3200 === 1800 ? 'shell' : 'bubble'));
        decos.push(createDeco(x * S, x % 3200 === 200 ? 460 : 460, type));
      }
      return decos;
    })(),
    movingPlatforms: (() => {
      const S = 0.6;
      return [
        createMovingPlat(5020 * S, 440, 100, 24, 'water', 'horizontal', 220, 22),
        createMovingPlat(10100 * S, 450, 100, 24, 'water', 'vertical', 160, 20),
      ];
    })(),
    playerStart: { x: 150, y: 460 },
    goal: { x: 9000, y: 478 },
    timeBonus: 160,
  },

  // ============================================================
  // LEVEL 16 (Vertikal-Kletterer) - 4 Vertical Climb Sektionen
  // ============================================================
  {
    id: 16, name: "Sunken Ruins", width: 18000, height: 650, biome: 'water',
    platforms: (() => {
      const S = 0.556;
      const plats: any[] = [];
      // Start ground
      plats.push(createPlat(100 * S, 600, 800 * S, 40, 'water'));
      // Vertical climb 1 - moved closer (800 -> 600)
      plats.push(...verticalClimb(S, 600, 600));
      // Bridge after climb 1 - MUCH more platforms (4 -> 8)
      plats.push(...gapWithPlatforms(S, 2200, 600, 400, 8));
      // Ground after climb 1
      plats.push(createPlat(3200 * S, 600, 600 * S, 40, 'water'));
      // Gap section - MORE platforms (3 -> 6)
      plats.push(...gapWithPlatforms(S, 3600, 600, 350, 6));
      // Ground
      plats.push(createPlat(4500 * S, 600, 600 * S, 40, 'water'));
      // Vertical climb 2 - moved closer (5400 -> 4800)
      plats.push(...verticalClimb(S, 4800, 600));
      // Bridge after climb 2 - MORE platforms (4 -> 8)
      plats.push(...gapWithPlatforms(S, 6400, 540, 400, 8));
      plats.push(createPlat(7400 * S, 600, 600 * S, 40, 'water'));
      // Pipe section - moved closer (9000 -> 7600)
      plats.push(...pipeSection(S, 7600, 600, 3));
      // Bridge after pipes - MORE platforms (4 -> 8)
      plats.push(...gapWithPlatforms(S, 8600, 540, 400, 8));
      plats.push(createPlat(9600 * S, 600, 600 * S, 40, 'water'));
      // Vertical climb 3 - moved closer (11300 -> 10000)
      plats.push(...verticalClimb(S, 10000, 600));
      // Bridge after climb 3 - MORE platforms (3 -> 6)
      plats.push(...gapWithPlatforms(S, 12000, 600, 350, 6));
      // Ground after climb 3
      plats.push(createPlat(12800 * S, 600, 600 * S, 40, 'water'));
      // Gap - MORE platforms (3 -> 6)
      plats.push(...gapWithPlatforms(S, 13200, 600, 350, 6));
      // Ground
      plats.push(createPlat(14200 * S, 600, 600 * S, 40, 'water'));
      // Vertical climb 4 - moved closer (16000 -> 14600)
      plats.push(...verticalClimb(S, 14600, 600));
      // Final ground + goal - moved closer
      plats.push(createPlat(16500 * S, 600, 800 * S, 40, 'water'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.556;
      const coins: any[] = [];
      for (let x = 300; x < 1000; x += 200) coins.push(createCoin(x * S, 550));
      // Coins on vertical climb 1
      coins.push(createCoin(1400 * S, 480), createCoin(1700 * S, 400), createCoin(2000 * S, 320));
      coins.push(createCoin(2300 * S, 240), createCoin(2600 * S, 320), createCoin(2900 * S, 400));
      coins.push(createCoin(3200 * S, 480));
      for (let x = 3900; x < 4700; x += 200) coins.push(createCoin(x * S, 550));
      // Coins on vertical climb 2
      coins.push(createCoin(6600 * S, 480), createCoin(6900 * S, 400), createCoin(7200 * S, 320));
      coins.push(createCoin(7500 * S, 240), createCoin(7800 * S, 320), createCoin(8100 * S, 400));
      coins.push(createCoin(8400 * S, 480));
      for (let x = 9100; x < 9700; x += 200) coins.push(createCoin(x * S, 550));
      for (let x = 11400; x < 12400; x += 200) coins.push(createCoin(x * S, 550));
      // Coins on vertical climb 3
      coins.push(createCoin(12500 * S, 480), createCoin(12800 * S, 400), createCoin(13100 * S, 320));
      coins.push(createCoin(13400 * S, 240), createCoin(13700 * S, 320), createCoin(14000 * S, 400));
      coins.push(createCoin(14300 * S, 480));
      for (let x = 15000; x < 15600; x += 200) coins.push(createCoin(x * S, 550));
      // Coins on vertical climb 4
      coins.push(createCoin(17500 * S, 480), createCoin(17800 * S, 400), createCoin(18100 * S, 320));
      coins.push(createCoin(18400 * S, 240), createCoin(18700 * S, 320), createCoin(19000 * S, 400));
      coins.push(createCoin(19300 * S, 480));
      for (let x = 20000; x < 21000; x += 200) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.556;
      return [
        createQB(500 * S, 530, 'mushroom'),
        createQB(2300 * S, 170, 'flower'),
        createQB(4100 * S, 530, 'star'),
        createQB(7500 * S, 170, 'mushroom'),
        createQB(9300 * S, 530, 'flower'),
        createQB(10100 * S, 530, 'star'),
        createQB(11700 * S, 530, 'mushroom'),
        createQB(13400 * S, 170, 'flower'),
        createQB(15200 * S, 530, 'star'),
        createQB(18400 * S, 170, 'mushroom'),
        createQB(20500 * S, 530, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.556;
      return [
        createEnemy(600 * S, 580, 'squid'),
        createEnemy(2500 * S, 580, 'squid'),
        createEnemy(4000 * S, 580, 'crab'),
        createEnemy(5800 * S, 580, 'robot'),
        createEnemy(10000 * S, 570, 'piranha'),
        createEnemy(10350 * S, 570, 'piranha'),
        createEnemy(10700 * S, 570, 'piranha'),
        createEnemy(11600 * S, 580, 'squid'),
        createEnemy(13000 * S, 580, 'crab'),
        createEnemy(15000 * S, 580, 'robot'),
        createEnemy(16800 * S, 580, 'squid'),
        createEnemy(18000 * S, 580, 'crab'),
        createEnemy(20500 * S, 580, 'squid'),
      ];
    })(),
    decorations: (() => {
      const S = 0.556;
      const decos: any[] = [];
      for (let x = 300; x < 21000; x += 900) {
        const t = x % 3600 === 300 ? 'seaweed' : (x % 3600 === 1200 ? 'bubble' : (x % 3600 === 2100 ? 'coral' : 'shell'));
        decos.push(createDeco(x * S, 560, t));
      }
      return decos;
    })(),
    movingPlatforms: (() => {
      const S = 0.556;
      return [
        createMovingPlat(10800 * S, 560, 100, 24, 'water', 'horizontal', 200, 20),
        createMovingPlat(16200, 560, 100, 24, 'water', 'horizontal', 380, 20),
      ];
    })(),
    playerStart: { x: 150, y: 560 },
    goal: { x: 9180, y: 578 },  // 16500 * 0.556
    timeBonus: 180,
  },

  // ============================================================
  // LEVEL 17 (Gegner-Horde) - 18 Enemies (Crabs, Squids, Robots)
  // ============================================================
  {
    id: 17, name: "Neptune's Depths", width: 20000, height: 650, biome: 'water',
    platforms: (() => {
      const S = 0.5;
      const plats: any[] = [];
      // Long ground section 1
      plats.push(createPlat(100 * S, 600, 3000 * S, 40, 'water'));
      // Gap - MORE platforms (4 -> 8)
      plats.push(...gapWithPlatforms(S, 2800, 600, 400, 8));
      // Long ground section 2
      plats.push(createPlat(3400 * S, 600, 2500 * S, 40, 'water'));
      // Pipe section - moved closer (5400 -> 4800)
      plats.push(...pipeSection(S, 4800, 600, 4));
      // Bridge - MORE platforms (4 -> 8)
      plats.push(...gapWithPlatforms(S, 6000, 540, 400, 8));
      plats.push(createPlat(6800 * S, 600, 1500 * S, 40, 'water'));
      // Gap - MORE platforms (4 -> 8)
      plats.push(...gapWithPlatforms(S, 7800, 600, 400, 8));
      // Long ground section 3
      plats.push(createPlat(9000 * S, 600, 2000 * S, 40, 'water'));
      // Vertical climb - moved closer (11700 -> 10500)
      plats.push(...verticalClimb(S, 10500, 600));
      // Ground
      plats.push(createPlat(13300 * S, 600, 800 * S, 40, 'water'));
      // Pipe section - moved closer (15100 -> 13700)
      plats.push(...pipeSection(S, 13700, 600, 3));
      // Bridge - MORE platforms (4 -> 8)
      plats.push(...gapWithPlatforms(S, 14800, 540, 400, 8));
      plats.push(createPlat(15800 * S, 600, 800 * S, 40, 'water'));
      // Small gap - MORE platforms (3 -> 6)
      plats.push(...gapWithPlatforms(S, 16400, 600, 300, 6));
      // Final ground + goal - moved closer
      plats.push(createPlat(17500 * S, 600, 1200 * S, 40, 'water'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.5;
      const coins: any[] = [];
      for (let x = 300; x < 2400; x += 200) coins.push(createCoin(x * S, 550));
      for (let x = 3700; x < 5700; x += 200) coins.push(createCoin(x * S, 550));
      for (let x = 7700; x < 9300; x += 200) coins.push(createCoin(x * S, 550));
      for (let x = 10600; x < 12400; x += 200) coins.push(createCoin(x * S, 550));
      // Vertical climb coins
      coins.push(createCoin(12500 * S, 480), createCoin(12800 * S, 400), createCoin(13100 * S, 320));
      coins.push(createCoin(13400 * S, 240), createCoin(13700 * S, 320), createCoin(14000 * S, 400));
      coins.push(createCoin(14300 * S, 480));
      for (let x = 15000; x < 15800; x += 200) coins.push(createCoin(x * S, 550));
      for (let x = 17600; x < 18500; x += 200) coins.push(createCoin(x * S, 550));
      for (let x = 19300; x < 20600; x += 200) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.5;
      return [
        createQB(800 * S, 530, 'mushroom'),
        createQB(1800 * S, 530, 'flower'),
        createQB(4100 * S, 530, 'star'),
        createQB(5300 * S, 530, 'mushroom'),
        createQB(6200 * S, 530, 'flower'),
        createQB(8000 * S, 530, 'star'),
        createQB(11000 * S, 530, 'mushroom'),
        createQB(12000 * S, 530, 'flower'),
        createQB(13400 * S, 170, 'star'),
        createQB(15200 * S, 530, 'mushroom'),
        createQB(16300 * S, 530, 'flower'),
        createQB(17800 * S, 530, 'star'),
        createQB(19700 * S, 530, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.5;
      return [
        // Ground section 1: crabs + squids
        createEnemy(500 * S, 580, 'crab'),
        createEnemy(900 * S, 580, 'squid'),
        createEnemy(1300 * S, 580, 'robot'),
        createEnemy(1700 * S, 580, 'squid'),
        createEnemy(2100 * S, 580, 'crab'),
        // Ground section 2: robots + squids
        createEnemy(3800 * S, 580, 'robot'),
        createEnemy(4300 * S, 580, 'squid'),
        createEnemy(4800 * S, 580, 'crab'),
        createEnemy(5300 * S, 580, 'robot'),
        // Pipes: piranhas
        createEnemy(6100 * S, 570, 'piranha'),
        createEnemy(6450 * S, 570, 'piranha'),
        createEnemy(6800 * S, 570, 'piranha'),
        createEnemy(7150 * S, 570, 'piranha'),
        // Ground section 3: squids + robots
        createEnemy(7800 * S, 580, 'squid'),
        createEnemy(8400 * S, 580, 'crab'),
        createEnemy(10900 * S, 580, 'robot'),
        createEnemy(11500 * S, 580, 'squid'),
        // Ground after climb: crabs
        createEnemy(15100 * S, 580, 'crab'),
        createEnemy(15500 * S, 580, 'robot'),
        // Pipes
        createEnemy(16300 * S, 570, 'piranha'),
        createEnemy(16650 * S, 570, 'piranha'),
        createEnemy(17000 * S, 570, 'piranha'),
        // Final ground
        createEnemy(17700 * S, 580, 'squid'),
        createEnemy(18200 * S, 580, 'crab'),
        createEnemy(19600 * S, 580, 'robot'),
        createEnemy(20100 * S, 580, 'squid'),
      ];
    })(),
    decorations: (() => {
      const S = 0.5;
      const decos: any[] = [];
      for (let x = 300; x < 21000; x += 700) {
        const t = x % 2800 === 300 ? 'seaweed' : (x % 2800 === 1000 ? 'bubble' : (x % 2800 === 1700 ? 'coral' : 'shell'));
        decos.push(createDeco(x * S, 560, t));
      }
      return decos;
    })(),
    movingPlatforms: (() => {
      const S = 0.5;
      return [
        createMovingPlat(7200 * S, 540, 100, 24, 'water', 'horizontal', 220, 22),
        createMovingPlat(15400 * S, 520, 120, 24, 'water', 'vertical', 180, 20),
      ];
    })(),
    playerStart: { x: 150, y: 560 },
    goal: { x: 8750, y: 578 },
    timeBonus: 200,
  },

  // ============================================================
  // LEVEL 18 (Tiefsee-Finale) - Absteigende Level-Struktur
  // ============================================================
  {
    id: 18, name: "The Mariana Trench", width: 22000, height: 800, biome: 'water',
    platforms: (() => {
      const S = 0.45;
      const plats: any[] = [];
      // Start at shallow depth (y=400)
      plats.push(createPlat(100 * S, 400, 800 * S, 40, 'water'));
      // Step down level 1
      plats.push(createPlat(1000 * S, 440, 100, 24, 'platform_easy'));
      plats.push(createPlat(1300 * S, 480, 800 * S, 40, 'water'));
      // Step down level 2
      plats.push(createPlat(2200 * S, 520, 100, 24, 'platform_easy'));
      plats.push(createPlat(2500 * S, 560, 600 * S, 40, 'water'));
      // Step down level 3 via gap
      plats.push(...gapWithPlatforms(S, 3300, 560, 450, 3));
      plats.push(createPlat(4000 * S, 600, 800 * S, 40, 'water'));
      // Pipe section at depth
      plats.push(...pipeSection(S, 4850, 600, 4));
      // Bridge
      plats.push(...gapWithPlatforms(S, 6600, 540, 600, 4));
      plats.push(createPlat(6900 * S, 600, 600 * S, 40, 'water'));
      // Step down level 4
      plats.push(createPlat(7600 * S, 620, 100, 24, 'platform_easy'));
      plats.push(createPlat(7900 * S, 640, 400 * S, 40, 'water'));
      // Gap to step down further
      plats.push(...gapWithPlatforms(S, 8500, 640, 500, 4));
      plats.push(createPlat(9400 * S, 660, 600 * S, 40, 'water'));
      // Vertical climb
      plats.push(...verticalClimb(S, 10300, 660));
      // Deepest section
      plats.push(createPlat(12700 * S, 700, 800 * S, 40, 'water'));
      // Final challenge: pipes at deepest
      plats.push(...pipeSection(S, 13550, 700, 5));
      // Bridge
      plats.push(...gapWithPlatforms(S, 15600, 640, 600, 4));
      plats.push(createPlat(15900 * S, 700, 600 * S, 40, 'water'));
      // Final gap
      plats.push(...gapWithPlatforms(S, 16700, 700, 500, 4));
      // Goal platform
      plats.push(createPlat(17600 * S, 720, 1500 * S, 40, 'water'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.45;
      const coins: any[] = [];
      for (let x = 300; x < 900; x += 200) coins.push(createCoin(x * S, 350));
      for (let x = 1400; x < 2100; x += 200) coins.push(createCoin(x * S, 430));
      for (let x = 2600; x < 3100; x += 200) coins.push(createCoin(x * S, 510));
      for (let x = 4100; x < 4900; x += 200) coins.push(createCoin(x * S, 550));
      for (let x = 7000; x < 7500; x += 200) coins.push(createCoin(x * S, 550));
      for (let x = 8000; x < 8400; x += 200) coins.push(createCoin(x * S, 590));
      for (let x = 9500; x < 10200; x += 200) coins.push(createCoin(x * S, 610));
      // Vertical climb coins
      coins.push(createCoin(10300 * S, 540), createCoin(10600 * S, 460), createCoin(10900 * S, 380));
      coins.push(createCoin(11200 * S, 300), createCoin(11500 * S, 380), createCoin(11800 * S, 460));
      coins.push(createCoin(12100 * S, 540));
      for (let x = 12800; x < 13600; x += 200) coins.push(createCoin(x * S, 650));
      for (let x = 16000; x < 16600; x += 200) coins.push(createCoin(x * S, 650));
      for (let x = 17700; x < 19000; x += 200) coins.push(createCoin(x * S, 670));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.45;
      return [
        createQB(500 * S, 330, 'mushroom'),
        createQB(1500 * S, 410, 'flower'),
        createQB(2700 * S, 490, 'star'),
        createQB(4300 * S, 530, 'mushroom'),
        createQB(5300 * S, 530, 'flower'),
        createQB(7200 * S, 530, 'star'),
        createQB(8200 * S, 570, 'mushroom'),
        createQB(10000 * S, 590, 'flower'),
        createQB(11200 * S, 230, 'star'),
        createQB(13000 * S, 630, 'mushroom'),
        createQB(14000 * S, 630, 'flower'),
        createQB(15000 * S, 630, 'star'),
        createQB(16300 * S, 630, 'mushroom'),
        createQB(18200 * S, 650, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.45;
      return [
        createEnemy(500 * S, 380, 'squid'),
        createEnemy(1600 * S, 460, 'crab'),
        createEnemy(2800 * S, 540, 'robot'),
        createEnemy(4400 * S, 580, 'squid'),
        // Pipes at depth
        createEnemy(5300 * S, 570, 'piranha'),
        createEnemy(5650 * S, 570, 'piranha'),
        createEnemy(6000 * S, 570, 'piranha'),
        createEnemy(6350 * S, 570, 'piranha'),
        createEnemy(7200 * S, 580, 'crab'),
        createEnemy(8300 * S, 620, 'squid'),
        createEnemy(9700 * S, 640, 'robot'),
        createEnemy(13000 * S, 680, 'squid'),
        // Deep pipes
        createEnemy(14000 * S, 670, 'piranha'),
        createEnemy(14350 * S, 670, 'piranha'),
        createEnemy(14700 * S, 670, 'piranha'),
        createEnemy(15050 * S, 670, 'piranha'),
        createEnemy(15400 * S, 670, 'piranha'),
        createEnemy(16100 * S, 680, 'crab'),
        createEnemy(18000 * S, 700, 'robot'),
        createEnemy(18700 * S, 700, 'squid'),
      ];
    })(),
    decorations: (() => {
      const S = 0.45;
      const decos: any[] = [];
      for (let x = 200; x < 19000; x += 700) {
        const t = x % 2800 === 200 ? 'seaweed' : (x % 2800 === 900 ? 'bubble' : (x % 2800 === 1600 ? 'coral' : 'shell'));
        decos.push(createDeco(x * S, x < 3000 ? x * 0.13 + 340 : (x < 7000 ? x * 0.04 + 370 : x * 0.015 + 460), t));
      }
      return decos;
    })(),
    movingPlatforms: (() => {
      const S = 0.45;
      return [
        createMovingPlat(3800 * S, 540, 100, 24, 'water', 'horizontal', 200, 22),
        createMovingPlat(9000, 600, 100, 24, 'water', 'horizontal', 340, 20),
        createMovingPlat(15300 * S, 640, 120, 24, 'water', 'vertical', 140, 20),
      ];
    })(),
    playerStart: { x: 150, y: 360 },
    goal: { x: 7920, y: 698 },
    timeBonus: 220,
  },
];

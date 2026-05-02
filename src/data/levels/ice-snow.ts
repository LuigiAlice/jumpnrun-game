// Ice-Snow World - 6 Levels (19-24)
// Level 19: Tutorial - simple snowy path
// Level 20: Gap-Strecke - 4-5 gap sections with moving platforms
// Level 21: Röhren-Labyrinth - 5-8 pipe sections with piranhas
// Level 22: Vertikal-Kletterer - 3-4 verticalClimb sections
// Level 23: Gegner-Horde - 15-20 enemies
// Level 24: Eis-Höhle-Finale - tunnel structure with platforms on both sides

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat, gapWithPlatforms, pipeSection, verticalClimb } from './helpers';

export const ICE_SNOW_LEVELS: LevelData[] = [
  // ===== Level 19: Tutorial - "Snowy Path" (S=0.65) =====
  {
    id: 19, name: "Snowy Path", width: 8000, height: 600, biome: 'ice-snow',
    platforms: (() => {
      const S = 0.65;
      const plats: any[] = [];
      plats.push(createPlat(250 * S, 550, 800 * S, 40, 'snow'));
      plats.push(createPlat(1275 * S, 550, 500 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(S, 1950, 550, 400, 3));
      plats.push(createPlat(2700 * S, 550, 1000 * S, 40, 'snow'));
      plats.push(createPlat(3700 * S, 520, 100, 20, 'platform_easy'));
      plats.push(...pipeSection(S, 4000, 550, 3));
      plats.push(createPlat(5200 * S, 520, 100, 20, 'platform_easy'));
      plats.push(createPlat(5400 * S, 550, 1000 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(S, 6200, 550, 350, 2));
      plats.push(createPlat(7200 * S, 550, 800 * S, 40, 'snow'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.65;
      return [
        createCoin(400 * S, 500), createCoin(600 * S, 500), createCoin(1100 * S, 440),
        createCoin(2200 * S, 370), createCoin(3100 * S, 500), createCoin(4400 * S, 480),
        createCoin(5000 * S, 370), createCoin(5700 * S, 500), createCoin(6400 * S, 410),
        createCoin(7600 * S, 500),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.65;
      return [
        createQB(800 * S, 480, 'mushroom'), createQB(1600 * S, 480, 'coin'),
        createQB(3100 * S, 480, 'mushroom'), createQB(4400 * S, 460, 'flower'),
        createQB(5900 * S, 480, 'coin'), createQB(7600 * S, 480, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.65;
      return [
        createEnemy(600 * S, 510, 'goomba'), createEnemy(1400 * S, 510, 'goomba'),
        createEnemy(3000 * S, 510, 'spiny'), createEnemy(4100 * S, 480, 'piranha'),
        createEnemy(5700 * S, 510, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.65;
      return [
        createDeco(400 * S, 510, 'snowflake'), createDeco(2000 * S, 510, 'icicle'),
        createDeco(3500 * S, 510, 'snowflake'), createDeco(5500 * S, 510, 'iceberg'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 4680, y: 528 },
    timeBonus: 120,
    movingPlatforms: (() => {
      const S = 0.65;
      return [
        createMovingPlat(3500 * S, 480, 120, 24, 'platform_medium', 'horizontal', 200, 20),
      ];
    })(),
  },

  // ===== Level 20: Gap-Strecke - "Glacier Gaps" (S=0.625) =====
  {
    id: 20, name: "Glacier Gaps", width: 11000, height: 650, biome: 'ice-snow',
    platforms: (() => {
      const S = 0.625;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 650, 1000 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(S, 1100, 600, 500, 4));
      plats.push(createPlat(2200 * S, 600, 1000 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(S, 3100, 600, 450, 4));
      plats.push(createPlat(4200 * S, 600, 1200 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(S, 5300, 550, 500, 4));
      plats.push(...pipeSection(S, 5600, 600, 4));
      plats.push(...gapWithPlatforms(S, 7300, 550, 600, 4));
      plats.push(createPlat(7500 * S, 600, 1000 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(S, 8400, 600, 400, 3));
      plats.push(createPlat(9400 * S, 600, 1200 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(S, 10400, 600, 450, 4));
      plats.push(createPlat(11700 * S, 600, 800 * S, 40, 'snow'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.625;
      return [
        createCoin(400 * S, 550), createCoin(800 * S, 550), createCoin(1300 * S, 450),
        createCoin(1800 * S, 380), createCoin(2500 * S, 550), createCoin(3500 * S, 450),
        createCoin(4400 * S, 550), createCoin(5800 * S, 540), createCoin(6200 * S, 420),
        createCoin(7800 * S, 550), createCoin(8700 * S, 450), createCoin(9700 * S, 550),
        createCoin(11000 * S, 430), createCoin(12000 * S, 550),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.625;
      return [
        createQB(900 * S, 530, 'mushroom'), createQB(2000 * S, 480, 'flower'),
        createQB(3200 * S, 530, 'mushroom'), createQB(4800 * S, 530, 'star'),
        createQB(6100 * S, 530, 'flower'), createQB(8000 * S, 530, 'mushroom'),
        createQB(10000 * S, 530, 'star'), createQB(11200 * S, 480, 'coin'),
      ];
    })(),
    enemies: (() => {
      const S = 0.625;
      return [
        createEnemy(700 * S, 560, 'spiny'), createEnemy(1600 * S, 560, 'goomba'),
        createEnemy(2500 * S, 560, 'robot'), createEnemy(3500 * S, 540, 'spiny'),
        createEnemy(4700 * S, 560, 'goomba'), createEnemy(5800 * S, 520, 'piranha'),
        createEnemy(6100 * S, 520, 'piranha'), createEnemy(8000 * S, 560, 'robot'),
        createEnemy(9200 * S, 560, 'spiny'), createEnemy(11000 * S, 540, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.625;
      return [
        createDeco(500 * S, 560, 'snowflake'), createDeco(1900 * S, 560, 'icicle'),
        createDeco(3000 * S, 560, 'rock'), createDeco(4600 * S, 560, 'iceberg'),
        createDeco(6300 * S, 560, 'snowflake'), createDeco(8500 * S, 560, 'penguin'),
        createDeco(10100 * S, 560, 'icicle'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 7312, y: 578 },
    timeBonus: 140,
    movingPlatforms: (() => {
      const S = 0.625;
      return [
        createMovingPlat(1700 * S, 500, 120, 24, 'platform_medium', 'horizontal', 250, 22),
        createMovingPlat(3800 * S, 480, 120, 24, 'platform_medium', 'horizontal', 220, 20),
        createMovingPlat(10200 * S, 500, 150, 24, 'platform_medium', 'horizontal', 280, 22),
      ];
    })(),
  },

  // ===== Level 21: Röhren-Labyrinth - "Frozen Tunnels" (S=0.6) =====
  {
    id: 21, name: "Frozen Tunnels", width: 13000, height: 700, biome: 'ice-snow',
    platforms: (() => {
      const S = 0.6;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 650, 1000 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(S, 1250, 600, 350, 3));
      plats.push(...pipeSection(S, 1600, 650, 4));
      plats.push(...gapWithPlatforms(S, 3400, 600, 500, 4));
      plats.push(createPlat(3600 * S, 650, 800 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(S, 4500, 600, 400, 3));
      plats.push(...pipeSection(S, 4800, 650, 5));
      plats.push(...gapWithPlatforms(S, 6800, 600, 500, 4));
      plats.push(createPlat(7000 * S, 650, 600 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(S, 7750, 650, 350, 3));
      plats.push(createPlat(8500 * S, 650, 800 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(S, 9400, 600, 600, 4));
      plats.push(...pipeSection(S, 9700, 650, 5));
      plats.push(...gapWithPlatforms(S, 11800, 600, 600, 4));
      plats.push(createPlat(12000 * S, 650, 1000 * S, 40, 'snow'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.6;
      return [
        createCoin(400 * S, 600), createCoin(600 * S, 600), createCoin(1700 * S, 560),
        createCoin(2200 * S, 460), createCoin(3800 * S, 600), createCoin(4200 * S, 600),
        createCoin(5000 * S, 560), createCoin(5500 * S, 460), createCoin(7100 * S, 600),
        createCoin(7900 * S, 520), createCoin(8700 * S, 600), createCoin(9800 * S, 560),
        createCoin(10400 * S, 460), createCoin(12300 * S, 600),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.6;
      return [
        createQB(800 * S, 580, 'mushroom'), createQB(2200 * S, 480, 'flower'),
        createQB(3200 * S, 580, 'mushroom'), createQB(4200 * S, 580, 'star'),
        createQB(5400 * S, 580, 'flower'), createQB(6000 * S, 500, 'mushroom'),
        createQB(7500 * S, 580, 'star'), createQB(8100 * S, 520, 'flower'),
        createQB(9300 * S, 580, 'mushroom'), createQB(10500 * S, 500, 'star'),
        createQB(11400 * S, 580, 'mushroom'), createQB(12300 * S, 580, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.6;
      return [
        createEnemy(500 * S, 610, 'goomba'), createEnemy(1000 * S, 610, 'spiny'),
        createEnemy(1800 * S, 560, 'piranha'), createEnemy(2150 * S, 560, 'piranha'),
        createEnemy(2500 * S, 560, 'piranha'), createEnemy(2850 * S, 560, 'piranha'),
        createEnemy(3900 * S, 610, 'goomba'), createEnemy(5000 * S, 560, 'piranha'),
        createEnemy(5350 * S, 560, 'piranha'), createEnemy(5700 * S, 560, 'piranha'),
        createEnemy(6050 * S, 560, 'piranha'), createEnemy(6400 * S, 560, 'piranha'),
        createEnemy(7300 * S, 610, 'robot'), createEnemy(8800 * S, 610, 'spiny'),
        createEnemy(9900 * S, 560, 'piranha'), createEnemy(10250 * S, 560, 'piranha'),
        createEnemy(10600 * S, 560, 'piranha'), createEnemy(10950 * S, 560, 'piranha'),
        createEnemy(11300 * S, 560, 'piranha'),
      ];
    })(),
    decorations: (() => {
      const S = 0.6;
      return [
        createDeco(600 * S, 610, 'snowflake'), createDeco(2400 * S, 610, 'icicle'),
        createDeco(4000 * S, 610, 'iceberg'), createDeco(5800 * S, 610, 'penguin'),
        createDeco(7400 * S, 610, 'rock'), createDeco(9200 * S, 610, 'snowflake'),
        createDeco(10800 * S, 610, 'iceberg'), createDeco(12400 * S, 610, 'icicle'),
      ];
    })(),
    playerStart: { x: 150, y: 600 },
    goal: { x: 7200, y: 628 },
    timeBonus: 160,
    movingPlatforms: (() => {
      const S = 0.6;
      return [
        createMovingPlat(3000 * S, 520, 120, 24, 'platform_medium', 'horizontal', 200, 20),
        createMovingPlat(9200 * S, 520, 120, 24, 'platform_medium', 'horizontal', 160, 22),
      ];
    })(),
  },

  // ===== Level 22: Vertikal-Kletterer - "Iceberg Ascent" (S=0.556) =====
  {
    id: 22, name: "Iceberg Ascent", width: 12000, height: 700, biome: 'ice-snow',
    platforms: (() => {
      const S = 0.556;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 650, 1200 * S, 40, 'snow'));
      plats.push(...verticalClimb(S, 1350, 650));
      
      // Bridging after climb 1
      plats.push(...gapWithPlatforms(S, 2200, 650, 1800, 10));
      
      plats.push(createPlat(3800 * S, 650, 800 * S, 40, 'snow'));
      plats.push(createPlat(4600 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(4900 * S, 490, 120, 28, 'platform_medium'));
      plats.push(createPlat(5200 * S, 410, 150, 40, 'snow'));
      plats.push(createPlat(5600 * S, 490, 120, 28, 'platform_medium'));
      plats.push(createPlat(5900 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(6300 * S, 650, 600 * S, 40, 'snow'));
      
      // Bridge to pipe section
      plats.push(...gapWithPlatforms(S, 6500, 650, 1000, 6));
      
      plats.push(createPlat(7100 * S, 600, 100, 20, 'platform_easy'));
      plats.push(...pipeSection(S, 7300, 650, 4));
      plats.push(createPlat(9100 * S, 600, 100, 20, 'platform_easy'));
      plats.push(createPlat(9300 * S, 650, 1000 * S, 40, 'snow'));
      
      // Bridge after pipe to verticalClimb 2
      plats.push(...gapWithPlatforms(S, 10100, 650, 2800, 15));
      
      plats.push(...verticalClimb(S, 10100, 650));
      plats.push(createPlat(12900 * S, 650, 1200 * S, 40, 'snow'));
      
      // Bridge between climbs
      plats.push(...gapWithPlatforms(S, 14000, 650, 3000, 16));
      
      plats.push(...verticalClimb(S, 13950, 650));
      plats.push(createPlat(16700 * S, 650, 1000 * S, 40, 'snow'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.556;
      return [
        createCoin(400 * S, 600), createCoin(600 * S, 600), createCoin(1600 * S, 490),
        createCoin(1900 * S, 410), createCoin(2200 * S, 330), createCoin(2500 * S, 250),
        createCoin(2800 * S, 330), createCoin(3100 * S, 410), createCoin(3400 * S, 490),
        createCoin(4100 * S, 600), createCoin(4700 * S, 510), createCoin(5000 * S, 430),
        createCoin(5300 * S, 350), createCoin(5700 * S, 430), createCoin(6000 * S, 510),
        createCoin(6500 * S, 600), createCoin(7500 * S, 560), createCoin(8200 * S, 450),
        createCoin(9600 * S, 600), createCoin(10700 * S, 490), createCoin(11000 * S, 410),
        createCoin(11300 * S, 330), createCoin(11600 * S, 250), createCoin(11900 * S, 330),
        createCoin(12200 * S, 410), createCoin(12500 * S, 490), createCoin(13200 * S, 600),
        createCoin(14500 * S, 490), createCoin(14800 * S, 410), createCoin(15100 * S, 330),
        createCoin(15400 * S, 250), createCoin(15700 * S, 330), createCoin(16000 * S, 410),
        createCoin(16300 * S, 490), createCoin(17000 * S, 600),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.556;
      return [
        createQB(1000 * S, 580, 'mushroom'), createQB(1800 * S, 300, 'star'),
        createQB(2500 * S, 250, 'flower'), createQB(3400 * S, 520, 'mushroom'),
        createQB(4400 * S, 580, 'mushroom'), createQB(5000 * S, 380, 'star'),
        createQB(5600 * S, 520, 'flower'), createQB(6800 * S, 580, 'mushroom'),
        createQB(7800 * S, 560, 'star'), createQB(8600 * S, 480, 'flower'),
        createQB(9700 * S, 580, 'mushroom'), createQB(11000 * S, 300, 'star'),
        createQB(11700 * S, 250, 'mushroom'), createQB(12700 * S, 520, 'flower'),
        createQB(14800 * S, 300, 'star'), createQB(15500 * S, 250, 'flower'),
        createQB(17100 * S, 580, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.556;
      return [
        createEnemy(600 * S, 610, 'goomba'), createEnemy(1100 * S, 610, 'robot'),
        createEnemy(2100 * S, 610, 'spiny'), createEnemy(3100 * S, 610, 'goomba'),
        createEnemy(4200 * S, 610, 'robot'), createEnemy(4900 * S, 610, 'spiny'),
        createEnemy(5500 * S, 610, 'goomba'), createEnemy(6700 * S, 610, 'robot'),
        createEnemy(7500 * S, 560, 'piranha'), createEnemy(7850 * S, 560, 'piranha'),
        createEnemy(8200 * S, 560, 'piranha'), createEnemy(8550 * S, 560, 'piranha'),
        createEnemy(10000 * S, 610, 'spiny'), createEnemy(11700 * S, 610, 'goomba'),
        createEnemy(13200 * S, 610, 'robot'), createEnemy(15300 * S, 610, 'spiny'),
        createEnemy(17100 * S, 610, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.556;
      return [
        createDeco(400 * S, 610, 'snowflake'), createDeco(2000 * S, 610, 'icicle'),
        createDeco(3600 * S, 610, 'iceberg'), createDeco(4800 * S, 610, 'penguin'),
        createDeco(6200 * S, 610, 'rock'), createDeco(7900 * S, 610, 'snowflake'),
        createDeco(10000 * S, 610, 'iceberg'), createDeco(11800 * S, 610, 'icicle'),
        createDeco(14000 * S, 610, 'penguin'), createDeco(16000 * S, 610, 'snowflake'),
      ];
    })(),
    playerStart: { x: 150, y: 600 },
    goal: { x: 9285, y: 628 },
    timeBonus: 180,
    movingPlatforms: (() => {
      const S = 0.556;
      return [
        createMovingPlat(4300 * S, 580, 120, 24, 'platform_medium', 'horizontal', 220, 20),
        createMovingPlat(10600 * S, 550, 120, 24, 'platform_medium', 'vertical', 180, 22),
        createMovingPlat(15200 * S, 530, 120, 24, 'platform_medium', 'horizontal', 200, 20),
      ];
    })(),
  },

  // ===== Level 23: Gegner-Horde - "Polar Heights" (S=0.5) =====
  {
    id: 23, name: "Polar Heights", width: 10000, height: 700, biome: 'ice-snow',
    platforms: (() => {
      const S = 0.5;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 650, 2000 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(S, 2400, 650, 400, 3));
      plats.push(createPlat(3200 * S, 650, 1600 * S, 40, 'snow'));
      plats.push(createPlat(5000 * S, 600, 100, 20, 'platform_easy'));
      plats.push(...pipeSection(S, 5200, 650, 4));
      plats.push(createPlat(7000 * S, 600, 100, 20, 'platform_easy'));
      plats.push(createPlat(7200 * S, 650, 2000 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(S, 9400, 650, 400, 3));
      plats.push(createPlat(10200 * S, 650, 800 * S, 40, 'snow'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.5;
      return [
        createCoin(400 * S, 600), createCoin(700 * S, 600), createCoin(1000 * S, 600),
        createCoin(1300 * S, 600), createCoin(1700 * S, 600), createCoin(2500 * S, 520),
        createCoin(2800 * S, 450), createCoin(3500 * S, 600), createCoin(4000 * S, 600),
        createCoin(4400 * S, 600), createCoin(5400 * S, 560), createCoin(5800 * S, 470),
        createCoin(7500 * S, 600), createCoin(8100 * S, 600), createCoin(8600 * S, 600),
        createCoin(9500 * S, 520), createCoin(9800 * S, 450), createCoin(10500 * S, 600),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.5;
      return [
        createQB(1200 * S, 580, 'mushroom'), createQB(2000 * S, 530, 'flower'),
        createQB(3000 * S, 580, 'mushroom'), createQB(3800 * S, 580, 'star'),
        createQB(4600 * S, 530, 'mushroom'), createQB(5600 * S, 560, 'flower'),
        createQB(6200 * S, 500, 'star'), createQB(7700 * S, 580, 'mushroom'),
        createQB(8800 * S, 580, 'flower'), createQB(10500 * S, 580, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.5;
      return [
        createEnemy(400 * S, 610, 'goomba'), createEnemy(700 * S, 610, 'goomba'),
        createEnemy(900 * S, 610, 'spiny'), createEnemy(1100 * S, 610, 'robot'),
        createEnemy(1300 * S, 610, 'goomba'), createEnemy(1500 * S, 610, 'spiny'),
        createEnemy(1700 * S, 610, 'robot'), createEnemy(1900 * S, 610, 'goomba'),
        createEnemy(2200 * S, 610, 'spiny'), createEnemy(2600 * S, 580, 'spiny'),
        createEnemy(3400 * S, 610, 'goomba'), createEnemy(3700 * S, 610, 'robot'),
        createEnemy(4000 * S, 610, 'spiny'), createEnemy(4300 * S, 610, 'goomba'),
        createEnemy(4700 * S, 610, 'robot'), createEnemy(5400 * S, 560, 'piranha'),
        createEnemy(5700 * S, 560, 'piranha'), createEnemy(6100 * S, 560, 'piranha'),
        createEnemy(6400 * S, 560, 'piranha'), createEnemy(7500 * S, 610, 'spiny'),
        createEnemy(7900 * S, 610, 'goomba'), createEnemy(8300 * S, 610, 'robot'),
        createEnemy(8700 * S, 610, 'spiny'), createEnemy(9000 * S, 610, 'goomba'),
        createEnemy(9500 * S, 580, 'robot'), createEnemy(10500 * S, 610, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.5;
      return [
        createDeco(500 * S, 610, 'rock'), createDeco(1800 * S, 610, 'snowflake'),
        createDeco(2800 * S, 610, 'penguin'), createDeco(3900 * S, 610, 'icicle'),
        createDeco(5200 * S, 610, 'iceberg'), createDeco(6500 * S, 610, 'snowflake'),
        createDeco(8000 * S, 610, 'rock'), createDeco(9100 * S, 610, 'penguin'),
        createDeco(10000 * S, 610, 'icicle'),
      ];
    })(),
    playerStart: { x: 150, y: 600 },
    goal: { x: 5100, y: 628 },
    timeBonus: 200,
    movingPlatforms: (() => {
      const S = 0.5;
      return [
        createMovingPlat(2900 * S, 500, 120, 24, 'platform_medium', 'horizontal', 200, 22),
        createMovingPlat(9800 * S, 500, 150, 24, 'platform_medium', 'horizontal', 250, 20),
      ];
    })(),
  },

  // ===== Level 24: Eis-Höhle-Finale - "Frozen Finale" (S=0.45) =====
  {
    id: 24, name: "Frozen Finale", width: 13000, height: 800, biome: 'ice-snow',
    platforms: (() => {
      const S = 0.45;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 750, 1200 * S, 40, 'snow'));
      plats.push(createPlat(1550 * S, 700, 120, 28, 'platform_easy'));
      plats.push(createPlat(2000 * S, 650, 120, 28, 'platform_medium'));
      plats.push(createPlat(2200 * S, 600, 400 * S, 40, 'snow'));
      plats.push(createPlat(2800 * S, 650, 120, 28, 'platform_medium'));
      plats.push(createPlat(3000 * S, 700, 120, 28, 'platform_easy'));
      plats.push(createPlat(3300 * S, 750, 1000 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(S, 4400, 750, 400, 3));
      plats.push(createPlat(5500 * S, 750, 800 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(S, 6600, 700, 600, 4));
      plats.push(...pipeSection(S, 6800, 750, 5));
      plats.push(...gapWithPlatforms(S, 9000, 700, 600, 4));
      plats.push(createPlat(9300 * S, 720, 120, 28, 'platform_easy'));
      plats.push(createPlat(9600 * S, 680, 120, 28, 'platform_medium'));
      plats.push(createPlat(9900 * S, 640, 400 * S, 40, 'snow'));
      plats.push(createPlat(10600 * S, 680, 120, 28, 'platform_medium'));
      plats.push(createPlat(10900 * S, 750, 1200 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(S, 12000, 750, 350, 3));
      plats.push(createPlat(13100 * S, 750, 2000 * S, 40, 'snow'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.45;
      return [
        createCoin(400 * S, 700), createCoin(600 * S, 700), createCoin(1000 * S, 700),
        createCoin(1900 * S, 630), createCoin(2100 * S, 580), createCoin(2300 * S, 530),
        createCoin(2700 * S, 580), createCoin(3700 * S, 700), createCoin(4700 * S, 620),
        createCoin(5000 * S, 550), createCoin(5700 * S, 700), createCoin(6300 * S, 700),
        createCoin(7000 * S, 660), createCoin(7500 * S, 570), createCoin(8100 * S, 490),
        createCoin(9500 * S, 640), createCoin(9800 * S, 600), createCoin(10100 * S, 560),
        createCoin(10500 * S, 600), createCoin(11200 * S, 700), createCoin(12400 * S, 610),
        createCoin(12700 * S, 540), createCoin(13400 * S, 700), createCoin(14100 * S, 700),
        createCoin(14800 * S, 700),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.45;
      return [
        createQB(900 * S, 680, 'mushroom'), createQB(1800 * S, 620, 'flower'),
        createQB(2300 * S, 530, 'star'), createQB(3100 * S, 580, 'mushroom'),
        createQB(3800 * S, 680, 'flower'), createQB(5200 * S, 610, 'star'),
        createQB(6000 * S, 680, 'mushroom'), createQB(7100 * S, 660, 'flower'),
        createQB(7800 * S, 580, 'star'), createQB(8600 * S, 490, 'mushroom'),
        createQB(9700 * S, 620, 'flower'), createQB(10200 * S, 560, 'star'),
        createQB(11200 * S, 680, 'mushroom'), createQB(12000 * S, 680, 'flower'),
        createQB(13600 * S, 680, 'star'), createQB(14400 * S, 680, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.45;
      return [
        createEnemy(600 * S, 710, 'goomba'), createEnemy(1000 * S, 710, 'spiny'),
        createEnemy(1500 * S, 710, 'robot'), createEnemy(2300 * S, 710, 'goomba'),
        createEnemy(3000 * S, 710, 'spiny'), createEnemy(3800 * S, 710, 'goomba'),
        createEnemy(5000 * S, 700, 'spiny'), createEnemy(5800 * S, 710, 'robot'),
        createEnemy(6200 * S, 710, 'goomba'), createEnemy(7000 * S, 660, 'piranha'),
        createEnemy(7350 * S, 660, 'piranha'), createEnemy(7700 * S, 660, 'piranha'),
        createEnemy(8050 * S, 660, 'piranha'), createEnemy(8400 * S, 660, 'piranha'),
        createEnemy(9600 * S, 710, 'spiny'), createEnemy(10100 * S, 710, 'goomba'),
        createEnemy(10700 * S, 710, 'robot'), createEnemy(11200 * S, 710, 'goomba'),
        createEnemy(12600 * S, 700, 'spiny'), createEnemy(14000 * S, 710, 'robot'),
      ];
    })(),
    decorations: (() => {
      const S = 0.45;
      return [
        createDeco(500 * S, 710, 'snowflake'), createDeco(1200 * S, 710, 'icicle'),
        createDeco(2000 * S, 710, 'iceberg'), createDeco(2600 * S, 710, 'icicle'),
        createDeco(3600 * S, 710, 'snowflake'), createDeco(4500 * S, 710, 'penguin'),
        createDeco(5400 * S, 710, 'iceberg'), createDeco(6200 * S, 710, 'icicle'),
        createDeco(7200 * S, 710, 'snowflake'), createDeco(8000 * S, 710, 'rock'),
        createDeco(9200 * S, 710, 'icicle'), createDeco(10200 * S, 710, 'iceberg'),
        createDeco(11200 * S, 710, 'penguin'), createDeco(12800 * S, 710, 'icicle'),
        createDeco(14000 * S, 710, 'snowflake'),
      ];
    })(),
    playerStart: { x: 150, y: 700 },
    goal: { x: 5895, y: 728 },
    timeBonus: 220,
    movingPlatforms: (() => {
      const S = 0.45;
      return [
        createMovingPlat(4400 * S, 670, 120, 24, 'platform_medium', 'horizontal', 200, 22),
        createMovingPlat(11500 * S, 650, 120, 24, 'platform_medium', 'vertical', 160, 20),
        createMovingPlat(13500 * S, 680, 150, 24, 'platform_medium', 'horizontal', 220, 20),
      ];
    })(),
  },
];

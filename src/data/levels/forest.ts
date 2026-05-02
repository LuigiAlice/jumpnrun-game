// Forest World - 6 Levels (31-36) - Distinct Structure Designs
// 31: Tutorial, 32: Gap-Strecke, 33: Röhren-Labyrinth, 34: Vertikal-Kletterer, 35: Gegner-Horde, 36: Baumkronen-Finale
// MAX_PRACTICAL_JUMP = 600px (static-to-static), MAX_JUMP_DISTANCE = 800px (to/from moving platforms)
// MAX_JUMP_UP = 350px, MAX_FALL_DOWN = 1000px

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat, gapWithPlatforms, pipeSection, verticalClimb } from './helpers';

export const FOREST_LEVELS: LevelData[] = [
  // ============================================================
  // LEVEL 31 - Tutorial (S=0.65)
  // Simple forest path with one pipe section and one small gap
  // ============================================================
  {
    id: 31, name: "Waldweg", width: 5200, height: 600, biome: 'forest',
    platforms: (() => {
      const S = 0.65;
      const plats: any[] = [];
      // Wood start: left=-195, right=715 (center=400*S=260, hw=700*S=455)
      plats.push(createPlat(400 * S, 550, 1400 * S, 40, 'wood'));
      // Bridge to pipes
      plats.push(...gapWithPlatforms(S, 910, 480, 350, 3));
      // Pipes: pipe0 left=1203, pipe2 right=1722 (startX=1600, 3 pipes)
      // gap from wood right(715) to bridge = resolved ✓
      plats.push(...pipeSection(S, 1600, 550, 3));
      // Bridge after pipes
      plats.push(...gapWithPlatforms(S, 1920, 500, 350, 3));
      // Wood mid: left=2210, right=2730 (center=3800*S=2470, hw=800*S/2=260)
      // gap from pipe2 right to bridge = resolved ✓
      plats.push(createPlat(3800 * S, 550, 800 * S, 40, 'wood'));
      // Gap: more stepping platforms
      plats.push(...gapWithPlatforms(S, 2950, 460, 500, 4));
      plats.push(...gapWithPlatforms(S, 5000, 550, 350, 3));
      // Wood goal
      plats.push(...gapWithPlatforms(S, 3660, 440, 350, 3));
      plats.push(createPlat(6600 * S, 550, 1000 * S, 40, 'wood'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.65;
      const coins: any[] = [];
      for (let x = 500; x < 2200; x += 130) coins.push(createCoin(x * S, 500));
      for (let x = 4000; x < 4800; x += 120) coins.push(createCoin(x * S, 500));
      for (let x = 5200; x < 5500; x += 150) coins.push(createCoin(x * S, 490));
      for (let x = 6700; x < 7500; x += 120) coins.push(createCoin(x * S, 490));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.65;
      return [
        createQB(1000 * S, 480, 'mushroom'),
        createQB(2100 * S, 480, 'flower'),
        createQB(4400 * S, 480, 'mushroom'),
        createQB(5200 * S, 420, 'star'),
        createQB(7000 * S, 480, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.65;
      return [
        createEnemy(1200 * S, 510, 'goomba'),
        createEnemy(1800 * S, 515, 'piranha'),
        createEnemy(2150 * S, 515, 'piranha'),
        createEnemy(4300 * S, 510, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.65;
      return [
        createDeco(400 * S, 510, 'tree'), createDeco(1400 * S, 510, 'bush'),
        createDeco(1800 * S, 510, 'log'), createDeco(3900 * S, 510, 'mushroom'),
        createDeco(5100 * S, 510, 'vine'), createDeco(6800 * S, 510, 'tree'),
        createDeco(7400 * S, 510, 'bush'),
      ];
    })(),
    movingPlatforms: (() => {
      const S = 0.65;
      return [
        createMovingPlat(3000 * S, 460, 120, 24, 'wood', 'horizontal', 200, 20),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 6600 * 0.65, y: 528 },
    timeBonus: 80,
  },

  // ============================================================
  // LEVEL 32 - Gap-Strecke (S=0.625)
  // 4 gap sections with moving platforms bridging tree platforms
  // ============================================================
  {
    id: 32, name: "Lichtungsflug", width: 7200, height: 600, biome: 'forest',
    platforms: (() => {
      const S = 0.625;
      const plats: any[] = [];
      // Wood start: left=-125, right=625 (center=400*S=250, hw=600*S=375)
      plats.push(createPlat(400 * S, 550, 1200 * S, 40, 'wood'));
      plats.push(createPlat(818, 466, 60, 20, 'platform_easy'));
      // Gap 1: 3 float plats (startX=1700, gapWidth=500)
      plats.push(...gapWithPlatforms(S, 1700, 550, 500, 3));
      plats.push(createPlat(1540, 416, 60, 20, 'platform_easy'));
      // Wood 2 (tree): left=1813, right=2188 (center=3200*S=2000, hw=300*S=187.5)
      plats.push(createPlat(3200 * S, 550, 600 * S, 40, 'wood'));
      plats.push(createPlat(2402, 466, 60, 20, 'platform_easy'));
      // Gap 2 (startX=4300): float0 left=2716, float2 right=2972
      plats.push(...gapWithPlatforms(S, 4300, 550, 500, 3));
      plats.push(createPlat(3143, 416, 60, 20, 'platform_easy'));
      // Wood 3: left=3375, right=3750 (center=5700*S=3562.5, hw=300*S=187.5)
      plats.push(createPlat(5700 * S, 550, 600 * S, 40, 'wood'));
      plats.push(createPlat(3965, 466, 60, 20, 'platform_easy'));
      // Gap 3 (startX=6800): gap from wood3 right(3750) to float0 left(4278) = 528 ✓
      plats.push(...gapWithPlatforms(S, 6800, 550, 500, 3));
      plats.push(createPlat(4705, 416, 60, 20, 'platform_easy'));
      // Wood 4: left=4938, right=5313 (center=8200*S=5125)
      plats.push(createPlat(8200 * S, 550, 600 * S, 40, 'wood'));
      plats.push(createPlat(5527, 466, 60, 20, 'platform_easy'));
      // Gap 4 (startX=9300): gap from wood4 right(5313) to float0 left(5841) = 528 ✓
      plats.push(...gapWithPlatforms(S, 9300, 550, 500, 3));
      // Wood goal: left=6375, right=7000 (center=10700*S=6687.5, hw=500*S=312.5)
      plats.push(createPlat(10700 * S, 550, 1000 * S, 40, 'wood'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.625;
      const coins: any[] = [];
      for (let x = 500; x < 1600; x += 150) coins.push(createCoin(x * S, 500));
      for (let x = 3300; x < 3800; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 5800; x < 6300; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 8300; x < 8800; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 10800; x < 11500; x += 120) coins.push(createCoin(x * S, 500));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.625;
      return [
        createQB(1100 * S, 480, 'mushroom'),
        createQB(1900 * S, 430, 'flower'),
        createQB(3400 * S, 480, 'star'),
        createQB(5900 * S, 480, 'mushroom'),
        createQB(7000 * S, 430, 'flower'),
        createQB(8400 * S, 480, 'star'),
        createQB(10900 * S, 480, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.625;
      return [
        createEnemy(900 * S, 510, 'goomba'),
        createEnemy(1600 * S, 510, 'robot'),
        createEnemy(3400 * S, 510, 'koopa'),
        createEnemy(5900 * S, 510, 'spiny'),
        createEnemy(8400 * S, 510, 'goomba'),
        createEnemy(9500 * S, 510, 'crab'),
        createEnemy(10900 * S, 510, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.625;
      return [
        createDeco(400 * S, 510, 'tree'), createDeco(1200 * S, 510, 'vine'),
        createDeco(1800 * S, 510, 'log'), createDeco(2200 * S, 510, 'bush'),
        createDeco(3300 * S, 510, 'mushroom'), createDeco(4400 * S, 510, 'tree'),
        createDeco(5800 * S, 510, 'log'), createDeco(6900 * S, 510, 'vine'),
        createDeco(8300 * S, 510, 'bush'), createDeco(9400 * S, 510, 'mushroom'),
        createDeco(10800 * S, 510, 'tree'), createDeco(11300 * S, 510, 'vine'),
      ];
    })(),
    movingPlatforms: (() => {
      const S = 0.625;
      return [
        createMovingPlat(2800 * S, 460, 120, 24, 'wood', 'horizontal', 220, 22),
        createMovingPlat(5300 * S, 460, 120, 24, 'wood', 'horizontal', 220, 22),
        createMovingPlat(7800 * S, 460, 120, 24, 'wood', 'horizontal', 220, 22),
        createMovingPlat(10300 * S, 460, 120, 24, 'wood', 'horizontal', 220, 22),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 10700 * 0.625, y: 528 },
    timeBonus: 100,
  },

  // ============================================================
  // LEVEL 33 - Röhren-Labyrinth (S=0.6)
  // 6 pipe sections with piranhas in a dense forest tube maze
  // ============================================================
  {
    id: 33, name: "Röhren-Irrgarten", width: 9200, height: 650, biome: 'forest',
    platforms: (() => {
      const S = 0.6;
      const plats: any[] = [];
      // Wood start: left=-120, right=720 (center=500*S=300, hw=700*S=420)
      plats.push(createPlat(500 * S, 600, 1400 * S, 40, 'wood'));
      // Bridge
      plats.push(...gapWithPlatforms(S, 950, 530, 350, 3));
      // Pipes 1: pipe0 left=1288 (startX=1900, 4 pipes)
      plats.push(...pipeSection(S, 1900, 600, 4));
      // Bridge after pipes
      plats.push(...gapWithPlatforms(S, 2130, 550, 350, 3));
      // Wood: left=2310, right=2610 (center=4100*S=2460, hw=250*S=150)
      plats.push(createPlat(4100 * S, 600, 500 * S, 40, 'wood'));
      // Bridge
      plats.push(...gapWithPlatforms(S, 2780, 530, 350, 3));
      // Pipes 2: pipe0 left=3088 (startX=4800, 4 pipes)
      plats.push(...pipeSection(S, 4800, 600, 4));
      // Bridge after pipes
      plats.push(...gapWithPlatforms(S, 3870, 550, 350, 3));
      // Wood: left=4110, right=4410 (center=7000*S=4200, hw=250*S=150)
      plats.push(createPlat(7000 * S, 600, 500 * S, 40, 'wood'));
      // Bridge
      plats.push(...gapWithPlatforms(S, 4540, 530, 350, 3));
      // Pipes 3: pipe0 left=4888 (startX=7800, 4 pipes)
      plats.push(...pipeSection(S, 7800, 600, 4));
      // Bridge after pipes
      plats.push(...gapWithPlatforms(S, 5670, 550, 350, 3));
      // Wood: left=5910, right=6210 (center=10000*S=6000, hw=150)
      plats.push(createPlat(10000 * S, 600, 500 * S, 40, 'wood'));
      // Bridge
      plats.push(...gapWithPlatforms(S, 6340, 530, 350, 3));
      // Pipes 4: pipe0 left=6688 (startX=10800, 4 pipes)
      plats.push(...pipeSection(S, 10800, 600, 4));
      // Bridge after pipes
      plats.push(...gapWithPlatforms(S, 7470, 550, 350, 3));
      // Wood: left=7710, right=8010 (center=13000*S=7800, hw=150)
      plats.push(createPlat(13000 * S, 600, 500 * S, 40, 'wood'));
      // Bridge
      plats.push(...gapWithPlatforms(S, 8140, 530, 350, 3));
      // Pipes 5: pipe0 left=8488 (startX=13800, 4 pipes)
      plats.push(...pipeSection(S, 13800, 600, 4));
      // Bridge after pipes
      plats.push(...gapWithPlatforms(S, 9270, 550, 350, 3));
      // Wood: left=9510, right=9810 (center=16000*S=9600, hw=150)
      plats.push(createPlat(16000 * S, 600, 500 * S, 40, 'wood'));
      // Bridge
      plats.push(...gapWithPlatforms(S, 9940, 530, 350, 3));
      // Pipes 6: pipe0 left=10288 (startX=16800, 3 pipes)
      plats.push(...pipeSection(S, 16800, 600, 3));
      // Wood goal
      plats.push(createPlat(18500 * S, 600, 1800 * S, 40, 'wood'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.6;
      const coins: any[] = [];
      for (let x = 600; x < 1900; x += 130) coins.push(createCoin(x * S, 540));
      for (let x = 2100; x < 2800; x += 130) coins.push(createCoin(x * S, 540));
      for (let x = 4300; x < 4600; x += 100) coins.push(createCoin(x * S, 540));
      for (let x = 5000; x < 5600; x += 130) coins.push(createCoin(x * S, 540));
      for (let x = 7200; x < 7500; x += 100) coins.push(createCoin(x * S, 540));
      for (let x = 8000; x < 8600; x += 130) coins.push(createCoin(x * S, 540));
      for (let x = 10200; x < 10500; x += 100) coins.push(createCoin(x * S, 540));
      for (let x = 11000; x < 11600; x += 130) coins.push(createCoin(x * S, 540));
      for (let x = 13200; x < 13500; x += 100) coins.push(createCoin(x * S, 540));
      for (let x = 14000; x < 14600; x += 130) coins.push(createCoin(x * S, 540));
      for (let x = 16200; x < 16500; x += 100) coins.push(createCoin(x * S, 540));
      for (let x = 18700; x < 20000; x += 120) coins.push(createCoin(x * S, 540));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.6;
      return [
        createQB(1100 * S, 530, 'mushroom'),
        createQB(2100 * S, 530, 'flower'),
        createQB(4300 * S, 530, 'star'),
        createQB(5100 * S, 530, 'mushroom'),
        createQB(7200 * S, 530, 'flower'),
        createQB(8100 * S, 530, 'star'),
        createQB(10200 * S, 530, 'mushroom'),
        createQB(11100 * S, 530, 'flower'),
        createQB(13200 * S, 530, 'star'),
        createQB(14100 * S, 530, 'mushroom'),
        createQB(16200 * S, 530, 'flower'),
        createQB(17000 * S, 530, 'star'),
        createQB(18800 * S, 530, 'mushroom'),
        createQB(19600 * S, 530, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.6;
      return [
        createEnemy(800 * S, 560, 'goomba'),
        createEnemy(2000 * S, 560, 'piranha'), createEnemy(2350 * S, 560, 'piranha'),
        createEnemy(2700 * S, 560, 'piranha'), createEnemy(4300 * S, 560, 'robot'),
        createEnemy(4900 * S, 560, 'piranha'), createEnemy(5250 * S, 560, 'piranha'),
        createEnemy(5600 * S, 560, 'piranha'), createEnemy(7200 * S, 560, 'koopa'),
        createEnemy(7900 * S, 560, 'piranha'), createEnemy(8250 * S, 560, 'piranha'),
        createEnemy(8600 * S, 560, 'piranha'), createEnemy(8900 * S, 560, 'piranha'),
        createEnemy(10200 * S, 560, 'goomba'), createEnemy(10900 * S, 560, 'piranha'),
        createEnemy(11250 * S, 560, 'piranha'), createEnemy(11600 * S, 560, 'piranha'),
        createEnemy(11950 * S, 560, 'piranha'), createEnemy(13200 * S, 560, 'robot'),
        createEnemy(13900 * S, 560, 'piranha'), createEnemy(14250 * S, 560, 'piranha'),
        createEnemy(14600 * S, 560, 'piranha'), createEnemy(16200 * S, 560, 'koopa'),
        createEnemy(16900 * S, 560, 'piranha'), createEnemy(17250 * S, 560, 'piranha'),
        createEnemy(18900 * S, 560, 'goomba'), createEnemy(19700 * S, 560, 'crab'),
      ];
    })(),
    decorations: (() => {
      const S = 0.6;
      return [
        createDeco(500 * S, 560, 'tree'), createDeco(1400 * S, 560, 'mushroom'),
        createDeco(2000 * S, 560, 'vine'), createDeco(2800 * S, 560, 'log'),
        createDeco(4200 * S, 560, 'bush'), createDeco(4900 * S, 560, 'tree'),
        createDeco(5800 * S, 560, 'mushroom'), createDeco(7100 * S, 560, 'vine'),
        createDeco(7900 * S, 560, 'log'), createDeco(8800 * S, 560, 'bush'),
        createDeco(10100 * S, 560, 'tree'), createDeco(10900 * S, 560, 'vine'),
        createDeco(11800 * S, 560, 'mushroom'), createDeco(13100 * S, 560, 'log'),
        createDeco(13900 * S, 560, 'bush'), createDeco(14800 * S, 560, 'tree'),
        createDeco(16100 * S, 560, 'vine'), createDeco(16900 * S, 560, 'mushroom'),
        createDeco(18000 * S, 560, 'log'), createDeco(18600 * S, 560, 'bush'),
        createDeco(19800 * S, 560, 'tree'),
      ];
    })(),
    movingPlatforms: (() => {
      const S = 0.6;
      return [
        createMovingPlat(6000 * S, 500, 120, 24, 'wood', 'horizontal', 250, 18),
        createMovingPlat(15000 * S, 500, 120, 24, 'wood', 'horizontal', 250, 18),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 18500 * 0.6, y: 578 },
    timeBonus: 130,
  },

  // ============================================================
  // LEVEL 34 - Vertikal-Kletterer (S=0.556)
  // 4 verticalClimb sections climbing trees
  // ============================================================
  {
    id: 34, name: "Baum-Kletterer", width: 10500, height: 650, biome: 'forest',
    platforms: (() => {
      const S = 0.556;
      const plats: any[] = [];
      // Wood start
      plats.push(createPlat(500 * S, 600, 1400 * S, 40, 'wood'));
      plats.push(createPlat(802, 494, 60, 20, 'platform_easy'));
      // Climb 1
      plats.push(...verticalClimb(S, 1800, 600));
      
      // Bridge from climb 1 to wood 2
      plats.push(...gapWithPlatforms(S, 2500, 600, 2400, 5));
      
      plats.push(createPlat(2228, 494, 60, 20, 'platform_easy'));
      // Wood 2
      plats.push(createPlat(4800 * S, 600, 600 * S, 40, 'wood'));
      plats.push(createPlat(2971, 494, 60, 20, 'platform_easy'));
      // Climb 2
      plats.push(...verticalClimb(S, 5700, 600));
      
      // Bridge from climb 2 to wood 3
      plats.push(...gapWithPlatforms(S, 6400, 600, 2400, 5));
      
      plats.push(createPlat(4377, 494, 60, 20, 'platform_easy'));
      // Wood 3
      plats.push(createPlat(8600 * S, 600, 600 * S, 40, 'wood'));
      plats.push(createPlat(5083, 494, 60, 20, 'platform_easy'));
      // Climb 3
      plats.push(...verticalClimb(S, 9500, 600));
      
      // Bridge from climb 3 to wood 4
      plats.push(...gapWithPlatforms(S, 10200, 600, 2500, 5));
      
      plats.push(createPlat(6510, 494, 60, 20, 'platform_easy'));
      // Wood 4
      plats.push(createPlat(12500 * S, 600, 600 * S, 40, 'wood'));
      plats.push(createPlat(7252, 494, 60, 20, 'platform_easy'));
      // Climb 4
      plats.push(...verticalClimb(S, 13400, 600));
      
      // Bridge to goal
      plats.push(...gapWithPlatforms(S, 14100, 600, 2000, 5));
      
      plats.push(createPlat(8717, 494, 60, 20, 'platform_easy'));
      plats.push(createPlat(8905, 494, 60, 20, 'platform_easy'));
      // Wood goal
      plats.push(createPlat(17000 * S, 600, 1400 * S, 40, 'wood'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.556;
      const coins: any[] = [];
      for (let x = 600; x < 1800; x += 150) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(1800 * S, 460), createCoin(2100 * S, 380), createCoin(2400 * S, 300));
      coins.push(createCoin(2700 * S, 220), createCoin(3000 * S, 220), createCoin(3300 * S, 220));
      coins.push(createCoin(3600 * S, 300), createCoin(3900 * S, 380), createCoin(4200 * S, 460));
      for (let x = 4900; x < 5400; x += 150) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(5700 * S, 460), createCoin(6000 * S, 380), createCoin(6300 * S, 300));
      coins.push(createCoin(6600 * S, 220), createCoin(6900 * S, 220), createCoin(7200 * S, 220));
      coins.push(createCoin(7500 * S, 300), createCoin(7800 * S, 380), createCoin(8100 * S, 460));
      for (let x = 8700; x < 9200; x += 150) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(9500 * S, 460), createCoin(9800 * S, 380), createCoin(10100 * S, 300));
      coins.push(createCoin(10400 * S, 220), createCoin(10700 * S, 220), createCoin(11000 * S, 220));
      coins.push(createCoin(11300 * S, 300), createCoin(11600 * S, 380), createCoin(11900 * S, 460));
      for (let x = 12600; x < 13100; x += 150) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(13400 * S, 460), createCoin(13700 * S, 380), createCoin(14000 * S, 300));
      coins.push(createCoin(14300 * S, 220), createCoin(14600 * S, 220), createCoin(14900 * S, 220));
      coins.push(createCoin(15200 * S, 300), createCoin(15500 * S, 380), createCoin(15800 * S, 460));
      for (let x = 17100; x < 18200; x += 120) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.556;
      return [
        createQB(1100 * S, 530, 'mushroom'),
        createQB(2100 * S, 150, 'flower'),
        createQB(3000 * S, 150, 'star'),
        createQB(5000 * S, 530, 'mushroom'),
        createQB(6000 * S, 150, 'flower'),
        createQB(6900 * S, 150, 'star'),
        createQB(8800 * S, 530, 'mushroom'),
        createQB(9800 * S, 150, 'flower'),
        createQB(10700 * S, 150, 'star'),
        createQB(12700 * S, 530, 'mushroom'),
        createQB(13700 * S, 150, 'flower'),
        createQB(14600 * S, 150, 'star'),
        createQB(17200 * S, 530, 'mushroom'),
        createQB(17800 * S, 530, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.556;
      return [
        createEnemy(1200 * S, 560, 'goomba'),
        createEnemy(2500 * S, 260, 'goomba'),
        createEnemy(5000 * S, 560, 'robot'),
        createEnemy(6400 * S, 260, 'spiny'),
        createEnemy(8800 * S, 560, 'crab'),
        createEnemy(10300 * S, 260, 'goomba'),
        createEnemy(12700 * S, 560, 'koopa'),
        createEnemy(14200 * S, 260, 'robot'),
        createEnemy(17200 * S, 560, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.556;
      return [
        createDeco(500 * S, 560, 'tree'), createDeco(1400 * S, 560, 'bush'),
        createDeco(1900 * S, 220, 'vine'), createDeco(3100 * S, 220, 'log'),
        createDeco(4900 * S, 560, 'mushroom'), createDeco(5400 * S, 560, 'tree'),
        createDeco(5800 * S, 220, 'vine'), createDeco(7000 * S, 220, 'bush'),
        createDeco(8700 * S, 560, 'log'), createDeco(9200 * S, 560, 'mushroom'),
        createDeco(9600 * S, 220, 'tree'), createDeco(10800 * S, 220, 'vine'),
        createDeco(12600 * S, 560, 'bush'), createDeco(13100 * S, 560, 'log'),
        createDeco(13500 * S, 220, 'mushroom'), createDeco(14700 * S, 220, 'tree'),
        createDeco(17100 * S, 560, 'vine'), createDeco(17800 * S, 560, 'bush'),
      ];
    })(),
    movingPlatforms: (() => {
      const S = 0.556;
      return [
        createMovingPlat(4400 * S, 520, 120, 24, 'wood', 'horizontal', 220, 22),
        createMovingPlat(8200 * S, 520, 120, 24, 'wood', 'horizontal', 220, 22),
        createMovingPlat(12100 * S, 520, 120, 24, 'wood', 'horizontal', 220, 22),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 17000 * 0.556, y: 578 },
    timeBonus: 140,
  },

  // ============================================================
  // LEVEL 35 - Gegner-Horde (S=0.5)
  // 15-20 enemies: goombas, robots, spinys, crabs on ground platforms
  // ============================================================
  {
    id: 35, name: "Käfer-Plage", width: 6500, height: 650, biome: 'forest',
    platforms: (() => {
      const S = 0.5;
      const plats: any[] = [];
      // Wood 1: left=-225, right=675 (center=450*S=225, hw=900*S=450)
      plats.push(createPlat(450 * S, 600, 1800 * S, 40, 'wood'));
      // Bridge
      plats.push(...gapWithPlatforms(S, 830, 560, 400, 3));
      // Wood 2
      plats.push(createPlat(2650 * S, 600, 1200 * S, 40, 'wood'));
      // Bridge
      plats.push(...gapWithPlatforms(S, 1800, 510, 500, 4));
      // Gap: more stepping platforms
      plats.push(...gapWithPlatforms(S, 4100, 600, 400, 3));
      // Wood 3
      plats.push(createPlat(6000 * S, 600, 1800 * S, 40, 'wood'));
      // Bridge to pipes
      plats.push(...gapWithPlatforms(S, 3600, 530, 500, 4));
      // Pipes
      plats.push(...pipeSection(S, 7400, 600, 2));
      // Bridge after pipes
      plats.push(...gapWithPlatforms(S, 4210, 550, 400, 3));
      // Wood 4
      plats.push(createPlat(9600 * S, 600, 1600 * S, 40, 'wood'));
      // Wood 5
      plats.push(createPlat(11600 * S, 600, 1200 * S, 40, 'wood'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.5;
      const coins: any[] = [];
      for (let x = 550; x < 2200; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 2800; x < 3800; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 6200; x < 7600; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 9800; x < 11200; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 11800; x < 12700; x += 120) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.5;
      return [
        createQB(900 * S, 530, 'mushroom'),
        createQB(2000 * S, 530, 'flower'),
        createQB(3100 * S, 530, 'star'),
        createQB(4400 * S, 520, 'mushroom'),
        createQB(6400 * S, 530, 'flower'),
        createQB(7200 * S, 530, 'star'),
        createQB(7600 * S, 530, 'mushroom'),
        createQB(10000 * S, 530, 'flower'),
        createQB(11000 * S, 530, 'star'),
        createQB(12000 * S, 530, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.5;
      return [
        createEnemy(600 * S, 560, 'goomba'),
        createEnemy(1000 * S, 560, 'goomba'),
        createEnemy(1400 * S, 560, 'robot'),
        createEnemy(1800 * S, 560, 'robot'),
        createEnemy(2800 * S, 560, 'spiny'),
        createEnemy(3200 * S, 560, 'goomba'),
        createEnemy(3600 * S, 560, 'crab'),
        createEnemy(4300 * S, 560, 'goomba'),
        createEnemy(6200 * S, 560, 'spiny'),
        createEnemy(6600 * S, 560, 'robot'),
        createEnemy(7100 * S, 560, 'crab'),
        createEnemy(7600 * S, 560, 'goomba'),
        createEnemy(7500 * S, 560, 'piranha'),
        createEnemy(9800 * S, 560, 'goomba'),
        createEnemy(10200 * S, 560, 'spiny'),
        createEnemy(10700 * S, 560, 'robot'),
        createEnemy(11200 * S, 560, 'crab'),
        createEnemy(11800 * S, 560, 'goomba'),
        createEnemy(12300 * S, 560, 'robot'),
      ];
    })(),
    decorations: (() => {
      const S = 0.5;
      return [
        createDeco(500 * S, 560, 'tree'), createDeco(1400 * S, 560, 'bush'),
        createDeco(2200 * S, 560, 'log'), createDeco(2800 * S, 560, 'mushroom'),
        createDeco(3800 * S, 560, 'vine'), createDeco(4200 * S, 560, 'tree'),
        createDeco(6400 * S, 560, 'bush'), createDeco(7200 * S, 560, 'mushroom'),
        createDeco(7600 * S, 560, 'log'), createDeco(9800 * S, 560, 'tree'),
        createDeco(10800 * S, 560, 'vine'), createDeco(11800 * S, 560, 'bush'),
        createDeco(12400 * S, 560, 'mushroom'),
      ];
    })(),
    movingPlatforms: (() => {
      const S = 0.5;
      return [
        createMovingPlat(5100 * S, 500, 120, 24, 'wood', 'horizontal', 200, 20),
        createMovingPlat(6800 * S, 450, 120, 24, 'wood', 'vertical', 150, 18),
        createMovingPlat(8800 * S, 500, 120, 24, 'wood', 'horizontal', 200, 20),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 11600 * 0.5, y: 578 },
    timeBonus: 90,
  },

  // ============================================================
  // LEVEL 36 - Baumkronen-Finale (S=0.45)
  // Multi-level canopy: ground → mid canopy → high canopy → descent → goal
  // Platforms at 2-3 height levels with vertical moving platforms for transitions
  // ============================================================
  {
    id: 36, name: "Wipfel-Pfad", width: 10000, height: 700, biome: 'forest',
    platforms: (() => {
      const S = 0.45;
      const plats: any[] = [];
      // Ground start
      plats.push(createPlat(600 * S, 600, 1600 * S, 40, 'wood'));
      plats.push(createPlat(865, 393, 60, 20, 'platform_easy'));
      // Mid canopy 1
      plats.push(createPlat(3200 * S, 420, 1000 * S, 30, 'wood'));
      plats.push(createPlat(1853, 393, 60, 20, 'platform_easy'));
      // Mid canopy 2
      plats.push(createPlat(5200 * S, 420, 1000 * S, 30, 'wood'));
      plats.push(createPlat(2784, 213, 60, 20, 'platform_easy'));
      // High canopy 1
      plats.push(createPlat(7400 * S, 240, 1000 * S, 30, 'wood'));
      plats.push(createPlat(3743, 213, 60, 20, 'platform_easy'));
      // High canopy 2
      plats.push(createPlat(9400 * S, 240, 1000 * S, 30, 'wood'));
      plats.push(createPlat(4643, 213, 60, 20, 'platform_easy'));
      // High canopy 3
      plats.push(createPlat(11400 * S, 240, 1000 * S, 30, 'wood'));
      plats.push(createPlat(5511, 213, 60, 20, 'platform_easy'));
      // Descent mid 1
      plats.push(createPlat(13200 * S, 420, 1000 * S, 30, 'wood'));
      plats.push(createPlat(6337, 393, 60, 20, 'platform_easy'));
      // Descent mid 2
      plats.push(createPlat(15000 * S, 420, 800 * S, 30, 'wood'));
      plats.push(createPlat(7102, 393, 60, 20, 'platform_easy'));
      // Ground 2
      plats.push(createPlat(16600 * S, 600, 600 * S, 40, 'wood'));
      // Ground 3
      plats.push(createPlat(17800 * S, 600, 1200 * S, 40, 'wood'));
      // Gap section
      plats.push(...gapWithPlatforms(S, 18800, 600, 350, 2));
      // Ground final
      plats.push(createPlat(20000 * S, 600, 1200 * S, 40, 'wood'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.45;
      const coins: any[] = [];
      for (let x = 700; x < 2200; x += 120) coins.push(createCoin(x * S, 550));
      for (let x = 3300; x < 4100; x += 100) coins.push(createCoin(x * S, 370));
      for (let x = 5300; x < 6100; x += 100) coins.push(createCoin(x * S, 370));
      for (let x = 7500; x < 8300; x += 100) coins.push(createCoin(x * S, 190));
      for (let x = 9500; x < 10300; x += 100) coins.push(createCoin(x * S, 190));
      for (let x = 11500; x < 12300; x += 100) coins.push(createCoin(x * S, 190));
      for (let x = 13300; x < 14100; x += 100) coins.push(createCoin(x * S, 370));
      for (let x = 15100; x < 15700; x += 100) coins.push(createCoin(x * S, 370));
      for (let x = 16700; x < 17200; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 17900; x < 18800; x += 120) coins.push(createCoin(x * S, 550));
      for (let x = 18900; x < 19400; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 20100; x < 21000; x += 120) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.45;
      return [
        createQB(1200 * S, 530, 'mushroom'),
        createQB(3450 * S, 350, 'flower'),
        createQB(5450 * S, 350, 'star'),
        createQB(7650 * S, 170, 'mushroom'),
        createQB(9650 * S, 170, 'flower'),
        createQB(11650 * S, 170, 'star'),
        createQB(13450 * S, 350, 'flower'),
        createQB(15250 * S, 350, 'star'),
        createQB(18000 * S, 530, 'mushroom'),
        createQB(18950 * S, 510, 'flower'),
        createQB(20250 * S, 530, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.45;
      return [
        createEnemy(800 * S, 560, 'goomba'),
        createEnemy(1500 * S, 560, 'goomba'),
        createEnemy(3500 * S, 380, 'robot'),
        createEnemy(5500 * S, 380, 'crab'),
        createEnemy(7700 * S, 200, 'spiny'),
        createEnemy(9700 * S, 200, 'goomba'),
        createEnemy(11700 * S, 200, 'robot'),
        createEnemy(13500 * S, 380, 'crab'),
        createEnemy(15300 * S, 380, 'goomba'),
        createEnemy(16900 * S, 560, 'robot'),
        createEnemy(18000 * S, 560, 'spiny'),
        createEnemy(19000 * S, 560, 'crab'),
        createEnemy(20200 * S, 560, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.45;
      return [
        createDeco(600 * S, 560, 'tree'), createDeco(1600 * S, 560, 'bush'),
        createDeco(2100 * S, 560, 'log'), createDeco(3300 * S, 380, 'vine'),
        createDeco(4200 * S, 380, 'mushroom'), createDeco(5300 * S, 380, 'tree'),
        createDeco(6100 * S, 380, 'bush'), createDeco(7500 * S, 200, 'log'),
        createDeco(8300 * S, 200, 'vine'), createDeco(9500 * S, 200, 'mushroom'),
        createDeco(10300 * S, 200, 'tree'), createDeco(11500 * S, 200, 'bush'),
        createDeco(12300 * S, 200, 'vine'), createDeco(13300 * S, 380, 'log'),
        createDeco(14100 * S, 380, 'tree'), createDeco(15100 * S, 380, 'bush'),
        createDeco(15800 * S, 380, 'mushroom'), createDeco(16700 * S, 560, 'log'),
        createDeco(18100 * S, 560, 'tree'), createDeco(18900 * S, 560, 'vine'),
        createDeco(19700 * S, 560, 'bush'), createDeco(20100 * S, 560, 'mushroom'),
        createDeco(20800 * S, 560, 'tree'),
      ];
    })(),
    movingPlatforms: (() => {
      const S = 0.45;
      return [
        // Vertical bridge from ground to mid canopy
        createMovingPlat(2300 * S, 470, 120, 24, 'wood', 'vertical', 170, 16),
        // Vertical bridge from mid to high canopy
        createMovingPlat(6500 * S, 380, 120, 24, 'wood', 'vertical', 220, 16),
        // Vertical bridge for high-to-mid descent
        createMovingPlat(12800 * S, 380, 120, 24, 'wood', 'vertical', 200, 16),
        // Vertical bridge for mid-to-ground descent
        createMovingPlat(16000 * S, 480, 120, 24, 'wood', 'vertical', 200, 16),
        // Horizontal helper in final gap
        createMovingPlat(19600 * S, 500, 120, 24, 'wood', 'horizontal', 200, 20),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 20000 * 0.45, y: 578 },
    timeBonus: 160,
  },
];

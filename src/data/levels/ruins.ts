// Ruins World - 6 Levels (IDs 67-72) - Distinct Structure Designs
// 67: Tutorial, 68: Gap-Strecke, 69: Röhren-Labyrinth, 70: Vertikal-Kletterer, 71: Gegner-Horde, 72: Fallende-Tempel Finale
// Static-to-static: MAX_PRACTICAL_JUMP = 600; to/from moving platforms: MAX_JUMP_DISTANCE = 800
// MAX_JUMP_UP = 350, MAX_FALL_DOWN = 1000

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat, gapWithPlatforms, pipeSection, verticalClimb } from './helpers';

export const RUINS_LEVELS: LevelData[] = [
  // ============================================================
  // LEVEL 67 - Tutorial (S=0.625)
  // Simple ruins path: start → pipes(2) → ruins → gap(2) → goal
  // ============================================================
  {
    id: 67, name: "Vergessener Pfad", width: 4000, height: 600, biome: 'ruins',
    timeBonus: 80,
    platforms: (() => {
      const S = 0.625;
      const plats: any[] = [];
      // Ruins start: left=-125, right=625 (top=525)
      plats.push(createPlat(400 * S, 550, 1200 * S, 50, 'ruins'));
      // Stepping platform bridging gap to pipes
      plats.push(createPlat(1360 * S, 545, 64, 24, 'platform_easy'));
      // Pipes(2)
      plats.push(...pipeSection(S, 1500, 550, 2));
      // Ruins mid
      plats.push(createPlat(2700 * S, 550, 800 * S, 50, 'ruins'));
      // Gap(2): float0 left≈2148 (gap from 1937.5=210)
      plats.push(...gapWithPlatforms(S, 3400, 550, 350, 2));
      // Ruins goal: left=2312.5, right=3062.5 (top=525)
      plats.push(createPlat(4300 * S, 550, 1200 * S, 50, 'ruins'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.625;
      const coins: any[] = [];
      for (let x = 500; x < 1200; x += 120) coins.push(createCoin(x * S, 500));
      for (let x = 1600; x < 2300; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 2800; x < 3300; x += 120) coins.push(createCoin(x * S, 500));
      for (let x = 3500; x < 3800; x += 100) coins.push(createCoin(x * S, 480));
      for (let x = 4400; x < 5300; x += 120) coins.push(createCoin(x * S, 500));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.625;
      return [
        createQB(900 * S, 480, 'mushroom'),
        createQB(1800 * S, 480, 'flower'),
        createQB(3000 * S, 480, 'star'),
        createQB(4600 * S, 480, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.625;
      return [
        createEnemy(700 * S, 510, 'goomba'),
        createEnemy(1600 * S, 515, 'piranha'),
        createEnemy(2900 * S, 510, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.625;
      return [
        createDeco(400 * S, 510, 'pillar'),
        createDeco(1100 * S, 510, 'moss'),
        createDeco(1600 * S, 510, 'statue'),
        createDeco(2300 * S, 510, 'vine'),
        createDeco(3500 * S, 470, 'pillar'),
        createDeco(4400 * S, 510, 'moss'),
      ];
    })(),
    movingPlatforms: [
      createMovingPlat(3900 * 0.625, 480, 100, 24, 'ruins', 'horizontal', 150, 18),
    ],
    playerStart: { x: 150, y: 500 },
    goal: { x: 4300 * 0.625, y: 523 },
  },

  // ============================================================
  // LEVEL 68 - Gap-Strecke (S=0.6)
  // 4 gap sections bridging ruins platforms with moving platforms
  // Gaps verified ≤ 498 static-to-static, moving platform bridges at 800 limit
  // ============================================================
  {
    id: 68, name: "Säulen-Sprünge", width: 6800, height: 600, biome: 'ruins',
    timeBonus: 100,
    platforms: (() => {
      const S = 0.6;
      const plats: any[] = [];
      // Ruins start: left=-60, right=540, top=525
      plats.push(createPlat(400 * S, 550, 1000 * S, 50, 'ruins'));
      // Gap 1(3): float0 left≈978 (gap from 540=438)
      plats.push(...gapWithPlatforms(S, 1600, 550, 450, 3));
      // Ruins 2: left=1380, right=1740 (gap from float2 right≈1213=167)
      plats.push(createPlat(2600 * S, 550, 600 * S, 50, 'ruins'));
      // Gap 2(3): float0 left≈2238 (gap from 1740=498)
      plats.push(...gapWithPlatforms(S, 3700, 550, 450, 3));
      // Ruins 3: left=2640, right=3000 (gap from float2 right≈2473=167)
      plats.push(createPlat(4700 * S, 550, 600 * S, 50, 'ruins'));
      // Gap 3(3): float0 left≈3498 (gap from 3000=498)
      plats.push(...gapWithPlatforms(S, 5800, 550, 450, 3));
      // Ruins 4: left=3900, right=4260 (gap from float2 right≈3733=167)
      plats.push(createPlat(6800 * S, 550, 600 * S, 50, 'ruins'));
      // Gap 4(3): float0 left≈4758 (gap from 4260=498)
      plats.push(...gapWithPlatforms(S, 7900, 550, 450, 3));
      // Ruins goal: left=5040, right=5640 (gap from float2 right≈4993=47)
      plats.push(createPlat(8900 * S, 550, 1000 * S, 50, 'ruins'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.6;
      const coins: any[] = [];
      for (let x = 500; x < 1500; x += 130) coins.push(createCoin(x * S, 500));
      for (let x = 1700; x < 2100; x += 80) coins.push(createCoin(x * S, 480));
      for (let x = 2800; x < 3600; x += 130) coins.push(createCoin(x * S, 500));
      for (let x = 3800; x < 4200; x += 80) coins.push(createCoin(x * S, 480));
      for (let x = 4900; x < 5700; x += 130) coins.push(createCoin(x * S, 500));
      for (let x = 5900; x < 6300; x += 80) coins.push(createCoin(x * S, 480));
      for (let x = 7000; x < 7800; x += 130) coins.push(createCoin(x * S, 500));
      for (let x = 9000; x < 9600; x += 120) coins.push(createCoin(x * S, 500));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.6;
      return [
        createQB(800 * S, 480, 'mushroom'),
        createQB(1900 * S, 460, 'flower'),
        createQB(2900 * S, 480, 'star'),
        createQB(4100 * S, 460, 'mushroom'),
        createQB(5000 * S, 480, 'flower'),
        createQB(7100 * S, 480, 'star'),
        createQB(9200 * S, 480, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.6;
      return [
        createEnemy(700 * S, 510, 'goomba'),
        createEnemy(2800 * S, 510, 'koopa'),
        createEnemy(4900 * S, 510, 'goomba'),
        createEnemy(7000 * S, 510, 'spiny'),
        createEnemy(9200 * S, 510, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.6;
      return [
        createDeco(400 * S, 510, 'pillar'),
        createDeco(1500 * S, 510, 'vine'),
        createDeco(2000 * S, 460, 'moss'),
        createDeco(2700 * S, 510, 'statue'),
        createDeco(3800 * S, 460, 'pillar'),
        createDeco(4800 * S, 510, 'vine'),
        createDeco(5900 * S, 460, 'moss'),
        createDeco(6900 * S, 510, 'statue'),
        createDeco(9000 * S, 510, 'pillar'),
      ];
    })(),
    movingPlatforms: (() => {
      const S = 0.6;
      return [
        createMovingPlat(2300 * S, 480, 120, 24, 'ruins', 'horizontal', 200, 20),
        createMovingPlat(4400 * S, 480, 120, 24, 'ruins', 'horizontal', 200, 20),
        createMovingPlat(6500 * S, 480, 120, 24, 'ruins', 'horizontal', 200, 20),
        createMovingPlat(8600 * S, 480, 120, 24, 'ruins', 'horizontal', 200, 20),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 8900 * 0.6, y: 523 },
  },

  // ============================================================
  // LEVEL 69 - Röhren-Labyrinth (S=0.556)
  // 5 pipe sections with piranhas, all gaps ≤ 508 static-to-static
  // Structure: ruins → pipes(2) → ruins → pipes(2) → ruins → pipes(2) → ruins → pipes(2) → ruins → pipes(2) → ruins(goal)
  // ============================================================
  {
    id: 69, name: "Röhren-Ruinen", width: 7500, height: 650, biome: 'ruins',
    timeBonus: 140,
    platforms: (() => {
      const S = 0.556;
      const plats: any[] = [];
      // Ruins start: left=-56, right=612 (top=575)
      plats.push(createPlat(500 * S, 600, 1200 * S, 50, 'ruins'));
      // Pipes 1(2): pipe0 left≈1120 (gap from 612=508)
      plats.push(...pipeSection(S, 1800, 600, 2));
      // Ruins bridge 1: left≈1307, right≈1807 (gap from pipe1 right≈1394 = -87 overlap)
      plats.push(createPlat(2800 * S, 600, 900 * S, 50, 'ruins'));
      // Pipes 2(2): pipe0 left≈2287 (gap from 1807=480)
      plats.push(...pipeSection(S, 3900, 600, 2));
      // Ruins bridge 2: left≈2530, right≈3030
      plats.push(createPlat(5000 * S, 600, 900 * S, 50, 'ruins'));
      // Pipes 3(2): pipe0 left≈3510 (gap from 3030=480)
      plats.push(...pipeSection(S, 6100, 600, 2));
      // Ruins bridge 3: left≈3753, right≈4253
      plats.push(createPlat(7200 * S, 600, 900 * S, 50, 'ruins'));
      // Pipes 4(2): pipe0 left≈4734 (gap from 4253=480)
      plats.push(...pipeSection(S, 8300, 600, 2));
      // Ruins bridge 4: left≈4976, right≈5477
      plats.push(createPlat(9400 * S, 600, 900 * S, 50, 'ruins'));
      // Pipes 5(2): pipe0 left≈5957 (gap from 5477=480)
      plats.push(...pipeSection(S, 10500, 600, 2));
      // Ruins goal: left≈6227, right≈6894 (top=575)
      plats.push(createPlat(11800 * S, 600, 1200 * S, 50, 'ruins'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.556;
      const coins: any[] = [];
      for (let x = 600; x < 1700; x += 130) coins.push(createCoin(x * S, 550));
      for (let x = 1900; x < 2500; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 2900; x < 3800; x += 130) coins.push(createCoin(x * S, 550));
      for (let x = 4000; x < 4700; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 5100; x < 6000; x += 130) coins.push(createCoin(x * S, 550));
      for (let x = 6200; x < 6900; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 7300; x < 8200; x += 130) coins.push(createCoin(x * S, 550));
      for (let x = 8400; x < 9100; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 9500; x < 10400; x += 130) coins.push(createCoin(x * S, 550));
      for (let x = 10600; x < 11200; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 11900; x < 12900; x += 120) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.556;
      return [
        createQB(900 * S, 530, 'mushroom'),
        createQB(1900 * S, 530, 'flower'),
        createQB(3000 * S, 530, 'star'),
        createQB(4000 * S, 530, 'mushroom'),
        createQB(5200 * S, 530, 'flower'),
        createQB(6300 * S, 530, 'star'),
        createQB(7400 * S, 530, 'mushroom'),
        createQB(8500 * S, 530, 'flower'),
        createQB(9600 * S, 530, 'star'),
        createQB(10700 * S, 530, 'mushroom'),
        createQB(12000 * S, 530, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.556;
      return [
        createEnemy(800 * S, 560, 'goomba'),
        createEnemy(1900 * S, 560, 'piranha'), createEnemy(2250 * S, 560, 'piranha'),
        createEnemy(2900 * S, 560, 'koopa'),
        createEnemy(4000 * S, 560, 'piranha'), createEnemy(4350 * S, 560, 'piranha'),
        createEnemy(5100 * S, 560, 'spiny'),
        createEnemy(6200 * S, 560, 'piranha'), createEnemy(6550 * S, 560, 'piranha'),
        createEnemy(7300 * S, 560, 'goomba'),
        createEnemy(8400 * S, 560, 'piranha'), createEnemy(8750 * S, 560, 'piranha'),
        createEnemy(9500 * S, 560, 'koopa'),
        createEnemy(10600 * S, 560, 'piranha'), createEnemy(10950 * S, 560, 'piranha'),
        createEnemy(12000 * S, 560, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.556;
      return [
        createDeco(500 * S, 560, 'pillar'), createDeco(1200 * S, 560, 'moss'),
        createDeco(2000 * S, 560, 'statue'), createDeco(2500 * S, 560, 'vine'),
        createDeco(2900 * S, 560, 'pillar'), createDeco(3600 * S, 560, 'moss'),
        createDeco(4100 * S, 560, 'statue'), createDeco(4600 * S, 560, 'vine'),
        createDeco(5100 * S, 560, 'pillar'), createDeco(5800 * S, 560, 'moss'),
        createDeco(6300 * S, 560, 'statue'), createDeco(6800 * S, 560, 'vine'),
        createDeco(7300 * S, 560, 'pillar'), createDeco(8000 * S, 560, 'moss'),
        createDeco(8500 * S, 560, 'statue'), createDeco(9000 * S, 560, 'vine'),
        createDeco(9500 * S, 560, 'pillar'), createDeco(10200 * S, 560, 'moss'),
        createDeco(10700 * S, 560, 'statue'), createDeco(11200 * S, 560, 'vine'),
        createDeco(12000 * S, 560, 'pillar'), createDeco(12600 * S, 560, 'moss'),
      ];
    })(),
    movingPlatforms: (() => {
      const S = 0.556;
      return [
        createMovingPlat(2300 * S, 510, 120, 24, 'ruins', 'horizontal', 250, 18),
        createMovingPlat(4400 * S, 510, 120, 24, 'ruins', 'vertical', 150, 16),
        createMovingPlat(6600 * S, 510, 120, 24, 'ruins', 'horizontal', 250, 18),
        createMovingPlat(8800 * S, 510, 120, 24, 'ruins', 'vertical', 150, 16),
        createMovingPlat(11200 * S, 510, 120, 24, 'ruins', 'horizontal', 250, 18),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 11800 * 0.556, y: 573 },
  },

  // ============================================================
  // LEVEL 70 - Vertikal-Kletterer (S=0.5)
  // 4 verticalClimb sections among pillars
  // All gaps verified ≤ 470 static-to-static, ≤ 350 vertical up
  // ============================================================
  {
    id: 70, name: "Turmgipfel", width: 9000, height: 680, biome: 'ruins',
    timeBonus: 140,
    platforms: (() => {
      const S = 0.5;
      const plats: any[] = [];
      // Ruins start
      plats.push(createPlat(500 * S, 630, 1200 * S, 50, 'ruins'));
      // Stepping to bridge gap to climb 1
      plats.push(createPlat(1420 * S, 615, 64, 24, 'ruins'));
      // Climb 1
      plats.push(...verticalClimb(S, 1800, 630, 'ruins'));
      // Ruins 2
      plats.push(createPlat(4400 * S, 630, 600 * S, 50, 'ruins'));
      // Stepping to bridge gap to climb 2
      plats.push(createPlat(5170 * S, 615, 64, 24, 'ruins'));
      // Climb 2
      plats.push(...verticalClimb(S, 5700, 630, 'ruins'));
      // Ruins 3
      plats.push(createPlat(8300 * S, 630, 600 * S, 50, 'ruins'));
      // Stepping to bridge gap to climb 3
      plats.push(createPlat(9070 * S, 615, 64, 24, 'ruins'));
      // Climb 3
      plats.push(...verticalClimb(S, 9600, 630, 'ruins'));
      // Ruins 4
      plats.push(createPlat(12200 * S, 630, 600 * S, 50, 'ruins'));
      // Stepping to bridge gap to climb 4
      plats.push(createPlat(12970 * S, 615, 64, 24, 'ruins'));
      // Climb 4
      plats.push(...verticalClimb(S, 13500, 630, 'ruins'));
      // Ruins goal: left=7750, right=8350 (top=605)
      plats.push(createPlat(16100 * S, 630, 1200 * S, 50, 'ruins'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.5;
      const coins: any[] = [];
      for (let x = 600; x < 1600; x += 150) coins.push(createCoin(x * S, 580));
      coins.push(createCoin(1800 * S, 470), createCoin(2100 * S, 390), createCoin(2400 * S, 310));
      coins.push(createCoin(2700 * S, 270), createCoin(3000 * S, 270), createCoin(3300 * S, 270));
      coins.push(createCoin(3600 * S, 310), createCoin(3900 * S, 390), createCoin(4200 * S, 470));
      for (let x = 4500; x < 5400; x += 150) coins.push(createCoin(x * S, 580));
      coins.push(createCoin(5700 * S, 470), createCoin(6000 * S, 390), createCoin(6300 * S, 310));
      coins.push(createCoin(6600 * S, 270), createCoin(6900 * S, 270), createCoin(7200 * S, 270));
      coins.push(createCoin(7500 * S, 310), createCoin(7800 * S, 390), createCoin(8100 * S, 470));
      for (let x = 8400; x < 9300; x += 150) coins.push(createCoin(x * S, 580));
      coins.push(createCoin(9600 * S, 470), createCoin(9900 * S, 390), createCoin(10200 * S, 310));
      coins.push(createCoin(10500 * S, 270), createCoin(10800 * S, 270), createCoin(11100 * S, 270));
      coins.push(createCoin(11400 * S, 310), createCoin(11700 * S, 390), createCoin(12000 * S, 470));
      for (let x = 12300; x < 13200; x += 150) coins.push(createCoin(x * S, 580));
      coins.push(createCoin(13500 * S, 470), createCoin(13800 * S, 390), createCoin(14100 * S, 310));
      coins.push(createCoin(14400 * S, 270), createCoin(14700 * S, 270), createCoin(15000 * S, 270));
      coins.push(createCoin(15300 * S, 310), createCoin(15600 * S, 390), createCoin(15900 * S, 470));
      for (let x = 16200; x < 17200; x += 120) coins.push(createCoin(x * S, 580));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.5;
      return [
        createQB(1100 * S, 560, 'mushroom'),
        createQB(2000 * S, 200, 'flower'),
        createQB(3000 * S, 200, 'star'),
        createQB(4600 * S, 560, 'mushroom'),
        createQB(5900 * S, 200, 'flower'),
        createQB(6900 * S, 200, 'star'),
        createQB(8500 * S, 560, 'mushroom'),
        createQB(9800 * S, 200, 'flower'),
        createQB(10800 * S, 200, 'star'),
        createQB(12400 * S, 560, 'flower'),
        createQB(13700 * S, 200, 'star'),
        createQB(14700 * S, 200, 'mushroom'),
        createQB(16200 * S, 560, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.5;
      return [
        createEnemy(900 * S, 590, 'goomba'),
        createEnemy(2200 * S, 270, 'spiny'),
        createEnemy(4600 * S, 590, 'goomba'),
        createEnemy(6100 * S, 270, 'koopa'),
        createEnemy(8500 * S, 590, 'goomba'),
        createEnemy(9900 * S, 270, 'spiny'),
        createEnemy(12400 * S, 590, 'koopa'),
        createEnemy(13800 * S, 270, 'goomba'),
        createEnemy(16200 * S, 590, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.5;
      return [
        createDeco(500 * S, 590, 'pillar'), createDeco(1300 * S, 590, 'moss'),
        createDeco(1900 * S, 250, 'statue'), createDeco(3100 * S, 250, 'vine'),
        createDeco(4500 * S, 590, 'pillar'), createDeco(5300 * S, 590, 'moss'),
        createDeco(5800 * S, 250, 'statue'), createDeco(7000 * S, 250, 'vine'),
        createDeco(8400 * S, 590, 'pillar'), createDeco(9200 * S, 590, 'moss'),
        createDeco(9700 * S, 250, 'statue'), createDeco(10900 * S, 250, 'vine'),
        createDeco(12300 * S, 590, 'pillar'), createDeco(13100 * S, 590, 'moss'),
        createDeco(13600 * S, 250, 'statue'), createDeco(14800 * S, 250, 'vine'),
        createDeco(16200 * S, 590, 'pillar'), createDeco(17000 * S, 590, 'moss'),
      ];
    })(),
    movingPlatforms: (() => {
      const S = 0.5;
      return [
        createMovingPlat(3900 * S, 540, 120, 24, 'ruins', 'horizontal', 220, 20),
        createMovingPlat(7800 * S, 540, 120, 24, 'ruins', 'horizontal', 220, 20),
        createMovingPlat(11700 * S, 540, 120, 24, 'ruins', 'horizontal', 220, 20),
      ];
    })(),
    playerStart: { x: 150, y: 580 },
    goal: { x: 16100 * 0.5, y: 603 },
  },

  // ============================================================
  // LEVEL 71 - Gegner-Horde (S=0.455)
  // 18 enemies (goombas, spinys, koopas) on wide ruins platforms
  // Gaps ≤ 575 static-to-static
  // ============================================================
  {
    id: 71, name: "Wächter der Ruinen", width: 6400, height: 700, biome: 'ruins',
    timeBonus: 120,
    platforms: (() => {
      const S = 0.455;
      const plats: any[] = [];
      // Ruins 1 (long): left=-341, right=1105 (top=625)
      plats.push(createPlat(840 * S, 650, 3200 * S, 50, 'ruins'));
      // Gap(2): float0 left≈to calculate...
      plats.push(...gapWithPlatforms(S, 3500, 650, 400, 2));
      // Ruins 2 (long): left≈2172.5, right≈2808.5 (gap from float1 right≈test)
      plats.push(createPlat(5500 * S, 650, 1400 * S, 50, 'ruins'));
      // Pipes(2): pipe0 left≈3189 (gap from 2808.5=380.5)
      plats.push(...pipeSection(S, 6900, 650, 2));
      // Ruins 3 (long): left≈3169, right≈4221 (gap from pipe1 right≈test)
      plats.push(createPlat(8100 * S, 650, 1800 * S, 50, 'ruins'));
      // Gap(2):
      plats.push(...gapWithPlatforms(S, 9600, 650, 400, 2));
      // Ruins goal (long): left≈4523, right≈5400 (top=625)
      plats.push(createPlat(10900 * S, 650, 1600 * S, 50, 'ruins'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.455;
      const coins: any[] = [];
      for (let x = 900; x < 3400; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 5600; x < 6800; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 7000; x < 7400; x += 80) coins.push(createCoin(x * S, 580));
      for (let x = 8300; x < 9400; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 9800; x < 10400; x += 80) coins.push(createCoin(x * S, 580));
      for (let x = 11000; x < 12400; x += 120) coins.push(createCoin(x * S, 600));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.455;
      return [
        createQB(1200 * S, 580, 'mushroom'),
        createQB(2000 * S, 580, 'flower'),
        createQB(2800 * S, 560, 'star'),
        createQB(5700 * S, 580, 'mushroom'),
        createQB(6500 * S, 580, 'flower'),
        createQB(8300 * S, 580, 'star'),
        createQB(9100 * S, 580, 'mushroom'),
        createQB(9900 * S, 560, 'flower'),
        createQB(11100 * S, 580, 'star'),
        createQB(12000 * S, 580, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.455;
      return [
        createEnemy(1100 * S, 610, 'goomba'),
        createEnemy(1500 * S, 610, 'spiny'),
        createEnemy(1900 * S, 610, 'koopa'),
        createEnemy(2300 * S, 610, 'goomba'),
        createEnemy(2700 * S, 610, 'spiny'),
        createEnemy(3100 * S, 610, 'koopa'),
        createEnemy(5600 * S, 610, 'goomba'),
        createEnemy(6000 * S, 610, 'spiny'),
        createEnemy(6400 * S, 610, 'koopa'),
        createEnemy(7000 * S, 610, 'piranha'),
        createEnemy(8300 * S, 610, 'goomba'),
        createEnemy(8700 * S, 610, 'spiny'),
        createEnemy(9100 * S, 610, 'koopa'),
        createEnemy(9500 * S, 610, 'goomba'),
        createEnemy(9800 * S, 610, 'spiny'),
        createEnemy(11000 * S, 610, 'goomba'),
        createEnemy(11400 * S, 610, 'koopa'),
        createEnemy(11800 * S, 610, 'spiny'),
      ];
    })(),
    decorations: (() => {
      const S = 0.455;
      return [
        createDeco(900 * S, 610, 'pillar'), createDeco(1800 * S, 610, 'statue'),
        createDeco(2500 * S, 610, 'vine'), createDeco(3200 * S, 610, 'moss'),
        createDeco(5700 * S, 610, 'pillar'), createDeco(6500 * S, 610, 'statue'),
        createDeco(7000 * S, 610, 'vine'), createDeco(8300 * S, 610, 'moss'),
        createDeco(9000 * S, 610, 'pillar'), createDeco(9800 * S, 580, 'statue'),
        createDeco(11100 * S, 610, 'vine'), createDeco(12000 * S, 610, 'moss'),
      ];
    })(),
    movingPlatforms: (() => {
      const S = 0.455;
      return [
        createMovingPlat(3200 * S, 530, 120, 24, 'ruins', 'vertical', 140, 16),
        createMovingPlat(7800 * S, 560, 120, 24, 'ruins', 'horizontal', 200, 18),
        createMovingPlat(10600 * S, 560, 120, 24, 'ruins', 'horizontal', 200, 18),
      ];
    })(),
    playerStart: { x: 150, y: 600 },
    goal: { x: 10900 * 0.455, y: 623 },
  },

  // ============================================================
  // LEVEL 72 - Fallende-Tempel Finale (S=0.417)
  // Descending structure: high(500) → mid(420) → lower(340) → deeper(280) → bottom(230) → goal(200)
  // All vertical descents ≤ 80, horizontal gaps ≤ 450 static-to-static
  // ============================================================
  {
    id: 72, name: "Fallender Tempel", width: 6000, height: 750, biome: 'ruins',
    timeBonus: 180,
    platforms: (() => {
      const S = 0.417;
      const plats: any[] = [];
      // High start (y=500, top=475): left=-42, right=458
      plats.push(createPlat(500 * S, 500, 1200 * S, 50, 'ruins'));
      // Mid 1 (y=420, top=400): left=542, right=959 (gap=84, down=75)
      plats.push(createPlat(1800 * S, 420, 1000 * S, 40, 'ruins'));
      // Gap(2): float0 left≈1251 (gap from 959=292, down=60)
      plats.push(...gapWithPlatforms(S, 3000, 420, 350, 2));
      // Mid 2 (y=340, top=320): left≈1585, right≈1918 (gap from float1 right≈1399=186)
      plats.push(createPlat(4200 * S, 340, 800 * S, 40, 'ruins'));
      // Gap(3): float0 left≈2244 (gap from 1918=326)
      plats.push(...gapWithPlatforms(S, 5400, 340, 400, 3));
      // Lower (y=280, top=260): left≈2669, right≈3003 (gap from float2 right≈2427=242)
      plats.push(createPlat(6800 * S, 280, 800 * S, 40, 'ruins'));
      // Gap(2): float0 left≈3425 (gap from 3003=422)
      plats.push(...gapWithPlatforms(S, 8200, 280, 400, 2));
      // Deeper (y=230, top=210): left≈3837, right≈4170 (gap from float1 right≈3581=256)
      plats.push(createPlat(9600 * S, 230, 800 * S, 40, 'ruins'));
      // Gap(2): float0 left≈4502 (gap from 4170=332)
      plats.push(...gapWithPlatforms(S, 10800, 230, 350, 2));
      // Goal (y=200, top=175): left≈4837, right≈5337 (gap from float1 right≈4651=186)
      plats.push(createPlat(12200 * S, 200, 1200 * S, 50, 'ruins'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.417;
      const coins: any[] = [];
      for (let x = 600; x < 1500; x += 120) coins.push(createCoin(x * S, 450));
      for (let x = 1900; x < 2700; x += 100) coins.push(createCoin(x * S, 370));
      for (let x = 3100; x < 3800; x += 80) coins.push(createCoin(x * S, 330));
      for (let x = 4400; x < 5000; x += 100) coins.push(createCoin(x * S, 290));
      for (let x = 5600; x < 6300; x += 80) coins.push(createCoin(x * S, 250));
      for (let x = 7000; x < 7600; x += 100) coins.push(createCoin(x * S, 230));
      for (let x = 8300; x < 9000; x += 80) coins.push(createCoin(x * S, 190));
      for (let x = 9800; x < 10400; x += 100) coins.push(createCoin(x * S, 180));
      for (let x = 11000; x < 11600; x += 80) coins.push(createCoin(x * S, 150));
      for (let x = 12300; x < 13300; x += 120) coins.push(createCoin(x * S, 150));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.417;
      return [
        createQB(850 * S, 430, 'mushroom'),
        createQB(2000 * S, 350, 'flower'),
        createQB(3100 * S, 310, 'star'),
        createQB(4500 * S, 270, 'mushroom'),
        createQB(5600 * S, 230, 'flower'),
        createQB(7100 * S, 210, 'star'),
        createQB(8400 * S, 170, 'mushroom'),
        createQB(9900 * S, 160, 'flower'),
        createQB(11300 * S, 120, 'star'),
        createQB(12450 * S, 130, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.417;
      return [
        createEnemy(800 * S, 460, 'goomba'),
        createEnemy(2000 * S, 370, 'spiny'),
        createEnemy(4400 * S, 290, 'koopa'),
        createEnemy(5800 * S, 250, 'goomba'),
        createEnemy(7100 * S, 230, 'spiny'),
        createEnemy(8400 * S, 190, 'goomba'),
        createEnemy(9900 * S, 190, 'koopa'),
        createEnemy(12400 * S, 160, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.417;
      return [
        createDeco(500 * S, 460, 'pillar'), createDeco(1200 * S, 460, 'statue'),
        createDeco(1800 * S, 370, 'vine'), createDeco(2500 * S, 370, 'moss'),
        createDeco(3200 * S, 340, 'pillar'), createDeco(4300 * S, 290, 'statue'),
        createDeco(5100 * S, 250, 'vine'), createDeco(5600 * S, 250, 'moss'),
        createDeco(6300 * S, 240, 'pillar'), createDeco(6900 * S, 230, 'statue'),
        createDeco(7700 * S, 190, 'vine'), createDeco(8300 * S, 190, 'moss'),
        createDeco(9000 * S, 180, 'pillar'), createDeco(9700 * S, 180, 'statue'),
        createDeco(10500 * S, 150, 'vine'), createDeco(11000 * S, 150, 'moss'),
        createDeco(11800 * S, 140, 'pillar'), createDeco(12300 * S, 140, 'statue'),
        createDeco(13000 * S, 140, 'vine'),
      ];
    })(),
    movingPlatforms: (() => {
      const S = 0.417;
      return [
        createMovingPlat(1200 * S, 460, 120, 24, 'ruins', 'vertical', 160, 16),
        createMovingPlat(3600 * S, 380, 120, 24, 'ruins', 'vertical', 140, 16),
        createMovingPlat(6100 * S, 290, 120, 24, 'ruins', 'horizontal', 180, 18),
        createMovingPlat(8800 * S, 230, 120, 24, 'ruins', 'vertical', 140, 16),
        createMovingPlat(11500 * S, 170, 120, 24, 'ruins', 'horizontal', 180, 18),
      ];
    })(),
    playerStart: { x: 150, y: 450 },
    goal: { x: 12200 * 0.417, y: 173 },
  },
];

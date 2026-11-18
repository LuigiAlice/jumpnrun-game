// Ruins World (ids 67-72) — Phase 9 rebuild
// Archetypes: 67 Ausgrabung, 68 Tempelbrücken, 69 Säulengänge,
// 70 Stufenpyramide, 71 Wächter-Horde, 72 Fallender Tempel
// (Abstieg von Hochterrasse y≈500 auf Boden y≈800, Engine-ID 72 bröckelt).
// Ruins gravity is 2000: safe rises <=160px, safe same-height gaps <=210px.
// Crumble platforms are bonus shortcuts — a solid non-crumble route always exists.
// Keys/doors and hidden/secret bricks are bonus content, never the critical path.
// All levels are authored solvable (ensureSolvable adds nothing).

import {
  LevelData, createPlat, createQB, createEnemy, createDeco,
  createMovingPlat, createSpring, createSpike, createCrumblePlat,
  createCheckpoint, createKey, createDoor,
  staircase, plateauSection, pitFloor, twoTierSection, islandCluster,
  overhangSection, coinArc, coinDiamond, coinTrail, coinLadder,
  gapWithPlatforms,
} from './helpers';

export const RUINS_LEVELS: LevelData[] = [
  // ============================================================
  // Level 67 (Ausgrabung): Grabungsfeld mit offener Grube,
  // Gerüst-Aufstieg, Geheim-Brick über der Grube, vertikalem
  // Grabungsaufzug zur Schatzterrasse und zerbrochener Brücke.
  // 2 Spikes, 2 Federn, 1-UP-Block.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(600, 760, 1000, 48, 'ruins'));
    platforms.push(...pitFloor(1100, 736, 240, 140, 'sandstone'));
    // Geheim-Brick über dem Grubenrand (nur mit Sprung erreichbar)
    platforms.push(createPlat(1300, 600, 140, 24, 'brick_secret'));
    platforms.push(createPlat(1800, 760, 800, 48, 'ruins'));
    // Gerüst-Aufstieg über dem Grabungsfeld
    platforms.push(createPlat(1600, 660, 140, 24, 'platform_easy'));
    platforms.push(createPlat(1850, 560, 130, 24, 'platform_medium'));
    platforms.push(createPlat(2100, 470, 200, 24, 'platform_hard'));
    platforms.push(createPlat(2450, 400, 220, 24, 'sandstone'));
    platforms.push(createPlat(2900, 760, 700, 48, 'ruins'));
    // Ausgegrabene Tempelterrassen
    platforms.push(...plateauSection(3300, 736, [
      { dx: 0, dy: 0, w: 320, h: 48, type: 'ruins' },
      { dx: 360, dy: 100, w: 280, h: 48, type: 'sandstone' },
      { dx: 680, dy: 200, w: 300, h: 48, type: 'ruins' },
      { dx: 1020, dy: 100, w: 260, h: 48, type: 'stone' },
    ]));
    // Schatzterrasse (über dem Grabungsaufzug)
    platforms.push(createPlat(4900, 420, 240, 24, 'sandstone'));
    platforms.push(createPlat(5450, 808, 800, 144, 'ruins'));
    // Zerbrochene Brücke
    platforms.push(...gapWithPlatforms(1, 5850, 748, 520, 2, {
      widths: [120, 130], dy: [0, 50], types: ['platform_easy', 'platform_medium'],
    }));
    platforms.push(createPlat(6800, 760, 900, 48, 'ruins'));
    // Treppe zum Ausgrabungsausgang
    platforms.push(...staircase(7300, 736, 3, 70, 140, 40, 'sandstone'));
    platforms.push(createPlat(8100, 760, 600, 48, 'ruins'));

    // A roofed excavation cache with an open lower entrance on the left.
    platforms.push(createPlat(2450, 228, 284, 24, 'sandstone'));
    platforms.push(createPlat(2300, 273, 24, 66, 'sandstone'));
    platforms.push(createPlat(2600, 314, 24, 148, 'ruins'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(200, 700, 1000, 700, 4));
    coins.push(...coinArc(1220, 780, 5, 70, 80));
    coins.push(...coinTrail(1450, 700, 1750, 700, 3));
    coins.push(...coinLadder(1850, 620, 480, 5));
    coins.push(...coinDiamond(2450, 300, 70));
    coins.push(...coinArc(2950, 660, 5, 70, 80));
    coins.push(...coinTrail(3350, 660, 3580, 660, 3));
    coins.push(...coinTrail(3700, 560, 3920, 560, 3));
    coins.push(...coinTrail(4000, 480, 4260, 480, 3));
    coins.push(...coinTrail(4350, 560, 4560, 560, 3));
    coins.push(...coinLadder(4650, 500, 380, 4));
    coins.push(...coinDiamond(4900, 330, 60));
    coins.push(...coinArc(6020, 660, 5, 70, 80));
    coins.push(...coinTrail(6400, 660, 7200, 660, 4));
    coins.push(...coinTrail(7350, 620, 7700, 620, 4));
    coins.push(...coinTrail(7850, 660, 8350, 660, 4));

    // A sheltered breather between set pieces; the optional reward never gates the route.
    platforms.push(createPlat(5700, 608, 32, 32, 'brick_secret'));
    coins.push(...coinArc(5700, 551, 3, 48, 32));

    return {
      id: 67, name: 'Ausgrabung', width: 8800, height: 950, biome: 'ruins',
      platforms,
      movingPlatforms: [
        createMovingPlat(4650, 540, 120, 24, 'platform_medium', 'vertical', 100, 18),
      ],
      coins,
      questionBlocks: [
        createQB(400, 676, 'mushroom'),
        createQB(2800, 676, 'coin'),
        createQB(5500, 676, 'flower'),
        createQB(6900, 676, 'oneup'),
        createQB(8150, 676, 'coin'),
      ],
      enemies: [
        createEnemy(900, 716, 'goomba'),
        createEnemy(1600, 716, 'koopa'),
        createEnemy(2000, 716, 'spiny'),
        createEnemy(3000, 716, 'robot'),
        createEnemy(4130, 516, 'crab'),
        createEnemy(6600, 716, 'koopa'),
        createEnemy(7550, 576, 'robot'),
        createEnemy(8000, 716, 'spiny'),
      ],
      decorations: [
        createDeco(300, 716, 'pillar'),
        createDeco(700, 716, 'rock'),
        createDeco(1200, 856, 'skull'),
        createDeco(1500, 716, 'statue'),
        createDeco(2300, 716, 'moss'),
        createDeco(2700, 716, 'tombstone'),
        createDeco(3500, 716, 'pillar'),
        createDeco(4100, 516, 'statue'),
        createDeco(4700, 716, 'moss'),
        createDeco(5400, 716, 'rock'),
        createDeco(6300, 716, 'tombstone'),
        createDeco(7000, 716, 'pillar'),
        createDeco(7900, 716, 'moss'),
      ],
      playerStart: { x: 200, y: 712 },
      goal: { x: 8250, y: 728 },
      timeBonus: 130,
      springs: [createSpring(900, 736), createSpring(5150, 736)],
      spikes: [createSpike(2650, 728), createSpike(6500, 728)],
    };
  })(),

  // ============================================================
  // Level 68 (Tempelbrücken): Brückenpfad über versunkenen
  // Tempelterrassen. Crumble-Brücke als High-Risk-Variante über
  // der sicheren Trittstein-Route, Schatzgrube mit Tür + Schlüssel,
  // Insel-Cluster über der Grabkammer, vertikaler Aufzug.
  // 2 Spikes, 2 Federn, 1-UP-Block.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(600, 760, 1000, 48, 'ruins'));
    platforms.push(...gapWithPlatforms(1, 1100, 748, 500, 3, {
      widths: [130, 110, 150], dy: [0, 40, 80], types: ['platform_medium', 'platform_easy', 'sandstone'],
    }));
    platforms.push(createPlat(1900, 760, 800, 48, 'ruins'));
    // Sichere Trittstein-Route
    platforms.push(createPlat(2500, 700, 140, 24, 'platform_easy'));
    platforms.push(createPlat(2700, 660, 130, 24, 'platform_medium'));
    platforms.push(createPlat(3200, 760, 700, 48, 'ruins'));
    // Crumble-Brücke (Bonus-Route, sichere Route darunter)
    platforms.push(createCrumblePlat(2450, 540, 130, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(2650, 500, 130, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(2850, 540, 130, 24, 'platform_medium'));
    platforms.push(createPlat(3700, 760, 300, 48, 'sandstone'));
    // Schatzgrube unter der Hauptroute (Tür + Schlüssel = Bonus, nie Pflichtweg)
    platforms.push(createPlat(4200, 860, 400, 48, 'sandstone'));
    platforms.push(createPlat(4500, 780, 200, 24, 'brick_secret'));
    platforms.push(createPlat(4450, 760, 800, 48, 'ruins'));
    platforms.push(...twoTierSection(4900, 736, 900, 'stone', 'sandstone'));
    platforms.push(createPlat(6400, 760, 900, 48, 'ruins'));
    platforms.push(...pitFloor(6900, 736, 280, 150, 'sandstone'));
    // Insel-Cluster über der Grabkammer
    platforms.push(...islandCluster(6900, 736, [
      { dx: 0, dy: 150, w: 120, type: 'platform_easy' },
      { dx: 200, dy: 190, w: 100, type: 'platform_medium' },
      { dx: 380, dy: 150, w: 130, type: 'platform_hard' },
    ]));
    platforms.push(createPlat(7800, 760, 900, 48, 'ruins'));
    platforms.push(...gapWithPlatforms(1, 8250, 748, 600, 3, {
      widths: [120, 140, 120], dy: [0, 60, 20], types: ['platform_easy', 'platform_hard', 'platform_medium'],
    }));
    platforms.push(createPlat(9300, 760, 900, 48, 'ruins'));
    platforms.push(createPlat(10050, 420, 260, 24, 'sandstone'));
    platforms.push(createPlat(10550, 760, 700, 48, 'ruins'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(200, 700, 1000, 700, 4));
    coins.push(...coinArc(1225, 690, 5, 70, 80));
    coins.push(...coinTrail(1550, 700, 2250, 700, 3));
    coins.push(...coinLadder(2450, 620, 540, 4));
    coins.push(...coinTrail(2900, 660, 3300, 660, 3));
    coins.push(...coinDiamond(4500, 700, 60));
    coins.push(...coinTrail(4150, 700, 4750, 700, 3));
    coins.push(...coinDiamond(5350, 470, 70));
    coins.push(...coinArc(6300, 660, 5, 70, 80));
    coins.push(...coinTrail(6450, 660, 6800, 660, 3));
    coins.push(...coinDiamond(6960, 480, 80));
    coins.push(...coinTrail(7100, 420, 7300, 420, 3));
    coins.push(...coinTrail(6950, 840, 7130, 840, 3));
    coins.push(...coinArc(7450, 660, 5, 70, 80));
    coins.push(...coinTrail(8850, 660, 9700, 660, 4));
    coins.push(...coinLadder(9850, 620, 480, 4));
    coins.push(...coinDiamond(10050, 330, 60));
    coins.push(...coinTrail(10250, 660, 10850, 660, 4));

    // A sheltered breather between set pieces; the optional reward never gates the route.
    coins.push(...coinArc(5125, 551, 3, 48, 32));

    return {
      id: 68, name: 'Tempelbrücken', width: 11200, height: 950, biome: 'ruins',
      platforms,
      movingPlatforms: [
        createMovingPlat(9850, 560, 120, 24, 'platform_easy', 'vertical', 96, 18),
      ],
      coins,
      questionBlocks: [
        createQB(450, 676, 'mushroom'),
        createQB(2100, 676, 'coin'),
        createQB(3300, 676, 'flower'),
        createQB(4700, 676, 'oneup'),
        createQB(6500, 676, 'coin'),
        createQB(9500, 676, 'star'),
      ],
      enemies: [
        createEnemy(800, 716, 'goomba'),
        createEnemy(1800, 716, 'koopa'),
        createEnemy(3100, 716, 'spiny'),
        createEnemy(4300, 716, 'robot'),
        createEnemy(6050, 650, 'ghost'),
        createEnemy(7000, 866, 'goomba'),
        createEnemy(7900, 716, 'robot'),
        createEnemy(9400, 716, 'spiny'),
        createEnemy(10400, 716, 'koopa'),
      ],
      decorations: [
        createDeco(300, 716, 'statue'),
        createDeco(700, 716, 'rock'),
        createDeco(1400, 716, 'pillar'),
        createDeco(2000, 716, 'moss'),
        createDeco(2750, 850, 'tombstone'),
        createDeco(3400, 716, 'skull'),
        createDeco(3750, 716, 'pillar'),
        createDeco(4200, 816, 'moss'),
        createDeco(5100, 716, 'rock'),
        createDeco(6100, 716, 'statue'),
        createDeco(6600, 716, 'pillar'),
        createDeco(7250, 850, 'tombstone'),
        createDeco(8000, 716, 'moss'),
        createDeco(9000, 716, 'rock'),
        createDeco(10300, 716, 'pillar'),
      ],
      playerStart: { x: 200, y: 712 },
      goal: { x: 10700, y: 728 },
      timeBonus: 160,
      springs: [createSpring(1900, 736), createSpring(7800, 736)],
      spikes: [createSpike(3050, 728), createSpike(6700, 728)],
      keys: [createKey(3400, 690)],
      doors: [createDoor(4080, 756, 60, 160)],
    };
  })(),

  // ============================================================
  // Level 69 (Säulengänge): Kolonnaden aus hohen Steinblöcken,
  // kreisender Aufzug zur Hochterrasse, eingestürzte Decken-
  // passage, Aufstieg zum Heiligtum, versteckte Kammer über der
  // höchsten Säule, Treppen zum Ausgang. 2 Spikes, 2 Federn.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(600, 760, 1000, 48, 'ruins'));
    // Säulengang mit ansteigenden Steinblöcken
    platforms.push(...plateauSection(1200, 736, [
      { dx: 0, dy: 0, w: 300, h: 200, type: 'stone' },
      { dx: 350, dy: 96, w: 260, h: 200, type: 'stone' },
      { dx: 700, dy: 192, w: 260, h: 200, type: 'stone' },
      { dx: 1050, dy: 96, w: 240, h: 200, type: 'stone' },
    ]));
    platforms.push(createPlat(2900, 760, 800, 48, 'ruins'));
    // Hochterrasse über dem kreisenden Aufzug
    platforms.push(createPlat(3400, 392, 200, 24, 'platform_hard'));
    platforms.push(createPlat(3500, 640, 120, 24, 'platform_easy'));
    platforms.push(createPlat(4100, 808, 900, 144, 'ruins'));
    // Eingestürzte Deckenpassage
    platforms.push(...overhangSection(4600, 736, 1000, 5000, 200, 'sandstone'));
    platforms.push(createPlat(6100, 760, 800, 48, 'ruins'));
    // Aufstieg zum Heiligtum
    platforms.push(createPlat(6600, 660, 130, 24, 'platform_easy'));
    platforms.push(createPlat(6800, 570, 120, 24, 'platform_medium'));
    platforms.push(createPlat(7000, 480, 130, 24, 'platform_hard'));
    platforms.push(createPlat(7250, 410, 150, 24, 'platform_medium'));
    platforms.push(createPlat(7800, 600, 600, 48, 'stone'));
    // Versteckte Kammer über der Heiligtumskante
    platforms.push(createPlat(7250, 280, 160, 24, 'hidden'));
    platforms.push(createPlat(8250, 660, 140, 24, 'platform_easy'));
    platforms.push(createPlat(8800, 760, 900, 48, 'ruins'));
    platforms.push(...staircase(9350, 736, 2, 80, 140, 40, 'sandstone'));
    platforms.push(createPlat(10200, 760, 900, 48, 'ruins'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(200, 700, 1000, 700, 4));
    coins.push(...coinLadder(1300, 700, 560, 5));
    coins.push(...coinTrail(1600, 600, 1780, 600, 2));
    coins.push(...coinTrail(1900, 500, 2100, 500, 3));
    coins.push(...coinTrail(2250, 600, 2400, 600, 2));
    coins.push(...coinArc(2850, 660, 5, 70, 80));
    coins.push(...coinDiamond(3400, 300, 80));
    coins.push(...coinTrail(3700, 660, 4450, 660, 4));
    coins.push(...coinTrail(4650, 660, 4950, 660, 3));
    coins.push(...coinArc(5350, 660, 5, 70, 80));
    coins.push(...coinTrail(5750, 660, 6400, 660, 4));
    coins.push(...coinArc(6650, 590, 5, 70, 80));
    coins.push(...coinDiamond(7250, 210, 70));
    coins.push(...coinTrail(7550, 500, 8050, 500, 4));
    coins.push(...coinTrail(8400, 660, 9200, 660, 4));
    coins.push(...coinTrail(9450, 590, 9550, 590, 2));
    coins.push(...coinTrail(9800, 660, 10600, 660, 4));

    // A sheltered breather between set pieces; the optional reward never gates the route.
    platforms.push(createPlat(4325, 608, 32, 32, 'hidden'));
    coins.push(...coinArc(4325, 551, 3, 48, 32));

    return {
      id: 69, name: 'Säulengänge', width: 10900, height: 950, biome: 'ruins',
      platforms,
      movingPlatforms: [
        createMovingPlat(3100, 520, 110, 24, 'platform_medium', 'circular', 90, 18),
      ],
      coins,
      questionBlocks: [
        createQB(450, 676, 'mushroom'),
        createQB(1350, 676, 'coin'),
        createQB(2800, 676, 'flower'),
        createQB(4000, 676, 'oneup'),
        createQB(6400, 676, 'coin'),
        createQB(9800, 676, 'star'),
      ],
      enemies: [
        createEnemy(800, 716, 'goomba'),
        createEnemy(1700, 620, 'koopa'),
        createEnemy(2050, 524, 'spiny'),
        createEnemy(2350, 620, 'crab'),
        createEnemy(3000, 716, 'robot'),
        createEnemy(3900, 716, 'spiny'),
        createEnemy(5000, 716, 'goomba'),
        createEnemy(6000, 716, 'koopa'),
        createEnemy(6700, 628, 'ghost'),
        createEnemy(7400, 556, 'robot'),
        createEnemy(8500, 716, 'crab'),
        createEnemy(9000, 716, 'spiny'),
        createEnemy(10000, 716, 'robot'),
      ],
      decorations: [
        createDeco(300, 716, 'pillar'),
        createDeco(750, 716, 'moss'),
        createDeco(1350, 816, 'statue'),
        createDeco(1680, 716, 'pillar'),
        createDeco(2030, 620, 'moss'),
        createDeco(2370, 716, 'tombstone'),
        createDeco(3000, 716, 'skull'),
        createDeco(3900, 716, 'rock'),
        createDeco(4900, 716, 'pillar'),
        createDeco(5600, 716, 'moss'),
        createDeco(6200, 716, 'statue'),
        createDeco(7000, 456, 'skull'),
        createDeco(7900, 556, 'pillar'),
        createDeco(8500, 716, 'rock'),
        createDeco(9500, 716, 'moss'),
        createDeco(10400, 716, 'statue'),
      ],
      playerStart: { x: 200, y: 712 },
      goal: { x: 10450, y: 728 },
      timeBonus: 170,
      springs: [createSpring(800, 736), createSpring(4000, 736)],
      spikes: [createSpike(6200, 728), createSpike(8900, 728)],
    };
  })(),

  // ============================================================
  // Level 70 (Stufenpyramide): Aufstieg über drei Treppen-
  // generationen bis zum Gipfel, Abstieg auf der Rückseite,
  // Tal-Terrasse, Zwei-Ebenen-Tempel und Vertikal-Aufzug zur
  // Schlusstafel. 3 Checkpoints (width >= 16000), 2 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(600, 800, 1000, 48, 'ruins'));
    platforms.push(createPlat(1400, 760, 300, 48, 'sandstone'));
    platforms.push(createPlat(1750, 700, 260, 48, 'ruins'));
    platforms.push(createPlat(2100, 640, 260, 48, 'stone'));
    platforms.push(createPlat(2900, 800, 1200, 48, 'sandstone'));
    // Erste Treppengeneration
    platforms.push(...staircase(3600, 776, 5, 70, 140, 40, 'sandstone'));
    platforms.push(createPlat(4800, 500, 600, 48, 'ruins'));
    // Zweite Treppengeneration
    platforms.push(...staircase(5200, 476, 3, 70, 140, 40, 'stone'));
    platforms.push(createPlat(6100, 340, 600, 48, 'sandstone'));
    // Dritte Treppengeneration zum Gipfel
    platforms.push(...staircase(6500, 316, 3, 70, 140, 40, 'sandstone'));
    platforms.push(createPlat(7350, 140, 600, 48, 'stone'));
    // Abstieg auf der Rückseite
    platforms.push(createPlat(8000, 320, 200, 24, 'platform_medium'));
    platforms.push(createPlat(8400, 480, 220, 24, 'platform_easy'));
    platforms.push(createPlat(8750, 640, 240, 24, 'platform_hard'));
    platforms.push(createPlat(9500, 848, 1200, 144, 'ruins'));
    platforms.push(createPlat(10500, 760, 500, 48, 'sandstone'));
    platforms.push(...twoTierSection(10800, 736, 900, 'stone', 'sandstone'));
    platforms.push(createPlat(12300, 760, 800, 48, 'ruins'));
    platforms.push(...gapWithPlatforms(1, 12700, 748, 560, 3, {
      widths: [120, 130, 110], dy: [0, 50, 20], types: ['platform_easy', 'platform_medium', 'platform_hard'],
    }));
    platforms.push(createPlat(13700, 760, 900, 48, 'ruins'));
    // Schlusstafel über dem Vertikal-Aufzug
    platforms.push(createPlat(14430, 392, 240, 24, 'sandstone'));
    platforms.push(createPlat(15300, 760, 900, 48, 'ruins'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(200, 740, 1050, 740, 4));
    coins.push(...coinArc(1400, 680, 5, 70, 80));
    coins.push(...coinDiamond(1750, 600, 60));
    coins.push(...coinTrail(2150, 560, 2600, 560, 3));
    coins.push(...coinLadder(3670, 620, 470, 5));
    coins.push(...coinDiamond(4800, 370, 70));
    coins.push(...coinArc(5350, 420, 5, 70, 80));
    coins.push(...coinDiamond(6100, 210, 70));
    coins.push(...coinLadder(6570, 400, 150, 5));
    coins.push(...coinDiamond(7350, 40, 70));
    coins.push(...coinTrail(7800, 200, 8100, 200, 3));
    coins.push(...coinTrail(8300, 380, 8700, 380, 4));
    coins.push(...coinArc(9300, 660, 5, 70, 80));
    coins.push(...coinTrail(9700, 700, 10000, 700, 3));
    coins.push(...coinTrail(10300, 660, 10700, 660, 3));
    coins.push(...coinDiamond(11250, 470, 70));
    coins.push(...coinArc(12000, 660, 5, 70, 80));
    coins.push(...coinTrail(12500, 660, 12700, 660, 3));
    coins.push(...coinLadder(14250, 620, 470, 4));
    coins.push(...coinDiamond(14430, 300, 60));
    coins.push(...coinTrail(14850, 660, 15700, 660, 4));

    // A sheltered breather between set pieces; the optional reward never gates the route.
    coins.push(...coinArc(9250, 591, 3, 48, 32));

    return {
      id: 70, name: 'Stufenpyramide', width: 16200, height: 1000, biome: 'ruins',
      platforms,
      movingPlatforms: [
        createMovingPlat(14250, 560, 120, 24, 'platform_medium', 'vertical', 96, 18),
      ],
      coins,
      questionBlocks: [
        createQB(450, 716, 'mushroom'),
        createQB(1750, 616, 'coin'),
        createQB(2900, 716, 'flower'),
        createQB(4800, 416, 'star'),
        createQB(6100, 256, 'coin'),
        createQB(9500, 716, 'mushroom'),
        createQB(12500, 676, 'oneup'),
        createQB(15450, 676, 'coin'),
      ],
      enemies: [
        createEnemy(800, 756, 'goomba'),
        createEnemy(1500, 716, 'koopa'),
        createEnemy(1900, 656, 'spiny'),
        createEnemy(2600, 756, 'robot'),
        createEnemy(3850, 616, 'crab'),
        createEnemy(4600, 456, 'goomba'),
        createEnemy(5500, 316, 'spiny'),
        createEnemy(6200, 296, 'robot'),
        createEnemy(7400, 96, 'koopa'),
        createEnemy(9800, 690, 'ghost'),
        createEnemy(11000, 716, 'spiny'),
        createEnemy(12500, 716, 'robot'),
        createEnemy(14500, 716, 'koopa'),
        createEnemy(15200, 716, 'crab'),
      ],
      decorations: [
        createDeco(300, 756, 'pillar'),
        createDeco(800, 756, 'rock'),
        createDeco(1450, 716, 'statue'),
        createDeco(2150, 596, 'moss'),
        createDeco(2950, 756, 'tombstone'),
        createDeco(3700, 686, 'skull'),
        createDeco(4850, 456, 'pillar'),
        createDeco(5500, 296, 'statue'),
        createDeco(6150, 296, 'moss'),
        createDeco(7400, 96, 'pillar'),
        createDeco(8100, 276, 'rock'),
        createDeco(9300, 756, 'skull'),
        createDeco(10550, 716, 'tombstone'),
        createDeco(11300, 716, 'moss'),
        createDeco(12400, 716, 'statue'),
        createDeco(13800, 716, 'pillar'),
        createDeco(15400, 716, 'rock'),
      ],
      playerStart: { x: 200, y: 752 },
      goal: { x: 15500, y: 728 },
      timeBonus: 220,
      checkpoints: [
        createCheckpoint(4600, 452),
        createCheckpoint(9500, 752),
        createCheckpoint(13700, 712),
      ],
      springs: [createSpring(1000, 776), createSpring(9500, 776)],
      spikes: [createSpike(3300, 768), createSpike(12100, 728)],
    };
  })(),

  // ============================================================
  // Level 71 (Wächter-Horde): Terrassen-Arenen mit vielen
  // Wächtern, Zwei-Ebenen-Überführung über die Schatzkammer,
  // Tür + Schlüssel als Bonus (Schatz-Plattformen), Vertikal-
  // Aufzug zur Münz-Krypta, Münz-Tor. 3 Spikes, 2 Federn.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(600, 760, 1100, 48, 'ruins'));
    // Wächter-Terrassen
    platforms.push(...plateauSection(1200, 736, [
      { dx: 0, dy: 0, w: 500, h: 48, type: 'ruins' },
      { dx: 550, dy: 110, w: 380, h: 48, type: 'stone' },
      { dx: 980, dy: 0, w: 420, h: 48, type: 'ruins' },
      { dx: 1450, dy: 150, w: 340, h: 48, type: 'sandstone' },
    ]));
    platforms.push(createPlat(3500, 760, 900, 48, 'ruins'));
    platforms.push(...twoTierSection(4000, 736, 900, 'stone', 'ruins'));
    // Überführung (Hauptroute) über der Schatzkammer
    platforms.push(createPlat(4800, 520, 160, 24, 'platform_medium'));
    platforms.push(createPlat(5150, 480, 160, 24, 'platform_hard'));
    platforms.push(createPlat(5450, 440, 180, 24, 'platform_medium'));
    platforms.push(createPlat(5800, 480, 180, 24, 'platform_easy'));
    platforms.push(createPlat(6200, 560, 200, 24, 'platform_medium'));
    // Schatzkammer unter der Überführung (Tür + Schlüssel = Bonus)
    platforms.push(createPlat(5250, 760, 700, 48, 'sandstone'));
    platforms.push(createPlat(5800, 700, 300, 24, 'brick_secret'));
    platforms.push(createPlat(6100, 620, 280, 24, 'brick_secret'));
    platforms.push(createPlat(6350, 560, 200, 24, 'brick_secret'));
    platforms.push(createPlat(6600, 808, 800, 144, 'ruins'));
    platforms.push(...gapWithPlatforms(1, 7000, 748, 560, 3, {
      widths: [130, 110, 140], dy: [0, 60, 30], types: ['platform_medium', 'platform_easy', 'platform_hard'],
    }));
    platforms.push(createPlat(8050, 760, 900, 48, 'ruins'));
    platforms.push(createPlat(9000, 660, 700, 48, 'stone'));
    platforms.push(createPlat(9700, 760, 700, 48, 'ruins'));
    platforms.push(createPlat(10300, 620, 600, 48, 'sandstone'));
    platforms.push(createPlat(11000, 760, 800, 48, 'ruins'));
    // Münz-Krypta über dem Vertikal-Aufzug
    platforms.push(createPlat(10500, 240, 200, 24, 'platform_hard'));
    platforms.push(createPlat(11900, 760, 800, 48, 'ruins'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(200, 700, 1050, 700, 5));
    coins.push(...coinArc(1450, 680, 5, 70, 80));
    coins.push(...coinTrail(1750, 586, 2100, 586, 3));
    coins.push(...coinDiamond(2390, 660, 70));
    coins.push(...coinLadder(2650, 560, 480, 4));
    coins.push(...coinTrail(3150, 660, 3900, 660, 4));
    coins.push(...coinArc(4250, 660, 5, 70, 80));
    coins.push(...coinTrail(4700, 460, 4900, 460, 3));
    coins.push(...coinTrail(5100, 420, 5350, 420, 3));
    coins.push(...coinTrail(5550, 390, 5850, 390, 3));
    coins.push(...coinTrail(5700, 640, 5900, 640, 3));
    coins.push(...coinDiamond(6100, 560, 60));
    coins.push(...coinTrail(6300, 500, 6420, 500, 2));
    coins.push(...coinArc(7150, 660, 5, 70, 80));
    coins.push(...coinTrail(7650, 660, 8400, 660, 4));
    coins.push(...coinTrail(8700, 560, 9250, 560, 4));
    coins.push(...coinLadder(10200, 540, 450, 4));
    coins.push(...coinDiamond(10500, 170, 70));
    coins.push(...coinTrail(10700, 660, 11300, 660, 4));
    coins.push(...coinTrail(11600, 660, 12200, 660, 4));

    // A sheltered breather between set pieces; the optional reward never gates the route.
    platforms.push(createPlat(6800, 608, 32, 32, 'brick_multi'));
    coins.push(...coinArc(6800, 551, 3, 48, 32));

    return {
      id: 71, name: 'Wächter-Horde', width: 12600, height: 950, biome: 'ruins',
      platforms,
      movingPlatforms: [
        createMovingPlat(10200, 400, 120, 24, 'platform_medium', 'vertical', 110, 18),
      ],
      coins,
      questionBlocks: [
        createQB(500, 676, 'mushroom'),
        createQB(1250, 676, 'coin'),
        createQB(3500, 676, 'flower'),
        createQB(6400, 676, 'oneup'),
        createQB(9700, 676, 'mushroom'),
        createQB(12050, 676, 'star'),
      ],
      enemies: [
        createEnemy(800, 716, 'goomba'),
        createEnemy(1300, 716, 'koopa'),
        createEnemy(1500, 716, 'spiny'),
        createEnemy(2000, 606, 'goomba'),
        createEnemy(2350, 716, 'crab'),
        createEnemy(2700, 566, 'robot'),
        createEnemy(3250, 716, 'goomba'),
        createEnemy(3700, 716, 'spiny'),
        createEnemy(4150, 556, 'robot'),
        createEnemy(4500, 716, 'crab'),
        createEnemy(5000, 600, 'ghost'),
        createEnemy(6500, 716, 'koopa'),
        createEnemy(7800, 716, 'spiny'),
        createEnemy(8900, 616, 'robot'),
        createEnemy(9500, 716, 'goomba'),
        createEnemy(10900, 716, 'crab'),
        createEnemy(11700, 716, 'spiny'),
      ],
      decorations: [
        createDeco(300, 716, 'pillar'),
        createDeco(750, 716, 'skull'),
        createDeco(1300, 716, 'statue'),
        createDeco(1800, 606, 'moss'),
        createDeco(2400, 716, 'tombstone'),
        createDeco(2800, 566, 'rock'),
        createDeco(3400, 716, 'pillar'),
        createDeco(4200, 556, 'statue'),
        createDeco(4700, 460, 'moss'),
        createDeco(5300, 716, 'tombstone'),
        createDeco(5900, 660, 'skull'),
        createDeco(6700, 716, 'pillar'),
        createDeco(7900, 716, 'rock'),
        createDeco(8900, 616, 'moss'),
        createDeco(9600, 716, 'statue'),
        createDeco(11000, 716, 'tombstone'),
        createDeco(12000, 716, 'pillar'),
      ],
      playerStart: { x: 200, y: 712 },
      goal: { x: 12050, y: 728 },
      timeBonus: 190,
      springs: [createSpring(1000, 736), createSpring(3500, 736)],
      spikes: [
        createSpike(1850, 618),
        createSpike(9100, 628),
        createSpike(11150, 728),
      ],
      keys: [createKey(4300, 520)],
      doors: [createDoor(5560, 656, 60, 160)],
      coinGoal: 40,
    };
  })(),

  // ============================================================
  // Level 72 (Fallender Tempel): Abstieg von der Hochterrasse
  // (y≈500) auf den Tempelboden (y≈800) über eine lange
  // Crumble-Kette — parallel führt IMMER eine solide, nicht
  // bröckelnde Terassenroute (Solver kennt Crumble nicht).
  // Danach Grabkammer, Fallstücke, Vertikal-Aufzug zur Kammer,
  // Schlusstempel, Münz-Tor, 3 Checkpoints (width >= 16000).
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(500, 524, 900, 48, 'ruins'));
    // Solide Abstiegs-Terrassen (sichere Route)
    platforms.push(createPlat(1150, 584, 300, 48, 'sandstone'));
    platforms.push(createPlat(1550, 644, 300, 48, 'ruins'));
    platforms.push(createPlat(1950, 704, 320, 48, 'stone'));
    platforms.push(createPlat(2500, 764, 400, 48, 'sandstone'));
    platforms.push(createPlat(3200, 824, 800, 48, 'ruins'));
    // Crumble-Kette darüber (Bonusroute entlang des Abstiegs)
    platforms.push(createCrumblePlat(1150, 440, 140, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(1450, 400, 130, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(1680, 440, 130, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(1900, 400, 140, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(2150, 460, 140, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(2400, 520, 150, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(2650, 580, 150, 24, 'platform_medium'));
    // Grabkammer
    platforms.push(createPlat(3800, 830, 180, 24, 'platform_easy'));
    platforms.push(createPlat(4300, 880, 500, 48, 'stone'));
    platforms.push(createPlat(4800, 880, 160, 24, 'platform_medium'));
    platforms.push(createPlat(5300, 940, 600, 48, 'ruins'));
    platforms.push(...gapWithPlatforms(1, 5600, 928, 560, 3, {
      widths: [120, 130, 110], dy: [0, 50, 20], types: ['platform_easy', 'platform_medium', 'platform_hard'],
    }));
    platforms.push(createPlat(6600, 940, 900, 48, 'ruins'));
    platforms.push(createPlat(7600, 948, 700, 144, 'stone'));
    platforms.push(...pitFloor(8000, 876, 300, 60, 'sandstone'));
    platforms.push(createPlat(8800, 900, 700, 48, 'ruins'));
    platforms.push(createPlat(9500, 860, 600, 48, 'sandstone'));
    // Fallstücke (Crumble) über der sicheren Querung
    platforms.push(createCrumblePlat(9600, 700, 140, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(9820, 660, 130, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(9950, 700, 130, 24, 'platform_medium'));
    platforms.push(createPlat(10120, 800, 160, 24, 'platform_hard'));
    platforms.push(createPlat(10500, 820, 700, 48, 'ruins'));
    platforms.push(createPlat(11350, 780, 600, 48, 'stone'));
    platforms.push(createPlat(12100, 740, 700, 48, 'sandstone'));
    // Kammer über dem Vertikal-Aufzug
    platforms.push(createPlat(12850, 352, 200, 24, 'platform_hard'));
    platforms.push(createPlat(13400, 620, 400, 48, 'ruins'));
    platforms.push(createPlat(14000, 700, 600, 48, 'stone'));
    // Schlusstempel-Treppe
    platforms.push(...staircase(14400, 676, 4, 70, 140, 40, 'sandstone'));
    platforms.push(createPlat(15550, 420, 600, 48, 'ruins'));
    platforms.forEach(p => { if (p.type === 'platform_easy' || p.type === 'platform_medium' || p.type === 'platform_hard' || p.type === 'cloud') p.crumble = true; });

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(200, 460, 900, 460, 4));
    coins.push(...coinArc(1150, 360, 5, 70, 80));
    coins.push(...coinTrail(1250, 500, 1380, 500, 2));
    coins.push(...coinArc(1450, 320, 5, 70, 80));
    coins.push(...coinTrail(1550, 560, 1680, 560, 2));
    coins.push(...coinArc(1900, 320, 5, 70, 80));
    coins.push(...coinTrail(2000, 620, 2100, 620, 2));
    coins.push(...coinTrail(2400, 440, 2470, 440, 2));
    coins.push(...coinLadder(2650, 520, 420, 4));
    coins.push(...coinArc(3200, 720, 5, 70, 80));
    coins.push(...coinTrail(3700, 740, 3850, 740, 2));
    coins.push(...coinDiamond(4300, 770, 70));
    coins.push(...coinTrail(4750, 800, 4850, 800, 2));
    coins.push(...coinArc(5300, 830, 5, 70, 80));
    coins.push(...coinTrail(5700, 850, 6050, 850, 3));
    coins.push(...coinArc(6600, 840, 5, 70, 80));
    coins.push(...coinArc(7600, 790, 5, 70, 80));
    coins.push(...coinTrail(8050, 870, 8250, 870, 3));
    coins.push(...coinArc(8800, 790, 5, 70, 80));
    coins.push(...coinDiamond(9600, 620, 70));
    coins.push(...coinArc(10100, 790, 5, 70, 80));
    coins.push(...coinTrail(10400, 720, 10800, 720, 3));
    coins.push(...coinArc(11400, 690, 5, 70, 80));
    coins.push(...coinTrail(11800, 640, 12400, 640, 4));
    coins.push(...coinLadder(12600, 620, 500, 4));
    coins.push(...coinDiamond(12850, 270, 70));
    coins.push(...coinTrail(13300, 530, 13500, 530, 3));
    coins.push(...coinArc(14000, 610, 5, 70, 80));
    coins.push(...coinTrail(14450, 550, 15050, 550, 4));
    coins.push(...coinTrail(15300, 330, 15800, 330, 5));

    // A sheltered breather between set pieces; the optional reward never gates the route.
    coins.push(...coinArc(7425, 691, 3, 48, 32));

    return {
      id: 72, name: 'Fallender Tempel', width: 16200, height: 1000, biome: 'ruins',
      platforms,
      movingPlatforms: [
        createMovingPlat(12600, 560, 120, 24, 'platform_easy', 'vertical', 100, 18),
      ],
      coins,
      questionBlocks: [
        createQB(450, 440, 'mushroom'),
        createQB(1700, 560, 'coin'),
        createQB(3200, 740, 'oneup'),
        createQB(6600, 856, 'flower'),
        createQB(9500, 776, 'coin'),
        createQB(11850, 696, 'star'),
        createQB(15700, 336, 'mushroom'),
      ],
      enemies: [
        createEnemy(700, 460, 'goomba'),
        createEnemy(1400, 540, 'koopa'),
        createEnemy(1800, 660, 'spiny'),
        createEnemy(2350, 720, 'robot'),
        createEnemy(3000, 780, 'goomba'),
        createEnemy(3600, 780, 'crab'),
        createEnemy(4400, 840, 'spiny'),
        createEnemy(5400, 900, 'robot'),
        createEnemy(6300, 900, 'goomba'),
        createEnemy(7000, 880, 'ghost'),
        createEnemy(7800, 860, 'koopa'),
        createEnemy(8600, 840, 'crab'),
        createEnemy(9200, 820, 'spiny'),
        createEnemy(10800, 780, 'robot'),
        createEnemy(11600, 740, 'goomba'),
        createEnemy(12300, 700, 'thwomp'),
        createEnemy(13800, 660, 'spiny'),
        createEnemy(15000, 640, 'crab'),
      ],
      decorations: [
        createDeco(250, 480, 'pillar'),
        createDeco(1300, 540, 'moss'),
        createDeco(1650, 600, 'statue'),
        createDeco(2600, 720, 'tombstone'),
        createDeco(3400, 780, 'skull'),
        createDeco(3900, 780, 'rock'),
        createDeco(4400, 840, 'pillar'),
        createDeco(5500, 900, 'moss'),
        createDeco(6700, 900, 'statue'),
        createDeco(7700, 860, 'tombstone'),
        createDeco(8900, 840, 'skull'),
        createDeco(10600, 780, 'pillar'),
        createDeco(11500, 740, 'moss'),
        createDeco(12400, 700, 'rock'),
        createDeco(13600, 580, 'statue'),
        createDeco(14100, 660, 'tombstone'),
        createDeco(15600, 380, 'pillar'),
      ],
      playerStart: { x: 250, y: 476 },
      goal: { x: 15700, y: 388 },
      timeBonus: 250,
      checkpoints: [
        createCheckpoint(3200, 776),
        createCheckpoint(10600, 772),
        createCheckpoint(14000, 652),
      ],
      springs: [createSpring(800, 500), createSpring(3200, 800)],
      spikes: [createSpike(3400, 792), createSpike(6900, 908), createSpike(11550, 748)],
      coinGoal: 45,
    };
  })(),
];

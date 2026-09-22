// Desert World (ids 7-12) — Phase 9 rebuild
// Archetypes: 7 Dünen-Tutorial, 8 Sandsturm-Schlucht, 9 Pyramiden-Labyrinth,
// 10 Oasen-Kletterer, 11 Skorpion-Horde, 12 Pharaonen-Finale.
// Desert gravity is 2000: safe rises <=160px, safe same-height gaps <=210px.
// All levels are authored solvable (ensureSolvable adds nothing).

import {
  LevelData, createPlat, createQB, createEnemy, createDeco, createGoal,
  createMovingPlat, createSpring, createSpike, createCrumblePlat, createWindZone,
  createKey, createDoor, staircase, plateauSection, pitFloor, twoTierSection,
  islandCluster, zigzagClimb, overhangSection, coinArc, coinDiamond, coinTrail, coinLadder,
  gapWithPlatforms,
} from './helpers';

export const DESERT_LEVELS: LevelData[] = [
  // ============================================================
  // Level 7 (Dünen-Tutorial): sanfter Einstieg mit Dünen-Terrasse,
  // Grube, optionaler Zwei-Ebenen-Route und einem Secret-Nest
  // ueber dem Start. Genau 1 Spring, 0 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(400, 640, 700, 40, 'sand'));
    platforms.push(...staircase(820, 620, 3, 70, 130, 30, 'sand'));
    platforms.push(createPlat(1500, 660, 420, 40, 'sand'));
    platforms.push(...pitFloor(1770, 640, 340, 140, 'stone'));
    platforms.push(createPlat(2270, 660, 440, 40, 'sand'));
    platforms.push(...gapWithPlatforms(1, 2490, 652, 380, 2, {
      widths: [90, 110], dy: [0, 40], types: ['platform_easy', 'platform_medium'],
    }));
    platforms.push(createPlat(3060, 660, 560, 40, 'sand'));
    platforms.push(...twoTierSection(3400, 640, 720, 'sand', 'platform_medium'));
    platforms.push(createPlat(4320, 660, 360, 40, 'sand'));
    platforms.push(...zigzagClimb(4620, 640, 3, 90, 110, 130, 'platform_medium'));
    platforms.push(createPlat(5200, 620, 520, 40, 'sand'));
    // Secret nest above the start (platform + 4 coins, R-032 style)
    platforms.push(createPlat(600, 500, 160, 24, 'sand'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 580, 650, 580, 4));
    coins.push(...coinTrail(850, 510, 1180, 370, 4));
    coins.push(...coinArc(2370, 540, 5, 70, 90));
    coins.push(...coinTrail(1800, 750, 2080, 750, 4));
    coins.push(...coinLadder(4750, 520, 340, 5));
    coins.push(...coinDiamond(3760, 420, 70));
    coins.push(...coinTrail(5000, 560, 5400, 560, 4));
    coins.push(...coinDiamond(600, 440, 60));

    return {
      id: 7, name: 'Sandy Deserts', width: 5600, height: 800, biome: 'desert',
      platforms,
      movingPlatforms: [
        createMovingPlat(2000, 690, 110, 24, 'platform_easy', 'vertical', 80, 18),
      ],
      coins,
      questionBlocks: [
        createQB(500, 530, 'mushroom'),
        createQB(3000, 550, 'coin'),
        createQB(4340, 550, 'flower'),
      ],
      enemies: [
        createEnemy(740, 600, 'goomba'),
        createEnemy(3200, 620, 'crab'),
        createEnemy(3720, 620, 'spiny'),
        createEnemy(4360, 620, 'koopa'),
      ],
      decorations: [
        createDeco(200, 610, 'cactus'),
        createDeco(900, 540, 'rock'),
        createDeco(1940, 770, 'skull'),
        createDeco(2450, 630, 'cactus'),
        createDeco(3760, 630, 'pyramid'),
        createDeco(4340, 630, 'cactus'),
        createDeco(5250, 590, 'skull'),
      ],
      playerStart: { x: 170, y: 600 },
      goal: { x: 5250, y: 592 },
      timeBonus: 120,
      springs: [createSpring(2370, 640)],
    };
  })(),

  // ============================================================
  // Level 8 (Sandsturm-Schlucht): zwei Wind-Zonen auf geraden
  // Laufstrecken, Schlucht mit Pit-Ledges und Inseln, Ueberhang
  // und Circular-Moving-Platform als Bruecke.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(400, 660, 760, 40, 'sand'));
    platforms.push(...gapWithPlatforms(1, 780, 652, 300, 1, {
      widths: [120], dy: [0], types: ['platform_medium'],
    }));
    platforms.push(createPlat(1500, 660, 900, 40, 'sand'));
    platforms.push(...pitFloor(2050, 640, 620, 200, 'stone'));
    platforms.push(...islandCluster(2150, 840, [
      { dx: 0, dy: 60, w: 120, type: 'platform_easy' },
      { dx: 200, dy: 130, w: 100, type: 'platform_medium' },
      { dx: 400, dy: 70, w: 140, type: 'platform_hard' },
    ]));
    platforms.push(createPlat(2780, 700, 140, 24, 'platform_medium'));
    platforms.push(createPlat(3200, 660, 700, 40, 'sand'));
    platforms.push(...overhangSection(3600, 640, 700, 3900, 140, 'stone'));
    platforms.push(...islandCluster(3900, 640, [
      { dx: 40, dy: 150, w: 120, type: 'platform_medium' },
      { dx: 180, dy: 180, w: 100, type: 'platform_hard' },
      { dx: 320, dy: 130, w: 120, type: 'platform_easy' },
    ]));
    platforms.push(createPlat(4900, 660, 600, 40, 'sand'));
    platforms.push(...staircase(5300, 640, 4, 70, 130, 40, 'sandstone'));
    platforms.push(createPlat(6300, 400, 500, 40, 'sand'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(120, 600, 700, 600, 4));
    coins.push(...coinArc(1500, 540, 5, 70, 90));
    coins.push(...coinTrail(2080, 810, 2620, 810, 4));
    coins.push(...coinDiamond(4040, 400, 80));
    coins.push(...coinTrail(5320, 530, 5860, 320, 5));
    coins.push(...coinDiamond(4500, 420, 60));
    coins.push(...coinTrail(6100, 340, 6500, 340, 4));

    return {
      id: 8, name: 'Pyramid Dunes', width: 6800, height: 900, biome: 'desert',
      platforms,
      movingPlatforms: [
        createMovingPlat(2360, 700, 110, 24, 'platform_easy', 'vertical', 100, 18),
        createMovingPlat(4500, 600, 110, 24, 'platform_easy', 'circular', 110, 20),
      ],
      coins,
      questionBlocks: [
        createQB(700, 550, 'mushroom'),
        createQB(3250, 550, 'coin'),
        createQB(4950, 590, 'flower'),
      ],
      enemies: [
        createEnemy(1700, 620, 'spiny'),
        createEnemy(2400, 820, 'crab'),
        createEnemy(3050, 620, 'robot'),
        createEnemy(3700, 620, 'koopa'),
        createEnemy(5050, 620, 'spiny'),
        createEnemy(5800, 340, 'goomba'),
      ],
      decorations: [
        createDeco(300, 630, 'cactus'),
        createDeco(1200, 630, 'rock'),
        createDeco(2360, 830, 'skull'),
        createDeco(3200, 630, 'rock'),
        createDeco(4650, 630, 'pyramid'),
        createDeco(5500, 490, 'cactus'),
        createDeco(6300, 370, 'skull'),
      ],
      playerStart: { x: 170, y: 620 },
      goal: { x: 6300, y: 372 },
      timeBonus: 160,
      springs: [createSpring(1500, 640), createSpring(4900, 640)],
      spikes: [createSpike(1600, 632), createSpike(3400, 632)],
      windZones: [
        createWindZone(1100, 480, 800, 160, 140, 3000),
        createWindZone(2900, 480, 600, 160, 160, 2500),
      ],
    };
  })(),

  // ============================================================
  // Level 9 (Pyramiden-Labyrinth): Stufenpyramide, hohe
  // Schluessel-Ledge, Bonusraum hinter einer Tuer im Untergeschoss
  // (Schluessel noetig, Pflichtweg laeuft ueber die Tuer hinweg).
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(400, 640, 700, 40, 'sand'));
    platforms.push(...staircase(820, 620, 3, 70, 150, 40, 'sandstone'));
    platforms.push(createPlat(1600, 660, 500, 40, 'sand'));
    platforms.push(...plateauSection(1950, 640, [
      { dx: 0, dy: 0, w: 300, h: 40, type: 'sandstone' },
      { dx: 340, dy: 120, w: 260, h: 40, type: 'stone' },
      { dx: 640, dy: 240, w: 300, h: 40, type: 'sandstone' },
    ]));
    platforms.push(createPlat(3050, 560, 220, 24, 'platform_medium'));
    platforms.push(createPlat(3350, 660, 480, 40, 'sand'));
    platforms.push(createPlat(3100, 560, 140, 24, 'platform_easy'));
    platforms.push(createPlat(3300, 480, 200, 24, 'platform_hard'));
    platforms.push(createPlat(3430, 660, 180, 40, 'sand'));
    platforms.push(createPlat(3800, 660, 340, 40, 'sand'));
    // Untergeschoss-Bonusraum: Boden, zwei Waende, Tuer, Notausstieg
    platforms.push(createPlat(3655, 860, 630, 40, 'stone'));
    platforms.push(createPlat(3320, 750, 40, 220, 'stone'));
    platforms.push(createPlat(3990, 750, 40, 220, 'stone'));
    platforms.push(createPlat(3480, 760, 120, 24, 'platform_easy'));
    platforms.push(...gapWithPlatforms(1, 3970, 652, 480, 3, {
      widths: [100, 120, 90], dy: [40, 0, 80], types: ['platform_medium', 'platform_easy', 'platform_easy'],
    }));
    platforms.push(createPlat(4750, 660, 500, 40, 'sand'));
    platforms.push(...zigzagClimb(5100, 640, 4, 80, 120, 140, 'platform_medium'));
    platforms.push(createPlat(5550, 500, 600, 40, 'sand'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(120, 580, 660, 580, 4));
    coins.push(...coinTrail(840, 510, 1260, 380, 4));
    coins.push(...coinArc(3400, 540, 5, 70, 90));
    coins.push(...coinDiamond(3300, 420, 60));
    coins.push(...coinTrail(3450, 810, 3560, 810, 2));
    coins.push(...coinTrail(3800, 810, 3950, 810, 3));
    coins.push(...coinTrail(4150, 580, 4440, 540, 4));
    coins.push(...coinLadder(5240, 520, 340, 5));
    coins.push(...coinTrail(5300, 440, 5800, 440, 4));

    return {
      id: 9, name: 'Scorpion Sands', width: 6600, height: 900, biome: 'desert',
      platforms,
      movingPlatforms: [
        createMovingPlat(4200, 560, 110, 24, 'platform_easy', 'circular', 120, 20),
      ],
      coins,
      questionBlocks: [
        createQB(700, 530, 'mushroom'),
        createQB(1700, 550, 'coin'),
        createQB(3870, 770, 'oneup'),
        createQB(4950, 590, 'flower'),
      ],
      enemies: [
        createEnemy(2100, 620, 'goomba'),
        createEnemy(2400, 500, 'spiny'),
        createEnemy(2700, 380, 'crab'),
        createEnemy(3500, 620, 'robot'),
        createEnemy(3300, 448, 'koopa'),
        createEnemy(4700, 620, 'goomba'),
        createEnemy(5240, 540, 'spiny'),
      ],
      decorations: [
        createDeco(300, 610, 'cactus'),
        createDeco(1600, 630, 'moss'),
        createDeco(2400, 630, 'rock'),
        createDeco(2740, 390, 'statue'),
        createDeco(3300, 458, 'pillar'),
        createDeco(3655, 850, 'skull'),
        createDeco(4750, 630, 'tombstone'),
        createDeco(5650, 470, 'pyramid'),
      ],
      playerStart: { x: 170, y: 580 },
      goal: { x: 5650, y: 472 },
      timeBonus: 150,
      springs: [createSpring(3400, 640)],
      spikes: [createSpike(2050, 632), createSpike(4800, 632)],
      keys: [createKey(3300, 440)],
      doors: [createDoor(3700, 760, 120, 160)],
    };
  })(),

  // ============================================================
  // Level 10 (Oasen-Kletterer): Kletterpartie mit Terrainketten,
  // zwei Crumbling-Bruecken als optionale Abkuerzung, Muenz-Tor
  // (coinGoal 30, hart gepinnt).
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(400, 700, 700, 40, 'sand'));
    platforms.push(createCrumblePlat(850, 620, 120, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(1020, 560, 120, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(1190, 620, 120, 24, 'platform_medium'));
    platforms.push(...gapWithPlatforms(1, 750, 692, 350, 2, {
      widths: [100, 90], dy: [0, 40], types: ['platform_easy', 'platform_medium'],
    }));
    platforms.push(createPlat(1400, 700, 600, 40, 'sand'));
    platforms.push(...islandCluster(1800, 680, [
      { dx: 0, dy: 0, w: 160, type: 'sand' },
      { dx: 260, dy: 90, w: 120, type: 'platform_medium' },
      { dx: 500, dy: 40, w: 180, type: 'sand' },
      { dx: 760, dy: 130, w: 110, type: 'platform_hard' },
    ]));
    platforms.push(...staircase(2780, 680, 5, 70, 140, 45, 'sandstone'));
    platforms.push(createPlat(3900, 400, 500, 40, 'sand'));
    platforms.push(createCrumblePlat(4300, 320, 120, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(4470, 260, 120, 24, 'platform_medium'));
    platforms.push(createPlat(4700, 220, 160, 24, 'platform_hard'));
    platforms.push(createPlat(4500, 740, 700, 40, 'sand'));
    platforms.push(...plateauSection(4950, 720, [
      { dx: 0, dy: 0, w: 260, h: 40, type: 'sand' },
      { dx: 300, dy: 120, w: 220, h: 40, type: 'sandstone' },
      { dx: 560, dy: 240, w: 260, h: 40, type: 'sand' },
      { dx: 860, dy: 360, w: 300, h: 40, type: 'stone' },
    ]));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(120, 640, 660, 640, 4));
    coins.push(...coinDiamond(1020, 500, 70));
    coins.push(...coinTrail(830, 640, 1010, 620, 2));
    coins.push(...coinArc(1850, 630, 5, 80, 80));
    coins.push(...coinTrail(2080, 550, 2650, 510, 4));
    coins.push(...coinLadder(2850, 570, 350, 5));
    coins.push(...coinDiamond(3900, 300, 80));
    coins.push(...coinDiamond(4700, 160, 70));
    coins.push(...coinTrail(4200, 680, 4800, 680, 5));
    coins.push(...coinLadder(5200, 680, 420, 5));
    coins.push(...coinTrail(5530, 440, 6090, 320, 5));

    return {
      id: 10, name: 'Tomb Raider', width: 6600, height: 900, biome: 'desert',
      platforms,
      movingPlatforms: [
        createMovingPlat(1750, 560, 110, 24, 'platform_easy', 'vertical', 90, 18),
        createMovingPlat(5300, 520, 100, 24, 'platform_easy', 'circular', 110, 18),
      ],
      coins,
      questionBlocks: [
        createQB(600, 600, 'mushroom'),
        createQB(1250, 600, 'coin'),
        createQB(4000, 300, 'flower'),
        createQB(5100, 640, 'star'),
      ],
      enemies: [
        createEnemy(800, 660, 'goomba'),
        createEnemy(1500, 660, 'crab'),
        createEnemy(2250, 620, 'spiny'),
        createEnemy(3035, 520, 'robot'),
        createEnemy(4000, 360, 'koopa'),
        createEnemy(4600, 700, 'spiny'),
        createEnemy(5400, 580, 'goomba'),
        createEnemy(5900, 340, 'crab'),
      ],
      decorations: [
        createDeco(200, 670, 'cactus'),
        createDeco(1850, 670, 'moss'),
        createDeco(2400, 630, 'rock'),
        createDeco(3700, 370, 'skull'),
        createDeco(4500, 710, 'moss'),
        createDeco(5300, 590, 'pyramid'),
        createDeco(5950, 350, 'pillar'),
      ],
      playerStart: { x: 170, y: 660 },
      goal: { x: 5950, y: 352 },
      timeBonus: 180,
      coinGoal: 30,
      springs: [createSpring(2850, 610)],
      spikes: [createSpike(1600, 672), createSpike(4600, 712)],
    };
  })(),

  // ============================================================
  // Level 11 (Skorpion-Horde): Kampf-Arenen mit Waechtern auf
  // Terrassen und oberen Routen. 18 Gegner inkl. crab/robot/spiny
  // (hart gepinnt), vertikale + circulare Moving-Platform.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(400, 660, 600, 40, 'sand'));
    platforms.push(createPlat(1300, 660, 1000, 40, 'sand'));
    platforms.push(...islandCluster(900, 640, [
      { dx: 0, dy: 120, w: 140, type: 'sandstone' },
      { dx: 240, dy: 160, w: 120, type: 'sandstone' },
      { dx: 480, dy: 80, w: 160, type: 'sandstone' },
    ]));
    platforms.push(...pitFloor(1900, 640, 500, 160, 'stone'));
    platforms.push(createPlat(2480, 700, 160, 24, 'platform_medium'));
    platforms.push(createPlat(2900, 660, 900, 40, 'sand'));
    platforms.push(...twoTierSection(3450, 640, 600, 'sand', 'sandstone'));
    platforms.push(createPlat(4400, 660, 1000, 40, 'sand'));
    platforms.push(createPlat(5050, 560, 320, 40, 'sand'));
    platforms.push(createPlat(5400, 548, 140, 24, 'platform_medium'));
    platforms.push(createPlat(5800, 560, 400, 40, 'sand'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 600, 650, 600, 4));
    coins.push(...coinDiamond(970, 460, 60));
    coins.push(...coinArc(1200, 380, 5, 60, 70));
    coins.push(...coinTrail(2050, 760, 2350, 760, 4));
    coins.push(...coinArc(3300, 540, 5, 70, 90));
    coins.push(...coinLadder(3750, 440, 300, 4));
    coins.push(...coinTrail(4950, 580, 5150, 500, 4));
    coins.push(...coinDiamond(5400, 480, 60));
    coins.push(...coinTrail(5650, 500, 5950, 500, 4));

    return {
      id: 11, name: 'Quicksand Canyon', width: 6800, height: 850, biome: 'desert',
      platforms,
      movingPlatforms: [
        createMovingPlat(2150, 680, 110, 24, 'platform_easy', 'vertical', 90, 18),
        createMovingPlat(4300, 520, 110, 24, 'platform_medium', 'circular', 120, 20),
      ],
      coins,
      questionBlocks: [
        createQB(550, 550, 'mushroom'),
        createQB(2700, 550, 'coin'),
        createQB(4200, 550, 'flower'),
      ],
      enemies: [
        createEnemy(900, 620, 'goomba'),
        createEnemy(1000, 620, 'crab'),
        createEnemy(1200, 620, 'spiny'),
        createEnemy(1400, 620, 'koopa'),
        createEnemy(1600, 620, 'robot'),
        createEnemy(970, 500, 'crab'),
        createEnemy(1200, 460, 'spiny'),
        createEnemy(1460, 540, 'robot'),
        createEnemy(2000, 780, 'goomba'),
        createEnemy(2250, 780, 'crab'),
        createEnemy(2480, 668, 'spiny'),
        createEnemy(2800, 620, 'robot'),
        createEnemy(3100, 620, 'koopa'),
        createEnemy(3550, 460, 'crab'),
        createEnemy(3900, 460, 'spiny'),
        createEnemy(4200, 620, 'goomba'),
        createEnemy(4500, 620, 'robot'),
        createEnemy(5100, 520, 'crab'),
      ],
      decorations: [
        createDeco(300, 630, 'skull'),
        createDeco(1200, 630, 'cactus'),
        createDeco(2000, 790, 'rock'),
        createDeco(2900, 630, 'pyramid'),
        createDeco(4400, 630, 'skull'),
        createDeco(5900, 530, 'cactus'),
      ],
      playerStart: { x: 170, y: 620 },
      goal: { x: 5800, y: 532 },
      timeBonus: 200,
      springs: [createSpring(3300, 640)],
      spikes: [createSpike(1500, 632), createSpike(4600, 632)],
    };
  })(),

  // ============================================================
  // Level 12 (Pharaonen-Finale): Aufstieg zum Grabmal mit zwei
  // Wind-Zonen, Grabkammer samt Zusatz-Flagge, Zwei-Ebenen-Route
  // und zwei Multi-Goal-Flaggen (hart + mittel).
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(400, 760, 700, 40, 'sand'));
    platforms.push(...gapWithPlatforms(1, 750, 752, 300, 2, {
      widths: [110, 90], dy: [0, 50], types: ['platform_medium', 'platform_easy'],
    }));
    platforms.push(createPlat(1500, 760, 900, 40, 'sand'));
    platforms.push(...staircase(2050, 740, 4, 70, 150, 45, 'sandstone'));
    platforms.push(createPlat(2950, 600, 500, 40, 'sand'));
    platforms.push(...pitFloor(3300, 560, 700, 260, 'stone'));
    platforms.push(createPlat(3650, 700, 160, 24, 'stone'));
    platforms.push(...islandCluster(4150, 820, [
      { dx: 0, dy: 0, w: 140, type: 'stone' },
      { dx: 220, dy: 90, w: 120, type: 'platform_medium' },
      { dx: 440, dy: 180, w: 140, type: 'stone' },
      { dx: 660, dy: 270, w: 160, type: 'sand' },
    ]));
    platforms.push(createPlat(5300, 640, 700, 40, 'sand'));
    platforms.push(...twoTierSection(5800, 620, 720, 'sandstone', 'stone'));
    platforms.push(...zigzagClimb(6600, 620, 4, 80, 120, 130, 'platform_hard'));
    platforms.push(createPlat(7100, 440, 500, 40, 'sand'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(120, 700, 660, 700, 4));
    coins.push(...coinTrail(1100, 700, 1900, 700, 5));
    coins.push(...coinTrail(2070, 630, 2760, 420, 5));
    coins.push(...coinDiamond(2950, 480, 70));
    coins.push(...coinArc(3650, 760, 5, 90, 70));
    coins.push(...coinLadder(4200, 790, 570, 5));
    coins.push(...coinTrail(5000, 580, 5600, 580, 5));
    coins.push(...coinDiamond(6160, 400, 80));
    coins.push(...coinLadder(6730, 500, 280, 5));
    coins.push(...coinTrail(6900, 380, 7300, 380, 5));

    return {
      id: 12, name: "Pharaoh's Tomb", width: 7600, height: 950, biome: 'desert',
      platforms,
      movingPlatforms: [
        createMovingPlat(3650, 760, 110, 24, 'platform_easy', 'vertical', 100, 18),
        createMovingPlat(6600, 500, 110, 24, 'platform_medium', 'circular', 120, 20),
      ],
      coins,
      questionBlocks: [
        createQB(600, 650, 'mushroom'),
        createQB(3000, 470, 'star'),
        createQB(5100, 530, 'flower'),
      ],
      enemies: [
        createEnemy(750, 720, 'goomba'),
        createEnemy(1600, 720, 'crab'),
        createEnemy(2125, 650, 'spiny'),
        createEnemy(3000, 540, 'koopa'),
        createEnemy(3800, 800, 'robot'),
        createEnemy(4430, 710, 'spiny'),
        createEnemy(4650, 620, 'crab'),
        createEnemy(5500, 600, 'goomba'),
        createEnemy(5900, 600, 'robot'),
        createEnemy(6730, 520, 'spiny'),
        createEnemy(7100, 400, 'koopa'),
      ],
      decorations: [
        createDeco(300, 750, 'pyramid'),
        createDeco(1200, 730, 'cactus'),
        createDeco(2950, 550, 'statue'),
        createDeco(3650, 810, 'skull'),
        createDeco(4300, 800, 'tombstone'),
        createDeco(5200, 610, 'moss'),
        createDeco(5900, 610, 'pillar'),
      ],
      playerStart: { x: 170, y: 720 },
      goal: { x: 7150, y: 412 },
      timeBonus: 250,
      springs: [createSpring(3650, 820), createSpring(5300, 620)],
      spikes: [createSpike(1400, 732), createSpike(6200, 612)],
      windZones: [
        createWindZone(1100, 580, 800, 160, 150, 3000),
        createWindZone(5000, 460, 600, 160, 160, 2500),
      ],
      goals: [
        createGoal(3650, 680, 5000),
        createGoal(6470, 452, 3000),
      ],
      fallingHazards: { intervalMs: 2500 },
    };
  })(),
];

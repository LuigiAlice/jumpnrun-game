import { polishNatureLevel } from './naturePolish';
// Forest World (ids 31-36) — Phase 9 rebuild
// Archetypes: 31 Waldweg, 32 Lichtungssprünge, 33 Wurzel-Labyrinth,
// 34 Baumkronen, 35 Käferhorde, 36 Wipfelpfad-Finale (fallende Äste, Engine-ID 36).
// Forest gravity is 2000: safe rises <=160px, safe same-height gaps <=210px.
// All levels are authored solvable (ensureSolvable adds nothing).

import {
  LevelData, createPlat, createQB, createEnemy, createDeco,
  createMovingPlat, createSpring, createSpike, createCrumblePlat,
  createCheckpoint, createKey, createDoor,
  staircase, plateauSection, pitFloor, twoTierSection, islandCluster,
  zigzagClimb, overhangSection, coinArc, coinDiamond, coinTrail, coinLadder,
  gapWithPlatforms,
} from './helpers';

const FOREST_AUTHORED_LEVELS: LevelData[] = [
  // ============================================================
  // Level 31 (Waldweg): sanfter Einstieg — Waldboden-Segmente,
  // kleine Grube, zwei Baumkronen-Stufen und ein Geheimnest über
  // dem Start (Plattform + 4 Münzen). Keine Spikes, 2 Federn.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(500, 660, 900, 40, 'grass'));
    // Geheimnest über dem Start: zwei Trittstufen + Plattform
    platforms.push(createPlat(600, 570, 110, 24, 'platform_easy'));
    platforms.push(createPlat(760, 500, 160, 24, 'platform_medium'));
    platforms.push(createPlat(1500, 660, 700, 40, 'grass'));
    platforms.push(createPlat(1550, 570, 140, 24, 'platform_medium'));
    platforms.push(createPlat(1750, 480, 120, 24, 'platform_easy'));
    platforms.push(createPlat(2400, 660, 820, 40, 'grass'));
    platforms.push(createPlat(2500, 560, 180, 24, 'wood'));
    platforms.push(createPlat(2750, 470, 140, 24, 'wood'));
    // Vertikale Aufzug-Plattform als Kronen-Bonusroute
    platforms.push(createPlat(2300, 400, 120, 24, 'platform_hard'));
    platforms.push(createPlat(3200, 660, 500, 40, 'grass'));
    platforms.push(...pitFloor(3520, 640, 120, 100, 'stone'));
    platforms.push(createPlat(3900, 660, 500, 40, 'grass'));
    platforms.push(createPlat(4650, 660, 700, 40, 'grass'));
    platforms.push(createPlat(5600, 660, 800, 40, 'grass'));
    platforms.push(createPlat(6550, 660, 700, 40, 'grass'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(180, 580, 720, 580, 4));
    coins.push(...coinTrail(700, 440, 820, 440, 4));
    coins.push(...coinArc(1050, 580, 5, 70, 90));
    coins.push(...coinTrail(1180, 570, 1800, 570, 4));
    coins.push(...coinLadder(2280, 620, 450, 5));
    coins.push(...coinTrail(2020, 580, 2380, 580, 3));
    coins.push(...coinArc(3580, 660, 5, 70, 80));
    coins.push(...coinTrail(3680, 580, 4120, 580, 4));
    coins.push(...coinTrail(4350, 580, 4950, 580, 4));
    coins.push(...coinTrail(5250, 580, 5950, 580, 4));
    coins.push(...coinArc(6080, 580, 5, 70, 80));
    coins.push(...coinTrail(6250, 580, 6800, 580, 4));

    return {
      id: 31, name: 'Waldweg', width: 7000, height: 800, biome: 'forest',
      platforms,
      movingPlatforms: [
        createMovingPlat(2280, 560, 110, 24, 'platform_easy', 'vertical', 80, 18),
      ],
      coins,
      questionBlocks: [
        createQB(350, 560, 'mushroom'),
        createQB(2100, 560, 'coin'),
        createQB(4700, 560, 'flower'),
        createQB(6300, 560, 'oneup'),
      ],
      enemies: [
        createEnemy(800, 620, 'goomba'),
        createEnemy(1250, 620, 'koopa'),
        createEnemy(1750, 620, 'goomba'),
        createEnemy(2250, 620, 'spiny'),
        createEnemy(3300, 620, 'robot'),
        createEnemy(4450, 620, 'crab'),
        createEnemy(5500, 620, 'goomba'),
        createEnemy(6400, 620, 'koopa'),
      ],
      decorations: [
        createDeco(200, 610, 'tree'),
        createDeco(420, 610, 'bush'),
        createDeco(900, 610, 'log'),
        createDeco(1250, 590, 'mushroom'),
        createDeco(1600, 540, 'vine'),
        createDeco(2100, 610, 'tree'),
        createDeco(2560, 520, 'mushroom'),
        createDeco(3000, 610, 'bush'),
        createDeco(3400, 610, 'log'),
        createDeco(4400, 610, 'tree'),
        createDeco(5000, 480, 'vine'),
        createDeco(5300, 610, 'bush'),
        createDeco(5700, 610, 'mushroom'),
        createDeco(6100, 610, 'log'),
        createDeco(6700, 610, 'tree'),
        createDeco(6900, 500, 'vine'),
      ],
      playerStart: { x: 150, y: 616 },
      goal: { x: 6650, y: 632 },
      timeBonus: 120,
      springs: [createSpring(1300, 640), createSpring(2400, 640)],
    };
  })(),

  // ============================================================
  // Level 32 (Lichtungssprünge): grosse Lichtungs-Lücken mit
  // gestaffelten Plattformen, Zwei-Ebenen-Route, bröckelndem
  // Ast als High-Risk-Abkürzung (sichere Solid-Route bleibt),
  // Feder zum hohen Münz-Balkon. 2 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(450, 680, 700, 40, 'grass'));
    platforms.push(...gapWithPlatforms(1, 800, 672, 420, 2, {
      widths: [110, 120], dy: [0, 40], types: ['platform_easy', 'platform_medium'],
    }));
    platforms.push(createPlat(1450, 680, 800, 40, 'grass'));
    platforms.push(...gapWithPlatforms(1, 1850, 672, 500, 2, {
      widths: [130, 110], dy: [30, 70], types: ['platform_medium', 'platform_hard'],
    }));
    platforms.push(createPlat(2700, 680, 900, 40, 'grass'));
    // Zwei-Ebenen-Route: unterer sicherer Weg, obere Coin-Route
    platforms.push(...twoTierSection(3150, 660, 900, 'grass', 'wood'));
    // High-Risk: bröckelnde Äste über der sicheren Solid-Stufe
    platforms.push(createPlat(4175, 620, 120, 24, 'platform_easy'));
    platforms.push(createCrumblePlat(4160, 500, 120, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(4330, 440, 120, 24, 'platform_medium'));
    platforms.push(createPlat(4800, 680, 800, 40, 'grass'));
    platforms.push(createPlat(5450, 380, 140, 24, 'platform_hard'));
    platforms.push(createPlat(5320, 600, 110, 24, 'platform_medium'));
    platforms.push(createPlat(5540, 540, 120, 24, 'platform_hard'));
    platforms.push(createPlat(6100, 680, 700, 40, 'grass'));
    platforms.push(createPlat(7100, 680, 900, 40, 'grass'));
    platforms.push(createPlat(8100, 680, 700, 40, 'grass'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(180, 600, 780, 600, 4));
    coins.push(...coinArc(1000, 560, 5, 70, 80));
    coins.push(...coinTrail(1120, 560, 1820, 560, 4));
    coins.push(...coinArc(2000, 540, 5, 70, 90));
    coins.push(...coinTrail(2300, 600, 3100, 600, 4));
    coins.push(...coinDiamond(3600, 380, 80));
    coins.push(...coinArc(4160, 420, 5, 70, 80));
    coins.push(...coinTrail(4450, 600, 5150, 600, 4));
    coins.push(...coinDiamond(5450, 290, 70));
    coins.push(...coinArc(5800, 480, 5, 80, 80));
    coins.push(...coinTrail(5800, 600, 6400, 600, 4));
    coins.push(...coinTrail(6700, 600, 7500, 600, 5));
    coins.push(...coinTrail(7800, 600, 8400, 600, 4));

    return {
      id: 32, name: 'Lichtungssprünge', width: 8800, height: 850, biome: 'forest',
      platforms,
      movingPlatforms: [
        createMovingPlat(1700, 600, 110, 24, 'platform_easy', 'horizontal', 100, 18),
        createMovingPlat(5680, 500, 110, 24, 'platform_easy', 'vertical', 90, 18),
        createMovingPlat(5700, 560, 110, 24, 'platform_medium', 'circular', 100, 18),
      ],
      coins,
      questionBlocks: [
        createQB(300, 580, 'mushroom'),
        createQB(2300, 580, 'coin'),
        createQB(2900, 580, 'flower'),
        createQB(6500, 580, 'star'),
      ],
      enemies: [
        createEnemy(900, 640, 'goomba'),
        createEnemy(1600, 640, 'koopa'),
        createEnemy(2400, 640, 'spiny'),
        createEnemy(3000, 640, 'robot'),
        createEnemy(3600, 620, 'crab'),
        createEnemy(4700, 640, 'goomba'),
        createEnemy(5000, 640, 'koopa'),
        createEnemy(5900, 640, 'spiny'),
        createEnemy(6800, 640, 'robot'),
        createEnemy(7300, 640, 'crab'),
        createEnemy(8000, 640, 'goomba'),
      ],
      decorations: [
        createDeco(250, 630, 'tree'),
        createDeco(700, 630, 'bush'),
        createDeco(1300, 630, 'log'),
        createDeco(2250, 630, 'mushroom'),
        createDeco(2850, 630, 'tree'),
        createDeco(3300, 480, 'vine'),
        createDeco(4300, 630, 'bush'),
        createDeco(4900, 630, 'log'),
        createDeco(5500, 330, 'mushroom'),
        createDeco(6200, 630, 'tree'),
        createDeco(7200, 630, 'vine'),
        createDeco(8200, 630, 'bush'),
      ],
      playerStart: { x: 150, y: 636 },
      goal: { x: 8250, y: 652 },
      timeBonus: 140,
      springs: [createSpring(3200, 660), createSpring(5195, 660)],
      spikes: [createSpike(4900, 652), createSpike(6100, 652)],
    };
  })(),

  // ============================================================
  // Level 33 (Wurzel-Labyrinth): verschlungene Wurzel-Terrassen,
  // Überhang-Passage, zwei Gruben und ein unterirdischer
  // Bonusraum hinter Tür + Schlüssel (nie Pflichtweg). 2 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(450, 700, 700, 40, 'grass'));
    platforms.push(...plateauSection(850, 680, [
      { dx: 0, dy: 0, w: 300, h: 40, type: 'wood' },
      { dx: 340, dy: 80, w: 260, h: 40, type: 'grass' },
      { dx: 640, dy: 160, w: 300, h: 40, type: 'stone' },
      { dx: 980, dy: 240, w: 280, h: 40, type: 'wood' },
    ]));
    platforms.push(createPlat(2350, 520, 180, 24, 'platform_medium'));
    platforms.push(createPlat(2600, 600, 160, 24, 'platform_easy'));
    platforms.push(createPlat(3100, 700, 700, 40, 'grass'));
    platforms.push(...overhangSection(3500, 680, 900, 3800, 200, 'stone'));
    platforms.push(createPlat(5000, 700, 900, 40, 'grass'));
    platforms.push(...pitFloor(5450, 680, 400, 160, 'stone'));
    platforms.push(createPlat(5970, 760, 160, 24, 'platform_medium'));
    platforms.push(createPlat(6200, 700, 300, 40, 'grass'));
    // Unterirdischer Bonusraum (Schlüssel + Tür)
    platforms.push(createPlat(6415, 700, 130, 40, 'stone'));
    platforms.push(createPlat(6980, 700, 640, 40, 'grass'));
    platforms.push(createPlat(6750, 900, 700, 40, 'stone'));
    platforms.push(createPlat(6380, 780, 60, 200, 'stone'));
    platforms.push(createPlat(6520, 780, 110, 24, 'platform_medium'));
    platforms.push(createPlat(6900, 800, 140, 24, 'wood'));
    platforms.push(createPlat(7450, 560, 140, 24, 'platform_hard'));
    platforms.push(createPlat(7850, 700, 700, 40, 'grass'));
    platforms.push(...pitFloor(8200, 680, 380, 160, 'stone'));
    platforms.push(createPlat(8700, 760, 160, 24, 'platform_medium'));
    platforms.push(createPlat(9250, 700, 800, 40, 'grass'));
    platforms.push(createPlat(9790, 660, 120, 24, 'platform_easy'));
    platforms.push(createPlat(10350, 700, 900, 40, 'grass'));
    // Bonus-Münzleiste über der vertikalen Aufzug-Plattform
    platforms.push(createPlat(5600, 420, 130, 24, 'platform_hard'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(180, 620, 780, 620, 4));
    coins.push(...coinTrail(880, 600, 1120, 600, 3));
    coins.push(...coinArc(1350, 520, 5, 70, 80));
    coins.push(...coinTrail(1550, 440, 1750, 440, 3));
    coins.push(...coinDiamond(2350, 430, 70));
    coins.push(...coinTrail(2800, 620, 3400, 620, 4));
    coins.push(...coinTrail(3550, 600, 3750, 600, 2));
    coins.push(...coinTrail(4050, 600, 4350, 600, 3));
    coins.push(...coinArc(5450, 780, 5, 80, 80));
    coins.push(...coinLadder(5600, 620, 460, 5));
    coins.push(...coinTrail(6450, 850, 6570, 850, 2));
    coins.push(...coinTrail(6680, 850, 7040, 850, 3));
    // Bonusraum-Schatz hinter der Tür
    coins.push(...coinDiamond(6850, 830, 50));
    coins.push(...coinTrail(7350, 480, 7550, 480, 3));
    coins.push(...coinTrail(7900, 620, 8150, 620, 3));
    coins.push(...coinTrail(8250, 780, 8550, 780, 3));
    coins.push(...coinTrail(8900, 620, 9600, 620, 5));
    coins.push(...coinTrail(9950, 600, 10700, 600, 5));

    return {
      id: 33, name: 'Wurzel-Labyrinth', width: 11000, height: 950, biome: 'forest',
      platforms,
      movingPlatforms: [
        createMovingPlat(5600, 600, 110, 24, 'platform_easy', 'vertical', 80, 18),
        createMovingPlat(8850, 560, 110, 24, 'platform_medium', 'circular', 90, 18),
      ],
      coins,
      questionBlocks: [
        createQB(400, 600, 'mushroom'),
        createQB(1350, 500, 'coin'),
        createQB(3300, 600, 'flower'),
        createQB(5150, 600, 'star'),
        createQB(6800, 800, 'oneup'),
        createQB(8000, 600, 'mushroom'),
        createQB(9400, 600, 'flower'),
      ],
      enemies: [
        createEnemy(900, 660, 'goomba'),
        createEnemy(1500, 500, 'koopa'),
        createEnemy(2300, 660, 'spiny'),
        createEnemy(3200, 660, 'robot'),
        createEnemy(4200, 660, 'crab'),
        createEnemy(4900, 660, 'goomba'),
        createEnemy(6300, 660, 'koopa'),
        createEnemy(6950, 860, 'robot'),
        createEnemy(7450, 528, 'spiny'),
        createEnemy(8100, 660, 'robot'),
        createEnemy(9400, 660, 'crab'),
      ],
      decorations: [
        createDeco(250, 650, 'tree'),
        createDeco(700, 650, 'bush'),
        createDeco(1200, 650, 'log'),
        createDeco(1650, 640, 'mushroom'),
        createDeco(2350, 470, 'vine'),
        createDeco(2900, 650, 'tree'),
        createDeco(3600, 650, 'bush'),
        createDeco(4300, 650, 'log'),
        createDeco(5100, 650, 'tree'),
        createDeco(5550, 650, 'mushroom'),
        createDeco(6450, 870, 'bush'),
        createDeco(6900, 650, 'vine'),
        createDeco(7500, 650, 'tree'),
        createDeco(8300, 650, 'log'),
        createDeco(9100, 650, 'bush'),
        createDeco(10400, 650, 'tree'),
      ],
      playerStart: { x: 150, y: 656 },
      goal: { x: 10500, y: 672 },
      timeBonus: 160,
      springs: [createSpring(6505, 880), createSpring(7600, 680)],
      spikes: [createSpike(5300, 672), createSpike(9100, 672)],
      keys: [createKey(7450, 510)],
      doors: [createDoor(6600, 800, 120, 160)],
    };
  })(),

  // ============================================================
  // Level 34 (Baumkronen): grosser Aufstieg über drei Kronen-
  // Ebenen (Boden → Mittelkrone → Hochkrone), Zwei-Ebenen-Route,
  // Insel-Cluster, Zickzack-Kletterer, Checkpoints. 2 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(450, 740, 700, 40, 'grass'));
    platforms.push(...staircase(850, 720, 2, 80, 140, 40, 'wood'));
    platforms.push(...twoTierSection(1220, 720, 900, 'grass', 'wood'));
    platforms.push(...zigzagClimb(2230, 720, 4, 80, 120, 110, 'platform_medium'));
    platforms.push(createPlat(2450, 420, 200, 24, 'wood'));
    platforms.push(...islandCluster(2650, 408, [
      { dx: 0, dy: 0, w: 160, type: 'wood' },
      { dx: 220, dy: 70, w: 140, type: 'platform_hard' },
      { dx: 460, dy: 0, w: 180, type: 'wood' },
    ]));
    platforms.push(createPlat(3450, 480, 160, 24, 'platform_medium'));
    platforms.push(createPlat(3850, 700, 800, 40, 'grass'));
    platforms.push(...pitFloor(4250, 680, 360, 160, 'stone'));
    platforms.push(createPlat(4700, 760, 160, 24, 'platform_medium'));
    platforms.push(createPlat(5200, 700, 1000, 40, 'grass'));
    platforms.push(createPlat(5850, 620, 120, 24, 'platform_easy'));
    platforms.push(createPlat(6500, 700, 1000, 40, 'grass'));
    platforms.push(...twoTierSection(7150, 680, 900, 'grass', 'wood'));
    platforms.push(...zigzagClimb(8150, 680, 4, 80, 120, 110, 'platform_medium'));
    platforms.push(createPlat(8360, 360, 140, 24, 'platform_hard'));
    platforms.push(createPlat(8580, 320, 120, 24, 'platform_medium'));
    // Hochkronen-Lauf
    platforms.push(createPlat(8870, 340, 200, 40, 'wood'));
    platforms.push(createPlat(9200, 340, 200, 40, 'wood'));
    platforms.push(createPlat(9500, 340, 180, 40, 'wood'));
    platforms.push(createPlat(9800, 320, 220, 40, 'wood'));
    platforms.push(createPlat(10100, 340, 180, 40, 'wood'));
    platforms.push(createPlat(10450, 320, 240, 40, 'wood'));
    platforms.push(createPlat(10800, 340, 200, 40, 'wood'));
    platforms.push(createPlat(11150, 320, 220, 40, 'wood'));
    platforms.push(createPlat(11500, 340, 200, 40, 'wood'));
    platforms.push(createPlat(11900, 320, 260, 40, 'wood'));
    platforms.push(createPlat(12350, 320, 300, 40, 'wood'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(180, 660, 780, 660, 4));
    coins.push(...coinTrail(880, 580, 1140, 580, 3));
    coins.push(...coinDiamond(1650, 440, 80));
    coins.push(...coinLadder(2280, 620, 380, 5));
    coins.push(...coinArc(2600, 340, 5, 70, 80));
    coins.push(...coinDiamond(2970, 260, 60));
    coins.push(...coinArc(3800, 620, 5, 70, 80));
    coins.push(...coinTrail(4300, 780, 4550, 780, 3));
    coins.push(...coinTrail(4800, 620, 5100, 620, 3));
    coins.push(...coinTrail(5300, 620, 5700, 620, 3));
    coins.push(...coinArc(6050, 560, 5, 70, 80));
    coins.push(...coinTrail(6600, 620, 6900, 620, 3));
    coins.push(...coinDiamond(7600, 360, 80));
    coins.push(...coinLadder(8200, 640, 300, 5));
    coins.push(...coinTrail(8900, 280, 9100, 280, 2));
    coins.push(...coinTrail(9300, 280, 9600, 280, 3));
    coins.push(...coinTrail(9900, 260, 10100, 260, 2));
    coins.push(...coinTrail(10400, 260, 10600, 260, 2));
    coins.push(...coinTrail(11000, 260, 11300, 260, 3));
    coins.push(...coinTrail(11700, 260, 11900, 260, 2));
    coins.push(...coinTrail(12100, 260, 12400, 260, 3));

    return {
      id: 34, name: 'Baumkronen', width: 12500, height: 950, biome: 'forest',
      platforms,
      movingPlatforms: [
        createMovingPlat(5700, 540, 110, 24, 'platform_medium', 'circular', 90, 18),
        createMovingPlat(5900, 560, 110, 24, 'platform_easy', 'vertical', 80, 18),
      ],
      coins,
      questionBlocks: [
        createQB(350, 600, 'mushroom'),
        createQB(1700, 480, 'coin'),
        createQB(2700, 330, 'flower'),
        createQB(3800, 600, 'star'),
        createQB(8500, 280, 'mushroom'),
      ],
      enemies: [
        createEnemy(900, 700, 'goomba'),
        createEnemy(1300, 700, 'spiny'),
        createEnemy(2000, 700, 'robot'),
        createEnemy(3000, 318, 'crab'),
        createEnemy(3600, 660, 'koopa'),
        createEnemy(5000, 660, 'goomba'),
        createEnemy(6300, 660, 'robot'),
        createEnemy(6800, 660, 'spiny'),
        createEnemy(8100, 660, 'crab'),
        createEnemy(9000, 300, 'spiny'),
        createEnemy(10500, 280, 'robot'),
      ],
      decorations: [
        createDeco(250, 690, 'tree'),
        createDeco(700, 690, 'bush'),
        createDeco(1350, 680, 'log'),
        createDeco(2500, 400, 'vine'),
        createDeco(3000, 280, 'mushroom'),
        createDeco(3700, 680, 'tree'),
        createDeco(4400, 800, 'bush'),
        createDeco(5400, 680, 'log'),
        createDeco(6700, 680, 'tree'),
        createDeco(7400, 400, 'mushroom'),
        createDeco(8600, 280, 'vine'),
        createDeco(9700, 280, 'bush'),
        createDeco(10900, 280, 'log'),
        createDeco(12200, 280, 'tree'),
      ],
      playerStart: { x: 150, y: 696 },
      goal: { x: 12350, y: 292 },
      timeBonus: 200,
      checkpoints: [
        createCheckpoint(1500, 700),
        createCheckpoint(3200, 388),
        createCheckpoint(7400, 660),
      ],
      springs: [createSpring(5200, 680), createSpring(9500, 320)],
      spikes: [createSpike(3700, 672), createSpike(6600, 672)],
    };
  })(),

  // ============================================================
  // Level 35 (Käferhorde): Kampf-Arenen mit 20 Gegnern auf
  // Terrassen, Zwei-Ebenen-Route, Vertikal-Aufzug zur Münz-
  // leiste, grosszügige Münzbelohnung. 3 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(450, 700, 800, 40, 'grass'));
    platforms.push(...plateauSection(900, 680, [
      { dx: 0, dy: 0, w: 400, h: 40, type: 'grass' },
      { dx: 450, dy: 100, w: 300, h: 40, type: 'wood' },
      { dx: 800, dy: 0, w: 350, h: 40, type: 'grass' },
    ]));
    platforms.push(createPlat(2400, 700, 700, 40, 'grass'));
    platforms.push(...gapWithPlatforms(1, 2750, 692, 420, 2, {
      widths: [110, 130], dy: [20, 50], types: ['platform_easy', 'platform_medium'],
    }));
    platforms.push(createPlat(3400, 700, 800, 40, 'grass'));
    platforms.push(...twoTierSection(3800, 680, 800, 'grass', 'wood'));
    platforms.push(createPlat(4900, 700, 700, 40, 'grass'));
    platforms.push(createPlat(5000, 580, 300, 40, 'wood'));
    platforms.push(...gapWithPlatforms(1, 5250, 692, 400, 2, {
      widths: [120, 110], dy: [0, 30], types: ['platform_medium', 'platform_easy'],
    }));
    platforms.push(createPlat(6050, 700, 900, 40, 'grass'));
    // Vertikaler Aufzug zur Münzleiste
    platforms.push(createPlat(5880, 400, 130, 24, 'platform_hard'));
    platforms.push(createPlat(6620, 660, 120, 24, 'platform_easy'));
    platforms.push(createPlat(7100, 700, 700, 40, 'grass'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(180, 620, 780, 620, 4));
    coins.push(...coinArc(1050, 600, 5, 70, 80));
    coins.push(...coinTrail(1400, 520, 1600, 520, 3));
    coins.push(...coinTrail(2200, 620, 2700, 620, 4));
    coins.push(...coinArc(2900, 600, 5, 70, 80));
    coins.push(...coinTrail(3150, 600, 3350, 600, 2));
    coins.push(...coinDiamond(4200, 460, 80));
    coins.push(...coinLadder(5880, 620, 440, 5));
    coins.push(...coinTrail(4700, 620, 5150, 620, 4));
    coins.push(...coinTrail(5300, 560, 5550, 560, 3));
    coins.push(...coinArc(6100, 600, 5, 70, 80));
    coins.push(...coinTrail(6300, 620, 6700, 620, 3));
    coins.push(...coinTrail(6900, 620, 7400, 620, 4));

    return {
      id: 35, name: 'Käfer-Plage', width: 7600, height: 850, biome: 'forest',
      platforms,
      movingPlatforms: [
        createMovingPlat(4300, 620, 110, 24, 'platform_easy', 'horizontal', 90, 18),
        createMovingPlat(5880, 560, 110, 24, 'platform_easy', 'vertical', 90, 18),
      ],
      coins,
      questionBlocks: [
        createQB(500, 600, 'mushroom'),
        createQB(1100, 600, 'coin'),
        createQB(2500, 600, 'flower'),
        createQB(3650, 600, 'star'),
        createQB(4950, 480, 'mushroom'),
        createQB(6350, 600, 'oneup'),
      ],
      enemies: [
        createEnemy(750, 660, 'goomba'),
        createEnemy(1150, 660, 'koopa'),
        createEnemy(1450, 560, 'goomba'),
        createEnemy(1600, 560, 'spiny'),
        createEnemy(1900, 660, 'robot'),
        createEnemy(2300, 660, 'crab'),
        createEnemy(2600, 660, 'goomba'),
        createEnemy(2890, 640, 'spiny'),
        createEnemy(3150, 660, 'robot'),
        createEnemy(3300, 660, 'koopa'),
        createEnemy(3500, 660, 'goomba'),
        createEnemy(3900, 660, 'crab'),
        createEnemy(4400, 660, 'spiny'),
        createEnemy(4700, 660, 'goomba'),
        createEnemy(5100, 660, 'robot'),
        createEnemy(5500, 660, 'crab'),
        createEnemy(5700, 660, 'koopa'),
        createEnemy(6200, 660, 'goomba'),
        createEnemy(6600, 660, 'spiny'),
        createEnemy(7300, 660, 'robot'),
      ],
      decorations: [
        createDeco(250, 650, 'tree'),
        createDeco(700, 650, 'bush'),
        createDeco(1050, 650, 'log'),
        createDeco(1750, 650, 'mushroom'),
        createDeco(2500, 650, 'tree'),
        createDeco(3450, 650, 'bush'),
        createDeco(4150, 650, 'log'),
        createDeco(5050, 540, 'mushroom'),
        createDeco(5950, 650, 'tree'),
        createDeco(6450, 650, 'vine'),
        createDeco(7250, 650, 'bush'),
      ],
      playerStart: { x: 150, y: 656 },
      goal: { x: 7150, y: 672 },
      timeBonus: 150,
      springs: [createSpring(2500, 680), createSpring(6200, 680)],
      spikes: [createSpike(2300, 672), createSpike(3500, 672), createSpike(6100, 672)],
    };
  })(),

  // ============================================================
  // Level 36 (Wipfelpfad-Finale): Baumkronen-Finale gegen
  // fallende Äste (Engine-ID 36) — Deckung durch Kronendächer
  // (Cover-Decks + Überhänge), Zwei-Ebenen-Auftakt, bröckelnde
  // Äste mit sicherer Solid-Route, 3 Checkpoints, Münz-Tor.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(400, 800, 700, 40, 'grass'));
    platforms.push(...staircase(850, 780, 3, 75, 130, 40, 'wood'));
    platforms.push(...twoTierSection(1350, 780, 1000, 'grass', 'wood'));
    platforms.push(...pitFloor(2350, 780, 400, 180, 'stone'));
    platforms.push(createPlat(2820, 860, 160, 24, 'platform_medium'));
    platforms.push(createPlat(3250, 800, 800, 40, 'grass'));
    // Aufstieg aufs erste Kronendach
    platforms.push(createPlat(3800, 660, 150, 24, 'platform_medium'));
    platforms.push(createPlat(4100, 560, 150, 24, 'platform_medium'));
    platforms.push(createPlat(4500, 560, 900, 40, 'wood'));
    // Kronendach = Deckung gegen fallende Äste
    platforms.push(createPlat(4650, 420, 700, 40, 'wood'));
    platforms.push(createCrumblePlat(5100, 480, 140, 24, 'platform_medium'));
    platforms.push(createPlat(5250, 620, 150, 24, 'platform_easy'));
    platforms.push(createPlat(5900, 800, 900, 40, 'grass'));
    platforms.push(...overhangSection(6450, 780, 900, 6850, 200, 'wood'));
    platforms.push(createPlat(6900, 660, 300, 40, 'wood'));
    platforms.push(createPlat(7900, 800, 900, 40, 'grass'));
    // Zweiter Aufstieg + zweites Kronendach
    platforms.push(createPlat(8500, 660, 150, 24, 'platform_medium'));
    platforms.push(createPlat(8800, 560, 150, 24, 'platform_medium'));
    platforms.push(createPlat(9250, 540, 900, 40, 'wood'));
    platforms.push(createPlat(9450, 400, 700, 40, 'wood'));
    platforms.push(createCrumblePlat(9850, 460, 140, 24, 'platform_medium'));
    platforms.push(createPlat(10000, 600, 150, 24, 'platform_easy'));
    platforms.push(createPlat(10500, 800, 900, 40, 'grass'));
    platforms.push(...overhangSection(11050, 780, 1000, 11550, 220, 'wood'));
    platforms.push(createPlat(11650, 660, 260, 40, 'wood'));
    platforms.push(createPlat(12500, 800, 800, 40, 'grass'));
    // Schlussaufstieg zum Wipfel
    platforms.push(...staircase(12950, 780, 3, 75, 130, 50, 'wood'));
    platforms.push(createPlat(13900, 580, 700, 40, 'wood'));
    platforms.push(createPlat(14600, 580, 600, 40, 'wood'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(180, 740, 700, 740, 4));
    coins.push(...coinArc(950, 700, 5, 70, 80));
    coins.push(...coinDiamond(1600, 560, 80));
    coins.push(...coinTrail(2450, 900, 2700, 900, 3));
    coins.push(...coinTrail(2900, 780, 3150, 780, 3));
    coins.push(...coinArc(3850, 560, 5, 70, 80));
    coins.push(...coinTrail(4550, 480, 4900, 480, 4));
    coins.push(...coinDiamond(5450, 420, 70));
    coins.push(...coinTrail(5500, 760, 5800, 760, 4));
    coins.push(...coinTrail(6550, 560, 6800, 560, 3));
    coins.push(...coinTrail(7500, 760, 7800, 760, 4));
    coins.push(...coinArc(8550, 560, 5, 70, 80));
    coins.push(...coinTrail(9350, 460, 9600, 460, 3));
    coins.push(...coinDiamond(10300, 420, 70));
    coins.push(...coinTrail(10600, 760, 10900, 760, 4));
    coins.push(...coinTrail(11150, 560, 11400, 560, 3));
    coins.push(...coinTrail(12150, 760, 12850, 760, 5));
    coins.push(...coinLadder(13050, 640, 480, 5));
    coins.push(...coinTrail(13500, 400, 13800, 400, 3));
    coins.push(...coinTrail(14000, 520, 14400, 520, 4));

    return {
      id: 36, name: 'Wipfelpfad', width: 15200, height: 1000, biome: 'forest',
      platforms,
      movingPlatforms: [
        createMovingPlat(6200, 620, 110, 24, 'platform_easy', 'vertical', 80, 18),
        createMovingPlat(8900, 680, 110, 24, 'platform_medium', 'circular', 90, 18),
      ],
      coins,
      questionBlocks: [
        createQB(400, 700, 'mushroom'),
        createQB(1900, 540, 'coin'),
        createQB(3600, 700, 'flower'),
        createQB(5280, 520, 'star'),
        createQB(7100, 700, 'mushroom'),
        createQB(9300, 500, 'flower'),
        createQB(12300, 700, 'star'),
      ],
      enemies: [
        createEnemy(900, 760, 'goomba'),
        createEnemy(1400, 760, 'spiny'),
        createEnemy(2000, 760, 'robot'),
        createEnemy(3000, 760, 'koopa'),
        createEnemy(3500, 760, 'goomba'),
        createEnemy(4900, 520, 'crab'),
        createEnemy(5600, 760, 'spiny'),
        createEnemy(6100, 760, 'robot'),
        createEnemy(7900, 760, 'crab'),
        createEnemy(8200, 760, 'goomba'),
        createEnemy(9500, 500, 'spiny'),
        createEnemy(10400, 760, 'koopa'),
        createEnemy(12500, 760, 'robot'),
        createEnemy(13800, 540, 'crab'),
      ],
      decorations: [
        createDeco(250, 750, 'tree'),
        createDeco(650, 750, 'bush'),
        createDeco(1000, 700, 'vine'),
        createDeco(1600, 740, 'log'),
        createDeco(2500, 900, 'bush'),
        createDeco(3100, 760, 'mushroom'),
        createDeco(3900, 620, 'tree'),
        createDeco(4800, 500, 'vine'),
        createDeco(6000, 760, 'log'),
        createDeco(7000, 620, 'bush'),
        createDeco(8000, 760, 'tree'),
        createDeco(9300, 480, 'mushroom'),
        createDeco(10600, 760, 'log'),
        createDeco(11700, 620, 'bush'),
        createDeco(12600, 760, 'tree'),
        createDeco(13700, 540, 'vine'),
        createDeco(14700, 540, 'bush'),
      ],
      playerStart: { x: 150, y: 756 },
      goal: { x: 14600, y: 552 },
      timeBonus: 250,
      checkpoints: [
        createCheckpoint(1500, 760),
        createCheckpoint(10600, 760),
        createCheckpoint(12400, 760),
      ],
      springs: [createSpring(3200, 780), createSpring(5900, 780), createSpring(10550, 780)],
      spikes: [
        createSpike(3300, 772),
        createSpike(5950, 772),
        createSpike(7700, 772),
        createSpike(12800, 772),
      ],
      coinGoal: 40,
      fallingHazards: { intervalMs: 2500 },
    };
  })(),
];

// Individually anchored landscape, reward and recovery polish; original jump tops stay fixed.
export const FOREST_LEVELS: LevelData[] = FOREST_AUTHORED_LEVELS.map(polishNatureLevel);

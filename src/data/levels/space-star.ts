// Space Star (ids 79-84) — Phase 9 rebuild
// Archetypes: 79 Orbit, 80 Asteroidenfeld, 81 Raumstation,
// 82 Satelliten-Kletterer, 83 UFO-Horde, 84 Nova-Finale.
// Low gravity is 1000: safe rises <=330px, safe same-height gaps <=420px.
// The levels really use that reach: wide island chains, tall towers,
// circular orbit platforms and long asteroid hops.
// All levels are authored solvable (ensureSolvable adds nothing).

import {
  LevelData, createPlat, createQB, createEnemy, createDeco,
  createMovingPlat, createSpring, createSpike, createCrumblePlat,
  createCheckpoint, createKey, createDoor,
  staircase, plateauSection, twoTierSection, islandCluster,
  zigzagClimb, coinArc, coinDiamond, coinTrail, coinLadder,
  gapWithPlatforms,
} from './helpers';

export const SPACE_STAR_LEVELS: LevelData[] = [
  // ============================================================
  // Level 79 (Orbit): weiter Orbit-Ring mit Inselkette, circularer
  // Orbit-Bahn und vertikalem Aufzug, Feder zum Hochplateau,
  // Treppenaufstieg zur Zielplattform. 2 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(...plateauSection(0, 820, [
      { dx: 0, dy: 0, w: 1400, h: 40, type: 'space' },              // top 820 [0,1400]
      { dx: 1600, dy: 52, w: 300, h: 24, type: 'platform_medium' }, // top 768
    ]));
    platforms.push(createPlat(1100, 492, 220, 24, 'platform_hard')); // top 480 Feder-Plateau
    platforms.push(...islandCluster(2100, 768, [
      { dx: 0, dy: 0, w: 240, type: 'space' },                      // top 768 [2100,2340]
      { dx: 380, dy: 80, w: 200, type: 'platform_easy' },           // top 688
      { dx: 740, dy: 170, w: 220, type: 'platform_medium' },        // top 598
    ]));
    platforms.push(createPlat(3750, 560, 400, 24, 'platform_hard')); // top 548
    platforms.push(createPlat(4500, 240, 300, 24, 'platform_hard')); // top 228
    platforms.push(createPlat(4950, 180, 200, 24, 'platform_medium')); // top 168 Mond-Bonus
    platforms.push(createPlat(5200, 600, 400, 24, 'space'));        // top 588
    platforms.push(createPlat(6000, 560, 500, 40, 'space'));        // top 540
    platforms.push(...staircase(6250, 540, 3, 80, 150, 45, 'space')); // tops 460/380/300
    platforms.push(createPlat(7100, 300, 300, 24, 'platform_hard')); // top 288
    platforms.push(createPlat(7900, 480, 600, 40, 'space'));        // top 460 Ziel [7600,8200]

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(200, 740, 950, 740, 4));
    coins.push(...coinArc(1100, 560, 5, 80, 70));
    coins.push(...coinDiamond(1100, 400, 70));
    coins.push(...coinTrail(1650, 700, 1950, 700, 3));
    coins.push(...coinArc(2200, 620, 5, 90, 80));
    coins.push(...coinDiamond(2950, 520, 60));
    coins.push(...coinArc(3250, 560, 5, 90, 80));
    coins.push(...coinLadder(4500, 200, 80, 4));
    coins.push(...coinDiamond(4950, 100, 70));
    coins.push(...coinTrail(5100, 520, 5350, 520, 3));
    coins.push(...coinArc(6050, 480, 5, 80, 70));
    coins.push(...coinTrail(6400, 380, 6700, 380, 3));
    coins.push(...coinTrail(7400, 400, 8000, 400, 4));

    return {
      id: 79, name: 'Orbit', width: 8600, height: 1000, biome: 'space-star',
      platforms,
      movingPlatforms: [
        createMovingPlat(3250, 640, 120, 24, 'platform_easy', 'circular', 120, 20),
        createMovingPlat(4200, 420, 120, 24, 'platform_medium', 'vertical', 150, 20),
      ],
      coins,
      questionBlocks: [
        createQB(350, 720, 'mushroom'),
        createQB(2120, 668, 'coin'),
        createQB(5200, 488, 'flower'),
        createQB(6300, 360, 'star'),
        createQB(8100, 360, 'coin'),
      ],
      enemies: [
        createEnemy(800, 800, 'robot'),
        createEnemy(1700, 748, 'robot'),
        createEnemy(2580, 668, 'robot'),
        createEnemy(2950, 578, 'robot'),
        createEnemy(6000, 520, 'robot'),
        createEnemy(7100, 268, 'robot'),
        createEnemy(2300, 500, 'ufo'),
        createEnemy(4400, 320, 'ufo'),
        createEnemy(6800, 180, 'ufo'),
        createEnemy(5000, 300, 'ghost'),
      ],
      decorations: [
        createDeco(600, 520, 'planet'),
        createDeco(1600, 420, 'satellite'),
        createDeco(2400, 320, 'asteroid'),
        createDeco(3600, 300, 'rocket'),
        createDeco(5200, 260, 'planet'),
        createDeco(7000, 200, 'satellite'),
        createDeco(7800, 320, 'star'),
        createDeco(300, 780, 'asteroid'),
      ],
      playerStart: { x: 250, y: 796 },
      goal: { x: 7900, y: 460 },
      timeBonus: 150,
      springs: [createSpring(1000, 820)],
      spikes: [createSpike(1200, 812), createSpike(2900, 590)],
    };
  })(),

  // ============================================================
  // Level 80 (Asteroidenfeld): weite Inselkette, brueckelnde
  // Asteroiden-Bruecke mit sicherer Schluchtroute darunter,
  // circulare Bahn ueber den Kern, vertikaler Aufzug. 2 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(600, 860, 1200, 40, 'space'));        // top 840 [0,1200]
    platforms.push(createPlat(1150, 520, 180, 24, 'platform_hard')); // top 508 Feder-Plateau
    platforms.push(...islandCluster(1300, 840, [
      { dx: 0, dy: 40, w: 200, type: 'platform_medium' },          // top 800 [1300,1500]
      { dx: 320, dy: 0, w: 180, type: 'space' },                   // top 840
      { dx: 620, dy: 90, w: 220, type: 'platform_easy' },          // top 750
    ]));
    // Brueckel-Asteroiden (schnelle obere Route)
    platforms.push(createCrumblePlat(2350, 700, 120, 24));           // top 688
    platforms.push(createCrumblePlat(2600, 620, 120, 24));           // top 608
    platforms.push(createCrumblePlat(2850, 540, 120, 24));           // top 528
    platforms.push(createCrumblePlat(3100, 460, 120, 24));           // top 448
    platforms.push(createPlat(3400, 380, 300, 24, 'platform_hard')); // top 368 Bonus
    // Sichere Route durch die Schlucht
    platforms.push(createPlat(2800, 980, 1600, 40, 'stone'));        // top 960 [2000,3600]
    platforms.push(createPlat(3750, 900, 300, 24, 'platform_easy')); // top 888 Ausstieg
    platforms.push(createPlat(4400, 860, 700, 40, 'space'));         // top 840 [4050,4750]
    platforms.push(createPlat(5600, 720, 400, 24, 'platform_easy')); // top 708
    platforms.push(createPlat(6300, 680, 400, 40, 'space'));         // top 660 [6100,6500]
    platforms.push(createPlat(6900, 620, 300, 24, 'platform_medium')); // top 608
    platforms.push(createPlat(7700, 340, 350, 24, 'platform_hard')); // top 328
    platforms.push(createPlat(8400, 560, 600, 40, 'space'));         // top 540 Ziel [8100,8700]

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(200, 780, 1000, 780, 4));
    coins.push(...coinArc(1150, 440, 5, 80, 70));
    coins.push(...coinDiamond(1400, 720, 70));
    coins.push(...coinTrail(1650, 760, 1950, 760, 3));
    coins.push(...coinArc(2350, 620, 5, 80, 70));
    coins.push(...coinDiamond(2600, 380, 60));
    coins.push(...coinLadder(3400, 320, 100, 4));
    coins.push(...coinTrail(2200, 1000, 2900, 1000, 3));
    coins.push(...coinArc(3750, 820, 5, 80, 70));
    coins.push(...coinTrail(4200, 760, 4600, 760, 3));
    coins.push(...coinArc(5100, 700, 5, 90, 80));
    coins.push(...coinTrail(5700, 640, 6050, 640, 3));
    coins.push(...coinTrail(6350, 600, 6650, 600, 3));
    coins.push(...coinDiamond(6900, 540, 60));
    coins.push(...coinTrail(7500, 260, 7800, 260, 3));
    coins.push(...coinTrail(8200, 480, 8600, 480, 3));

    return {
      id: 80, name: 'Asteroidenfeld', width: 9000, height: 1000, biome: 'space-star',
      platforms,
      movingPlatforms: [
        createMovingPlat(5100, 780, 120, 24, 'platform_medium', 'circular', 130, 20),
        createMovingPlat(7300, 500, 120, 24, 'platform_medium', 'vertical', 140, 20),
      ],
      coins,
      questionBlocks: [
        createQB(400, 740, 'mushroom'),
        createQB(4000, 740, 'oneup'),
        createQB(6300, 560, 'coin'),
        createQB(7700, 228, 'star'),
      ],
      enemies: [
        createEnemy(500, 820, 'robot'),
        createEnemy(1400, 780, 'robot'),
        createEnemy(2030, 730, 'robot'),
        createEnemy(3300, 940, 'robot'),
        createEnemy(4300, 820, 'robot'),
        createEnemy(5600, 688, 'robot'),
        createEnemy(6300, 640, 'robot'),
        createEnemy(6900, 588, 'robot'),
        createEnemy(2500, 420, 'ufo'),
        createEnemy(4800, 520, 'ufo'),
        createEnemy(7200, 300, 'ufo'),
        createEnemy(8000, 280, 'ufo'),
      ],
      decorations: [
        createDeco(500, 400, 'planet'),
        createDeco(1800, 300, 'asteroid'),
        createDeco(2600, 200, 'asteroid'),
        createDeco(3200, 260, 'satellite'),
        createDeco(4600, 380, 'rocket'),
        createDeco(6200, 300, 'planet'),
        createDeco(7500, 180, 'asteroid'),
        createDeco(8300, 320, 'star'),
      ],
      playerStart: { x: 250, y: 816 },
      goal: { x: 8400, y: 540 },
      timeBonus: 160,
      springs: [createSpring(1000, 840)],
      spikes: [createSpike(1100, 832), createSpike(2500, 952)],
    };
  })(),

  // ============================================================
  // Level 81 (Raumstation): Dockingbay, Zwei-Ebenen-Halle,
  // Zickzack-Schacht, circularer Aussenring mit Schluessel,
  // Bonusraum hinter Tuer (oneup), vertikaler Aufzug zum
  // Beobachtungsdeck, Zickzack zum Katwalk, Endkorridor.
  // 2 Checkpoints, 2 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(...plateauSection(0, 860, [
      { dx: 0, dy: 0, w: 1400, h: 40, type: 'metal' },              // top 860 [0,1400]
      { dx: 1500, dy: 20, w: 600, h: 40, type: 'metal' },           // top 840 [1500,2100]
    ]));
    platforms.push(...twoTierSection(2100, 840, 1000, 'metal', 'platform_medium')); // unten top 840, oben top 680
    platforms.push(...zigzagClimb(3200, 840, 4, 90, 110, 130, 'platform_medium')); // tops 750/660/570/480
    platforms.push(createPlat(3700, 420, 700, 40, 'metal'));         // top 400 [3350,4050]
    platforms.push(createPlat(4800, 200, 500, 24, 'platform_hard')); // top 188 Aussenring [4550,5050]
    platforms.push(createPlat(5400, 680, 600, 40, 'metal'));         // top 660 [5100,5700]
    platforms.push(createPlat(6050, 740, 500, 40, 'metal'));         // top 720 Bonusraum [5800,6300]
    platforms.push(createPlat(6500, 260, 400, 24, 'platform_easy')); // top 248 Laufsteg
    platforms.push(createPlat(7300, 300, 800, 40, 'metal'));         // top 280 Beobachtungsdeck [6900,7700]
    platforms.push(createPlat(7900, 240, 300, 24, 'platform_medium')); // top 228
    platforms.push(...zigzagClimb(8300, 228, 3, 70, 110, 130, 'platform_medium')); // tops 158/88/18
    platforms.push(createPlat(9000, 120, 500, 40, 'metal'));         // top 100 Katwalk [8750,9250]
    platforms.push(createPlat(9900, 220, 600, 40, 'metal'));         // top 200 [9600,10200]
    platforms.push(createPlat(11000, 300, 800, 40, 'space'));        // top 280 [10600,11400]
    platforms.push(createPlat(11900, 260, 600, 40, 'metal'));        // top 240 Ziel [11600,12200]

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(200, 800, 1000, 800, 4));
    coins.push(...coinArc(1800, 780, 5, 80, 70));
    coins.push(...coinArc(2600, 760, 5, 90, 80));
    coins.push(...coinLadder(2266, 620, 520, 4));
    coins.push(...coinArc(3330, 680, 5, 80, 70));
    coins.push(...coinTrail(3450, 320, 3950, 320, 4));
    coins.push(...coinArc(4400, 280, 5, 90, 80));
    coins.push(...coinDiamond(4800, 120, 70));
    coins.push(...coinTrail(5150, 580, 5600, 580, 4));
    coins.push(...coinTrail(5950, 660, 6250, 660, 3));
    coins.push(...coinArc(6500, 180, 5, 80, 70));
    coins.push(...coinTrail(7000, 200, 7600, 200, 4));
    coins.push(...coinTrail(8800, 40, 9200, 40, 3));
    coins.push(...coinTrail(9700, 140, 10150, 140, 3));
    coins.push(...coinTrail(10800, 220, 11350, 220, 4));
    coins.push(...coinTrail(11700, 180, 12150, 180, 3));

    return {
      id: 81, name: 'Raumstation', width: 12600, height: 1100, biome: 'space-star',
      platforms,
      movingPlatforms: [
        createMovingPlat(4400, 360, 120, 24, 'platform_easy', 'circular', 140, 22),
        createMovingPlat(6100, 480, 120, 24, 'platform_medium', 'vertical', 160, 20),
      ],
      coins,
      questionBlocks: [
        createQB(400, 760, 'mushroom'),
        createQB(1700, 740, 'coin'),
        createQB(3500, 300, 'flower'),
        createQB(6150, 620, 'oneup'),
        createQB(7100, 180, 'star'),
        createQB(11900, 140, 'coin'),
      ],
      enemies: [
        createEnemy(600, 840, 'robot'),
        createEnemy(1800, 820, 'robot'),
        createEnemy(2600, 820, 'robot'),
        createEnemy(3700, 380, 'robot'),
        createEnemy(6500, 228, 'robot'),
        createEnemy(7300, 260, 'robot'),
        createEnemy(9900, 180, 'robot'),
        createEnemy(11900, 220, 'robot'),
        createEnemy(4400, 200, 'ufo'),
        createEnemy(6800, 140, 'ufo'),
        createEnemy(10400, 180, 'ufo'),
        createEnemy(5500, 400, 'ghost'),
      ],
      decorations: [
        createDeco(300, 700, 'satellite'),
        createDeco(1500, 500, 'rocket'),
        createDeco(2900, 400, 'planet'),
        createDeco(4200, 200, 'satellite'),
        createDeco(5700, 300, 'asteroid'),
        createDeco(6700, 100, 'star'),
        createDeco(8400, 100, 'satellite'),
        createDeco(10200, 120, 'planet'),
        createDeco(11500, 180, 'rocket'),
      ],
      playerStart: { x: 250, y: 836 },
      goal: { x: 11900, y: 240 },
      timeBonus: 200,
      checkpoints: [
        createCheckpoint(7300, 264),
        createCheckpoint(9000, 84),
      ],
      springs: [createSpring(1000, 860)],
      spikes: [createSpike(1100, 852), createSpike(7400, 272)],
      keys: [createKey(4900, 148)],
      doors: [createDoor(5900, 640, 40, 160)],
    };
  })(),

  // ============================================================
  // Level 82 (Satelliten-Kletterer): weiter Aufstieg ueber
  // Zickzack, circularer Satelliten-Orbit, vertikale Aufzuege,
  // sichere Treppenroute parallel zur Brueckel-Abkuerzung,
  // langer Abstieg zum Ziel. 3 Checkpoints, 2 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(700, 1040, 1400, 40, 'space'));        // top 1020 [0,1400]
    platforms.push(createPlat(1600, 960, 300, 24, 'platform_easy')); // top 948
    platforms.push(...zigzagClimb(1900, 948, 5, 90, 110, 130, 'platform_medium')); // tops 858..498
    platforms.push(createPlat(2400, 460, 350, 24, 'platform_hard')); // top 448
    platforms.push(createPlat(3250, 260, 400, 24, 'platform_easy')); // top 248 Satellit
    platforms.push(createPlat(4100, 300, 600, 40, 'metal'));         // top 280 Station [3800,4400]
    platforms.push(...staircase(4400, 280, 3, 80, 150, 45, 'metal')); // tops 200/120/40
    platforms.push(createPlat(5250, 60, 300, 24, 'platform_easy'));  // top 48 sichere Route
    platforms.push(createPlat(5750, 40, 250, 24, 'platform_medium')); // top 28
    platforms.push(createPlat(6300, 100, 500, 40, 'space'));         // top 80 Deck [6050,6550]
    platforms.push(createCrumblePlat(6750, 80, 120, 24));            // top 68 Brueckel-Abkuerzung
    platforms.push(createCrumblePlat(7000, 60, 120, 24));            // top 48
    platforms.push(createPlat(7300, 200, 500, 40, 'metal'));         // top 180 Landung [7050,7550]
    platforms.push(createPlat(8100, 360, 600, 40, 'metal'));         // top 340 [7800,8400]
    platforms.push(createPlat(9000, 500, 700, 40, 'space'));         // top 480 [8650,9350]
    platforms.push(createPlat(10000, 620, 700, 40, 'metal'));        // top 600 [9650,10350]
    platforms.push(createPlat(10900, 700, 700, 40, 'space'));        // top 680 [10550,11250]
    platforms.push(createPlat(11900, 780, 800, 40, 'space'));        // top 760 Ziel [11500,12300]

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(200, 960, 1000, 960, 4));
    coins.push(...coinArc(1300, 880, 5, 80, 70));
    coins.push(...coinArc(2100, 780, 5, 90, 80));
    coins.push(...coinDiamond(2400, 380, 70));
    coins.push(...coinArc(2850, 300, 5, 80, 70));
    coins.push(...coinDiamond(3250, 180, 70));
    coins.push(...coinArc(3700, 320, 5, 80, 70));
    coins.push(...coinTrail(3850, 220, 4250, 220, 4));
    coins.push(...coinLadder(4100, 200, 20, 4));
    coins.push(...coinTrail(5150, 0, 5600, 0, 4));
    coins.push(...coinArc(6300, 20, 5, 80, 70));
    coins.push(...coinTrail(6800, 0, 7150, 0, 3));
    coins.push(...coinArc(7300, 120, 5, 80, 70));
    coins.push(...coinTrail(7900, 280, 8300, 280, 3));
    coins.push(...coinTrail(8800, 420, 9250, 420, 3));
    coins.push(...coinTrail(9800, 540, 10250, 540, 3));
    coins.push(...coinTrail(10700, 620, 11150, 620, 3));
    coins.push(...coinTrail(11700, 700, 12250, 700, 4));

    return {
      id: 82, name: 'Satelliten-Kletterer', width: 12600, height: 1150, biome: 'space-star',
      platforms,
      movingPlatforms: [
        createMovingPlat(2850, 380, 120, 24, 'platform_medium', 'circular', 130, 20),
        createMovingPlat(3700, 400, 120, 24, 'platform_medium', 'vertical', 170, 20),
        createMovingPlat(6850, 260, 120, 24, 'platform_medium', 'vertical', 180, 20),
      ],
      coins,
      questionBlocks: [
        createQB(400, 920, 'mushroom'),
        createQB(3900, 180, 'flower'),
        createQB(9200, 380, 'star'),
        createQB(11900, 660, 'coin'),
      ],
      enemies: [
        createEnemy(700, 1000, 'robot'),
        createEnemy(1600, 928, 'robot'),
        createEnemy(2400, 428, 'robot'),
        createEnemy(3250, 228, 'robot'),
        createEnemy(4100, 260, 'robot'),
        createEnemy(7300, 160, 'robot'),
        createEnemy(8100, 320, 'robot'),
        createEnemy(10000, 580, 'robot'),
        createEnemy(2800, 200, 'ufo'),
        createEnemy(6000, 200, 'ufo'),
        createEnemy(8600, 300, 'ufo'),
        createEnemy(11000, 500, 'ufo'),
        createEnemy(5000, 300, 'ghost'),
      ],
      decorations: [
        createDeco(300, 940, 'asteroid'),
        createDeco(1200, 700, 'planet'),
        createDeco(2200, 500, 'satellite'),
        createDeco(3400, 300, 'rocket'),
        createDeco(4600, 100, 'planet'),
        createDeco(6200, 0, 'satellite'),
        createDeco(7600, 80, 'star'),
        createDeco(8800, 240, 'asteroid'),
        createDeco(10400, 400, 'planet'),
        createDeco(11500, 560, 'satellite'),
      ],
      playerStart: { x: 250, y: 996 },
      goal: { x: 11900, y: 760 },
      timeBonus: 190,
      checkpoints: [
        createCheckpoint(4100, 264),
        createCheckpoint(7300, 164),
        createCheckpoint(10000, 584),
      ],
      springs: [createSpring(1300, 1020)],
      spikes: [createSpike(1000, 1012), createSpike(7900, 332)],
    };
  })(),

  // ============================================================
  // Level 83 (UFO-Horde): Inselkette, circulare Bahn, Zwei-Ebenen-
  // Sektor, vertikaler Aufzug zum UFO-Nest, horizontaler Transporter,
  // variable Gap-Treppe, Muenz-Tor (30 Coins). 2 Checkpoints, 2 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(800, 880, 1600, 40, 'space'));        // top 860 [0,1600]
    platforms.push(...islandCluster(1800, 860, [
      { dx: 0, dy: 60, w: 220, type: 'platform_medium' },          // top 800 [1800,2020]
      { dx: 400, dy: 0, w: 200, type: 'space' },                   // top 860
      { dx: 800, dy: 80, w: 240, type: 'platform_easy' },          // top 780
    ]));
    platforms.push(createPlat(3700, 620, 500, 40, 'space'));         // top 600 [3450,3950]
    platforms.push(...twoTierSection(3950, 600, 900, 'space', 'platform_medium')); // unten top 600, oben top 440
    platforms.push(createPlat(5200, 560, 600, 40, 'metal'));         // top 540 [4900,5500]
    platforms.push(createPlat(6150, 240, 400, 24, 'platform_hard')); // top 228 UFO-Nest
    platforms.push(createPlat(6700, 480, 500, 40, 'space'));         // top 460 [6450,6950]
    platforms.push(createPlat(7900, 560, 500, 40, 'space'));         // top 540 [7650,8150]
    platforms.push(...gapWithPlatforms(1, 8150, 552, 700, 3, {
      widths: [120, 130, 110], dy: [30, 60, 0],
      types: ['platform_medium', 'platform_easy', 'platform_hard'], xOffsets: [0, 20, -15],
    }));
    platforms.push(createPlat(9100, 560, 600, 40, 'space'));         // top 540 [8800,9400]
    platforms.push(createPlat(10000, 600, 700, 40, 'metal'));        // top 580 [9650,10350]
    platforms.push(createPlat(11100, 640, 800, 40, 'space'));        // top 620 Ziel [10700,11500]

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(200, 780, 1000, 780, 4));
    coins.push(...coinArc(1910, 720, 5, 90, 80));
    coins.push(...coinDiamond(2720, 680, 70));
    coins.push(...coinArc(3200, 620, 5, 90, 80));
    coins.push(...coinTrail(4000, 520, 4800, 520, 5));
    coins.push(...coinDiamond(4400, 360, 70));
    coins.push(...coinTrail(5000, 460, 5450, 460, 4));
    coins.push(...coinLadder(6150, 180, 60, 4));
    coins.push(...coinArc(6700, 400, 5, 80, 70));
    coins.push(...coinTrail(7300, 440, 7600, 440, 3));
    coins.push(...coinTrail(8900, 460, 9400, 460, 4));
    coins.push(...coinArc(10000, 520, 5, 80, 70));
    coins.push(...coinTrail(10800, 560, 11400, 560, 4));

    return {
      id: 83, name: 'UFO-Horde', width: 12000, height: 1000, biome: 'space-star',
      platforms,
      movingPlatforms: [
        createMovingPlat(3200, 700, 120, 24, 'platform_easy', 'circular', 150, 22),
        createMovingPlat(5750, 420, 120, 24, 'platform_medium', 'vertical', 160, 20),
        createMovingPlat(7300, 520, 140, 24, 'platform_easy', 'horizontal', 160, 22),
      ],
      coins,
      questionBlocks: [
        createQB(400, 760, 'mushroom'),
        createQB(2400, 760, 'coin'),
        createQB(5200, 440, 'star'),
        createQB(9100, 440, 'flower'),
        createQB(10000, 480, 'oneup'),
      ],
      enemies: [
        createEnemy(600, 840, 'robot'),
        createEnemy(1910, 780, 'robot'),
        createEnemy(2300, 840, 'robot'),
        createEnemy(3700, 580, 'robot'),
        createEnemy(4400, 580, 'robot'),
        createEnemy(5200, 520, 'robot'),
        createEnemy(6700, 440, 'robot'),
        createEnemy(7900, 520, 'robot'),
        createEnemy(9100, 520, 'robot'),
        createEnemy(1200, 600, 'ufo'),
        createEnemy(2900, 500, 'ufo'),
        createEnemy(3600, 450, 'ufo'),
        createEnemy(4600, 380, 'ufo'),
        createEnemy(5600, 350, 'ufo'),
        createEnemy(6400, 300, 'ufo'),
        createEnemy(7000, 350, 'ufo'),
        createEnemy(8000, 420, 'ufo'),
        createEnemy(8800, 400, 'ufo'),
        createEnemy(9800, 450, 'ufo'),
        createEnemy(10800, 500, 'ufo'),
        createEnemy(2600, 300, 'ghost'),
        createEnemy(6600, 200, 'ghost'),
      ],
      decorations: [
        createDeco(400, 700, 'planet'),
        createDeco(1600, 500, 'asteroid'),
        createDeco(2200, 400, 'asteroid'),
        createDeco(3500, 300, 'satellite'),
        createDeco(4700, 200, 'rocket'),
        createDeco(5900, 100, 'planet'),
        createDeco(7100, 200, 'asteroid'),
        createDeco(8500, 300, 'satellite'),
        createDeco(9700, 380, 'star'),
        createDeco(10900, 420, 'planet'),
      ],
      playerStart: { x: 250, y: 836 },
      goal: { x: 11100, y: 620 },
      timeBonus: 170,
      coinGoal: 30,
      checkpoints: [
        createCheckpoint(5200, 524),
        createCheckpoint(9100, 524),
      ],
      springs: [createSpring(1300, 860)],
      spikes: [createSpike(1500, 852), createSpike(7800, 532)],
    };
  })(),

  // ============================================================
  // Level 84 (Nova-Finale): brueckelnde Asteroiden-Spirale hoch
  // zum Nova-Kern, sichere Schluchtroute darunter, circulare
  // Kernbahn, vertikaler Aufzug, Brueckel-Abkuerzung parallel zur
  // sicheren Treppenroute, Kronen-Aufstieg, Muenz-Tor (32 Coins).
  // 2 Checkpoints, 3 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(800, 900, 1600, 40, 'space'));        // top 880 [0,1600]
    // Brueckel-Spirale (obere Risiko-Route)
    platforms.push(createCrumblePlat(1850, 760, 130, 24));           // top 748
    platforms.push(createCrumblePlat(2100, 660, 130, 24));           // top 648
    platforms.push(createCrumblePlat(2350, 560, 130, 24));           // top 548
    platforms.push(createCrumblePlat(2600, 460, 130, 24));           // top 448
    platforms.push(createCrumblePlat(2850, 360, 130, 24));           // top 348
    platforms.push(createCrumblePlat(3100, 280, 130, 24));           // top 268
    platforms.push(createPlat(3500, 240, 400, 24, 'platform_hard')); // top 228 Nova-Nest
    // Sichere Route durch die Schlucht
    platforms.push(createPlat(2300, 1060, 1600, 40, 'stone'));       // top 1040 [1500,3100]
    platforms.push(createPlat(3250, 980, 200, 24, 'platform_easy')); // top 968 Ausstieg
    platforms.push(createPlat(3700, 900, 600, 40, 'space'));         // top 880 [3400,4000]
    platforms.push(createPlat(4800, 720, 500, 40, 'space'));         // top 700 [4550,5050]
    platforms.push(createPlat(5800, 380, 500, 24, 'platform_hard')); // top 368 Nova-Kern
    platforms.push(createPlat(6500, 560, 500, 40, 'space'));         // top 540 [6250,6750]
    // Brueckel-Abkuerzung (obere Linie)
    platforms.push(createCrumblePlat(7100, 560, 140, 24));           // top 548
    platforms.push(createCrumblePlat(7400, 500, 140, 24));           // top 488
    platforms.push(createCrumblePlat(7700, 440, 140, 24));           // top 428
    // Sichere Route (untere Linie) + Treppen zum Finaldeck
    platforms.push(createPlat(7100, 760, 300, 40, 'stone'));         // top 740 [6950,7250]
    platforms.push(createPlat(7700, 800, 400, 40, 'stone'));         // top 780 [7500,7900]
    platforms.push(createPlat(8300, 680, 200, 24, 'platform_easy')); // top 668
    platforms.push(createPlat(8550, 560, 200, 24, 'platform_medium')); // top 548
    platforms.push(createPlat(8100, 420, 600, 40, 'space'));         // top 400 Finaldeck [7800,8400]
    platforms.push(createPlat(9100, 480, 700, 40, 'space'));         // top 460 [8750,9450]
    platforms.push(...staircase(9450, 460, 3, 90, 160, 50, 'metal')); // tops 370/280/190
    platforms.push(createPlat(10400, 160, 700, 40, 'space'));        // top 140 Nova-Krone [10050,10750]
    platforms.push(createPlat(11200, 260, 600, 40, 'metal'));        // top 240 [10900,11500]
    platforms.push(createPlat(12200, 360, 800, 40, 'space'));        // top 340 Ziel [11800,12600]

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(200, 800, 1000, 800, 4));
    coins.push(...coinArc(1300, 780, 5, 90, 80));
    coins.push(...coinArc(2000, 640, 5, 90, 80));
    coins.push(...coinDiamond(2600, 300, 70));
    coins.push(...coinLadder(3500, 200, 60, 4));
    coins.push(...coinTrail(2300, 1000, 2900, 1000, 3));
    coins.push(...coinTrail(3700, 800, 3900, 800, 3));
    coins.push(...coinArc(4300, 700, 5, 90, 80));
    coins.push(...coinTrail(4600, 620, 5000, 620, 4));
    coins.push(...coinDiamond(5800, 300, 70));
    coins.push(...coinTrail(6300, 460, 6650, 460, 3));
    coins.push(...coinArc(7100, 480, 5, 80, 70));
    coins.push(...coinTrail(7500, 720, 7850, 720, 3));
    coins.push(...coinTrail(8900, 380, 9400, 380, 4));
    coins.push(...coinLadder(9950, 160, 20, 4));
    coins.push(...coinTrail(10150, 100, 10650, 100, 3));
    coins.push(...coinTrail(10950, 200, 11450, 200, 4));
    coins.push(...coinArc(12200, 280, 5, 80, 70));

    return {
      id: 84, name: 'Nova-Finale', width: 13000, height: 1050, biome: 'space-star',
      platforms,
      movingPlatforms: [
        createMovingPlat(4300, 800, 120, 24, 'platform_medium', 'circular', 140, 22),
        createMovingPlat(5350, 560, 120, 24, 'platform_medium', 'vertical', 170, 20),
      ],
      coins,
      questionBlocks: [
        createQB(400, 780, 'mushroom'),
        createQB(3500, 128, 'oneup'),
        createQB(4800, 600, 'flower'),
        createQB(10400, 40, 'star'),
        createQB(12200, 240, 'coin'),
      ],
      enemies: [
        createEnemy(600, 860, 'robot'),
        createEnemy(2300, 1020, 'robot'),
        createEnemy(3700, 860, 'robot'),
        createEnemy(4800, 680, 'robot'),
        createEnemy(6500, 520, 'robot'),
        createEnemy(7100, 720, 'robot'),
        createEnemy(7700, 760, 'robot'),
        createEnemy(9100, 440, 'robot'),
        createEnemy(11200, 220, 'robot'),
        createEnemy(2000, 400, 'ufo'),
        createEnemy(5000, 300, 'ufo'),
        createEnemy(6800, 200, 'ufo'),
        createEnemy(8600, 300, 'ufo'),
        createEnemy(10500, 100, 'ufo'),
        createEnemy(4000, 300, 'ghost'),
        createEnemy(9800, 200, 'ghost'),
      ],
      decorations: [
        createDeco(300, 800, 'asteroid'),
        createDeco(1500, 600, 'planet'),
        createDeco(2800, 200, 'rocket'),
        createDeco(4200, 400, 'satellite'),
        createDeco(5600, 200, 'star'),
        createDeco(7000, 600, 'asteroid'),
        createDeco(8400, 300, 'planet'),
        createDeco(9600, 300, 'satellite'),
        createDeco(10800, 100, 'asteroid'),
        createDeco(12000, 200, 'planet'),
      ],
      playerStart: { x: 250, y: 856 },
      goal: { x: 12200, y: 340 },
      timeBonus: 260,
      coinGoal: 32,
      checkpoints: [
        createCheckpoint(4800, 684),
        createCheckpoint(9100, 444),
      ],
      springs: [createSpring(1300, 880)],
      spikes: [createSpike(700, 872), createSpike(6600, 532), createSpike(9000, 452)],
    };
  })(),
];

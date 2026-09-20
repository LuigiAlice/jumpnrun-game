// Canyon Base (ids 73-78) — Phase 9 rebuild
// Archetypes: 73 Abgrundpfad, 74 Felsspalten, 75 Windkanaele,
// 76 Kletterwaende, 77 Adlerhorde, 78 Felssturz-Finale.
// Canyon gravity is 2000 (default): safe rises <=160px, safe same-height
// gaps <=210px; spring-only ledges stay within the solver's 350px reach.
// All levels are authored solvable (ensureSolvable adds nothing).

import {
  LevelData, createPlat, createQB, createEnemy, createDeco,
  createMovingPlat, createSpring, createSpike, createCrumblePlat,
  createCheckpoint, createWindZone, createKey, createDoor, createCannon,
  staircase, plateauSection, pitWithLedges, twoTierSection, islandCluster,
  zigzagClimb, overhangSection, coinArc, coinDiamond, coinTrail, coinLadder,
  gapWithPlatforms,
} from './helpers';

export const CANYON_BASE_LEVELS: LevelData[] = [
  // ============================================================
  // Level 73 (Abgrundpfad): schmale Gratpfade ueber tiefen
  // Schluchten, horizontaler + vertikaler Aufzug, Hoehlen-Bonusraum
  // hinter Schluessel + Tur (nie Pflichtweg), Feder zu einem
  // Hochplateau. 2 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(500, 740, 1000, 40, 'stone'));            // top 720 [0,1000]
    platforms.push(createPlat(1150, 612, 100, 24, 'platform_easy'));    // top 600 Tritt vor dem Aufzug
    platforms.push(createPlat(1500, 700, 400, 24, 'platform_hard'));    // top 688 [1300,1700]
    platforms.push(createPlat(2250, 780, 1000, 40, 'sandstone'));       // top 760 [1750,2750]
    platforms.push(createPlat(2880, 830, 120, 24, 'platform_easy'));    // top 818 (Schlucht-Ausstieg)
    platforms.push(createPlat(3600, 780, 1100, 40, 'stone'));           // top 760 [3050,4150]
    // Hoehlen-Boden + Bonusraum (Schluessel/Tuer)
    platforms.push(createPlat(4500, 960, 850, 40, 'cave'));             // top 940 [4075,4925]
    platforms.push(createPlat(4300, 860, 120, 24, 'platform_easy'));    // top 848 Hoehlen-Ausstieg
    platforms.push(createPlat(4400, 700, 120, 24, 'platform_medium'));  // top 688
    platforms.push(createPlat(4650, 740, 120, 24, 'platform_easy'));    // top 728
    platforms.push(createPlat(5400, 780, 1000, 40, 'stone'));           // top 760 [4900,5900]
    // Ueberhang mit Schluchtspalt
    platforms.push(...overhangSection(5900, 760, 700, 6200, 200, 'stone'));
    platforms.push(createPlat(7600, 780, 1600, 40, 'stone'));           // top 760 [6800,8400]
    platforms.push(createPlat(7800, 500, 140, 24, 'platform_hard'));    // top 488 Feder-Plateau
    platforms.push(createPlat(8800, 780, 400, 40, 'sandstone'));        // top 760 Ziel [8600,9000]

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 660, 900, 660, 4));
    coins.push(...coinArc(1150, 620, 5, 90, 80));
    coins.push(...coinTrail(1900, 700, 2600, 700, 4));
    coins.push(...coinArc(2900, 620, 5, 70, 80));
    coins.push(...coinTrail(3200, 700, 3900, 700, 4));
    coins.push(...coinTrail(4380, 640, 4680, 640, 3));
    coins.push(...coinTrail(4740, 900, 4930, 900, 3));
    coins.push(...coinDiamond(4830, 860, 50));
    coins.push(...coinTrail(5000, 700, 5800, 700, 4));
    coins.push(...coinArc(6300, 700, 5, 70, 80));
    coins.push(...coinTrail(6900, 700, 8300, 700, 5));
    coins.push(...coinLadder(7800, 700, 500, 5));
    coins.push(...coinDiamond(7800, 410, 70));

    return {
      id: 73, name: 'Abgrundpfad', width: 9200, height: 1000, biome: 'canyon-base',
      platforms,
      movingPlatforms: [
        createMovingPlat(1150, 700, 120, 24, 'platform_medium', 'horizontal', 90, 20),
        createMovingPlat(2900, 780, 120, 24, 'platform_medium', 'vertical', 100, 20),
      ],
      coins,
      questionBlocks: [
        createQB(350, 620, 'mushroom'),
        createQB(2100, 670, 'coin'),
        createQB(3300, 680, 'flower'),
        createQB(4830, 860, 'mushroom'),
        createQB(5100, 670, 'star'),
        createQB(8200, 670, 'coin'),
      ],
      enemies: [
        createEnemy(750, 700, 'goomba'),
        createEnemy(1520, 668, 'spiny'),
        createEnemy(2300, 740, 'crab'),
        createEnemy(3400, 740, 'koopa'),
        createEnemy(3900, 740, 'robot'),
        createEnemy(5100, 740, 'crab'),
        createEnemy(6100, 740, 'koopa'),
        createEnemy(6900, 740, 'spiny'),
        createEnemy(7300, 740, 'robot'),
        createEnemy(8000, 740, 'koopa'),
      ],
      decorations: [
        createDeco(300, 710, 'canyon-rock'),
        createDeco(900, 710, 'formation'),
        createDeco(1300, 640, 'eagle'),
        createDeco(2400, 750, 'canyon-rock'),
        createDeco(3600, 750, 'formation'),
        createDeco(5200, 750, 'canyon-rock'),
        createDeco(6300, 680, 'eagle'),
        createDeco(6900, 750, 'formation'),
        createDeco(7600, 750, 'canyon-rock'),
        createDeco(8600, 700, 'eagle'),
        createDeco(8900, 750, 'formation'),
      ],
      playerStart: { x: 200, y: 696 },
      goal: { x: 8800, y: 760 },
      timeBonus: 150,
      springs: [createSpring(7700, 760)],
      spikes: [createSpike(3700, 752), createSpike(6050, 752)],
      keys: [createKey(4550, 900)],
      doors: [createDoor(4700, 860, 40, 160)],
    };
  })(),

  // ============================================================
  // Level 74 (Felsspalten): brueckelnde Felsbruecken ueber
  // Spalten, sichere Ausstiegsroute, Zwei-Ebenen-Wand, Kanonen
  // mit Schusslinien ueber die Sprungraeume, circulare Bahn zum
  // Hochplateau. 2 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(550, 760, 1100, 40, 'sandstone'));        // top 740 [0,1100]
    // Brueckel-Bruecke ueber der Spalte
    platforms.push(createCrumblePlat(1230, 700, 120, 24));              // top 688
    platforms.push(createCrumblePlat(1400, 720, 120, 24));              // top 708
    platforms.push(...pitWithLedges(1100, 740, 400, 180, 'stone')); // Spaltenboden top 920
    platforms.push(createPlat(1450, 840, 120, 24, 'platform_easy'));    // top 828 sicherer Ausstieg
    platforms.push(createPlat(2000, 780, 1000, 40, 'stone'));           // top 760 [1500,2500]
    platforms.push(...gapWithPlatforms(1, 2500, 772, 800, 3, {
      widths: [110, 130, 100], dy: [0, 40, 20],
      types: ['platform_medium', 'platform_hard', 'platform_easy'], xOffsets: [0, 30, -20],
    }));
    platforms.push(createPlat(3800, 800, 1000, 40, 'stone'));           // top 780 [3300,4300]
    platforms.push(...twoTierSection(4300, 800, 900, 'stone', 'sandstone')); // unter top 800, obere Route top 640
    platforms.push(createCrumblePlat(4600, 560, 130, 24));              // top 548 Bonus
    platforms.push(createPlat(5200, 480, 140, 24, 'platform_hard'));    // top 468 Hochplateau
    platforms.push(createPlat(5700, 800, 800, 40, 'stone'));            // top 780 [5300,6100]
    platforms.push(createPlat(6600, 820, 900, 40, 'stone'));            // top 800 [6150,7050]
    platforms.push(createPlat(6900, 520, 140, 24, 'platform_hard'));    // top 508 Feder-Plateau
    platforms.push(createPlat(7200, 780, 130, 24, 'platform_medium'));  // top 768
    platforms.push(createPlat(7725, 820, 800, 40, 'stone'));            // top 800 [7325,8125]
    platforms.push(createPlat(8600, 820, 600, 40, 'sandstone'));        // top 800 Ziel [8300,8900]

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 660, 950, 660, 4));
    coins.push(...coinArc(1300, 640, 5, 90, 70));
    coins.push(...coinTrail(1600, 700, 2400, 700, 4));
    coins.push(...coinArc(2900, 660, 5, 90, 80));
    coins.push(...coinTrail(3400, 720, 4200, 720, 4));
    coins.push(...coinDiamond(4750, 500, 80));
    coins.push(...coinDiamond(5200, 400, 60));
    coins.push(...coinTrail(5400, 720, 6050, 720, 4));
    coins.push(...coinArc(6900, 620, 5, 90, 80));
    coins.push(...coinTrail(6400, 720, 7000, 720, 4));
    coins.push(...coinTrail(7400, 720, 8200, 720, 4));
    coins.push(...coinTrail(8500, 720, 8800, 720, 3));

    return {
      id: 74, name: 'Felsspalten', width: 9200, height: 1000, biome: 'canyon-base',
      platforms,
      movingPlatforms: [
        createMovingPlat(5250, 700, 110, 24, 'platform_easy', 'circular', 80, 18),
      ],
      coins,
      questionBlocks: [
        createQB(400, 660, 'mushroom'),
        createQB(2000, 660, 'coin'),
        createQB(3500, 700, 'flower'),
        createQB(6300, 710, 'star'),
      ],
      enemies: [
        createEnemy(800, 720, 'goomba'),
        createEnemy(2400, 740, 'spiny'),
        createEnemy(2250, 740, 'crab'),
        createEnemy(3600, 760, 'koopa'),
        createEnemy(4000, 760, 'robot'),
        createEnemy(5600, 760, 'robot'),
        createEnemy(6400, 780, 'crab'),
        createEnemy(6900, 780, 'robot'),
        createEnemy(7500, 780, 'koopa'),
        createEnemy(7900, 780, 'spiny'),
        createEnemy(8500, 780, 'crab'),
      ],
      decorations: [
        createDeco(250, 730, 'canyon-rock'),
        createDeco(700, 730, 'formation'),
        createDeco(1600, 640, 'eagle'),
        createDeco(2100, 750, 'canyon-rock'),
        createDeco(3400, 770, 'formation'),
        createDeco(4400, 600, 'eagle'),
        createDeco(5500, 770, 'canyon-rock'),
        createDeco(6500, 780, 'formation'),
        createDeco(7500, 780, 'canyon-rock'),
        createDeco(8200, 700, 'eagle'),
        createDeco(8800, 780, 'formation'),
      ],
      playerStart: { x: 220, y: 716 },
      goal: { x: 8600, y: 800 },
      timeBonus: 160,
      springs: [createSpring(6700, 800)],
      spikes: [createSpike(2300, 752), createSpike(3900, 772)],
      cannons: [
        createCannon(2450, 620, -1, 2400, 220),
        createCannon(8000, 560, -1, 2200, 240),
      ],
    };
  })(),

  // ============================================================
  // Level 75 (Windkanaele): drei Wind-Zonen ueber breitem Boden
  // (nie ueber Abgruenden), Terrassen-Aufstieg, vertikaler Aufzug
  // ueber einer Felsspalte, Treppe zum Hochplateau, Feder zu
  // einem Muenznest. 1 Spike.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(600, 760, 1200, 40, 'stone'));            // top 740 [0,1200]
    platforms.push(...gapWithPlatforms(1, 1200, 752, 300, 2, {
      widths: [110, 120], dy: [30, 0],
      types: ['platform_medium', 'platform_easy'], xOffsets: [0, 20],
    }));
    platforms.push(createPlat(2000, 760, 1000, 40, 'sandstone'));       // top 740 [1500,2500]
    platforms.push(...plateauSection(2500, 740, [
      { dx: 0, dy: 0, w: 300, h: 40, type: 'stone' },
      { dx: 340, dy: 120, w: 260, h: 40, type: 'sandstone' },
      { dx: 640, dy: 240, w: 300, h: 40, type: 'stone' },
    ]));
    platforms.push(createPlat(3900, 760, 900, 40, 'stone'));            // top 740 [3450,4350]
    platforms.push(createPlat(5425, 760, 1250, 40, 'sandstone'));       // top 740 [4800,6050]
    platforms.push(...pitWithLedges(6050, 740, 300, 150, 'stone')); // Spaltenboden top 890
    platforms.push(createPlat(6480, 830, 120, 24, 'platform_easy'));    // top 818 Ausstieg
    platforms.push(createPlat(7300, 780, 1300, 40, 'stone'));           // top 760 [6650,7950]
    platforms.push(...staircase(7950, 760, 3, 80, 150, 45, 'sandstone'));
    platforms.push(createPlat(9200, 860, 1400, 40, 'stone'));           // top 840 [8500,9900]
    platforms.push(createPlat(9900, 560, 140, 24, 'platform_hard'));    // top 548 Feder-Plateau
    platforms.push(createPlat(10500, 860, 800, 40, 'sandstone'));       // top 840 Ziel [10100,10900]

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 680, 950, 680, 4));
    coins.push(...coinArc(1300, 660, 5, 80, 60));
    coins.push(...coinTrail(1650, 680, 2250, 680, 4));
    coins.push(...coinArc(2970, 560, 5, 70, 70));
    coins.push(...coinLadder(3290, 460, 300, 4));
    coins.push(...coinArc(3900, 680, 5, 70, 70));
    coins.push(...coinTrail(4300, 680, 4700, 680, 3));
    coins.push(...coinArc(5425, 680, 5, 90, 70));
    coins.push(...coinTrail(6150, 830, 6320, 830, 3));
    coins.push(...coinTrail(6700, 680, 7150, 680, 4));
    coins.push(...coinDiamond(7300, 640, 60));
    coins.push(...coinLadder(8025, 640, 480, 4));
    coins.push(...coinTrail(8550, 780, 8850, 780, 3));
    coins.push(...coinDiamond(9900, 460, 60));
    coins.push(...coinTrail(10150, 780, 10850, 780, 4));

    return {
      id: 75, name: 'Windkanaele', width: 11500, height: 950, biome: 'canyon-base',
      platforms,
      movingPlatforms: [
        createMovingPlat(4600, 640, 120, 24, 'platform_medium', 'vertical', 120, 20),
      ],
      coins,
      questionBlocks: [
        createQB(450, 660, 'mushroom'),
        createQB(2400, 660, 'coin'),
        createQB(3600, 660, 'flower'),
        createQB(5100, 660, 'star'),
        createQB(7000, 670, 'coin'),
      ],
      enemies: [
        createEnemy(700, 720, 'goomba'),
        createEnemy(1800, 720, 'spiny'),
        createEnemy(2300, 720, 'koopa'),
        createEnemy(3700, 720, 'robot'),
        createEnemy(5000, 720, 'crab'),
        createEnemy(5400, 720, 'robot'),
        createEnemy(5800, 720, 'spiny'),
        createEnemy(6800, 740, 'koopa'),
        createEnemy(7500, 740, 'robot'),
        createEnemy(8700, 820, 'spiny'),
        createEnemy(9500, 820, 'crab'),
      ],
      decorations: [
        createDeco(300, 730, 'canyon-rock'),
        createDeco(900, 650, 'eagle'),
        createDeco(2000, 730, 'formation'),
        createDeco(3000, 600, 'canyon-rock'),
        createDeco(4000, 730, 'formation'),
        createDeco(4700, 640, 'eagle'),
        createDeco(5600, 730, 'canyon-rock'),
        createDeco(6800, 740, 'formation'),
        createDeco(7700, 740, 'canyon-rock'),
        createDeco(8300, 600, 'eagle'),
        createDeco(9300, 820, 'formation'),
        createDeco(10300, 820, 'canyon-rock'),
      ],
      playerStart: { x: 220, y: 716 },
      goal: { x: 10500, y: 840 },
      timeBonus: 170,
      springs: [createSpring(9700, 840)],
      spikes: [createSpike(7700, 752)],
      windZones: [
        createWindZone(250, 620, 800, 160, 130, 2800),
        createWindZone(1600, 620, 700, 160, 150, 2400),
        createWindZone(4950, 620, 900, 160, 160, 2600),
      ],
    };
  })(),

  // ============================================================
  // Level 76 (Kletterwaende): Zickzack-Wandaufstieg, sichere
  // Solid-Route und parallele Brueckel-Route, vertikaler Aufzug,
  // Kanonen entlang der Kletterwand, Feder zum Wandnest.
  // 1 Checkpoint, 1 Spike.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(600, 820, 1200, 40, 'stone'));            // top 800 [0,1200]
    platforms.push(createPlat(900, 520, 160, 24, 'platform_hard'));     // top 508 Feder-Wandnest
    platforms.push(createPlat(1350, 780, 130, 24, 'platform_easy'));    // top 768
    platforms.push(...zigzagClimb(1500, 800, 5, 90, 110, 130, 'platform_medium'));
    platforms.push(createPlat(2130, 380, 500, 60, 'cave'));             // top 350 Wandterrasse
    platforms.push(createPlat(2550, 460, 130, 24, 'platform_medium'));  // top 448
    platforms.push(createPlat(3000, 560, 600, 40, 'stone'));            // top 540 Checkpoint-Terrasse
    // Sichere Solid-Route nach oben
    platforms.push(createPlat(3450, 520, 120, 24, 'platform_easy'));    // top 508
    platforms.push(createPlat(3650, 440, 120, 24, 'platform_medium'));  // top 428
    platforms.push(createPlat(3850, 360, 120, 24, 'platform_easy'));    // top 348
    // Parallele Brueckel-Route (schneller, riskanter)
    platforms.push(createCrumblePlat(3550, 480, 110, 24));              // top 468
    platforms.push(createCrumblePlat(3750, 400, 110, 24));              // top 388
    platforms.push(createCrumblePlat(3950, 320, 110, 24));              // top 308
    platforms.push(createPlat(4200, 340, 500, 40, 'stone'));            // top 320 Wandabsatz
    platforms.push(createPlat(5350, 640, 800, 40, 'stone'));            // top 620 [4950,5750]
    platforms.push(createPlat(6250, 660, 700, 40, 'sandstone'));        // top 640 [5900,6600]
    platforms.push(...gapWithPlatforms(1, 6600, 632, 400, 2, {
      widths: [120, 110], dy: [20, 0],
      types: ['platform_medium', 'platform_easy'], xOffsets: [10, -10],
    }));
    platforms.push(createPlat(7300, 660, 700, 40, 'sandstone'));        // top 640 [6950,7650]
    platforms.push(createPlat(7850, 620, 130, 24, 'platform_medium'));  // top 608
    platforms.push(createPlat(8050, 660, 120, 24, 'platform_easy'));    // top 648
    platforms.push(createPlat(8400, 760, 600, 280, 'sandstone'));       // top 620 Zielwand [8100,8700]

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 760, 950, 760, 4));
    coins.push(...coinLadder(900, 800, 540, 5));
    coins.push(...coinDiamond(900, 430, 60));
    coins.push(...coinArc(1630, 640, 5, 70, 70));
    coins.push(...coinDiamond(3000, 460, 70));
    coins.push(...coinArc(3650, 360, 5, 70, 70));
    coins.push(...coinDiamond(3650, 330, 60));
    coins.push(...coinTrail(4150, 260, 4400, 260, 3));
    coins.push(...coinTrail(4900, 540, 5700, 540, 5));
    coins.push(...coinTrail(6050, 560, 6500, 560, 4));
    coins.push(...coinArc(6850, 560, 5, 70, 70));
    coins.push(...coinTrail(7000, 560, 7600, 560, 5));
    coins.push(...coinTrail(8150, 560, 8600, 560, 3));

    return {
      id: 76, name: 'Kletterwaende', width: 12500, height: 950, biome: 'canyon-base',
      platforms,
      movingPlatforms: [
        createMovingPlat(4700, 500, 120, 24, 'platform_medium', 'vertical', 130, 20),
      ],
      coins,
      questionBlocks: [
        createQB(450, 720, 'mushroom'),
        createQB(2050, 260, 'coin'),
        createQB(2850, 450, 'flower'),
        createQB(4300, 240, 'star'),
      ],
      enemies: [
        createEnemy(800, 780, 'goomba'),
        createEnemy(1050, 780, 'crab'),
        createEnemy(2250, 330, 'robot'),
        createEnemy(2900, 520, 'spiny'),
        createEnemy(4300, 300, 'robot'),
        createEnemy(5100, 600, 'crab'),
        createEnemy(5500, 600, 'robot'),
        createEnemy(6100, 620, 'koopa'),
        createEnemy(7100, 620, 'spiny'),
      ],
      decorations: [
        createDeco(250, 790, 'canyon-rock'),
        createDeco(700, 790, 'formation'),
        createDeco(900, 480, 'eagle'),
        createDeco(1450, 740, 'canyon-rock'),
        createDeco(2200, 330, 'formation'),
        createDeco(2900, 530, 'eagle'),
        createDeco(3500, 480, 'canyon-rock'),
        createDeco(4300, 300, 'formation'),
        createDeco(5200, 590, 'eagle'),
        createDeco(6100, 620, 'canyon-rock'),
        createDeco(7300, 620, 'formation'),
        createDeco(8400, 520, 'eagle'),
      ],
      playerStart: { x: 220, y: 776 },
      goal: { x: 8400, y: 620 },
      timeBonus: 200,
      checkpoints: [createCheckpoint(3000, 524)],
      springs: [createSpring(700, 800)],
      spikes: [createSpike(1000, 792)],
      cannons: [
        createCannon(5050, 470, -1, 2400, 220),
        createCannon(1350, 640, 1, 2200, 220),
      ],
    };
  })(),

  // ============================================================
  // Level 77 (Adlerhorde): schwebende Inselfolge ueber der
  // Schlucht, circulare + vertikale Bahnen, 17 Luftgegner
  // (Lakitu/UFO) plus Bodenwachen, Thwomps als Felsbloecke,
  // Feder zur Adlerwarte. 1 Spike.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(600, 780, 1200, 40, 'stone'));            // top 760 [0,1200]
    platforms.push(createPlat(1250, 540, 140, 24, 'platform_hard'));    // top 528 Feder-Warte
    platforms.push(createPlat(1500, 720, 300, 24, 'platform_medium'));  // top 708
    platforms.push(createPlat(1900, 660, 260, 24, 'platform_hard'));    // top 648
    platforms.push(createPlat(2390, 700, 320, 40, 'sandstone'));        // top 680 [2230,2550]
    platforms.push(createPlat(3300, 600, 280, 24, 'platform_medium'));  // top 588
    platforms.push(createPlat(3700, 600, 140, 24, 'platform_easy'));    // top 588
    platforms.push(createPlat(3950, 660, 300, 40, 'stone'));            // top 640 [3800,4100]
    platforms.push(...islandCluster(4200, 640, [
      { dx: 0, dy: 0, w: 200, type: 'stone' },
      { dx: 260, dy: 90, w: 160, type: 'platform_medium' },
      { dx: 480, dy: 180, w: 180, type: 'sandstone' },
    ]));
    platforms.push(createPlat(5100, 420, 160, 24, 'platform_hard'));    // top 408 Bonusinsel
    platforms.push(createPlat(5000, 500, 140, 24, 'platform_easy'));    // top 488
    platforms.push(createPlat(5650, 620, 800, 40, 'sandstone'));        // top 600 [5250,6050]
    platforms.push(createPlat(6200, 640, 140, 24, 'platform_medium'));  // top 628
    platforms.push(createPlat(6800, 700, 900, 40, 'stone'));            // top 680 [6350,7250]
    platforms.push(createPlat(7650, 420, 200, 24, 'platform_hard'));    // top 408 Adlerhorst
    platforms.push(createPlat(7520, 660, 150, 24, 'platform_easy'));    // top 648
    platforms.push(createPlat(7800, 700, 160, 24, 'platform_medium'));  // top 688
    platforms.push(createPlat(8500, 720, 900, 40, 'sandstone'));        // top 700 [8050,8950]
    platforms.push(createPlat(9100, 660, 130, 24, 'platform_easy'));    // top 648
    platforms.push(createPlat(9600, 720, 700, 40, 'stone'));            // top 700 Ziel [9250,9950]

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 700, 950, 700, 4));
    coins.push(...coinLadder(1100, 760, 560, 5));
    coins.push(...coinDiamond(1250, 450, 60));
    coins.push(...coinArc(2350, 620, 5, 70, 70));
    coins.push(...coinArc(2800, 520, 5, 90, 80));
    coins.push(...coinArc(4500, 480, 5, 70, 70));
    coins.push(...coinDiamond(5100, 340, 60));
    coins.push(...coinTrail(5400, 540, 5950, 540, 4));
    coins.push(...coinArc(6200, 560, 5, 70, 70));
    coins.push(...coinTrail(6900, 620, 7200, 620, 3));
    coins.push(...coinLadder(7400, 640, 440, 4));
    coins.push(...coinDiamond(7650, 340, 60));
    coins.push(...coinTrail(8100, 640, 8900, 640, 4));
    coins.push(...coinTrail(9300, 640, 9850, 640, 4));

    return {
      id: 77, name: 'Adlerhorde', width: 10500, height: 950, biome: 'canyon-base',
      platforms,
      movingPlatforms: [
        createMovingPlat(2800, 620, 120, 24, 'platform_easy', 'circular', 90, 20),
        createMovingPlat(7400, 560, 120, 24, 'platform_easy', 'vertical', 120, 20),
      ],
      coins,
      questionBlocks: [
        createQB(500, 680, 'oneup'),
        createQB(2350, 590, 'coin'),
        createQB(3900, 550, 'flower'),
        createQB(5400, 510, 'star'),
        createQB(7100, 590, 'mushroom'),
        createQB(8250, 610, 'coin'),
      ],
      enemies: [
        createEnemy(700, 740, 'goomba'),
        createEnemy(1000, 740, 'koopa'),
        createEnemy(1500, 688, 'spiny'),
        createEnemy(1900, 628, 'crab'),
        createEnemy(2450, 660, 'robot'),
        createEnemy(1500, 480, 'lakitu'),
        createEnemy(2400, 420, 'lakitu'),
        createEnemy(3600, 440, 'lakitu'),
        createEnemy(6200, 400, 'lakitu'),
        createEnemy(8200, 480, 'lakitu'),
        createEnemy(9000, 520, 'lakitu'),
        createEnemy(2000, 500, 'ufo'),
        createEnemy(3300, 400, 'ufo'),
        createEnemy(5500, 420, 'ufo'),
        createEnemy(7600, 300, 'ufo'),
        createEnemy(8300, 440, 'thwomp'),
        createEnemy(8800, 440, 'thwomp'),
      ],
      decorations: [
        createDeco(400, 740, 'canyon-rock'),
        createDeco(1200, 620, 'eagle'),
        createDeco(1750, 560, 'eagle'),
        createDeco(2600, 540, 'eagle'),
        createDeco(3100, 520, 'eagle'),
        createDeco(4000, 560, 'eagle'),
        createDeco(4900, 400, 'eagle'),
        createDeco(5800, 520, 'eagle'),
        createDeco(6700, 560, 'eagle'),
        createDeco(7500, 520, 'eagle'),
        createDeco(8800, 560, 'eagle'),
        createDeco(9800, 620, 'eagle'),
        createDeco(300, 750, 'canyon-rock'),
        createDeco(4500, 600, 'formation'),
        createDeco(8600, 690, 'canyon-rock'),
      ],
      playerStart: { x: 220, y: 736 },
      goal: { x: 9600, y: 700 },
      timeBonus: 180,
      springs: [createSpring(1100, 760)],
      spikes: [createSpike(8400, 692)],
    };
  })(),

  // ============================================================
  // Level 78 (Felssturz-Finale): Steinschlagpassage mit Thwomps,
  // Windkanal und Kanonen, dann der grosse Aufstieg 750 -> 70:
  // parallele Brueckel-Saeule und sichere Zickzack-Route ueber
  // ein Fangnetz. 3 Checkpoints, 1 Spike.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(900, 760, 1800, 40, 'stone'));            // top 740 [0,1800]
    platforms.push(createPlat(1750, 480, 180, 24, 'platform_hard'));    // top 468 Feder-Nest
    // Brueckel-Bruecke ueber der Steinschlucht
    platforms.push(createCrumblePlat(1980, 720, 130, 24));              // top 708
    platforms.push(createCrumblePlat(2200, 740, 130, 24));              // top 728
    platforms.push(createCrumblePlat(2400, 780, 130, 24));              // top 768
    platforms.push(createPlat(2150, 920, 700, 40, 'stone'));            // Schluchtboden top 900
    platforms.push(createPlat(2280, 830, 120, 24, 'platform_easy'));    // top 818 Ausstieg
    platforms.push(createPlat(3200, 780, 1400, 40, 'stone'));           // top 760 [2500,3900]
    platforms.push(createPlat(4050, 740, 140, 24, 'platform_medium'));  // top 728
    platforms.push(createPlat(4800, 800, 1200, 40, 'stone'));           // top 780 [4200,5400]
    platforms.push(createPlat(5550, 780, 110, 24, 'platform_easy'));    // top 768 sicherer Steg
    platforms.push(createCrumblePlat(5650, 720, 130, 24));              // top 708 Abkuerzung
    platforms.push(createPlat(6400, 800, 1400, 40, 'stone'));           // top 780 [5700,7100]
    platforms.push(...gapWithPlatforms(1, 7100, 812, 700, 3, {
      widths: [120, 110, 130], dy: [20, 60, 0],
      types: ['platform_medium', 'platform_easy', 'platform_hard'], xOffsets: [0, 25, -15],
    }));
    platforms.push(createPlat(8500, 820, 1400, 40, 'stone'));           // top 800 Windkanal [7800,9200]
    platforms.push(createPlat(9380, 760, 140, 24, 'platform_medium'));  // top 748
    platforms.push(createCrumblePlat(9580, 780, 140, 24));              // top 768
    platforms.push(createPlat(10600, 820, 1800, 40, 'stone'));          // top 800 [9700,11500]
    platforms.push(createPlat(12800, 770, 2400, 40, 'stone'));          // top 750 Aufstiegsbasis [11600,14000]
    platforms.push(createPlat(14700, 830, 1200, 40, 'stone'));          // Fangnetz top 810 [14100,15300]
    // Brueckel-Saeule (direkter Aufstieg)
    platforms.push(createCrumblePlat(13900, 660, 140, 24));             // top 648
    platforms.push(createCrumblePlat(13750, 510, 140, 24));             // top 498
    platforms.push(createCrumblePlat(13950, 360, 140, 24));             // top 348
    platforms.push(createCrumblePlat(13750, 210, 140, 24));             // top 198
    platforms.push(createCrumblePlat(14000, 80, 160, 24));              // top 68
    // Sichere Zickzack-Route
    platforms.push(createPlat(14400, 730, 160, 24, 'sandstone'));       // top 718
    platforms.push(createPlat(14730, 590, 160, 24, 'stone'));           // top 578
    platforms.push(createPlat(15050, 450, 160, 24, 'stone'));           // top 438
    platforms.push(createPlat(14750, 310, 160, 24, 'sandstone'));       // top 298
    platforms.push(createPlat(14450, 170, 170, 24, 'stone'));           // top 158
    platforms.push(createPlat(14600, 100, 700, 60, 'sandstone'));       // Gipfel top 70 [14250,14950]

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 700, 800, 700, 4));
    coins.push(...coinArc(2150, 620, 5, 90, 80));
    coins.push(...coinTrail(2600, 700, 3000, 700, 3));
    coins.push(...coinDiamond(1750, 400, 60));
    coins.push(...coinTrail(2300, 860, 2450, 860, 2));
    coins.push(...coinTrail(3300, 700, 3800, 700, 4));
    coins.push(...coinTrail(4400, 720, 5300, 720, 4));
    coins.push(...coinTrail(5750, 720, 6300, 720, 3));
    coins.push(...coinArc(6400, 700, 5, 90, 80));
    coins.push(...coinTrail(7300, 720, 7600, 720, 2));
    coins.push(...coinArc(8500, 720, 5, 90, 80));
    coins.push(...coinTrail(9300, 680, 9600, 680, 3));
    coins.push(...coinTrail(9800, 720, 10600, 720, 4));
    coins.push(...coinTrail(11700, 690, 12700, 690, 4));
    coins.push(...coinLadder(13900, 620, 200, 6));
    coins.push(...coinTrail(14300, 760, 14800, 760, 3));
    coins.push(...coinTrail(14600, 640, 15000, 640, 3));
    coins.push(...coinTrail(14250, 40, 14900, 40, 4));

    return {
      id: 78, name: 'Felssturz-Finale', width: 16000, height: 1000, biome: 'canyon-base',
      platforms,
      movingPlatforms: [
        createMovingPlat(1950, 760, 130, 24, 'platform_easy', 'vertical', 110, 20),
      ],
      coins,
      questionBlocks: [
        createQB(800, 650, 'mushroom'),
        createQB(3000, 670, 'coin'),
        createQB(3300, 670, 'flower'),
        createQB(6100, 690, 'star'),
        createQB(8300, 710, 'oneup'),
      ],
      enemies: [
        createEnemy(1200, 720, 'goomba'),
        createEnemy(1700, 720, 'crab'),
        createEnemy(2900, 740, 'robot'),
        createEnemy(3400, 740, 'spiny'),
        createEnemy(2900, 540, 'thwomp'),
        createEnemy(3400, 540, 'thwomp'),
        createEnemy(3700, 540, 'thwomp'),
        createEnemy(3600, 740, 'robot'),
        createEnemy(5900, 760, 'crab'),
        createEnemy(6700, 760, 'koopa'),
        createEnemy(6900, 760, 'robot'),
        createEnemy(8100, 780, 'koopa'),
        createEnemy(8700, 780, 'robot'),
        createEnemy(10200, 780, 'robot'),
        createEnemy(11000, 750, 'koopa'),
        createEnemy(11900, 730, 'spiny'),
        createEnemy(12400, 730, 'robot'),
      ],
      decorations: [
        createDeco(250, 730, 'canyon-rock'),
        createDeco(1000, 730, 'formation'),
        createDeco(1600, 620, 'eagle'),
        createDeco(2600, 750, 'canyon-rock'),
        createDeco(3900, 770, 'formation'),
        createDeco(4900, 770, 'canyon-rock'),
        createDeco(6000, 700, 'eagle'),
        createDeco(6600, 770, 'formation'),
        createDeco(7400, 770, 'canyon-rock'),
        createDeco(8400, 740, 'eagle'),
        createDeco(9200, 790, 'formation'),
        createDeco(10000, 790, 'canyon-rock'),
        createDeco(11200, 780, 'formation'),
        createDeco(12000, 740, 'canyon-rock'),
        createDeco(13400, 640, 'eagle'),
        createDeco(14200, 780, 'formation'),
        createDeco(15000, 700, 'canyon-rock'),
      ],
      playerStart: { x: 560, y: 716 },
      goal: { x: 14800, y: 70 },
      timeBonus: 260,
      checkpoints: [
        createCheckpoint(1400, 724),
        createCheckpoint(6300, 764),
        createCheckpoint(12800, 734),
      ],
      springs: [createSpring(1600, 740)],
      spikes: [createSpike(8900, 792)],
      windZones: [createWindZone(7900, 680, 1100, 160, 150, 2500)],
      cannons: [
        createCannon(4300, 640, 1, 2400, 220),
        createCannon(9300, 620, -1, 2400, 220),
      ],
    };
  })(),
];

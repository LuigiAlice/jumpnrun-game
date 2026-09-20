// Castle Final (ids 85-90) — Phase 9 rebuild
// Archetypes: 85 Burghof, 86 Zugbruecke, 87 Kerkerkanaele,
// 88 Turm-Kletterer, 89 Boss-Horde (coinGoal 33), 90 Bossarena.
// Castle gravity is 2000 (default): safe rises <=160px, safe same-height
// gaps <=210px; spring-only ledges stay within the solver's 350px reach.
// Keys/doors guard bonus vaults only, never the critical path. L90 is
// element-free (no springs/spikes/crumble/wind/cannons) with a wide
// walkable arena floor. All levels are authored solvable (ensureSolvable
// adds nothing).

import {
  LevelData, createPlat, createQB, createEnemy, createDeco,
  createMovingPlat, createSpring, createSpike, createCrumblePlat,
  createCheckpoint, createKey, createDoor, createCannon,
  staircase, plateauSection, pitWithLedges, twoTierSection, zigzagClimb,
  overhangSection, coinArc, coinDiamond, coinTrail, coinLadder,
  gapWithPlatforms,
} from './helpers';

export const CASTLE_FINAL_LEVELS: LevelData[] = [
  // ============================================================
  // Level 85 (Burghof): Terrassen-Aufstieg, Hofmauer-Sprungfolge,
  // Burggraben mit oberer und unterer Route, Zwei-Ebenen-Wehrgang,
  // vertikaler Aufzug zum Nest, Schluessel oeffnet die Schatzkammer
  // hinter der Tur (Bonus, nie Pflichtweg). 0 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(600, 780, 1200, 40, 'castle'));            // top 760 [0,1200]
    platforms.push(...plateauSection(1200, 760, [
      { dx: 0, dy: 0, w: 300, h: 40, type: 'castle' },                   // top 760 [1200,1500]
      { dx: 340, dy: 70, w: 260, h: 40, type: 'stone' },                 // top 690 [1540,1800]
      { dx: 640, dy: 140, w: 300, h: 40, type: 'castle' },               // top 620 [1840,2140]
    ]));
    platforms.push(createPlat(2400, 632, 160, 24, 'platform_medium'));   // top 620
    platforms.push(createPlat(2750, 582, 140, 24, 'platform_hard'));     // top 570
    platforms.push(createPlat(3100, 512, 180, 24, 'platform_medium'));   // top 500
    platforms.push(createPlat(3900, 660, 1000, 40, 'castle'));           // top 640 [3400,4400]
    platforms.push(createPlat(4600, 592, 140, 24, 'platform_hard'));     // top 580 obere Grabenroute
    platforms.push(...pitWithLedges(4400, 640, 300, 180, 'cave'));   // Grabenboden top 820
    platforms.push(createPlat(4840, 780, 140, 24, 'platform_easy'));     // top 768 Graben-Ausstieg
    platforms.push(createPlat(5200, 672, 600, 40, 'castle'));            // top 652 [4900,5500]
    platforms.push(...overhangSection(5500, 652, 700, 5800, 180, 'castle')); // Spalt [5800,5980]
    platforms.push(createPlat(5890, 512, 160, 24, 'platform_medium'));   // top 500 Wehrgang
    platforms.push(createPlat(6800, 692, 900, 40, 'castle'));            // top 672 [6350,7250]
    platforms.push(...twoTierSection(7250, 672, 900, 'castle', 'platform_medium')); // obere Route top 512
    platforms.push(createPlat(8675, 692, 650, 40, 'castle'));            // top 672 Ziel [8350,9000]
    platforms.push(createPlat(2250, 480, 140, 24, 'platform_hard'));     // top 468 Aufzug-Nest
    platforms.push(createPlat(8330, 512, 120, 24, 'platform_hard'));     // top 500 Schatzkammer

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(250, 700, 950, 700, 4));
    coins.push(...coinArc(1700, 630, 5, 70, 70));
    coins.push(...coinTrail(1900, 560, 2100, 560, 2));
    coins.push(...coinLadder(2250, 640, 520, 4));
    coins.push(...coinDiamond(2400, 400, 60));
    coins.push(...coinDiamond(2750, 490, 50));
    coins.push(...coinTrail(3500, 580, 4300, 580, 4));
    coins.push(...coinArc(4550, 700, 5, 80, 70));
    coins.push(...coinTrail(4560, 750, 4640, 750, 2));
    coins.push(...coinTrail(4950, 600, 5400, 600, 4));
    coins.push(...coinArc(5890, 440, 5, 60, 60));
    coins.push(...coinTrail(6400, 600, 7150, 600, 4));
    coins.push(...coinTrail(7350, 460, 8050, 460, 4));
    coins.push(...coinTrail(8450, 600, 8950, 600, 4));
    coins.push(...coinTrail(8300, 460, 8360, 460, 2));

    return {
      id: 85, name: 'Burghof', width: 9500, height: 1000, biome: 'castle-final',
      platforms,
      movingPlatforms: [
        createMovingPlat(2250, 700, 120, 24, 'platform_easy', 'vertical', 100, 20),
      ],
      coins,
      questionBlocks: [
        createQB(700, 670, 'mushroom'),
        createQB(3700, 560, 'coin'),
        createQB(6500, 580, 'flower'),
        createQB(8800, 590, 'star'),
      ],
      enemies: [
        createEnemy(800, 740, 'goomba'),
        createEnemy(1250, 740, 'koopa'),
        createEnemy(1700, 670, 'spiny'),
        createEnemy(2000, 600, 'crab'),
        createEnemy(3600, 620, 'robot'),
        createEnemy(4100, 620, 'goomba'),
        createEnemy(5000, 590, 'boo'),
        createEnemy(6000, 470, 'thwomp'),
        createEnemy(6600, 652, 'robot'),
        createEnemy(7050, 652, 'koopa'),
        createEnemy(7600, 600, 'ghost'),
        createEnemy(8500, 652, 'spiny'),
        createEnemy(8700, 420, 'thwomp'),
      ],
      decorations: [
        createDeco(300, 720, 'torch'),
        createDeco(1000, 720, 'banner'),
        createDeco(1300, 650, 'chain'),
        createDeco(1900, 580, 'skull'),
        createDeco(2500, 580, 'torch'),
        createDeco(3500, 600, 'banner'),
        createDeco(4200, 600, 'chain'),
        createDeco(5300, 612, 'torch'),
        createDeco(5600, 560, 'banner'),
        createDeco(6900, 632, 'skull'),
        createDeco(7600, 632, 'torch'),
        createDeco(8700, 632, 'boss-flag'),
        createDeco(8950, 632, 'torch'),
      ],
      playerStart: { x: 200, y: 736 },
      goal: { x: 8800, y: 672 },
      timeBonus: 150,
      keys: [createKey(2250, 430)],
      doors: [createDoor(8000, 432, 60, 160)],
    };
  })(),

  // ============================================================
  // Level 86 (Zugbruecke): Burggraben mit solider unterer Route und
  // brueckelnder Zugbruecke (Risiko-Abkuerzung), Kanonen bestreichen
  // den Hof, Zwei-Ebenen-Gang, vertikale Aufzugbruecke ueber den
  // zweiten Graben, Treppe zum Tor. 2 Spikes, 1 Feder.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(700, 780, 1400, 40, 'castle'));            // top 760 [0,1400]
    platforms.push(...pitWithLedges(1400, 760, 500, 200, 'cave'));   // Grabenboden top 960
    platforms.push(createCrumblePlat(1520, 748, 140, 24, 'platform_medium')); // Zugbruecke top 736
    platforms.push(createCrumblePlat(1750, 736, 140, 24, 'platform_medium')); // top 724
    platforms.push(createCrumblePlat(1980, 748, 160, 24, 'platform_hard'));   // top 736
    platforms.push(createPlat(1980, 890, 140, 24, 'platform_easy'));     // top 878 Graben-Ausstieg
    platforms.push(createPlat(2700, 780, 1300, 40, 'castle'));           // top 760 [2050,3350]
    platforms.push(createPlat(3000, 472, 160, 24, 'platform_hard'));     // top 460 Feder-Nest
    platforms.push(...twoTierSection(3350, 760, 1000, 'castle', 'stone')); // obere Route top 600
    platforms.push(createPlat(4950, 780, 1000, 40, 'castle'));           // top 760 [4450,5450]
    platforms.push(...overhangSection(5450, 760, 800, 5750, 200, 'castle')); // Spalt [5750,5950]
    platforms.push(createPlat(6800, 780, 1000, 40, 'castle'));           // top 760 [6300,7300]
    platforms.push(...gapWithPlatforms(1, 7300, 772, 200, 1, {
      widths: [110], dy: [20], types: ['platform_medium'], xOffsets: [0],
    }));                                                                 // top 740 Trittstein
    platforms.push(createPlat(7900, 700, 800, 40, 'castle'));            // top 680 [7500,8300]
    platforms.push(...pitWithLedges(8300, 680, 400, 200, 'cave'));   // Grabenboden top 900
    platforms.push(createPlat(8760, 810, 140, 24, 'platform_easy'));     // top 798 Graben-Ausstieg
    platforms.push(createPlat(9250, 700, 900, 40, 'castle'));            // top 680 [8800,9700]
    platforms.push(...staircase(9700, 680, 2, 40, 140, 30, 'stone'));    // Stufen top 640/600
    platforms.push(createPlat(10500, 620, 900, 40, 'castle'));           // top 600 Tor [10050,10950]

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(200, 700, 1100, 700, 4));
    coins.push(...coinArc(1650, 860, 5, 80, 70));
    coins.push(...coinLadder(3000, 700, 500, 4));
    coins.push(...coinDiamond(3000, 380, 70));
    coins.push(...coinTrail(3500, 680, 4300, 680, 4));
    coins.push(...coinTrail(4550, 700, 5400, 700, 4));
    coins.push(...coinArc(5890, 700, 5, 80, 70));
    coins.push(...coinTrail(6400, 700, 7250, 700, 4));
    coins.push(...coinTrail(7550, 620, 8250, 620, 4));
    coins.push(...coinDiamond(8550, 480, 60));
    coins.push(...coinTrail(8350, 840, 8650, 840, 2));
    coins.push(...coinTrail(8850, 620, 9650, 620, 4));
    coins.push(...coinLadder(9800, 620, 450, 4));
    coins.push(...coinTrail(10100, 540, 10850, 540, 4));

    return {
      id: 86, name: 'Zugbruecke', width: 11500, height: 1000, biome: 'castle-final',
      platforms,
      movingPlatforms: [
        createMovingPlat(8550, 620, 120, 24, 'platform_hard', 'vertical', 100, 20),
      ],
      coins,
      questionBlocks: [
        createQB(500, 680, 'mushroom'),
        createQB(1100, 680, 'coin'),
        createQB(3700, 670, 'flower'),
        createQB(6500, 670, 'star'),
        createQB(9200, 590, 'oneup'),
      ],
      enemies: [
        createEnemy(800, 740, 'goomba'),
        createEnemy(1200, 740, 'koopa'),
        createEnemy(2400, 740, 'robot'),
        createEnemy(3000, 740, 'spiny'),
        createEnemy(4000, 580, 'crab'),
        createEnemy(4700, 740, 'robot'),
        createEnemy(6100, 740, 'koopa'),
        createEnemy(6650, 740, 'spiny'),
        createEnemy(7100, 740, 'robot'),
        createEnemy(7700, 480, 'thwomp'),
        createEnemy(8100, 560, 'boo'),
        createEnemy(9100, 660, 'koopa'),
        createEnemy(9400, 540, 'ghost'),
        createEnemy(10400, 580, 'robot'),
      ],
      decorations: [
        createDeco(300, 720, 'torch'),
        createDeco(900, 720, 'banner'),
        createDeco(1500, 560, 'chain'),
        createDeco(2600, 720, 'torch'),
        createDeco(3200, 720, 'skull'),
        createDeco(4300, 720, 'chain'),
        createDeco(5100, 720, 'banner'),
        createDeco(6000, 720, 'torch'),
        createDeco(7000, 720, 'skull'),
        createDeco(7800, 640, 'banner'),
        createDeco(9200, 640, 'torch'),
        createDeco(10400, 560, 'boss-flag'),
        createDeco(10850, 560, 'torch'),
      ],
      playerStart: { x: 200, y: 736 },
      goal: { x: 10600, y: 600 },
      timeBonus: 180,
      springs: [createSpring(3000, 760)],
      spikes: [createSpike(2450, 752), createSpike(6900, 752)],
      cannons: [
        createCannon(2200, 640, 1, 2400, 220),
        createCannon(3250, 640, -1, 2400, 220),
        createCannon(7000, 640, 1, 2200, 240),
      ],
    };
  })(),

  // ============================================================
  // Level 87 (Kerkerkanaele): zwei Kanaele mit Bruecken und
  // Ausstiegen, Zellen-Schatzkammern hinter Tueren (Bonus),
  // Zwei-Ebenen-Gang, Ueberhang, circulare und vertikale Aufzuege,
  // Stufen zum Kerker-Tor. 3 Spikes, 1 Feder, 2 Schluessel + 2 Tueren.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(600, 740, 1200, 40, 'castle'));            // top 720 [0,1200]
    platforms.push(...pitWithLedges(1200, 720, 420, 200, 'cave'));   // Kanalboden top 920
    platforms.push(createPlat(1310, 632, 120, 24, 'platform_medium'));   // top 620
    platforms.push(createPlat(1490, 632, 120, 24, 'platform_medium'));   // top 620
    platforms.push(createPlat(1660, 644, 140, 24, 'platform_easy'));     // top 632
    platforms.push(createPlat(1560, 830, 120, 24, 'platform_easy'));     // top 818 Kanal-Ausstieg
    platforms.push(createPlat(2350, 700, 1500, 40, 'stone'));            // top 680 [1600,3100]
    platforms.push(createPlat(2350, 622, 120, 24, 'platform_medium'));   // top 610 Stufe
    platforms.push(createPlat(2500, 512, 140, 24, 'platform_hard'));     // top 500 Schluesselplateau
    platforms.push(createPlat(2710, 622, 240, 24, 'platform_medium'));   // top 610 Zellenboden
    platforms.push(...twoTierSection(3100, 680, 900, 'stone', 'castle')); // obere Route top 520
    platforms.push(createPlat(4400, 680, 900, 40, 'castle'));            // top 660 [3950,4850]
    platforms.push(createPlat(4600, 372, 160, 24, 'platform_hard'));     // top 360 Feder-Nest
    platforms.push(...overhangSection(4850, 660, 800, 5200, 200, 'castle')); // Spalt [5200,5400]
    platforms.push(createPlat(5500, 570, 200, 24, 'platform_medium'));   // top 558 Zellenboden 2
    platforms.push(createPlat(6250, 680, 1100, 40, 'stone'));            // top 660 [5700,6800]
    platforms.push(...pitWithLedges(6800, 660, 700, 260, 'cave'));   // Kanalboden top 940
    platforms.push(createPlat(6900, 580, 120, 24, 'platform_medium'));   // top 568
    platforms.push(createPlat(7150, 540, 120, 24, 'platform_hard'));     // top 528
    platforms.push(createPlat(7400, 580, 120, 24, 'platform_medium'));   // top 568
    platforms.push(createPlat(7620, 620, 120, 24, 'platform_medium'));   // top 608
    platforms.push(createPlat(7450, 880, 120, 24, 'platform_easy'));     // top 868 Kanal-Ausstieg
    platforms.push(createPlat(7650, 800, 130, 24, 'platform_easy'));     // top 788
    platforms.push(createPlat(8400, 720, 1200, 40, 'castle'));           // top 700 [7800,9000]
    platforms.push(...staircase(9000, 700, 3, 60, 150, 40, 'stone'));    // Stufen top 640/580/520
    platforms.push(createPlat(10100, 660, 1000, 40, 'castle'));          // top 640 [9600,10600]
    platforms.push(createPlat(11000, 660, 400, 40, 'castle'));           // top 640 [10800,11200]

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(200, 660, 1050, 660, 4));
    coins.push(...coinArc(1650, 800, 5, 80, 70));
    coins.push(...coinTrail(1700, 560, 2150, 560, 3));
    coins.push(...coinDiamond(2500, 420, 60));
    coins.push(...coinDiamond(2740, 520, 50));
    coins.push(...coinTrail(3300, 460, 3800, 460, 3));
    coins.push(...coinDiamond(4600, 280, 70));
    coins.push(...coinTrail(4100, 600, 4750, 600, 4));
    coins.push(...coinTrail(5500, 500, 5580, 500, 2));
    coins.push(...coinTrail(5850, 600, 6650, 600, 4));
    coins.push(...coinArc(7400, 480, 5, 80, 70));
    coins.push(...coinTrail(7600, 840, 7700, 840, 2));
    coins.push(...coinLadder(9700, 640, 500, 4));
    coins.push(...coinTrail(8150, 640, 8900, 640, 4));
    coins.push(...coinTrail(9200, 620, 9500, 620, 3));
    coins.push(...coinTrail(9800, 580, 10500, 580, 4));
    coins.push(...coinTrail(10850, 600, 11150, 600, 3));

    return {
      id: 87, name: 'Kerkerkanaele', width: 11200, height: 1000, biome: 'castle-final',
      platforms,
      movingPlatforms: [
        createMovingPlat(7150, 760, 120, 24, 'platform_easy', 'circular', 90, 20),
        createMovingPlat(9700, 480, 110, 24, 'platform_medium', 'vertical', 80, 18),
      ],
      coins,
      questionBlocks: [
        createQB(500, 640, 'mushroom'),
        createQB(1900, 590, 'coin'),
        createQB(4300, 570, 'flower'),
        createQB(6600, 570, 'star'),
        createQB(10400, 560, 'coin'),
      ],
      enemies: [
        createEnemy(800, 700, 'goomba'),
        createEnemy(1050, 700, 'koopa'),
        createEnemy(1900, 660, 'robot'),
        createEnemy(2300, 660, 'spiny'),
        createEnemy(2900, 660, 'crab'),
        createEnemy(3700, 420, 'thwomp'),
        createEnemy(4200, 640, 'robot'),
        createEnemy(5100, 560, 'ghost'),
        createEnemy(6000, 640, 'spiny'),
        createEnemy(6500, 640, 'robot'),
        createEnemy(7000, 520, 'boo'),
        createEnemy(7100, 620, 'koopa'),
        createEnemy(8100, 680, 'crab'),
        createEnemy(9300, 680, 'koopa'),
        createEnemy(9900, 620, 'robot'),
        createEnemy(10900, 620, 'spiny'),
      ],
      decorations: [
        createDeco(300, 680, 'torch'),
        createDeco(800, 680, 'chain'),
        createDeco(1400, 560, 'banner'),
        createDeco(2000, 640, 'torch'),
        createDeco(2600, 580, 'skull'),
        createDeco(3400, 640, 'chain'),
        createDeco(4100, 620, 'torch'),
        createDeco(5000, 620, 'banner'),
        createDeco(5900, 620, 'skull'),
        createDeco(6600, 620, 'torch'),
        createDeco(8000, 660, 'chain'),
        createDeco(8800, 660, 'banner'),
        createDeco(9900, 600, 'torch'),
        createDeco(10400, 600, 'boss-flag'),
        createDeco(11050, 600, 'torch'),
      ],
      playerStart: { x: 200, y: 696 },
      goal: { x: 10200, y: 640 },
      timeBonus: 200,
      springs: [createSpring(4600, 660)],
      spikes: [
        createSpike(2200, 672),
        createSpike(6000, 652),
        createSpike(8850, 692),
      ],
      keys: [
        createKey(2500, 460),
        createKey(3300, 480),
      ],
      doors: [
        createDoor(2650, 530, 60, 160),
        createDoor(5450, 478, 60, 160),
      ],
      cannons: [
        createCannon(2000, 560, 1, 2400, 220),
        createCannon(6400, 540, -1, 2200, 240),
      ],
    };
  })(),

  // ============================================================
  // Level 88 (Turm-Kletterer): langer Wallgang mit Ueberhang,
  // Zwei-Ebenen-Gang, vertikalem Aufzug, dann Zickzack-Aufstieg
  // am Wehrturm bis zum Gipfel (720 -> 100). 2 Checkpoints,
  // 3 Spikes, 2 Kanonen, 1 Schluessel + 1 Tur zur Schatzkammer.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(800, 740, 1600, 40, 'castle'));            // top 720 [0,1600]
    platforms.push(createPlat(1750, 680, 140, 24, 'platform_easy'));     // top 668
    platforms.push(createPlat(2000, 632, 160, 24, 'platform_medium'));   // top 620
    platforms.push(createPlat(2800, 700, 1400, 40, 'castle'));           // top 680 [2100,3500]
    platforms.push(...overhangSection(3500, 680, 900, 3850, 200, 'castle')); // Spalt [3850,4050]
    platforms.push(createPlat(4950, 700, 1000, 40, 'stone'));            // top 680 [4450,5450] Checkpoint 1
    platforms.push(createPlat(4900, 610, 120, 24, 'platform_easy'));     // top 598 Stufe
    platforms.push(createPlat(5000, 520, 140, 24, 'platform_hard'));     // top 508 Schluesselplateau
    platforms.push(...pitWithLedges(5450, 680, 500, 220, 'cave'));   // Grabenboden top 900
    platforms.push(createPlat(5600, 600, 140, 24, 'platform_medium'));   // top 588 obere Route
    platforms.push(createPlat(5800, 560, 140, 24, 'platform_hard'));     // top 548
    platforms.push(createPlat(6030, 850, 120, 24, 'platform_easy'));     // top 838 untere Route
    platforms.push(createPlat(6180, 760, 120, 24, 'platform_easy'));     // top 748
    platforms.push(createPlat(6500, 680, 1100, 40, 'castle'));           // top 660 [5950,7050]
    platforms.push(...twoTierSection(7050, 660, 900, 'castle', 'platform_medium')); // obere Route top 500
    platforms.push(createPlat(8600, 660, 1000, 40, 'stone'));            // top 640 [8100,9100]
    platforms.push(createPlat(9800, 700, 1000, 40, 'castle'));           // top 680 [9300,10300]
    platforms.push(createPlat(11000, 740, 1200, 40, 'stone'));           // top 720 [10400,11600] Checkpoint 2
    platforms.push(createPlat(11460, 640, 220, 24, 'platform_medium'));  // top 628 Schatzkammer
    platforms.push(createPlat(12300, 700, 1000, 40, 'castle'));          // top 680 [11800,12800]
    platforms.push(createPlat(13500, 740, 1400, 40, 'castle'));          // top 720 Turmbasis [12800,14200]
    platforms.push(createPlat(14350, 720, 200, 24, 'platform_medium'));  // top 708 Turmrampe
    platforms.push(...zigzagClimb(14300, 720, 6, 90, 110, 150, 'platform_medium')); // Zickzack 630..180
    platforms.push(createPlat(14400, 130, 500, 60, 'castle'));           // top 100 Gipfel [14150,14650]
    platforms.push(createPlat(4500, 420, 140, 24, 'platform_hard'));     // top 408 Aufzug-Nest

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(200, 660, 1100, 660, 4));
    coins.push(...coinTrail(1400, 620, 1500, 620, 2));
    coins.push(...coinArc(1750, 560, 5, 70, 60));
    coins.push(...coinTrail(2200, 620, 3300, 620, 4));
    coins.push(...coinArc(3900, 620, 5, 70, 60));
    coins.push(...coinTrail(4400, 620, 5400, 620, 4));
    coins.push(...coinLadder(4500, 640, 480, 4));
    coins.push(...coinDiamond(4500, 320, 60));
    coins.push(...coinDiamond(5000, 400, 60));
    coins.push(...coinTrail(5300, 760, 5900, 760, 3));
    coins.push(...coinArc(6100, 720, 5, 80, 70));
    coins.push(...coinTrail(6300, 600, 6900, 600, 4));
    coins.push(...coinTrail(7200, 480, 7800, 480, 4));
    coins.push(...coinTrail(8200, 560, 9000, 560, 4));
    coins.push(...coinTrail(9400, 620, 10200, 620, 4));
    coins.push(...coinDiamond(11460, 540, 50));
    coins.push(...coinTrail(10500, 660, 11500, 660, 4));
    coins.push(...coinTrail(11900, 620, 12700, 620, 4));
    coins.push(...coinLadder(13100, 700, 500, 5));
    coins.push(...coinTrail(12900, 660, 14100, 660, 5));
    coins.push(...coinArc(14400, 600, 5, 70, 60));
    coins.push(...coinTrail(14200, 400, 14600, 400, 3));
    coins.push(...coinTrail(14250, 60, 14550, 60, 3));

    return {
      id: 88, name: 'Turm-Kletterer', width: 16000, height: 1000, biome: 'castle-final',
      platforms,
      movingPlatforms: [
        createMovingPlat(4500, 620, 120, 24, 'platform_medium', 'vertical', 100, 20),
        createMovingPlat(13100, 560, 120, 24, 'platform_easy', 'circular', 100, 20),
      ],
      coins,
      questionBlocks: [
        createQB(500, 630, 'mushroom'),
        createQB(3000, 590, 'coin'),
        createQB(6300, 560, 'flower'),
        createQB(9000, 560, 'star'),
        createQB(10600, 630, 'oneup'),
        createQB(12600, 600, 'mushroom'),
      ],
      enemies: [
        createEnemy(900, 700, 'goomba'),
        createEnemy(1300, 700, 'koopa'),
        createEnemy(2000, 600, 'spiny'),
        createEnemy(2500, 660, 'robot'),
        createEnemy(3100, 660, 'crab'),
        createEnemy(3700, 450, 'thwomp'),
        createEnemy(4200, 660, 'koopa'),
        createEnemy(5000, 520, 'boo'),
        createEnemy(5200, 660, 'robot'),
        createEnemy(5800, 500, 'ghost'),
        createEnemy(6500, 640, 'robot'),
        createEnemy(6900, 640, 'spiny'),
        createEnemy(7500, 470, 'thwomp'),
        createEnemy(8300, 620, 'robot'),
        createEnemy(8900, 620, 'crab'),
        createEnemy(9600, 660, 'koopa'),
        createEnemy(10500, 700, 'robot'),
        createEnemy(11300, 700, 'spiny'),
        createEnemy(12000, 560, 'ghost'),
        createEnemy(12500, 660, 'robot'),
        createEnemy(13300, 660, 'crab'),
        createEnemy(14500, 80, 'koopa'),
      ],
      decorations: [
        createDeco(300, 680, 'torch'),
        createDeco(900, 680, 'banner'),
        createDeco(1600, 600, 'chain'),
        createDeco(2300, 640, 'torch'),
        createDeco(3000, 640, 'skull'),
        createDeco(3700, 620, 'banner'),
        createDeco(4400, 640, 'torch'),
        createDeco(5100, 640, 'chain'),
        createDeco(5900, 620, 'skull'),
        createDeco(6600, 620, 'torch'),
        createDeco(7400, 600, 'banner'),
        createDeco(8300, 600, 'chain'),
        createDeco(9400, 640, 'torch'),
        createDeco(10600, 680, 'skull'),
        createDeco(12000, 640, 'banner'),
        createDeco(13000, 640, 'torch'),
        createDeco(14400, 60, 'boss-flag'),
        createDeco(14150, 60, 'torch'),
      ],
      playerStart: { x: 200, y: 696 },
      goal: { x: 14400, y: 100 },
      timeBonus: 280,
      checkpoints: [
        createCheckpoint(5000, 664),
        createCheckpoint(11100, 704),
      ],
      spikes: [
        createSpike(700, 712),
        createSpike(8500, 632),
        createSpike(12100, 672),
      ],
      keys: [createKey(5000, 470)],
      doors: [createDoor(11420, 548, 60, 160)],
      cannons: [
        createCannon(7000, 540, 1, 2400, 220),
        createCannon(10800, 600, -1, 2200, 240),
      ],
    };
  })(),

  // ============================================================
  // Level 89 (Boss-Horde): Arenen-Kette mit zwei Bossen, Gelaende-
  // stufen, Zwei-Ebenen-Gang, zwei Graeben mit oberer/unterer Route,
  // Muenz-Tor (coinGoal 33), 2 Checkpoints, 2 Spikes, 1 Feder,
  // circulare + vertikale Aufzuege.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(900, 780, 1800, 40, 'castle'));            // top 760 [0,1800]
    platforms.push(...plateauSection(1800, 760, [
      { dx: 0, dy: 0, w: 320, h: 40, type: 'stone' },                    // top 760 [1800,2120]
      { dx: 360, dy: 80, w: 300, h: 40, type: 'castle' },                 // top 680 [2160,2460]
      { dx: 700, dy: 160, w: 340, h: 40, type: 'stone' },                 // top 600 [2500,2840]
    ]));
    platforms.push(createPlat(3500, 740, 1400, 40, 'castle'));           // top 720 Arena 1 [2800,4200]
    platforms.push(...pitWithLedges(4200, 720, 500, 200, 'cave'));   // Grabenboden top 920
    platforms.push(createPlat(4350, 640, 140, 24, 'platform_medium'));   // top 628
    platforms.push(createPlat(4600, 600, 140, 24, 'platform_hard'));     // top 588
    platforms.push(createPlat(4750, 860, 120, 24, 'platform_easy'));     // top 848 Ausstieg
    platforms.push(createPlat(5350, 740, 1000, 40, 'stone'));            // top 720 [4850,5850]
    platforms.push(createPlat(5000, 420, 140, 24, 'platform_hard'));     // top 408 Feder-Nest
    platforms.push(...twoTierSection(5850, 720, 1000, 'castle', 'stone')); // obere Route top 560
    platforms.push(createPlat(7500, 680, 1200, 40, 'castle'));           // top 660 [6900,8100]
    platforms.push(...overhangSection(8100, 660, 900, 8450, 200, 'castle')); // Spalt [8450,8650]
    platforms.push(createPlat(9600, 680, 1200, 40, 'stone'));            // top 660 [9000,10200] Checkpoint 2
    platforms.push(...pitWithLedges(10200, 660, 600, 240, 'cave'));  // Grabenboden top 880
    platforms.push(createPlat(10350, 560, 130, 24, 'platform_medium'));  // top 548
    platforms.push(createPlat(10600, 520, 130, 24, 'platform_hard'));    // top 508
    platforms.push(createPlat(10850, 560, 130, 24, 'platform_medium'));  // top 548
    platforms.push(createPlat(10700, 790, 130, 24, 'platform_easy'));    // top 778 Ausstieg
    platforms.push(createPlat(11400, 700, 1200, 40, 'castle'));          // top 680 [10800,12000]
    platforms.push(createPlat(12150, 660, 140, 24, 'platform_easy'));    // top 648 Tritt
    platforms.push(createPlat(13100, 700, 1600, 40, 'castle'));          // top 680 Bossarena [12300,13900]
    platforms.push(...staircase(13900, 680, 3, 60, 150, 40, 'stone'));   // Stufen top 620/560/500
    platforms.push(createPlat(15000, 540, 1100, 40, 'castle'));          // top 520 Tor [14450,15550]

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(200, 700, 1600, 700, 5));
    coins.push(...coinTrail(1950, 640, 2750, 640, 4));
    coins.push(...coinTrail(3000, 680, 4100, 680, 4));
    coins.push(...coinArc(3450, 660, 5, 80, 70));
    coins.push(...coinArc(4450, 840, 5, 80, 70));
    coins.push(...coinDiamond(4450, 540, 60));
    coins.push(...coinTrail(4950, 660, 5800, 660, 4));
    coins.push(...coinTrail(5000, 370, 5150, 370, 2));
    coins.push(...coinTrail(6050, 480, 6750, 480, 4));
    coins.push(...coinDiamond(6300, 380, 60));
    coins.push(...coinTrail(7000, 600, 8000, 600, 4));
    coins.push(...coinArc(8850, 600, 5, 80, 70));
    coins.push(...coinTrail(9200, 600, 10100, 600, 4));
    coins.push(...coinTrail(10300, 750, 10700, 750, 2));
    coins.push(...coinArc(10600, 440, 5, 80, 70));
    coins.push(...coinTrail(10950, 620, 11950, 620, 5));
    coins.push(...coinTrail(12400, 620, 13800, 620, 5));
    coins.push(...coinDiamond(12500, 440, 60));
    coins.push(...coinTrail(14000, 440, 14300, 440, 3));
    coins.push(...coinTrail(14500, 470, 15500, 470, 4));

    return {
      id: 89, name: 'Boss-Horde', width: 16000, height: 1000, biome: 'castle-final',
      platforms,
      movingPlatforms: [
        createMovingPlat(6300, 560, 120, 24, 'platform_easy', 'circular', 100, 20),
        createMovingPlat(12500, 560, 120, 24, 'platform_medium', 'vertical', 100, 20),
      ],
      coins,
      questionBlocks: [
        createQB(500, 680, 'mushroom'),
        createQB(3000, 620, 'coin'),
        createQB(5600, 620, 'flower'),
        createQB(9500, 580, 'star'),
        createQB(11700, 600, 'coin'),
        createQB(14700, 440, 'mushroom'),
      ],
      enemies: [
        createEnemy(1000, 740, 'goomba'),
        createEnemy(1400, 740, 'koopa'),
        createEnemy(2000, 740, 'spiny'),
        createEnemy(2300, 660, 'robot'),
        createEnemy(2650, 580, 'crab'),
        createEnemy(3100, 700, 'robot'),
        createEnemy(3400, 700, 'spiny'),
        createEnemy(3900, 700, 'koopa'),
        createEnemy(4400, 460, 'boo'),
        createEnemy(5200, 700, 'crab'),
        createEnemy(5500, 700, 'robot'),
        createEnemy(6200, 500, 'ghost'),
        createEnemy(6500, 700, 'spiny'),
        createEnemy(7100, 640, 'robot'),
        createEnemy(7600, 640, 'koopa'),
        createEnemy(8300, 440, 'thwomp'),
        createEnemy(9300, 640, 'crab'),
        createEnemy(9900, 640, 'spiny'),
        createEnemy(10600, 400, 'boo'),
        createEnemy(11100, 660, 'robot'),
        createEnemy(11600, 660, 'koopa'),
        createEnemy(12600, 640, 'spiny'),
        createEnemy(13000, 640, 'boss'),
        createEnemy(13600, 640, 'boss'),
        createEnemy(14100, 480, 'ghost'),
        createEnemy(14700, 500, 'robot'),
      ],
      decorations: [
        createDeco(300, 720, 'torch'),
        createDeco(1000, 720, 'banner'),
        createDeco(1700, 680, 'chain'),
        createDeco(2200, 640, 'torch'),
        createDeco(2900, 680, 'skull'),
        createDeco(3600, 680, 'banner'),
        createDeco(4500, 680, 'torch'),
        createDeco(5400, 680, 'chain'),
        createDeco(6100, 680, 'skull'),
        createDeco(7100, 620, 'torch'),
        createDeco(8300, 620, 'banner'),
        createDeco(9500, 620, 'chain'),
        createDeco(11200, 640, 'torch'),
        createDeco(12500, 640, 'skull'),
        createDeco(14000, 500, 'banner'),
        createDeco(15100, 480, 'boss-flag'),
        createDeco(15400, 480, 'torch'),
      ],
      playerStart: { x: 200, y: 736 },
      goal: { x: 15100, y: 520 },
      timeBonus: 280,
      coinGoal: 33,
      checkpoints: [
        createCheckpoint(3500, 704),
        createCheckpoint(9600, 644),
      ],
      springs: [createSpring(5000, 720)],
      spikes: [
        createSpike(3700, 712),
        createSpike(11200, 672),
      ],
      cannons: [
        createCannon(12600, 560, 1, 2200, 240),
      ],
    };
  })(),

  // ============================================================
  // Level 90 (Bossarena): elementefrei — keine Spikes, Federn,
  // Brueckel- oder Wind-Elemente, keine Kanonen. Breiter begehbarer
  // Arenaboden, Saeulen als Deckung, Dachbalken-Route mit Muenzen,
  // circulare Aufzugbahn zum Hochnest, Boss-Duell vor dem Ziel.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(700, 780, 1400, 40, 'castle'));            // top 760 [0,1400]
    platforms.push(createPlat(1650, 700, 300, 40, 'stone'));             // top 680 [1500,1800]
    platforms.push(createPlat(2100, 620, 300, 40, 'castle'));            // top 600 [1950,2250]
    platforms.push(createPlat(2400, 700, 200, 40, 'stone'));             // top 680 [2300,2500]
    platforms.push(createPlat(7500, 820, 9800, 40, 'castle'));           // Arenaboden top 800 [2600,12400]
    platforms.push(createPlat(3800, 740, 140, 120, 'stone'));            // Saeule top 680
    platforms.push(createPlat(5600, 740, 160, 120, 'metal'));            // Saeule top 680
    platforms.push(createPlat(8500, 740, 140, 120, 'stone'));            // Saeule top 680
    platforms.push(createPlat(10500, 740, 160, 120, 'castle'));          // Saeule top 680
    platforms.push(createPlat(4140, 560, 160, 24, 'platform_hard'));     // Dachbalken top 548
    platforms.push(createPlat(4500, 500, 160, 24, 'platform_medium'));   // top 488
    platforms.push(createPlat(4850, 540, 160, 24, 'platform_hard'));     // top 528
    platforms.push(createPlat(5200, 490, 160, 24, 'platform_medium'));   // top 478
    platforms.push(createPlat(5550, 530, 160, 24, 'platform_hard'));     // top 518
    platforms.push(createPlat(5900, 490, 160, 24, 'platform_medium'));   // top 478
    platforms.push(createPlat(6250, 540, 180, 24, 'platform_hard'));     // top 528
    platforms.push(createPlat(6600, 490, 160, 24, 'platform_medium'));   // top 478
    platforms.push(createPlat(9500, 400, 160, 24, 'platform_hard'));     // top 388 Hochnest
    platforms.push(createPlat(12700, 720, 600, 40, 'castle'));           // top 700 Ziel [12400,13000]

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(200, 700, 1300, 700, 5));
    coins.push(...coinTrail(1550, 620, 1750, 620, 2));
    coins.push(...coinArc(2100, 540, 5, 80, 70));
    coins.push(...coinTrail(2700, 740, 3700, 740, 4));
    coins.push(...coinTrail(3900, 600, 5500, 600, 4));
    coins.push(...coinTrail(5700, 600, 8400, 600, 5));
    coins.push(...coinTrail(8600, 600, 10400, 600, 5));
    coins.push(...coinDiamond(4200, 480, 60));
    coins.push(...coinDiamond(4850, 440, 60));
    coins.push(...coinDiamond(5550, 430, 60));
    coins.push(...coinDiamond(6250, 440, 60));
    coins.push(...coinLadder(9500, 640, 420, 4));
    coins.push(...coinDiamond(9500, 330, 60));
    coins.push(...coinTrail(10600, 620, 12300, 620, 5));
    coins.push(...coinTrail(12450, 640, 12950, 640, 4));

    return {
      id: 90, name: 'Bossarena', width: 13000, height: 1000, biome: 'castle-final',
      platforms,
      movingPlatforms: [
        createMovingPlat(9500, 560, 120, 24, 'platform_easy', 'circular', 100, 20),
      ],
      coins,
      questionBlocks: [
        createQB(400, 680, 'mushroom'),
        createQB(4850, 430, 'flower'),
        createQB(7000, 720, 'star'),
        createQB(11000, 620, 'mushroom'),
      ],
      enemies: [
        createEnemy(3300, 780, 'spiny'),
        createEnemy(5200, 780, 'robot'),
        createEnemy(6500, 760, 'boss'),
        createEnemy(7300, 780, 'koopa'),
        createEnemy(9600, 780, 'spiny'),
        createEnemy(11300, 780, 'robot'),
      ],
      decorations: [
        createDeco(300, 720, 'torch'),
        createDeco(1000, 720, 'banner'),
        createDeco(1700, 640, 'chain'),
        createDeco(2700, 760, 'torch'),
        createDeco(3800, 620, 'banner'),
        createDeco(4600, 700, 'skull'),
        createDeco(5600, 640, 'torch'),
        createDeco(6800, 760, 'chain'),
        createDeco(8000, 760, 'banner'),
        createDeco(9000, 760, 'torch'),
        createDeco(10300, 700, 'skull'),
        createDeco(11200, 760, 'chain'),
        createDeco(12400, 660, 'torch'),
        createDeco(12800, 660, 'boss-flag'),
        createDeco(12950, 660, 'torch'),
      ],
      playerStart: { x: 200, y: 736 },
      goal: { x: 12800, y: 700 },
      timeBonus: 300,
      checkpoints: [createCheckpoint(2700, 784)],
    };
  })(),
];

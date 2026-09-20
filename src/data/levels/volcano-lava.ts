// Volcano Lava World (ids 55-60) — Phase 9 rebuild
// Archetypes:
//   L55 "Lavasteg"         - Lavasteg (Tutorial: Terrassen, Lava-Fluss mit Trittsteinen)
//   L56 "Magmasprünge"     - Magmasprünge (grosse Lavaseen, Fahr-/Kreis-/Vertikalplattformen)
//   L57 "Obsidianröhren"   - Obsidianröhren (Pipes + Piranhas, Schluessel/Tuer-Lavahöhle)
//   L58 "Kraterkletterer"  - Kraterkletterer (Zickzack-Aufstieg, Zwei-Etagen-Galerie)
//   L59 "Aschesturm-Horde" - Aschesturm-Horde (Kampf-Arenen, Waechter, Muenz-Tor)
//   L60 "Eruptions-Finale" - Eruptions-Finale (steigende Lava, Fluchtroute mit Checkpoints)
//
// Volcano gravity is 2200: sichere Aufstiege <=140px, sichere Spruenge <=190px horizontal.
// Alle Level sind as-authored loesbar — ensureSolvable() darf keine Plattform ergaenzen.
// Die Lava ist toedlich und liegt unter der Route; die solide Route kommt ohne sie aus.

import {
  LevelData, createPlat, createQB, createEnemy, createDeco, createMovingPlat,
  createSpring, createSpike, createCrumblePlat, createCheckpoint, createKey, createDoor,
  staircase, plateauSection, pitWithLedges, twoTierSection, zigzagClimb, islandCluster,
  gapWithPlatforms, coinArc, coinDiamond, coinTrail, coinLadder,
} from './helpers';

type PType = LevelData['platforms'][number]['type'];
type Plat = LevelData['platforms'][number];

/** Solider Boden von x1 bis x2 mit Oberkante topY. */
const ground = (x1: number, x2: number, topY: number, type: PType = 'stone'): Plat =>
  createPlat((x1 + x2) / 2, topY + 20, x2 - x1, 40, type);

/** Schwebende Trittplatte (24px hoch), y = Zentrum. */
const slab = (cx: number, topY: number, w: number, type: PType = 'platform_medium'): Plat =>
  createPlat(cx, topY + 12, w, 24, type);

/** Toedlicher Lava-See (60px hoch), y = Zentrum. */
const lavaPool = (x1: number, x2: number, topY = 760): Plat =>
  createPlat((x1 + x2) / 2, topY + 30, x2 - x1, 60, 'lava');

/** Obsidianroehre auf einer Flaeche mit Oberkante topY. */
const pipePair = (x: number, topY: number): Plat[] => [
  createPlat(x, topY - 32, 64, 64, 'pipe'),
  createPlat(x, topY - 76, 80, 24, 'pipe_top'),
];

export const VOLCANO_LAVA_LEVELS: LevelData[] = [
  // ============================================================
  // Level 55 (Lavasteg): sanfter Einstieg. Terrassen, ein erster
  // Lava-Fluss mit Trittsteinen, eine vertikale Plattform, eine
  // broeckelige Obsidian-Abkuerzung, ein Sprungfeder-Bonus und
  // zwei breite Arenen vor dem Zielplateau. 1 Spring, 1 Spike.
  // ============================================================
  (() => {
    const platforms = [] as Plat[];
    platforms.push(ground(0, 1200, 620));                              // top 620  [0,1200]
    platforms.push(...staircase(1200, 620, 3, 70, 140, 40, 'stone'));  // tops 550/480/410
    platforms.push(...plateauSection(1800, 410, [                        // Plateau top 410
      { dx: 0, dy: 0, w: 700, h: 40 },
      { dx: 2020, dy: 150, w: 160, h: 24, type: 'platform_hard' },       // Feder-Bonus top 260
    ]));
    platforms.push(lavaPool(2500, 3100, 740));                         // Lava-Fluss 1
    platforms.push(slab(2595, 395, 90, 'platform_easy'));              // Tritt 1 top 395
    platforms.push(slab(2780, 380, 80, 'platform_hard'));              // Tritt 2 top 380
    platforms.push(slab(2965, 395, 90, 'platform_medium'));            // Tritt 3 top 395
    platforms.push(ground(3100, 3800, 410));                           // top 410  [3100,3800]
    platforms.push(lavaPool(3800, 4300, 740));                         // Lava-Fluss 2
    platforms.push(ground(4300, 5000, 340));                           // top 340  [4300,5000]
    platforms.push(lavaPool(5000, 5560, 740));                         // Lava-Fluss 3
    platforms.push(createCrumblePlat(5280, 262, 360, 24, 'platform_medium')); // Obsidian-Abkuerzung top 250
    platforms.push(slab(5095, 330, 90, 'platform_easy'));              // sichere Tritte 330/315/330
    platforms.push(slab(5280, 315, 80, 'platform_hard'));
    platforms.push(slab(5470, 330, 100, 'platform_medium'));
    platforms.push(ground(5560, 6300, 300));                           // top 300  [5560,6300]
    platforms.push(...staircase(6300, 300, 2, 70, 140, 40, 'stone'));  // tops 230/160
    platforms.push(ground(6620, 7520, 160));                           // top 160  [6620,7520]
    platforms.push(lavaPool(7520, 8180, 740));                         // Lava-Fluss 4
    platforms.push(slab(7615, 140, 90, 'platform_hard'));
    platforms.push(slab(7800, 125, 80, 'platform_easy'));
    platforms.push(slab(7985, 140, 90, 'platform_medium'));
    platforms.push(ground(8180, 8980, 160));                           // top 160  [8180,8980]
    platforms.push(lavaPool(8980, 9900, 740));                         // grosser Lava-See
    platforms.push(slab(9150, 170, 100, 'platform_easy'));             // Tritt top 170
    platforms.push(ground(9740, 10500, 380));                          // top 380  [9740,10500]
    platforms.push(lavaPool(10500, 11000, 740));                       // Lava-Fluss 5
    platforms.push(ground(11000, 11800, 360));                         // top 360  [11000,11800]
    platforms.push(...staircase(11800, 360, 2, 80, 140, 40, 'stone')); // tops 280/200
    platforms.push(ground(12120, 13080, 200));                         // top 200  [12120,13080]
    platforms.push(lavaPool(13080, 13600, 740));                       // Lava-Fluss 6
    platforms.push(slab(13180, 180, 90, 'platform_easy'));
    platforms.push(slab(13380, 165, 80, 'platform_hard'));
    platforms.push(slab(13560, 178, 90, 'platform_medium'));
    platforms.push(ground(13660, 14540, 200));                         // Ziel-Plateau top 200
    platforms.push(ground(14540, 15460, 240));                         // Absatz top 240
    platforms.push(lavaPool(15460, 16000, 740));                       // Lava-Fluss 7
    platforms.push(slab(15555, 220, 90, 'platform_easy'));
    platforms.push(slab(15750, 205, 80, 'platform_hard'));
    platforms.push(ground(15820, 16580, 220));                         // Ausklang top 220
    platforms.push(slab(16100, 120, 140, 'platform_medium'));          // Muenz-Perch top 120

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 570, 1100, 570, 5));
    coins.push(...coinArc(2150, 330, 5, 150, 70));
    coins.push(...coinArc(2780, 310, 5, 140, 60));
    coins.push(...coinDiamond(3900, 210, 60));
    coins.push(...coinTrail(4400, 300, 4900, 300, 4));
    coins.push(...coinTrail(5120, 200, 5440, 200, 3));
    coins.push(...coinArc(5930, 230, 5, 180, 60));
    coins.push(...coinTrail(6700, 120, 7450, 120, 5));
    coins.push(...coinArc(7850, 90, 5, 150, 50));
    coins.push(...coinTrail(8250, 120, 8900, 120, 5));
    coins.push(...coinArc(9460, 220, 5, 120, 60));
    coins.push(...coinTrail(9800, 340, 10450, 340, 5));
    coins.push(...coinArc(10750, 290, 5, 130, 60));
    coins.push(...coinTrail(11100, 320, 11700, 320, 5));
    coins.push(...coinLadder(12150, 240, 120, 4));
    coins.push(...coinTrail(12250, 160, 13000, 160, 5));
    coins.push(...coinArc(13340, 140, 5, 130, 60));
    coins.push(...coinTrail(13700, 160, 14500, 160, 5));
    coins.push(...coinDiamond(15000, 180, 70));
    coins.push(...coinArc(16180, 170, 5, 130, 60));
    coins.push(...coinDiamond(16100, 60, 60));

    return {
      id: 55, name: 'Lavasteg', width: 16800, height: 800, biome: 'volcano-lava',
      platforms,
      movingPlatforms: [
        createMovingPlat(4050, 460, 120, 24, 'platform_medium', 'vertical', 120, 20),
        createMovingPlat(9460, 300, 110, 24, 'platform_hard', 'circular', 90, 22),
        createMovingPlat(10750, 340, 120, 24, 'platform_easy', 'horizontal', 150, 24),
      ],
      coins,
      questionBlocks: [
        createQB(2050, 320, 'mushroom'),
        createQB(5900, 210, 'oneup'),
        createQB(12400, 110, 'star'),
      ],
      enemies: [
        createEnemy(3300, 402, 'goomba'),
        createEnemy(3620, 402, 'spiny'),
        createEnemy(4500, 332, 'robot'),
        createEnemy(4850, 332, 'goomba'),
        createEnemy(5750, 292, 'spiny'),
        createEnemy(6100, 292, 'koopa'),
        createEnemy(7250, 152, 'robot'),
        createEnemy(8400, 152, 'spiny'),
        createEnemy(8800, 152, 'goomba'),
        createEnemy(9900, 372, 'robot'),
        createEnemy(11300, 352, 'spiny'),
        createEnemy(12550, 192, 'spiny'),
        createEnemy(12800, 192, 'robot'),
        createEnemy(14000, 192, 'spiny'),
        createEnemy(15000, 232, 'goomba'),
        createEnemy(16250, 212, 'robot'),
      ],
      decorations: [
        createDeco(300, 580, 'fire'),
        createDeco(900, 560, 'ember'),
        createDeco(1500, 470, 'lava-rock'),
        createDeco(2100, 350, 'rock'),
        createDeco(2700, 700, 'fire'),
        createDeco(3400, 340, 'ember'),
        createDeco(3900, 500, 'lava-rock'),
        createDeco(4600, 280, 'fire'),
        createDeco(5350, 700, 'ember'),
        createDeco(5800, 240, 'lava-rock'),
        createDeco(6500, 560, 'fire'),
        createDeco(7100, 100, 'ember'),
        createDeco(7900, 700, 'lava-rock'),
        createDeco(8600, 100, 'rock'),
        createDeco(9500, 700, 'fire'),
        createDeco(10200, 320, 'ember'),
        createDeco(11400, 300, 'lava-rock'),
        createDeco(12500, 140, 'fire'),
        createDeco(13300, 700, 'ember'),
        createDeco(14200, 140, 'lava-rock'),
        createDeco(15000, 200, 'fire'),
        createDeco(16000, 700, 'ember'),
        createDeco(16300, 160, 'rock'),
      ],
      playerStart: { x: 180, y: 588 },
      goal: { x: 14200, y: 190 },
      timeBonus: 150,
      springs: [createSpring(3700, 410)],
      spikes: [createSpike(13900, 192)],
      checkpoints: [
        createCheckpoint(4700, 324),
        createCheckpoint(6900, 144),
        createCheckpoint(12300, 184),
      ],
    };
  })(),
  // ============================================================
  // Level 56 (Magmasprünge): grosse Lavaseen, die mit horizontalen,
  // vertikalen und kreisenden Plattformen ueberquert werden. Dazu
  // Insel-Cluster, ein Feder-Rescue, Abstieg ueber breite Buehnen
  // und eine broeckelige Abkuerzung. 2 Springs, 2 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as Plat[];
    platforms.push(ground(0, 1100, 640));                              // top 640  [0,1100]
    platforms.push(...gapWithPlatforms(1, 1100, 652, 480, 2, {         // tops 608/588
      widths: [90, 80], dy: [32, 52], types: ['platform_easy', 'platform_hard'],
    }));
    platforms.push(ground(1580, 2400, 640));                           // top 640  [1580,2400]
    platforms.push(lavaPool(2400, 3600, 740));                         // grosser See 1
    platforms.push(ground(3600, 4400, 620));                           // top 620  [3600,4400]
    platforms.push(lavaPool(4400, 4900, 740));                         // See 2
    platforms.push(ground(4900, 5700, 520));                           // top 520  [4900,5700]
    platforms.push(lavaPool(5700, 6300, 740));                         // See 3
    platforms.push(...islandCluster(5700, 520, [
      { dx: 70, dy: 20, w: 100 }, { dx: 250, dy: 55, w: 90 },
    ]));                                                               // tops 500/465
    platforms.push(ground(6350, 7200, 470));                           // top 470  [6350,7200]
    platforms.push(lavaPool(7200, 8000, 740));                         // See 4
    platforms.push(...islandCluster(7700, 470, [{ dx: 0, dy: 50, w: 100 }])); // top 420
    platforms.push(ground(8100, 8900, 430));                           // top 430  [8100,8900]
    platforms.push(ground(8900, 9800, 520));                           // top 520  [8900,9800]
    platforms.push(lavaPool(9800, 10400, 740));                        // See 5
    platforms.push(...islandCluster(9800, 520, [
      { dx: 60, dy: 20, w: 100 }, { dx: 210, dy: 45, w: 90 }, { dx: 360, dy: 70, w: 90 },
    ]));                                                               // tops 500/475/450
    platforms.push(ground(10400, 11200, 450));                         // top 450  [10400,11200]
    platforms.push(lavaPool(11200, 11800, 740));                       // See 6
    platforms.push(ground(11800, 12600, 470));                         // top 470  [11800,12600]
    platforms.push(slab(12650, 330, 200, 'platform_hard'));            // Feder-Bonus top 330
    platforms.push(lavaPool(12600, 13200, 740));                       // See 7
    platforms.push(createCrumblePlat(12900, 342, 380, 24, 'platform_hard')); // Obsidian-Abkuerzung top 330
    platforms.push(slab(12730, 460, 90, 'platform_easy'));             // sichere Tritte
    platforms.push(slab(12930, 445, 80, 'platform_hard'));
    platforms.push(slab(13120, 460, 90, 'platform_medium'));
    platforms.push(ground(13200, 14000, 470));                         // top 470  [13200,14000]
    platforms.push(...staircase(14000, 470, 3, 70, 140, 40, 'stone')); // tops 400/330/260
    platforms.push(ground(14500, 15300, 260));                         // top 260  [14500,15300]
    platforms.push(lavaPool(15300, 15900, 740));                       // See 8
    platforms.push(...islandCluster(15300, 260, [
      { dx: 70, dy: 25, w: 90 }, { dx: 240, dy: 50, w: 80 }, { dx: 400, dy: 15, w: 100 },
    ]));                                                               // tops 235/210/245
    platforms.push(ground(15900, 16600, 230));                         // top 230  [15900,16600]
    platforms.push(ground(16600, 17200, 300));                         // Ausklang top 300

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 570, 1000, 570, 5));
    coins.push(...coinArc(1340, 540, 5, 150, 60));
    coins.push(...coinTrail(1700, 570, 2300, 570, 5));
    coins.push(...coinArc(3000, 480, 7, 260, 80));
    coins.push(...coinTrail(3700, 550, 4300, 550, 4));
    coins.push(...coinLadder(4700, 560, 300, 4));
    coins.push(...coinTrail(5000, 450, 5600, 450, 4));
    coins.push(...coinArc(6000, 400, 5, 160, 60));
    coins.push(...coinDiamond(6775, 400, 70));
    coins.push(...coinArc(7600, 380, 7, 260, 80));
    coins.push(...coinTrail(8200, 380, 8800, 380, 4));
    coins.push(...coinDiamond(9350, 450, 80));
    coins.push(...coinArc(10100, 430, 7, 260, 60));
    coins.push(...coinTrail(10450, 400, 11100, 400, 4));
    coins.push(...coinArc(11500, 490, 5, 150, 60));
    coins.push(...coinDiamond(12200, 400, 70));
    coins.push(...coinTrail(12680, 280, 13080, 280, 3));
    coins.push(...coinDiamond(13600, 390, 70));
    coins.push(...coinTrail(14050, 340, 14450, 340, 4));
    coins.push(...coinArc(14900, 190, 5, 180, 60));
    coins.push(...coinArc(15600, 170, 7, 240, 60));
    coins.push(...coinDiamond(16250, 150, 70));
    coins.push(...coinTrail(16650, 250, 17100, 250, 4));

    return {
      id: 56, name: 'Magmasprünge', width: 17200, height: 800, biome: 'volcano-lava',
      platforms,
      movingPlatforms: [
        createMovingPlat(3000, 560, 140, 24, 'platform_medium', 'horizontal', 340, 30),
        createMovingPlat(4650, 590, 120, 24, 'platform_hard', 'vertical', 80, 20),
        createMovingPlat(6150, 470, 110, 24, 'platform_medium', 'circular', 80, 22),
        createMovingPlat(7450, 480, 120, 24, 'platform_medium', 'vertical', 120, 22),
        createMovingPlat(7950, 450, 110, 24, 'platform_hard', 'circular', 80, 24),
        createMovingPlat(11500, 560, 130, 24, 'platform_hard', 'horizontal', 160, 26),
      ],
      coins,
      questionBlocks: [
        createQB(1800, 550, 'flower'),
        createQB(5500, 430, 'oneup'),
        createQB(6900, 380, 'star'),
        createQB(8200, 340, 'flower'),
        createQB(13300, 380, 'star'),
      ],
      enemies: [
        createEnemy(1750, 632, 'goomba'),
        createEnemy(2150, 632, 'spiny'),
        createEnemy(3700, 612, 'robot'),
        createEnemy(4200, 612, 'spiny'),
        createEnemy(5250, 512, 'robot'),
        createEnemy(7000, 462, 'robot'),
        createEnemy(7100, 462, 'spiny'),
        createEnemy(8400, 422, 'robot'),
        createEnemy(8800, 422, 'spiny'),
        createEnemy(9200, 512, 'spiny'),
        createEnemy(9600, 512, 'robot'),
        createEnemy(10600, 442, 'robot'),
        createEnemy(11000, 442, 'goomba'),
        createEnemy(12000, 462, 'robot'),
        createEnemy(12300, 462, 'spiny'),
        createEnemy(13800, 462, 'robot'),
        createEnemy(14700, 252, 'spiny'),
        createEnemy(15100, 252, 'robot'),
        createEnemy(16100, 222, 'spiny'),
        createEnemy(16800, 292, 'goomba'),
      ],
      decorations: [
        createDeco(300, 580, 'fire'),
        createDeco(900, 560, 'ember'),
        createDeco(1400, 480, 'lava-rock'),
        createDeco(2000, 360, 'rock'),
        createDeco(2800, 700, 'fire'),
        createDeco(3500, 340, 'ember'),
        createDeco(4200, 500, 'lava-rock'),
        createDeco(4700, 700, 'fire'),
        createDeco(5400, 300, 'ember'),
        createDeco(6200, 700, 'lava-rock'),
        createDeco(6800, 400, 'rock'),
        createDeco(7600, 700, 'fire'),
        createDeco(8400, 120, 'ember'),
        createDeco(9400, 700, 'lava-rock'),
        createDeco(10200, 400, 'fire'),
        createDeco(11000, 120, 'ember'),
        createDeco(11900, 700, 'lava-rock'),
        createDeco(12600, 250, 'rock'),
        createDeco(13500, 400, 'fire'),
        createDeco(14300, 700, 'ember'),
        createDeco(15000, 200, 'lava-rock'),
        createDeco(15700, 700, 'fire'),
        createDeco(16600, 200, 'ember'),
      ],
      playerStart: { x: 170, y: 608 },
      goal: { x: 16300, y: 220 },
      timeBonus: 170,
      springs: [createSpring(2300, 640), createSpring(12450, 470)],
      spikes: [createSpike(8700, 422), createSpike(13500, 462)],
      checkpoints: [
        createCheckpoint(3800, 604),
        createCheckpoint(6600, 454),
        createCheckpoint(8300, 414),
        createCheckpoint(10700, 434),
      ],
    };
  })(),
  // ============================================================
  // Level 57 (Obsidianröhren): Röhren-Gassen mit Piranhas ueber
  // Lava, vertikale und kreisende Plattformen, eine Lavagrube und
  // eine Lavahöhle als Bonusraum (Schluessel + Tuer, 1-UP).
  // 2 Springs, 1 Spike.
  // ============================================================
  (() => {
    const platforms = [] as Plat[];
    platforms.push(ground(0, 1200, 640));                              // top 640  [0,1200]
    platforms.push(ground(1200, 2200, 620));                           // top 620  [1200,2200]
    platforms.push(...pipePair(1420, 620));
    platforms.push(...pipePair(1850, 620));
    platforms.push(lavaPool(2200, 2800, 740));                         // Lava-Fluss 1
    platforms.push(slab(2340, 610, 90, 'platform_easy'));
    platforms.push(slab(2540, 595, 80, 'platform_hard'));
    platforms.push(slab(2720, 610, 90, 'platform_medium'));
    platforms.push(ground(2800, 3600, 620));                           // top 620  [2800,3600]
    platforms.push(...pipePair(3050, 620));
    platforms.push(...pipePair(3450, 620));
    platforms.push(lavaPool(3600, 4380, 740));                         // Lava-Fluss 2
    platforms.push(slab(4150, 500, 100, 'platform_hard'));             // Tritt top 500
    platforms.push(ground(4380, 5300, 620));                           // top 620  [4380,5300]
    platforms.push(...pipePair(4600, 620));
    platforms.push(...pipePair(5050, 620));
    platforms.push(lavaPool(5300, 5900, 740));                         // Lava-Fluss 3
    platforms.push(ground(5900, 6800, 620));                           // top 620  [5900,6800]
    platforms.push(...pitWithLedges(6800, 620, 700, 160, 60, 'lava')); // Lavagrube top 780
    platforms.push(slab(6900, 610, 100, 'platform_medium'));
    platforms.push(slab(7080, 600, 90, 'platform_easy'));
    platforms.push(slab(7260, 615, 80, 'platform_hard'));
    platforms.push(ground(7350, 8200, 620));                           // top 620  [7350,8200]
    platforms.push(...pipePair(7600, 620));
    platforms.push(ground(8300, 8900, 520));                           // Lavahöhle top 520
    platforms.push(lavaPool(8200, 8900, 740));                         // Lava unter der Höhle
    platforms.push(slab(8340, 610, 90, 'platform_medium'));
    platforms.push(slab(8540, 600, 80, 'platform_easy'));
    platforms.push(slab(8740, 610, 90, 'platform_hard'));
    platforms.push(ground(8900, 9800, 620));                           // top 620  [8900,9800]
    platforms.push(...pipePair(9250, 620));
    platforms.push(lavaPool(9800, 10400, 740));                        // Lava-Fluss 4
    platforms.push(slab(9940, 610, 90, 'platform_easy'));
    platforms.push(slab(10140, 600, 80, 'platform_hard'));
    platforms.push(slab(10320, 615, 90, 'platform_medium'));
    platforms.push(ground(10400, 11300, 620));                         // top 620  [10400,11300]
    platforms.push(...pipePair(10600, 620));
    platforms.push(...pipePair(11050, 620));
    platforms.push(lavaPool(11300, 11900, 740));                       // Lava-Fluss 5
    platforms.push(ground(11900, 12800, 620));                         // top 620  [11900,12800]
    platforms.push(...staircase(12800, 620, 4, 70, 140, 40, 'stone')); // tops 550/480/410/340
    platforms.push(ground(13480, 14300, 340));                         // top 340  [13480,14300]
    platforms.push(lavaPool(14300, 14900, 740));                       // Lava-Fluss 6
    platforms.push(...islandCluster(14300, 340, [
      { dx: 60, dy: 20, w: 110 }, { dx: 230, dy: 45, w: 90 }, { dx: 390, dy: 15, w: 100 },
    ]));                                                               // tops 320/295/325
    platforms.push(ground(14900, 15800, 340));                         // top 340  [14900,15800]
    platforms.push(ground(15800, 16400, 400));                         // Ausklang top 400

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 570, 1100, 570, 5));
    coins.push(...coinTrail(1300, 550, 2100, 550, 5));
    coins.push(...coinArc(2500, 540, 5, 150, 60));
    coins.push(...coinTrail(2900, 540, 3500, 540, 5));
    coins.push(...coinArc(4000, 480, 7, 200, 70));
    coins.push(...coinDiamond(4150, 430, 60));
    coins.push(...coinTrail(4500, 540, 5200, 540, 5));
    coins.push(...coinArc(5600, 440, 5, 90, 50));
    coins.push(...coinTrail(6000, 540, 6700, 540, 5));
    coins.push(...coinArc(7160, 540, 5, 150, 60));
    coins.push(...coinDiamond(7775, 540, 60));
    coins.push(...coinTrail(8350, 550, 8850, 550, 5));
    coins.push(...coinTrail(8700, 480, 8850, 480, 3));
    coins.push(...coinArc(9350, 540, 5, 200, 60));
    coins.push(...coinTrail(9950, 550, 10400, 550, 4));
    coins.push(...coinTrail(10500, 540, 11200, 540, 5));
    coins.push(...coinArc(11600, 540, 5, 130, 60));
    coins.push(...coinTrail(12000, 540, 12700, 540, 5));
    coins.push(...coinLadder(12880, 560, 360, 4));
    coins.push(...coinTrail(13500, 300, 14250, 300, 5));
    coins.push(...coinDiamond(13890, 280, 60));
    coins.push(...coinArc(14600, 250, 5, 150, 60));
    coins.push(...coinTrail(14950, 300, 15750, 300, 5));
    coins.push(...coinArc(15350, 280, 5, 160, 60));
    coins.push(...coinDiamond(16000, 340, 60));
    coins.push(...coinTrail(15900, 360, 16350, 360, 4));

    return {
      id: 57, name: 'Obsidianröhren', width: 16400, height: 800, biome: 'volcano-lava',
      platforms,
      movingPlatforms: [
        createMovingPlat(3850, 560, 120, 24, 'platform_medium', 'vertical', 110, 20),
        createMovingPlat(5600, 560, 110, 24, 'platform_hard', 'circular', 80, 24),
        createMovingPlat(11600, 600, 140, 24, 'platform_medium', 'horizontal', 160, 26),
      ],
      coins,
      questionBlocks: [
        createQB(2100, 530, 'coin'),
        createQB(6200, 530, 'oneup'),
        createQB(8750, 430, 'flower'),
        createQB(9650, 530, 'mushroom'),
        createQB(13700, 250, 'star'),
      ],
      enemies: [
        createEnemy(900, 632, 'goomba'),
        createEnemy(1420, 588, 'piranha'),
        createEnemy(1850, 588, 'piranha'),
        createEnemy(3050, 588, 'piranha'),
        createEnemy(3450, 588, 'piranha'),
        createEnemy(4600, 588, 'piranha'),
        createEnemy(5050, 588, 'piranha'),
        createEnemy(6000, 612, 'robot'),
        createEnemy(6500, 612, 'spiny'),
        createEnemy(6700, 612, 'goomba'),
        createEnemy(7600, 588, 'piranha'),
        createEnemy(9000, 612, 'robot'),
        createEnemy(9250, 588, 'piranha'),
        createEnemy(9550, 612, 'spiny'),
        createEnemy(10600, 588, 'piranha'),
        createEnemy(11050, 588, 'piranha'),
        createEnemy(12000, 612, 'robot'),
        createEnemy(12400, 612, 'spiny'),
        createEnemy(14100, 332, 'spiny'),
        createEnemy(15200, 332, 'robot'),
        createEnemy(16100, 392, 'goomba'),
      ],
      decorations: [
        createDeco(300, 580, 'fire'),
        createDeco(900, 560, 'ember'),
        createDeco(1600, 440, 'lava-rock'),
        createDeco(2300, 700, 'fire'),
        createDeco(3000, 560, 'ember'),
        createDeco(3900, 700, 'lava-rock'),
        createDeco(4700, 560, 'rock'),
        createDeco(5500, 700, 'fire'),
        createDeco(6300, 560, 'ember'),
        createDeco(7100, 700, 'lava-rock'),
        createDeco(7800, 560, 'fire'),
        createDeco(8600, 440, 'ember'),
        createDeco(9300, 560, 'lava-rock'),
        createDeco(10100, 700, 'rock'),
        createDeco(10900, 560, 'fire'),
        createDeco(11600, 700, 'ember'),
        createDeco(12300, 560, 'lava-rock'),
        createDeco(13100, 480, 'fire'),
        createDeco(14000, 280, 'ember'),
        createDeco(14600, 700, 'lava-rock'),
        createDeco(15400, 280, 'fire'),
        createDeco(16100, 340, 'ember'),
      ],
      playerStart: { x: 170, y: 608 },
      goal: { x: 15400, y: 330 },
      timeBonus: 180,
      springs: [createSpring(8100, 620), createSpring(12550, 620)],
      spikes: [createSpike(12600, 612)],
      checkpoints: [
        createCheckpoint(2000, 604),
        createCheckpoint(5250, 604),
        createCheckpoint(8000, 604),
        createCheckpoint(14100, 324),
      ],
      keys: [createKey(7900, 570)],
      doors: [createDoor(8400, 410, 40, 220)],
    };
  })(),
  // ============================================================
  // Level 58 (Kraterkletterer): Abstieg in eine Grube, Zickzack-
  // Aufstieg, Zwei-Etagen-Galerie, Kraterrand in luftiger Hoehe und
  // zwei Lavaseen mit alternativen Vertikal-/Kreisplattformen.
  // 2 Springs, 2 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as Plat[];
    platforms.push(ground(0, 1200, 660));                              // top 660  [0,1200]
    platforms.push(...pitWithLedges(1200, 660, 500, 100, 60, 'stone')); // Grubenboden top 760
    platforms.push(slab(1320, 630, 90, 'platform_easy'));              // Gruben-Tritt top 630
    platforms.push(slab(1520, 610, 80, 'platform_medium'));            // Gruben-Tritt top 610
    platforms.push(ground(1700, 2600, 640));                           // top 640  [1700,2600]
    platforms.push(...zigzagClimb(2650, 640, 4, 120, 110, 130, 'platform_medium')); // tops 520/400/280/160
    platforms.push(slab(2800, 140, 120, 'platform_hard'));             // Uebergang top 140
    platforms.push(ground(2900, 3700, 120));                           // Kraterrand top 120
    platforms.push(...twoTierSection(3700, 320, 900, 'stone', 'platform_hard')); // Galerie unten 320 / oben 160
    platforms.push(ground(4600, 5400, 280));                           // top 280  [4600,5400]
    platforms.push(slab(4700, 140, 120, 'platform_medium'));           // obere Bonusroute top 140
    platforms.push(slab(4950, 110, 160, 'platform_hard'));             // Bonus top 110
    platforms.push(ground(5400, 5900, 280));                           // top 280  [5400,5900]
    platforms.push(...zigzagClimb(5900, 280, 3, 65, 110, 130, 'platform_medium')); // tops 215/150/85
    platforms.push(ground(6150, 6900, 100));                           // Kraterrand 2 top 100
    platforms.push(ground(6900, 7700, 220));                           // top 220  [6900,7700]
    platforms.push(lavaPool(7700, 8300, 740));                         // Lavasee 1
    platforms.push(slab(7840, 210, 90, 'platform_easy'));
    platforms.push(slab(8040, 195, 80, 'platform_hard'));
    platforms.push(slab(8220, 210, 90, 'platform_medium'));
    platforms.push(ground(8300, 9200, 220));                           // top 220  [8300,9200]
    platforms.push(lavaPool(9200, 9800, 740));                         // Lavasee 2
    platforms.push(createCrumblePlat(9500, 100, 480, 24, 'platform_medium')); // Obsidian-Abkuerzung top 100
    platforms.push(slab(9340, 210, 90, 'platform_easy'));
    platforms.push(slab(9540, 195, 80, 'platform_hard'));
    platforms.push(slab(9720, 210, 90, 'platform_medium'));
    platforms.push(ground(9800, 10700, 220));                          // top 220  [9800,10700]
    platforms.push(...staircase(10700, 220, 3, 50, 140, 40, 'stone')); // tops 170/120/70
    platforms.push(ground(11200, 12100, 70));                          // Ziel-Plateau top 70
    platforms.push(ground(12100, 12800, 140));                         // Ausklang top 140

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 590, 1100, 590, 5));
    coins.push(...coinArc(1440, 700, 5, 170, 70));
    coins.push(...coinTrail(1750, 570, 2450, 570, 4));
    coins.push(...coinLadder(2520, 480, 240, 4));
    coins.push(...coinArc(2650, 440, 5, 160, 90));
    coins.push(...coinDiamond(3300, 40, 70));
    coins.push(...coinTrail(3760, 120, 4540, 120, 4));
    coins.push(...coinArc(4150, 240, 5, 180, 70));
    coins.push(...coinTrail(4640, 100, 5030, 70, 3));
    coins.push(...coinDiamond(4950, 60, 60));
    coins.push(...coinArc(5650, 220, 5, 160, 70));
    coins.push(...coinLadder(6030, 220, 120, 4));
    coins.push(...coinArc(6525, 60, 5, 150, 50));
    coins.push(...coinTrail(7000, 180, 7600, 180, 4));
    coins.push(...coinArc(8000, 170, 5, 170, 70));
    coins.push(...coinDiamond(8750, 180, 70));
    coins.push(...coinArc(9500, 160, 5, 130, 60));
    coins.push(...coinTrail(9850, 180, 10600, 180, 5));
    coins.push(...coinDiamond(10250, 160, 70));
    coins.push(...coinTrail(10800, 130, 11150, 100, 3));
    coins.push(...coinArc(11650, 40, 5, 150, 50));
    coins.push(...coinTrail(12200, 110, 12700, 110, 4));

    return {
      id: 58, name: 'Kraterkletterer', width: 12800, height: 800, biome: 'volcano-lava',
      platforms,
      movingPlatforms: [
        createMovingPlat(8000, 400, 110, 24, 'platform_hard', 'vertical', 100, 22),
        createMovingPlat(9500, 300, 110, 24, 'platform_medium', 'circular', 100, 24),
      ],
      coins,
      questionBlocks: [
        createQB(900, 570, 'mushroom'),
        createQB(3100, 30, 'star'),
        createQB(4900, 230, 'oneup'),
        createQB(6300, 30, 'coin'),
      ],
      enemies: [
        createEnemy(900, 652, 'goomba'),
        createEnemy(1900, 632, 'robot'),
        createEnemy(2300, 420, 'thwomp'),
        createEnemy(3600, 112, 'spiny'),
        createEnemy(4000, 312, 'robot'),
        createEnemy(4800, 272, 'spiny'),
        createEnemy(5500, 272, 'spiny'),
        createEnemy(6700, 92, 'spiny'),
        createEnemy(7300, 212, 'robot'),
        createEnemy(8500, 212, 'spiny'),
        createEnemy(10000, 212, 'robot'),
        createEnemy(11500, 62, 'spiny'),
        createEnemy(12400, 132, 'goomba'),
      ],
      decorations: [
        createDeco(300, 600, 'fire'),
        createDeco(1000, 580, 'ember'),
        createDeco(1450, 720, 'lava-rock'),
        createDeco(2000, 580, 'rock'),
        createDeco(2600, 480, 'fire'),
        createDeco(3300, 80, 'ember'),
        createDeco(3900, 280, 'lava-rock'),
        createDeco(4700, 100, 'fire'),
        createDeco(5500, 240, 'ember'),
        createDeco(6200, 60, 'lava-rock'),
        createDeco(7000, 180, 'rock'),
        createDeco(7800, 720, 'fire'),
        createDeco(8700, 180, 'ember'),
        createDeco(9300, 720, 'lava-rock'),
        createDeco(10100, 180, 'fire'),
        createDeco(10900, 120, 'ember'),
        createDeco(11700, 40, 'lava-rock'),
        createDeco(12500, 100, 'fire'),
      ],
      playerStart: { x: 170, y: 628 },
      goal: { x: 11700, y: 60 },
      timeBonus: 200,
      springs: [createSpring(2200, 640), createSpring(8800, 220)],
      spikes: [createSpike(5150, 272), createSpike(10300, 212)],
      checkpoints: [
        createCheckpoint(2500, 624),
        createCheckpoint(3200, 104),
        createCheckpoint(6600, 84),
        createCheckpoint(10400, 204),
      ],
    };
  })(),
  // ============================================================
  // Level 59 (Aschesturm-Horde): breite Kampf-Arenen, Waechter
  // (Robot, Spiny, Thwomp), Gruben und Lavagraeben, Insel-
  // Muenzcluster und ein Muenz-Tor (coinGoal 30). 2 Springs, 3 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as Plat[];
    platforms.push(ground(0, 1600, 640));                              // Arena 1 top 640 [0,1600]
    platforms.push(lavaPool(1600, 2100, 740));                         // Lavagraben 1
    platforms.push(slab(1740, 630, 100, 'platform_medium'));
    platforms.push(slab(1950, 615, 90, 'platform_hard'));
    platforms.push(ground(2100, 3400, 620));                           // Arena 2 top 620 [2100,3400]
    platforms.push(lavaPool(3400, 4000, 740));                         // Lavagraben 2
    platforms.push(ground(4000, 5300, 560));                           // Arena 3 top 560 [4000,5300]
    platforms.push(...pitWithLedges(5300, 560, 500, 160, 60, 'lava')); // Lavagrube top 720
    platforms.push(slab(5420, 550, 90, 'platform_easy'));
    platforms.push(slab(5620, 535, 80, 'platform_hard'));
    platforms.push(ground(5800, 7100, 540));                           // Arena 4 top 540 [5800,7100]
    platforms.push(lavaPool(7100, 7700, 740));                         // Lavagraben 3
    platforms.push(ground(7700, 9000, 520));                           // Arena 5 top 520 [7700,9000]
    platforms.push(lavaPool(9000, 9600, 740));                         // Lavagraben 4
    platforms.push(slab(9120, 510, 90, 'platform_easy'));
    platforms.push(slab(9320, 495, 100, 'platform_medium'));
    platforms.push(slab(9500, 510, 90, 'platform_hard'));
    platforms.push(ground(9600, 11000, 510));                          // Arena 6 top 510 [9600,11000]
    platforms.push(...staircase(11000, 510, 4, 70, 140, 40, 'stone')); // tops 440/370/300/230
    platforms.push(ground(11680, 12500, 200));                         // Hochplateau top 200
    platforms.push(lavaPool(12500, 13100, 740));                       // Lavagraben 5
    platforms.push(...islandCluster(12500, 200, [
      { dx: 60, dy: 20, w: 100 }, { dx: 230, dy: 45, w: 90 }, { dx: 390, dy: 20, w: 100 },
    ]));                                                               // tops 180/155/180
    platforms.push(ground(13100, 14000, 200));                         // Arena 7 top 200 [13100,14000]
    platforms.push(lavaPool(14000, 14400, 740));                       // Lavagraben 6
    platforms.push(ground(14400, 15300, 520));                         // Abstieg top 520 [14400,15300]
    platforms.push(...staircase(15300, 520, 2, 70, 140, 40, 'stone')); // tops 450/380
    platforms.push(...plateauSection(15620, 360, [                     // Ziel-Arena top 360
      { dx: 0, dy: 0, w: 780, h: 40 },
      { dx: 780, dy: -60, w: 600, h: 40 },                             // Ausklang top 420
    ]));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 570, 1500, 570, 6));
    coins.push(...coinArc(1850, 560, 5, 160, 60));
    coins.push(...coinTrail(2200, 550, 3300, 550, 6));
    coins.push(...coinArc(3700, 500, 5, 170, 60));
    coins.push(...coinTrail(4100, 490, 5200, 490, 6));
    coins.push(...coinArc(5550, 470, 5, 150, 60));
    coins.push(...coinDiamond(6450, 460, 70));
    coins.push(...coinArc(7400, 400, 5, 100, 60));
    coins.push(...coinTrail(7800, 440, 8900, 440, 6));
    coins.push(...coinArc(9300, 430, 5, 130, 60));
    coins.push(...coinTrail(9700, 430, 10900, 430, 6));
    coins.push(...coinLadder(11150, 480, 240, 4));
    coins.push(...coinTrail(11750, 140, 12450, 140, 5));
    coins.push(...coinArc(12800, 120, 5, 160, 50));
    coins.push(...coinTrail(13150, 140, 13950, 140, 5));
    coins.push(...coinDiamond(13550, 130, 70));
    coins.push(...coinArc(14200, 140, 5, 80, 60));
    coins.push(...coinTrail(14450, 460, 15250, 460, 5));
    coins.push(...coinArc(15800, 300, 5, 160, 60));
    coins.push(...coinTrail(16000, 300, 16350, 300, 4));
    coins.push(...coinDiamond(16700, 380, 70));

    return {
      id: 59, name: 'Aschesturm-Horde', width: 17000, height: 800, biome: 'volcano-lava',
      platforms,
      movingPlatforms: [
        createMovingPlat(3700, 580, 140, 24, 'platform_medium', 'horizontal', 150, 28),
        createMovingPlat(7400, 480, 110, 24, 'platform_hard', 'circular', 80, 24),
        createMovingPlat(14200, 400, 120, 24, 'platform_medium', 'vertical', 160, 24),
      ],
      coins,
      questionBlocks: [
        createQB(500, 550, 'mushroom'),
        createQB(3200, 530, 'flower'),
        createQB(4250, 470, 'star'),
        createQB(6100, 450, 'oneup'),
        createQB(8800, 430, 'coin'),
        createQB(9900, 420, 'flower'),
        createQB(12100, 110, 'star'),
        createQB(13300, 110, 'mushroom'),
      ],
      enemies: [
        createEnemy(700, 632, 'goomba'),
        createEnemy(1000, 632, 'spiny'),
        createEnemy(1300, 632, 'robot'),
        createEnemy(2300, 612, 'robot'),
        createEnemy(2600, 612, 'spiny'),
        createEnemy(2850, 612, 'goomba'),
        createEnemy(4400, 340, 'thwomp'),
        createEnemy(4600, 552, 'robot'),
        createEnemy(4900, 552, 'spiny'),
        createEnemy(5150, 552, 'goomba'),
        createEnemy(5950, 532, 'spiny'),
        createEnemy(6200, 532, 'robot'),
        createEnemy(6450, 532, 'goomba'),
        createEnemy(6700, 532, 'spiny'),
        createEnemy(6950, 532, 'robot'),
        createEnemy(7900, 512, 'robot'),
        createEnemy(8600, 300, 'thwomp'),
        createEnemy(9750, 502, 'spiny'),
        createEnemy(10050, 502, 'robot'),
        createEnemy(10550, 502, 'goomba'),
        createEnemy(10850, 502, 'spiny'),
        createEnemy(11800, 192, 'spiny'),
        createEnemy(12300, 192, 'robot'),
        createEnemy(13400, 192, 'robot'),
        createEnemy(13900, 192, 'spiny'),
        createEnemy(14700, 512, 'robot'),
        createEnemy(15100, 512, 'spiny'),
        createEnemy(15800, 372, 'goomba'),
      ],
      decorations: [
        createDeco(300, 580, 'fire'),
        createDeco(1000, 560, 'ember'),
        createDeco(1700, 700, 'lava-rock'),
        createDeco(2500, 400, 'rock'),
        createDeco(3300, 700, 'fire'),
        createDeco(4200, 480, 'ember'),
        createDeco(5000, 400, 'lava-rock'),
        createDeco(5600, 700, 'rock'),
        createDeco(6300, 460, 'fire'),
        createDeco(7200, 700, 'ember'),
        createDeco(8000, 400, 'lava-rock'),
        createDeco(8900, 700, 'rock'),
        createDeco(9700, 400, 'fire'),
        createDeco(10500, 300, 'ember'),
        createDeco(11300, 700, 'lava-rock'),
        createDeco(12100, 80, 'rock'),
        createDeco(12900, 700, 'fire'),
        createDeco(13700, 120, 'ember'),
        createDeco(14500, 460, 'lava-rock'),
        createDeco(15500, 300, 'rock'),
        createDeco(16400, 300, 'fire'),
      ],
      playerStart: { x: 170, y: 608 },
      goal: { x: 16050, y: 350 },
      timeBonus: 210,
      coinGoal: 30,
      springs: [createSpring(4500, 560), createSpring(11800, 200)],
      spikes: [
        createSpike(8450, 512),
        createSpike(10450, 502),
        createSpike(13700, 192),
      ],
      checkpoints: [
        createCheckpoint(3000, 604),
        createCheckpoint(6300, 524),
        createCheckpoint(10400, 494),
        createCheckpoint(14600, 504),
      ],
    };
  })(),
  // ============================================================
  // Level 60 (Eruptions-Finale): steigende Lava (Engine-ID 60 ->
  // Chase-Mechanik). Die Fluchtroute steigt monoton nach rechts:
  // Lavabecken, Insel-Cluster und Vertikal-/Kreisplattformen wechseln
  // sich ab, Checkpoints sichern den Aufstieg, Federn helfen beim
  // Ausweichen. 2 Springs, 2 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as Plat[];
    platforms.push(ground(0, 1600, 680));                              // Start top 680 [0,1600]
    platforms.push(lavaPool(1600, 2000, 760));                         // Lavabecken 1
    platforms.push(slab(1700, 670, 100, 'platform_easy'));
    platforms.push(...staircase(1850, 680, 3, 70, 150, 40, 'stone'));  // tops 610/540/470
    platforms.push(ground(2380, 3200, 470));                           // Plateaustufe top 470
    platforms.push(lavaPool(3200, 3800, 760));                         // Lavabecken 2
    platforms.push(...islandCluster(3200, 470, [
      { dx: 60, dy: 20, w: 100 }, { dx: 230, dy: 45, w: 90 }, { dx: 390, dy: 20, w: 100 },
    ]));                                                               // tops 450/425/450
    platforms.push(ground(3800, 4800, 430));                           // Plateau top 430 [3800,4800]
    platforms.push(ground(4850, 5350, 300));                           // Hochstufe top 300 [4850,5350]
    platforms.push(ground(5450, 6400, 280));                           // Plateau top 280 [5450,6400]
    platforms.push(lavaPool(6400, 6900, 760));                         // Lavabecken 3
    platforms.push(ground(6900, 7800, 260));                           // Plateau top 260 [6900,7800]
    platforms.push(...staircase(7800, 260, 2, 50, 150, 40, 'stone'));  // tops 210/160
    platforms.push(ground(8140, 9000, 160));                           // Hochplateau top 160 [8140,9000]
    platforms.push(lavaPool(9000, 9600, 760));                         // Lavabecken 4
    platforms.push(ground(9600, 10600, 240));                          // Plateau top 240 [9600,10600]
    platforms.push(lavaPool(10600, 11200, 760));                       // Lavabecken 5
    platforms.push(...islandCluster(10600, 240, [
      { dx: 60, dy: 20, w: 100 }, { dx: 230, dy: 45, w: 90 }, { dx: 390, dy: 20, w: 100 },
    ]));                                                               // tops 220/195/220
    platforms.push(ground(11200, 12200, 220));                         // Plateau top 220 [11200,12200]
    platforms.push(...staircase(12200, 220, 2, 50, 150, 40, 'stone')); // tops 170/120
    platforms.push(ground(12540, 13600, 120));                         // Ziel-Plateau top 120
    platforms.push(ground(13600, 14500, 180));                         // Ausklang top 180
    platforms.push(ground(14500, 15400, 120));                         // Nachziel-Rim top 120

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 610, 1500, 610, 6));
    coins.push(...coinArc(1800, 610, 5, 150, 60));
    coins.push(...coinTrail(2450, 400, 3100, 400, 5));
    coins.push(...coinArc(3500, 370, 7, 260, 70));
    coins.push(...coinTrail(3900, 370, 4700, 370, 5));
    coins.push(...coinDiamond(5100, 240, 70));
    coins.push(...coinArc(5950, 220, 5, 200, 60));
    coins.push(...coinDiamond(6650, 300, 70));
    coins.push(...coinTrail(7000, 200, 7700, 200, 5));
    coins.push(...coinArc(8500, 90, 5, 220, 60));
    coins.push(...coinLadder(9050, 200, 80, 4));
    coins.push(...coinArc(9300, 200, 7, 240, 60));
    coins.push(...coinDiamond(10200, 170, 70));
    coins.push(...coinArc(10900, 160, 5, 200, 60));
    coins.push(...coinTrail(11300, 160, 12100, 160, 5));
    coins.push(...coinArc(12500, 60, 5, 200, 50));
    coins.push(...coinTrail(12700, 60, 13500, 60, 5));
    coins.push(...coinArc(13800, 120, 5, 150, 50));
    coins.push(...coinTrail(14600, 60, 15300, 60, 5));

    return {
      id: 60, name: 'Eruptions-Finale', width: 15600, height: 800, biome: 'volcano-lava',
      platforms,
      movingPlatforms: [
        createMovingPlat(6650, 380, 120, 24, 'platform_medium', 'vertical', 100, 24),
        createMovingPlat(9300, 300, 110, 24, 'platform_hard', 'circular', 90, 26),
      ],
      coins,
      questionBlocks: [
        createQB(600, 590, 'mushroom'),
        createQB(2950, 380, 'flower'),
        createQB(3900, 340, 'star'),
        createQB(8400, 70, 'coin'),
        createQB(9600, 150, 'oneup'),
        createQB(11400, 130, 'flower'),
      ],
      enemies: [
        createEnemy(1000, 672, 'goomba'),
        createEnemy(2600, 462, 'spiny'),
        createEnemy(2850, 462, 'robot'),
        createEnemy(4600, 230, 'thwomp'),
        createEnemy(4500, 422, 'robot'),
        createEnemy(5750, 272, 'spiny'),
        createEnemy(6100, 272, 'spiny'),
        createEnemy(7100, 252, 'robot'),
        createEnemy(7500, 252, 'goomba'),
        createEnemy(8200, 152, 'robot'),
        createEnemy(8800, 152, 'spiny'),
        createEnemy(9700, 232, 'spiny'),
        createEnemy(10300, 232, 'robot'),
        createEnemy(11300, 212, 'robot'),
        createEnemy(11900, 212, 'spiny'),
        createEnemy(12800, 112, 'spiny'),
        createEnemy(13400, 112, 'goomba'),
        createEnemy(14000, 172, 'robot'),
      ],
      decorations: [
        createDeco(300, 620, 'fire'),
        createDeco(1000, 600, 'ember'),
        createDeco(1700, 720, 'lava-rock'),
        createDeco(2500, 400, 'rock'),
        createDeco(3300, 720, 'fire'),
        createDeco(4200, 380, 'ember'),
        createDeco(5000, 240, 'lava-rock'),
        createDeco(5700, 240, 'rock'),
        createDeco(6500, 720, 'fire'),
        createDeco(7200, 200, 'ember'),
        createDeco(8200, 100, 'lava-rock'),
        createDeco(8900, 720, 'rock'),
        createDeco(9500, 200, 'fire'),
        createDeco(10200, 180, 'ember'),
        createDeco(10900, 720, 'lava-rock'),
        createDeco(11500, 160, 'rock'),
        createDeco(12300, 160, 'fire'),
        createDeco(13000, 60, 'ember'),
        createDeco(14000, 120, 'lava-rock'),
        createDeco(15000, 60, 'rock'),
      ],
      playerStart: { x: 170, y: 648 },
      goal: { x: 13100, y: 110 },
      timeBonus: 240,
      springs: [createSpring(4350, 430), createSpring(11350, 220)],
      spikes: [createSpike(8700, 152), createSpike(10000, 232)],
      checkpoints: [
        createCheckpoint(2500, 454),
        createCheckpoint(4100, 414),
        createCheckpoint(5600, 264),
        createCheckpoint(8300, 144),
        createCheckpoint(11500, 204),
      ],
    };
  })(),
];


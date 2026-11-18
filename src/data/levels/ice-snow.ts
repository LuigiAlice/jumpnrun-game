import { polishNatureLevel } from './naturePolish';
// Ice-Snow World - 6 Levels (19-24) - Phase 9 rebuild
// Archetypes:
//   L19 "Snowy Path"     - Schneepfad (Tutorial: sanfte Terrassen, erste Eisflaeche)
//   L20 "Glacier Gaps"   - Gletscherspalten (Luecken, Crumble-Eisbruecke als Abkuerzung)
//   L21 "Frozen Tunnels" - Eistunnel (Ueberhaenge, Roehren, zwei Ebenen, Schluessel+Tuer)
//   L22 "Iceberg Ascent" - Gipfelsturm (Zickzack-Anstiege, Gletscherspalte, Eissee)
//   L23 "Polar Heights"  - Polarhorde (breite Eis-Arenen, viele Waechter)
//   L24 "Frozen Finale"  - Eiszeit-Finale (fallende Eiszapfen, Deckung durch Ueberhaenge)
//
// Physics (gravity 2000): upward jumps <= 160px, horizontal <= 210px, falls <= 1000px.
// All levels are authored solvable - ensureSolvable() must not add a single platform.

import {
  LevelData, createPlat, createQB, createEnemy, createDeco, createMovingPlat,
  createSpring, createSpike, createIcePlat, createCrumblePlat, createCheckpoint,
  createKey, createDoor, staircase, plateauSection, pitFloor, twoTierSection,
  islandCluster, zigzagClimb, overhangSection, gapWithPlatforms,
  coinArc, coinDiamond, coinTrail, coinLadder,
} from './helpers';

const ICE_SNOW_AUTHORED_LEVELS: LevelData[] = [
  // ===== Level 19: Schneepfad - "Snowy Path" =====
  {
    id: 19, name: "Snowy Path", width: 9400, height: 900, biome: 'ice-snow',
    platforms: [
      // Start terrace
      createPlat(600, 580, 1200, 40, 'snow'),                       // top 560  [0,1200]
      // Two-tier terrace: safe lower route, risky upper route
      ...twoTierSection(1200, 560, 600, 'snow', 'platform_medium'), // lower top 560, upper top 400
      // Crevasse with ledges (escape route on both sides)
      ...pitFloor(1800, 560, 400, 140, 'stone'),           // floor top 700 [1800,2200]
      createPlat(1860, 650, 110, 24, 'platform_easy'),              // ledge top 638
      createPlat(2140, 650, 110, 24, 'platform_easy'),              // ledge top 638
      // Snow ground B
      createPlat(2800, 580, 1200, 40, 'snow'),                      // top 560 [2200,3400]
      // Staircase up to the plateau
      ...staircase(3400, 560, 3, 60, 160, 40, 'snow'),              // tops 500/440/380
      createPlat(4260, 400, 600, 40, 'snow'),                       // top 380 [3960,4560]
      // First ice slide (wide, braking room before the gap)
      createIcePlat(5000, 392, 900, 24),                            // top 380 [4550,5450]
      // Landing ground after the ice
      createPlat(6130, 580, 1000, 40, 'snow'),                      // top 560 [5630,6630]
      // Floating island cluster
      ...islandCluster(6700, 560, [
        { dx: 0, dy: 60, w: 140, type: 'platform_easy' },
        { dx: 240, dy: 120, w: 120, type: 'platform_medium' },
        { dx: 460, dy: 40, w: 160, type: 'platform_hard' },
      ]),                                                           // tops 500/440/520
      // Final ground + goal terrace
      createPlat(8000, 580, 1200, 40, 'snow'),                      // top 560 [7400,8600]
      createPlat(8800, 540, 400, 40, 'snow'),                       // top 520 [8600,9000]
    ],
    coins: [
      ...coinTrail(360, 500, 1120, 500, 5),
      ...coinLadder(300, 420, 220, 4),
      ...coinTrail(1240, 330, 1760, 330, 5),
      ...coinArc(2000, 630, 5, 170, 90),
      ...coinTrail(3460, 440, 3900, 320, 5),
      ...coinDiamond(4260, 300, 60),
      ...coinTrail(4650, 320, 5350, 320, 5),
      ...coinArc(6130, 490, 5, 150, 70),
      ...coinTrail(6780, 440, 7230, 460, 4),
      ...coinDiamond(8000, 480, 60),
      ...coinTrail(8640, 470, 8960, 470, 4),
    ],
    questionBlocks: [
      createQB(800, 470, 'mushroom'),
      createQB(1500, 310, 'coin'),
      createQB(2800, 470, 'flower'),
      createQB(4300, 290, 'oneup'),
      createQB(5000, 290, 'coin'),
      createQB(6400, 470, 'star'),
      createQB(8200, 470, 'mushroom'),
    ],
    enemies: [
      createEnemy(900, 552, 'goomba'),
      createEnemy(1500, 552, 'spiny'),
      createEnemy(2600, 552, 'goomba'),
      createEnemy(3480, 492, 'robot'),
      createEnemy(4200, 372, 'spiny'),
      createEnemy(5050, 372, 'goomba'),
      createEnemy(6300, 552, 'robot'),
      createEnemy(7800, 552, 'spiny'),
    ],
    decorations: [
      createDeco(500, 520, 'snowflake'),
      createDeco(1150, 460, 'icicle'),
      createDeco(2000, 520, 'icicle'),
      createDeco(3200, 520, 'iceberg'),
      createDeco(4250, 300, 'penguin'),
      createDeco(5300, 300, 'snowflake'),
      createDeco(6000, 520, 'icicle'),
      createDeco(6900, 430, 'penguin'),
      createDeco(7500, 520, 'iceberg'),
      createDeco(8300, 460, 'snowflake'),
      createDeco(8800, 380, 'icicle'),
    ],
    playerStart: { x: 120, y: 540 },
    goal: { x: 8800, y: 508 },
    timeBonus: 120,
    springs: [createSpring(300, 560)],
    movingPlatforms: [
      createMovingPlat(2000, 560, 120, 24, 'platform_medium', 'vertical', 80, 24),
      createMovingPlat(7300, 400, 110, 24, 'platform_medium', 'circular', 60, 26),
    ],
  },

  // ===== Level 20: Gletscherspalten - "Glacier Gaps" =====
  {
    id: 20, name: "Glacier Gaps", width: 11200, height: 800, biome: 'ice-snow',
    platforms: [
      createPlat(600, 620, 1200, 40, 'snow'),                       // top 600 [0,1200]
      // Staggered gap steps (varied widths/heights/types)
      ...gapWithPlatforms(1, 1200, 600, 420, 3, {
        widths: [110, 80, 120], dy: [80, 130, 80],
        types: ['platform_easy', 'platform_hard', 'platform_medium'], xOffsets: [0, 10, 20],
      }),
      createPlat(2275, 620, 1250, 40, 'snow'),                      // top 600 [1650,2900]
      // Ice slide 1 - spikes and guards while sliding
      createIcePlat(3400, 612, 1000, 24),                           // top 600 [2900,3900]
      // Crevasse crossed by a crumbling ice bridge (shortcut) or the safe pit floor
      ...pitFloor(3900, 600, 500, 150, 'stone'),           // floor top 750 [3900,4400]
      createCrumblePlat(4075, 612, 350, 24, 'ice'),                 // crumbling ice bridge top 600 [3900,4250]
      createPlat(4900, 620, 1000, 40, 'snow'),                      // top 600 [4400,5400]
      // Ice slide 2 with bonus platforms above
      createIcePlat(6200, 612, 1200, 24),                           // top 600 [5600,6800]
      createPlat(6100, 480, 140, 24, 'platform_hard'),              // top 468
      createPlat(6300, 420, 120, 24, 'platform_hard'),              // top 408
      createPlat(7400, 620, 1200, 40, 'snow'),                      // top 600 [6800,8000]
      // Zig-zag climb to the plateau
      ...zigzagClimb(8000, 600, 5, 80, 110, 140, 'platform_medium'),// tops 520..200
      createPlat(8600, 220, 500, 40, 'snow'),                       // top 200 [8350,8850]
      // Descent terraces back to the final ground
      ...plateauSection(8900, 200, [
        { dx: 0, dy: -80, w: 150, type: 'snow' },
        { dx: 190, dy: -160, w: 150, type: 'snow' },
        { dx: 380, dy: -240, w: 150, type: 'snow' },
      ]),                                                           // tops 280/360/440
      createPlat(9900, 620, 1200, 40, 'snow'),                      // top 600 [9300,10500]
      createPlat(10700, 580, 400, 40, 'snow'),                      // top 560 [10500,10900]
    ],
    coins: [
      ...coinTrail(300, 540, 1120, 540, 5),
      ...coinArc(1400, 430, 5, 140, 70),
      ...coinTrail(1800, 540, 2800, 540, 5),
      ...coinTrail(3000, 540, 3800, 540, 5),
      ...coinArc(4150, 660, 5, 150, 80),
      ...coinTrail(4500, 540, 5300, 540, 5),
      ...coinTrail(5700, 540, 6700, 540, 5),
      ...coinDiamond(6100, 420, 60),
      ...coinTrail(6900, 540, 7900, 540, 5),
      ...coinLadder(8140, 480, 240, 4),
      ...coinTrail(8400, 160, 8800, 160, 4),
      ...coinTrail(8950, 240, 9400, 400, 5),
      ...coinArc(9900, 540, 5, 200, 70),
      ...coinTrail(10550, 520, 10850, 520, 4),
    ],
    questionBlocks: [
      createQB(900, 510, 'mushroom'),
      createQB(2100, 510, 'flower'),
      createQB(3600, 490, 'coin'),
      createQB(4700, 510, 'star'),
      createQB(7100, 510, 'mushroom'),
      createQB(8500, 110, 'coin'),
      createQB(9800, 510, 'flower'),
      createQB(10400, 470, 'coin'),
    ],
    enemies: [
      createEnemy(700, 592, 'goomba'),
      createEnemy(2000, 592, 'spiny'),
      createEnemy(3200, 592, 'robot'),
      createEnemy(3700, 592, 'goomba'),
      createEnemy(4700, 592, 'spiny'),
      createEnemy(5100, 592, 'goomba'),
      createEnemy(7000, 592, 'robot'),
      createEnemy(7600, 592, 'spiny'),
      createEnemy(9000, 272, 'goomba'),
      createEnemy(9600, 592, 'goomba'),
      createEnemy(10200, 592, 'spiny'),
    ],
    decorations: [
      createDeco(400, 520, 'snowflake'),
      createDeco(1500, 440, 'icicle'),
      createDeco(2600, 520, 'iceberg'),
      createDeco(3600, 520, 'penguin'),
      createDeco(4400, 500, 'icicle'),
      createDeco(5300, 500, 'snowflake'),
      createDeco(6100, 300, 'icicle'),
      createDeco(6600, 520, 'penguin'),
      createDeco(7800, 520, 'iceberg'),
      createDeco(8300, 140, 'snowflake'),
      createDeco(9500, 520, 'icicle'),
      createDeco(10300, 480, 'penguin'),
    ],
    playerStart: { x: 120, y: 580 },
    goal: { x: 10700, y: 548 },
    timeBonus: 150,
    springs: [createSpring(340, 600), createSpring(4900, 600)],
    spikes: [createSpike(3100, 592), createSpike(6300, 592)],
    movingPlatforms: [
      createMovingPlat(4330, 640, 120, 24, 'platform_medium', 'vertical', 60, 22),
      createMovingPlat(5500, 520, 110, 24, 'platform_medium', 'circular', 80, 30),
    ],
  },

  // ===== Level 21: Eistunnel - "Frozen Tunnels" =====
  {
    id: 21, name: "Frozen Tunnels", width: 13000, height: 900, biome: 'ice-snow',
    platforms: [
      createPlat(600, 620, 1200, 40, 'snow'),                       // top 600 [0,1200]
      // Ice tunnel A: low corridor with a gap, ceilings catch the eye
      ...overhangSection(1200, 600, 1400, 1800, 200, 'cave'),       // floors [1200,1800] + [2000,2600]
      createPlat(1500, 460, 500, 40, 'cave'),                       // ceiling top 440
      createPlat(2300, 460, 500, 40, 'cave'),                       // ceiling top 440
      // Ice corridor with ceiling
      createIcePlat(3100, 612, 1000, 24),                           // top 600 [2600,3600]
      createPlat(3100, 460, 600, 40, 'cave'),                       // ceiling top 440 [2800,3400]
      // Crevasse with ledges
      ...pitFloor(3600, 600, 400, 150, 'stone'),           // floor top 750 [3600,4000]
      createPlat(3650, 690, 110, 24, 'platform_easy'),              // ledge top 678
      createPlat(3950, 690, 110, 24, 'platform_easy'),              // ledge top 678
      // Two-tier cave section
      ...twoTierSection(4000, 600, 600, 'cave', 'platform_medium'), // lower top 600, upper top 440
      // Bonus alcove behind a locked door (key found earlier on the main path)
      createPlat(4720, 452, 280, 24, 'cave'),                       // bonus floor top 440 [4580,4860]
      // Main ground with pipes and piranhas
      createPlat(5500, 620, 1600, 40, 'snow'),                      // top 600 [4700,6300]
      createPlat(5100, 568, 64, 64, 'pipe'),
      createPlat(5100, 520, 80, 24, 'pipe_top'),
      createPlat(5500, 568, 64, 64, 'pipe'),
      createPlat(5500, 520, 80, 24, 'pipe_top'),
      createPlat(5900, 568, 64, 64, 'pipe'),
      createPlat(5900, 520, 80, 24, 'pipe_top'),
      // Breakable brick bonus wall (never load-bearing)
      createPlat(4900, 520, 96, 24, 'brick'),
      // Ice slide 2
      createIcePlat(7000, 612, 1100, 24),                           // top 600 [6450,7550]
      // Varied gap steps
      ...gapWithPlatforms(1, 7550, 600, 500, 3, {
        widths: [120, 90, 130], dy: [70, 110, 70],
        types: ['platform_easy', 'platform_medium', 'platform_hard'], xOffsets: [0, 20, 10],
      }),
      createPlat(8600, 620, 1200, 40, 'snow'),                      // top 600 [8000,9200]
      // Staircase to the ice summit
      ...staircase(9200, 600, 3, 70, 150, 40, 'snow'),              // tops 530/460/390
      createPlat(10000, 410, 500, 40, 'snow'),                      // top 390 [9750,10250]
      createIcePlat(10600, 402, 700, 24),                           // top 390 [10250,10950]
      // Descent islands to the goal valley
      ...islandCluster(11000, 390, [
        { dx: 0, dy: -70, w: 130, type: 'platform_easy' },
        { dx: 230, dy: -150, w: 150, type: 'platform_medium' },
        { dx: 470, dy: -220, w: 170, type: 'platform_hard' },
      ]),                                                           // tops 460/540/610
      createPlat(12000, 630, 900, 40, 'snow'),                      // top 610 [11550,12450]
      createPlat(12650, 590, 400, 40, 'snow'),                      // top 570 [12450,12850]
    ],
    coins: [
      ...coinTrail(400, 540, 1100, 540, 4),
      ...coinArc(1900, 520, 5, 120, 60),
      ...coinTrail(2700, 540, 3500, 540, 5),
      ...coinArc(3800, 660, 5, 140, 70),
      ...coinTrail(4700, 540, 5400, 540, 5),
      ...coinDiamond(4790, 400, 60),
      ...coinLadder(5100, 460, 300, 4),
      ...coinTrail(6600, 540, 7400, 540, 5),
      ...coinArc(7750, 460, 5, 130, 60),
      ...coinTrail(8200, 540, 9000, 540, 4),
      ...coinTrail(9250, 480, 9700, 340, 5),
      ...coinDiamond(10000, 320, 60),
      ...coinTrail(10300, 340, 10850, 340, 5),
      ...coinTrail(11050, 420, 11500, 550, 5),
      ...coinTrail(11700, 560, 12300, 560, 4),
      ...coinArc(12650, 520, 5, 150, 60),
    ],
    questionBlocks: [
      createQB(900, 510, 'mushroom'),
      createQB(2750, 510, 'coin'),
      createQB(4400, 350, 'flower'),
      createQB(6200, 510, 'star'),
      createQB(8400, 510, 'mushroom'),
      createQB(9900, 310, 'coin'),
      createQB(10700, 300, 'oneup'),
      createQB(12000, 520, 'flower'),
    ],
    enemies: [
      createEnemy(700, 592, 'goomba'),
      createEnemy(1300, 592, 'spiny'),
      createEnemy(2400, 592, 'robot'),
      createEnemy(3100, 592, 'goomba'),
      createEnemy(4200, 592, 'spiny'),
      createEnemy(5100, 500, 'piranha'),
      createEnemy(5500, 500, 'piranha'),
      createEnemy(5900, 500, 'piranha'),
      createEnemy(6700, 592, 'robot'),
      createEnemy(7200, 592, 'goomba'),
      createEnemy(8300, 592, 'spiny'),
      createEnemy(8800, 592, 'goomba'),
      createEnemy(9500, 452, 'robot'),
      createEnemy(10000, 382, 'goomba'),
      createEnemy(10600, 382, 'spiny'),
      createEnemy(11800, 602, 'robot'),
    ],
    decorations: [
      createDeco(600, 520, 'snowflake'),
      createDeco(1600, 400, 'icicle'),
      createDeco(2500, 520, 'iceberg'),
      createDeco(3300, 480, 'icicle'),
      createDeco(3900, 520, 'penguin'),
      createDeco(4500, 380, 'snowflake'),
      createDeco(5600, 460, 'icicle'),
      createDeco(6800, 520, 'penguin'),
      createDeco(7800, 420, 'iceberg'),
      createDeco(8700, 520, 'snowflake'),
      createDeco(9400, 400, 'icicle'),
      createDeco(10300, 300, 'penguin'),
      createDeco(11000, 360, 'snowflake'),
      createDeco(11900, 520, 'iceberg'),
    ],
    playerStart: { x: 120, y: 580 },
    goal: { x: 12650, y: 558 },
    timeBonus: 170,
    springs: [createSpring(340, 600), createSpring(9800, 390)],
    spikes: [createSpike(3300, 592), createSpike(6800, 592)],
    checkpoints: [createCheckpoint(6100, 580), createCheckpoint(8200, 580)],
    keys: [createKey(2150, 540)],
    doors: [createDoor(4720, 400, 32, 80)],
    movingPlatforms: [
      createMovingPlat(3800, 560, 120, 24, 'platform_medium', 'vertical', 120, 26),
      createMovingPlat(6375, 480, 110, 24, 'platform_medium', 'circular', 55, 26),
    ],
  },

  // ===== Level 22: Gipfelsturm - "Iceberg Ascent" =====
  {
    id: 22, name: "Iceberg Ascent", width: 12800, height: 1000, biome: 'ice-snow',
    platforms: [
      createPlat(725, 820, 1450, 40, 'snow'),                       // top 800 [0,1450]
      // Zig-zag climb #1
      ...zigzagClimb(1450, 800, 6, 90, 110, 140, 'platform_medium'),// tops 710..260
      createPlat(1750, 280, 600, 40, 'snow'),                       // top 260 [1450,2050]
      // Descent islands to the valley
      ...islandCluster(2100, 260, [
        { dx: 0, dy: -70, w: 140, type: 'platform_easy' },
        { dx: 250, dy: -160, w: 160, type: 'platform_medium' },
        { dx: 520, dy: -250, w: 180, type: 'platform_hard' },
      ]),                                                           // tops 330/420/510
      createPlat(3050, 630, 800, 40, 'snow'),                       // valley top 610 [2650,3450]
      // Staircase to the ice summit
      ...staircase(3450, 610, 4, 65, 150, 40, 'snow'),              // tops 545/480/415/350
      createIcePlat(4450, 342, 700, 24),                            // summit top 330 [4100,4800]
      // Glacier crevasse inside the summit
      ...pitFloor(4800, 330, 400, 150, 'stone'),           // floor top 480 [4800,5200]
      createPlat(4850, 420, 100, 24, 'platform_easy'),              // ledge top 408
      createPlat(5150, 420, 100, 24, 'platform_easy'),              // ledge top 408
      createPlat(5500, 350, 600, 40, 'snow'),                       // top 330 [5200,5800]
      // Descent islands #2
      ...islandCluster(5900, 330, [
        { dx: 0, dy: -80, w: 130, type: 'platform_easy' },
        { dx: 230, dy: -170, w: 150, type: 'platform_medium' },
        { dx: 490, dy: -260, w: 170, type: 'platform_hard' },
      ]),                                                           // tops 410/500/590
      createPlat(7000, 630, 900, 40, 'snow'),                       // valley 2 top 610 [6550,7450]
      // Long ice slide over the lower slopes
      createIcePlat(7900, 622, 900, 24),                            // top 610 [7450,8350]
      createPlat(8915, 630, 770, 40, 'snow'),                       // top 610 [8530,9300]
      // Final staircase to the summit plateau
      ...staircase(9300, 610, 3, 70, 160, 40, 'snow'),              // tops 540/470/400
      createPlat(10200, 420, 600, 40, 'snow'),                      // top 400 [9900,10500]
      // Descent to the frozen lake
      ...islandCluster(10600, 400, [
        { dx: 0, dy: -80, w: 140, type: 'platform_easy' },
        { dx: 240, dy: -170, w: 160, type: 'platform_medium' },
      ]),                                                           // tops 480/570
      createIcePlat(11600, 582, 1000, 24),                          // lake top 570 [11100,12100]
      createPlat(12350, 550, 400, 40, 'snow'),                      // top 530 [12150,12550]
    ],
    coins: [
      ...coinTrail(300, 740, 1100, 740, 5),
      ...coinLadder(340, 660, 480, 4),
      ...coinLadder(1590, 650, 300, 4),
      ...coinTrail(1500, 200, 2000, 200, 4),
      ...coinTrail(2150, 280, 2750, 440, 5),
      ...coinTrail(2750, 550, 3350, 550, 5),
      ...coinTrail(3500, 480, 4100, 300, 5),
      ...coinTrail(4200, 270, 4700, 270, 5),
      ...coinArc(5000, 400, 5, 140, 70),
      ...coinTrail(5300, 270, 5700, 270, 4),
      ...coinTrail(5950, 350, 6450, 520, 5),
      ...coinTrail(6650, 550, 7350, 550, 5),
      ...coinTrail(7500, 550, 8250, 550, 5),
      ...coinArc(8915, 550, 5, 150, 70),
      ...coinTrail(9350, 480, 9750, 340, 5),
      ...coinTrail(9950, 340, 10450, 340, 5),
      ...coinTrail(10650, 420, 10950, 520, 5),
      ...coinTrail(11150, 510, 12050, 510, 6),
      ...coinTrail(12180, 480, 12480, 480, 4),
    ],
    questionBlocks: [
      createQB(900, 710, 'mushroom'),
      createQB(1700, 170, 'coin'),
      createQB(3000, 520, 'flower'),
      createQB(4400, 240, 'star'),
      createQB(5500, 240, 'mushroom'),
      createQB(7000, 520, 'coin'),
      createQB(8900, 520, 'flower'),
      createQB(10200, 310, 'oneup'),
      createQB(11800, 480, 'star'),
    ],
    enemies: [
      createEnemy(700, 792, 'goomba'),
      createEnemy(1200, 792, 'spiny'),
      createEnemy(1800, 252, 'robot'),
      createEnemy(2900, 602, 'goomba'),
      createEnemy(3525, 537, 'spiny'),
      createEnemy(4300, 322, 'goomba'),
      createEnemy(4650, 322, 'spiny'),
      createEnemy(5500, 322, 'robot'),
      createEnemy(6800, 602, 'goomba'),
      createEnemy(7300, 602, 'spiny'),
      createEnemy(7800, 602, 'robot'),
      createEnemy(8200, 602, 'goomba'),
      createEnemy(9000, 602, 'spiny'),
      createEnemy(9200, 602, 'robot'),
      createEnemy(10100, 392, 'goomba'),
      createEnemy(11500, 562, 'spiny'),
      createEnemy(11900, 562, 'robot'),
    ],
    decorations: [
      createDeco(500, 720, 'snowflake'),
      createDeco(1600, 660, 'icicle'),
      createDeco(1750, 200, 'penguin'),
      createDeco(2400, 380, 'iceberg'),
      createDeco(3000, 560, 'snowflake'),
      createDeco(4400, 280, 'icicle'),
      createDeco(5000, 420, 'icicle'),
      createDeco(5600, 280, 'penguin'),
      createDeco(6900, 560, 'snowflake'),
      createDeco(7800, 560, 'iceberg'),
      createDeco(9000, 560, 'penguin'),
      createDeco(10200, 340, 'icicle'),
      createDeco(11500, 500, 'snowflake'),
      createDeco(12200, 460, 'penguin'),
    ],
    playerStart: { x: 120, y: 780 },
    goal: { x: 12350, y: 518 },
    timeBonus: 190,
    coinGoal: 20,
    springs: [createSpring(340, 800), createSpring(5500, 330)],
    spikes: [createSpike(3200, 602), createSpike(8700, 602)],
    checkpoints: [createCheckpoint(2900, 590), createCheckpoint(6800, 590)],
    movingPlatforms: [
      createMovingPlat(5000, 270, 120, 24, 'platform_medium', 'vertical', 120, 28),
      createMovingPlat(11600, 460, 110, 24, 'platform_medium', 'circular', 80, 30),
    ],
  },

  // ===== Level 23: Polarhorde - "Polar Heights" =====
  {
    id: 23, name: "Polar Heights", width: 13000, height: 900, biome: 'ice-snow',
    platforms: [
      createPlat(800, 660, 1600, 40, 'snow'),                       // top 640 [0,1600]
      createPlat(2580, 640, 1640, 40, 'snow'),                      // top 620 [1760,3400]
      // Wide ice arena
      createIcePlat(4280, 632, 1440, 24),                           // top 620 [3560,5000]
      // Pit with ledges in the arena
      ...pitFloor(5000, 620, 420, 150, 'ice'),             // floor top 770 [5000,5420]
      createPlat(5050, 710, 110, 24, 'platform_easy'),              // ledge top 698
      createPlat(5330, 710, 110, 24, 'platform_easy'),              // ledge top 698
      createPlat(6210, 640, 1580, 40, 'snow'),                      // top 620 [5420,7000]
      // Two-tier fighting arena
      ...twoTierSection(7000, 620, 600, 'snow', 'platform_medium'), // lower top 620, upper top 460
      createPlat(8590, 640, 1620, 40, 'snow'),                      // top 620 [7780,9400]
      // Long final ice slide
      createIcePlat(10200, 632, 1600, 24),                          // top 620 [9400,11000]
      // Descent islands to the goal ground
      ...islandCluster(11100, 620, [
        { dx: 0, dy: 60, w: 140, type: 'platform_easy' },
        { dx: 250, dy: 130, w: 160, type: 'platform_medium' },
      ]),                                                           // tops 560/490
      createPlat(12100, 620, 1000, 40, 'snow'),                     // top 600 [11600,12600]
      createPlat(12650, 600, 300, 40, 'snow'),                      // top 580 [12500,12800]
    ],
    coins: [
      ...coinTrail(300, 580, 1500, 580, 6),
      ...coinTrail(1850, 560, 3300, 560, 6),
      ...coinArc(3400, 540, 5, 140, 70),
      ...coinTrail(3700, 560, 4900, 560, 6),
      ...coinArc(5200, 680, 5, 150, 80),
      ...coinTrail(5600, 560, 6900, 560, 6),
      ...coinTrail(7050, 400, 7550, 400, 4),
      ...coinTrail(7900, 560, 9300, 560, 6),
      ...coinTrail(9500, 560, 10900, 560, 6),
      ...coinLadder(10200, 560, 400, 4),
      ...coinTrail(11150, 500, 11500, 430, 4),
      ...coinTrail(11700, 540, 12500, 540, 5),
    ],
    questionBlocks: [
      createQB(1000, 550, 'mushroom'),
      createQB(2600, 530, 'flower'),
      createQB(4200, 530, 'coin'),
      createQB(6300, 530, 'star'),
      createQB(7350, 370, 'mushroom'),
      createQB(9200, 530, 'flower'),
      createQB(9800, 530, 'coin'),
      createQB(11800, 510, 'oneup'),
    ],
    enemies: [
      createEnemy(700, 632, 'goomba'),
      createEnemy(1050, 632, 'spiny'),
      createEnemy(1400, 632, 'robot'),
      createEnemy(2100, 612, 'goomba'),
      createEnemy(2500, 612, 'spiny'),
      createEnemy(2900, 612, 'robot'),
      createEnemy(3250, 612, 'goomba'),
      createEnemy(3700, 612, 'spiny'),
      createEnemy(4100, 612, 'goomba'),
      createEnemy(4500, 612, 'robot'),
      createEnemy(4800, 612, 'spiny'),
      createEnemy(5700, 612, 'goomba'),
      createEnemy(6100, 612, 'spiny'),
      createEnemy(7900, 612, 'goomba'),
      createEnemy(8300, 612, 'spiny'),
      createEnemy(9000, 612, 'robot'),
      createEnemy(9600, 612, 'goomba'),
      createEnemy(10300, 612, 'spiny'),
      createEnemy(10800, 612, 'robot'),
      createEnemy(12000, 592, 'goomba'),
    ],
    decorations: [
      createDeco(500, 600, 'penguin'),
      createDeco(1800, 580, 'snowflake'),
      createDeco(2800, 580, 'icicle'),
      createDeco(3900, 580, 'iceberg'),
      createDeco(4600, 580, 'penguin'),
      createDeco(5500, 580, 'snowflake'),
      createDeco(6400, 580, 'icicle'),
      createDeco(7200, 420, 'icicle'),
      createDeco(8100, 580, 'penguin'),
      createDeco(8700, 580, 'iceberg'),
      createDeco(9800, 580, 'snowflake'),
      createDeco(10600, 580, 'penguin'),
      createDeco(11200, 520, 'icicle'),
      createDeco(12000, 560, 'iceberg'),
    ],
    playerStart: { x: 120, y: 620 },
    goal: { x: 12650, y: 568 },
    timeBonus: 200,
    coinGoal: 15,
    springs: [createSpring(360, 640), createSpring(6300, 620)],
    spikes: [createSpike(2000, 612), createSpike(3000, 612), createSpike(8800, 612), createSpike(10500, 612)],
    checkpoints: [createCheckpoint(4300, 600), createCheckpoint(8600, 600)],
    movingPlatforms: [
      createMovingPlat(6500, 500, 120, 24, 'platform_medium', 'vertical', 90, 24),
      createMovingPlat(8200, 520, 110, 24, 'platform_medium', 'circular', 80, 28),
    ],
  },

  // ===== Level 24: Eiszeit-Finale - "Frozen Finale" =====
  {
    id: 24, name: "Frozen Finale", width: 14800, height: 900, biome: 'ice-snow',
    platforms: [
      createPlat(600, 660, 1200, 40, 'snow'),                       // top 640 [0,1200]
      createPlat(1875, 660, 1050, 40, 'snow'),                      // top 640 [1350,2400]
      // Cover corridor 1 (ceiling catches the falling icicles; the gap between
      // the two covered sections is crossed in the open)
      ...overhangSection(2400, 640, 1200, 2900, 100, 'cave'),       // floors [2400,2900] + [3000,3800]
      createPlat(2650, 492, 500, 24, 'cave'),                       // ceiling top 480 [2400,2900]
      createPlat(3400, 492, 800, 24, 'cave'),                       // ceiling top 480 [3000,3800]
      createPlat(4200, 660, 800, 40, 'snow'),                       // top 640 [3800,4600]
      // Long open ice slide (danger stretch)
      createIcePlat(5300, 652, 1400, 24),                           // top 640 [4600,6000]
      // Pit with ledges
      ...pitFloor(6000, 640, 400, 150, 'stone'),           // floor top 790 [6000,6400]
      createPlat(6050, 730, 110, 24, 'platform_easy'),              // ledge top 718
      createPlat(6350, 730, 110, 24, 'platform_easy'),              // ledge top 718
      createPlat(7000, 660, 1200, 40, 'snow'),                      // top 640 [6400,7600]
      // Two-tier shelter with high ceiling
      ...twoTierSection(7600, 640, 700, 'cave', 'platform_medium'), // lower top 640, upper top 480
      createPlat(7950, 400, 700, 40, 'cave'),                       // ceiling top 380 [7600,8300]
      createPlat(9140, 660, 1320, 40, 'snow'),                      // top 640 [8480,9800]
      // Ice slide 2
      createIcePlat(10500, 652, 1400, 24),                          // top 640 [9800,11200]
      createPlat(11980, 660, 1240, 40, 'snow'),                     // top 640 [11360,12600]
      // Cover corridor 2 before the goal
      ...overhangSection(12600, 640, 1400, 12950, 100, 'cave'),     // floors [12600,12950] + [13050,14000]
      createPlat(12775, 492, 350, 24, 'cave'),                      // ceiling top 480 [12600,12950]
      createPlat(13525, 492, 950, 24, 'cave'),                      // ceiling top 480 [13050,14000]
      createPlat(14200, 600, 400, 40, 'snow'),                      // top 580 [14000,14400]
    ],
    coins: [
      ...coinTrail(300, 580, 1100, 580, 5),
      ...coinArc(1300, 560, 5, 140, 70),
      ...coinTrail(1500, 580, 2300, 580, 5),
      ...coinTrail(2500, 580, 3400, 580, 6),
      ...coinTrail(3900, 580, 4500, 580, 4),
      ...coinTrail(4700, 580, 5900, 580, 6),
      ...coinArc(6200, 680, 5, 140, 70),
      ...coinTrail(6500, 580, 7500, 580, 5),
      ...coinTrail(7700, 400, 8250, 400, 4),
      ...coinTrail(8600, 580, 9700, 580, 5),
      ...coinTrail(9900, 580, 11100, 580, 6),
      ...coinTrail(11400, 580, 12500, 580, 6),
      ...coinTrail(12700, 580, 13100, 580, 4),
      ...coinTrail(13300, 580, 13900, 580, 4),
      ...coinTrail(14050, 540, 14350, 540, 4),
    ],
    questionBlocks: [
      createQB(900, 550, 'mushroom'),
      createQB(2000, 550, 'flower'),
      createQB(3300, 590, 'coin'),
      createQB(4300, 550, 'star'),
      createQB(5200, 530, 'flower'),
      createQB(6900, 550, 'mushroom'),
      createQB(8100, 590, 'oneup'),
      createQB(9200, 550, 'coin'),
      createQB(10400, 530, 'star'),
      createQB(12000, 550, 'flower'),
      createQB(12900, 590, 'coin'),
    ],
    enemies: [
      createEnemy(700, 632, 'goomba'),
      createEnemy(1100, 632, 'spiny'),
      createEnemy(1800, 632, 'robot'),
      createEnemy(2200, 632, 'goomba'),
      createEnemy(3200, 632, 'spiny'),
      createEnemy(3600, 632, 'robot'),
      createEnemy(4900, 632, 'goomba'),
      createEnemy(5500, 632, 'spiny'),
      createEnemy(5900, 632, 'robot'),
      createEnemy(6700, 632, 'goomba'),
      createEnemy(7100, 632, 'spiny'),
      createEnemy(7700, 472, 'robot'),
      createEnemy(9000, 632, 'robot'),
      createEnemy(9500, 632, 'goomba'),
      createEnemy(10100, 632, 'spiny'),
      createEnemy(10700, 632, 'robot'),
      createEnemy(11700, 632, 'goomba'),
      createEnemy(12200, 632, 'spiny'),
      createEnemy(12800, 632, 'robot'),
    ],
    decorations: [
      createDeco(400, 600, 'icicle'),
      createDeco(1200, 600, 'snowflake'),
      createDeco(1700, 600, 'icicle'),
      createDeco(2300, 600, 'penguin'),
      createDeco(2700, 580, 'snowflake'),
      createDeco(3400, 580, 'penguin'),
      createDeco(4100, 600, 'iceberg'),
      createDeco(4900, 600, 'snowflake'),
      createDeco(5600, 600, 'icicle'),
      createDeco(6300, 600, 'penguin'),
      createDeco(6800, 600, 'icicle'),
      createDeco(7400, 600, 'snowflake'),
      createDeco(8000, 340, 'icicle'),
      createDeco(8800, 600, 'iceberg'),
      createDeco(9400, 600, 'icicle'),
      createDeco(10200, 600, 'penguin'),
      createDeco(10900, 600, 'snowflake'),
      createDeco(11600, 600, 'icicle'),
      createDeco(12300, 600, 'iceberg'),
      createDeco(12900, 580, 'snowflake'),
      createDeco(13600, 580, 'penguin'),
      createDeco(14200, 540, 'penguin'),
    ],
    playerStart: { x: 120, y: 620 },
    goal: { x: 14200, y: 568 },
    timeBonus: 220,
    springs: [createSpring(360, 640), createSpring(8600, 640)],
    spikes: [createSpike(1700, 632), createSpike(7300, 632)],
    checkpoints: [createCheckpoint(2700, 620), createCheckpoint(9900, 620)],
    movingPlatforms: [
      createMovingPlat(5300, 510, 120, 24, 'platform_medium', 'vertical', 110, 26),
      createMovingPlat(9000, 520, 110, 24, 'platform_medium', 'circular', 80, 28),
    ],
    fallingHazards: { intervalMs: 2500 },
  },
];

// Individually anchored landscape, reward and recovery polish; original jump tops stay fixed.
export const ICE_SNOW_LEVELS: LevelData[] = ICE_SNOW_AUTHORED_LEVELS.map(polishNatureLevel);

// Factory World (ids 49-54) — Phase 9 rebuild
// Archetypes:
//   L49 "Gear Grinder"     - Maschinenhalle (Tutorial: Terrassen, erste Foerderbaender)
//   L50 "Steel Girders"    - Stahltraeger (Girder-Hopping, Crumble-Stahlplatte, Chasm-Bruecke)
//   L51 "Pipeworks"        - Rohrwerk (Pipes + Piranhas, zwei Kanonen, Vertikal-Aufzug)
//   L52 "Smokestack Climb" - Schornstein-Aufzug (drei vertikale Aufzuege, hohe Schornsteine)
//   L53 "Robot Rampage"    - Roboterhorde (Kampf-Arenen, Foerderbaender in beide Richtungen)
//   L54 "Conveyor Chaos"   - Foerderband-Finale (lange Baender, Kanonen, Schluessel+Tuer-Bonusraum)
//
// Factory gravity is 2000: safe rises <=160px, safe same-height gaps <=210px, falls <=1000px.
// All levels are authored solvable — ensureSolvable() must not add a single platform.

import {
  LevelData, createPlat, createQB, createEnemy, createDeco, createMovingPlat,
  createSpring, createSpike, createCrumblePlat, createConveyorPlat, createCheckpoint,
  createKey, createDoor, createCannon, staircase, pitWithLedges, gapWithPlatforms,
  coinArc, coinDiamond, coinTrail, coinLadder,
} from './helpers';

/** Pipe + pipe_top standing on a ground whose top edge is `top`. */
const pipePair = (x: number, top: number): LevelData['platforms'] => [
  createPlat(x, top - 32, 64, 64, 'pipe'),
  createPlat(x, top - 76, 80, 24, 'pipe_top'),
];

export const FACTORY_LEVELS: LevelData[] = [
  // ============================================================
  // Level 49 (Maschinenhalle): sanfter Einstieg ueber Metall-
  // Terrassen, erstes Foerderband (rechts) mit Bremsweg, ein
  // Ruecklauf-Band (links), Grube mit Leitern, optionale
  // Katwalk-Alkove und ein Vertikal-Aufzug. 1 Spring, 1 Spike.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(600, 600, 1200, 40, 'metal'));          // top 580  [0,1200]
    platforms.push(...staircase(1200, 580, 3, 70, 140, 40, 'metal')); // tops 510/440/370
    platforms.push(createPlat(1880, 410, 360, 40, 'metal'));          // top 390  [1700,2060]
    platforms.push(createPlat(500, 480, 260, 24, 'platform_medium')); // Katwalk top 468 [370,630]
    platforms.push(createPlat(2350, 560, 300, 40, 'metal'));          // top 540  [2200,2500]
    platforms.push(createConveyorPlat(2830, 532, 660, 24, 'metal', 1, 60)); // Band R top 520 [2500,3160]
    platforms.push(createPlat(3480, 580, 640, 40, 'metal'));          // top 560  [3160,3800]
    platforms.push(...pitWithLedges(3800, 560, 420, 160, 'metal')); // Grubenboden top 720
    platforms.push(createPlat(3860, 682, 110, 24, 'platform_easy'));  // Leiter L top 670
    platforms.push(createPlat(4160, 682, 110, 24, 'platform_easy'));  // Leiter R top 670
    platforms.push(createPlat(4540, 580, 640, 40, 'metal'));          // top 560  [4220,4860]
    platforms.push(createConveyorPlat(5160, 572, 600, 24, 'metal', -1, 50)); // Band L top 560 [4860,5460]
    platforms.push(createPlat(5760, 580, 600, 40, 'metal'));          // top 560  [5460,6060]
    platforms.push(createPlat(6480, 480, 700, 40, 'metal'));          // top 460  [6130,6830]
    platforms.push(createPlat(6480, 322, 220, 24, 'platform_hard'));  // Giebel top 310
    platforms.push(createPlat(2160, 400, 160, 24, 'platform_hard'));  // Alkove top 388
    platforms.push(createPlat(2350, 312, 140, 24, 'platform_medium')); // Aufzugsziel top 300

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 520, 1100, 520, 5));
    coins.push(...coinTrail(1250, 500, 1650, 340, 4));
    coins.push(...coinDiamond(500, 420, 60));
    coins.push(...coinArc(2350, 480, 5, 120, 70));
    coins.push(...coinDiamond(2830, 460, 60));
    coins.push(...coinArc(4010, 650, 5, 170, 90));
    coins.push(...coinDiamond(2160, 330, 60));
    coins.push(...coinTrail(5200, 510, 5700, 510, 4));
    coins.push(...coinLadder(5600, 520, 320, 4));
    coins.push(...coinTrail(6250, 400, 6750, 400, 4));
    coins.push(...coinTrail(6420, 260, 6540, 260, 3));

    return {
      id: 49, name: 'Gear Grinder', width: 7200, height: 900, biome: 'factory',
      platforms,
      movingPlatforms: [
        createMovingPlat(2350, 440, 110, 24, 'platform_medium', 'vertical', 80, 22),
        createMovingPlat(5600, 470, 110, 24, 'platform_hard', 'circular', 60, 20),
      ],
      coins,
      questionBlocks: [
        createQB(700, 490, 'mushroom'),
        createQB(2600, 460, 'coin'),
        createQB(4500, 480, 'oneup'),
        createQB(6600, 380, 'flower'),
      ],
      enemies: [
        createEnemy(900, 572, 'robot'),
        createEnemy(1600, 362, 'goomba'),
        createEnemy(1900, 382, 'koopa'),
        createEnemy(2400, 532, 'crab'),
        createEnemy(3400, 552, 'robot'),
        createEnemy(4400, 552, 'spiny'),
        createEnemy(5300, 552, 'goomba'),
        createEnemy(6000, 552, 'crab'),
      ],
      decorations: [
        createDeco(300, 540, 'gear'),
        createDeco(1500, 330, 'crane'),
        createDeco(2300, 400, 'smoke'),
        createDeco(3200, 460, 'conveyor'),
        createDeco(4010, 660, 'ember'),
        createDeco(4200, 500, 'gear'),
        createDeco(5200, 500, 'chain'),
        createDeco(6200, 420, 'crane'),
        createDeco(6600, 260, 'smoke'),
        createDeco(7000, 520, 'pipe'),
      ],
      playerStart: { x: 200, y: 564 },
      goal: { x: 6600, y: 452 },
      timeBonus: 150,
      springs: [createSpring(5600, 560)],
      spikes: [createSpike(4700, 552)],
    };
  })(),

  // ============================================================
  // Level 50 (Stahltraeger): Girder-Hopping ueber einen Abgrund,
  // Chasm-Bruecke aus horizontaler Moving-Platform, Vertical-
  // Aufzug zur Bonus-Stahlplatte und eine einstuergende
  // Crumble-Platte als Abkuerzung (mit sicherem Tiefweg).
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(500, 600, 1000, 40, 'metal'));          // top 580  [0,1000]
    platforms.push(...gapWithPlatforms(1, 1000, 580, 560, 3, {
      widths: [110, 90, 130], dy: [40, 0, 80],
      types: ['platform_easy', 'platform_medium', 'platform_hard'],
    }));                                                              // tops 528/568/488
    platforms.push(createPlat(1680, 460, 380, 40, 'metal'));          // top 440  [1490,1870]
    platforms.push(createPlat(2020, 412, 120, 24, 'platform_medium')); // Strahl top 400
    platforms.push(createPlat(2330, 452, 100, 24, 'platform_easy'));  // Strahl top 440
    platforms.push(createPlat(2620, 392, 140, 24, 'platform_hard'));  // Strahl top 380
    platforms.push(createPlat(2945, 472, 110, 24, 'platform_medium')); // Strahl top 460
    platforms.push(createPlat(3350, 660, 640, 40, 'metal'));          // Tiefdeck top 640 [3030,3670]
    platforms.push(createPlat(3300, 300, 160, 24, 'platform_medium')); // Bonus top 288
    platforms.push(createPlat(4000, 480, 110, 24, 'platform_easy'));  // Nische top 468
    platforms.push(createPlat(4400, 620, 600, 40, 'metal'));          // top 600  [4100,4700]
    platforms.push(...staircase(4700, 600, 3, 70, 140, 40, 'metal')); // tops 530/460/390
    platforms.push(createPlat(5500, 420, 520, 40, 'metal'));          // Traeger top 400 [5240,5760]
    platforms.push(createCrumblePlat(6060, 392, 320, 24, 'metal'));   // Crumble-Platte top 380
    platforms.push(createPlat(6060, 640, 500, 40, 'metal'));          // Tiefweg top 620 [5810,6310]
    platforms.push(createPlat(6600, 480, 560, 40, 'metal'));          // Ziel-Traeger top 460
    platforms.push(createPlat(6300, 340, 120, 24, 'platform_medium')); // Bonus top 328
    platforms.push(createPlat(6560, 280, 140, 24, 'platform_hard'));  // Bonus top 268

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(120, 520, 950, 520, 5));
    coins.push(...coinArc(1280, 480, 5, 150, 80));
    coins.push(...coinDiamond(1680, 370, 60));
    coins.push(...coinTrail(2050, 350, 2600, 340, 4));
    coins.push(...coinArc(3885, 560, 5, 170, 80));
    coins.push(...coinTrail(3100, 580, 3600, 580, 4));
    coins.push(...coinLadder(4350, 540, 320, 5));
    coins.push(...coinDiamond(3300, 240, 70));
    coins.push(...coinTrail(4900, 450, 5150, 410, 4));
    coins.push(...coinTrail(5300, 340, 5700, 340, 4));
    coins.push(...coinDiamond(6060, 320, 60));
    coins.push(...coinTrail(6350, 410, 6800, 410, 4));

    return {
      id: 50, name: 'Steel Girders', width: 8800, height: 950, biome: 'factory',
      platforms,
      movingPlatforms: [
        createMovingPlat(3885, 620, 130, 24, 'platform_medium', 'horizontal', 145, 20),
        createMovingPlat(3300, 480, 110, 24, 'platform_easy', 'vertical', 130, 22),
        createMovingPlat(8000, 300, 110, 24, 'platform_hard', 'circular', 80, 20),
      ],
      coins,
      questionBlocks: [
        createQB(700, 500, 'mushroom'),
        createQB(1750, 360, 'coin'),
        createQB(4750, 450, 'flower'),
        createQB(6700, 380, 'star'),
      ],
      enemies: [
        createEnemy(800, 572, 'robot'),
        createEnemy(1750, 432, 'goomba'),
        createEnemy(2350, 432, 'spiny'),
        createEnemy(3200, 632, 'crab'),
        createEnemy(4500, 592, 'koopa'),
        createEnemy(4900, 452, 'robot'),
        createEnemy(5450, 392, 'goomba'),
        createEnemy(6650, 452, 'spiny'),
      ],
      decorations: [
        createDeco(250, 540, 'chain'),
        createDeco(1500, 360, 'crane'),
        createDeco(2900, 420, 'gear'),
        createDeco(3885, 700, 'ember'),
        createDeco(4800, 520, 'smoke'),
        createDeco(5600, 340, 'gear'),
        createDeco(6100, 560, 'fire'),
        createDeco(6800, 380, 'crane'),
        createDeco(7300, 480, 'chain'),
      ],
      playerStart: { x: 200, y: 564 },
      goal: { x: 6700, y: 452 },
      timeBonus: 170,
      springs: [createSpring(4350, 600)],
      spikes: [createSpike(3300, 632), createSpike(4300, 592)],
    };
  })(),

  // ============================================================
  // Level 51 (Rohrwerk): Rohr-Gassen mit Piranhas, zwei Kanonen
  // (Schusslinien immer ueber Kopfhoehe der Pflicht-Landeplaetze),
  // ein Vertikal-Aufzug zur oberen Rohrebene und ein Ruecklauf-
  // Foerderband. 2 Springs, 2 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(600, 600, 1200, 40, 'metal'));          // top 580  [0,1200]
    platforms.push(...gapWithPlatforms(1, 1200, 580, 360, 2, {
      widths: [110, 120], dy: [40, 0], types: ['platform_easy', 'platform_medium'],
    }));                                                              // tops 528/568
    platforms.push(createPlat(2150, 580, 1020, 40, 'metal'));         // top 560  [1640,2660]
    platforms.push(...pipePair(1950, 560));
    platforms.push(...pipePair(2400, 560));
    platforms.push(createConveyorPlat(2960, 572, 600, 24, 'metal', 1, 70)); // Band R top 560 [2660,3260]
    platforms.push(createPlat(3580, 600, 640, 40, 'metal'));          // top 580  [3260,3900]
    platforms.push(createPlat(3580, 440, 220, 24, 'platform_medium')); // Rohr-Ebene top 428
    platforms.push(createPlat(3950, 600, 100, 280, 'metal'));         // Kanonenturm top 460
    platforms.push(createPlat(4090, 512, 120, 24, 'platform_medium')); // Tritt top 500
    platforms.push(createPlat(4300, 532, 120, 24, 'platform_hard'));  // Tritt top 520
    platforms.push(createPlat(4800, 560, 800, 40, 'metal'));          // top 540  [4400,5200]
    platforms.push(...pipePair(4650, 540));
    platforms.push(createPlat(5850, 420, 700, 40, 'metal'));          // obere Ebene top 400 [5500,6200]
    platforms.push(...pipePair(5650, 400));
    platforms.push(...pipePair(6050, 400));
    platforms.push(createPlat(6450, 422, 200, 24, 'platform_medium')); // Abstieg top 410
    platforms.push(createPlat(7000, 620, 700, 40, 'metal'));          // top 600  [6650,7350]
    platforms.push(createPlat(6250, 380, 80, 160, 'metal'));          // Kanonenblock top 300
    platforms.push(createConveyorPlat(7650, 592, 600, 24, 'metal', -1, 60)); // Band L top 580 [7350,7950]
    platforms.push(createPlat(8300, 620, 660, 40, 'metal'));          // top 600  [7970,8630]
    platforms.push(...pitWithLedges(8630, 600, 420, 160, 'metal')); // Grube top 760
    platforms.push(createPlat(8690, 722, 110, 24, 'platform_easy'));  // Leiter L top 710
    platforms.push(createPlat(8990, 722, 110, 24, 'platform_easy'));  // Leiter R top 710
    platforms.push(createPlat(9100, 700, 140, 24, 'platform_medium')); // Stufe top 688
    platforms.push(createPlat(9600, 620, 800, 40, 'metal'));          // top 600  [9200,10000]
    platforms.push(createPlat(9600, 512, 200, 24, 'platform_hard'));  // Bonus top 500

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 520, 1100, 520, 5));
    coins.push(...coinArc(1320, 470, 5, 140, 70));
    coins.push(...coinTrail(1800, 480, 2550, 480, 4));
    coins.push(...coinDiamond(2960, 490, 60));
    coins.push(...coinArc(4010, 530, 5, 150, 80));
    coins.push(...coinLadder(3580, 560, 470, 4));
    coins.push(...coinTrail(4500, 480, 5100, 480, 4));
    coins.push(...coinDiamond(5380, 340, 70));
    coins.push(...coinTrail(5600, 320, 6100, 320, 4));
    coins.push(...coinArc(7000, 540, 5, 200, 80));
    coins.push(...coinTrail(7500, 520, 7900, 520, 4));
    coins.push(...coinArc(8840, 690, 5, 170, 80));
    coins.push(...coinLadder(9600, 560, 520, 4));
    coins.push(...coinTrail(9250, 560, 9950, 560, 4));

    return {
      id: 51, name: 'Pipeworks', width: 10400, height: 950, biome: 'factory',
      platforms,
      movingPlatforms: [
        createMovingPlat(5380, 420, 120, 24, 'platform_medium', 'vertical', 120, 24),
        createMovingPlat(5150, 420, 110, 24, 'platform_hard', 'circular', 80, 20),
      ],
      coins,
      questionBlocks: [
        createQB(700, 500, 'mushroom'),
        createQB(2300, 480, 'coin'),
        createQB(3600, 348, 'flower'),
        createQB(7300, 520, 'star'),
      ],
      enemies: [
        createEnemy(900, 572, 'robot'),
        createEnemy(1950, 528, 'piranha'),
        createEnemy(2400, 528, 'piranha'),
        createEnemy(2600, 552, 'goomba'),
        createEnemy(3400, 572, 'spiny'),
        createEnemy(4650, 508, 'piranha'),
        createEnemy(4800, 532, 'crab'),
        createEnemy(5650, 368, 'piranha'),
        createEnemy(5900, 392, 'goomba'),
        createEnemy(6050, 368, 'piranha'),
        createEnemy(7000, 592, 'robot'),
        createEnemy(8300, 592, 'koopa'),
        createEnemy(9500, 592, 'spiny'),
      ],
      decorations: [
        createDeco(350, 540, 'pipe'),
        createDeco(1700, 500, 'gear'),
        createDeco(3200, 520, 'smoke'),
        createDeco(3800, 380, 'crane'),
        createDeco(5000, 500, 'chain'),
        createDeco(6000, 340, 'smoke'),
        createDeco(7100, 560, 'gear'),
        createDeco(8840, 700, 'ember'),
        createDeco(9800, 540, 'crane'),
      ],
      playerStart: { x: 200, y: 564 },
      goal: { x: 9800, y: 592 },
      timeBonus: 190,
      springs: [createSpring(700, 580), createSpring(9400, 600)],
      spikes: [createSpike(3700, 572), createSpike(8500, 592)],
      cannons: [
        createCannon(3950, 420, 1, 2200, 240),
        createCannon(6250, 340, 1, 2200, 240),
      ],
    };
  })(),

  // ============================================================
  // Level 52 (Schornstein-Aufzug): vertikaler Innenraum mit drei
  // Schornsteinen und drei vertikalen Aufzuegen; Aufstieg bis auf
  // die Dachebene, Abstieg ueber Hallenboeden. 1 Spring, 2 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(700, 780, 1400, 40, 'metal'));          // Halle top 760 [0,1400]
    platforms.push(...staircase(1400, 760, 2, 80, 140, 40, 'metal')); // tops 680/600
    platforms.push(createPlat(2000, 560, 400, 40, 'metal'));          // top 540  [1800,2200]
    platforms.push(createPlat(2800, 340, 400, 40, 'metal'));          // top 320  [2600,3000]
    platforms.push(createPlat(3200, 280, 160, 80, 'metal'));          // Schornstein top 240
    platforms.push(createPlat(3550, 480, 200, 24, 'platform_medium')); // Abstieg top 468
    platforms.push(createPlat(4200, 760, 1000, 40, 'metal'));         // Halle 2 top 740 [3700,4700]
    platforms.push(createPlat(5300, 560, 400, 40, 'metal'));          // top 540  [5100,5500]
    platforms.push(createPlat(5800, 480, 400, 40, 'metal'));          // top 460  [5600,6000]
    platforms.push(createPlat(6600, 260, 500, 40, 'metal'));          // Dach top 240 [6350,6850]
    platforms.push(createPlat(7100, 220, 120, 120, 'metal'));         // Schornstein 2 top 160
    platforms.push(createPlat(6600, 120, 200, 24, 'platform_hard'));  // Bonus top 108
    platforms.push(createPlat(7400, 300, 400, 40, 'metal'));          // Finale top 280 [7200,7600]

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 700, 1300, 700, 5));
    coins.push(...coinTrail(1450, 620, 1700, 560, 4));
    coins.push(...coinArc(2000, 480, 5, 170, 80));
    coins.push(...coinDiamond(2400, 360, 70));
    coins.push(...coinTrail(2650, 260, 2950, 260, 4));
    coins.push(...coinTrail(3250, 300, 3450, 400, 3));
    coins.push(...coinArc(4200, 660, 5, 220, 80));
    coins.push(...coinDiamond(4880, 420, 80));
    coins.push(...coinTrail(5150, 480, 5450, 480, 4));
    coins.push(...coinLadder(6000, 520, 320, 4));
    coins.push(...coinTrail(6400, 180, 6800, 180, 4));
    coins.push(...coinDiamond(6600, 60, 70));
    coins.push(...coinTrail(7250, 240, 7550, 240, 4));

    return {
      id: 52, name: 'Smokestack Climb', width: 7800, height: 1100, biome: 'factory',
      platforms,
      movingPlatforms: [
        createMovingPlat(2400, 480, 120, 24, 'platform_medium', 'vertical', 170, 24),
        createMovingPlat(4880, 560, 120, 24, 'platform_medium', 'vertical', 200, 26),
        createMovingPlat(6150, 320, 120, 24, 'platform_hard', 'vertical', 150, 26),
        createMovingPlat(2000, 360, 110, 24, 'platform_hard', 'circular', 80, 20),
      ],
      coins,
      questionBlocks: [
        createQB(600, 680, 'mushroom'),
        createQB(1900, 460, 'coin'),
        createQB(5300, 460, 'flower'),
        createQB(6800, 160, 'oneup'),
      ],
      enemies: [
        createEnemy(900, 752, 'robot'),
        createEnemy(1900, 532, 'crab'),
        createEnemy(2700, 312, 'spiny'),
        createEnemy(3500, 460, 'goomba'),
        createEnemy(4000, 732, 'robot'),
        createEnemy(5200, 532, 'koopa'),
        createEnemy(5700, 452, 'crab'),
        createEnemy(6500, 232, 'spiny'),
        createEnemy(7400, 272, 'goomba'),
      ],
      decorations: [
        createDeco(300, 700, 'smoke'),
        createDeco(1200, 620, 'gear'),
        createDeco(2400, 400, 'crane'),
        createDeco(3200, 200, 'smoke'),
        createDeco(4300, 680, 'chain'),
        createDeco(5000, 480, 'gear'),
        createDeco(6150, 220, 'crane'),
        createDeco(7100, 120, 'ember'),
        createDeco(7500, 220, 'smoke'),
      ],
      playerStart: { x: 200, y: 744 },
      goal: { x: 7500, y: 272 },
      timeBonus: 210,
      springs: [createSpring(500, 760)],
      spikes: [createSpike(1100, 752), createSpike(4400, 732)],
    };
  })(),

  // ============================================================
  // Level 53 (Roboterhorde): breite Kampf-Arenen mit Foerder-
  // baendern in beide Richtungen, Grube mit Aufzug, Bonus-Stahl-
  // plaettchen und 18 Waechtern. Muenz-Tor (coinGoal 24).
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(450, 660, 900, 40, 'metal'));           // top 640  [0,900]
    platforms.push(createConveyorPlat(1475, 652, 1150, 24, 'metal', 1, 70)); // Band R top 640 [900,2050]
    platforms.push(createPlat(2275, 660, 150, 40, 'metal'));          // top 640  [2200,2350]
    platforms.push(createConveyorPlat(2700, 652, 700, 24, 'metal', -1, 70)); // Band L top 640 [2350,3050]
    platforms.push(createPlat(3225, 660, 350, 40, 'metal'));          // top 640  [3050,3400]
    platforms.push(createPlat(3900, 720, 1000, 40, 'metal'));         // Grube top 700 [3400,4400]
    platforms.push(createPlat(4550, 620, 300, 40, 'metal'));          // top 600  [4400,4700]
    platforms.push(createConveyorPlat(5000, 612, 600, 24, 'metal', 1, 80)); // Band R top 600 [4700,5300]
    platforms.push(createPlat(5450, 620, 300, 40, 'metal'));          // top 600  [5300,5600]
    platforms.push(createConveyorPlat(6200, 652, 800, 24, 'metal', -1, 80)); // Band L top 640 [5800,6600]
    platforms.push(createPlat(6700, 660, 200, 40, 'metal'));          // top 640  [6600,6800]
    platforms.push(createPlat(6870, 620, 120, 24, 'platform_easy'));  // Tritt top 608
    platforms.push(createPlat(7125, 600, 250, 40, 'metal'));          // top 580  [7000,7250]
    platforms.push(createConveyorPlat(7500, 592, 500, 24, 'metal', 1, 80)); // Band R top 580 [7250,7750]
    platforms.push(createPlat(8075, 600, 650, 40, 'metal'));          // top 580  [7750,8400]
    platforms.push(createPlat(8900, 540, 600, 40, 'metal'));          // top 520  [8600,9200]
    platforms.push(createPlat(9700, 500, 800, 40, 'metal'));          // Ziel top 480 [9300,10100]
    platforms.push(createPlat(5000, 480, 140, 24, 'platform_medium')); // Bonus top 468
    platforms.push(createPlat(7600, 460, 200, 24, 'platform_hard'));  // Bonus top 448
    platforms.push(createPlat(4300, 320, 160, 24, 'platform_hard'));  // Aufzugsziel top 308

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 580, 850, 580, 5));
    coins.push(...coinArc(1475, 580, 5, 260, 80));
    coins.push(...coinTrail(2250, 580, 3350, 580, 6));
    coins.push(...coinDiamond(5000, 400, 70));
    coins.push(...coinTrail(4500, 540, 5500, 540, 5));
    coins.push(...coinArc(6250, 580, 5, 220, 70));
    coins.push(...coinDiamond(4300, 240, 70));
    coins.push(...coinTrail(7050, 520, 8350, 520, 6));
    coins.push(...coinTrail(8650, 460, 9150, 460, 4));
    coins.push(...coinTrail(9350, 420, 10050, 420, 5));
    coins.push(...coinDiamond(7600, 380, 60));
    coins.push(...coinDiamond(8800, 300, 70));

    return {
      id: 53, name: 'Robot Rampage', width: 11600, height: 900, biome: 'factory',
      platforms,
      movingPlatforms: [
        createMovingPlat(4300, 560, 120, 24, 'platform_medium', 'vertical', 120, 22),
        createMovingPlat(10600, 420, 110, 24, 'platform_hard', 'circular', 80, 20),
      ],
      coins,
      questionBlocks: [
        createQB(700, 560, 'mushroom'),
        createQB(3000, 560, 'flower'),
        createQB(5100, 520, 'coin'),
        createQB(8200, 500, 'star'),
      ],
      enemies: [
        createEnemy(900, 632, 'robot'),
        createEnemy(1050, 632, 'goomba'),
        createEnemy(2300, 632, 'koopa'),
        createEnemy(2900, 632, 'robot'),
        createEnemy(3200, 632, 'crab'),
        createEnemy(3700, 692, 'goomba'),
        createEnemy(4100, 692, 'spiny'),
        createEnemy(4600, 592, 'robot'),
        createEnemy(5000, 460, 'spiny'),
        createEnemy(5500, 592, 'crab'),
        createEnemy(6000, 632, 'koopa'),
        createEnemy(6500, 632, 'goomba'),
        createEnemy(7100, 572, 'robot'),
        createEnemy(7600, 572, 'crab'),
        createEnemy(8300, 572, 'spiny'),
        createEnemy(8700, 512, 'goomba'),
        createEnemy(9500, 472, 'robot'),
        createEnemy(9900, 472, 'koopa'),
      ],
      decorations: [
        createDeco(300, 600, 'gear'),
        createDeco(1200, 560, 'conveyor'),
        createDeco(2400, 560, 'smoke'),
        createDeco(3300, 560, 'gear'),
        createDeco(3900, 800, 'ember'),
        createDeco(4900, 540, 'crane'),
        createDeco(6100, 560, 'conveyor'),
        createDeco(7200, 500, 'smoke'),
        createDeco(8400, 500, 'gear'),
        createDeco(9800, 400, 'crane'),
      ],
      playerStart: { x: 200, y: 624 },
      goal: { x: 9900, y: 472 },
      timeBonus: 220,
      coinGoal: 24,
      timeGate: 40,
      goals: [
        { x: 9500, y: 472, points: 2500, difficulty: 'hard' },
      ],
      springs: [createSpring(700, 640), createSpring(8800, 520)],
      spikes: [createSpike(560, 632), createSpike(5450, 592), createSpike(7950, 572)],
    };
  })(),

  // ============================================================
  // Level 54 (Foerderband-Finale): lange Baender in beide
  // Richtungen, zwei Kanonen ueber Kopfhoehe, Vertikal-Aufzug zur
  // oberen Bandetage, Checkpoints und ein optionaler Maschinen-
  // raum (Schluessel + Tuer, nur Bonus, mit Notausstieg).
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(700, 680, 1400, 40, 'metal'));          // top 660  [0,1400]
    platforms.push(createConveyorPlat(1900, 672, 1000, 24, 'metal', 1, 90)); // Band R top 660 [1400,2400]
    platforms.push(createPlat(2800, 720, 800, 40, 'metal'));          // top 700  [2400,3200]
    platforms.push(createPlat(3320, 672, 120, 24, 'platform_medium')); // Tritt top 660
    platforms.push(createPlat(3500, 700, 80, 200, 'metal'));          // Kanonenturm top 600
    platforms.push(createPlat(4000, 680, 900, 40, 'metal'));          // top 660  [3550,4450]
    platforms.push(createConveyorPlat(4950, 672, 900, 24, 'metal', -1, 90)); // Band L top 660 [4500,5400]
    platforms.push(createPlat(6000, 700, 1200, 40, 'metal'));         // top 680  [5400,6600]
    platforms.push(createPlat(7150, 380, 700, 40, 'metal'));          // obere Etage top 360 [6800,7500]
    platforms.push(createConveyorPlat(7900, 372, 800, 24, 'metal', 1, 100)); // Band R top 360 [7500,8300]
    platforms.push(createPlat(8420, 392, 120, 24, 'platform_medium')); // Tritt top 380
    platforms.push(createPlat(8600, 320, 80, 200, 'metal'));          // Kanonenblock top 220
    platforms.push(createPlat(8850, 352, 120, 24, 'platform_hard'));  // Tritt top 340
    platforms.push(createPlat(9400, 400, 600, 40, 'metal'));          // top 380  [9100,9700]
    platforms.push(createPlat(9900, 500, 200, 24, 'platform_medium')); // Abstieg top 488
    platforms.push(createPlat(10450, 560, 600, 40, 'metal'));         // top 540  [10150,10750]
    platforms.push(createPlat(11300, 540, 800, 40, 'metal'));         // Bruecke top 520 [10900,11700]
    platforms.push(createPlat(11300, 880, 800, 40, 'metal'));         // Maschinenraum top 860
    platforms.push(createPlat(10960, 760, 40, 200, 'metal'));         // Raumwand L top 660
    platforms.push(createPlat(11640, 760, 40, 200, 'metal'));         // Raumwand R top 660
    platforms.push(createPlat(11080, 760, 120, 24, 'platform_easy')); // Notausstieg 1 top 748
    platforms.push(createPlat(10850, 700, 120, 24, 'platform_easy')); // Notausstieg 2 top 688
    platforms.push(createPlat(11550, 720, 120, 24, 'platform_medium')); // Bonus-Ausstieg top 708
    platforms.push(createPlat(12000, 620, 600, 40, 'metal'));         // top 600  [11700,12300]
    platforms.push(createPlat(12700, 560, 600, 40, 'metal'));         // Ziel top 540 [12400,13000]
    platforms.push(createPlat(12850, 400, 200, 24, 'platform_hard')); // Bonus top 388

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 600, 1300, 600, 5));
    coins.push(...coinArc(1900, 580, 5, 260, 80));
    coins.push(...coinTrail(2500, 620, 3100, 620, 4));
    coins.push(...coinDiamond(3500, 420, 70));
    coins.push(...coinArc(4950, 580, 5, 240, 80));
    coins.push(...coinTrail(5500, 600, 6500, 600, 5));
    coins.push(...coinTrail(6900, 300, 7500, 300, 4));
    coins.push(...coinDiamond(7900, 280, 70));
    coins.push(...coinTrail(8400, 320, 8900, 280, 4));
    coins.push(...coinTrail(9200, 320, 9600, 320, 4));
    coins.push(...coinDiamond(10450, 440, 70));
    coins.push(...coinTrail(11000, 480, 11600, 480, 4));
    coins.push(...coinTrail(11050, 800, 11150, 800, 3));
    coins.push(...coinTrail(11420, 800, 11580, 800, 3));
    coins.push(...coinTrail(11800, 540, 12250, 540, 4));
    coins.push(...coinArc(12700, 460, 5, 140, 70));
    coins.push(...coinTrail(12780, 320, 12920, 320, 3));

    return {
      id: 54, name: 'Conveyor Chaos', width: 13200, height: 1000, biome: 'factory',
      platforms,
      movingPlatforms: [
        createMovingPlat(6740, 500, 120, 24, 'platform_medium', 'vertical', 150, 24),
        createMovingPlat(10400, 380, 110, 24, 'platform_hard', 'circular', 80, 20),
      ],
      coins,
      questionBlocks: [
        createQB(600, 580, 'mushroom'),
        createQB(2900, 620, 'coin'),
        createQB(6100, 600, 'flower'),
        createQB(11450, 780, 'oneup'),
        createQB(12100, 520, 'star'),
      ],
      enemies: [
        createEnemy(900, 652, 'robot'),
        createEnemy(2000, 652, 'goomba'),
        createEnemy(2600, 692, 'crab'),
        createEnemy(3900, 652, 'spiny'),
        createEnemy(5600, 672, 'koopa'),
        createEnemy(7300, 352, 'robot'),
        createEnemy(7900, 352, 'goomba'),
        createEnemy(8700, 332, 'spiny'),
        createEnemy(9300, 372, 'crab'),
        createEnemy(10300, 532, 'koopa'),
        createEnemy(11200, 512, 'robot'),
        createEnemy(12100, 592, 'goomba'),
        createEnemy(12600, 532, 'spiny'),
      ],
      decorations: [
        createDeco(300, 620, 'conveyor'),
        createDeco(1700, 600, 'gear'),
        createDeco(3400, 620, 'smoke'),
        createDeco(4900, 600, 'crane'),
        createDeco(6300, 620, 'conveyor'),
        createDeco(7200, 320, 'gear'),
        createDeco(8100, 300, 'smoke'),
        createDeco(9400, 340, 'crane'),
        createDeco(10450, 500, 'chain'),
        createDeco(12100, 540, 'gear'),
        createDeco(12900, 480, 'smoke'),
      ],
      playerStart: { x: 200, y: 644 },
      goal: { x: 12850, y: 532 },
      timeBonus: 260,
      springs: [createSpring(500, 660), createSpring(5700, 680)],
      spikes: [createSpike(1000, 652), createSpike(4200, 652), createSpike(6300, 672)],
      checkpoints: [createCheckpoint(3800, 644), createCheckpoint(12000, 584)],
      keys: [createKey(7850, 300)],
      doors: [createDoor(11300, 760, 40, 220)],
      cannons: [
        createCannon(3500, 480, -1, 2200, 240),
        createCannon(8600, 180, -1, 2000, 280),
      ],
    };
  })(),
];

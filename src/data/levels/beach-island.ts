// Beach Island — 6 Level, 6 Archetypen (IDs 43-48), Phase-9-Neubau
// L43 Sandy Shores   (Strandspaziergang: Duenen, Tidenbecken, Terrassen)
// L44 Boardwalk Dash (Steg ueber Watt: Wasserzonen, Crumble-Sandbruecke, Gaps)
// L45 Palm Grove     (Inselhuepfen, Lagune zum Schwimmen, Zickzack-Hain)
// L46 Cliff Ascent   (Klippenkletterer: Treppen, Zickzack, Plateau)
// L47 Reef Horde     (Riff-Horde: Arenen + Wasserkanäle, Zeit-Tor, Checkpoints)
// L48 Lagoon Paradise (Flut-Finale: Chase-Flut, Aufstieg, Multi-Goal)
//
// Gravitation 1500: Aufstiege <=220px, horizontale Gaps <=280px (Solver 336px).
// waterZones liegen immer so, dass Ausgaenge auf der Zonen-Oberkante oder
// darunter liegen. Kein Math.random; Solver-unbekannte Elemente nur als Bonus.

import {
  LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat,
  createSpring, createSpike, createCheckpoint, createWaterZone, createCrumblePlat,
  staircase, plateauSection, pitWithLedges, twoTierSection, islandCluster,
  zigzagClimb, overhangSection, gapWithPlatforms, coinArc, coinDiamond, coinTrail, coinLadder,
} from './helpers';

type PlatType = Parameters<typeof createPlat>[4];

/** Plattform aus linker/rechter Kante + Oberkante (top = y - h/2). */
const seg = (l: number, r: number, top: number, h: number, type: PlatType) =>
  createPlat((l + r) / 2, top + h / 2, r - l, h, type);

const dec = (x: number, y: number, type: 'palm' | 'seagull' | 'shell' | 'sea' | 'coral') =>
  createDeco(x, y, type);

export const BEACH_ISLAND_LEVELS: LevelData[] = [
  // ==========================================================================
  // L43 "Sandy Shores" — Strandspaziergang (width 7000)
  // Duenen-Terrassen, Tidenbecken mit Schwimm-Bonus, Grube mit Boden,
  // Treppen-Plateau als Abschluss.
  // ==========================================================================
  {
    id: 43, name: 'Sandy Shores', width: 7000, height: 700, biome: 'beach-island',
    platforms: [
      seg(0, 900, 550, 40, 'sand'),
      seg(940, 1100, 510, 24, 'platform_easy'),
      seg(1140, 1500, 550, 40, 'sand'),
      // Tidenbecken (waterZone 560..720): Boden + zwei Auftauchsteine
      seg(1500, 2200, 640, 40, 'water'),
      seg(1620, 1780, 600, 24, 'stone'),
      seg(1900, 2060, 560, 24, 'stone'),
      // Hauptsteg ueber dem Becken
      seg(1500, 1740, 470, 24, 'wood'),
      seg(1780, 2020, 450, 24, 'wood'),
      seg(2060, 2200, 490, 24, 'wood'),
      seg(2240, 2900, 550, 40, 'sand'),
      ...pitWithLedges(2900, 550, 240, 160, 60, 'sand'),
      seg(3140, 3700, 550, 40, 'sand'),
      ...staircase(3700, 550, 3, 90, 180, 40, 'platform_medium'),
      seg(4440, 4900, 190, 40, 'stone'),
      seg(4940, 5300, 300, 40, 'sand'),
      seg(5340, 5900, 430, 40, 'sand'),
      seg(5940, 7000, 550, 40, 'sand'),
    ],
    movingPlatforms: [
      createMovingPlat(2450, 450, 120, 24, 'platform_easy', 'vertical', 70, 20),
      createMovingPlat(3350, 500, 120, 24, 'platform_medium', 'horizontal', 160, 20),
    ],
    coins: [
      ...coinArc(1000, 410, 5, 90, 80),
      ...coinTrail(1250, 500, 1460, 500, 4),
      ...coinLadder(1850, 520, 620, 4),
      ...coinTrail(2320, 500, 2840, 500, 5),
      ...coinDiamond(3020, 560, 100),
      ...coinTrail(3780, 400, 4240, 240, 5),
      ...coinArc(4600, 140, 5, 100, 70),
      ...coinTrail(5000, 250, 5260, 250, 3),
      ...coinTrail(6000, 490, 6700, 490, 6),
    ],
    questionBlocks: [
      createQB(500, 480, 'mushroom'),
      createQB(1200, 460, 'coin'),
      createQB(2500, 480, 'flower'),
      createQB(5500, 380, 'oneup'),
      createQB(1200, 400, 'coin'),
    ],
    enemies: [
      createEnemy(700, 530, 'crab'),
      createEnemy(1750, 620, 'squid'),
      createEnemy(2400, 530, 'crab'),
      createEnemy(4200, 260, 'spiny'),
      createEnemy(5100, 280, 'robot'),
      createEnemy(6200, 530, 'crab'),
    ],
    decorations: [
      dec(300, 510, 'palm'), dec(600, 510, 'shell'), dec(950, 470, 'seagull'),
      dec(1350, 510, 'palm'), dec(1650, 610, 'coral'),       dec(2000, 520, 'coral'),
      dec(2450, 510, 'shell'), dec(2800, 510, 'palm'), dec(3300, 510, 'seagull'),
      dec(3800, 430, 'shell'), dec(4500, 150, 'palm'), dec(5200, 260, 'coral'),
      dec(5700, 390, 'shell'), dec(6300, 510, 'palm'), dec(6800, 510, 'coral'),
    ],
    playerStart: { x: 140, y: 530 },
    goal: { x: 6650, y: 550 },
    timeBonus: 150,
    springs: [createSpring(700, 550)],
    waterZones: [createWaterZone(1500, 560, 700, 160)],
  },

  // ==========================================================================
  // L44 "Boardwalk Dash" — Steg ueber Watt (width 9000)
  // Holz-Stege ueber Wasserzone, Crumble-Sandbruecke als Abkuerzung,
  // gestaffelte Gap-Passage, Treppen-Plateau, Abstieg zum Ziel.
  // ==========================================================================
  {
    id: 44, name: 'Boardwalk Dash', width: 9000, height: 800, biome: 'beach-island',
    platforms: [
      seg(0, 800, 560, 40, 'sand'),
      seg(840, 1400, 520, 24, 'wood'),
      seg(1440, 2000, 500, 24, 'wood'),
      // Watt-Boden unter den Stegen (Schwimmzone 620..800)
      seg(800, 4800, 760, 40, 'water'),
      seg(2040, 2600, 560, 40, 'sand'),
      createCrumblePlat(2300, 430, 320, 24, 'platform_medium'),
      seg(2640, 3200, 520, 24, 'wood'),
      ...gapWithPlatforms(1, 3200, 520, 600, 3, {
        widths: [120, 160, 100],
        dy: [70, 110, 90],
        types: ['platform_easy', 'platform_medium', 'platform_hard'],
      }),
      seg(3800, 4500, 520, 24, 'wood'),
      seg(4540, 5100, 560, 40, 'sand'),
      ...staircase(5100, 560, 3, 80, 170, 40, 'platform_easy'),
      seg(5700, 6300, 240, 40, 'stone'),
      seg(6340, 6800, 340, 40, 'sand'),
      seg(6840, 7400, 440, 40, 'sand'),
      seg(7440, 8100, 520, 40, 'sand'),
    ],
    movingPlatforms: [
      createMovingPlat(3000, 450, 120, 24, 'platform_easy', 'vertical', 70, 20),
      createMovingPlat(4900, 470, 110, 24, 'platform_medium', 'circular', 90, 16),
    ],
    coins: [
      ...coinArc(400, 460, 4, 80, 70),
      ...coinTrail(900, 470, 1360, 470, 5),
      ...coinTrail(1500, 450, 1960, 450, 5),
      ...coinDiamond(2300, 360, 90),
      ...coinTrail(3300, 400, 3600, 420, 3),
      ...coinArc(4050, 400, 5, 100, 90),
      ...coinLadder(5300, 400, 300, 4),
      ...coinTrail(5850, 180, 6150, 180, 3),
      ...coinTrail(6900, 380, 7350, 380, 4),
      ...coinTrail(7500, 460, 8000, 460, 5),
    ],
    questionBlocks: [
      createQB(300, 500, 'mushroom'),
      createQB(1500, 440, 'coin'),
      createQB(4700, 480, 'flower'),
      createQB(6000, 180, 'star'),
      createQB(2800, 480, 'coin'),
    ],
    enemies: [
      createEnemy(500, 540, 'crab'),
      createEnemy(1500, 700, 'squid'),
      createEnemy(2300, 540, 'crab'),
      createEnemy(4200, 500, 'spiny'),
      createEnemy(5900, 220, 'robot'),
      createEnemy(7000, 420, 'crab'),
      createEnemy(3200, 700, 'squid'),
    ],
    decorations: [
      dec(250, 520, 'palm'), dec(700, 520, 'seagull'), dec(1100, 480, 'shell'),
      dec(1900, 460, 'coral'), dec(2300, 520, 'coral'), dec(2700, 520, 'palm'),
      dec(3600, 480, 'seagull'), dec(4200, 480, 'shell'), dec(4750, 520, 'palm'),
      dec(5250, 520, 'coral'), dec(5800, 200, 'coral'), dec(6400, 300, 'seagull'),
      dec(6900, 400, 'shell'), dec(7500, 480, 'palm'), dec(8000, 480, 'coral'),
    ],
    playerStart: { x: 140, y: 540 },
    goal: { x: 7800, y: 520 },
    timeBonus: 170,
    springs: [createSpring(400, 560), createSpring(3900, 520)],
    spikes: [createSpike(1200, 512), createSpike(6600, 332)],
    waterZones: [createWaterZone(800, 620, 4000, 180)],
  },

  // ==========================================================================
  // L45 "Palm Grove" — Inselhuepfen + Lagune (width 7600)
  // islandCluster-Kette, zwei Ebenen (oben riskant, unten sicher), Lagune
  // mit Schwimmroute, Zickzack-Aufstieg in den Hain, Abstieg zum Ziel.
  // ==========================================================================
  {
    id: 45, name: 'Palm Grove', width: 7600, height: 900, biome: 'beach-island',
    platforms: [
      seg(0, 700, 600, 40, 'sand'),
      ...islandCluster(740, 600, [
        { dx: 0, dy: 60, w: 160 },
        { dx: 220, dy: 140, w: 120 },
        { dx: 420, dy: 80, w: 180 },
        { dx: 660, dy: 180, w: 140 },
      ]),
      ...twoTierSection(1700, 480, 800, 'sand', 'platform_medium'),
      // Lagune (waterZone 520..720) mit Schwimmroute
      seg(2540, 3440, 680, 40, 'water'),
      seg(2700, 2860, 640, 24, 'stone'),
      seg(3000, 3160, 600, 24, 'stone'),
      seg(3180, 3300, 520, 24, 'stone'),
      // Hauptsteg ueber der Lagune
      seg(2540, 2900, 440, 24, 'wood'),
      seg(2940, 3300, 480, 24, 'wood'),
      seg(3340, 3900, 520, 40, 'sand'),
      ...zigzagClimb(4000, 520, 4, 80, 110, 130, 'platform_medium'),
      seg(3550, 4300, 120, 40, 'stone'),
      seg(4340, 4900, 220, 40, 'sand'),
      seg(4940, 5600, 340, 40, 'sand'),
      seg(5640, 6400, 460, 40, 'sand'),
      seg(6440, 7500, 560, 40, 'sand'),
    ],
    movingPlatforms: [
      createMovingPlat(2000, 320, 110, 24, 'platform_easy', 'circular', 100, 16),
      createMovingPlat(4700, 400, 120, 24, 'platform_medium', 'vertical', 90, 20),
    ],
    coins: [
      ...coinTrail(300, 540, 620, 540, 4),
      ...coinArc(1000, 380, 5, 90, 80),
      ...coinDiamond(1250, 440, 90),
      ...coinTrail(1500, 360, 1620, 360, 3),
      ...coinLadder(3100, 560, 460, 5),
      ...coinTrail(3400, 460, 3820, 460, 5),
      ...coinLadder(4000, 380, 180, 5),
      ...coinArc(3050, 100, 5, 100, 80),
      ...coinTrail(4400, 160, 4840, 160, 4),
      ...coinTrail(5000, 280, 5540, 280, 5),
      ...coinTrail(5700, 400, 6340, 400, 5),
      ...coinTrail(6500, 500, 7400, 500, 6),
    ],
    questionBlocks: [
      createQB(500, 540, 'mushroom'),
      createQB(1800, 360, 'flower'),
      createQB(2500, 380, 'coin'),
      createQB(5000, 280, 'oneup'),
      createQB(7000, 480, 'star'),
    ],
    enemies: [
      createEnemy(600, 580, 'crab'),
      createEnemy(1200, 500, 'spiny'),
      createEnemy(2900, 700, 'squid'),
      createEnemy(3800, 500, 'robot'),
      createEnemy(5200, 320, 'crab'),
      createEnemy(6800, 540, 'spiny'),
      createEnemy(3100, 640, 'squid'),
    ],
    decorations: [
      dec(300, 560, 'palm'), dec(800, 500, 'seagull'), dec(1150, 460, 'palm'),
      dec(1450, 400, 'shell'), dec(1900, 400, 'coral'), dec(2600, 640, 'coral'),
      dec(3050, 560, 'coral'), dec(3450, 480, 'palm'), dec(3900, 260, 'seagull'),
      dec(4200, 160, 'palm'), dec(4600, 160, 'shell'), dec(5100, 280, 'coral'),
      dec(5800, 400, 'coral'), dec(6600, 500, 'palm'), dec(7200, 500, 'seagull'),
    ],
    playerStart: { x: 140, y: 584 },
    goal: { x: 7000, y: 560 },
    timeBonus: 180,
    springs: [createSpring(300, 600), createSpring(6500, 560)],
    spikes: [createSpike(3700, 512), createSpike(6000, 452)],
    waterZones: [createWaterZone(2540, 520, 900, 200)],
  },

  // ==========================================================================
  // L46 "Cliff Ascent" — Klippenkletterer (width 10600)
  // Treppen, Plateau, Zickzack-Steilwand, Gipfel, Abstieg und erneuter
  // Aufstieg zur Schlussklippe. Wasserzone als Bonusbecken am Fuss.
  // ==========================================================================
  {
    id: 46, name: 'Cliff Ascent', width: 10600, height: 1000, biome: 'beach-island',
    platforms: [
      seg(0, 900, 700, 40, 'sand'),
      ...staircase(900, 700, 4, 85, 170, 40, 'platform_medium'),
      seg(1720, 2300, 300, 40, 'stone'),
      ...overhangSection(2340, 300, 700, 2500, 160, 'stone'),
      ...zigzagClimb(3100, 300, 4, 70, 110, 130, 'platform_hard'),
      seg(2650, 3550, 20, 40, 'stone'),
      seg(3600, 4200, 160, 40, 'sand'),
      seg(4250, 5000, 300, 40, 'sand'),
      seg(5050, 5800, 440, 40, 'sand'),
      // Bonus-Badebucht (waterZone 560..760) unter dem Steg
      seg(5850, 6550, 740, 40, 'water'),
      seg(6000, 6160, 700, 24, 'stone'),
      seg(6300, 6460, 660, 24, 'stone'),
      seg(6500, 6640, 560, 24, 'stone'),
      seg(5850, 6250, 440, 24, 'wood'),
      seg(6290, 6700, 480, 24, 'wood'),
      seg(6740, 7400, 520, 40, 'sand'),
      seg(7440, 8200, 560, 40, 'sand'),
      seg(8240, 9000, 600, 40, 'sand'),
      ...staircase(9000, 600, 3, 90, 170, 40, 'platform_medium'),
      seg(9600, 10400, 240, 40, 'stone'),
    ],
    movingPlatforms: [
      createMovingPlat(1600, 380, 120, 24, 'platform_easy', 'vertical', 80, 20),
      createMovingPlat(5150, 380, 110, 24, 'platform_medium', 'circular', 100, 16),
    ],
    coins: [
      ...coinTrail(250, 640, 820, 640, 5),
      ...coinArc(1000, 520, 5, 90, 80),
      ...coinTrail(1800, 240, 2240, 240, 4),
      ...coinLadder(3100, 220, 60, 5),
      ...coinArc(3100, 0, 5, 110, 80),
      ...coinTrail(3700, 100, 4140, 100, 4),
      ...coinTrail(4350, 240, 4940, 240, 4),
      ...coinDiamond(5400, 380, 100),
      ...coinLadder(6100, 640, 480, 4),
      ...coinTrail(6800, 460, 7340, 460, 4),
      ...coinTrail(7500, 500, 8140, 500, 5),
      ...coinTrail(8300, 540, 8940, 540, 5),
      ...coinArc(9100, 440, 5, 90, 70),
      ...coinTrail(9700, 180, 10300, 180, 5),
    ],
    questionBlocks: [
      createQB(500, 640, 'mushroom'),
      createQB(1900, 220, 'coin'),
      createQB(3700, 100, 'flower'),
      createQB(4300, 240, 'star'),
      createQB(6900, 460, 'oneup'),
    ],
    enemies: [
      createEnemy(600, 680, 'crab'),
      createEnemy(1200, 510, 'spiny'),
      createEnemy(2000, 280, 'robot'),
      createEnemy(2400, 280, 'crab'),
      createEnemy(3800, 140, 'spiny'),
      createEnemy(4400, 280, 'robot'),
      createEnemy(5200, 420, 'crab'),
      createEnemy(6900, 500, 'spiny'),
      createEnemy(7600, 540, 'robot'),
      createEnemy(8400, 580, 'crab'),
      createEnemy(9800, 220, 'spiny'),
    ],
    decorations: [
      dec(300, 660, 'palm'), dec(700, 660, 'shell'), dec(1300, 500, 'seagull'),
      dec(1800, 260, 'palm'), dec(2400, 260, 'coral'), dec(2900, 80, 'seagull'),
      dec(3400, 140, 'shell'), dec(4000, 120, 'palm'), dec(4600, 260, 'coral'),
      dec(5200, 400, 'palm'), dec(6100, 700, 'coral'), dec(6800, 480, 'shell'),
      dec(7500, 520, 'seagull'), dec(8300, 560, 'palm'), dec(9700, 200, 'shell'),
    ],
    playerStart: { x: 140, y: 684 },
    goal: { x: 10100, y: 240 },
    timeBonus: 200,
    springs: [createSpring(400, 700), createSpring(6800, 520)],
    spikes: [createSpike(1800, 292), createSpike(5300, 432), createSpike(7600, 552)],
    waterZones: [createWaterZone(5850, 560, 700, 200)],
  },

  // ==========================================================================
  // L47 "Reef Horde" — Riff-Horde (width 16000)
  // Breite Arenen mit zwei Wasserkanälen, Wächter, Zeit-Tor (45s),
  // Checkpoints, coinGoal, Treppen-Plateau und Final-Arena.
  // ==========================================================================
  {
    id: 47, name: 'Reef Horde', width: 16000, height: 800, biome: 'beach-island',
    platforms: [
      seg(0, 1400, 650, 40, 'sand'),
      // Kanal 1 (waterZone 600..800)
      seg(1400, 3000, 760, 40, 'water'),
      seg(1600, 1760, 700, 24, 'stone'),
      seg(2100, 2260, 660, 24, 'stone'),
      seg(2600, 2760, 620, 24, 'stone'),
      seg(3040, 4400, 650, 40, 'sand'),
      // Kanal 2 (waterZone 560..800), Ausgang = Arena 3 auf 560
      seg(4400, 5600, 720, 40, 'water'),
      seg(4600, 4760, 680, 24, 'stone'),
      seg(5100, 5260, 640, 24, 'stone'),
      seg(5640, 7200, 560, 40, 'sand'),
      seg(7240, 9200, 600, 40, 'sand'),
      ...staircase(9200, 600, 3, 80, 170, 40, 'platform_easy'),
      seg(9800, 10800, 280, 40, 'stone'),
      seg(10840, 11600, 400, 40, 'sand'),
      seg(11640, 12400, 520, 40, 'sand'),
      seg(12440, 13800, 620, 40, 'sand'),
      seg(13840, 16000, 700, 40, 'sand'),
    ],
    movingPlatforms: [
      createMovingPlat(3400, 560, 130, 24, 'platform_medium', 'vertical', 80, 20),
      createMovingPlat(8600, 520, 120, 24, 'platform_easy', 'circular', 110, 16),
    ],
    coins: [
      ...coinTrail(300, 590, 1340, 590, 7),
      ...coinLadder(1680, 640, 520, 4),
      ...coinTrail(2200, 600, 2680, 580, 3),
      ...coinTrail(3200, 590, 4340, 590, 6),
      ...coinDiamond(5000, 600, 100),
      ...coinTrail(5800, 500, 7140, 500, 7),
      ...coinTrail(7400, 540, 9140, 540, 7),
      ...coinArc(9300, 480, 5, 90, 70),
      ...coinTrail(9900, 220, 10740, 220, 5),
      ...coinTrail(10900, 340, 11540, 340, 4),
      ...coinTrail(11700, 460, 12340, 460, 4),
      ...coinTrail(12500, 560, 13740, 560, 7),
      ...coinTrail(13900, 640, 15900, 640, 10),
    ],
    questionBlocks: [
      createQB(500, 580, 'mushroom'),
      createQB(3300, 580, 'flower'),
      createQB(6600, 500, 'oneup'),
      createQB(8600, 540, 'star'),
      createQB(12800, 560, 'coin'),
    ],
    enemies: [
      createEnemy(1000, 630, 'crab'),
      createEnemy(1700, 680, 'squid'),
      createEnemy(2200, 640, 'squid'),
      createEnemy(2700, 600, 'squid'),
      createEnemy(3200, 630, 'spiny'),
      createEnemy(3600, 630, 'robot'),
      createEnemy(4000, 630, 'crab'),
      createEnemy(4700, 660, 'squid'),
      createEnemy(5200, 620, 'squid'),
      createEnemy(5800, 540, 'spiny'),
      createEnemy(6200, 540, 'crab'),
      createEnemy(6600, 540, 'robot'),
      createEnemy(7400, 580, 'koopa'),
      createEnemy(7800, 580, 'spiny'),
      createEnemy(8200, 580, 'crab'),
      createEnemy(10000, 260, 'spiny'),
      createEnemy(10500, 260, 'robot'),
      createEnemy(11000, 380, 'crab'),
      createEnemy(11900, 500, 'spiny'),
      createEnemy(12700, 600, 'robot'),
      createEnemy(13200, 600, 'crab'),
      createEnemy(14200, 680, 'spiny'),
      createEnemy(15000, 680, 'koopa'),
    ],
    decorations: [
      dec(300, 610, 'palm'), dec(900, 610, 'shell'), dec(1300, 610, 'seagull'),
      dec(1800, 680, 'coral'), dec(2400, 640, 'coral'), dec(3000, 600, 'coral'),
      dec(3500, 610, 'seagull'), dec(4200, 610, 'palm'), dec(4900, 680, 'coral'),
      dec(5500, 620, 'coral'), dec(6000, 520, 'shell'), dec(6800, 520, 'palm'),
      dec(7600, 560, 'seagull'), dec(8600, 560, 'coral'), dec(10100, 240, 'shell'),
      dec(11200, 360, 'palm'), dec(12000, 480, 'seagull'), dec(12900, 580, 'coral'),
      dec(14000, 660, 'palm'), dec(15200, 660, 'shell'),
    ],
    playerStart: { x: 140, y: 634 },
    goal: { x: 15300, y: 700 },
    timeBonus: 220,
    coinGoal: 35,
    timeGate: 45,
    springs: [createSpring(600, 650), createSpring(5800, 560)],
    spikes: [createSpike(3600, 642), createSpike(9000, 592), createSpike(12500, 612)],
    waterZones: [
      createWaterZone(1400, 600, 1600, 200),
      createWaterZone(4400, 560, 1200, 240),
    ],
    checkpoints: [
      createCheckpoint(3300, 610),
      createCheckpoint(6700, 520),
      createCheckpoint(10800, 240),
    ],
  },

  // ==========================================================================
  // L48 "Lagoon Paradise" — Flut-Finale (width 18000)
  // Steigende Flut (Engine-ID 48) verfolgt den Spieler; Aufstieg ueber
  // Terrassen, Wasserzonen-Tal, Gipfelkette. Multi-Goal + Checkpoints.
  // ==========================================================================
  {
    id: 48, name: 'Lagoon Paradise', width: 18000, height: 900, biome: 'beach-island',
    platforms: [
      seg(0, 1200, 720, 40, 'sand'),
      // Flutbecken am Start (waterZone 760..900)
      seg(0, 2200, 860, 40, 'water'),
      ...staircase(1240, 720, 3, 85, 170, 40, 'platform_medium'),
      seg(1860, 2700, 380, 40, 'stone'),
      createCrumblePlat(2760, 420, 240, 24, 'platform_medium'),
      seg(2740, 3600, 480, 40, 'sand'),
      seg(3640, 4500, 400, 40, 'sand'),
      seg(4540, 5400, 320, 40, 'sand'),
      seg(5440, 6300, 240, 40, 'sand'),
      seg(6340, 7400, 160, 40, 'stone'),
      // Wasser-Tal (waterZone 520..820), Ausgang auf 560
      seg(7440, 8840, 780, 40, 'water'),
      seg(7600, 7760, 720, 24, 'stone'),
      seg(8100, 8260, 680, 24, 'stone'),
      seg(8600, 8760, 640, 24, 'stone'),
      seg(8880, 9600, 560, 40, 'sand'),
      seg(9640, 10400, 520, 40, 'sand'),
      seg(10440, 11200, 440, 40, 'sand'),
      seg(11240, 12000, 360, 40, 'sand'),
      seg(12040, 12800, 280, 40, 'sand'),
      seg(12840, 13800, 200, 40, 'stone'),
      seg(13840, 15200, 120, 40, 'sand'),
    ],
    movingPlatforms: [
      createMovingPlat(2900, 320, 120, 24, 'platform_easy', 'vertical', 80, 20),
      createMovingPlat(9800, 440, 110, 24, 'platform_medium', 'circular', 100, 16),
      createMovingPlat(13400, 120, 130, 24, 'platform_easy', 'horizontal', 160, 18),
    ],
    coins: [
      ...coinTrail(250, 660, 1140, 660, 6),
      ...coinLadder(1700, 680, 500, 5),
      ...coinTrail(2000, 320, 2640, 320, 5),
      ...coinDiamond(2900, 280, 100),
      ...coinTrail(2840, 420, 3540, 420, 5),
      ...coinTrail(3700, 340, 4440, 340, 5),
      ...coinTrail(4600, 260, 5340, 260, 5),
      ...coinTrail(5500, 180, 6240, 180, 5),
      ...coinTrail(6400, 100, 7340, 100, 6),
      ...coinLadder(8150, 620, 460, 4),
      ...coinArc(9200, 480, 5, 100, 80),
      ...coinTrail(9700, 460, 10340, 460, 5),
      ...coinTrail(10500, 380, 11140, 380, 5),
      ...coinTrail(11300, 300, 11940, 300, 5),
      ...coinTrail(12100, 220, 12740, 220, 5),
      ...coinArc(13000, 140, 5, 100, 70),
      ...coinTrail(14000, 60, 15100, 60, 8),
    ],
    questionBlocks: [
      createQB(500, 660, 'mushroom'),
      createQB(2100, 320, 'coin'),
      createQB(6700, 100, 'flower'),
      createQB(9100, 480, 'oneup'),
      createQB(12500, 220, 'star'),
    ],
    enemies: [
      createEnemy(800, 700, 'crab'),
      createEnemy(1500, 700, 'squid'),
      createEnemy(2200, 340, 'spiny'),
      createEnemy(3100, 440, 'crab'),
      createEnemy(3900, 360, 'robot'),
      createEnemy(4800, 280, 'spiny'),
      createEnemy(5700, 200, 'crab'),
      createEnemy(6800, 120, 'robot'),
      createEnemy(7700, 700, 'squid'),
      createEnemy(8300, 660, 'squid'),
      createEnemy(9100, 540, 'crab'),
      createEnemy(10000, 480, 'spiny'),
      createEnemy(10700, 400, 'robot'),
      createEnemy(11500, 320, 'crab'),
      createEnemy(12300, 240, 'spiny'),
      createEnemy(13200, 160, 'robot'),
      createEnemy(14300, 80, 'spiny'),
      createEnemy(14900, 80, 'koopa'),
    ],
    decorations: [
      dec(300, 680, 'palm'), dec(900, 680, 'seagull'), dec(1400, 680, 'coral'),
      dec(2000, 340, 'shell'), dec(2400, 340, 'palm'), dec(3000, 400, 'coral'),
      dec(3500, 440, 'seagull'), dec(4000, 360, 'palm'), dec(4700, 280, 'shell'),
      dec(5200, 280, 'coral'), dec(5800, 200, 'palm'), dec(6500, 120, 'coral'),
      dec(7000, 120, 'seagull'), dec(7600, 700, 'coral'), dec(8400, 640, 'coral'),
      dec(9200, 520, 'palm'), dec(9900, 480, 'shell'), dec(10600, 400, 'seagull'),
      dec(11400, 320, 'palm'), dec(12200, 240, 'coral'), dec(13100, 160, 'shell'),
      dec(14100, 80, 'palm'), dec(15000, 80, 'seagull'),
    ],
    playerStart: { x: 140, y: 704 },
    goal: { x: 14800, y: 120 },
    timeBonus: 240,
    goals: [
      { x: 2200, y: 380, points: 2500, difficulty: 'hard' },
      { x: 6800, y: 160, points: 3000, difficulty: 'hard' },
    ],
    springs: [createSpring(400, 720), createSpring(5700, 240)],
    spikes: [createSpike(3900, 392), createSpike(11500, 352)],
    waterZones: [
      createWaterZone(0, 760, 2200, 140),
      createWaterZone(7440, 520, 1400, 300),
    ],
    checkpoints: [
      createCheckpoint(1300, 595),
      createCheckpoint(2200, 340),
      createCheckpoint(6800, 120),
      createCheckpoint(9100, 520),
      createCheckpoint(14000, 80),
    ],
  },
];

// Haunted Mansion (ids 61-66) — Phase 9 rebuild
// Archetypes: 61 Eingangshalle, 62 Spiegelsäle, 63 Geistertreppen,
// 64 Verlies, 65 Banshee-Horde, 66 Krypta-Finale (Engine-Fallhazards, ID 66).
// Haunted gravity is 2000: safe rises <=160px, safe same-height gaps <=210px.
// All levels are authored solvable (ensureSolvable adds nothing).

import {
  LevelData, createPlat, createQB, createEnemy, createDeco,
  createMovingPlat, createSpring, createSpike, createCrumblePlat,
  createCheckpoint, createKey, createDoor,
  staircase, plateauSection, pitWithLedges, twoTierSection, islandCluster,
  zigzagClimb, overhangSection, coinArc, coinDiamond, coinTrail, coinLadder,
} from './helpers';
import type { PlatformType } from './index';

// Left-edge based helpers: `ground` = solid hall floor, `ledge` = 24px walkway.
const ground = (left: number, w: number, top: number, type: PlatformType, h = 40) =>
  createPlat(left + w / 2, top + h / 2, w, h, type);
const ledge = (left: number, w: number, top: number, type: PlatformType = 'platform_medium') =>
  createPlat(left + w / 2, top + 12, w, 24, type);

export const HAUNTED_MANSION_LEVELS: LevelData[] = [
  // ============================================================
  // Level 61 (Eingangshalle): grosse Halle mit Empore und
  // Spiegel-Sälen. Geheimkammer über brick_secret-Stufen im
  // Treppenhaus, Feder zum Münz-Balkon, vertikaler Aufzug,
  // Grube mit Rändern. 2 Spikes, 2 Federn, 1-UP im Geheimraum.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(ground(0, 1000, 720, 'castle'));
    // Geheimkammer (brick_secret) über dem Treppenhaus
    platforms.push(createPlat(1100, 632, 160, 24, 'platform_medium'));
    platforms.push(createPlat(1300, 512, 140, 24, 'platform_medium'));
    platforms.push(createPlat(1520, 392, 180, 24, 'brick_secret'));
    platforms.push(ground(1140, 620, 720, 'castle'));
    platforms.push(...staircase(1760, 720, 3, 70, 140, 40, 'castle'));
    platforms.push(ground(2300, 500, 480, 'castle'));
    platforms.push(ground(2875, 450, 460, 'castle'));
    platforms.push(createPlat(3400, 420, 200, 24, 'platform_hard'));
    platforms.push(ground(3450, 700, 720, 'castle'));
    platforms.push(...pitWithLedges(4150, 720, 440, 140, 'stone'));
    platforms.push(ground(4560, 680, 720, 'castle'));
    platforms.push(...overhangSection(5240, 720, 900, 5740, 180, 'castle'));
    platforms.push(ground(6300, 800, 720, 'castle'));
    platforms.push(ground(7200, 500, 640, 'castle'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 640, 900, 640, 5));
    coins.push(...coinTrail(1200, 640, 1700, 640, 3));
    coins.push(...coinDiamond(1520, 320, 60));
    coins.push(...coinArc(2280, 420, 5, 70, 80));
    coins.push(...coinTrail(2450, 400, 2700, 400, 3));
    coins.push(...coinDiamond(3700, 380, 60));
    coins.push(...coinLadder(3700, 620, 480, 5));
    coins.push(...coinArc(4150, 780, 5, 80, 80));
    coins.push(...coinTrail(4700, 640, 5100, 640, 3));
    coins.push(...coinTrail(6400, 640, 7000, 640, 4));
    coins.push(...coinArc(7000, 560, 5, 70, 80));

    return {
      id: 61, name: 'Eingangshalle', width: 7600, height: 950, biome: 'haunted-mansion',
      platforms,
      movingPlatforms: [
        createMovingPlat(3700, 560, 110, 24, 'platform_easy', 'vertical', 90, 18),
      ],
      coins,
      questionBlocks: [
        createQB(400, 600, 'mushroom'),
        createQB(800, 600, 'coin'),
        createQB(1520, 300, 'oneup'),
        createQB(3350, 600, 'flower'),
        createQB(5000, 600, 'star'),
      ],
      enemies: [
        createEnemy(1600, 600, 'ghost'),
        createEnemy(2700, 420, 'boo'),
        createEnemy(3800, 680, 'goomba'),
        createEnemy(4900, 640, 'ghost'),
        createEnemy(5400, 680, 'robot'),
        createEnemy(5700, 620, 'ghost'),
        createEnemy(6700, 680, 'koopa'),
        createEnemy(7350, 580, 'boo'),
      ],
      decorations: [
        createDeco(200, 670, 'torch'),
        createDeco(500, 420, 'cobweb'),
        createDeco(1200, 668, 'pillar'),
        createDeco(2400, 438, 'skull'),
        createDeco(3100, 418, 'statue'),
        createDeco(4300, 560, 'ghost_decor'),
        createDeco(5400, 680, 'torch'),
        createDeco(6600, 678, 'tombstone'),
        createDeco(6900, 420, 'cobweb'),
        createDeco(7500, 600, 'skull'),
        createDeco(2650, 380, 'bat'),
        createDeco(350, 700, 'web'),
      ],
      playerStart: { x: 180, y: 696 },
      goal: { x: 7500, y: 632 },
      timeBonus: 130,
      springs: [createSpring(350, 720), createSpring(3600, 720)],
      spikes: [createSpike(1650, 712), createSpike(6950, 712)],
    };
  })(),

  // ============================================================
  // Level 62 (Spiegelsäle): gespiegelte Zwei-Ebenen-Säle mit
  // Doppel-Empore, Zickzack-Kletterer, versteckter Spiegelwand
  // (hidden) + brick_multi, Schlüssel auf dem Hochbalkon und
  // Tür zur Schatzkammer (nie Pflichtweg). Vertikal-Aufzug,
  // Kreis-Plattform, 2 Checkpoints. 2 Spikes, 2 Federn.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(ground(0, 800, 760, 'castle'));
    platforms.push(...twoTierSection(880, 760, 1200, 'castle', 'wood'));
    platforms.push(...twoTierSection(2080, 760, 1200, 'castle', 'wood'));
    platforms.push(ground(3400, 600, 640, 'castle'));
    platforms.push(...zigzagClimb(4150, 760, 4, 90, 110, 130, 'platform_medium'));
    platforms.push(ground(4100, 600, 360, 'castle'));
    platforms.push(ledge(4800, 200, 340, 'wood'));
    platforms.push(ground(5170, 730, 640, 'castle'));
    platforms.push(ledge(5400, 220, 400, 'platform_hard'));
    platforms.push(...overhangSection(6000, 640, 1000, 6500, 200, 'castle'));
    platforms.push(ground(7100, 700, 640, 'castle'));
    platforms.push(ledge(7200, 160, 560, 'wood'));
    platforms.push(createPlat(7450, 460, 140, 24, 'hidden'));
    platforms.push(createPlat(7650, 500, 120, 24, 'brick_multi'));
    platforms.push(ground(7900, 600, 640, 'castle'));
    platforms.push(ground(8650, 500, 560, 'wood'));
    platforms.push(ground(9300, 900, 560, 'castle'));
    platforms.push(ground(8650, 1550, 880, 'stone'));
    platforms.push(...staircase(10150, 880, 4, 80, 120, 40, 'stone'));
    platforms.push(ground(10800, 900, 560, 'castle'));
    platforms.push(ground(11750, 550, 700, 'stone'));
    platforms.push(ground(11850, 700, 560, 'castle'));
    platforms.push(ground(12650, 600, 480, 'castle'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(100, 680, 700, 680, 4));
    coins.push(...coinArc(1500, 520, 5, 70, 80));
    coins.push(...coinTrail(2200, 540, 3000, 540, 4));
    coins.push(...coinDiamond(4600, 300, 70));
    coins.push(...coinTrail(5300, 560, 5800, 560, 3));
    coins.push(...coinTrail(6100, 560, 6400, 560, 2));
    coins.push(...coinLadder(7450, 560, 500, 4));
    coins.push(...coinTrail(9200, 480, 10100, 480, 4));
    coins.push(...coinDiamond(8750, 820, 60));
    coins.push(...coinTrail(10900, 480, 11600, 480, 4));
    coins.push(...coinDiamond(12250, 640, 50));
    coins.push(...coinArc(12600, 400, 5, 70, 80));

    return {
      id: 62, name: 'Spiegelsäle', width: 15200, height: 1000, biome: 'haunted-mansion',
      platforms,
      movingPlatforms: [
        createMovingPlat(5500, 560, 110, 24, 'platform_easy', 'vertical', 80, 18),
        createMovingPlat(9600, 760, 110, 24, 'platform_medium', 'circular', 90, 18),
      ],
      coins,
      questionBlocks: [
        createQB(600, 680, 'mushroom'),
        createQB(1600, 540, 'coin'),
        createQB(3600, 560, 'flower'),
        createQB(6000, 560, 'star'),
        createQB(9800, 480, 'oneup'),
      ],
      enemies: [
        createEnemy(1000, 720, 'goomba'),
        createEnemy(1300, 540, 'boo'),
        createEnemy(1650, 540, 'ghost'),
        createEnemy(2200, 720, 'koopa'),
        createEnemy(2600, 520, 'boo'),
        createEnemy(3100, 540, 'ghost'),
        createEnemy(3700, 600, 'robot'),
        createEnemy(4400, 300, 'ghost'),
        createEnemy(5300, 560, 'boo'),
        createEnemy(6300, 560, 'ghost'),
        createEnemy(6800, 560, 'ghost'),
        createEnemy(7600, 560, 'boo'),
        createEnemy(8000, 560, 'ghost'),
        createEnemy(9100, 520, 'goomba'),
        createEnemy(9600, 480, 'boo'),
        createEnemy(9900, 520, 'crab'),
        createEnemy(11000, 480, 'ghost'),
        createEnemy(11400, 480, 'boo'),
        createEnemy(12600, 400, 'ghost'),
      ],
      decorations: [
        createDeco(200, 710, 'torch'),
        createDeco(700, 440, 'cobweb'),
        createDeco(1500, 660, 'pillar'),
        createDeco(2500, 660, 'statue'),
        createDeco(3500, 590, 'skull'),
        createDeco(4300, 560, 'ghost_decor'),
        createDeco(5200, 540, 'web'),
        createDeco(6100, 590, 'torch'),
        createDeco(7000, 590, 'skull'),
        createDeco(7500, 400, 'cobweb'),
        createDeco(8700, 830, 'tombstone'),
        createDeco(9400, 510, 'statue'),
        createDeco(10500, 420, 'bat'),
        createDeco(12800, 430, 'pillar'),
      ],
      playerStart: { x: 120, y: 736 },
      goal: { x: 13000, y: 472 },
      timeBonus: 190,
      checkpoints: [
        createCheckpoint(3400, 616),
        createCheckpoint(8900, 536),
      ],
      springs: [createSpring(300, 760), createSpring(8300, 640)],
      spikes: [createSpike(400, 752), createSpike(11100, 552)],
      keys: [createKey(4500, 330)],
      doors: [createDoor(12100, 620, 80, 160)],
    };
  })(),

  // ============================================================
  // Level 63 (Geistertreppen): zwei Zickzack-Treppentürme,
  // schwebende Galerie, vertikaler Aufzug zum Münz-Loft,
  // morsche Bröckel-Dielen über der Grube mit sicherer
  // Bodenroute, 3 Checkpoints. Kreis-Plattform, 2 Spikes.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(ground(0, 900, 800, 'castle'));
    platforms.push(...staircase(900, 800, 4, 70, 130, 40, 'castle'));
    platforms.push(ground(1580, 500, 520, 'castle'));
    platforms.push(...zigzagClimb(2200, 520, 3, 90, 110, 130, 'platform_medium'));
    platforms.push(ground(2450, 600, 220, 'castle'));
    platforms.push(...overhangSection(3250, 800, 1000, 3750, 200, 'castle'));
    platforms.push(ground(4450, 700, 800, 'castle'));
    platforms.push(ledge(4650, 300, 480, 'platform_hard'));
    platforms.push(ground(5300, 800, 800, 'castle'));
    platforms.push(...zigzagClimb(6200, 800, 4, 90, 110, 130, 'platform_medium'));
    platforms.push(ground(6200, 800, 400, 'castle'));
    platforms.push(...overhangSection(7150, 760, 900, 7600, 180, 'castle'));
    platforms.push(ground(8200, 800, 760, 'castle'));
    platforms.push(createCrumblePlat(9250, 772, 140, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(9420, 772, 140, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(9590, 772, 140, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(9760, 772, 140, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(9930, 772, 140, 24, 'platform_medium'));
    platforms.push(ground(9100, 1000, 920, 'stone'));
    platforms.push(ground(10050, 750, 760, 'castle'));
    platforms.push(...staircase(10800, 760, 3, 70, 140, 40, 'castle'));
    platforms.push(ground(11350, 700, 550, 'castle'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 720, 800, 720, 4));
    coins.push(...coinArc(950, 660, 5, 70, 80));
    coins.push(...coinTrail(1650, 440, 2000, 440, 3));
    coins.push(...coinLadder(2330, 460, 300, 4));
    coins.push(...coinArc(3250, 720, 5, 70, 80));
    coins.push(...coinLadder(4800, 720, 500, 5));
    coins.push(...coinTrail(5400, 720, 6000, 720, 4));
    coins.push(...coinDiamond(6350, 540, 70));
    coins.push(...coinTrail(8300, 680, 8900, 680, 4));
    coins.push(...coinArc(9450, 700, 5, 70, 80));
    coins.push(...coinTrail(10100, 680, 10700, 680, 4));
    coins.push(...coinTrail(11400, 470, 11950, 470, 4));

    return {
      id: 63, name: 'Geistertreppen', width: 17200, height: 1100, biome: 'haunted-mansion',
      platforms,
      movingPlatforms: [
        createMovingPlat(4600, 660, 110, 24, 'platform_easy', 'vertical', 80, 18),
        createMovingPlat(5750, 640, 110, 24, 'platform_medium', 'circular', 90, 18),
      ],
      coins,
      questionBlocks: [
        createQB(300, 700, 'mushroom'),
        createQB(1400, 680, 'coin'),
        createQB(3600, 700, 'flower'),
        createQB(5500, 700, 'star'),
        createQB(11500, 470, 'oneup'),
      ],
      enemies: [
        createEnemy(700, 420, 'thwomp'),
        createEnemy(1800, 460, 'ghost'),
        createEnemy(2500, 180, 'boo'),
        createEnemy(3500, 700, 'ghost'),
        createEnemy(4300, 700, 'boo'),
        createEnemy(5700, 700, 'ghost'),
        createEnemy(6600, 200, 'thwomp'),
        createEnemy(6500, 340, 'boo'),
        createEnemy(7500, 660, 'ghost'),
        createEnemy(8600, 660, 'boo'),
        createEnemy(5800, 760, 'robot'),
        createEnemy(8600, 720, 'goomba'),
        createEnemy(9500, 860, 'ghost'),
        createEnemy(10500, 660, 'boo'),
        createEnemy(10500, 720, 'spiny'),
      ],
      decorations: [
        createDeco(250, 750, 'torch'),
        createDeco(1200, 420, 'cobweb'),
        createDeco(1700, 470, 'pillar'),
        createDeco(2600, 170, 'statue'),
        createDeco(4200, 750, 'tombstone'),
        createDeco(4900, 420, 'skull'),
        createDeco(5600, 750, 'ghost_decor'),
        createDeco(6600, 340, 'cobweb'),
        createDeco(7300, 710, 'torch'),
        createDeco(8500, 710, 'web'),
        createDeco(10400, 710, 'skull'),
        createDeco(11700, 500, 'pillar'),
        createDeco(3000, 180, 'bat'),
      ],
      playerStart: { x: 100, y: 776 },
      goal: { x: 11600, y: 542 },
      timeBonus: 230,
      checkpoints: [
        createCheckpoint(2000, 496),
        createCheckpoint(6700, 376),
        createCheckpoint(10300, 736),
      ],
      springs: [createSpring(4800, 800), createSpring(10400, 760)],
      spikes: [createSpike(500, 792), createSpike(5800, 792)],
    };
  })(),

  // ============================================================
  // Level 64 (Verlies): Gruben mit Rändern, Zwei-Ebenen-Kerker,
  // Überhang-Korridore, Schatzkammer hinter Schlüssel + Tür
  // (nie Pflichtweg), Vertikal-Aufzug zum Münz-Balkon. 2 Spikes,
  // 2 Federn, 3 Checkpoints.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(ground(0, 900, 780, 'stone'));
    platforms.push(...pitWithLedges(950, 780, 420, 140, 'stone'));
    platforms.push(ground(1200, 700, 780, 'stone'));
    platforms.push(...staircase(1900, 780, 3, 70, 130, 40, 'stone'));
    platforms.push(ground(2400, 500, 570, 'stone'));
    platforms.push(...twoTierSection(2950, 640, 900, 'stone', 'brick'));
    platforms.push(...overhangSection(3950, 640, 900, 4400, 180, 'stone'));
    platforms.push(ground(4000, 800, 880, 'stone'));
    platforms.push(ledge(4050, 140, 800, 'stone'));
    platforms.push(...staircase(4800, 880, 3, 80, 120, 40, 'stone'));
    platforms.push(ground(5300, 800, 640, 'stone'));
    platforms.push(...overhangSection(6200, 640, 1000, 6700, 200, 'stone'));
    platforms.push(...pitWithLedges(7300, 640, 420, 160, 'stone'));
    platforms.push(ground(7550, 700, 640, 'stone'));
    platforms.push(...plateauSection(8350, 640, [
      { dx: 0, dy: 0, w: 350, h: 40, type: 'stone' },
      { dx: 390, dy: 80, w: 300, h: 40, type: 'stone' },
      { dx: 730, dy: 160, w: 350, h: 40, type: 'stone' },
      { dx: 1120, dy: 240, w: 300, h: 40, type: 'stone' },
      { dx: 1470, dy: 160, w: 320, h: 40, type: 'stone' },
    ]));
    platforms.push(ledge(4700, 200, 420, 'platform_hard'));
    platforms.push(ground(10250, 800, 480, 'stone'));
    platforms.push(ground(11150, 600, 400, 'stone'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 700, 800, 700, 4));
    coins.push(...coinArc(950, 860, 5, 70, 80));
    coins.push(...coinTrail(1300, 700, 1800, 700, 4));
    coins.push(...coinLadder(3450, 620, 500, 4));
    coins.push(...coinArc(4200, 560, 5, 70, 80));
    coins.push(...coinDiamond(4000, 820, 50));
    coins.push(...coinDiamond(4480, 820, 50));
    coins.push(...coinLadder(5000, 620, 430, 4));
    coins.push(...coinTrail(5400, 560, 6000, 560, 4));
    coins.push(...coinTrail(6300, 560, 6600, 560, 2));
    coins.push(...coinArc(7300, 740, 5, 70, 80));
    coins.push(...coinTrail(8500, 560, 8900, 560, 3));
    coins.push(...coinTrail(9200, 420, 9400, 420, 3));
    coins.push(...coinTrail(10300, 400, 10900, 400, 4));
    coins.push(...coinDiamond(11450, 340, 60));

    return {
      id: 64, name: 'Verlies', width: 14200, height: 1050, biome: 'haunted-mansion',
      platforms,
      movingPlatforms: [
        createMovingPlat(5000, 500, 110, 24, 'platform_easy', 'vertical', 90, 18),
        createMovingPlat(10400, 340, 110, 24, 'platform_medium', 'circular', 90, 18),
      ],
      coins,
      questionBlocks: [
        createQB(300, 700, 'mushroom'),
        createQB(2600, 490, 'coin'),
        createQB(8600, 560, 'flower'),
        createQB(9400, 400, 'star'),
        createQB(10700, 400, 'oneup'),
      ],
      enemies: [
        createEnemy(1500, 700, 'ghost'),
        createEnemy(2000, 480, 'boo'),
        createEnemy(2700, 500, 'ghost'),
        createEnemy(3300, 420, 'boo'),
        createEnemy(4100, 820, 'ghost'),
        createEnemy(4700, 600, 'boo'),
        createEnemy(5500, 560, 'ghost'),
        createEnemy(5600, 600, 'goomba'),
        createEnemy(6400, 560, 'boo'),
        createEnemy(7400, 560, 'ghost'),
        createEnemy(7600, 600, 'robot'),
        createEnemy(7800, 560, 'boo'),
        createEnemy(8700, 480, 'ghost'),
        createEnemy(9000, 440, 'spiny'),
        createEnemy(9300, 380, 'boo'),
        createEnemy(9900, 440, 'ghost'),
        createEnemy(10400, 440, 'crab'),
        createEnemy(10500, 400, 'boo'),
      ],
      decorations: [
        createDeco(200, 730, 'torch'),
        createDeco(700, 460, 'cobweb'),
        createDeco(1300, 730, 'pillar'),
        createDeco(2500, 520, 'skull'),
        createDeco(3400, 400, 'statue'),
        createDeco(4300, 830, 'tombstone'),
        createDeco(5300, 590, 'ghost_decor'),
        createDeco(6500, 590, 'cobweb'),
        createDeco(7100, 750, 'skull'),
        createDeco(8400, 590, 'tombstone'),
        createDeco(9600, 440, 'web'),
        createDeco(11300, 350, 'statue'),
        createDeco(6200, 400, 'bat'),
      ],
      playerStart: { x: 120, y: 756 },
      goal: { x: 11400, y: 392 },
      timeBonus: 200,
      checkpoints: [
        createCheckpoint(2400, 546),
        createCheckpoint(7550, 616),
        createCheckpoint(10250, 456),
      ],
      springs: [createSpring(700, 780), createSpring(7700, 640)],
      spikes: [createSpike(600, 772), createSpike(8000, 632)],
      keys: [createKey(3450, 440)],
      doors: [createDoor(4330, 800, 80, 160)],
    };
  })(),

  // ============================================================
  // Level 65 (Banshee-Horde): Kampf-Arenen mit Boo/Geister-
  // Wellen, Insel-Cluster, Zickzack-Kletterer zum Ballsaal,
  // Horden-Arena mit 3 Spikes und Doppel-Plattformen.
  // Vertikal-Aufzug, Kreis-Plattform, 3 Checkpoints.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(ground(0, 1000, 800, 'castle'));
    platforms.push(...twoTierSection(1080, 800, 1200, 'castle', 'wood'));
    platforms.push(...islandCluster(2400, 800, [
      { dx: 0, dy: 0, w: 200, type: 'castle' },
      { dx: 280, dy: 90, w: 160, type: 'platform_medium' },
      { dx: 520, dy: 180, w: 180, type: 'platform_hard' },
      { dx: 780, dy: 90, w: 160, type: 'platform_medium' },
    ]));
    platforms.push(ground(3420, 900, 800, 'castle'));
    platforms.push(...zigzagClimb(4450, 800, 4, 90, 110, 130, 'platform_medium'));
    platforms.push(ground(4550, 1000, 400, 'castle'));
    platforms.push(...overhangSection(5650, 800, 1000, 6150, 200, 'castle'));
    platforms.push(ground(6750, 900, 800, 'castle'));
    platforms.push(...pitWithLedges(7750, 800, 420, 140, 'stone'));
    platforms.push(ground(8000, 800, 800, 'castle'));
    platforms.push(ground(8900, 1400, 800, 'castle'));
    platforms.push(...staircase(10300, 800, 3, 70, 140, 40, 'castle'));
    platforms.push(ground(10850, 700, 590, 'castle'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 720, 900, 720, 4));
    coins.push(...coinArc(1080, 720, 5, 70, 80));
    coins.push(...coinDiamond(1680, 560, 70));
    coins.push(...coinTrail(2450, 720, 2550, 720, 2));
    coins.push(...coinTrail(2700, 630, 2820, 630, 2));
    coins.push(...coinDiamond(3010, 540, 60));
    coins.push(...coinTrail(3200, 630, 3300, 630, 2));
    coins.push(...coinTrail(3500, 720, 4200, 720, 4));
    coins.push(...coinLadder(4650, 720, 480, 5));
    coins.push(...coinArc(6250, 720, 5, 70, 80));
    coins.push(...coinTrail(6800, 720, 7500, 720, 3));
    coins.push(...coinArc(7750, 860, 5, 70, 80));
    coins.push(...coinTrail(8100, 720, 8700, 720, 4));
    coins.push(...coinTrail(9000, 720, 10200, 720, 5));
    coins.push(...coinArc(10300, 700, 5, 70, 80));
    coins.push(...coinTrail(10900, 510, 11450, 510, 4));

    return {
      id: 65, name: 'Banshee-Horde', width: 14800, height: 1000, biome: 'haunted-mansion',
      platforms,
      movingPlatforms: [
        createMovingPlat(5750, 600, 110, 24, 'platform_easy', 'vertical', 80, 18),
        createMovingPlat(9500, 660, 110, 24, 'platform_medium', 'circular', 50, 18),
      ],
      coins,
      questionBlocks: [
        createQB(300, 700, 'mushroom'),
        createQB(3600, 700, 'coin'),
        createQB(6000, 700, 'flower'),
        createQB(9600, 700, 'star'),
        createQB(11050, 510, 'oneup'),
      ],
      enemies: [
        createEnemy(1300, 560, 'boo'),
        createEnemy(1600, 700, 'ghost'),
        createEnemy(1900, 520, 'boo'),
        createEnemy(2500, 700, 'ghost'),
        createEnemy(2900, 560, 'boo'),
        createEnemy(3300, 700, 'ghost'),
        createEnemy(3700, 640, 'boo'),
        createEnemy(4100, 700, 'ghost'),
        createEnemy(4800, 320, 'boo'),
        createEnemy(5100, 320, 'ghost'),
        createEnemy(5400, 320, 'boo'),
        createEnemy(5900, 700, 'ghost'),
        createEnemy(6300, 700, 'boo'),
        createEnemy(6900, 700, 'ghost'),
        createEnemy(7300, 700, 'boo'),
        createEnemy(7700, 880, 'ghost'),
        createEnemy(8400, 700, 'boo'),
        createEnemy(9000, 700, 'ghost'),
        createEnemy(9400, 700, 'boo'),
        createEnemy(9900, 700, 'ghost'),
        createEnemy(10200, 620, 'boo'),
        createEnemy(1500, 760, 'robot'),
        createEnemy(2600, 760, 'spiny'),
        createEnemy(3000, 760, 'crab'),
        createEnemy(3600, 760, 'robot'),
        createEnemy(3900, 760, 'spiny'),
        createEnemy(4600, 360, 'crab'),
        createEnemy(6900, 760, 'robot'),
        createEnemy(10000, 760, 'crab'),
      ],
      decorations: [
        createDeco(250, 750, 'torch'),
        createDeco(700, 440, 'cobweb'),
        createDeco(1400, 750, 'tombstone'),
        createDeco(2200, 750, 'skull'),
        createDeco(3050, 580, 'statue'),
        createDeco(3700, 750, 'pillar'),
        createDeco(4700, 360, 'ghost_decor'),
        createDeco(6000, 750, 'torch'),
        createDeco(7000, 750, 'tombstone'),
        createDeco(8300, 750, 'web'),
        createDeco(9200, 750, 'skull'),
        createDeco(10600, 540, 'statue'),
        createDeco(11600, 540, 'pillar'),
        createDeco(2800, 480, 'bat'),
      ],
      playerStart: { x: 120, y: 776 },
      goal: { x: 11200, y: 582 },
      timeBonus: 170,
      checkpoints: [
        createCheckpoint(2000, 776),
        createCheckpoint(7000, 776),
        createCheckpoint(11100, 566),
      ],
      springs: [createSpring(500, 800), createSpring(9000, 800)],
      spikes: [
        createSpike(9200, 792),
        createSpike(9800, 792),
        createSpike(10100, 792),
      ],
    };
  })(),

  // ============================================================
  // Level 66 (Krypta-Finale): Gewölbe-Hallen gegen fallende
  // Engine-Hindernisse (ID 66) — jedes Stockwerk hat ein
  // Deckengewölbe, die sichere Bodenroute führt unter den
  // Dächern. Über die Schlucht führen morsche Bröckel-Dielen,
  // unten wartet die sichere Alternativroute. Thwomps, 3
  // Checkpoints, 1-UP vor dem Altar. 2 Spikes, 3 Federn.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(ground(0, 800, 820, 'castle'));
    platforms.push(...staircase(800, 820, 3, 66, 130, 40, 'castle'));
    platforms.push(ground(900, 1100, 900, 'stone'));
    platforms.push(ground(1330, 670, 622, 'castle'));
    platforms.push(ground(2120, 1200, 900, 'stone'));
    platforms.push(...staircase(2120, 900, 4, 70, 130, 40, 'castle'));
    platforms.push(ground(2700, 620, 620, 'castle'));
    platforms.push(...pitWithLedges(3440, 900, 420, 140, 'stone'));
    platforms.push(ground(3780, 1100, 900, 'stone'));
    platforms.push(...staircase(3780, 900, 4, 70, 130, 40, 'castle'));
    platforms.push(ground(4360, 520, 620, 'castle'));
    platforms.push(ground(5000, 900, 900, 'stone'));
    platforms.push(...staircase(5000, 900, 4, 70, 130, 40, 'castle'));
    platforms.push(ground(5580, 320, 620, 'castle'));
    platforms.push(ground(6000, 1300, 1040, 'stone'));
    platforms.push(createCrumblePlat(6055, 912, 150, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(6295, 912, 150, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(6535, 912, 150, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(6775, 912, 150, 24, 'platform_medium'));
    platforms.push(ground(6100, 800, 620, 'castle'));
    platforms.push(ground(6900, 1000, 900, 'stone'));
    platforms.push(ground(6940, 860, 620, 'castle'));
    platforms.push(ground(8020, 1100, 900, 'stone'));
    platforms.push(...staircase(8020, 900, 4, 70, 130, 40, 'castle'));
    platforms.push(ground(8600, 520, 620, 'castle'));
    platforms.push(ground(9240, 1000, 900, 'stone'));
    platforms.push(...staircase(9240, 900, 4, 70, 130, 40, 'castle'));
    platforms.push(ground(9820, 420, 620, 'castle'));
    platforms.push(ground(10360, 1400, 900, 'stone'));
    platforms.push(ground(10700, 1060, 600, 'castle'));
    platforms.push(ledge(10300, 240, 720, 'castle'));
    platforms.push(ground(11880, 1200, 900, 'stone'));
    platforms.push(ground(11880, 1200, 600, 'castle'));
    platforms.push(ground(13200, 1200, 900, 'stone'));
    platforms.push(ground(13200, 1200, 620, 'castle'));
    platforms.push(...staircase(14400, 900, 5, 70, 130, 40, 'castle'));
    platforms.push(ground(15300, 1400, 550, 'castle'));
    platforms.push(ledge(15400, 180, 430, 'wood'));
    platforms.push(ledge(15720, 180, 310, 'wood'));
    platforms.push(ground(15940, 500, 300, 'castle'));
    platforms.push(ground(16800, 1100, 550, 'stone'));
    platforms.push(ground(17300, 450, 470, 'castle'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 740, 750, 740, 4));
    coins.push(...coinArc(900, 820, 5, 70, 80));
    coins.push(...coinTrail(1000, 820, 1950, 820, 4));
    coins.push(...coinLadder(3400, 1000, 840, 4));
    coins.push(...coinTrail(3900, 820, 4700, 820, 4));
    coins.push(...coinDiamond(4620, 560, 60));
    coins.push(...coinTrail(5100, 820, 5800, 820, 4));
    coins.push(...coinArc(6150, 980, 5, 70, 80));
    coins.push(...coinTrail(6250, 540, 6850, 540, 3));
    coins.push(...coinTrail(7000, 820, 7800, 820, 3));
    coins.push(...coinTrail(8100, 820, 9000, 820, 4));
    coins.push(...coinDiamond(9600, 540, 60));
    coins.push(...coinTrail(10400, 820, 11600, 820, 4));
    coins.push(...coinTrail(12000, 820, 12900, 820, 4));
    coins.push(...coinTrail(12100, 540, 13000, 540, 4));
    coins.push(...coinArc(13500, 820, 5, 70, 80));
    coins.push(...coinLadder(14600, 820, 600, 5));
    coins.push(...coinTrail(15400, 490, 16000, 490, 3));
    coins.push(...coinTrail(16000, 240, 16350, 240, 3));
    coins.push(...coinTrail(16900, 490, 17200, 490, 2));
    coins.push(...coinDiamond(17500, 400, 60));

    return {
      id: 66, name: 'Krypta-Finale', width: 18200, height: 1150, biome: 'haunted-mansion',
      platforms,
      movingPlatforms: [
        createMovingPlat(3400, 760, 110, 24, 'platform_easy', 'vertical', 140, 18),
        createMovingPlat(11600, 800, 110, 24, 'platform_medium', 'circular', 60, 18),
      ],
      coins,
      questionBlocks: [
        createQB(300, 740, 'mushroom'),
        createQB(4600, 800, 'coin'),
        createQB(8700, 800, 'flower'),
        createQB(11000, 800, 'star'),
        createQB(16500, 470, 'oneup'),
      ],
      enemies: [
        createEnemy(3440, 300, 'thwomp'),
        createEnemy(9600, 300, 'thwomp'),
        createEnemy(11000, 200, 'thwomp'),
        createEnemy(1500, 860, 'ghost'),
        createEnemy(2400, 820, 'boo'),
        createEnemy(3000, 860, 'ghost'),
        createEnemy(4200, 820, 'boo'),
        createEnemy(5300, 820, 'ghost'),
        createEnemy(5700, 860, 'robot'),
        createEnemy(6500, 1000, 'boo'),
        createEnemy(7500, 820, 'ghost'),
        createEnemy(8300, 860, 'spiny'),
        createEnemy(8500, 820, 'boo'),
        createEnemy(9600, 820, 'ghost'),
        createEnemy(10800, 820, 'boo'),
        createEnemy(11100, 860, 'crab'),
        createEnemy(12000, 820, 'ghost'),
        createEnemy(12500, 860, 'robot'),
        createEnemy(13200, 820, 'boo'),
        createEnemy(14200, 820, 'ghost'),
        createEnemy(15100, 860, 'crab'),
        createEnemy(15200, 500, 'boo'),
        createEnemy(16200, 500, 'ghost'),
      ],
      decorations: [
        createDeco(200, 770, 'torch'),
        createDeco(600, 460, 'cobweb'),
        createDeco(1200, 850, 'pillar'),
        createDeco(1800, 850, 'tombstone'),
        createDeco(2400, 850, 'skull'),
        createDeco(2900, 570, 'statue'),
        createDeco(4000, 850, 'ghost_decor'),
        createDeco(4600, 850, 'tombstone'),
        createDeco(5600, 850, 'skull'),
        createDeco(6400, 990, 'web'),
        createDeco(7200, 850, 'torch'),
        createDeco(8200, 850, 'pillar'),
        createDeco(8800, 570, 'cobweb'),
        createDeco(9800, 850, 'tombstone'),
        createDeco(11200, 850, 'skull'),
        createDeco(12200, 850, 'ghost_decor'),
        createDeco(13600, 850, 'torch'),
        createDeco(14700, 850, 'web'),
        createDeco(15600, 500, 'statue'),
        createDeco(16200, 250, 'cobweb'),
        createDeco(17000, 500, 'pillar'),
        createDeco(17500, 420, 'skull'),
        createDeco(3000, 200, 'bat'),
        createDeco(10500, 200, 'bat'),
      ],
      playerStart: { x: 120, y: 796 },
      goal: { x: 17500, y: 462 },
      timeBonus: 280,
      checkpoints: [
        createCheckpoint(5000, 876),
        createCheckpoint(10800, 876),
        createCheckpoint(13300, 876),
      ],
      springs: [createSpring(400, 820), createSpring(7000, 900), createSpring(13600, 900)],
      spikes: [createSpike(2600, 892), createSpike(10000, 892)],
    };
  })(),
];

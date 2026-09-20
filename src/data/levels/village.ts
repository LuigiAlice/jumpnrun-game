// Village World (ids 37-42) — Phase 9 rebuild
// Archetypes: 37 Dorfplatz, 38 Marktweg, 39 Kanalisation,
// 40 Schornsteine, 41 Stadthorde, 42 Dach-Rennen-Finale (Wind, Engine-ID 42).
// Village gravity is 2000: safe rises <=160px, safe same-height gaps <=210px.
// All levels are authored solvable (ensureSolvable adds nothing).
// L37 pin: load-bearing brick exactly at (2400, 650), bridging a 340px void.

import {
  LevelData, createPlat, createQB, createEnemy, createDeco,
  createMovingPlat, createSpring, createSpike, createCrumblePlat,
  createCheckpoint, createWindZone, createKey, createDoor,
  staircase, plateauSection, pitWithLedges, twoTierSection,
  zigzagClimb, overhangSection,
  coinArc, coinDiamond, coinTrail, coinLadder,
  gapWithPlatforms,
} from './helpers';

export const VILLAGE_LEVELS: LevelData[] = [
  // ============================================================
  // Level 37 (Dorfplatz): Dorfplatz mit Haus-Terrassen, Brunnen-
  // Steg über eine Schlucht (PIN: tragender Brick exakt bei
  // (2400, 650) — ohne ihn sind 340px unüberbrückbar), Markt mit
  // Zwei-Ebenen-Route, Bonus-Balkon hinter Tür + Schlüssel.
  // Aufzug-Plattform, 3 Federn, 2 Spikes, 4 QBs (davon 1 oneup).
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(450, 700, 700, 40, 'stone'));
    platforms.push(createPlat(1100, 660, 420, 40, 'stone'));
    platforms.push(createPlat(1120, 560, 130, 24, 'wood'));
    platforms.push(createPlat(930, 400, 140, 24, 'platform_medium'));
    platforms.push(createPlat(1700, 690, 420, 40, 'stone'));
    platforms.push(createPlat(2125, 690, 350, 40, 'stone'));
    // PIN: load-bearing bridge brick (void is 2300 -> 2640 = 340px)
    platforms.push(createPlat(2400, 650, 140, 24, 'brick'));
    platforms.push(createPlat(2850, 690, 420, 40, 'stone'));
    platforms.push(createPlat(3400, 700, 400, 40, 'stone'));
    platforms.push(createPlat(3450, 830, 300, 40, 'stone'));
    platforms.push(...twoTierSection(3800, 680, 900, 'stone', 'wood'));
    platforms.push(createPlat(5050, 690, 500, 40, 'stone'));
    platforms.push(createPlat(5550, 690, 500, 40, 'stone'));
    // Bonus-Balkon: Tür nur Bonus, Hauptweg bleibt darunter
    platforms.push(createPlat(5700, 590, 260, 24, 'wood'));
    platforms.push(createPlat(5700, 460, 220, 24, 'wood'));
    platforms.push(createPlat(5950, 660, 140, 24, 'platform_easy'));
    platforms.push(createPlat(6350, 700, 500, 40, 'stone'));
    platforms.push(createPlat(6450, 580, 150, 24, 'wood'));
    platforms.push(createPlat(6700, 500, 150, 24, 'wood'));
    platforms.push(createPlat(6950, 560, 150, 24, 'wood'));
    platforms.push(createPlat(6900, 720, 500, 40, 'stone'));
    platforms.push(createPlat(7550, 700, 600, 40, 'stone'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(180, 610, 760, 610, 4));
    coins.push(...coinArc(1000, 590, 5, 70, 80));
    coins.push(...coinDiamond(1120, 500, 60));
    coins.push(...coinLadder(950, 560, 450, 4));
    coins.push(...coinTrail(1400, 600, 1850, 600, 3));
    coins.push(...coinArc(2300, 580, 5, 70, 90));
    coins.push(...coinTrail(2700, 590, 3000, 590, 3));
    coins.push(...coinTrail(3250, 620, 3550, 620, 3));
    coins.push(...coinArc(3450, 780, 3, 50, 40));
    coins.push(...coinTrail(3900, 620, 4600, 620, 4));
    coins.push(...coinArc(4450, 460, 5, 70, 80));
    coins.push(...coinTrail(4850, 610, 5250, 610, 3));
    coins.push(...coinTrail(5400, 610, 5750, 610, 3));
    coins.push(...coinDiamond(5790, 540, 40));
    coins.push(...coinLadder(5700, 560, 480, 3));
    coins.push(...coinTrail(6150, 620, 6550, 620, 4));
    coins.push(...coinArc(6600, 660, 3, 60, 50));
    coins.push(...coinLadder(6450, 540, 480, 3));
    coins.push(...coinTrail(6700, 420, 6900, 420, 3));
    coins.push(...coinTrail(7350, 620, 7750, 620, 4));

    return {
      id: 37, name: 'Dorfplatz', width: 8200, height: 850, biome: 'village',
      platforms,
      movingPlatforms: [
        createMovingPlat(950, 520, 110, 24, 'platform_easy', 'vertical', 70, 18),
      ],
      coins,
      questionBlocks: [
        createQB(400, 600, 'mushroom'),
        createQB(1650, 590, 'coin'),
        createQB(3900, 640, 'flower'),
        createQB(6900, 660, 'oneup'),
      ],
      enemies: [
        createEnemy(650, 660, 'goomba'),
        createEnemy(1150, 620, 'koopa'),
        createEnemy(1750, 650, 'spiny'),
        createEnemy(2150, 650, 'robot'),
        createEnemy(2800, 650, 'crab'),
        createEnemy(3450, 660, 'goomba'),
        createEnemy(4050, 660, 'koopa'),
        createEnemy(5000, 650, 'spiny'),
        createEnemy(5400, 650, 'robot'),
        createEnemy(6300, 660, 'crab'),
        createEnemy(6900, 680, 'goomba'),
        createEnemy(7400, 660, 'koopa'),
      ],
      decorations: [
        createDeco(300, 650, 'house'),
        createDeco(700, 650, 'fence'),
        createDeco(950, 610, 'tree'),
        createDeco(1600, 640, 'house'),
        createDeco(2200, 640, 'barrel'),
        createDeco(3200, 650, 'fence'),
        createDeco(4000, 650, 'house'),
        createDeco(4700, 650, 'barrel'),
        createDeco(5300, 640, 'house'),
        createDeco(5900, 650, 'fence'),
        createDeco(6400, 650, 'barrel'),
        createDeco(7000, 670, 'tree'),
        createDeco(7500, 650, 'house'),
      ],
      playerStart: { x: 150, y: 656 },
      goal: { x: 7600, y: 672 },
      timeBonus: 150,
      springs: [createSpring(1250, 640), createSpring(3500, 680), createSpring(7000, 700)],
      spikes: [createSpike(3350, 672), createSpike(6250, 672)],
      keys: [createKey(4250, 500)],
      doors: [createDoor(5700, 538, 80, 80)],
    };
  })(),

  // ============================================================
  // Level 38 (Marktweg): Marktstände, Terrassen-Plateaus, Grube
  // mit Kanalboden, grosse Zwei-Ebenen-Markthalle. Horizontale
  // und vertikale Moving-Plats, Kellertür + Schlüssel als Bonus,
  // Dach-Grat als obere Münzroute. 2 Spikes, 3 Federn.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(500, 720, 700, 40, 'stone'));
    platforms.push(createPlat(1150, 700, 300, 40, 'wood'));
    platforms.push(createPlat(1150, 580, 200, 24, 'wood'));
    platforms.push(createPlat(1800, 680, 400, 40, 'stone'));
    platforms.push(...plateauSection(2000, 660, [
      { dx: 0, dy: 0, w: 300, h: 40, type: 'wood' },
      { dx: 340, dy: 80, w: 260, h: 40, type: 'stone' },
      { dx: 640, dy: 160, w: 300, h: 40, type: 'stone' },
    ]));
    platforms.push(createPlat(3200, 720, 400, 40, 'stone'));
    platforms.push(...pitWithLedges(3450, 700, 400, 160, 60, 'stone'));
    platforms.push(createPlat(4100, 720, 400, 40, 'stone'));
    platforms.push(...twoTierSection(4400, 700, 900, 'stone', 'wood'));
    platforms.push(createPlat(5700, 720, 500, 40, 'stone'));
    platforms.push(createPlat(5700, 580, 140, 24, 'wood'));
    // Bonus-Keller hinter der Tür (Hauptweg führt über die Moving-Plat)
    platforms.push(createPlat(6150, 860, 300, 40, 'stone'));
    platforms.push(createPlat(6650, 700, 500, 40, 'stone'));
    platforms.push(createPlat(7250, 700, 500, 40, 'stone'));
    platforms.push(createPlat(7350, 548, 180, 24, 'wood'));
    platforms.push(createPlat(7650, 468, 160, 24, 'wood'));
    platforms.push(createPlat(7950, 548, 160, 24, 'wood'));
    platforms.push(createPlat(7850, 720, 500, 40, 'stone'));
    platforms.push(createPlat(8500, 720, 500, 40, 'stone'));
    platforms.push(createPlat(8950, 660, 140, 24, 'platform_easy'));
    platforms.push(createPlat(9350, 700, 500, 40, 'stone'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(180, 630, 780, 630, 4));
    coins.push(...coinArc(1000, 590, 5, 70, 80));
    coins.push(...coinTrail(1060, 500, 1240, 500, 3));
    coins.push(...coinTrail(1650, 580, 1950, 580, 3));
    coins.push(...coinArc(2500, 520, 5, 70, 80));
    coins.push(...coinTrail(3050, 640, 3350, 640, 3));
    coins.push(...coinDiamond(3650, 800, 50));
    coins.push(...coinTrail(3950, 640, 4250, 640, 3));
    coins.push(...coinDiamond(4850, 480, 70));
    coins.push(...coinTrail(5450, 640, 5900, 640, 3));
    coins.push(...coinLadder(5700, 660, 590, 3));
    coins.push(...coinTrail(6050, 800, 6250, 800, 2));
    coins.push(...coinArc(6950, 620, 5, 70, 80));
    coins.push(...coinTrail(7300, 480, 8000, 480, 3));
    coins.push(...coinTrail(8300, 640, 8700, 640, 4));
    coins.push(...coinTrail(9200, 620, 9500, 620, 3));

    return {
      id: 38, name: 'Marktweg', width: 9900, height: 900, biome: 'village',
      platforms,
      movingPlatforms: [
        createMovingPlat(1500, 660, 120, 24, 'platform_easy', 'horizontal', 80, 18),
        createMovingPlat(6200, 560, 110, 24, 'platform_medium', 'vertical', 90, 18),
      ],
      coins,
      questionBlocks: [
        createQB(700, 620, 'mushroom'),
        createQB(2100, 580, 'coin'),
        createQB(4550, 660, 'flower'),
        createQB(6450, 600, 'oneup'),
        createQB(8900, 620, 'star'),
      ],
      enemies: [
        createEnemy(700, 680, 'goomba'),
        createEnemy(1150, 660, 'koopa'),
        createEnemy(1800, 640, 'spiny'),
        createEnemy(2150, 640, 'robot'),
        createEnemy(2450, 560, 'crab'),
        createEnemy(2800, 480, 'robot'),
        createEnemy(3200, 680, 'goomba'),
        createEnemy(4100, 680, 'koopa'),
        createEnemy(4500, 680, 'spiny'),
        createEnemy(4900, 680, 'crab'),
        createEnemy(5700, 680, 'robot'),
        createEnemy(6650, 660, 'goomba'),
        createEnemy(7700, 680, 'crab'),
        createEnemy(8500, 680, 'koopa'),
        createEnemy(9400, 660, 'spiny'),
      ],
      decorations: [
        createDeco(300, 670, 'house'),
        createDeco(750, 670, 'fence'),
        createDeco(1050, 650, 'barrel'),
        createDeco(1750, 630, 'house'),
        createDeco(2350, 550, 'barrel'),
        createDeco(2750, 630, 'fence'),
        createDeco(3300, 670, 'house'),
        createDeco(4150, 670, 'barrel'),
        createDeco(4700, 590, 'fence'),
        createDeco(5550, 670, 'house'),
        createDeco(6100, 810, 'barrel'),
        createDeco(6700, 650, 'fence'),
        createDeco(7400, 500, 'house'),
        createDeco(8400, 670, 'barrel'),
        createDeco(9300, 650, 'house'),
      ],
      playerStart: { x: 250, y: 676 },
      goal: { x: 9350, y: 672 },
      timeBonus: 160,
      springs: [createSpring(4000, 700), createSpring(6600, 680), createSpring(9350, 680)],
      spikes: [createSpike(4700, 692), createSpike(8500, 692)],
      keys: [createKey(5700, 540)],
      doors: [createDoor(6150, 760, 120, 160)],
    };
  })(),

  // ============================================================
  // Level 39 (Kanalisation): Abstieg in die Kanäle, überdachte
  // Gänge, Abwasser-Gräben, Treppenaufstieg zur Sammelkammer.
  // Vertikaler Aufzug, Tür am Bonus-Balkon, 2 Spikes, 3 Federn.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(500, 760, 700, 40, 'stone'));
    platforms.push(createPlat(1000, 800, 300, 40, 'stone'));
    platforms.push(createPlat(1500, 880, 400, 40, 'stone'));
    platforms.push(createPlat(1500, 722, 300, 24, 'platform_medium'));
    platforms.push(createPlat(2050, 880, 400, 40, 'stone'));
    platforms.push(createPlat(2050, 720, 260, 24, 'platform_medium'));
    platforms.push(...overhangSection(2300, 860, 900, 2700, 200, 'stone'));
    platforms.push(createPlat(2700, 760, 200, 24, 'stone'));
    platforms.push(createPlat(3600, 880, 500, 40, 'stone'));
    platforms.push(createPlat(3600, 732, 400, 24, 'platform_medium'));
    platforms.push(...staircase(3950, 860, 3, 70, 140, 40, 'stone'));
    platforms.push(createPlat(4800, 640, 400, 40, 'stone'));
    platforms.push(createPlat(5500, 880, 400, 40, 'stone'));
    platforms.push(createPlat(5150, 760, 150, 24, 'platform_easy'));
    platforms.push(createPlat(6250, 640, 220, 24, 'wood'));
    platforms.push(createPlat(6650, 880, 300, 40, 'stone'));
    // Bonus-Balkon: Tür + Decke, Hauptweg bleibt die Kanalsohle
    platforms.push(createPlat(6800, 760, 240, 24, 'wood'));
    platforms.push(createPlat(6800, 632, 200, 24, 'wood'));
    platforms.push(createPlat(7250, 860, 500, 40, 'stone'));
    platforms.push(...staircase(7550, 840, 3, 80, 140, 40, 'stone'));
    platforms.push(createPlat(8400, 580, 700, 40, 'stone'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(200, 670, 800, 670, 4));
    coins.push(...coinTrail(880, 710, 1120, 710, 3));
    coins.push(...coinArc(1500, 800, 5, 70, 80));
    coins.push(...coinLadder(1500, 660, 700, 2));
    coins.push(...coinTrail(1900, 800, 2200, 800, 3));
    coins.push(...coinTrail(2150, 640, 2600, 640, 3));
    coins.push(...coinDiamond(2800, 800, 50));
    coins.push(...coinTrail(3400, 800, 3800, 800, 4));
    coins.push(...coinArc(4100, 760, 5, 70, 80));
    coins.push(...coinTrail(4700, 560, 4900, 560, 3));
    coins.push(...coinTrail(5350, 800, 5650, 800, 3));
    coins.push(...coinDiamond(6250, 560, 60));
    coins.push(...coinTrail(6500, 800, 6700, 800, 3));
    coins.push(...coinTrail(6850, 700, 6900, 700, 2));
    coins.push(...coinTrail(7050, 780, 7400, 780, 3));
    coins.push(...coinLadder(7620, 780, 560, 4));
    coins.push(...coinTrail(8100, 500, 8500, 500, 4));

    return {
      id: 39, name: 'Kanalisation', width: 9200, height: 950, biome: 'village',
      platforms,
      movingPlatforms: [
        createMovingPlat(5900, 760, 110, 24, 'platform_medium', 'vertical', 80, 18),
        createMovingPlat(2050, 600, 110, 24, 'platform_easy', 'horizontal', 70, 16),
      ],
      coins,
      questionBlocks: [
        createQB(700, 640, 'mushroom'),
        createQB(4800, 560, 'coin'),
        createQB(5600, 780, 'flower'),
        createQB(7450, 780, 'oneup'),
      ],
      enemies: [
        createEnemy(600, 720, 'goomba'),
        createEnemy(1000, 760, 'koopa'),
        createEnemy(1400, 840, 'spiny'),
        createEnemy(2000, 840, 'robot'),
        createEnemy(2400, 840, 'crab'),
        createEnemy(3100, 840, 'goomba'),
        createEnemy(3700, 840, 'koopa'),
        createEnemy(4400, 600, 'spiny'),
        createEnemy(4900, 600, 'robot'),
        createEnemy(5600, 840, 'crab'),
        createEnemy(6650, 840, 'goomba'),
        createEnemy(7300, 820, 'koopa'),
        createEnemy(8400, 540, 'spiny'),
      ],
      decorations: [
        createDeco(300, 710, 'torch'),
        createDeco(750, 710, 'fence'),
        createDeco(1050, 750, 'barrel'),
        createDeco(1550, 830, 'smoke'),
        createDeco(2350, 810, 'torch'),
        createDeco(2750, 710, 'smoke'),
        createDeco(3350, 830, 'barrel'),
        createDeco(3700, 830, 'fence'),
        createDeco(4300, 810, 'torch'),
        createDeco(4900, 590, 'barrel'),
        createDeco(5550, 830, 'smoke'),
        createDeco(6300, 590, 'torch'),
        createDeco(6800, 710, 'fence'),
        createDeco(7300, 810, 'barrel'),
        createDeco(8450, 530, 'torch'),
      ],
      playerStart: { x: 250, y: 716 },
      goal: { x: 8450, y: 552 },
      timeBonus: 150,
      springs: [createSpring(1500, 860), createSpring(3600, 860), createSpring(7250, 840)],
      spikes: [createSpike(2000, 852), createSpike(7300, 832)],
      keys: [createKey(6250, 600)],
      doors: [createDoor(6800, 708, 80, 80)],
    };
  })(),

  // ============================================================
  // Level 40 (Schornsteine): vertikales Klettern über Treppen,
  // Zickzack-Schornsteine, Dächer, Hängebrücken und Skyline-
  // Brücke. Horizontale + vertikale Moving-Plats, 2 Spikes,
  // 3 Federn, oneup-QB.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(500, 920, 700, 40, 'stone'));
    platforms.push(...staircase(900, 900, 2, 100, 140, 40, 'wood'));
    platforms.push(...zigzagClimb(1500, 900, 4, 100, 120, 140, 'stone'));
    platforms.push(createPlat(1750, 480, 300, 40, 'wood'));
    platforms.push(createPlat(2400, 460, 300, 40, 'wood'));
    platforms.push(createPlat(2850, 700, 500, 40, 'stone'));
    platforms.push(...staircase(3200, 680, 3, 80, 140, 40, 'stone'));
    platforms.push(...zigzagClimb(4000, 680, 4, 90, 120, 130, 'stone'));
    platforms.push(createPlat(4150, 300, 280, 40, 'wood'));
    platforms.push(createPlat(4800, 360, 200, 24, 'platform_medium'));
    platforms.push(createPlat(5100, 340, 180, 24, 'wood'));
    platforms.push(createPlat(5400, 380, 180, 24, 'platform_easy'));
    platforms.push(createPlat(5850, 660, 500, 40, 'stone'));
    platforms.push(...twoTierSection(6300, 640, 900, 'stone', 'wood'));
    platforms.push(createPlat(7400, 520, 200, 24, 'wood'));
    platforms.push(createPlat(7750, 440, 180, 24, 'wood'));
    platforms.push(createPlat(8050, 520, 180, 24, 'wood'));
    platforms.push(createPlat(8600, 700, 700, 40, 'stone'));
    platforms.push(createPlat(9450, 680, 600, 40, 'stone'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(180, 830, 780, 830, 4));
    coins.push(...coinArc(970, 780, 3, 50, 50));
    coins.push(...coinLadder(1360, 660, 520, 4));
    coins.push(...coinDiamond(1640, 740, 60));
    coins.push(...coinTrail(1650, 420, 1900, 420, 3));
    coins.push(...coinArc(2050, 420, 5, 70, 80));
    coins.push(...coinTrail(2650, 620, 3050, 620, 3));
    coins.push(...coinArc(3370, 560, 5, 70, 80));
    coins.push(...coinLadder(3870, 440, 340, 4));
    coins.push(...coinDiamond(4130, 240, 60));
    coins.push(...coinTrail(4700, 300, 4850, 300, 2));
    coins.push(...coinTrail(5020, 280, 5150, 280, 2));
    coins.push(...coinTrail(5320, 320, 5450, 320, 2));
    coins.push(...coinTrail(5650, 580, 6050, 580, 3));
    coins.push(...coinDiamond(6750, 420, 80));
    coins.push(...coinTrail(7150, 440, 7350, 440, 2));
    coins.push(...coinTrail(7700, 380, 7850, 380, 2));
    coins.push(...coinTrail(8000, 460, 8150, 460, 2));
    coins.push(...coinTrail(8300, 620, 8700, 620, 4));
    coins.push(...coinTrail(9200, 620, 9500, 620, 3));

    return {
      id: 40, name: 'Schornsteine', width: 10400, height: 1100, biome: 'village',
      platforms,
      movingPlatforms: [
        createMovingPlat(2050, 500, 120, 24, 'platform_easy', 'horizontal', 90, 18),
        createMovingPlat(4500, 400, 110, 24, 'platform_medium', 'vertical', 80, 18),
      ],
      coins,
      questionBlocks: [
        createQB(400, 820, 'mushroom'),
        createQB(3300, 600, 'coin'),
        createQB(5900, 560, 'flower'),
        createQB(8900, 600, 'oneup'),
      ],
      enemies: [
        createEnemy(650, 880, 'goomba'),
        createEnemy(1150, 680, 'koopa'),
        createEnemy(1700, 440, 'spiny'),
        createEnemy(2400, 420, 'robot'),
        createEnemy(2850, 660, 'crab'),
        createEnemy(3300, 580, 'goomba'),
        createEnemy(3870, 480, 'spiny'),
        createEnemy(4150, 260, 'robot'),
        createEnemy(4850, 316, 'crab'),
        createEnemy(5850, 620, 'koopa'),
        createEnemy(6450, 460, 'spiny'),
        createEnemy(7400, 480, 'crab'),
        createEnemy(8050, 480, 'goomba'),
        createEnemy(8600, 660, 'robot'),
        createEnemy(9400, 640, 'koopa'),
      ],
      decorations: [
        createDeco(300, 870, 'house'),
        createDeco(600, 870, 'barrel'),
        createDeco(1100, 680, 'smoke'),
        createDeco(1500, 600, 'smoke'),
        createDeco(2000, 440, 'fence'),
        createDeco(2500, 420, 'barrel'),
        createDeco(2900, 650, 'house'),
        createDeco(4000, 300, 'torch'),
        createDeco(4800, 320, 'smoke'),
        createDeco(5300, 340, 'smoke'),
        createDeco(5900, 620, 'fence'),
        createDeco(6900, 460, 'house'),
        createDeco(7500, 480, 'barrel'),
        createDeco(8300, 660, 'torch'),
        createDeco(9300, 640, 'fence'),
      ],
      playerStart: { x: 250, y: 876 },
      goal: { x: 9500, y: 652 },
      timeBonus: 180,
      springs: [createSpring(500, 900), createSpring(5850, 640), createSpring(8600, 680)],
      spikes: [createSpike(2800, 672), createSpike(8700, 672)],
    };
  })(),

  // ============================================================
  // Level 41 (Stadthorde): dicht besiedelte Terrassen mit 18
  // Gegnern (inkl. Thwomp und Boo), Marktgassen-Gap-Treppe,
  // Zwei-Ebenen-Markt und Dachflucht am Ende. Horizontale,
  // vertikale und circulare Moving-Plats, 3 Spikes, 3 Federn.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(450, 760, 700, 40, 'stone'));
    platforms.push(...staircase(850, 740, 2, 90, 140, 40, 'stone'));
    platforms.push(...plateauSection(1300, 740, [
      { dx: 0, dy: 0, w: 400, h: 40, type: 'stone' },
      { dx: 450, dy: 100, w: 300, h: 40, type: 'wood' },
      { dx: 800, dy: 40, w: 350, h: 40, type: 'stone' },
    ]));
    platforms.push(...twoTierSection(2550, 740, 900, 'stone', 'wood'));
    platforms.push(createPlat(4150, 720, 500, 40, 'stone'));
    platforms.push(...pitWithLedges(4450, 700, 400, 160, 60, 'stone'));
    platforms.push(createPlat(5050, 720, 400, 40, 'stone'));
    platforms.push(createPlat(5350, 620, 160, 24, 'wood'));
    platforms.push(createPlat(5650, 540, 160, 24, 'wood'));
    platforms.push(createPlat(5950, 620, 160, 24, 'wood'));
    platforms.push(createPlat(6350, 740, 500, 40, 'stone'));
    platforms.push(...twoTierSection(6700, 720, 900, 'stone', 'wood'));
    platforms.push(...gapWithPlatforms(1, 7600, 712, 420, 2, {
      widths: [120, 140], dy: [0, 60], types: ['platform_easy', 'platform_medium'],
    }));
    platforms.push(createPlat(8350, 720, 600, 40, 'stone'));
    platforms.push(createPlat(8850, 600, 200, 24, 'wood'));
    platforms.push(createPlat(9180, 520, 180, 24, 'wood'));
    platforms.push(createPlat(9500, 600, 180, 24, 'wood'));
    platforms.push(createPlat(10000, 720, 600, 40, 'stone'));
    platforms.push(createPlat(10800, 700, 700, 40, 'stone'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(180, 670, 780, 670, 4));
    coins.push(...coinArc(850, 700, 5, 70, 80));
    coins.push(...coinTrail(1350, 660, 1650, 660, 3));
    coins.push(...coinTrail(1800, 560, 2000, 560, 3));
    coins.push(...coinTrail(2600, 660, 2900, 660, 3));
    coins.push(...coinDiamond(3000, 480, 70));
    coins.push(...coinTrail(3950, 620, 4250, 620, 3));
    coins.push(...coinDiamond(4650, 800, 50));
    coins.push(...coinTrail(4900, 620, 5200, 620, 3));
    coins.push(...coinLadder(5350, 660, 440, 5));
    coins.push(...coinTrail(6400, 620, 6600, 620, 2));
    coins.push(...coinDiamond(7150, 500, 70));
    coins.push(...coinTrail(8050, 620, 8600, 620, 4));
    coins.push(...coinArc(8850, 540, 5, 70, 80));
    coins.push(...coinTrail(9150, 440, 9500, 440, 3));
    coins.push(...coinTrail(9750, 620, 10250, 620, 4));
    coins.push(...coinTrail(10500, 600, 11050, 600, 4));

    return {
      id: 41, name: 'Stadthorde', width: 11500, height: 950, biome: 'village',
      platforms,
      movingPlatforms: [
        createMovingPlat(3700, 700, 120, 24, 'platform_easy', 'horizontal', 90, 18),
        createMovingPlat(4550, 620, 110, 24, 'platform_medium', 'vertical', 90, 18),
        createMovingPlat(9400, 380, 110, 24, 'platform_easy', 'circular', 80, 18),
      ],
      coins,
      questionBlocks: [
        createQB(600, 660, 'mushroom'),
        createQB(1400, 620, 'coin'),
        createQB(5250, 620, 'flower'),
        createQB(9700, 620, 'star'),
        createQB(10600, 600, 'oneup'),
      ],
      enemies: [
        createEnemy(500, 720, 'goomba'),
        createEnemy(950, 630, 'koopa'),
        createEnemy(1100, 540, 'spiny'),
        createEnemy(1500, 720, 'crab'),
        createEnemy(1900, 620, 'robot'),
        createEnemy(2300, 680, 'goomba'),
        createEnemy(2800, 720, 'spiny'),
        createEnemy(3250, 720, 'koopa'),
        createEnemy(4000, 680, 'crab'),
        createEnemy(5100, 680, 'robot'),
        createEnemy(6400, 700, 'goomba'),
        createEnemy(7000, 700, 'spiny'),
        createEnemy(7450, 700, 'koopa'),
        createEnemy(8400, 680, 'crab'),
        createEnemy(10050, 680, 'robot'),
        createEnemy(10850, 660, 'crab'),
        createEnemy(5600, 480, 'thwomp'),
        createEnemy(9200, 460, 'boo'),
      ],
      decorations: [
        createDeco(250, 710, 'house'),
        createDeco(700, 710, 'fence'),
        createDeco(1350, 710, 'house'),
        createDeco(1850, 610, 'barrel'),
        createDeco(2250, 670, 'house'),
        createDeco(2600, 710, 'fence'),
        createDeco(3500, 710, 'barrel'),
        createDeco(4200, 670, 'house'),
        createDeco(4750, 690, 'fence'),
        createDeco(5400, 590, 'smoke'),
        createDeco(5900, 590, 'smoke'),
        createDeco(6300, 710, 'house'),
        createDeco(6800, 690, 'barrel'),
        createDeco(7700, 686, 'house'),
        createDeco(8400, 670, 'fence'),
        createDeco(9300, 644, 'house'),
        createDeco(10100, 670, 'barrel'),
        createDeco(10800, 640, 'house'),
      ],
      playerStart: { x: 200, y: 716 },
      goal: { x: 10900, y: 672 },
      timeBonus: 170,
      springs: [createSpring(500, 740), createSpring(5050, 700), createSpring(10000, 700)],
      spikes: [createSpike(1550, 732), createSpike(6800, 712), createSpike(8400, 692)],
    };
  })(),

  // ============================================================
  // Level 42 (Dach-Rennen-Finale): Dach-Rennen über die Skyline
  // mit drei Wind-Zonen (Engine-Wind), bröckelnder Abkürzung,
  // Zwei-Ebenen-Dächern und 4 Checkpoints. Horizontale, vertikale
  // und circulare Moving-Plats, 2 Spikes, 3 Federn.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(500, 840, 700, 40, 'stone'));
    platforms.push(createPlat(1050, 740, 200, 24, 'wood'));
    platforms.push(createPlat(1400, 660, 180, 24, 'wood'));
    platforms.push(createPlat(2150, 600, 220, 24, 'wood'));
    platforms.push(createPlat(2550, 760, 400, 40, 'stone'));
    platforms.push(...twoTierSection(2950, 740, 1000, 'stone', 'wood'));
    platforms.push(createPlat(4150, 520, 180, 24, 'wood'));
    platforms.push(createPlat(4500, 460, 160, 24, 'wood'));
    platforms.push(createPlat(5200, 420, 200, 24, 'wood'));
    platforms.push(createPlat(5700, 400, 160, 24, 'wood'));
    platforms.push(createPlat(5950, 440, 180, 24, 'wood'));
    // Bröckelnde Abkürzung (sichere Solid-Route führt unten weiter)
    platforms.push(createCrumblePlat(6250, 400, 140, 24, 'platform_medium'));
    platforms.push(createPlat(6400, 800, 600, 40, 'stone'));
    platforms.push(...plateauSection(6900, 780, [
      { dx: 0, dy: 0, w: 350, h: 40, type: 'wood' },
      { dx: 400, dy: 120, w: 300, h: 40, type: 'stone' },
      { dx: 760, dy: 40, w: 350, h: 40, type: 'wood' },
    ]));
    platforms.push(createPlat(8300, 640, 180, 24, 'wood'));
    platforms.push(createPlat(8600, 560, 160, 24, 'wood'));
    platforms.push(createPlat(8900, 640, 160, 24, 'wood'));
    platforms.push(createPlat(9100, 660, 120, 24, 'platform_easy'));
    platforms.push(createPlat(9700, 480, 200, 24, 'wood'));
    platforms.push(createPlat(10000, 440, 180, 24, 'wood'));
    platforms.push(createPlat(10300, 480, 180, 24, 'wood'));
    platforms.push(createPlat(10850, 760, 700, 40, 'stone'));
    platforms.push(createPlat(11550, 700, 300, 40, 'wood'));
    platforms.push(createPlat(12150, 760, 600, 40, 'stone'));
    platforms.push(createPlat(12750, 680, 180, 24, 'wood'));
    platforms.push(createPlat(13050, 600, 160, 24, 'wood'));
    platforms.push(createPlat(13350, 680, 160, 24, 'wood'));
    platforms.push(createPlat(13850, 760, 600, 40, 'stone'));
    platforms.push(...twoTierSection(14300, 740, 900, 'stone', 'wood'));
    platforms.push(createPlat(15400, 620, 140, 24, 'platform_easy'));
    platforms.push(createPlat(15650, 520, 200, 24, 'wood'));
    platforms.push(createPlat(16200, 560, 600, 40, 'stone'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(180, 750, 780, 750, 4));
    coins.push(...coinArc(1050, 650, 5, 70, 80));
    coins.push(...coinTrail(1400, 560, 2200, 560, 4));
    coins.push(...coinDiamond(2150, 500, 60));
    coins.push(...coinTrail(2450, 660, 2650, 660, 2));
    coins.push(...coinDiamond(3450, 480, 80));
    coins.push(...coinTrail(3200, 660, 3800, 660, 4));
    coins.push(...coinArc(4150, 440, 5, 70, 80));
    coins.push(...coinLadder(4850, 500, 380, 3));
    coins.push(...coinTrail(5200, 340, 5300, 340, 2));
    coins.push(...coinDiamond(5700, 300, 60));
    coins.push(...coinTrail(6100, 690, 6600, 690, 4));
    coins.push(...coinTrail(7050, 690, 7500, 690, 4));
    coins.push(...coinArc(8300, 540, 5, 70, 80));
    coins.push(...coinTrail(9000, 560, 10000, 560, 4));
    coins.push(...coinDiamond(10000, 380, 60));
    coins.push(...coinTrail(10600, 680, 11100, 680, 4));
    coins.push(...coinTrail(11450, 620, 11650, 620, 2));
    coins.push(...coinTrail(11900, 680, 12400, 680, 4));
    coins.push(...coinTrail(12750, 600, 13300, 600, 4));
    coins.push(...coinTrail(13600, 680, 14100, 680, 4));
    coins.push(...coinTrail(14600, 680, 15100, 680, 4));
    coins.push(...coinLadder(15400, 560, 500, 3));
    coins.push(...coinDiamond(16250, 420, 70));
    coins.push(...coinTrail(15950, 480, 16450, 480, 3));

    return {
      id: 42, name: 'Dach-Rennen', width: 17000, height: 1100, biome: 'village',
      platforms,
      movingPlatforms: [
        createMovingPlat(1800, 620, 120, 24, 'platform_easy', 'horizontal', 110, 18),
        createMovingPlat(4850, 500, 110, 24, 'platform_medium', 'vertical', 90, 18),
        createMovingPlat(5450, 430, 110, 24, 'platform_easy', 'horizontal', 60, 20),
        createMovingPlat(9350, 620, 110, 24, 'platform_medium', 'circular', 90, 18),
      ],
      coins,
      questionBlocks: [
        createQB(400, 760, 'mushroom'),
        createQB(3100, 680, 'coin'),
        createQB(7400, 580, 'flower'),
        createQB(10900, 660, 'star'),
        createQB(14700, 700, 'oneup'),
      ],
      enemies: [
        createEnemy(650, 800, 'goomba'),
        createEnemy(1400, 640, 'koopa'),
        createEnemy(2250, 580, 'spiny'),
        createEnemy(2600, 720, 'robot'),
        createEnemy(3200, 720, 'crab'),
        createEnemy(3600, 720, 'goomba'),
        createEnemy(4700, 400, 'spiny'),
        createEnemy(5300, 360, 'robot'),
        createEnemy(6500, 760, 'crab'),
        createEnemy(7100, 740, 'goomba'),
        createEnemy(7500, 620, 'koopa'),
        createEnemy(8400, 600, 'spiny'),
        createEnemy(9800, 440, 'crab'),
        createEnemy(10950, 720, 'robot'),
        createEnemy(12250, 720, 'goomba'),
        createEnemy(13100, 560, 'koopa'),
        createEnemy(13950, 720, 'crab'),
        createEnemy(14700, 700, 'spiny'),
        createEnemy(15750, 480, 'robot'),
        createEnemy(16250, 520, 'goomba'),
      ],
      decorations: [
        createDeco(300, 790, 'house'),
        createDeco(700, 790, 'fence'),
        createDeco(1500, 610, 'house'),
        createDeco(2250, 550, 'barrel'),
        createDeco(2600, 710, 'smoke'),
        createDeco(3100, 630, 'house'),
        createDeco(3900, 710, 'fence'),
        createDeco(4600, 410, 'barrel'),
        createDeco(5300, 370, 'house'),
        createDeco(6100, 750, 'smoke'),
        createDeco(7100, 730, 'house'),
        createDeco(7700, 690, 'fence'),
        createDeco(8400, 590, 'barrel'),
        createDeco(9100, 610, 'smoke'),
        createDeco(10000, 390, 'house'),
        createDeco(10900, 710, 'fence'),
        createDeco(11700, 650, 'barrel'),
        createDeco(12250, 710, 'house'),
        createDeco(13100, 550, 'smoke'),
        createDeco(13950, 710, 'house'),
        createDeco(15400, 570, 'fence'),
        createDeco(16300, 510, 'house'),
      ],
      playerStart: { x: 250, y: 796 },
      goal: { x: 16250, y: 532 },
      timeBonus: 240,
      checkpoints: [
        createCheckpoint(2550, 720),
        createCheckpoint(5200, 380),
        createCheckpoint(6400, 760),
        createCheckpoint(10850, 720),
      ],
      windZones: [
        createWindZone(1550, 380, 700, 480, 120, 2500),
        createWindZone(4600, 180, 900, 520, 150, 2200),
        createWindZone(9000, 360, 800, 520, 140, 2600),
      ],
      springs: [createSpring(3300, 740), createSpring(12150, 740), createSpring(14600, 740)],
      spikes: [createSpike(3350, 732), createSpike(14800, 732)],
    };
  })(),
];

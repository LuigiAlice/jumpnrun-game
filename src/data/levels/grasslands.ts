// Grasslands World (ids 1-6) — Phase 9 rebuild
// Archetypes: 1 Tutorial, 2 Hügel & Gruben, 3 Röhren & Geheimnisse,
// 4 Kletterpartie, 5 Horde, 6 Wind-Dash-Finale.
// Grasslands gravity is 2000: safe rises <=160px, safe same-height gaps <=210px.
// All levels are authored solvable (ensureSolvable adds nothing).
// Harte Pins: L1 genau 1 Spring/0 Spikes + Secret-Plattform (520,400) + pipeWarps,
// L3 Brick exakt (1950,420), L5 coinGoal 25.

import {
  LevelData, createPlat, createQB, createEnemy, createDeco,
  createMovingPlat, createSpring, createSpike, createCrumblePlat,
  createCheckpoint, createWindZone,
  staircase, plateauSection, pitFloor, twoTierSection, islandCluster,
  zigzagClimb, coinArc, coinDiamond, coinTrail, coinLadder,
  gapWithPlatforms, pipeSection,
} from './helpers';

export const GRASSLANDS_LEVELS: LevelData[] = [
  // ============================================================
  // Level 1 (Tutorial): sicherer Bodenlauf mit Brick-/Frageblock-
  // Gruppen, optionaler Hügelroute, zwei Warp-Röhren, Gap-Stufen,
  // Zwei-Ebenen-Route und massiver Zieltreppe. Genau 1 Spring, 0 Spikes,
  // Secret-Plattform exakt (520, 400) vom Start erreichbar.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(350, 550, 500, 40, 'grass'));
    // A forgiving running lane introduces blocks before the first real pit.
    // The higher hill remains an optional route with extra coins.
    platforms.push(createPlat(1200, 665, 1200, 270, 'grass'));
    platforms.push(createPlat(268, 420, 32, 32, 'brick'));
    platforms.push(createPlat(332, 420, 32, 32, 'brick'));
    // Secret room above the start (PIN: exact position/size/type)
    platforms.push(createPlat(520, 400, 140, 24, 'platform_easy'));
    // Hill staircase (4 Stufen, je 70px)
    platforms.push(...staircase(680, 530, 4, 70, 130, 40, 'platform_easy'));
    // Reward plateau on top of the hill
    platforms.push(createPlat(1440, 240, 240, 40, 'grass'));
    // Descent back to ground level
    platforms.push(createPlat(1680, 330, 140, 24, 'platform_medium'));
    platforms.push(createPlat(1880, 440, 140, 24, 'platform_medium'));
    // Ground with the two warp pipes
    platforms.push(createPlat(2150, 550, 700, 40, 'grass'));
    platforms.push(createPlat(2050, 550, 64, 64, 'pipe'));
    platforms.push(createPlat(2050, 506, 80, 24, 'pipe_top'));
    platforms.push(createPlat(2210, 550, 64, 64, 'pipe'));
    platforms.push(createPlat(2210, 506, 80, 24, 'pipe_top'));
    platforms.push(createPlat(2318, 420, 32, 32, 'brick'));
    platforms.push(createPlat(2382, 420, 32, 32, 'brick'));
    // Gap stairs (Phase 9: always with opts)
    platforms.push(...gapWithPlatforms(1, 2500, 530, 420, 2, {
      widths: [110, 90], dy: [0, 30], types: ['platform_easy', 'platform_medium'],
    }));
    platforms.push(createPlat(3100, 550, 600, 40, 'grass'));
    // Stepping stones before the two-tier section
    platforms.push(createPlat(3560, 500, 110, 24, 'platform_medium'));
    platforms.push(createPlat(3750, 470, 90, 24, 'platform_hard'));
    // Two routes: safe lower ground, risky upper coin route
    platforms.push(...twoTierSection(3850, 530, 600, 'grass', 'platform_medium'));
    platforms.push(createPlat(4750, 550, 600, 40, 'grass'));
    platforms.push(createPlat(5150, 520, 100, 24, 'platform_medium'));
    platforms.push(createPlat(5350, 490, 100, 24, 'platform_easy'));
    platforms.push(createPlat(5700, 550, 900, 40, 'grass'));
    // Solid, contiguous steps form a recognisable final run-up to the flag.
    // They are optional: the ground below remains the safe route.
    for (let step = 0; step < 4; step++) {
      const height = (step + 1) * 32;
      platforms.push(createPlat(5564 + step * 48, 530 - height / 2, 48, height, 'stone'));
    }

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(140, 480, 560, 480, 4));
    coins.push(...coinLadder(520, 350, 300, 2));
    coins.push(...coinArc(400, 470, 5, 80, 80));
    coins.push(...coinTrail(700, 430, 1200, 240, 4));
    coins.push(...coinDiamond(1440, 170, 60));
    coins.push(...coinTrail(1650, 290, 1900, 400, 3));
    coins.push(...coinArc(2650, 470, 5, 60, 60));
    coins.push(...coinDiamond(4150, 320, 60));
    coins.push(...coinTrail(5300, 450, 5500, 450, 2));
    coins.push(...coinArc(5820, 390, 5, 80, 70));
    coins.push(...coinTrail(6000, 450, 6100, 450, 2));

    return {
      id: 1, name: 'Grasslands Plains', width: 6400, height: 800, biome: 'grasslands',
      platforms,
      movingPlatforms: [
        createMovingPlat(5200, 380, 110, 24, 'platform_easy', 'vertical', 100, 18),
      ],
      coins,
      questionBlocks: [
        createQB(300, 420, 'mushroom'),
        createQB(560, 340, 'star'),
        createQB(2350, 420, 'coin'),
        createQB(4900, 420, 'flower'),
      ],
      enemies: [
        createEnemy(800, 510, 'goomba'),
        createEnemy(1440, 200, 'goomba'),
        createEnemy(2350, 510, 'koopa'),
        createEnemy(4900, 510, 'goomba'),
      ],
      decorations: [
        createDeco(200, 510, 'tree'),
        createDeco(900, 440, 'bush'),
        createDeco(1200, 180, 'cloud'),
        createDeco(2000, 510, 'flower'),
        createDeco(2950, 510, 'tree'),
        createDeco(4000, 140, 'cloud'),
        createDeco(4900, 510, 'bush'),
        createDeco(6000, 510, 'tree'),
      ],
      playerStart: { x: 170, y: 500 },
      goal: { x: 6000, y: 522 },
      pipeWarps: [
        { pipeX: 2050, pipeY: 506, targetLevelIndex: 2 },
        { pipeX: 2210, pipeY: 506, targetLevelIndex: 5 },
      ],
      timeBonus: 120,
      springs: [createSpring(400, 530)],
    };
  })(),

  // ============================================================
  // Level 2 (Hügel & Gruben): drei Hügel, zwei Gruben mit Rändern,
  // Crumbling-Brücke als optionale Abkürzung über Grube 1,
  // Zwei-Ebenen-Route, Checkpoints (width >= 12000) und eine
  // circulare Moving-Platform als Bonus über der zweiten Grube.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(450, 660, 700, 40, 'grass'));
    // Hill 1
    platforms.push(...staircase(850, 640, 3, 70, 130, 40, 'grass'));
    platforms.push(createPlat(1450, 420, 260, 40, 'grass'));
    platforms.push(createPlat(1720, 500, 140, 24, 'platform_medium'));
    // Pit 1 (depth 180) with ledges out of it
    platforms.push(...pitFloor(1850, 640, 700, 180, 'stone'));
    platforms.push(createPlat(1980, 760, 110, 24, 'platform_easy'));
    platforms.push(createPlat(2250, 700, 110, 24, 'platform_medium'));
    platforms.push(createPlat(2480, 660, 110, 24, 'platform_hard'));
    // Crumble shortcut across the pit (optional, solver-agnostic)
    platforms.push(createCrumblePlat(1950, 560, 120, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(2150, 520, 120, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(2350, 560, 120, 24, 'platform_medium'));
    platforms.push(createPlat(2950, 660, 800, 40, 'grass'));
    // Two-tier section
    platforms.push(...twoTierSection(3450, 640, 700, 'grass', 'stone'));
    platforms.push(createPlat(4450, 660, 600, 40, 'grass'));
    // Pit 2 (depth 200)
    platforms.push(...pitFloor(4800, 640, 600, 200, 'stone'));
    platforms.push(createPlat(4950, 760, 100, 24, 'platform_easy'));
    platforms.push(createPlat(5250, 700, 100, 24, 'platform_medium'));
    platforms.push(createPlat(5700, 660, 700, 40, 'grass'));
    platforms.push(createPlat(6200, 620, 110, 24, 'platform_easy'));
    platforms.push(createPlat(6700, 660, 800, 40, 'grass'));
    // Rolling hills
    platforms.push(...staircase(7150, 640, 3, 70, 140, 45, 'grass'));
    platforms.push(createPlat(7830, 500, 140, 24, 'platform_hard'));
    platforms.push(createPlat(8200, 660, 700, 40, 'grass'));
    platforms.push(...staircase(8650, 640, 2, 80, 130, 40, 'grass'));
    platforms.push(createPlat(9100, 470, 260, 40, 'grass'));
    platforms.push(createPlat(9450, 590, 140, 24, 'platform_medium'));
    platforms.push(createPlat(9800, 660, 800, 40, 'grass'));
    // Final long climb
    platforms.push(...staircase(10250, 640, 4, 70, 140, 40, 'grass'));
    platforms.push(createPlat(11050, 350, 150, 24, 'platform_hard'));
    platforms.push(createPlat(11350, 420, 130, 24, 'platform_medium'));
    platforms.push(...plateauSection(11600, 640, [
      { dx: 0, dy: 0, w: 300, h: 40, type: 'grass' },
      { dx: 340, dy: 120, w: 260, h: 40, type: 'stone' },
      { dx: 640, dy: 240, w: 300, h: 40, type: 'grass' },
    ]));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(120, 580, 780, 580, 4));
    coins.push(...coinTrail(880, 550, 1280, 370, 4));
    coins.push(...coinArc(1440, 350, 5, 70, 80));
    coins.push(...coinTrail(1900, 800, 2500, 800, 5));
    coins.push(...coinTrail(1900, 520, 2400, 520, 5));
    coins.push(...coinDiamond(2950, 560, 70));
    coins.push(...coinArc(3450, 560, 5, 80, 80));
    coins.push(...coinTrail(4950, 730, 5250, 660, 3));
    coins.push(...coinDiamond(6200, 560, 60));
    coins.push(...coinArc(7150, 560, 5, 70, 80));
    coins.push(...coinLadder(9100, 430, 300, 3));
    coins.push(...coinTrail(10300, 540, 10880, 300, 5));
    coins.push(...coinDiamond(12390, 330, 70));

    return {
      id: 2, name: 'Grasslands Gaps', width: 13000, height: 900, biome: 'grasslands',
      platforms,
      movingPlatforms: [
        createMovingPlat(6350, 560, 110, 24, 'platform_easy', 'circular', 120, 20),
        createMovingPlat(2200, 650, 110, 24, 'platform_medium', 'vertical', 110, 18),
      ],
      coins,
      questionBlocks: [
        createQB(650, 530, 'mushroom'),
        createQB(2750, 530, 'coin'),
        createQB(3900, 530, 'flower'),
        createQB(4900, 530, 'star'),
        createQB(9700, 530, 'mushroom'),
      ],
      enemies: [
        createEnemy(350, 620, 'goomba'),
        createEnemy(1050, 550, 'koopa'),
        createEnemy(1400, 380, 'spiny'),
        createEnemy(2800, 620, 'crab'),
        createEnemy(3100, 620, 'robot'),
        createEnemy(3700, 460, 'spiny'),
        createEnemy(4400, 620, 'koopa'),
        createEnemy(5000, 820, 'crab'),
        createEnemy(5600, 620, 'goomba'),
        createEnemy(6700, 620, 'robot'),
        createEnemy(7405, 480, 'spiny'),
        createEnemy(8500, 620, 'koopa'),
        createEnemy(9050, 430, 'goomba'),
        createEnemy(9900, 620, 'crab'),
        createEnemy(10500, 480, 'robot'),
        createEnemy(12050, 500, 'spiny'),
      ],
      decorations: [
        createDeco(200, 630, 'tree'),
        createDeco(1000, 610, 'bush'),
        createDeco(1500, 380, 'flower'),
        createDeco(2200, 820, 'rock'),
        createDeco(3000, 630, 'tree'),
        createDeco(4200, 630, 'bush'),
        createDeco(5100, 820, 'rock'),
        createDeco(5800, 630, 'flower'),
        createDeco(7000, 630, 'tree'),
        createDeco(8300, 630, 'bush'),
        createDeco(9200, 440, 'flower'),
        createDeco(10000, 630, 'tree'),
        createDeco(11800, 610, 'bush'),
      ],
      playerStart: { x: 170, y: 620 },
      goal: { x: 12390, y: 392 },
      timeBonus: 180,
      checkpoints: [
        createCheckpoint(2900, 600),
        createCheckpoint(6900, 600),
        createCheckpoint(9750, 600),
      ],
      springs: [
        createSpring(600, 640),
        createSpring(2900, 640),
        createSpring(8300, 640),
      ],
      spikes: [
        createSpike(780, 632),
        createSpike(4300, 632),
        createSpike(9900, 632),
      ],
    };
  })(),

  // ============================================================
  // Level 3 (Röhren & Geheimnisse): drei Röhrengruppen mit Piranhas,
  // der zerbrechliche Brick exakt (1950, 420), ein Geheimraum mit
  // brick_secret + 1-UP-Block, Grube mit Rand-Stufen, Zickzack-
  // Kletterpartie und ruhiger Zielauslauf.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(500, 560, 800, 40, 'grass'));
    platforms.push(createPlat(1550, 560, 1300, 40, 'grass'));
    // Pipe group 1 (top edge 540 -> warp-free decoration)
    platforms.push(...pipeSection(1, 800, 572, 3));
    // PIN: breakable brick, floating above the main path (never load-bearing)
    platforms.push(createPlat(1950, 420, 96, 24, 'brick'));
    // Elevated ground with pipe group 2
    platforms.push(createPlat(3000, 500, 1600, 40, 'grass'));
    platforms.push(...pipeSection(1, 2300, 512, 3));
    // Secret room (brick_secret platform + approach)
    platforms.push(createPlat(3450, 430, 120, 24, 'platform_medium'));
    platforms.push(createPlat(3620, 350, 140, 24, 'brick_secret'));
    // Pit with ledges back up
    platforms.push(...pitFloor(3900, 500, 500, 160, 'stone'));
    platforms.push(createPlat(4000, 590, 110, 24, 'platform_easy'));
    platforms.push(createPlat(4220, 540, 110, 24, 'platform_medium'));
    platforms.push(createPlat(4800, 500, 800, 40, 'grass'));
    // Zig-zag climb to the high reward platform
    platforms.push(...zigzagClimb(5300, 480, 4, 80, 120, 130, 'platform_medium'));
    platforms.push(createPlat(4900, 150, 200, 40, 'grass'));
    platforms.push(createPlat(5250, 250, 130, 24, 'platform_hard'));
    platforms.push(createPlat(5450, 350, 130, 24, 'platform_medium'));
    // Ground with pipe group 3
    platforms.push(createPlat(6000, 500, 900, 40, 'grass'));
    platforms.push(...pipeSection(1, 5600, 512, 2));
    platforms.push(createPlat(6900, 560, 800, 40, 'grass'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(140, 500, 860, 500, 4));
    coins.push(...coinArc(1950, 360, 5, 70, 60));
    coins.push(...coinTrail(2250, 440, 2900, 440, 4));
    coins.push(...coinLadder(3620, 320, 240, 3));
    coins.push(...coinTrail(3950, 640, 4350, 640, 4));
    coins.push(...coinDiamond(4900, 90, 60));
    coins.push(...coinLadder(5430, 380, 180, 5));
    coins.push(...coinTrail(5600, 440, 6400, 440, 5));
    coins.push(...coinDiamond(6900, 500, 70));

    return {
      id: 3, name: 'Grasslands Pipes', width: 7800, height: 900, biome: 'grasslands',
      platforms,
      movingPlatforms: [
        createMovingPlat(3800, 400, 110, 24, 'platform_easy', 'vertical', 90, 18),
      ],
      coins,
      questionBlocks: [
        createQB(400, 430, 'mushroom'),
        createQB(1300, 430, 'coin'),
        createQB(3620, 280, 'oneup'),
        createQB(4600, 370, 'flower'),
        createQB(6700, 430, 'star'),
      ],
      enemies: [
        createEnemy(400, 520, 'goomba'),
        createEnemy(1200, 520, 'goomba'),
        createEnemy(2600, 460, 'piranha'),
        createEnemy(2950, 460, 'piranha'),
        createEnemy(3300, 460, 'piranha'),
        createEnemy(5000, 460, 'koopa'),
        createEnemy(5700, 460, 'robot'),
        createEnemy(6100, 460, 'goomba'),
        createEnemy(6800, 520, 'crab'),
      ],
      decorations: [
        createDeco(250, 520, 'tree'),
        createDeco(1000, 520, 'bush'),
        createDeco(1500, 200, 'cloud'),
        createDeco(2400, 460, 'flower'),
        createDeco(3100, 460, 'tree'),
        createDeco(3700, 320, 'bush'),
        createDeco(4900, 460, 'flower'),
        createDeco(5800, 460, 'tree'),
        createDeco(6300, 200, 'cloud'),
        createDeco(7000, 520, 'bush'),
      ],
      playerStart: { x: 170, y: 520 },
      goal: { x: 7100, y: 532 },
      timeBonus: 160,
      springs: [
        createSpring(700, 540),
        createSpring(4500, 480),
        createSpring(6600, 540),
      ],
      spikes: [
        createSpike(1650, 532),
        createSpike(6850, 532),
      ],
    };
  })(),

  // ============================================================
  // Level 4 (Kletterpartie): Zickzack-Turm am Start, Hügel-Treppe,
  // Wind-Zone auf ruhiger Laufstrecke, zweiter Aufstieg mit verti-
  // kaler + circularer Moving-Platform, hohes Gipfel-Plateau und
  // sanfter Abstieg zum Ziel.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(450, 760, 700, 40, 'grass'));
    platforms.push(createPlat(900, 700, 120, 24, 'platform_easy'));
    // Zig-zag tower
    platforms.push(...zigzagClimb(1050, 740, 5, 80, 120, 140, 'platform_medium'));
    platforms.push(createPlat(1400, 330, 200, 40, 'grass'));
    platforms.push(createPlat(1650, 420, 130, 24, 'platform_hard'));
    platforms.push(createPlat(1850, 530, 130, 24, 'platform_medium'));
    // Calm run with wind zone
    platforms.push(createPlat(2200, 660, 700, 40, 'grass'));
    // Hill staircase (solid grass steps for guards)
    platforms.push(...staircase(2650, 640, 4, 70, 140, 40, 'grass'));
    platforms.push(createPlat(3450, 560, 120, 24, 'platform_medium'));
    platforms.push(createPlat(3650, 600, 120, 24, 'platform_hard'));
    platforms.push(createPlat(3950, 660, 700, 40, 'grass'));
    // Second climb with moving platforms
    platforms.push(createPlat(4550, 620, 120, 24, 'platform_medium'));
    platforms.push(createPlat(4750, 540, 110, 24, 'platform_hard'));
    platforms.push(createPlat(4950, 460, 110, 24, 'platform_medium'));
    platforms.push(createPlat(5150, 380, 130, 24, 'platform_easy'));
    platforms.push(createPlat(5450, 350, 300, 40, 'grass'));
    // Descent to the goal
    platforms.push(createPlat(5800, 430, 130, 24, 'platform_medium'));
    platforms.push(createPlat(6020, 530, 130, 24, 'platform_hard'));
    platforms.push(createPlat(6350, 660, 700, 40, 'grass'));
    platforms.push(createPlat(6900, 620, 500, 40, 'grass'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(140, 700, 780, 700, 4));
    coins.push(...coinLadder(1190, 620, 380, 5));
    coins.push(...coinDiamond(1400, 250, 60));
    coins.push(...coinArc(1650, 370, 5, 60, 60));
    coins.push(...coinTrail(1950, 580, 2500, 580, 4));
    coins.push(...coinTrail(2700, 540, 3250, 380, 5));
    coins.push(...coinDiamond(5450, 280, 70));
    coins.push(...coinArc(5800, 380, 5, 70, 70));
    coins.push(...coinTrail(6400, 580, 6900, 580, 4));
    coins.push(...coinDiamond(6900, 540, 60));

    return {
      id: 4, name: 'Grasslands Ascent', width: 7600, height: 1100, biome: 'grasslands',
      platforms,
      movingPlatforms: [
        createMovingPlat(4400, 560, 110, 24, 'platform_easy', 'vertical', 120, 18),
        createMovingPlat(4250, 480, 100, 24, 'platform_medium', 'circular', 100, 20),
      ],
      coins,
      questionBlocks: [
        createQB(500, 630, 'mushroom'),
        createQB(1400, 220, 'star'),
        createQB(3800, 530, 'coin'),
        createQB(5450, 240, 'flower'),
        createQB(7000, 490, 'mushroom'),
      ],
      enemies: [
        createEnemy(300, 720, 'goomba'),
        createEnemy(1400, 290, 'spiny'),
        createEnemy(2300, 620, 'crab'),
        createEnemy(2905, 480, 'robot'),
        createEnemy(4000, 620, 'goomba'),
        createEnemy(5450, 310, 'spiny'),
        createEnemy(6400, 620, 'koopa'),
        createEnemy(6900, 580, 'robot'),
      ],
      decorations: [
        createDeco(200, 720, 'tree'),
        createDeco(950, 660, 'bush'),
        createDeco(1450, 290, 'flower'),
        createDeco(2000, 200, 'cloud'),
        createDeco(2500, 620, 'tree'),
        createDeco(3500, 520, 'bush'),
        createDeco(4200, 620, 'flower'),
        createDeco(5500, 310, 'tree'),
        createDeco(6100, 620, 'bush'),
        createDeco(6800, 200, 'cloud'),
        createDeco(7100, 580, 'flower'),
      ],
      playerStart: { x: 170, y: 720 },
      goal: { x: 7000, y: 592 },
      timeBonus: 170,
      windZones: [
        createWindZone(1950, 480, 600, 180, 140, 3000),
      ],
      springs: [
        createSpring(2300, 640),
        createSpring(4000, 640),
        createSpring(6500, 640),
      ],
      spikes: [
        createSpike(2100, 632),
        createSpike(6400, 632),
      ],
    };
  })(),

  // ============================================================
  // Level 5 (Horde): Kampf-Arenen mit Wächtern auf Terrassen und
  // oberen Routen, Gruben-Arena mit Stachel-Boden, Münz-Tor
  // (coinGoal 25, hart gepinnt) und Finale auf dem Plateau.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(450, 660, 900, 40, 'grass'));
    // Terrace islands with guards
    platforms.push(...islandCluster(1000, 640, [
      { dx: 0, dy: 120, w: 140, type: 'stone' },
      { dx: 220, dy: 180, w: 120, type: 'stone' },
      { dx: 440, dy: 100, w: 160, type: 'stone' },
    ]));
    platforms.push(createPlat(1850, 660, 800, 40, 'grass'));
    // Two-tier combat route
    platforms.push(...twoTierSection(2350, 640, 700, 'grass', 'stone'));
    platforms.push(createPlat(3250, 660, 700, 40, 'grass'));
    // Pit arena with spiked floor and climb-out ledges
    platforms.push(...pitFloor(3700, 640, 800, 200, 'stone'));
    platforms.push(createPlat(3800, 760, 110, 24, 'platform_easy'));
    platforms.push(createPlat(4000, 700, 110, 24, 'platform_medium'));
    platforms.push(createPlat(4200, 740, 110, 24, 'platform_easy'));
    platforms.push(createPlat(4400, 720, 110, 24, 'platform_hard'));
    platforms.push(createPlat(4900, 660, 800, 40, 'grass'));
    // Final climb to the goal plateau
    platforms.push(...staircase(5400, 640, 3, 70, 150, 40, 'grass'));
    platforms.push(createPlat(6200, 420, 400, 40, 'grass'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 580, 800, 580, 5));
    coins.push(...coinArc(1050, 500, 5, 70, 70));
    coins.push(...coinDiamond(1280, 400, 60));
    coins.push(...coinTrail(1600, 580, 2200, 580, 4));
    coins.push(...coinLadder(2700, 440, 340, 3));
    coins.push(...coinTrail(3800, 700, 4400, 700, 4));
    coins.push(...coinArc(4900, 560, 5, 70, 80));
    coins.push(...coinDiamond(6200, 340, 60));

    return {
      id: 5, name: 'Grasslands Horde', width: 6900, height: 900, biome: 'grasslands',
      platforms,
      movingPlatforms: [
        createMovingPlat(3750, 560, 110, 24, 'platform_easy', 'circular', 100, 20),
        createMovingPlat(4550, 560, 120, 24, 'platform_medium', 'horizontal', 260, 22),
      ],
      coins,
      questionBlocks: [
        createQB(600, 530, 'mushroom'),
        createQB(3300, 530, 'flower'),
        createQB(4950, 530, 'star'),
        createQB(6200, 290, 'oneup'),
      ],
      enemies: [
        createEnemy(400, 620, 'goomba'),
        createEnemy(700, 620, 'koopa'),
        createEnemy(1070, 500, 'goomba'),
        createEnemy(1280, 440, 'spiny'),
        createEnemy(1480, 520, 'crab'),
        createEnemy(1600, 620, 'robot'),
        createEnemy(1900, 620, 'koopa'),
        createEnemy(2150, 620, 'crab'),
        createEnemy(2467, 460, 'spiny'),
        createEnemy(2933, 460, 'robot'),
        createEnemy(3100, 620, 'goomba'),
        createEnemy(3400, 620, 'koopa'),
        createEnemy(4000, 820, 'goomba'),
        createEnemy(4300, 820, 'spiny'),
        createEnemy(4700, 620, 'crab'),
        createEnemy(5100, 620, 'robot'),
        createEnemy(6100, 380, 'spiny'),
      ],
      decorations: [
        createDeco(200, 620, 'tree'),
        createDeco(1050, 500, 'bush'),
        createDeco(1400, 500, 'flower'),
        createDeco(1800, 620, 'tree'),
        createDeco(2600, 620, 'bush'),
        createDeco(3800, 820, 'rock'),
        createDeco(4700, 620, 'flower'),
        createDeco(5200, 620, 'tree'),
        createDeco(6200, 380, 'bush'),
        createDeco(6600, 200, 'cloud'),
      ],
      playerStart: { x: 170, y: 620 },
      goal: { x: 6250, y: 392 },
      timeBonus: 200,
      coinGoal: 25,
      springs: [
        createSpring(2000, 640),
        createSpring(4700, 640),
      ],
      spikes: [
        createSpike(1900, 632),
        createSpike(3900, 832),
        createSpike(5100, 632),
      ],
    };
  })(),

  // ============================================================
  // Level 6 (Wind-Dash-Finale): zwei Wind-Zonen auf ruhigen
  // Laufstrecken, Checkpoints (width 12000), Crumbling-Brücke als
  // Abkürzung, drei Gap-Staffeln, vertikale + circulare Moving-
  // Platform und finaler Sprint zum Ziel.
  // ============================================================
  (() => {
    const platforms = [] as LevelData['platforms'];
    platforms.push(createPlat(600, 660, 1200, 40, 'grass'));
    platforms.push(...gapWithPlatforms(1, 1100, 640, 500, 2, {
      widths: [120, 100], dy: [0, 40], types: ['platform_easy', 'platform_medium'],
    }));
    platforms.push(createPlat(1800, 660, 900, 40, 'grass'));
    platforms.push(...staircase(2300, 640, 3, 70, 130, 40, 'platform_medium'));
    platforms.push(createPlat(2900, 420, 300, 40, 'grass'));
    // Lower area with crumble shortcut above it
    platforms.push(createPlat(3400, 760, 900, 40, 'grass'));
    platforms.push(createCrumblePlat(3200, 560, 120, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(3400, 520, 120, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(3600, 560, 120, 24, 'platform_medium'));
    platforms.push(createCrumblePlat(3800, 520, 120, 24, 'platform_medium'));
    platforms.push(createPlat(4200, 660, 800, 40, 'grass'));
    platforms.push(...gapWithPlatforms(1, 4600, 640, 560, 3, {
      widths: [110, 90, 120], dy: [0, 30, 0], types: ['platform_medium', 'platform_hard', 'platform_easy'],
    }));
    platforms.push(createPlat(5500, 660, 900, 40, 'grass'));
    // Final hill
    platforms.push(...staircase(6050, 640, 4, 70, 140, 40, 'grass'));
    platforms.push(createPlat(6950, 350, 300, 40, 'grass'));
    platforms.push(createPlat(7300, 420, 130, 24, 'platform_medium'));
    platforms.push(createPlat(7500, 520, 130, 24, 'platform_hard'));
    platforms.push(createPlat(7900, 660, 900, 40, 'grass'));
    platforms.push(...gapWithPlatforms(1, 8350, 640, 600, 3, {
      widths: [120, 100, 110], dy: [0, 40, 20], types: ['platform_easy', 'platform_medium', 'platform_hard'],
    }));
    platforms.push(createPlat(9300, 660, 1000, 40, 'grass'));
    // Final gauntlet
    platforms.push(createPlat(9950, 600, 120, 24, 'platform_easy'));
    platforms.push(createPlat(10150, 550, 100, 24, 'platform_medium'));
    platforms.push(createPlat(10350, 500, 120, 24, 'platform_hard'));
    platforms.push(createPlat(10550, 540, 110, 24, 'platform_medium'));
    platforms.push(createPlat(10750, 580, 110, 24, 'platform_easy'));
    platforms.push(createPlat(11300, 660, 900, 40, 'grass'));

    const coins = [] as LevelData['coins'];
    coins.push(...coinTrail(150, 580, 1000, 580, 5));
    coins.push(...coinArc(1250, 560, 5, 80, 70));
    coins.push(...coinTrail(1500, 580, 2200, 580, 4));
    coins.push(...coinLadder(2900, 480, 340, 3));
    coins.push(...coinTrail(3150, 500, 3880, 500, 5));
    coins.push(...coinDiamond(3200, 620, 70));
    coins.push(...coinArc(4800, 540, 5, 70, 70));
    coins.push(...coinTrail(5200, 580, 5900, 580, 4));
    coins.push(...coinLadder(6120, 500, 300, 4));
    coins.push(...coinDiamond(6950, 270, 60));
    coins.push(...coinTrail(7600, 580, 8300, 580, 4));
    coins.push(...coinTrail(8900, 580, 9750, 580, 4));
    coins.push(...coinTrail(9950, 520, 10750, 500, 5));
    coins.push(...coinDiamond(11500, 560, 60));

    return {
      id: 6, name: 'Grasslands Dash', width: 12000, height: 900, biome: 'grasslands',
      platforms,
      movingPlatforms: [
        createMovingPlat(4880, 440, 110, 24, 'platform_easy', 'vertical', 100, 18),
        createMovingPlat(3000, 600, 110, 24, 'platform_medium', 'circular', 110, 20),
      ],
      coins,
      questionBlocks: [
        createQB(700, 530, 'mushroom'),
        createQB(2000, 530, 'coin'),
        createQB(5600, 530, 'flower'),
        createQB(9400, 530, 'star'),
        createQB(11200, 530, 'coin'),
      ],
      enemies: [
        createEnemy(400, 620, 'goomba'),
        createEnemy(800, 620, 'koopa'),
        createEnemy(1900, 620, 'robot'),
        createEnemy(2400, 550, 'spiny'),
        createEnemy(2900, 380, 'goomba'),
        createEnemy(4200, 620, 'crab'),
        createEnemy(4400, 620, 'spiny'),
        createEnemy(5300, 620, 'koopa'),
        createEnemy(6120, 550, 'robot'),
        createEnemy(7000, 310, 'spiny'),
        createEnemy(8100, 620, 'crab'),
        createEnemy(9000, 620, 'goomba'),
        createEnemy(11000, 620, 'koopa'),
      ],
      decorations: [
        createDeco(200, 620, 'tree'),
        createDeco(900, 620, 'bush'),
        createDeco(1300, 200, 'cloud'),
        createDeco(1950, 620, 'flower'),
        createDeco(2950, 380, 'bush'),
        createDeco(4300, 620, 'tree'),
        createDeco(5600, 620, 'flower'),
        createDeco(6400, 620, 'bush'),
        createDeco(7000, 310, 'tree'),
        createDeco(8000, 620, 'flower'),
        createDeco(9100, 620, 'bush'),
        createDeco(10400, 460, 'cloud'),
        createDeco(11400, 620, 'tree'),
      ],
      playerStart: { x: 200, y: 620 },
      goal: { x: 11500, y: 632 },
      timeBonus: 220,
      checkpoints: [
        createCheckpoint(900, 600),
        createCheckpoint(4500, 600),
        createCheckpoint(7700, 600),
      ],
      windZones: [
        createWindZone(300, 480, 700, 180, 150, 3000),
        createWindZone(3900, 480, 650, 180, 160, 2500),
      ],
      springs: [
        createSpring(1500, 640),
        createSpring(5500, 640),
        createSpring(9500, 640),
      ],
      spikes: [
        createSpike(2150, 632),
        createSpike(5800, 632),
        createSpike(9600, 632),
      ],
    };
  })(),
];

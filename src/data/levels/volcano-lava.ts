// Volcano Lava World - 6 Levels (55-60)
// S-Factors: 0.556, 0.526, 0.5, 0.476, 0.455, 0.435

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat, gapWithPlatforms, pipeSection, verticalClimb } from './helpers';

export const VOLCANO_LAVA_LEVELS: LevelData[] = [
    // ============================================================
    // LEVEL 55: Tutorial — stone ground, few lava gaps, few enemies
    // S=0.556, width=22000, height=620
    // ============================================================
    {
        id: 55,
        name: "Einfuehrung",
        width: 22000,
        height: 620,
        biome: 'volcano-lava',
        platforms: (() => {
            const S = 0.556;
            const plats: any[] = [];

            // Stone ground segments at design_x = n*1800, w=1200, plus lava + helpers
            const segCount = 12;
            for (let n = 0; n < segCount; n++) {
                const baseX = n * 1800;
                plats.push(createPlat(baseX * S, 530, 1200 * S, 100, 'stone'));
                if (n < segCount - 1) {
                    plats.push(createPlat((baseX + 1200) * S, 530, 200 * S, 100, 'lava'));
                    plats.push(createPlat((baseX + 1500) * S, 440, 100 * S, 24, 'platform_easy'));
                }
            }

            // Brick towers for decoration
            plats.push(createPlat(1200 * S, 400, 80 * S, 130, 'brick'));
            plats.push(createPlat(5400 * S, 390, 80 * S, 140, 'brick'));
            plats.push(createPlat(9600 * S, 400, 80 * S, 130, 'brick'));
            plats.push(createPlat(15000 * S, 390, 80 * S, 140, 'brick'));

            // Mid-height platforms for variety
            plats.push(createPlat(3200 * S, 360, 100 * S, 24, 'platform_medium'));
            plats.push(createPlat(7000 * S, 350, 100 * S, 24, 'platform_hard'));
            plats.push(createPlat(11500 * S, 360, 100 * S, 24, 'platform_medium'));
            plats.push(createPlat(17500 * S, 350, 100 * S, 24, 'platform_hard'));

            return plats;
        })(),
        coins: (() => {
            const S = 0.556;
            const cs: any[] = [];
            for (let x = 200; x < 1100; x += 200) cs.push(createCoin(x * S, 480));
            for (let x = 2200; x < 3000; x += 200) cs.push(createCoin(x * S, 480));
            cs.push(createCoin(3200 * S, 310));
            cs.push(createCoin(3300 * S, 310));
            for (let x = 4000; x < 4800; x += 200) cs.push(createCoin(x * S, 480));
            cs.push(createCoin(7000 * S, 300));
            cs.push(createCoin(7100 * S, 300));
            for (let x = 5800; x < 6600; x += 200) cs.push(createCoin(x * S, 480));
            for (let x = 7600; x < 8400; x += 200) cs.push(createCoin(x * S, 480));
            cs.push(createCoin(11600 * S, 310));
            for (let x = 9400; x < 10200; x += 200) cs.push(createCoin(x * S, 480));
            for (let x = 11200; x < 12000; x += 200) cs.push(createCoin(x * S, 480));
            for (let x = 13000; x < 13800; x += 200) cs.push(createCoin(x * S, 480));
            for (let x = 14800; x < 15600; x += 200) cs.push(createCoin(x * S, 480));
            cs.push(createCoin(17600 * S, 300));
            for (let x = 16600; x < 17400; x += 200) cs.push(createCoin(x * S, 480));
            for (let x = 18400; x < 19200; x += 200) cs.push(createCoin(x * S, 480));
            return cs;
        })(),
        questionBlocks: (() => {
            const S = 0.556;
            return [
                createQB(600 * S, 460, 'mushroom'),
                createQB(3300 * S, 300, 'coin'),
                createQB(7100 * S, 290, 'flower'),
                createQB(11600 * S, 300, 'star'),
                createQB(17600 * S, 290, 'mushroom'),
            ];
        })(),
        enemies: (() => {
            const S = 0.556;
            return [
                createEnemy(800 * S, 490, 'goomba'),
                createEnemy(4500 * S, 490, 'fireball'),
                createEnemy(10000 * S, 490, 'goomba'),
                createEnemy(15500 * S, 490, 'crab'),
            ];
        })(),
        decorations: (() => {
            const S = 0.556;
            return [
                createDeco(300 * S, 460, 'fire'),
                createDeco(1400 * S, 460, 'ember'),
                createDeco(2100 * S, 400, 'lava-rock'),
                createDeco(3800 * S, 460, 'rock'),
                createDeco(5000 * S, 460, 'fire'),
                createDeco(5600 * S, 400, 'ember'),
                createDeco(6600 * S, 460, 'lava-rock'),
                createDeco(8000 * S, 460, 'fire'),
                createDeco(9400 * S, 460, 'ember'),
                createDeco(10500 * S, 400, 'rock'),
                createDeco(11000 * S, 460, 'lava-rock'),
                createDeco(12400 * S, 460, 'fire'),
                createDeco(14000 * S, 460, 'ember'),
                createDeco(15600 * S, 400, 'lava-rock'),
                createDeco(16800 * S, 460, 'rock'),
                createDeco(18000 * S, 460, 'fire'),
            ];
        })(),
        playerStart: { x: 100, y: 480 },
        goal: { x: 11287, y: 478 },
        timeBonus: 180,
        movingPlatforms: [
            createMovingPlat(3100, 300, 110, 24, 'platform_medium', 'horizontal', 180, 20),
            createMovingPlat(12500, 310, 120, 24, 'platform_hard', 'horizontal', 200, 22),
        ],
    },

    // ============================================================
    // LEVEL 56: Gap-Strecke — many lava gaps with moving platforms
    // S=0.526, width=24000, height=640
    // ============================================================
    {
        id: 56,
        name: "Lava-Spruenge",
        width: 24000,
        height: 640,
        biome: 'volcano-lava',
        platforms: (() => {
            const S = 0.526;
            const plats: any[] = [];

            // Stone ground segments with gaps
            const segCount = 13;
            for (let n = 0; n < segCount; n++) {
                const baseX = n * 1800;
                plats.push(createPlat(baseX * S, 550, 1200 * S, 100, 'stone'));
                if (n < segCount - 1) {
                    plats.push(createPlat((baseX + 1200) * S, 550, 200 * S, 100, 'lava'));
                    // More stepping platforms for larger gaps - use 3 platforms for 600px gap
                    const hY = n % 3 === 0 ? 460 : (n % 3 === 1 ? 430 : 450);
                    plats.push(createPlat((baseX + 1400) * S, hY, 100 * S, 24, 'platform_easy'));
                    plats.push(createPlat((baseX + 1550) * S, 480, 100 * S, 24, 'platform_easy'));
                }
            }

            // Extra gapWithPlatforms sections - increase platforms for larger gaps
            plats.push(...gapWithPlatforms(S, 4500, 550, 1600, 8));

            // Brick towers
            plats.push(createPlat(1000 * S, 420, 80 * S, 130, 'brick'));
            plats.push(createPlat(6400 * S, 400, 80 * S, 150, 'brick'));
            plats.push(createPlat(12000 * S, 420, 80 * S, 130, 'brick'));
            plats.push(createPlat(17500 * S, 400, 80 * S, 150, 'brick'));

            // Additional floating platforms
            plats.push(createPlat(2800 * S, 380, 100 * S, 24, 'platform_medium'));
            plats.push(createPlat(8200 * S, 370, 100 * S, 24, 'platform_hard'));
            plats.push(createPlat(14000 * S, 380, 100 * S, 24, 'platform_medium'));
            plats.push(createPlat(19500 * S, 370, 100 * S, 24, 'platform_hard'));

            return plats;
        })(),
        coins: (() => {
            const S = 0.526;
            const cs: any[] = [];
            for (let x = 200; x < 1100; x += 200) cs.push(createCoin(x * S, 500));
            cs.push(createCoin(2800 * S, 330));
            cs.push(createCoin(2900 * S, 330));
            for (let x = 2200; x < 4000; x += 300) cs.push(createCoin(x * S, 500));
            for (let x = 5000; x < 6000; x += 200) cs.push(createCoin(x * S, 500));
            cs.push(createCoin(8200 * S, 320));
            cs.push(createCoin(8300 * S, 320));
            for (let x = 6800; x < 7600; x += 200) cs.push(createCoin(x * S, 500));
            for (let x = 8600; x < 9400; x += 200) cs.push(createCoin(x * S, 500));
            for (let x = 10400; x < 11200; x += 200) cs.push(createCoin(x * S, 500));
            cs.push(createCoin(14000 * S, 330));
            for (let x = 12200; x < 13000; x += 200) cs.push(createCoin(x * S, 500));
            for (let x = 14000; x < 14800; x += 200) cs.push(createCoin(x * S, 500));
            cs.push(createCoin(19500 * S, 320));
            for (let x = 15800; x < 16600; x += 200) cs.push(createCoin(x * S, 500));
            for (let x = 17600; x < 18400; x += 200) cs.push(createCoin(x * S, 500));
            for (let x = 19400; x < 20200; x += 200) cs.push(createCoin(x * S, 500));
            return cs;
        })(),
        questionBlocks: (() => {
            const S = 0.526;
            return [
                createQB(400 * S, 480, 'mushroom'),
                createQB(2900 * S, 320, 'flower'),
                createQB(6400 * S, 340, 'star'),
                createQB(8300 * S, 310, 'coin'),
                createQB(14000 * S, 320, 'mushroom'),
                createQB(19500 * S, 310, 'flower'),
            ];
        })(),
        enemies: (() => {
            const S = 0.526;
            return [
                createEnemy(600 * S, 510, 'goomba'),
                createEnemy(3000 * S, 510, 'fireball'),
                createEnemy(5000 * S, 510, 'crab'),
                createEnemy(7200 * S, 510, 'goomba'),
                createEnemy(9000 * S, 510, 'koopa'),
                createEnemy(11000 * S, 510, 'fireball'),
                createEnemy(13500 * S, 510, 'crab'),
                createEnemy(15500 * S, 510, 'goomba'),
                createEnemy(17000 * S, 510, 'koopa'),
                createEnemy(19000 * S, 510, 'fireball'),
            ];
        })(),
        decorations: (() => {
            const S = 0.526;
            return [
                createDeco(300 * S, 480, 'fire'),
                createDeco(1100 * S, 480, 'ember'),
                createDeco(2200 * S, 420, 'lava-rock'),
                createDeco(3400 * S, 480, 'rock'),
                createDeco(5200 * S, 480, 'fire'),
                createDeco(6200 * S, 420, 'ember'),
                createDeco(7400 * S, 480, 'lava-rock'),
                createDeco(8800 * S, 480, 'fire'),
                createDeco(10000 * S, 420, 'ember'),
                createDeco(11600 * S, 480, 'rock'),
                createDeco(12800 * S, 480, 'lava-rock'),
                createDeco(15000 * S, 480, 'fire'),
                createDeco(16200 * S, 420, 'ember'),
                createDeco(17800 * S, 480, 'rock'),
                createDeco(18800 * S, 480, 'lava-rock'),
                createDeco(20000 * S, 480, 'fire'),
            ];
        })(),
        playerStart: { x: 100, y: 500 },
        goal: { x: 11625, y: 498 },
        timeBonus: 180,
        movingPlatforms: [
            createMovingPlat(3800, 360, 110, 24, 'platform_medium', 'horizontal', 220, 20),
            createMovingPlat(7800, 350, 120, 24, 'platform_hard', 'vertical', 140, 18),
            createMovingPlat(11800, 360, 110, 24, 'platform_medium', 'horizontal', 240, 22),
            createMovingPlat(16200, 350, 120, 24, 'platform_hard', 'horizontal', 200, 20),
            createMovingPlat(20200, 360, 110, 24, 'platform_medium', 'horizontal', 220, 22),
        ],
    },

    // ============================================================
    // LEVEL 57: Röhren-Labyrinth — 6 pipe sections with piranhas over lava
    // S=0.5, width=26000, height=650
    // ============================================================
    {
        id: 57,
        name: "Roehrenpfad",
        width: 26000,
        height: 650,
        biome: 'volcano-lava',
        platforms: (() => {
            const S = 0.5;
            const plats: any[] = [];

            // Start ground
            plats.push(createPlat(0 * S, 560, 1500 * S, 100, 'stone'));

            // Pipe section 1 (3 pipes) at gap
            plats.push(...pipeSection(S, 1800, 560, 3));

            // Ground segment
            plats.push(createPlat(3400 * S, 560, 1200 * S, 100, 'stone'));
            plats.push(createPlat((3400 + 1200) * S, 560, 200 * S, 100, 'lava'));

            // Pipe section 2 (4 pipes)
            plats.push(...pipeSection(S, 5000, 560, 4));

            // Ground segment
            plats.push(createPlat(6800 * S, 560, 1200 * S, 100, 'stone'));
            plats.push(createPlat((6800 + 1200) * S, 560, 200 * S, 100, 'lava'));

            // Pipe section 3 (5 pipes)
            plats.push(...pipeSection(S, 8400, 560, 5));

            // Ground segment
            plats.push(createPlat(11000 * S, 560, 1200 * S, 100, 'stone'));
            plats.push(createPlat((11000 + 1200) * S, 560, 200 * S, 100, 'lava'));

            // Pipe section 4 (4 pipes)
            plats.push(...pipeSection(S, 12600, 560, 4));

            // Ground segment
            plats.push(createPlat(14400 * S, 560, 1200 * S, 100, 'stone'));
            plats.push(createPlat((14400 + 1200) * S, 560, 200 * S, 100, 'lava'));

            // Pipe section 5 (5 pipes)
            plats.push(...pipeSection(S, 16000, 560, 5));

            // Ground segment
            plats.push(createPlat(18200 * S, 560, 1200 * S, 100, 'stone'));
            plats.push(createPlat((18200 + 1200) * S, 560, 200 * S, 100, 'lava'));

            // Pipe section 6 (3 pipes)
            plats.push(...pipeSection(S, 19800, 560, 3));

            // Final ground to goal
            plats.push(createPlat(21400 * S, 560, 1600 * S, 100, 'stone'));

            // Brick towers for decoration
            plats.push(createPlat(1000 * S, 430, 80 * S, 130, 'brick'));
            plats.push(createPlat(7400 * S, 420, 80 * S, 140, 'brick'));
            plats.push(createPlat(11800 * S, 430, 80 * S, 130, 'brick'));
            plats.push(createPlat(15600 * S, 420, 80 * S, 140, 'brick'));
            plats.push(createPlat(22000 * S, 430, 80 * S, 130, 'brick'));

            // Helper platforms between pipe sections
            plats.push(createPlat(3800 * S, 450, 100 * S, 24, 'platform_easy'));
            plats.push(createPlat(7500 * S, 440, 100 * S, 24, 'platform_medium'));
            plats.push(createPlat(11600 * S, 450, 100 * S, 24, 'platform_easy'));
            plats.push(createPlat(15300 * S, 440, 100 * S, 24, 'platform_medium'));
      plats.push(createPlat(19000 * S, 450, 100 * S, 24, 'platform_easy'));

      // Bridge platforms to close BFS gaps
      plats.push(createPlat(761.0, 370, 100, 24, 'platform_easy'));
      plats.push(createPlat(2087.5, 390, 100, 24, 'platform_easy'));

      return plats;
    })(),
    coins: (() => {
      const S = 0.5;
      const cs: any[] = [];
      for (let x = 200; x < 1400; x += 250) cs.push(createCoin(x * S, 510));
            // Pipes 1
            for (let x = 2050; x < 2900; x += 350) cs.push(createCoin(x * S, 470));
            for (let x = 3400; x < 4600; x += 250) cs.push(createCoin(x * S, 510));
            // Pipes 2
            for (let x = 5250; x < 6600; x += 350) cs.push(createCoin(x * S, 450));
            for (let x = 6800; x < 8000; x += 250) cs.push(createCoin(x * S, 510));
            // Pipes 3
            for (let x = 8650; x < 10600; x += 350) cs.push(createCoin(x * S, 450));
            for (let x = 11000; x < 12200; x += 250) cs.push(createCoin(x * S, 510));
            // Pipes 4
            for (let x = 12850; x < 14200; x += 350) cs.push(createCoin(x * S, 470));
            for (let x = 14400; x < 15600; x += 250) cs.push(createCoin(x * S, 510));
            // Pipes 5
            for (let x = 16250; x < 18000; x += 350) cs.push(createCoin(x * S, 450));
            for (let x = 18200; x < 19400; x += 250) cs.push(createCoin(x * S, 510));
            // Pipes 6
            for (let x = 20050; x < 21200; x += 350) cs.push(createCoin(x * S, 470));
            for (let x = 21500; x < 22800; x += 200) cs.push(createCoin(x * S, 510));
            return cs;
        })(),
        questionBlocks: (() => {
            const S = 0.5;
            return [
                createQB(600 * S, 490, 'mushroom'),
                createQB(2150 * S, 470, 'coin'),
                createQB(5350 * S, 430, 'flower'),
                createQB(8750 * S, 430, 'star'),
                createQB(12950 * S, 470, 'mushroom'),
                createQB(16350 * S, 430, 'coin'),
                createQB(20150 * S, 470, 'flower'),
            ];
        })(),
        enemies: (() => {
            const S = 0.5;
            return [
                // Piranhas on pipe sections
                createEnemy(2050 * S, 500, 'piranha'),
                createEnemy(2400 * S, 500, 'piranha'),
                createEnemy(2750 * S, 500, 'piranha'),
                createEnemy(5250 * S, 500, 'piranha'),
                createEnemy(5600 * S, 500, 'piranha'),
                createEnemy(5950 * S, 500, 'piranha'),
                createEnemy(6300 * S, 500, 'piranha'),
                createEnemy(8650 * S, 500, 'piranha'),
                createEnemy(9000 * S, 500, 'piranha'),
                createEnemy(9350 * S, 500, 'piranha'),
                createEnemy(9700 * S, 500, 'piranha'),
                createEnemy(10050 * S, 500, 'piranha'),
                createEnemy(12850 * S, 500, 'piranha'),
                createEnemy(13200 * S, 500, 'piranha'),
                createEnemy(13550 * S, 500, 'piranha'),
                createEnemy(13900 * S, 500, 'piranha'),
                createEnemy(16250 * S, 500, 'piranha'),
                createEnemy(16600 * S, 500, 'piranha'),
                createEnemy(16950 * S, 500, 'piranha'),
                createEnemy(17300 * S, 500, 'piranha'),
                createEnemy(17650 * S, 500, 'piranha'),
                createEnemy(20050 * S, 500, 'piranha'),
                createEnemy(20400 * S, 500, 'piranha'),
                createEnemy(20750 * S, 500, 'piranha'),
                // Other enemies on ground
                createEnemy(900 * S, 520, 'goomba'),
                createEnemy(4000 * S, 520, 'fireball'),
                createEnemy(7500 * S, 520, 'crab'),
                createEnemy(11600 * S, 520, 'goomba'),
                createEnemy(15400 * S, 520, 'fireball'),
                createEnemy(19000 * S, 520, 'goomba'),
            ];
        })(),
        decorations: (() => {
            const S = 0.5;
            return [
                createDeco(300 * S, 490, 'fire'),
                createDeco(1200 * S, 490, 'ember'),
                createDeco(2400 * S, 430, 'lava-rock'),
                createDeco(3800 * S, 490, 'fire'),
                createDeco(5600 * S, 430, 'rock'),
                createDeco(6400 * S, 490, 'ember'),
                createDeco(7600 * S, 490, 'lava-rock'),
                createDeco(9000 * S, 430, 'fire'),
                createDeco(10000 * S, 490, 'ember'),
                createDeco(11800 * S, 490, 'rock'),
                createDeco(13400 * S, 430, 'lava-rock'),
                createDeco(14600 * S, 490, 'fire'),
                createDeco(16400 * S, 430, 'ember'),
                createDeco(17600 * S, 490, 'rock'),
                createDeco(19000 * S, 490, 'lava-rock'),
                createDeco(20600 * S, 430, 'fire'),
                createDeco(21800 * S, 490, 'ember'),
                createDeco(22400 * S, 490, 'rock'),
            ];
        })(),
        playerStart: { x: 100, y: 510 },
        goal: { x: 11050, y: 508 },
        timeBonus: 200,
        movingPlatforms: [
            createMovingPlat(3200, 380, 110, 24, 'platform_easy', 'horizontal', 200, 20),
            createMovingPlat(7000, 370, 120, 24, 'platform_medium', 'vertical', 150, 18),
            createMovingPlat(11200, 380, 110, 24, 'platform_easy', 'horizontal', 220, 22),
            createMovingPlat(15000, 370, 120, 24, 'platform_medium', 'horizontal', 200, 20),
            createMovingPlat(18800, 380, 110, 24, 'platform_easy', 'vertical', 140, 18),
        ],
    },

    // ============================================================
    // LEVEL 58: Vertikal-Kletterer — 4 verticalClimb sections with brick towers
    // S=0.476, width=26000, height=700
    // ============================================================
    {
        id: 58,
        name: "Aufstieg",
        width: 26000,
        height: 700,
        biome: 'volcano-lava',
        platforms: (() => {
            const S = 0.476;
            const plats: any[] = [];

            // Start ground
            plats.push(createPlat(0 * S, 580, 1500 * S, 100, 'stone'));

            // Vertical climb 1
            plats.push(...verticalClimb(S, 1800, 580, 'stone'));

            // Ground after climb 1
            plats.push(createPlat(4100 * S, 580, 1200 * S, 100, 'stone'));
            plats.push(createPlat(5300 * S, 580, 200 * S, 100, 'lava'));

            // Vertical climb 2
            plats.push(...verticalClimb(S, 5700, 580, 'stone'));

            // Ground after climb 2
            plats.push(createPlat(8000 * S, 580, 1200 * S, 100, 'stone'));
            plats.push(createPlat(9200 * S, 580, 200 * S, 100, 'lava'));

            // Vertical climb 3
            plats.push(...verticalClimb(S, 9600, 580, 'stone'));

            // Ground after climb 3
            plats.push(createPlat(11900 * S, 580, 1200 * S, 100, 'stone'));
            plats.push(createPlat(13100 * S, 580, 200 * S, 100, 'lava'));

            // Vertical climb 4
            plats.push(...verticalClimb(S, 13500, 580, 'stone'));

            // Ground after climb 4
            plats.push(createPlat(15800 * S, 580, 1200 * S, 100, 'stone'));
            plats.push(createPlat(17000 * S, 580, 200 * S, 100, 'lava'));

            // Scattered high platforms for variety
            plats.push(createPlat(17500 * S, 480, 100 * S, 28, 'platform_easy'));
            plats.push(createPlat(17800 * S, 400, 100 * S, 28, 'platform_medium'));
            plats.push(createPlat(18100 * S, 320, 100 * S, 28, 'platform_hard'));
            plats.push(createPlat(18400 * S, 250, 140 * S, 40, 'stone'));
            plats.push(createPlat(18800 * S, 320, 100 * S, 28, 'platform_hard'));
            plats.push(createPlat(19100 * S, 400, 100 * S, 28, 'platform_medium'));
            plats.push(createPlat(19400 * S, 480, 100 * S, 28, 'platform_easy'));

            // Final ground to goal
            plats.push(createPlat(20000 * S, 580, 1600 * S, 100, 'stone'));

            // Brick towers
            plats.push(createPlat(800 * S, 450, 80 * S, 130, 'brick'));
            plats.push(createPlat(4200 * S, 440, 80 * S, 140, 'brick'));
            plats.push(createPlat(12400 * S, 450, 80 * S, 130, 'brick'));
            plats.push(createPlat(16200 * S, 440, 80 * S, 140, 'brick'));
            plats.push(createPlat(20500 * S, 450, 80 * S, 130, 'brick'));

            // Helper platforms between climb sections
            plats.push(createPlat(2400 * S, 440, 100 * S, 24, 'platform_easy'));
            plats.push(createPlat(6200 * S, 430, 100 * S, 24, 'platform_medium'));
            plats.push(createPlat(10100 * S, 440, 100 * S, 24, 'platform_easy'));
            plats.push(createPlat(14000 * S, 430, 100 * S, 24, 'platform_medium'));

            // Bridge platforms to close BFS gaps
            plats.push(createPlat(614.0, 390, 100, 24, 'platform_easy'));
            plats.push(createPlat(2246.7, 380, 100, 24, 'platform_easy'));
            plats.push(createPlat(7887.3, 380, 100, 24, 'platform_easy'));

            return plats;
        })(),
        coins: (() => {
            const S = 0.476;
            const cs: any[] = [];
            for (let x = 200; x < 1400; x += 200) cs.push(createCoin(x * S, 530));
            // Climb 1 top
            cs.push(createCoin(2600 * S, 220));
            cs.push(createCoin(2700 * S, 220));
            cs.push(createCoin(2800 * S, 220));
            for (let x = 4100; x < 5200; x += 200) cs.push(createCoin(x * S, 530));
            // Climb 2 top
            cs.push(createCoin(6500 * S, 220));
            cs.push(createCoin(6600 * S, 220));
            for (let x = 8000; x < 9000; x += 200) cs.push(createCoin(x * S, 530));
            // Climb 3 top
            cs.push(createCoin(10400 * S, 220));
            cs.push(createCoin(10500 * S, 220));
            cs.push(createCoin(10600 * S, 220));
            for (let x = 11900; x < 13000; x += 200) cs.push(createCoin(x * S, 530));
            // Climb 4 top
            cs.push(createCoin(14300 * S, 220));
            cs.push(createCoin(14400 * S, 220));
            for (let x = 15800; x < 16800; x += 200) cs.push(createCoin(x * S, 530));
            // High scattered
            cs.push(createCoin(18400 * S, 200));
            cs.push(createCoin(18500 * S, 200));
            for (let x = 20000; x < 21400; x += 200) cs.push(createCoin(x * S, 530));
            return cs;
        })(),
        questionBlocks: (() => {
            const S = 0.476;
            return [
                createQB(400 * S, 510, 'mushroom'),
                createQB(2700 * S, 200, 'star'),
                createQB(4300 * S, 390, 'flower'),
                createQB(6600 * S, 200, 'coin'),
                createQB(10500 * S, 200, 'mushroom'),
                createQB(12400 * S, 390, 'flower'),
                createQB(14400 * S, 200, 'star'),
                createQB(20600 * S, 390, 'coin'),
            ];
        })(),
        enemies: (() => {
            const S = 0.476;
            return [
                createEnemy(500 * S, 540, 'goomba'),
                createEnemy(2800 * S, 380, 'goomba'),
                createEnemy(4400 * S, 540, 'fireball'),
                createEnemy(6800 * S, 380, 'crab'),
                createEnemy(8500 * S, 540, 'goomba'),
                createEnemy(10800 * S, 380, 'koopa'),
                createEnemy(12200 * S, 540, 'fireball'),
                createEnemy(14700 * S, 380, 'goomba'),
                createEnemy(16000 * S, 540, 'crab'),
                createEnemy(17700 * S, 440, 'spiny'),
                createEnemy(18400 * S, 200, 'goomba'),
                createEnemy(20400 * S, 540, 'fireball'),
            ];
        })(),
        decorations: (() => {
            const S = 0.476;
            return [
                createDeco(300 * S, 510, 'fire'),
                createDeco(1100 * S, 510, 'ember'),
                createDeco(2200 * S, 400, 'lava-rock'),
                createDeco(2700 * S, 230, 'fire'),
                createDeco(3800 * S, 510, 'ember'),
                createDeco(5000 * S, 510, 'lava-rock'),
                createDeco(6200 * S, 400, 'rock'),
                createDeco(6500 * S, 230, 'fire'),
                createDeco(7600 * S, 510, 'ember'),
                createDeco(8800 * S, 510, 'lava-rock'),
                createDeco(10000 * S, 400, 'rock'),
                createDeco(10400 * S, 230, 'fire'),
                createDeco(11500 * S, 510, 'ember'),
                createDeco(12800 * S, 510, 'lava-rock'),
                createDeco(14000 * S, 400, 'rock'),
                createDeco(14300 * S, 230, 'fire'),
                createDeco(15500 * S, 510, 'ember'),
                createDeco(16800 * S, 510, 'lava-rock'),
                createDeco(18000 * S, 400, 'rock'),
                createDeco(18600 * S, 230, 'fire'),
                createDeco(19800 * S, 510, 'ember'),
                createDeco(21000 * S, 510, 'lava-rock'),
            ];
        })(),
        playerStart: { x: 100, y: 530 },
        goal: { x: 9853, y: 528 },
        timeBonus: 200,
        movingPlatforms: [
            createMovingPlat(3400, 380, 110, 24, 'platform_easy', 'horizontal', 200, 20),
            createMovingPlat(7400, 370, 120, 24, 'platform_medium', 'vertical', 160, 22),
            createMovingPlat(11600, 380, 110, 24, 'platform_easy', 'horizontal', 220, 20),
            createMovingPlat(15600, 370, 120, 24, 'platform_medium', 'horizontal', 240, 24),
        ],
    },

    // ============================================================
    // LEVEL 59: Gegner-Horde — 18 enemies (fireballs, goombas, crabs, etc.)
    // S=0.455, width=26000, height=650
    // ============================================================
    {
        id: 59,
        name: "Asche-Sturm",
        width: 26000,
        height: 650,
        biome: 'volcano-lava',
        platforms: (() => {
            const S = 0.455;
            const plats: any[] = [];

            // Stone ground segments
            const segCount = 14;
            for (let n = 0; n < segCount; n++) {
                const baseX = n * 1800;
                plats.push(createPlat(baseX * S, 560, 1200 * S, 100, 'stone'));
                if (n < segCount - 1) {
                    plats.push(createPlat((baseX + 1200) * S, 560, 200 * S, 100, 'lava'));
                    plats.push(createPlat((baseX + 1500) * S, 450, 100 * S, 24, 'platform_easy'));
                }
            }

            // Brick towers
            plats.push(createPlat(1400 * S, 430, 80 * S, 130, 'brick'));
            plats.push(createPlat(5000 * S, 420, 80 * S, 140, 'brick'));
            plats.push(createPlat(8600 * S, 430, 80 * S, 130, 'brick'));
            plats.push(createPlat(12200 * S, 420, 80 * S, 140, 'brick'));
            plats.push(createPlat(15800 * S, 430, 80 * S, 130, 'brick'));
            plats.push(createPlat(21200 * S, 420, 80 * S, 140, 'brick'));

            // Mid-height platforms for combat variety
            plats.push(createPlat(2800 * S, 370, 100 * S, 24, 'platform_medium'));
            plats.push(createPlat(4000 * S, 380, 100 * S, 24, 'platform_hard'));
            plats.push(createPlat(6800 * S, 370, 100 * S, 24, 'platform_medium'));
            plats.push(createPlat(10200 * S, 380, 100 * S, 24, 'platform_hard'));
            plats.push(createPlat(13800 * S, 370, 100 * S, 24, 'platform_medium'));
            plats.push(createPlat(17800 * S, 380, 100 * S, 24, 'platform_hard'));
            plats.push(createPlat(19500 * S, 370, 100 * S, 24, 'platform_medium'));
            plats.push(createPlat(23000 * S, 380, 100 * S, 24, 'platform_hard'));

            return plats;
        })(),
        coins: (() => {
            const S = 0.455;
            const cs: any[] = [];
            for (let x = 200; x < 1100; x += 200) cs.push(createCoin(x * S, 510));
            cs.push(createCoin(2800 * S, 320));
            cs.push(createCoin(2900 * S, 320));
            for (let x = 2200; x < 3800; x += 250) cs.push(createCoin(x * S, 510));
            cs.push(createCoin(4000 * S, 330));
            cs.push(createCoin(4100 * S, 330));
            for (let x = 4000; x < 7200; x += 250) cs.push(createCoin(x * S, 510));
            cs.push(createCoin(6800 * S, 320));
            for (let x = 7200; x < 8300; x += 250) cs.push(createCoin(x * S, 510));
            for (let x = 9000; x < 10100; x += 250) cs.push(createCoin(x * S, 510));
            cs.push(createCoin(10200 * S, 330));
            cs.push(createCoin(10300 * S, 330));
            for (let x = 10800; x < 11900; x += 250) cs.push(createCoin(x * S, 510));
            for (let x = 12600; x < 13700; x += 250) cs.push(createCoin(x * S, 510));
            cs.push(createCoin(13800 * S, 320));
            for (let x = 14400; x < 15500; x += 250) cs.push(createCoin(x * S, 510));
            for (let x = 16200; x < 17300; x += 250) cs.push(createCoin(x * S, 510));
            cs.push(createCoin(17800 * S, 330));
            for (let x = 18000; x < 19100; x += 250) cs.push(createCoin(x * S, 510));
            cs.push(createCoin(19600 * S, 320));
            for (let x = 19800; x < 20900; x += 250) cs.push(createCoin(x * S, 510));
            for (let x = 21600; x < 22700; x += 250) cs.push(createCoin(x * S, 510));
            cs.push(createCoin(23000 * S, 330));
            for (let x = 23400; x < 24600; x += 250) cs.push(createCoin(x * S, 510));
            return cs;
        })(),
        questionBlocks: (() => {
            const S = 0.455;
            return [
                createQB(600 * S, 490, 'mushroom'),
                createQB(2900 * S, 310, 'flower'),
                createQB(4100 * S, 320, 'star'),
                createQB(6900 * S, 310, 'coin'),
                createQB(10300 * S, 320, 'mushroom'),
                createQB(13900 * S, 310, 'flower'),
                createQB(17900 * S, 320, 'star'),
                createQB(23100 * S, 320, 'coin'),
            ];
        })(),
        enemies: (() => {
            const S = 0.455;
            return [
                // 20 enemies — horde of fireballs, goombas, crabs, etc.
                createEnemy(400 * S, 520, 'goomba'),
                createEnemy(1000 * S, 520, 'fireball'),
                createEnemy(1600 * S, 520, 'goomba'),
                createEnemy(2800 * S, 330, 'crab'),
                createEnemy(3400 * S, 520, 'fireball'),
                createEnemy(4100 * S, 340, 'koopa'),
                createEnemy(4800 * S, 520, 'goomba'),
                createEnemy(5400 * S, 520, 'fireball'),
                createEnemy(6200 * S, 520, 'crab'),
                createEnemy(7000 * S, 330, 'goomba'),
                createEnemy(7600 * S, 520, 'robot'),
                createEnemy(8200 * S, 520, 'fireball'),
                createEnemy(9000 * S, 520, 'koopa'),
                createEnemy(9800 * S, 520, 'goomba'),
                createEnemy(10300 * S, 340, 'crab'),
                createEnemy(11000 * S, 520, 'fireball'),
                createEnemy(11800 * S, 520, 'goomba'),
                createEnemy(12400 * S, 520, 'robot'),
                createEnemy(13000 * S, 520, 'fireball'),
                createEnemy(13900 * S, 330, 'spiny'),
                createEnemy(14600 * S, 520, 'crab'),
                createEnemy(15200 * S, 520, 'koopa'),
                createEnemy(15800 * S, 520, 'fireball'),
                createEnemy(16600 * S, 520, 'goomba'),
                createEnemy(17400 * S, 520, 'fireball'),
                createEnemy(18000 * S, 340, 'crab'),
                createEnemy(18600 * S, 520, 'goomba'),
                createEnemy(19600 * S, 330, 'robot'),
                createEnemy(20400 * S, 520, 'fireball'),
                createEnemy(21000 * S, 520, 'koopa'),
                createEnemy(21800 * S, 520, 'goomba'),
                createEnemy(22600 * S, 520, 'fireball'),
                createEnemy(23100 * S, 340, 'crab'),
                createEnemy(23600 * S, 520, 'goomba'),
            ];
        })(),
        decorations: (() => {
            const S = 0.455;
            return [
                createDeco(300 * S, 490, 'fire'),
                createDeco(900 * S, 490, 'ember'),
                createDeco(2000 * S, 490, 'lava-rock'),
                createDeco(2600 * S, 490, 'rock'),
                createDeco(3600 * S, 490, 'fire'),
                createDeco(4600 * S, 490, 'ember'),
                createDeco(5200 * S, 490, 'lava-rock'),
                createDeco(6000 * S, 490, 'fire'),
                createDeco(7200 * S, 490, 'rock'),
                createDeco(8000 * S, 490, 'ember'),
                createDeco(8800 * S, 490, 'lava-rock'),
                createDeco(10000 * S, 490, 'fire'),
                createDeco(10800 * S, 490, 'ember'),
                createDeco(11600 * S, 490, 'rock'),
                createDeco(12800 * S, 490, 'lava-rock'),
                createDeco(13400 * S, 490, 'fire'),
                createDeco(14400 * S, 490, 'ember'),
                createDeco(15400 * S, 490, 'rock'),
                createDeco(16400 * S, 490, 'lava-rock'),
                createDeco(17000 * S, 490, 'fire'),
                createDeco(18200 * S, 490, 'ember'),
                createDeco(19000 * S, 490, 'lava-rock'),
                createDeco(20000 * S, 490, 'rock'),
                createDeco(21200 * S, 490, 'fire'),
                createDeco(22000 * S, 490, 'ember'),
                createDeco(23200 * S, 490, 'lava-rock'),
            ];
        })(),
        playerStart: { x: 100, y: 510 },
        goal: { x: 10875, y: 508 },
        timeBonus: 210,
        movingPlatforms: [
            createMovingPlat(2500, 320, 110, 24, 'platform_easy', 'horizontal', 200, 20),
            createMovingPlat(6600, 310, 120, 24, 'platform_medium', 'vertical', 140, 18),
            createMovingPlat(9800, 320, 110, 24, 'platform_easy', 'horizontal', 240, 22),
            createMovingPlat(13600, 310, 120, 24, 'platform_medium', 'horizontal', 220, 20),
            createMovingPlat(17000, 320, 110, 24, 'platform_easy', 'circular', 100, 18),
            createMovingPlat(20600, 310, 120, 24, 'platform_medium', 'vertical', 160, 22),
        ],
    },

    // ============================================================
    // LEVEL 60: Eruption-Finale — ascending structure, lava below, player must climb
    // S=0.435, width=28000, height=750
    // ============================================================
    {
        id: 60,
        name: "Krater-Finale",
        width: 28000,
        height: 750,
        biome: 'volcano-lava',
        platforms: (() => {
            const S = 0.435;
            const plats: any[] = [];

            // Stage 1: Start at ground level
            plats.push(createPlat(0 * S, 580, 1500 * S, 100, 'stone'));
            plats.push(createPlat(1500 * S, 580, 200 * S, 100, 'lava'));

            // Ascent 1: step up via platforms (ground → y=500 → y=420 → y=340)
            plats.push(createPlat(1900 * S, 500, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(2200 * S, 420, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(2500 * S, 340, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(2800 * S, 340, 1200 * S, 100, 'stone'));
            plats.push(createPlat(4000 * S, 340, 200 * S, 100, 'lava'));

            // Ascent 2: step higher (y=340 → y=260 → y=180)
            plats.push(createPlat(4400 * S, 260, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(4700 * S, 180, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(5000 * S, 180, 1200 * S, 100, 'stone'));
            plats.push(createPlat(6200 * S, 180, 200 * S, 100, 'lava'));

            // Ascent 3: step higher (y=180 → y=100 → y=20)
            plats.push(createPlat(6600 * S, 100, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(6900 * S, 20, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(7200 * S, 20, 1200 * S, 100, 'stone'));
            plats.push(createPlat(8400 * S, 20, 200 * S, 100, 'lava'));

            // Mid-level plateau
            plats.push(createPlat(8800 * S, 20, 1500 * S, 100, 'stone'));
            plats.push(createPlat(10300 * S, 20, 200 * S, 100, 'lava'));

            // Descent phase: step down
            plats.push(createPlat(10700 * S, 100, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(11000 * S, 180, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(11300 * S, 260, 1200 * S, 100, 'stone'));
            plats.push(createPlat(12500 * S, 260, 200 * S, 100, 'lava'));

            // Ascent 4: climb to final goal (y=260 → y=180 → y=100)
            plats.push(createPlat(12900 * S, 180, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(13200 * S, 100, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(13500 * S, 100, 1500 * S, 100, 'stone'));
            plats.push(createPlat(15000 * S, 100, 200 * S, 100, 'lava'));

            // Final plateau to goal
            plats.push(createPlat(15400 * S, 100, 1500 * S, 100, 'stone'));
            plats.push(createPlat(16900 * S, 100, 200 * S, 100, 'lava'));

            // Goal approach — long stone segment
            plats.push(createPlat(17300 * S, 100, 2000 * S, 100, 'stone'));

            // Lava at bottom (y=620) spanning the entire level
            const lavaYs = [1500, 4000, 6200, 8400, 10300, 12500, 15000, 16900];
            for (const lx of lavaYs) {
                plats.push(createPlat(lx * S, 620, 200 * S, 100, 'lava'));
            }

            // Brick towers at various elevations
            plats.push(createPlat(600 * S, 450, 80 * S, 130, 'brick'));
            plats.push(createPlat(3200 * S, 210, 80 * S, 130, 'brick'));
            plats.push(createPlat(5500 * S, 50, 80 * S, 130, 'brick'));
            plats.push(createPlat(9200 * S, -110, 80 * S, 130, 'brick'));
            plats.push(createPlat(11700 * S, 130, 80 * S, 130, 'brick'));
            plats.push(createPlat(14000 * S, -30, 80 * S, 130, 'brick'));
            plats.push(createPlat(15800 * S, -30, 80 * S, 130, 'brick'));
            plats.push(createPlat(18200 * S, -30, 80 * S, 130, 'brick'));

            // Additional helper platforms along the ascent
            plats.push(createPlat(1800 * S, 440, 80 * S, 24, 'platform_easy'));
            plats.push(createPlat(4300 * S, 200, 80 * S, 24, 'platform_medium'));
            plats.push(createPlat(6500 * S, 50, 80 * S, 24, 'platform_hard'));
            plats.push(createPlat(10800 * S, 50, 80 * S, 24, 'platform_easy'));
            plats.push(createPlat(12800 * S, 120, 80 * S, 24, 'platform_medium'));
            plats.push(createPlat(15200 * S, 50, 80 * S, 24, 'platform_hard'));
      plats.push(createPlat(17800 * S, 50, 80 * S, 24, 'platform_easy'));

      return plats;
    })(),
    coins: (() => {
      const S = 0.435;
      const cs: any[] = [];
      for (let x = 200; x < 1400; x += 200) cs.push(createCoin(x * S, 530));
            // Ascent 1
            cs.push(createCoin(2000 * S, 450));
            cs.push(createCoin(2100 * S, 370));
            cs.push(createCoin(2300 * S, 370));
            for (let x = 2800; x < 3800; x += 200) cs.push(createCoin(x * S, 290));
            // Ascent 2
            cs.push(createCoin(4500 * S, 210));
            cs.push(createCoin(4600 * S, 130));
            cs.push(createCoin(4800 * S, 130));
            for (let x = 5000; x < 6000; x += 200) cs.push(createCoin(x * S, 130));
            // Ascent 3
            cs.push(createCoin(6700 * S, 50));
            cs.push(createCoin(6800 * S, -30));
            for (let x = 7200; x < 8200; x += 200) cs.push(createCoin(x * S, -30));
            // Mid plateau
            for (let x = 8800; x < 10100; x += 200) cs.push(createCoin(x * S, -30));
            // Descent
            cs.push(createCoin(10800 * S, 50));
            cs.push(createCoin(10900 * S, 130));
            for (let x = 11300; x < 12300; x += 200) cs.push(createCoin(x * S, 210));
            // Ascent 4
            cs.push(createCoin(13000 * S, 130));
            cs.push(createCoin(13100 * S, 50));
            for (let x = 13500; x < 14800; x += 200) cs.push(createCoin(x * S, 50));
            // Final plateau
            for (let x = 15400; x < 16700; x += 200) cs.push(createCoin(x * S, 50));
            for (let x = 17400; x < 19000; x += 200) cs.push(createCoin(x * S, 50));
            return cs;
        })(),
        questionBlocks: (() => {
            const S = 0.435;
            return [
                createQB(400 * S, 510, 'mushroom'),
                createQB(2100 * S, 360, 'flower'),
                createQB(4600 * S, 120, 'star'),
                createQB(6800 * S, -50, 'coin'),
                createQB(9200 * S, -120, 'mushroom'),
                createQB(10900 * S, 120, 'flower'),
                createQB(13100 * S, 40, 'star'),
                createQB(16000 * S, -100, 'coin'),
                createQB(17800 * S, -50, 'mushroom'),
                createQB(18500 * S, -50, 'flower'),
            ];
        })(),
        enemies: (() => {
            const S = 0.435;
            return [
                createEnemy(500 * S, 540, 'goomba'),
                createEnemy(1200 * S, 540, 'fireball'),
                createEnemy(3000 * S, 300, 'crab'),
                createEnemy(3400 * S, 300, 'koopa'),
                createEnemy(4500 * S, 220, 'goomba'),
                createEnemy(5200 * S, 140, 'fireball'),
                createEnemy(5800 * S, 140, 'crab'),
                createEnemy(6800 * S, 60, 'spiny'),
                createEnemy(7500 * S, -20, 'goomba'),
                createEnemy(8000 * S, -20, 'fireball'),
                createEnemy(9200 * S, -20, 'robot'),
                createEnemy(9600 * S, -20, 'fireball'),
                createEnemy(10900 * S, 140, 'goomba'),
                createEnemy(11500 * S, 220, 'crab'),
                createEnemy(12000 * S, 220, 'fireball'),
                createEnemy(13000 * S, 140, 'koopa'),
                createEnemy(13800 * S, 60, 'goomba'),
                createEnemy(14400 * S, 60, 'fireball'),
                createEnemy(15700 * S, 60, 'crab'),
                createEnemy(16200 * S, 60, 'robot'),
                createEnemy(17700 * S, 60, 'goomba'),
                createEnemy(18300 * S, 60, 'fireball'),
            ];
        })(),
        decorations: (() => {
            const S = 0.435;
            return [
                createDeco(300 * S, 510, 'fire'),
                createDeco(1000 * S, 510, 'ember'),
                createDeco(2000 * S, 460, 'lava-rock'),
                createDeco(2400 * S, 340, 'rock'),
                createDeco(3300 * S, 290, 'fire'),
                createDeco(4500 * S, 220, 'ember'),
                createDeco(5400 * S, 130, 'lava-rock'),
                createDeco(6000 * S, 130, 'rock'),
                createDeco(7000 * S, 20, 'fire'),
                createDeco(7800 * S, 20, 'ember'),
                createDeco(8700 * S, -10, 'lava-rock'),
                createDeco(9500 * S, -10, 'rock'),
                createDeco(10000 * S, -10, 'fire'),
                createDeco(11100 * S, 130, 'ember'),
                createDeco(11800 * S, 210, 'lava-rock'),
                createDeco(12600 * S, 210, 'rock'),
                createDeco(13400 * S, 50, 'fire'),
                createDeco(14200 * S, 50, 'ember'),
                createDeco(14800 * S, 50, 'lava-rock'),
                createDeco(15600 * S, 50, 'rock'),
                createDeco(16600 * S, 50, 'fire'),
                createDeco(17600 * S, 50, 'ember'),
                createDeco(18400 * S, 50, 'lava-rock'),
            ];
        })(),
        playerStart: { x: 100, y: 530 },
        goal: { x: 7917, y: 48 },
        timeBonus: 220,
        movingPlatforms: [
            createMovingPlat(2600, 280, 110, 24, 'platform_medium', 'vertical', 140, 20),
            createMovingPlat(4800, 120, 120, 24, 'platform_hard', 'horizontal', 180, 22),
            createMovingPlat(7000, -20, 110, 24, 'platform_medium', 'horizontal', 200, 20),
            createMovingPlat(9000, -80, 120, 24, 'platform_hard', 'circular', 100, 18),
            createMovingPlat(11200, 200, 110, 24, 'platform_medium', 'horizontal', 220, 22),
            createMovingPlat(13400, 40, 120, 24, 'platform_hard', 'vertical', 120, 20),
            createMovingPlat(15600, 20, 110, 24, 'platform_medium', 'horizontal', 240, 22),
            createMovingPlat(17800, 30, 120, 24, 'platform_hard', 'horizontal', 200, 20),
        ],
    },
];

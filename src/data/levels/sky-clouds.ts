// Sky Clouds World - 6 Levels (25-30)
// Distinct structures: Tutorial, Gap-Strecke, Röhren-Labyrinth, Vertikal-Kletterer, Gegner-Horde, Wolken-Inseln-Finale

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat, gapWithPlatforms, pipeSection, verticalClimb } from './helpers';

export const SKY_CLOUDS_LEVELS: LevelData[] = [
    // ============================================================
    // Level 25: "Cloud Hop" (Tutorial) - S=0.65
    // Simple cloud path with one gap section and few enemies.
    // ============================================================
    {
        id: 25, name: "Cloud Hop", width: 10000, height: 600, biome: 'sky-clouds',
        platforms: (() => {
            const S = 0.65;
            return [
                createPlat(200 * S, 540, 500 * S, 40, 'cloud'),
                createPlat(950 * S, 510, 400 * S, 40, 'cloud'),
                createPlat(1600 * S, 480, 300 * S, 40, 'cloud'),
                ...gapWithPlatforms(S, 2200, 480, 500, 3),
                createPlat(3100 * S, 460, 450 * S, 40, 'cloud'),
                createPlat(4000 * S, 430, 350 * S, 40, 'cloud'),
                createPlat(4800 * S, 400, 500 * S, 40, 'cloud'),
            ];
        })(),
        coins: (() => {
            const S = 0.65;
            return [
                createCoin(500 * S, 520),
                createCoin(1200 * S, 490),
                createCoin(2450 * S, 420),
                createCoin(3800 * S, 410),
                createCoin(5000 * S, 380),
            ];
        })(),
        questionBlocks: (() => {
            const S = 0.65;
            return [
                createQB(950 * S, 470, 'mushroom'),
                createQB(2300 * S, 440, 'coin'),
            ];
        })(),
        enemies: (() => {
            const S = 0.65;
            return [
                createEnemy(1300 * S, 494, 'goomba'),
                createEnemy(3700 * S, 414, 'goomba'),
            ];
        })(),
        movingPlatforms: [
            createMovingPlat(4350, 430, 120, 24, 'platform_easy', 'horizontal', 180, 15),
        ],
        decorations: (() => {
            const S = 0.65;
            return [
                createDeco(500 * S, 500, 'balloon'),
                createDeco(1800 * S, 440, 'bird'),
                createDeco(3500 * S, 400, 'sun'),
                createDeco(5000 * S, 370, 'rainbow'),
            ];
        })(),
        playerStart: { x: 150, y: 520 },
        goal: { x: 4800 * 0.65 + 250 * 0.65, y: 380 },
        timeBonus: 180,
    },

    // ============================================================
    // Level 26: "Sky Gap Run" (Gap-Strecke) - S=0.625
    // 5 gap sections with moving platforms bridging cloud islands.
    // ============================================================
    {
        id: 26, name: "Sky Gap Run", width: 16000, height: 640, biome: 'sky-clouds',
        platforms: (() => {
            const S = 0.625;
            return [
                // Start cloud island
                createPlat(200 * S, 560, 500 * S, 40, 'cloud'),
                createPlat(950 * S, 540, 350 * S, 40, 'cloud'),
                // Gap 1
                ...gapWithPlatforms(S, 1700, 540, 600, 4),
                // Cloud island
                createPlat(2800 * S, 520, 500 * S, 40, 'cloud'),
                createPlat(3700 * S, 500, 350 * S, 40, 'cloud'),
                // Gap 2
                ...gapWithPlatforms(S, 4400, 500, 700, 5),
                // Cloud island
                createPlat(5700 * S, 480, 500 * S, 40, 'cloud'),
                createPlat(6600 * S, 460, 350 * S, 40, 'cloud'),
                // Gap 3
                ...gapWithPlatforms(S, 7300, 460, 800, 5),
                // Cloud island
                createPlat(8700 * S, 440, 500 * S, 40, 'cloud'),
                // Gap 4
                ...gapWithPlatforms(S, 9500, 440, 700, 5),
                // Cloud island
                createPlat(10800 * S, 420, 450 * S, 40, 'cloud'),
                createPlat(11600 * S, 400, 300 * S, 40, 'cloud'),
                // Gap 5
                ...gapWithPlatforms(S, 12200, 400, 800, 5),
                // Goal cloud island
                createPlat(13600 * S, 380, 600 * S, 40, 'cloud'),
            ];
        })(),
        coins: (() => {
            const S = 0.625;
            return [
                createCoin(500 * S, 540),
                createCoin(1900 * S, 480),
                createCoin(3500 * S, 480),
                createCoin(5000 * S, 440),
                createCoin(6600 * S, 440),
                createCoin(8000 * S, 400),
                createCoin(10500 * S, 400),
                createCoin(13800 * S, 360),
            ];
        })(),
        questionBlocks: (() => {
            const S = 0.625;
            return [
                createQB(950 * S, 500, 'mushroom'),
                createQB(3700 * S, 460, 'flower'),
                createQB(6600 * S, 420, 'star'),
                createQB(11600 * S, 360, 'mushroom'),
            ];
        })(),
        enemies: (() => {
            const S = 0.625;
            return [
                createEnemy(1300 * S, 524, 'goomba'),
                createEnemy(3000 * S, 504, 'ufo'),
                createEnemy(5300 * S, 464, 'goomba'),
                createEnemy(7500 * S, 424, 'ufo'),
                createEnemy(10500 * S, 404, 'spiny'),
                createEnemy(13000 * S, 364, 'goomba'),
            ];
        })(),
        movingPlatforms: [
            createMovingPlat(4050, 500, 120, 24, 'platform_easy', 'vertical', 160, 15),
            createMovingPlat(9350, 440, 120, 24, 'platform_medium', 'horizontal', 200, 18),
            createMovingPlat(11900, 420, 120, 24, 'platform_medium', 'vertical', 150, 16),
        ],
        decorations: (() => {
            const S = 0.625;
            return [
                createDeco(600 * S, 520, 'balloon'),
                createDeco(2500 * S, 480, 'bird'),
                createDeco(4500 * S, 460, 'sun'),
                createDeco(7000 * S, 440, 'rainbow'),
                createDeco(10000 * S, 400, 'balloon'),
                createDeco(12500 * S, 360, 'bird'),
            ];
        })(),
        playerStart: { x: 150, y: 540 },
        goal: { x: 13600 * 0.625 + 300 * 0.625, y: 360 },
        timeBonus: 160,
    },

    // ============================================================
    // Level 27: "Pipe Labyrinth" (Röhren-Labyrinth) - S=0.6
    // 6 pipe sections with piranhas between cloud platforms.
    // ============================================================
    {
        id: 27, name: "Pipe Labyrinth", width: 20000, height: 660, biome: 'sky-clouds',
        platforms: (() => {
            const S = 0.6;
            return [
                // Start cloud
                createPlat(200 * S, 580, 500 * S, 40, 'cloud'),
                createPlat(1000 * S, 560, 350 * S, 40, 'cloud'),
                // Pipe section 1 (4 pipes)
                ...pipeSection(S, 1700, 570, 4),
                // Cloud island
                createPlat(3800 * S, 560, 500 * S, 40, 'cloud'),
                createPlat(4800 * S, 540, 350 * S, 40, 'cloud'),
                // Pipe section 2 (5 pipes)
                ...pipeSection(S, 5500, 550, 5),
                // Cloud island
                createPlat(8200 * S, 540, 500 * S, 40, 'cloud'),
                createPlat(9200 * S, 520, 350 * S, 40, 'cloud'),
                // Pipe section 3 (5 pipes)
                ...pipeSection(S, 9900, 530, 5),
                // Cloud island
                createPlat(12600 * S, 520, 500 * S, 40, 'cloud'),
                // Pipe section 4 (6 pipes)
                ...pipeSection(S, 13400, 530, 6),
                // Cloud island
                createPlat(16500 * S, 510, 450 * S, 40, 'cloud'),
                // Pipe section 5 (5 pipes)
                ...pipeSection(S, 17200, 520, 5),
                // Cloud island
                createPlat(19900 * S, 500, 450 * S, 40, 'cloud'),
                // Pipe section 6 (4 pipes)
                ...pipeSection(S, 20500, 510, 4),
                // Goal cloud island
                createPlat(22600 * S, 490, 600 * S, 40, 'cloud'),
            ];
        })(),
        coins: (() => {
            const S = 0.6;
            return [
                createCoin(500 * S, 560),
                createCoin(2200 * S, 530),
                createCoin(4300 * S, 540),
                createCoin(6500 * S, 520),
                createCoin(8700 * S, 520),
                createCoin(10800 * S, 500),
                createCoin(15100 * S, 500),
                createCoin(19200 * S, 480),
                createCoin(23000 * S, 470),
            ];
        })(),
        questionBlocks: (() => {
            const S = 0.6;
            return [
                createQB(1000 * S, 520, 'mushroom'),
                createQB(4800 * S, 500, 'flower'),
                createQB(9200 * S, 480, 'star'),
                createQB(16500 * S, 470, 'mushroom'),
            ];
        })(),
        enemies: (() => {
            const S = 0.6;
            return [
                createEnemy(1200 * S, 544, 'goomba'),
                createEnemy(2000 * S, 560, 'piranha'),
                createEnemy(2350 * S, 560, 'piranha'),
                createEnemy(2700 * S, 560, 'piranha'),
                createEnemy(5800 * S, 540, 'piranha'),
                createEnemy(6150 * S, 540, 'piranha'),
                createEnemy(6500 * S, 540, 'piranha'),
                createEnemy(6850 * S, 540, 'piranha'),
                createEnemy(7200 * S, 540, 'piranha'),
                createEnemy(10200 * S, 520, 'piranha'),
                createEnemy(10550 * S, 520, 'piranha'),
                createEnemy(13700 * S, 520, 'piranha'),
                createEnemy(14050 * S, 520, 'piranha'),
                createEnemy(17500 * S, 510, 'piranha'),
                createEnemy(17850 * S, 510, 'piranha'),
                createEnemy(20800 * S, 500, 'piranha'),
                createEnemy(21150 * S, 500, 'piranha'),
                createEnemy(21500 * S, 500, 'piranha'),
            ];
        })(),
        movingPlatforms: [
            createMovingPlat(16100, 520, 120, 24, 'platform_easy', 'horizontal', 200, 15),
            createMovingPlat(19600, 510, 120, 24, 'platform_medium', 'vertical', 140, 16),
            createMovingPlat(22200, 500, 120, 24, 'platform_medium', 'horizontal', 180, 14),
        ],
        decorations: (() => {
            const S = 0.6;
            return [
                createDeco(600 * S, 550, 'balloon'),
                createDeco(3500 * S, 530, 'bird'),
                createDeco(7000 * S, 510, 'sun'),
                createDeco(11000 * S, 490, 'rainbow'),
                createDeco(15500 * S, 480, 'balloon'),
                createDeco(21000 * S, 470, 'bird'),
            ];
        })(),
        playerStart: { x: 150, y: 560 },
        goal: { x: 22600 * 0.6 + 300 * 0.6, y: 470 },
        timeBonus: 140,
    },

    // ============================================================
    // Level 28: "Vertical Ascent" (Vertikal-Kletterer) - S=0.556
    // 3 verticalClimb sections among cloud platforms.
    // ============================================================
    {
        id: 28, name: "Vertical Ascent", width: 16000, height: 680, biome: 'sky-clouds',
        platforms: (() => {
            const S = 0.556;
            return [
                // Start cloud island
                createPlat(200 * S, 600, 500 * S, 40, 'cloud'),
                createPlat(1000 * S, 580, 350 * S, 40, 'cloud'),
                // Vertical Climb 1
                ...verticalClimb(S, 1800, 590),
                // Cloud island (landing after climb)
                createPlat(4200 * S, 560, 500 * S, 40, 'cloud'),
                createPlat(5200 * S, 540, 350 * S, 40, 'cloud'),
                // Vertical Climb 2
                ...verticalClimb(S, 6000, 560),
                // Cloud island
                createPlat(8400 * S, 530, 500 * S, 40, 'cloud'),
                createPlat(9400 * S, 510, 350 * S, 40, 'cloud'),
                // Vertical Climb 3
                ...verticalClimb(S, 10200, 520),
                // Cloud island
                createPlat(12600 * S, 490, 450 * S, 40, 'cloud'),
                // Small gap with moving platform
                createPlat(13600 * S, 470, 300 * S, 40, 'cloud'),
                // Vertical Climb 4
                ...verticalClimb(S, 14200, 480),
                // Goal cloud island
                createPlat(16600 * S, 450, 600 * S, 40, 'cloud'),
            ];
        })(),
        coins: (() => {
            const S = 0.556;
            return [
                createCoin(500 * S, 580),
                createCoin(2500 * S, 520),
                createCoin(4600 * S, 540),
                createCoin(6800 * S, 490),
                createCoin(8800 * S, 510),
                createCoin(11000 * S, 460),
                createCoin(14500 * S, 430),
                createCoin(16800 * S, 430),
            ];
        })(),
        questionBlocks: (() => {
            const S = 0.556;
            return [
                createQB(1000 * S, 540, 'mushroom'),
                createQB(5200 * S, 500, 'flower'),
                createQB(9400 * S, 470, 'star'),
                createQB(13600 * S, 430, 'mushroom'),
            ];
        })(),
        enemies: (() => {
            const S = 0.556;
            return [
                createEnemy(1200 * S, 564, 'goomba'),
                createEnemy(3500 * S, 520, 'ufo'),
                createEnemy(7300 * S, 520, 'goomba'),
                createEnemy(10000 * S, 500, 'ufo'),
                createEnemy(13200 * S, 474, 'spiny'),
                createEnemy(15300 * S, 450, 'goomba'),
            ];
        })(),
        movingPlatforms: [
            createMovingPlat(5600, 540, 120, 24, 'platform_medium', 'horizontal', 180, 15),
            createMovingPlat(9800, 510, 120, 24, 'platform_medium', 'vertical', 140, 16),
            createMovingPlat(13850, 470, 120, 24, 'platform_easy', 'horizontal', 160, 14),
            createMovingPlat(16200, 460, 120, 24, 'platform_medium', 'vertical', 120, 15),
        ],
        decorations: (() => {
            const S = 0.556;
            return [
                createDeco(600 * S, 570, 'balloon'),
                createDeco(3200 * S, 540, 'bird'),
                createDeco(6000 * S, 510, 'sun'),
                createDeco(9000 * S, 480, 'rainbow'),
                createDeco(12000 * S, 460, 'balloon'),
                createDeco(15000 * S, 430, 'bird'),
            ];
        })(),
        playerStart: { x: 150, y: 580 },
        goal: { x: 16600 * 0.556 + 300 * 0.556, y: 430 },
        timeBonus: 140,
    },

    // ============================================================
    // Level 29: "Floating Foes" (Gegner-Horde) - S=0.5
    // 15-20 floating-type enemies across cloud platforms.
    // ============================================================
    {
        id: 29, name: "Floating Foes", width: 20000, height: 680, biome: 'sky-clouds',
        platforms: (() => {
            const S = 0.5;
            return [
                createPlat(200 * S, 600, 600 * S, 40, 'cloud'),
                createPlat(1200 * S, 570, 450 * S, 40, 'cloud'),
                createPlat(2200 * S, 540, 350 * S, 40, 'cloud'),
                ...gapWithPlatforms(S, 3000, 540, 800, 4),
                createPlat(4300 * S, 520, 500 * S, 40, 'cloud'),
                createPlat(5300 * S, 500, 350 * S, 40, 'cloud'),
                createPlat(6300 * S, 480, 300 * S, 40, 'cloud'),
                ...gapWithPlatforms(S, 7100, 480, 900, 5),
                createPlat(8600 * S, 460, 500 * S, 40, 'cloud'),
                createPlat(9600 * S, 440, 400 * S, 40, 'cloud'),
                createPlat(10600 * S, 420, 350 * S, 40, 'cloud'),
                ...gapWithPlatforms(S, 11300, 420, 900, 5),
                createPlat(12900 * S, 400, 500 * S, 40, 'cloud'),
                createPlat(13900 * S, 380, 400 * S, 40, 'cloud'),
                createPlat(14900 * S, 360, 350 * S, 40, 'cloud'),
                createPlat(15900 * S, 340, 600 * S, 40, 'cloud'),
            ];
        })(),
        coins: (() => {
            const S = 0.5;
            return [
                createCoin(500 * S, 580),
                createCoin(1600 * S, 550),
                createCoin(3400 * S, 480),
                createCoin(5300 * S, 480),
                createCoin(6600 * S, 460),
                createCoin(7800 * S, 420),
                createCoin(9600 * S, 420),
                createCoin(12000 * S, 380),
                createCoin(14500 * S, 360),
                createCoin(16100 * S, 320),
            ];
        })(),
        questionBlocks: (() => {
            const S = 0.5;
            return [
                createQB(1200 * S, 530, 'mushroom'),
                createQB(5300 * S, 460, 'flower'),
                createQB(9600 * S, 400, 'star'),
                createQB(13900 * S, 340, 'mushroom'),
            ];
        })(),
        enemies: (() => {
            const S = 0.5;
            return [
                // 18 floating-typed enemies: lakitu, bullet_bill, ufo, boo
                createEnemy(800 * S, 540, 'lakitu'),
                createEnemy(1400 * S, 500, 'ufo'),
                createEnemy(1900 * S, 520, 'bullet_bill'),
                createEnemy(2500 * S, 480, 'boo'),
                createEnemy(3200 * S, 470, 'lakitu'),
                createEnemy(3800 * S, 440, 'ufo'),
                createEnemy(4800 * S, 450, 'bullet_bill'),
                createEnemy(5500 * S, 430, 'boo'),
                createEnemy(6100 * S, 410, 'lakitu'),
                createEnemy(7000 * S, 410, 'ufo'),
                createEnemy(7500 * S, 420, 'bullet_bill'),
                createEnemy(8200 * S, 390, 'boo'),
                createEnemy(9000 * S, 390, 'lakitu'),
                createEnemy(9900 * S, 370, 'ufo'),
                createEnemy(11000 * S, 350, 'bullet_bill'),
                createEnemy(12000 * S, 340, 'boo'),
                createEnemy(13500 * S, 330, 'lakitu'),
                createEnemy(15200 * S, 290, 'ufo'),
            ];
        })(),
        movingPlatforms: [
            createMovingPlat(5800, 500, 120, 24, 'platform_medium', 'vertical', 140, 16),
            createMovingPlat(10200, 440, 120, 24, 'platform_medium', 'horizontal', 200, 14),
            createMovingPlat(15500, 370, 120, 24, 'platform_easy', 'vertical', 130, 15),
        ],
        decorations: (() => {
            const S = 0.5;
            return [
                createDeco(700 * S, 560, 'balloon'),
                createDeco(2800 * S, 500, 'bird'),
                createDeco(5600 * S, 460, 'sun'),
                createDeco(8300 * S, 420, 'rainbow'),
                createDeco(11500 * S, 380, 'balloon'),
                createDeco(15000 * S, 320, 'bird'),
            ];
        })(),
        playerStart: { x: 150, y: 580 },
        goal: { x: 15900 * 0.5 + 300 * 0.5, y: 320 },
        timeBonus: 140,
    },

    // ============================================================
    // Level 30: "Cloud Islands Finale" (Wolken-Inseln-Finale) - S=0.45
    // Scattered cloud platforms at varied heights with wind feel.
    // ============================================================
    {
        id: 30, name: "Cloud Islands Finale", width: 20000, height: 700, biome: 'sky-clouds',
        platforms: (() => {
            const S = 0.45;
            let plats: ReturnType<typeof createPlat>[] = [];

            // Start island cluster (low, safe)
            plats.push(createPlat(300 * S, 620, 550 * S, 40, 'cloud'));
            plats.push(createPlat(1200 * S, 600, 300 * S, 40, 'cloud'));

            // Mid-height islands, staggered
            plats.push(createPlat(1900 * S, 570, 220 * S, 28, 'platform_easy'));
            plats.push(createPlat(2500 * S, 550, 250 * S, 40, 'cloud'));
            plats.push(createPlat(3400 * S, 520, 280 * S, 28, 'platform_medium'));

            // Higher islands
            plats.push(createPlat(4300 * S, 490, 300 * S, 40, 'cloud'));
            plats.push(createPlat(5200 * S, 520, 220 * S, 28, 'platform_easy'));
            plats.push(createPlat(6000 * S, 500, 260 * S, 40, 'cloud'));
            plats.push(createPlat(6900 * S, 470, 240 * S, 28, 'platform_medium'));

            // Peak islands (highest)
            plats.push(createPlat(7700 * S, 440, 320 * S, 40, 'cloud'));
            plats.push(createPlat(8600 * S, 470, 200 * S, 28, 'platform_hard'));

            // Descending staircase islands
            plats.push(createPlat(9500 * S, 500, 280 * S, 40, 'cloud'));
            plats.push(createPlat(10400 * S, 470, 240 * S, 28, 'platform_medium'));
            plats.push(createPlat(11300 * S, 440, 300 * S, 40, 'cloud'));
            plats.push(createPlat(12200 * S, 480, 260 * S, 28, 'platform_easy'));
            plats.push(createPlat(13100 * S, 460, 280 * S, 40, 'cloud'));

            // Tight scattered section
            plats.push(createPlat(14300 * S, 430, 200 * S, 40, 'cloud'));
            plats.push(createPlat(15000 * S, 460, 180 * S, 28, 'platform_medium'));
            plats.push(createPlat(15800 * S, 420, 220 * S, 40, 'cloud'));
            plats.push(createPlat(16600 * S, 390, 250 * S, 28, 'platform_hard'));
            plats.push(createPlat(17500 * S, 410, 240 * S, 40, 'cloud'));
            plats.push(createPlat(18300 * S, 380, 260 * S, 28, 'platform_hard'));
            plats.push(createPlat(19100 * S, 400, 280 * S, 40, 'cloud'));

            // Final island cluster — grand goal
            plats.push(createPlat(20000 * S, 370, 350 * S, 40, 'cloud'));
            plats.push(createPlat(20800 * S, 340, 300 * S, 40, 'cloud'));
            plats.push(createPlat(22000 * S, 350, 700 * S, 40, 'cloud'));

            return plats;
        })(),
        coins: (() => {
            const S = 0.45;
            return [
                createCoin(700 * S, 600),
                createCoin(1800 * S, 550),
                createCoin(2700 * S, 530),
                createCoin(3800 * S, 500),
                createCoin(4900 * S, 470),
                createCoin(6100 * S, 480),
                createCoin(7300 * S, 420),
                createCoin(8600 * S, 450),
                createCoin(10000 * S, 480),
                createCoin(11500 * S, 420),
                createCoin(12800 * S, 440),
                createCoin(14800 * S, 440),
                createCoin(16300 * S, 370),
                createCoin(18500 * S, 360),
                createCoin(21000 * S, 320),
            ];
        })(),
        questionBlocks: (() => {
            const S = 0.45;
            return [
                createQB(1200 * S, 560, 'mushroom'),
                createQB(4300 * S, 450, 'flower'),
                createQB(7700 * S, 400, 'star'),
                createQB(11300 * S, 400, 'mushroom'),
                createQB(16600 * S, 350, 'flower'),
            ];
        })(),
        enemies: (() => {
            const S = 0.45;
            return [
                createEnemy(1600 * S, 584, 'goomba'),
                createEnemy(2900 * S, 534, 'ufo'),
                createEnemy(4500 * S, 474, 'boo'),
                createEnemy(6500 * S, 484, 'lakitu'),
                createEnemy(8200 * S, 454, 'ufo'),
                createEnemy(10000 * S, 484, 'bullet_bill'),
                createEnemy(12600 * S, 444, 'goomba'),
                createEnemy(14600 * S, 414, 'boo'),
                createEnemy(16200 * S, 374, 'ufo'),
                createEnemy(18000 * S, 364, 'lakitu'),
                createEnemy(19500 * S, 354, 'bullet_bill'),
            ];
        })(),
        movingPlatforms: [
            createMovingPlat(3700, 530, 120, 24, 'platform_medium', 'horizontal', 220, 14),
            createMovingPlat(9000, 470, 120, 24, 'platform_medium', 'vertical', 160, 15),
            createMovingPlat(14400, 440, 120, 24, 'platform_medium', 'horizontal', 200, 14),
            createMovingPlat(17800, 410, 120, 24, 'platform_easy', 'vertical', 150, 16),
            createMovingPlat(21500, 370, 120, 24, 'platform_medium', 'horizontal', 250, 13),
        ],
        decorations: (() => {
            const S = 0.45;
            return [
                createDeco(600 * S, 590, 'balloon'),
                createDeco(2800 * S, 530, 'bird'),
                createDeco(5000 * S, 480, 'sun'),
                createDeco(8000 * S, 430, 'rainbow'),
                createDeco(10500 * S, 450, 'balloon'),
                createDeco(13000 * S, 430, 'bird'),
                createDeco(16000 * S, 400, 'sun'),
                createDeco(19000 * S, 370, 'rainbow'),
                createDeco(21000 * S, 330, 'balloon'),
            ];
        })(),
        playerStart: { x: 200, y: 600 },
        goal: { x: 22000 * 0.45 + 350 * 0.45, y: 330 },
        timeBonus: 120,
    },
];

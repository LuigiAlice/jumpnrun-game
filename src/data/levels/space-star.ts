// Space Star World - 6 Levels (IDs 79-84)
// Distinct structures: Tutorial, Gap-Strecke, Röhren-Labyrinth, Vertikal-Kletterer, Gegner-Horde, Asteroiden-Feld

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat, gapWithPlatforms, pipeSection, verticalClimb } from './helpers';

export const SPACE_STAR_LEVELS: LevelData[] = [
    // ============================================================
    // LEVEL 79: Tutorial — Simple space station path, one gap, few enemies
    // S=0.556
    // ============================================================
    {
        id: 79,
        name: "Orbital Station Alpha",
        width: 6000,
        height: 650,
        biome: 'space-star',
        platforms: (() => {
            const S = 0.556;
            const plats: any[] = [];
            // Nearly continuous ground, one gap bridged by moving platform
            plats.push(createPlat(0, 600, 2000 * S, 40, 'space'));
            plats.push(createPlat(1400 * S, 600, 1200 * S, 40, 'space'));
            // Gap section — moving platform bridges the gap
            plats.push(createPlat(3000 * S, 600, 1000 * S, 40, 'space'));
            plats.push(createPlat(4200 * S, 600, 1800 * S, 40, 'space'));
            plats.push(createPlat(6200 * S, 600, 1200 * S, 40, 'space'));
            plats.push(createPlat(7600 * S, 600, 1500 * S, 40, 'space'));
            // Elevated exploration platforms
            plats.push(createPlat(1800 * S, 500, 150, 28, 'metal'));
            plats.push(createPlat(2100 * S, 420, 120, 28, 'platform_easy'));
            plats.push(createPlat(5000 * S, 500, 150, 28, 'metal'));
            plats.push(createPlat(5300 * S, 420, 120, 28, 'platform_medium'));
            plats.push(createPlat(5600 * S, 340, 100, 28, 'platform_hard'));
            return plats;
        })(),
        coins: (() => {
            const S = 0.556;
            const coins: any[] = [];
            for (let x = 400 * S; x < 1300 * S; x += 120 * S) coins.push(createCoin(x, 550));
            for (let x = 3100 * S; x < 3900 * S; x += 120 * S) coins.push(createCoin(x, 550));
            for (let x = 4300 * S; x < 5900 * S; x += 120 * S) coins.push(createCoin(x, 550));
            for (let x = 6300 * S; x < 7400 * S; x += 120 * S) coins.push(createCoin(x, 550));
            coins.push(createCoin(1850 * S, 440), createCoin(2150 * S, 360));
            coins.push(createCoin(5050 * S, 440), createCoin(5350 * S, 360));
            coins.push(createCoin(5650 * S, 280));
            return coins;
        })(),
        questionBlocks: (() => {
            const S = 0.556;
            return [
                createQB(2150 * S, 350, 'mushroom'),
                createQB(5350 * S, 350, 'star'),
                createQB(5650 * S, 270, 'flower'),
            ];
        })(),
        enemies: (() => {
            const S = 0.556;
            return [
                createEnemy(800 * S, 560, 'goomba'),
                createEnemy(3500 * S, 560, 'ufo'),
                createEnemy(6000 * S, 560, 'goomba'),
            ];
        })(),
        decorations: (() => {
            const S = 0.556;
            return [
                createDeco(500 * S, 550, 'planet'),
                createDeco(2500 * S, 550, 'rocket'),
                createDeco(4800 * S, 550, 'satellite'),
                createDeco(7000 * S, 550, 'asteroid'),
            ];
        })(),
        playerStart: { x: 150, y: 490 },
        goal: { x: 4500, y: 578 },
        timeBonus: 100,
        movingPlatforms: [
            createMovingPlat(1450, 520, 120, 24, 'platform_medium', 'horizontal', 400, 20),
        ],
    },

    // ============================================================
    // LEVEL 80: Gap-Strecke — 4-5 gap sections with moving platforms
    // S=0.526
    // ============================================================
    {
        id: 80,
        name: "Asteroid Belt Crossing",
        width: 12000,
        height: 680,
        biome: 'space-star',
        platforms: (() => {
            const S = 0.526;
            const plats: any[] = [];
            // Ground sections alternating with gaps
            // Section 0: start
            plats.push(createPlat(0, 620, 1800 * S, 40, 'space'));
            // Gap 1 — moving plat + stepping plats
            plats.push(createPlat(1200 * S, 620, 800 * S, 40, 'space'));
            // Gap 2
            plats.push(createPlat(2400 * S, 620, 1000 * S, 40, 'space'));
            // Gap 3
            plats.push(createPlat(3800 * S, 620, 900 * S, 40, 'space'));
            // Gap 4
            plats.push(createPlat(5000 * S, 620, 1200 * S, 40, 'space'));
            // Gap 5
            plats.push(createPlat(6600 * S, 620, 800 * S, 40, 'space'));
            plats.push(createPlat(7800 * S, 620, 1400 * S, 40, 'space'));
            // Final section
            plats.push(createPlat(9600 * S, 620, 1600 * S, 40, 'space'));
            // Stepping platforms in gaps
            plats.push(...gapWithPlatforms(S, 1000, 620, 200, 3));
            plats.push(...gapWithPlatforms(S, 2100, 620, 300, 3));
            plats.push(...gapWithPlatforms(S, 3400, 620, 400, 4));
            plats.push(...gapWithPlatforms(S, 4800, 620, 200, 3));
            plats.push(...gapWithPlatforms(S, 6400, 620, 200, 3));
            // Elevated platforms
            plats.push(createPlat(1600 * S, 520, 120, 28, 'metal'));
            plats.push(createPlat(3000 * S, 500, 120, 28, 'platform_easy'));
            plats.push(createPlat(4400 * S, 520, 120, 28, 'metal'));
            plats.push(createPlat(5800 * S, 500, 120, 28, 'platform_medium'));
            plats.push(createPlat(7200 * S, 520, 120, 28, 'metal'));
            plats.push(createPlat(9000 * S, 500, 120, 28, 'platform_hard'));
            return plats;
        })(),
        coins: (() => {
            const S = 0.526;
            const coins: any[] = [];
            for (let x = 300 * S; x < 1100 * S; x += 150 * S) coins.push(createCoin(x, 570));
            for (let x = 2500 * S; x < 3700 * S; x += 150 * S) coins.push(createCoin(x, 570));
            for (let x = 5100 * S; x < 6500 * S; x += 150 * S) coins.push(createCoin(x, 570));
            for (let x = 7900 * S; x < 9500 * S; x += 150 * S) coins.push(createCoin(x, 570));
            for (let x = 9700 * S; x < 11100 * S; x += 150 * S) coins.push(createCoin(x, 570));
            coins.push(createCoin(1650 * S, 460), createCoin(3050 * S, 440));
            coins.push(createCoin(4450 * S, 460), createCoin(5850 * S, 440));
            coins.push(createCoin(7250 * S, 460), createCoin(9050 * S, 440));
            return coins;
        })(),
        questionBlocks: (() => {
            const S = 0.526;
            return [
                createQB(1650 * S, 450, 'mushroom'),
                createQB(3050 * S, 430, 'star'),
                createQB(5850 * S, 430, 'flower'),
                createQB(9050 * S, 430, 'mushroom'),
            ];
        })(),
        enemies: (() => {
            const S = 0.526;
            return [
                createEnemy(600 * S, 580, 'ufo'),
                createEnemy(2000 * S, 580, 'robot'),
                createEnemy(2900 * S, 580, 'ufo'),
                createEnemy(4200 * S, 580, 'fireball'),
                createEnemy(5500 * S, 580, 'robot'),
                createEnemy(7000 * S, 580, 'ufo'),
                createEnemy(8500 * S, 580, 'robot'),
                createEnemy(10200 * S, 580, 'fireball'),
            ];
        })(),
        decorations: (() => {
            const S = 0.526;
            return [
                createDeco(400 * S, 570, 'planet'),
                createDeco(2000 * S, 570, 'rocket'),
                createDeco(4000 * S, 570, 'asteroid'),
                createDeco(6000 * S, 570, 'satellite'),
                createDeco(8000 * S, 570, 'planet'),
                createDeco(10500 * S, 570, 'rocket'),
            ];
        })(),
        playerStart: { x: 150, y: 510 },
        goal: { x: 5300, y: 598 },
        timeBonus: 150,
        movingPlatforms: [
            createMovingPlat(999, 500, 120, 24, 'platform_medium', 'horizontal', 350, 22),
            createMovingPlat(2420, 480, 100, 24, 'platform_medium', 'vertical', 180, 20),
        ],
    },

    // ============================================================
    // LEVEL 81: Röhren-Labyrinth — 5-8 pipe sections with piranhas (space theme)
    // S=0.5
    // ============================================================
    {
        id: 81,
        name: "Nebula Core Expedition",
        width: 12000,
        height: 700,
        biome: 'space-star',
        platforms: (() => {
            const S = 0.5;
            const plats: any[] = [];
            // Ground with pipe sections interspersed
            plats.push(createPlat(0, 640, 1600 * S, 40, 'space'));
            // Pipe section 1
            plats.push(...pipeSection(S, 700, 640, 2));
            // Ground between
            plats.push(createPlat(1800 * S, 640, 1000 * S, 40, 'space'));
            // Pipe section 2
            plats.push(...pipeSection(S, 2500, 640, 3));
            // Ground between
            plats.push(createPlat(4200 * S, 640, 800 * S, 40, 'space'));
            // Pipe section 3
            plats.push(...pipeSection(S, 4800, 640, 2));
            // Ground between
            plats.push(createPlat(5900 * S, 640, 1000 * S, 40, 'space'));
            // Pipe section 4
            plats.push(...pipeSection(S, 6700, 640, 3));
            // Ground between
            plats.push(createPlat(8400 * S, 640, 800 * S, 40, 'space'));
            // Pipe section 5
            plats.push(...pipeSection(S, 9000, 640, 2));
            // Ground between
            plats.push(createPlat(10100 * S, 640, 1000 * S, 40, 'space'));
            // Pipe section 6
            plats.push(...pipeSection(S, 10900, 640, 2));
            // End ground
            plats.push(createPlat(12000 * S, 640, 1500 * S, 40, 'space'));
            // Elevated metal platforms
            plats.push(createPlat(1000 * S, 540, 120, 28, 'metal'));
            plats.push(createPlat(3300 * S, 540, 120, 28, 'metal'));
            plats.push(createPlat(5100 * S, 540, 120, 28, 'metal'));
            plats.push(createPlat(7500 * S, 540, 120, 28, 'metal'));
            plats.push(createPlat(9200 * S, 540, 120, 28, 'metal'));
            plats.push(createPlat(11300 * S, 540, 120, 28, 'metal'));
            return plats;
        })(),
        coins: (() => {
            const S = 0.5;
            const coins: any[] = [];
            for (let x = 300 * S; x < 700 * S; x += 120 * S) coins.push(createCoin(x, 590));
            for (let x = 1900 * S; x < 2500 * S; x += 120 * S) coins.push(createCoin(x, 590));
            for (let x = 4300 * S; x < 4800 * S; x += 120 * S) coins.push(createCoin(x, 590));
            for (let x = 6000 * S; x < 6700 * S; x += 120 * S) coins.push(createCoin(x, 590));
            for (let x = 8500 * S; x < 9000 * S; x += 120 * S) coins.push(createCoin(x, 590));
            for (let x = 10200 * S; x < 10900 * S; x += 120 * S) coins.push(createCoin(x, 590));
            for (let x = 12100 * S; x < 12800 * S; x += 120 * S) coins.push(createCoin(x, 590));
            coins.push(createCoin(1050 * S, 480), createCoin(3350 * S, 480));
            coins.push(createCoin(5150 * S, 480), createCoin(7550 * S, 480));
            coins.push(createCoin(9250 * S, 480), createCoin(11350 * S, 480));
            return coins;
        })(),
        questionBlocks: (() => {
            const S = 0.5;
            return [
                createQB(1050 * S, 470, 'mushroom'),
                createQB(3350 * S, 470, 'star'),
                createQB(5150 * S, 470, 'flower'),
                createQB(7550 * S, 470, 'mushroom'),
                createQB(9250 * S, 470, 'star'),
                createQB(11350 * S, 470, 'flower'),
            ];
        })(),
        enemies: (() => {
            const S = 0.5;
            return [
                createEnemy(500 * S, 600, 'ufo'),
                createEnemy(1300 * S, 600, 'piranha'),
                createEnemy(2200 * S, 600, 'robot'),
                createEnemy(3000 * S, 600, 'piranha'),
                createEnemy(3800 * S, 600, 'ufo'),
                createEnemy(5500 * S, 600, 'piranha'),
                createEnemy(6400 * S, 600, 'fireball'),
                createEnemy(7200 * S, 600, 'piranha'),
                createEnemy(8800 * S, 600, 'robot'),
                createEnemy(9600 * S, 600, 'piranha'),
                createEnemy(10500 * S, 600, 'fireball'),
                createEnemy(11400 * S, 600, 'piranha'),
            ];
        })(),
        decorations: (() => {
            const S = 0.5;
            return [
                createDeco(400 * S, 590, 'planet'),
                createDeco(2800 * S, 590, 'rocket'),
                createDeco(5600 * S, 590, 'asteroid'),
                createDeco(8000 * S, 590, 'satellite'),
                createDeco(10600 * S, 590, 'planet'),
                createDeco(12600 * S, 590, 'rocket'),
            ];
        })(),
        playerStart: { x: 150, y: 530 },
        goal: { x: 6200, y: 618 },
        timeBonus: 170,
        movingPlatforms: [
            createMovingPlat(800, 500, 120, 24, 'platform_medium', 'horizontal', 300, 20),
            createMovingPlat(4100, 460, 100, 24, 'platform_medium', 'vertical', 160, 22),
        ],
    },

    // ============================================================
    // LEVEL 82: Vertikal-Kletterer — 3-4 verticalClimb sections in zero-G
    // S=0.476
    // ============================================================
    {
        id: 82,
        name: "Void Passage Alpha",
        width: 11000,
        height: 700,
        biome: 'space-star',
        platforms: (() => {
            const S = 0.476;
            const plats: any[] = [];
            // Start ground
            plats.push(createPlat(0, 630, 1000 * S, 40, 'space'));
            // Bridge to climb 1
            plats.push(createPlat(800 * S, 580, 120, 28, 'platform_easy'));
            // Vertical climb 1
            plats.push(...verticalClimb(S, 1100, 630, 'space'));
            // Ground after climb 1
            plats.push(createPlat(3200 * S, 630, 700 * S, 40, 'space'));
            // Vertical climb 2
            plats.push(...verticalClimb(S, 4000, 630, 'space'));
            // Ground after climb 2
            plats.push(createPlat(6100 * S, 630, 800 * S, 40, 'space'));
            // Vertical climb 3
            plats.push(...verticalClimb(S, 7000, 630, 'space'));
            // Ground after climb 3
            plats.push(createPlat(9100 * S, 630, 700 * S, 40, 'space'));
            // Vertical climb 4
            plats.push(...verticalClimb(S, 10000, 630, 'space'));
            // Final ground to goal
            plats.push(createPlat(12100 * S, 630, 2000 * S, 40, 'space'));
            // Scattered floating platforms for zero-G feel
            plats.push(createPlat(500 * S, 520, 100, 28, 'metal'));
            plats.push(createPlat(1400 * S, 300, 100, 28, 'platform_hard'));
            plats.push(createPlat(5000 * S, 300, 100, 28, 'platform_hard'));
            plats.push(createPlat(8000 * S, 300, 100, 28, 'platform_hard'));
            plats.push(createPlat(11000 * S, 300, 100, 28, 'platform_hard'));
            return plats;
        })(),
        coins: (() => {
            const S = 0.476;
            const coins: any[] = [];
            for (let x = 200 * S; x < 700 * S; x += 120 * S) coins.push(createCoin(x, 580));
            for (let x = 3300 * S; x < 3900 * S; x += 120 * S) coins.push(createCoin(x, 580));
            for (let x = 6200 * S; x < 6900 * S; x += 120 * S) coins.push(createCoin(x, 580));
            for (let x = 9200 * S; x < 9900 * S; x += 120 * S) coins.push(createCoin(x, 580));
            for (let x = 12200 * S; x < 14000 * S; x += 120 * S) coins.push(createCoin(x, 580));
            coins.push(createCoin(550 * S, 460), createCoin(1450 * S, 240));
            coins.push(createCoin(5050 * S, 240), createCoin(8050 * S, 240));
            coins.push(createCoin(11050 * S, 240));
            return coins;
        })(),
        questionBlocks: (() => {
            const S = 0.476;
            return [
                createQB(550 * S, 450, 'mushroom'),
                createQB(1450 * S, 230, 'star'),
                createQB(5050 * S, 230, 'flower'),
                createQB(8050 * S, 230, 'mushroom'),
                createQB(11050 * S, 230, 'star'),
            ];
        })(),
        enemies: (() => {
            const S = 0.476;
            return [
                createEnemy(400 * S, 590, 'ufo'),
                createEnemy(1800 * S, 550, 'robot'),
                createEnemy(2500 * S, 230, 'ufo'),
                createEnemy(3700 * S, 550, 'fireball'),
                createEnemy(4500 * S, 230, 'robot'),
                createEnemy(5200 * S, 590, 'ufo'),
                createEnemy(6500 * S, 550, 'robot'),
                createEnemy(7500 * S, 230, 'ufo'),
                createEnemy(9500 * S, 550, 'fireball'),
                createEnemy(10500 * S, 230, 'robot'),
                createEnemy(11500 * S, 550, 'ufo'),
                createEnemy(13000 * S, 590, 'robot'),
            ];
        })(),
        decorations: (() => {
            const S = 0.476;
            return [
                createDeco(300 * S, 580, 'planet'),
                createDeco(2500 * S, 580, 'rocket'),
                createDeco(5200 * S, 580, 'asteroid'),
                createDeco(8000 * S, 580, 'satellite'),
                createDeco(11000 * S, 580, 'planet'),
                createDeco(13500 * S, 580, 'rocket'),
            ];
        })(),
        playerStart: { x: 150, y: 520 },
        goal: { x: 6000, y: 608 },
        timeBonus: 190,
        movingPlatforms: [
            createMovingPlat(1428, 480, 100, 24, 'platform_medium', 'vertical', 180, 20),
            createMovingPlat(3237, 480, 120, 24, 'platform_medium', 'horizontal', 300, 22),
        ],
    },

    // ============================================================
    // LEVEL 83: Gegner-Horde — 15-20 enemies (ufos, robots, fireballs)
    // S=0.455
    // ============================================================
    {
        id: 83,
        name: "Gravity Well Station",
        width: 10000,
        height: 700,
        biome: 'space-star',
        platforms: (() => {
            const S = 0.455;
            const plats: any[] = [];
            // Continuous ground with enemy horde
            plats.push(createPlat(0, 640, 2000 * S, 40, 'space'));
            plats.push(createPlat(1300 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(2800 * S, 640, 1400 * S, 40, 'space'));
            plats.push(createPlat(4100 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(5500 * S, 640, 1500 * S, 40, 'space'));
            plats.push(createPlat(6800 * S, 640, 1400 * S, 40, 'space'));
            plats.push(createPlat(8000 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(9400 * S, 640, 1400 * S, 40, 'space'));
            plats.push(createPlat(10600 * S, 640, 2000 * S, 40, 'space'));
            // Safe elevated platforms for dodging
            plats.push(createPlat(700 * S, 540, 120, 28, 'metal'));
            plats.push(createPlat(2000 * S, 540, 120, 28, 'metal'));
            plats.push(createPlat(3500 * S, 540, 120, 28, 'metal'));
            plats.push(createPlat(4800 * S, 540, 120, 28, 'metal'));
            plats.push(createPlat(6200 * S, 540, 120, 28, 'metal'));
            plats.push(createPlat(7400 * S, 540, 120, 28, 'metal'));
            plats.push(createPlat(8800 * S, 540, 120, 28, 'metal'));
            plats.push(createPlat(10000 * S, 540, 120, 28, 'metal'));
            // Higher safe platforms
            plats.push(createPlat(2500 * S, 460, 100, 28, 'platform_easy'));
            plats.push(createPlat(5600 * S, 460, 100, 28, 'platform_medium'));
            plats.push(createPlat(8200 * S, 460, 100, 28, 'platform_hard'));
            return plats;
        })(),
        coins: (() => {
            const S = 0.455;
            const coins: any[] = [];
            for (let x = 300 * S; x < 1200 * S; x += 110 * S) coins.push(createCoin(x, 590));
            for (let x = 2900 * S; x < 4000 * S; x += 110 * S) coins.push(createCoin(x, 590));
            for (let x = 5600 * S; x < 6700 * S; x += 110 * S) coins.push(createCoin(x, 590));
            for (let x = 8100 * S; x < 9300 * S; x += 110 * S) coins.push(createCoin(x, 590));
            for (let x = 10700 * S; x < 12000 * S; x += 110 * S) coins.push(createCoin(x, 590));
            coins.push(createCoin(750 * S, 480), createCoin(2050 * S, 480));
            coins.push(createCoin(2550 * S, 400), createCoin(3550 * S, 480));
            coins.push(createCoin(4850 * S, 480), createCoin(5650 * S, 400));
            coins.push(createCoin(6250 * S, 480), createCoin(7450 * S, 480));
            coins.push(createCoin(8250 * S, 400), createCoin(8850 * S, 480));
            coins.push(createCoin(10050 * S, 480));
            return coins;
        })(),
        questionBlocks: (() => {
            const S = 0.455;
            return [
                createQB(2550 * S, 390, 'mushroom'),
                createQB(5650 * S, 390, 'star'),
                createQB(8250 * S, 390, 'flower'),
            ];
        })(),
        enemies: (() => {
            const S = 0.455;
            return [
                createEnemy(400 * S, 600, 'ufo'),
                createEnemy(600 * S, 600, 'robot'),
                createEnemy(800 * S, 600, 'fireball'),
                createEnemy(1000 * S, 600, 'ufo'),
                createEnemy(1400 * S, 600, 'robot'),
                createEnemy(1600 * S, 600, 'fireball'),
                createEnemy(1800 * S, 600, 'ufo'),
                createEnemy(2200 * S, 600, 'robot'),
                createEnemy(2400 * S, 600, 'fireball'),
                createEnemy(3000 * S, 600, 'ufo'),
                createEnemy(3200 * S, 600, 'robot'),
                createEnemy(3800 * S, 600, 'ufo'),
                createEnemy(4200 * S, 600, 'fireball'),
                createEnemy(4400 * S, 600, 'robot'),
                createEnemy(4600 * S, 600, 'ufo'),
                createEnemy(5200 * S, 600, 'fireball'),
                createEnemy(5800 * S, 600, 'robot'),
                createEnemy(6000 * S, 600, 'ufo'),
                createEnemy(7000 * S, 600, 'fireball'),
                createEnemy(7200 * S, 600, 'robot'),
            ];
        })(),
        decorations: (() => {
            const S = 0.455;
            return [
                createDeco(300 * S, 590, 'planet'),
                createDeco(2300 * S, 590, 'rocket'),
                createDeco(4500 * S, 590, 'asteroid'),
                createDeco(6800 * S, 590, 'satellite'),
                createDeco(9500 * S, 590, 'planet'),
                createDeco(11500 * S, 590, 'rocket'),
            ];
        })(),
        playerStart: { x: 150, y: 530 },
        goal: { x: 5100, y: 618 },
        timeBonus: 200,
        movingPlatforms: [
            createMovingPlat(910, 500, 120, 24, 'platform_medium', 'horizontal', 350, 22),
            createMovingPlat(3321, 480, 100, 24, 'platform_medium', 'vertical', 160, 20),
        ],
    },

    // ============================================================
    // LEVEL 84: Asteroiden-Feld Finale — Scattered space platforms, floating feel
    // S=0.417
    // ============================================================
    {
        id: 84,
        name: "Supernova Finale",
        width: 12000,
        height: 700,
        biome: 'space-star',
        platforms: (() => {
            const S = 0.417;
            const plats: any[] = [];
            // Start ground
            plats.push(createPlat(0, 640, 1800 * S, 40, 'space'));
            // Low scattered section — asteroid field
            plats.push(createPlat(1200 * S, 640, 800 * S, 40, 'space'));
            plats.push(createPlat(2200 * S, 600, 150, 28, 'platform_easy'));
            plats.push(createPlat(2600 * S, 640, 600 * S, 40, 'space'));
            plats.push(createPlat(3400 * S, 580, 150, 28, 'platform_medium'));
            plats.push(createPlat(3800 * S, 640, 900 * S, 40, 'space'));
            plats.push(createPlat(5000 * S, 560, 150, 28, 'platform_hard'));
            // Middle section — floating sensation
            plats.push(createPlat(5400 * S, 640, 700 * S, 40, 'space'));
            plats.push(createPlat(6000 * S, 520, 100, 28, 'platform_easy'));
            plats.push(createPlat(6300 * S, 440, 100, 28, 'platform_medium'));
            plats.push(createPlat(6600 * S, 360, 100, 28, 'platform_hard'));
            plats.push(createPlat(6900 * S, 280, 100, 28, 'platform_hard'));
            plats.push(createPlat(7200 * S, 360, 100, 28, 'platform_medium'));
            plats.push(createPlat(7500 * S, 440, 100, 28, 'platform_easy'));
            // Landing
            plats.push(createPlat(7800 * S, 640, 1000 * S, 40, 'space'));
            // High floating climax
            plats.push(createPlat(9000 * S, 640, 600 * S, 40, 'space'));
            plats.push(createPlat(9600 * S, 520, 100, 28, 'platform_hard'));
            plats.push(createPlat(9900 * S, 420, 100, 28, 'platform_medium'));
            plats.push(createPlat(10200 * S, 320, 100, 28, 'platform_easy'));
            plats.push(createPlat(10500 * S, 220, 100, 28, 'platform_hard'));
            plats.push(createPlat(10800 * S, 320, 100, 28, 'platform_medium'));
            plats.push(createPlat(11100 * S, 420, 100, 28, 'platform_easy'));
            // Final ground
            plats.push(createPlat(11400 * S, 640, 1500 * S, 40, 'space'));
            // Metal scattered decorations
            plats.push(createPlat(1500 * S, 560, 80, 24, 'metal'));
            plats.push(createPlat(4400 * S, 560, 80, 24, 'metal'));
            plats.push(createPlat(8500 * S, 560, 80, 24, 'metal'));
            plats.push(createPlat(9200 * S, 560, 80, 24, 'metal'));
            plats.push(createPlat(10300 * S, 180, 80, 24, 'metal'));
            return plats;
        })(),
        coins: (() => {
            const S = 0.417;
            const coins: any[] = [];
            for (let x = 300 * S; x < 1100 * S; x += 100 * S) coins.push(createCoin(x, 590));
            for (let x = 2700 * S; x < 3700 * S; x += 100 * S) coins.push(createCoin(x, 590));
            for (let x = 3900 * S; x < 5300 * S; x += 100 * S) coins.push(createCoin(x, 590));
            for (let x = 7900 * S; x < 8900 * S; x += 100 * S) coins.push(createCoin(x, 590));
            for (let x = 11500 * S; x < 12800 * S; x += 100 * S) coins.push(createCoin(x, 590));
            coins.push(createCoin(2250 * S, 540), createCoin(3450 * S, 520));
            coins.push(createCoin(5050 * S, 500), createCoin(6050 * S, 460));
            coins.push(createCoin(6450 * S, 380), createCoin(6750 * S, 300));
            coins.push(createCoin(7050 * S, 220), createCoin(7350 * S, 300));
            coins.push(createCoin(7650 * S, 380));
            coins.push(createCoin(9750 * S, 460), createCoin(10050 * S, 360));
            coins.push(createCoin(10350 * S, 260), createCoin(10650 * S, 160));
            coins.push(createCoin(10950 * S, 260), createCoin(11250 * S, 360));
            return coins;
        })(),
        questionBlocks: (() => {
            const S = 0.417;
            return [
                createQB(5050 * S, 490, 'mushroom'),
                createQB(6750 * S, 290, 'star'),
                createQB(10650 * S, 150, 'flower'),
            ];
        })(),
        enemies: (() => {
            const S = 0.417;
            return [
                createEnemy(600 * S, 600, 'ufo'),
                createEnemy(1800 * S, 600, 'robot'),
                createEnemy(3000 * S, 600, 'ufo'),
                createEnemy(4200 * S, 600, 'fireball'),
                createEnemy(4800 * S, 500, 'ufo'),
                createEnemy(5800 * S, 600, 'robot'),
                createEnemy(6400 * S, 380, 'ufo'),
                createEnemy(7000 * S, 240, 'robot'),
                createEnemy(7600 * S, 380, 'ufo'),
                createEnemy(8600 * S, 600, 'fireball'),
                createEnemy(9400 * S, 600, 'robot'),
                createEnemy(10000 * S, 360, 'ufo'),
                createEnemy(10700 * S, 260, 'robot'),
                createEnemy(11000 * S, 360, 'ufo'),
                createEnemy(12000 * S, 600, 'fireball'),
            ];
        })(),
        decorations: (() => {
            const S = 0.417;
            return [
                createDeco(400 * S, 590, 'planet'),
                createDeco(2000 * S, 590, 'asteroid'),
                createDeco(4500 * S, 590, 'rocket'),
                createDeco(6500 * S, 250, 'satellite'),
                createDeco(9000 * S, 590, 'asteroid'),
                createDeco(11000 * S, 590, 'planet'),
                createDeco(12500 * S, 590, 'rocket'),
            ];
        })(),
        playerStart: { x: 150, y: 530 },
        goal: { x: 4950, y: 618 },
        timeBonus: 220,
        movingPlatforms: [
            createMovingPlat(1334, 480, 120, 24, 'platform_medium', 'horizontal', 300, 22),
            createMovingPlat(3461, 480, 100, 24, 'platform_medium', 'vertical', 180, 20),
            createMovingPlat(4712, 400, 100, 24, 'platform_medium', 'circular', 150, 22),
        ],
    },
];

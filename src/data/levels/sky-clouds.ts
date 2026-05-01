// Sky Clouds World - 6 Levels (25-30) - Long horizontal side-scrolling structure

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat } from './helpers';

export const SKY_CLOUDS_LEVELS: LevelData[] = [
    {
        id: 25, name: "Cloud Hop", width: 20000, height: 640, biome: 'sky-clouds',
        platforms: (() => {
            const S = 0.625;
            return [
                createPlat(200 * S, 560, 500 * S, 40, 'cloud'),
                createPlat(900 * S, 520, 400 * S, 40, 'cloud'),
                createPlat(1500 * S, 480, 300 * S, 40, 'cloud'),
                createPlat(2000 * S, 440, 150, 28, 'platform_easy'),
                createPlat(2400 * S, 400, 150, 28, 'platform_easy'),
                createPlat(2900 * S, 360, 200, 28, 'platform_medium'),
                createPlat(3400 * S, 320, 150, 28, 'platform_medium'),
                createPlat(3900 * S, 280, 150, 28, 'platform_hard'),
                createPlat(4400 * S, 320, 200 * S, 40, 'cloud'),
                createPlat(4900 * S, 360, 400 * S, 40, 'cloud'),
                createPlat(5600 * S, 400, 300 * S, 40, 'cloud'),
                // Bridge
                createPlat(5900 * S, 380, 80, 20, 'platform_easy'),
                createPlat(6200 * S, 360, 150, 28, 'platform_easy'),
                createPlat(6650 * S, 320, 150, 28, 'platform_medium'),
                createPlat(7100 * S, 280, 150, 28, 'platform_hard'),
                createPlat(7600 * S, 240, 150, 28, 'platform_hard'),
                createPlat(8100 * S, 200, 200 * S, 40, 'cloud'),
                createPlat(8600 * S, 240, 400 * S, 40, 'cloud'),
                createPlat(9300 * S, 280, 300 * S, 40, 'cloud'),
                createPlat(9900 * S, 320, 150, 28, 'platform_easy'),
                createPlat(10350 * S, 360, 150, 28, 'platform_medium'),
                createPlat(10800 * S, 400, 150, 28, 'platform_hard'),
                createPlat(11250 * S, 360, 200 * S, 40, 'cloud'),
                createPlat(11800 * S, 320, 400 * S, 40, 'cloud'),
                createPlat(12500 * S, 280, 300 * S, 40, 'cloud'),
                createPlat(13100 * S, 240, 150, 28, 'platform_easy'),
                createPlat(13550 * S, 200, 150, 28, 'platform_medium'),
                createPlat(14000 * S, 160, 150, 28, 'platform_hard'),
                createPlat(14450 * S, 200, 200 * S, 40, 'cloud'),
                createPlat(15000 * S, 240, 400 * S, 40, 'cloud'),
                createPlat(15700 * S, 280, 350 * S, 40, 'cloud'),
                createPlat(16350 * S, 320, 150, 28, 'platform_easy'),
                createPlat(16800 * S, 360, 150, 28, 'platform_medium'),
                createPlat(17250 * S, 400, 150, 28, 'platform_hard'),
                createPlat(17700 * S, 360, 200 * S, 40, 'cloud'),
                createPlat(18200 * S, 320, 400 * S, 40, 'cloud'),
                createPlat(18900 * S, 280, 300 * S, 40, 'cloud'),
                createPlat(19500 * S, 240, 150, 28, 'platform_easy'),
                createPlat(19950 * S, 200, 150, 28, 'platform_medium'),
                createPlat(20400 * S, 160, 150, 28, 'platform_hard'),
                createPlat(20850 * S, 200, 200 * S, 40, 'cloud'),
                createPlat(21400 * S, 240, 400 * S, 40, 'cloud'),
                createPlat(22100 * S, 280, 350 * S, 40, 'cloud'),
                createPlat(22750 * S, 320, 150, 28, 'platform_easy'),
                createPlat(23200 * S, 360, 150, 28, 'platform_medium'),
                createPlat(23650 * S, 400, 150, 28, 'platform_hard'),
                createPlat(24100 * S, 360, 200 * S, 40, 'cloud'),
                createPlat(24600 * S, 320, 400 * S, 40, 'cloud'),
                createPlat(25300 * S, 280, 300 * S, 40, 'cloud'),
                createPlat(25900 * S, 320, 400 * S, 40, 'cloud'),
                createPlat(26600 * S, 360, 500 * S, 40, 'cloud'),
                createPlat(27400 * S, 400, 400 * S, 40, 'cloud'),
                createPlat(28100 * S, 440, 500 * S, 40, 'cloud'),
                createPlat(28900 * S, 480, 600 * S, 40, 'cloud'),
                createPlat(29800 * S, 520, 700 * S, 40, 'cloud'),
                createPlat(30800 * S, 560, 600 * S, 40, 'cloud'),
            ];
        })(),
        coins: (() => {
            const S = 0.625;
            return [
                createCoin(500 * S, 520), createCoin(1000 * S, 480), createCoin(1800 * S, 440),
                createCoin(2400 * S, 360), createCoin(3000 * S, 320), createCoin(3700 * S, 280),
                createCoin(4400 * S, 240), createCoin(4700 * S, 180), createCoin(5400 * S, 200),
            ];
        })(),
        questionBlocks: (() => {
            const S = 0.625;
            return [
                createQB(1500 * S, 440, 'mushroom'), createQB(2800 * S, 360, 'flower'),
                createQB(4000 * S, 280, 'star'), createQB(5200 * S, 240, 'mushroom'),
                createQB(6400 * S, 160, 'flower'), createQB(7800 * S, 120, 'star'),
            ];
        })(),
        enemies: (() => {
            const S = 0.625;
            return [
                createEnemy(1200 * S, 540, 'goomba'), createEnemy(2200 * S, 460, 'ufo'),
                createEnemy(3200 * S, 380, 'goomba'), createEnemy(4200 * S, 300, 'ufo'),
                createEnemy(5500 * S, 220, 'spiny'), createEnemy(7000 * S, 160, 'ufo'),
            ];
        })(),
        movingPlatforms: [
            createMovingPlat(6750, 320, 150, 24, 'platform_medium', 'vertical', 180, 20),
            createMovingPlat(4800, 360, 150, 24, 'platform_medium', 'horizontal', 250, 18),
        ],
        decorations: (() => {
            const S = 0.625;
            return [
                createDeco(400 * S, 500, 'balloon'), createDeco(2000 * S, 400, 'bird'),
                createDeco(3500 * S, 300, 'sun'), createDeco(5000 * S, 200, 'rainbow'),
                createDeco(6500 * S, 150, 'balloon'), createDeco(8000 * S, 100, 'bird'),
            ];
        })(),
        playerStart: { x: 150, y: 510 },
        goal: { x: 19438, y: 538 },
        timeBonus: 120,
    },
    {
        id: 26, name: "Sky Passage", width: 20016, height: 660, biome: 'sky-clouds',
        platforms: (() => {
            const S = 0.556;
            return [
                createPlat(200 * S, 580, 500 * S, 40, 'cloud'),
                createPlat(900 * S, 540, 400 * S, 40, 'cloud'),
                createPlat(1600 * S, 500, 350 * S, 40, 'cloud'),
                createPlat(2200 * S, 460, 150, 28, 'platform_easy'),
                createPlat(2650 * S, 420, 150, 28, 'platform_easy'),
                createPlat(3100 * S, 380, 200, 28, 'platform_medium'),
                createPlat(3600 * S, 340, 150, 28, 'platform_medium'),
                createPlat(4100 * S, 300, 150, 28, 'platform_hard'),
                createPlat(4600 * S, 340, 200 * S, 40, 'cloud'),
                createPlat(5100 * S, 380, 400 * S, 40, 'cloud'),
                createPlat(5800 * S, 420, 350 * S, 40, 'cloud'),
                // Bridge
                createPlat(6100 * S, 400, 80, 20, 'platform_easy'),
                createPlat(6450 * S, 380, 150, 28, 'platform_easy'),
                createPlat(6900 * S, 340, 150, 28, 'platform_medium'),
                createPlat(7350 * S, 300, 150, 28, 'platform_hard'),
                createPlat(7800 * S, 260, 150, 28, 'platform_hard'),
                createPlat(8250 * S, 220, 200 * S, 40, 'cloud'),
                createPlat(8800 * S, 260, 400 * S, 40, 'cloud'),
                createPlat(9500 * S, 300, 350 * S, 40, 'cloud'),
                createPlat(10150 * S, 340, 150, 28, 'platform_easy'),
                createPlat(10600 * S, 380, 150, 28, 'platform_medium'),
                createPlat(11050 * S, 420, 150, 28, 'platform_hard'),
                createPlat(11500 * S, 380, 200 * S, 40, 'cloud'),
                createPlat(12050 * S, 340, 400 * S, 40, 'cloud'),
                createPlat(12750 * S, 300, 350 * S, 40, 'cloud'),
                createPlat(13400 * S, 260, 150, 28, 'platform_easy'),
                createPlat(13850 * S, 220, 150, 28, 'platform_medium'),
                createPlat(14300 * S, 180, 150, 28, 'platform_hard'),
                createPlat(14750 * S, 220, 200 * S, 40, 'cloud'),
                createPlat(15300 * S, 260, 400 * S, 40, 'cloud'),
                createPlat(16000 * S, 300, 350 * S, 40, 'cloud'),
                createPlat(16650 * S, 340, 150, 28, 'platform_easy'),
                createPlat(17100 * S, 380, 150, 28, 'platform_medium'),
                createPlat(17550 * S, 420, 150, 28, 'platform_hard'),
                createPlat(18000 * S, 380, 200 * S, 40, 'cloud'),
                createPlat(18550 * S, 340, 400 * S, 40, 'cloud'),
                createPlat(19250 * S, 300, 350 * S, 40, 'cloud'),
                createPlat(19900 * S, 260, 150, 28, 'platform_easy'),
                createPlat(20350 * S, 220, 150, 28, 'platform_medium'),
                createPlat(20800 * S, 180, 150, 28, 'platform_hard'),
                createPlat(21250 * S, 220, 200 * S, 40, 'cloud'),
                createPlat(21800 * S, 260, 400 * S, 40, 'cloud'),
                createPlat(22500 * S, 300, 350 * S, 40, 'cloud'),
                createPlat(23150 * S, 340, 150, 28, 'platform_easy'),
                createPlat(23600 * S, 380, 150, 28, 'platform_medium'),
                createPlat(24050 * S, 420, 150, 28, 'platform_hard'),
                createPlat(24500 * S, 380, 200 * S, 40, 'cloud'),
                createPlat(25050 * S, 340, 400 * S, 40, 'cloud'),
                createPlat(25750 * S, 300, 350 * S, 40, 'cloud'),
                createPlat(26400 * S, 340, 400 * S, 40, 'cloud'),
                createPlat(27100 * S, 380, 500 * S, 40, 'cloud'),
                createPlat(27900 * S, 420, 450 * S, 40, 'cloud'),
                createPlat(28650 * S, 460, 500 * S, 40, 'cloud'),
                createPlat(29450 * S, 500, 550 * S, 40, 'cloud'),
                createPlat(30300 * S, 540, 650 * S, 40, 'cloud'),
                createPlat(31250 * S, 570, 700 * S, 40, 'cloud'),
                createPlat(32250 * S, 590, 700 * S, 40, 'cloud'),
            ];
        })(),
        coins: (() => {
            const S = 0.556;
            return [
                createCoin(400 * S, 480), createCoin(1000 * S, 440), createCoin(1800 * S, 360),
                createCoin(2600 * S, 280), createCoin(3400 * S, 200), createCoin(4200 * S, 140),
            ];
        })(),
        questionBlocks: (() => {
            const S = 0.556;
            return [
                createQB(1600 * S, 420, 'mushroom'), createQB(2900 * S, 320, 'flower'),
                createQB(4200 * S, 220, 'star'), createQB(5600 * S, 180, 'mushroom'),
                createQB(7000 * S, 160, 'flower'), createQB(8500 * S, 140, 'star'),
            ];
        })(),
        enemies: (() => {
            const S = 0.556;
            return [
                createEnemy(1400 * S, 500, 'goomba'), createEnemy(2700 * S, 380, 'ufo'),
                createEnemy(4000 * S, 260, 'spiny'), createEnemy(5300 * S, 200, 'ufo'),
                createEnemy(6800 * S, 180, 'goomba'), createEnemy(8200 * S, 160, 'ufo'),
            ];
        })(),
        movingPlatforms: [
            createMovingPlat(2400, 440, 150, 24, 'platform_medium', 'horizontal', 180, 18),
            createMovingPlat(7200, 320, 150, 24, 'platform_medium', 'vertical', 140, 20),
        ],
        decorations: (() => {
            const S = 0.556;
            return [
                createDeco(600 * S, 460, 'balloon'), createDeco(2200 * S, 340, 'bird'),
                createDeco(3800 * S, 240, 'sun'), createDeco(5400 * S, 180, 'rainbow'),
                createDeco(7000 * S, 140, 'balloon'), createDeco(8600 * S, 120, 'bird'),
            ];
        })(),
        playerStart: { x: 150, y: 530 },
        goal: { x: 18126, y: 568 },
        timeBonus: 140,
    },
    {
        id: 27, name: "Cloud Kingdom", width: 20000, height: 680, biome: 'sky-clouds',
        platforms: (() => {
            const S = 0.5;
            return [
                createPlat(200 * S, 600, 500 * S, 40, 'cloud'),
                createPlat(900 * S, 560, 400 * S, 40, 'cloud'),
                createPlat(1600 * S, 520, 350 * S, 40, 'cloud'),
                createPlat(2300 * S, 480, 150, 28, 'platform_easy'),
                createPlat(2800 * S, 440, 150, 28, 'platform_easy'),
                createPlat(3300 * S, 400, 200, 28, 'platform_medium'),
                createPlat(3850 * S, 360, 150, 28, 'platform_medium'),
                createPlat(4400 * S, 320, 150, 28, 'platform_hard'),
                createPlat(4950 * S, 360, 200 * S, 40, 'cloud'),
                createPlat(5500 * S, 400, 400 * S, 40, 'cloud'),
                createPlat(6250 * S, 440, 350 * S, 40, 'cloud'),
                // Bridge
                createPlat(6600 * S, 420, 100, 20, 'platform_easy'),
                createPlat(6950 * S, 400, 150, 28, 'platform_easy'),
                createPlat(7450 * S, 360, 150, 28, 'platform_medium'),
                createPlat(7950 * S, 320, 150, 28, 'platform_hard'),
                createPlat(8450 * S, 280, 150, 28, 'platform_hard'),
                createPlat(8950 * S, 240, 200 * S, 40, 'cloud'),
                createPlat(9600 * S, 280, 400 * S, 40, 'cloud'),
                createPlat(10400 * S, 320, 350 * S, 40, 'cloud'),
            ];
        })(),
        coins: (() => {
            const S = 0.5;
            return [
                createCoin(400 * S, 520), createCoin(1000 * S, 480), createCoin(1800 * S, 440),
                createCoin(2800 * S, 360), createCoin(3800 * S, 280), createCoin(4800 * S, 220),
            ];
        })(),
        questionBlocks: (() => {
            const S = 0.5;
            return [
                createQB(1700 * S, 440, 'mushroom'), createQB(3000 * S, 360, 'flower'),
                createQB(4300 * S, 280, 'star'), createQB(5600 * S, 220, 'mushroom'),
                createQB(7000 * S, 200, 'flower'), createQB(8400 * S, 180, 'star'),
            ];
        })(),
        enemies: (() => {
            const S = 0.5;
            return [
                createEnemy(1500 * S, 500, 'goomba'), createEnemy(2900 * S, 400, 'ufo'),
                createEnemy(4200 * S, 320, 'spiny'), createEnemy(5500 * S, 260, 'ufo'),
                createEnemy(6800 * S, 220, 'goomba'), createEnemy(8200 * S, 200, 'ufo'),
            ];
        })(),
        movingPlatforms: [
            createMovingPlat(3725, 380, 150, 24, 'platform_medium', 'horizontal', 120, 20),
            createMovingPlat(3850, 360, 150, 24, 'platform_medium', 'vertical', 120, 18),
        ],
        decorations: (() => {
            const S = 0.5;
            return [
                createDeco(800 * S, 480, 'balloon'), createDeco(2400 * S, 380, 'bird'),
                createDeco(4000 * S, 280, 'sun'), createDeco(5600 * S, 200, 'rainbow'),
                createDeco(7200 * S, 160, 'balloon'), createDeco(8800 * S, 140, 'bird'),
            ];
        })(),
        playerStart: { x: 150, y: 550 },
        goal: { x: 5288, y: 298 },
        timeBonus: 160,
    },
    {
        id: 28, name: "Aerial Heights", width: 20020, height: 690, biome: 'sky-clouds',
        platforms: (() => {
            const S = 0.455;
            return [
                createPlat(200 * S, 610, 500 * S, 40, 'cloud'),
                createPlat(900 * S, 570, 400 * S, 40, 'cloud'),
                createPlat(1700 * S, 530, 350 * S, 40, 'cloud'),
                createPlat(2450 * S, 490, 150, 28, 'platform_easy'),
                createPlat(3000 * S, 450, 150, 28, 'platform_easy'),
                createPlat(3550 * S, 410, 200, 28, 'platform_medium'),
                createPlat(4150 * S, 370, 150, 28, 'platform_medium'),
                createPlat(4750 * S, 330, 150, 28, 'platform_hard'),
                createPlat(5350 * S, 370, 200 * S, 40, 'cloud'),
                createPlat(5950 * S, 410, 400 * S, 40, 'cloud'),
                createPlat(6750 * S, 450, 350 * S, 40, 'cloud'),
                // Bridge
                createPlat(7100 * S, 430, 100, 20, 'platform_easy'),
                createPlat(7500 * S, 410, 150, 28, 'platform_easy'),
                createPlat(8050 * S, 370, 150, 28, 'platform_medium'),
                createPlat(8600 * S, 330, 150, 28, 'platform_hard'),
                createPlat(9150 * S, 290, 150, 28, 'platform_hard'),
                createPlat(9700 * S, 250, 200 * S, 40, 'cloud'),
                createPlat(10400 * S, 290, 400 * S, 40, 'cloud'),
                createPlat(11200 * S, 330, 350 * S, 40, 'cloud'),
];
        })(),
        coins: (() => {
            const S = 0.455;
            return [
                createCoin(400 * S, 540), createCoin(1100 * S, 500), createCoin(2000 * S, 460),
                createCoin(3000 * S, 390), createCoin(4000 * S, 330), createCoin(5000 * S, 270),
            ];
        })(),
        questionBlocks: (() => {
            const S = 0.455;
            return [
                createQB(1900 * S, 440, 'mushroom'), createQB(3300 * S, 360, 'flower'),
                createQB(4700 * S, 280, 'star'), createQB(6100 * S, 240, 'mushroom'),
                createQB(7600 * S, 220, 'flower'), createQB(9000 * S, 200, 'star'),
            ];
        })(),
        enemies: (() => {
            const S = 0.455;
            return [
                createEnemy(1700 * S, 500, 'goomba'), createEnemy(3200 * S, 410, 'ufo'),
                createEnemy(4600 * S, 330, 'spiny'), createEnemy(6000 * S, 280, 'ufo'),
                createEnemy(7400 * S, 240, 'goomba'), createEnemy(8800 * S, 220, 'ufo'),
            ];
        })(),
        movingPlatforms: [
            createMovingPlat(2700, 470, 150, 24, 'platform_medium', 'horizontal', 180, 18),
            createMovingPlat(6900, 390, 150, 24, 'platform_medium', 'vertical', 150, 20),
        ],
        decorations: (() => {
            const S = 0.455;
            return [
                createDeco(900 * S, 500, 'balloon'), createDeco(2600 * S, 400, 'bird'),
                createDeco(4300 * S, 300, 'sun'), createDeco(6000 * S, 220, 'rainbow'),
                createDeco(7700 * S, 180, 'balloon'), createDeco(9400 * S, 160, 'bird'),
            ];
        })(),
        playerStart: { x: 150, y: 560 },
        goal: { x: 5176, y: 308 },
        timeBonus: 180,
    },
    {
        id: 29, name: "Heaven's Reach", width: 20016, height: 695, biome: 'sky-clouds',
        platforms: (() => {
            const S = 0.417;
            return [
                createPlat(200 * S, 620, 500 * S, 40, 'cloud'),
                createPlat(950 * S, 580, 400 * S, 40, 'cloud'),
                createPlat(1800 * S, 540, 350 * S, 40, 'cloud'),
                createPlat(2600 * S, 500, 150, 28, 'platform_easy'),
                createPlat(3200 * S, 460, 150, 28, 'platform_easy'),
                createPlat(3800 * S, 420, 200, 28, 'platform_medium'),
                createPlat(4450 * S, 380, 150, 28, 'platform_medium'),
                createPlat(5100 * S, 340, 150, 28, 'platform_hard'),
                createPlat(5750 * S, 380, 200 * S, 40, 'cloud'),
                createPlat(6400 * S, 420, 400 * S, 40, 'cloud'),
                createPlat(7250 * S, 460, 350 * S, 40, 'cloud'),
                createPlat(7600 * S, 440, 100, 20, 'platform_easy'),
                createPlat(8050 * S, 420, 150, 28, 'platform_easy'),
                createPlat(8650 * S, 380, 150, 28, 'platform_medium'),
                createPlat(9250 * S, 340, 150, 28, 'platform_hard'),
                createPlat(9850 * S, 300, 150, 28, 'platform_hard'),
                createPlat(10450 * S, 260, 200 * S, 40, 'cloud'),
                createPlat(11200 * S, 300, 400 * S, 40, 'cloud'),
                createPlat(12050 * S, 340, 350 * S, 40, 'cloud'),
            ];
        })(),
        coins: (() => {
            const S = 0.417;
            return [
                createCoin(500 * S, 550), createCoin(1200 * S, 510), createCoin(2100 * S, 450),
                createCoin(3200 * S, 390), createCoin(4300 * S, 330), createCoin(5500 * S, 270),
            ];
        })(),
        questionBlocks: (() => {
            const S = 0.417;
            return [
                createQB(2000 * S, 470, 'mushroom'), createQB(3500 * S, 390, 'flower'),
                createQB(5000 * S, 310, 'star'), createQB(6500 * S, 260, 'mushroom'),
                createQB(8100 * S, 240, 'flower'), createQB(9600 * S, 220, 'star'),
            ];
        })(),
        enemies: (() => {
            const S = 0.417;
            return [
                createEnemy(1800 * S, 530, 'goomba'), createEnemy(3400 * S, 440, 'ufo'),
                createEnemy(4900 * S, 350, 'spiny'), createEnemy(6400 * S, 300, 'ufo'),
                createEnemy(7900 * S, 260, 'goomba'), createEnemy(9400 * S, 240, 'ufo'),
            ];
        })(),
        movingPlatforms: [
            createMovingPlat(2400, 480, 150, 24, 'platform_medium', 'horizontal', 180, 18),
            createMovingPlat(6900, 400, 150, 24, 'platform_medium', 'vertical', 150, 20),
        ],
        decorations: (() => {
            const S = 0.417;
            return [
                createDeco(1000 * S, 510, 'balloon'), createDeco(2700 * S, 420, 'bird'),
                createDeco(4500 * S, 320, 'sun'), createDeco(6300 * S, 240, 'rainbow'),
                createDeco(8100 * S, 200, 'balloon'), createDeco(9900 * S, 180, 'bird'),
            ];
        })(),
        playerStart: { x: 150, y: 570 },
        goal: { x: 5098, y: 318 },
        timeBonus: 200,
    },
    {
        id: 30, name: "Sky Finale", width: 20000, height: 700, biome: 'sky-clouds',
        platforms: (() => {
            const S = 0.4;
            return [
                createPlat(200 * S, 630, 500 * S, 40, 'cloud'),
                createPlat(1000 * S, 590, 400 * S, 40, 'cloud'),
                createPlat(1900 * S, 550, 350 * S, 40, 'cloud'),
                createPlat(2750 * S, 510, 150, 28, 'platform_easy'),
                createPlat(3400 * S, 470, 150, 28, 'platform_easy'),
                createPlat(4050 * S, 430, 200, 28, 'platform_medium'),
                createPlat(4750 * S, 390, 150, 28, 'platform_medium'),
                createPlat(5450 * S, 350, 150, 28, 'platform_hard'),
                createPlat(6150 * S, 390, 200 * S, 40, 'cloud'),
                createPlat(6850 * S, 430, 400 * S, 40, 'cloud'),
                createPlat(7750 * S, 470, 350 * S, 40, 'cloud'),
                // Bridge
                createPlat(8200 * S, 450, 100, 20, 'platform_easy'),
                createPlat(8600 * S, 430, 150, 28, 'platform_easy'),
                createPlat(9250 * S, 390, 150, 28, 'platform_medium'),
                createPlat(9900 * S, 350, 150, 28, 'platform_hard'),
                createPlat(10550 * S, 310, 150, 28, 'platform_hard'),
                createPlat(11200 * S, 270, 200 * S, 40, 'cloud'),
                createPlat(12000 * S, 310, 400 * S, 40, 'cloud'),
                createPlat(12900 * S, 350, 350 * S, 40, 'cloud'),
            ];
        })(),
        coins: (() => {
            const S = 0.4;
            return [
                createCoin(400 * S, 560), createCoin(1200 * S, 520), createCoin(2200 * S, 480),
                createCoin(3300 * S, 400), createCoin(4500 * S, 340), createCoin(5800 * S, 280),
            ];
        })(),
        questionBlocks: (() => {
            const S = 0.4;
            return [
                createQB(2000 * S, 480, 'mushroom'), createQB(3500 * S, 400, 'flower'),
                createQB(5000 * S, 300, 'star'), createQB(6600 * S, 250, 'mushroom'),
                createQB(8200 * S, 220, 'flower'), createQB(9800 * S, 200, 'star'),
            ];
        })(),
        enemies: (() => {
            const S = 0.4;
            return [
                createEnemy(1800 * S, 540, 'goomba'), createEnemy(3400 * S, 430, 'ufo'),
                createEnemy(4900 * S, 340, 'spiny'), createEnemy(6400 * S, 280, 'ufo'),
                createEnemy(8000 * S, 240, 'goomba'), createEnemy(9600 * S, 220, 'ufo'),
            ];
        })(),
        movingPlatforms: [
            createMovingPlat(3570, 390, 150, 24, 'platform_medium', 'horizontal', 130, 20),
            createMovingPlat(3830, 350, 150, 24, 'platform_medium', 'vertical', 120, 18),
            createMovingPlat(4350, 290, 150, 24, 'platform_medium', 'horizontal', 130, 20),
        ],
        decorations: (() => {
            const S = 0.4;
            return [
                createDeco(1000 * S, 520, 'balloon'), createDeco(2800 * S, 420, 'bird'),
                createDeco(4600 * S, 320, 'sun'), createDeco(6400 * S, 240, 'rainbow'),
                createDeco(8200 * S, 200, 'balloon'), createDeco(10000 * S, 180, 'bird'),
            ];
        })(),
        playerStart: { x: 150, y: 580 },
        goal: { x: 5230, y: 328 },
        timeBonus: 220,
    },
];
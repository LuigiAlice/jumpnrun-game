import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat } from './helpers';

export const WATER_LEVELS: LevelData[] = [
    {
        id: 13, name: "Aqua Depths", width: 20100, height: 600, biome: 'water',
        platforms: (() => {
            const S = 0.67;
            return [
                createPlat(100 * S, 480, 2200 * S, 40, 'water'),
                createPlat(2600 * S, 480, 80, 24, 'platform_easy'),
                // Bridge to platform
                createPlat(2050 * S, 380, 100, 24, 'platform_easy'),
                createPlat(2200 * S, 380, 80, 24, 'platform_medium'),
                createPlat(2450 * S, 310, 100, 24, 'platform_medium'),
                createPlat(2700 * S, 240, 80, 24, 'platform_hard'),
                createPlat(2950 * S, 310, 80, 24, 'platform_medium'),
                createPlat(3200 * S, 380, 80, 24, 'platform_easy'),
                createPlat(3500 * S, 480, 2000 * S, 40, 'water'),
                createPlat(3800 * S, 380, 60, 64, 'pipe'),
                createPlat(4100 * S, 300, 80, 24, 'platform_easy'),
                createPlat(4350 * S, 380, 80, 24, 'platform_easy'),
                createPlat(4600 * S, 300, 100, 24, 'platform_medium'),
                createPlat(4850 * S, 230, 120, 24, 'platform_hard'),
                createPlat(5100 * S, 300, 80, 24, 'platform_medium'),
                createPlat(5350 * S, 380, 80, 24, 'platform_medium'),
                createPlat(5600 * S, 480, 2500 * S, 40, 'water'),
                createPlat(5900 * S, 390, 60, 80, 'pipe'),
                // Bridge after pipe
                createPlat(6050 * S, 350, 100, 24, 'platform_easy'),
                createPlat(6200 * S, 310, 80, 24, 'platform_medium'),
                createPlat(6450 * S, 240, 100, 24, 'platform_hard'),
                createPlat(6700 * S, 310, 80, 24, 'platform_medium'),
                createPlat(6950 * S, 390, 80, 24, 'platform_easy'),
                createPlat(7200 * S, 480, 2000 * S, 40, 'water'),
                createPlat(7500 * S, 380, 60, 64, 'pipe'),
                createPlat(7800 * S, 300, 80, 24, 'platform_easy'),
                createPlat(8050 * S, 380, 80, 24, 'platform_easy'),
                createPlat(8300 * S, 300, 100, 24, 'platform_medium'),
                createPlat(8550 * S, 230, 120, 24, 'platform_hard'),
                createPlat(8800 * S, 300, 80, 24, 'platform_medium'),
                createPlat(9050 * S, 380, 80, 24, 'platform_medium'),
                createPlat(9300 * S, 480, 2000 * S, 40, 'water'),
                createPlat(9600 * S, 390, 60, 80, 'pipe'),
                createPlat(9900 * S, 310, 80, 24, 'platform_medium'),
                createPlat(10150 * S, 240, 100, 24, 'platform_hard'),
                createPlat(10400 * S, 310, 80, 24, 'platform_medium'),
                createPlat(10650 * S, 390, 80, 24, 'platform_easy'),
                createPlat(10900 * S, 480, 2000 * S, 40, 'water'),
                createPlat(11200 * S, 380, 60, 64, 'pipe'),
                createPlat(11500 * S, 300, 80, 24, 'platform_easy'),
                createPlat(11750 * S, 380, 80, 24, 'platform_easy'),
                createPlat(12000 * S, 300, 100, 24, 'platform_medium'),
                createPlat(12250 * S, 230, 120, 24, 'platform_hard'),
                createPlat(12500 * S, 300, 80, 24, 'platform_medium'),
                createPlat(12750 * S, 380, 80, 24, 'platform_medium'),
                createPlat(13000 * S, 480, 2500 * S, 40, 'water'),
                createPlat(13300 * S, 390, 60, 80, 'pipe'),
                createPlat(13600 * S, 310, 80, 24, 'platform_medium'),
                createPlat(13850 * S, 240, 100, 24, 'platform_hard'),
                createPlat(14100 * S, 310, 80, 24, 'platform_medium'),
                createPlat(14350 * S, 390, 80, 24, 'platform_easy'),
                createPlat(14600 * S, 480, 2000 * S, 40, 'water'),
                createPlat(14900 * S, 380, 60, 64, 'pipe'),
                createPlat(15200 * S, 300, 80, 24, 'platform_easy'),
                createPlat(15450 * S, 380, 80, 24, 'platform_easy'),
                createPlat(15700 * S, 300, 100, 24, 'platform_medium'),
                createPlat(15950 * S, 230, 120, 24, 'platform_hard'),
                createPlat(16200 * S, 300, 80, 24, 'platform_medium'),
                createPlat(16450 * S, 380, 80, 24, 'platform_medium'),
                createPlat(16700 * S, 480, 2000 * S, 40, 'water'),
                createPlat(17000 * S, 390, 60, 80, 'pipe'),
                createPlat(17300 * S, 310, 80, 24, 'platform_medium'),
                createPlat(17550 * S, 240, 100, 24, 'platform_hard'),
                createPlat(17800 * S, 310, 80, 24, 'platform_medium'),
                createPlat(18050 * S, 390, 80, 24, 'platform_easy'),
                createPlat(18300 * S, 480, 2500 * S, 40, 'water'),
                createPlat(18600 * S, 380, 60, 64, 'pipe'),
                createPlat(18900 * S, 300, 80, 24, 'platform_easy'),
                createPlat(19150 * S, 380, 80, 24, 'platform_easy'),
                createPlat(19400 * S, 300, 100, 24, 'platform_medium'),
                createPlat(19650 * S, 230, 120, 24, 'platform_hard'),
                createPlat(19900 * S, 300, 80, 24, 'platform_medium'),
                createPlat(20150 * S, 380, 80, 24, 'platform_medium'),
                createPlat(20400 * S, 480, 2000 * S, 40, 'water'),
                createPlat(20700 * S, 390, 60, 80, 'pipe'),
                createPlat(21000 * S, 310, 80, 24, 'platform_medium'),
                createPlat(21250 * S, 240, 100, 24, 'platform_hard'),
                createPlat(21500 * S, 310, 80, 24, 'platform_medium'),
                createPlat(21750 * S, 390, 80, 24, 'platform_easy'),
                createPlat(22000 * S, 480, 2500 * S, 40, 'water'),
                createPlat(22300 * S, 380, 60, 64, 'pipe'),
                createPlat(22600 * S, 300, 80, 24, 'platform_easy'),
                createPlat(22850 * S, 380, 80, 24, 'platform_easy'),
                createPlat(23100 * S, 300, 100, 24, 'platform_medium'),
                createPlat(23350 * S, 230, 120, 24, 'platform_hard'),
                createPlat(23600 * S, 300, 80, 24, 'platform_medium'),
                createPlat(23850 * S, 380, 80, 24, 'platform_medium'),
                createPlat(24100 * S, 480, 2000 * S, 40, 'water'),
                createPlat(24400 * S, 390, 60, 80, 'pipe'),
                createPlat(24700 * S, 310, 80, 24, 'platform_medium'),
                createPlat(24950 * S, 240, 100, 24, 'platform_hard'),
                createPlat(25200 * S, 310, 80, 24, 'platform_medium'),
                createPlat(25450 * S, 390, 80, 24, 'platform_easy'),
                createPlat(25700 * S, 480, 2500 * S, 40, 'water'),
                createPlat(26000 * S, 380, 60, 64, 'pipe'),
                createPlat(26300 * S, 300, 80, 24, 'platform_easy'),
                createPlat(26550 * S, 380, 80, 24, 'platform_easy'),
                createPlat(26800 * S, 300, 100, 24, 'platform_medium'),
                createPlat(27050 * S, 230, 120, 24, 'platform_hard'),
                createPlat(27300 * S, 300, 80, 24, 'platform_medium'),
                createPlat(27550 * S, 380, 80, 24, 'platform_medium'),
                createPlat(27800 * S, 480, 2000 * S, 40, 'water'),
                createPlat(29000 * S, 480, 1000 * S, 40, 'water'),
            ];
        })(),
        coins: (() => {
            const S = 0.625;
            return [
                createCoin(400 * S, 420), createCoin(800 * S, 340), createCoin(1400 * S, 260),
                createCoin(2000 * S, 340), createCoin(2600 * S, 260), createCoin(3200 * S, 200),
            ];
        })(),
        questionBlocks: (() => {
            const S = 0.625;
            return [
                createQB(600 * S, 436, 'mushroom'), createQB(1200 * S, 356, 'flower'),
                createQB(1900 * S, 256, 'star'), createQB(2700 * S, 216, 'mushroom'),
                createQB(3400 * S, 236, 'flower'), createQB(4200 * S, 216, 'star'),
            ];
        })(),
        enemies: (() => {
            const S = 0.625;
            return [
                createEnemy(800 * S, 470, 'squid'), createEnemy(1800 * S, 450, 'squid'),
                createEnemy(2800 * S, 430, 'piranha'), createEnemy(3600 * S, 400, 'squid'),
            ];
        })(),
        decorations: (() => {
            const S = 0.625;
            return [
                createDeco(500 * S, 440, 'seaweed'), createDeco(1500 * S, 400, 'bubble'),
                createDeco(2400 * S, 360, 'coral'), createDeco(3300 * S, 320, 'shell'),
                createDeco(4200 * S, 280, 'seaweed'), createDeco(5000 * S, 240, 'bubble'),
            ];
        })(),
        movingPlatforms: (() => {
            const S = 0.67;
            return [
                createMovingPlat(4500 * S, 400, 100, 24, 'water', 'horizontal', 200, 20),
                createMovingPlat(6400 * S, 380, 100, 24, 'water', 'horizontal', 200, 20),
            ];
        })(),
        playerStart: { x: 150, y: 440 },
        goal: { x: 19430, y: 440 },
        timeBonus: 120,
    },
    {
        id: 14, name: "Tidal Tunnels", width: 19950, height: 650, biome: 'water',
        platforms: (() => {
            const S = 0.57;
            return [
                createPlat(100 * S, 520, 2500 * S, 40, 'water'),
                createPlat(400 * S, 420, 80, 24, 'platform_easy'),
                createPlat(650 * S, 340, 100, 24, 'platform_easy'),
                createPlat(900 * S, 260, 80, 24, 'platform_medium'),
                createPlat(1150 * S, 340, 80, 24, 'platform_medium'),
                createPlat(1400 * S, 420, 80, 24, 'platform_easy'),
                createPlat(1700 * S, 520, 2500 * S, 40, 'water'),
                createPlat(2000 * S, 420, 60, 80, 'pipe'),
                // Bridge to platforms
                createPlat(2150 * S, 380, 80, 24, 'platform_easy'),
                createPlat(2300 * S, 340, 80, 24, 'platform_medium'),
                createPlat(2550 * S, 260, 100, 24, 'platform_hard'),
                createPlat(2800 * S, 340, 80, 24, 'platform_medium'),
                createPlat(3050 * S, 420, 80, 24, 'platform_easy'),
                createPlat(3400 * S, 520, 2000 * S, 40, 'water'),
                createPlat(3700 * S, 430, 60, 64, 'pipe'),
                // Bridge after pipe
                createPlat(3850 * S, 390, 80, 24, 'platform_easy'),
                createPlat(4000 * S, 350, 80, 24, 'platform_easy'),
                createPlat(4250 * S, 270, 100, 24, 'platform_medium'),
                createPlat(4500 * S, 350, 80, 24, 'platform_medium'),
                createPlat(4750 * S, 430, 80, 24, 'platform_easy'),
                createPlat(5100 * S, 520, 2500 * S, 40, 'water'),
                createPlat(5400 * S, 420, 60, 80, 'pipe'),
                createPlat(5700 * S, 340, 80, 24, 'platform_medium'),
                createPlat(5950 * S, 260, 100, 24, 'platform_hard'),
                createPlat(6200 * S, 340, 80, 24, 'platform_medium'),
                createPlat(6450 * S, 420, 80, 24, 'platform_easy'),
                createPlat(6800 * S, 520, 2000 * S, 40, 'water'),
                createPlat(10000 * S, 520, 1000 * S, 40, 'water'),
            ];
        })(),
        coins: (() => {
            const S = 0.57;
            return [
                createCoin(500 * S, 400), createCoin(1000 * S, 300), createCoin(1700 * S, 220),
                createCoin(2400 * S, 300), createCoin(3100 * S, 220), createCoin(3800 * S, 180),
            ];
        })(),
        questionBlocks: (() => {
            const S = 0.57;
            return [
                createQB(700 * S, 360, 'mushroom'), createQB(1400 * S, 280, 'flower'),
                createQB(2200 * S, 200, 'star'), createQB(3000 * S, 160, 'mushroom'),
                createQB(3800 * S, 180, 'flower'), createQB(4600 * S, 160, 'star'),
            ];
        })(),
        enemies: (() => {
            const S = 0.57;
            return [
                createEnemy(900 * S, 470, 'squid'), createEnemy(2000 * S, 450, 'squid'),
                createEnemy(3200 * S, 430, 'piranha'), createEnemy(4200 * S, 400, 'squid'),
            ];
        })(),
        decorations: (() => {
            const S = 0.57;
            return [
                createDeco(600 * S, 440, 'seaweed'), createDeco(1800 * S, 400, 'bubble'),
                createDeco(2800 * S, 360, 'coral'), createDeco(3800 * S, 320, 'shell'),
                createDeco(4800 * S, 280, 'seaweed'), createDeco(5600 * S, 240, 'bubble'),
            ];
        })(),
        movingPlatforms: (() => {
            const S = 0.57;
            return [
                createMovingPlat(3800 * S, 400, 100, 24, 'water', 'horizontal', 180, 22),
            ];
        })(),
        playerStart: { x: 150, y: 480 },
        goal: { x: 3676, y: 388 },
        timeBonus: 140,
    },
    {
        id: 15, name: "Coral Abyss", width: 20000, height: 650, biome: 'water',
        platforms: (() => {
            const S = 0.5;
            return [
                createPlat(100 * S, 520, 6000 * S, 40, 'water'),
                createPlat(200 * S, 490, 200, 24, 'platform_easy'),
                createPlat(800 * S, 440, 200, 24, 'platform_easy'),
                createPlat(1400 * S, 400, 200, 24, 'platform_medium'),
                createPlat(2000 * S, 360, 200, 24, 'platform_medium'),
                createPlat(2600 * S, 320, 200, 24, 'platform_hard'),
                createPlat(3200 * S, 280, 200, 24, 'platform_hard'),
                createPlat(3800 * S, 320, 200, 24, 'platform_medium'),
                createPlat(4400 * S, 360, 200, 24, 'platform_medium'),
                createPlat(5000 * S, 400, 200, 24, 'platform_easy'),
                createPlat(5600 * S, 440, 200, 24, 'platform_easy'),
                createPlat(6200 * S, 480, 2000 * S, 40, 'water'),
            ];
        })(),
        coins: (() => {
            const S = 0.5;
            return [
                createCoin(500 * S, 440), createCoin(1100 * S, 400), createCoin(1700 * S, 360),
                createCoin(2300 * S, 300), createCoin(2900 * S, 240), createCoin(3500 * S, 240),
            ];
        })(),
        questionBlocks: (() => {
            const S = 0.5;
            return [
                createQB(600 * S, 440, 'mushroom'), createQB(1200 * S, 360, 'flower'),
                createQB(1800 * S, 300, 'star'), createQB(2400 * S, 240, 'mushroom'),
                createQB(3000 * S, 220, 'flower'), createQB(3600 * S, 220, 'star'),
            ];
        })(),
        enemies: (() => {
            const S = 0.5;
            return [
                createEnemy(900 * S, 460, 'squid'), createEnemy(1600 * S, 420, 'squid'),
                createEnemy(2200 * S, 360, 'piranha'), createEnemy(3400 * S, 320, 'squid'),
            ];
        })(),
        decorations: (() => {
            const S = 0.5;
            return [
                createDeco(400 * S, 460, 'seaweed'), createDeco(1000 * S, 400, 'bubble'),
                createDeco(2000 * S, 340, 'coral'), createDeco(3000 * S, 280, 'shell'),
                createDeco(4000 * S, 280, 'seaweed'), createDeco(5000 * S, 340, 'bubble'),
            ];
        })(),
        movingPlatforms: (() => {
            const S = 0.5;
            return [
                createMovingPlat(7200 * S, 420, 100, 24, 'water', 'horizontal', 250, 22),
            ];
        })(),
        playerStart: { x: 150, y: 450 },
        goal: { x: 250, y: 490 },
        timeBonus: 160,
    },
    {
        id: 16, name: "Sunken Ruins", width: 20210, height: 680, biome: 'water',
        platforms: (() => {
            const S = 0.47;
            return [
                createPlat(100 * S, 550, 3500 * S, 40, 'water'),
                createPlat(600 * S, 450, 80, 24, 'platform_easy'),
                createPlat(850 * S, 370, 100, 24, 'platform_easy'),
                createPlat(1100 * S, 290, 80, 24, 'platform_medium'),
                createPlat(1350 * S, 370, 80, 24, 'platform_medium'),
                createPlat(1600 * S, 450, 80, 24, 'platform_easy'),
                createPlat(1900 * S, 290, 120, 24, 'platform_hard'),
                createPlat(2150 * S, 370, 80, 24, 'platform_medium'),
                createPlat(2450 * S, 550, 3000 * S, 40, 'water'),
                createPlat(2750 * S, 450, 60, 80, 'pipe'),
                // Bridge
                createPlat(2900 * S, 410, 80, 24, 'platform_easy'),
                createPlat(3050 * S, 370, 80, 24, 'platform_medium'),
                createPlat(3300 * S, 290, 100, 24, 'platform_hard'),
                createPlat(3550 * S, 370, 80, 24, 'platform_medium'),
                createPlat(3800 * S, 450, 80, 24, 'platform_easy'),
                createPlat(4150 * S, 550, 2500 * S, 40, 'water'),
                createPlat(8000 * S, 550, 1000 * S, 40, 'water'),
            ];
        })(),
        coins: (() => {
            const S = 0.47;
            return [
                createCoin(700 * S, 420), createCoin(1300 * S, 340), createCoin(2100 * S, 280),
                createCoin(2900 * S, 340), createCoin(3700 * S, 280), createCoin(4500 * S, 240),
            ];
        })(),
        questionBlocks: (() => {
            const S = 0.47;
            return [
                createQB(900 * S, 380, 'mushroom'), createQB(1700 * S, 300, 'flower'),
                createQB(2500 * S, 220, 'star'), createQB(3400 * S, 180, 'mushroom'),
                createQB(4200 * S, 200, 'flower'), createQB(5000 * S, 180, 'star'),
            ];
        })(),
        enemies: (() => {
            const S = 0.47;
            return [
                createEnemy(1100 * S, 500, 'squid'), createEnemy(2400 * S, 480, 'squid'),
                createEnemy(3700 * S, 450, 'piranha'), createEnemy(5000 * S, 430, 'squid'),
            ];
        })(),
        decorations: (() => {
            const S = 0.47;
            return [
                createDeco(800 * S, 460, 'seaweed'), createDeco(2000 * S, 420, 'bubble'),
                createDeco(3200 * S, 380, 'coral'), createDeco(4400 * S, 340, 'shell'),
                createDeco(5600 * S, 300, 'seaweed'), createDeco(6500 * S, 260, 'bubble'),
            ];
        })(),
        movingPlatforms: (() => {
            const S = 0.47;
            return [
                createMovingPlat(1800 * S, 460, 100, 24, 'water', 'horizontal', 200, 22),
                createMovingPlat(4400 * S, 400, 100, 24, 'water', 'vertical', 150, 18),
            ];
        })(),
        playerStart: { x: 150, y: 510 },
        goal: { x: 250, y: 548 },
        timeBonus: 200,
    },
    {
        id: 17, name: "Neptune's Depths", width: 19780, height: 700, biome: 'water',
        platforms: (() => {
            const S = 0.43;
            return [
                createPlat(100 * S, 570, 4000 * S, 40, 'water'),
                createPlat(700 * S, 470, 80, 24, 'platform_easy'),
                createPlat(950 * S, 390, 100, 24, 'platform_easy'),
                createPlat(1200 * S, 310, 80, 24, 'platform_medium'),
                createPlat(1450 * S, 390, 80, 24, 'platform_medium'),
                createPlat(1700 * S, 470, 80, 24, 'platform_easy'),
                createPlat(2000 * S, 310, 120, 24, 'platform_hard'),
                createPlat(2250 * S, 390, 80, 24, 'platform_medium'),
                createPlat(2550 * S, 250, 150, 24, 'platform_hard'),
                createPlat(2750 * S, 390, 80, 24, 'platform_medium'),
                createPlat(3000 * S, 570, 3500 * S, 40, 'water'),
                createPlat(3300 * S, 470, 60, 80, 'pipe'),
                createPlat(3450 * S, 430, 80, 24, 'platform_easy'),
                createPlat(3600 * S, 390, 80, 24, 'platform_medium'),
                createPlat(3850 * S, 310, 100, 24, 'platform_hard'),
                createPlat(4100 * S, 390, 80, 24, 'platform_medium'),
                createPlat(4350 * S, 470, 80, 24, 'platform_easy'),
                createPlat(4700 * S, 570, 3000 * S, 40, 'water'),
                createPlat(8000 * S, 570, 1000 * S, 40, 'water'),
            ];
        })(),
        coins: (() => {
            const S = 0.43;
            return [
                createCoin(800 * S, 520), createCoin(1500 * S, 460), createCoin(2400 * S, 380),
                createCoin(3400 * S, 320), createCoin(4400 * S, 280), createCoin(5500 * S, 240),
            ];
        })(),
        questionBlocks: (() => {
            const S = 0.43;
            return [
                createQB(1000 * S, 502, 'mushroom'), createQB(1900 * S, 422, 'flower'),
                createQB(2900 * S, 342, 'star'), createQB(4000 * S, 302, 'mushroom'),
                createQB(5100 * S, 282, 'flower'), createQB(6200 * S, 262, 'star'),
            ];
        })(),
        enemies: (() => {
            const S = 0.43;
            return [
                createEnemy(1200 * S, 520, 'squid'), createEnemy(2600 * S, 490, 'squid'),
                createEnemy(4100 * S, 460, 'piranha'), createEnemy(5500 * S, 440, 'squid'),
            ];
        })(),
        decorations: (() => {
            const S = 0.43;
            return [
                createDeco(900 * S, 490, 'seaweed'), createDeco(2200 * S, 450, 'bubble'),
                createDeco(3600 * S, 410, 'coral'), createDeco(5000 * S, 370, 'shell'),
                createDeco(6400 * S, 330, 'seaweed'), createDeco(7600 * S, 290, 'bubble'),
            ];
        })(),
        movingPlatforms: (() => {
            const S = 0.43;
            return [
                createMovingPlat(2000 * S, 460, 100, 24, 'water', 'horizontal', 200, 22),
                createMovingPlat(5000 * S, 390, 100, 24, 'water', 'vertical', 150, 18),
            ];
        })(),
        playerStart: { x: 150, y: 530 },
        goal: { x: 3440, y: 530 },
        timeBonus: 200,
    },
    {
        id: 18, name: "The Mariana Trench", width: 20000, height: 700, biome: 'water',
        platforms: (() => {
            const S = 0.4;
            return [
                createPlat(100 * S, 580, 4500 * S, 40, 'water'),
                createPlat(800 * S, 480, 80, 24, 'platform_easy'),
                createPlat(1050 * S, 400, 100, 24, 'platform_easy'),
                createPlat(1300 * S, 320, 80, 24, 'platform_medium'),
                createPlat(1550 * S, 400, 80, 24, 'platform_medium'),
                createPlat(1800 * S, 480, 80, 24, 'platform_easy'),
                createPlat(2100 * S, 320, 120, 24, 'platform_hard'),
                createPlat(2350 * S, 400, 80, 24, 'platform_medium'),
                createPlat(2650 * S, 250, 150, 24, 'platform_hard'),
                createPlat(2850 * S, 400, 80, 24, 'platform_medium'),
                createPlat(3150 * S, 320, 100, 24, 'platform_hard'),
                createPlat(3400 * S, 400, 80, 24, 'platform_medium'),
                createPlat(3700 * S, 580, 4000 * S, 40, 'water'),
                createPlat(4000 * S, 480, 60, 80, 'pipe'),
                // Bridge
                createPlat(4150 * S, 440, 80, 24, 'platform_easy'),
                createPlat(4300 * S, 400, 80, 24, 'platform_medium'),
                createPlat(4550 * S, 320, 100, 24, 'platform_hard'),
                createPlat(4800 * S, 400, 80, 24, 'platform_medium'),
                createPlat(5050 * S, 480, 80, 24, 'platform_easy'),
                createPlat(5400 * S, 580, 3500 * S, 40, 'water'),
                createPlat(8000 * S, 580, 1000 * S, 40, 'water'),
            ];
        })(),
        coins: (() => {
            const S = 0.4;
            return [
                createCoin(900 * S, 440), createCoin(1400 * S, 360), createCoin(2300 * S, 280),
                createCoin(3200 * S, 360), createCoin(4100 * S, 280), createCoin(5000 * S, 240),
            ];
        })(),
        questionBlocks: (() => {
            const S = 0.4;
            return [
                createQB(1100 * S, 400, 'mushroom'), createQB(1900 * S, 320, 'flower'),
                createQB(2800 * S, 240, 'star'), createQB(3800 * S, 200, 'mushroom'),
                createQB(4700 * S, 220, 'flower'), createQB(5600 * S, 200, 'star'),
            ];
        })(),
        enemies: (() => {
            const S = 0.4;
            return [
                createEnemy(1300 * S, 520, 'squid'), createEnemy(2600 * S, 500, 'squid'),
                createEnemy(4000 * S, 470, 'piranha'), createEnemy(5200 * S, 450, 'squid'),
            ];
        })(),
        decorations: (() => {
            const S = 0.4;
            return [
                createDeco(1000 * S, 480, 'seaweed'), createDeco(2400 * S, 440, 'bubble'),
                createDeco(3800 * S, 400, 'coral'), createDeco(5200 * S, 360, 'shell'),
                createDeco(6400 * S, 320, 'seaweed'), createDeco(7500 * S, 280, 'bubble'),
            ];
        })(),
        movingPlatforms: (() => {
            const S = 0.4;
            return [
                createMovingPlat(2200 * S, 460, 100, 24, 'water', 'horizontal', 200, 22),
                createMovingPlat(5500 * S, 400, 100, 24, 'water', 'vertical', 150, 18),
            ];
        })(),
        playerStart: { x: 150, y: 540 },
        goal: { x: 3200, y: 540 },
        timeBonus: 220,
    },
];

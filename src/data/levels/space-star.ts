// Space Star World - 6 Levels (IDs 79-84)
// Space station biome with floating enemies and no-gravity sections

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat } from './helpers';

export const SPACE_STAR_LEVELS: LevelData[] = [
    {
        id: 79,
        name: "Orbital Station Alpha",
        width: 20000,
        height: 650,
        biome: 'space-star',
        platforms: (() => {
            const S = 0.625;
            const plats: any[] = [];
            plats.push(createPlat(0, 600, 1200 * S, 40, 'space'));
            plats.push(createPlat(1400 * S, 600, 1000 * S, 40, 'space'));
            plats.push(createPlat(2700 * S, 600, 800 * S, 40, 'space'));
            plats.push(createPlat(3800 * S, 600, 1200 * S, 40, 'space'));
            plats.push(createPlat(5300 * S, 600, 1000 * S, 40, 'space'));
            plats.push(createPlat(6600 * S, 600, 800 * S, 40, 'space'));
            plats.push(createPlat(7700 * S, 600, 1200 * S, 40, 'space'));
            plats.push(createPlat(9200 * S, 600, 1000 * S, 40, 'space'));
            plats.push(createPlat(10500 * S, 600, 800 * S, 40, 'space'));
            plats.push(createPlat(11600 * S, 600, 1200 * S, 40, 'space'));
            plats.push(createPlat(13100 * S, 600, 1000 * S, 40, 'space'));
            plats.push(createPlat(14400 * S, 600, 800 * S, 40, 'space'));
            plats.push(createPlat(15500 * S, 600, 1200 * S, 40, 'space'));
            plats.push(createPlat(17000 * S, 600, 1000 * S, 40, 'space'));
            plats.push(createPlat(18300 * S, 600, 800 * S, 40, 'space'));
            plats.push(createPlat(19400 * S, 600, 1200 * S, 40, 'space'));
            plats.push(createPlat(20900 * S, 600, 1000 * S, 40, 'space'));
            plats.push(createPlat(22200 * S, 600, 800 * S, 40, 'space'));
            plats.push(createPlat(23300 * S, 600, 1200 * S, 40, 'space'));
            plats.push(createPlat(24800 * S, 600, 1000 * S, 40, 'space'));
            plats.push(createPlat(26100 * S, 600, 800 * S, 40, 'space'));
            plats.push(createPlat(27200 * S, 600, 1200 * S, 40, 'space'));
            plats.push(createPlat(28700 * S, 600, 1000 * S, 40, 'space'));
            plats.push(createPlat(30000 * S, 600, 800 * S, 40, 'space'));
            plats.push(createPlat(31100 * S, 600, 900 * S, 40, 'space'));
            plats.push(createPlat(1200 * S, 480, 150 * S, 28, 'metal'));
            plats.push(createPlat(1500 * S, 380, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(1800 * S, 280, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(2400 * S, 450, 150 * S, 28, 'metal'));
            plats.push(createPlat(3400 * S, 400, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(3700 * S, 300, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(5000 * S, 480, 150 * S, 28, 'metal'));
            plats.push(createPlat(5400 * S, 380, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(6300 * S, 450, 150 * S, 28, 'metal'));
            plats.push(createPlat(7400 * S, 350, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(8900 * S, 480, 150 * S, 28, 'metal'));
            plats.push(createPlat(9400 * S, 380, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(10200 * S, 280, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(11300 * S, 450, 150 * S, 28, 'metal'));
            plats.push(createPlat(12800 * S, 350, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(14100 * S, 480, 150 * S, 28, 'metal'));
            plats.push(createPlat(15200 * S, 380, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(16700 * S, 280, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(18000 * S, 450, 150 * S, 28, 'metal'));
            plats.push(createPlat(19100 * S, 350, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(20600 * S, 480, 150 * S, 28, 'metal'));
            plats.push(createPlat(21900 * S, 380, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(23000 * S, 280, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(24500 * S, 450, 150 * S, 28, 'metal'));
            plats.push(createPlat(25800 * S, 350, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(27900 * S, 480, 150 * S, 28, 'metal'));
            plats.push(createPlat(29600 * S, 380, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(30800 * S, 280, 120 * S, 28, 'platform_medium'));
            return plats;
        })(),
        coins: (() => {
            const S = 0.625;
            const coins: any[] = [];
            for (let x = 200 * S; x < 2600 * S; x += 150 * S) coins.push(createCoin(x, 540), createCoin(x + 50 * S, 540));
            for (let x = 2800 * S; x < 3700 * S; x += 150 * S) coins.push(createCoin(x, 540), createCoin(x + 50 * S, 540));
            for (let x = 3900 * S; x < 5200 * S; x += 150 * S) coins.push(createCoin(x, 540), createCoin(x + 50 * S, 540));
            for (let x = 5400 * S; x < 6600 * S; x += 150 * S) coins.push(createCoin(x, 540), createCoin(x + 50 * S, 540));
            for (let x = 6700 * S; x < 7700 * S; x += 150 * S) coins.push(createCoin(x, 540), createCoin(x + 50 * S, 540));
            for (let x = 7800 * S; x < 9100 * S; x += 150 * S) coins.push(createCoin(x, 540), createCoin(x + 50 * S, 540));
            for (let x = 9300 * S; x < 10400 * S; x += 150 * S) coins.push(createCoin(x, 540), createCoin(x + 50 * S, 540));
            for (let x = 10600 * S; x < 11500 * S; x += 150 * S) coins.push(createCoin(x, 540), createCoin(x + 50 * S, 540));
            for (let x = 11700 * S; x < 13000 * S; x += 150 * S) coins.push(createCoin(x, 540), createCoin(x + 50 * S, 540));
            for (let x = 13200 * S; x < 14300 * S; x += 150 * S) coins.push(createCoin(x, 540), createCoin(x + 50 * S, 540));
            coins.push(createCoin(1250 * S, 420), createCoin(1550 * S, 320), createCoin(1850 * S, 220));
            coins.push(createCoin(3450 * S, 340), createCoin(5050 * S, 420));
            coins.push(createCoin(5450 * S, 320), createCoin(7450 * S, 290));
            coins.push(createCoin(8950 * S, 420), createCoin(9450 * S, 320));
            coins.push(createCoin(10250 * S, 220), createCoin(11350 * S, 390));
            coins.push(createCoin(12850 * S, 290), createCoin(14150 * S, 420));
            coins.push(createCoin(15250 * S, 320), createCoin(16750 * S, 220));
            coins.push(createCoin(18050 * S, 390), createCoin(19150 * S, 290));
            coins.push(createCoin(20650 * S, 420), createCoin(21950 * S, 320));
            coins.push(createCoin(23050 * S, 220), createCoin(24550 * S, 390));
            coins.push(createCoin(25850 * S, 290), createCoin(27950 * S, 420));
            coins.push(createCoin(29650 * S, 320), createCoin(30850 * S, 220));
            return coins;
        })(),
        questionBlocks: (() => {
            const S = 0.625;
            return [
                createQB(1500 * S, 310, 'mushroom'), createQB(1800 * S, 210, 'star'), createQB(3400 * S, 330, 'flower'),
                createQB(5400 * S, 310, 'mushroom'), createQB(7400 * S, 280, 'star'), createQB(9400 * S, 310, 'mushroom'),
                createQB(10200 * S, 210, 'flower'), createQB(11300 * S, 320, 'star'), createQB(12800 * S, 220, 'mushroom'),
                createQB(14150 * S, 380, 'flower'),
            ];
        })(),
        enemies: (() => {
            const S = 0.625;
            return [
                createEnemy(800 * S, 490, 'ufo'), createEnemy(1400 * S, 490, 'goomba'), createEnemy(2000 * S, 490, 'crab'),
                createEnemy(2600 * S, 490, 'spiny'), createEnemy(3200 * S, 490, 'ufo'), createEnemy(3800 * S, 490, 'fireball'),
                createEnemy(4400 * S, 490, 'goomba'), createEnemy(5000 * S, 490, 'crab'), createEnemy(5600 * S, 490, 'spiny'),
                createEnemy(6200 * S, 490, 'ufo'), createEnemy(6800 * S, 490, 'fireball'), createEnemy(7400 * S, 490, 'goomba'),
                createEnemy(8000 * S, 490, 'crab'), createEnemy(8600 * S, 490, 'spiny'), createEnemy(9200 * S, 490, 'ufo'),
                createEnemy(9800 * S, 490, 'ghost'), createEnemy(10400 * S, 490, 'fireball'), createEnemy(11000 * S, 490, 'ufo'),
                createEnemy(11600 * S, 490, 'goomba'), createEnemy(12200 * S, 490, 'crab'), createEnemy(12800 * S, 490, 'spiny'),
                createEnemy(13400 * S, 490, 'ufo'),
            ];
        })(),
        decorations: (() => {
            const S = 0.625;
            return [
                createDeco(400 * S, 550, 'planet'), createDeco(1000 * S, 550, 'rocket'), createDeco(2000 * S, 250, 'asteroid'),
                createDeco(3500 * S, 550, 'star'), createDeco(5000 * S, 250, 'satellite'), createDeco(6500 * S, 550, 'planet'),
                createDeco(8000 * S, 550, 'rocket'), createDeco(10000 * S, 250, 'asteroid'), createDeco(12000 * S, 550, 'star'),
                createDeco(14000 * S, 550, 'planet'), createDeco(16500 * S, 250, 'satellite'), createDeco(18500 * S, 550, 'rocket'),
                createDeco(21000 * S, 550, 'star'), createDeco(24000 * S, 250, 'asteroid'),
            ];
        })(),
        playerStart: { x: 150, y: 490 },
        goal: { x: 20000 - 500, y: 558, points: 1000, difficulty: 'easy' },
        timeBonus: 120,
        movingPlatforms: (() => {
            return [
                createMovingPlat(4500, 480, 120, 24, 'platform_medium', 'horizontal', 400, 20),
            ];
        })(),
    },
    {
        id: 80,
        name: "Asteroid Belt Crossing",
        width: 20000,
        height: 680,
        biome: 'space-star',
        platforms: (() => {
            const S = 0.526;
            const plats: any[] = [];
            plats.push(createPlat(0, 620, 1500 * S, 40, 'space'));
            plats.push(createPlat(1800 * S, 620, 1200 * S, 40, 'space'));
            plats.push(createPlat(3300 * S, 620, 1000 * S, 40, 'space'));
            plats.push(createPlat(4600 * S, 620, 1500 * S, 40, 'space'));
            plats.push(createPlat(6400 * S, 620, 1200 * S, 40, 'space'));
            plats.push(createPlat(7900 * S, 620, 1000 * S, 40, 'space'));
            plats.push(createPlat(9200 * S, 620, 1500 * S, 40, 'space'));
            plats.push(createPlat(11000 * S, 620, 1200 * S, 40, 'space'));
            plats.push(createPlat(12500 * S, 620, 1000 * S, 40, 'space'));
            plats.push(createPlat(13800 * S, 620, 1500 * S, 40, 'space'));
            plats.push(createPlat(15600 * S, 620, 1200 * S, 40, 'space'));
            plats.push(createPlat(17100 * S, 620, 1000 * S, 40, 'space'));
            plats.push(createPlat(18400 * S, 620, 1500 * S, 40, 'space'));
            plats.push(createPlat(20200 * S, 620, 1200 * S, 40, 'space'));
            plats.push(createPlat(21700 * S, 620, 1000 * S, 40, 'space'));
            plats.push(createPlat(23000 * S, 620, 1500 * S, 40, 'space'));
            plats.push(createPlat(24800 * S, 620, 1200 * S, 40, 'space'));
            plats.push(createPlat(26300 * S, 620, 1000 * S, 40, 'space'));
            plats.push(createPlat(27600 * S, 620, 1500 * S, 40, 'space'));
            plats.push(createPlat(29400 * S, 620, 1200 * S, 40, 'space'));
            plats.push(createPlat(30900 * S, 620, 1000 * S, 40, 'space'));
            plats.push(createPlat(32200 * S, 620, 1500 * S, 40, 'space'));
            plats.push(createPlat(34000 * S, 620, 1200 * S, 40, 'space'));
            plats.push(createPlat(35500 * S, 620, 1000 * S, 40, 'space'));
            plats.push(createPlat(36800 * S, 620, 1200 * S, 40, 'space'));
            plats.push(createPlat(1500 * S, 500, 180 * S, 28, 'metal'));
            plats.push(createPlat(1850 * S, 400, 140 * S, 28, 'platform_easy'));
            plats.push(createPlat(2200 * S, 300, 140 * S, 28, 'platform_medium'));
            plats.push(createPlat(2550 * S, 200, 140 * S, 28, 'platform_hard'));
            plats.push(createPlat(3000 * S, 480, 180 * S, 28, 'metal'));
            plats.push(createPlat(4300 * S, 420, 140 * S, 28, 'platform_easy'));
            plats.push(createPlat(6100 * S, 500, 180 * S, 28, 'metal'));
            plats.push(createPlat(7600 * S, 380, 140 * S, 28, 'platform_hard'));
            plats.push(createPlat(8900 * S, 480, 180 * S, 28, 'metal'));
            plats.push(createPlat(10700 * S, 400, 140 * S, 28, 'platform_medium'));
            plats.push(createPlat(12200 * S, 500, 180 * S, 28, 'metal'));
            plats.push(createPlat(13500 * S, 320, 140 * S, 28, 'platform_easy'));
            plats.push(createPlat(15300 * S, 480, 180 * S, 28, 'metal'));
            plats.push(createPlat(16800 * S, 380, 140 * S, 28, 'platform_hard'));
            plats.push(createPlat(18100 * S, 500, 180 * S, 28, 'metal'));
            plats.push(createPlat(19900 * S, 400, 140 * S, 28, 'platform_medium'));
            plats.push(createPlat(21400 * S, 480, 180 * S, 28, 'metal'));
            plats.push(createPlat(22700 * S, 320, 140 * S, 28, 'platform_easy'));
            plats.push(createPlat(24500 * S, 500, 180 * S, 28, 'metal'));
            plats.push(createPlat(26000 * S, 400, 140 * S, 28, 'platform_hard'));
            plats.push(createPlat(27300 * S, 480, 180 * S, 28, 'metal'));
            plats.push(createPlat(29100 * S, 380, 140 * S, 28, 'platform_medium'));
            plats.push(createPlat(30600 * S, 500, 180 * S, 28, 'metal'));
            plats.push(createPlat(31900 * S, 320, 140 * S, 28, 'platform_easy'));
            plats.push(createPlat(33700 * S, 480, 180 * S, 28, 'metal'));
            plats.push(createPlat(35200 * S, 400, 140 * S, 28, 'platform_hard'));
            plats.push(createPlat(36500 * S, 500, 180 * S, 28, 'metal'));
            plats.push(createPlat(37800 * S, 380, 140 * S, 28, 'platform_medium'));
            return plats;
        })(),
        coins: (() => {
            const S = 0.526;
            const coins: any[] = [];
            for (let x = 300 * S; x < 3000 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 3400 * S; x < 4500 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 4700 * S; x < 6300 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 6500 * S; x < 7800 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 8000 * S; x < 9100 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 9300 * S; x < 10900 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 11100 * S; x < 12400 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 12600 * S; x < 13700 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 13900 * S; x < 15500 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 15700 * S; x < 17000 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 17200 * S; x < 18300 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 18500 * S; x < 20100 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 20300 * S; x < 21600 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 21800 * S; x < 22900 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 23100 * S; x < 24700 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 24900 * S; x < 26200 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 26400 * S; x < 27500 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 27700 * S; x < 29300 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 29500 * S; x < 30800 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 56));
            for (let x = 31000 * S; x < 32100 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 32300 * S; x < 33900 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 34100 * S; x < 35400 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 35600 * S; x < 36700 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            for (let x = 36900 * S; x < 38000 * S; x += 150 * S) coins.push(createCoin(x, 560), createCoin(x + 60 * S, 560));
            coins.push(createCoin(1600 * S, 440), createCoin(1950 * S, 340), createCoin(2300 * S, 240), createCoin(2600 * S, 140));
            coins.push(createCoin(3100 * S, 420), createCoin(4400 * S, 360), createCoin(6200 * S, 440));
            coins.push(createCoin(7700 * S, 320), createCoin(9000 * S, 420), createCoin(10800 * S, 340));
            coins.push(createCoin(12300 * S, 440), createCoin(13600 * S, 260), createCoin(15400 * S, 420));
            coins.push(createCoin(16900 * S, 320), createCoin(18200 * S, 440), createCoin(20000 * S, 340));
            coins.push(createCoin(21500 * S, 420), createCoin(22800 * S, 260), createCoin(24600 * S, 440));
            coins.push(createCoin(26100 * S, 340), createCoin(27400 * S, 420), createCoin(29200 * S, 320));
            coins.push(createCoin(30700 * S, 440), createCoin(32000 * S, 260), createCoin(33800 * S, 420));
            coins.push(createCoin(35300 * S, 340), createCoin(36600 * S, 440), createCoin(37900 * S, 320));
            return coins;
        })(),
        questionBlocks: (() => {
            const S = 0.526;
            return [
                createQB(1850 * S, 330, 'star'), createQB(2200 * S, 200, 'mushroom'), createQB(4300 * S, 350, 'flower'),
                createQB(6100 * S, 430, 'mushroom'), createQB(7600 * S, 310, 'star'), createQB(10700 * S, 330, 'mushroom'),
                createQB(12200 * S, 370, 'flower'), createQB(13500 * S, 250, 'star'), createQB(15300 * S, 410, 'mushroom'),
                createQB(16800 * S, 310, 'flower'),
            ];
        })(),
        enemies: (() => {
            const S = 0.526;
            return [
                createEnemy(1000 * S, 510, 'ufo'), createEnemy(1700 * S, 510, 'goomba'), createEnemy(2400 * S, 510, 'crab'),
                createEnemy(3100 * S, 510, 'spiny'), createEnemy(3800 * S, 510, 'fireball'), createEnemy(4500 * S, 510, 'ufo'),
                createEnemy(5200 * S, 510, 'goomba'), createEnemy(5900 * S, 510, 'crab'), createEnemy(6600 * S, 510, 'spiny'),
                createEnemy(7300 * S, 510, 'fireball'), createEnemy(8000 * S, 510, 'ufo'), createEnemy(8700 * S, 510, 'goomba'),
                createEnemy(9400 * S, 510, 'crab'), createEnemy(10100 * S, 510, 'spiny'), createEnemy(10800 * S, 510, 'fireball'),
                createEnemy(11500 * S, 510, 'ufo'), createEnemy(12200 * S, 510, 'goomba'), createEnemy(12900 * S, 510, 'crab'),
                createEnemy(13600 * S, 510, 'spiny'), createEnemy(14300 * S, 510, 'fireball'), createEnemy(15000 * S, 510, 'ufo'),
                createEnemy(15700 * S, 510, 'goomba'),
            ];
        })(),
        decorations: (() => {
            const S = 0.526;
            return [
                createDeco(600 * S, 570, 'planet'), createDeco(1500 * S, 570, 'rocket'), createDeco(2800 * S, 180, 'asteroid'),
                createDeco(4500 * S, 570, 'star'), createDeco(6000 * S, 180, 'satellite'), createDeco(7500 * S, 570, 'planet'),
                createDeco(10000 * S, 570, 'rocket'), createDeco(13000 * S, 180, 'asteroid'), createDeco(15500 * S, 570, 'star'),
                createDeco(18000 * S, 570, 'planet'), createDeco(20500 * S, 180, 'satellite'), createDeco(23500 * S, 570, 'rocket'),
                createDeco(27000 * S, 570, 'star'), createDeco(30500 * S, 180, 'asteroid'), createDeco(33000 * S, 570, 'planet'),
            ];
        })(),
        playerStart: { x: 150, y: 510 },
        goal: { x: 20000 - 500, y: 578, points: 1500, difficulty: 'medium' },
        timeBonus: 150,
        movingPlatforms: (() => {
            return [
                createMovingPlat(5500, 450, 120, 24, 'platform_medium', 'horizontal', 350, 22),
                createMovingPlat(9000, 350, 100, 24, 'platform_medium', 'vertical', 200, 20),
            ];
        })(),
    },
    {
        id: 81,
        name: "Nebula Core Expedition",
        width: 20000,
        height: 700,
        biome: 'space-star',
        platforms: (() => {
            const S = 0.476;
            const plats: any[] = [];
            plats.push(createPlat(0, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(1900 * S, 640, 1400 * S, 40, 'space'));
            plats.push(createPlat(3600 * S, 640, 1200 * S, 40, 'space'));
            plats.push(createPlat(5100 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(7000 * S, 640, 1400 * S, 40, 'space'));
            plats.push(createPlat(8700 * S, 640, 1200 * S, 40, 'space'));
            plats.push(createPlat(10200 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(12100 * S, 640, 1400 * S, 40, 'space'));
            plats.push(createPlat(13800 * S, 640, 1200 * S, 40, 'space'));
            plats.push(createPlat(15300 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(17200 * S, 640, 1400 * S, 40, 'space'));
            plats.push(createPlat(18900 * S, 640, 1200 * S, 40, 'space'));
            plats.push(createPlat(20400 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(22300 * S, 640, 1400 * S, 40, 'space'));
            plats.push(createPlat(24000 * S, 640, 1200 * S, 40, 'space'));
            plats.push(createPlat(25500 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(27400 * S, 640, 1400 * S, 40, 'space'));
            plats.push(createPlat(29100 * S, 640, 1200 * S, 40, 'space'));
            plats.push(createPlat(30600 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(32500 * S, 640, 1400 * S, 40, 'space'));
            plats.push(createPlat(34200 * S, 640, 1200 * S, 40, 'space'));
            plats.push(createPlat(35700 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(37600 * S, 640, 1400 * S, 40, 'space'));
            plats.push(createPlat(39300 * S, 640, 1200 * S, 40, 'space'));
            plats.push(createPlat(40800 * S, 640, 1200 * S, 40, 'space'));
            plats.push(createPlat(1600 * S, 520, 200 * S, 28, 'metal'));
            plats.push(createPlat(2000 * S, 420, 160 * S, 28, 'platform_easy'));
            plats.push(createPlat(2350 * S, 320, 160 * S, 28, 'platform_medium'));
            plats.push(createPlat(2700 * S, 220, 160 * S, 28, 'platform_hard'));
            plats.push(createPlat(3050 * S, 120, 200 * S, 28, 'metal'));
            plats.push(createPlat(3500 * S, 500, 200 * S, 28, 'metal'));
            plats.push(createPlat(5000 * S, 520, 160 * S, 28, 'platform_medium'));
            plats.push(createPlat(6900 * S, 420, 200 * S, 28, 'metal'));
            plats.push(createPlat(8600 * S, 520, 160 * S, 28, 'platform_easy'));
            plats.push(createPlat(10100 * S, 420, 200 * S, 28, 'metal'));
            plats.push(createPlat(12000 * S, 520, 160 * S, 28, 'platform_hard'));
            plats.push(createPlat(13700 * S, 420, 200 * S, 28, 'metal'));
            plats.push(createPlat(15200 * S, 520, 160 * S, 28, 'platform_medium'));
            plats.push(createPlat(17100 * S, 420, 200 * S, 28, 'metal'));
            plats.push(createPlat(18800 * S, 520, 160 * S, 28, 'platform_easy'));
            plats.push(createPlat(20300 * S, 420, 200 * S, 28, 'metal'));
            plats.push(createPlat(22200 * S, 520, 160 * S, 28, 'platform_hard'));
            plats.push(createPlat(23900 * S, 420, 200 * S, 28, 'metal'));
            plats.push(createPlat(25400 * S, 520, 160 * S, 28, 'platform_medium'));
            plats.push(createPlat(27300 * S, 420, 200 * S, 28, 'metal'));
            plats.push(createPlat(29000 * S, 520, 160 * S, 28, 'platform_easy'));
            plats.push(createPlat(30500 * S, 420, 200 * S, 28, 'metal'));
            plats.push(createPlat(32400 * S, 520, 160 * S, 28, 'platform_hard'));
            plats.push(createPlat(34100 * S, 420, 200 * S, 28, 'metal'));
            plats.push(createPlat(35600 * S, 520, 160 * S, 28, 'platform_medium'));
            plats.push(createPlat(37500 * S, 420, 200 * S, 28, 'metal'));
            plats.push(createPlat(39200 * S, 520, 160 * S, 28, 'platform_easy'));
            plats.push(createPlat(40700 * S, 420, 200 * S, 28, 'metal'));
            plats.push(createPlat(42000 * S, 350, 160 * S, 28, 'platform_hard'));
            return plats;
        })(),
        coins: (() => {
            const S = 0.476;
            const coins: any[] = [];
            for (let x = 300 * S; x < 3600 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 3700 * S; x < 5000 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 5200 * S; x < 6900 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 7100 * S; x < 8600 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 8800 * S; x < 10100 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 10300 * S; x < 12000 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 12200 * S; x < 13700 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 13900 * S; x < 15200 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 15400 * S; x < 17100 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 17300 * S; x < 18800 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 19000 * S; x < 20300 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 20500 * S; x < 22200 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 22400 * S; x < 23900 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 24100 * S; x < 25400 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 25600 * S; x < 27300 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 27500 * S; x < 29000 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 29200 * S; x < 30500 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 30700 * S; x < 32400 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 32600 * S; x < 34100 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 34300 * S; x < 35600 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 35800 * S; x < 37500 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 37700 * S; x < 39200 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 39400 * S; x < 40700 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            for (let x = 40900 * S; x < 42000 * S; x += 160 * S) coins.push(createCoin(x, 580), createCoin(x + 70 * S, 580));
            coins.push(createCoin(1700 * S, 460), createCoin(2100 * S, 360), createCoin(2450 * S, 260), createCoin(2800 * S, 160), createCoin(3150 * S, 60));
            coins.push(createCoin(3600 * S, 440), createCoin(5100 * S, 460), createCoin(7000 * S, 360));
            coins.push(createCoin(8700 * S, 460), createCoin(10200 * S, 360), createCoin(12100 * S, 460));
            coins.push(createCoin(13800 * S, 360), createCoin(15300 * S, 460), createCoin(17200 * S, 360));
            coins.push(createCoin(18900 * S, 460), createCoin(20400 * S, 360), createCoin(22300 * S, 460));
            coins.push(createCoin(24000 * S, 360), createCoin(25500 * S, 460), createCoin(27400 * S, 360));
            coins.push(createCoin(29100 * S, 460), createCoin(30600 * S, 360), createCoin(32500 * S, 460));
            coins.push(createCoin(34200 * S, 360), createCoin(35700 * S, 460), createCoin(37600 * S, 360));
            coins.push(createCoin(39300 * S, 460), createCoin(40800 * S, 360), createCoin(42000 * S, 290));
            return coins;
        })(),
        questionBlocks: (() => {
            const S = 0.476;
            return [
                createQB(2000 * S, 350, 'mushroom'), createQB(2350 * S, 250, 'star'), createQB(2700 * S, 150, 'flower'),
                createQB(3050 * S, 50, 'mushroom'), createQB(5000 * S, 390, 'star'), createQB(6900 * S, 350, 'mushroom'),
                createQB(8600 * S, 450, 'flower'), createQB(10100 * S, 350, 'star'), createQB(12000 * S, 450, 'mushroom'),
                createQB(13700 * S, 350, 'flower'), createQB(15200 * S, 450, 'star'),
            ];
        })(),
        enemies: (() => {
            const S = 0.476;
            return [
                createEnemy(1200 * S, 530, 'ufo'), createEnemy(2000 * S, 530, 'goomba'), createEnemy(2800 * S, 530, 'crab'),
                createEnemy(3600 * S, 530, 'spiny'), createEnemy(4400 * S, 530, 'fireball'), createEnemy(5200 * S, 530, 'ufo'),
                createEnemy(6000 * S, 530, 'goomba'), createEnemy(6800 * S, 530, 'crab'), createEnemy(7600 * S, 530, 'spiny'),
                createEnemy(8400 * S, 530, 'fireball'), createEnemy(9200 * S, 530, 'ufo'), createEnemy(10000 * S, 530, 'goomba'),
                createEnemy(10800 * S, 530, 'crab'), createEnemy(11600 * S, 530, 'spiny'), createEnemy(12400 * S, 530, 'fireball'),
                createEnemy(13200 * S, 530, 'ufo'), createEnemy(14000 * S, 530, 'goomba'), createEnemy(14800 * S, 530, 'crab'),
                createEnemy(15600 * S, 530, 'spiny'), createEnemy(16400 * S, 530, 'fireball'), createEnemy(17200 * S, 530, 'ufo'),
                createEnemy(18000 * S, 530, 'ghost'),
            ];
        })(),
        decorations: (() => {
            const S = 0.476;
            return [
                createDeco(800 * S, 590, 'planet'), createDeco(2000 * S, 590, 'rocket'), createDeco(3800 * S, 150, 'asteroid'),
                createDeco(5500 * S, 590, 'star'), createDeco(7500 * S, 150, 'satellite'), createDeco(9500 * S, 590, 'planet'),
                createDeco(11500 * S, 590, 'rocket'), createDeco(14500 * S, 150, 'asteroid'), createDeco(16500 * S, 590, 'star'),
                createDeco(19500 * S, 590, 'planet'), createDeco(22500 * S, 150, 'satellite'), createDeco(25000 * S, 590, 'rocket'),
                createDeco(28000 * S, 590, 'star'), createDeco(31500 * S, 150, 'asteroid'), createDeco(34000 * S, 590, 'planet'),
            ];
        })(),
        playerStart: { x: 150, y: 530 },
        goal: { x: 20000 - 500, y: 598, points: 2000, difficulty: 'medium' },
        timeBonus: 170,
        movingPlatforms: (() => {
            return [
                createMovingPlat(6800, 480, 120, 24, 'platform_medium', 'horizontal', 350, 20),
                createMovingPlat(12500, 380, 100, 24, 'platform_medium', 'vertical', 160, 22),
            ];
        })(),
    },
    {
        id: 82,
        name: "Void Passage Alpha",
        width: 19980,
        height: 680,
        biome: 'space-star',
        platforms: (() => {
            const S = 0.444;
            const plats: any[] = [];
            plats.push(createPlat(0, 620, 1700 * S, 40, 'space'));
            plats.push(createPlat(2000 * S, 620, 1500 * S, 40, 'space'));
            plats.push(createPlat(3800 * S, 620, 1300 * S, 40, 'space'));
            plats.push(createPlat(5400 * S, 620, 1700 * S, 40, 'space'));
            plats.push(createPlat(7400 * S, 620, 1500 * S, 40, 'space'));
            plats.push(createPlat(9200 * S, 620, 1300 * S, 40, 'space'));
            plats.push(createPlat(10800 * S, 620, 1700 * S, 40, 'space'));
            plats.push(createPlat(12800 * S, 620, 1500 * S, 40, 'space'));
            plats.push(createPlat(14600 * S, 620, 1300 * S, 40, 'space'));
            plats.push(createPlat(16200 * S, 620, 1700 * S, 40, 'space'));
            plats.push(createPlat(18200 * S, 620, 1500 * S, 40, 'space'));
            plats.push(createPlat(20000 * S, 620, 1300 * S, 40, 'space'));
            plats.push(createPlat(21600 * S, 620, 1700 * S, 40, 'space'));
            plats.push(createPlat(23600 * S, 620, 1500 * S, 40, 'space'));
            plats.push(createPlat(25400 * S, 620, 1300 * S, 40, 'space'));
            plats.push(createPlat(27000 * S, 620, 1700 * S, 40, 'space'));
            plats.push(createPlat(29000 * S, 620, 1500 * S, 40, 'space'));
            plats.push(createPlat(30800 * S, 620, 1300 * S, 40, 'space'));
            plats.push(createPlat(32400 * S, 620, 1700 * S, 40, 'space'));
            plats.push(createPlat(34400 * S, 620, 1500 * S, 40, 'space'));
            plats.push(createPlat(36200 * S, 620, 1300 * S, 40, 'space'));
            plats.push(createPlat(37800 * S, 620, 1700 * S, 40, 'space'));
            plats.push(createPlat(39800 * S, 620, 1500 * S, 40, 'space'));
            plats.push(createPlat(41600 * S, 620, 1300 * S, 40, 'space'));
            plats.push(createPlat(43200 * S, 620, 1800 * S, 40, 'space'));
            plats.push(createPlat(1700 * S, 500, 220 * S, 28, 'metal'));
            plats.push(createPlat(2100 * S, 400, 180 * S, 28, 'platform_easy'));
            plats.push(createPlat(2500 * S, 300, 180 * S, 28, 'platform_medium'));
            plats.push(createPlat(2900 * S, 200, 180 * S, 28, 'platform_hard'));
            plats.push(createPlat(3300 * S, 100, 220 * S, 28, 'metal'));
            plats.push(createPlat(3700 * S, 480, 220 * S, 28, 'metal'));
            plats.push(createPlat(5300 * S, 500, 180 * S, 28, 'platform_medium'));
            plats.push(createPlat(7300 * S, 420, 220 * S, 28, 'metal'));
            plats.push(createPlat(9100 * S, 500, 180 * S, 28, 'platform_easy'));
            plats.push(createPlat(10700 * S, 400, 220 * S, 28, 'metal'));
            plats.push(createPlat(12700 * S, 500, 180 * S, 28, 'platform_hard'));
            plats.push(createPlat(14500 * S, 400, 220 * S, 28, 'metal'));
            plats.push(createPlat(16100 * S, 500, 180 * S, 28, 'platform_medium'));
            plats.push(createPlat(18100 * S, 400, 220 * S, 28, 'metal'));
            plats.push(createPlat(19900 * S, 500, 180 * S, 28, 'platform_easy'));
            plats.push(createPlat(21500 * S, 400, 220 * S, 28, 'metal'));
            plats.push(createPlat(23500 * S, 500, 180 * S, 28, 'platform_hard'));
            plats.push(createPlat(25300 * S, 400, 220 * S, 28, 'metal'));
            plats.push(createPlat(26900 * S, 500, 180 * S, 28, 'platform_medium'));
            plats.push(createPlat(28900 * S, 400, 220 * S, 28, 'metal'));
            plats.push(createPlat(30700 * S, 500, 180 * S, 28, 'platform_easy'));
            plats.push(createPlat(32300 * S, 400, 220 * S, 28, 'metal'));
            plats.push(createPlat(34300 * S, 500, 180 * S, 28, 'platform_hard'));
            plats.push(createPlat(36100 * S, 400, 220 * S, 28, 'metal'));
            plats.push(createPlat(37700 * S, 500, 180 * S, 28, 'platform_medium'));
            plats.push(createPlat(39700 * S, 400, 220 * S, 28, 'metal'));
            plats.push(createPlat(41500 * S, 500, 180 * S, 28, 'platform_easy'));
            plats.push(createPlat(43100 * S, 400, 220 * S, 28, 'metal'));
            plats.push(createPlat(45000 * S, 300, 180 * S, 28, 'platform_hard'));
            return plats;
        })(),
        coins: (() => {
            const S = 0.444;
            const coins: any[] = [];
            for (let x = 300 * S; x < 3800 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 3900 * S; x < 5300 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 5500 * S; x < 7300 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 7500 * S; x < 9100 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 9300 * S; x < 10700 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 10900 * S; x < 12700 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 12900 * S; x < 14500 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 14700 * S; x < 16100 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 16300 * S; x < 18100 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 18300 * S; x < 19900 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 20100 * S; x < 21500 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 21700 * S; x < 23500 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 23700 * S; x < 25300 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 25500 * S; x < 26900 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 27100 * S; x < 28900 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 29100 * S; x < 30700 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 30900 * S; x < 32300 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 32500 * S; x < 34300 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 34500 * S; x < 36100 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 36300 * S; x < 37700 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 37900 * S; x < 39700 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 39900 * S; x < 41500 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 41700 * S; x < 43100 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            for (let x = 43300 * S; x < 45000 * S; x += 170 * S) coins.push(createCoin(x, 560), createCoin(x + 80 * S, 560));
            coins.push(createCoin(1800 * S, 440), createCoin(2200 * S, 340), createCoin(2600 * S, 240), createCoin(3000 * S, 140), createCoin(3400 * S, 40));
            coins.push(createCoin(3800 * S, 420), createCoin(5400 * S, 440), createCoin(7400 * S, 360));
            coins.push(createCoin(9200 * S, 440), createCoin(10800 * S, 340), createCoin(12800 * S, 440));
            coins.push(createCoin(14600 * S, 340), createCoin(16200 * S, 440), createCoin(18200 * S, 340));
            coins.push(createCoin(20000 * S, 440), createCoin(21600 * S, 340), createCoin(23600 * S, 440));
            coins.push(createCoin(25400 * S, 340), createCoin(27000 * S, 440), createCoin(29000 * S, 340));
            coins.push(createCoin(30800 * S, 440), createCoin(32400 * S, 340), createCoin(34400 * S, 440));
            coins.push(createCoin(36200 * S, 340), createCoin(37800 * S, 440), createCoin(39800 * S, 340));
            coins.push(createCoin(41600 * S, 440), createCoin(43200 * S, 340), createCoin(45000 * S, 240));
            return coins;
        })(),
        questionBlocks: (() => {
            const S = 0.444;
            return [
                createQB(2100 * S, 330, 'mushroom'), createQB(2500 * S, 230, 'star'), createQB(2900 * S, 130, 'flower'),
                createQB(3300 * S, 30, 'mushroom'), createQB(5300 * S, 430, 'star'), createQB(7300 * S, 350, 'mushroom'),
                createQB(9100 * S, 430, 'flower'), createQB(10700 * S, 330, 'star'), createQB(12700 * S, 430, 'mushroom'),
                createQB(14500 * S, 330, 'flower'), createQB(16200 * S, 430, 'star'), createQB(18200 * S, 330, 'mushroom'),
            ];
        })(),
        enemies: (() => {
            const S = 0.444;
            return [
                createEnemy(1300 * S, 510, 'ufo'), createEnemy(2200 * S, 510, 'goomba'), createEnemy(3100 * S, 510, 'crab'),
                createEnemy(4000 * S, 510, 'spiny'), createEnemy(4900 * S, 510, 'fireball'), createEnemy(5800 * S, 510, 'ufo'),
                createEnemy(6700 * S, 510, 'goomba'), createEnemy(7600 * S, 510, 'crab'), createEnemy(8500 * S, 510, 'spiny'),
                createEnemy(9400 * S, 510, 'fireball'), createEnemy(10300 * S, 510, 'ufo'), createEnemy(11200 * S, 510, 'goomba'),
                createEnemy(12100 * S, 510, 'crab'), createEnemy(13000 * S, 510, 'spiny'), createEnemy(13900 * S, 510, 'fireball'),
                createEnemy(14800 * S, 510, 'ufo'), createEnemy(15700 * S, 510, 'goomba'), createEnemy(16600 * S, 510, 'crab'),
                createEnemy(17500 * S, 510, 'spiny'), createEnemy(18400 * S, 510, 'fireball'), createEnemy(19300 * S, 510, 'ghost'),
            ];
        })(),
        decorations: (() => {
            const S = 0.444;
            return [
                createDeco(900 * S, 570, 'planet'), createDeco(2200 * S, 570, 'rocket'), createDeco(4100 * S, 130, 'asteroid'),
                createDeco(5800 * S, 570, 'star'), createDeco(8000 * S, 130, 'satellite'), createDeco(10000 * S, 570, 'planet'),
                createDeco(12000 * S, 570, 'rocket'), createDeco(15000 * S, 130, 'asteroid'), createDeco(17500 * S, 570, 'star'),
                createDeco(21000 * S, 570, 'planet'), createDeco(24000 * S, 130, 'satellite'), createDeco(26500 * S, 570, 'rocket'),
                createDeco(29500 * S, 570, 'star'), createDeco(33000 * S, 130, 'asteroid'), createDeco(35500 * S, 570, 'planet'),
                createDeco(38500 * S, 570, 'rocket'), createDeco(42000 * S, 130, 'asteroid'),
            ];
        })(),
        playerStart: { x: 150, y: 510 },
        goal: { x: 19980 - 500, y: 578, points: 2500, difficulty: 'hard' },
        timeBonus: 190,
        movingPlatforms: (() => {
            return [
                createMovingPlat(7000, 460, 120, 24, 'platform_medium', 'horizontal', 350, 22),
                createMovingPlat(13000, 380, 100, 24, 'platform_medium', 'vertical', 140, 20),
            ];
        })(),
    },
    {
        id: 83,
        name: "Gravity Well Station",
        width: 20016,
        height: 700,
        biome: 'space-star',
        platforms: (() => {
            const S = 0.417;
            const plats: any[] = [];
            plats.push(createPlat(0, 640, 1800 * S, 40, 'space'));
            plats.push(createPlat(2100 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(4000 * S, 640, 1400 * S, 40, 'space'));
            plats.push(createPlat(5700 * S, 640, 1800 * S, 40, 'space'));
            plats.push(createPlat(7800 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(9700 * S, 640, 1400 * S, 40, 'space'));
            plats.push(createPlat(11400 * S, 640, 1800 * S, 40, 'space'));
            plats.push(createPlat(13500 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(15400 * S, 640, 1400 * S, 40, 'space'));
            plats.push(createPlat(17100 * S, 640, 1800 * S, 40, 'space'));
            plats.push(createPlat(19200 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(21100 * S, 640, 1400 * S, 40, 'space'));
            plats.push(createPlat(22800 * S, 640, 1800 * S, 40, 'space'));
            plats.push(createPlat(24900 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(26800 * S, 640, 1400 * S, 40, 'space'));
            plats.push(createPlat(28500 * S, 640, 1800 * S, 40, 'space'));
            plats.push(createPlat(30600 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(32500 * S, 640, 1400 * S, 40, 'space'));
            plats.push(createPlat(34200 * S, 640, 1800 * S, 40, 'space'));
            plats.push(createPlat(36300 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(38200 * S, 640, 1400 * S, 40, 'space'));
            plats.push(createPlat(39900 * S, 640, 1800 * S, 40, 'space'));
            plats.push(createPlat(42000 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(43900 * S, 640, 1400 * S, 40, 'space'));
            plats.push(createPlat(45600 * S, 640, 2400 * S, 40, 'space'));
            plats.push(createPlat(1800 * S, 520, 240 * S, 28, 'metal'));
            plats.push(createPlat(2250 * S, 420, 200 * S, 28, 'platform_easy'));
            plats.push(createPlat(2650 * S, 320, 200 * S, 28, 'platform_medium'));
            plats.push(createPlat(3050 * S, 220, 200 * S, 28, 'platform_hard'));
            plats.push(createPlat(3450 * S, 120, 200 * S, 28, 'platform_hard'));
            plats.push(createPlat(3850 * S, 40, 240 * S, 28, 'metal'));
            plats.push(createPlat(3950 * S, 500, 240 * S, 28, 'metal'));
            plats.push(createPlat(5600 * S, 520, 200 * S, 28, 'platform_medium'));
            plats.push(createPlat(7700 * S, 440, 240 * S, 28, 'metal'));
            plats.push(createPlat(9600 * S, 520, 200 * S, 28, 'platform_easy'));
            plats.push(createPlat(11300 * S, 440, 240 * S, 28, 'metal'));
            plats.push(createPlat(13400 * S, 520, 200 * S, 28, 'platform_hard'));
            plats.push(createPlat(15300 * S, 440, 240 * S, 28, 'metal'));
            plats.push(createPlat(17000 * S, 520, 200 * S, 28, 'platform_medium'));
            plats.push(createPlat(19100 * S, 440, 240 * S, 28, 'metal'));
            plats.push(createPlat(21000 * S, 520, 200 * S, 28, 'platform_easy'));
            plats.push(createPlat(22700 * S, 440, 240 * S, 28, 'metal'));
            plats.push(createPlat(24800 * S, 520, 200 * S, 28, 'platform_hard'));
            plats.push(createPlat(26700 * S, 440, 240 * S, 28, 'metal'));
            plats.push(createPlat(28400 * S, 520, 200 * S, 28, 'platform_medium'));
            plats.push(createPlat(30500 * S, 440, 240 * S, 28, 'metal'));
            plats.push(createPlat(32400 * S, 520, 200 * S, 28, 'platform_easy'));
            plats.push(createPlat(34100 * S, 440, 240 * S, 28, 'metal'));
            plats.push(createPlat(36200 * S, 520, 200 * S, 28, 'platform_hard'));
            plats.push(createPlat(38100 * S, 440, 240 * S, 28, 'metal'));
            plats.push(createPlat(39800 * S, 520, 200 * S, 28, 'platform_medium'));
            plats.push(createPlat(41900 * S, 440, 240 * S, 28, 'metal'));
            plats.push(createPlat(43800 * S, 520, 200 * S, 28, 'platform_easy'));
            plats.push(createPlat(45500 * S, 440, 240 * S, 28, 'metal'));
            plats.push(createPlat(48000 * S, 340, 200 * S, 28, 'platform_hard'));
            return plats;
        })(),
        coins: (() => {
            const S = 0.417;
            const coins: any[] = [];
            for (let x = 300 * S; x < 4000 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 4100 * S; x < 5600 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 5800 * S; x < 7700 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 7900 * S; x < 9600 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 9800 * S; x < 11300 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 11500 * S; x < 13400 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 13600 * S; x < 15300 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 15500 * S; x < 17000 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 17200 * S; x < 19100 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 19300 * S; x < 21000 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 21200 * S; x < 22700 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 22900 * S; x < 24800 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 25000 * S; x < 26700 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 26900 * S; x < 28400 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 28600 * S; x < 30500 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 30700 * S; x < 32400 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 32600 * S; x < 34100 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 34300 * S; x < 36200 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 36400 * S; x < 38100 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 38300 * S; x < 39800 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 40000 * S; x < 41900 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 42100 * S; x < 43800 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 44000 * S; x < 45500 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            for (let x = 45700 * S; x < 48000 * S; x += 180 * S) coins.push(createCoin(x, 580), createCoin(x + 90 * S, 580));
            coins.push(createCoin(1900 * S, 460), createCoin(2350 * S, 360), createCoin(2750 * S, 260), createCoin(3150 * S, 160), createCoin(3550 * S, 60), createCoin(3950 * S, 440));
            coins.push(createCoin(4050 * S, 440), createCoin(5700 * S, 460), createCoin(7800 * S, 380));
            coins.push(createCoin(9700 * S, 460), createCoin(11400 * S, 380), createCoin(13500 * S, 460));
            coins.push(createCoin(15400 * S, 380), createCoin(17100 * S, 460), createCoin(19200 * S, 380));
            coins.push(createCoin(21100 * S, 460), createCoin(22800 * S, 380), createCoin(24900 * S, 460));
            coins.push(createCoin(26800 * S, 380), createCoin(28500 * S, 460), createCoin(30600 * S, 380));
            coins.push(createCoin(32500 * S, 460), createCoin(34200 * S, 380), createCoin(36300 * S, 460));
            coins.push(createCoin(38200 * S, 380), createCoin(39900 * S, 460), createCoin(42000 * S, 380));
            coins.push(createCoin(43900 * S, 460), createCoin(45600 * S, 380), createCoin(48000 * S, 280));
            return coins;
        })(),
        questionBlocks: (() => {
            const S = 0.417;
            return [
                createQB(2250 * S, 350, 'mushroom'), createQB(2650 * S, 250, 'star'), createQB(3050 * S, 150, 'flower'),
                createQB(3450 * S, 50, 'mushroom'), createQB(3850 * S, 370, 'star'), createQB(5600 * S, 450, 'mushroom'),
                createQB(7700 * S, 370, 'flower'), createQB(9600 * S, 450, 'star'), createQB(11300 * S, 370, 'mushroom'),
                createQB(13400 * S, 450, 'flower'), createQB(15300 * S, 370, 'star'), createQB(17000 * S, 450, 'mushroom'),
            ];
        })(),
        enemies: (() => {
            const S = 0.417;
            return [
                createEnemy(1400 * S, 530, 'ufo'), createEnemy(2400 * S, 530, 'goomba'), createEnemy(3400 * S, 530, 'crab'),
                createEnemy(4400 * S, 530, 'spiny'), createEnemy(5400 * S, 530, 'fireball'), createEnemy(6400 * S, 530, 'ufo'),
                createEnemy(7400 * S, 530, 'goomba'), createEnemy(8400 * S, 530, 'crab'), createEnemy(9400 * S, 530, 'spiny'),
                createEnemy(10400 * S, 530, 'fireball'), createEnemy(11400 * S, 530, 'ufo'), createEnemy(12400 * S, 530, 'ghost'),
                createEnemy(13400 * S, 530, 'goomba'), createEnemy(14400 * S, 530, 'crab'), createEnemy(15400 * S, 530, 'spiny'),
                createEnemy(16400 * S, 530, 'fireball'), createEnemy(17400 * S, 530, 'ufo'), createEnemy(18400 * S, 530, 'ghost'),
                createEnemy(19400 * S, 530, 'goomba'), createEnemy(20400 * S, 530, 'crab'), createEnemy(21400 * S, 530, 'spiny'),
                createEnemy(22400 * S, 530, 'fireball'), createEnemy(23400 * S, 530, 'ufo'), createEnemy(24400 * S, 530, 'ghost'),
                createEnemy(25400 * S, 530, 'goomba'),
            ];
        })(),
        decorations: (() => {
            const S = 0.417;
            return [
                createDeco(1000 * S, 590, 'planet'), createDeco(2400 * S, 590, 'rocket'), createDeco(4300 * S, 110, 'asteroid'),
                createDeco(6200 * S, 590, 'star'), createDeco(8500 * S, 110, 'satellite'), createDeco(10500 * S, 590, 'planet'),
                createDeco(12800 * S, 590, 'rocket'), createDeco(15800 * S, 110, 'asteroid'), createDeco(18500 * S, 590, 'star'),
                createDeco(22000 * S, 590, 'planet'), createDeco(25500 * S, 110, 'satellite'), createDeco(28000 * S, 590, 'rocket'),
                createDeco(31000 * S, 590, 'star'), createDeco(35000 * S, 110, 'asteroid'), createDeco(37500 * S, 590, 'planet'),
                createDeco(41000 * S, 590, 'rocket'), createDeco(44500 * S, 110, 'asteroid'),
            ];
        })(),
        playerStart: { x: 150, y: 530 },
        goal: { x: 20016 - 500, y: 598, points: 3000, difficulty: 'hard' },
        timeBonus: 200,
        movingPlatforms: (() => {
            return [
                createMovingPlat(7500, 480, 120, 24, 'platform_medium', 'horizontal', 350, 20),
                createMovingPlat(14000, 400, 100, 24, 'platform_medium', 'vertical', 150, 22),
            ];
        })(),
    },
    {
        id: 84,
        name: "Supernova Finale",
        width: 20000,
        height: 700,
        biome: 'space-star',
        platforms: (() => {
            const S = 0.4;
            const plats: any[] = [];
            plats.push(createPlat(0, 640, 2000 * S, 40, 'space'));
            plats.push(createPlat(2300 * S, 640, 1800 * S, 40, 'space'));
            plats.push(createPlat(4400 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(6300 * S, 640, 2000 * S, 40, 'space'));
            plats.push(createPlat(8600 * S, 640, 1800 * S, 40, 'space'));
            plats.push(createPlat(10700 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(12600 * S, 640, 2000 * S, 40, 'space'));
            plats.push(createPlat(14900 * S, 640, 1800 * S, 40, 'space'));
            plats.push(createPlat(17000 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(18900 * S, 640, 2000 * S, 40, 'space'));
            plats.push(createPlat(21200 * S, 640, 1800 * S, 40, 'space'));
            plats.push(createPlat(23300 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(25200 * S, 640, 2000 * S, 40, 'space'));
            plats.push(createPlat(27500 * S, 640, 1800 * S, 40, 'space'));
            plats.push(createPlat(29600 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(31500 * S, 640, 2000 * S, 40, 'space'));
            plats.push(createPlat(33800 * S, 640, 1800 * S, 40, 'space'));
            plats.push(createPlat(35900 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(37800 * S, 640, 2000 * S, 40, 'space'));
            plats.push(createPlat(40100 * S, 640, 1800 * S, 40, 'space'));
            plats.push(createPlat(42200 * S, 640, 1600 * S, 40, 'space'));
            plats.push(createPlat(44100 * S, 640, 2000 * S, 40, 'space'));
            plats.push(createPlat(46400 * S, 640, 1800 * S, 40, 'space'));
            plats.push(createPlat(48500 * S, 640, 1500 * S, 40, 'space'));
            plats.push(createPlat(2000 * S, 520, 260 * S, 28, 'metal'));
            plats.push(createPlat(2500 * S, 420, 220 * S, 28, 'platform_easy'));
            plats.push(createPlat(2950 * S, 320, 220 * S, 28, 'platform_medium'));
            plats.push(createPlat(3400 * S, 220, 220 * S, 28, 'platform_hard'));
            plats.push(createPlat(3850 * S, 120, 220 * S, 28, 'platform_hard'));
            plats.push(createPlat(4300 * S, 40, 260 * S, 28, 'metal'));
            plats.push(createPlat(4350 * S, 500, 260 * S, 28, 'metal'));
            plats.push(createPlat(6200 * S, 520, 220 * S, 28, 'platform_medium'));
            plats.push(createPlat(8500 * S, 440, 260 * S, 28, 'metal'));
            plats.push(createPlat(10600 * S, 520, 220 * S, 28, 'platform_easy'));
            plats.push(createPlat(12500 * S, 440, 260 * S, 28, 'metal'));
            plats.push(createPlat(14800 * S, 520, 220 * S, 28, 'platform_hard'));
            plats.push(createPlat(16900 * S, 440, 260 * S, 28, 'metal'));
            plats.push(createPlat(18800 * S, 520, 220 * S, 28, 'platform_medium'));
            plats.push(createPlat(21100 * S, 440, 260 * S, 28, 'metal'));
            plats.push(createPlat(23200 * S, 520, 220 * S, 28, 'platform_easy'));
            plats.push(createPlat(25100 * S, 440, 260 * S, 28, 'metal'));
            plats.push(createPlat(27400 * S, 520, 220 * S, 28, 'platform_hard'));
            plats.push(createPlat(29500 * S, 440, 260 * S, 28, 'metal'));
            plats.push(createPlat(31400 * S, 520, 220 * S, 28, 'platform_medium'));
            plats.push(createPlat(33700 * S, 440, 260 * S, 28, 'metal'));
            plats.push(createPlat(35800 * S, 520, 220 * S, 28, 'platform_easy'));
            plats.push(createPlat(37700 * S, 440, 260 * S, 28, 'metal'));
            plats.push(createPlat(40000 * S, 520, 220 * S, 28, 'platform_hard'));
            plats.push(createPlat(42100 * S, 440, 260 * S, 28, 'metal'));
            plats.push(createPlat(44000 * S, 520, 220 * S, 28, 'platform_medium'));
            plats.push(createPlat(46300 * S, 440, 260 * S, 28, 'metal'));
            plats.push(createPlat(48400 * S, 520, 220 * S, 28, 'platform_easy'));
            plats.push(createPlat(50000 * S, 380, 220 * S, 28, 'platform_hard'));
            return plats;
        })(),
        coins: (() => {
            const S = 0.4;
            const coins: any[] = [];
            for (let x = 300 * S; x < 4400 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 4500 * S; x < 6200 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 6400 * S; x < 8500 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 8700 * S; x < 10600 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 10800 * S; x < 12500 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 12700 * S; x < 14800 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 15000 * S; x < 16900 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 17100 * S; x < 18800 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 19000 * S; x < 21100 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 21300 * S; x < 23200 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 23400 * S; x < 25100 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 25300 * S; x < 27400 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 27600 * S; x < 29500 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 29700 * S; x < 31400 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 31600 * S; x < 33700 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 33900 * S; x < 35800 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 36000 * S; x < 37700 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 37900 * S; x < 40000 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 40200 * S; x < 42100 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 42300 * S; x < 44000 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 44200 * S; x < 46300 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 46500 * S; x < 48400 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            for (let x = 48600 * S; x < 50000 * S; x += 200 * S) coins.push(createCoin(x, 580), createCoin(x + 100 * S, 580));
            coins.push(createCoin(2100 * S, 460), createCoin(2600 * S, 360), createCoin(3050 * S, 260), createCoin(3500 * S, 160), createCoin(3950 * S, 60), createCoin(4400 * S, 440));
            coins.push(createCoin(4450 * S, 440), createCoin(6300 * S, 460), createCoin(8600 * S, 380));
            coins.push(createCoin(10700 * S, 460), createCoin(12600 * S, 380), createCoin(14900 * S, 460));
            coins.push(createCoin(17000 * S, 380), createCoin(18900 * S, 460), createCoin(21200 * S, 380));
            coins.push(createCoin(23300 * S, 460), createCoin(25200 * S, 380), createCoin(27500 * S, 460));
            coins.push(createCoin(29600 * S, 380), createCoin(31500 * S, 460), createCoin(33800 * S, 380));
            coins.push(createCoin(35900 * S, 460), createCoin(37800 * S, 380), createCoin(40100 * S, 460));
            coins.push(createCoin(42200 * S, 380), createCoin(44100 * S, 460), createCoin(46400 * S, 380));
            coins.push(createCoin(48500 * S, 460), createCoin(50000 * S, 320));
            return coins;
        })(),
        questionBlocks: (() => {
            const S = 0.4;
            return [
                createQB(2500 * S, 350, 'mushroom'), createQB(2950 * S, 250, 'star'), createQB(3400 * S, 150, 'flower'),
                createQB(3850 * S, 50, 'mushroom'), createQB(4300 * S, 370, 'star'), createQB(6200 * S, 450, 'mushroom'),
                createQB(8500 * S, 370, 'flower'), createQB(10600 * S, 450, 'star'), createQB(12500 * S, 370, 'mushroom'),
                createQB(14800 * S, 450, 'flower'), createQB(16900 * S, 370, 'star'), createQB(18800 * S, 450, 'mushroom'),
            ];
        })(),
        enemies: (() => {
            const S = 0.4;
            return [
                createEnemy(1500 * S, 530, 'ufo'), createEnemy(2700 * S, 530, 'goomba'), createEnemy(3900 * S, 530, 'crab'),
                createEnemy(5100 * S, 530, 'spiny'), createEnemy(6300 * S, 530, 'fireball'), createEnemy(7500 * S, 530, 'ufo'),
                createEnemy(8700 * S, 530, 'goomba'), createEnemy(9900 * S, 530, 'crab'), createEnemy(11100 * S, 530, 'spiny'),
                createEnemy(12300 * S, 530, 'fireball'), createEnemy(13500 * S, 530, 'ufo'), createEnemy(14700 * S, 530, 'ghost'),
                createEnemy(15900 * S, 530, 'goomba'), createEnemy(17100 * S, 530, 'crab'), createEnemy(18300 * S, 530, 'spiny'),
                createEnemy(19500 * S, 530, 'fireball'), createEnemy(20700 * S, 530, 'ufo'), createEnemy(21900 * S, 530, 'ghost'),
                createEnemy(23100 * S, 530, 'goomba'), createEnemy(24300 * S, 530, 'crab'), createEnemy(25500 * S, 530, 'spiny'),
                createEnemy(26700 * S, 530, 'fireball'), createEnemy(27900 * S, 530, 'ufo'), createEnemy(29100 * S, 530, 'ghost'),
                createEnemy(30300 * S, 530, 'goomba'),
            ];
        })(),
        decorations: (() => {
            const S = 0.4;
            return [
                createDeco(1100 * S, 590, 'planet'), createDeco(2600 * S, 590, 'rocket'), createDeco(4700 * S, 90, 'asteroid'),
                createDeco(6800 * S, 590, 'star'), createDeco(9300 * S, 90, 'satellite'), createDeco(11500 * S, 590, 'planet'),
                createDeco(14000 * S, 590, 'rocket'), createDeco(17500 * S, 90, 'asteroid'), createDeco(20500 * S, 590, 'star'),
                createDeco(24000 * S, 590, 'planet'), createDeco(27500 * S, 90, 'satellite'), createDeco(30500 * S, 590, 'rocket'),
                createDeco(34000 * S, 590, 'star'), createDeco(38500 * S, 90, 'asteroid'), createDeco(41000 * S, 590, 'planet'),
                createDeco(45000 * S, 590, 'rocket'), createDeco(48000 * S, 90, 'asteroid'),
            ];
        })(),
        playerStart: { x: 150, y: 530 },
        goal: { x: 20000 - 500, y: 598, points: 5000, difficulty: 'hard' },
        timeBonus: 220,
        movingPlatforms: (() => {
            return [
                createMovingPlat(5400, 450, 120, 24, 'platform_medium', 'horizontal', 400, 22),
                createMovingPlat(9500, 350, 100, 24, 'platform_medium', 'vertical', 200, 20),
                createMovingPlat(14000, 400, 100, 24, 'platform_medium', 'horizontal', 350, 22),
            ];
        })(),
    },
];

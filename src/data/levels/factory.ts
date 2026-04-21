// Factory World - 6 Levels (IDs 49-54)
// Long horizontal side-scrolling factory biome with metal platforms, pipes, and industrial decorations

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat } from './helpers';

const createFactorySection = (startX: number, groundY: number, sectionLength: number, difficulty: number) => {
    const plats: ReturnType<typeof createPlat>[] = [];
    const coins: ReturnType<typeof createCoin>[] = [];
    const enemies: ReturnType<typeof createEnemy>[] = [];
    const decos: ReturnType<typeof createDeco>[] = [];
    
    const groundCount = Math.floor(sectionLength / 300);
    const platformCount = Math.floor(sectionLength / 400);
    
    for (let i = 0; i < groundCount; i++) {
        const x = startX + i * 300;
        const width = 200;
        if (x + width < startX + sectionLength - 100) {
            plats.push(createPlat(x, groundY, width, 40, 'metal'));
        }
    }
    
    for (let i = 0; i < platformCount; i++) {
        const x = startX + 100 + i * 400;
        const y = groundY - 80 - (i * 30);
        const w = 100;
        const ptype = difficulty < 0.5 ? 'platform_easy' : (difficulty < 0.8 ? 'platform_medium' : 'platform_hard');
        if (y > 200 && x + w < startX + sectionLength - 50) {
            plats.push(createPlat(x, y, w, 28, ptype));
            coins.push(createCoin(x + w / 2, y - 30));
        }
    }
    
    const pipeX = startX + 150 + (sectionLength - 400) / 2;
    const pipeH = 64;
    plats.push(createPlat(pipeX, groundY, 64, pipeH, 'pipe'));
    decos.push(createDeco(pipeX, groundY - pipeH + 20, 'pipe'));
    
    const brickX = startX + 200 + (sectionLength - 500) / 2;
    plats.push(createPlat(brickX, groundY - 150, 120, 28, 'brick'));
    coins.push(createCoin(brickX + 60, groundY - 200));
    
    const enemyX = startX + 250 + (sectionLength - 400) / 2;
    const enemyType = 'robot';
    enemies.push(createEnemy(enemyX, groundY - 40, enemyType));
    
    decos.push(createDeco(startX + 100 + 100, groundY - 40, 'gear'));
    decos.push(createDeco(startX + sectionLength - 200, groundY - 40, 'crane'));
    
    return { plats, coins, enemies, decos };
};

export const FACTORY_LEVELS: LevelData[] = [
    {
        id: 49, name: "Gear Grinder", width: 20000, height: 650, biome: 'factory',
        platforms: (() => {
            const S = 0.625;
            const plats: ReturnType<typeof createPlat>[] = [];
            
            // Starting area - dense ground
            plats.push(createPlat(100 * S, 600, 800 * S, 40, 'metal'));
            plats.push(createPlat(1000 * S, 600, 600 * S, 40, 'metal'));
            plats.push(createPlat(1700 * S, 600, 500 * S, 40, 'metal'));
            
            // Vertical climb section 1
            plats.push(createPlat(2300 * S, 540, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(2500 * S, 470, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(2700 * S, 400, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(2950 * S, 330, 150 * S, 40, 'brick'));
            plats.push(createPlat(2700 * S, 260, 100 * S, 28, 'platform_medium'));
            plats.push(createPlat(2450 * S, 330, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(2200 * S, 400, 120 * S, 28, 'platform_medium'));
            
            // Ground continuation
            plats.push(createPlat(3200 * S, 600, 700 * S, 40, 'metal'));
            plats.push(createPlat(4000 * S, 600, 500 * S, 40, 'metal'));
            
            // Pipe section
            plats.push(createPlat(4600 * S, 600, 64 * S, 96, 'pipe'));
            plats.push(createPlat(4800 * S, 600, 64 * S, 64, 'pipe'));
            plats.push(createPlat(5000 * S, 600, 64 * S, 128, 'pipe'));
            
            // Ground section
            plats.push(createPlat(5200 * S, 600, 800 * S, 40, 'metal'));
            plats.push(createPlat(6100 * S, 600, 600 * S, 40, 'metal'));
            
            // Vertical climb 2
            plats.push(createPlat(6800 * S, 540, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(7050 * S, 460, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(7300 * S, 380, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(7600 * S, 300, 150 * S, 40, 'brick'));
            plats.push(createPlat(7900 * S, 380, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(8150 * S, 460, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(8400 * S, 540, 120 * S, 28, 'platform_easy'));
            
            // Long ground stretch
            plats.push(createPlat(8700 * S, 600, 1000 * S, 40, 'metal'));
            plats.push(createPlat(9800 * S, 600, 800 * S, 40, 'metal'));
            
            // Pipe section 2
            plats.push(createPlat(10700 * S, 600, 64 * S, 64, 'pipe'));
            plats.push(createPlat(10900 * S, 600, 64 * S, 96, 'pipe'));
            plats.push(createPlat(11100 * S, 600, 64 * S, 64, 'pipe'));
            
            // Ground
            plats.push(createPlat(11300 * S, 600, 700 * S, 40, 'metal'));
            plats.push(createPlat(12100 * S, 600, 600 * S, 40, 'metal'));
            
            // Vertical climb 3
            plats.push(createPlat(12800 * S, 530, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(13050 * S, 450, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(13300 * S, 370, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(13600 * S, 290, 150 * S, 40, 'brick'));
            plats.push(createPlat(13900 * S, 370, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(14150 * S, 450, 120 * S, 28, 'platform_medium'));
            
            // Ground continuation
            plats.push(createPlat(14500 * S, 600, 900 * S, 40, 'metal'));
            plats.push(createPlat(15500 * S, 600, 700 * S, 40, 'metal'));
            
            // Pipe section 3
            plats.push(createPlat(16300 * S, 600, 64 * S, 96, 'pipe'));
            plats.push(createPlat(16500 * S, 600, 64 * S, 64, 'pipe'));
            
            // Ground
            plats.push(createPlat(16700 * S, 600, 800 * S, 40, 'metal'));
            plats.push(createPlat(17600 * S, 600, 600 * S, 40, 'metal'));
            
            // Vertical climb 4
            plats.push(createPlat(18300 * S, 540, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(18550 * S, 470, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(18800 * S, 400, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(19100 * S, 330, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(19450 * S, 260, 150 * S, 40, 'brick'));
            plats.push(createPlat(18800 * S, 190, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(18550 * S, 260, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(18300 * S, 330, 120 * S, 28, 'platform_easy'));
            
            // Final ground stretch
            plats.push(createPlat(19800 * S, 600, 1200 * S, 40, 'metal'));
            plats.push(createPlat(21100 * S, 600, 800 * S, 40, 'metal'));
            
            // Pipe section 4
            plats.push(createPlat(22000 * S, 600, 64 * S, 96, 'pipe'));
            plats.push(createPlat(22200 * S, 600, 64 * S, 64, 'pipe'));
            plats.push(createPlat(22400 * S, 600, 64 * S, 128, 'pipe'));
            
            plats.push(createPlat(22600 * S, 600, 1000 * S, 40, 'metal'));
            plats.push(createPlat(23700 * S, 600, 800 * S, 40, 'metal'));
            plats.push(createPlat(24600 * S, 600, 600 * S, 40, 'metal'));
            
            // Vertical section before goal
            plats.push(createPlat(25300 * S, 530, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(25550 * S, 450, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(25850 * S, 370, 150 * S, 40, 'brick'));
            plats.push(createPlat(26150 * S, 450, 120 * S, 28, 'platform_medium'));
            
            // Final ground
            plats.push(createPlat(26500 * S, 600, 1200 * S, 40, 'metal'));
            plats.push(createPlat(27800 * S, 600, 800 * S, 40, 'metal'));
            plats.push(createPlat(28700 * S, 600, 600 * S, 40, 'metal'));
            plats.push(createPlat(29400 * S, 600, 500 * S, 40, 'metal'));
            plats.push(createPlat(30000 * S, 600, 400 * S, 40, 'metal'));
            plats.push(createPlat(30500 * S, 600, 500 * S, 40, 'metal'));
            plats.push(createPlat(31100 * S, 600, 400 * S, 40, 'metal'));
            plats.push(createPlat(31600 * S, 600, 400 * S, 40, 'metal'));
            
            return plats;
        })(),
        coins: (() => {
            const S = 0.625;
            const coins: ReturnType<typeof createCoin>[] = [];
            for (let x = 200 * S; x < 30000 * S; x += 150 * S) {
                coins.push(createCoin(x, 550));
            }
            // Vertical section coins
            coins.push(createCoin(2400 * S, 480), createCoin(2600 * S, 410), createCoin(2800 * S, 340), createCoin(3000 * S, 200));
            coins.push(createCoin(6900 * S, 480), createCoin(7150 * S, 400), createCoin(7400 * S, 320), createCoin(7700 * S, 240));
            coins.push(createCoin(12900 * S, 470), createCoin(13150 * S, 390), createCoin(13400 * S, 310), createCoin(13700 * S, 230));
            coins.push(createCoin(18400 * S, 480), createCoin(18650 * S, 410), createCoin(18900 * S, 340), createCoin(19200 * S, 260), createCoin(19550 * S, 130));
            coins.push(createCoin(25400 * S, 470), createCoin(25650 * S, 390), createCoin(25950 * S, 310));
            return coins;
        })(),
        questionBlocks: (() => {
            const S = 0.625;
            return [
                createQB(1700 * S, 480, 'mushroom'),
                createQB(2950 * S, 210, 'coin'),
                createQB(4000 * S, 530, 'star'),
                createQB(5000 * S, 470, 'flower'),
                createQB(6100 * S, 530, 'mushroom'),
                createQB(7600 * S, 240, 'coin'),
                createQB(9800 * S, 530, 'star'),
                createQB(11100 * S, 470, 'mushroom'),
                createQB(12100 * S, 530, 'flower'),
                createQB(13600 * S, 230, 'coin'),
            ];
        })(),
        enemies: (() => {
            const S = 0.625;
            return [
                createEnemy(600 * S, 560, 'robot'), createEnemy(1300 * S, 560, 'koopa'), createEnemy(1900 * S, 560, 'fireball'),
                createEnemy(3500 * S, 560, 'robot'), createEnemy(4400 * S, 560, 'koopa'), createEnemy(5500 * S, 560, 'robot'),
                createEnemy(6400 * S, 560, 'fireball'), createEnemy(7200 * S, 560, 'robot'), createEnemy(9000 * S, 560, 'koopa'),
                createEnemy(10200 * S, 560, 'robot'), createEnemy(11500 * S, 560, 'fireball'), createEnemy(12500 * S, 560, 'robot'),
                createEnemy(1600 * S, 560, 'goomba'), createEnemy(2800 * S, 560, 'crab'), createEnemy(4700 * S, 560, 'goomba'),
            ];
        })(),
        decorations: (() => {
            const S = 0.625;
            return [
                createDeco(200 * S, 560, 'gear'), createDeco(1200 * S, 560, 'crane'), createDeco(2300 * S, 560, 'smoke'),
                createDeco(3200 * S, 560, 'gear'), createDeco(4600 * S, 560, 'pipe'), createDeco(5400 * S, 560, 'conveyor'),
                createDeco(6800 * S, 560, 'gear'), createDeco(8700 * S, 560, 'crane'), createDeco(10700 * S, 560, 'pipe'),
                createDeco(12800 * S, 560, 'smoke'), createDeco(14500 * S, 560, 'gear'), createDeco(16300 * S, 560, 'conveyor'),
                createDeco(18300 * S, 560, 'crane'), createDeco(19800 * S, 560, 'smoke'), createDeco(22000 * S, 560, 'gear'),
            ];
        })(),
        movingPlatforms: (() => {
            const S = 0.625;
            return [
                createMovingPlat(3600 * S, 480, 120, 24, 'platform_medium', 'horizontal', 200, 20),
                createMovingPlat(8600 * S, 520, 120, 24, 'platform_medium', 'horizontal', 250, 22),
            ];
        })(),
        playerStart: { x: 150, y: 550 },
        goal: { x: 20000 - 500, y: 558 },
        timeBonus: 160,
    },
    {
        id: 50, name: "Conveyor Chaos", width: 19460, height: 680, biome: 'factory',
        platforms: (() => {
            const S = 0.556;
            const plats: ReturnType<typeof createPlat>[] = [];
            
            // Starting ground
            plats.push(createPlat(100 * S, 630, 900 * S, 40, 'metal'));
            plats.push(createPlat(1100 * S, 630, 700 * S, 40, 'metal'));
            
            // First vertical climb
            plats.push(createPlat(1900 * S, 560, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(2150 * S, 490, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(2400 * S, 420, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(2650 * S, 350, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(2900 * S, 280, 150 * S, 40, 'brick'));
            plats.push(createPlat(3150 * S, 350, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(3400 * S, 420, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(3650 * S, 490, 120 * S, 28, 'platform_easy'));
            
            // Ground section
            plats.push(createPlat(3900 * S, 630, 800 * S, 40, 'metal'));
            plats.push(createPlat(4800 * S, 630, 600 * S, 40, 'metal'));
            
            // Pipe maze
            plats.push(createPlat(5500 * S, 630, 64 * S, 64, 'pipe'));
            plats.push(createPlat(5700 * S, 630, 64 * S, 96, 'pipe'));
            plats.push(createPlat(5900 * S, 630, 64 * S, 64, 'pipe'));
            plats.push(createPlat(6100 * S, 630, 64 * S, 128, 'pipe'));
            plats.push(createPlat(6350 * S, 630, 64 * S, 64, 'pipe'));
            
            // Ground continuation
            plats.push(createPlat(6500 * S, 630, 900 * S, 40, 'metal'));
            plats.push(createPlat(7500 * S, 630, 700 * S, 40, 'metal'));
            
            // Vertical section 2
            plats.push(createPlat(8300 * S, 560, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(8600 * S, 480, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(8900 * S, 400, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(9200 * S, 320, 150 * S, 40, 'brick'));
            plats.push(createPlat(9500 * S, 400, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(9800 * S, 480, 120 * S, 28, 'platform_medium'));
            
            // Long ground stretch
            plats.push(createPlat(10100 * S, 630, 1200 * S, 40, 'metal'));
            plats.push(createPlat(11400 * S, 630, 800 * S, 40, 'metal'));
            
            // Pipe section 2
            plats.push(createPlat(12300 * S, 630, 64 * S, 96, 'pipe'));
            plats.push(createPlat(12500 * S, 630, 64 * S, 64, 'pipe'));
            plats.push(createPlat(12700 * S, 630, 64 * S, 128, 'pipe'));
            
            plats.push(createPlat(12900 * S, 630, 800 * S, 40, 'metal'));
            plats.push(createPlat(13800 * S, 630, 600 * S, 40, 'metal'));
            
            // Vertical climb 3
            plats.push(createPlat(14500 * S, 560, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(14750 * S, 490, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(15000 * S, 420, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(15250 * S, 350, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(15550 * S, 280, 150 * S, 40, 'brick'));
            plats.push(createPlat(15850 * S, 350, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(16100 * S, 420, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(16350 * S, 490, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(16600 * S, 560, 120 * S, 28, 'platform_easy'));
            
            // Ground continuation
            plats.push(createPlat(16900 * S, 630, 1000 * S, 40, 'metal'));
            plats.push(createPlat(18000 * S, 630, 800 * S, 40, 'metal'));
            
            // Pipe section 3
            plats.push(createPlat(18900 * S, 630, 64 * S, 64, 'pipe'));
            plats.push(createPlat(19100 * S, 630, 64 * S, 96, 'pipe'));
            plats.push(createPlat(19300 * S, 630, 64 * S, 64, 'pipe'));
            
            plats.push(createPlat(19500 * S, 630, 900 * S, 40, 'metal'));
            plats.push(createPlat(20500 * S, 630, 700 * S, 40, 'metal'));
            
            // Vertical section 4
            plats.push(createPlat(21300 * S, 560, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(21600 * S, 480, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(21900 * S, 400, 150 * S, 40, 'brick'));
            plats.push(createPlat(22250 * S, 320, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(22600 * S, 400, 120 * S, 28, 'platform_medium'));
            
            // Final ground stretch
            plats.push(createPlat(22900 * S, 630, 1100 * S, 40, 'metal'));
            plats.push(createPlat(24100 * S, 630, 800 * S, 40, 'metal'));
            
            // Pipe section 4
            plats.push(createPlat(25000 * S, 630, 64 * S, 96, 'pipe'));
            plats.push(createPlat(25200 * S, 630, 64 * S, 64, 'pipe'));
            plats.push(createPlat(25400 * S, 630, 64 * S, 128, 'pipe'));
            
            plats.push(createPlat(25600 * S, 630, 1000 * S, 40, 'metal'));
            plats.push(createPlat(26700 * S, 630, 800 * S, 40, 'metal'));
            plats.push(createPlat(27600 * S, 630, 600 * S, 40, 'metal'));
            
            // Pre-goal vertical
            plats.push(createPlat(28300 * S, 560, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(28550 * S, 480, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(28850 * S, 400, 150 * S, 40, 'brick'));
            
            // Final ground
            plats.push(createPlat(29200 * S, 630, 1200 * S, 40, 'metal'));
            plats.push(createPlat(30500 * S, 630, 800 * S, 40, 'metal'));
            plats.push(createPlat(31400 * S, 630, 600 * S, 40, 'metal'));
            plats.push(createPlat(32100 * S, 630, 500 * S, 40, 'metal'));
            plats.push(createPlat(32700 * S, 630, 400 * S, 40, 'metal'));
            plats.push(createPlat(33200 * S, 630, 500 * S, 40, 'metal'));
            plats.push(createPlat(33800 * S, 630, 400 * S, 40, 'metal'));
            plats.push(createPlat(34300 * S, 630, 400 * S, 40, 'metal'));
            
            return plats;
        })(),
        coins: (() => {
            const S = 0.556;
            const coins: ReturnType<typeof createCoin>[] = [];
            for (let x = 200 * S; x < 34000 * S; x += 140 * S) {
                coins.push(createCoin(x, 580));
            }
            coins.push(createCoin(2000 * S, 500), createCoin(2250 * S, 430), createCoin(2500 * S, 360), createCoin(2750 * S, 280), createCoin(3000 * S, 220));
            coins.push(createCoin(8400 * S, 500), createCoin(8700 * S, 420), createCoin(9000 * S, 340), createCoin(9300 * S, 260));
            coins.push(createCoin(14600 * S, 500), createCoin(14850 * S, 430), createCoin(15100 * S, 360), createCoin(15350 * S, 280), createCoin(15650 * S, 220));
            coins.push(createCoin(21400 * S, 500), createCoin(21700 * S, 420), createCoin(22000 * S, 340), createCoin(22350 * S, 260));
            coins.push(createCoin(28400 * S, 500), createCoin(28650 * S, 420), createCoin(28950 * S, 340));
            return coins;
        })(),
        questionBlocks: (() => {
            const S = 0.556;
            return [
                createQB(1100 * S, 560, 'mushroom'),
                createQB(2900 * S, 220, 'coin'),
                createQB(4800 * S, 560, 'star'),
                createQB(6100 * S, 480, 'flower'),
                createQB(7500 * S, 560, 'mushroom'),
                createQB(9200 * S, 260, 'coin'),
                createQB(11400 * S, 560, 'star'),
                createQB(12700 * S, 480, 'mushroom'),
                createQB(13800 * S, 560, 'flower'),
                createQB(15550 * S, 220, 'coin'),
                createQB(18000 * S, 560, 'star'),
            ];
        })(),
        enemies: (() => {
            const S = 0.556;
            return [
                createEnemy(500 * S, 590, 'robot'), createEnemy(1500 * S, 590, 'koopa'), createEnemy(2100 * S, 590, 'fireball'),
                createEnemy(4000 * S, 590, 'robot'), createEnemy(5200 * S, 590, 'koopa'), createEnemy(6800 * S, 590, 'robot'),
                createEnemy(8000 * S, 590, 'fireball'), createEnemy(8500 * S, 590, 'robot'), createEnemy(10500 * S, 590, 'koopa'),
                createEnemy(12000 * S, 590, 'robot'), createEnemy(14000 * S, 590, 'fireball'), createEnemy(17200 * S, 590, 'robot'),
                createEnemy(2400 * S, 590, 'goomba'), createEnemy(5700 * S, 590, 'spiny'), createEnemy(9800 * S, 590, 'crab'),
            ];
        })(),
        decorations: (() => {
            const S = 0.556;
            return [
                createDeco(200 * S, 590, 'gear'), createDeco(1400 * S, 590, 'crane'), createDeco(1900 * S, 590, 'smoke'),
                createDeco(3900 * S, 590, 'conveyor'), createDeco(5500 * S, 590, 'pipe'), createDeco(6500 * S, 590, 'gear'),
                createDeco(8300 * S, 590, 'crane'), createDeco(10100 * S, 590, 'smoke'), createDeco(12300 * S, 590, 'pipe'),
                createDeco(14500 * S, 590, 'gear'), createDeco(16900 * S, 590, 'conveyor'), createDeco(18900 * S, 590, 'crane'),
                createDeco(21300 * S, 590, 'smoke'), createDeco(22900 * S, 590, 'gear'),
            ];
        })(),
        playerStart: { x: 150, y: 580 },
        goal: { x: 19460 - 500, y: 588 },
        timeBonus: 175,
    },
    {
        id: 51, name: "Assembly Line", width: 20000, height: 700, biome: 'factory',
        platforms: (() => {
            const S = 0.5;
            const plats: ReturnType<typeof createPlat>[] = [];
            
            // Starting area
            plats.push(createPlat(100 * S, 650, 1000 * S, 40, 'metal'));
            plats.push(createPlat(1200 * S, 650, 800 * S, 40, 'metal'));
            
            // Vertical climb 1
            plats.push(createPlat(2100 * S, 580, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(2350 * S, 510, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(2600 * S, 440, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(2850 * S, 370, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(3100 * S, 300, 150 * S, 40, 'brick'));
            plats.push(createPlat(3400 * S, 370, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(3650 * S, 440, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(3900 * S, 510, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(4150 * S, 580, 120 * S, 28, 'platform_easy'));
            
            // Ground section
            plats.push(createPlat(4400 * S, 650, 900 * S, 40, 'metal'));
            plats.push(createPlat(5400 * S, 650, 700 * S, 40, 'metal'));
            
            // Pipe section
            plats.push(createPlat(6200 * S, 650, 64 * S, 96, 'pipe'));
            plats.push(createPlat(6400 * S, 650, 64 * S, 64, 'pipe'));
            plats.push(createPlat(6600 * S, 650, 64 * S, 128, 'pipe'));
            plats.push(createPlat(6850 * S, 650, 64 * S, 64, 'pipe'));
            plats.push(createPlat(7100 * S, 650, 64 * S, 96, 'pipe'));
            
            plats.push(createPlat(7300 * S, 650, 1000 * S, 40, 'metal'));
            plats.push(createPlat(8400 * S, 650, 800 * S, 40, 'metal'));
            
            // Vertical section 2
            plats.push(createPlat(9300 * S, 580, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(9600 * S, 500, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(9900 * S, 420, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(10200 * S, 340, 150 * S, 40, 'brick'));
            plats.push(createPlat(10550 * S, 260, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(10900 * S, 340, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(11200 * S, 420, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(11500 * S, 500, 120 * S, 28, 'platform_medium'));
            
            // Ground continuation
            plats.push(createPlat(11800 * S, 650, 1200 * S, 40, 'metal'));
            plats.push(createPlat(13100 * S, 650, 800 * S, 40, 'metal'));
            
            // Pipe section 2
            plats.push(createPlat(14000 * S, 650, 64 * S, 64, 'pipe'));
            plats.push(createPlat(14200 * S, 650, 64 * S, 96, 'pipe'));
            plats.push(createPlat(14400 * S, 650, 64 * S, 64, 'pipe'));
            plats.push(createPlat(14600 * S, 650, 64 * S, 128, 'pipe'));
            
            plats.push(createPlat(14800 * S, 650, 900 * S, 40, 'metal'));
            plats.push(createPlat(15800 * S, 650, 700 * S, 40, 'metal'));
            
            // Vertical climb 3
            plats.push(createPlat(16600 * S, 580, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(16850 * S, 510, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(17100 * S, 440, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(17350 * S, 370, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(17650 * S, 300, 150 * S, 40, 'brick'));
            plats.push(createPlat(17950 * S, 370, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(18200 * S, 440, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(18450 * S, 510, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(18700 * S, 580, 120 * S, 28, 'platform_easy'));
            
            // Ground stretch
            plats.push(createPlat(19000 * S, 650, 1100 * S, 40, 'metal'));
            plats.push(createPlat(20200 * S, 650, 800 * S, 40, 'metal'));
            
            // Pipe section 3
            plats.push(createPlat(21100 * S, 650, 64 * S, 96, 'pipe'));
            plats.push(createPlat(21300 * S, 650, 64 * S, 64, 'pipe'));
            plats.push(createPlat(21500 * S, 650, 64 * S, 128, 'pipe'));
            
            plats.push(createPlat(21700 * S, 650, 1000 * S, 40, 'metal'));
            plats.push(createPlat(22800 * S, 650, 700 * S, 40, 'metal'));
            
            // Vertical section 4
            plats.push(createPlat(23600 * S, 580, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(23900 * S, 500, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(24200 * S, 420, 150 * S, 40, 'brick'));
            plats.push(createPlat(24550 * S, 340, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(24900 * S, 420, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(25200 * S, 500, 120 * S, 28, 'platform_medium'));
            
            // Final ground stretch
            plats.push(createPlat(25500 * S, 650, 1200 * S, 40, 'metal'));
            plats.push(createPlat(26800 * S, 650, 800 * S, 40, 'metal'));
            
            // Pipe section 4
            plats.push(createPlat(27700 * S, 650, 64 * S, 96, 'pipe'));
            plats.push(createPlat(27900 * S, 650, 64 * S, 64, 'pipe'));
            plats.push(createPlat(28100 * S, 650, 64 * S, 128, 'pipe'));
            
            plats.push(createPlat(28300 * S, 650, 1000 * S, 40, 'metal'));
            plats.push(createPlat(29400 * S, 650, 800 * S, 40, 'metal'));
            plats.push(createPlat(30300 * S, 650, 700 * S, 40, 'metal'));
            
            // Pre-goal vertical
            plats.push(createPlat(31100 * S, 580, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(31350 * S, 500, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(31650 * S, 420, 150 * S, 40, 'brick'));
            plats.push(createPlat(32000 * S, 340, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(32350 * S, 420, 120 * S, 28, 'platform_medium'));
            
            // Final ground
            plats.push(createPlat(32700 * S, 650, 1500 * S, 40, 'metal'));
            plats.push(createPlat(34300 * S, 650, 900 * S, 40, 'metal'));
            plats.push(createPlat(35300 * S, 650, 700 * S, 40, 'metal'));
            plats.push(createPlat(36100 * S, 650, 600 * S, 40, 'metal'));
            plats.push(createPlat(36800 * S, 650, 500 * S, 40, 'metal'));
            plats.push(createPlat(37400 * S, 650, 500 * S, 40, 'metal'));
            plats.push(createPlat(38000 * S, 650, 500 * S, 40, 'metal'));
            plats.push(createPlat(38600 * S, 650, 400 * S, 40, 'metal'));
            plats.push(createPlat(39100 * S, 650, 400 * S, 40, 'metal'));
            plats.push(createPlat(39600 * S, 650, 400 * S, 40, 'metal'));
            
            return plats;
        })(),
        coins: (() => {
            const S = 0.5;
            const coins: ReturnType<typeof createCoin>[] = [];
            for (let x = 200 * S; x < 39000 * S; x += 130 * S) {
                coins.push(createCoin(x, 600));
            }
            coins.push(createCoin(2200 * S, 520), createCoin(2450 * S, 450), createCoin(2700 * S, 380), createCoin(2950 * S, 300), createCoin(3200 * S, 240));
            coins.push(createCoin(9400 * S, 520), createCoin(9700 * S, 440), createCoin(10000 * S, 360), createCoin(10300 * S, 280), createCoin(10650 * S, 200));
            coins.push(createCoin(16700 * S, 520), createCoin(16950 * S, 450), createCoin(17200 * S, 380), createCoin(17450 * S, 300), createCoin(17750 * S, 240));
            coins.push(createCoin(23700 * S, 520), createCoin(24000 * S, 440), createCoin(24300 * S, 360), createCoin(24650 * S, 280));
            coins.push(createCoin(31200 * S, 520), createCoin(31450 * S, 440), createCoin(31750 * S, 360), createCoin(32100 * S, 280));
            return coins;
        })(),
        questionBlocks: (() => {
            const S = 0.5;
            return [
                createQB(1200 * S, 580, 'mushroom'),
                createQB(3100 * S, 240, 'coin'),
                createQB(5400 * S, 580, 'star'),
                createQB(6600 * S, 480, 'flower'),
                createQB(8400 * S, 580, 'mushroom'),
                createQB(10200 * S, 280, 'coin'),
                createQB(13100 * S, 580, 'star'),
                createQB(14600 * S, 480, 'mushroom'),
                createQB(15800 * S, 580, 'flower'),
                createQB(17650 * S, 240, 'coin'),
                createQB(20200 * S, 580, 'star'),
            ];
        })(),
        enemies: (() => {
            const S = 0.5;
            return [
                createEnemy(600 * S, 610, 'robot'), createEnemy(1700 * S, 610, 'koopa'), createEnemy(2400 * S, 610, 'fireball'),
                createEnemy(4700 * S, 610, 'robot'), createEnemy(5800 * S, 610, 'koopa'), createEnemy(7700 * S, 610, 'robot'),
                createEnemy(8700 * S, 610, 'fireball'), createEnemy(9100 * S, 610, 'robot'), createEnemy(11000 * S, 610, 'koopa'),
                createEnemy(12500 * S, 610, 'robot'), createEnemy(15100 * S, 610, 'fireball'), createEnemy(16100 * S, 610, 'robot'),
                createEnemy(2800 * S, 610, 'goomba'), createEnemy(6100 * S, 610, 'crab'), createEnemy(12900 * S, 610, 'spiny'),
            ];
        })(),
        decorations: (() => {
            const S = 0.5;
            return [
                createDeco(200 * S, 610, 'gear'), createDeco(1600 * S, 610, 'crane'), createDeco(2100 * S, 610, 'smoke'),
                createDeco(4400 * S, 610, 'conveyor'), createDeco(6200 * S, 610, 'pipe'), createDeco(7300 * S, 610, 'gear'),
                createDeco(9300 * S, 610, 'crane'), createDeco(11800 * S, 610, 'smoke'), createDeco(14000 * S, 610, 'pipe'),
                createDeco(14800 * S, 610, 'gear'), createDeco(16600 * S, 610, 'conveyor'), createDeco(19000 * S, 610, 'crane'),
                createDeco(21100 * S, 610, 'smoke'), createDeco(23600 * S, 610, 'gear'),
            ];
        })(),
        movingPlatforms: (() => {
            const S = 0.5;
            return [
                createMovingPlat(3800 * S, 480, 120, 24, 'platform_medium', 'vertical', 180, 20),
                createMovingPlat(8500 * S, 450, 120, 24, 'platform_medium', 'horizontal', 200, 22),
            ];
        })(),
        playerStart: { x: 150, y: 600 },
        goal: { x: 20000 - 500, y: 608 },
        timeBonus: 190,
    },
    {
        id: 52, name: "Steel Mill", width: 19980, height: 720, biome: 'factory',
        platforms: (() => {
            const S = 0.444;
            const plats: ReturnType<typeof createPlat>[] = [];
            
            // Starting long ground
            plats.push(createPlat(100 * S, 670, 1200 * S, 40, 'metal'));
            plats.push(createPlat(1400 * S, 670, 900 * S, 40, 'metal'));
            
            // Vertical climb 1
            plats.push(createPlat(2400 * S, 600, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(2700 * S, 530, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(3000 * S, 460, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(3300 * S, 390, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(3600 * S, 320, 150 * S, 40, 'brick'));
            plats.push(createPlat(3950 * S, 390, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(4250 * S, 460, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(4550 * S, 530, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(4850 * S, 600, 120 * S, 28, 'platform_easy'));
            
            // Ground section
            plats.push(createPlat(5100 * S, 670, 1000 * S, 40, 'metal'));
            plats.push(createPlat(6200 * S, 670, 800 * S, 40, 'metal'));
            
            // Pipe section
            plats.push(createPlat(7100 * S, 670, 64 * S, 96, 'pipe'));
            plats.push(createPlat(7300 * S, 670, 64 * S, 64, 'pipe'));
            plats.push(createPlat(7500 * S, 670, 64 * S, 128, 'pipe'));
            plats.push(createPlat(7750 * S, 670, 64 * S, 64, 'pipe'));
            plats.push(createPlat(8000 * S, 670, 64 * S, 96, 'pipe'));
            plats.push(createPlat(8250 * S, 670, 64 * S, 64, 'pipe'));
            
            plats.push(createPlat(8500 * S, 670, 1100 * S, 40, 'metal'));
            plats.push(createPlat(9700 * S, 670, 800 * S, 40, 'metal'));
            
            // Vertical section 2
            plats.push(createPlat(10600 * S, 600, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(10900 * S, 520, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(11200 * S, 440, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(11550 * S, 360, 150 * S, 40, 'brick'));
            plats.push(createPlat(11900 * S, 280, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(12250 * S, 360, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(12600 * S, 440, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(12900 * S, 520, 120 * S, 28, 'platform_medium'));
            
            // Ground continuation
            plats.push(createPlat(13200 * S, 670, 1300 * S, 40, 'metal'));
            plats.push(createPlat(14600 * S, 670, 900 * S, 40, 'metal'));
            
            // Pipe section 2
            plats.push(createPlat(15600 * S, 670, 64 * S, 64, 'pipe'));
            plats.push(createPlat(15800 * S, 670, 64 * S, 96, 'pipe'));
            plats.push(createPlat(16000 * S, 670, 64 * S, 64, 'pipe'));
            plats.push(createPlat(16200 * S, 670, 64 * S, 128, 'pipe'));
            
            plats.push(createPlat(16400 * S, 670, 1000 * S, 40, 'metal'));
            plats.push(createPlat(17500 * S, 670, 800 * S, 40, 'metal'));
            
            // Vertical climb 3
            plats.push(createPlat(18400 * S, 600, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(18700 * S, 530, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(19000 * S, 460, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(19300 * S, 390, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(19650 * S, 320, 150 * S, 40, 'brick'));
            plats.push(createPlat(20000 * S, 390, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(20300 * S, 460, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(20600 * S, 530, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(20900 * S, 600, 120 * S, 28, 'platform_easy'));
            
            // Ground stretch
            plats.push(createPlat(21200 * S, 670, 1100 * S, 40, 'metal'));
            plats.push(createPlat(22400 * S, 670, 900 * S, 40, 'metal'));
            
            // Pipe section 3
            plats.push(createPlat(23400 * S, 670, 64 * S, 96, 'pipe'));
            plats.push(createPlat(23600 * S, 670, 64 * S, 64, 'pipe'));
            plats.push(createPlat(23800 * S, 670, 64 * S, 128, 'pipe'));
            plats.push(createPlat(24100 * S, 670, 64 * S, 64, 'pipe'));
            
            plats.push(createPlat(24300 * S, 670, 1000 * S, 40, 'metal'));
            plats.push(createPlat(25400 * S, 670, 800 * S, 40, 'metal'));
            
            // Vertical section 4
            plats.push(createPlat(26300 * S, 600, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(26650 * S, 520, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(27000 * S, 440, 150 * S, 40, 'brick'));
            plats.push(createPlat(27350 * S, 360, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(27700 * S, 440, 120 * S, 28, 'platform_medium'));
            
            // Final ground stretch
            plats.push(createPlat(28000 * S, 670, 1200 * S, 40, 'metal'));
            plats.push(createPlat(29300 * S, 670, 900 * S, 40, 'metal'));
            
            // Pipe section 4
            plats.push(createPlat(30300 * S, 670, 64 * S, 96, 'pipe'));
            plats.push(createPlat(30500 * S, 670, 64 * S, 64, 'pipe'));
            plats.push(createPlat(30700 * S, 670, 64 * S, 128, 'pipe'));
            
            plats.push(createPlat(30900 * S, 670, 1100 * S, 40, 'metal'));
            plats.push(createPlat(32100 * S, 670, 800 * S, 40, 'metal'));
            plats.push(createPlat(33000 * S, 670, 700 * S, 40, 'metal'));
            
            // Pre-goal vertical
            plats.push(createPlat(33800 * S, 600, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(34100 * S, 520, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(34450 * S, 440, 150 * S, 40, 'brick'));
            plats.push(createPlat(34800 * S, 360, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(35150 * S, 440, 120 * S, 28, 'platform_medium'));
            
            // Final ground
            plats.push(createPlat(35500 * S, 670, 1500 * S, 40, 'metal'));
            plats.push(createPlat(37100 * S, 670, 900 * S, 40, 'metal'));
            plats.push(createPlat(38100 * S, 670, 700 * S, 40, 'metal'));
            plats.push(createPlat(38900 * S, 670, 600 * S, 40, 'metal'));
            plats.push(createPlat(39600 * S, 670, 600 * S, 40, 'metal'));
            plats.push(createPlat(40300 * S, 670, 500 * S, 40, 'metal'));
            plats.push(createPlat(40900 * S, 670, 500 * S, 40, 'metal'));
            plats.push(createPlat(41500 * S, 670, 500 * S, 40, 'metal'));
            plats.push(createPlat(42100 * S, 670, 400 * S, 40, 'metal'));
            plats.push(createPlat(42600 * S, 670, 400 * S, 40, 'metal'));
            plats.push(createPlat(43100 * S, 670, 400 * S, 40, 'metal'));
            plats.push(createPlat(43600 * S, 670, 400 * S, 40, 'metal'));
            plats.push(createPlat(44100 * S, 670, 400 * S, 40, 'metal'));
            
            return plats;
        })(),
        coins: (() => {
            const S = 0.444;
            const coins: ReturnType<typeof createCoin>[] = [];
            for (let x = 200 * S; x < 44000 * S; x += 120 * S) {
                coins.push(createCoin(x, 620));
            }
            coins.push(createCoin(2500 * S, 540), createCoin(2800 * S, 470), createCoin(3100 * S, 400), createCoin(3400 * S, 330), createCoin(3700 * S, 260));
            coins.push(createCoin(10700 * S, 540), createCoin(11000 * S, 460), createCoin(11300 * S, 380), createCoin(11650 * S, 300), createCoin(12000 * S, 220));
            coins.push(createCoin(18500 * S, 540), createCoin(18800 * S, 470), createCoin(19100 * S, 400), createCoin(19400 * S, 330), createCoin(19750 * S, 260));
            coins.push(createCoin(26400 * S, 540), createCoin(26750 * S, 460), createCoin(27100 * S, 380), createCoin(27450 * S, 300));
            coins.push(createCoin(33900 * S, 540), createCoin(34200 * S, 460), createCoin(34550 * S, 380), createCoin(34900 * S, 300));
            return coins;
        })(),
        questionBlocks: (() => {
            const S = 0.444;
            return [
                createQB(1400 * S, 600, 'mushroom'),
                createQB(3600 * S, 260, 'coin'),
                createQB(6200 * S, 600, 'star'),
                createQB(7500 * S, 480, 'flower'),
                createQB(9700 * S, 600, 'mushroom'),
                createQB(11550 * S, 220, 'coin'),
                createQB(14600 * S, 600, 'star'),
                createQB(16200 * S, 480, 'mushroom'),
                createQB(17500 * S, 600, 'flower'),
                createQB(19650 * S, 260, 'coin'),
                createQB(22400 * S, 600, 'star'),
            ];
        })(),
        enemies: (() => {
            const S = 0.444;
            return [
                createEnemy(700 * S, 630, 'robot'), createEnemy(1800 * S, 630, 'koopa'), createEnemy(2600 * S, 630, 'fireball'),
                createEnemy(5500 * S, 630, 'robot'), createEnemy(6800 * S, 630, 'koopa'), createEnemy(8900 * S, 630, 'robot'),
                createEnemy(10000 * S, 630, 'fireball'), createEnemy(10800 * S, 630, 'robot'), createEnemy(13400 * S, 630, 'koopa'),
                createEnemy(15000 * S, 630, 'robot'), createEnemy(17800 * S, 630, 'fireball'), createEnemy(18800 * S, 630, 'robot'),
                createEnemy(3200 * S, 630, 'goomba'), createEnemy(7400 * S, 630, 'spiny'), createEnemy(12000 * S, 630, 'crab'),
            ];
        })(),
        decorations: (() => {
            const S = 0.444;
            return [
                createDeco(200 * S, 630, 'gear'), createDeco(1800 * S, 630, 'crane'), createDeco(2400 * S, 630, 'smoke'),
                createDeco(5100 * S, 630, 'conveyor'), createDeco(7100 * S, 630, 'pipe'), createDeco(8500 * S, 630, 'gear'),
                createDeco(10600 * S, 630, 'crane'), createDeco(13200 * S, 630, 'smoke'), createDeco(15600 * S, 630, 'pipe'),
                createDeco(16400 * S, 630, 'gear'), createDeco(18400 * S, 630, 'conveyor'), createDeco(21200 * S, 630, 'crane'),
                createDeco(23400 * S, 630, 'smoke'), createDeco(26300 * S, 630, 'gear'),
            ];
        })(),
        playerStart: { x: 150, y: 620 },
        goal: { x: 19980 - 500, y: 628 },
        timeBonus: 200,
    },
    {
        id: 53, name: "Robot Rampage", width: 20016, height: 700, biome: 'factory',
        platforms: (() => {
            const S = 0.417;
            const plats: ReturnType<typeof createPlat>[] = [];
            
            // Starting area - extensive ground
            plats.push(createPlat(100 * S, 650, 1400 * S, 40, 'metal'));
            plats.push(createPlat(1600 * S, 650, 1000 * S, 40, 'metal'));
            
            // Vertical climb 1
            plats.push(createPlat(2700 * S, 580, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(3000 * S, 510, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(3300 * S, 440, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(3600 * S, 370, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(3900 * S, 300, 150 * S, 40, 'brick'));
            plats.push(createPlat(4200 * S, 230, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(4500 * S, 300, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(4800 * S, 370, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(5100 * S, 440, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(5400 * S, 510, 120 * S, 28, 'platform_easy'));
            
            // Ground section
            plats.push(createPlat(5700 * S, 650, 1100 * S, 40, 'metal'));
            plats.push(createPlat(6900 * S, 650, 900 * S, 40, 'metal'));
            
            // Pipe section
            plats.push(createPlat(7900 * S, 650, 64 * S, 96, 'pipe'));
            plats.push(createPlat(8100 * S, 650, 64 * S, 64, 'pipe'));
            plats.push(createPlat(8300 * S, 650, 64 * S, 128, 'pipe'));
            plats.push(createPlat(8550 * S, 650, 64 * S, 64, 'pipe'));
            plats.push(createPlat(8800 * S, 650, 64 * S, 96, 'pipe'));
            plats.push(createPlat(9050 * S, 650, 64 * S, 64, 'pipe'));
            
            plats.push(createPlat(9300 * S, 650, 1200 * S, 40, 'metal'));
            plats.push(createPlat(10600 * S, 650, 900 * S, 40, 'metal'));
            
            // Vertical section 2
            plats.push(createPlat(11600 * S, 580, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(11950 * S, 500, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(12300 * S, 420, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(12650 * S, 340, 150 * S, 40, 'brick'));
            plats.push(createPlat(13000 * S, 260, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(13350 * S, 340, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(13700 * S, 420, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(14050 * S, 500, 120 * S, 28, 'platform_medium'));
            
            // Ground continuation
            plats.push(createPlat(14400 * S, 650, 1400 * S, 40, 'metal'));
            plats.push(createPlat(15900 * S, 650, 1000 * S, 40, 'metal'));
            
            // Pipe section 2
            plats.push(createPlat(17000 * S, 650, 64 * S, 64, 'pipe'));
            plats.push(createPlat(17200 * S, 650, 64 * S, 96, 'pipe'));
            plats.push(createPlat(17400 * S, 650, 64 * S, 64, 'pipe'));
            plats.push(createPlat(17600 * S, 650, 64 * S, 128, 'pipe'));
            plats.push(createPlat(17900 * S, 650, 64 * S, 64, 'pipe'));
            
            plats.push(createPlat(18100 * S, 650, 1100 * S, 40, 'metal'));
            plats.push(createPlat(19300 * S, 650, 900 * S, 40, 'metal'));
            
            // Vertical climb 3
            plats.push(createPlat(20300 * S, 580, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(20650 * S, 510, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(21000 * S, 440, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(21350 * S, 370, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(21700 * S, 300, 150 * S, 40, 'brick'));
            plats.push(createPlat(22050 * S, 370, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(22400 * S, 440, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(22750 * S, 510, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(23100 * S, 580, 120 * S, 28, 'platform_easy'));
            
            // Ground stretch
            plats.push(createPlat(23400 * S, 650, 1200 * S, 40, 'metal'));
            plats.push(createPlat(24700 * S, 650, 900 * S, 40, 'metal'));
            
            // Pipe section 3
            plats.push(createPlat(25700 * S, 650, 64 * S, 96, 'pipe'));
            plats.push(createPlat(25900 * S, 650, 64 * S, 64, 'pipe'));
            plats.push(createPlat(26100 * S, 650, 64 * S, 128, 'pipe'));
            plats.push(createPlat(26400 * S, 650, 64 * S, 64, 'pipe'));
            
            plats.push(createPlat(26600 * S, 650, 1100 * S, 40, 'metal'));
            plats.push(createPlat(27800 * S, 650, 900 * S, 40, 'metal'));
            
            // Vertical section 4
            plats.push(createPlat(28800 * S, 580, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(29150 * S, 500, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(29500 * S, 420, 150 * S, 40, 'brick'));
            plats.push(createPlat(29850 * S, 340, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(30200 * S, 420, 120 * S, 28, 'platform_medium'));
            
            // Final ground stretch
            plats.push(createPlat(30500 * S, 650, 1300 * S, 40, 'metal'));
            plats.push(createPlat(31900 * S, 650, 1000 * S, 40, 'metal'));
            
            // Pipe section 4
            plats.push(createPlat(33000 * S, 650, 64 * S, 96, 'pipe'));
            plats.push(createPlat(33200 * S, 650, 64 * S, 64, 'pipe'));
            plats.push(createPlat(33400 * S, 650, 64 * S, 128, 'pipe'));
            
            plats.push(createPlat(33600 * S, 650, 1200 * S, 40, 'metal'));
            plats.push(createPlat(34900 * S, 650, 900 * S, 40, 'metal'));
            plats.push(createPlat(35900 * S, 650, 800 * S, 40, 'metal'));
            
            // Pre-goal vertical
            plats.push(createPlat(36800 * S, 580, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(37150 * S, 500, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(37500 * S, 420, 150 * S, 40, 'brick'));
            plats.push(createPlat(37850 * S, 340, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(38200 * S, 420, 120 * S, 28, 'platform_medium'));
            
            // Final ground
            plats.push(createPlat(38500 * S, 650, 1600 * S, 40, 'metal'));
            plats.push(createPlat(40200 * S, 650, 1000 * S, 40, 'metal'));
            plats.push(createPlat(41300 * S, 650, 800 * S, 40, 'metal'));
            plats.push(createPlat(42200 * S, 650, 700 * S, 40, 'metal'));
            plats.push(createPlat(43000 * S, 650, 600 * S, 40, 'metal'));
            plats.push(createPlat(43700 * S, 650, 600 * S, 40, 'metal'));
            plats.push(createPlat(44400 * S, 650, 600 * S, 40, 'metal'));
            plats.push(createPlat(45100 * S, 650, 500 * S, 40, 'metal'));
            plats.push(createPlat(45700 * S, 650, 500 * S, 40, 'metal'));
            plats.push(createPlat(46300 * S, 650, 500 * S, 40, 'metal'));
            plats.push(createPlat(46900 * S, 650, 400 * S, 40, 'metal'));
            plats.push(createPlat(47400 * S, 650, 400 * S, 40, 'metal'));
            
            return plats;
        })(),
        coins: (() => {
            const S = 0.417;
            const coins: ReturnType<typeof createCoin>[] = [];
            for (let x = 200 * S; x < 47000 * S; x += 110 * S) {
                coins.push(createCoin(x, 600));
            }
            coins.push(createCoin(2800 * S, 520), createCoin(3100 * S, 450), createCoin(3400 * S, 380), createCoin(3700 * S, 300), createCoin(4000 * S, 240), createCoin(4300 * S, 170));
            coins.push(createCoin(11700 * S, 520), createCoin(12050 * S, 440), createCoin(12400 * S, 360), createCoin(12750 * S, 280), createCoin(13100 * S, 200));
            coins.push(createCoin(20400 * S, 520), createCoin(20750 * S, 450), createCoin(21100 * S, 380), createCoin(21450 * S, 300), createCoin(21800 * S, 240));
            coins.push(createCoin(28900 * S, 520), createCoin(29250 * S, 440), createCoin(29600 * S, 360), createCoin(29950 * S, 280));
            coins.push(createCoin(36900 * S, 520), createCoin(37250 * S, 440), createCoin(37600 * S, 360), createCoin(37950 * S, 280));
            return coins;
        })(),
        questionBlocks: (() => {
            const S = 0.417;
            return [
                createQB(1600 * S, 580, 'mushroom'),
                createQB(3900 * S, 240, 'coin'),
                createQB(6900 * S, 580, 'star'),
                createQB(8300 * S, 480, 'flower'),
                createQB(10600 * S, 580, 'mushroom'),
                createQB(12650 * S, 200, 'coin'),
                createQB(15900 * S, 580, 'star'),
                createQB(17600 * S, 480, 'mushroom'),
                createQB(19300 * S, 580, 'flower'),
                createQB(21700 * S, 240, 'coin'),
                createQB(24700 * S, 580, 'star'),
                createQB(26400 * S, 480, 'mushroom'),
            ];
        })(),
        enemies: (() => {
            const S = 0.417;
            return [
                createEnemy(800 * S, 610, 'robot'), createEnemy(2000 * S, 610, 'koopa'), createEnemy(2900 * S, 610, 'fireball'),
                createEnemy(6200 * S, 610, 'robot'), createEnemy(7600 * S, 610, 'koopa'), createEnemy(9900 * S, 610, 'robot'),
                createEnemy(11000 * S, 610, 'fireball'), createEnemy(11800 * S, 610, 'robot'), createEnemy(14900 * S, 610, 'koopa'),
                createEnemy(16600 * S, 610, 'robot'), createEnemy(18600 * S, 610, 'fireball'), createEnemy(19600 * S, 610, 'robot'),
                createEnemy(3600 * S, 610, 'goomba'), createEnemy(8000 * S, 610, 'spiny'), createEnemy(14100 * S, 610, 'crab'),
            ];
        })(),
        decorations: (() => {
            const S = 0.417;
            return [
                createDeco(200 * S, 610, 'gear'), createDeco(2000 * S, 610, 'crane'), createDeco(2700 * S, 610, 'smoke'),
                createDeco(5700 * S, 610, 'conveyor'), createDeco(7900 * S, 610, 'pipe'), createDeco(9300 * S, 610, 'gear'),
                createDeco(11600 * S, 610, 'crane'), createDeco(14400 * S, 610, 'smoke'), createDeco(17000 * S, 610, 'pipe'),
                createDeco(18100 * S, 610, 'gear'), createDeco(20300 * S, 610, 'conveyor'), createDeco(23400 * S, 610, 'crane'),
                createDeco(25700 * S, 610, 'smoke'), createDeco(28800 * S, 610, 'gear'),
            ];
        })(),
        playerStart: { x: 150, y: 600 },
        goal: { x: 20016 - 500, y: 608 },
        timeBonus: 210,
    },
    {
        id: 54, name: "Final Fuse", width: 20000, height: 700, biome: 'factory',
        platforms: (() => {
            const S = 0.4;
            const plats: ReturnType<typeof createPlat>[] = [];
            
            // Starting massive ground
            plats.push(createPlat(100 * S, 650, 1600 * S, 40, 'metal'));
            plats.push(createPlat(1800 * S, 650, 1100 * S, 40, 'metal'));
            
            // Vertical climb 1
            plats.push(createPlat(3000 * S, 580, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(3300 * S, 510, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(3600 * S, 440, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(3900 * S, 370, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(4200 * S, 300, 150 * S, 40, 'brick'));
            plats.push(createPlat(4550 * S, 230, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(4900 * S, 300, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(5250 * S, 370, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(5550 * S, 440, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(5850 * S, 510, 120 * S, 28, 'platform_easy'));
            
            // Ground section
            plats.push(createPlat(6150 * S, 650, 1200 * S, 40, 'metal'));
            plats.push(createPlat(7450 * S, 650, 1000 * S, 40, 'metal'));
            
            // Pipe section
            plats.push(createPlat(8550 * S, 650, 64 * S, 96, 'pipe'));
            plats.push(createPlat(8750 * S, 650, 64 * S, 64, 'pipe'));
            plats.push(createPlat(8950 * S, 650, 64 * S, 128, 'pipe'));
            plats.push(createPlat(9200 * S, 650, 64 * S, 64, 'pipe'));
            plats.push(createPlat(9450 * S, 650, 64 * S, 96, 'pipe'));
            plats.push(createPlat(9700 * S, 650, 64 * S, 64, 'pipe'));
            plats.push(createPlat(9950 * S, 650, 64 * S, 128, 'pipe'));
            
            plats.push(createPlat(10200 * S, 650, 1300 * S, 40, 'metal'));
            plats.push(createPlat(11600 * S, 650, 1000 * S, 40, 'metal'));
            
            // Vertical section 2
            plats.push(createPlat(12700 * S, 580, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(13050 * S, 500, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(13400 * S, 420, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(13750 * S, 340, 150 * S, 40, 'brick'));
            plats.push(createPlat(14100 * S, 260, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(14450 * S, 340, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(14800 * S, 420, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(15150 * S, 500, 120 * S, 28, 'platform_medium'));
            
            // Ground continuation
            plats.push(createPlat(15500 * S, 650, 1500 * S, 40, 'metal'));
            plats.push(createPlat(17100 * S, 650, 1100 * S, 40, 'metal'));
            
            // Pipe section 2
            plats.push(createPlat(18300 * S, 650, 64 * S, 64, 'pipe'));
            plats.push(createPlat(18500 * S, 650, 64 * S, 96, 'pipe'));
            plats.push(createPlat(18700 * S, 650, 64 * S, 64, 'pipe'));
            plats.push(createPlat(18900 * S, 650, 64 * S, 128, 'pipe'));
            plats.push(createPlat(19200 * S, 650, 64 * S, 64, 'pipe'));
            
            plats.push(createPlat(19400 * S, 650, 1200 * S, 40, 'metal'));
            plats.push(createPlat(20700 * S, 650, 1000 * S, 40, 'metal'));
            
            // Vertical climb 3
            plats.push(createPlat(21800 * S, 580, 120 * S, 28, 'platform_easy'));
            plats.push(createPlat(22150 * S, 510, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(22500 * S, 440, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(22850 * S, 370, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(23200 * S, 300, 150 * S, 40, 'brick'));
            plats.push(createPlat(23550 * S, 370, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(23900 * S, 440, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(24250 * S, 510, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(24600 * S, 580, 120 * S, 28, 'platform_easy'));
            
            // Ground stretch
            plats.push(createPlat(24900 * S, 650, 1300 * S, 40, 'metal'));
            plats.push(createPlat(26300 * S, 650, 1000 * S, 40, 'metal'));
            
            // Pipe section 3
            plats.push(createPlat(27400 * S, 650, 64 * S, 96, 'pipe'));
            plats.push(createPlat(27600 * S, 650, 64 * S, 64, 'pipe'));
            plats.push(createPlat(27800 * S, 650, 64 * S, 128, 'pipe'));
            plats.push(createPlat(28100 * S, 650, 64 * S, 64, 'pipe'));
            
            plats.push(createPlat(28300 * S, 650, 1200 * S, 40, 'metal'));
            plats.push(createPlat(29600 * S, 650, 1000 * S, 40, 'metal'));
            
            // Vertical section 4
            plats.push(createPlat(30700 * S, 580, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(31050 * S, 500, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(31400 * S, 420, 150 * S, 40, 'brick'));
            plats.push(createPlat(31750 * S, 340, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(32100 * S, 420, 120 * S, 28, 'platform_medium'));
            
            // Final ground stretch
            plats.push(createPlat(32400 * S, 650, 1400 * S, 40, 'metal'));
            plats.push(createPlat(33900 * S, 650, 1100 * S, 40, 'metal'));
            
            // Pipe section 4
            plats.push(createPlat(35100 * S, 650, 64 * S, 96, 'pipe'));
            plats.push(createPlat(35300 * S, 650, 64 * S, 64, 'pipe'));
            plats.push(createPlat(35500 * S, 650, 64 * S, 128, 'pipe'));
            
            plats.push(createPlat(35700 * S, 650, 1300 * S, 40, 'metal'));
            plats.push(createPlat(37100 * S, 650, 1000 * S, 40, 'metal'));
            plats.push(createPlat(38200 * S, 650, 900 * S, 40, 'metal'));
            
            // Pre-goal vertical
            plats.push(createPlat(39200 * S, 580, 120 * S, 28, 'platform_medium'));
            plats.push(createPlat(39550 * S, 500, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(39900 * S, 420, 150 * S, 40, 'brick'));
            plats.push(createPlat(40250 * S, 340, 120 * S, 28, 'platform_hard'));
            plats.push(createPlat(40600 * S, 420, 120 * S, 28, 'platform_medium'));
            
            // Final ground
            plats.push(createPlat(40900 * S, 650, 1700 * S, 40, 'metal'));
            plats.push(createPlat(42700 * S, 650, 1100 * S, 40, 'metal'));
            plats.push(createPlat(43900 * S, 650, 900 * S, 40, 'metal'));
            plats.push(createPlat(44900 * S, 650, 800 * S, 40, 'metal'));
            plats.push(createPlat(45800 * S, 650, 700 * S, 40, 'metal'));
            plats.push(createPlat(46600 * S, 650, 600 * S, 40, 'metal'));
            plats.push(createPlat(47300 * S, 650, 600 * S, 40, 'metal'));
            plats.push(createPlat(48000 * S, 650, 600 * S, 40, 'metal'));
            plats.push(createPlat(48700 * S, 650, 500 * S, 40, 'metal'));
            plats.push(createPlat(49300 * S, 650, 500 * S, 40, 'metal'));
            
            return plats;
        })(),
        coins: (() => {
            const S = 0.4;
            const coins: ReturnType<typeof createCoin>[] = [];
            for (let x = 200 * S; x < 49500 * S; x += 100 * S) {
                coins.push(createCoin(x, 600));
            }
            coins.push(createCoin(3100 * S, 520), createCoin(3400 * S, 450), createCoin(3700 * S, 380), createCoin(4000 * S, 300), createCoin(4300 * S, 240), createCoin(4600 * S, 170));
            coins.push(createCoin(12800 * S, 520), createCoin(13150 * S, 440), createCoin(13500 * S, 360), createCoin(13850 * S, 280), createCoin(14200 * S, 200));
            coins.push(createCoin(21900 * S, 520), createCoin(22250 * S, 450), createCoin(22600 * S, 380), createCoin(22950 * S, 300), createCoin(23300 * S, 240));
            coins.push(createCoin(30800 * S, 520), createCoin(31150 * S, 440), createCoin(31500 * S, 360), createCoin(31850 * S, 280));
            coins.push(createCoin(39300 * S, 520), createCoin(39650 * S, 440), createCoin(40000 * S, 360), createCoin(40350 * S, 280));
            return coins;
        })(),
        questionBlocks: (() => {
            const S = 0.4;
            return [
                createQB(1800 * S, 580, 'mushroom'),
                createQB(4200 * S, 240, 'coin'),
                createQB(7450 * S, 580, 'star'),
                createQB(8950 * S, 480, 'flower'),
                createQB(11600 * S, 580, 'mushroom'),
                createQB(13750 * S, 200, 'coin'),
                createQB(17100 * S, 580, 'star'),
                createQB(18900 * S, 480, 'mushroom'),
                createQB(20700 * S, 580, 'flower'),
                createQB(23200 * S, 240, 'coin'),
                createQB(26300 * S, 580, 'star'),
                createQB(28100 * S, 480, 'mushroom'),
            ];
        })(),
        enemies: (() => {
            const S = 0.4;
            return [
                createEnemy(900 * S, 610, 'robot'), createEnemy(2200 * S, 610, 'koopa'), createEnemy(3200 * S, 610, 'fireball'),
                createEnemy(6800 * S, 610, 'robot'), createEnemy(8200 * S, 610, 'koopa'), createEnemy(10800 * S, 610, 'robot'),
                createEnemy(12000 * S, 610, 'fireball'), createEnemy(12900 * S, 610, 'robot'), createEnemy(16100 * S, 610, 'koopa'),
                createEnemy(18000 * S, 610, 'robot'), createEnemy(20000 * S, 610, 'fireball'), createEnemy(21000 * S, 610, 'robot'),
                createEnemy(4000 * S, 610, 'goomba'), createEnemy(8500 * S, 610, 'spiny'), createEnemy(14700 * S, 610, 'crab'),
            ];
        })(),
        decorations: (() => {
            const S = 0.4;
            return [
                createDeco(200 * S, 610, 'gear'), createDeco(2200 * S, 610, 'crane'), createDeco(3000 * S, 610, 'smoke'),
                createDeco(6150 * S, 610, 'conveyor'), createDeco(8550 * S, 610, 'pipe'), createDeco(10200 * S, 610, 'gear'),
                createDeco(12700 * S, 610, 'crane'), createDeco(15500 * S, 610, 'smoke'), createDeco(18300 * S, 610, 'pipe'),
                createDeco(19400 * S, 610, 'gear'), createDeco(21800 * S, 610, 'conveyor'), createDeco(24900 * S, 610, 'crane'),
                createDeco(27400 * S, 610, 'smoke'), createDeco(30700 * S, 610, 'gear'),
            ];
        })(),
        movingPlatforms: (() => {
            const S = 0.4;
            return [
                createMovingPlat(5500 * S, 500, 120, 24, 'platform_medium', 'horizontal', 180, 20),
                createMovingPlat(8200 * S, 400, 120, 24, 'platform_medium', 'vertical', 160, 22),
                createMovingPlat(25600 * S, 450, 120, 24, 'platform_medium', 'horizontal', 200, 20),
            ];
        })(),
        playerStart: { x: 150, y: 600 },
        goal: { x: 20000 - 500, y: 608 },
        timeBonus: 220,
    },
];

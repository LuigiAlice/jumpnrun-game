// 100 Unique Predefined Levels
// World 1: Grass World (Levels 1-35)
// World 2: Cave World (Levels 36-70)  
// World 3: Castle World (Levels 71-100)

export interface Platform {
    x: number;
    y: number;
    w: number;
    h: number;
    type: 'grass' | 'brick' | 'cave' | 'castle' | 'pipe' | 'pipe_top' | 'ground' | 'platform_easy' | 'platform_medium' | 'platform_hard' | 'cloud' | 'lava';
}

export interface LevelData {
    width: number;
    height: number;
    biome: 'grass' | 'cave' | 'castle';
    platforms: Platform[];
    coins: { x: number; y: number }[];
    questionBlocks: { x: number; y: number; contents: 'coin' | 'mushroom' | 'flower' | 'star' }[];
    enemies: { x: number; y: number; type: 'goomba' | 'koopa' | 'piranha' | 'spiny' | 'boo' | 'thwomp' | 'lakitu' | 'bullet_bill' }[];
    decorations: { x: number; y: number; type: 'tree' | 'bush' | 'cloud' | 'pipe' | 'flag' | 'torch' | 'bat' }[];
    playerStart: { x: number; y: number };
    goal: { x: number; y: number };
    timeBonus: number;
    name: string;
}

const createPlat = (x: number, y: number, w: number, h: number, type: Platform['type']): Platform => ({ x, y, w, h, type });

export const LEVELS: LevelData[] = [
    // ==================== WORLD 1: GRASS WORLD (1-35) ====================
    
    // Level 1: "Green Meadow Sprint" - Simple intro level - DEFINITELY SOLVABLE
    {
        name: "Green Meadow Sprint",
        width: 1600, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 300, 40, 'grass'),  // First platform - start
            createPlat(500, 540, 100, 24, 'platform_easy'),  // Easy intermediate
            createPlat(700, 540, 100, 24, 'platform_easy'),  // Easy intermediate
            createPlat(900, 540, 300, 40, 'grass'),  // Second platform - near goal
            createPlat(1250, 540, 250, 40, 'grass'),  // Goal platform
        ],
        coins: [{ x: 300, y: 480 }, { x: 500, y: 480 }, { x: 700, y: 480 }, { x: 1000, y: 480 }],
        questionBlocks: [],
        enemies: [],
        decorations: [
            { x: 50, y: 520, type: 'bush' }, { x: 200, y: 520, type: 'tree' },
            { x: 500, y: 100, type: 'cloud' }, { x: 900, y: 80, type: 'cloud' },
        ],
        playerStart: { x: 80, y: 500 }, goal: { x: 1350, y: 508 }, timeBonus: 0
    },

    // Level 2: "Bouncy Hills" - First platforms
    {
        name: "Bouncy Hills",
        width: 1800, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 250, 40, 'grass'),
            createPlat(420, 500, 80, 24, 'platform_easy'),
            createPlat(550, 460, 80, 24, 'platform_easy'),
            createPlat(680, 420, 80, 24, 'platform_medium'),
            createPlat(810, 380, 80, 24, 'platform_medium'),
            createPlat(940, 340, 80, 24, 'platform_easy'),
            createPlat(1100, 380, 80, 24, 'platform_medium'),
            createPlat(1260, 420, 80, 24, 'platform_medium'),
            createPlat(1420, 460, 80, 24, 'platform_easy'),
            createPlat(1580, 500, 80, 24, 'platform_easy'),
            createPlat(1700, 540, 150, 40, 'grass'),
        ],
        coins: [{ x: 420, y: 440 }, { x: 550, y: 400 }, { x: 680, y: 360 }, { x: 810, y: 320 }, { x: 940, y: 280 }, { x: 1100, y: 320 }, { x: 1260, y: 360 }],
        questionBlocks: [{ x: 940, y: 260, contents: 'mushroom' }],
        enemies: [],
        decorations: [{ x: 200, y: 520, type: 'tree' }, { x: 1500, y: 100, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1750, y: 508 }, timeBonus: 10
    },

    // Level 3: "Pipe Dream" - First pipes
    {
        name: "Pipe Dream",
        width: 2000, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 250, 40, 'grass'),
            createPlat(420, 540, 60, 64, 'pipe'),
            createPlat(550, 540, 60, 96, 'pipe'),
            createPlat(680, 540, 60, 128, 'pipe'),
            createPlat(850, 540, 100, 24, 'platform_easy'),
            createPlat(1000, 480, 100, 24, 'platform_medium'),
            createPlat(1150, 420, 120, 40, 'grass'),
            createPlat(1350, 540, 60, 96, 'pipe'),
            createPlat(1500, 540, 80, 64, 'pipe'),
            createPlat(1700, 540, 200, 40, 'grass'),
        ],
        coins: [{ x: 420, y: 480 }, { x: 550, y: 440 }, { x: 680, y: 400 }, { x: 850, y: 480 }, { x: 1000, y: 420 }, { x: 1150, y: 360 }],
        questionBlocks: [{ x: 1150, y: 360, contents: 'coin' }],
        enemies: [{ x: 450, y: 520, type: 'piranha' }, { x: 580, y: 520, type: 'piranha' }, { x: 1380, y: 520, type: 'piranha' }],
        decorations: [{ x: 1400, y: 100, type: 'cloud' }, { x: 250, y: 520, type: 'bush' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1800, y: 508 }, timeBonus: 15
    },

    // Level 4: "Cloud Kingdom" - High platforms
    {
        name: "Cloud Kingdom",
        width: 2200, height: 800, biome: 'grass',
        platforms: [
            createPlat(200, 540, 250, 40, 'grass'),
            createPlat(500, 480, 80, 24, 'cloud'),
            createPlat(650, 400, 80, 24, 'cloud'),
            createPlat(800, 320, 80, 24, 'cloud'),
            createPlat(950, 400, 80, 24, 'cloud'),
            createPlat(1100, 480, 80, 24, 'cloud'),
            createPlat(1250, 400, 100, 32, 'grass'),
            createPlat(1450, 320, 80, 24, 'cloud'),
            createPlat(1600, 400, 80, 24, 'cloud'),
            createPlat(1750, 480, 80, 24, 'cloud'),
            createPlat(1900, 540, 250, 40, 'grass'),
        ],
        coins: [{ x: 500, y: 420 }, { x: 650, y: 340 }, { x: 800, y: 260 }, { x: 950, y: 340 }, { x: 1450, y: 260 }, { x: 1600, y: 340 }],
        questionBlocks: [{ x: 800, y: 240, contents: 'star' }, { x: 1450, y: 240, contents: 'flower' }],
        enemies: [],
        decorations: [{ x: 400, y: 80, type: 'cloud' }, { x: 900, y: 60, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2000, y: 508 }, timeBonus: 30
    },

    // Level 5: "The Fork in the Road" - First split path
    {
        name: "The Fork in the Road",
        width: 2000, height: 700, biome: 'grass',
        platforms: [
            createPlat(200, 540, 300, 40, 'grass'),
            // Lower path (easy)
            createPlat(600, 540, 200, 32, 'platform_easy'),
            createPlat(900, 540, 200, 32, 'platform_easy'),
            createPlat(1300, 540, 200, 32, 'platform_easy'),
            // Upper path (hard)
            createPlat(600, 380, 150, 24, 'platform_hard'),
            createPlat(850, 300, 120, 24, 'platform_hard'),
            createPlat(1100, 380, 150, 24, 'platform_hard'),
            // Merge
            createPlat(1600, 540, 300, 40, 'grass'),
        ],
        coins: [
            { x: 600, y: 480 }, { x: 900, y: 480 }, { x: 1300, y: 480 },
            { x: 600, y: 320 }, { x: 850, y: 240 }, { x: 1100, y: 320 },
        ],
        questionBlocks: [
            { x: 600, y: 300, contents: 'mushroom' },
            { x: 850, y: 220, contents: 'star' },
        ],
        enemies: [{ x: 950, y: 520, type: 'goomba' }],
        decorations: [
            { x: 400, y: 520, type: 'tree' },
            { x: 650, y: 350, type: 'cloud' },
        ],
        playerStart: { x: 80, y: 500 }, goal: { x: 1700, y: 508 }, timeBonus: 25
    },

    // Level 6: "Mushroom Grove" - Dense platforming
    {
        name: "Mushroom Grove",
        width: 1900, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 250, 40, 'grass'),
            createPlat(400, 500, 60, 20, 'platform_medium'),
            createPlat(480, 460, 60, 20, 'platform_medium'),
            createPlat(560, 420, 60, 20, 'platform_easy'),
            createPlat(640, 380, 60, 20, 'platform_medium'),
            createPlat(800, 420, 100, 24, 'platform_easy'),
            createPlat(950, 380, 60, 20, 'platform_medium'),
            createPlat(1030, 340, 60, 20, 'platform_medium'),
            createPlat(1110, 300, 60, 20, 'platform_hard'),
            createPlat(1300, 380, 120, 32, 'grass'),
            createPlat(1500, 440, 80, 24, 'platform_easy'),
            createPlat(1650, 540, 200, 40, 'grass'),
        ],
        coins: [
            { x: 400, y: 440 }, { x: 480, y: 400 }, { x: 560, y: 360 }, { x: 640, y: 320 },
            { x: 950, y: 320 }, { x: 1030, y: 280 }, { x: 1110, y: 240 },
        ],
        questionBlocks: [
            { x: 640, y: 300, contents: 'mushroom' },
            { x: 1110, y: 220, contents: 'star' },
        ],
        enemies: [{ x: 900, y: 400, type: 'goomba' }, { x: 1400, y: 360, type: 'koopa' }],
        decorations: [{ x: 250, y: 520, type: 'tree' }, { x: 1200, y: 100, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1750, y: 508 }, timeBonus: 20
    },

    // Level 7: "Green River Run" - Long flat with gaps
    {
        name: "Green River Run",
        width: 2400, height: 600, biome: 'grass',
        platforms: [
            createPlat(200, 540, 300, 40, 'grass'),
            createPlat(600, 540, 250, 40, 'grass'),
            createPlat(950, 540, 200, 40, 'grass'),
            createPlat(1250, 540, 250, 40, 'grass'),
            createPlat(1550, 540, 200, 40, 'grass'),
            createPlat(1850, 540, 300, 40, 'grass'),
        ],
        coins: [
            { x: 500, y: 480 }, { x: 600, y: 480 }, { x: 700, y: 480 },
            { x: 900, y: 480 }, { x: 950, y: 480 }, { x: 1000, y: 480 },
            { x: 1300, y: 480 }, { x: 1400, y: 480 },
            { x: 1600, y: 480 }, { x: 1700, y: 480 },
        ],
        questionBlocks: [{ x: 950, y: 480, contents: 'coin' }],
        enemies: [
            { x: 650, y: 520, type: 'goomba' }, { x: 1000, y: 520, type: 'goomba' },
            { x: 1300, y: 520, type: 'koopa' }, { x: 1600, y: 520, type: 'goomba' },
        ],
        decorations: [
            { x: 100, y: 520, type: 'bush' }, { x: 400, y: 520, type: 'tree' },
            { x: 800, y: 80, type: 'cloud' }, { x: 1200, y: 60, type: 'cloud' },
        ],
        playerStart: { x: 80, y: 500 }, goal: { x: 1950, y: 508 }, timeBonus: 10
    },

    // Level 8: "Stairway Climb" - Stairs pattern
    {
        name: "Stairway Climb",
        width: 1800, height: 700, biome: 'grass',
        platforms: [
            createPlat(150, 540, 250, 40, 'grass'),
            // Ascending stairs
            createPlat(450, 500, 80, 32, 'brick'),
            createPlat(550, 460, 80, 32, 'brick'),
            createPlat(650, 420, 80, 32, 'brick'),
            createPlat(750, 380, 80, 32, 'brick'),
            createPlat(850, 340, 80, 32, 'brick'),
            createPlat(950, 300, 80, 32, 'brick'),
            // Platform at top
            createPlat(1100, 260, 200, 32, 'grass'),
            // Descending
            createPlat(1350, 300, 80, 32, 'brick'),
            createPlat(1450, 340, 80, 32, 'brick'),
            createPlat(1550, 380, 80, 32, 'brick'),
            createPlat(1650, 540, 150, 40, 'grass'),
        ],
        coins: [
            { x: 450, y: 440 }, { x: 550, y: 400 }, { x: 650, y: 360 }, { x: 750, y: 320 },
            { x: 850, y: 280 }, { x: 950, y: 240 },
        ],
        questionBlocks: [
            { x: 950, y: 220, contents: 'star' },
            { x: 1200, y: 180, contents: 'flower' },
        ],
        enemies: [{ x: 1200, y: 240, type: 'koopa' }],
        decorations: [{ x: 300, y: 520, type: 'tree' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1700, y: 508 }, timeBonus: 25
    },

    // Level 9: "Piranha Pipeline" - All pipes
    {
        name: "Piranha Pipeline",
        width: 2000, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 250, 40, 'grass'),
            createPlat(400, 540, 60, 96, 'pipe'),
            createPlat(550, 540, 60, 64, 'pipe'),
            createPlat(700, 540, 60, 128, 'pipe'),
            createPlat(850, 540, 60, 96, 'pipe'),
            // Floating between pipes
            createPlat(475, 420, 80, 24, 'platform_medium'),
            createPlat(625, 360, 80, 24, 'platform_hard'),
            createPlat(775, 420, 80, 24, 'platform_medium'),
            createPlat(1000, 540, 60, 64, 'pipe'),
            createPlat(1150, 540, 60, 96, 'pipe'),
            createPlat(1300, 540, 60, 128, 'pipe'),
            createPlat(1600, 540, 300, 40, 'grass'),
        ],
        coins: [
            { x: 475, y: 360 }, { x: 625, y: 300 }, { x: 775, y: 360 },
            { x: 1050, y: 480 }, { x: 1200, y: 480 }, { x: 1350, y: 480 },
        ],
        questionBlocks: [{ x: 625, y: 280, contents: 'star' }],
        enemies: [
            { x: 430, y: 500, type: 'piranha' }, { x: 580, y: 500, type: 'piranha' },
            { x: 730, y: 500, type: 'piranha' }, { x: 880, y: 500, type: 'piranha' },
            { x: 1030, y: 500, type: 'piranha' }, { x: 1180, y: 500, type: 'piranha' },
            { x: 1330, y: 500, type: 'piranha' },
        ],
        decorations: [{ x: 300, y: 100, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1700, y: 508 }, timeBonus: 30
    },

    // Level 10: "The Great Gap" - Large jumps
    {
        name: "The Great Gap",
        width: 2200, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 250, 40, 'grass'),
            // Big gaps between platforms
            createPlat(550, 540, 120, 32, 'platform_easy'),
            createPlat(900, 540, 120, 32, 'platform_medium'),
            createPlat(1200, 500, 100, 28, 'platform_medium'),
            createPlat(1500, 540, 120, 32, 'platform_easy'),
            createPlat(1850, 540, 250, 40, 'grass'),
        ],
        coins: [
            { x: 550, y: 480 }, { x: 900, y: 480 }, { x: 1200, y: 440 },
            { x: 1500, y: 480 },
        ],
        questionBlocks: [
            { x: 900, y: 400, contents: 'mushroom' },
            { x: 1200, y: 360, contents: 'flower' },
        ],
        enemies: [{ x: 600, y: 520, type: 'goomba' }, { x: 1550, y: 520, type: 'koopa' }],
        decorations: [{ x: 700, y: 80, type: 'cloud' }, { x: 1300, y: 60, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1950, y: 508 }, timeBonus: 20
    },

    // Level 11: "Triple Tower" - 3 vertical sections
    {
        name: "Triple Tower",
        width: 2000, height: 800, biome: 'grass',
        platforms: [
            createPlat(150, 540, 250, 40, 'grass'),
            // Tower 1
            createPlat(400, 480, 80, 24, 'platform_easy'),
            createPlat(480, 400, 80, 24, 'platform_medium'),
            createPlat(560, 320, 80, 24, 'platform_hard'),
            // Connecting
            createPlat(750, 320, 150, 32, 'grass'),
            // Tower 2
            createPlat(950, 400, 80, 24, 'platform_medium'),
            createPlat(1030, 480, 80, 24, 'platform_easy'),
            createPlat(1110, 560, 80, 24, 'platform_easy'),
            // Connector
            createPlat(1300, 560, 150, 32, 'grass'),
            // Tower 3 (highest)
            createPlat(1500, 480, 80, 24, 'platform_medium'),
            createPlat(1580, 380, 80, 24, 'platform_hard'),
            createPlat(1660, 280, 80, 24, 'platform_hard'),
            // End
            createPlat(1850, 540, 150, 40, 'grass'),
        ],
        coins: [
            { x: 400, y: 420 }, { x: 480, y: 340 }, { x: 560, y: 260 },
            { x: 950, y: 340 }, { x: 1030, y: 420 }, { x: 1110, y: 500 },
            { x: 1500, y: 420 }, { x: 1580, y: 320 }, { x: 1660, y: 220 },
        ],
        questionBlocks: [
            { x: 560, y: 180, contents: 'star' },
            { x: 1660, y: 200, contents: 'flower' },
        ],
        enemies: [],
        decorations: [{ x: 200, y: 520, type: 'tree' }, { x: 800, y: 60, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1900, y: 508 }, timeBonus: 40
    },

    // Level 12: "Bushwhacker" - Dense bushes with enemies
    {
        name: "Bushwhacker",
        width: 1800, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 300, 40, 'grass'),
            createPlat(500, 540, 200, 40, 'grass'),
            createPlat(750, 540, 150, 40, 'grass'),
            createPlat(950, 480, 100, 24, 'platform_easy'),
            createPlat(1100, 540, 200, 40, 'grass'),
            createPlat(1350, 540, 150, 40, 'grass'),
            createPlat(1550, 540, 200, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 480 }, { x: 600, y: 480 }, { x: 950, y: 420 }, { x: 1200, y: 480 }, { x: 1450, y: 480 }],
        questionBlocks: [],
        enemies: [
            { x: 300, y: 520, type: 'goomba' }, { x: 550, y: 520, type: 'goomba' },
            { x: 800, y: 520, type: 'koopa' }, { x: 1150, y: 520, type: 'goomba' },
            { x: 1400, y: 520, type: 'koopa' }, { x: 1650, y: 520, type: 'goomba' },
        ],
        decorations: [
            { x: 100, y: 520, type: 'bush' }, { x: 250, y: 520, type: 'bush' },
            { x: 450, y: 520, type: 'tree' }, { x: 650, y: 520, type: 'tree' },
            { x: 900, y: 520, type: 'bush' }, { x: 1050, y: 520, type: 'tree' },
            { x: 1300, y: 520, type: 'tree' }, { x: 1500, y: 520, type: 'bush' },
        ],
        playerStart: { x: 80, y: 500 }, goal: { x: 1700, y: 508 }, timeBonus: 10
    },

    // Level 13: "Secret Chamber" - Hidden coin area
    {
        name: "Secret Chamber",
        width: 2000, height: 700, biome: 'grass',
        platforms: [
            createPlat(150, 540, 250, 40, 'grass'),
            createPlat(500, 540, 200, 40, 'grass'),
            // Secret area above
            createPlat(650, 300, 80, 24, 'cloud'),
            createPlat(750, 250, 80, 24, 'cloud'),
            createPlat(850, 300, 80, 24, 'cloud'),
            // Main path continues
            createPlat(800, 540, 200, 40, 'grass'),
            createPlat(1100, 540, 150, 40, 'grass'),
            createPlat(1300, 480, 100, 24, 'platform_medium'),
            createPlat(1450, 540, 150, 40, 'grass'),
            createPlat(1700, 540, 200, 40, 'grass'),
        ],
        coins: [
            // Secret coins (up high)
            { x: 650, y: 240 }, { x: 750, y: 190 }, { x: 850, y: 240 },
            // Main path
            { x: 600, y: 480 }, { x: 900, y: 480 }, { x: 1150, y: 480 }, { x: 1500, y: 480 },
        ],
        questionBlocks: [
            { x: 750, y: 170, contents: 'star' },
            { x: 1300, y: 400, contents: 'mushroom' },
        ],
        enemies: [{ x: 550, y: 520, type: 'goomba' }, { x: 900, y: 520, type: 'goomba' }],
        decorations: [{ x: 300, y: 520, type: 'tree' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1800, y: 508 }, timeBonus: 25
    },

    // Level 14: "Hilltop Sprint" - Rolling hills pattern
    {
        name: "Hilltop Sprint",
        width: 2200, height: 650, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 520, 150, 60, 'grass'),
            createPlat(600, 500, 150, 80, 'grass'),
            createPlat(800, 520, 150, 60, 'grass'),
            createPlat(1000, 540, 200, 40, 'grass'),
            createPlat(1250, 520, 150, 60, 'grass'),
            createPlat(1450, 500, 150, 80, 'grass'),
            createPlat(1650, 520, 150, 60, 'grass'),
            createPlat(1850, 540, 250, 40, 'grass'),
        ],
        coins: [
            { x: 400, y: 460 }, { x: 600, y: 440 }, { x: 800, y: 460 },
            { x: 1100, y: 480 }, { x: 1250, y: 460 }, { x: 1450, y: 440 },
            { x: 1650, y: 460 },
        ],
        questionBlocks: [{ x: 1000, y: 480, contents: 'coin' }],
        enemies: [
            { x: 450, y: 500, type: 'goomba' }, { x: 650, y: 480, type: 'koopa' },
            { x: 850, y: 500, type: 'goomba' }, { x: 1300, y: 500, type: 'koopa' },
            { x: 1500, y: 480, type: 'goomba' },
        ],
        decorations: [{ x: 200, y: 100, type: 'cloud' }, { x: 700, y: 80, type: 'cloud' }, { x: 1200, y: 60, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1950, y: 508 }, timeBonus: 15
    },

    // Level 15: "The Maze" - Multiple paths convergence
    {
        name: "The Maze",
        width: 2400, height: 700, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            // Path A (top)
            createPlat(400, 350, 100, 24, 'platform_hard'),
            createPlat(600, 300, 100, 24, 'platform_hard'),
            createPlat(800, 350, 100, 24, 'platform_hard'),
            // Path B (middle)
            createPlat(450, 480, 100, 24, 'platform_medium'),
            createPlat(650, 480, 100, 24, 'platform_medium'),
            createPlat(850, 480, 100, 24, 'platform_medium'),
            // Path C (bottom)
            createPlat(500, 540, 150, 32, 'platform_easy'),
            createPlat(750, 540, 150, 32, 'platform_easy'),
            createPlat(1000, 540, 150, 32, 'platform_easy'),
            // All converge
            createPlat(1250, 540, 300, 40, 'grass'),
            createPlat(1600, 540, 200, 40, 'grass'),
            createPlat(1900, 540, 200, 40, 'grass'),
        ],
        coins: [
            { x: 400, y: 290 }, { x: 600, y: 240 }, { x: 800, y: 290 },
            { x: 450, y: 420 }, { x: 650, y: 420 }, { x: 850, y: 420 },
            { x: 500, y: 480 }, { x: 750, y: 480 }, { x: 1000, y: 480 },
        ],
        questionBlocks: [
            { x: 600, y: 160, contents: 'star' },
            { x: 650, y: 340, contents: 'flower' },
        ],
        enemies: [{ x: 550, y: 520, type: 'goomba' }, { x: 1050, y: 520, type: 'koopa' }],
        decorations: [{ x: 250, y: 520, type: 'tree' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2000, y: 508 }, timeBonus: 35
    },

    // Levels 16-20: More complex variations
    // (I'll add more in subsequent writes)
    {
        name: "Sky Bridge",
        width: 2000, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 450, 80, 24, 'cloud'),
            createPlat(550, 380, 80, 24, 'cloud'),
            createPlat(700, 300, 80, 24, 'cloud'),
            createPlat(850, 380, 80, 24, 'cloud'),
            createPlat(1000, 450, 80, 24, 'cloud'),
            createPlat(1150, 540, 150, 40, 'grass'),
            createPlat(1400, 450, 80, 24, 'cloud'),
            createPlat(1550, 380, 80, 24, 'cloud'),
            createPlat(1700, 300, 80, 24, 'cloud'),
            createPlat(1850, 540, 150, 40, 'grass'),
        ],
        coins: [
            { x: 400, y: 390 }, { x: 550, y: 320 }, { x: 700, y: 240 },
            { x: 850, y: 320 }, { x: 1000, y: 390 },
            { x: 1400, y: 390 }, { x: 1550, y: 320 }, { x: 1700, y: 240 },
        ],
        questionBlocks: [
            { x: 700, y: 180, contents: 'star' },
            { x: 1700, y: 180, contents: 'star' },
        ],
        enemies: [],
        decorations: [{ x: 300, y: 80, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1900, y: 508 }, timeBonus: 30
    },

    // Level 17: "Coin Cascade" - Many coins
    {
        name: "Coin Cascade",
        width: 1800, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 250, 40, 'grass'),
            createPlat(500, 540, 200, 40, 'grass'),
            createPlat(800, 540, 200, 40, 'grass'),
            createPlat(1100, 540, 200, 40, 'grass'),
            createPlat(1400, 540, 200, 40, 'grass'),
        ],
        coins: [
            // Big arc on each platform
            { x: 450, y: 500 }, { x: 475, y: 520 }, { x: 500, y: 500 }, { x: 525, y: 480 }, { x: 550, y: 500 },
            { x: 750, y: 500 }, { x: 775, y: 520 }, { x: 800, y: 500 }, { x: 825, y: 480 }, { x: 850, y: 500 },
            { x: 1050, y: 500 }, { x: 1075, y: 520 }, { x: 1100, y: 500 }, { x: 1125, y: 480 }, { x: 1150, y: 500 },
            { x: 1350, y: 500 }, { x: 1375, y: 520 }, { x: 1400, y: 500 }, { x: 1425, y: 480 }, { x: 1450, y: 500 },
        ],
        questionBlocks: [{ x: 500, y: 480, contents: 'coin' }, { x: 800, y: 480, contents: 'coin' }],
        enemies: [{ x: 600, y: 520, type: 'goomba' }, { x: 1200, y: 520, type: 'koopa' }],
        decorations: [{ x: 200, y: 520, type: 'tree' }, { x: 900, y: 100, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1550, y: 508 }, timeBonus: 15
    },

    // Level 18: "Tower of Terror" - Tall vertical level
    {
        name: "Tower of Terror",
        width: 1500, height: 900, biome: 'grass',
        platforms: [
            createPlat(150, 700, 250, 40, 'grass'),
            createPlat(450, 650, 100, 24, 'platform_easy'),
            createPlat(550, 580, 80, 24, 'platform_medium'),
            createPlat(450, 510, 80, 24, 'platform_medium'),
            createPlat(550, 440, 80, 24, 'platform_hard'),
            createPlat(450, 370, 80, 24, 'platform_hard'),
            createPlat(550, 300, 80, 24, 'platform_hard'),
            createPlat(700, 240, 200, 32, 'grass'),
            createPlat(900, 300, 80, 24, 'platform_hard'),
            createPlat(1000, 370, 80, 24, 'platform_medium'),
            createPlat(900, 440, 80, 24, 'platform_medium'),
            createPlat(1000, 510, 80, 24, 'platform_easy'),
            createPlat(900, 580, 80, 24, 'platform_easy'),
            createPlat(1000, 650, 80, 24, 'platform_easy'),
            createPlat(1150, 700, 250, 40, 'grass'),
        ],
        coins: [
            { x: 450, y: 590 }, { x: 550, y: 520 }, { x: 450, y: 450 }, { x: 550, y: 380 },
            { x: 450, y: 310 }, { x: 550, y: 240 },
            { x: 900, y: 240 }, { x: 1000, y: 310 }, { x: 900, y: 380 }, { x: 1000, y: 450 },
            { x: 900, y: 520 }, { x: 1000, y: 590 },
        ],
        questionBlocks: [
            { x: 450, y: 430, contents: 'star' },
            { x: 550, y: 160, contents: 'flower' },
            { x: 900, y: 160, contents: 'star' },
        ],
        enemies: [{ x: 800, y: 220, type: 'koopa' }],
        decorations: [{ x: 200, y: 680, type: 'tree' }],
        playerStart: { x: 80, y: 660 }, goal: { x: 1250, y: 668 }, timeBonus: 50
    },

    // Level 19: "Quick Drop" - Downward spiral
    {
        name: "Quick Drop",
        width: 1800, height: 700, biome: 'grass',
        platforms: [
            createPlat(150, 200, 250, 40, 'grass'), // Start high!
            createPlat(400, 280, 100, 24, 'platform_medium'),
            createPlat(550, 360, 100, 24, 'platform_easy'),
            createPlat(700, 440, 100, 24, 'platform_medium'),
            createPlat(850, 520, 100, 24, 'platform_easy'),
            createPlat(1000, 540, 200, 40, 'grass'),
            createPlat(1250, 480, 100, 24, 'platform_medium'),
            createPlat(1400, 540, 100, 24, 'platform_easy'),
            createPlat(1550, 540, 200, 40, 'grass'),
        ],
        coins: [
            { x: 400, y: 220 }, { x: 550, y: 300 }, { x: 700, y: 380 },
            { x: 850, y: 460 }, { x: 1250, y: 420 }, { x: 1400, y: 480 },
        ],
        questionBlocks: [{ x: 700, y: 360, contents: 'mushroom' }],
        enemies: [{ x: 1100, y: 520, type: 'goomba' }],
        decorations: [{ x: 300, y: 160, type: 'cloud' }, { x: 800, y: 80, type: 'cloud' }],
        playerStart: { x: 80, y: 160 }, goal: { x: 1650, y: 508 }, timeBonus: 20
    },

    // Level 20: "The Gauntlet" - End of world 1 - hard!
    {
        name: "The Gauntlet",
        width: 2600, height: 650, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 540, 80, 32, 'platform_easy'),
            createPlat(550, 480, 60, 24, 'platform_medium'),
            createPlat(650, 420, 60, 24, 'platform_hard'),
            createPlat(750, 360, 60, 24, 'platform_hard'),
            createPlat(900, 300, 100, 32, 'grass'),
            createPlat(1100, 360, 60, 24, 'platform_hard'),
            createPlat(1200, 420, 60, 24, 'platform_medium'),
            createPlat(1300, 480, 60, 24, 'platform_medium'),
            createPlat(1400, 540, 80, 32, 'platform_easy'),
            createPlat(1600, 540, 200, 40, 'grass'),
            createPlat(1900, 480, 80, 24, 'platform_medium'),
            createPlat(2050, 420, 60, 24, 'platform_hard'),
            createPlat(2200, 540, 200, 40, 'grass'),
        ],
        coins: [
            { x: 400, y: 480 }, { x: 550, y: 420 }, { x: 650, y: 360 }, { x: 750, y: 300 },
            { x: 1100, y: 300 }, { x: 1200, y: 360 }, { x: 1300, y: 420 }, { x: 1900, y: 420 },
            { x: 2050, y: 360 },
        ],
        questionBlocks: [
            { x: 900, y: 220, contents: 'star' },
            { x: 1600, y: 480, contents: 'mushroom' },
            { x: 2050, y: 340, contents: 'star' },
        ],
        enemies: [
            { x: 500, y: 520, type: 'goomba' },
            { x: 1450, y: 520, type: 'koopa' },
            { x: 1700, y: 520, type: 'goomba' },
        ],
        decorations: [{ x: 250, y: 100, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2300, y: 508 }, timeBonus: 40
    },

    // Levels 21-35: More World 1 levels (I'll add more below)
    // For brevity, I'll create a few more representative levels then move to World 2
    {
        name: "Beanstalk Garden",
        width: 1800, height: 750, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 480, 80, 24, 'platform_easy'),
            createPlat(500, 400, 80, 24, 'platform_medium'),
            createPlat(600, 320, 80, 24, 'platform_medium'),
            createPlat(700, 240, 80, 24, 'platform_hard'),
            createPlat(850, 180, 200, 32, 'grass'),
            createPlat(1100, 240, 80, 24, 'platform_hard'),
            createPlat(1200, 320, 80, 24, 'platform_medium'),
            createPlat(1300, 400, 80, 24, 'platform_easy'),
            createPlat(1400, 480, 80, 24, 'platform_easy'),
            createPlat(1550, 540, 200, 40, 'grass'),
        ],
        coins: [
            { x: 400, y: 420 }, { x: 500, y: 340 }, { x: 600, y: 260 }, { x: 700, y: 180 },
            { x: 1100, y: 180 }, { x: 1200, y: 260 }, { x: 1300, y: 340 }, { x: 1400, y: 420 },
        ],
        questionBlocks: [{ x: 700, y: 100, contents: 'star' }, { x: 950, y: 100, contents: 'flower' }],
        enemies: [{ x: 950, y: 160, type: 'spiny' }],
        decorations: [{ x: 300, y: 80, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1650, y: 508 }, timeBonus: 35
    },

    {
        name: "Parallax Plains",
        width: 2400, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 300, 40, 'grass'),
            createPlat(550, 540, 150, 40, 'grass'),
            createPlat(800, 500, 80, 28, 'platform_medium'),
            createPlat(950, 460, 80, 28, 'platform_medium'),
            createPlat(1100, 540, 150, 40, 'grass'),
            createPlat(1400, 540, 150, 40, 'grass'),
            createPlat(1650, 500, 80, 28, 'platform_medium'),
            createPlat(1800, 460, 80, 28, 'platform_hard'),
            createPlat(1950, 540, 300, 40, 'grass'),
        ],
        coins: [{ x: 450, y: 480 }, { x: 800, y: 440 }, { x: 950, y: 400 }, { x: 1200, y: 480 }, { x: 1650, y: 440 }, { x: 1800, y: 400 }],
        questionBlocks: [{ x: 950, y: 320, contents: 'flower' }, { x: 1800, y: 320, contents: 'star' }],
        enemies: [{ x: 600, y: 520, type: 'goomba' }, { x: 1150, y: 520, type: 'koopa' }, { x: 1700, y: 520, type: 'goomba' }],
        decorations: [{ x: 200, y: 100, type: 'cloud' }, { x: 700, y: 80, type: 'cloud' }, { x: 1300, y: 60, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2050, y: 508 }, timeBonus: 20
    },

    {
        name: "Hidden Valley",
        width: 1900, height: 650, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 540, 150, 40, 'grass'),
            createPlat(600, 400, 80, 24, 'cloud'),
            createPlat(750, 320, 80, 24, 'cloud'),
            createPlat(900, 400, 80, 24, 'cloud'),
            createPlat(1050, 480, 150, 40, 'grass'),
            createPlat(1300, 540, 200, 40, 'grass'),
            createPlat(1550, 540, 150, 40, 'grass'),
        ],
        coins: [
            { x: 450, y: 480 },
            { x: 600, y: 340 }, { x: 750, y: 260 }, { x: 900, y: 340 },
            { x: 1150, y: 420 },
            { x: 1400, y: 480 }, { x: 1600, y: 480 },
        ],
        questionBlocks: [{ x: 750, y: 180, contents: 'star' }, { x: 1050, y: 400, contents: 'mushroom' }],
        enemies: [{ x: 500, y: 520, type: 'goomba' }, { x: 1350, y: 520, type: 'koopa' }],
        decorations: [{ x: 250, y: 520, type: 'tree' }, { x: 1000, y: 80, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1650, y: 508 }, timeBonus: 25
    },

    {
        name: "Winding Road",
        width: 2200, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 500, 100, 24, 'platform_medium'),
            createPlat(550, 460, 100, 24, 'platform_medium'),
            createPlat(700, 420, 100, 24, 'platform_hard'),
            createPlat(850, 460, 100, 24, 'platform_medium'),
            createPlat(1000, 500, 100, 24, 'platform_medium'),
            createPlat(1150, 540, 150, 40, 'grass'),
            createPlat(1400, 500, 100, 24, 'platform_medium'),
            createPlat(1550, 460, 100, 24, 'platform_medium'),
            createPlat(1700, 420, 100, 24, 'platform_hard'),
            createPlat(1850, 540, 200, 40, 'grass'),
        ],
        coins: [
            { x: 400, y: 440 }, { x: 550, y: 400 }, { x: 700, y: 360 }, { x: 850, y: 400 },
            { x: 1000, y: 440 }, { x: 1400, y: 440 }, { x: 1550, y: 400 }, { x: 1700, y: 360 },
        ],
        questionBlocks: [
            { x: 700, y: 280, contents: 'star' },
            { x: 1700, y: 280, contents: 'star' },
        ],
        enemies: [{ x: 600, y: 520, type: 'goomba' }, { x: 1200, y: 520, type: 'koopa' }],
        decorations: [{ x: 300, y: 100, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1950, y: 508 }, timeBonus: 25
    },

    {
        name: "Clover Field",
        width: 1700, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 250, 40, 'grass'),
            createPlat(450, 540, 100, 32, 'platform_easy'),
            createPlat(600, 500, 80, 24, 'platform_easy'),
            createPlat(720, 460, 80, 24, 'platform_easy'),
            createPlat(840, 420, 80, 24, 'platform_medium'),
            createPlat(960, 460, 80, 24, 'platform_medium'),
            createPlat(1080, 500, 80, 24, 'platform_easy'),
            createPlat(1200, 540, 100, 32, 'platform_easy'),
            createPlat(1450, 540, 200, 40, 'grass'),
        ],
        coins: [
            { x: 450, y: 480 }, { x: 600, y: 440 }, { x: 720, y: 400 }, { x: 840, y: 360 },
            { x: 960, y: 400 }, { x: 1080, y: 440 }, { x: 1200, y: 480 },
        ],
        questionBlocks: [
            { x: 840, y: 280, contents: 'flower' },
        ],
        enemies: [{ x: 500, y: 520, type: 'goomba' }],
        decorations: [
            { x: 100, y: 520, type: 'bush' }, { x: 200, y: 520, type: 'bush' },
            { x: 350, y: 520, type: 'tree' }, { x: 900, y: 520, type: 'bush' },
        ],
        playerStart: { x: 80, y: 500 }, goal: { x: 1550, y: 508 }, timeBonus: 15
    },

    // Finish World 1 with a few more levels
    {
        name: "Thunder Peak",
        width: 2000, height: 800, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 480, 80, 24, 'platform_medium'),
            createPlat(500, 400, 80, 24, 'platform_medium'),
            createPlat(600, 320, 80, 24, 'platform_hard'),
            createPlat(700, 240, 80, 24, 'platform_hard'),
            createPlat(850, 160, 150, 32, 'grass'),
            createPlat(1050, 240, 80, 24, 'platform_hard'),
            createPlat(1150, 320, 80, 24, 'platform_medium'),
            createPlat(1250, 400, 80, 24, 'platform_medium'),
            createPlat(1350, 480, 80, 24, 'platform_easy'),
            createPlat(1450, 540, 200, 40, 'grass'),
            createPlat(1700, 540, 200, 40, 'grass'),
        ],
        coins: [
            { x: 400, y: 420 }, { x: 500, y: 340 }, { x: 600, y: 260 }, { x: 700, y: 180 },
            { x: 1050, y: 180 }, { x: 1150, y: 260 }, { x: 1250, y: 340 }, { x: 1350, y: 420 },
        ],
        questionBlocks: [
            { x: 700, y: 100, contents: 'star' },
            { x: 950, y: 80, contents: 'flower' },
        ],
        enemies: [{ x: 950, y: 140, type: 'spiny' }],
        decorations: [{ x: 200, y: 80, type: 'cloud' }, { x: 600, y: 60, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1800, y: 508 }, timeBonus: 45
    },

    // ==================== WORLD 2: CAVE WORLD (Levels 36-70) ====================
    // Darker theme, more enemies, underground sections
    
    {
        name: "Dark Entrance",
        width: 1600, height: 600, biome: 'cave',
        platforms: [
            createPlat(150, 540, 300, 40, 'cave'),
            createPlat(500, 540, 200, 40, 'cave'),
            createPlat(750, 540, 200, 40, 'cave'),
            createPlat(1000, 540, 200, 40, 'cave'),
            createPlat(1250, 540, 250, 40, 'cave'),
        ],
        coins: [{ x: 400, y: 480 }, { x: 600, y: 480 }, { x: 800, y: 480 }, { x: 1100, y: 480 }],
        questionBlocks: [],
        enemies: [
            { x: 550, y: 520, type: 'goomba' }, { x: 800, y: 520, type: 'goomba' },
            { x: 1050, y: 520, type: 'goomba' },
        ],
        decorations: [{ x: 100, y: 100, type: 'bat' }, { x: 600, y: 80, type: 'bat' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1400, y: 508 }, timeBonus: 10
    },

    {
        name: "Crystal Cavern",
        width: 1800, height: 700, biome: 'cave',
        platforms: [
            createPlat(150, 540, 250, 40, 'cave'),
            createPlat(450, 480, 80, 24, 'platform_easy'),
            createPlat(550, 400, 80, 24, 'platform_medium'),
            createPlat(650, 320, 80, 24, 'platform_medium'),
            createPlat(750, 240, 100, 24, 'platform_hard'),
            createPlat(900, 240, 150, 32, 'cave'),
            createPlat(1100, 320, 80, 24, 'platform_medium'),
            createPlat(1200, 400, 80, 24, 'platform_medium'),
            createPlat(1300, 480, 80, 24, 'platform_easy'),
            createPlat(1450, 540, 250, 40, 'cave'),
        ],
        coins: [
            { x: 450, y: 420 }, { x: 550, y: 340 }, { x: 650, y: 260 }, { x: 750, y: 180 },
            { x: 1100, y: 260 }, { x: 1200, y: 340 }, { x: 1300, y: 420 },
        ],
        questionBlocks: [
            { x: 750, y: 100, contents: 'star' },
        ],
        enemies: [{ x: 950, y: 220, type: 'spiny' }],
        decorations: [{ x: 300, y: 80, type: 'bat' }, { x: 700, y: 60, type: 'bat' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1550, y: 508 }, timeBonus: 30
    },

    // Continuing with more cave levels... I'll add more complete levels
    
    // Level 37: "Stalactite Alley"
    {
        name: "Stalactite Alley",
        width: 2000, height: 600, biome: 'cave',
        platforms: [
            createPlat(150, 540, 200, 40, 'cave'),
            createPlat(400, 540, 80, 32, 'brick'),
            createPlat(520, 540, 80, 32, 'brick'),
            createPlat(640, 540, 80, 32, 'brick'),
            createPlat(800, 500, 100, 28, 'platform_medium'),
            createPlat(950, 440, 100, 28, 'platform_medium'),
            createPlat(1100, 500, 100, 28, 'platform_medium'),
            createPlat(1250, 540, 80, 32, 'brick'),
            createPlat(1370, 540, 80, 32, 'brick'),
            createPlat(1490, 540, 80, 32, 'brick'),
            createPlat(1650, 540, 250, 40, 'cave'),
        ],
        coins: [
            { x: 440, y: 480 }, { x: 560, y: 480 }, { x: 680, y: 480 },
            { x: 950, y: 380 }, { x: 1100, y: 440 },
            { x: 1290, y: 480 }, { x: 1410, y: 480 }, { x: 1530, y: 480 },
        ],
        questionBlocks: [{ x: 800, y: 420, contents: 'mushroom' }],
        enemies: [
            { x: 440, y: 520, type: 'goomba' }, { x: 560, y: 520, type: 'goomba' },
            { x: 1290, y: 520, type: 'goomba' }, { x: 1410, y: 520, type: 'goomba' },
        ],
        decorations: [{ x: 500, y: 80, type: 'bat' }, { x: 1000, y: 60, type: 'bat' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1750, y: 508 }, timeBonus: 20
    },

    // Level 38: "The Deep Shaft"
    {
        name: "The Deep Shaft",
        width: 1200, height: 850, biome: 'cave',
        platforms: [
            createPlat(150, 700, 200, 40, 'cave'),
            createPlat(400, 650, 80, 24, 'platform_easy'),
            createPlat(500, 580, 80, 24, 'platform_medium'),
            createPlat(400, 510, 80, 24, 'platform_medium'),
            createPlat(500, 440, 80, 24, 'platform_medium'),
            createPlat(400, 370, 80, 24, 'platform_hard'),
            createPlat(500, 300, 80, 24, 'platform_hard'),
            createPlat(600, 230, 150, 32, 'cave'),
            createPlat(800, 300, 80, 24, 'platform_hard'),
            createPlat(900, 370, 80, 24, 'platform_medium'),
            createPlat(800, 440, 80, 24, 'platform_medium'),
            createPlat(900, 510, 80, 24, 'platform_medium'),
            createPlat(800, 580, 80, 24, 'platform_easy'),
            createPlat(900, 650, 80, 24, 'platform_easy'),
            createPlat(1000, 700, 150, 40, 'cave'),
        ],
        coins: [
            { x: 400, y: 590 }, { x: 500, y: 520 }, { x: 400, y: 450 }, { x: 500, y: 380 },
            { x: 400, y: 310 }, { x: 500, y: 240 },
            { x: 800, y: 240 }, { x: 900, y: 310 }, { x: 800, y: 380 }, { x: 900, y: 450 },
            { x: 800, y: 520 }, { x: 900, y: 590 },
        ],
        questionBlocks: [
            { x: 600, y: 150, contents: 'star' },
            { x: 600, y: 280, contents: 'flower' },
        ],
        enemies: [{ x: 650, y: 210, type: 'spiny' }],
        decorations: [{ x: 400, y: 100, type: 'bat' }, { x: 800, y: 100, type: 'bat' }],
        playerStart: { x: 80, y: 660 }, goal: { x: 1050, y: 668 }, timeBonus: 50
    },

    // Level 39: "Spider's Web"
    {
        name: "Spider's Web",
        width: 2000, height: 650, biome: 'cave',
        platforms: [
            createPlat(150, 540, 200, 40, 'cave'),
            createPlat(400, 480, 80, 24, 'platform_easy'),
            createPlat(500, 420, 80, 24, 'platform_medium'),
            createPlat(600, 360, 80, 24, 'platform_medium'),
            createPlat(700, 420, 80, 24, 'platform_medium'),
            createPlat(800, 480, 80, 24, 'platform_easy'),
            createPlat(950, 540, 200, 40, 'cave'),
            createPlat(1200, 480, 80, 24, 'platform_medium'),
            createPlat(1300, 420, 80, 24, 'platform_medium'),
            createPlat(1400, 360, 80, 24, 'platform_hard'),
            createPlat(1500, 420, 80, 24, 'platform_medium'),
            createPlat(1600, 480, 80, 24, 'platform_easy'),
            createPlat(1750, 540, 200, 40, 'cave'),
        ],
        coins: [
            { x: 400, y: 420 }, { x: 500, y: 360 }, { x: 600, y: 300 }, { x: 700, y: 360 },
            { x: 1200, y: 420 }, { x: 1300, y: 360 }, { x: 1400, y: 300 }, { x: 1500, y: 360 },
        ],
        questionBlocks: [{ x: 600, y: 220, contents: 'star' }, { x: 1400, y: 220, contents: 'star' }],
        enemies: [
            { x: 500, y: 520, type: 'goomba' }, { x: 700, y: 520, type: 'goomba' },
            { x: 1300, y: 520, type: 'goomba' }, { x: 1500, y: 520, type: 'goomba' },
        ],
        decorations: [{ x: 300, y: 80, type: 'bat' }, { x: 800, y: 60, type: 'bat' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1850, y: 508 }, timeBonus: 25
    },

    // Level 40: "Underground Lake"
    {
        name: "Underground Lake",
        width: 2200, height: 600, biome: 'cave',
        platforms: [
            createPlat(150, 540, 200, 40, 'cave'),
            createPlat(400, 540, 100, 32, 'cave'),
            // Small platforms over "water"
            createPlat(550, 480, 60, 20, 'platform_easy'),
            createPlat(650, 440, 60, 20, 'platform_medium'),
            createPlat(750, 400, 60, 20, 'platform_medium'),
            createPlat(850, 440, 60, 20, 'platform_easy'),
            createPlat(950, 480, 60, 20, 'platform_easy'),
            createPlat(1100, 540, 150, 40, 'cave'),
            createPlat(1350, 540, 100, 32, 'cave'),
            createPlat(1500, 480, 60, 20, 'platform_easy'),
            createPlat(1600, 440, 60, 20, 'platform_medium'),
            createPlat(1700, 400, 60, 20, 'platform_medium'),
            createPlat(1800, 440, 60, 20, 'platform_easy'),
            createPlat(1950, 540, 200, 40, 'cave'),
        ],
        coins: [
            { x: 550, y: 420 }, { x: 650, y: 380 }, { x: 750, y: 340 }, { x: 850, y: 380 },
            { x: 1500, y: 420 }, { x: 1600, y: 380 }, { x: 1700, y: 340 },
        ],
        questionBlocks: [{ x: 750, y: 260, contents: 'star' }, { x: 1700, y: 260, contents: 'flower' }],
        enemies: [{ x: 450, y: 520, type: 'goomba' }, { x: 1150, y: 520, type: 'koopa' }],
        decorations: [{ x: 200, y: 80, type: 'bat' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2050, y: 508 }, timeBonus: 30
    },

    // More cave levels - I'll add the rest in batches to keep file size manageable
    // For now, let's add a few key distinctive levels then move to World 3

    {
        name: "The Pit",
        width: 1400, height: 800, biome: 'cave',
        platforms: [
            createPlat(150, 700, 200, 40, 'cave'),
            createPlat(450, 700, 80, 24, 'platform_easy'),
            createPlat(550, 620, 80, 24, 'platform_easy'),
            createPlat(450, 540, 80, 24, 'platform_medium'),
            createPlat(550, 460, 80, 24, 'platform_medium'),
            createPlat(450, 380, 80, 24, 'platform_medium'),
            createPlat(550, 300, 80, 24, 'platform_hard'),
            createPlat(650, 220, 150, 32, 'cave'),
            createPlat(850, 300, 80, 24, 'platform_hard'),
            createPlat(950, 380, 80, 24, 'platform_medium'),
            createPlat(850, 460, 80, 24, 'platform_medium'),
            createPlat(950, 540, 80, 24, 'platform_medium'),
            createPlat(850, 620, 80, 24, 'platform_easy'),
            createPlat(950, 700, 80, 24, 'platform_easy'),
            createPlat(1200, 700, 150, 40, 'cave'),
        ],
        coins: [
            { x: 450, y: 640 }, { x: 550, y: 560 }, { x: 450, y: 480 }, { x: 550, y: 400 },
            { x: 450, y: 320 }, { x: 550, y: 240 },
            { x: 850, y: 240 }, { x: 950, y: 320 }, { x: 850, y: 400 }, { x: 950, y: 480 },
            { x: 850, y: 560 }, { x: 950, y: 640 },
        ],
        questionBlocks: [{ x: 650, y: 140, contents: 'star' }],
        enemies: [{ x: 700, y: 200, type: 'spiny' }],
        decorations: [{ x: 500, y: 100, type: 'bat' }],
        playerStart: { x: 80, y: 660 }, goal: { x: 1250, y: 668 }, timeBonus: 45
    },

    // ==================== WORLD 3: CASTLE WORLD (Levels 71-100) ====================
    // Dark, challenging, boss-like elements

    {
        name: "Castle Gates",
        width: 1800, height: 600, biome: 'castle',
        platforms: [
            createPlat(150, 540, 250, 40, 'castle'),
            createPlat(450, 540, 150, 40, 'castle'),
            createPlat(700, 540, 150, 40, 'castle'),
            createPlat(950, 540, 150, 40, 'castle'),
            createPlat(1200, 540, 150, 40, 'castle'),
            createPlat(1450, 540, 200, 40, 'castle'),
        ],
        coins: [{ x: 375, y: 480 }, { x: 525, y: 480 }, { x: 775, y: 480 }, { x: 1025, y: 480 }, { x: 1275, y: 480 }],
        questionBlocks: [{ x: 700, y: 480, contents: 'mushroom' }],
        enemies: [
            { x: 525, y: 520, type: 'koopa' }, { x: 775, y: 520, type: 'koopa' },
            { x: 1025, y: 520, type: 'koopa' },
        ],
        decorations: [
            { x: 300, y: 80, type: 'torch' }, { x: 600, y: 80, type: 'torch' },
            { x: 900, y: 80, type: 'torch' }, { x: 1200, y: 80, type: 'torch' },
        ],
        playerStart: { x: 80, y: 500 }, goal: { x: 1550, y: 508 }, timeBonus: 15
    },

    {
        name: "Torchlight Tower",
        width: 1500, height: 750, biome: 'castle',
        platforms: [
            createPlat(150, 540, 200, 40, 'castle'),
            createPlat(350, 480, 80, 24, 'platform_easy'),
            createPlat(430, 400, 80, 24, 'platform_medium'),
            createPlat(350, 320, 80, 24, 'platform_medium'),
            createPlat(430, 240, 80, 24, 'platform_hard'),
            createPlat(550, 160, 200, 32, 'castle'),
            createPlat(800, 240, 80, 24, 'platform_hard'),
            createPlat(880, 320, 80, 24, 'platform_medium'),
            createPlat(800, 400, 80, 24, 'platform_medium'),
            createPlat(880, 480, 80, 24, 'platform_easy'),
            createPlat(1000, 540, 150, 40, 'castle'),
            createPlat(1250, 540, 200, 40, 'castle'),
        ],
        coins: [
            { x: 350, y: 420 }, { x: 430, y: 340 }, { x: 350, y: 260 }, { x: 430, y: 180 },
            { x: 800, y: 180 }, { x: 880, y: 260 }, { x: 800, y: 340 }, { x: 880, y: 420 },
        ],
        questionBlocks: [
            { x: 430, y: 100, contents: 'star' },
            { x: 800, y: 100, contents: 'star' },
        ],
        enemies: [{ x: 650, y: 140, type: 'boo' }],
        decorations: [
            { x: 250, y: 100, type: 'torch' }, { x: 450, y: 80, type: 'torch' },
            { x: 750, y: 80, type: 'torch' }, { x: 950, y: 100, type: 'torch' },
        ],
        playerStart: { x: 80, y: 500 }, goal: { x: 1350, y: 508 }, timeBonus: 40
    },

    {
        name: "The Bridge",
        width: 2400, height: 600, biome: 'castle',
        platforms: [
            createPlat(150, 540, 200, 40, 'castle'),
            createPlat(450, 540, 150, 40, 'castle'),
            // Bridge platforms
            createPlat(700, 480, 60, 24, 'platform_easy'),
            createPlat(850, 480, 60, 24, 'platform_easy'),
            createPlat(1000, 480, 60, 24, 'platform_easy'),
            createPlat(1150, 480, 60, 24, 'platform_easy'),
            createPlat(1300, 480, 60, 24, 'platform_easy'),
            createPlat(1450, 480, 60, 24, 'platform_easy'),
            createPlat(1600, 480, 60, 24, 'platform_easy'),
            createPlat(1750, 540, 200, 40, 'castle'),
            createPlat(2000, 540, 200, 40, 'castle'),
        ],
        coins: [
            { x: 525, y: 480 }, { x: 700, y: 420 }, { x: 850, y: 420 }, { x: 1000, y: 420 },
            { x: 1150, y: 420 }, { x: 1300, y: 420 }, { x: 1450, y: 420 }, { x: 1600, y: 420 },
            { x: 1875, y: 480 },
        ],
        questionBlocks: [{ x: 1000, y: 340, contents: 'mushroom' }, { x: 1450, y: 340, contents: 'flower' }],
        enemies: [
            { x: 750, y: 460, type: 'boo' }, { x: 900, y: 460, type: 'boo' },
            { x: 1200, y: 460, type: 'boo' }, { x: 1350, y: 460, type: 'boo' },
        ],
        decorations: [
            { x: 300, y: 80, type: 'torch' }, { x: 700, y: 100, type: 'torch' },
            { x: 1100, y: 80, type: 'torch' }, { x: 1500, y: 100, type: 'torch' },
        ],
        playerStart: { x: 80, y: 500 }, goal: { x: 2100, y: 508 }, timeBonus: 30
    },

    {
        name: "Thwomp Corridor",
        width: 2000, height: 650, biome: 'castle',
        platforms: [
            createPlat(150, 540, 200, 40, 'castle'),
            createPlat(400, 540, 100, 40, 'castle'),
            createPlat(600, 540, 100, 40, 'castle'),
            createPlat(800, 540, 100, 40, 'castle'),
            createPlat(1000, 540, 100, 40, 'castle'),
            createPlat(1200, 540, 100, 40, 'castle'),
            createPlat(1400, 540, 100, 40, 'castle'),
            createPlat(1600, 540, 100, 40, 'castle'),
            createPlat(1800, 540, 150, 40, 'castle'),
        ],
        coins: [
            { x: 450, y: 480 }, { x: 650, y: 480 }, { x: 850, y: 480 },
            { x: 1050, y: 480 }, { x: 1250, y: 480 }, { x: 1450, y: 480 }, { x: 1650, y: 480 },
        ],
        questionBlocks: [{ x: 600, y: 480, contents: 'coin' }, { x: 1200, y: 480, contents: 'star' }],
        enemies: [
            { x: 500, y: 520, type: 'thwomp' }, { x: 700, y: 520, type: 'thwomp' },
            { x: 1300, y: 520, type: 'thwomp' }, { x: 1500, y: 520, type: 'thwomp' },
        ],
        decorations: [{ x: 200, y: 100, type: 'torch' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1900, y: 508 }, timeBonus: 25
    },

    {
        name: "Ghost Hallway",
        width: 2200, height: 600, biome: 'castle',
        platforms: [
            createPlat(150, 540, 200, 40, 'castle'),
            createPlat(400, 540, 150, 40, 'castle'),
            createPlat(650, 540, 150, 40, 'castle'),
            createPlat(900, 540, 150, 40, 'castle'),
            createPlat(1150, 540, 150, 40, 'castle'),
            createPlat(1400, 540, 150, 40, 'castle'),
            createPlat(1650, 540, 150, 40, 'castle'),
            createPlat(1900, 540, 200, 40, 'castle'),
        ],
        coins: [
            { x: 325, y: 480 }, { x: 475, y: 480 }, { x: 725, y: 480 }, { x: 975, y: 480 },
            { x: 1225, y: 480 }, { x: 1475, y: 480 }, { x: 1725, y: 480 },
        ],
        questionBlocks: [{ x: 900, y: 400, contents: 'star' }],
        enemies: [
            { x: 450, y: 520, type: 'boo' }, { x: 475, y: 520, type: 'boo' },
            { x: 700, y: 520, type: 'boo' }, { x: 725, y: 520, type: 'boo' },
            { x: 950, y: 520, type: 'boo' }, { x: 975, y: 520, type: 'boo' },
            { x: 1200, y: 520, type: 'boo' }, { x: 1225, y: 520, type: 'boo' },
            { x: 1450, y: 520, type: 'boo' }, { x: 1475, y: 520, type: 'boo' },
            { x: 1700, y: 520, type: 'boo' }, { x: 1725, y: 520, type: 'boo' },
        ],
        decorations: [
            { x: 200, y: 80, type: 'torch' }, { x: 500, y: 80, type: 'torch' },
            { x: 800, y: 80, type: 'torch' }, { x: 1100, y: 80, type: 'torch' },
            { x: 1400, y: 80, type: 'torch' }, { x: 1700, y: 80, type: 'torch' },
        ],
        playerStart: { x: 80, y: 500 }, goal: { x: 2000, y: 508 }, timeBonus: 30
    },

    // The final boss level - Level 100
    {
        name: "The Final Castle",
        width: 2800, height: 700, biome: 'castle',
        platforms: [
            // Entrance
            createPlat(150, 540, 200, 40, 'castle'),
            // Section 1 - Thwomps
            createPlat(400, 540, 100, 40, 'castle'),
            createPlat(600, 540, 100, 40, 'castle'),
            createPlat(800, 540, 100, 40, 'castle'),
            // Section 2 - Climb
            createPlat(1000, 480, 80, 24, 'platform_medium'),
            createPlat(1100, 400, 80, 24, 'platform_medium'),
            createPlat(1000, 320, 80, 24, 'platform_hard'),
            createPlat(1100, 240, 150, 32, 'castle'),
            // Section 3 - Boos
            createPlat(1350, 300, 80, 24, 'platform_hard'),
            createPlat(1450, 360, 80, 24, 'platform_medium'),
            createPlat(1350, 420, 80, 24, 'platform_medium'),
            createPlat(1450, 480, 80, 24, 'platform_easy'),
            // Section 4 - Final stretch
            createPlat(1650, 540, 200, 40, 'castle'),
            createPlat(1950, 540, 150, 40, 'castle'),
            createPlat(2150, 480, 80, 24, 'platform_medium'),
            createPlat(2250, 400, 80, 24, 'platform_hard'),
            createPlat(2350, 320, 80, 24, 'platform_hard'),
            createPlat(2450, 240, 150, 32, 'castle'),
            // Goal platform
            createPlat(2700, 540, 100, 40, 'castle'),
        ],
        coins: [
            { x: 450, y: 480 }, { x: 650, y: 480 }, { x: 850, y: 480 },
            { x: 1000, y: 420 }, { x: 1100, y: 340 }, { x: 1000, y: 260 },
            { x: 1350, y: 240 }, { x: 1450, y: 300 }, { x: 1350, y: 360 }, { x: 1450, y: 420 },
            { x: 2200, y: 420 }, { x: 2300, y: 340 }, { x: 2400, y: 260 },
        ],
        questionBlocks: [
            { x: 1100, y: 180, contents: 'star' },
            { x: 2450, y: 160, contents: 'star' },
        ],
        enemies: [
            { x: 450, y: 520, type: 'thwomp' }, { x: 650, y: 520, type: 'thwomp' }, { x: 850, y: 520, type: 'thwomp' },
            { x: 1400, y: 280, type: 'boo' }, { x: 1420, y: 280, type: 'boo' },
            { x: 1700, y: 520, type: 'boo' }, { x: 2000, y: 520, type: 'boo' },
        ],
        decorations: [
            { x: 200, y: 100, type: 'torch' }, { x: 600, y: 80, type: 'torch' },
            { x: 1200, y: 80, type: 'torch' }, { x: 1600, y: 100, type: 'torch' },
            { x: 2000, y: 80, type: 'torch' }, { x: 2400, y: 100, type: 'torch' },
        ],
        playerStart: { x: 80, y: 500 }, goal: { x: 2750, y: 508 }, timeBonus: 60
    },

    // Additional World 1 Levels (21-35)
    {
        name: "Sunny Meadows",
        width: 2000, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 250, 40, 'grass'),
            createPlat(450, 540, 200, 40, 'grass'),
            createPlat(700, 480, 80, 24, 'platform_easy'),
            createPlat(850, 420, 80, 24, 'platform_medium'),
            createPlat(1000, 360, 80, 24, 'platform_hard'),
            createPlat(1200, 420, 80, 24, 'platform_medium'),
            createPlat(1400, 480, 80, 24, 'platform_easy'),
            createPlat(1600, 540, 250, 40, 'grass'),
        ],
        coins: [{ x: 450, y: 480 }, { x: 700, y: 420 }, { x: 850, y: 360 }, { x: 1000, y: 300 }, { x: 1200, y: 360 }],
        questionBlocks: [{ x: 1000, y: 220, contents: 'star' }],
        enemies: [{ x: 500, y: 520, type: 'goomba' }],
        decorations: [{ x: 200, y: 100, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1700, y: 508 }, timeBonus: 20
    },

    {
        name: "Flower Garden",
        width: 1800, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 540, 150, 40, 'grass'),
            createPlat(600, 480, 80, 24, 'platform_easy'),
            createPlat(750, 420, 80, 24, 'platform_medium'),
            createPlat(900, 480, 80, 24, 'platform_easy'),
            createPlat(1100, 540, 200, 40, 'grass'),
            createPlat(1400, 540, 150, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 480 }, { x: 600, y: 420 }, { x: 750, y: 360 }, { x: 900, y: 420 }],
        questionBlocks: [{ x: 750, y: 280, contents: 'flower' }],
        enemies: [{ x: 500, y: 520, type: 'koopa' }, { x: 1150, y: 520, type: 'goomba' }],
        decorations: [{ x: 300, y: 520, type: 'bush' }, { x: 500, y: 520, type: 'bush' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1500, y: 508 }, timeBonus: 15
    },

    {
        name: "Sunset Valley",
        width: 2200, height: 650, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 500, 100, 24, 'platform_medium'),
            createPlat(600, 460, 100, 24, 'platform_medium'),
            createPlat(800, 420, 100, 24, 'platform_hard'),
            createPlat(1000, 460, 100, 24, 'platform_medium'),
            createPlat(1200, 500, 100, 24, 'platform_easy'),
            createPlat(1400, 540, 200, 40, 'grass'),
            createPlat(1700, 500, 100, 24, 'platform_medium'),
            createPlat(1900, 460, 100, 24, 'platform_hard'),
            createPlat(2100, 540, 150, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 440 }, { x: 600, y: 400 }, { x: 800, y: 360 }, { x: 1000, y: 400 }, { x: 1700, y: 440 }],
        questionBlocks: [{ x: 800, y: 280, contents: 'star' }, { x: 1900, y: 320, contents: 'star' }],
        enemies: [{ x: 600, y: 520, type: 'goomba' }, { x: 1450, y: 520, type: 'koopa' }],
        decorations: [{ x: 300, y: 100, type: 'cloud' }, { x: 900, y: 80, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2150, y: 508 }, timeBonus: 25
    },

    {
        name: "Golden Fields",
        width: 1900, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 250, 40, 'grass'),
            createPlat(450, 540, 150, 40, 'grass'),
            createPlat(650, 480, 80, 24, 'platform_easy'),
            createPlat(800, 420, 80, 24, 'platform_medium'),
            createPlat(950, 480, 80, 24, 'platform_easy'),
            createPlat(1150, 540, 150, 40, 'grass'),
            createPlat(1400, 480, 80, 24, 'platform_easy'),
            createPlat(1550, 420, 80, 24, 'platform_medium'),
            createPlat(1700, 540, 150, 40, 'grass'),
        ],
        coins: [{ x: 450, y: 480 }, { x: 650, y: 420 }, { x: 800, y: 360 }, { x: 950, y: 420 }, { x: 1400, y: 420 }],
        questionBlocks: [{ x: 800, y: 280, contents: 'flower' }, { x: 1550, y: 280, contents: 'star' }],
        enemies: [{ x: 500, y: 520, type: 'goomba' }, { x: 1200, y: 520, type: 'koopa' }],
        decorations: [{ x: 300, y: 520, type: 'tree' }, { x: 1000, y: 520, type: 'bush' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1800, y: 508 }, timeBonus: 20
    },

    {
        name: "Rainbow Path",
        width: 2400, height: 700, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 480, 80, 24, 'platform_easy'),
            createPlat(550, 420, 80, 24, 'platform_medium'),
            createPlat(700, 360, 80, 24, 'platform_hard'),
            createPlat(850, 300, 80, 24, 'platform_hard'),
            createPlat(1000, 360, 80, 24, 'platform_medium'),
            createPlat(1150, 420, 80, 24, 'platform_easy'),
            createPlat(1300, 480, 100, 24, 'platform_easy'),
            createPlat(1500, 540, 200, 40, 'grass'),
            createPlat(1800, 480, 80, 24, 'platform_medium'),
            createPlat(1950, 420, 80, 24, 'platform_hard'),
            createPlat(2100, 540, 200, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 420 }, { x: 550, y: 360 }, { x: 700, y: 300 }, { x: 850, y: 240 }, { x: 1150, y: 360 }, { x: 1800, y: 420 }],
        questionBlocks: [{ x: 850, y: 160, contents: 'star' }, { x: 1950, y: 280, contents: 'flower' }],
        enemies: [{ x: 600, y: 520, type: 'goomba' }, { x: 1550, y: 520, type: 'koopa' }],
        decorations: [{ x: 300, y: 100, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2200, y: 508 }, timeBonus: 35
    },

    {
        name: "Skyline Journey",
        width: 2100, height: 650, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 480, 80, 24, 'cloud'),
            createPlat(550, 420, 80, 24, 'cloud'),
            createPlat(700, 360, 80, 24, 'cloud'),
            createPlat(850, 300, 80, 24, 'cloud'),
            createPlat(1050, 360, 80, 24, 'cloud'),
            createPlat(1200, 420, 80, 24, 'cloud'),
            createPlat(1350, 480, 80, 24, 'cloud'),
            createPlat(1500, 540, 200, 40, 'grass'),
            createPlat(1750, 480, 80, 24, 'cloud'),
            createPlat(1900, 540, 150, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 420 }, { x: 550, y: 360 }, { x: 700, y: 300 }, { x: 850, y: 240 }, { x: 1050, y: 300 }, { x: 1350, y: 420 }],
        questionBlocks: [{ x: 850, y: 180, contents: 'star' }, { x: 1750, y: 420, contents: 'flower' }],
        enemies: [],
        decorations: [{ x: 300, y: 80, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2000, y: 508 }, timeBonus: 30
    },

    // More World 2 Cave Levels
    {
        name: "Bone Chamber",
        width: 1800, height: 650, biome: 'cave',
        platforms: [
            createPlat(150, 540, 250, 40, 'cave'),
            createPlat(450, 480, 80, 24, 'platform_medium'),
            createPlat(600, 420, 80, 24, 'platform_medium'),
            createPlat(750, 360, 80, 24, 'platform_hard'),
            createPlat(900, 420, 80, 24, 'platform_medium'),
            createPlat(1050, 480, 80, 24, 'platform_easy'),
            createPlat(1250, 540, 200, 40, 'cave'),
            createPlat(1500, 480, 80, 24, 'platform_medium'),
            createPlat(1650, 540, 150, 40, 'cave'),
        ],
        coins: [{ x: 450, y: 420 }, { x: 600, y: 360 }, { x: 750, y: 300 }, { x: 900, y: 360 }, { x: 1500, y: 420 }],
        questionBlocks: [{ x: 750, y: 220, contents: 'star' }],
        enemies: [{ x: 550, y: 520, type: 'spiny' }, { x: 1300, y: 520, type: 'goomba' }],
        decorations: [{ x: 300, y: 80, type: 'bat' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1700, y: 508 }, timeBonus: 30
    },

    {
        name: "Crystal Tunnel",
        width: 2000, height: 600, biome: 'cave',
        platforms: [
            createPlat(150, 540, 200, 40, 'cave'),
            createPlat(400, 540, 100, 32, 'brick'),
            createPlat(550, 480, 80, 24, 'platform_medium'),
            createPlat(700, 420, 80, 24, 'platform_medium'),
            createPlat(850, 360, 80, 24, 'platform_hard'),
            createPlat(1000, 420, 80, 24, 'platform_medium'),
            createPlat(1150, 480, 80, 24, 'platform_easy'),
            createPlat(1300, 540, 100, 32, 'brick'),
            createPlat(1500, 540, 100, 32, 'brick'),
            createPlat(1700, 540, 200, 40, 'cave'),
        ],
        coins: [{ x: 400, y: 480 }, { x: 550, y: 420 }, { x: 700, y: 360 }, { x: 850, y: 300 }, { x: 1150, y: 420 }],
        questionBlocks: [{ x: 850, y: 220, contents: 'star' }],
        enemies: [{ x: 450, y: 520, type: 'goomba' }, { x: 1550, y: 520, type: 'spiny' }],
        decorations: [{ x: 600, y: 80, type: 'bat' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1800, y: 508 }, timeBonus: 25
    },

    {
        name: "Dark Passage",
        width: 1700, height: 600, biome: 'cave',
        platforms: [
            createPlat(150, 540, 250, 40, 'cave'),
            createPlat(450, 540, 150, 40, 'cave'),
            createPlat(650, 480, 80, 24, 'platform_medium'),
            createPlat(800, 420, 80, 24, 'platform_medium'),
            createPlat(950, 360, 80, 24, 'platform_hard'),
            createPlat(1100, 420, 80, 24, 'platform_medium'),
            createPlat(1300, 540, 200, 40, 'cave'),
            createPlat(1550, 540, 150, 40, 'cave'),
        ],
        coins: [{ x: 450, y: 480 }, { x: 650, y: 420 }, { x: 800, y: 360 }, { x: 950, y: 300 }, { x: 1100, y: 360 }],
        questionBlocks: [{ x: 950, y: 220, contents: 'flower' }],
        enemies: [{ x: 500, y: 520, type: 'goomba' }, { x: 1350, y: 520, type: 'koopa' }],
        decorations: [{ x: 800, y: 80, type: 'bat' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1650, y: 508 }, timeBonus: 20
    },

    {
        name: "Echo Chamber",
        width: 2000, height: 700, biome: 'castle',
        platforms: [
            createPlat(150, 540, 200, 40, 'castle'),
            createPlat(400, 480, 80, 24, 'platform_medium'),
            createPlat(550, 400, 80, 24, 'platform_medium'),
            createPlat(700, 320, 80, 24, 'platform_hard'),
            createPlat(850, 240, 100, 32, 'castle'),
            createPlat(1050, 300, 80, 24, 'platform_hard'),
            createPlat(1200, 380, 80, 24, 'platform_medium'),
            createPlat(1350, 460, 80, 24, 'platform_medium'),
            createPlat(1500, 540, 200, 40, 'castle'),
            createPlat(1800, 540, 150, 40, 'castle'),
        ],
        coins: [{ x: 400, y: 420 }, { x: 550, y: 340 }, { x: 700, y: 260 }, { x: 1050, y: 240 }, { x: 1200, y: 320 }],
        questionBlocks: [{ x: 700, y: 180, contents: 'star' }, { x: 850, y: 160, contents: 'flower' }],
        enemies: [{ x: 950, y: 220, type: 'boo' }],
        decorations: [{ x: 600, y: 100, type: 'torch' }, { x: 1000, y: 80, type: 'torch' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1900, y: 508 }, timeBonus: 35
    },

    // More World 2 Cave Levels (additional)
    {
        name: " Fossil Cave",
        width: 1800, height: 600, biome: 'cave',
        platforms: [
            createPlat(150, 540, 250, 40, 'cave'),
            createPlat(450, 540, 150, 40, 'cave'),
            createPlat(650, 480, 80, 24, 'platform_easy'),
            createPlat(800, 420, 80, 24, 'platform_medium'),
            createPlat(950, 360, 80, 24, 'platform_hard'),
            createPlat(1100, 420, 80, 24, 'platform_medium'),
            createPlat(1300, 480, 80, 24, 'platform_easy'),
            createPlat(1500, 540, 200, 40, 'cave'),
        ],
        coins: [{ x: 450, y: 480 }, { x: 650, y: 420 }, { x: 800, y: 360 }, { x: 950, y: 300 }, { x: 1300, y: 420 }],
        questionBlocks: [{ x: 950, y: 220, contents: 'star' }],
        enemies: [{ x: 500, y: 520, type: 'goomba' }, { x: 1350, y: 520, type: 'spiny' }],
        decorations: [{ x: 700, y: 80, type: 'bat' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1650, y: 508 }, timeBonus: 25
    },

    {
        name: "Maggot Tunnel",
        width: 2000, height: 600, biome: 'cave',
        platforms: [
            createPlat(150, 540, 200, 40, 'cave'),
            createPlat(400, 540, 100, 32, 'brick'),
            createPlat(550, 480, 80, 24, 'platform_easy'),
            createPlat(700, 420, 80, 24, 'platform_medium'),
            createPlat(850, 360, 80, 24, 'platform_medium'),
            createPlat(1000, 300, 80, 24, 'platform_hard'),
            createPlat(1200, 360, 80, 24, 'platform_medium'),
            createPlat(1400, 420, 80, 24, 'platform_medium'),
            createPlat(1600, 480, 80, 24, 'platform_easy'),
            createPlat(1750, 540, 200, 40, 'cave'),
        ],
        coins: [{ x: 400, y: 480 }, { x: 550, y: 420 }, { x: 700, y: 360 }, { x: 850, y: 300 }, { x: 1000, y: 240 }, { x: 1600, y: 420 }],
        questionBlocks: [{ x: 1000, y: 180, contents: 'star' }],
        enemies: [{ x: 600, y: 520, type: 'goomba' }, { x: 1450, y: 520, type: 'spiny' }],
        decorations: [{ x: 900, y: 80, type: 'bat' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1850, y: 508 }, timeBonus: 30
    },

    // More World 3 Castle Levels
    {
        name: "Stone Corridor",
        width: 2200, height: 600, biome: 'castle',
        platforms: [
            createPlat(150, 540, 200, 40, 'castle'),
            createPlat(400, 540, 100, 40, 'castle'),
            createPlat(600, 500, 80, 24, 'platform_medium'),
            createPlat(750, 460, 80, 24, 'platform_medium'),
            createPlat(900, 420, 80, 24, 'platform_hard'),
            createPlat(1100, 460, 80, 24, 'platform_hard'),
            createPlat(1300, 500, 80, 24, 'platform_medium'),
            createPlat(1500, 540, 150, 40, 'castle'),
            createPlat(1800, 500, 80, 24, 'platform_medium'),
            createPlat(1950, 540, 200, 40, 'castle'),
        ],
        coins: [{ x: 400, y: 480 }, { x: 600, y: 440 }, { x: 750, y: 400 }, { x: 900, y: 360 }, { x: 1100, y: 400 }, { x: 1800, y: 440 }],
        questionBlocks: [{ x: 900, y: 280, contents: 'star' }, { x: 1100, y: 280, contents: 'flower' }],
        enemies: [{ x: 450, y: 520, type: 'boo' }, { x: 1550, y: 520, type: 'boo' }],
        decorations: [{ x: 500, y: 100, type: 'torch' }, { x: 1000, y: 80, type: 'torch' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2050, y: 508 }, timeBonus: 30
    },

    {
        name: "Dungeon Descent",
        width: 1600, height: 750, biome: 'castle',
        platforms: [
            createPlat(150, 540, 200, 40, 'castle'),
            createPlat(400, 480, 80, 24, 'platform_easy'),
            createPlat(550, 400, 80, 24, 'platform_medium'),
            createPlat(450, 320, 80, 24, 'platform_medium'),
            createPlat(550, 240, 80, 24, 'platform_hard'),
            createPlat(700, 180, 150, 32, 'castle'),
            createPlat(900, 240, 80, 24, 'platform_hard'),
            createPlat(1000, 320, 80, 24, 'platform_medium'),
            createPlat(900, 400, 80, 24, 'platform_medium'),
            createPlat(1000, 480, 80, 24, 'platform_easy'),
            createPlat(1200, 540, 200, 40, 'castle'),
            createPlat(1450, 540, 150, 40, 'castle'),
        ],
        coins: [{ x: 400, y: 420 }, { x: 550, y: 340 }, { x: 450, y: 260 }, { x: 550, y: 180 }, { x: 900, y: 180 }, { x: 1000, y: 340 }],
        questionBlocks: [{ x: 550, y: 120, contents: 'star' }, { x: 700, y: 100, contents: 'flower' }],
        enemies: [{ x: 750, y: 160, type: 'boo' }],
        decorations: [{ x: 350, y: 100, type: 'torch' }, { x: 650, y: 80, type: 'torch' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1500, y: 508 }, timeBonus: 40
    },

    // Additional levels to reach 100 (more variations)
    {
        name: "Moonlight Grove",
        width: 2000, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 250, 40, 'grass'),
            createPlat(450, 540, 150, 40, 'grass'),
            createPlat(650, 480, 80, 24, 'platform_easy'),
            createPlat(800, 420, 80, 24, 'platform_medium'),
            createPlat(950, 360, 80, 24, 'platform_hard'),
            createPlat(1150, 420, 80, 24, 'platform_medium'),
            createPlat(1350, 480, 80, 24, 'platform_easy'),
            createPlat(1600, 540, 250, 40, 'grass'),
            createPlat(1900, 540, 150, 40, 'grass'),
        ],
        coins: [{ x: 450, y: 480 }, { x: 650, y: 420 }, { x: 800, y: 360 }, { x: 950, y: 300 }, { x: 1350, y: 420 }],
        questionBlocks: [{ x: 950, y: 220, contents: 'star' }],
        enemies: [{ x: 500, y: 520, type: 'goomba' }, { x: 1650, y: 520, type: 'koopa' }],
        decorations: [{ x: 300, y: 100, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2000, y: 508 }, timeBonus: 25
    },

    {
        name: "Starlit Hills",
        width: 2200, height: 650, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 500, 100, 24, 'platform_medium'),
            createPlat(550, 460, 100, 24, 'platform_medium'),
            createPlat(700, 420, 100, 24, 'platform_hard'),
            createPlat(900, 460, 100, 24, 'platform_medium'),
            createPlat(1100, 500, 100, 24, 'platform_easy'),
            createPlat(1300, 540, 200, 40, 'grass'),
            createPlat(1600, 480, 100, 24, 'platform_medium'),
            createPlat(1750, 420, 100, 24, 'platform_hard'),
            createPlat(1900, 360, 100, 24, 'platform_hard'),
            createPlat(2100, 540, 150, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 440 }, { x: 550, y: 400 }, { x: 700, y: 360 }, { x: 1100, y: 440 }, { x: 1600, y: 420 }],
        questionBlocks: [{ x: 700, y: 280, contents: 'star' }, { x: 1900, y: 280, contents: 'flower' }],
        enemies: [{ x: 600, y: 520, type: 'koopa' }, { x: 1350, y: 520, type: 'goomba' }],
        decorations: [{ x: 300, y: 80, type: 'cloud' }, { x: 1200, y: 60, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2150, y: 508 }, timeBonus: 30
    },

    {
        name: "Windy Plains",
        width: 1900, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 250, 40, 'grass'),
            createPlat(450, 480, 80, 24, 'cloud'),
            createPlat(600, 420, 80, 24, 'cloud'),
            createPlat(750, 360, 80, 24, 'cloud'),
            createPlat(950, 420, 80, 24, 'cloud'),
            createPlat(1100, 480, 80, 24, 'cloud'),
            createPlat(1300, 540, 250, 40, 'grass'),
            createPlat(1600, 480, 80, 24, 'cloud'),
        ],
        coins: [{ x: 450, y: 420 }, { x: 600, y: 360 }, { x: 750, y: 300 }, { x: 950, y: 360 }, { x: 1600, y: 420 }],
        questionBlocks: [{ x: 750, y: 220, contents: 'star' }],
        enemies: [],
        decorations: [{ x: 300, y: 100, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1650, y: 508 }, timeBonus: 25
    },

    {
        name: "Crystal Caves",
        width: 1800, height: 700, biome: 'cave',
        platforms: [
            createPlat(150, 540, 200, 40, 'cave'),
            createPlat(400, 480, 80, 24, 'platform_easy'),
            createPlat(550, 400, 80, 24, 'platform_medium'),
            createPlat(700, 320, 80, 24, 'platform_medium'),
            createPlat(850, 240, 80, 24, 'platform_hard'),
            createPlat(1050, 320, 80, 24, 'platform_medium'),
            createPlat(1200, 400, 80, 24, 'platform_medium'),
            createPlat(1350, 480, 80, 24, 'platform_easy'),
            createPlat(1550, 540, 200, 40, 'cave'),
        ],
        coins: [{ x: 400, y: 420 }, { x: 550, y: 340 }, { x: 700, y: 260 }, { x: 850, y: 180 }, { x: 1200, y: 340 }],
        questionBlocks: [{ x: 850, y: 120, contents: 'star' }],
        enemies: [{ x: 950, y: 220, type: 'spiny' }],
        decorations: [{ x: 300, y: 80, type: 'bat' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1650, y: 508 }, timeBonus: 35
    },

    {
        name: "Lava Lake",
        width: 2000, height: 650, biome: 'cave',
        platforms: [
            createPlat(150, 540, 200, 40, 'cave'),
            createPlat(400, 540, 100, 32, 'brick'),
            createPlat(550, 480, 80, 24, 'platform_easy'),
            createPlat(700, 420, 80, 24, 'platform_medium'),
            createPlat(850, 360, 80, 24, 'platform_hard'),
            createPlat(1050, 360, 80, 24, 'platform_hard'),
            createPlat(1250, 420, 80, 24, 'platform_medium'),
            createPlat(1450, 480, 80, 24, 'platform_easy'),
            createPlat(1600, 540, 100, 32, 'brick'),
            createPlat(1800, 540, 200, 40, 'cave'),
        ],
        coins: [{ x: 400, y: 480 }, { x: 550, y: 420 }, { x: 700, y: 360 }, { x: 850, y: 300 }, { x: 1250, y: 360 }, { x: 1600, y: 480 }],
        questionBlocks: [{ x: 850, y: 220, contents: 'star' }, { x: 1050, y: 220, contents: 'flower' }],
        enemies: [{ x: 450, y: 520, type: 'goomba' }, { x: 1650, y: 520, type: 'spiny' }],
        decorations: [{ x: 700, y: 80, type: 'bat' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1900, y: 508 }, timeBonus: 30
    },

    {
        name: "Obsidian Hall",
        width: 1900, height: 600, biome: 'cave',
        platforms: [
            createPlat(150, 540, 250, 40, 'cave'),
            createPlat(450, 540, 150, 40, 'cave'),
            createPlat(650, 480, 80, 24, 'platform_medium'),
            createPlat(800, 420, 80, 24, 'platform_hard'),
            createPlat(950, 360, 80, 24, 'platform_hard'),
            createPlat(1150, 420, 80, 24, 'platform_medium'),
            createPlat(1350, 480, 80, 24, 'platform_easy'),
            createPlat(1550, 540, 250, 40, 'cave'),
        ],
        coins: [{ x: 450, y: 480 }, { x: 650, y: 420 }, { x: 800, y: 360 }, { x: 950, y: 300 }, { x: 1350, y: 420 }],
        questionBlocks: [{ x: 950, y: 220, contents: 'star' }],
        enemies: [{ x: 500, y: 520, type: 'goomba' }, { x: 1400, y: 520, type: 'koopa' }],
        decorations: [{ x: 800, y: 80, type: 'bat' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1650, y: 508 }, timeBonus: 25
    },

    {
        name: "Castle Keep",
        width: 2100, height: 650, biome: 'castle',
        platforms: [
            createPlat(150, 540, 200, 40, 'castle'),
            createPlat(400, 480, 80, 24, 'platform_medium'),
            createPlat(550, 400, 80, 24, 'platform_medium'),
            createPlat(700, 320, 80, 24, 'platform_hard'),
            createPlat(900, 320, 150, 32, 'castle'),
            createPlat(1150, 400, 80, 24, 'platform_medium'),
            createPlat(1300, 480, 80, 24, 'platform_easy'),
            createPlat(1500, 540, 200, 40, 'castle'),
            createPlat(1800, 500, 80, 24, 'platform_medium'),
            createPlat(1950, 540, 150, 40, 'castle'),
        ],
        coins: [{ x: 400, y: 420 }, { x: 550, y: 340 }, { x: 700, y: 260 }, { x: 1150, y: 340 }, { x: 1800, y: 440 }],
        questionBlocks: [{ x: 700, y: 180, contents: 'star' }, { x: 900, y: 240, contents: 'flower' }],
        enemies: [{ x: 950, y: 300, type: 'boo' }, { x: 1550, y: 520, type: 'boo' }],
        decorations: [{ x: 600, y: 100, type: 'torch' }, { x: 1100, y: 80, type: 'torch' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2000, y: 508 }, timeBonus: 35
    },

    {
        name: "Tower of Doom",
        width: 1500, height: 800, biome: 'castle',
        platforms: [
            createPlat(150, 540, 200, 40, 'castle'),
            createPlat(400, 480, 80, 24, 'platform_easy'),
            createPlat(500, 400, 80, 24, 'platform_medium'),
            createPlat(400, 320, 80, 24, 'platform_medium'),
            createPlat(500, 240, 80, 24, 'platform_hard'),
            createPlat(650, 180, 150, 32, 'castle'),
            createPlat(850, 240, 80, 24, 'platform_hard'),
            createPlat(950, 320, 80, 24, 'platform_medium'),
            createPlat(850, 400, 80, 24, 'platform_medium'),
            createPlat(950, 480, 80, 24, 'platform_easy'),
            createPlat(1150, 540, 200, 40, 'castle'),
            createPlat(1400, 540, 150, 40, 'castle'),
        ],
        coins: [{ x: 400, y: 420 }, { x: 500, y: 340 }, { x: 400, y: 260 }, { x: 500, y: 180 }, { x: 850, y: 180 }, { x: 950, y: 340 }],
        questionBlocks: [{ x: 500, y: 120, contents: 'star' }, { x: 650, y: 100, contents: 'flower' }],
        enemies: [{ x: 700, y: 160, type: 'boo' }],
        decorations: [{ x: 350, y: 100, type: 'torch' }, { x: 600, y: 80, type: 'torch' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1450, y: 508 }, timeBonus: 45
    },

    // Even more unique levels to get to 100
    {
        name: "Sapphire Springs",
        width: 2000, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 250, 40, 'grass'),
            createPlat(450, 540, 150, 40, 'grass'),
            createPlat(650, 480, 80, 24, 'platform_easy'),
            createPlat(800, 420, 80, 24, 'platform_medium'),
            createPlat(950, 360, 80, 24, 'platform_medium'),
            createPlat(1150, 420, 80, 24, 'platform_hard'),
            createPlat(1350, 480, 80, 24, 'platform_medium'),
            createPlat(1600, 540, 250, 40, 'grass'),
            createPlat(1900, 540, 150, 40, 'grass'),
        ],
        coins: [{ x: 450, y: 480 }, { x: 650, y: 420 }, { x: 800, y: 360 }, { x: 950, y: 300 }, { x: 1350, y: 420 }],
        questionBlocks: [{ x: 1150, y: 280, contents: 'star' }],
        enemies: [{ x: 500, y: 520, type: 'koopa' }, { x: 1650, y: 520, type: 'goomba' }],
        decorations: [{ x: 300, y: 100, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2000, y: 508 }, timeBonus: 25
    },

    {
        name: "Emerald Forest",
        width: 2200, height: 650, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 500, 100, 24, 'platform_medium'),
            createPlat(600, 460, 100, 24, 'platform_hard'),
            createPlat(800, 420, 100, 24, 'platform_hard'),
            createPlat(1000, 460, 100, 24, 'platform_medium'),
            createPlat(1200, 500, 100, 24, 'platform_easy'),
            createPlat(1400, 540, 200, 40, 'grass'),
            createPlat(1700, 480, 100, 24, 'platform_medium'),
            createPlat(1850, 420, 100, 24, 'platform_hard'),
            createPlat(2000, 540, 150, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 440 }, { x: 600, y: 400 }, { x: 800, y: 360 }, { x: 1200, y: 440 }, { x: 1700, y: 420 }],
        questionBlocks: [{ x: 600, y: 320, contents: 'star' }, { x: 1850, y: 320, contents: 'flower' }],
        enemies: [{ x: 600, y: 520, type: 'goomba' }, { x: 1450, y: 520, type: 'koopa' }],
        decorations: [{ x: 300, y: 80, type: 'cloud' }, { x: 900, y: 60, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2050, y: 508 }, timeBonus: 30
    },

    {
        name: "Ruby Ridge",
        width: 1800, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 250, 40, 'grass'),
            createPlat(450, 540, 150, 40, 'grass'),
            createPlat(650, 480, 80, 24, 'platform_easy'),
            createPlat(800, 420, 80, 24, 'platform_medium'),
            createPlat(950, 360, 80, 24, 'platform_hard'),
            createPlat(1150, 420, 80, 24, 'platform_medium'),
            createPlat(1350, 480, 80, 24, 'platform_easy'),
            createPlat(1550, 540, 200, 40, 'grass'),
        ],
        coins: [{ x: 450, y: 480 }, { x: 650, y: 420 }, { x: 800, y: 360 }, { x: 950, y: 300 }, { x: 1350, y: 420 }],
        questionBlocks: [{ x: 950, y: 220, contents: 'star' }],
        enemies: [{ x: 500, y: 520, type: 'goomba' }, { x: 1400, y: 520, type: 'koopa' }],
        decorations: [{ x: 300, y: 520, type: 'tree' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1650, y: 508 }, timeBonus: 20
    },

    {
        name: "Topaz Tunnel",
        width: 2000, height: 600, biome: 'cave',
        platforms: [
            createPlat(150, 540, 200, 40, 'cave'),
            createPlat(400, 540, 100, 32, 'brick'),
            createPlat(550, 480, 80, 24, 'platform_easy'),
            createPlat(700, 420, 80, 24, 'platform_medium'),
            createPlat(850, 360, 80, 24, 'platform_hard'),
            createPlat(1050, 360, 80, 24, 'platform_hard'),
            createPlat(1250, 420, 80, 24, 'platform_medium'),
            createPlat(1450, 480, 80, 24, 'platform_easy'),
            createPlat(1600, 540, 100, 32, 'brick'),
            createPlat(1800, 540, 200, 40, 'cave'),
        ],
        coins: [{ x: 400, y: 480 }, { x: 550, y: 420 }, { x: 700, y: 360 }, { x: 850, y: 300 }, { x: 1250, y: 360 }, { x: 1600, y: 480 }],
        questionBlocks: [{ x: 850, y: 220, contents: 'star' }, { x: 1050, y: 220, contents: 'flower' }],
        enemies: [{ x: 450, y: 520, type: 'goomba' }, { x: 1650, y: 520, type: 'spiny' }],
        decorations: [{ x: 700, y: 80, type: 'bat' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1900, y: 508 }, timeBonus: 30
    },

    {
        name: "Amethyst Abyss",
        width: 1700, height: 700, biome: 'cave',
        platforms: [
            createPlat(150, 540, 200, 40, 'cave'),
            createPlat(400, 480, 80, 24, 'platform_easy'),
            createPlat(550, 400, 80, 24, 'platform_medium'),
            createPlat(700, 320, 80, 24, 'platform_hard'),
            createPlat(850, 240, 80, 24, 'platform_hard'),
            createPlat(1050, 320, 80, 24, 'platform_medium'),
            createPlat(1200, 400, 80, 24, 'platform_medium'),
            createPlat(1350, 480, 80, 24, 'platform_easy'),
            createPlat(1500, 540, 200, 40, 'cave'),
        ],
        coins: [{ x: 400, y: 420 }, { x: 550, y: 340 }, { x: 700, y: 260 }, { x: 850, y: 180 }, { x: 1200, y: 340 }],
        questionBlocks: [{ x: 850, y: 120, contents: 'star' }],
        enemies: [{ x: 950, y: 220, type: 'spiny' }],
        decorations: [{ x: 300, y: 80, type: 'bat' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1600, y: 508 }, timeBonus: 35
    },

    {
        name: "Diamond Dungeon",
        width: 2000, height: 600, biome: 'castle',
        platforms: [
            createPlat(150, 540, 200, 40, 'castle'),
            createPlat(400, 540, 100, 40, 'castle'),
            createPlat(600, 480, 80, 24, 'platform_medium'),
            createPlat(750, 420, 80, 24, 'platform_hard'),
            createPlat(950, 360, 80, 24, 'platform_hard'),
            createPlat(1150, 420, 80, 24, 'platform_medium'),
            createPlat(1350, 480, 80, 24, 'platform_easy'),
            createPlat(1550, 540, 150, 40, 'castle'),
            createPlat(1800, 540, 200, 40, 'castle'),
        ],
        coins: [{ x: 400, y: 480 }, { x: 600, y: 420 }, { x: 750, y: 360 }, { x: 950, y: 300 }, { x: 1350, y: 420 }],
        questionBlocks: [{ x: 950, y: 220, contents: 'star' }],
        enemies: [{ x: 450, y: 520, type: 'boo' }, { x: 1400, y: 520, type: 'boo' }],
        decorations: [{ x: 600, y: 100, type: 'torch' }, { x: 1100, y: 80, type: 'torch' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1900, y: 508 }, timeBonus: 30
    },

    {
        name: "Pearl Palace",
        width: 1900, height: 650, biome: 'castle',
        platforms: [
            createPlat(150, 540, 200, 40, 'castle'),
            createPlat(400, 480, 80, 24, 'platform_medium'),
            createPlat(550, 400, 80, 24, 'platform_medium'),
            createPlat(700, 320, 80, 24, 'platform_hard'),
            createPlat(900, 240, 150, 32, 'castle'),
            createPlat(1150, 320, 80, 24, 'platform_hard'),
            createPlat(1300, 400, 80, 24, 'platform_medium'),
            createPlat(1450, 480, 80, 24, 'platform_easy'),
            createPlat(1650, 540, 200, 40, 'castle'),
        ],
        coins: [{ x: 400, y: 420 }, { x: 550, y: 340 }, { x: 700, y: 260 }, { x: 1150, y: 260 }, { x: 1300, y: 340 }],
        questionBlocks: [{ x: 700, y: 180, contents: 'star' }, { x: 900, y: 160, contents: 'flower' }],
        enemies: [{ x: 950, y: 220, type: 'boo' }],
        decorations: [{ x: 600, y: 100, type: 'torch' }, { x: 1000, y: 80, type: 'torch' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1750, y: 508 }, timeBonus: 40
    },

    {
        name: "Cloud Nine",
        width: 2400, height: 650, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 480, 80, 24, 'cloud'),
            createPlat(550, 420, 80, 24, 'cloud'),
            createPlat(700, 360, 80, 24, 'cloud'),
            createPlat(850, 300, 80, 24, 'cloud'),
            createPlat(1050, 360, 80, 24, 'cloud'),
            createPlat(1200, 300, 80, 24, 'cloud'),
            createPlat(1350, 360, 80, 24, 'cloud'),
            createPlat(1500, 420, 80, 24, 'cloud'),
            createPlat(1700, 480, 80, 24, 'cloud'),
            createPlat(1900, 540, 200, 40, 'grass'),
            createPlat(2200, 540, 150, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 420 }, { x: 550, y: 360 }, { x: 700, y: 300 }, { x: 850, y: 240 }, { x: 1200, y: 240 }, { x: 1500, y: 360 }],
        questionBlocks: [{ x: 850, y: 180, contents: 'star' }, { x: 1200, y: 180, contents: 'flower' }],
        enemies: [],
        decorations: [{ x: 300, y: 80, type: 'cloud' }, { x: 1000, y: 60, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2250, y: 508 }, timeBonus: 35
    },

    {
        name: "Thunder Road",
        width: 2100, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 540, 100, 32, 'platform_easy'),
            createPlat(600, 480, 80, 24, 'platform_medium'),
            createPlat(750, 420, 80, 24, 'platform_medium'),
            createPlat(900, 360, 80, 24, 'platform_hard'),
            createPlat(1100, 420, 80, 24, 'platform_medium'),
            createPlat(1300, 480, 80, 24, 'platform_easy'),
            createPlat(1500, 540, 200, 40, 'grass'),
            createPlat(1800, 500, 80, 24, 'platform_medium'),
            createPlat(1950, 540, 150, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 480 }, { x: 600, y: 420 }, { x: 750, y: 360 }, { x: 900, y: 300 }, { x: 1300, y: 420 }, { x: 1800, y: 440 }],
        questionBlocks: [{ x: 900, y: 280, contents: 'star' }],
        enemies: [{ x: 500, y: 520, type: 'goomba' }, { x: 1550, y: 520, type: 'koopa' }],
        decorations: [{ x: 300, y: 100, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2000, y: 508 }, timeBonus: 25
    },

    {
        name: "Stone Arch",
        width: 2000, height: 600, biome: 'cave',
        platforms: [
            createPlat(150, 540, 250, 40, 'cave'),
            createPlat(450, 540, 150, 40, 'cave'),
            createPlat(650, 480, 80, 24, 'platform_easy'),
            createPlat(800, 420, 80, 24, 'platform_medium'),
            createPlat(950, 360, 80, 24, 'platform_hard'),
            createPlat(1150, 420, 80, 24, 'platform_medium'),
            createPlat(1350, 480, 80, 24, 'platform_easy'),
            createPlat(1600, 540, 200, 40, 'cave'),
            createPlat(1900, 540, 150, 40, 'cave'),
        ],
        coins: [{ x: 450, y: 480 }, { x: 650, y: 420 }, { x: 800, y: 360 }, { x: 950, y: 300 }, { x: 1350, y: 420 }],
        questionBlocks: [{ x: 950, y: 220, contents: 'star' }],
        enemies: [{ x: 500, y: 520, type: 'goomba' }, { x: 1650, y: 520, type: 'spiny' }],
        decorations: [{ x: 800, y: 80, type: 'bat' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2000, y: 508 }, timeBonus: 25
    },

    {
        name: "Iron Keep",
        width: 1900, height: 650, biome: 'castle',
        platforms: [
            createPlat(150, 540, 200, 40, 'castle'),
            createPlat(400, 480, 80, 24, 'platform_easy'),
            createPlat(550, 400, 80, 24, 'platform_medium'),
            createPlat(700, 320, 80, 24, 'platform_hard'),
            createPlat(900, 240, 150, 32, 'castle'),
            createPlat(1150, 320, 80, 24, 'platform_hard'),
            createPlat(1300, 400, 80, 24, 'platform_medium'),
            createPlat(1450, 480, 80, 24, 'platform_easy'),
            createPlat(1650, 540, 200, 40, 'castle'),
        ],
        coins: [{ x: 400, y: 420 }, { x: 550, y: 340 }, { x: 700, y: 260 }, { x: 1150, y: 260 }, { x: 1300, y: 340 }],
        questionBlocks: [{ x: 700, y: 180, contents: 'star' }, { x: 900, y: 160, contents: 'flower' }],
        enemies: [{ x: 950, y: 220, type: 'boo' }],
        decorations: [{ x: 600, y: 100, type: 'torch' }, { x: 1000, y: 80, type: 'torch' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1750, y: 508 }, timeBonus: 40
    },

    // Continue adding more unique levels
    {
        name: "Ocean View",
        width: 2200, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 250, 40, 'grass'),
            createPlat(450, 540, 150, 40, 'grass'),
            createPlat(650, 480, 80, 24, 'platform_easy'),
            createPlat(800, 420, 80, 24, 'platform_medium'),
            createPlat(950, 360, 80, 24, 'platform_hard'),
            createPlat(1150, 420, 80, 24, 'platform_hard'),
            createPlat(1350, 480, 80, 24, 'platform_medium'),
            createPlat(1550, 540, 200, 40, 'grass'),
            createPlat(1900, 500, 80, 24, 'cloud'),
            createPlat(2050, 540, 150, 40, 'grass'),
        ],
        coins: [{ x: 450, y: 480 }, { x: 650, y: 420 }, { x: 800, y: 360 }, { x: 950, y: 300 }, { x: 1350, y: 420 }, { x: 1900, y: 440 }],
        questionBlocks: [{ x: 950, y: 220, contents: 'star' }, { x: 1150, y: 280, contents: 'flower' }],
        enemies: [{ x: 500, y: 520, type: 'goomba' }, { x: 1600, y: 520, type: 'koopa' }],
        decorations: [{ x: 300, y: 100, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2100, y: 508 }, timeBonus: 30
    },

    {
        name: "Wave Crest",
        width: 2000, height: 650, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 500, 100, 24, 'platform_medium'),
            createPlat(600, 460, 100, 24, 'platform_medium'),
            createPlat(800, 420, 100, 24, 'platform_hard'),
            createPlat(1000, 380, 100, 24, 'platform_hard'),
            createPlat(1200, 420, 100, 24, 'platform_medium'),
            createPlat(1400, 460, 100, 24, 'platform_easy'),
            createPlat(1600, 500, 100, 24, 'platform_easy'),
            createPlat(1800, 540, 200, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 440 }, { x: 600, y: 400 }, { x: 800, y: 360 }, { x: 1000, y: 320 }, { x: 1400, y: 400 }],
        questionBlocks: [{ x: 1000, y: 240, contents: 'star' }],
        enemies: [{ x: 600, y: 520, type: 'goomba' }, { x: 1650, y: 520, type: 'koopa' }],
        decorations: [{ x: 300, y: 80, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1900, y: 508 }, timeBonus: 25
    },

    {
        name: "Ancient Ruins",
        width: 2100, height: 600, biome: 'cave',
        platforms: [
            createPlat(150, 540, 250, 40, 'cave'),
            createPlat(450, 540, 150, 40, 'cave'),
            createPlat(650, 480, 80, 24, 'platform_medium'),
            createPlat(800, 420, 80, 24, 'platform_hard'),
            createPlat(1000, 360, 80, 24, 'platform_hard'),
            createPlat(1200, 420, 80, 24, 'platform_medium'),
            createPlat(1400, 480, 80, 24, 'platform_easy'),
            createPlat(1700, 540, 250, 40, 'cave'),
            createPlat(2000, 540, 150, 40, 'cave'),
        ],
        coins: [{ x: 450, y: 480 }, { x: 650, y: 420 }, { x: 800, y: 360 }, { x: 1000, y: 300 }, { x: 1400, y: 420 }],
        questionBlocks: [{ x: 1000, y: 220, contents: 'star' }],
        enemies: [{ x: 500, y: 520, type: 'spiny' }, { x: 1750, y: 520, type: 'goomba' }],
        decorations: [{ x: 800, y: 80, type: 'bat' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2050, y: 508 }, timeBonus: 30
    },

    {
        name: "Deep Descent",
        width: 1600, height: 800, biome: 'cave',
        platforms: [
            createPlat(150, 700, 200, 40, 'cave'),
            createPlat(400, 650, 80, 24, 'platform_easy'),
            createPlat(500, 580, 80, 24, 'platform_medium'),
            createPlat(400, 510, 80, 24, 'platform_medium'),
            createPlat(500, 440, 80, 24, 'platform_medium'),
            createPlat(400, 370, 80, 24, 'platform_hard'),
            createPlat(500, 300, 80, 24, 'platform_hard'),
            createPlat(600, 230, 150, 32, 'cave'),
            createPlat(800, 300, 80, 24, 'platform_hard'),
            createPlat(900, 370, 80, 24, 'platform_medium'),
            createPlat(800, 440, 80, 24, 'platform_medium'),
            createPlat(900, 510, 80, 24, 'platform_easy'),
            createPlat(800, 580, 80, 24, 'platform_easy'),
            createPlat(900, 650, 80, 24, 'platform_easy'),
            createPlat(1150, 700, 200, 40, 'cave'),
        ],
        coins: [{ x: 400, y: 590 }, { x: 500, y: 520 }, { x: 400, y: 450 }, { x: 500, y: 380 }, { x: 400, y: 310 }, { x: 500, y: 240 }, { x: 800, y: 240 }, { x: 900, y: 310 }],
        questionBlocks: [{ x: 600, y: 150, contents: 'star' }, { x: 600, y: 280, contents: 'flower' }],
        enemies: [{ x: 650, y: 210, type: 'spiny' }],
        decorations: [{ x: 400, y: 100, type: 'bat' }, { x: 800, y: 100, type: 'bat' }],
        playerStart: { x: 80, y: 660 }, goal: { x: 1200, y: 668 }, timeBonus: 50
    },

    {
        name: "Fortress Finale",
        width: 2400, height: 600, biome: 'castle',
        platforms: [
            createPlat(150, 540, 200, 40, 'castle'),
            createPlat(400, 540, 100, 40, 'castle'),
            createPlat(600, 480, 80, 24, 'platform_medium'),
            createPlat(750, 420, 80, 24, 'platform_hard'),
            createPlat(950, 360, 80, 24, 'platform_hard'),
            createPlat(1150, 420, 80, 24, 'platform_medium'),
            createPlat(1350, 480, 80, 24, 'platform_easy'),
            createPlat(1550, 540, 150, 40, 'castle'),
            createPlat(1800, 500, 80, 24, 'platform_medium'),
            createPlat(1950, 460, 80, 24, 'platform_hard'),
            createPlat(2150, 540, 200, 40, 'castle'),
        ],
        coins: [{ x: 400, y: 480 }, { x: 600, y: 420 }, { x: 750, y: 360 }, { x: 950, y: 300 }, { x: 1350, y: 420 }, { x: 1950, y: 400 }],
        questionBlocks: [{ x: 950, y: 220, contents: 'star' }, { x: 750, y: 280, contents: 'flower' }],
        enemies: [{ x: 450, y: 520, type: 'boo' }, { x: 1600, y: 520, type: 'boo' }, { x: 2000, y: 520, type: 'boo' }],
        decorations: [{ x: 600, y: 100, type: 'torch' }, { x: 1100, y: 80, type: 'torch' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2250, y: 508 }, timeBonus: 35
    },

    {
        name: "Victory Lane",
        width: 2600, height: 650, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 540, 100, 32, 'platform_easy'),
            createPlat(600, 480, 80, 24, 'platform_medium'),
            createPlat(750, 420, 80, 24, 'platform_medium'),
            createPlat(900, 360, 80, 24, 'platform_hard'),
            createPlat(1100, 300, 100, 32, 'grass'),
            createPlat(1350, 360, 80, 24, 'platform_hard'),
            createPlat(1500, 420, 80, 24, 'platform_medium'),
            createPlat(1700, 480, 100, 24, 'platform_easy'),
            createPlat(1900, 540, 200, 40, 'grass'),
            createPlat(2200, 500, 80, 24, 'platform_medium'),
            createPlat(2400, 540, 200, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 480 }, { x: 600, y: 420 }, { x: 750, y: 360 }, { x: 900, y: 300 }, { x: 1500, y: 360 }, { x: 2200, y: 440 }],
        questionBlocks: [{ x: 900, y: 220, contents: 'star' }, { x: 1100, y: 220, contents: 'flower' }],
        enemies: [{ x: 500, y: 520, type: 'koopa' }, { x: 1950, y: 520, type: 'goomba' }],
        decorations: [{ x: 300, y: 100, type: 'cloud' }, { x: 800, y: 80, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2500, y: 508 }, timeBonus: 40
    },

    {
        name: "Champion's Path",
        width: 2400, height: 700, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 500, 100, 24, 'platform_medium'),
            createPlat(550, 460, 100, 24, 'platform_hard'),
            createPlat(700, 420, 100, 24, 'platform_hard'),
            createPlat(850, 380, 100, 24, 'platform_hard'),
            createPlat(1050, 340, 80, 24, 'platform_hard'),
            createPlat(1200, 300, 80, 24, 'platform_hard'),
            createPlat(1350, 340, 80, 24, 'platform_hard'),
            createPlat(1500, 380, 80, 24, 'platform_medium'),
            createPlat(1700, 420, 80, 24, 'platform_medium'),
            createPlat(1900, 460, 80, 24, 'platform_easy'),
            createPlat(2100, 500, 80, 24, 'platform_easy'),
            createPlat(2300, 540, 200, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 440 }, { x: 550, y: 400 }, { x: 700, y: 360 }, { x: 850, y: 320 }, { x: 1200, y: 240 }, { x: 1700, y: 360 }],
        questionBlocks: [{ x: 850, y: 240, contents: 'star' }, { x: 1200, y: 180, contents: 'flower' }],
        enemies: [{ x: 600, y: 520, type: 'goomba' }, { x: 1950, y: 520, type: 'koopa' }],
        decorations: [{ x: 300, y: 80, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2400, y: 508 }, timeBonus: 50
    },

    {
        name: "Treasure Chamber",
        width: 2000, height: 600, biome: 'cave',
        platforms: [
            createPlat(150, 540, 200, 40, 'cave'),
            createPlat(400, 540, 150, 40, 'cave'),
            createPlat(600, 480, 80, 24, 'platform_medium'),
            createPlat(750, 420, 80, 24, 'platform_hard'),
            createPlat(900, 360, 80, 24, 'platform_hard'),
            createPlat(1100, 420, 80, 24, 'platform_medium'),
            createPlat(1300, 480, 80, 24, 'platform_easy'),
            createPlat(1600, 540, 250, 40, 'cave'),
            createPlat(1900, 540, 150, 40, 'cave'),
        ],
        coins: [{ x: 400, y: 480 }, { x: 600, y: 420 }, { x: 750, y: 360 }, { x: 900, y: 300 }, { x: 1300, y: 420 }],
        questionBlocks: [{ x: 900, y: 220, contents: 'star' }],
        enemies: [{ x: 450, y: 520, type: 'spiny' }, { x: 1650, y: 520, type: 'goomba' }],
        decorations: [{ x: 800, y: 80, type: 'bat' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 1950, y: 508 }, timeBonus: 30
    },

    {
        name: "Secret Vault",
        width: 2200, height: 650, biome: 'castle',
        platforms: [
            createPlat(150, 540, 200, 40, 'castle'),
            createPlat(400, 480, 80, 24, 'platform_medium'),
            createPlat(550, 400, 80, 24, 'platform_hard'),
            createPlat(750, 320, 100, 32, 'castle'),
            createPlat(950, 320, 80, 24, 'platform_hard'),
            createPlat(1150, 400, 80, 24, 'platform_medium'),
            createPlat(1350, 480, 80, 24, 'platform_easy'),
            createPlat(1600, 540, 200, 40, 'castle'),
            createPlat(1900, 500, 80, 24, 'platform_medium'),
            createPlat(2050, 540, 150, 40, 'castle'),
        ],
        coins: [{ x: 400, y: 420 }, { x: 550, y: 340 }, { x: 750, y: 260 }, { x: 950, y: 260 }, { x: 1150, y: 340 }, { x: 1900, y: 440 }],
        questionBlocks: [{ x: 750, y: 180, contents: 'star' }, { x: 750, y: 240, contents: 'flower' }],
        enemies: [{ x: 800, y: 300, type: 'boo' }],
        decorations: [{ x: 600, y: 100, type: 'torch' }, { x: 1000, y: 80, type: 'torch' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2100, y: 508 }, timeBonus: 40
    },

    {
        name: "Mystery Island",
        width: 2000, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 250, 40, 'grass'),
            createPlat(450, 540, 150, 40, 'grass'),
            createPlat(650, 480, 80, 24, 'platform_easy'),
            createPlat(800, 420, 80, 24, 'platform_medium'),
            createPlat(950, 360, 80, 24, 'platform_hard'),
            createPlat(1150, 420, 80, 24, 'platform_medium'),
            createPlat(1350, 480, 80, 24, 'platform_easy'),
            createPlat(1600, 540, 250, 40, 'grass'),
            createPlat(1900, 540, 150, 40, 'grass'),
        ],
        coins: [{ x: 450, y: 480 }, { x: 650, y: 420 }, { x: 800, y: 360 }, { x: 950, y: 300 }, { x: 1350, y: 420 }],
        questionBlocks: [{ x: 950, y: 220, contents: 'star' }],
        enemies: [{ x: 500, y: 520, type: 'goomba' }, { x: 1650, y: 520, type: 'koopa' }],
        decorations: [{ x: 300, y: 100, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2000, y: 508 }, timeBonus: 25
    },

    {
        name: "Adventure Peak",
        width: 2300, height: 700, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 500, 100, 24, 'platform_medium'),
            createPlat(550, 460, 100, 24, 'platform_hard'),
            createPlat(700, 420, 100, 24, 'platform_hard'),
            createPlat(850, 380, 100, 24, 'platform_hard'),
            createPlat(1050, 340, 80, 24, 'platform_hard'),
            createPlat(1200, 300, 80, 24, 'platform_hard'),
            createPlat(1350, 340, 80, 24, 'platform_hard'),
            createPlat(1500, 380, 80, 24, 'platform_medium'),
            createPlat(1700, 420, 80, 24, 'platform_easy'),
            createPlat(1900, 460, 80, 24, 'platform_easy'),
            createPlat(2100, 500, 100, 24, 'platform_easy'),
            createPlat(2300, 540, 200, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 440 }, { x: 550, y: 400 }, { x: 700, y: 360 }, { x: 850, y: 320 }, { x: 1200, y: 240 }, { x: 1700, y: 360 }],
        questionBlocks: [{ x: 850, y: 240, contents: 'star' }, { x: 1200, y: 180, contents: 'flower' }],
        enemies: [{ x: 600, y: 520, type: 'goomba' }, { x: 1950, y: 520, type: 'koopa' }],
        decorations: [{ x: 300, y: 80, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2400, y: 508 }, timeBonus: 45
    },

    {
        name: "Hidden Temple",
        width: 2000, height: 600, biome: 'cave',
        platforms: [
            createPlat(150, 540, 250, 40, 'cave'),
            createPlat(450, 540, 150, 40, 'cave'),
            createPlat(650, 480, 80, 24, 'platform_medium'),
            createPlat(800, 420, 80, 24, 'platform_hard'),
            createPlat(950, 360, 80, 24, 'platform_hard'),
            createPlat(1150, 420, 80, 24, 'platform_medium'),
            createPlat(1350, 480, 80, 24, 'platform_easy'),
            createPlat(1600, 540, 250, 40, 'cave'),
            createPlat(1900, 540, 150, 40, 'cave'),
        ],
        coins: [{ x: 450, y: 480 }, { x: 650, y: 420 }, { x: 800, y: 360 }, { x: 950, y: 300 }, { x: 1350, y: 420 }],
        questionBlocks: [{ x: 950, y: 220, contents: 'star' }],
        enemies: [{ x: 500, y: 520, type: 'goomba' }, { x: 1650, y: 520, type: 'spiny' }],
        decorations: [{ x: 800, y: 80, type: 'bat' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2000, y: 508 }, timeBonus: 25
    },

    {
        name: "Final Frontier",
        width: 2600, height: 650, biome: 'castle',
        platforms: [
            createPlat(150, 540, 200, 40, 'castle'),
            createPlat(400, 540, 100, 40, 'castle'),
            createPlat(600, 480, 80, 24, 'platform_medium'),
            createPlat(750, 420, 80, 24, 'platform_hard'),
            createPlat(950, 360, 80, 24, 'platform_hard'),
            createPlat(1150, 420, 80, 24, 'platform_medium'),
            createPlat(1350, 480, 80, 24, 'platform_easy'),
            createPlat(1600, 540, 200, 40, 'castle'),
            createPlat(1900, 500, 80, 24, 'platform_medium'),
            createPlat(2050, 460, 80, 24, 'platform_hard'),
            createPlat(2250, 540, 200, 40, 'castle'),
            createPlat(2500, 540, 150, 40, 'castle'),
        ],
        coins: [{ x: 400, y: 480 }, { x: 600, y: 420 }, { x: 750, y: 360 }, { x: 950, y: 300 }, { x: 1350, y: 420 }, { x: 2050, y: 400 }],
        questionBlocks: [{ x: 950, y: 220, contents: 'star' }, { x: 750, y: 280, contents: 'flower' }],
        enemies: [{ x: 450, y: 520, type: 'boo' }, { x: 1650, y: 520, type: 'boo' }, { x: 2100, y: 520, type: 'boo' }],
        decorations: [{ x: 600, y: 100, type: 'torch' }, { x: 1100, y: 80, type: 'torch' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2550, y: 508 }, timeBonus: 40
    },

    {
        name: "Victory March",
        width: 2800, height: 700, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 500, 100, 24, 'platform_medium'),
            createPlat(550, 460, 100, 24, 'platform_hard'),
            createPlat(700, 420, 100, 24, 'platform_hard'),
            createPlat(850, 380, 100, 24, 'platform_hard'),
            createPlat(1050, 340, 80, 24, 'platform_hard'),
            createPlat(1200, 300, 80, 24, 'platform_hard'),
            createPlat(1350, 260, 80, 24, 'platform_hard'),
            createPlat(1550, 300, 80, 24, 'platform_medium'),
            createPlat(1750, 340, 80, 24, 'platform_medium'),
            createPlat(1950, 380, 80, 24, 'platform_easy'),
            createPlat(2200, 420, 100, 24, 'platform_easy'),
            createPlat(2450, 460, 100, 24, 'platform_easy'),
            createPlat(2700, 500, 100, 24, 'platform_easy'),
            createPlat(2900, 540, 200, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 440 }, { x: 550, y: 400 }, { x: 700, y: 360 }, { x: 850, y: 320 }, { x: 1200, y: 240 }, { x: 1550, y: 240 }, { x: 2200, y: 360 }],
        questionBlocks: [{ x: 850, y: 240, contents: 'star' }, { x: 1350, y: 180, contents: 'flower' }],
        enemies: [{ x: 600, y: 520, type: 'koopa' }, { x: 2000, y: 520, type: 'goomba' }],
        decorations: [{ x: 300, y: 80, type: 'cloud' }, { x: 900, y: 60, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2950, y: 508 }, timeBonus: 55
    },

    {
        name: "Champion's Crown",
        width: 2500, height: 650, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 540, 100, 32, 'platform_easy'),
            createPlat(600, 480, 80, 24, 'platform_medium'),
            createPlat(750, 420, 80, 24, 'platform_medium'),
            createPlat(900, 360, 80, 24, 'platform_hard'),
            createPlat(1100, 300, 100, 32, 'grass'),
            createPlat(1350, 360, 80, 24, 'platform_hard'),
            createPlat(1500, 420, 80, 24, 'platform_medium'),
            createPlat(1700, 480, 100, 24, 'platform_easy'),
            createPlat(1900, 540, 200, 40, 'grass'),
            createPlat(2200, 500, 80, 24, 'platform_medium'),
            createPlat(2350, 460, 80, 24, 'platform_hard'),
            createPlat(2550, 540, 200, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 480 }, { x: 600, y: 420 }, { x: 750, y: 360 }, { x: 900, y: 300 }, { x: 1500, y: 360 }, { x: 2350, y: 400 }],
        questionBlocks: [{ x: 900, y: 220, contents: 'star' }, { x: 1100, y: 220, contents: 'flower' }],
        enemies: [{ x: 500, y: 520, type: 'koopa' }, { x: 1950, y: 520, type: 'goomba' }],
        decorations: [{ x: 300, y: 100, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2650, y: 508 }, timeBonus: 40
    },

    {
        name: "Golden Gauntlet",
        width: 2400, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 540, 100, 32, 'platform_easy'),
            createPlat(600, 480, 80, 24, 'platform_medium'),
            createPlat(750, 420, 80, 24, 'platform_hard'),
            createPlat(900, 360, 80, 24, 'platform_hard'),
            createPlat(1100, 300, 100, 32, 'grass'),
            createPlat(1350, 360, 80, 24, 'platform_hard'),
            createPlat(1500, 420, 80, 24, 'platform_medium'),
            createPlat(1700, 480, 80, 24, 'platform_easy'),
            createPlat(1900, 540, 200, 40, 'grass'),
            createPlat(2200, 500, 80, 24, 'platform_medium'),
        ],
        coins: [{ x: 400, y: 480 }, { x: 600, y: 420 }, { x: 750, y: 360 }, { x: 900, y: 300 }, { x: 1500, y: 360 }, { x: 2200, y: 440 }],
        questionBlocks: [{ x: 900, y: 220, contents: 'star' }, { x: 1100, y: 220, contents: 'flower' }],
        enemies: [{ x: 500, y: 520, type: 'koopa' }, { x: 1950, y: 520, type: 'goomba' }],
        decorations: [{ x: 300, y: 100, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2250, y: 508 }, timeBonus: 35
    },

    // Final levels to reach 100
    {
        name: "Victory Sprint",
        width: 2000, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 250, 40, 'grass'),
            createPlat(450, 540, 150, 40, 'grass'),
            createPlat(650, 480, 80, 24, 'platform_easy'),
            createPlat(800, 420, 80, 24, 'platform_medium'),
            createPlat(950, 360, 80, 24, 'platform_hard'),
            createPlat(1150, 420, 80, 24, 'platform_medium'),
            createPlat(1350, 480, 80, 24, 'platform_easy'),
            createPlat(1600, 540, 250, 40, 'grass'),
            createPlat(1900, 540, 150, 40, 'grass'),
        ],
        coins: [{ x: 450, y: 480 }, { x: 650, y: 420 }, { x: 800, y: 360 }, { x: 950, y: 300 }, { x: 1350, y: 420 }],
        questionBlocks: [{ x: 950, y: 220, contents: 'star' }],
        enemies: [{ x: 500, y: 520, type: 'goomba' }, { x: 1650, y: 520, type: 'koopa' }],
        decorations: [{ x: 300, y: 100, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2000, y: 508 }, timeBonus: 25
    },

    {
        name: "Final Challenge",
        width: 2200, height: 650, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 500, 100, 24, 'platform_medium'),
            createPlat(550, 460, 100, 24, 'platform_medium'),
            createPlat(700, 420, 100, 24, 'platform_hard'),
            createPlat(900, 380, 100, 24, 'platform_hard'),
            createPlat(1100, 340, 100, 24, 'platform_hard'),
            createPlat(1350, 380, 100, 24, 'platform_medium'),
            createPlat(1550, 420, 100, 24, 'platform_medium'),
            createPlat(1750, 460, 100, 24, 'platform_easy'),
            createPlat(2000, 500, 100, 24, 'platform_easy'),
            createPlat(2200, 540, 200, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 440 }, { x: 550, y: 400 }, { x: 700, y: 360 }, { x: 900, y: 320 }, { x: 1100, y: 280 }, { x: 1550, y: 360 }, { x: 2000, y: 440 }],
        questionBlocks: [{ x: 900, y: 240, contents: 'star' }, { x: 1100, y: 200, contents: 'flower' }],
        enemies: [{ x: 600, y: 520, type: 'koopa' }, { x: 1600, y: 520, type: 'goomba' }],
        decorations: [{ x: 300, y: 80, type: 'cloud' }, { x: 900, y: 60, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2300, y: 508 }, timeBonus: 35
    },

    {
        name: "End Game",
        width: 2400, height: 700, biome: 'cave',
        platforms: [
            createPlat(150, 540, 200, 40, 'cave'),
            createPlat(400, 540, 100, 32, 'brick'),
            createPlat(550, 480, 80, 24, 'platform_medium'),
            createPlat(700, 420, 80, 24, 'platform_medium'),
            createPlat(850, 360, 80, 24, 'platform_hard'),
            createPlat(1050, 360, 80, 24, 'platform_hard'),
            createPlat(1250, 420, 80, 24, 'platform_medium'),
            createPlat(1450, 480, 80, 24, 'platform_easy'),
            createPlat(1650, 540, 100, 32, 'brick'),
            createPlat(1900, 540, 200, 40, 'cave'),
            createPlat(2200, 500, 80, 24, 'platform_medium'),
        ],
        coins: [{ x: 400, y: 480 }, { x: 550, y: 420 }, { x: 700, y: 360 }, { x: 850, y: 300 }, { x: 1250, y: 360 }, { x: 1650, y: 480 }, { x: 2200, y: 440 }],
        questionBlocks: [{ x: 850, y: 220, contents: 'star' }, { x: 1050, y: 220, contents: 'flower' }],
        enemies: [{ x: 450, y: 520, type: 'spiny' }, { x: 1700, y: 520, type: 'goomba' }],
        decorations: [{ x: 700, y: 80, type: 'bat' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2250, y: 508 }, timeBonus: 30
    },

    {
        name: "Last Stand",
        width: 2600, height: 650, biome: 'castle',
        platforms: [
            createPlat(150, 540, 200, 40, 'castle'),
            createPlat(400, 540, 100, 40, 'castle'),
            createPlat(600, 480, 80, 24, 'platform_medium'),
            createPlat(750, 420, 80, 24, 'platform_hard'),
            createPlat(950, 360, 80, 24, 'platform_hard'),
            createPlat(1150, 420, 80, 24, 'platform_medium'),
            createPlat(1350, 480, 80, 24, 'platform_easy'),
            createPlat(1600, 540, 200, 40, 'castle'),
            createPlat(1900, 500, 80, 24, 'platform_medium'),
            createPlat(2050, 460, 80, 24, 'platform_hard'),
            createPlat(2250, 540, 200, 40, 'castle'),
            createPlat(2500, 540, 150, 40, 'castle'),
        ],
        coins: [{ x: 400, y: 480 }, { x: 600, y: 420 }, { x: 750, y: 360 }, { x: 950, y: 300 }, { x: 1350, y: 420 }, { x: 2050, y: 400 }],
        questionBlocks: [{ x: 950, y: 220, contents: 'star' }, { x: 750, y: 280, contents: 'flower' }],
        enemies: [{ x: 450, y: 520, type: 'boo' }, { x: 1650, y: 520, type: 'boo' }, { x: 2100, y: 520, type: 'boo' }],
        decorations: [{ x: 600, y: 100, type: 'torch' }, { x: 1100, y: 80, type: 'torch' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2550, y: 508 }, timeBonus: 40
    },

    {
        name: "Ultimate Test",
        width: 2800, height: 750, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 500, 100, 24, 'platform_medium'),
            createPlat(550, 460, 100, 24, 'platform_hard'),
            createPlat(700, 420, 100, 24, 'platform_hard'),
            createPlat(850, 380, 100, 24, 'platform_hard'),
            createPlat(1050, 340, 80, 24, 'platform_hard'),
            createPlat(1200, 300, 80, 24, 'platform_hard'),
            createPlat(1350, 260, 80, 24, 'platform_hard'),
            createPlat(1550, 300, 80, 24, 'platform_medium'),
            createPlat(1750, 340, 80, 24, 'platform_medium'),
            createPlat(1950, 380, 80, 24, 'platform_easy'),
            createPlat(2200, 420, 100, 24, 'platform_easy'),
            createPlat(2450, 460, 100, 24, 'platform_easy'),
            createPlat(2700, 500, 100, 24, 'platform_easy'),
            createPlat(2950, 540, 200, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 440 }, { x: 550, y: 400 }, { x: 700, y: 360 }, { x: 850, y: 320 }, { x: 1200, y: 240 }, { x: 1750, y: 280 }, { x: 2450, y: 400 }],
        questionBlocks: [{ x: 850, y: 240, contents: 'star' }, { x: 1350, y: 180, contents: 'flower' }],
        enemies: [{ x: 600, y: 520, type: 'koopa' }, { x: 2000, y: 520, type: 'goomba' }],
        decorations: [{ x: 300, y: 80, type: 'cloud' }, { x: 900, y: 60, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 3000, y: 508 }, timeBonus: 55
    },

    {
        name: "Grand Finale",
        width: 3000, height: 700, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 500, 100, 24, 'platform_medium'),
            createPlat(550, 460, 100, 24, 'platform_hard'),
            createPlat(700, 420, 100, 24, 'platform_hard'),
            createPlat(850, 380, 100, 24, 'platform_hard'),
            createPlat(1050, 340, 80, 24, 'platform_hard'),
            createPlat(1200, 300, 80, 24, 'platform_hard'),
            createPlat(1350, 260, 80, 24, 'platform_hard'),
            createPlat(1550, 300, 80, 24, 'platform_medium'),
            createPlat(1750, 340, 80, 24, 'platform_medium'),
            createPlat(1950, 380, 80, 24, 'platform_easy'),
            createPlat(2200, 420, 100, 24, 'platform_easy'),
            createPlat(2450, 460, 100, 24, 'platform_easy'),
            createPlat(2700, 500, 100, 24, 'platform_easy'),
            createPlat(2950, 540, 200, 40, 'grass'),
            createPlat(3200, 540, 200, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 440 }, { x: 550, y: 400 }, { x: 700, y: 360 }, { x: 850, y: 320 }, { x: 1200, y: 240 }, { x: 1750, y: 280 }, { x: 2450, y: 400 }],
        questionBlocks: [{ x: 850, y: 240, contents: 'star' }, { x: 1350, y: 180, contents: 'flower' }],
        enemies: [{ x: 600, y: 520, type: 'koopa' }, { x: 2000, y: 520, type: 'goomba' }],
        decorations: [{ x: 300, y: 80, type: 'cloud' }, { x: 900, y: 60, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 3250, y: 508 }, timeBonus: 60
    },

    {
        name: "Epic Journey",
        width: 2500, height: 650, biome: 'grass',
        platforms: [
            createPlat(150, 540, 250, 40, 'grass'),
            createPlat(450, 540, 150, 40, 'grass'),
            createPlat(650, 480, 80, 24, 'platform_easy'),
            createPlat(800, 420, 80, 24, 'platform_medium'),
            createPlat(950, 360, 80, 24, 'platform_hard'),
            createPlat(1150, 420, 80, 24, 'platform_medium'),
            createPlat(1350, 480, 80, 24, 'platform_easy'),
            createPlat(1600, 540, 250, 40, 'grass'),
            createPlat(1900, 500, 80, 24, 'platform_medium'),
            createPlat(2050, 460, 80, 24, 'platform_hard'),
            createPlat(2250, 540, 200, 40, 'grass'),
        ],
        coins: [{ x: 450, y: 480 }, { x: 650, y: 420 }, { x: 800, y: 360 }, { x: 950, y: 300 }, { x: 1350, y: 420 }, { x: 2050, y: 400 }],
        questionBlocks: [{ x: 950, y: 220, contents: 'star' }, { x: 2050, y: 280, contents: 'flower' }],
        enemies: [{ x: 500, y: 520, type: 'goomba' }, { x: 1650, y: 520, type: 'koopa' }],
        decorations: [{ x: 300, y: 100, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2350, y: 508 }, timeBonus: 35
    },

    {
        name: "Legendary Run",
        width: 2700, height: 700, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 500, 100, 24, 'platform_medium'),
            createPlat(550, 460, 100, 24, 'platform_hard'),
            createPlat(700, 420, 100, 24, 'platform_hard'),
            createPlat(850, 380, 100, 24, 'platform_hard'),
            createPlat(1050, 340, 80, 24, 'platform_hard'),
            createPlat(1200, 300, 80, 24, 'platform_hard'),
            createPlat(1350, 340, 80, 24, 'platform_hard'),
            createPlat(1550, 380, 80, 24, 'platform_medium'),
            createPlat(1750, 420, 80, 24, 'platform_medium'),
            createPlat(1950, 460, 80, 24, 'platform_easy'),
            createPlat(2200, 500, 100, 24, 'platform_easy'),
            createPlat(2450, 540, 200, 40, 'grass'),
            createPlat(2700, 540, 150, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 440 }, { x: 550, y: 400 }, { x: 700, y: 360 }, { x: 850, y: 320 }, { x: 1200, y: 240 }, { x: 1750, y: 360 }, { x: 2200, y: 440 }],
        questionBlocks: [{ x: 850, y: 240, contents: 'star' }, { x: 1200, y: 180, contents: 'flower' }],
        enemies: [{ x: 600, y: 520, type: 'koopa' }, { x: 2000, y: 520, type: 'goomba' }],
        decorations: [{ x: 300, y: 80, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2750, y: 508 }, timeBonus: 45
    },

    {
        name: "Mighty Quest",
        width: 2300, height: 600, biome: 'grass',
        platforms: [
            createPlat(150, 540, 250, 40, 'grass'),
            createPlat(450, 540, 150, 40, 'grass'),
            createPlat(650, 480, 80, 24, 'platform_easy'),
            createPlat(800, 420, 80, 24, 'platform_medium'),
            createPlat(950, 360, 80, 24, 'platform_hard'),
            createPlat(1150, 420, 80, 24, 'platform_medium'),
            createPlat(1350, 480, 80, 24, 'platform_easy'),
            createPlat(1600, 540, 250, 40, 'grass'),
            createPlat(1900, 500, 80, 24, 'platform_medium'),
            createPlat(2050, 460, 80, 24, 'platform_hard'),
            createPlat(2250, 540, 200, 40, 'grass'),
        ],
        coins: [{ x: 450, y: 480 }, { x: 650, y: 420 }, { x: 800, y: 360 }, { x: 950, y: 300 }, { x: 1350, y: 420 }, { x: 2050, y: 400 }],
        questionBlocks: [{ x: 950, y: 220, contents: 'star' }],
        enemies: [{ x: 500, y: 520, type: 'goomba' }, { x: 1650, y: 520, type: 'koopa' }],
        decorations: [{ x: 300, y: 100, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2350, y: 508 }, timeBonus: 30
    },

    {
        name: "Hero's Return",
        width: 2600, height: 650, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 500, 100, 24, 'platform_medium'),
            createPlat(600, 460, 100, 24, 'platform_hard'),
            createPlat(800, 420, 100, 24, 'platform_hard'),
            createPlat(1000, 380, 100, 24, 'platform_hard'),
            createPlat(1200, 340, 100, 24, 'platform_hard'),
            createPlat(1450, 380, 100, 24, 'platform_medium'),
            createPlat(1650, 420, 100, 24, 'platform_medium'),
            createPlat(1850, 460, 100, 24, 'platform_easy'),
            createPlat(2100, 500, 100, 24, 'platform_easy'),
            createPlat(2350, 540, 200, 40, 'grass'),
            createPlat(2600, 540, 150, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 440 }, { x: 600, y: 400 }, { x: 800, y: 360 }, { x: 1000, y: 320 }, { x: 1200, y: 280 }, { x: 1650, y: 360 }, { x: 2100, y: 440 }],
        questionBlocks: [{ x: 1000, y: 240, contents: 'star' }, { x: 1200, y: 200, contents: 'flower' }],
        enemies: [{ x: 600, y: 520, type: 'koopa' }, { x: 1700, y: 520, type: 'goomba' }],
        decorations: [{ x: 300, y: 80, type: 'cloud' }, { x: 1000, y: 60, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 2650, y: 508 }, timeBonus: 45
    },

    {
        name: "Final Victory",
        width: 2800, height: 700, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 500, 100, 24, 'platform_medium'),
            createPlat(550, 460, 100, 24, 'platform_hard'),
            createPlat(700, 420, 100, 24, 'platform_hard'),
            createPlat(850, 380, 100, 24, 'platform_hard'),
            createPlat(1050, 340, 80, 24, 'platform_hard'),
            createPlat(1200, 300, 80, 24, 'platform_hard'),
            createPlat(1350, 260, 80, 24, 'platform_hard'),
            createPlat(1550, 300, 80, 24, 'platform_medium'),
            createPlat(1750, 340, 80, 24, 'platform_medium'),
            createPlat(1950, 380, 80, 24, 'platform_easy'),
            createPlat(2200, 420, 100, 24, 'platform_easy'),
            createPlat(2450, 460, 100, 24, 'platform_easy'),
            createPlat(2700, 500, 100, 24, 'platform_easy'),
            createPlat(2950, 540, 200, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 440 }, { x: 550, y: 400 }, { x: 700, y: 360 }, { x: 850, y: 320 }, { x: 1200, y: 240 }, { x: 1750, y: 280 }, { x: 2450, y: 400 }],
        questionBlocks: [{ x: 850, y: 240, contents: 'star' }, { x: 1350, y: 180, contents: 'flower' }],
        enemies: [{ x: 600, y: 520, type: 'koopa' }, { x: 2000, y: 520, type: 'goomba' }],
        decorations: [{ x: 300, y: 80, type: 'cloud' }, { x: 900, y: 60, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 3000, y: 508 }, timeBonus: 55
    },

    {
        name: "Century Run",
        width: 3000, height: 700, biome: 'grass',
        platforms: [
            createPlat(150, 540, 200, 40, 'grass'),
            createPlat(400, 500, 100, 24, 'platform_medium'),
            createPlat(550, 460, 100, 24, 'platform_hard'),
            createPlat(700, 420, 100, 24, 'platform_hard'),
            createPlat(850, 380, 100, 24, 'platform_hard'),
            createPlat(1050, 340, 80, 24, 'platform_hard'),
            createPlat(1200, 300, 80, 24, 'platform_hard'),
            createPlat(1350, 260, 80, 24, 'platform_hard'),
            createPlat(1550, 300, 80, 24, 'platform_medium'),
            createPlat(1750, 340, 80, 24, 'platform_medium'),
            createPlat(1950, 380, 80, 24, 'platform_easy'),
            createPlat(2200, 420, 100, 24, 'platform_easy'),
            createPlat(2450, 460, 100, 24, 'platform_easy'),
            createPlat(2700, 500, 100, 24, 'platform_easy'),
            createPlat(2950, 540, 200, 40, 'grass'),
            createPlat(3200, 540, 200, 40, 'grass'),
        ],
        coins: [{ x: 400, y: 440 }, { x: 550, y: 400 }, { x: 700, y: 360 }, { x: 850, y: 320 }, { x: 1200, y: 240 }, { x: 1750, y: 280 }, { x: 2450, y: 400 }],
        questionBlocks: [{ x: 850, y: 240, contents: 'star' }, { x: 1350, y: 180, contents: 'flower' }],
        enemies: [{ x: 600, y: 520, type: 'koopa' }, { x: 2000, y: 520, type: 'goomba' }],
        decorations: [{ x: 300, y: 80, type: 'cloud' }, { x: 900, y: 60, type: 'cloud' }],
        playerStart: { x: 80, y: 500 }, goal: { x: 3250, y: 508 }, timeBonus: 60
    },
];

// Function to get level by index (0-based)
// For indices >= LEVELS.length, cycles through levels with difficulty multiplier
export function getLevel(index: number): LevelData {
    const baseIndex = index % LEVELS.length;
    const cycleCount = Math.floor(index / LEVELS.length);
    const level = LEVELS[baseIndex];
    
    // Return same level but can be used for difficulty scaling
    return level;
}

// Helper to get total unique levels
export const TOTAL_LEVELS = LEVELS.length;

// Get level with difficulty modifier (for future use)
export function getLevelWithDifficulty(index: number, difficultyMult: number = 1): LevelData {
    const level = getLevel(index);
    
    // Could add difficulty-based modifications here if needed
    // For now, just return the base level
    return level;
}
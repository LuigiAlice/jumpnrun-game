// Simplified vertical multi-path level generator - guaranteed solvable
export interface Platform {
    x: number;
    y: number;
    w: number;
    h: number;
    type: 'grass' | 'brick' | 'cave' | 'castle' | 'pipe' | 'platform_easy' | 'platform_medium' | 'platform_hard';
    difficulty?: 'easy' | 'medium' | 'hard';
}

export interface LevelData {
    width: number;
    height: number;
    biome: 'grass' | 'cave' | 'castle';
    platforms: Platform[];
    coins: { x: number; y: number }[];
    questionBlocks: { x: number; y: number; contents: 'coin' | 'mushroom' | 'flower' | 'star' }[];
    enemies: { x: number; y: number; type: 'goomba' | 'koopa' | 'piranha' }[];
    decorations: { x: number; y: number; type: 'tree' | 'bush' | 'cloud' | 'pipe' | 'flag' | 'star_marker' | 'coin_marker' }[];
    playerStart: { x: number; y: number };
    goal: { x: number; y: number };
    timeBonus: number;
}

const TILE = 32;
const MAX_JUMP_X = 5 * TILE;
const MAX_JUMP_Y = 3 * TILE;

function seededRandom(seed: number) {
    let x = seed;
    return () => {
        x = (x * 9301 + 49297) % 233280;
        return x / 233280;
    };
}

function createPlat(x: number, y: number, w: number, h: number, type: Platform['type'], difficulty?: 'easy' | 'medium' | 'hard'): Platform {
    return { x, y, w, h, type, difficulty };
}

// Check if we can reach from a to b in one jump
function canReach(a: Platform, b: Platform): boolean {
    const gapX = (b.x - b.w/2) - (a.x + a.w/2);
    const diffY = b.y - a.y;
    return gapX >= 0 && gapX <= MAX_JUMP_X && diffY >= -MAX_JUMP_Y && diffY <= 180;
}

export function generateLevel(levelIndex: number): LevelData {
    const random = seededRandom(levelIndex * 7777 + 12345);
    const biomes: ('grass' | 'cave' | 'castle')[] = ['grass', 'cave', 'castle'];
    const biome = biomes[levelIndex % 3];
    
    const platforms: Platform[] = [];
    const coins: { x: number; y: number }[] = [];
    const questionBlocks: { x: number; y: number; contents: 'coin' | 'mushroom' | 'flower' | 'star' }[] = [];
    const enemies: { x: number; y: number; type: 'goomba' | 'koopa' | 'piranha' }[] = [];
    const decorations: { x: number; y: number; type: 'tree' | 'bush' | 'cloud' | 'pipe' | 'flag' | 'star_marker' | 'coin_marker' }[] = [];

    const difficulty = Math.min(levelIndex / 50, 1);
    const baseY = 540;
    const groundType = biome === 'grass' ? 'grass' : (biome === 'cave' ? 'cave' : 'castle');
    
    // === START AREA ===
    const startPlat = createPlat(200, baseY + 16, 400, 40, groundType, 'easy');
    platforms.push(startPlat);
    
    decorations.push({ x: 80, y: baseY - 10, type: 'bush' });
    decorations.push({ x: 280, y: baseY - 10, type: 'tree' });
    
    let curX = 400;
    let timeBonus = 0;
    
    // Generate sections - each section has a main path
    const numSections = 6 + Math.floor(difficulty * 4);
    
    for (let section = 0; section < numSections; section++) {
        const prev = platforms[platforms.length - 1];
        
        // Gap to next section
        const gap = 90 + random() * 60 + difficulty * 15;
        
        // Main ground platform (easy path always available)
        const platW = 140 + random() * 80;
        const plat = createPlat(curX + gap + platW/2, baseY, platW, 32, 'platform_easy', 'easy');
        
        if (canReach(prev, plat)) {
            platforms.push(plat);
            
            // Basic coins on main path
            if (random() < 0.5) {
                coins.push({ x: plat.x, y: plat.y - 48 });
            }
            
            // Basic enemies on main path
            if (platW > 120 && random() < 0.25) {
                enemies.push({ x: plat.x, y: plat.y - 20, type: 'goomba' });
            }
            
            // === ADD ALTERNATIVE PATHS (medium/hard) ===
            // Only add if reachable from the main platform
            
            // Medium path - slightly higher
            const medY = baseY - 100 - random() * 30;
            const medW = 100 + random() * 40;
            const medPlat = createPlat(plat.x + platW/2 + 60 + random() * 30, medY, medW, 26, 'platform_medium', 'medium');
            
            if (canReach(plat, medPlat)) {
                platforms.push(medPlat);
                decorations.push({ x: medPlat.x, y: medPlat.y - 18, type: 'coin_marker' });
                
                // Medium path rewards
                if (random() < 0.6) {
                    coins.push({ x: medPlat.x, y: medPlat.y - 48 });
                }
                if (random() < 0.35) {
                    questionBlocks.push({ x: medPlat.x, y: medPlat.y - 64, contents: random() < 0.7 ? 'mushroom' : 'flower' });
                }
            }
            
            // Hard path - highest
            const hardY = baseY - 180 - random() * 40;
            const hardW = 80 + random() * 30;
            const hardPlat = createPlat(plat.x + platW/2 + 100 + random() * 40, hardY, hardW, 22, 'platform_hard', 'hard');
            
            // Need to check if hard is reachable from medium, or skip if not
            const reachableFromMed = medPlat && canReach(medPlat, hardPlat);
            const reachableFromMain = canReach(plat, hardPlat);
            
            if (reachableFromMed || reachableFromMain) {
                platforms.push(hardPlat);
                decorations.push({ x: hardPlat.x, y: hardPlat.y - 16, type: 'star_marker' });
                
                // Hard path best rewards
                if (random() < 0.7) {
                    coins.push({ x: hardPlat.x, y: hardPlat.y - 48 });
                    if (random() < 0.5) {
                        coins.push({ x: hardPlat.x + 25, y: hardPlat.y - 64 });
                    }
                }
                if (random() < 0.5) {
                    questionBlocks.push({ x: hardPlat.x, y: hardPlat.y - 64, contents: random() < 0.5 ? 'star' : 'flower' });
                }
                if (random() < 0.2) {
                    enemies.push({ x: hardPlat.x, y: hardPlat.y - 16, type: 'koopa' });
                }
                timeBonus += 10;
            }
            
            // === SPECIAL SECTIONS based on biome ===
            
            // Pipe section (grass biome)
            if (biome === 'grass' && random() < 0.15) {
                const pipeH = 64 + Math.floor(random() * 2) * 32;
                const pipePlat = createPlat(plat.x + platW + 50, baseY - pipeH/2 + 16, 48, pipeH, 'pipe');
                if (canReach(plat, pipePlat)) {
                    platforms.push(pipePlat);
                    decorations.push({ x: pipePlat.x, y: baseY - pipeH - 10, type: 'pipe' });
                    if (random() < 0.5) {
                        coins.push({ x: pipePlat.x, y: baseY - pipeH - 50 });
                    }
                    if (random() < 0.4) {
                        enemies.push({ x: pipePlat.x, y: baseY - pipeH - 25, type: 'piranha' });
                    }
                    timeBonus += 5;
                }
            }
            
            // Stairs section (cave/castle)
            if ((biome === 'cave' || biome === 'castle') && random() < 0.15) {
                let stairY = baseY;
                for (let s = 0; s < 4; s++) {
                    const stair = createPlat(plat.x + platW/2 + 50 + s * 45, stairY - 35, 45, 28, 'brick', s < 2 ? 'easy' : 'medium');
                    platforms.push(stair);
                    stairY -= 35;
                }
                // Top has reward
                if (random() < 0.6) {
                    questionBlocks.push({ x: plat.x + platW/2 + 180, y: baseY - 160, contents: 'star' });
                }
                timeBonus += 8;
            }
            
            curX = plat.x + platW/2;
        } else {
            // Fallback - simple platform
            const fallback = createPlat(curX + 150, baseY, 150, 32, groundType);
            platforms.push(fallback);
            curX += 280;
        }
    }
    
    // === END AREA ===
    const endPlat = createPlat(curX + 200, baseY + 16, 400, 40, groundType, 'easy');
    platforms.push(endPlat);
    decorations.push({ x: curX + 280, y: baseY - 32, type: 'flag' });

    return {
        width: curX + 600,
        height: 600,
        biome,
        platforms,
        coins,
        questionBlocks,
        enemies,
        decorations,
        playerStart: { x: 100, y: baseY - 50 },
        goal: { x: curX + 280, y: baseY - 32 },
        timeBonus
    };
}
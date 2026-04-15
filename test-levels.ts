import { generateLevel } from './src/generator/LevelGenerator';
import { Physics, DEFAULT_PHYSICS } from './src/engine/Physics';

console.log("=== LEVEL SOLVABILITY TEST (100 LEVELS) ===");

let solvableCount = 0;
let errors = [];

for (let i = 0; i < 100; i++) {
    const level = generateLevel(i);
    const physics = new Physics(level.platforms, level.width, level.height);
    
    const startTileX = Math.floor(level.playerStart.x / DEFAULT_PHYSICS.TILE_SIZE);
    const startTileY = Math.floor(level.playerStart.y / DEFAULT_PHYSICS.TILE_SIZE);
    
    const reachable = physics.findReachableTiles(startTileX, startTileY);
    
    // Check Goal
    const goalTileX = Math.floor(level.goal.x / DEFAULT_PHYSICS.TILE_SIZE);
    const goalTileY = Math.floor(level.goal.y / DEFAULT_PHYSICS.TILE_SIZE);
    
    let goalSolvable = false;
    for (let dx = -2; dx <= 2; dx++) {
        for (let dy = -2; dy <= 2; dy++) {
            if (reachable.has(`${goalTileX + dx},${goalTileY + dy}`)) goalSolvable = true;
        }
    }

    if (goalSolvable) {
        solvableCount++;
    } else {
        errors.push(`Level ${i + 1} NOT SOLVABLE!`);
    }
}

console.log(`\nResult: ${solvableCount}/100 levels are solvable.`);
if (errors.length > 0) {
    console.log("Errors:");
    errors.forEach(e => console.log(e));
} else {
    console.log("ALL LEVELS ARE VERIFIED AS SOLVABLE!");
}

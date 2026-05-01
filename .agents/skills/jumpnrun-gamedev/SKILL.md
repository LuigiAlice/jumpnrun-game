---
name: jumpnrun-gamedev
description: >
  Professional development of 2D browser jump & run (platformer) games with Phaser 3.
  Covers player physics, enemy AI, level design, procedural generation, BFS solvability,
  moving platforms, power-ups, scoring, and background parallax. Trigger: "jump and run",
  "platformer game", "mario style game", "side-scroller", "level design game", "move platform".
---

# Jump & Run Game Development

Professional guide for building polished 2D browser jump & run (platformer) games with Phaser 3 and TypeScript.

## Core Architecture

### Scene Flow
```
BootScene → TitleScene → GameScene → GameOverScene
                ↑            ↓
                └────────────┘ (ESC)
```

### Data Flow
```
LevelData (*.ts) → getLevel(index) → GameScene → Physics Solver
                                              → Renderer
                                              → Audio System
```

### File Structure
```
src/
├── main.ts              # Phaser.Game config
├── config.ts            # GAME_WIDTH, GAME_HEIGHT
├── scenes/
│   ├── BootScene.ts     # Generate all textures procedurally
│   ├── TitleScene.ts    # Level selection UI
│   ├── GameScene.ts     # Main gameplay loop
│   └── GameOverScene.ts
├── engine/
│   └── Physics.ts       # BFS solver for level solvability
└── data/levels/
    ├── index.ts         # LevelData type, getLevel(), getLevelCount()
    ├── helpers.ts       # createPlat, createQB, createEnemy, etc.
    └── *.ts             # 15 biome files, 6 levels each
```

---

## Player Physics

### Essential Constants
```typescript
const GRAVITY = 2000;
const JUMP_VELOCITY = -900;
const PLAYER_SPEED = 300;
const MAX_JUMP_DISTANCE = 800;   // horizontal
const MAX_JUMP_UP = 350;        // vertical
const MAX_FALL_DOWN = 1000;     // vertical
```

### Jump Implementation
```typescript
// Only allow jump when player is on ground
if (cursors.up.isDown && player.body.blocked.down) {
    player.body.setVelocityY(JUMP_VELOCITY);
}
```

### Player States
```typescript
// Small Mario → Big Mario → Fire Mario
if (powerUp === 'mushroom' && !isPlayerBig) {
    isPlayerBig = true;
    player.y -= 16;                    // Adjust position for taller hitbox
    player.setTexture('player_big');
    player.body.setSize(24, 48);       // Update physics body
}
if (powerUp === 'flower') {
    isPlayerFire = true;
    player.setTexture('player_fire');
}
```

### Player Death Conditions
- Fall below `level.height + 100` (not absolute GAME_HEIGHT)
- Touch lava platform (`platformType === 'lava'`)
- Touch non-stompable enemy or side-contact
- Timer reaches 0

---

## Enemy AI Patterns

### Ground Walker (goomba, koopa, spiny, robot, crab)
```typescript
enemy.setVelocityX(-80);                    // Walk left
enemy.setCollideWorldBounds(true);
enemy.setBounce(0);

// Edge detection - turn around at platform edges
if (!hasGroundBelow(enemy, platforms)) {
    enemy.setVelocityX(-enemy.body.velocity.x);
}
```

### Floating (boo, ghost, lakitu, bullet_bill, fireball)
```typescript
enemy.body.setAllowGravity(false);
enemy.setData('noEdgeDetection', true);     // Don't check for edges
```

### Piranha Plant (pipe-based)
```typescript
// Cycle: rise(1.5s) → hold(3s) → fall(1.5s) → pause(2s)
this.tweens.add({
    targets: enemy,
    y: peekY,
    duration: 1500,
    yoyo: true,
    hold: 3000,
    repeatDelay: 2000,
    repeat: -1
});

// Positioning relative to pipe
const hiddenY = pipeTopY + 35;      // Hidden in pipe
const peekY = pipeTopY - 50;        // Visible above pipe

// If no pipe found: enemy.destroy() (graceful handling)
```

### Stomping Logic
```typescript
// Player stomps enemy when landing from above
const playerBottom = player.body.y + player.body.halfHeight;
const enemyTop = enemy.body.y - enemy.body.halfHeight;
const isStomping = player.body.velocity.y >= 0 
    && playerBottom <= enemyTop + 15
    && Math.abs(player.x - enemy.x) < enemy.displayWidth / 2 + 15;

if (isStomping && isStompableType(enemy.getData('type'))) {
    enemy.destroy();
    player.body.setVelocityY(-400);     // Bounce up
    score += 500;
} else {
    playerHit();                         // Player takes damage
}
```

---

## Moving Platforms

### Level Data
```typescript
export interface MovingPlatform {
    x: number;
    y: number;
    w: number;
    h: number;
    type: PlatformType;
    moveType: 'horizontal' | 'vertical' | 'circular';
    range: number;      // How far it moves from center
    speed: number;      // Movement speed (15-25 recommended)
}

// Usage in level files
movingPlatforms: [
    createMovingPlat(5400, 480, 120, 24, 'platform_medium', 'horizontal', 200, 20),
    createMovingPlat(10400, 350, 100, 24, 'platform_easy', 'vertical', 180, 22),
];
```

### Movement Update
```typescript
if (data.moveType === 'horizontal') {
    mplat.x = startX + Math.sin(time * 0.00002 * data.speed) * data.range;
} else if (data.moveType === 'vertical') {
    mplat.y = startY + Math.sin(time * 0.00002 * data.speed) * data.range;
} else if (data.moveType === 'circular') {
    data.angle += data.speed * 0.0002;
    mplat.x = startX + Math.cos(data.angle) * data.range;
    mplat.y = startY + Math.sin(data.angle) * data.range;
}
mplat.body.updateFromGameObject();
```

### Player Carry (critical!)
```typescript
// Player must ride with the platform
const isOnPlatform = isAbovePlatform && isHorizontallyAligned;
if (isOnPlatform) {
    player.setX(player.x + dx);
    player.setY(player.y + dy);
    player.body.setVelocityX(dx * 60);
    player.body.setVelocityY(dy * 60);
}
```

### BFS Solver Integration
The level solver MUST consider moving platforms:
```typescript
// Sample 32 positions covering full 360° range
getMovingPlatformPositions(mp) {
    for (let i = 0; i < 32; i++) {
        const t = (Math.PI * 2 * i) / 32;
        // Calculate position at angle t
    }
}

// BFS includes moving platform vectorization
if (canJumpToMovingPlatform(current, mp)) {
    const reachableFromMoving = getStaticPlatformReachableFromMoving(mp, visited);
    for (const p of reachableFromMoving) queue.push(p);
}
```

---

## Level Design Principles

### Gap Sizing
- **Small gap**: < 400px (easy jump)
- **Medium gap**: 400-600px (requires momentum)
- **Large gap**: 600-800px (near limit, difficult)
- **Moving platform gap**: 800px+ (requires moving platform)

### Platform Spacing
- Vertical climb steps: 60-80px apart (MAX_JUMP_UP = 350)
- Horizontal gaps between sections: 300-500px
- Pipe sequences: 250-350px spacing
- Always have a "landing zone" after gaps (min 150px wide)

### Question Block Placement
- **Minimum vertical gap**: 56px (Big Mario = 48px + 8px buffer)
- Place at accessible heights (player reaches via jumping)
- Distribute 3-6 QBs evenly through each level
- Never place directly above lava or pits

### Player Spawn
- Must be on a valid platform (use findPlatformUnderPoint validation)
- Don't spawn at level edges (min 100px from left boundary)
- Player feet should be slightly above platform surface

### Moving Platform Distribution
- **Every level needs at least 1 moving platform** (SPEC requirement)
- Use horizontal for gap bridging, vertical for climbs
- Don't place moving platforms over death zones without static alternatives
- Speed range: 15-25 for playable timing

---

## Procedural Texture Generation

### Why Procedural?
- No external asset loading (instant start)
- Consistent art style
- Easy to modify and extend
- All textures available immediately after BootScene

### Player Character Pattern
```typescript
const drawMario = (key, shirtColor, pantsColor, isBig) => {
    const g = graphics;
    g.clear();
    // Layer from back to front:
    // 1. Shadow (ground ellipse)
    // 2. Shoes (dark brown with highlight)
    // 3. Pants (with shading)
    // 4. Body/Shirt (with highlight for depth)
    // 5. Hands (white circles)
    // 6. Head (peach circle with ears)
    // 7. Hair (dark brown under cap)
    // 8. Cap (red with "M" badge)
    // 9. Eyes (white sclera + black pupils + white shine)
    // 10. Nose and mustache
    g.generateTexture(key, width, height);
};
```

### Enemy Pattern
```typescript
// Every enemy should have:
// 1. Base shape (body)
// 2. 3D shading (lighter top-left, darker bottom-right)
// 3. Distinctive feature (spikes, shell, antenna, etc.)
// 4. Facial expression (eyes, mouth)
// 5. White highlight dot for polish
// 6. Ground shadow
```

---

## Background Parallax System

### Layer Structure (7 layers per biome)
```typescript
const scrollFactors = [0, 0.02, 0.05, 0.1, 0.2, 0.3, 0.4];
const depths = [-100, -95, -90, -85, -80, -75, -70];
const widths = [1200, 1400, 1600, 1600, 1600, 1200, 1200];

// Layer 0: Sky (no scroll) - gradient
// Layer 1: Far mountains/clouds (very slow)
// Layer 2: Mid hills/structures
// Layer 3: Near terrain features
// Layer 4: Trees/decorations
// Layer 5: Bushes/small details
// Layer 6: Foreground (slowest scroll)
```

---

## Audio System

### Procedural Music (Web Audio API)
```typescript
// Polyphonic playback with multiple oscillators
playNote(freq, type, volume, duration) {
    // 3 oscillators per note for richness:
    // - Main at base frequency
    // - Detuned (+7 cents) for warmth
    // - Octave up at lower volume for brilliance
    const oscs = [main, detuned, octaveUp];
    oscs.forEach(osc => {
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setTargetAtTime(0, now + duration, 0.02);
    });
}

// Chord playback for harmonic richness
playChord(freqs, type, volume, duration) {
    freqs.forEach(f => playNote(f, type, volume / freqs.length, duration));
}
```

---

## Level Solvability (BFS)

### Solver Requirements
```typescript
// Every level MUST be solvable before release
const physics = new Physics(platforms, width, height, movingPlatforms);
const isSolvable = physics.isSolvable(startX, startY, goalX, goalY);
// Test: expect(isSolvable).toBe(true);
```

### Solver Edge Cases
- **Moving platforms**: Sample 32 positions covering full range
- **Overlapping platforms**: Use correct edge calculation (center ± width/2)
- **One-way platforms**: Ignore for BFS (always traversable in both directions)
- **Lava/death zones**: Don't filter in BFS (only check geometric reachability)

---

## Scoring System

### Standard Points
| Action | Points |
|--------|--------|
| Coin collect | 100 |
| Enemy stomp | 500 |
| QB coin content | 100 (+200 coins) |
| QB power-up content | 200 |
| Level complete | 1000 + timeLeft |

---

## Common Pitfalls & Solutions

### 1. Player falls through platform at start
**Cause**: Platform at negative x coordinates
**Fix**: Start first platform at x ≥ 200, player at x ≥ 150

### 2. Moving platform doesn't carry player
**Cause**: Position updated after isOnPlatform check
**Fix**: Save old position, update, THEN check and apply delta

### 3. Level solver passes but player can't complete
**Cause**: Solver uses discrete time samples, player needs precise timing
**Fix**: Don't rely on moving platforms for critical paths alone

### 4. Texture missing at runtime
**Cause**: DecorationType defined but generateTexture not called
**Fix**: Audit all used decoration types against BootScene generation

### 5. Biome order mismatch between TitleScreen and level array
**Cause**: Different import order in ALL_LEVELS vs TitleScene BIOME_NAMES
**Fix**: Keep identical ordering in both files

### 6. Gravity difference between config and GameScene
**Cause**: main.ts sets gravity=1000, GameScene overwrites to 2000
**Fix**: Single source of truth in GameScene, ignore main.ts gravity

---

## Code Conventions

### TypeScript
- Strict mode enabled
- ES module imports (`import { x } from './y'`)
- Type all game object properties explicitly
- Use `as any` casts only when Phaser types are incomplete

### Level Files
- Each biome file exports a const array (e.g., `GRASSLANDS_LEVELS`)
- Use helper functions exclusively (never raw objects)
- Scale factor S at the top of each level IIFE
- Consistent structure: platforms → coins → questionBlocks → enemies → decorations → playerStart → goal

### Tests
- All levels must pass LevelSolvability.test.ts
- All used textures must pass AssetCoverage.test.ts
- Physics constants validated in GameLogic.test.ts
- Add tests for any new game mechanic

---

## Quick Reference

### Helper Functions
```typescript
createPlat(x, y, w, h, type)          // Platform
createCoin(x, y)                      // Coin
createQB(x, y, contents)              // Question Block
createEnemy(x, y, type)               // Enemy
createDeco(x, y, type)                // Decoration
createGoal(x, y, points, difficulty)  // Goal
createMovingPlat(x, y, w, h, type, moveType, range, speed)  // Moving Platform
```

### Biome List (in ALL_LEVELS order)
```
grasslands(1-6), desert(7-12), water(13-18), ice-snow(19-24),
sky-clouds(25-30), forest(31-36), village(37-42), beach-island(43-48),
factory(49-54), volcano-lava(55-60), haunted-mansion(61-66),
ruins(67-72), canyon-base(73-78), space-star(79-84), castle-final(85-90)
```

### Keyboard Bindings
| Key | Action |
|-----|--------|
| ← → | Move |
| ↑ | Jump |
| X / Space | Shoot (Fire Mario) |
| R | Restart level |
| N | Next level |
| ESC | Return to title |

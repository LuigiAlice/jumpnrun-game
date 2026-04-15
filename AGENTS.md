# AGENTS.md - Jump & Run Game

Siehe auch die Datei [SPEC.md](SPEC.md) und [MECHANICS.md](MECHANICS.md)

## Tech Stack
- TypeScript + Vite + Phaser 3 + Vitest
- ES modules (`"type": "module"` in package.json)

## Commands
- `npm run dev` - Start dev server
- `npm run build` - Production build (mit TypeScript Check)
- `npm run preview` - Preview production build
- `npm test` - Run Vitest tests (mit TypeScript Check)
- `npm run typecheck` - Nur TypeScript Check

## Test Setup
- Vitest configured with jsdom environment
- Tests run from `tests/**/*.test.ts`
- Run single test: `npm test -- LevelSolvability.test.ts`
- TypeScript Fehler müssen vor test/build behoben werden

## Architecture
- **Entry**: `src/main.ts` initializes Phaser.Game
- **Scenes**: `src/scenes/` contains BootScene, TitleScene, GameScene, GameOverScene
- **Physics**: Arcade physics with gravity (y: 1000)
- **Level Gen**: Seed-based deterministic algorithm (BFS path-finding)
- **Level Data**: 90 levels across 15 biomes in `src/data/levels/`

## Key Config
- Canvas: 800x1200, scale FIT, auto center
- Build outDir: `dist/`
- TypeScript: strict mode, ESNext modules

## Key Types
- PlatformType: grass, stone, brick, pipe, pipe_top, cloud, platform_easy/medium/hard, lava, wood, sand, snow, ruins, space, water, bubble, etc.
- EnemyType: goomba, koopa, piranha, spiny, boo, thwomp, lakitu, bullet_bill, fireball, crab, robot, ghost, squid, ufo, boss
- Stompbare Gegner: goomba, koopa, spiny, robot, crab, ghost, squid, ufo
- Nicht stompbar: piranha, thwomp, boo, lakitu, bullet_bill, fireball, boss

## Guidelines
- add tests for all new features
- TypeScript muss fehlerfrei sein vor commit
- Piranhas müssen eine Pipe in der Nähe haben (Code handled gracefully)
- Question Blocks brauchen 56px Mindestabstand für Big Mario


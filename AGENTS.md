# AGENTS.md - Jump & Run Game

Beachte unbedingt auch die Datei [SPEC.md](SPEC.md) und [MECHANICS.md](MECHANICS.md)
Aktualisiere selbständig dieses Dokument und alle anderen, falls sich Anforderungen ändern vom Programmierer.

Teile deine Arbeit auf mehrere Subagenten auf.


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

## E2E Testing
- Playwright for end-to-end tests in `e2e/**/*.test.ts`
- Commands:
  - `npm run e2e:test` - Run E2E tests headlessly
  - `npm run e2e:test:headed` - Run E2E tests with browser visible
- E2E tests verify:
  - Game loads without console errors
  - Canvas element exists and is visible
  - Game responds to keyboard input
  - ESC returns to title screen
  - Game runs without critical errors
- Note: Phaser rendert auf Canvas, daher sind visuelle Tests auf Textlocators nicht möglich

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
- add tests for all requirements (user stories / bug reports)
- TypeScript muss fehlerfrei sein vor commit
- Piranhas müssen eine Pipe in der Nähe haben (Code handled gracefully)
- Question Blocks brauchen 56px Mindestabstand für Big Mario


# AGENTS.md - Jump & Run Game

Siehe auch die Datei [SPEC.md](SPEC.md)   

## Tech Stack
- TypeScript + Vite + Phaser 3 + Vitest
- ES modules (`"type": "module"` in package.json)

## Commands
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm test` - Run Vitest tests

## Test Setup
- Vitest configured with jsdom environment
- Tests run from `tests/**/*.test.ts`
- Run single test: `npm test -- LevelSolvability.test.ts`

## Architecture
- **Entry**: `src/main.ts` initializes Phaser.Game
- **Scenes**: `src/scenes/` contains BootScene, TitleScene, GameScene, GameOverScene
- **Physics**: Arcade physics with gravity (y: 1000)
- **Level Gen**: Seed-based deterministic algorithm (BFS path-finding)

## Key Config
- Canvas: 800x600, scale FIT, auto center
- Build outDir: `dist/`
- TypeScript: strict mode, ESNext modules

## Guidelines
- add tests for all new features


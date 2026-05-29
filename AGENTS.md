# AGENTS.md - Jump & Run Game

Beachte unbedingt auch die Datei [GAMEDESIGN.md](GAMEDESIGN.md)
Beachte den [LEVEL_PLAN.md](LEVEL_PLAN.md) für zukünftige Level-Änderungen
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
- `npm run e2e:test` - E2E Tests headlessly
- `npm run e2e:test:headed` - E2E Tests mit sichtbarem Browser

## Test Setup
- Vitest configured with jsdom environment
- Tests run from `tests/**/*.test.ts`
- Run single test: `npm test -- LevelSolvability.test.ts`
- TypeScript Fehler müssen vor test/build behoben werden
- 125 Tests in 5 Dateien (Physics, LevelSolvability, GameLogic, AssetCoverage, debug-solvability)
- E2E: 6 Playwright-Tests in `e2e/**/*.test.ts`

## Architecture
- **Entry**: `src/main.ts` initializes Phaser.Game
- **Scenes**: `src/scenes/` contains BootScene, TitleScene, GameScene, GameOverScene
- **Physics**: Arcade physics, biome-abhängige Gravity (s. `BIOME_GRAVITY`), `JUMP_VELOCITY: -900`, `PLAYER_SPEED: 300`
- **Solver**: `src/engine/Physics.ts` – BFS path-finding with `MAX_PRACTICAL_JUMP: 585`, `MAX_JUMP_UP: 350`, `MAX_FALL_DOWN: 1000`
- **Konstanten**: `src/config.ts` – `PHYSICS.GRAVITY: 2000`, `JUMP_SPEED: -900`, `HORIZONTAL_SPEED: 300`, `MAX_PRACTICAL_JUMP: 585`, `MAX_JUMP_DISTANCE: 800`
- **Level Data**: 90 levels across 15 biomes in `src/data/levels/`

## Key Config
- Canvas: 800x1200, scale FIT, auto center
- Build outDir: `dist/`
- TypeScript: strict mode, ESNext modules

## Key Types
- PlatformType: grass, stone, brick, pipe, pipe_top, cloud, platform_easy/medium/hard, lava, wood, sand, snow, ruins, space, water, bubble, ground, cave, castle, metal, sandstone
- SOLID_TYPES: alles ausser lava, pipe, pipe_top, platform_* (lava ist in `this.platforms`, nicht solid)
- EnemyType: goomba, koopa, piranha, spiny, boo, thwomp, lakitu, bullet_bill, fireball, crab, robot, ghost, squid, ufo, boss
- Stompbare Gegner: goomba, koopa, spiny, robot, crab, ghost, squid, ufo
- Nicht stompbar: piranha, thwomp, boo, lakitu, bullet_bill, fireball, boss

## Enemy AI (GameScene.ts update)
- **goomba/koopa/spiny/robot/crab**: Edge-detection, laufen hin/her mit `BIOME_ENEMY_SPEED`
- **ghost**: Schwebt, folgt Spieler (+ Sinus-Bob)
- **ufo**: Schwebt, folgt Spieler langsam (+ Bob)
- **squid**: Schwebt im Wasser, folgt Spieler (+ Bob)
- **boo**: Schwebt, erstarrt wenn Spieler hinschaut, folgt wenn wegschaut
- **thwomp**: Startet unbeweglich, fällt wenn Spieler drunter ist, reset nach Aufprall
- **lakitu**: Schwebt über Spieler, spawnt Spiny-Eier alle 3s
- **boss**: 3 HP, schiesst zielsuchende Feuerbälle alle 2s, nur mit Fireballs besiegbar

## Biome Finale Mechaniken
- **L6 (grasslands)**: Windböen – seitlicher Schub alle 3s
- **L12 (desert)**: Fallende Hindernisse aus der Decke (Fireball-Textur)
- **L18 (water)**: Steigendes Wasser – Wasser-Plattform steigt von unten
- **L24 (ice-snow)**: Fallende Eiszapfen
- **L30 (sky-clouds)**: Bröckel-Plattformen (wie L72)
- **L36 (forest)**: Fallende Äste
- **L42 (village)**: Windböen
- **L48 (beach-island)**: Steigende Flut
- **L54 (factory)**: Fallende Hindernisse
- **L60 (volcano-lava)**: Steigende Lava (0.4px/Frame)
- **L66 (canyon-base)**: Fallende Felsen
- **L72 (ruins)**: Bröckel-Plattformen (800ms Standzeit, 3s Respawn)
- **L78 (space-star)**: Bröckel-Plattformen
- **L84 (haunted-mansion)**: Bröckel-Plattformen
- **L90 (castle-final)**: Bosskampf mit HP-Bar, Arena-Wänden, Boss-Projektilen

## Biome Gravity (`BIOME_GRAVITY`)
- Default: 2000
- space-star: 1000
- sky-clouds: 1500
- water: 1200
- beach-island: 1500
- volcano-lava: 2200

## Biome Particles (`BIOME_PARTICLE_CONFIG`)
- volcano-lava: orange Asche
- ice-snow: weisser Schnee
- space-star: blaue Sterne
- sky-clouds: hellblaue Wolken
- haunted-mansion: lila Nebel

## Biome Enemy Speed (`BIOME_ENEMY_SPEED`)
- Default: 80
- factory: 100, volcano-lava: 100, ruins: 110, canyon-base: 120, space-star: 100, castle-final: 130

## Swimming (Water Biome)
- Auslöser: `body.y > 500`
- Gravity reduziert auf 600
- `cursors.up` → `vY = -250`
- Horizontal-Drift: `vX * 0.95` pro Frame

## Secret Rooms
- **15 Stück** (eines pro Biome, im 1. Level)
- Bestehend aus 1 Plattform + 3–5 Coins + optionalem QB
- Erreichbar per Sprung (innerhalb physikalischer Limits)

## Dekorations-Animationen
- **fire/ember**: Flackern (scale + alpha tween)
- **bubble/seaweed**: Schweben (y-tween)
- **ghost/cobweb**: Pulsieren (alpha-tween)

## Background Animation
- **water/beach-island**: tilePositionY scrollt (Wellen)
- **sky-clouds/space-star**: tilePositionX scrollt (Parallax)

## Guidelines
- add tests for all new features
- add tests for all requirements (user stories / bug reports)
- TypeScript muss fehlerfrei sein vor commit
- Piranhas müssen eine Pipe in der Nähe haben (Code handled gracefully)
- Question Blocks brauchen 56px Mindestabstand für Big Mario

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
- 197 Tests in 11 Dateien (Physics, LevelInvariant, LevelSolvability, GameLogic, AssetCoverage, NewElements, PilotElements, Music, RequirementsCoverage, StompMechanics, ElementMix)
- E2E: 12 Playwright-Tests in `e2e/**/*.test.ts` (game.test.ts 6 + elements.test.ts 6: Springs/Spikes/Bricks/Coin-Gate/Stomp via `window.__game`; benötigt `npx playwright install chromium`)
- **Traceability**: `REQUIREMENTS.md` listet alle Anforderungen mit IDs (R-001 ff.); `tests/RequirementsCoverage.test.ts` prüft, dass jedes Mapping auf eine existierende Test-Datei + Testnamen-Teilstring zeigt (Gaps `—` max. 8)

## Architecture
- **Entry**: `src/main.ts` initializes Phaser.Game
- **Scenes**: `src/scenes/` contains BootScene, TitleScene, GameScene, GameOverScene
- **Physics**: Arcade physics, biome-abhängige Gravity (s. `BIOME_GRAVITY`), `JUMP_VELOCITY: -900`, `PLAYER_SPEED: 300`
- **Solver**: `src/engine/Physics.ts` – BFS path-finding mit biome-bewusster Gravitation. `Physics(platforms, w, h, movingPlatforms, gravity)` akzeptiert optionalen gravity-Parameter. Max-Sprungweite wird rein physikalisch berechnet (kein MAX_PRACTICAL_JUMP mehr). `MAX_JUMP_UP: 350`, `MAX_FALL_DOWN: 1000`
- **Musik**: `src/audio/biomeMusic.ts` – 15 handkomponierte Biome-Songs (`BiomeSong`: bpm, leadWave, leadDouble, melody/bassline/drums in MIDI-Nummern, 16 Steps/Takt, 16 Takte; 0 = Pause; Hook = Takte 1-2, Reprise in Takt 9-10). `midiToFreq` + `stepTime` (in musicPlayer.ts) sind getestet (`tests/Music.test.ts`, 11 Tests). KEIN Math.random, KEINE Nintendo-Melodien.
- **MusicPlayer**: `src/audio/musicPlayer.ts` – Lookahead-Scheduler (25ms-Poll, 0.12s Schedule-Ahead, exakte `ctx.currentTime`-Timeline, kein Drift). Instrumente: Lead (Song-Waveform + 6-cent-Detune-Zweitosc + LFO-Vibrato ab 60% + Delay-Send), Bass (triangle+Sub-Sine, Lowpass 480Hz), Arp (square, root-5-oct-5 16tel), Kick (180→45Hz + Click), Snare (Bandpass-Noise 1800Hz + 200Hz-Körper), HiHat (highpass 7kHz). GameScene: `startBgm()` erzeugt ctx/master/delay (SFX-Pfad unverändert), erstellt `MusicPlayer` und startet Song; alle Stop-Punkte rufen `stopMusic()`.
- **Konstanten**: `src/config.ts` – `PHYSICS.GRAVITY: 2000`, `JUMP_SPEED: 900`, `HORIZONTAL_SPEED: 300`, `MAX_JUMP_DISTANCE: 800`, `SPRING_VELOCITY: -1350` (Sprungfeder, Sprunghöhe ~455px bei g=2000)
Neue Elemente (LevelData-Felder: `springs?: {x,y}[]`, `spikes?: {x,y}[]`, `coinGoal?: number`): Springs (y = Plattform-Oberkante, Launch via `SPRING_VELOCITY` + Squash-Tween, GameScene ~774; Body-Hinweis: nach `refreshBody()` muss `setSize(28,12)` + `setOffset(2,-6)` gesetzt werden, sonst liegt die Body-Oberkante exakt auf der Plattform-Oberkante → 0 Overlap → Launch triggert nie, da Solid-Separation zuerst läuft), Spikes (y = Oberkante − 8, Overlap → `die()`, GameScene ~786), Zerstörbare Bricks (Big Mario zerstört 'brick' von unten via `canBreakBrick()`, load-bearing Bricks → Wobble-Schutz via `isBrickLoadBearing()` — GameScene:622 übergibt `{x, y, type: platType}` als Plain-Object, NICHT den Sprite (dessen `type` ist 'Sprite' → Match schlägt immer fehl → Schutz wirkungslos), +50 Punkte, GameScene ~616), Münz-Tor (`coinGoal` sperrt Goal bis X Coins, HUD-Hint, GameScene ~568/964/1516). Runtime-E2E-Verifikation aller 4 Elemente: `e2e/elements.test.ts` (Headless-Browser, Zugriffe via `window.__game`). Helper: `createSpring`, `createSpike` in helpers.ts (re-exportiert in levels/index.ts). Solver kennt neue Elemente NICHT — Elemente dürfen nie Pflicht sein. Rollout: Pilot grasslands/desert (1-12) + Phase 6b space-star (79-84) & castle-final (85-90, L90-Bossarena elementefrei; space: Feder-Hub ~910px bei g=1000 → sparsam, Sternen-Konstellations-Coin-Cluster, langsame Circular-Bahnen; castle: coinGoal L89 = 33). Tests: `tests/NewElements.test.ts` (Invariante „keine neuen Felder" gilt für alle Nicht-Upgrade-Level, Boundary i>=78), `tests/PilotElements.test.ts`.
- **Biome Gravity**: `BIOME_GRAVITY` in `config.ts` (space-star: 1000, water: 1200, sky-clouds/beach-island: 1500, volcano-lava: 2200)
- **Level Auto-Fixer**: `src/data/levels/index.ts` → `ensureSolvable()` (exportiert) fügt bei `getLevel()` automatisch Trittplattformen hinzu, falls biome-bewusste Max-Sprungweite überschritten wird. Typ: 'platform_easy'. QB-Clearance: platY wird auf das MINIMUM der minPlatY-Werte aller betroffenen Question Blocks gehoben; nach dem Loop wird per `console.warn` gewarnt, falls das Level nicht vollständig lösbar gemacht werden konnte. Exportiert: `ALL_LEVELS`, `ensureSolvable`, `getLevel`, `getLevelCount`, `getBiome`. Invariant-Tests: `tests/LevelInvariant.test.ts`.
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

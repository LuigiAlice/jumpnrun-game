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
- Unit- und Datentests in `tests/**/*.test.ts`, einschließlich echter Grafik-Drawcalls, Terrain-Rendering, Gegnerregeln, WorldOneDesign, NatureLevelPolish, ChallengeLevelPolish und StrictPhysicsAudit. BiomeAudit läuft scoped via `BIOME=<biom> npx vitest run tests/BiomeAudit.test.ts` (ohne ENV 10 skipped).
- E2E in `e2e/**/*.test.ts`: Spiel, Elemente, Biome-Smoke, direkte Steuerung, Gegner/Panzer/Röhren, Terrain/Kamera und Boss-Goal. Zugriffe via `window.__game`; benötigt Chromium und erlaubten Browser-/Serverstart.
- **Traceability**: `REQUIREMENTS.md` listet alle Anforderungen mit IDs (R-001 ff.); `tests/RequirementsCoverage.test.ts` prüft, dass jedes Mapping auf eine existierende Test-Datei + Testnamen-Teilstring zeigt (Gaps `—` max. 8)

## Architecture
- **Entry**: `src/main.ts` initializes Phaser.Game
- **Scenes**: `src/scenes/` contains BootScene, TitleScene, GameScene, GameOverScene
- **Physics**: Arcade physics, biome-abhängige Gravity (s. `BIOME_GRAVITY`), `JUMP_VELOCITY: -900`, `PLAYER_SPEED: 300`
- **Solver**: `src/engine/Physics.ts` – BFS path-finding mit biome-bewusster Gravitation. `Physics(platforms, w, h, movingPlatforms, gravity)` akzeptiert optionalen gravity-Parameter. Max-Sprungweite wird rein physikalisch berechnet (kein MAX_PRACTICAL_JUMP mehr). `MAX_JUMP_UP: 350`, `MAX_FALL_DOWN: 1000`
- **Musik**: `src/audio/biomeMusic.ts` – 15 eigenständige handkomponierte Biome-Themen, 16 Takte ×16 Steps, Hook Takte1–2/Reprise9–10. `melodyDurations` bewahrt echte Notenlängen; `arpEverySteps`, `percussionGain`, `leadGain`, `padGain`, `delaySend` steuern die Biome-Stimmung. Bass verwendet harmonische Grundtöne/Quinten/Oktaven. Keine Nintendo-Melodien, deterministische Songdaten.
- **MusicPlayer**: `src/audio/musicPlayer.ts` – Lookahead25ms/Ahead0.12s auf AudioContext-Timeline. Weich gefilterter längentreuer Lead, warmes Bassfundament, sparsames Triangle-Arpeggio, ein Akkord-Pad pro Takt, temposynchrones Delay. Deterministischer Noise-Seed; alle Voice-Knoten sowie Delay-Feedback bei Stop freigeben. Tests: Music, MusicArrangement und MusicPlayer. GameScene-Biome-Auswahl und SFX-Pfad bleiben erhalten.
- **Konstanten**: `src/config.ts` – `PHYSICS.GRAVITY: 2000`, `JUMP_SPEED: 900`, `HORIZONTAL_SPEED: 300`, `MAX_JUMP_DISTANCE: 800`, `SPRING_VELOCITY: -1350` (Sprungfeder, Sprunghöhe ~455px bei g=2000)
- **Zeit-Basen (R-061)**: GameScene rechnet Bewegung ausschliesslich auf Game-Time — Mover über `moveAccum += delta` (Sinus + Circular-Winkel), Gegner-Bobs (ghost/ufo/squid) über denselben Akkumulator. Wandzeit (`time`-Argument) nur für Timeout-Vergleiche (Shoot-Cooldown, Crumble-Start 800ms, Wind-Gusts, Eier-/Boss-/Hazard-Intervalle). Grund: Phaser `TimeStep` kappt `delta` bei Fokus-Cooldown/Slow-Mo, während `time` echt weiterläuft — Wandzeit-Mover hätten die Physik überholt (frameabhängige Carries, verfehlte Landungen). E2E-Waits sind deshalb zustandsbasiert (grounded/Apex/Polling mit Budget) und nie feste Wandzeit-Schlafwerte; Headless läuft typisch mit 5–15fps.
Neue Elemente (LevelData-Felder: `springs?: {x,y}[]`, `spikes?: {x,y}[]`, `coinGoal?: number`): Springs (y = Plattform-Oberkante, Launch via `SPRING_VELOCITY` + Squash-Tween, GameScene ~774; Body-Hinweis: nach `refreshBody()` muss `setSize(28,12)` + `setOffset(2,-6)` gesetzt werden, sonst liegt die Body-Oberkante exakt auf der Plattform-Oberkante → 0 Overlap → Launch triggert nie, da Solid-Separation zuerst läuft), Spikes (y = Oberkante − 8, Overlap → `die()`, GameScene ~786), Zerstörbare Bricks (Big Mario zerstört 'brick' von unten via `canBreakBrick()`, load-bearing Bricks → Wobble-Schutz via `isBrickLoadBearing()` — GameScene:622 übergibt `{x, y, type: platType}` als Plain-Object, NICHT den Sprite (dessen `type` ist 'Sprite' → Match schlägt immer fehl → Schutz wirkungslos), +50 Punkte, GameScene ~616), Münz-Tor (`coinGoal` sperrt Goal bis X Coins, HUD-Hint, GameScene ~568/964/1516). Runtime-E2E-Verifikation aller 4 Elemente: `e2e/elements.test.ts` (Headless-Browser, Zugriffe via `window.__game`). Helper: `createSpring`, `createSpike` in helpers.ts (re-exportiert in levels/index.ts). Solver kennt neue Elemente NICHT — Elemente dürfen nie Pflicht sein. Rollout: Pilot grasslands/desert (1-12) + Phase 6b space-star (79-84) & castle-final (85-90, L90-Bossarena elementefrei; space: Feder-Hub ~910px bei g=1000 → sparsam, Sternen-Konstellations-Coin-Cluster, langsame Circular-Bahnen; castle: coinGoal L89 = 33). Tests: `tests/NewElements.test.ts` (Invariante „keine neuen Felder" gilt für alle Nicht-Upgrade-Level, Boundary i>=78), `tests/PilotElements.test.ts`.
- **Phase 9 Level-Elemente** (alle datengetrieben, solver-agnostisch, nie Pflichtweg): `Platform.crumble` (800ms/3s, data-driven über explizite Flags, keine Level-ID-Listen), `Platform.conveyor` (px/s Laufkraft, GameScene `getGroundPlatform()`), PlatformType `ice` (Rutsch ×0.96, nur ice-snow), `checkpoints` (Respawn nach Tod via `respawnPoint`, `scene.restart({respawn})`), `windZones`/`waterZones` (Rechtecke; Wind nur via `windZones`, Wasser aktiviert Schwimm-Physik), `keys`/`doors` (alle Keys → Türen öffnen, nur Bonusräume; Türen sind metal-Plattformen mit `setData('door', true)`-Marker), `cannons` (Projektile in `fallingHazards`-Gruppe), `fallingHazards?: { intervalMs? }` (fallende Hindernisse-Finale, data-driven), `timeGate` (Goal erst nach X Sekunden), `goals` (Multi-Goal-Zusatzflaggen, `reachGoal(bonus)`), QB-Inhalt `oneup` (+1 Leben), `hidden`/`brick_secret`/`brick_multi`, `rising` (L60/L18/L48: steigende Lava/Flut, Chase-Abstand 560px; Flut reitbar/nicht tödlich, nur Lava tötet bei Berührung). Helfer v2 in `helpers.ts`: `staircase`, `plateauSection`, `pitFloor`, `twoTierSection`, `islandCluster`, `zigzagClimb`, `overhangSection`, `coinArc/Diamond/Trail/Ladder`, `createCrumblePlat`, `createConveyorPlat`, `createIcePlat`, `createCheckpoint`, `createWindZone`, `createWaterZone`, `createKey`, `createDoor`, `createCannon`, `gapWithPlatforms(..., opts)`. Tests: `tests/Phase9Features.test.ts` (32) + `tests/BiomeAudit.test.ts`.
- **Biome Gravity**: `BIOME_GRAVITY` in `config.ts` (space-star: 1000, water: 1200, sky-clouds/beach-island: 1500, volcano-lava: 2200)
- **Level Auto-Fixer**: `src/data/levels/index.ts` → `ensureSolvable()` (exportiert) fügt bei `getLevel()` automatisch Trittplattformen hinzu, falls biome-bewusste Max-Sprungweite überschritten wird. Typ: 'platform_easy'. QB-Clearance: platY wird auf das MINIMUM der minPlatY-Werte aller betroffenen Question Blocks gehoben; nach dem Loop wird per `console.warn` gewarnt, falls das Level nicht vollständig lösbar gemacht werden konnte. Exportiert: `ALL_LEVELS`, `ensureSolvable`, `getLevel`, `getLevelCount`, `getBiome`. Invariant-Tests: `tests/LevelInvariant.test.ts`. **Seit Phase 9 sind alle 90 Level as-authored lösbar — `ensureSolvable` ergänzt in keinem Level mehr eine Plattform** (Test: `Phase9Features.test.ts` → "no ensureSolvable patchwork").
- **Level Data**: 90 levels across 15 biomes in `src/data/levels/`

## Key Config
- Canvas: 1200x800, scale FIT, auto center, Antialiasing, pixelArt: false, roundPixels: false
- Build outDir: `dist/`
- TypeScript: strict mode, ESNext modules

## Key Types
- PlatformType: grass, stone, brick, brick_secret, brick_multi, pipe, pipe_top, cloud, platform_easy/medium/hard, lava, wood, sand, snow, ice, ruins, space, water, bubble, ground, cave, castle, metal, sandstone, hidden
- SOLID_TYPES: alles ausser lava, pipe, pipe_top, platform_* (lava ist in `this.platforms`, nicht solid)
- EnemyType: goomba, koopa, piranha, spiny, boo, thwomp, lakitu, bullet_bill, fireball, crab, robot, ghost, squid, ufo, boss, parakoopa, buzzy_beetle, bobomb
- Stompbare Gegner: goomba, koopa, robot, crab, ghost, squid, ufo
- Nicht stompbar: spiny, piranha, thwomp, boo, lakitu, bullet_bill, fireball, boss

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
- **L66 (haunted-mansion)**: Fallende Hindernisse
- **L72 (ruins)**: Bröckel-Plattformen (800ms Standzeit, 3s Respawn)
- **L78 (canyon-base)**: Bröckel-Plattformen
- **L84 (space-star)**: Bröckel-Plattformen
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
- Code Reviews laufen über den projektspezifischen Skill `jumpnrun-code-review` (`.agents/skills/jumpnrun-code-review/SKILL.md`): 3 parallele Achsen — Spec & Docs, Standards & Smells, Game Quality (Physik/Feel, Level-Invarianten, E2E-Anker, Determinismus, Performance/Memory, Assets)
- TypeScript muss fehlerfrei sein vor commit
- Piranhas müssen eine Pipe in der Nähe haben (Code handled gracefully)
- Question Blocks brauchen 56px Mindestabstand für Big Mario

## Klassisches Bewegungsgefühl
- `src/engine/PlayerMovement.ts`: reine Game-Time-Steuerung; Walk 300, Shift-Sprint 400; sofortiges Starten/Stoppen/Umkehren auch in der Luft. Nur auf `ice` mit Bodenkontakt: Beschleunigung, Trägheit und zeitnormierte Eisreibung ×0.96. Schnee bleibt griffig.
- ↑/Z: variable Sprunghöhe, Coyote 90 ms, Buffer 120 ms; kein Auto-Bounce. Springs/Stomps markieren `externalLaunchPending`, damit Jump-Cut externe Impulse nicht kürzt.
- Tests: `tests/PlayerMovement.test.ts`, Runtime-Verkabelung in `e2e/player-feel.test.ts`.

## Landschafts- und Gegnerpolitur
- Terrain: `src/rendering/terrain.ts` (native Deck-/Füllkacheln, StaticGroup-TileSprites, Mover-Panels, Cachefreigabe beim Shutdown). Für TileSprites ist die Quelltextur `displayTexture`, nicht die interne Rendertextur `texture`.
- Grafik: `src/art/pixelAssets.ts` + `storybookPrimitives.ts` (weiche runde Formen, alle Animationsframes maßgleich). `storybookPlayer.ts` erzeugt alle Spielerposen bei unveränderten Fußpositionen und Canvasgrößen; `storybookScenery.ts` erzeugt 105 Hintergrundebenen und neun Dekotexturen. BootScene delegiert die Erzeugung. Tests: StorybookPlayer, StorybookScenery, PixelAssets und ClassicAssets prüfen echte Drawcalls, Größen und Freigabe. Die knuffige Bilderbuchoptik ersetzt den früheren Pixelrasterstil; keine Änderung an Steuerung oder Kollisionen.
- `EnemyRules.ts` trennt Treffer- und Sternschutz, Shell-Kontakte, Power-up-Bewegung und Piranha-Phasen. Stern-/Schutzdauer läuft auf Game-Time. Versteckte Blöcke synchronisieren `platformType` und Data; `sourcePlatformType` erhält den tragenden Brick-Schutz nach Zustandswechseln.
- Zielabschluss: `reachGoal()` beendet Spieler-Tweens, setzt Velocity/Acceleration auf null, deaktiviert Gravity, moves und Body bis zum Scene-Restart; Spielerposition bleibt erhalten. Kein Slide-/Weiterlauf-Tween. Tests: GoalFinish und `e2e/goal-finish.test.ts`.
- `CameraRules.ts` erhält die Vorwärtskamera für alte Level und erlaubt bei `LevelData.cameraMode: 'bidirectional'` (alle zwölf Rewrites) sichtbare Rückwege. Tests: CameraRules, VarietyRollout, VarietyTraversal, VarietyNature/Challenge/Vertical und `e2e/level-variety.test.ts`. Keine neue Pflicht-Sonderaktion; alle Wege müssen ohne Mover lösbar bleiben.
- `GoalRules.ts` kombiniert Münzen, Zeit und Boss-HP. Gesperrte Fahnen behalten ihren Overlap-Body aktiv; `reachGoal` guardiert den Abschluss und zeigt gedrosseltes Kontaktfeedback (1500 ms Game-Time). HUD und lokales Schild nennen fehlende Münzen. `CameraRules` erlaubt auch bei gesetztem coinGoal Rückwege; L1-5 bleibt bei 25 Münzen. Tests: GoalGateFeedback, GoalFinish, CameraRules und Elements-T5. L90-Flagge erst nach Boss-Sieg; HP-Bar und Grafikreferenzen bei Restart zurücksetzen.
- Welt/Kamera-Höhe ist max(GAME_HEIGHT, level.height), Hintergründe bleiben bildschirmfüllend. Direkte Steuerung auf Normalboden und in der Luft bleibt unverändert.
- Physik-Solver: signed deltaY auch bei Aufwärtssprüngen; maximale Aufstiegshöhe min(350, v²/(2g)). Kein Level darf Auto-Fixer-Plattformen benötigen.

## Zusätzliche klassische Rollen
- `classicExpansion.ts` ergänzt 24 kuratierte Level deterministisch; keine Pflichtgeometrie ändern, L1/L2/L11/L90 bleiben unverändert.
- `parakoopa`: erster Stomp entfernt Flügel. `buzzy_beetle`: feuerfest, Stomp macht eigenen Panzer. `bobomb`: Stomp/Feuer zündet 1500 ms Game-Time-Lunte, 90 px Explosionsradius; Boss ausnehmen.
- `LevelData.vines`: `{x,y,height}`, y ist der Fuß. `fireBars`: `{x,y,length,angularSpeed?,phase?}` (rad/s, Radiant, 16 px Kugelabstand). `redCoinChallenges`: `{x,y,coins,durationMs?,reward?}`.
- `ClassicElements` nach Player-Setup anlegen; `handleClimbing` vor `stepJump`, Klettern unterdrückt normalen Sprung, Z-Absprung markiert externen Launch. `update(delta)` nur im aktiven Spiel; Shutdown zerstört Gruppen/Collider idempotent und reaktiviert keinen toten Spieler.
- Neue Assets: `src/art/classicAssets.ts`, alle Animationsphasen in gleicher nativer Größe. Neue Tests: ClassicAssets, ClassicEnemyRules, ClassicElements, ClassicExpansion und `e2e/classic-expansion.test.ts`.

## Aktuelle Priorität: Levelvarianz
- Vor weiteren Leveländerungen `docs/LEVEL_VARIETY_ANALYSIS.md` und Phase 13 in LEVEL_PLAN lesen. Rewrites müssen den Hauptweg und die tatsächlichen Spieleraufgaben unterscheiden, nicht ausschließlich Bonusobjekte auf bestehende Geometrie legen.
- Die alte Sechs-Slot-Abfolge je Welt ist kein Designziel für neue Rewrites. Weniger Standardausstattung mit Federn/Stacheln/Movern ist erwünscht; bestehende Verteilungstests beim konkreten Rewrite samt Anforderungen aktualisieren, harte Pins erhalten.
- Kompakte Vertikal-, Raum-, Verzweigungs- und Abstiegslevel sind zulässig. Zahlen zu Breite, Elementen oder Höhen ersetzen keine Playtests. Phase 13 ist für zwölf Level umgesetzt: `src/data/levels/variety/` ersetzt die Hauptwege nach ClassicExpansion vollständig; `LEVEL_IDENTITIES` listet IDs und Ideen. Die übrigen 78 Level bleiben unverändert. Alte Nature-/Challenge-Landmarktests gelten nur außerhalb der Rewrites.

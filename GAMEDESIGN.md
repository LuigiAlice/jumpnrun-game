# Jump & Run Game - Game Design Document

## Projektübersicht
- **Name**: Jump & Run Abenteuer
- **Typ**: 2D Browser-Platformer (wie Super Mario)
- **Core-Feature**: 90 deterministische, garantiert lösbare Level
- **Zielgruppe**: Casual Gamer

## Technologie
- TypeScript + Vite + Phaser 3 + Vitest (ES Modules)
- Arcade Physics
- Alle Texturen prozedural generiert (BootScene)

## Physik-Konstanten

```
TILE_SIZE:           32
GRAVITY:             2000
JUMP_VELOCITY:       -900
MAX_JUMP_DISTANCE:   800px (horizontal)
MAX_JUMP_UP:         350px (vertikal)
MAX_FALL_DOWN:       1000px (vertikal)
PLAYER_MOVE_SPEED:   300
```

## Steuerung

| Taste | Aktion |
|-------|--------|
| ← → | Bewegen |
| ↑ | Springen |
| X / Space | Schießen (Fire Mario) |
| R | Level neustarten |
| N | Nächstes Level |
| ESC | Zurück zum Titelmenü |

## Spieler-Zustände

| Zustand | Größe (body) | Texture | Verhalten |
|---------|-------------|---------|-----------|
| Small Mario | 22x32 | player_idle | Normal |
| Big Mario | 24x48 | player_big | Kann Gegner stompen, QB-Inhalt triggern |
| Fire Mario | 24x48 | player_fire | Kann Feuerbälle schießen (alle 250ms) |

## Power-ups (Question Blocks)

| Item | Wirkung | Punkte |
|------|--------|--------|
| coin | +200 Coins | 100 |
| mushroom | Big Mario (y -= 16 beim Aktivieren) | - |
| flower | Fire Mario | - |
| star | Unverwundbarkeit (5s) | - |

## Spieler-Leben & Tod

- **3 Leben** beim Start
- **Unverwundbarkeit**: 2s nach Treffer (mit Blinken)
- **Tod durch**: Enemy-Kontakt (nicht-stompbar/seitlich), Lava, Timer-Ablauf, Fall unter Level
- **Level-Restart**: R-Taste oder nach Tod (kostet ein Leben)
- **Game Over**: Leben = 0 → GameOver-Szene

## Fragezeichen-Blöcke (Question Blocks)

- **Mindestabstand**: 56px zwischen QB-Oberseite und darüberliegender Plattform (Big Mario = 48px + 8px Buffer)
- **Triggern**: Spieler muss von UNTEN springen (player.body.touching.up && block.body.touching.down)
- **Inhaltstypen**: `coin`, `mushroom`, `flower`, `star`
- **Nach Benutzung**: Wechselt zu `question_used` Texture

## Kamera

- Folgt Spieler horizontal (smooth lerp: 0.1)
- Bounds: 0, 0, level.width, GAME_HEIGHT
- Canvas: 1200x800 (FIT Skalierung, keine Verzerrung)
- Parallax-Hintergrund: 7 Layers pro Biome (scrollFactors: 0 - 0.4)

## Gegner-Typen

### Stompbare Gegner (Spieler springt von oben drauf → +500 Punkte)

| Typ | Verhalten |
|-----|-----------|
| goomba | Läuft hin und her |
| koopa | Läuft hin und her |
| spiny | Läuft hin und her |
| robot | Läuft hin und her |
| crab | Läuft seitlich |
| ghost | Schwebt, verfolgt Spieler |
| squid | Wasser-Gegner |
| ufo | Fliegt |

### Nicht-stompbare Gegner (tödlich bei Kontakt)

| Typ | Verhalten |
|-----|-----------|
| piranha | Kommt aus Röhren (Pipes) |
| thwomp | Fällt auf Spieler |
| boo | Schwebt |
| lakitu | Fliegt |
| bullet_bill | Fliegt von rechts |
| fireball | Feuergeschoss (auch von Spieler) |
| boss | Endboss |

### Piranha-Pflanzen Mechanik

| Phase | Dauer |
|-------|-------|
| Aufsteigen | 1500ms |
| Oben bleiben | 3000ms |
| Absteigen | 1500ms |
| Pause | 2000ms |

- **hiddenY**: PipeTopY + 35
- **peekY**: PipeTopY - 50
- Müssen immer mit einer Pipe-Plattform verbunden sein

### Enemy-Edge-Detection
- Boden-Gegner (velocity != 0) erkennen Kanten und drehen um
- Floating-Enemies haben keine Edge-Detection

## Plattform-Typen

### Feste Plattformen (Solid)
`grass` `stone` `brick` `cave` `castle` `metal` `lava` `wood` `sand` `snow` `ruins` `space` `sandstone` `ground` `cloud` `water` `bubble`

- Solid-Plattformen: Enemies kollidieren und drehen um
- Lava = sofortiger Tod für Spieler

### One-Way Plattformen
`platform_easy` `platform_medium` `platform_hard`

- Spieler kann nur von oben landen, nicht von unten durchspringen
- Enemies können von allen Seiten kollidieren

### Spezielle Plattformen
`pipe` (64x64) - Röhren für Piranhas
`pipe_top` (80x24) - Röhren-Lippe, muss über pipe sein

## Bewegliche Plattformen

| MoveType | Bewegung |
|----------|----------|
| horizontal | `sin(time * 0.00002 * speed) * range` |
| vertical | `sin(time * 0.00002 * speed) * range` |
| circular | `cos/sin` mit `angle += speed * 0.0002` |

- Spieler wird mitgetragen (Position + Velocity)
- Keine Gravity, immovable Body
- **In ALLEN 90 Leveln vorhanden**

## Level-Struktur

### 90 Level, 15 Biomes, 6 Levels pro Biome

| Biome | Levels | Plattformen | Dekorationen |
|-------|--------|-------------|--------------|
| grasslands | 1-6 | grass, dirt | tree, bush |
| desert | 7-12 | sand, sandstone | cactus, rock, skull, pyramid |
| water | 13-18 | bubble, water | seaweed, bubble, coral, shell |
| ice-snow | 19-24 | snow, ice | snowflake, icicle, iceberg, penguin |
| sky-clouds | 25-30 | cloud | balloon, bird, sun, rainbow |
| forest | 31-36 | grass, dirt, wood | tree, bush, mushroom, log, vine |
| village | 37-42 | grass, dirt, brick | house, fence, barrel |
| beach-island | 43-48 | sand | palm, seagull, shell |
| factory | 49-54 | metal, brick | conveyor, crane, gear, smoke |
| volcano-lava | 55-60 | lava, stone | fire, ember, lava-rock |
| haunted-mansion | 61-66 | stone, brick | cobweb, tombstone, web, ghost |
| ruins | 67-72 | ruins, stone | pillar, statue, moss |
| canyon-base | 73-78 | stone, sandstone | canyon-rock, formation, eagle |
| space-star | 79-84 | space, metal | planet, rocket, asteroid, satellite |
| castle-final | 85-90 | castle, brick | banner, chain, torch, boss-flag |

### Level-Anforderungen
- Alle 90 Level garantiert lösbar (BFS-Pathfinding in Physics.ts)
- Jedes Level hat: Platforms, Coins, QuestionBlocks, Enemies, Decorations, MovingPlatforms, playerStart, goal, timeBonus
- HUD zeigt: `World-Level` (z.B. `1-1`, `9-3`), Score, Coins, Time, Lives
- BFS Solver berücksichtigt sowohl statische als auch bewegliche Plattformen
- alle Coins und Plattformen und QBs sind erreichbar vom Spieler

## Punkte & Scoring

| Aktion | Punkte |
|--------|--------|
| Münze sammeln | 100 |
| Gegner stompen | 500 |
| QB-Inhalt erhalten | 200 |
| Level abschließen | 1000 + Time Bonus |
| Time Bonus | max 120 pro Level |

## Audio

- **Jedes Biom** hat eigene Musik (Web Audio API, prozedural generiert)
- **Instrumente**: Melody (triangle), Bassline (square), Drums (triangle)
- **Loop-Dauer**: ca. 100 Sekunden

## Level Solver (Physics.ts BFS)

- BFS-Pathfinding mit `isSolvable()`, `findPath()`, `getReachablePlatforms()`
- Berücksichtigt Moving Platforms (32 diskrete Positionen, volle 360° Abdeckung)
- Prüft: MAX_JUMP_DISTANCE, MAX_JUMP_UP, MAX_FALL_DOWN
- `findPlatformUnderPoint()` findet Start-Plattform

## Hilfsfunktionen (Level-Generierung)

```
createPlat(x, y, w, h, type)  - Plattform
createCoin(x, y)              - Münze
createQB(x, y, contents)      - Fragezeichen-Block
createEnemy(x, y, type)       - Gegner
createDeco(x, y, type)        - Dekoration
createGoal(x, y, pts, diff)   - Ziel
createMovingPlat(x, y, w, h, type, moveType, range, speed) - Bewegliche Plattform
```

## UI/Menüs

- **Titelmenü**: Biome-Auswahl (Tabs), Level-Buttons, Steuerungsinfo
- **HUD**: Score, Coins, World, Time, Lives (oben)
- **Game Over**: Score-Anzeige
- **Level Clear**: Auto-Übergang zum nächsten Level (+1000 Punkte)

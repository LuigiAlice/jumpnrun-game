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

## Physik-Konstanten (Standard)

```
TILE_SIZE:           32
GRAVITY:             2000 (Standard)
JUMP_VELOCITY:       -900
MAX_JUMP_DISTANCE:   800px (horizontal)
MAX_JUMP_UP:         350px (vertikal)
MAX_FALL_DOWN:       1000px (vertikal)
PLAYER_MOVE_SPEED:   300
```

### Biome-Gravitation (überschreibt GRAVITY)

| Biome | Gravity |
|-------|---------|
| space-star | 1000 |
| sky-clouds | 1500 |
| water | 1200 |
| beach-island | 1500 |
| volcano-lava | 2200 |
| Alle anderen | 2000 |

### Eis-Rutsch-Effekt (ice-snow)
- Spieler behält horizontale Velocity beim Loslassen (body.velocity.x * 0.92)
- Kein sofortiger Stopp wie auf anderen Plattformen

### Schwimmen (water biome)
- Aktiv bei `body.y > 500`
- Gravity reduziert auf 600 (via `body.setGravityY`)
- `cursors.up` → `vY = -250`
- Horizontale Trägheit: `vX * 0.95` pro Frame

## Steuerung

| Taste | Aktion |
|-------|--------|
| ← → | Bewegen |
| ↑ | Springen / Schwimmen (Wasser) |
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

## Sprungfedern (`springs`)

| Eigenschaft | Wert |
|-------------|------|
| Texture | `spring` (32×20) |
| Position | y = Plattform-Oberkante (Feder-Body 28×12 top-aligned) |
| Launch | `SPRING_VELOCITY = -1350` → Sprunghöhe ~455px (vs. normal ~202px) |
| Feedback | Squash-Tween (scaleY 0.6→1, 120ms) + Sound |
| Regel | Bonus-Element — Solver kennt Federn nicht, Level müssen ohne Feder lösbar bleiben |

## Stachel-Fallen (`spikes`)

| Eigenschaft | Wert |
|-------------|------|
| Texture | `spike` (24×16, 3 Zacken) |
| Position | y = Plattform-Oberkante − 8 (Sprite-Zentrum) |
| Schaden | Overlap → sofortiger Tod (`die()`, wie Lava) |
| Design-Regeln | ≥ 96px Abstand zu QBs/Goal, ≥ 150px zu playerStart, nie über Lücken, nie auf Moving-Platforms, max 1 Sprite pro Position |

## Zerstörbare Bricks

- Big Mario zerbricht 'brick'-Plattformen beim Sprung von unten (`canBreakBrick()`) → +50 Punkte, Debris-Partikel
- Small Mario: nur Bonk (Wobble)
- **Load-Bearing-Schutz**: Bricks, deren Fehlen das Level unlösbar machen würde, zerbrechen nicht (`isBrickLoadBearing()`, on-demand BFS ~50-100ms pro Bonk) — Wobble-Tween stattdessen

## Münz-Tor (`coinGoal`)

- Optional in LevelData: Goal-Flag bleibt inaktiv (alpha 0.4, Body disabled) bis `coins >= coinGoal`
- HUD-Hint: "Coins: X / Y" → "Gate offen!" + Glow-Tween + Arpeggio
- Regeln: `coinGoal ≤ Coins im Level` (~60-70% der Coins empfohlen)

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
| goomba | Läuft hin und her (edge-detection) |
| koopa | Läuft hin und her |
| spiny | Läuft hin und her (auch Lakitu-Eier) |
| robot | Läuft hin und her |
| crab | Läuft seitlich |
| ghost | Schwebt, folgt Spieler langsam (+ Sinus-Bob) |
| squid | Schwebt im Wasser, folgt Spieler (+ Bob) |
| ufo | Schwebt, folgt Spieler langsam (+ Bob) |

### Nicht-stompbare Gegner (tödlich bei Kontakt)

| Typ | Verhalten |
|-----|-----------|
| piranha | Kommt aus Röhren (Pipes), auf/ab Tween |
| thwomp | Startet unbeweglich, fällt wenn Spieler drunter, tweened zurück |
| boo | Schwebt, erstarrt wenn Spieler hinschaut, folgt wenn wegschaut |
| lakitu | Schwebt über Spieler, folgt X-Achse, wirft Spiny-Eier alle 3s |
| bullet_bill | Fliegt von rechts (konstante Geschw.) |
| fireball | Feuergeschoss (auch von Spieler) |
| boss | 3 HP, schiesst zielsuchende Feuerbälle alle 2s, nur Fireballs schaden |

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

### Enemy-Geschwindigkeit (biome-abhängig)

| Biome | Speed |
|-------|-------|
| Default | 80 |
| factory | 100 |
| volcano-lava | 100 |
| ruins | 110 |
| canyon-base | 120 |
| space-star | 100 |
| castle-final | 130 |

## Plattform-Typen

### Feste Plattformen (Solid)
`grass` `stone` `brick` `cave` `castle` `metal` `wood` `sand` `snow` `ruins` `space` `sandstone` `ground` `cloud` `water` `bubble`

- Solid-Plattformen: Player + Enemies kollidieren von allen Seiten
- Enemies drehen um bei Kanten

### Lava-Plattformen
`lava`

- NICHT in SOLID_TYPES (in `this.platforms`-Gruppe)
- Berührung → sofortiger Tod (`this.die()`)
- Auch für Rising-Lava-Mechanik genutzt

### One-Way Plattformen
`platform_easy` `platform_medium` `platform_hard`

- Spieler kann nur von oben landen (checkCollision.down/left/right = false)
- Enemies kollidieren von allen Seiten

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

> **Level-Upgrade-Status (Pilot)**: grasslands (1-6) und desert (7-12) sind mit dem neuen Element-Mix aufgebaut (Springs, Spikes, Breakable Bricks, Coin-Muster, variierte Moving-Plats, 2 coinGoal-Level). Die restlichen 13 Biome folgen (s. LEVEL_PLAN.md Phase 6b).

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

### Biome-Finale Mechaniken

| Level | Biome | Mechanik |
|-------|-------|----------|
| L6 | grasslands | Windböen (seitlicher Schub alle 3s) |
| L12 | desert | Fallende Hindernisse (Fireball-Textur) |
| L18 | water | Steigendes Wasser (Plattform von unten) |
| L24 | ice-snow | Fallende Eiszapfen |
| L30 | sky-clouds | Bröckel-Plattformen (800ms, 3s Respawn) |
| L36 | forest | Fallende Äste |
| L42 | village | Windböen |
| L48 | beach-island | Steigende Flut |
| L54 | factory | Fallende Hindernisse |
| L60 | volcano-lava | Steigende Lava (0.4px/Frame) |
| L66 | canyon-base | Fallende Felsen |
| L72 | ruins | Bröckel-Plattformen |
| L78 | space-star | Bröckel-Plattformen |
| L84 | haunted-mansion | Bröckel-Plattformen |
| L90 | castle-final | Bosskampf (HP-Bar, Projektile, Arena-Wände) |

### Secret Rooms
- **15 Stück** (eines pro Biome, im 1. Level)
- Bestehend aus 1 Plattform + 3–5 Coins + optionalem QB
- Physikalisch erreichbar innerhalb MAX_PRACTICAL_JUMP

### Level-Anforderungen
- Alle 90 Level garantiert lösbar (BFS-Pathfinding in Physics.ts)
- Jedes Level hat: Platforms, Coins, QuestionBlocks, Enemies, Decorations, MovingPlatforms, playerStart, goal, timeBonus
- HUD zeigt: `World-Level` (z.B. `1-1`, `9-3`), Score, Coins, Time, Lives
- BFS Solver berücksichtigt sowohl statische als auch bewegliche Plattformen
- Alle Coins und Plattformen und QBs sind erreichbar vom Spieler (0 unreachable QBs)

## Biome-Partikel-Effekte

| Biome | Partikel | Farbe |
|-------|----------|-------|
| volcano-lava | Asche | orange (#ff4400) |
| ice-snow | Schnee | weiss (#ffffff) |
| space-star | Sternenstaub | blau (#88ccff) |
| sky-clouds | Wolken | hellblau (#eeeeff) |
| haunted-mansion | Nebel | lila (#9966cc) |

## Dekorations-Animationen

| Type | Animation |
|------|-----------|
| fire / ember | Flackern (scaleX 0.8–1, scaleY 1–1.2, alpha 0.8–1) |
| bubble / seaweed | Schweben (y -= 6, Sine-Ease, random delay) |
| ghost / cobweb | Pulsieren (alpha 0.5–1, Sine-Ease) |

## Background-Animation
- **water / beach-island**: tilePositionY scrollt (Welle)
- **sky-clouds / space-star**: tilePositionX scrollt (Parallax)

## Punkte & Scoring

| Aktion | Punkte |
|--------|--------|
| Münze sammeln | 100 |
| Gegner stompen | 500 |
| Boss-Treffer (Fireball) | 200 |
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
- **Boss-HP-Bar**: Graphics-Rectangle (L90, über HUD, Depth 1001)
- **Game Over**: Score-Anzeige
- **Level Clear**: Auto-Übergang zum nächsten Level (+1000 Punkte)

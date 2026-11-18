# Jump & Run Game - Game Design Document

> Anforderungen mit Test-Traceability (R-001 ff.): [REQUIREMENTS.md](REQUIREMENTS.md)

## Projektübersicht
- **Name**: Jump & Run Abenteuer
- **Typ**: 2D Browser-Platformer (wie Super Mario)
- **Core-Feature**: 90 deterministische, garantiert lösbare Level
- **Zielgruppe**: Casual Gamer

## Technologie
- TypeScript + Vite + Phaser 3 + Vitest (ES Modules)
- Arcade Physics
- Alle Texturen prozedural generiert (BootScene + src/art/pixelAssets.ts)

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

### Klassisches Plattformspiel-Gefühl
- Direkte horizontale Steuerung: sofortige Lauf-/Sprintgeschwindigkeit, sofortiger Stopp beim Loslassen und sofortiger Richtungswechsel; gilt auch in der Luft.
- Laufen 300 px/s, Sprint mit Shift 400 px/s; Solver und Level bleiben auf 300 px/s ausgelegt.
- Sprung nur auf neuen Tastendruck (kein automatisches Dauerspringen), 90 ms Kulanz nach einer Kante und 120 ms Eingabepuffer vor Landung.
- Loslassen begrenzt eigene Aufwärtsgeschwindigkeit einmalig auf −360 px/s; Federn und Stomp-Bounces behalten ihren Impuls.
- Trägheit und Beschleunigung nur bei Bodenkontakt auf einer echten `ice`-Plattform; alle anderen Flächen einschließlich Schnee steuern direkt.
- Seitliche Pixelfigur, feste Lauf-Silhouette, scharfe Pixel ohne Texturfilterung; lesbare Fragezeichen- und Münzgrafik.

### Eis-Rutsch-Effekt (`ice`-Plattformen)
- Nur auf `ice`: Beschleunigung, allmähliches Umkehren und Ausgleiten beim Loslassen (×0.96 pro 60-Hz-Frame, über Game-Time normalisiert).
- `snow` und andere Plattformen im ice-snow-Biom bleiben griffig; nach dem Absprung gilt sofort wieder direkte Luftsteuerung.

### Schwimmen (water biome)
- Aktiv bei `body.y > 500`
- Gravity reduziert auf 600 (via `body.setGravityY`)
- `cursors.up` → `vY = -250`
- Horizontale Trägheit: `vX * 0.95` pro Frame

## Steuerung

| Taste | Aktion |
|-------|--------|
| ← → | Bewegen |
| ↑ / Z | Springen / Schwimmen (Wasser); halten = voller Sprung, kurz drücken = flacher Sprung |
| Shift | Sprinten (400 px/s statt 300 px/s) |
| ↑ / ↓ an Lianen | Klettern / absteigen; Z springt ab, ←/→ verlässt die Ranke |
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

## Level-Elemente Phase 9 (datengetrieben)

Alle Elemente sind optional in `LevelData`, solver-agnostisch und dürfen nie Pflichtweg sein:

| Element | LevelData | Verhalten |
|---------|-----------|-----------|
| **Crumble-Plattformen** | `Platform.crumble: true` | 800ms nach Betreten bröckeln, 3s Respawn; Finale-Biome sky/ruins/canyon/space; jede Stelle hat sichere Alternativroute |
| **Eis-Plattformen** | `PlatformType 'ice'` | Nur bei Bodenkontakt: Beschleunigung/Trägheit und Rutschfaktor ×0.96 (zeitnormiert); `snow` bleibt griffig |
| **Förderbänder** | `Platform.conveyor: px/s` | Schiebt den Spieler beim Stehen (positiv = rechts); factory-Level, beide Richtungen |
| **Checkpoints** | `checkpoints: {x,y}[]` | Overlap aktiviert Respawn-Punkt (Flagge wird gelb); nach Tod Respawn dort, weiterhin 1 Leben Abzug; Pflicht ab width ≥ 16000 |
| **Wind-Zonen** | `windZones: {x,y,w,h,strength,intervalMs}[]` | Periodischer seitlicher Schub (Default alle 3s, ±strength) nur innerhalb des Rechtecks; transluzente Markierung |
| **Wasser-Zonen** | `waterZones: {x,y,w,h}[]` | Aktiviert Schwimm-Physik (Gravity 600, ↑ −250, Drift ×0.95) innerhalb des Rechtecks; bläuliches Overlay |
| **Schlüssel & Türen** | `keys: {x,y}[]`, `doors: {x,y,w,h}[]` | Alle Schlüssel sammeln öffnet sämtliche Türen (Alpha 0.2, Body disabled); nur Bonusräume, nie Start/Goal blockierend |
| **Kanonen** | `cannons: {x,y,dir,intervalMs,speed}[]` | Feuern tödliche Projektile (Default alle 2,5s); Schusslinien nie direkt auf Pflicht-Landeplätze |
| **Zeit-Tor** | `timeGate: number` | Goal bleibt gesperrt, bis X Sekunden vergangen sind; HUD-Countdown "Zeit-Tor: Xs" |
| **Multi-Goal** | `goals: Goal[]` | Zusätzliche goldene Flaggen mit eigenen Punkten; Berühren beendet das Level mit Bonus |
| **1-UP-Block** | `QuestionBlockContent 'oneup'` | QB gibt +1 Leben (1-UP-Popup + Arpeggio) |
| **Geheim-Bricks** | `hidden`, `brick_secret`, `brick_multi` | `hidden` wird beim Bonk sichtbar (+Münze), `brick_secret` gibt Münze, `brick_multi` mehrfach (300ms Cooldown) |

- Steigende Lava/Flut (L60/L18/L48) ist datengetrieben (`rising: { kind: 'lava' | 'water', speed? }`), folgt dem Spieler mit Chase-Abstand 560px und kann ihn nicht einkesseln; Flut (`kind: 'water'`) ist reitbar/nicht tödlich — nur Lava (`kind: 'lava'`) tötet bei Berührung
- Crumble via `Platform.crumble`, Windböen via `windZones`, fallende Hindernisse via `fallingHazards`-LevelData-Feld — keine Level-ID-Hardcodes

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
- Bounds: 0, 0, level.width, max(GAME_HEIGHT, level.height); Startkamera zentriert den Spieler auch in tiefen Leveln.
- Canvas: 1200x800 (FIT Skalierung, keine Verzerrung)
- Parallax-Hintergrund: 7 bildschirmfeste Layers pro Biome; die Texturen scrollen mit Faktor 0–0.4 innerhalb der Flächen, damit lange Level keine Hintergrundlücken bekommen.

## Gegner-Typen

Spiny ist wegen seiner Stacheln nicht stompbar. Koopa: Stomp → eigener Panzer; laufenden Panzer von oben stoppen, seitlich kicken. Treffer-Schutz verhindert Schaden, nur ein Stern besiegt Gegner durch Berührung.

### Stompbare Gegner (Spieler springt von oben drauf → +500 Punkte)

| Typ | Verhalten |
|-----|-----------|
| goomba | Läuft hin und her (edge-detection) |
| koopa | Läuft hin und her |
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

- Spieler wird mitgetragen — ausschliesslich positionsbasiert (`setX`/`setY`); `body.velocity` wird dabei nie überschrieben (Bugfix „Figur klebt auf dem Mover", R-057)
- Keine Gravity, immovable Body
- **In ALLEN 90 Leveln vorhanden**

## Level-Struktur

### 90 Level, 15 Biomes, 6 Levels pro Biome

> **Level-Upgrade-Status (Phase 6b — ABGESCHLOSSEN)**: ALLE 15 Biome (90 Level) sind mit dem Element-Mix aufgebaut (Springs, Spikes, Breakable Bricks, Coin-Muster, variierte Moving-Plats, coinGoal-Levels; L90-Bossarena elementefrei). Invariant-Tests über alle 90 Level: `tests/ElementMix.test.ts`.

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
| L66 | haunted-mansion | Fallende Hindernisse |
| L72 | ruins | Bröckel-Plattformen |
| L78 | canyon-base | Bröckel-Plattformen |
| L84 | space-star | Bröckel-Plattformen |
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

- **15 eigenständige handkomponierte Biome-Songs** (`src/audio/biomeMusic.ts`), mit eingängigen Motiven, Antwortphrasen und Hook-Reprise in Takt 9; 16 Takte × 16 Steps. Keine Nintendo-Melodien.
- **Tondauern**: `melodyDurations` erhält die komponierten Notenlängen in Steps; 0 im Melodie-Track bedeutet Pause oder Fortsetzung ohne neuen Anschlag. Längere Noten klingen tatsächlich aus.
- **Arrangement pro Biom**: `arpEverySteps`, `percussionGain`, `leadGain`, `padGain`, `delaySend` steuern Dichte und Mischung. Die Melodie bleibt vorn, ruhige Biome haben weniger Schlagzeug und mehr Raum.
- **Harmonie**: Bassfiguren berücksichtigen Dur/Moll; Akkordflächen wechseln einmal pro Takt, statt sich vierfach über Akkordwechsel zu überlagern.
- **Klang**: weich gefilterter Lead, zurückhaltendes Arpeggio, warmer Bass und leichte Percussion; Delay folgt dem Songtempo.
- **Scheduler**: `src/audio/musicPlayer.ts` — Lookahead-Scheduling (25ms-Poll, 0.12s Ahead) auf exakter `ctx.currentTime`-Timeline. Audio-Knoten werden bei Ende/Stop freigegeben; Percussion-Noise verwendet einen festen Seed.
- **SFX** separat via GameScene playNote/playChord (Coin, Gate-Arpeggio, QB).
- Start bei erstem User-Input (AudioContext-Resume), Stop bei Tod/Pause/Levelwechsel.

| Biom | Musikalische Stimmung |
|------|-----------------------|
| grasslands | Fröhlich, federnd, einprägsame Abenteuermelodie |
| desert | Geheimnisvoll, orientalisch gefärbte Melodik |
| water | Fließend, sanft und schwebend |
| ice-snow | Glitzernd, leicht und klar |
| sky-clouds | Luftig, aufsteigende Melodiebögen |
| forest | Warm, verspielt und märchenhaft |
| village | Gemütlich, tänzerisch und freundlich |
| beach-island | Sonnig und beschwingt |
| factory | Rhythmisch, präzise und vorwärtsdrängend |
| volcano-lava | Treibend und spannungsvoll |
| haunted-mansion | Gespenstisch und zurückhaltend |
| ruins | Geheimnisvoll und erkundend |
| canyon-base | Weit, abenteuerlich und beweglich |
| space-star | Funkelnd, ruhig und schwerelos |
| castle-final | Dramatisch, entschlossen und melodisch |

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
createGoal(x, y, pts)         - Ziel
createMovingPlat(x, y, w, h, type, moveType, range, speed) - Bewegliche Plattform
```

## UI/Menüs

- **Titelmenü**: Biome-Auswahl (Tabs), Level-Buttons, Steuerungsinfo
- **HUD**: Score, Coins, World, Time, Lives (oben)
- **Boss-HP-Bar**: Graphics-Rectangle (L90, über HUD, Depth 1001)
- **Game Over**: Score-Anzeige
- **Level Clear**: Auto-Übergang zum nächsten Level (+1000 Punkte)

## Landschaft, Pixelgrafik und Dramaturgie

- `src/art/pixelAssets.ts` erzeugt einheitliche Pixelgrafiken: Laufphasen für fünf Bodengegner, eigener Koopa-Panzer, Piranha- und Boo-Zustände, vier Münzphasen sowie lesbare Power-ups.
- `src/rendering/terrain.ts` kachelt Bodenflächen in nativer Pixelgröße; Deckkachel einmal oben, separate Füllkacheln darunter. Statische TileSprites behalten die vollständige Kollisionsfläche. Mover nutzen gleich große gekachelte Panels. Röhrenlippen verwenden `pipe_top`, Eis hat eine eigene Grafik.
- Welt 1 führt Gegnerrollen schrittweise ein. L2 ist 7300 px lang, mit sechs Goomba/Koopa, zusammenhängenden Hügeln, kurzen Lücken und einer begehbaren Bonusnische. Weitere Welt-1-Nischen und massive Erdflächen erhalten die optionalen Höhenwege.
- Alle weiteren 84 Level haben individuell gewählte Ruhe- und Belohnungsbereiche, biomtypische Gegner und Münzführungen; massives Terrain lässt untere Routen frei. L50/L55 besitzen zusätzliche Rettungswege, L61/L67/L85 Seitenkammern.
- Pilze laufen, Blumen bleiben stehen, Sterne hüpfen. Power-ups erscheinen zunächst über dem Block; die Physik startet nach dem Auftauchen. Versteckte Einzelblöcke geben nur einmal eine Münze.
- Piranhas bleiben bei Spielernähe in der Röhre; Game-Time-Zyklus: verborgen 1800 ms, aufsteigen 650 ms, offen 1400 ms, absteigen 650 ms.
- Röhrenzugang: ↓ auf dem Deckel; Prüfung anhand der Füße, für kleine und große Figur identisch. L1-Warps behalten ihre Ziellevel.
- L90: 7600 px, ein Boss mit 3 HP, keine Nebenpatrouillen. Feuerblumen sind auf dem Bodenweg erreichbar; verbrauchte Blumenblöcke regenerieren nach sechs Spielsekunden ohne Feuerkraft. Die Flagge bleibt bis zum Boss-Sieg gesperrt; HP-Bar skaliert auf die tatsächlichen Start-HP. Nach der letzten Flagge erscheint der Siegesbildschirm statt eines erneuten Bosslevels.
- Solver prüft Auf- und Abwärtssprünge mit vorzeichenrichtiger Ballistik. Aufstieg ist durch min(MAX_JUMP_UP, v²/(2g)) begrenzt; höhere Ziele erhalten keine fiktive Flugzeit. Alle 90 Level bestehen die Prüfung ohne automatische Zusatzplattformen.

## Klassische Figuren und Bonuselemente

In 24 ausgewählten Leveln ergänzen drei neue Gegnerrollen und drei optionale Elemente die vorhandenen Mechaniken. L1/L2 bleiben als Einführung übersichtlich, L11 behält seinen Gegner-Pin, L90 bleibt eine reine Bossarena. Das Level-Array wird deterministisch durch `classicExpansion.ts` ergänzt; die solide Pflichtgeometrie bleibt unverändert.

| Figur / Element | Verhalten |
|-----------------|-----------|
| Flügel-Koopa (`parakoopa`) | Schwebt auf einer festen vertikalen Bahn mit 48 px Amplitude. Erster Stomp entfernt Flügel und macht ihn zum normalen bodengebundenen Koopa; erst der nächste Stomp erzeugt einen Panzer. |
| Panzerkäfer (`buzzy_beetle`) | Läuft auf dem Boden, widersteht Feuerbällen und wird beim Stomp zu einem eigenen kickbaren Panzer. Bewegte Käferpanzer lassen sich wie Koopa-Panzer von oben stoppen. |
| Bombengegner (`bobomb`) | Stomp oder Feuerball zündet eine blinkende Lunte für 1500 ms Game-Time. Danach Explosion im Radius 90 px; Schaden am Spieler, andere normale Gegner werden besiegt, der Boss bleibt geschützt. |
| Lianen (`vines`) | Vier Kletterabkürzungen zu vorhandenen Bonuswegen. ↑/↓ klettert mit 180 px/s, loslassen hält; Z springt mit −450 px/s ab, seitliche Richtung verlässt die Ranke sofort. Außerhalb der Ranke bleibt die direkte Steuerung unverändert. |
| Feuerarme (`fireBars`) | Vier rotierende Arme mit vier Kugeln im 16-px-Abstand, langsamer positiver oder negativer Winkelgeschwindigkeit. Kollision verursacht Schaden; Bodenweg darunter bleibt frei. |
| Rote Münzringe (`redCoinChallenges`) | Sechs Ringe starten 6–8 sichtbare rote Münzen und 10–14 Sekunden Game-Time. Alle sammeln gibt 1-UP oder 1000 Punkte; einzelne rote Münzen zählen regulär. Nach Ablauf kann nach Verlassen und erneutem Betreten des Rings wiederholt werden. Ein vollständig geschaffter Ring belohnt nur einmal pro Levelversuch. |

Neue Grafiken in `src/art/classicAssets.ts`: 18 maßgleiche Pixeltexturen für Figuren, Panzer, Statusbilder und Elemente. `ClassicElements.ts` verwaltet Lianen, Feuerarme, Challenges und Shutdown; `ClassicEnemyRules.ts` enthält testbare Regeln für Flügel, Feuerresistenz, Bombenlunte und Explosionsradius. Keine neue Mechanik sperrt das Levelziel oder wird für die Solver-Lösbarkeit vorausgesetzt.

# Level Design Plan: Vielfalt statt Gleichförmigkeit

## ✅ Phase 1: DRY - Helfer zentralisieren (ABGESCHLOSSEN)

`helpers.ts` erweitert um:
- `gapWithPlatforms(S, startX, baseY, gapWidth, count)` - gestaffelte Plattformen über eine Lücke
- `pipeSection(S, startX, y, count)` - Pipe + PipeTop an regelmässigem Abstand
- `verticalClimb(S, startX, baseY)` - symmetrischer 7-Schritt-Bogen

Alle Biome-Dateien nutzen diese Helfer.

---

## ✅ Phase 2: 6 Level-Typen pro Biome (ABGESCHLOSSEN)

| Level | Typ | Struktur |
|-------|-----|----------|
| **1** | Tutorial | Linear: Ground → Ziel. Wenig Gegner, viel Platz zum Üben |
| **2** | Gap-Strecke | 4-5 große Lücken-Sektionen + 2-3 moving platforms dazwischen |
| **3** | Röhren-Labyrinth | 5-8 Pipe-Sektionen, viele Piranhas, vertikale Pipe-Ausgänge |
| **4** | Vertikal-Kletterer | 3-4 verticalClimb Sektionen, Plattformen in vielen Höhen |
| **5** | Gegner-Horde | 15-20 Gegner, einfachere Plattformen, Kampf-Fokus |
| **6** | Biome-Finale | Einzigartige Challenge pro Biome (s. Phase 3) |

---

## ✅ Phase 3: Finale-Level pro Biome (ABGESCHLOSSEN)

| Biome | Level 6 Name | Mechanik |
|-------|-------------|----------|
| **grasslands** | Grasslands Dash | Windböen (seitlicher Schub alle 3s) |
| **desert** | Desert Finale | Fallende Hindernisse (Feuerbälle von oben) |
| **water** | Water Finale | Steigendes Wasser von unten |
| **ice-snow** | Frozen Finale | Fallende Eiszapfen |
| **sky-clouds** | Cloud Islands Finale | Bröckel-Plattformen |
| **forest** | Forest Finale | Fallende Äste |
| **village** | Village Finale | Windböen |
| **beach-island** | Beach Finale | Steigende Flut |
| **factory** | Factory Finale | Fallende Hindernisse |
| **volcano-lava** | Krater-Finale | Steigende Lava (0.4px/Frame) |
| **haunted-mansion** | Haunted Finale | Fallende Hindernisse |
| **ruins** | Fallender Tempel | Bröckel-Plattformen (800ms, 3s Respawn) |
| **canyon-base** | Felssturz-Finale | Bröckel-Plattformen |
| **space-star** | Space Finale | Bröckel-Plattformen |
| **castle-final** | Final Boss Arena | Bosskampf (HP-Bar, Projektile, Arena-Wände) |

---

## ✅ Phase 4: Biome-Mechaniken (ABGESCHLOSSEN)

| Biome | Mechanik | Implementierung |
|-------|----------|----------------|
| **ice-snow** | Rutschige Plattformen | `body.velocity.x * 0.92` bei Loslassen |
| **water** | Schwimmen | Gravity 600, `vY = -250` per up, Drift `vX * 0.95` |
| **space-star** | Low-Gravity | world gravity = 1000 |
| **sky-clouds** | Wind + Bröckel | Wind in Finale, Background-Animation |
| **volcano-lava** | Lava-Schaden | `lava` nicht in SOLID_TYPES, Kollision → `die()` |
| **Alle Finals** | s. Phase 3 | Individuelle Mechanik pro L6/L12/L18/.../L90 |

---

## ✅ Phase 5: Secret Rooms (ABGESCHLOSSEN)

- **15 Secret Rooms** (eines pro Biome, im 1. Level)
- Bestehend aus 1 Plattform + 3–5 Coins + optionalem QB
- Erreichbar per Sprung innerhalb MAX_PRACTICAL_JUMP (585px)

---

## 🟡 Phase 6: Level-End-Varianten (TEILWEISE UMGESETZT)

| Typ | Beschreibung | Status |
|-----|-------------|--------|
| **Flaggen-Ziel** | Standard: Flagge am Ende des Levels (aktuell) | ✅ |
| **Boss-Ziel** | Boss besiegen → Flagge erscheint | ✅ (L90) |
| **Münzen-Tor** | X Münzen gesammelt → Tor öffnet sich (`coinGoal` in LevelData) | ✅ (25 Level) |
| **Zeit-Tor** | Ziel entsperrt erst nach X Sekunden (`timeGate`) | ✅ (L47 beach, L53 factory) |
| **Multi-Goal** | Mehrere Ziele mit unterschiedlichen Punktwerten (`goals`) | ✅ (L12 desert, L48 beach, L53 factory) |

---

## ✅ Phase 6b: Neue Level-Elemente (ALLE 15 Biome, ABGESCHLOSSEN)

Implementiert (Engine: GameScene/helpers/config, Tests: NewElements + PilotElements + ElementMix):

| Element | Daten | Mechanik |
|---------|-------|----------|
| **Sprungfeder** | `springs: {x,y}[]`, y = Plattform-Oberkante | Launch `SPRING_VELOCITY -1350` (~455px), Bonus-Element (Solver-agnostisch) |
| **Stachel-Falle** | `spikes: {x,y}[]`, y = Oberkante − 8 | Overlap → Tod; Design-Regeln: ≥96px zu QBs/Goal, ≥150px zu playerStart, max 24px breit |
| **Zerstörbare Bricks** | 'brick'-Plattform | Big Mario zerbricht von unten (+50); load-bearing Bricks wobble statt brechen (`isBrickLoadBearing`) |
| **Münz-Tor** | `coinGoal: number` | Goal gesperrt bis X Coins, HUD-Hint |

**Rollout ABGESCHLOSSEN**: Alle 15 Biome (90 Level) mit Element-Mix (≥3 Plattform-Typen, variierte Moving-Plats, Coin-Muster, Gegner-Mix, 0-4 Spikes, 1-2 Springs, 1-2 coinGoal-Level pro Biome). L90-Bossarena elementefrei. Runtime-E2E: `e2e/elements.test.ts` (Springs, Spikes, Bricks, Coin-Gate + Stomp-Regression). Globaler Invariant-Test: `tests/ElementMix.test.ts`.

---

## 🔜 Phase 7 (geplant): Difficulty Scaling

- Enemy-Dichte erhöht sich pro Biome (je weiter, desto mehr Gegner)
- Moving-Platform-Geschwindigkeit steigt
- Zeitbonus sinkt (~200 → ~100)

---

## 🔜 Phase 8 (geplant): Power-Up-Balance

- Fire-Mario in späteren Biomen häufiger
- Stern-Spawn-Rate anpassen
- Big-Mario-Pflichtpassagen (enge Röhren)

---

## 🔜 Phase 9 (Vorschlag): Level-Vielfalt — Befund & Massnahmen

### Befund (Ist-Stand, 90 Level)

- **Ein Rezept für alle**: Jedes der 15 Biome nutzt exakt dieselbe 6-Typen-Abfolge (Tutorial/Gap/Röhren/Vertikal/Horde/Finale) — Unterschiede nur über Plattform-Textur und Boden-y.
- **Eine Geometrie**: Pro Level ein Boden-y + feste Offsets (Ground h=40, Coins ≈ y−50 im 200px-Raster, Gegner/Deko y−40, Gap-Stufen −60/−80/−100). Keine Terrassen, Senken, Plateaus; nur achsenparallele Rechtecke.
- **Helfer-Wiederholung**: `gapWithPlatforms` >180×, `pipeSection` >45×, `verticalClimb` 19× mit jeweils identischer Geometrie. Extremfälle: sky L30 23× identische Brücken (`sky-clouds.ts:525-588`), forest L33 11× Gap + 6× Pipe (`forest.ts:208-250`), haunted 832 fast identische Bridge-Bricks, village L39 13× Gap (`village.ts:227-266`).
- **Biom-Mechanik unsichtbar**: water L13–15 liegen mit Ground y=500 oberhalb der Schwimmgrenze (`body.y > 500`); ice nur globaler Rutsch, `ice`-PlatformType 0× genutzt; factory-Conveyor reine Deko; space Low-Gravity geometrisch ungenutzt; castle-Arena nur L90.
- **Auto-Fix als Krücke**: `ensureSolvable()` patcht in der Stichprobe 13/24 Leveln Plattformen nach (u. a. castle L87 +4, ruins L72 +4) — die Level sind as-authored nicht vollständig solvable gebaut.

### Massnahmen

**Stufe 1 — Leveldaten (kein Engine-Risiko, Solver/Invarianten bleiben)**
- Pro Biom eigene 6 Archetypen statt globalem Rezept (z. B. water: Tauchgang/Strömung/Luftblasen/Grotte; factory: Förderband/Aufzug/Maschinenraum; ice: Rutschbahn/Eishöhle/Gletscherspalte).
- Terrain statt Linie: Terrassen, Plateaus, Senken, Gruben mit Rändern; Plattformbreiten 40–400px, Höhenstaffel 40–250px statt fixem 20px-Raster.
- Helfer entzerren: `gapWithPlatforms` mit Varianten (Breiten, dy-Muster, Typ-Mix) parametrisieren; neue Helfer `staircase`, `plateauSection`, `pitWithLedges`, `twoTierSection`, `islandCluster`, `zigzagClimb`, `overhang`.
- Dramaturgie: Spannungsbogen pro Level (ruhig → Hindernis → Belohnungsinsel → Eskalation → Finale), Risiko-Belohnung (High-Risk-Coins), Wahrzeichen pro Level.
- Coins entlang der Sprunglinie (Bögen, Rauten, Trails); Gegner als Wächter auf Plattformen, Patrouillen, Ambushes statt y=510-Linie.

**Stufe 2 — Daten + kleine Engine-Erweiterungen (mit Tests)**
- `ice`-PlatformType nutzen → Rutschen nur auf Eisflächen statt global.
- Crumble als LevelData-Feld statt Level-ID; Bugfix, damit L30/L78/L84 tatsächlich bröckeln.
- RisingWater für L18/L48 aktivieren (Movement generalisieren statt nur id 60).
- Conveyor-Kraft (vX-Boost) für factory-Level.
- `hidden`/`brick_secret`/`brick_multi` in Daten nutzen (Engine-Code existiert, 0× verwendet).
- `oneup` in QBs, mehr `circular`-Moving-Plats; totes `goals`-Feld nutzen (Multi-Goal) oder entfernen.

**Stufe 3 — grössere Features (optional)**
- Checkpoints bei 20k+-Leveln, Wind-/Wasser-Zonen als LevelData, Multi-Goal/Zeit-Tor, Schlüssel/Türen, Kanonen.

### Umsetzungsspezifikation (Rollout)

**Status**: ABGESCHLOSSEN — Engine + Typen + Tests + alle 15 Biome umgebaut. Verifikation: `tests/Phase9Features.test.ts` (28 Tests), `tests/BiomeAudit.test.ts` (scoped pro Biom), `tests/ElementMix.test.ts`, `LEVEL_PLAN.md`-Spezifikation unten.

**Neue LevelData-Felder** (alle optional, Solver-agnostisch, dürfen nie Pflichtweg sein):
`checkpoints`, `windZones`, `waterZones`, `keys`, `doors`, `cannons`, `timeGate`, `rising`; Plattform-Extras `crumble`, `conveyor`; `PlatformType` 'ice'; nutzbar: `hidden`, `brick_secret`, `brick_multi`; QB-Inhalt `oneup`; `goals` (Multi-Goal).

**Helfer v2** (`helpers.ts`, absolute Koordinaten, `baseTop` = Oberkante des Bodens):
- `seg(l, r, top, h, type)` — Segment aus linker/rechter Kante + Oberkante (gemeinsame Basis mehrerer Biome-Dateien)
- `staircase(startX, baseTop, steps, rise=70, width=140, gapX=40, type)`
- `plateauSection(startX, baseTop, specs[{dx,dy,w,h?,type?}])`
- `pitWithLedges(pitStart, baseTop, pitWidth, pitDepth=160, type)` — Grubenboden; die umliegende Erde bildet die Ränder
- `twoTierSection(startX, baseTop, length, lowerType?, upperType?)` — obere Route bei baseTop−160
- `islandCluster(startX, baseTop, specs[{dx,dy,w,type?}])`
- `zigzagClimb(startX, baseTop, steps=6, rise=90, width=110, swing=130, type)`
- `overhangSection(startX, baseTop, width, gapStart, gapWidth, type)`
- `coinArc(cx,cy,count=5,radius=70,height=70)`, `coinDiamond(cx,cy,size=60)`, `coinTrail(x1,y1,x2,y2,count)`, `coinLadder(x,yBottom,yTop,count=5)`
- `createCrumblePlat(x,y,w,h,type)`, `createConveyorPlat(x,y,w,h,type,dir,speed=80)`, `createIcePlat(x,y,w,h)`
- `createCheckpoint(x,y)`, `createWindZone(x,y,w,h,strength=140,intervalMs=3000)`, `createWaterZone(x,y,w,h)`, `createKey(x,y)`, `createDoor(x,y,w,h)`, `createCannon(x,y,dir,intervalMs=2500,speed=260)`
- `gapWithPlatforms(..., opts { widths?, dy?, types?, xOffsets? })` — für variierte Gap-Treppen

**Physik-Limits (sichere Design-Werte)**:

| Gravity (Biome) | max. Aufstieg | horizontal bei Δy=0 | Sicher planen |
|-----------------|---------------|---------------------|---------------|
| 1000 (space-star) | ~405px | ~515px | ≤330px hoch, ≤420px weit |
| 1200 (water) | ~335px | ~425px | ≤280px hoch, ≤350px weit |
| 1500 (sky-clouds, beach-island) | ~270px | ~335px | ≤220px hoch, ≤280px weit |
| 2000 (Standard) | ~200px | ~245px | ≤160px hoch, ≤210px weit |
| 2200 (volcano-lava) | ~185px | ~220px | ≤140px hoch, ≤190px weit |

Abwärts ist bis 1000px Fallhöhe immer möglich. Bei `body.y > 500` schwimmt der Spieler (water-Biom) bzw. in `waterZones`.

**Biom-Archetypen + Pflicht-Elemente** (Reihenfolge pro Biom frei, keine globale Schablone):

| Biom | 6 Archetypen (Vorschlag) | Pflicht |
|------|--------------------------|---------|
| grasslands | 1 Tutorial, 2 Hügel & Gruben, 3 Röhren & Geheimnisse, 4 Kletterpartie, 5 Horde, 6 Wind-Dash-Finale | Wind-Zonen, Checkpoints in langen Leveln |
| desert | 1 Dünen-Tutorial, 2 Sandsturm-Schlucht, 3 Pyramiden-Labyrinth, 4 Oasen-Kletterer, 5 Skorpion-Horde, 6 Pharaonen-Finale | Wind-Zonen, Keys+Doors (Bonusraum), Multi-Goal |
| water | 1 Lagunenpfad, 2 Tiden-Tunnel, 3 Korallen-Labyrinth, 4 Tauchgang, 5 Tiefsee-Horde, 6 Mariana-Finale | Water-Zonen, Rising-Water (L18) |
| ice-snow | 1 Schneepfad, 2 Gletscherspalten, 3 Eistunnel, 4 Gipfelsturm, 5 Polarhorde, 6 Eiszeit-Finale | Ice-Plattformen (≥2 Level) |
| sky-clouds | 1 Wolkenhopser, 2 Windkanal, 3 Wolkenröhren, 4 Himmelsleiter, 5 Luftschlacht, 6 Wolkenfinale | Crumble (L30), Wind-Zonen |
| forest | 1 Waldweg, 2 Lichtungssprünge, 3 Wurzel-Labyrinth, 4 Baumkronen, 5 Käferhorde, 6 Wipfelpfad | Crumble-Äste (optional), Vertikalität |
| village | 1 Dorfplatz, 2 Marktweg, 3 Kanalisation, 4 Schornsteine, 5 Stadthorde, 6 Dach-Rennen | Wind-Zonen, Keys+Doors, Checkpoints |
| beach-island | 1 Strandspaziergang, 2 Boardwalk, 3 Palmenhain, 4 Klippenkletterer, 5 Riff-Horde, 6 Flut-Finale | Water-Zonen, Rising-Water (L48) |
| factory | 1 Maschinenhalle, 2 Stahlträger, 3 Rohrwerk, 4 Schornstein-Aufzug, 5 Roboterhorde, 6 Förderband-Finale | Conveyor (≥2 Level), Cannons |
| volcano-lava | 1 Lavasteg, 2 Magmasprünge, 3 Obsidianröhren, 4 Kraterkletterer, 5 Aschesturm-Horde, 6 Eruptions-Finale | Rising-Lava (L60), kurze präzise Sprünge |
| haunted-mansion | 1 Eingangshalle, 2 Spiegelsäle, 3 Geistertreppen, 4 Verlies, 5 Banshee-Horde, 6 Krypta-Finale | Keys+Doors, hidden/secret Bricks |
| ruins | 1 Ausgrabung, 2 Tempelbrücken, 3 Säulengänge, 4 Stufenpyramide, 5 Wächter-Horde, 6 Fallender Tempel | Crumble (L72), Keys+Doors, hidden |
| canyon-base | 1 Abgrundpfad, 2 Felsspalten, 3 Windkanäle, 4 Kletterwände, 5 Adlerhorde, 6 Felssturz-Finale | Crumble (L78), Wind-Zonen, Cannons |
| space-star | 1 Orbit, 2 Asteroidenfeld, 3 Raumstation, 4 Satelliten-Kletterer, 5 UFO-Horde, 6 Nova-Finale | Crumble (L84), Low-Gravity-Weiten nutzen |
| castle-final | 1 Burghof, 2 Zugbrücke, 3 Kerkerkanäle, 4 Turm-Kletterer, 5 Boss-Horde (L89 coinGoal 33), 6 Bossarena (L90) | Cannons, Keys+Doors |

**Harte Pins** (dürfen nicht verändert werden):
- grasslands L1: genau 1 Spring, 0 Spikes, Geheim-Plattform exakt (520,400), `pipeWarps` behalten
- grasslands L3: zerbrechbarer Brick exakt (1950,420)
- grasslands L5: `coinGoal: 25`
- desert L10: `coinGoal: 30`
- desert L11: 15–20 Gegner inkl. crab, robot, spiny
- village L37: load-bearing `brick` exakt (2400,650)
- Pilot L1–L12: ≥5/6 Level je Biom mit Spring; vertikale UND circulare Moving-Plats; Spikes-Regeln

**Element-Regeln**: Spikes max 4/Level, ≥100px zu QBs, ≥96px zu Goal, ≥150px zu playerStart, immer auf solider Plattform; Springs exakt auf Plattform-Oberkante; coinGoal ≤ Coins; ≤3 coinGoal-Level/Biom; Bricks nur zerbrechbar, wenn `isBrickLoadBearing` false (Tests prüfen das). Kein Level darf nach dem Umbau noch `ensureSolvable`-Flickwerk nötig haben (as-authored traversierbar bauen).

### Bugs/Inkonsistenzen (unabhängig von Phase 9 fixen)

| Bug | Beleg |
|-----|-------|
| forest L33: `goal.x=11100` > `width=9200` → Ziel ausserhalb der Kamera-Bounds | `forest.ts:201,341` |
| Crumble L30/L78/L84 wirkungslos (Update nur für id 72) | `GameScene.ts:1188` |
| RisingWater L18/L48 wirkungslos (Movement nur für id 60) | `GameScene.ts:1178` |
| AGENTS.md-Zuordnung falsch: L66=haunted, L72=ruins, L78=canyon, L84=space | `src/data/levels/index.ts` |

---

## Aufwand-Schätzung (Ist-Stand)

| Phase | Level | Code | Status |
|-------|-------|------|--------|
| **1: DRY** | 0 (cleanup) | helpers.ts + 7 Dateien | ✅ |
| **2: 6 Typen** | 90 | 14 Dateien | ✅ |
| **3: Finale-Level** | 15 | GameScene.ts | ✅ |
| **4: Mechaniken** | 0 | GameScene.ts | ✅ |
| **5: Secret Rooms** | 15 | 15 Level-Dateien | ✅ |
| **6: End-Varianten** | 5-10 Level | GameScene.ts | 🔜 |
| **7: Difficulty** | 0 | GameScene.ts | 🔜 |
| **8: Balance** | 0 | GameScene.ts | 🔜 |
| **9: Vielfalt** | 90 | 15 Level-Dateien + helpers.ts + GameScene + Tests | ✅ |

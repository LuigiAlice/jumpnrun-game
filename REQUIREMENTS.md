# Requirements — Jump & Run Abenteuer

Alle funktionalen Anforderungen des Spiels, maschinell abgesichert über die
Traceability-Tabelle am Ende dieses Dokuments. Der Test
`tests/RequirementsCoverage.test.ts` prüft, dass jede gemappte Anforderung
durch mindestens einen real existierenden Test (Vitest oder Playwright)
gedeckt ist. Zeilen mit `—` sind dokumentierte Lücken (documented gaps).

Referenzen: [GAMEDESIGN.md](GAMEDESIGN.md), [LEVEL_PLAN.md](LEVEL_PLAN.md), [AGENTS.md](AGENTS.md)

---

## 1. Kern-Gameplay

- **R-001** – Horizontale Bewegung: Der Spieler bewegt sich mit ←/→ (HORIZONTAL_SPEED 300); das Spiel reagiert sichtbar auf Tastatureingaben im Canvas.
- **R-002** – Sprungphysik: Sprünge werden aus JUMP_SPEED 900 und der (biome-abhängigen) Gravitation physikalisch berechnet; horizontale Sprungweite hängt von der Höhendifferenz ab.
- **R-003** – Physik-Limits: MAX_JUMP_DISTANCE = 800, MAX_JUMP_UP = 350, MAX_FALL_DOWN = 1000.
- **R-004** – Biome-Gravitation: space-star 1000, water 1200, sky-clouds/beach-island 1500, volcano-lava 2200, alle anderen 2000; Solver und Gameplay nutzen `getBiomeGravity`.
- **R-005** – Biome-Bewegungsmechaniken: Im Biome ice-snow behält der Spieler beim Loslassen horizontale Velocity (×0.92, Eis-Rutsch); der `ice`-Plattformtyp rutscht biome-unabhängig stärker (×0.96). Im Biome water gilt ab `body.y > 500` Schwimmen (Gravity 600, ↑ → vY −250, horizontaler Drift ×0.95); `waterZones` aktivieren dasselbe Schwimmen auch außerhalb des water-Bioms.
- **R-006** – Fire-Schuss: Fire Mario schießt mit X/Space Feuerbälle, maximal alle 250 ms.
- **R-007** – ESC-Taste führt aus dem Spiel zurück zum Titelmenü.

## 2. Spieler-Zustände & Power-ups

- **R-008** – Drei Spieler-Zustände: small (22×32, `player_idle`), big (24×48, `player_big`), fire (24×48, `player_fire`); der Big-Zustand ist Voraussetzung für Brick-Zerstörung und QB-Aktivierung.
- **R-009** – Question Blocks enthalten coin, mushroom, flower, star oder oneup; sie werden von unten aktiviert (Spieler touching.up + Block touching.down), geben Inhalt + Punkte und wechseln zur `question_used`-Textur. Mushroom → Big, Flower → Fire, Star → 5 s Unverwundbarkeit, Coin → +100 Punkte, oneup → +1 Leben (1-UP).
- **R-010** – QB-Clearance: Zwischen QB-Oberkante und darüberliegender Plattform liegen mindestens 56 px (Big Mario 48 px + 8 px Buffer); kein QB ist durch Plattformen unerreichbar.

## 3. Neue Elemente (Pilot-Features)

- **R-011** – Sprungfedern: Launch mit SPRING_VELOCITY −1350, Sprunghöhe ≈ 455 px (deutlich über normalen ~202 px).
- **R-012** – Federn sind Bonus-Elemente: Der Solver kennt sie nicht; alle Level müssen ohne Feder-Launch lösbar bleiben.
- **R-013** – Feder-Platzierung: Jede Feder sitzt exakt auf einer Plattform-Oberkante (nie über Lücken); in den Pilot-Biomen haben ≥ 5 von 6 Leveln mindestens eine Feder, Tutorial-Level genau eine.
- **R-014** – E2E: Eine Feder launcht den Spieler im Laufzeit-Browser mit Velocity ≤ −1300 und erzeugt einen Apex ≥ 300 px.
- **R-015** – Spikes: Overlap mit einer Stachelfalle tötet den Spieler sofort (wie Lava) und kostet ein Leben.
- **R-016** – Spike-Design-Regeln: ≥ 100 px Abstand zu QBs, ≥ 150 px zu playerStart, ≥ 96 px zum Goal, auf einer Plattform „grounded", nie auf Moving-Platforms, max. 4 pro Level, keine zwei Spikes an derselben Position.
- **R-017** – Breakable Bricks: Nur Big Mario zerbricht 'brick'-Plattformen von unten (+50 Punkte); Small Mario erzeugt nur einen Bonk; nicht-'brick'-Plattformen sind nie zerstörbar.
- **R-018** – Load-Bearing-Schutz: Bricks, deren Entfernung das Level unlösbar machte, zerbrechen nicht (`isBrickLoadBearing`), sondern wobblen; E2E verifiziert, dass ein tragender Brick einen Bonk überlebt.
- **R-019** – Münz-Tor: Ist `coinGoal` gesetzt, bleibt das Goal gesperrt (transparent, Body disabled) und `reachGoal` wird guardiert, bis `coins ≥ coinGoal`; HUD-Hint zeigt „Coins: X / Y" und danach „Gate offen!".
- **R-020** – coinGoal ist > 0 und überschreitet nie die Münz-Anzahl des Levels.
- **R-021** – `ensureSolvable` erhält Springs, Spikes und coinGoal unverändert.

## 4. Gegner & Kampf

- **R-022** – Gegner sind in stompbar (goomba, koopa, spiny, robot, crab, ghost, squid, ufo — Sprung von oben tötet, +500 Punkte) und nicht-stompbar (piranha, thwomp, boo, lakitu, bullet_bill, fireball, boss — jeder Kontakt tötet) geteilt.
- **R-023** – Gegner-AI: Bodengegner erkennen Kanten und drehen um; Piranhas erscheinen nur an Pipes (Auf/Ab-Tween); Thwomp fällt nur bei Spieler-Kontakt von oben; Boo erstarrt bei Blickkontakt und folgt sonst; Lakitu wirft alle 3 s Spiny-Eier; Gegner-Tempo ist biome-abhängig (80–130).
- **R-024** – Boss (L90): 3 HP, schießt alle 2 s zielsuchende Feuerbälle, ist nur durch Spieler-Fireballs verletzbar (+200 pro Treffer), hat eine HP-Bar und wird von Arena-Wänden eingegrenzt.
- **R-025** – Alle in Leveln verwendeten Gegner-Typen mappen auf gültige, generierte Texturen.

## 5. Level-Struktur & Lösbarkeit

- **R-026** – Es gibt genau 90 Level in 15 Biomen (6 Level pro Biome); `getLevelCount()` und `ALL_LEVELS.length` stimmen überein.
- **R-027** – Alle 90 Level sind mit biome-bewusster BFS-Solvability lösbar und haben einen gültigen Pfad vom playerStart zum Goal.
- **R-028** – Vollständige Traversierbarkeit: Alle Plattformen vor dem Goal sind vom playerStart aus erreichbar (0 unerreichbare Plattformen).
- **R-029** – Jedes Level definiert playerStart (auf einer Plattform, ohne Body-Overlap), goal (auf einer Plattform) und timeBonus > 0.
- **R-030** – Moving Platforms (horizontal, vertikal, zirkular) werden vom Solver berücksichtigt (32 diskrete Positionen); Pilot-Levels nutzen alle 3 Bewegungstypen.
- **R-031** – Auto-Fixer `ensureSolvable`: fügt bei überschrittener Sprungweite automatisch 'platform_easy'-Tritte hinzu, hebt platY auf das QB-Clearance-Maximum aller betroffenen QBs, warnt genau einmal per `console.warn`, falls ein Level unlösbar bleibt, und mutiert die Original-Daten nicht.
- **R-032** – Secret Rooms: 15 Stück (eines pro Biome, im jeweiligen 1. Level), bestehend aus Plattform + 3–5 Coins + optionalem QB, physikalisch erreichbar.
- **R-033** – Pilot-Levels (1–12): jeder Level mixt ≥ 3 Plattform-Typen, nutzt variierte Moving-Platform-Typen und enthält Gegner-Horden (L11: 15–20 crab/robot/spiny).
- **R-034** – Biome-Finale: Jedes 6. Level eines Bioms (L6, L12, …, L84) hat eine eigene Finale-Mechanik (Windböen, fallende Hindernisse, steigendes Wasser/Lava, Eiszapfen, Bröckel-Plattformen).

## 6. Scoring & Progression

- **R-035** – Punktevergabe: Münze +100, Stomp +500, Brick-Zerstörung +50, QB-Inhalt +200, Boss-Treffer +200.
- **R-036** – Level-Clear: Beim Ziel gibt es +1000 Punkte plus TimeBonus (Restzeit); danach automatischer Übergang zum nächsten Level.
- **R-037** – Leben & Tod: 3 Leben beim Start; Tod durch nicht-stompbaren Gegner, Lava, Spike, Timer-Ablauf oder Fall unter das Level; bei 0 Leben → GameOver-Szene; nach Treffer 2 s Unverwundbarkeit (Blinken).

## 7. UI / HUD

- **R-038** – HUD zeigt permanent: World-Level (z. B. „1-1"), Score, Coins, Time und Lives; Boss-HP-Bar bei L90.
- **R-039** – Canvas 1200×800 mit FIT-Skalierung; das Spiel lädt ohne kritische Konsolen-Fehler.

## 8. Audio

- **R-040** – 15 handkomponierte Biome-Songs, deterministisch (kein Math.random), je ≥ 16 Takte à 16 Steps mit gleich langen melody/bassline/drums-Tracks.
- **R-041** – Song-Struktur: Hook (erste 32 Steps) kehrt später in der Melodie wieder; Drums enthalten Kick, Snare und HiHat; Snare ausschließlich auf Beats 2 und 4.
- **R-042** – Musik-Daten-Integrität: keine NaN/negativen Werte, BPM 110–180, Melodie-Register (Median) über dem Bass.
- **R-043** – Scheduler: Lookahead-Scheduling (25 ms Poll, 0.12 s Ahead) auf exakter `ctx.currentTime`-Timeline (stepTime); Musik startet beim ersten User-Input (AudioContext-Resume) und stoppt bei Tod, Pause und Levelwechsel.

## 9. Grafik / Assets

- **R-044** – Alle Plattform-, Dekorations- und Gegner-Typen, die in Leveln verwendet werden, mappen auf gültige (prozedural generierte) Texture-Namen.
- **R-045** – MIDI-Konvertierung: `midiToFreq(69)` = 440 Hz (A4), `midiToFreq(60)` ≈ 261.63 Hz (C4).

## 10. Level-Vielfalt (Phase 9)

- **R-046** – Helfer v2: deterministische Baukästen `staircase`, `plateauSection`, `pitWithLedges`, `twoTierSection`, `islandCluster`, `zigzagClimb`, `overhangSection` sowie Coin-Muster (`coinArc`, `coinDiamond`, `coinTrail`, `coinLadder`) erzeugen variierte Geometrie ohne Math.random.
- **R-047** – Geometrie-Vielfalt: Jedes Level hat ≥ 4 verschiedene Oberkanten-y, ≥ 3 verschiedene Plattform-Breiten und keinen (w,h)-Stempel über 65 %; kein Level ist mehr eine flache Ein-Linien-Anordnung.
- **R-048** – As-authored lösbar: Alle 90 Level sind ohne Auto-Fixer traversierbar; `ensureSolvable` fügt in keinem Level Plattformen hinzu.
- **R-049** – Crumble-Plattformen sind datengetrieben (`crumble: true`, 800 ms Standzeit, 3 s Respawn) und in den Finale-Biomen sky-clouds, ruins, canyon-base, space-star verbaut; jede Crumble-Stelle hat eine sichere Nicht-Crumble-Route.
- **R-050** – Eis-Plattformen (`PlatformType 'ice'`) rutschen stärker und kommen ausschließlich im Biom ice-snow vor (≥ 2 Level).
- **R-051** – Förderbänder (`conveyor`) wirken in factory-Leveln als Laufkraft in beide Richtungen.
- **R-052** – Checkpoints (`checkpoints`) stehen in langen Leveln (width ≥ 12000) auf Plattformen und verschieben nach dem Tod den Respawn dorthin.
- **R-053** – Wind-Zonen (`windZones`) gibt es in ≥ 4 windigen Biomen (u. a. grasslands, desert, sky-clouds, village, canyon-base), Wasser-Zonen (`waterZones`) in water und beach-island.
- **R-054** – Schlüssel/Türen sind immer gepaart, blockieren nie Start oder Goal und öffnen nur Bonusräume; Multi-Goal-Level bieten zusätzliche Zielflaggen mit eigenen Punktwerten.
- **R-055** – Kanonen (`cannons`) feuern in factory, castle-final und canyon-base tödliche Projektile; Zeit-Tore (`timeGate`) entsperren das Goal erst nach X Sekunden und sind innerhalb des Zeitbonus erreichbar.
- **R-056** – 1-UP-Blöcke (`oneup`) kommen in mehreren Leveln vor; die Plattformtypen `hidden`, `brick_secret` und `brick_multi` werden in ≥ 3 Biomen für Geheimnisse genutzt.

---

## Traceability

Format: Eine Zeile pro Mapping (R-ID wird bei mehreren Tests wiederholt).
`—` in Datei+Testname = dokumentierte Lücke (kein Test vorhanden); maximal 8 erlaubt.
Die Prüfung erfolgt durch `tests/RequirementsCoverage.test.ts` (Substring-Match,
case-insensitive, im Dateiinhalt der jeweiligen Test-Datei).

| ID | Anforderung (kurz) | Test-Datei | Test-Name-Teilstring |
|----|--------------------|-----------|----------------------|
| R-001 | Bewegung ←/→ | e2e/game.test.ts | game responds to input |
| R-002 | Sprungphysik aus Konstanten | tests/Physics.test.ts | same height jump should return 246px |
| R-002 | Sprungphysik aus Konstanten | tests/GameLogic.test.ts | should allow upward jump within limit |
| R-003 | Physik-Limits 800/350/1000 | tests/GameLogic.test.ts | should have reasonable physics values |
| R-003 | Physik-Limits 800/350/1000 | tests/Physics.test.ts | max fall down should be 1000px |
| R-004 | Biome-Gravitation | tests/LevelInvariant.test.ts | all 90 levels should be fully traversable to goal (biome gravity) |
| R-004 | Biome-Gravitation | tests/LevelSolvability.test.ts | all levels should be solvable |
| R-005 | Eis-Rutsch & Schwimmen | tests/Phase9Features.test.ts | crumble and conveyor helpers carry their extra data |
| R-005 | Eis-Rutsch & Schwimmen | tests/Phase9Features.test.ts | water zones appear in water and beach-island |
| R-006 | Fire-Schuss 250ms | — | — |
| R-007 | ESC → Titelmenü | e2e/game.test.ts | ESC returns to title screen |
| R-008 | Spieler-Zustände small/big/fire | tests/GameLogic.test.ts | should break only for big player on breakable brick |
| R-009 | QB-Inhalte & Trigger | tests/GameLogic.test.ts | createQB should create valid question block |
| R-010 | QB-Clearance 56px | tests/GameLogic.test.ts | should report all unreachable question blocks |
| R-010 | QB-Clearance 56px | tests/LevelInvariant.test.ts | auto-added platforms must never block a question block (all 90 levels) |
| R-011 | Feder-Launch ~455px | tests/NewElements.test.ts | spring jump height should exceed normal jump and stay within limits |
| R-012 | Federn Bonus-only | tests/PilotElements.test.ts | levels must stay solvable without spring launches (springs ignored by solver) |
| R-013 | Feder-Platzierung | tests/PilotElements.test.ts | every spring sits exactly on a platform top edge |
| R-013 | Feder-Platzierung | tests/PilotElements.test.ts | at least 5 of 6 levels per pilot biome have at least one spring |
| R-014 | E2E Feder-Launch | e2e/elements.test.ts | spring launches player |
| R-015 | Spike-Overlap → Tod | e2e/elements.test.ts | spike overlap kills player |
| R-016 | Spike-Design-Regeln | tests/NewElements.test.ts | all levels with spikes must keep spikes at least 100px away |
| R-016 | Spike-Design-Regeln | tests/PilotElements.test.ts | spikes are at least 96px from goal and 100px from QBs |
| R-017 | Breakable Bricks (+50) | tests/GameLogic.test.ts | should break only for big player on breakable brick |
| R-017 | Breakable Bricks (+50) | e2e/elements.test.ts | big player destroys breakable brick |
| R-018 | Load-Bearing-Schutz | tests/GameLogic.test.ts | should flag a brick that is the only path across a gap |
| R-018 | Load-Bearing-Schutz | e2e/elements.test.ts | load-bearing brick survives bonk |
| R-018 | Load-Bearing-Schutz | tests/NewElements.test.ts | removing any brick either keeps the level traversable or is flagged load-bearing |
| R-019 | Münz-Tor sperrt Goal | e2e/elements.test.ts | coin gate locks goal |
| R-020 | coinGoal ≤ Coins | tests/PilotElements.test.ts | coinGoal never exceeds the coin count of the level |
| R-021 | ensureSolvable erhält neue Felder | tests/NewElements.test.ts | ensureSolvable should preserve springs |
| R-021 | ensureSolvable erhält neue Felder | tests/PilotElements.test.ts | ensureSolvable keeps springs |
| R-022 | Stompbar/nicht-stompbar +500 | e2e/elements.test.ts | stomp |
| R-023 | Gegner-AI & Speed | — | — |
| R-024 | Boss 3 HP L90 | — | — |
| R-025 | Gegner-Texturen gültig | tests/AssetCoverage.test.ts | all enemy types in levels should use valid texture names |
| R-026 | 90 Level / 15 Biome | tests/LevelSolvability.test.ts | should have all 15 biomes |
| R-026 | 90 Level / 15 Biome | tests/LevelInvariant.test.ts | getLevelCount() and ALL_LEVELS.length should both be 90 |
| R-027 | BFS-Lösbarkeit aller Level | tests/LevelSolvability.test.ts | all levels should be solvable |
| R-027 | BFS-Lösbarkeit aller Level | tests/LevelSolvability.test.ts | all levels should have a valid path to goal |
| R-027 | BFS-Lösbarkeit aller Level | tests/LevelInvariant.test.ts | all 90 levels should be fully traversable to goal (biome gravity) |
| R-028 | Vollständige Traversierbarkeit | tests/LevelSolvability.test.ts | all platforms up to goal should be reachable from start |
| R-029 | Level-Struktur Pflichtfelder | tests/LevelSolvability.test.ts | all levels should have playerStart on a valid platform |
| R-029 | Level-Struktur Pflichtfelder | tests/GameLogic.test.ts | all levels should have playerStart and goal defined |
| R-029 | Level-Struktur Pflichtfelder | tests/LevelSolvability.test.ts | all 90 levels should have goal on a platform |
| R-029 | Level-Struktur Pflichtfelder | tests/GameLogic.test.ts | all levels should have positive time bonus |
| R-030 | Moving Platforms im Solver | tests/GameLogic.test.ts | should solve level with large gap using horizontal moving platform |
| R-030 | Moving Platforms im Solver | tests/GameLogic.test.ts | should solve level with vertical moving platform |
| R-030 | Moving Platforms im Solver | tests/GameLogic.test.ts | should solve level with circular moving platform |
| R-030 | Moving Platforms im Solver | tests/PilotElements.test.ts | pilot levels use varied moving platform types |
| R-031 | Auto-Fixer ensureSolvable | tests/LevelSolvability.test.ts | multi-QB conflict: auto platform must satisfy the max clearance of ALL nearby QBs |
| R-031 | Auto-Fixer ensureSolvable | tests/LevelSolvability.test.ts | unfixable level: ensureSolvable must warn exactly once |
| R-031 | Auto-Fixer ensureSolvable | tests/LevelSolvability.test.ts | original level data must not be mutated by ensureSolvable |
| R-032 | Secret Rooms erreichbar | tests/PilotElements.test.ts | pilot levels keep the grasslands secret room intact and reachable |
| R-033 | Pilot-Level-Vielfalt | tests/PilotElements.test.ts | each pilot level mixes at least 3 platform types |
| R-033 | Pilot-Level-Vielfalt | tests/PilotElements.test.ts | desert level 11 keeps a crab/robot/spiny-heavy horde |
| R-034 | Biome-Finale-Mechaniken | tests/Phase9Features.test.ts | crumble platforms appear in the finale biomes |
| R-035 | Scoring-Tabelle | e2e/elements.test.ts | big player destroys breakable brick |
| R-035 | Scoring-Tabelle | e2e/elements.test.ts | stomp |
| R-036 | Level-Clear +1000+TimeBonus | — | — |
| R-037 | Leben & Tod (Lives--) | e2e/elements.test.ts | spike overlap kills player |
| R-038 | HUD-Anzeigen | — | — |
| R-039 | Canvas fehlerfrei | e2e/game.test.ts | game canvas loads without errors |
| R-039 | Canvas fehlerfrei | e2e/game.test.ts | game runs without critical console errors |
| R-040 | 15 deterministische Songs | tests/Music.test.ts | every biome has a song |
| R-040 | 15 deterministische Songs | tests/Music.test.ts | song data is deterministic across imports |
| R-040 | 15 deterministische Songs | tests/Music.test.ts | every song has at least 16 bars and matching track lengths |
| R-041 | Hook- & Drum-Struktur | tests/Music.test.ts | hook reprise: first 32 steps reappear later in the melody |
| R-041 | Hook- & Drum-Struktur | tests/Music.test.ts | drums contain kick(1), hat(2) and snare(3) |
| R-041 | Hook- & Drum-Struktur | tests/Music.test.ts | snare only on beats 2 and 4 |
| R-042 | Musik-Daten-Integrität | tests/Music.test.ts | no NaN, no negative values in any track |
| R-042 | Musik-Daten-Integrität | tests/Music.test.ts | bpm within 110-180 for all songs |
| R-042 | Musik-Daten-Integrität | tests/Music.test.ts | melody register (median) between 60 and 96 |
| R-043 | Lookahead-Scheduler & Start/Stop | tests/Music.test.ts | stepTime: one 16th note at 150 bpm equals 0.1s |
| R-044 | Texturen generiert/gültig | tests/AssetCoverage.test.ts | all platform types in levels should use valid texture names |
| R-044 | Texturen generiert/gültig | tests/AssetCoverage.test.ts | all decoration types in levels should use valid texture names |
| R-045 | midiToFreq korrekt | tests/Music.test.ts | midiToFreq converts A4 to 440 Hz and C4 to ~261.63 Hz |
| R-046 | Helfer v2 & Coin-Muster | tests/Phase9Features.test.ts | staircase rises monotonically and stays jumpable |
| R-046 | Helfer v2 & Coin-Muster | tests/Phase9Features.test.ts | coin pattern helpers produce distinct deterministic layouts |
| R-047 | Geometrie-Vielfalt | tests/Phase9Features.test.ts | no level is a flat single-line layout anymore |
| R-047 | Geometrie-Vielfalt | tests/Phase9Features.test.ts | no level consists of one repeated platform stamp |
| R-047 | Geometrie-Vielfalt | tests/Phase9Features.test.ts | every level uses at least three distinct platform widths |
| R-048 | As-authored lösbar | tests/Phase9Features.test.ts | all levels are authored solvable (no ensureSolvable patchwork) |
| R-048 | As-authored lösbar | tests/BiomeAudit.test.ts | levels are authored solvable (ensureSolvable adds nothing) |
| R-049 | Crumble datengetrieben | tests/Phase9Features.test.ts | crumble platforms appear in the finale biomes |
| R-050 | Ice-Plattformen nur ice-snow | tests/Phase9Features.test.ts | ice platforms exist in ice-snow and nowhere else |
| R-051 | Conveyor-Bänder in factory | tests/Phase9Features.test.ts | conveyor belts exist in factory levels |
| R-052 | Checkpoints in langen Leveln | tests/Phase9Features.test.ts | checkpoints exist in long levels only |
| R-053 | Wind- & Wasser-Zonen | tests/Phase9Features.test.ts | wind zones appear in at least four windy biomes |
| R-053 | Wind- & Wasser-Zonen | tests/Phase9Features.test.ts | water zones appear in water and beach-island |
| R-054 | Keys/Doors & Multi-Goal | tests/Phase9Features.test.ts | keys and doors are paired and never block start or goal |
| R-054 | Keys/Doors & Multi-Goal | tests/Phase9Features.test.ts | multi-goal levels offer extra scoring flags |
| R-055 | Cannons & Zeit-Tor | tests/Phase9Features.test.ts | cannons exist in factory, castle and canyon |
| R-055 | Cannons & Zeit-Tor | tests/Phase9Features.test.ts | time-gate levels are achievable within their time bonus |
| R-056 | 1-UP & Geheim-Bricks | tests/Phase9Features.test.ts | 1-UP question blocks appear in several levels |
| R-056 | 1-UP & Geheim-Bricks | tests/Phase9Features.test.ts | hidden and secret brick types are used in multiple biomes |

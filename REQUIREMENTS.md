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
- **R-005** – Biome-Bewegungsmechaniken: Nur auf dem `ice`-Plattformtyp gelten bei Bodenkontakt Beschleunigung, Trägheit und zeitnormierter Eis-Rutsch (×0.96 pro 60-Hz-Frame); Schnee und andere Flächen im ice-snow-Biom steuern direkt. Im Biome water gilt ab `body.y > 500` Schwimmen (Gravity 600, ↑ → vY −250, horizontaler Drift ×0.95); `waterZones` aktivieren dasselbe Schwimmen auch außerhalb des water-Bioms.
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

- **R-022** – Gegner sind in stompbar (goomba, koopa, robot, crab, ghost, squid, ufo — Sprung von oben tötet, +500 Punkte) und nicht-stompbar (spiny, piranha, thwomp, boo, lakitu, bullet_bill, fireball, boss — Kontakt verursacht Schaden, außer bei Schutz) geteilt.
- **R-023** – Gegner-AI: Bodengegner erkennen Kanten und drehen um; Piranhas erscheinen nur an Pipes und warten bei Spielernähe; Thwomp fällt nur bei Spielerposition darunter; Boo erstarrt bei Blickkontakt und folgt sonst; Lakitu wirft alle 3 s Spiny-Eier; Gegner-Tempo ist biome-abhängig (80–130).
- **R-024** – Boss (L90): 3 HP, schießt alle 2 s zielsuchende Feuerbälle, ist nur durch Spieler-Fireballs verletzbar (+200 pro Treffer), hat eine HP-Bar und wird von Arena-Wänden eingegrenzt. Die Flagge öffnet erst nach seinem Tod; verlorene Feuerkraft bleibt erneut erhältlich. Der letzte Levelabschluss führt zum Siegesbildschirm.
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

- **R-046** – Helfer v2: deterministische Baukästen `staircase`, `plateauSection`, `pitFloor`, `twoTierSection`, `islandCluster`, `zigzagClimb`, `overhangSection` sowie Coin-Muster (`coinArc`, `coinDiamond`, `coinTrail`, `coinLadder`) erzeugen variierte Geometrie ohne Math.random.
- **R-047** – Geometrie-Vielfalt: Jedes Level hat ≥ 4 verschiedene Oberkanten-y, ≥ 3 verschiedene Plattform-Breiten und keinen (w,h)-Stempel über 65 %; kein Level ist mehr eine flache Ein-Linien-Anordnung.
- **R-048** – As-authored lösbar: Alle 90 Level sind ohne Auto-Fixer traversierbar; `ensureSolvable` fügt in keinem Level Plattformen hinzu.
- **R-049** – Crumble-Plattformen sind datengetrieben (`crumble: true`, 800 ms Standzeit, 3 s Respawn) und in den Finale-Biomen sky-clouds, ruins, canyon-base, space-star verbaut; jede Crumble-Stelle hat eine sichere Nicht-Crumble-Route.
- **R-050** – Eis-Plattformen (`PlatformType 'ice'`) rutschen stärker und kommen ausschließlich im Biom ice-snow vor (≥ 2 Level).
- **R-051** – Förderbänder (`conveyor`) wirken in factory-Leveln als Laufkraft in beide Richtungen.
- **R-052** – Checkpoints (`checkpoints`) stehen in langen Leveln (width ≥ 16000) auf Plattformen und verschieben nach dem Tod den Respawn dorthin.
- **R-053** – Wind-Zonen (`windZones`) gibt es in ≥ 4 windigen Biomen (u. a. grasslands, desert, sky-clouds, village, canyon-base), Wasser-Zonen (`waterZones`) in water und beach-island.
- **R-054** – Schlüssel/Türen sind immer gepaart, blockieren nie Start oder Goal und öffnen nur Bonusräume; Multi-Goal-Level bieten zusätzliche Zielflaggen mit eigenen Punktwerten.
- **R-055** – Kanonen (`cannons`) feuern in factory, castle-final und canyon-base tödliche Projektile; Zeit-Tore (`timeGate`) entsperren das Goal erst nach X Sekunden und sind innerhalb des Zeitbonus erreichbar.
- **R-056** – 1-UP-Blöcke (`oneup`) kommen in mehreren Leveln vor; die Plattformtypen `hidden`, `brick_secret` und `brick_multi` werden in ≥ 3 Biomen für Geheimnisse genutzt.
- **R-057** – Moving-Platform-Escape (Bugfix „Figur bleibt auf der Plattform kleben"): Die Mitnahme durch bewegliche Plattformen erfolgt ausschliesslich positionsbasiert (`setX`/`setY`) und darf `body.velocity` nie überschreiben — Sprung- und Laufeingaben müssen jederzeit greifen; `dx*60`-Velocity-Übergabe ist framezeitabhängig und verboten.
- **R-058** – Wasserlevel spielbar (Bugfix „Wasserlevel nicht durchspielbar"): Unsichtbare Notfallböden (`safePlat`) werden nur noch für bodengebundene Gegner erzeugt — schwebende Gegner (ghost/boo/ufo/squid/lakitu/thwomp/bullet_bill/fireball/boss) hinterlassen keine Hindernisse; Schwimmpfade bleiben offen.
- **R-059** – Hidden-Blöcke (`hidden`/`brick_secret`/`brick_multi`) werden durch Bonk von unten enthüllt und geben Bonusinhalte; die Enthüllung liest den echten `platformType` (nicht die Textur).
- **R-060** – Runtime-Smoke aller 15 Biome: je 2 Level pro Biome werden auf Spawn, Bodenkontakt, Sprung (gravity-abhängig), Laufen und lebende Mover geprüft; dazu verifizieren Element-Probes die Phase-9-Mechaniken zur Laufzeit (Crumble, Conveyor, Eis, Checkpoint, Wind, Schwimmzone, Schlüssel/Tür, Kanonen, Zeit-Tor, Multi-Goal, Rising, Hidden, 1-UP).
- **R-061** – Frame-Rate-Independenz der Bewegung: Mover (horizontal/vertikal/circular) und Gegner-Bob rechnen auf kumulierter Game-Time (`delta`-Akkumulator), nie auf der Wandzeit — bei Slow-Mo/Fokus-Cooldown (gekappte Phaser-Delta) dürfen Plattformen die Physik nicht überholen. Bei konstanten 60fps identisch zum alten Verhalten.

---

- **R-062** – Präzises Bewegungsgefühl: sofortige horizontale Geschwindigkeit, sofortiges Stoppen und Umkehren auch in der Luft; Beschleunigung/Rutschen ausschließlich auf Eis bei Bodenkontakt. Optionaler Shift-Sprint (400), variable Sprunghöhe mit ↑/Z, 90 ms Coyote-Zeit, 120 ms Sprungpuffer, kein Auto-Bounce; externe Feder-/Stomp-Impulse bleiben erhalten.

- **R-063** – Klassischer L1-Einstieg: sicherer Bodenlauf unter optionaler Hügelroute, erreichbare Brick–Frageblock–Brick-Gruppen und massive Zieltreppe mit frei liegendem Münzbogen.

- **R-064** – Melodische Biome-Musik: 15 unterschiedliche Motive mit harmonischen Taktankern, echten Notenlängen und Hook-Reprise; ruhige Biome mit weniger Percussion und langsameren Tempi als Action-Biome. Begleitdichte und Mischung sind pro Song steuerbar.
- **R-065** – Musik-Wiedergabe: Akkordflächen einmal pro Takt, notenlängentreuer Lead, taktsynchrones Delay, deterministische Percussion sowie vollständige Audio-Knoten-Freigabe beim Stoppen.

- **R-066** – Einheitliche Pixelgrafik mit maßgleichen Gegner-/Münzanimationsphasen und eigenem Panzer; Terrain nutzt native Deck-/Füllkacheln statt gestreckter Texturen.
- **R-067** – Verlässliche Gegner-/Itemregeln: Treffer-Schutz ist kein Stern, bewegte Panzer von oben stoppbar, Spiny gefährlich, Bullet Bills ohne Gravitation, Piranhas warten bei Nähe; Pilz/Blume/Stern bewegen sich unterschiedlich.
- **R-068** – Levelrhythmus aller 90 Level: kompakter gestaffelter Einstieg, individuelle Belohnungs-/Erholungsstellen, geschützte untere Routen und freiwillige Entdeckungsräume; alle Ziele und Bonusplattformen ohne Auto-Fixer erreichbar.
- **R-069** – Röhrenzugänge prüfen die Fußposition auf dem Deckel; tiefe Levelstarts bleiben in der Kamera sichtbar und Hintergründe decken auch lange Level ab.
- **R-070** – Physikalische Lösbarkeit verwendet die tatsächliche biomeabhängige Sprunghöhe und eine kürzere Flugzeit beim Aufwärtssprung; unerreichbare Höhen werden abgelehnt.

- **R-071** – Zusätzliche Gegnerrollen: Flügel-Koopa verliert beim ersten Stomp die Flügel, Panzerkäfer widersteht Feuer und besitzt Panzerzustände, Bombengegner blinkt 1500 ms vor einer 90-px-Explosion; der Boss bleibt geschützt.
- **R-072** – Lianen erlauben optionales Klettern mit ↑/↓, Halten, direkten seitlichen Ausstieg und Z-Absprung; nur der eigene Klettermodus darf die Schwerkraft deaktivieren.
- **R-073** – Rotierende Feuerarme bewegen vorhandene Kollisionskörper auf Game-Time, verursachen Schaden und lassen eine sichere Bodenroute frei.
- **R-074** – Rote Münzringe zeigen einen Game-Time-Countdown, belohnen einen vollständigen Satz genau einmal und erlauben nach Ablauf und Verlassen einen neuen Versuch.
- **R-075** – Die Erweiterung verteilt sich kuratiert auf 24 Level, bewahrt Einführungen, Pins und Bossarena sowie die tatsächliche Lösbarkeit aller 90 Level ohne die neuen Elemente; neue Figuren und Elemente haben gültige maßgleiche Pixeltexturen.

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
| R-005 | Eis-Rutsch & Schwimmen | tests/Phase9Features.test.ts | ice platforms exist in ice-snow and nowhere else |
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
| R-052 | Checkpoints in langen Leveln | tests/Phase9Features.test.ts | checkpoints have safe support and protect every long level |
| R-053 | Wind- & Wasser-Zonen | tests/Phase9Features.test.ts | wind zones appear in at least four windy biomes |
| R-053 | Wind- & Wasser-Zonen | tests/Phase9Features.test.ts | water zones appear in water and beach-island |
| R-054 | Keys/Doors & Multi-Goal | tests/Phase9Features.test.ts | keys and doors are paired and never block start or goal |
| R-054 | Keys/Doors & Multi-Goal | tests/Phase9Features.test.ts | multi-goal levels offer extra scoring flags |
| R-055 | Cannons & Zeit-Tor | tests/Phase9Features.test.ts | cannons exist in factory, castle and canyon |
| R-055 | Cannons & Zeit-Tor | tests/Phase9Features.test.ts | time-gate levels are achievable within their time bonus |
| R-056 | 1-UP & Geheim-Bricks | tests/Phase9Features.test.ts | 1-UP question blocks appear in several levels |
| R-056 | 1-UP & Geheim-Bricks | tests/Phase9Features.test.ts | hidden and secret brick types are used in multiple biomes |
| R-057 | Moving-Platform-Escape | e2e/elements.test.ts | moving platform must not stomp |
| R-058 | Wasserlevel spielbar | e2e/element-features.test.ts | floating enemies leave no invisible ground |
| R-059 | Hidden-Blöcke per Bonk | e2e/element-features.test.ts | hidden brick reveals itself when bonked from below |
| R-060 | Runtime-Smoke aller Biome | e2e/biome-smoke.test.ts | spawn, ground, jump, run and movers work |
| R-060 | Runtime-Smoke aller Biome | e2e/element-features.test.ts | crumble platform breaks after 800ms and respawns after 3s |
| R-061 | Frame-Rate-Independenz Mover | e2e/biome-smoke.test.ts | movers work |
| R-061 | Frame-Rate-Independenz Mover | e2e/elements.test.ts | horizontal moving platform must not stomp |

| R-062 | Sprint und Solver-Walk | tests/PlayerMovement.test.ts | keeps the authored solver walk speed |
| R-062 | Variable Sprunghöhe | tests/PlayerMovement.test.ts | shortens only player-owned jumps |
| R-062 | Eingabepuffer und Kulanz | tests/PlayerMovement.test.ts | buffers a press just before landing |
| R-062 | Runtime-Sprint | e2e/player-feel.test.ts | Shift sprint reaches 400 |
| R-062 | Runtime-Sprunghöhe | e2e/player-feel.test.ts | holding jump rises higher |
| R-063 | Klassischer Leveleinstieg | tests/ClassicIntro.test.ts | provides a continuous safe running lane |
| R-063 | Blockgruppen | tests/ClassicIntro.test.ts | introduces reachable power-up |
| R-063 | Zieltreppe und Münzen | tests/ClassicIntro.test.ts | guides the final jump |
| R-064 | Echte Notenlängen | tests/MusicArrangement.test.ts | preserves written note lengths |
| R-064 | Biome-Motive | tests/MusicArrangement.test.ts | gives all fifteen biomes distinct hooks |
| R-064 | Harmonische Melodien | tests/MusicArrangement.test.ts | anchors melodic downbeats |
| R-064 | Biome-Stimmung | tests/MusicArrangement.test.ts | keeps calm biomes gentler |
| R-065 | Notenlängen und Delay | tests/MusicPlayer.test.ts | plays authored long notes with sustain |
| R-065 | Akkordwechsel | tests/MusicPlayer.test.ts | ends chord pads before the next bar |
| R-065 | Audio-Freigabe | tests/MusicPlayer.test.ts | disconnects completed voices |
| R-065 | Deterministische Percussion | tests/MusicPlayer.test.ts | creates bounded, repeatable non-silent |
| R-062 | Direkte Steuerung ohne Rutschen | tests/PlayerMovement.test.ts | stops and reverses immediately |
| R-066 | Pixel-Animationsgrößen | tests/PixelAssets.test.ts | generates actual animation frames |
| R-066 | Terrain-Raster | tests/TerrainRendering.test.ts | repeats original-size pixels |
| R-066 | Runtime-Terrain | e2e/rendering-polish.test.ts | terrain repeats native pixels |
| R-067 | Treffer und Stern | tests/EnemyRules.test.ts | keeps hit protection separate |
| R-067 | Panzer und Stacheln | tests/EnemyRules.test.ts | stops moving shells from above |
| R-067 | Item-Bewegung | tests/EnemyRules.test.ts | gives flowers, walking mushrooms |
| R-067 | Piranha-Nähe | tests/EnemyRules.test.ts | holds hidden piranhas near |
| R-067 | Bullet-Flug | e2e/enemy-behavior.test.ts | bullet bills keep horizontal flight |
| R-068 | Gestaffelter Einstieg | tests/WorldOneDesign.test.ts | introduces hills in a compact second level |
| R-068 | Naturwelten | tests/NatureLevelPolish.test.ts | gives all 42 nature levels |
| R-068 | Herausforderung | tests/ChallengeLevelPolish.test.ts | provides a broad recovery deck |
| R-068 | Freiwillige Entdeckungen | tests/ChallengeLevelPolish.test.ts | keeps the route solvable without |
| R-068 | Lösbarkeit aller Level | tests/StrictPhysicsAudit.test.ts | reaches every authored goal and bonus platform |
| R-069 | Fußbasierter Röhrenzugang | tests/EnemyRules.test.ts | enters pipes by foot position |
| R-069 | Tiefe Level und Hintergrund | e2e/rendering-polish.test.ts | deep level starts stay visible |
| R-070 | Aufwärtssprung | tests/Physics.test.ts | upward jump uses the shorter ballistic flight time |
| R-070 | Gesamte Levelprüfung | tests/StrictPhysicsAudit.test.ts | reaches every authored goal and bonus platform |
| R-024 | Finale Boss-Sperre | tests/GoalRules.test.ts | keeps the final flag locked |
| R-024 | Boss und Feuerkraft | e2e/rendering-polish.test.ts | final boss gates the flag |
| R-024 | Kampagnenabschluss | tests/GoalRules.test.ts | ends the campaign after the final level |
| R-071 | Flügel-Koopa | tests/ClassicEnemyRules.test.ts | removes wings on the first stomp |
| R-071 | Feuerfester Käfer | tests/ClassicEnemyRules.test.ts | makes armored beetles resist fire |
| R-071 | Bombenwarnung | tests/ClassicEnemyRules.test.ts | arms bombs on a stomp or fireball |
| R-071 | Bombenzeit und Radius | tests/ClassicEnemyRules.test.ts | uses game-time fuse duration |
| R-071 | Runtime-Flügel | e2e/classic-expansion.test.ts | a winged koopa loses its wings |
| R-072 | Lianensteuerung | tests/ClassicElements.test.ts | climbs vines, holds still, jumps off |
| R-072 | Runtime-Klettern | e2e/classic-expansion.test.ts | a vine supports climbing |
| R-073 | Feuerarmbewegung | tests/ClassicElements.test.ts | rotates fire bars on game time |
| R-073 | Sicherer Bodenweg | tests/ClassicExpansion.test.ts | places slow fire arms overhead |
| R-074 | Einmalige Münzbelohnung | tests/ClassicElements.test.ts | reveals timed red coins |
| R-074 | Ablauf und Wiederholung | tests/ClassicElements.test.ts | expires trials in game time |
| R-074 | Faire Sammlung | tests/ClassicExpansion.test.ts | offers timed red coins on contiguous safe shelves |
| R-075 | Kuratierter Rollout | tests/ClassicExpansion.test.ts | curates twenty-four levels |
| R-075 | Lösbarkeit | tests/ClassicExpansion.test.ts | keeps all ninety goals and bonus platforms solvable |
| R-075 | Echte Asset-Erzeugung | tests/ClassicAssets.test.ts | generates every runtime key |
| R-075 | Sauberer Shutdown | tests/ClassicElements.test.ts | releases groups and colliders once |

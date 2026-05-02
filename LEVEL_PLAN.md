# Level Design Plan: Vielfalt statt Gleichförmigkeit

## Phase 1: DRY - Helfer zentralisieren

`helpers.ts` erweitern um gemeinsame Funktionen:
- `gapWithPlatforms(S, startX, baseY, gapWidth, count)` - gestaffelte Plattformen über eine Lücke
- `pipeSection(S, startX, y, count)` - Pipe + PipeTop an regelmässigem Abstand
- `verticalClimb(S, startX, baseY)` - symmetrischer 7-Schritt-Bogen

Aus allen 7 Biome-Dateien entfernen (grasslands, desert, ice-snow, forest, beach-island, ruins).

---

## Phase 2: 6 Level-Typen pro Biome

| Level | Typ | Struktur |
|-------|-----|----------|
| **1** | Tutorial | Linear: Ground → Ziel. Wenig Gegner, viel Platz zum Üben |
| **2** | Gap-Strecke | 4-5 große Lücken-Sektionen + 2-3 moving platforms dazwischen |
| **3** | Röhren-Labyrinth | 5-8 Pipe-Sektionen, viele Piranhas, vertikale Pipe-Ausgänge |
| **4** | Vertikal-Kletterer | 3-4 verticalClimb Sektionen, Plattformen in vielen Höhen |
| **5** | Gegner-Horde | 15-20 Gegner, einfachere Plattformen, Kampf-Fokus |
| **6** | Biome-Finale | Einzigartige Challenge pro Biome (s. Phase 3) |

---

## Phase 3: Finale-Level pro Biome

| Biome | Level 6 Name | Struktur-Beschreibung |
|-------|-------------|----------------------|
| **grasslands** | Flaggen-Run | Langes gerades Level mit Checkpoints, viele Coins, Zeitdruck |
| **desert** | Pyramiden-Aufstieg | Spiralförmiger Aufstieg aussen an einer Pyramide |
| **water** | Tiefsee-Abstieg | Von oben nach unten durch Wasser-Korridore |
| **ice-snow** | Eis-Höhle | Tunnel-System mit Eisdecke, Stalaktiten als Hindernisse |
| **sky-clouds** | Wolken-Inseln | Verstreute Wolken-Plattformen, Wind-Zonen |
| **forest** | Baumkronen-Pfad | Von Ast zu Ast springen, mehrere Höhen-Ebenen |
| **village** | Dach-Rennen | Von Dach zu Dach springen, Schornsteine als Hindernisse |
| **beach-island** | Flut-Rennen | Steigendes Wasser zwingt Spieler nach oben |
| **factory** | Förderband-Wahnsinn | Förderbänder mit Richtungswechsel, Stampfer |
| **volcano-lava** | Eruption-Flucht | Lava steigt von unten, Spieler muss schnell hoch |
| **haunted-mansion** | Geister-Verfolgung | Boo-Geister verfolgen Spieler durch Gänge |
| **ruins** | Fallende-Tempel | Plattformen brechen nach Betreten zusammen |
| **canyon-base** | Adler-Nest | Von Felsvorsprung zu Felsvorsprung klettern |
| **space-star** | Asteroiden-Feld | Schwebende Asteroiden, Low-Gravity |
| **castle-final** | Boss-Arena | Thwomp/Boss-Kampf in grosser Halle |

---

## Phase 4: Biome-Mechaniken

| Biome | Mechanik | Implementierung |
|-------|----------|----------------|
| **ice-snow** | Rutschige Plattformen | `ice` Typ: Spieler behält Velocity, kein sofortiger Stop bei Loslassen |
| **water** | Schwimmen | Reduzierte Gravity (500), langsamere Bewegung, anderer Sprung-Jump |
| **space-star** | Low-Gravity | Gravity (1000), höhere Sprünge (JUMP_VELOCITY -600) |
| **sky-clouds** | Wind-Zonen | Unsichtbare Trigger setzen player.body.velocity.x |
| **volcano-lava** | Lava-Schaden | Bereits implementiert (lava = die()) |

---

## Phase 5: Level-End-Varianten

| Typ | Beschreibung |
|-----|-------------|
| **Flaggen-Ziel** | Standard: Flagge am Ende des Levels (aktuell) |
| **Boss-Ziel** | Boss besiegen → Flagge erscheint |
| **Münzen-Tor** | X Münzen gesammelt → Tor öffnet sich |
| **Zeit-Tor** | Ziel innerhalb Zeitlimit erreichen |
| **Multi-Goal** | Mehrere Ziele mit unterschiedlichen Punktwerten |

---

## Aufwand-Schätzung

| Phase | Level | Code | Sessions |
|-------|-------|------|----------|
| **1: DRY** | 0 (cleanup) | helpers.ts + 7 Dateien | 1 |
| **2: 6 Typen** | 90 umstrukturieren | 14 Dateien | 3-4 |
| **3: Finale-Level** | 15 (Level 6) | 15 Dateien | 2 |
| **4: Mechaniken** | 0 | GameScene.ts | 1 |
| **5: End-Varianten** | 5-10 Level | GameScene.ts | 1 |

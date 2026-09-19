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
| **haunted-mansion** | Haunted Finale | Bröckel-Plattformen |
| **ruins** | Fallender Tempel | Bröckel-Plattformen (800ms, 3s Respawn) |
| **canyon-base** | Canyon Finale | Fallende Felsen |
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
| **Münzen-Tor** | X Münzen gesammelt → Tor öffnet sich (`coinGoal` in LevelData) | ✅ (Pilot: L5 grasslands, L10 desert) |
| **Zeit-Tor** | Ziel innerhalb Zeitlimit erreichen | 🔜 |
| **Multi-Goal** | Mehrere Ziele mit unterschiedlichen Punktwerten | 🔜 |

---

## 🟡 Phase 6b: Neue Level-Elemente (Pilot in grasslands + desert)

Implementiert (Engine: GameScene/helpers/config, Tests: NewElements + PilotElements):

| Element | Daten | Mechanik |
|---------|-------|----------|
| **Sprungfeder** | `springs: {x,y}[]`, y = Plattform-Oberkante | Launch `SPRING_VELOCITY -1350` (~455px), Bonus-Element (Solver-agnostisch) |
| **Stachel-Falle** | `spikes: {x,y}[]`, y = Oberkante − 8 | Overlap → Tod; Design-Regeln: ≥96px zu QBs/Goal, ≥150px zu playerStart, max 24px breit |
| **Zerstörbare Bricks** | 'brick'-Plattform | Big Mario zerbricht von unten (+50); load-bearing Bricks wobble statt brechen (`isBrickLoadBearing`) |
| **Münz-Tor** | `coinGoal: number` | Goal gesperrt bis X Coins, HUD-Hint |

Pilot-Biome: grasslands (L1-6), desert (L7-12) — jedes Level mit Element-Mix (≥3 Plattform-Typen, variierte Moving-Plats, Coin-Muster, Gegner-Mix, 0-3 Spikes, 1-2 Springs, 2 coinGoal-Level). Ausrollen auf restliche 13 Biome folgt.

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

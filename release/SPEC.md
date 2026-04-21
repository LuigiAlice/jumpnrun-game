# Jump & Run Spiel - Spezifikation

## Projektübersicht
- **Name**: Jump & Run Abenteuer
- **Typ**: 2D Browser-Platformer (wie Super Mario)
- **Core-Feature**: 90 prozedural generierte, deterministische, garantiert lösbare Level
- **Zielgruppe**: Casual Gamer, die kurze, spaßige Level spielen wollen

## Technologie
- TypeScript + Vite + Phaser 3 + Vitest
- Arcade Physics (Gravity: 2000)
- ES Modules

## Level-Struktur
- **90 Level** über 15 Biomes
- **6 Levels pro Biome**
- **Garantiert lösbar** durch BFS-Pathfinding

### Biome (15 Stück)
| Biom | Levels | Plattform-Typen | Dekorationen |
|------|--------|-----------------|---------------|
| grasslands | 1-6 | grass, dirt | tree, bush |
| desert | 7-12 | sand, sandstone | cactus, rock, skull, pyramid |
| water | 13-18 | bubble, water | seaweed, bubble, coral, shell |
| ice-snow | 19-24 | snow, ice | snowflake, icicle, rock |
| sky-clouds | 25-30 | cloud | balloon, bird, sun, rainbow |
| forest | 31-36 | grass, dirt | tree, bush, mushroom |
| village | 37-42 | grass, dirt | house, fence, barrel |
| beach-island | 43-48 | sand | palm, seagull, shell |
| factory | 49-54 | metal, brick | conveyor, crane, gear, smoke |
| volcano-lava | 55-60 | lava, stone | fire, ember, lava-rock |
| haunted-mansion | 61-66 | stone, brick | cobweb, tombstone, web, ghost |
| ruins | 67-72 | ruins, stone | pillar, statue |
| canyon-base | 73-78 | sandstone | canyon-rock, formation, eagle |
| space-star | 79-84 | space | planet, rocket, asteroid, satellite |
| castle-final | 85-90 | castle | banner, chain, torch, boss-flag |

## UI/UX Spezifikation

### Layout
- Canvas: 1200x800 Pixel
- HUD oben: Score (links), Coins, World, Timer (rechts), Lives (unten links)
- Responsive mit ENVELOP mode (keine Verzerrung)

### Visual Design
- **Farbschema**: Dynamisch basierend auf Biome
- **Stil**: Vektor/Smooth mit abgerundeten Ecken, Verläufen, Schatten
- **Animationen**: Player-Glow, Münzen-Glanz, Partikel, Parallax-Hintergrund

### Menüs
- **Start-Screen**: Titel, Steuerung-Info, Cloud-Dekor
- **Game Over**: Overlay mit Stats
- **Victory**: Konfetti-Sterne, Glückwunsch

## Plattform-Typen (22)

### Feste Plattformen (Solid)
`grass`, `stone`, `brick`, `cave`, `castle`, `metal`, `lava`, `wood`, `sand`, `snow`, `ruins`, `space`, `sandstone`, `ground`, `cloud`, `water`, `bubble`

### One-Way Plattformen
`platform_easy`, `platform_medium`, `platform_hard`

### Spezielle Plattformen
`pipe` (64x64) - Röhren für Piranhas
`pipe_top` (80x24) - Röhren-Lippe

## Gegner-Typen (15)

### Stompbare Gegner
`goomba`, `koopa`, `spiny`, `robot`, `crab`, `ghost`, `squid`, `ufo`

### Nicht-stompbare Gegner
`piranha`, `thwomp`, `boo`, `lakitu`, `bullet_bill`, `fireball`, `boss`

## Fragezeichen-Blöcke

### Anforderungen
- **Mindestabstand**: 56 Pixel zwischen Block-Oberseite und darüberliegender Plattform
- **Grund**: Big Mario ist 48px hoch + 8px Buffer
- Alle Level haben ausreichend Münzen an erreichbaren Stellen platziert
- Alle Level sind hübsch und detailliert ausgestattet
- In allen Levels gibt es Gegner und Pflanzen und bewegliche Plattformen
- Die Spielelemente sind hübsch und detailliert und erinnern an moderne Mario Jump & Run games.
- In allen Levels gibt es Fragezeichen Boxen
- Jedes Biom hat eine eigene Musik. Diese hat eine Loop Länge von 2 Minuten.


### Inhaltstypen
- `coin` - 100 Punkte
- `mushroom` - Big Mario
- `flower` - Fire Mario
- `star` - Unverwundbarkeit (5s)

## Spielmechanik

### Steuerung
- Pfeil Links/Rechts: Bewegen
- Pfeil nach oben: Springen
- R: Level neustarten
- N: Nächstes Level
- Leertaste: Schießen
- ESC: zurück zum Titelmenü

### Spieler-Zustände
| Zustand | Größe | Texture |
|---------|-------|---------|
| Small Mario | 22x32 | player_idle |
| Big Mario | 24x48 | player_big |
| Fire Mario | 24x48 | player_fire |

### Piranha-Mechanik
- **Aufsteigen**: 1.5s
- **Oben bleiben**: 3s
- **Absteigen**: 1.5s
- **Pause**: 2s
- **Position**: hiddenY = pipeTopY + 35, peekY = pipeTopY - 50

## Kamera
- Folgt Spieler horizontal
- Smooth Lerp (0.1)


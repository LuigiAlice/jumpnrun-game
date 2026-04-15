# Spielmechanik Dokumentation

## Spieler-Zustände

| Zustand | Größe | Texture | Verhalten |
|---------|-------|---------|-----------|
| Small Mario | 22x32 | player_idle | Normal |
| Big Mario | 24x48 | player_big | Kann Gegner stompen |
| Fire Mario | 24x48 | player_fire | Kann Feuerbälle schießen |

## Power-ups

| Item | Wirkung | Verfügbar in |
|------|--------|--------------|
| Mushroom | Macht Big Mario | Fragezeichen-Block |
| Flower | Macht Fire Mario | Fragezeichen-Block |
| Star | Unverwundbar (5s) | Fragezeichen-Block |

## Fragezeichen-Blöcke (Question Blocks)

### Anforderungen
- **Mindestabstand**: 56 Pixel zwischen Block-Oberseite und darüberliegender Plattform
- **Grund**: Big Mario ist 48px hoch + 8px Buffer
- **Horizontale Ausrichtung**: Spieler muss unter dem Block stehen können

### Inhaltstypen
- `coin` - 100 Punkte
- `mushroom` - Big Mario
- `flower` - Fire Mario
- `star` - Unverwundbarkeit

## Gegner-Typen

### Stompbare Gegner (durch Draufspringen zerstörbar)

| Typ | Größe | Verhalten |
|-----|-------|-----------|
| goomba | 26x22 | Läuft hin und her, fällt nicht von Kanten |
| koopa | 26x32 | Läuft hin und her, Schild |
| spiny | 26x24 | Läuft hin und her, stachelig |
| robot | 28x30 | Läuft hin und her |
| crab | 28x30 | Strandkrebs, läuft seitlich |
| ghost | 26x26 | Schwebt, verfolgt Spieler |
| squid | 26x28 | Wasser-Gegner |
| ufo | 32x24 | Fliegt, schießt |

### Nicht-stompbare Gegner

| Typ | Größe | Verhalten | tödlich bei Kontakt |
|-----|-------|-----------|-------------------|
| piranha | 28x40 | Kommt aus Röhren, nicht stompbar | Ja |
| thwomp | 40x40 | Fällt auf Spieler | Ja |
| boo | 26x26 | Schwebt, verschwindet wenn angesehen | Ja |
| lakitu | 28x30 | Fliegt, wirft Spiny-Eier | Ja |
| bullet_bill | 30x24 | Fliegt schnell von rechts | Ja |
| fireball | 16x16 | Feuergeschoss | Ja |
| boss | 48x48 | Endboss | Ja |

## Piranha-Pflanzen Mechanik

### Positionierung
- Piranhas MÜSSEN immer mit einer Pipe-Plattform verbunden sein
- Positionierung: Mittig auf der Pipe
- Die Pipe muss als `pipe` und `pipe_top` Plattform definiert sein

### Timing
| Phase | Dauer | Beschreibung |
|-------|-------|-------------|
| Aufsteigen | 1500ms | Pflanze fährt aus Röhre |
| Oben bleiben | 3000ms | Pflanze ist vollständig sichtbar |
| Absteigen | 1500ms | Pflanze fährt in Röhre |
| Pause | 2000ms | Pflanze ist vollständig versteckt |

### Positionierung der Pflanze
- **hiddenY**: PipeTopY + 35 (10px im Rohr versteckt)
- **peekY**: PipeTopY - 50 (50px über Pipe sichtbar)

## Plattform-Typen

### Feste Plattformen (Solid)
- `grass`, `stone`, `brick`, `cave`, `castle`, `metal`
- `lava`, `wood`, `sand`, `snow`, `ruins`, `space`
- `sandstone`, `ground`, `cloud`, `water`, `bubble`

### One-Way Plattformen
- `platform_easy` (128x24)
- `platform_medium` (128x24)
- `platform_hard` (128x24)

### Spezielle Plattformen
- `pipe` (64x64) - Röhren für Piranhas
- `pipe_top` (80x24) - Röhren-Lippe, muss über pipe sein

## Level-Struktur

### 90 Level, 15 Biomes, 6 Levels pro Biome

| Biome | Levels | Plattform-Typen | Dekorationen |
|-------|--------|-----------------|---------------|
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

## Punkte

| Aktion | Punkte |
|--------|--------|
| Münze sammeln | 100 |
| Gegner stompen | 500 |
| Fragezeichen-Block treffen | 100 |
| Level abschließen | 1000 + Time Bonus |
| Time Bonus | max 120 pro Level |

## Steuerung

| Taste | Aktion |
|-------|--------|
| ← → | Bewegen |
| Space | Springen |
| R | Level neustarten |
| N | Nächstes Level |

## Physik-Konstanten

```typescript
TILE_SIZE: 32
MAX_JUMP_DISTANCE: 800px horizontal
MAX_JUMP_UP: 300px vertikal
MAX_FALL_DOWN: 1000px vertikal
GRAVITY: 1000
```
# Jump & Run Spiel - Spezifikation

## Projektübersicht
- **Name**: Jump & Run Abenteuer
- **Typ**: 2D Browser-Platformer (wie Super Mario)
- **Core-Feature**: Prozedural generierte, deterministische, garantiert lösbare Level
- **Zielgruppe**: Casual Gamer, die kurze, spaßige Level spielen wollen

## Technologie
- TypeScript + Vite
- Canvas API (keine externen Rendering-Libraries)
- Keine externen Dependencies

## UI/UX Spezifikation

### Layout
- Canvas: 800x480 Pixel (16:10 Format)
- HUD oben: Münzen (links), Level-Nr. (rechts)
- Responsive Container mit Glow-Effekt

### Visual Design
- **Farbschema**: Dynamisch basierend auf Biome
- **Stil**: Vektor/Smooth mit abgerundeten Ecken, Verläufen, Schatten
- **Animationen**: Player-Glow, Münzen-Glanz, Partikel, Parallax-Hintergrund

### Biome (5 Stück)
| Biom | Farben | Hintergrund-Design |
|------|--------|-------------------|
| Wald | Grün/Orange | Bäume, Wolken, blauer Himmel |
| Wüste | Sand/Gelb | Kakteen, Pyramiden |
| Schnee | Weiß/Blau | Schneeflocken, dunkler Himmel |
| Vulkan | Rot/Schwarz | Lava-Partikel, dunkelrot |
| Ozean | Blau/Türkis | Wellen, Blasen |

### Menüs
- **Start-Screen**: Titel, Steuerung-Info, Cloud-Dekor
- **Game Over**: Overlay mit Stats
- **Victory**: Konfetti-Sterne, Glückwunsch

## Level-Generierung

### Algorithmus (garantiert lösbar)
1. **Seed-basiert**: Gleicher Seed = gleiches Level
2. **Pfad zuerst**: Generiere sicheren Pfad von links nach rechts
   - Nutzt BFS mit Jump-Physik-Constraint (max 4 Tiles hoch, 6 weit)
3. **Rest füllen**: Zusätzliche Plattformen NEBEN dem Pfad
4. **Entities**: Gegner (Goombas), Münzen auf/near dem Pfad

### Tile-Typen
- `air`: Leer
- `ground`: Boden (durchgehend unten)
- `platform`: Plattform (springbar)
- `brick`: Ziegel (zerstörbar - später)
- `question`: Frage-Block (Münzen/Items)
- `pipe`: Rohr (später)
- `ladder`: Leiter (später)

## Funktionalität

### Steuerung
- Pfeil Links/Rechts: Bewegen
- Space: Springen
- R: Level neustarten
- N: Nächstes Level

### Spielmechanik
- Spieler: Blink-Glow-Effekt
- Goombas: Lauern hin und her, töten durch Draufspringen
- Münzen: Sammeln, Animation
- Goal: Flagge/Block am Ende

### Kamera
- Folgt Spieler horizontal
- Smooth Lerp (0.1)


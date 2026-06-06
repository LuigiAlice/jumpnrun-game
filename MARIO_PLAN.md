# Super Mario Feel — Umsetzungsplan

> Ziel: Das Jump & Run-Spiel soll sich spielerisch, visuell und auditiv wie Super Mario anfühlen.
> Stand: Phase 1–4 priorisiert nach Impact pro Aufwand.

---

## Phase 1: Game Feel (Fundamentales Mario-Feeling)

### 1.1 — Beschleunigung & Momentum

**Aktuell:** `PLAYER_SPEED = 300` wird instant gesetzt. Keine Trägheit.

**Ziel:** Mario-ähnliches Bewegungsgefühl mit Anlauf, Auslauf und Richtungswechsel-Slide.

**Umsetzung in `GameScene.ts` → `update()` (Player-Bereich):**

```
const ACCEL = 1200;        // px/s²
const DECEL = 800;         // px/s² (beim Loslassen)
const TURN_DECEL = 1400;   // px/s² (bei Richtungswechsel)
const MAX_SPEED = 300;     // unverändert

// Statt: body.setVelocityX(direction * PLAYER_SPEED);
// Neu:
if (cursors.left.isDown) {
    if (body.velocity.x > 0) {
        // Richtungswechsel: härter abbremsen
        body.velocity.x -= TURN_DECEL * delta;
        if (body.velocity.x <= 0) body.velocity.x = -MAX_SPEED;
    } else {
        body.velocity.x = Math.max(body.velocity.x - ACCEL * delta, -MAX_SPEED);
    }
} else if (cursors.right.isDown) {
    if (body.velocity.x < 0) {
        body.velocity.x += TURN_DECEL * delta;
        if (body.velocity.x >= 0) body.velocity.x = MAX_SPEED;
    } else {
        body.velocity.x = Math.min(body.velocity.x + ACCEL * delta, MAX_SPEED);
    }
} else {
    // Ausrollen
    if (Math.abs(body.velocity.x) < 5) {
        body.velocity.x = 0;
    } else if (body.velocity.x > 0) {
        body.velocity.x = Math.max(0, body.velocity.x - DECEL * delta);
    } else {
        body.velocity.x = Math.min(0, body.velocity.x + DECEL * delta);
    }
}
```

- `delta` = `this.game.loop.delta / 1000` oder Phaser's physics delta.
- Alternativ: `body.setDragX(800)` und `body.setMaxVelocityX(300)`, dann nur `setAccelerationX()` setzen — einfacher aber weniger Kontrolle über Turn-Decel.
- **Achtung:** Solver (`src/engine/Physics.ts`) muss ggf. angepasst werden, wenn die erreichbare Sprungweite sich durch Beschleunigung ändert (bei konstanter Max-Geschwindigkeit aber identisch).
- **Dateien:** `src/scenes/GameScene.ts` (update loop, Player-Sektion), `src/config.ts` (neue Konstanten)

**Test:** Manuell spielbar fühlen + ggf. Level-Solvability-Test erneut laufen lassen.

---

### 1.2 — Variabler Sprung

**Aktuell:** Immer volle Sprunghöhe, unabhängig von Tastendruck-Dauer.

**Ziel:** Kurzes Antippen = kleiner Hüpfer. Langes Halten = voller Sprung.

**Umsetzung:**
```
// In update(), nach dem Sprung-Trigger:
if (cursors.up.isDown && body.touching.down) {
    body.setVelocityY(JUMP_VELOCITY); // -900
    this.isJumping = true;
}

// Während des Sprungs:
if (this.isJumping && body.velocity.y < 0) {
    if (!cursors.up.isDown) {
        // Button losgelassen → Sprung abschneiden
        body.velocity.y *= 0.55; // Mario-ähnlicher Multiplier
        this.isJumping = false;
    }
}
if (body.touching.down) {
    this.isJumping = false;
}
```

- Neue Property: `private isJumping: boolean = false`
- Mario verwendet ~0.5 als Cut-Multiplier. 0.55 gibt minimal höhere kurze Sprünge.
- **Keine Auswirkung auf Solver**, da Max-Sprunghöhe bei vollem Tastendruck identisch bleibt.
- **Dateien:** `src/scenes/GameScene.ts`

---

### 1.3 — Kamera-Scroll-Lock

**Aktuell:** `this.cameras.main.startFollow(this.player, true, 0.1, 0.1)` — Kamera folgt in beide Richtungen.

**Ziel:** Kamera scrollt nur nach rechts, nie zurück. Vertikal nur wenn Spieler springt (oberer Dead Zone).

**Umsetzung:**
```
// In create():
this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
this.cameras.main.setDeadzone(0, 0); // optional
this.lastCameraX = 0;

// In update():
if (this.cameras.main.scrollX < this.lastCameraX) {
    this.cameras.main.scrollX = this.lastCameraX;
}
this.lastCameraX = this.cameras.main.scrollX;
```

- Optional: `setFollowOffset()` um den Player nicht exakt zu zentrieren (mehr Sicht nach rechts).
- **Dateien:** `src/scenes/GameScene.ts` (create + update)

---

### 1.4 — Sound Effects (SFX)

**Aktuell:** Nur Hintergrundmusik. Keine Spiel-Sounds.

**Ziel:** Coin, Jump, Stomp, Hit, Block-Bump, Power-Up, Death, Goal als prozedurale Sounds (Web Audio API).

**Umsetzung:**

Neue Klasse oder Helper-Methoden in `GameScene.ts`:

```typescript
// Coin-Sound (kurzer "bling"): 2 Sinus-Oszillatoren, Terz aufwärts, 80ms
private playCoinSound() {
    if (!this.audioContext || !this.audioMaster) return;
    const now = this.audioContext.currentTime;
    // Hoher Ton: B5 → E6
    [988, 1319].forEach((freq, i) => {
        const osc = this.audioContext!.createOscillator();
        const gain = this.audioContext!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.08, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.12);
        osc.connect(gain);
        gain.connect(this.audioMaster!);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.15);
    });
}

// Jump-Sound (kurzer "boing"): Sinus-Sweep aufwärts, 100ms
private playJumpSound() {
    const now = this.audioContext!.currentTime;
    const osc = this.audioContext!.createOscillator();
    const gain = this.audioContext!.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    osc.connect(gain);
    gain.connect(this.audioMaster!);
    osc.start(now); osc.stop(now + 0.12);
}

// Stomp-Sound ("thump"): Sinus-Sweep abwärts + Rauschen, 80ms
private playStompSound() {
    const now = this.audioContext!.currentTime;
    // Kick-ähnlich: Sinus 200→60Hz
    const osc = this.audioContext!.createOscillator();
    const gain = this.audioContext!.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(250, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
    osc.connect(gain);
    gain.connect(this.audioMaster!);
    osc.start(now); osc.stop(now + 0.1);
}

// Hit/Damage-Sound ("bump"): kurzer tiefer Ton, 100ms
private playHitSound() {
    const now = this.audioContext!.currentTime;
    const osc = this.audioContext!.createOscillator();
    const gain = this.audioContext!.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, now);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
    osc.connect(gain);
    gain.connect(this.audioMaster!);
    osc.start(now); osc.stop(now + 0.1);
}

// Block-Bump-Sound ("bump up"): wie Jump aber tiefer
private playBlockSound() {
    const now = this.audioContext!.currentTime;
    const osc = this.audioContext!.createOscillator();
    const gain = this.audioContext!.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.setValueAtTime(350, now + 0.03);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    osc.connect(gain);
    gain.connect(this.audioMaster!);
    osc.start(now); osc.stop(now + 0.08);
}

// Power-Up-Sound (aufsteigende Folge): rapid notes, 500ms
private playPowerUpSound() {
    const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
    notes.forEach((freq, i) => {
        const osc = this.audioContext!.createOscillator();
        const gain = this.audioContext!.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.06, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.16);
        osc.connect(gain);
        gain.connect(this.audioMaster!);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.16);
    });
}

// Death-Sound (absteigende Melodie): fallende Noten, 1s
// Goal-Sound (Fanfare): aufsteigende Fanfare, 2s
```

**Trigger-Punkte:**
- Jump-Sound: bei `body.setVelocityY(JUMP_VELOCITY)` in update()
- Coin-Sound: in `collectCoin()` 
- Stomp-Sound: in `stompEnemy()` (Collision-Handler)
- Hit-Sound: in `playerHit()`
- Block-Sound: beim Block-Treffer (question block hit)
- Power-Up-Sound: in `collectPowerUp()`
- Death-Sound: in `playerHit()` wenn `lives <= 0`
- Goal-Sound: beim Goal-Overlap

**Dateien:** `src/scenes/GameScene.ts` (neue SFX-Methoden + Trigger-Integration)

---

## Phase 2: Player & World

### 2.1 — Walking-Animation (Player-Frames)

**Aktuell:** 3 statische Texturen (`player_idle`, `player_big`, `player_fire`). Keine Animation.

**Ziel:** Pro Player-Status 3 Frames: Idle, Walk1, Walk2 (+ Jump-Frame). Getauscht per Phaser-Timer oder manuellem Frame-Counter.

**Umsetzung:**

1. **In `BootScene.ts`**: Für jeden Player-Status (small, big, fire) jeweils 3 Texturen generieren:
   - `player_idle` / `player_walk1` / `player_walk2` / `player_jump`
   - `player_big_idle` / `player_big_walk1` / `player_big_walk2` / `player_big_jump`
   - `player_fire_idle` / `player_fire_walk1` / `player_fire_walk2` / `player_fire_jump`
   
2. **Walk-Frames**: Leichte Beinverschiebung (rechtes Bein vor, linkes Bein vor), Arme schwingen. Cap, Oberkörper nahezu identisch.

3. **Jump-Frame**: Arme ausgestreckt, Beine angezogen.

4. **In `GameScene.ts`**: Frame-Management
   ```
   private animFrame: number = 0;
   private animTimer: number = 0;
   private readonly ANIM_SPEED = 150; // ms pro Frame
   
   // In update():
   if (!body.touching.down) {
       // Jump-Frame
       this.player.setTexture(`${prefix}_jump`);
   } else if (Math.abs(body.velocity.x) > 10) {
       this.animTimer += delta;
       if (this.animTimer >= this.ANIM_SPEED) {
           this.animTimer = 0;
           this.animFrame = (this.animFrame + 1) % 2;
       }
       this.player.setTexture(`${prefix}_walk${this.animFrame + 1}`);
   } else {
       // Idle
       this.animFrame = 0;
       this.animTimer = 0;
       this.player.setTexture(`${prefix}_idle`);
   }
   ```

- `prefix` = `'player'` / `'player_big'` / `'player_fire'` je nach Status.
- Anim-Geschwindigkeit an `PLAYER_SPEED` koppeln (schneller = schnellere Animation).

**Alternativ-Ansatz (einfacher, visuell fast gleich gut):**
Statt separater Frames: `setScale(this.animFrame % 2 === 0 ? 1 : 0.95, this.animFrame % 2 === 0 ? 0.95 : 1)` für einen "Wobble"-Effekt beim Laufen. Weniger authentisch aber deutlich schneller.

**Dateien:** `src/scenes/BootScene.ts` (Textur-Generierung), `src/scenes/GameScene.ts` (Animation-Loop)

---

### 2.2 — Flagpole & Level-Ende

**Aktuell:** Player berührt `flag`-Sprite → Fade-Out → nächster Level.

**Ziel:** Player rutscht Fahnenmast runter, Fahne geht hoch, Score für Höhe, "Course Clear"-Text.

**Umsetzung:**

1. **Flagpole-Objekt**: Neuer Level-Typ `flagpole`:
   - Schmaler Mast (8x480px) + grüne Fahne oben
   - Player-Overlap triggert "Goal-Sequenz"
   
2. **Goal-Sequenz**:
   - Player-Kontrolle deaktivieren
   - Player zur Mast-Mitte bewegen (X)
   - Player rutscht Y-mäßig nach unten (Tween, 800ms)
   - Während Rutsch: Score zählt hoch (abhängig von Y-Position beim Touch)
   - Fahne fährt an Mast hoch (Tween)
   - Am Boden: Player läuft automatisch nach rechts (kurz) zu "Castle" (Tor-Textur)
   - "COURSE CLEAR" Text erscheint
   - Nach 2s: Fade-Out → nächster Level

3. **Score für Höhe**:
   - Oberes Mast-Drittel: 5000 Punkte
   - Mittleres Drittel: 2000 Punkte
   - Unteres Drittel: 100 Punkte
   - Score-Popup beim Erreichen

4. **Goal-Sound**: Fanfare (Phase 1.4)

- **Achtung:** Level-Daten müssen Goal-Position anpassen. Aktuelles `goal`-Property in Level-Definition beibehalten.
- **Dateien:** `src/scenes/GameScene.ts` (Goal-Handling, neue Methode `triggerGoalSequence()`), `src/scenes/BootScene.ts` (flagpole-Textur)

---

### 2.3 — Power-Up Slide

**Aktuell:** Power-Up spawnt mit Velocity (-200 Y), fällt und bleibt liegen.

**Ziel:** Power-Up springt aus Block, fällt auf Plattform und rutscht horizontal weiter.

**Umsetzung:**
```
// In QB-Hit-Handler, nach Power-Up-Spawn:
const item = this.physics.add.sprite(x, y, itemTexture);
item.body.setVelocity(-100, -200); // erst nach rechts-links? Oder Richtung zufällig?
item.body.setBounce(0.3);
item.body.setCollideWorldBounds(true);

// Item soll auf Plattformen rutschen:
this.physics.add.collider(item, this.platforms);
this.physics.add.collider(item, this.movingPlatforms);
```

- Item braucht `body.setDragX(0)` (kein Drag) oder sehr niedrigen Drag.
- Richtung: Zufällig oder basierend auf Player-Position.
- **Dateien:** `src/scenes/GameScene.ts` (QB-Hit-Logik)

---

### 2.4 — Brick Blocks

**Aktuell:** Nur `question`-Blöcke, keine zerstörbaren Ziegel.

**Ziel:** Neue Block-Typen: `brick` (normal), `brick_secret` (enthält Münze), `brick_multi` (mehrere Münzen). Big Mario zerstört sie.

**Umsetzung:**

1. **Neuer PlatformType**: `'brick'` (solid), `'brick_secret'` (solid wie brick), `'brick_multi'` (solid).

2. **In BootScene.ts**: `brick`-Textur generieren (Ziegel-Optik mit Rillen).

3. **In GameScene.ts — Player-Block-Collision**:
   ```
   // Wenn Player von unten gegen brick stößt:
   if (isBrickBlock(block)) {
       if (isPlayerBig) {
           // Zerstören:
           destroyBrick(block);  // Partikel, Block weg, Sound
           score += 50;
       } else {
           // Nur bumpen:
           bumpBlock(block); // Tween, kein Inhalt
       }
   }
   ```

4. **Zerstörungs-Animation**: 4 kleine Partikel fliegen in 4 Richtungen, fade out (200ms).

5. **Block-Typen**:
   - `brick`: Leer, zerstörbar, kein Inhalt.
   - `brick_secret`: Enthält eine Münze oder Power-Up (wie QB).
   - `brick_multi`: Gibt 10 Münzen bei schnellem Hüpfen (Timer-basiert).

- **Dateien:** `src/scenes/GameScene.ts` (Block-Collision), `src/scenes/BootScene.ts` (brick-Texturen), `src/config.ts` (neue Typen), `src/data/levels/` (Level-Daten mit bricks erweitern)

---

## Phase 3: Enemies & Secrets

### 3.1 — Koopa-Shell

**Aktuell:** Koopa wird gestompt → stirbt wie jeder andere Gegner (shrink+fade).

**Ziel:** Gestompter Koopa → Shell bleibt liegen. Kickbar mit Player-Berührung. Shell tötet andere Gegner, prallt von Wänden ab.

**Umsetzung:**

1. **Koopa-Zustände**:
   - `walking`: Normaler Patrol-Mode
   - `shell_idle`: Gestompt, Shell liegt still
   - `shell_moving`: Shell bewegt sich (gekickt)

2. **Stomp-Handling**:
   ```
   if (enemyType === 'koopa') {
       // Statt Tod: Koopa zieht sich in Shell zurück
       koopa.setTexture('koopa_shell'); // neue Textur benötigt
       koopa.body.setSize(28, 20);       // flacher
       koopa.body.setVelocity(0, 0);
       koopa.state = 'shell_idle';
       koopa.shellTimer = 5000; // 5s bis Koopa wieder rauskommt
   }
   ```

3. **Shell-Kick**: 
   - Player berührt idle Shell von der Seite → Shell kickt in Richtung vom Player weg
   - `body.setVelocityX(±400)` (je nach Richtung)
   - Shell tötet Gegner bei Kollision (statt umgekehrt)
   - Shell prallt von Wänden ab (`body.setBounce(1)`)

4. **Shell kann Player verletzen**: Wenn Shell mit >100px/s auf Player trifft und Player nicht von oben kommt.

- Neue Texturen: `koopa_shell` (flacher Grün/Rot-Panzer)
- **Dateien:** `src/scenes/GameScene.ts` (Enemy-Collision, Koopa-AI), `src/scenes/BootScene.ts` (koopa_shell Textur)

---

### 3.2 — Hidden Blocks

**Aktuell:** Keine unsichtbaren Blöcke.

**Ziel:** Bestimmte Blöcke sind unsichtbar, erscheinen beim Anspringen von unten.

**Umsetzung:**

1. **Neuer PlatformType**: `'hidden'` (keine Textur, aber Collision-Body existiert).

2. **In BootScene.ts**: `'hidden'` als unsichtbaren Block definieren (oder keine Textur generieren).

3. **In GameScene.ts**:
   ```
   // Player stößt von unten gegen hidden-Block:
   if (block.type === 'hidden') {
       block.setTexture('question'); // oder 'brick'
       block.type = 'question';      // wird zum normalen QB
       spawnCoinFromBlock(block);    // oder Power-Up
       playBlockSound();
   }
   ```

- Hidden-Blöcke haben denselben Collision-Body wie normale Blöcke.
- Können auch über dem Abgrund platziert werden (Secret-Fundament).
- **Dateien:** `src/scenes/GameScene.ts`, `src/config.ts`, Level-Daten

---

### 3.3 — Star-Invincibility killt Gegner

**Aktuell:** Stern = 5s Immunität, aber Gegner überleben Kontakt.

**Ziel:** Während Stern-Invincibility sterben Gegner bei Berührung (wie in Mario).

**Umsetzung:**
```
// In Collision-Handler (player vs enemy):
if (this.isStarInvincible) {
    killEnemy(enemy); // gleiche Logik wie Stomp, aber ohne Bounce
    score += 200;     // wie Mario: 200, 400, 800, 1-up, etc. chain
    // Chain-Multiplier:
    this.starKillChain++;
    score += 200 * Math.pow(2, Math.min(this.starKillChain, 4));
}
```

- `starKillChain` auf 0 zurücksetzen wenn Stern ausläuft.
- Kein Spieler-Bounce bei Stern-Kill.
- Optional: Gegner fliegt in Todes-Animation (shrink+rotate).
- **Dateien:** `src/scenes/GameScene.ts` (Collision-Handler)

---

## Phase 4: Tiefe & Polishing

### 4.1 — Pipes betreten (Sub-Areas)

**Aktuell:** Pipes sind solide Objekte, nicht betretbar.

**Ziel:** Down+Jump auf Pipe → Player "verschwindet" in Pipe → neuer Level-Bereich (Underground).

**Umsetzung:**

1. **Pipe-Entry-Detection**:
   - Wenn Player auf Pipe-Top steht UND `down` gedrückt + `jump` → Pipe betreten
   - Alternativ: Overlap mit spezieller "pipe_entry"-Zone auf der Pipe

2. **Entry-Animation**:
   - Player sinkt in Pipe (scaleY → 0, Y → pipe.y + pipe.height/2)
   - Tween, 400ms
   - Fade-Out

3. **Sub-Area Management**:
   - Neue Level-Definitionen für Underground-Bereiche
   - Level-Daten enthalten `subArea` Property mit Referenz auf Underground-Level
   - Bei Pipe-Entry: Level wechseln zu Sub-Area
   - Exit-Pipe: Zurück zum Haupt-Level

4. **Pipeline**:
   - Pipe-Platzierung in Level-Daten mit `exitLevel` Property
   - Warp-Pipes: Direkt zu anderem Level (kein Sub-Area, sondern Level-Skip)

- **Achtung:** Erfordert erhebliche Level-Daten-Erweiterung. Für 90 Levels einzeln Sub-Areas zu designen ist viel Arbeit.
- **Pragmatischer Ansatz**: Nur auf bestimmten Pipes aktivieren (markiert in Level-Daten).
- **Dateien:** `src/scenes/GameScene.ts` (Pipe-Entry), `src/data/levels/` (Sub-Area-Levels)

---

### 4.2 — Stored Item Slot

**Aktuell:** Kein Reserve-Item.

**Ziel:** Wenn Player bereits Big/Fire ist und weiteres Power-Up sammelt → Item geht in Reserve-Slot oben im HUD. Bei Treffer (downgrade to small) erscheint Reserve-Item automatisch.

**Umsetzung:**

1. **Reserve State**:
   ```
   private storedItem: 'mushroom' | 'flower' | 'star' | null = null;
   ```

2. **HUD-Element**:
   - Kleines Rechteck oben links neben Coins
   - Zeigt Mini-Textur des gespeicherten Items

3. **Bei Power-Up-Kollektion**:
   ```
   if (isPlayerBig && item.type !== 'star' && !this.storedItem) {
       this.storedItem = item.type;
       updateStoredItemHUD();
   }
   ```

4. **Bei Treffer (Big → Small)**:
   ```
   if (this.storedItem) {
       spawnStoredItem();
       this.storedItem = null;
   }
   ```

- **Dateien:** `src/scenes/GameScene.ts` (Power-Up-Logik, HUD-Update)

---

### 4.3 — Death Animation

**Aktuell:** Player wird rot, springt hoch, 2s Pause, Neustart.

**Ziel:** Player springt hoch, fällt aus dem Bildschirm, Musik stoppt, "GAME OVER" oder Life-Lost Screen.

**Umsetzung:**
```
// In playerHit() wenn Small Mario:
this.isDead = true;
this.player.setTint(0xff0000);
this.player.body.setVelocity(0, -500);  // Hochsprung
this.player.body.setAllowGravity(true);
// Kamera stoppt Folgen:
this.cameras.main.stopFollow();
// Musik aus:
this.stopBgm(); // existiert bereits teilweise
// Warten bis Player aus Screen:
this.time.delayedCall(2000, () => {
    this.scene.restart(...);
});
```

- Player-Textur während Tod: Arme hoch, Augen X_X (neue Frame-Textur oder Tint-Override).
- Death-Sound abspielen (Phase 1.4).
- **Dateien:** `src/scenes/GameScene.ts` (playerHit, deathSequence)

---

### 4.4 — HUD-Animationen

**Aktuell:** Statische Text-Anzeigen, aktualisiert per `setText()`.

**Ziel:** Coin-Counter tickt hoch, Score-Popups fliegen, "1-UP" erscheint.

**Umsetzung:**

1. **Coin-Counter Tick**:
   ```
   // Statt: coinText.setText(`${this.coinCount}`);
   // Tween den Counter:
   this.tweens.addCounter({
       from: this.displayedCoins,
       to: this.coinCount,
       duration: 300,
       onUpdate: (tween) => {
           coinText.setText(`${Math.floor(tween.getValue())}`);
       }
   });
   this.displayedCoins = this.coinCount;
   ```

2. **Score-Popup** ("+100", "+500", "+200", "1UP"):
   ```
   private showScorePopup(text: string, x: number, y: number) {
       const popup = this.add.text(x, y, text, { fontSize: '16px', color: '#ffffff' });
       popup.setDepth(1001);
       this.tweens.add({
           targets: popup,
           y: y - 40,
           alpha: 0,
           duration: 800,
           onComplete: () => popup.destroy()
       });
   }
   ```

3. **"1-UP" Text**: Bei 100 Coins oder 1-UP Pilz, großer grüner Text in Bildschirmmitte.

4. **Timer-Warnung**: Timer < 100 → rot blinkend.

- **Dateien:** `src/scenes/GameScene.ts` (UI-Update-Methoden)

---

## Zusammenfassung der Datei-Änderungen pro Phase

| Phase | Datei(en) | Umfang |
|-------|-----------|--------|
| 1.1 | `GameScene.ts` (update), `config.ts` | ~50 Zeilen |
| 1.2 | `GameScene.ts` (update) | ~15 Zeilen |
| 1.3 | `GameScene.ts` (create+update) | ~10 Zeilen |
| 1.4 | `GameScene.ts` (neue SFX-Methoden + Trigger) | ~150 Zeilen |
| 2.1 | `BootScene.ts` (Texturen), `GameScene.ts` (Anim) | ~100 Zeilen |
| 2.2 | `GameScene.ts`, `BootScene.ts` | ~120 Zeilen |
| 2.3 | `GameScene.ts` (QB-Hit) | ~15 Zeilen |
| 2.4 | `GameScene.ts`, `BootScene.ts`, `config.ts`, Level-Daten | ~80 Zeilen + Daten |
| 3.1 | `GameScene.ts` (Enemy), `BootScene.ts` | ~120 Zeilen |
| 3.2 | `GameScene.ts`, `config.ts`, Level-Daten | ~40 Zeilen + Daten |
| 3.3 | `GameScene.ts` (Collision) | ~15 Zeilen |
| 4.1 | `GameScene.ts`, Level-Daten | ~150 Zeilen + Daten |
| 4.2 | `GameScene.ts` (Power-Up, HUD) | ~60 Zeilen |
| 4.3 | `GameScene.ts` (playerHit) | ~30 Zeilen |
| 4.4 | `GameScene.ts` (UI) | ~60 Zeilen |

---

## Abhängigkeiten zwischen Phasen

```
Phase 1 (Game Feel)
  ├─ 1.1 Acceleration ←─── Keine Abhängigkeiten
  ├─ 1.2 Variable Jump  ←─── Keine Abhängigkeiten  
  ├─ 1.3 Camera Lock   ←─── Keine Abhängigkeiten
  └─ 1.4 Sound Effects  ←─── Braucht audioMaster (existiert)
       ↑
       │ Wird von ALLEN späteren Phasen verwendet
       │ (jedes Feature triggert SFX)

Phase 2 (Player & World)
  ├─ 2.1 Walk Anim      ←─── 1.1 (braucht velocity für Frame-Speed)
  ├─ 2.2 Flagpole       ←─── 1.4 (braucht Goal-SFX)
  ├─ 2.3 Power-Up Slide ←─── 1.4 (Power-Up SFX)
  └─ 2.4 Brick Blocks   ←─── 1.4 (Block-SFX)

Phase 3 (Enemies & Secrets)
  ├─ 3.1 Koopa Shell    ←─── 1.4 (Stomp-SFX), 2.1 (optional, Shell-Textur)
  ├─ 3.2 Hidden Blocks  ←─── 1.4 (Block-SFX)
  └─ 3.3 Star Kill      ←─── 1.4 (Kill-SFX)

Phase 4 (Tiefe & Polish)
  ├─ 4.1 Pipes          ←─── 1.4 (Entry-SFX)
  ├─ 4.2 Item Slot      ←─── 1.4 (Power-Up SFX)
  ├─ 4.3 Death Anim     ←─── 1.4 (Death-SFX)
  └─ 4.4 HUD Anim       ←─── 1.4 (Coin-SFX)
```

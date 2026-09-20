import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const testsDir = dirname(fileURLToPath(import.meta.url));

/**
 * Stomp-Mechanik (R-BUG stomp regression):
 * Spieler springt von oben auf stompbaren Gegner -> Gegner zerstoert,
 * +500 Punkte, Bounce -400, Spieler lebt.
 *
 * Root Cause der Regression (commit e345c5e): Phaser Arcade `body.y` ist die
 * OBERKANTE des Bodies. Die alte Formel `e.body.y - e.body.height / 2` lag
 * `halfHeight` ueber der echten Gegner-Oberkante, wodurch der Toleranz-Puffer
 * von 15px negativ wurde (Goomba h=42: 15 - 21 = -6px). Nach der Collider-
 * Separation liegt playerFeet exakt auf der Body-Oberkante -> isStomping war
 * immer false -> playerHit(). Stompen war unmoeglich.
 *
 * Da Phaser in jsdom nicht importierbar ist (CanvasFeatures benoetigt echtes
 * Canvas), wird die Geometrie-Regel hier als Referenz-Implementierung gespiegelt
 * und der GameScene-Quellcode per Source-Guard gegen die exakte Regression
 * abgesichert.
 */

// Dokumentierte Stomp-Regel (Spiegelbild der GameScene-Logik):
// playerFeet = p.body.bottom; enemyTop = e.body.y (Body-Oberkante);
// isStomping = falling && playerFeet <= enemyTop + 15 && |p.x - e.x| < e.displayWidth/2 + 15
function isStomping(
    playerBody: { bottom: number; velocity: { y: number } },
    playerX: number,
    enemy: { body: { y: number }; displayWidth: number; x: number },
): boolean {
    const playerFeet = playerBody.bottom;
    const enemyTop = enemy.body.y;
    const isFalling = playerBody.velocity.y >= 0;
    return isFalling
        && playerFeet <= enemyTop + 15
        && Math.abs(playerX - enemy.x) < enemy.displayWidth / 2 + 15;
}

describe('Stomp Mechanics', () => {
    // Goomba: Texture 28x42, Body haengt an der Textur -> body.y = Sprite-Top
    const makeGoomba = (x: number, topY: number) => ({
        x,
        displayWidth: 28,
        body: { y: topY },
    });
    // Small Mario: Body 22x32, body.bottom = body.y + 32
    const makePlayerBody = (topY: number, vy: number) => ({
        bottom: topY + 32,
        velocity: { y: vy },
    });

    it('stompt wenn Fuesse exakt auf Gegner-Oberkante landen (Fallend)', () => {
        // Spieler-Fuesse auf Hoehe der Gegner-Body-Oberkante (typischer Collider-Kontakt)
        const player = makePlayerBody(456, 300); // bottom = 488
        const goomba = makeGoomba(1622, 488);    // body.y = 488 = Oberkante
        expect(isStomping(player, 1622, goomba)).toBe(true);
    });

    it('stompt innerhalb des 15px-Toleranz-Fensters an der Oberkante', () => {
        const player = makePlayerBody(471, 200); // bottom = 503 = enemyTop + 15
        const goomba = makeGoomba(1622, 488);
        expect(isStomping(player, 1622, goomba)).toBe(true);
    });

    it('kein Stomp bei tiefem Seitkontakt (Fuesse unter Oberkante+15)', () => {
        const player = makePlayerBody(488, 100); // bottom = 520 > 488 + 15
        const goomba = makeGoomba(1622, 488);
        expect(isStomping(player, 1622, goomba)).toBe(false);
    });

    it('kein Stomp beim Aufwaertsspringen von unten', () => {
        const player = makePlayerBody(456, -900); // steigend
        const goomba = makeGoomba(1622, 488);
        expect(isStomping(player, 1622, goomba)).toBe(false);
    });

    it('kein Stomp bei horizontaler Versetzung ausserhalb des Gegner-Koerpers', () => {
        const player = makePlayerBody(456, 300);
        const goomba = makeGoomba(1622, 488);
        expect(isStomping(player, 1622 + 30, goomba)).toBe(false);
    });

    it('Source-Guard: enemyTop muss aus e.body.y (Body-Oberkante) stammen', () => {
        const src = readFileSync(join(testsDir, '..', 'src', 'scenes', 'GameScene.ts'), 'utf8');
        expect(src).toContain('const enemyTop = e.body.y;');
        expect(src, 'Regression: e.body.y ist die Body-OBERKANTE, darf nicht um height/2 verschoben werden').not.toContain('e.body.y - e.body.height / 2');
    });

    it('Source-Guard: Stomp-Effekte (+500, Bounce -400) vorhanden', () => {
        const src = readFileSync(join(testsDir, '..', 'src', 'scenes', 'GameScene.ts'), 'utf8');
        expect(src).toContain('p.setVelocityY(-400)');
        expect(src).toContain('this.score += 500');
    });

    it('Source-Guard: Nicht-stompbare Gegner-Liste intakt', () => {
        const src = readFileSync(join(testsDir, '..', 'src', 'scenes', 'GameScene.ts'), 'utf8');
        for (const t of ['piranha', 'thwomp', 'boo', 'lakitu', 'bullet_bill', 'fireball', 'boss']) {
            expect(src, `NON_STOMPABLE fehlt '${t}'`).toContain(`'${t}'`);
        }
    });
});

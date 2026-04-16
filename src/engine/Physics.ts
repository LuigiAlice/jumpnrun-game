export const DEFAULT_PHYSICS = {
    TILE_SIZE: 32,
    MAX_JUMP_DISTANCE: 800,  // Maintains compatibility with existing level design
    MAX_JUMP_UP: 350,
    MAX_FALL_DOWN: 1000
};

interface Platform {
    x: number;
    y: number;
    w: number;
    h: number;
    type: string;
}

export class Physics {
    private platforms: Platform[];

    constructor(platforms: Platform[], _width: number, _height: number) {
        this.platforms = platforms;
    }

    private canJumpTo(from: Platform, to: Platform): boolean {
        const fromLeft = from.x - from.w / 2;
        const fromRight = from.x + from.w / 2;
        const fromTop = from.y - from.h / 2;

        const toLeft = to.x - to.w / 2;
        const toRight = to.x + to.w / 2;
        const toTop = to.y - to.h / 2;

        const horizontalGap = Math.max(toLeft - fromRight, fromLeft - toRight, 0);

        if (horizontalGap > DEFAULT_PHYSICS.MAX_JUMP_DISTANCE) {
            return false;
        }

        const verticalDiff = toTop - fromTop;

        if (verticalDiff > DEFAULT_PHYSICS.MAX_FALL_DOWN) {
            return false;
        }

        if (verticalDiff < -DEFAULT_PHYSICS.MAX_JUMP_UP) {
            return false;
        }

        return true;
    }

    public canReach(from: Platform, to: Platform): boolean {
        return this.canJumpTo(from, to);
    }

    private canJumpToPoint(from: Platform, toX: number, toY: number): boolean {
        const fromLeft = from.x - from.w / 2;
        const fromRight = from.x + from.w / 2;
        const fromTop = from.y - from.h / 2;

        const horizontalGap = Math.max(toX - fromRight, fromLeft - toX, 0);

        if (horizontalGap > DEFAULT_PHYSICS.MAX_JUMP_DISTANCE) {
            return false;
        }

        const verticalDiff = toY - fromTop;

        if (verticalDiff > DEFAULT_PHYSICS.MAX_FALL_DOWN) {
            return false;
        }

        if (verticalDiff < -DEFAULT_PHYSICS.MAX_JUMP_UP) {
            return false;
        }

        return true;
    }

    private findPlatformUnderPoint(x: number, y: number): Platform | null {
        let closestPlatform: Platform | null = null;
        let closestDist = Infinity;

        for (const p of this.platforms) {
            const pLeft = p.x - p.w / 2;
            const pRight = p.x + p.w / 2;
            const pTop = p.y - p.h / 2;

            if (x >= pLeft - 20 && x <= pRight + 20) {
                if (pTop >= y - 50) {
                    const dist = pTop - y;
                    if (dist >= 0 && dist < closestDist) {
                        closestDist = dist;
                        closestPlatform = p;
                    }
                }
            }
        }

        return closestPlatform;
    }

    private findStartingPlatform(x: number, y: number): Platform | null {
        const platformBelow = this.findPlatformUnderPoint(x, y);
        if (platformBelow) return platformBelow;

        let closestPlatform: Platform | null = null;
        let closestDist = Infinity;

        for (const p of this.platforms) {
            const pLeft = p.x - p.w / 2;
            const pRight = p.x + p.w / 2;
            const pTop = p.y - p.h / 2;

            if (x >= pLeft - 50 && x <= pRight + 50) {
                const dist = Math.abs(pTop - y);
                if (dist < closestDist) {
                    closestDist = dist;
                    closestPlatform = p;
                }
            }
        }

        return closestPlatform;
    }

    private platformEquals(a: Platform, b: Platform): boolean {
        return a.x === b.x && a.y === b.y && a.w === b.w && a.h === b.h;
    }

    public isSolvable(playerStartX: number, playerStartY: number, goalX: number, goalY: number = 0): boolean {
        if (this.platforms.length === 0) return false;

        let startPlatform = this.findPlatformUnderPoint(playerStartX, playerStartY);
        if (!startPlatform) {
            const lowestPlatform = [...this.platforms].sort((a, b) => b.y - a.y)[0];
            if (!lowestPlatform) return false;
            startPlatform = lowestPlatform;
        }

        const queue: Platform[] = [startPlatform];
        const visited: Set<string> = new Set([`${startPlatform.x},${startPlatform.y}`]);

        while (queue.length > 0) {
            const current = queue.shift()!;

            if (this.canJumpToPoint(current, goalX, goalY)) {
                return true;
            }

            for (const next of this.platforms) {
                const key = `${next.x},${next.y}`;
                if (visited.has(key)) continue;

                if (this.canJumpTo(current, next)) {
                    visited.add(key);
                    queue.push(next);
                }
            }
        }

        return false;
    }

    public findPath(playerStartX: number, playerStartY: number, goalX: number, goalY: number = 0): Platform[] | null {
        if (this.platforms.length === 0) return null;

        let startPlatform = this.findPlatformUnderPoint(playerStartX, playerStartY);
        if (!startPlatform) {
            const lowestPlatform = [...this.platforms].sort((a, b) => b.y - a.y)[0];
            if (!lowestPlatform) return null;
            startPlatform = lowestPlatform;
        }

        const queue: { platform: Platform; path: Platform[] }[] = [
            { platform: startPlatform, path: [startPlatform] }
        ];
        const visited: Set<string> = new Set([`${startPlatform.x},${startPlatform.y}`]);

        while (queue.length > 0) {
            const { platform: current, path } = queue.shift()!;

            if (this.canJumpToPoint(current, goalX, goalY)) {
                return path;
            }

            for (const next of this.platforms) {
                const key = `${next.x},${next.y}`;
                if (visited.has(key)) continue;

                if (this.canJumpTo(current, next)) {
                    visited.add(key);
                    queue.push({ platform: next, path: [...path, next] });
                }
            }
        }

        return null;
    }
}
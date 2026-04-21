export const DEFAULT_PHYSICS = {
    TILE_SIZE: 32,
    MAX_JUMP_DISTANCE: 800,
    MAX_JUMP_UP: 350,
    MAX_FALL_DOWN: 1000,
    PLAYER_WIDTH: 48
};

interface Platform {
    x: number;
    y: number;
    w: number;
    h: number;
    type: string;
}

export interface MovingPlatformData {
    x: number;
    y: number;
    w: number;
    h: number;
    type: string;
    moveType: 'horizontal' | 'vertical' | 'circular';
    range: number;
    speed: number;
}

export class Physics {
    private platforms: Platform[];
    private movingPlatforms: MovingPlatformData[];

    constructor(platforms: Platform[], _width: number, _height: number, movingPlatforms: MovingPlatformData[] = []) {
        this.platforms = platforms;
        this.movingPlatforms = movingPlatforms;
    }

    private getMovingPlatformPositions(mp: MovingPlatformData, time: number = 0): { x: number; y: number }[] {
        const positions: { x: number; y: number }[] = [];
        const steps = 16;

        for (let i = 0; i < steps; i++) {
            const t = (time + i * 200) * 0.00005 * mp.speed;
            let x = mp.x;
            let y = mp.y;

            if (mp.moveType === 'horizontal') {
                x = mp.x + Math.sin(t) * mp.range;
            } else if (mp.moveType === 'vertical') {
                y = mp.y + Math.sin(t) * mp.range;
            } else if (mp.moveType === 'circular') {
                x = mp.x + Math.cos(t) * mp.range;
                y = mp.y + Math.sin(t) * mp.range;
            }

            positions.push({ x, y });
        }

        return positions;
    }

    private canJumpToMovingPlatform(from: Platform, mp: MovingPlatformData): boolean {
        const positions = this.getMovingPlatformPositions(mp);

        for (const pos of positions) {
            const mpLeft = pos.x - mp.w / 2;
            const mpRight = pos.x + mp.w / 2;
            const mpTop = pos.y - mp.h / 2;

            const fromLeft = from.x - from.w / 2;
            const fromRight = from.x + from.w / 2;
            const fromTop = from.y - from.h / 2;

            const horizontalGap = Math.max(mpLeft - fromRight, fromLeft - mpRight, 0);

            if (horizontalGap > DEFAULT_PHYSICS.MAX_JUMP_DISTANCE) {
                continue;
            }

            const verticalDiff = mpTop - fromTop;

            if (verticalDiff > DEFAULT_PHYSICS.MAX_FALL_DOWN) {
                continue;
            }

            if (verticalDiff < -DEFAULT_PHYSICS.MAX_JUMP_UP) {
                continue;
            }

            return true;
        }

        return false;
    }

    private canJumpFromMovingPlatform(mp: MovingPlatformData, to: Platform, time: number = 0): boolean {
        const positions = this.getMovingPlatformPositions(mp);

        for (const pos of positions) {
            const mpLeft = pos.x - mp.w / 2;
            const mpRight = pos.x + mp.w / 2;
            const mpTop = pos.y - mp.h / 2;

            const toLeft = to.x - to.w / 2;
            const toRight = to.x + to.w / 2;
            const toTop = to.y - to.h / 2;

            const horizontalGap = Math.max(toLeft - mpRight, mpLeft - toRight, 0);

            if (horizontalGap > DEFAULT_PHYSICS.MAX_JUMP_DISTANCE) {
                continue;
            }

            const verticalDiff = toTop - mpTop;

            if (verticalDiff > DEFAULT_PHYSICS.MAX_FALL_DOWN) {
                continue;
            }

            if (verticalDiff < -DEFAULT_PHYSICS.MAX_JUMP_UP) {
                continue;
            }

            return true;
        }

        return false;
    }

    private getStaticPlatformReachableFromMoving(mp: MovingPlatformData, visitedStatics: Set<string>): Platform[] {
        const reachable: Platform[] = [];
        const positions = this.getMovingPlatformPositions(mp);

        for (const pos of positions) {
            for (const next of this.platforms) {
                const key = `${next.x},${next.y}`;
                if (visitedStatics.has(key)) continue;

                const mpLeft = pos.x - mp.w / 2;
                const mpRight = pos.x + mp.w / 2;
                const mpTop = pos.y - mp.h / 2;

                const toLeft = next.x - next.w / 2;
                const toRight = next.x + next.w / 2;
                const toTop = next.y - next.h / 2;

                const horizontalGap = Math.max(toLeft - mpRight, mpLeft - toRight, 0);

                if (horizontalGap > DEFAULT_PHYSICS.MAX_JUMP_DISTANCE) {
                    continue;
                }

                const verticalDiff = toTop - mpTop;

                if (verticalDiff > DEFAULT_PHYSICS.MAX_FALL_DOWN) {
                    continue;
                }

                if (verticalDiff < -DEFAULT_PHYSICS.MAX_JUMP_UP) {
                    continue;
                }

                reachable.push(next);
                visitedStatics.add(key);
            }
        }

        return reachable;
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

    private canJumpToPoint(from: Platform, toX: number, toY: number): boolean {
        const fromRight = from.x + from.w / 2;
        const fromLeft = from.x - from.w / 2;
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

    public findPlatformUnderPoint(x: number, y: number): Platform | null {
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

    public isSolvable(playerStartX: number, playerStartY: number, goalX: number, goalY: number = 0): boolean {
        if (this.platforms.length === 0) return false;

        let startPlatform = this.findPlatformUnderPoint(playerStartX, playerStartY);
        if (!startPlatform) {
            const lowestPlatform = [...this.platforms].sort((a, b) => b.y - a.y)[0];
            if (!lowestPlatform) return false;
            startPlatform = lowestPlatform;
        }

        const queue: Platform[] = [startPlatform];
        const visitedStatics: Set<string> = new Set([`${startPlatform.x},${startPlatform.y}`]);
        const visitedMoving: Set<string> = new Set();

        while (queue.length > 0) {
            const current = queue.shift()!;

            if (this.canJumpToPoint(current, goalX, goalY)) {
                return true;
            }

            for (const next of this.platforms) {
                const key = `${next.x},${next.y}`;
                if (visitedStatics.has(key)) continue;

                if (this.canJumpTo(current, next)) {
                    visitedStatics.add(key);
                    queue.push(next);
                }
            }

            for (const mp of this.movingPlatforms) {
                const mpKey = `${mp.x},${mp.y},${mp.moveType},${mp.range}`;
                if (visitedMoving.has(mpKey)) continue;

                if (this.canJumpToMovingPlatform(current, mp)) {
                    visitedMoving.add(mpKey);
                    const reachableFromMoving = this.getStaticPlatformReachableFromMoving(mp, visitedStatics);
                    for (const reachable of reachableFromMoving) {
                        queue.push(reachable);
                    }

                    if (this.canJumpFromMovingPlatform(mp, { x: goalX, y: goalY, w: DEFAULT_PHYSICS.PLAYER_WIDTH, h: 64, type: 'goal' } as Platform)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    public getReachablePlatforms(playerStartX: number, playerStartY: number): Platform[] {
        if (this.platforms.length === 0) return [];

        let startPlatform = this.findPlatformUnderPoint(playerStartX, playerStartY);
        if (!startPlatform) return [];

        const queue: Platform[] = [startPlatform];
        const visitedStatics: Set<string> = new Set([`${startPlatform.x},${startPlatform.y}`]);
        const visitedMoving: Set<string> = new Set();
        const reachable: Platform[] = [startPlatform];

        while (queue.length > 0) {
            const current = queue.shift()!;

            for (const next of this.platforms) {
                const key = `${next.x},${next.y}`;
                if (visitedStatics.has(key)) continue;

                if (this.canJumpTo(current, next)) {
                    visitedStatics.add(key);
                    reachable.push(next);
                    queue.push(next);
                }
            }

            for (const mp of this.movingPlatforms) {
                const mpKey = `${mp.x},${mp.y},${mp.moveType},${mp.range}`;
                if (visitedMoving.has(mpKey)) continue;

                if (this.canJumpToMovingPlatform(current, mp)) {
                    visitedMoving.add(mpKey);
                    const reachableFromMoving = this.getStaticPlatformReachableFromMoving(mp, visitedStatics);
                    for (const r of reachableFromMoving) {
                        if (!reachable.includes(r)) {
                            reachable.push(r);
                            queue.push(r);
                        }
                    }
                }
            }
        }

        return reachable;
    }

    public canReach(from: Platform, to: Platform): boolean {
        return this.canJumpTo(from, to);
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

    public isFullyTraversable(playerStartX: number, playerStartY: number): { traversable: boolean; unreachablePlatforms: Platform[] } {
        const reachable = this.getReachablePlatforms(playerStartX, playerStartY);
        const reachableKeys = new Set(reachable.map(p => `${p.x},${p.y}`));
        const unreachable = this.platforms.filter(p => !reachableKeys.has(`${p.x},${p.y}`));
        return {
            traversable: unreachable.length === 0,
            unreachablePlatforms: unreachable
        };
    }

    public isFullyTraversableToGoal(playerStartX: number, playerStartY: number, goalX: number): { traversable: boolean; unreachablePlatforms: Platform[] } {
        const reachable = this.getReachablePlatforms(playerStartX, playerStartY);
        const reachableKeys = new Set(reachable.map(p => `${p.x},${p.y}`));

        const unreachable = this.platforms.filter(p => {
            if (p.x > goalX) return false;
            return !reachableKeys.has(`${p.x},${p.y}`);
        });

        return {
            traversable: unreachable.length === 0,
            unreachablePlatforms: unreachable
        };
    }
}
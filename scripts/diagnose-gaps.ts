/**
 * diagnose-gaps.ts
 *
 * Analyzes ALL level data files to find problematic platform gaps
 * based on actual game physics.
 *
 * Physics constants from src/scenes/GameScene.ts:
 *   GRAVITY = 2000, JUMP_VELOCITY = 900 (upward, -900),
 *   PLAYER_SPEED = 300
 *
 * Max same-height jump: 300 * (2 * 900 / 2000) = 270px (center-to-center)
 */

import { getLevel, getLevelCount } from "../src/data/levels/index.js";
import type { LevelData, Platform } from "../src/data/levels/index.js";
import * as fs from "node:fs";
import * as path from "node:path";

const GRAVITY = 2000;
const JUMP_VELOCITY = 900;
const PLAYER_SPEED = 300;
const PLAYER_BUFFER = 24; // half-width buffer for landing

interface GapIssue {
  levelId: number;
  levelName: string;
  biome: string;
  platA: Platform;
  platB: Platform;
  edgeGap: number;
  verticalDiff: number;
  maxAllowedGap: number;
  excess: number;
  downhill: boolean;
  unreachable: boolean;
  hasMovingPlatformNearby: boolean;
  firstBlocking: boolean;
  beforeGoal: boolean;
}

function maxJumpDistance(verticalDiff: number): number {
  // verticalDiff: positive = target is below (downhill, easier)
  //               negative = target is above (uphill, harder)
  const discriminant = JUMP_VELOCITY * JUMP_VELOCITY + 2 * GRAVITY * verticalDiff;
  if (discriminant <= 0) return 0; // unreachable uphill
  const t = (JUMP_VELOCITY + Math.sqrt(discriminant)) / GRAVITY;
  return PLAYER_SPEED * t;
}

function edgeToEdgeGap(a: Platform, b: Platform): number {
  // Horizontal edge-to-edge: right edge of A to left edge of B
  return b.x - b.w / 2 - (a.x + a.w / 2);
}

function topY(p: Platform): number {
  return p.y - p.h / 2;
}

function verticalDiff(a: Platform, b: Platform): number {
  // positive = B is below A (downhill, easier)
  return topY(b) - topY(a);
}

function hasNearbyMovingPlatform(
  ax: number,
  bx: number,
  midY: number,
  movingPlatforms: LevelData["movingPlatforms"] | undefined
): boolean {
  if (!movingPlatforms || movingPlatforms.length === 0) return false;
  const midX = (ax + bx) / 2;
  for (const mp of movingPlatforms) {
    // Check if the moving platform's range covers the gap area
    if (mp.moveType === "horizontal") {
      const minX = mp.x - mp.range;
      const maxX = mp.x + mp.range;
      if (maxX >= ax && minX <= bx) {
        // Check vertical proximity
        if (Math.abs(mp.y - midY) < 200) return true;
      }
    } else if (mp.moveType === "vertical" || mp.moveType === "circular") {
      const minY = mp.y - mp.range;
      const maxY = mp.y + mp.range;
      if (mp.x >= ax - 50 && mp.x <= bx + 50) {
        if (maxY >= midY - 100 && minY <= midY + 100) return true;
      }
    }
  }
  return false;
}

function analyzeLevel(level: LevelData, firstGapBlocking: Set<number>): GapIssue[] {
  const issues: GapIssue[] = [];
  const platforms = [...level.platforms];
  const movingPlatforms = level.movingPlatforms || [];
  const goal = level.goal;

  // Sort by x (center position)
  platforms.sort((a, b) => a.x - b.x);

  // Find the goal platform: the platform closest to the goal position
  let goalX = goal.x;
  let goalY = goal.y;
  let goalReached = false;

  // Iterate consecutive pairs sorted by x
  for (let i = 0; i < platforms.length - 1; i++) {
    const platA = platforms[i];
    const platB = platforms[i + 1];

    // Skip pairs with overlapping or negative gap
    const edgeGap = edgeToEdgeGap(platA, platB);
    if (edgeGap <= 0) continue;

    // Skip if vertical diff is extreme (unrelated platforms)
    const vDiff = verticalDiff(platA, platB);

    const maxJump = maxJumpDistance(vDiff);
    // maxJump of 0 means unreachable uphill
    const maxAllowed = maxJump > 0 ? maxJump - PLAYER_BUFFER : 0;
    const excess = edgeGap - maxAllowed;

    if (excess > 0 || maxJump === 0) {
      const gapBeforeGoal = platA.x < goalX && platB.x < goalX + 200;

      issues.push({
        levelId: level.id,
        levelName: level.name,
        biome: level.biome,
        platA,
        platB,
        edgeGap: Math.round(edgeGap * 100) / 100,
        verticalDiff: Math.round(vDiff * 100) / 100,
        maxAllowedGap: Math.round(maxAllowed * 100) / 100,
        excess: Math.round(excess * 100) / 100,
        downhill: vDiff > 0,
        unreachable: maxJump === 0,
        hasMovingPlatformNearby: hasNearbyMovingPlatform(
          platA.x + platA.w / 2,
          platB.x - platB.w / 2,
          (topY(platA) + topY(platB)) / 2,
          movingPlatforms
        ),
        firstBlocking: false,
        beforeGoal: gapBeforeGoal,
      });
    }

    // Track if we've passed the goal
    if (!goalReached && platB.x > goalX) {
      goalReached = true;
    }
  }

  // Mark the first blocking gap (before goal, unreachable)
  let foundFirst = false;
  for (const issue of issues) {
    if (issue.beforeGoal && issue.unreachable && !foundFirst) {
      issue.firstBlocking = true;
      foundFirst = true;
    }
  }
  // Alternative: also consider the first excess gap before goal
  if (!foundFirst) {
    for (const issue of issues) {
      if (issue.beforeGoal && issue.excess > 0 && !foundFirst) {
        issue.firstBlocking = true;
        foundFirst = true;
      }
    }
  }

  return issues;
}

function main(): void {
  const totalLevels = getLevelCount();
  const allIssues: GapIssue[] = [];

  console.log(`Analyzing ${totalLevels} levels...\n`);

  for (let i = 0; i < totalLevels; i++) {
    const level = getLevel(i);
    const issues = analyzeLevel(level, new Set());
    allIssues.push(...issues);
  }

  // Group by level
  const byLevel = new Map<number, GapIssue[]>();
  for (const issue of allIssues) {
    if (!byLevel.has(issue.levelId)) {
      byLevel.set(issue.levelId, []);
    }
    byLevel.get(issue.levelId)!.push(issue);
  }

  // Build report
  const lines: string[] = [];
  lines.push("=".repeat(80));
  lines.push("  PLATFORM GAP DIAGNOSTIC REPORT");
  lines.push(`  Generated: ${new Date().toISOString()}`);
  lines.push("=".repeat(80));
  lines.push("");
  lines.push(
    `Physics: GRAVITY=${GRAVITY}, JUMP_VELOCITY=${JUMP_VELOCITY}, PLAYER_SPEED=${PLAYER_SPEED}`
  );
  lines.push(`Max same-height jump: ${Math.round(PLAYER_SPEED * (2 * JUMP_VELOCITY / GRAVITY))}px center-to-center`);
  lines.push(`Max same-height gap (with buffer): ${Math.round(PLAYER_SPEED * (2 * JUMP_VELOCITY / GRAVITY) - PLAYER_BUFFER)}px edge-to-edge`);
  lines.push(`Player half-width buffer: ${PLAYER_BUFFER}px`);
  lines.push("");

  const sortedLevelIds = [...byLevel.keys()].sort((a, b) => a - b);

  let totalProblematic = 0;

  for (const levelId of sortedLevelIds) {
    const issues = byLevel.get(levelId)!;
    const level = getLevel(levelId - 1); // getLevel uses 0-index
    totalProblematic++;

    lines.push("-".repeat(80));
    lines.push(`  Level ${level.id}: "${level.name}" (${level.biome})`);
    lines.push(`  Platforms: ${level.platforms.length} | Gap issues: ${issues.length}`);
    if (level.movingPlatforms && level.movingPlatforms.length > 0) {
      lines.push(`  Moving platforms: ${level.movingPlatforms.length}`);
    }
    lines.push("-".repeat(80));

    for (let i = 0; i < issues.length; i++) {
      const issue = issues[i];
      const a = issue.platA;
      const b = issue.platB;
      lines.push("");
      lines.push(`  Gap #${i + 1}:`);
      lines.push(
        `    Platform A: (${a.x}, ${a.y}) ${a.w}x${a.h} [${a.type}]`
      );
      lines.push(
        `    Platform B: (${b.x}, ${b.y}) ${b.w}x${b.h} [${b.type}]`
      );
      lines.push(`    Edge-to-edge gap: ${issue.edgeGap}px`);
      lines.push(
        `    Vertical diff: ${issue.verticalDiff}px (${issue.downhill ? "downhill" : "uphill"})`
      );
      lines.push(`    Max allowed gap: ${issue.maxAllowedGap}px`);
      lines.push(`    Excess: ${issue.excess}px`);

      if (issue.firstBlocking) {
        lines.push(`    *** FIRST BLOCKING GAP (prevents reaching goal) ***`);
      }
      if (issue.hasMovingPlatformNearby) {
        lines.push(`    ! Moving platform nearby that COULD bridge this gap`);
      }
      if (issue.unreachable) {
        lines.push(`    ! UNREACHABLE (vertical diff exceeds max jump height)`);
      }
    }
    lines.push("");
  }

  if (byLevel.size === 0) {
    lines.push("  NO PROBLEMATIC GAPS FOUND. All levels appear traversable.");
  } else {
    lines.push("=".repeat(80));
    lines.push(`  SUMMARY: ${totalProblematic} level(s) have problematic gaps`);
    lines.push("=".repeat(80));
  }

  const report = lines.join("\n");
  const outPath = path.resolve(
    "/Users/luigialice/ENTWICKLUNG/jumpnrun-game/scripts/gap-report.txt"
  );
  fs.writeFileSync(outPath, report, "utf-8");
  console.log(`Report written to: ${outPath}`);
  console.log(`Total issues across all levels: ${allIssues.length}`);
  console.log(`Levels with issues: ${byLevel.size}`);
}

main();

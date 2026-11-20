/** Classic forward-only framing, or exploration framing for routes that turn back. */
export function constrainCameraX(scrollX: number, previousX: number, mode?: 'bidirectional', coinGoal?: number): number {
  return mode === 'bidirectional' || !!coinGoal ? scrollX : Math.max(scrollX, previousX);
}

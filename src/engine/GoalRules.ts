/** Goal conditions are independent: the final boss cannot be bypassed by reaching the flag. */
export function goalConditionsMet(coins: number, coinGoal: number | undefined, elapsed: number, timeGate: number | undefined, bossHp = 0): boolean {
  return (!coinGoal || coins >= coinGoal) && (timeGate === undefined || elapsed >= timeGate) && bossHp <= 0;
}

/** null ends the adventure instead of clamping back to the final arena forever. */
export function nextCampaignLevel(index: number, count: number): number | null {
  return index + 1 < count ? index + 1 : null;
}

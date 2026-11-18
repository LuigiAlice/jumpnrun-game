import { describe, expect, it } from 'vitest';
import { goalConditionsMet, nextCampaignLevel } from '../src/engine/GoalRules';

describe('Final goal conditions', () => {
  it('ends the campaign after the final level instead of repeating the boss', () => {
    expect(nextCampaignLevel(0, 90)).toBe(1);
    expect(nextCampaignLevel(88, 90)).toBe(89);
    expect(nextCampaignLevel(89, 90)).toBeNull();
  });
  it('keeps the final flag locked until the boss is defeated', () => {
    expect(goalConditionsMet(999, undefined, 300, undefined, 3)).toBe(false);
    expect(goalConditionsMet(999, undefined, 300, undefined, 1)).toBe(false);
    expect(goalConditionsMet(999, undefined, 300, undefined, 0)).toBe(true);
  });
  it('combines coin, time and boss conditions without bypassing any gate', () => {
    expect(goalConditionsMet(24, 25, 31, 30, 0)).toBe(false);
    expect(goalConditionsMet(25, 25, 29, 30, 0)).toBe(false);
    expect(goalConditionsMet(25, 25, 30, 30, 1)).toBe(false);
    expect(goalConditionsMet(25, 25, 30, 30, 0)).toBe(true);
    expect(goalConditionsMet(0, undefined, 0, undefined)).toBe(true);
  });
});

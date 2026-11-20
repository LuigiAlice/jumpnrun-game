import { describe, expect, it, vi } from 'vitest';
vi.mock('phaser', () => ({ default: { Scene: class {} } }));
import { GameScene } from '../src/scenes/GameScene';
import { ALL_LEVELS } from '../src/data/levels';
import { goalConditionsMet, goalRequirementHint } from '../src/engine/GoalRules';

function fixture() {
  const text = () => ({ setText: vi.fn() });
  const scene: any = {
    currentLevelData: ALL_LEVELS[4], coinCount: 0, levelElapsed: 0, coinGateOpen: false,
    moveAccum: 0, lastLockedGoalNotice: -1500, audioContext: undefined,
    goal: { body: { enable: true }, setAlpha: vi.fn(), clearTint: vi.fn() },
    player: { x: 6250, y: 380 }, coinGateText: text(), goalRequirementText: text(),
    showScorePopup: vi.fn(), tweens: { add: vi.fn() },
  };
  scene.goalUnlocked = () => goalConditionsMet(scene.coinCount, scene.currentLevelData.coinGoal, scene.levelElapsed, undefined);
  scene.currentGoalHint = () => (GameScene.prototype as any).currentGoalHint.call(scene);
  return scene;
}

describe('Visible locked flag feedback', () => {
  it('keeps level 1-5 contact detectable and displays the missing coins locally and in the HUD', () => {
    const scene = fixture();
    expect(scene.currentLevelData.coinGoal).toBe(25);
    (GameScene.prototype as any).updateCoinGate.call(scene);
    expect(scene.goal.body.enable).toBe(true);
    expect(scene.goal.setAlpha).toHaveBeenCalledWith(0.4);
    for (const label of [scene.coinGateText, scene.goalRequirementText]) {
      expect(label.setText).toHaveBeenLastCalledWith('Ziel gesperrt: noch 25 Münzen (0 / 25)');
    }
    scene.coinCount = 24;
    (GameScene.prototype as any).updateCoinGate.call(scene);
    expect(scene.goalRequirementText.setText).toHaveBeenLastCalledWith('Ziel gesperrt: noch 1 Münze (24 / 25)');
    scene.coinCount = 25;
    (GameScene.prototype as any).updateCoinGate.call(scene);
    expect(scene.coinGateOpen).toBe(true);
    expect(scene.goalRequirementText.setText).toHaveBeenLastCalledWith('Ziel frei!');
    expect(scene.coinGateText.setText).toHaveBeenLastCalledWith('Gate offen!');
  });

  it('throttles contact popups on game time instead of creating one every physics step', () => {
    const scene = fixture();
    const feedback = () => (GameScene.prototype as any).showLockedGoalFeedback.call(scene);
    feedback(); feedback(); scene.moveAccum = 1499; feedback();
    expect(scene.showScorePopup).toHaveBeenCalledOnce();
    scene.moveAccum = 1500; feedback();
    expect(scene.showScorePopup).toHaveBeenCalledTimes(2);
  });

  it('explains boss and time locks as well as coins and never calls an unmet goal free', () => {
    expect(goalRequirementHint(25, 25, 0, undefined, 3)).toContain('Burghüter');
    expect(goalRequirementHint(25, 25, 5.1, 10)).toContain('5 Sekunden');
    expect(goalRequirementHint(25, 25, 10, 10)).toBe('Ziel frei!');
  });
});

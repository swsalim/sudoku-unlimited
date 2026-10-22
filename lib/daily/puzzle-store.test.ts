import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getDailyDifficultyForDate } from '@/lib/daily-challenge';

import {
  getDailyPuzzle,
  getNextDailyDate,
  getPreviousDailyDate,
  hasDailyPuzzle,
  isFutureDailyDate,
} from './puzzle-store';

describe('daily puzzle store', () => {
  it('includes archive start date', () => {
    assert.equal(hasDailyPuzzle('2026-04-26'), true);
    const puzzle = getDailyPuzzle('2026-04-26');
    assert.ok(puzzle);
    assert.equal(puzzle!.difficulty, getDailyDifficultyForDate('2026-04-26'));
    assert.equal(puzzle!.puzzle.length, 9);
  });

  it('blocks future dates', () => {
    assert.equal(isFutureDailyDate('2099-01-01'), true);
  });

  it('chains prev/next for a known date', () => {
    const d = '2026-05-01';
    assert.equal(getPreviousDailyDate(d), '2026-04-30');
    assert.equal(getNextDailyDate(d), '2026-05-02');
  });
});

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getDailySitemapEntries, getFullSitemapEntries } from './entries';

describe('sitemap entries', () => {
  it('includes published daily dates through today (UTC)', () => {
    const today = new Date().toISOString().slice(0, 10);
    const daily = getDailySitemapEntries();
    const urls = daily.map((e) => e.url);
    assert.ok(urls.some((u) => u.endsWith(`/daily/${today}`)), `missing /daily/${today}`);
    assert.ok(!urls.some((u) => /\/daily\/\d{4}-\d{2}-\d{2}$/.test(u) && u.endsWith(`/daily/2099-01-01`)));
  });

  it('includes archive and month calendar URLs', () => {
    const daily = getDailySitemapEntries();
    const urls = daily.map((e) => e.url);
    assert.ok(urls.some((u) => u.endsWith('/daily/archive')));
    assert.ok(urls.some((u) => /\/daily\/\d{4}\/\d{2}$/.test(u)));
  });

  it('full sitemap keeps core static routes', () => {
    const urls = getFullSitemapEntries().map((e) => e.url);
    assert.ok(urls.some((u) => u.endsWith('/guides')));
    assert.ok(urls.some((u) => u.endsWith('/easy')));
    assert.ok(urls.some((u) => u.endsWith('/sudoku-solver')));
  });
});

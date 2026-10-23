import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { guideSlugs } from '@/lib/guides/registry';

import { getDailySitemapEntries, getFullSitemapEntries, safeSitemapEntries } from './entries';

describe('sitemap entries', () => {
  it('includes published daily dates through today (UTC)', () => {
    const today = new Date().toISOString().slice(0, 10);
    const daily = getDailySitemapEntries();
    const urls = daily.map((e) => e.url);
    assert.ok(
      urls.some((u) => u.endsWith(`/daily/${today}`)),
      `missing /daily/${today}`,
    );
    assert.ok(
      !urls.some((u) => /\/daily\/\d{4}-\d{2}-\d{2}$/.test(u) && u.endsWith(`/daily/2099-01-01`)),
    );
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

  it('includes every registered guide from metadata, not markdown files', () => {
    const urls = getFullSitemapEntries().map((e) => e.url);
    assert.equal(guideSlugs.length > 0, true);
    for (const slug of guideSlugs) {
      assert.ok(
        urls.some((u) => u.endsWith(`/guides/${slug}`)),
        `missing /guides/${slug}`,
      );
    }
  });

  it('omits a failing source instead of throwing', () => {
    const errors: unknown[] = [];
    const original = console.error;
    console.error = (...args: unknown[]) => {
      errors.push(args);
    };
    try {
      const urls = safeSitemapEntries('broken', () => {
        throw new Error('disk');
      });
      assert.deepEqual(urls, []);
      assert.equal(errors.length, 1);
    } finally {
      console.error = original;
    }
  });
});

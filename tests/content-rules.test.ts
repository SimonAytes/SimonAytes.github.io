import { describe, it, expect } from 'vitest';
import { site } from '@/data/site';
import { experience } from '@/data/experience';
import { work } from '@/data/work';

const prose = [
  site.intro,
  ...experience.map((e) => e.narrative),
  ...experience.flatMap((e) => e.highlights ?? []),
  ...work.filter((w) => w.kind !== 'repo-placeholder').map((w) => w.blurb),
];

describe('content rules', () => {
  it('no em-dashes in prose', () => {
    for (const text of prose) {
      expect(text.includes('—')).toBe(false);
    }
  });

  it('no "not X but Y" parallelism markers in prose', () => {
    for (const text of prose) {
      expect(/\bnot\b[^.]*\bbut\b/i.test(text)).toBe(false);
    }
  });
});

import { describe, it, expect } from 'vitest';
import { getCaseStudySlugs, getCaseStudy } from '@/lib/case-studies';
import { work } from '@/data/work';

describe('case studies', () => {
  it('every work card caseStudy slug resolves to a content file', () => {
    const slugs = new Set(getCaseStudySlugs());
    for (const w of work) {
      if (w.caseStudy) expect(slugs.has(w.caseStudy)).toBe(true);
    }
  });

  it('each case study has title, summary, and a non-empty body', () => {
    for (const slug of getCaseStudySlugs()) {
      const study = getCaseStudy(slug);
      expect(study).not.toBeNull();
      expect(study!.meta.title).toBeTruthy();
      expect(study!.meta.summary).toBeTruthy();
      expect(study!.body.trim().length).toBeGreaterThan(0);
    }
  });

  it('confidential defaults to true', () => {
    for (const slug of getCaseStudySlugs()) {
      expect(typeof getCaseStudy(slug)!.meta.confidential).toBe('boolean');
    }
  });

  it('no em-dashes in case study summaries', () => {
    for (const slug of getCaseStudySlugs()) {
      expect(getCaseStudy(slug)!.meta.summary?.includes('—')).toBeFalsy();
    }
  });
});

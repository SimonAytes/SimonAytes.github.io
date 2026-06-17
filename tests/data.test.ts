import { describe, it, expect } from 'vitest';
import { experience } from '@/data/experience';
import { work } from '@/data/work';
import { skillGroups } from '@/data/skills';
import { education } from '@/data/education';
import { socials } from '@/data/socials';

describe('experience data', () => {
  it('has six company entries', () => {
    expect(experience).toHaveLength(6);
  });

  it('every entry has company, logo, dates, and narrative', () => {
    for (const e of experience) {
      expect(e.company).toBeTruthy();
      expect(e.logo).toMatch(/^\/logos\//);
      expect(e.dates).toBeTruthy();
      expect(e.narrative.length).toBeGreaterThan(40);
    }
  });

  it('url is either a valid-looking href or null', () => {
    for (const e of experience) {
      if (e.url !== null) expect(e.url).toMatch(/^https?:\/\//);
    }
  });
});

describe('work data', () => {
  it('leads with the publication', () => {
    expect(work[0].kind).toBe('publication');
  });
  it('every item has a title and blurb', () => {
    for (const w of work) {
      expect(w.title).toBeTruthy();
      expect(w.blurb).toBeTruthy();
    }
  });
});

describe('skills data', () => {
  it('has at least three groups, each with items', () => {
    expect(skillGroups.length).toBeGreaterThanOrEqual(3);
    for (const g of skillGroups) expect(g.items.length).toBeGreaterThan(0);
  });
});

describe('education data', () => {
  it('has two entries', () => {
    expect(education).toHaveLength(2);
  });
});

describe('socials data', () => {
  it('includes the four required networks plus email', () => {
    const labels = socials.map((s) => s.label.toLowerCase());
    for (const required of ['github', 'linkedin', 'scholar', 'medium', 'email']) {
      expect(labels.some((l) => l.includes(required))).toBe(true);
    }
  });
});

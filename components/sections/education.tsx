import { education } from '@/data/education';

import { SectionLabel } from '@/components/section-label';

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Education</SectionLabel>
      <div className="mt-6 space-y-6">
        {education.map((e) => (
          <div
            key={e.institution}
            className="flex flex-col gap-1 border-b border-hairline pb-6 md:flex-row md:items-baseline md:justify-between"
          >
            <div>
              <h3 className="font-serif text-lg text-text">{e.institution}</h3>
              <p className="text-sm text-text/80">{e.degree}</p>
              <p className="text-sm text-dim">{e.detail}</p>
            </div>
            <span className="font-mono text-xs text-dim">{e.dates}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

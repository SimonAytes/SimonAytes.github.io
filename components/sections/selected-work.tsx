import Link from 'next/link';

import { work } from '@/data/work';
import { externalLinkProps } from '@/lib/links';

import { SectionLabel } from '@/components/section-label';

export function SelectedWork() {
  return (
    <section id="work" className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Selected Work</SectionLabel>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {work.map((w, i) => (
          <article
            key={`${w.title}-${i}`}
            className="flex flex-col rounded-xl border border-hairline bg-surface p-6"
          >
            <h3 className="font-serif text-xl text-text">{w.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-pretty text-text/80">{w.blurb}</p>
            {(w.links.length > 0 || w.caseStudy) && (
              <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
                {w.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    {...externalLinkProps(l.href)}
                    className="text-sm font-medium text-brand hover:underline"
                  >
                    {l.label}
                  </a>
                ))}
                {w.caseStudy && (
                  <Link
                    href={`/case-studies/${w.caseStudy}/`}
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
                  >
                    Read case study
                  </Link>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

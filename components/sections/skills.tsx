import { skillGroups } from '@/data/skills';
import { SectionLabel } from '@/components/section-label';

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Skills</SectionLabel>
      <dl className="mt-6 border-t border-hairline">
        {skillGroups.map((g) => (
          <div
            key={g.label}
            className="grid gap-2 border-b border-hairline py-5 sm:grid-cols-[200px_1fr] sm:gap-8"
          >
            <dt className="pt-0.5 font-mono text-xs uppercase tracking-[0.12em] text-text">
              {g.label}
            </dt>
            <dd className="flex flex-wrap items-baseline gap-y-1 text-sm leading-relaxed text-text/85">
              {g.items.map((item, i) => (
                <span key={item} className="whitespace-nowrap">
                  {i > 0 && <span className="px-2 text-dim/60">·</span>}
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

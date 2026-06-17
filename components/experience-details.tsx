import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { externalLinkProps } from '@/lib/links';
import type { Experience } from '@/data/experience';

export function ExperienceDetails({ item }: { item: Experience }) {
  return (
    <details className="group rounded-xl border border-hairline bg-surface transition-colors hover:border-brand/40">
      <summary className="flex cursor-pointer list-none items-center gap-4 p-4 sm:gap-6 sm:p-5 [&::-webkit-details-marker]:hidden">
        <Image
          src={item.logo_mobile}
          alt={`${item.company} logo`}
          width={180}
          height={48}
          className="h-9 w-auto max-w-[42%] object-contain sm:h-10 sm:max-w-[200px]"
        />
        <span className="ml-auto whitespace-nowrap font-mono text-[0.7rem] text-dim sm:text-xs">
          {item.dates}
        </span>
        <ChevronDown className="size-5 shrink-0 text-dim transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
        <h3 className="font-serif text-lg text-text">{item.company}</h3>
        {item.role && <p className="mt-1 font-mono text-xs text-dim">{item.role}</p>}
        <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-text/85">{item.narrative}</p>
        {item.highlights && (
          <ul className="mt-4 grid gap-2 text-sm leading-relaxed text-text/80">
            {item.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-brand" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
        {item.url && (
          <a
            href={item.url}
            {...externalLinkProps(item.url)}
            className="mt-3 inline-block text-sm font-medium text-brand hover:underline"
          >
            Visit website
          </a>
        )}
      </div>
    </details>
  );
}

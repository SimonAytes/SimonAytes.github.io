'use client';

import { Fragment, useState } from 'react';
import Image from 'next/image';
import { experience } from '@/data/experience';
import { externalLinkProps } from '@/lib/links';

const COLS = 3;

export function ExperienceGrid() {
  const [open, setOpen] = useState<number | null>(null);
  const active = open === null ? null : experience[open];

  // With a fixed two-row grid, the panel always opens in the gap between the
  // rows, regardless of which tile is active. Insert it after the last tile of
  // the first row (guarded for shorter lists).
  const firstRowEnd = Math.min(COLS, experience.length) - 1;

  return (
    <div className="mt-6 hidden grid-cols-3 gap-4 lg:grid">
      {experience.map((item, i) => {
        const isOpen = open === i;
        const showPanel = active !== null && i === firstRowEnd;

        return (
          <Fragment key={item.company}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-label={item.company}
              className={`flex aspect-3/2 w-full items-center justify-center rounded-xl border bg-surface p-6 transition-colors ${
                isOpen ? 'border-brand' : 'border-hairline hover:border-brand/40'
              }`}
            >
              <Image
                src={item.logo}
                alt={`${item.company} logo`}
                width={220}
                height={88}
                className="max-h-24 w-auto max-w-[80%] object-contain"
              />
            </button>

            {showPanel && active && (
              <div className="col-span-full animate-in fade-in slide-in-from-top-2 rounded-xl border border-brand/40 bg-surface p-6 duration-300">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl text-text">{active.company}</h3>
                    {active.role && (
                      <p className="mt-1 font-mono text-xs text-dim">{active.role}</p>
                    )}
                  </div>
                  <span className="shrink-0 font-mono text-xs text-dim">{active.dates}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-text/85">{active.narrative}</p>
                {active.highlights && (
                  <ul className="mt-4 grid gap-2 text-sm leading-relaxed text-text/80 sm:grid-cols-3">
                    {active.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-brand" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {active.url && (
                  <a
                    href={active.url}
                    {...externalLinkProps(active.url)}
                    className="mt-4 inline-block text-sm font-medium text-brand hover:underline"
                  >
                    Visit website
                  </a>
                )}
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

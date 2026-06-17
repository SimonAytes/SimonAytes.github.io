import { site } from '@/data/site';

import { SectionLabel } from '@/components/section-label';

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-content px-6 py-20">
      <SectionLabel>Contact</SectionLabel>
      <p className="mt-4 max-w-[20ch] font-serif text-3xl text-text md:text-4xl">
        If you think we could work well together, feel free to reach out.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <a
          href={`mailto:${site.email}`}
          className="rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-bg transition hover:opacity-90"
        >
          {site.email}
        </a>
        <a
          href="https://www.linkedin.com/in/simonaytes/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-hairline px-5 py-2.5 text-sm font-medium text-text transition hover:border-brand"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}

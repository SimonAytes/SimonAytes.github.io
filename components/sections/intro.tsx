import { SectionLabel } from '@/components/section-label';
import { site } from '@/data/site';

export function Intro() {
  return (
    <section id="about" className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>About</SectionLabel>
      <p className="mt-4 max-w-[60ch] text-xl leading-relaxed text-text/90">
        {site.intro}
      </p>
    </section>
  );
}

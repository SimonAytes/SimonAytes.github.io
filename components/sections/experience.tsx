import { experience } from '@/data/experience';
import { ExperienceDetails } from '@/components/experience-details';
import { ExperienceGrid } from '@/components/experience-grid';
import { SectionLabel } from '@/components/section-label';

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Experience</SectionLabel>

      {/* below lg: inline disclosure list */}
      <div className="mt-6 flex flex-col gap-3 lg:hidden">
        {experience.map((item) => (
          <ExperienceDetails key={item.company} item={item} />
        ))}
      </div>

      {/* lg and up: expandable logo grid with in-row info panel */}
      <ExperienceGrid />
    </section>
  );
}

import { site } from '@/data/site';
import { socials } from '@/data/socials';
import { education } from '@/data/education';

export const SITE_URL = 'https://saytes.io';

/**
 * schema.org Person graph for the homepage. Links the site's identity,
 * socials, and education so search engines can resolve "Simon Aytes" to a
 * single entity.
 */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: SITE_URL,
    image: `${SITE_URL}${site.portrait.src}`,
    jobTitle: 'AI & Forward-Deployed Engineer',
    description: site.intro,
    sameAs: socials.map((s) => s.href).filter((href) => href.startsWith('http')),
    alumniOf: education.map((e) => ({
      '@type': 'CollegeOrUniversity',
      name: e.institution,
    })),
    knowsAbout: [
      'Large Language Models',
      'Retrieval-Augmented Generation',
      'AI Engineering',
      'Machine Learning',
      'Python',
      'FastAPI',
      'Amazon Web Services',
    ],
  };
}

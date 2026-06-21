import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { getCaseStudySlugs } from '@/lib/case-studies';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const caseStudies = getCaseStudySlugs().map((slug) => ({
    url: `${SITE_URL}/case-studies/${slug}/`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...caseStudies,
    {
      url: `${SITE_URL}/projects/sot/`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy/`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}

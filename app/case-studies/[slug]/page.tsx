import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { compileMDX } from 'next-mdx-remote/rsc';

import { getCaseStudy, getCaseStudySlugs } from '@/lib/case-studies';
import { mdxComponents } from '@/components/case-study/mdx-components';
import { ConfidentialityBanner } from '@/components/case-study/confidentiality-banner';
import { Footer } from '@/components/sections/footer';
import { SITE_URL } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const { meta } = study;
  const path = `/case-studies/${slug}/`;
  const title = `${meta.title} (Case Study)`;
  return {
    title,
    description: meta.summary,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}${path}`,
      title,
      description: meta.summary,
      images: ['/og.png'],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const { meta, body } = study;
  const { content } = await compileMDX({ source: body, components: mdxComponents });

  const metaLine = [meta.role, meta.client, meta.date].filter(Boolean).join(' · ');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.summary,
    author: { '@type': 'Person', name: 'Simon Aytes', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/case-studies/${slug}/`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-2xl px-6 pt-16 pb-20 md:pt-20">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-xs text-dim transition hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to work
        </Link>

        <header className="mt-8">
          <h1 className="font-serif text-4xl leading-tight font-medium text-text md:text-5xl">
            {meta.title}
          </h1>
          {metaLine && <p className="mt-3 font-mono text-xs tracking-wider text-dim">{metaLine}</p>}
          {meta.summary && (
            <p className="mt-5 text-lg leading-relaxed text-text/80">{meta.summary}</p>
          )}
          {meta.github && (
            <a
              href={meta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-bg transition hover:opacity-85"
            >
              <svg
                viewBox="0 0 98 96"
                className="h-4 w-4 flex-shrink-0 fill-current"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                />
              </svg>
              View on GitHub
            </a>
          )}
        </header>

        {meta.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={meta.cover}
            alt={meta.coverAlt ?? ''}
            className="mt-10 w-full rounded-xl border border-hairline"
          />
        )}

        {meta.confidential && (
          <div className="mt-10">
            <ConfidentialityBanner />
          </div>
        )}

        <div className="prose prose-site mt-10 max-w-none">{content}</div>
      </article>
      <Footer />
    </>
  );
}

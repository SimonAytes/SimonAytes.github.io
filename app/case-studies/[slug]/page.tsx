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
          {meta.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {meta.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-hairline px-2 py-1 font-mono text-[0.65rem] text-dim"
                >
                  {t}
                </span>
              ))}
            </div>
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

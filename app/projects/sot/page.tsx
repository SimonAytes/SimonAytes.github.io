import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { SotExplorer } from './sot-explorer';
import { Footer } from '@/components/sections/footer';
import { SITE_URL } from '@/lib/seo';

const TITLE = 'Sketch-of-Thought Explorer';
const DESCRIPTION =
  'Explore cached prompts showing how Sketch-of-Thought (SoT) compresses LLM reasoning into conceptual sketches — cutting tokens by ~84% on average while maintaining accuracy.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/projects/sot/' },
  openGraph: {
    type: 'article',
    url: `${SITE_URL}/projects/sot/`,
    title: `${TITLE} | Simon Aytes`,
    description: DESCRIPTION,
    images: ['/og.png'],
  },
};

export default function SotPage() {
  return (
    <>
      <div className="mx-auto max-w-content px-6 pb-20">
        <nav className="pt-16 md:pt-20">
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-dim transition hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to work
          </Link>
        </nav>

        <header className="mt-8 flex flex-col gap-4 pb-16">
          <h1 className="font-serif text-5xl font-medium leading-none text-text md:text-[3.25rem]">
            Reasoning sketches, at a glance.
          </h1>
          <p className="max-w-[42rem] text-lg leading-relaxed text-text/70">
            Humans naturally compress complex reasoning into crisp sketches. Sketch-of-Thought (SoT)
            channels that instinct for language models, guiding them to draft conceptual scaffolds
            before final answers. Explore the cached prompts below to see how sketching trades fewer
            tokens for faster, still dependable reasoning.
          </p>
          <div className="mt-1 flex flex-wrap gap-5">
            <a
              href="https://github.com/SimonAytes/SoT"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.8125rem] font-medium text-brand transition hover:opacity-75"
            >
              GitHub Repo
            </a>
            <a
              href="https://arxiv.org/abs/2503.05179"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.8125rem] font-medium text-brand transition hover:opacity-75"
            >
              Read the Paper
            </a>
          </div>
        </header>

        <SotExplorer />
      </div>
      <Footer />
    </>
  );
}

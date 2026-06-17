import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-content flex-col items-center justify-center px-6 py-20 text-center">
      <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-brand">
        404
      </p>
      <h1 className="mt-4 font-serif text-5xl font-medium text-text md:text-6xl">Page not found</h1>
      <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-dim">
        The page you are looking for may have moved, or it never existed.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-bg transition hover:opacity-90"
        >
          Back to home
        </Link>
        <Link
          href="/#work"
          className="rounded-lg border border-hairline px-5 py-2.5 text-sm font-medium text-text transition hover:border-brand"
        >
          View work
        </Link>
      </div>
    </main>
  );
}

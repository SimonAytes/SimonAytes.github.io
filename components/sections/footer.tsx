import Link from 'next/link';
import { site } from '@/data/site';

export function Footer() {
  return (
    <footer className="mx-auto max-w-content border-t border-hairline px-6 py-10">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <span className="font-mono text-xs text-dim">
          © {new Date().getFullYear()} {site.name}
        </span>
        <Link
          href="/privacy/"
          className="font-mono text-xs text-dim transition hover:text-brand"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}

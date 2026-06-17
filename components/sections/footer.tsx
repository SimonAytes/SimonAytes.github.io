import { socials } from '@/data/socials';
import { site } from '@/data/site';
import { externalLinkProps } from '@/lib/links';
import { SocialIcon } from '@/components/social-icon';

export function Footer() {
  return (
    <footer className="mx-auto max-w-content border-t border-hairline px-6 py-10">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <span className="font-mono text-xs text-dim">
          © {new Date().getFullYear()} {site.name}
        </span>
        <nav className="flex flex-wrap gap-x-5 gap-y-2.5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              {...externalLinkProps(s.href)}
              className="inline-flex items-center gap-2 text-sm font-medium text-dim transition hover:text-brand"
            >
              <SocialIcon name={s.icon} className="h-[18px] w-[18px]" />
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

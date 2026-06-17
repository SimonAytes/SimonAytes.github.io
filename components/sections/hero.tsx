import Image from 'next/image';
import { site } from '@/data/site';
import { socials } from '@/data/socials';
import { externalLinkProps } from '@/lib/links';
import { SocialIcon } from '@/components/social-icon';

export function Hero() {
  return (
    <header className="mx-auto max-w-content px-6 pt-20 pb-16 md:pt-28">
      <div className="flex flex-col-reverse items-start gap-6 md:flex-row md:items-center md:gap-14">
        <div className="flex-1">
          <h1 className="font-serif text-5xl leading-none font-medium text-text md:text-6xl">
            {site.name}
          </h1>
          <p className="mt-3 text-lg text-dim">{site.positioning}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={site.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-bg transition hover:opacity-90"
            >
              Download Resume
            </a>
            <a
              href="#work"
              className="rounded-lg border border-hairline px-5 py-2.5 text-sm font-medium text-text transition hover:border-brand"
            >
              View work
            </a>
          </div>
          <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5">
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
        <div className="relative aspect-[4/5] w-32 shrink-0 overflow-hidden rounded-xl border border-hairline md:w-64">
          <Image src={site.portrait.src} alt={site.portrait.alt} fill className="object-cover" />
        </div>
      </div>
    </header>
  );
}

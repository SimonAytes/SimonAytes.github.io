import type { ComponentProps, ReactNode } from 'react';
import { externalLinkProps } from '@/lib/links';

function MdxLink({ href = '', children, ...rest }: ComponentProps<'a'>) {
  const internal = href.startsWith('/') || href.startsWith('#');
  return (
    <a href={href} {...(internal ? {} : externalLinkProps(href))} {...rest}>
      {children}
    </a>
  );
}

// Plain <img> rather than next/image: markdown images carry no intrinsic
// dimensions, and the static export already serves images unoptimized.
function MdxImage({ alt = '', ...rest }: ComponentProps<'img'>) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} className="rounded-xl border border-hairline" {...rest} />;
}

type CalloutProps = { title?: string; children: ReactNode };

export function Callout({ title, children }: CalloutProps) {
  return (
    <div className="not-prose my-6 rounded-xl border border-hairline border-l-2 border-l-brand bg-surface px-5 py-4">
      {title && (
        <p className="mb-1 font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand">
          {title}
        </p>
      )}
      <div className="text-sm leading-relaxed text-text/80 [&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

export function TechStack({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-hairline">
      <table className="w-full text-sm">
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function TechRow({ category, tools }: { category: string; tools: string }) {
  return (
    <tr className="border-b border-hairline last:border-0">
      <td className="w-36 px-4 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-dim">
        {category}
      </td>
      <td className="px-4 py-3 text-text/80">{tools}</td>
    </tr>
  );
}

type FigureProps = { src: string; alt: string; caption?: string };

export function Figure({ src, alt, caption }: FigureProps) {
  return (
    <figure className="not-prose my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full rounded-xl border border-hairline" />
      {caption && (
        <figcaption className="mt-3 text-center font-mono text-xs text-dim">{caption}</figcaption>
      )}
    </figure>
  );
}

export const mdxComponents = {
  a: MdxLink,
  img: MdxImage,
  Callout,
  Figure,
  TechStack,
  TechRow,
};

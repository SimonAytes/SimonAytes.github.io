import React from 'react';
// ponytail: plain anchor shim — Next.js router not needed in DS previews
export default function Link({ href, children, className, ...props }: {
  href: string;
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  return <a href={href} className={className} {...props as any}>{children}</a>;
}

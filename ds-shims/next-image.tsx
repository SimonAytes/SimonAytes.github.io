import React from 'react';
// ponytail: plain img shim — Next.js Image optimization not needed in DS previews
export default function Image({ src, alt, width, height, className, style }: {
  src: string | { src: string };
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const srcStr = typeof src === 'string' ? src : src?.src ?? '';
  return <img src={srcStr} alt={alt ?? ''} width={width} height={height} className={className} style={style} />;
}

/**
 * Returns anchor props that open a link in a new tab when it points to an
 * external site (http/https). In-page anchors (#...) and mailto: links are
 * left untouched so they behave normally.
 */
export function externalLinkProps(href: string) {
  const isExternal = /^https?:\/\//i.test(href);
  return isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}

import { site } from './site';
import type { SocialIconName } from '@/components/social-icon';

export type Social = { label: string; href: string; icon: SocialIconName };

export const socials: Social[] = [
  { label: 'GitHub', href: 'https://github.com/SimonAytes', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/simonaytes/', icon: 'linkedin' },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=lO8AjtQAAAAJ&hl=en',
    icon: 'scholar',
  },
  { label: 'Medium', href: 'https://medium.com/@saaytes', icon: 'medium' },
  { label: 'Email', href: `mailto:${site.email}`, icon: 'email' },
];

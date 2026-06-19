import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Footer } from '@/components/sections/footer';
import { site } from '@/data/site';
import { SITE_URL } from '@/lib/seo';

const LAST_UPDATED = '2026-06-19';

const DESCRIPTION = `How ${site.name}'s personal website handles visitor information.`;

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: DESCRIPTION,
  alternates: { canonical: '/privacy/' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/privacy/`,
    title: 'Privacy Policy',
    description: DESCRIPTION,
    images: ['/og.png'],
  },
};

// Self-authored static HTML rendered as trusted content (no user input). The
// copy is written to accurately describe a static portfolio whose only data
// collection is Google Analytics; em-dashes are avoided per the site's house
// style (see the prose test in tests/).
const POLICY_HTML = `
  <p>This Privacy Policy explains how <strong>saytes.io</strong> (the &ldquo;Site&rdquo;), a personal portfolio website operated by Simon Aytes (&ldquo;I,&rdquo; &ldquo;me,&rdquo; or &ldquo;my&rdquo;), handles information about its visitors.</p>
  <p>The Site is an informational portfolio. It has no user accounts, logins, registration, e-commerce, newsletters, advertising, or contact forms. The only information collected automatically is the aggregate analytics data described below. By using the Site, you agree to the practices described in this Privacy Policy.</p>

  <h2>Information I collect</h2>
  <p><strong>Analytics data (collected automatically).</strong> The Site uses Google Analytics 4, a web analytics service provided by Google LLC (&ldquo;Google&rdquo;), to understand how visitors use the Site. When you visit, Google Analytics automatically collects standard technical and usage information, which may include:</p>
  <ul>
    <li>your approximate geographic location (such as country or region), derived from your IP address;</li>
    <li>your device type, operating system, and browser;</li>
    <li>the pages you view, the time and duration of your visit, and how you arrived at the Site (for example, the referring website);</li>
    <li>general interaction information such as clicks and scrolling.</li>
  </ul>
  <p>Google Analytics 4 does not log or store your IP address; it uses it only transiently to estimate your approximate location. This data is reported to me only in aggregate and is not used to identify you personally.</p>
  <p><strong>Hosting logs.</strong> The Site is hosted on GitHub Pages. As with most web hosts, GitHub may automatically record standard server log information (such as IP addresses and requested URLs) for security and operational purposes. That processing is governed by GitHub&rsquo;s privacy statement.</p>
  <p><strong>Information you choose to send.</strong> The Site lists an email address so you can contact me. If you email me, I receive whatever information you include in your message, and I use it only to respond to you.</p>

  <h2>What I do not collect</h2>
  <p>I do not operate user accounts, logins, online stores, contact forms, newsletters, advertising, retargeting, or social media tracking pixels. I do not sell, rent, or trade information about visitors, and I do not knowingly collect sensitive personal information.</p>

  <h2>How I use information</h2>
  <p>I use the aggregate analytics data only to measure and improve the Site&rsquo;s content and performance and to maintain its security and operation. This data is never used for advertising and is never sold or shared with third parties for their own purposes.</p>

  <h2>Cookies</h2>
  <p>Google Analytics sets first-party cookies to distinguish unique visitors and measure sessions. These cookies are not essential to using the Site. You can block or delete cookies through your browser settings, and you can opt out of Google Analytics entirely by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>. Disabling cookies will not affect your ability to read the Site.</p>

  <h2>Third-party services</h2>
  <p>The Site relies on the following third parties, whose own privacy policies govern how they handle data:</p>
  <ul>
    <li>Google Analytics: see the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.</li>
    <li>GitHub Pages (hosting): see the <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub Privacy Statement</a>.</li>
  </ul>

  <h2>Links to other websites</h2>
  <p>The Site may link to websites that I do not operate or control. I am not responsible for the content or privacy practices of those websites. When you follow a link away from the Site, this Privacy Policy no longer applies, and you should review the privacy policy of any website you visit.</p>

  <h2>Your rights under the GDPR</h2>
  <p>If you are in the European Economic Area (EEA) or the United Kingdom, you have rights over your personal data under the GDPR and UK GDPR. These include the right to access, correct, delete, restrict, or object to the processing of your data, and the right to data portability. The limited analytics data described above is processed on the basis of my legitimate interest in understanding how the Site is used, or on the basis of your consent where required.</p>
  <p>To exercise any of these rights, contact me at the email address below. You also have the right to lodge a complaint with your local data protection authority.</p>

  <h2>Your rights under California law (CCPA and CalOPPA)</h2>
  <p>I do not sell or share the personal information of any visitor, including California residents. California residents have the right to know what personal information is collected and to request its deletion. Because the Site collects only the aggregate analytics data described above, there is very little personal information to disclose, but you may contact me with any request and I will respond as required by law. I will not discriminate against you for exercising these rights.</p>
  <p>Because there is no common industry standard for &ldquo;Do Not Track&rdquo; signals, the Site does not currently respond to them. You can still opt out of Google Analytics using the add-on linked above.</p>

  <h2>Children&rsquo;s privacy</h2>
  <p>The Site is not directed to children under 13, and I do not knowingly collect personal information from children. If you believe a child has provided personal information through the Site, please contact me and I will delete it.</p>

  <h2>Data retention</h2>
  <p>Aggregate analytics data is retained by Google Analytics according to Google&rsquo;s data retention settings. I keep any email correspondence only for as long as needed to address your inquiry.</p>

  <h2>Changes to this policy</h2>
  <p>I may update this Privacy Policy from time to time. Any changes will be posted on this page along with an updated revision date.</p>

  <h2>Contact</h2>
  <p>If you have any questions about this Privacy Policy or how your information is handled, contact me at <a href="mailto:${site.email}">${site.email}</a>.</p>
`;

export default function PrivacyPolicyPage() {
  return (
    <>
      <article className="mx-auto max-w-2xl px-6 pt-16 pb-20 md:pt-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-dim transition hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back home
        </Link>

        <header className="mt-8">
          <h1 className="font-serif text-4xl leading-tight font-medium text-text md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 font-mono text-xs tracking-wider text-dim">
            Last updated {LAST_UPDATED}
          </p>
        </header>

        <div
          className="prose prose-site mt-10 max-w-none"
          dangerouslySetInnerHTML={{ __html: POLICY_HTML }}
        />
      </article>
      <Footer />
    </>
  );
}

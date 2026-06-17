# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Simon Aytes' single-page, statically-exported portfolio site (Next.js) and prepare it for GitHub Pages deployment on `saytes.io`.

**Architecture:** Next.js App Router with `output: 'export'`. All content lives in typed `data/*.ts` modules; section components read from them. Visual system (Graphite & Amber palette, Fraunces/Inter/JetBrains Mono) is wired into Tailwind tokens and `next/font`. shadcn/ui supplies Dialog and Button. Vitest + React Testing Library cover data integrity, content rules, and component smoke behavior; `next build` is the integration gate.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, next/font, Vitest, @testing-library/react, jsdom.

**Conventions:**
- Content the user must supply/verify later is represented with explicit, typed sentinels — never silent guesses. Use `url: null` for "no website," and the constant `PLACEHOLDER_LINK` (defined in Task 5) for links Simon will fill in. Each such field is annotated with a `// TODO(simon): ...` comment. These are intentional content placeholders, not implementation gaps.
- No git commits are performed by the implementer at any point. Source control is the user's responsibility. The "Commit" convention from the skill is replaced by a **"Checkpoint"** step: run the stated verification and stop for review. Do not run `git` commands.

---

## File Structure

```
WEBSITE/
├── app/
│   ├── layout.tsx            # fonts, metadata, <html>/<body>, theme class
│   ├── page.tsx              # composes all sections
│   └── globals.css           # Tailwind layers + CSS variables (palette)
├── components/
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── intro.tsx
│   │   ├── experience.tsx
│   │   ├── selected-work.tsx
│   │   ├── skills.tsx
│   │   ├── education.tsx
│   │   ├── contact.tsx
│   │   └── footer.tsx
│   ├── experience-card.tsx   # single card, opens dialog
│   └── ui/                   # shadcn primitives (button, dialog)
├── data/
│   ├── experience.ts
│   ├── work.ts
│   ├── skills.ts
│   ├── education.ts
│   ├── socials.ts
│   └── site.ts               # name, positioning, intro copy, resume path, status line
├── lib/
│   └── utils.ts              # cn() helper (shadcn)
├── public/
│   ├── logos/                # company logos (user supplies)
│   ├── photos/               # portrait (user supplies)
│   ├── simon-aytes-resume.pdf# user supplies
│   ├── CNAME                 # saytes.io
│   └── .nojekyll
├── tests/
│   ├── data.test.ts
│   ├── content-rules.test.ts
│   ├── hero.test.tsx
│   └── experience.test.tsx
├── .github/workflows/deploy.yml
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
├── vitest.setup.ts
└── package.json
```

---

## Task 1: Scaffold Next.js project with static export

**Files:**
- Create: `package.json`, `next.config.mjs`, `tsconfig.json`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.gitignore`

- [ ] **Step 1: Create the Next.js app non-interactively**

Run from `/Users/simonaytes/Documents/Personal/WEBSITE`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*" --no-turbopack --use-npm
```
If prompted that the directory is not empty (the `docs/` and `.superpowers/` folders exist), choose to proceed. If it refuses, scaffold in a temp dir and move files in. Expected: project files created, `npm install` runs.

- [ ] **Step 2: Configure static export**

Replace `next.config.mjs` with:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
```

- [ ] **Step 3: Add .superpowers to .gitignore**

Append to `.gitignore`:
```
# brainstorming companion
.superpowers/
```

- [ ] **Step 4: Verify dev server boots and build/export works**

Run:
```bash
npm run build
```
Expected: build succeeds and produces an `out/` directory (static export). No type errors.

- [ ] **Step 5: Checkpoint** — confirm `out/` exists and `npm run dev` serves `http://localhost:3000`. Stop for review.

---

## Task 2: Install testing stack (Vitest + Testing Library)

**Files:**
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Modify: `package.json` (scripts)

- [ ] **Step 1: Install dev dependencies**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
});
```

- [ ] **Step 3: Create `vitest.setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 4: Add test scripts to `package.json`**

Add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Write a smoke test to prove the harness runs**

Create `tests/smoke.test.ts`:
```ts
import { describe, it, expect } from 'vitest';

describe('harness', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 6: Run the test**

Run: `npm test`
Expected: 1 passed. Then delete `tests/smoke.test.ts`.

- [ ] **Step 7: Checkpoint** — test harness green. Stop for review.

---

## Task 3: Wire design tokens (palette + fonts)

**Files:**
- Modify: `app/globals.css`, `tailwind.config.ts` (v3 only), `app/layout.tsx`

> **Version branch:** `create-next-app@latest` may install **Tailwind v4** (CSS-based config, no `tailwind.config.ts`) or **v3** (JS config). Check first:
> ```bash
> npm ls tailwindcss
> ```
> Follow **Step 1A + 2A** for v4 (major version 4.x), or **Step 1B + 2B** for v3 (major version 3.x). The token names (`bg`, `surface`, `text`, `muted`, `accent`, `live`, `hairline`, and the three font families) are identical in both paths, so every later task's class names (`bg-surface`, `text-accent`, `font-serif`, etc.) work regardless.

- [ ] **Step 1A (Tailwind v4): Define tokens via `@theme` in `app/globals.css`**

Replace the file contents with:
```css
@import "tailwindcss";

@theme {
  --color-bg: #0E0F11;
  --color-surface: #181A1D;
  --color-text: #F4F1EC;
  --color-muted: #9A9CA0;
  --color-accent: #E8A148;
  --color-live: #4FD18A;
  --color-hairline: rgba(244, 241, 236, 0.10);

  --font-serif: var(--font-fraunces), serif;
  --font-sans: var(--font-inter), sans-serif;
  --font-mono: var(--font-jetbrains), monospace;

  --max-width-content: 64rem;
}

html { scroll-behavior: smooth; }

body {
  background: var(--color-bg);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 2A (Tailwind v4): No `tailwind.config.ts` needed**

v4 derives utilities from `@theme`. Skip to Step 3. (If a `tailwind.config.ts` was generated, leaving it empty/default is fine.)

- [ ] **Step 1B (Tailwind v3): Define CSS variables and base styles in `app/globals.css`**

Replace the file contents with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #0E0F11;
  --surface: #181A1D;
  --text: #F4F1EC;
  --muted: #9A9CA0;
  --accent: #E8A148;
  --live: #4FD18A;
  --hairline: rgba(244, 241, 236, 0.10);
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 2B (Tailwind v3): Extend Tailwind theme in `tailwind.config.ts`**

Set `content` to include app + components, and extend colors/fonts:
```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        live: 'var(--live)',
        hairline: 'var(--hairline)',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      maxWidth: { content: '64rem' },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Load fonts via next/font in `app/layout.tsx`**

Replace `app/layout.tsx` with:
```tsx
import type { Metadata } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-fraunces' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains' });

export const metadata: Metadata = {
  title: 'Simon Aytes — AI & Forward-Deployed Engineering',
  description: 'Simon Aytes builds LLM systems that ship and stay in production.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Verify build still passes**

Run: `npm run build`
Expected: success, no errors.

- [ ] **Step 5: Checkpoint** — tokens wired. Stop for review.

---

## Task 4: Install shadcn/ui primitives (Button, Dialog)

**Files:**
- Create: `lib/utils.ts`, `components/ui/button.tsx`, `components/ui/dialog.tsx`, `components.json`

- [ ] **Step 1: Initialize shadcn**

```bash
npx shadcn@latest init -d
```
Accept defaults. This creates `components.json` and `lib/utils.ts` (with `cn()`).

- [ ] **Step 2: Add Button and Dialog**

```bash
npx shadcn@latest add button dialog
```
Expected: `components/ui/button.tsx` and `components/ui/dialog.tsx` created.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Checkpoint** — primitives present. Stop for review.

---

## Task 5: Site-level content + data types

**Files:**
- Create: `data/site.ts`

- [ ] **Step 1: Create `data/site.ts` with all site-level copy and the placeholder constant**

```ts
export const PLACEHOLDER_LINK = '#TODO-add-link';

export const site = {
  name: 'Simon Aytes',
  positioning: 'AI & Forward-Deployed Engineering',
  statusLine: 'Open to AI / Forward-Deployed Engineering roles',
  intro:
    "I build LLM systems that make it to production and stay there. My background runs from inference-time reasoning research at KAIST to internal AI platforms used across a company, and I care most about the messy last mile where a model becomes something people actually rely on. Right now I'm looking for AI engineering and forward-deployed roles where that kind of end-to-end ownership matters.",
  resumePath: '/simon-aytes-resume.pdf',
  email: 'simon@aytes.net',
  portrait: {
    src: '/photos/portrait.jpg', // TODO(simon): add grayscale portrait at this path
    alt: 'Portrait of Simon Aytes, grayscale, head and shoulders',
  },
} as const;
```

- [ ] **Step 2: Checkpoint** — file compiles (verified in Task 11 build). Stop for review.

---

## Task 6: Experience data + integrity tests

**Files:**
- Create: `data/experience.ts`, `tests/data.test.ts`

- [ ] **Step 1: Write the failing data-integrity test**

Create `tests/data.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { experience } from '@/data/experience';

describe('experience data', () => {
  it('has six company entries', () => {
    expect(experience).toHaveLength(6);
  });

  it('every entry has company, logo, dates, and narrative', () => {
    for (const e of experience) {
      expect(e.company).toBeTruthy();
      expect(e.logo).toMatch(/^\/logos\//);
      expect(e.dates).toBeTruthy();
      expect(e.narrative.length).toBeGreaterThan(40);
    }
  });

  it('url is either a valid-looking href or null', () => {
    for (const e of experience) {
      if (e.url !== null) expect(e.url).toMatch(/^https?:\/\//);
    }
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- tests/data.test.ts`
Expected: FAIL — cannot resolve `@/data/experience`.

- [ ] **Step 3: Create `data/experience.ts`**

```ts
export type Experience = {
  company: string;
  logo: string;       // path under /public/logos
  dates: string;
  narrative: string;  // company-level narrative, NOT resume bullets
  url: string | null; // company website, or null if none
};

export const experience: Experience[] = [
  {
    company: 'Penta Group',
    logo: '/logos/penta.svg', // TODO(simon): add logo
    dates: '2021 – 2024, 2026 – Present',
    narrative:
      'Penta is a global strategy and communications consultancy. I first joined as a data scientist building NLP and social-listening systems for media intelligence, then returned as a senior data scientist to design the internal AI tooling platform the analyst teams now build their client work on. Most of my time goes to turning fuzzy stakeholder needs into reliable, API-first tools.',
    url: null, // TODO(simon): verify and add Penta Group URL, or leave null
  },
  {
    company: 'KAIST MLAI Lab',
    logo: '/logos/kaist.svg', // TODO(simon): add logo
    dates: 'Feb 2024 – Dec 2025',
    narrative:
      "As a graduate researcher in KAIST's MLAI Lab under Prof. Sung Ju Hwang, I worked on making language models reason more efficiently at inference time. That line of work became my first-author EMNLP 2025 paper on cognitive-inspired sketching.",
    url: 'https://www.mlai-kaist.com',
  },
  {
    company: 'Freelance',
    logo: '/logos/freelance.svg', // TODO(simon): add personal/freelance logo
    dates: '2025',
    narrative:
      'I took on a production document-intelligence engagement for a small business, owning it from discovery with non-technical stakeholders through rollout. The system reads messy real-world invoices across many vendor formats and turns them into structured data the team can trust.',
    url: null,
  },
  {
    company: 'The Wall Street Journal',
    logo: '/logos/wsj.svg', // TODO(simon): add logo
    dates: 'Aug 2021 – Dec 2021',
    narrative:
      "As a Journo-Tech fellow, I built a model to predict how an article would perform from its headline and metadata, trained on the WSJ's own content archives. It was an early lesson in shipping machine learning against a real editorial product.",
    url: 'https://www.wsj.com',
  },
  {
    company: 'NASA Langley Research Center',
    logo: '/logos/nasa.svg', // TODO(simon): add logo
    dates: '2019 – 2021',
    narrative:
      'Over two years across several internships at NASA Langley, I designed and shipped VR tools that let researchers visualize and analyze 3D data. The work ran from a heat-map visualization tool adopted by the Engineering Design Studio through later AR/VR data-analysis prototypes, all driven by interviews with the researchers who would use them.',
    url: 'https://www.nasa.gov',
  },
  {
    company: 'York College, CUNY',
    logo: '/logos/york.svg', // TODO(simon): add logo
    dates: '2022',
    narrative:
      'I helped a research team design an automated pipeline to collect and structure indigent-burial records from sources across the country, supporting work on how the pandemic and the opioid crisis affected those burials.',
    url: 'https://www.york.cuny.edu',
  },
];
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- tests/data.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Checkpoint** — experience data verified. Stop for review.

---

## Task 7: Remaining data modules (work, skills, education, socials)

**Files:**
- Create: `data/work.ts`, `data/skills.ts`, `data/education.ts`, `data/socials.ts`
- Modify: `tests/data.test.ts`

- [ ] **Step 1: Extend the data test**

Append to `tests/data.test.ts`:
```ts
import { work } from '@/data/work';
import { skillGroups } from '@/data/skills';
import { education } from '@/data/education';
import { socials } from '@/data/socials';

describe('work data', () => {
  it('leads with the publication', () => {
    expect(work[0].kind).toBe('publication');
  });
  it('every item has a title and blurb', () => {
    for (const w of work) {
      expect(w.title).toBeTruthy();
      expect(w.blurb).toBeTruthy();
    }
  });
});

describe('skills data', () => {
  it('has three groups', () => {
    expect(skillGroups).toHaveLength(3);
    for (const g of skillGroups) expect(g.items.length).toBeGreaterThan(0);
  });
});

describe('education data', () => {
  it('has two entries', () => {
    expect(education).toHaveLength(2);
  });
});

describe('socials data', () => {
  it('includes the four required networks plus email', () => {
    const labels = socials.map((s) => s.label.toLowerCase());
    for (const required of ['github', 'linkedin', 'scholar', 'medium', 'email']) {
      expect(labels.some((l) => l.includes(required))).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- tests/data.test.ts`
Expected: FAIL — cannot resolve `@/data/work`.

- [ ] **Step 3: Create `data/work.ts`**

```ts
export type WorkKind = 'publication' | 'proprietary' | 'repo-placeholder';

export type WorkItem = {
  title: string;
  blurb: string;
  tags: string[];
  kind: WorkKind;
  links: { label: string; href: string }[];
};

import { PLACEHOLDER_LINK } from './site';

export const work: WorkItem[] = [
  {
    title: 'Sketch-of-Thought',
    blurb:
      'Efficient LLM reasoning via cognitive-inspired sketching. A training-free, inference-time method that cuts reasoning tokens by roughly 84% on average. First author, EMNLP 2025.',
    tags: ['LLM reasoning', 'EMNLP 2025', 'First author'],
    kind: 'publication',
    links: [
      { label: 'Paper', href: PLACEHOLDER_LINK }, // TODO(simon): ACL Anthology / arXiv
      { label: 'Code', href: PLACEHOLDER_LINK },  // TODO(simon): GitHub repo
    ],
  },
  {
    title: 'Internal AI tooling platform',
    blurb:
      'A full-stack, API-first internal platform that puts LLM-powered analysis in the hands of an entire company, including an MCP server that exposes its analysis API to agents. Proprietary; details generalized.',
    tags: ['FastAPI', 'React', 'MCP', 'LLM'],
    kind: 'proprietary',
    links: [],
  },
  {
    title: 'Invoice intelligence system',
    blurb:
      'A production system that turns thousands of messy, multi-format invoices a month into structured, trustworthy data using LLM-driven extraction. Proprietary; details generalized.',
    tags: ['LLM OCR', 'Structured outputs', 'Pydantic'],
    kind: 'proprietary',
    links: [],
  },
  {
    title: 'Lorem ipsum project',
    blurb:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    tags: ['Placeholder'],
    kind: 'repo-placeholder',
    links: [{ label: 'GitHub', href: PLACEHOLDER_LINK }], // TODO(simon): replace placeholder project
  },
  {
    title: 'Lorem ipsum project',
    blurb:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    tags: ['Placeholder'],
    kind: 'repo-placeholder',
    links: [{ label: 'GitHub', href: PLACEHOLDER_LINK }], // TODO(simon): replace placeholder project
  },
];
```

- [ ] **Step 4: Create `data/skills.ts`**

```ts
export type SkillGroup = { label: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    label: 'ML & AI',
    items: ['Python', 'PyTorch', 'LLMs', 'NLP', 'RAG', 'scikit-learn', 'Pandas', 'NumPy', 'SQL'],
  },
  {
    label: 'Tools',
    items: ['Anthropic SDK', 'Claude Code', 'FastAPI', 'PostgreSQL', 'TypeScript', 'React', 'Git'],
  },
  {
    label: 'Infrastructure',
    items: ['AWS (ECS, EC2, S3, SageMaker)', 'CodePipeline', 'CodeBuild', 'CI/CD', 'Docker', 'Linux'],
  },
];
```

- [ ] **Step 5: Create `data/education.ts`**

```ts
export type Education = {
  institution: string;
  degree: string;
  detail: string;
  dates: string;
};

export const education: Education[] = [
  {
    institution: 'Korea Advanced Institute of Science and Technology (KAIST)',
    degree: 'M.S., Artificial Intelligence',
    detail: 'Advisor: Prof. Sung Ju Hwang',
    dates: 'Dec 2025',
  },
  {
    institution: 'Lehman College, CUNY',
    degree: 'B.S., Computer Science (Minor: Data Science)',
    detail: 'Summa Cum Laude',
    dates: 'Dec 2022',
  },
];
```

- [ ] **Step 6: Create `data/socials.ts`**

```ts
import { site } from './site';

export type Social = { label: string; href: string };

export const socials: Social[] = [
  { label: 'GitHub', href: 'https://github.com/SimonAytes' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/simonaytes/' },
  { label: 'Google Scholar', href: '#TODO-add-link' }, // TODO(simon): add Scholar URL
  { label: 'Medium', href: '#TODO-add-link' },          // TODO(simon): add Medium URL
  { label: 'Email', href: `mailto:${site.email}` },
];
```

- [ ] **Step 7: Run to verify it passes**

Run: `npm test -- tests/data.test.ts`
Expected: PASS (all groups).

- [ ] **Step 8: Checkpoint** — all data modules verified. Stop for review.

---

## Task 8: Content-rules lint test

**Files:**
- Create: `tests/content-rules.test.ts`

This guards Simon's explicit anti-patterns (em-dash overuse, bullet/parallelism habits) in prose content.

- [ ] **Step 1: Write the content-rules test**

Create `tests/content-rules.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { site } from '@/data/site';
import { experience } from '@/data/experience';
import { work } from '@/data/work';

const prose = [
  site.intro,
  ...experience.map((e) => e.narrative),
  ...work.filter((w) => w.kind !== 'repo-placeholder').map((w) => w.blurb),
];

describe('content rules', () => {
  it('no em-dashes in prose', () => {
    for (const text of prose) {
      expect(text.includes('—')).toBe(false);
    }
  });

  it('no "not X but Y" parallelism markers in prose', () => {
    for (const text of prose) {
      expect(/\bnot\b[^.]*\bbut\b/i.test(text)).toBe(false);
    }
  });
});
```

- [ ] **Step 2: Run the test**

Run: `npm test -- tests/content-rules.test.ts`
Expected: PASS. If it fails, the prose in `data/*.ts` violates a rule — fix the copy, not the test.

- [ ] **Step 3: Checkpoint** — content rules enforced. Stop for review.

---

## Task 9: Hero, Intro sections + Hero test

**Files:**
- Create: `components/sections/hero.tsx`, `components/sections/intro.tsx`, `tests/hero.test.tsx`

- [ ] **Step 1: Write the failing Hero test**

Create `tests/hero.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/sections/hero';

describe('Hero', () => {
  it('renders the name and positioning', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { name: /simon aytes/i })).toBeInTheDocument();
    expect(screen.getByText(/forward-deployed engineering/i)).toBeInTheDocument();
  });

  it('exposes a resume download link', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /resume/i });
    expect(link).toHaveAttribute('href', '/simon-aytes-resume.pdf');
  });

  it('renders the portrait with descriptive alt text', () => {
    render(<Hero />);
    expect(screen.getByAltText(/portrait of simon aytes/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- tests/hero.test.tsx`
Expected: FAIL — cannot resolve `@/components/sections/hero`.

- [ ] **Step 3: Create `components/sections/hero.tsx`**

```tsx
import Image from 'next/image';
import { site } from '@/data/site';
import { socials } from '@/data/socials';

export function Hero() {
  return (
    <header className="mx-auto max-w-content px-6 pt-20 pb-16 md:pt-28">
      <div className="flex flex-col-reverse items-start gap-10 md:flex-row md:items-center md:gap-14">
        <div className="flex-1">
          <h1 className="font-serif text-5xl font-medium leading-none text-text md:text-6xl">
            {site.name}
          </h1>
          <p className="mt-3 text-lg text-muted">{site.positioning}</p>
          <p className="mt-5 max-w-[48ch] leading-relaxed text-text/80">{site.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={site.resumePath}
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-bg transition hover:opacity-90"
            >
              Download Resume
            </a>
            <a
              href="#work"
              className="rounded-lg border border-hairline px-5 py-2.5 text-sm font-medium text-text transition hover:border-accent"
            >
              View work
            </a>
          </div>
          <nav className="mt-6 flex flex-wrap gap-5 font-mono text-xs text-muted">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="transition hover:text-accent">
                {s.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="relative aspect-[4/5] w-40 shrink-0 overflow-hidden rounded-xl border border-hairline grayscale md:w-44">
          <Image src={site.portrait.src} alt={site.portrait.alt} fill className="object-cover" />
        </div>
      </div>
    </header>
  );
}
```

Note: the test environment does not have the portrait file; `next/image` with `fill` still renders an `<img>` with the `alt`, satisfying the test. The real image is supplied by Simon later.

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- tests/hero.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Create `components/sections/intro.tsx`**

The hero already carries the intro paragraph. This `Intro` section is a brief secondary statement below the fold; keep it minimal and non-redundant with the hero. Create:
```tsx
export function Intro() {
  return (
    <section id="about" className="mx-auto max-w-content px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-wider text-accent">About</p>
      <p className="mt-4 max-w-[60ch] text-xl leading-relaxed text-text/90">
        I work best at the boundary between research and delivery: prototyping something that
        works, then doing the unglamorous engineering that makes it dependable for the people who
        use it every day.
      </p>
    </section>
  );
}
```

- [ ] **Step 6: Run the content-rules test again to confirm new prose complies**

Add the intro section copy is static JSX (not in `data/`), so update `tests/content-rules.test.ts` is not required. Manually confirm the sentence above contains no em-dash (it uses a colon) and no "not X but Y". Run: `npm test`
Expected: PASS.

- [ ] **Step 7: Checkpoint** — Hero + Intro built and tested. Stop for review.

---

## Task 10: Experience section + card + dialog + test

**Files:**
- Create: `components/experience-card.tsx`, `components/sections/experience.tsx`, `tests/experience.test.tsx`

- [ ] **Step 1: Write the failing Experience test**

Create `tests/experience.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Experience } from '@/components/sections/experience';

describe('Experience', () => {
  it('renders a button for each of the six companies', () => {
    render(<Experience />);
    expect(screen.getByRole('button', { name: /penta group/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /nasa/i })).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(6);
  });

  it('opens a dialog with the company narrative on click', async () => {
    const user = userEvent.setup();
    render(<Experience />);
    await user.click(screen.getByRole('button', { name: /wall street journal/i }));
    expect(await screen.findByRole('dialog')).toHaveTextContent(/journo-tech/i);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- tests/experience.test.tsx`
Expected: FAIL — cannot resolve `@/components/sections/experience`.

- [ ] **Step 3: Create `components/experience-card.tsx`**

```tsx
'use client';

import Image from 'next/image';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription,
} from '@/components/ui/dialog';
import type { Experience } from '@/data/experience';

export function ExperienceCard({ item }: { item: Experience }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          aria-label={item.company}
          className="group flex aspect-[3/2] w-full items-center justify-center rounded-xl border border-hairline bg-surface p-6 transition hover:border-accent"
        >
          <Image
            src={item.logo}
            alt={`${item.company} logo`}
            width={120}
            height={48}
            className="max-h-12 w-auto opacity-80 transition group-hover:opacity-100"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="border-hairline bg-surface text-text">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">{item.company}</DialogTitle>
          <DialogDescription className="font-mono text-xs text-muted">{item.dates}</DialogDescription>
        </DialogHeader>
        <p className="leading-relaxed text-text/85">{item.narrative}</p>
        {item.url && (
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-accent hover:underline">
            Visit website
          </a>
        )}
      </DialogContent>
    </Dialog>
  );
}
```

- [ ] **Step 4: Create `components/sections/experience.tsx`**

```tsx
import { experience } from '@/data/experience';
import { ExperienceCard } from '@/components/experience-card';

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-content px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-wider text-accent">Experience</p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {experience.map((item) => (
          <ExperienceCard key={item.company} item={item} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run to verify it passes**

Run: `npm test -- tests/experience.test.tsx`
Expected: PASS (2 tests). If `next/image` errors on the missing logo in jsdom, the alt/aria still renders; the test asserts on the button aria-label and dialog text, which do not depend on the image loading.

- [ ] **Step 6: Checkpoint** — Experience section interactive and tested. Stop for review.

---

## Task 11: Selected Work, Skills, Education, Contact, Footer

**Files:**
- Create: `components/sections/selected-work.tsx`, `components/sections/skills.tsx`, `components/sections/education.tsx`, `components/sections/contact.tsx`, `components/sections/footer.tsx`

- [ ] **Step 1: Create `components/sections/selected-work.tsx`**

```tsx
import { work } from '@/data/work';

export function SelectedWork() {
  return (
    <section id="work" className="mx-auto max-w-content px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-wider text-accent">Selected Work</p>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {work.map((w, i) => (
          <article key={`${w.title}-${i}`} className="rounded-xl border border-hairline bg-surface p-6">
            <h3 className="font-serif text-xl text-text">{w.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-text/80">{w.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {w.tags.map((t) => (
                <span key={t} className="rounded-md border border-hairline px-2 py-1 font-mono text-[0.65rem] text-muted">
                  {t}
                </span>
              ))}
            </div>
            {w.links.length > 0 && (
              <div className="mt-4 flex gap-4">
                {w.links.map((l) => (
                  <a key={l.label} href={l.href} className="text-sm font-medium text-accent hover:underline">
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/sections/skills.tsx`**

```tsx
import { skillGroups } from '@/data/skills';

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-content px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-wider text-accent">Skills</p>
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
        {skillGroups.map((g) => (
          <div key={g.label}>
            <h3 className="font-serif text-lg text-text">{g.label}</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-text/80">
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `components/sections/education.tsx`**

```tsx
import { education } from '@/data/education';

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-content px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-wider text-accent">Education</p>
      <div className="mt-6 space-y-6">
        {education.map((e) => (
          <div key={e.institution} className="flex flex-col gap-1 border-b border-hairline pb-6 md:flex-row md:items-baseline md:justify-between">
            <div>
              <h3 className="font-serif text-lg text-text">{e.institution}</h3>
              <p className="text-sm text-text/80">{e.degree}</p>
              <p className="text-sm text-muted">{e.detail}</p>
            </div>
            <span className="font-mono text-xs text-muted">{e.dates}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `components/sections/contact.tsx`**

```tsx
import { site } from '@/data/site';

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-content px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-wider text-accent">Contact</p>
      <h2 className="mt-4 max-w-[20ch] font-serif text-3xl text-text md:text-4xl">
        If any of this lines up with what you are building, reach out.
      </h2>
      <div className="mt-6 flex flex-wrap gap-4">
        <a href={`mailto:${site.email}`} className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-bg transition hover:opacity-90">
          {site.email}
        </a>
        <a href="https://www.linkedin.com/in/simonaytes/" className="rounded-lg border border-hairline px-5 py-2.5 text-sm font-medium text-text transition hover:border-accent">
          LinkedIn
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create `components/sections/footer.tsx`**

```tsx
import { socials } from '@/data/socials';
import { site } from '@/data/site';

export function Footer() {
  return (
    <footer className="mx-auto max-w-content px-6 py-10 border-t border-hairline">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <span className="font-mono text-xs text-muted">© {new Date().getFullYear()} {site.name}</span>
        <nav className="flex flex-wrap gap-5 font-mono text-xs text-muted">
          {socials.map((s) => (
            <a key={s.label} href={s.href} className="transition hover:text-accent">{s.label}</a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: Checkpoint** — remaining sections built. Stop for review.

---

## Task 12: Compose the page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import { Hero } from '@/components/sections/hero';
import { Intro } from '@/components/sections/intro';
import { Experience } from '@/components/sections/experience';
import { SelectedWork } from '@/components/sections/selected-work';
import { Skills } from '@/components/sections/skills';
import { Education } from '@/components/sections/education';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <Experience />
      <SelectedWork />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Run the full test suite**

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 3: Build the static export**

Run: `npm run build`
Expected: success; `out/` regenerated. Missing portrait/logo image files are acceptable at this stage (they 404 at runtime but do not break the build).

- [ ] **Step 4: Checkpoint** — full page composes and builds. Stop for review.

---

## Task 13: Deployment assets (GitHub Pages)

**Files:**
- Create: `public/CNAME`, `public/.nojekyll`, `.github/workflows/deploy.yml`, placeholder image notes

- [ ] **Step 1: Create `public/CNAME`**

File contents (single line):
```
saytes.io
```

- [ ] **Step 2: Create `public/.nojekyll`**

Empty file.

- [ ] **Step 3: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 4: Add a README note for required user-supplied assets**

Create `public/photos/README.md` and `public/logos/README.md` each listing the exact filenames the code expects:
- `public/photos/README.md`: "Place `portrait.jpg` here (grayscale headshot, ~4:5 aspect)."
- `public/logos/README.md`: "Place these SVGs here: `penta.svg`, `kaist.svg`, `freelance.svg`, `wsj.svg`, `nasa.svg`, `york.svg`."

- [ ] **Step 5: Verify build still produces CNAME and .nojekyll in out/**

Run: `npm run build && ls out/CNAME out/.nojekyll`
Expected: both files present in `out/` (Next copies `public/` into the export).

- [ ] **Step 6: Checkpoint** — deployment assets in place. Stop for review.

---

## Task 14: Responsive + accessibility verification

**Files:** none (verification only)

- [ ] **Step 1: Serve the static export locally**

Run:
```bash
npx serve out
```

- [ ] **Step 2: Verify responsive behavior**

Using the `superpowers:webapp-testing` skill (Playwright) or manual browser resizing, confirm at widths 375px, 768px, and 1440px:
- Hero stacks portrait-over-text on mobile, side-by-side on desktop.
- Experience grid: 1 column (mobile) → 2 (sm) → 3 (lg).
- Selected Work: 1 column (mobile) → 2 (md).
- Skills: 1 column (mobile) → 3 (md).
- No horizontal overflow at any width.

- [ ] **Step 3: Verify interaction + a11y**

- Tab to an experience card and press Enter/Space → dialog opens.
- Press Esc → dialog closes, focus returns to the trigger.
- Confirm `npm run build` shows no console errors in the served page.

- [ ] **Step 4: Final checkpoint** — record results and list any user-supplied assets still outstanding (portrait, logos, resume PDF, paper/Scholar/Medium links). Stop for review.

---

## Outstanding user-supplied items (post-build)
- `public/photos/portrait.jpg` — grayscale portrait.
- `public/logos/*.svg` — six company logos (incl. freelance).
- `public/simon-aytes-resume.pdf` — resume.
- Real links for Sketch-of-Thought (paper + code), Google Scholar, Medium, and verification of the Penta URL.
- Replace the two lorem-ipsum repo-placeholder entries in `data/work.ts`.
- Git init, repo creation, and enabling GitHub Pages (source: GitHub Actions).

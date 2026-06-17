# Portfolio Website — Design Spec

**Date:** 2026-06-16
**Owner:** Simon Aytes
**Status:** Approved for planning

## 1. Purpose

A single-page personal/portfolio site for Simon Aytes, positioning him for **AI Engineering and Forward-Deployed Engineering** roles (not "Senior Data Scientist," which is his current title but not his target). The site is the professional equivalent of showing up well-dressed: it must look deliberately designed and human-made, not AI-generated. It is **not** a resume copy and **not** a CMS — it is a single, fast, statically-maintainable page that is the one-stop shop for everything about Simon.

### Success criteria
- Reads as professionally designed, minimal, and direct.
- Fully responsive; usable and attractive on mobile (primary), tablet, and wide screens.
- Statically maintainable: content edits happen in typed data files, not JSX.
- Highlights brand-recognition assets (NASA, WSJ, KAIST, Penta) via logos without reiterating resume bullets.
- Deploys to GitHub Pages on the custom domain `saytes.io`.

## 2. Information Architecture

Single page, top-to-bottom:

| # | Section | Contents |
|---|---------|----------|
| 1 | **Hero** | Grayscale portrait (inset), "open to roles" status line, name, positioning line, intro CTA buttons (Download Resume, View work), social links. |
| 2 | **Intro** | 2–3 sentences: who Simon is and what he's after. No KPIs, no buzzword chips. |
| 3 | **Experience** | Six company cards with logos. Click/tap opens a dialog with a short company narrative, dates, and an external website link. Grouped by **company**, not role. |
| 4 | **Selected Work** | Sketch-of-Thought (lead, with links added later), proprietary work write-ups (Penta platform, invoice system), and placeholder repo cards (lorem ipsum) for in-progress OSS. |
| 5 | **Skills** | Grouped (ML & AI / Tools / Infrastructure). Restrained — not a wall of chips. |
| 6 | **Education** | KAIST (M.S. AI) and Lehman College (B.S. CS, Summa Cum Laude). Compact. |
| 7 | **Contact** | LinkedIn + email with a direct CTA to reach out. Static — no form. |
| — | **Footer / socials** | GitHub, LinkedIn, Google Scholar, Medium. Persistent. |

### Content rules
- **No reiteration between Experience and Selected Work.** Experience = company narrative (what the place is, what Simon owned there, high-level). Selected Work = specific shippable artifacts (the paper, the platform, the invoice system, future repos). The Penta *platform* write-up lives in Selected Work; the Penta *card* describes the role arc.
- **Experience grouping:** one card per company covering all roles/stints as a progression inside the dialog. Companies: Penta Group (both stints / four titles), KAIST, Freelance, The Wall Street Journal, NASA Langley, York College (CUNY).
- **All six experience cards carry logos** (Simon has a freelance logo).
- **Positioning:** hero leads with "AI & Forward-Deployed Engineering." Current title appears only in the Experience section where accurate.
- **Dropped for minimalism:** languages, certifications, scholarships, honors (kept only Summa Cum Laude on the Lehman line). Location/timezone omitted.
- **No content anti-patterns:** avoid em-dash overuse, excessive bullets, "not X but Y" parallelisms, redundant data, resume-bullet reiteration, and any unverified claims about Simon. When in doubt, leave a clearly-marked placeholder for Simon to fill.

## 3. Visual Direction

### Palette — "Graphite & Amber" (dark, single accent)
| Token | Hex | Use |
|-------|-----|-----|
| `bg` | `#0E0F11` | Page background |
| `surface` | `#181A1D` | Cards, raised elements |
| `muted` | `#9A9CA0` | Secondary text |
| `text` | `#F4F1EC` | Primary text (warm off-white) |
| `accent` | `#E8A148` | Single accent (links, primary button, eyebrows) |

Supporting: hairline borders at `rgba(244,241,236,0.08–0.12)`; a "live" green `#4FD18A` reserved solely for the status indicator pulse.

### Typography — Pairing 1
- **Headers:** Fraunces (serif), weights 500–600, optical sizing.
- **Body:** Inter (sans), 400–600.
- **Mono (sparingly):** JetBrains Mono for eyebrows, labels, dates, status line, social labels.
- Loaded via `next/font` (self-hosted, no layout shift, GDPR-clean).

### Hero composition — Asymmetric split (v2)
- Two columns on desktop: left = status line + name + positioning + intro + CTA buttons + socials; right = grayscale portrait as a **~168px inset** (4:5 aspect), framed with a hairline border. The portrait supports the name rather than competing with it.
- Status line above the name: small green pulse + "Open to AI / Forward-Deployed Engineering roles" in mono.
- CTAs: amber primary "Download Resume," ghost "View work."
- Mobile: stacks to portrait-over-text, single column.

### Overall aesthetic
Minimal surface, technical detailing used with restraint: thin rules, mono micro-labels, generous whitespace. "Technical maximalism within minimalism" — the detailing signals craft without clutter.

## 4. Technical Architecture

### Stack
- **Next.js (App Router) + TypeScript + React.**
- **Tailwind CSS** with design tokens (palette + fonts) wired into the Tailwind config and CSS variables. Nothing hardcoded per-component.
- **shadcn/ui** for primitives: Dialog (experience cards), Button, and any other needed primitives.
- **Static export:** `output: 'export'`, `images: { unoptimized: true }`, **no `basePath`** (custom domain serves from root).

### Content model
Content lives in typed TS data modules, not JSX:
- `data/experience.ts` — `{ company, logo, dates, narrative, url }[]`
- `data/work.ts` — `{ title, blurb, links, tags, kind }[]` (kind: publication | proprietary | repo-placeholder)
- `data/skills.ts` — grouped skill lists (ML & AI / Tools / Infrastructure)
- `data/education.ts` — `{ institution, degree, detail, dates }[]`
- `data/socials.ts` — `{ label, href, icon }[]` (GitHub, LinkedIn, Scholar, Medium, email)

Adding a job or project = editing a plain typed object.

### Assets
- `public/logos/` — company logos (SVG preferred).
- `public/photos/` — portrait; referenced as a placeholder with descriptive alt text until Simon supplies the real grayscale image.
- `public/simon-aytes-resume.pdf` — resume served as a static asset; hero button links directly. Replace the file to update; no rebuild logic.

### Component structure
- `app/page.tsx` composes section components: `Hero`, `Intro`, `Experience`, `SelectedWork`, `Skills`, `Education`, `Contact`, `Footer`.
- `ExperienceCard` + shared `ExperienceDialog` (shadcn Dialog) for click-to-expand narratives.
- Each section is a focused, independently-understandable component reading from its data module.

### Responsiveness & accessibility
- Mobile-first; verified at narrow / tablet / wide widths.
- Experience grid collapses to one column on mobile; dialogs render as full-width sheets on small screens.
- Cards are keyboard-operable buttons; dialogs trap focus and close on Esc; images have alt text; color contrast meets WCAG AA on the dark theme.

### Deployment — GitHub Pages + custom domain
- Static export output published to GitHub Pages.
- `public/CNAME` containing `saytes.io`.
- `public/.nojekyll` so Pages serves `_next/` assets.
- `.github/workflows/deploy.yml` — GitHub Actions workflow to build the static export and deploy to Pages. Included in source; Simon wires up the repo and enables Pages. **No git operations performed during this build — source control is Simon's responsibility.**

## 5. Verification
- `next build` passes with static export, zero type errors, zero console errors.
- Responsive behavior verified at multiple widths before completion.
- Manual pass against content anti-patterns (no em-dash overuse, no resume reiteration, no unverified claims).

## 6. Open items for Simon (post-build)
- Real grayscale portrait → `public/photos/`.
- Company logos (incl. freelance) → `public/logos/`.
- Resume PDF → `public/`.
- Sketch-of-Thought links (arXiv / ACL Anthology / repo).
- Real Selected Work content to replace lorem-ipsum repo placeholders.
- Final intro/narrative copy review (drafts provided; Simon owns voice).
- Git init, repo creation, Pages setup.

## 7. Explicitly out of scope (YAGNI)
- Contact form / backend / serverless functions.
- CMS or content portal.
- Blog/article system (Medium handled via external link).
- Light theme.
- Multi-page routing.

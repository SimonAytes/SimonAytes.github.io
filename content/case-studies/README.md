# Case studies

Each `.mdx` file in this directory becomes a standalone page at
`/case-studies/<filename>/`. These pages are **not** in the nav, sitemap, or any
index. The only inbound link is the matching Selected Work card.

## Publishing a new case study

1. Create `content/case-studies/<slug>.mdx` with frontmatter (see below).
2. In `data/work.ts`, add `caseStudy: '<slug>'` to the relevant work item. The
   card will render a "Read case study" link.

That's it. The build enumerates the files automatically.

## Frontmatter

```yaml
---
title: Invoice Intelligence System        # required
summary: One sentence used for the page <title>, meta description, and intro.
client: Confidential SMB client           # optional, shown in the meta line
role: Lead Engineer                       # optional, shown in the meta line
date: 2025                                 # optional, shown in the meta line
tags: [LLM OCR, Pydantic]                  # optional chips
confidential: true                         # defaults to true; set false to hide the banner
cover: /case-studies/cover.png             # optional hero image (place in /public)
coverAlt: Description of the cover image   # optional alt text for the cover
---
```

When `confidential` is true (the default), the anonymization banner renders
automatically near the top of the page.

## Authoring components

Standard Markdown is styled via the `.prose-site` typography theme. Two helpers
are available inside MDX without importing them:

- `<Callout title="Optional">…</Callout>` — bordered highlight box.
- `<Figure src="/path.png" alt="…" caption="Optional caption" />` — captioned image.

Links and images are styled and given correct external-link behavior automatically.

## Format


---
title: Invoice Intelligence System
client: Confidential SMB client
role: Lead Engineer
date: 2025
summary: A production document-intelligence system that turns messy, multi-format invoices into dependable structured data, processing roughly 3,000 documents a month across more than 100 vendor layouts.
tags: [LLM OCR, Structured outputs, Pydantic, Automation]
confidential: true
---

- Context
- Problem
- Approach
- Results
- Retrospective

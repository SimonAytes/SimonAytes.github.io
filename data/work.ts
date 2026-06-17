export type WorkKind = 'publication' | 'proprietary' | 'github' | 'research' | 'repo-placeholder';

export type WorkItem = {
  title: string;
  blurb: string;
  tags: string[];
  kind: WorkKind;
  links: { label: string; href: string }[];
  // Slug of an MDX file in content/case-studies/. When set, the card links to
  // /case-studies/<slug>/. This is the only inbound link to a case study.
  caseStudy?: string;
};

export const work: WorkItem[] = [
  {
    title: 'Sketch-of-Thought',
    blurb:
      'Efficient LLM reasoning via cognitive-inspired sketching. A training-free, inference-time method that cuts reasoning tokens by roughly 84% on average. First author, EMNLP 2025.',
    tags: ['Publication', 'LLM reasoning', 'EMNLP 2025'],
    kind: 'publication',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2503.05179' },
      { label: 'GitHub', href: 'https://github.com/SimonAytes/SoT' },
      { label: 'Demo', href: 'https://saytes.io/projects/sot' }, // Leave this as external link so it opens in a new tab
    ],
  },
  {
    title: 'Company-wide AI tooling platform',
    blurb:
      'Internal platform for analyst-facing LLM workflows, scaled to 1,500+ monthly analysis runs by 180+ users. Built API-first services, durable report storage, audit trails, usage analytics, ECS worker execution, and an MCP server for agent access. Proprietary; details generalized.',
    tags: ['FastAPI', 'React', 'AWS ECS', 'MCP'],
    kind: 'proprietary',
    links: [],
  },
  {
    title: 'Invoice intelligence system',
    blurb:
      'Production document-intelligence system for a small-business client, handling roughly 3,000 invoices a month across 100+ vendor formats. Uses LLM-driven OCR and OpenAI structured outputs with Pydantic schemas to turn messy documents into dependable business data. Proprietary; details generalized.',
    tags: ['LLM OCR', 'Structured outputs', 'Pydantic', 'Automation'],
    kind: 'proprietary',
    links: [],
    // caseStudy: 'invoice-intelligence',  // Add back in later on
  },
  {
    title: 'Public records extraction pipeline',
    blurb:
      'Automated pipeline for public-interest research on indigent burials, turning scattered state and local records into a structured dataset for feasibility analysis. The work supported research into how the pandemic and opioid crisis affected public burial systems.',
    tags: ['Data extraction', 'Public records', 'Research'],
    kind: 'research',
    links: [],
  },
];

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content/case-studies');

export type CaseStudyMeta = {
  slug: string;
  title: string;
  client?: string;
  role?: string;
  date?: string;
  summary?: string;
  confidential: boolean;
  cover?: string;
  coverAlt?: string;
  github?: string;
};

export type CaseStudySource = {
  meta: CaseStudyMeta;
  body: string;
};

function readFrontmatter(slug: string): CaseStudySource | null {
  const file = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);

  const meta: CaseStudyMeta = {
    slug,
    title: String(data.title ?? slug),
    client: data.client ? String(data.client) : undefined,
    role: data.role ? String(data.role) : undefined,
    date: data.date ? String(data.date) : undefined,
    summary: data.summary ? String(data.summary) : undefined,
    // Confidential by default; opt out per file with `confidential: false`.
    confidential: data.confidential !== false,
    cover: data.cover ? String(data.cover) : undefined,
    coverAlt: data.coverAlt ? String(data.coverAlt) : undefined,
    github: data.github ? String(data.github) : undefined,
  };

  return { meta, body: content };
}

export function getCaseStudySlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getCaseStudy(slug: string): CaseStudySource | null {
  return readFrontmatter(slug);
}

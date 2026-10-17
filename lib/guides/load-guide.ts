import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

import { GUIDE_PUBLICATION_DATE, guideRegistry, guideSlugs } from '@/lib/guides/registry';
import { slugifyHeading } from '@/lib/guides/slugify-heading';
import type {
  Guide,
  GuideFaq,
  GuideFrontmatter,
  GuideHeading,
  GuideListItem,
} from '@/lib/guides/types';

const guidesDirectory = path.join(process.cwd(), 'content/guides');

function parseHeadings(body: string): GuideHeading[] {
  const headings: GuideHeading[] = [];
  for (const line of body.split('\n')) {
    const h2 = line.match(/^## (.+)$/);
    if (h2) {
      const text = h2[1].trim();
      if (text.toLowerCase() === 'references') continue;
      headings.push({ id: slugifyHeading(text), text, level: 2 });
      continue;
    }
    const h3 = line.match(/^### (.+)$/);
    if (h3) {
      const text = h3[1].trim();
      headings.push({ id: slugifyHeading(text), text, level: 3 });
    }
  }
  return headings;
}

function parseFaqs(body: string): GuideFaq[] {
  const faqSection = body.split(/^## Frequently asked questions\s*$/im)[1];
  if (!faqSection) return [];

  const faqs: GuideFaq[] = [];
  const blocks = faqSection.split(/^### /m).slice(1);
  for (const block of blocks) {
    const newline = block.indexOf('\n');
    if (newline === -1) continue;
    const question = block.slice(0, newline).trim();
    const answer = block
      .slice(newline + 1)
      .split(/^## /m)[0]
      .trim();
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }
  return faqs;
}

function readGuideFile(slug: string): Guide {
  const entry = guideRegistry[slug];
  if (!entry) {
    throw new Error(`Unknown guide slug: ${slug}`);
  }

  const filePath = path.join(guidesDirectory, entry.filename);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const frontmatter = data as GuideFrontmatter;

  const wordCount =
    typeof frontmatter.word_count === 'number'
      ? frontmatter.word_count
      : content.split(/\s+/).filter(Boolean).length;

  const readMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return {
    ...frontmatter,
    slug,
    word_count: wordCount,
    body: content.trim(),
    readMinutes,
    datePublished: entry.dateModified ?? GUIDE_PUBLICATION_DATE,
    dateModified: entry.dateModified ?? GUIDE_PUBLICATION_DATE,
    shortVersion: entry.shortVersion,
    headings: parseHeadings(content),
    faqs: parseFaqs(content),
    featured: Boolean(entry.featured),
    relatedPlayLinks: entry.relatedPlayLinks,
    relatedGuideSlugs: entry.relatedGuideSlugs,
  };
}

export function getAllGuides(): GuideListItem[] {
  return guideSlugs.map((slug) => {
    const guide = readGuideFile(slug);
    return {
      slug: guide.slug,
      title: guide.title,
      meta_description: guide.meta_description,
      readMinutes: guide.readMinutes,
      featured: guide.featured,
      dateModified: guide.dateModified,
      group: guideRegistry[slug]?.group,
    };
  });
}

export function getGuideBySlug(slug: string): Guide | undefined {
  if (!guideRegistry[slug]) return undefined;
  return readGuideFile(slug);
}

export function getFeaturedGuide(): Guide {
  const featuredSlug = guideSlugs.find((slug) => guideRegistry[slug].featured) ?? guideSlugs[0];
  return readGuideFile(featuredSlug);
}

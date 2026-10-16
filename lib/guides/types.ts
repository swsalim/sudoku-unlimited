export type GuidePlayLink = {
  href: string;
  title: string;
  description: string;
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type GuideHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type GuideFrontmatter = {
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  primary_keyword?: string;
  secondary_keywords?: string[];
  word_count: number;
  status?: string;
  brief?: string;
};

export type Guide = GuideFrontmatter & {
  body: string;
  readMinutes: number;
  datePublished: string;
  dateModified: string;
  shortVersion: string[];
  headings: GuideHeading[];
  faqs: GuideFaq[];
  featured: boolean;
  relatedPlayLinks: GuidePlayLink[];
  relatedGuideSlugs: string[];
};

export type GuideGroup = 'techniques';

export type GuideListItem = Pick<
  Guide,
  'slug' | 'title' | 'meta_description' | 'readMinutes' | 'featured' | 'dateModified'
> & {
  group?: GuideGroup;
};

---
domain: sudokuunlimited.com
origin: https://sudokuunlimited.com
source_render: false
generated_at: 2026-10-15T16:41:08.672Z
findings: 1
source_evidence: .seoagent/audit/evidence.md
note: >-
  MACHINE-GENERATED findings report derived from the live-crawl evidence.
  The audit (audit/latest.md) BUILDS ON this file — it must carry every
  finding below forward (adding GSC context and prioritization on top),
  never re-derive or truncate the list. Do not hand-edit; re-run
  `seoagent crawl` to regenerate.
---

# Technical findings — sudokuunlimited.com (from the live crawl)

Derived by code from `.seoagent/audit/evidence.md` (crawled https://sudokuunlimited.com at 2026-10-15T16:41:08.672Z). Every finding below is **Confirmed** against that evidence. Reporting every one of these is non-negotiable — session economy trims bookkeeping, never findings.

## [Medium] 1 page serves no structured data (zero JSON-LD)

**Confirmed** · Evidence: evidence.md § Site-wide rollup — Pages with no structured data (zero JSON-LD)

**Check:** `json_ld_missing`

The server HTML of these pages contains no `<script type="application/ld+json">` block at all.

Affected URLs:
- https://sudokuunlimited.com/daily

**Why it matters:** Structured data powers rich results and gives AI search engines an unambiguous machine-readable summary of the page; pages without it compete on prose alone.

**Suggested fix:** Add the JSON-LD type matching each page (Organization/WebSite on the homepage, Article/BlogPosting on posts, etc.) — only on the pages listed here; other crawled pages already serve schema.

## 1 crawled page is excluded from search on purpose

These pages were captured by the crawl but are held out of the page-scoped findings above: the site itself excludes them from Google, so on-page gaps on them cost no traffic. Listed here so nothing is dropped silently — if one of these should be indexable, that is the finding.

**1 page — canonical points at a different page on this site:**
- https://sudokuunlimited.com/killer-sudoku

## Already present on the live site — never recommend adding these

The crawl confirms the following already exist in the live server HTML. If the repo source lacks any of them, the **repo source is stale — the live page already serves it; reconcile the source** with what is live. Never phrase these as "add X".

- https://sudokuunlimited.com/ — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (WebSite, FAQPage, Organization, SoftwareApplication, BreadcrumbList, HowTo)
- https://sudokuunlimited.com/about — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (WebPage, BreadcrumbList, Person, Organization)
- https://sudokuunlimited.com/killer-sudoku — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (WebPage, FAQPage, HowTo, BreadcrumbList, Organization, SoftwareApplication)
- https://sudokuunlimited.com/killer-sudoku/easy — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (WebPage, FAQPage, HowTo, BreadcrumbList, Organization, SoftwareApplication)
- https://sudokuunlimited.com/killer-sudoku/expert — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (WebPage, FAQPage, HowTo, BreadcrumbList, Organization, SoftwareApplication)
- https://sudokuunlimited.com/killer-sudoku/extreme — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (WebPage, FAQPage, HowTo, BreadcrumbList, Organization, SoftwareApplication)
- https://sudokuunlimited.com/killer-sudoku/hard — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (WebPage, FAQPage, HowTo, BreadcrumbList, Organization, SoftwareApplication)
- https://sudokuunlimited.com/killer-sudoku/master — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (WebPage, FAQPage, HowTo, BreadcrumbList, Organization, SoftwareApplication)
- https://sudokuunlimited.com/killer-sudoku/medium — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (WebPage, FAQPage, HowTo, BreadcrumbList, Organization, SoftwareApplication)
- https://sudokuunlimited.com/sudoku-solver — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (WebPage, FAQPage, HowTo, BreadcrumbList, Organization, SoftwareApplication)
- https://sudokuunlimited.com/easy — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (WebPage, FAQPage, BreadcrumbList, Organization, SoftwareApplication)
- https://sudokuunlimited.com/expert — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (WebPage, FAQPage, BreadcrumbList, Organization, SoftwareApplication)
- https://sudokuunlimited.com/extreme — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (WebPage, FAQPage, BreadcrumbList, Organization, SoftwareApplication)
- https://sudokuunlimited.com/hard — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (WebPage, FAQPage, BreadcrumbList, Organization, SoftwareApplication)
- https://sudokuunlimited.com/master — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (WebPage, FAQPage, BreadcrumbList, Organization, SoftwareApplication)
- https://sudokuunlimited.com/medium — <title>, meta description, canonical, Open Graph tags, Twitter card, JSON-LD schema (WebPage, FAQPage, BreadcrumbList, Organization, SoftwareApplication)
- https://sudokuunlimited.com/daily — <title>, meta description, canonical, Open Graph tags, Twitter card

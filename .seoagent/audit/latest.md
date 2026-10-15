---
audited_at: "2026-10-16T00:41:00+08:00"
domain: sudokuunlimited.com
pages_crawled: 17
source: live crawl + Faker handoff verification
---

# Audit — sudokuunlimited.com (2026-10-16 SGT)

Live crawl: 17/17 pages from https://sudokuunlimited.com (`evidence.md`, captured 2026-10-15T16:41:08.672Z). Plus verification of Faker's Oct 15 audit notes.

## Faker findings — verification

| Claim | Verdict | Evidence |
|---|---|---|
| Home H1 is "How to Play Sudoku" | **Confirmed** | evidence.md § `/` — h1(s): `How to Play Sudoku` |
| Difficulty pages lack plain `<a>` from home | **Confirmed** | Server HTML of `/` unique same-site hrefs: `/`, `/daily`, `/sudoku-solver`, `/killer-sudoku`, `/about` only. No `/easy`…`/extreme`. Navbar (`components/navbar.tsx` in repo) and home body (`app/page.tsx`) also omit them — difficulty is selected via JS game UI. |
| Home canonical no trailing slash | **Confirmed** | evidence.md: canonical `https://sudokuunlimited.com`. Both `/` and no-slash return 200 (no 301 between them). Sitemap home loc also no-slash. Minor consistency item. |
| robots.txt fine | **Confirmed** | Disallows only `/*.json$` and Next SSG manifests; Sitemap absolute URL present. AI crawlers not blocked. |
| Sitemap 17 URLs | **Confirmed** | evidence.md + live sitemap.xml |
| Tech solid (SSR, schema, tags) | **Confirmed** | All 17 pages have title, meta, canonical, OG/Twitter; 16/17 have JSON-LD. Body words 152–638. |

## Findings (must include all from findings.md)

### [Medium] /daily has no structured data
**Confirmed** · Evidence: findings.md + evidence.md rollup — Pages with no structured data → `https://sudokuunlimited.com/daily`
Add WebPage/SoftwareApplication (+ FAQPage if FAQ is visible) JSON-LD on `/daily`.

### [High — architecture] Difficulty + killer level pages are orphans from home HTML
**Confirmed** · Evidence: home server HTML href list (curl 2026-10-16); sitemap lists `/easy` `/medium` `/hard` `/expert` `/master` `/extreme` plus `/killer-sudoku/{easy…extreme}` but home does not link them as `<a>`.
Add plain `<a>` links from home (and ideally nav) to all classic + killer difficulty URLs in the sitemap.

### [Medium — on-page] Home H1 targets "how to play", not "play free sudoku"
**Confirmed** · Evidence: evidence.md § `/` H1.
Change H1 to `Play Free Sudoku Online`; demote existing how-to content under an H2 (e.g. keep "How to Play Sudoku" as H2).

### [Low] Home trailing-slash / canonical consistency
**Confirmed** · Evidence: canonical without slash; `/` and bare host both 200.
Prefer one form (match canonical: no slash) with a single 301, or ensure Next trailingSlash config matches the canonical.

### [Note] /killer-sudoku canonicals to /killer-sudoku/easy
**Confirmed** · Evidence: findings.md "excluded on purpose" + evidence.md canonical on `/killer-sudoku`. Intentional consolidation — not a bug unless a distinct hub page is wanted.

### [Medium] No llms.txt / OKF on live site
**Hypothesis pending deploy of SEOAgent AI files** · Live `/llms.txt` and `/.well-known/okf/index.md` not served as AI-readable maps (checked Oct 16). Offer `seoagent llms` + OKF publish in a later PR after owner approval.

## Already working
- Full title/meta/canonical/OG/Twitter on all crawled pages
- Rich JSON-LD on homepage and difficulty/solver/killer pages
- robots.txt + absolute Sitemap
- SSR with substantial body copy
- Image alt coverage (0 missing)

## Priority actions (approval-gated PRs)
1. PR: home plain `<a>` links to all 6 classic + killer difficulty pages; H1 → Play Free Sudoku Online; trailing-slash consistency.
2. Follow-up PR: `/daily` JSON-LD; daily archive (`/daily/YYYY-MM-DD`) — larger scope.
3. Later: llms.txt / OKF; content expansion per Faker 1–3 month plan (owner-approved).

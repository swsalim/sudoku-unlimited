---
name: Sudoku Solver SEO Page
overview: Create a new `/sudoku-solver` route modeled after sudoku.com’s solver UX, with a functional input-and-solve experience plus SEO-focused content and structured data to target “solve this sudoku” intent.
todos:
  - id: route-and-metadata
    content: Create `/app/sudoku-solver/page.tsx` with metadata and page composition
    status: completed
  - id: solver-component
    content: Implement client-side solver UI component with input, validation, and actions
    status: completed
  - id: solver-utils
    content: Add pure solver/validation helpers in `utils/sudoku.ts`
    status: completed
  - id: seo-schema
    content: Add solver-specific schema module + schema script export
    status: completed
  - id: faq-and-content
    content: Add long-form SEO content and solver FAQ section on the new page
    status: completed
  - id: internal-linking
    content: Add navigation/internal link to `/sudoku-solver` and verify discoverability
    status: completed
  - id: verify
    content: Run lint/type checks and functional/manual validation
    status: completed
isProject: false
---

# Build `/sudoku-solver` Page

## Scope and Defaults

- Implement v1 with these defaults: manual 9x9 input, conflict validation, `Solve`, `Clear`, `Reset` (to loaded puzzle), and `Load Example`.
- Exclude step-by-step explanation logic for v1 (can be added later as phase 2).
- Optimize copy and metadata for keyword intent around “solve this sudoku”, “sudoku solver”, and close variants.

## Implementation Plan

- Add a dedicated route at `[/Users/yuyu.salim/Projects/yuyu/sudoku-unlimited/app/sudoku-solver/page.tsx](/Users/yuyu.salim/Projects/yuyu/sudoku-unlimited/app/sudoku-solver/page.tsx)` with:
  - route-level metadata (`title`, `description`, `keywords`, canonical, Open Graph, Twitter)
  - solver UI mounted above long-form SEO sections (similar structure to homepage/difficulty pages)
- Create a reusable solver client component (new file) at `[/Users/yuyu.salim/Projects/yuyu/sudoku-unlimited/components/sudoku-solver.tsx](/Users/yuyu.salim/Projects/yuyu/sudoku-unlimited/components/sudoku-solver.tsx)`:
  - editable 9x9 grid (single digit 1-9 input)
  - real-time conflict checks using existing Sudoku rules
  - actions: `Solve`, `Clear`, `Reset`, `Load Example`
  - clear validation states/messages for invalid or unsolvable input
- Extend Sudoku utility logic in `[/Users/yuyu.salim/Projects/yuyu/sudoku-unlimited/utils/sudoku.ts](/Users/yuyu.salim/Projects/yuyu/sudoku-unlimited/utils/sudoku.ts)`:
  - add pure helpers for solver mode (e.g., `solvePuzzle`, `validatePuzzle`, candidate-safe checks that ignore current cell)
  - ensure input puzzle is solved via backtracking without mutating caller state
  - return structured result (`solved`, `invalid`, `multiple/none`) for UX messaging
- Add SEO FAQ + schema data source at `[/Users/yuyu.salim/Projects/yuyu/sudoku-unlimited/lib/schema/sudoku-solver-schema.ts](/Users/yuyu.salim/Projects/yuyu/sudoku-unlimited/lib/schema/sudoku-solver-schema.ts)`:
  - FAQ array targeting “solve this sudoku” search intent
  - `WebPage`, `FAQPage`, `HowTo`, breadcrumb, org/software schema composition consistent with current schema patterns
- Add schema script component at `[/Users/yuyu.salim/Projects/yuyu/sudoku-unlimited/components/schemas/sudoku-solver-schema-script.tsx](/Users/yuyu.salim/Projects/yuyu/sudoku-unlimited/components/schemas/sudoku-solver-schema-script.tsx)` and export it from `[/Users/yuyu.salim/Projects/yuyu/sudoku-unlimited/components/schemas/index.ts](/Users/yuyu.salim/Projects/yuyu/sudoku-unlimited/components/schemas/index.ts)`.
- Add a page FAQ/SEO content section component at `[/Users/yuyu.salim/Projects/yuyu/sudoku-unlimited/components/sudoku-solver-faq-section.tsx](/Users/yuyu.salim/Projects/yuyu/sudoku-unlimited/components/sudoku-solver-faq-section.tsx)` and include it in the new route.
- Add internal linking entry point for crawl/discovery:
  - add a link in key navigation/surface (likely `[/Users/yuyu.salim/Projects/yuyu/sudoku-unlimited/components/navbar.tsx](/Users/yuyu.salim/Projects/yuyu/sudoku-unlimited/components/navbar.tsx)`) to `/sudoku-solver`.

## Content/SEO Blocks on Page

- Hero copy optimized for intent: “Solve this Sudoku puzzle online instantly”.
- Instructional section: how to enter puzzle from newspaper/app screenshot manually.
- Trust/UX section: logic-based solving, no signup, works on mobile.
- FAQ section (6-10 questions) focused on user search phrasing:
  - “How do I solve this sudoku?”
  - “Can this solver check if my puzzle is invalid?”
  - “Why does my sudoku have no solution?”
  - “Can I use it for hard/expert puzzles?”
  - etc.

## Verification

- Type/lint check impacted files and fix any introduced issues.
- Validate metadata + schema presence in rendered page.
- Manual UX checks: invalid input, partial valid puzzle, solved output, clear/reset behavior.

## Notes

- Reuse existing board visual language where possible for consistency.
- Keep solver state isolated from the game/session storage logic used by `SudokuGame`.

'use client';

import { useState } from 'react';

import type { PrintableLevel } from '@/lib/printable/content';
import { buildPrintablePdf, downloadPdf } from '@/lib/printable/pdf';
import { createPrintableSheet, type PrintablePuzzle } from '@/lib/printable/sheet';

import { Button } from '@/components/ui/button';

import { NumberGrid } from './number-grid';

type PrintableSheetProps = {
  level: PrintableLevel;
  initialPuzzles: PrintablePuzzle[];
};

export function PrintableSheet({ level, initialPuzzles }: PrintableSheetProps) {
  const [puzzles, setPuzzles] = useState(initialPuzzles);
  const [busy, setBusy] = useState(false);

  function newPuzzles() {
    setBusy(true);
    window.setTimeout(() => {
      const seed = `${level.slug}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
      setPuzzles(createPrintableSheet(level.difficulty, seed));
      setBusy(false);
    }, 0);
  }

  function download() {
    const bytes = buildPrintablePdf({
      title: level.h1,
      pagePath: `sudokuunlimited.com/printable/${level.slug}`,
      puzzles,
    });
    downloadPdf(bytes, `${level.slug}-sudoku.pdf`);
  }

  return (
    <div>
      <div className="no-print mb-6 flex flex-wrap gap-3">
        <Button type="button" onClick={() => window.print()}>
          Print or save as PDF
        </Button>
        <Button type="button" variant="outline" onClick={download}>
          Download PDF
        </Button>
        <Button type="button" variant="outline" onClick={newPuzzles} disabled={busy}>
          {busy ? 'Building puzzles…' : 'New puzzles'}
        </Button>
      </div>

      <h2 className="font-heading text-2xl font-bold text-stone-900 dark:text-stone-50 print:text-black">
        Puzzles
      </h2>
      <p className="mt-2 text-stone-600 dark:text-stone-400 print:text-black">
        Fill every row, column, and 3×3 box with the digits 1–9 once. Blank cells are yours to write
        in.
      </p>
      <div className="printable-sheet-grid mt-6 grid gap-8 sm:grid-cols-2">
        {puzzles.map((puzzle, index) => (
          <NumberGrid
            key={`${index}-${puzzle.givens[0]?.join('')}`}
            grid={puzzle.givens}
            label={`Puzzle ${index + 1}`}
          />
        ))}
      </div>

      <section className="solutions-page mt-12" aria-labelledby="solutions-heading">
        <h2
          id="solutions-heading"
          className="font-heading text-2xl font-bold text-stone-900 dark:text-stone-50 print:text-black"
        >
          Solutions
        </h2>
        <p className="mt-2 text-stone-600 dark:text-stone-400 print:text-black">
          Each solution matches the puzzle with the same number. On paper, this section starts on
          its own page.
        </p>
        <div className="printable-sheet-grid mt-6 grid gap-8 sm:grid-cols-2">
          {puzzles.map((puzzle, index) => (
            <NumberGrid
              key={`solution-${index}-${puzzle.solution[0]?.join('')}`}
              grid={puzzle.solution}
              label={`Solution ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

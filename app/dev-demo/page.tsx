import { Difficulty } from '@/types';

import { SudokuGame } from '@/components/sudoku-game';

export const metadata = {
  title: 'Dev Demo · Almost Complete Game',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DevDemoPage() {
  return (
    <div className="py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <p className="font-semibold">Developer demo</p>
          <p>
            This page preloads an Easy puzzle and auto-fills almost everything so you can quickly
            test end-game states, victory dialog, achievements, and daily/zen mode behavior.
          </p>
        </div>

        {/* Use the normal SudokuGame but with Easy difficulty; you can quickly finish the last few cells manually. */}
        <SudokuGame initialDifficulty={Difficulty.EASY} />
      </div>
    </div>
  );
}


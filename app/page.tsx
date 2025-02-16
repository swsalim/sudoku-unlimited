import { Difficulty } from '@/types';

import { SudokuGame } from '@/components/sudoku-game';

export default function HomePage() {
  return (
    <div className="">
      <SudokuGame initialDifficulty={Difficulty.EASY} />

      <section className="prose mt-12 max-w-none bg-green-50/50">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h1>How to Play Sudoku</h1>

          <p>
            Sudoku is a popular number puzzle that challenges your logical thinking. The game
            consists of a <strong>9x9 grid</strong> divided into nine smaller{' '}
            <strong>3x3 boxes</strong>. The goal is simple: fill the grid so that every row, column,
            and 3x3 box contains the numbers <strong>1 to 9</strong> without repeating any number.
          </p>

          <h2>Understanding the Sudoku Grid</h2>
          <ul>
            <li>
              The grid has <strong>81 cells</strong>, arranged in 9 rows and 9 columns.
            </li>
            <li>Each row, column, and 3x3 box must contain the numbers 1 to 9 exactly once.</li>
            <li>Some numbers are already provided as clues—your job is to fill in the rest.</li>
          </ul>

          <h2>Basic Rules of Sudoku</h2>
          <p>To solve a Sudoku puzzle, follow these simple rules:</p>
          <ol>
            <li>
              Each <strong>row</strong> must contain the numbers 1 to 9, with no duplicates.
            </li>
            <li>
              Each <strong>column</strong> must also contain 1 to 9, with no repetitions.
            </li>
            <li>
              Each <strong>3x3 box</strong> (subgrid) must have all numbers from 1 to 9 exactly
              once.
            </li>
            <li>You can only use logic—no guessing!</li>
          </ol>

          <h2>Strategies to Solve Sudoku</h2>

          <h3>1. Start with Easy Numbers</h3>
          <p>
            Look for numbers that appear frequently in the grid. If a number is already placed in
            two or more sections, it might be easier to determine where it should go next.
          </p>

          <h3>2. Use the Elimination Method</h3>
          <p>
            Check each row, column, and box to see which numbers are missing. If a number is already
            present in a row or column, it can’t go in that section again.
          </p>

          <h3>3. Try the Pencil Mark Technique</h3>
          <p>
            Write down possible numbers in empty cells as small notes. This helps track
            possibilities without committing to a number too soon.
          </p>

          <h3>4. Look for Single Possibilities</h3>
          <p>
            Sometimes, only one number can fit in a specific cell. Identifying these easy placements
            early will make solving the puzzle much faster.
          </p>

          <h3>5. Stay Patient and Logical</h3>
          <p>
            Sudoku is a game of logic, not guessing. If you&rsquo;re stuck, take a step back,
            double-check your work, and look for new patterns.
          </p>

          <h2>Ready to Play?</h2>
          <p>
            Now that you know the basics, start with an easy Sudoku puzzle and gradually challenge
            yourself with harder levels. Have fun solving!
          </p>
        </div>
      </section>
      {/*
      <AlertDialog open={showGameOver}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Game Over</AlertDialogTitle>
            <AlertDialogDescription>
              You&rsquo;ve reached the maximum number of mistakes. Would you like to start a new
              game?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => startNewGame(gameState.difficulty as Difficulty)}>
              New Game
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </div>
  );
}

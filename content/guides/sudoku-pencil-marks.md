---
slug: "sudoku-pencil-marks"
page_type: "blog"
title: "How to Use Sudoku Pencil Marks as a Beginner"
meta_title: "Sudoku Pencil Marks for Beginners"
meta_description: "Learn a clean method for writing Sudoku candidate notes, spotting singles, updating related cells, and using pencil marks without guesswork on every puzzle."
primary_keyword: "sudoku pencil marks for beginners"
secondary_keywords: []
word_count: 1080
status: "published"
brief: "sudoku-pencil-marks"
---

Sudoku pencil marks for beginners turn a crowded grid into a set of manageable questions. A pencil mark is a small number written inside an empty cell to record a value that could legally fit there. Used properly, notes help you track changing possibilities without committing to a guess.

The method is simple: calculate candidates, place a confirmed number, erase affected candidates, then scan again. The notes are temporary records, so they must change whenever the grid changes. The row, column, and box rules that define a legal candidate are in [what are the rules of Sudoku](/guides/what-are-the-rules-of-sudoku); [the complete guide to how Sudoku works](/guides/the-complete-guide-to-how-sudoku-works) shows how notes fit into a full solving loop.

## Set up pencil marks before you place a number

A standard Sudoku grid has nine rows, nine columns, and nine 3x3 boxes. Every number from 1 through 9 must appear once in each unit. Before writing a note, check all three units that touch the empty cell.

Start with an empty cell surrounded by several given numbers. You don’t need to fill every blank square at once. The [Sudoku.com guide to notes](https://sudoku.com/sudoku-rules/notes-in-sudoku/) recommends recording possible options when an obvious move isn’t available, while SudokuIQ describes candidates as small reminders rather than guesses.

For example, if a cell’s row already contains 1, 4, and 8, its column contains 2 and 7, and its box contains 3 and 9, those seven values are excluded. The cell can contain only 5 or 6.

A candidate is legal only after the cell passes the row, column, and 3x3 box check.

## Fill a cell with every legal candidate

Use the same routine every time. Consistency prevents the small errors that make later deductions unreliable.

1. Write the numbers 1 through 9 as your starting list.
2. Cross out values already present in the cell’s row.
3. Cross out values already present in its column.
4. Cross out values already present in its 3x3 box.
5. Write the numbers left in the cell as small Sudoku candidate notes.

In the example above, the exclusions leave 5 and 6, so the cell receives a small 5 and 6. Neither number is a decision. Both are possible numbers in Sudoku until another deduction removes one.

Keep marks small and place them consistently, such as 1 to 3 across the top, 4 to 6 in the middle, and 7 to 9 across the bottom. This makes a grid easier to scan. [Conceptis Puzzles’ Sudoku tips](https://www.conceptispuzzles.com/index.aspx?uri=puzzle%2Fsudoku%2Ftips) also recommends small pencil marks and checking a move before placing it.

## Use pencil marks to find a cell with one possible number

A cell with exactly one remaining candidate is called a **[naked single](/guides/naked-singles)**. It gives you a confirmed placement because every other number has been ruled out by Sudoku’s constraints. The technique appears among the basic scanning methods described by [Conceptis Puzzles’ Sudoku techniques guide](https://www.conceptispuzzles.com/index.aspx?uri=puzzle%2Fsudoku%2Ftechniques).

Suppose a cell starts with candidates 2, 5, and 9. Later, a 2 is placed in its row and a 9 appears in its 3x3 box. Remove both notes. The cell now contains only 5, so place 5 as a solved number.

Then scan the newly placed 5’s row, column, and box. Remove 5 from every related pencil mark. A number that merely looks likely stays a note; a number with one legal candidate becomes a placement.

A naked single is confirmed by elimination, not by intuition or by the number that seems most likely.

## Update every related note after each solved number

Stale notes create false deductions. If you place 6 but leave 6 written in another cell in the same row, column, or box, your grid now records an impossible option.

Use a fixed three-part update after every placement:

1. Scan the solved number’s row and erase matching candidates.
2. Scan its column and erase matching candidates.
3. Scan its 3x3 box and erase matching candidates.

Erase impossible candidates immediately rather than waiting until the end of a pass. One clean update can turn a three-number note into a naked single. Sudoku.com and SudokuIQ both connect accurate notes with later eliminations, and Conceptis advises checking all three Sudoku units before making a move.

Before writing a permanent number, verify it against the row, column, and box again. A wrong placement spreads false eliminations through every related note.

## Read pairs without guessing

Once your notes are accurate, you can use a **[naked pair](/guides/naked-pairs)**. This occurs when two cells in the same row, column, or box contain the same two candidates, such as 3 and 7.

Imagine two cells in one row marked 3/7. A third cell in that row is marked 3/7/8. The pair must take 3 and 7 in some order, so the third cell cannot use either value. Erase 3 and 7 there, leaving 8.

That deduction makes 8 a naked single in the third cell. The pair doesn’t tell you which of the first two cells gets 3 or 7; it only reserves those two values inside the unit. Learn [naked singles](/guides/naked-singles) first, then add pairs once you trust your note-taking. When a digit has only one legal home in a unit but the cell still shows other marks, that is a [hidden single](/guides/hidden-singles). The [SudokuIQ candidate-notes guide](https://sudokuiq.com/academy/candidate-notes) uses the same candidate-based approach, while Conceptis lists naked pairs among its Sudoku techniques.

## Avoid the pencil-mark habits that create false deductions

Most beginner errors come from treating notes as permanent or skipping one of the three checks. Use this checklist:

- Don’t write a guess as though it were a solved number.
- Don’t forget the 3x3 box while checking a row and column.
- Don’t leave old candidates after placing a number.
- Don’t mix mark sizes or positions until the grid becomes hard to read.

Filling every candidate in the entire grid can also create unnecessary work. Start with cells near several given numbers, scan for singles, and let each confirmed placement create the next question.

### When not to use a full grid of pencil marks

Skip full-grid marking when an Easy puzzle already offers several direct singles, when your marks are too small to read, or when you haven’t yet checked each candidate against all three units. Focused notes are often cleaner for beginners.

Good pencil marks record the grid as it is now; they never predict what the grid will become.

Practice the full loop on an Easy puzzle at SudokuUnlimited.com: choose one empty cell, calculate its candidates, place only confirmed singles, erase related candidates, and scan row, column, then box again.

## References

- [Benefits of using Notes in Sudoku game](https://sudoku.com/sudoku-rules/notes-in-sudoku/)
- [Sudoku tips](https://www.conceptispuzzles.com/index.aspx?uri=puzzle%2Fsudoku%2Ftips)
- [Sudoku techniques](https://www.conceptispuzzles.com/index.aspx?uri=puzzle%2Fsudoku%2Ftechniques)
- [Sudoku Beginner Guide](https://www.sudokuaday.com/downloads/resources/sudoku-beginner-guide.pdf)
- [Sudoku Candidate Notes and Pencil Marks](https://sudokuiq.com/academy/candidate-notes)

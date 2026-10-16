---
slug: "x-wing"
page_type: "blog"
title: "X-Wing"
meta_title: "X-Wing Sudoku Technique"
meta_description: "An X-Wing locks one Sudoku digit to two columns in two rows, or two rows in two columns. See the rectangle rule, a worked example, and the mistakes that break it."
primary_keyword: "x-wing sudoku"
secondary_keywords: ["x wing", "sudoku fish"]
word_count: 1115
status: "published"
brief: "x-wing"
---

An X-Wing is a rectangle that locks one digit. Two rows each contain that digit in exactly two columns, and the columns match. The two rows must occupy both columns, one each. Every other cell in the two columns loses the digit. Swap “row” and “column” and the same pattern runs the other way.

X-Wing is the smallest fish. It does not place a digit. Learn it after [pointing pairs](/guides/pointing-pairs) and [box-line reduction](/guides/box-line-reduction), which are one-box versions of a similar lock. Larger fish are in [9 advanced Sudoku techniques](/guides/9-advanced-sudoku-techniques-that-experienced-solvers-use). The point where X-Wing enters a solve is in [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing).

## What an X-Wing is

Pick one digit and ignore the others. You need two rows, each with the digit in exactly two cells, and those cells in the same two columns. Delete the digit from those two columns outside the two rows. The four cells are the corners of a rectangle. The logic uses the rows and the columns, not the diagonals that give the pattern its name.

A column-based X-Wing uses two columns that each contain the digit twice, in the same two rows, and deletes the digit from those rows outside the two columns. You do not delete from both orientations unless both readings are true, in which case there is often nothing left outside the corners.

Extra candidates in a corner do not matter. {2, 7} can be a corner of an X-Wing on 7. What matters is that 7 is absent from the other cells of each base row.

## When it applies

Search when singles, pairs, triples, and locked candidates have stopped, and one digit still has tidy bilocal rows. That is typical of [hard](/hard) and [expert](/expert) puzzles. A rectangle of busy cells with different digits in the corners is not an X-Wing. If either base row has a third home, the basic pattern is not there. A third home can be a fin; finned fish are a different rule in the advanced guide. Do not apply basic X-Wing logic to that shape.

## How to spot it

Choose a digit, such as 7. For each row that does not contain a placed 7, count candidate cells. You care about rows whose count is exactly two. When you find one, look for a second row whose two 7s share those columns. Mark the four corners and clear 7 from every other cell in the two columns. Check all remaining rows, not only the cell that caught your eye. Then stop. Do not clear 7 from the base rows outside the corners; those cells should not list 7.

If the row pass finds nothing, count down columns. After the clear, look for a new [naked single](/guides/naked-singles) in the target cells before you hunt a second fish.

## Worked example

Candidate 7 has exactly two homes in row 2, r2c3 and r2c8, and exactly two homes in row 6, r6c3 and r6c8. This is a row-based X-Wing on 7 covering columns 3 and 8.

r4c3 lists {2, 7} and loses 7, leaving {2}. r9c8 lists {2, 7} and loses 7, leaving {2}. r4c5 also lists 7, and it keeps that 7, because column 5 is not a cover column.

```grid
caption: X-Wing on 7. Rows 2 and 6 use only columns 3 and 8. Those columns lose 7 elsewhere.
highlight: r2c3 r2c8 r6c3 r6c8
eliminate: r4c3 r9c8
r2: 1 2 {4,7} 5 6 8 9 {4,7} 3
r4: 4 5 {2,7} 1 {2,7} 3 8 6 9
r6: 2 1 {5,7} 6 8 9 3 {5,7} 4
r9: 8 9 6 3 4 1 5 {2,7} {2,7}
```

Both base rows are fully noted, so the count of two is the whole row. The corners also contain 4 or 5. That does not spoil the fish. If a corner had been a naked single 7, you would have placed it earlier and the rectangle would already be gone.

## Why the columns lose 7

Row 2’s 7 is in column 3 or column 8. Row 6’s 7 is in column 3 or column 8. They cannot choose the same column. So one row takes column 3 and the other takes column 8. Any 7 in column 3 outside these rows contradicts both possible orders, and one of those orders is the true grid. The same sentence explains column 8.

A third 7 in row 2 breaks the proof. Row 2 could take that third column and leave column 3 free. Basic X-Wing refuses that shape.

## Common mistakes

Two rows with two 7s each, in columns 3 and 8 versus columns 3 and 7, do not match. One shared column is not a fish. Deleting 7 from the base rows, or from whole boxes beyond the cover columns, goes past the pattern. A box deletion is legal only for cells that also sit in column 3 or 8, outside the base rows.

Do not remove the companion digits. The 2 and 5 in the corners are not part of the fish. A third candidate in a base row is not a basic X-Wing either. Leave finned shapes for the advanced guide. And flip the search to columns when the row scan is empty. A column-based rectangle never announces itself if you only read left to right.

Place any single the deletion created, then see whether the same digit now has a pointing pair. Do not jump straight to a [Swordfish](/guides/swordfish). Most grids that seem to need one still contain an X-Wing or a locked candidate. [XY-Wing](/guides/xy-wing) is a different family, on three digits. Finish the digit you started.

## Frequently asked questions

### Do all four corners have to contain the digit?

Yes. Each base row has exactly two homes, in the same two columns, so all four intersections are filled. A [Swordfish](/guides/swordfish) is allowed to miss intersections. A basic X-Wing is not.

### Can I remove the digit from the rows and the columns?

Remove it from the cover units outside the base units. In a row-based X-Wing you edit the two columns. The base rows should already lack the digit outside the corners.

### What if one corner is only that digit?

Place it before you call the pattern an X-Wing. That column is solved, and the other base row loses the digit by ordinary column logic. The fish is what remains when all four corners are still candidates.

## Related techniques

[Swordfish](/guides/swordfish) extends this page from two lines to three. [Pointing pairs](/guides/pointing-pairs) are the one-box lock to exhaust first. [XY-Wing](/guides/xy-wing) is the next named chain once a single digit is no longer the obstruction. The larger fish family is in [9 advanced Sudoku techniques](/guides/9-advanced-sudoku-techniques-that-experienced-solvers-use).

---
slug: "naked-singles"
page_type: "blog"
title: "Naked Singles"
meta_title: "Naked Singles in Sudoku"
meta_description: "A naked single is a Sudoku cell with one candidate left. Learn when to place it, how to spot it, and the mistakes that turn a single into a wrong digit."
primary_keyword: "naked singles sudoku"
secondary_keywords: ["naked single", "sudoku singles"]
word_count: 952
status: "published"
brief: "naked-singles"
---

A naked single is an empty cell with one candidate left. Place that digit. The name means the digit is visible on its own, not buried in a longer note list. Every harder technique on this site exists to create naked singles or [hidden singles](/guides/hidden-singles). If you can see one, place it before you hunt a pair or a fish. The order is in [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing).

## What a naked single is

Candidates are the digits not yet ruled out of a cell. A naked single is a list of length one, such as {4}, while the cell is still empty on the main grid. The row may have knocked out some digits and the column and box the rest. The cause does not change the placement.

If you can still name a second digit that appears in none of the cell’s row, column, or box, the cell is not a single. Put that digit back and keep scanning.

## When it applies

Use it whenever any empty cell has exactly one candidate, including at the start of an [easy](/easy) puzzle and again after every later deletion on a [medium](/medium) grid. The rest of the unit does not have to be full. A row can have four empty cells and still hold a naked single in one of them.

A cell that is both the last home of a digit and a one-candidate cell is a naked single and a hidden single at once. Place it once.

## How to spot it

Scan by cell before notes exist. For each empty cell, list digits absent from its row, column, and box together. One digit means the cell is a naked single.

Scan by notes once you are writing them. Look for a cell whose note list shows one digit. After you place it, delete that digit from the other cells in the same row, column, and box. Those deletions create the next single. A single you place and then fail to propagate is how a later “single” repeats a digit.

## Worked example

Column 4 already contains 1, 2, 3, 5, 6, 7, 8, and 9. Row 4 contains every digit except 4. The only empty cell in that row is r4c4, and its list is {4}.

```grid
caption: Naked single in r4c4. The row and the column leave only 4.
highlight: r4c4
r1: . . . 1 . . . . .
r2: . . . 2 . . . . .
r3: . . . 3 . . . . .
r4: 5 6 7 {4} 8 9 1 2 3
r5: . . . 5 . . . . .
r6: . . . 6 . . . . .
r7: . . . 7 . . . . .
r8: . . . 8 . . . . .
r9: . . . 9 . . . . .
```

Place 4 in r4c4. Row 4 is complete. Clear 4 from any notes in the rest of column 4 and in box 5 (rows 4–6, columns 4–6).

The same placement happens among other empty cells. If r2c2 is {4} while r2c5 is still {4, 7}, place 4 only in r2c2, then strike 4 from r2c5. Do not place 4 in every cell that mentions it.

## Why the placement is forced

A cell must take a digit from 1 to 9 that is not already in its three units. Eight blocked digits leave the ninth. You do not need a second cell to agree, and you do not place 4 “unless a pair nearby needs something else.” If a pattern you like wants a different digit there, the pattern is misread or the candidate list is short a digit.

## Common mistakes

A missing candidate is the usual error. You deleted 7 because it felt crowded, the cell looked like {4}, and you placed 4 on top of a legal 7. Before you commit, confirm that every absent digit really sits in the row, the column, or the box.

Do not treat a hidden single as naked. A [hidden single](/guides/hidden-singles) can sit in a cell that still shows three candidates. You place it because the unit has one home, then you clear the other notes. Ignoring notes you dislike is how a crowded cell gets falsely “solved.”

Skipping cleanup is the third miss. Leaving the digit in neighboring notes invents a fake pair on the next pass. Two naked singles for the same digit in one unit are not a pattern either. They mean an earlier step was wrong.

## Frequently asked questions

### Is a naked single just the last empty cell in a row?

The last empty cell in a row is always a naked single. A naked single can also appear earlier, while other cells in the row are empty, as long as one cell’s own list has collapsed to one digit.

### Should the single stay written as a tiny note?

Write it as the answer. A one-candidate note is a solved cell you have not committed. Later scans will treat it as unfinished.

### What if the only candidate breaks the grid later?

The list was incomplete, or an earlier placement was wrong. A true naked single cannot be the step that makes a legal puzzle impossible. Rebuild the notes in that cell’s three units from the last placement you can prove.

## Related techniques

Read [hidden singles](/guides/hidden-singles) when a digit has one home inside a longer list. Read [naked pairs](/guides/naked-pairs) when every remaining cell has at least two candidates. Both sit in [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing). The rules under the single are in [how Sudoku works](/guides/the-complete-guide-to-how-sudoku-works).

---
slug: "hidden-singles"
page_type: "blog"
title: "Hidden Singles"
meta_title: "Hidden Singles in Sudoku"
meta_description: "A hidden single is a digit with one cell left in a row, column, or box. See a worked example, how to spot it among longer notes, and the mistakes to avoid."
primary_keyword: "hidden singles sudoku"
secondary_keywords: ["hidden single", "sudoku hidden single"]
word_count: 886
status: "published"
brief: "hidden-singles"
---

A hidden single is a digit with only one legal cell left in a row, a column, or a box. That cell may still list other candidates. The digit is hidden among them, so a scan that only looks for one-candidate cells will miss it. Place the digit, then delete every other candidate from that cell.

Hidden singles and [naked singles](/guides/naked-singles) are the two placements in [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing). Harder techniques only create one of those two events.

## What a hidden single is

Pick one unit and one digit. Cross out filled cells and every empty cell that can see a placed copy of the digit in another unit. One cell left means that cell is the hidden single.

“Can see” means a placed digit, not a pencil mark. A candidate 4 does not block a cell. A placed 4 does. The cell you find may read {4, 8}. If no other cell in the row can take 4, the cell is 4 and 8 is deleted. You do not keep 8 “just in case.”

## When it applies

Look as soon as a unit has several empty cells. Hidden singles are constant on [easy](/easy) and [medium](/medium) puzzles, and they are what a [pointing pair](/guides/pointing-pairs) is supposed to create on a harder grid. Check boxes, not only rows. Solvers who skip the box pass leave singles in plain sight.

You do not need a full note grid for the obvious cases. The technique earns its name when two or more cells are empty and only one of them allows the digit.

## How to spot it

Scan by digit. Choose 1, find every placed 1, and inspect only the units that still lack it. Count empty cells that are not aligned with a placed 1. One cell means you place it. Two cells may be a pointing pair or, later, part of an [X-Wing](/guides/x-wing). Three or more means you move on.

With notes already written, count the cells in one row that contain a written 4. One such cell means 4 is hidden there, even if that cell also shows 2, 8, and 9. Confirm the note is not stale: a written 4 that sees a placed 4 is a bookkeeping error.

Name the unit when you place it: “4 is a hidden single in row 1, so r1c7 is 4.”

## Worked example

Row 1 still needs several digits. r1c7 lists 4 and 8. No other cell in the row lists 4. Filled cells hold 3, 5, 6, 1, and 7. The other empty cells list combinations of 2, 8, and 9.

```grid
caption: Hidden single. Candidate 4 occurs only in r1c7, so that cell is 4 and loses 8.
highlight: r1c7
r1: {2,8} {2,9} 3 {8,9} 5 6 {4,8} 1 7
```

Place 4 and delete 8 from r1c7. Then delete 4 from the rest of column 7 and from box 3 (rows 1–3, columns 7–9) if those notes exist. Do not strip 8 from r1c1 or r1c4. The hidden single places one digit in one cell.

## Why it is forced

A unit must contain each digit once. A digit ruled out of eight cells owns the ninth. The other candidates in that cell lose. The proof uses one unit. Earlier eliminations from the column and the box are what left a single home; if those notes are wrong, the single is wrong. One honest unit is enough to place the digit. You do not need it to be a single in all three units first.

## Common mistakes

Counting a blank that already sees the digit is the standard miss. Two blanks in a box for 6, one of them in a column that already has 6, means the other blank is the single. Draw the placed 6 through the box before you count.

Placing the digit and leaving the cell’s other notes creates a fake pair that uses the leftover. Clear the cell.

“4 fits here” is not a hidden single. “4 fits here and the other eight positions are checked” is. On a tired pass the missed home is usually in the box. If two digits are each limited to the same two cells, you have a [hidden pair](/guides/hidden-pairs), not a placement.

## Frequently asked questions

### Can a hidden single sit in a cell with four candidates?

Yes. “Hidden” means the digit is one of several notes, while the unit has no second home. Every extra note leaves when you place the digit.

### Do I have to prove it in the row, the column, and the box?

No. One unit with a single home is enough. Checking a second unit is a way to catch a bad note, not a second requirement.

### Why did the single contradict the box?

A counted home already saw a placed copy, or a previous digit was wrong. The hidden-single rule does not override the box. A cell that sees a placed 4 was never a real home.

## Related techniques

[Naked singles](/guides/naked-singles) are the same placement seen from the cell instead of the digit. [Pointing pairs](/guides/pointing-pairs) are what two homes often become when they share a line inside a box. [Box-line reduction](/guides/box-line-reduction) starts from the line instead. Keep both singles in [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing).

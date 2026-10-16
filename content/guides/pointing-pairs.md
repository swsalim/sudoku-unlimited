---
slug: "pointing-pairs"
page_type: "blog"
title: "Pointing Pairs"
meta_title: "Pointing Pairs and Pointing Triples"
meta_description: "A pointing pair locks a Sudoku candidate to one row or column inside a box. Learn the elimination, how to spot it, a worked example, and common mistakes."
primary_keyword: "pointing pairs sudoku"
secondary_keywords: ["pointing pair", "pointing triple", "locked candidates"]
word_count: 1010
status: "published"
brief: "pointing-pairs"
---

A pointing pair locks one candidate inside a box to a single row or column. The box must place that digit on that line, so the rest of the line, outside the box, loses the candidate. A pointing triple is the same lock with three cells. Neither pattern places the digit. It only deletes.

This is one direction of locked candidates. The other direction is [box-line reduction](/guides/box-line-reduction). Both follow pairs in [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing).

## What a pointing pair is

In one box, list every cell where a digit is still a candidate. If those cells — two or three of them — all lie in the same row, or all in the same column, the digit points along that line. A third home in a different row of the same box destroys the pattern.

The elimination is outside the box, along the line. A pointing pair of 6s in row 1 of box 1 deletes 6 from row 1 in the other boxes. It does not delete 6 inside the box. Those other box cells do not contain 6, which is the lock you just used. It also does not delete 6 from the pointing cells themselves.

Solvers also call this locked candidates, type 1.

## When it applies

Use it when a digit has two or three homes in a box and you can see them without a full-grid search. That is a normal [medium](/medium) and [hard](/hard) step, and it comes before an [X-Wing](/guides/x-wing). An X-Wing is a similar lock spread over two boxes. A single box is easier to prove.

One home is not pointing. It is a [hidden single](/guides/hidden-singles), and you place the digit. Two homes of one digit are not a [hidden pair](/guides/hidden-pairs) either. A hidden pair needs a second digit confined to those same cells.

## How to spot it

Work box by box and digit by digit. Ignore boxes that already contain the digit. List empty cells that do not see a placed copy outside the box. One cell is a hidden single. Two or three cells on one row, or on one column, point: delete the digit from that line outside the box. Cells on two different rows and two different columns do not point.

Do not mix this with claiming. Pointing starts inside the box and deletes along the line outside. [Box-line reduction](/guides/box-line-reduction) starts on the line and deletes inside the box, off the line. After a pointing deletion, look for a naked single in the cells you edited.

## Worked example

Box 1 is rows 1–3 and columns 1–3. Candidate 6 appears there only in r1c1 and r1c2. The other cells of the box are filled with 2, 4, 5, 7, 3, 1, and 8. Both 6s sit in row 1.

Row 1 also carries 6 in r1c6 and r1c8, outside the box. Those cells lose 6. r1c6 becomes {1, 7}. r1c8 becomes {7}, a naked single for the next pass. r1c9 never contained 6.

```grid
caption: Pointing pair of 6s in box 1, row 1. Delete 6 from r1c6 and r1c8.
highlight: r1c1 r1c2
eliminate: r1c6 r1c8
r1: {6,8} {6,9} 2 3 4 {1,6,7} 5 {6,7} {1,8,9}
r2: 4 5 7 . . . . . .
r3: 3 1 8 . . . . . .
```

The dot cells are outside columns 1–3. The lock is fully drawn: box 1 has no 6 off row 1. The pattern does not decide whether r1c1 or r1c2 is the 6, and it does not remove 8 or 9 from those cells.

## Why the outside cells lose the digit

Box 1 must contain a 6, and the only remaining addresses are both in row 1. Row 1’s 6 inside this box is guaranteed. A second 6 in row 1 would repeat the digit once the box takes its copy. Those outside candidates are impossible now, even though you have not chosen which pointing cell survives. If one pointing cell is later solved as something else, the other becomes the 6 by ordinary singles logic.

## Common mistakes

Deleting inside the box means you missed a third home, and there is no pointing pair. Deleting down a column when the two cells are side by side is the same kind of miss: r1c1 and r1c2 share a row, not a column. A 6 elsewhere in column 1 can stay.

A third 6 written small in the corner of the box cancels the pattern. Count homes before you erase anything on the line. Two pointing pairs in two boxes can become an X-Wing, but only when the lines actually match. Until then, clean each box locally. And do not place the digit just because one of the two cells looks tighter. Two candidates are not a single.

Three homes on the same line inside the box are a pointing triple. A box is only three cells wide, so the whole line-segment of the box is the digit’s region. The elimination outside the box is the same.

## Frequently asked questions

### Does a pointing pair have to be exactly two cells?

Two cells are the usual picture. Three cells on the same line are a pointing triple and give the same deletion outside the box. One cell is a hidden single: place the digit.

### Do I erase the pointing candidates after I use them?

No. Erase the digit from the outside cells on that line. Keep it on the pointing cells until something else removes it.

### How is this different from box-line reduction?

Pointing starts in the box. All of the box’s homes lie on one line, so you clear that line outside the box. Box-line reduction starts on the line. All of the line’s homes lie in one box, so you clear the rest of the box.

## Related techniques

Read [box-line reduction](/guides/box-line-reduction) next so the two directions stay distinct. [Hidden singles](/guides/hidden-singles) are the one-home case. When two boxes point in a matching rectangle, study [X-Wing](/guides/x-wing). The checklist is [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing).

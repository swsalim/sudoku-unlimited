---
slug: "naked-pairs"
page_type: "blog"
title: "Naked Pairs"
meta_title: "Naked Pairs in Sudoku"
meta_description: "A naked pair is two cells in one unit that share the same two candidates. Learn the elimination, a worked row example, how to spot pairs, and common mistakes."
primary_keyword: "naked pairs sudoku"
secondary_keywords: ["naked pair", "sudoku pairs"]
word_count: 887
status: "published"
brief: "naked-pairs"
---

A naked pair locks two digits into two cells. You still do not know which cell gets which digit. You do know that every other cell in the same unit can drop both digits. That deletion is the technique. The placement comes later, usually as a [naked single](/guides/naked-singles) created by the cleanup.

Pairs are the first subset to learn after singles. [Medium](/medium) and [hard](/hard) puzzles stall if you only place obvious digits. The routine around them is [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing).

## What a naked pair is

Two cells in the same row, column, or box each contain exactly the same two digits and nothing else. Those cells are a naked pair. If the digits are 2 and 9, the cells will be 2 and 9 in some order. No third cell in that unit can be 2 or 9. Delete 2 and 9 from the other cells in the unit only.

The pair is naked because the two-digit lists are already visible. If either cell still has a third candidate, you do not have a naked pair. You may have a [hidden pair](/guides/hidden-pairs), which deletes in the opposite direction.

## When it applies

Look after naked singles and hidden singles have dried up in the unit you are scanning. A pair is the wrong job while a one-candidate cell is still unplaced. Pairs apply in rows, columns, and boxes. When the same two cells share a row and a box, delete the digits from both units. Do not delete them from the rest of the grid. A 2 in a different row is still possible.

## How to spot it

Read two-candidate lists as signatures. In one row, ignore filled cells and any cell with three or more candidates. If one signature appears on exactly two cells, strike both digits from every other cell in that row. Repeat for columns, then boxes.

{2, 9} and {2, 8} are not a pair. {2, 9} and {2, 9, 5} are not a naked pair either: the second cell can still be 5, so 2 and 9 are not reserved. After the strike, reread the cells you edited. One of them often has a single candidate left.

## Worked example

In row 3, r3c2 and r3c7 are each {2, 9}. They share the row and not a box, so the elimination stays in row 3. r3c4 lists {2, 5, 9} and becomes {5}. r3c8 lists {3, 5, 9} and becomes {3, 5}.

```grid
caption: Naked pair {2, 9} at r3c2 and r3c7. The rose cells lose 2 and 9.
highlight: r3c2 r3c7
eliminate: r3c4 r3c8
r3: 1 {2,9} 4 {2,5,9} 6 7 {2,9} {3,5,9} 8
```

Place the new naked single: r3c4 is 5. Clearing 5 from the rest of the row then leaves {3} in r3c8. That second placement is the ordinary single scan after a deletion, not part of the pair. You still do not know whether r3c2 is 2 or 9. Leave both notes. Guessing the order is how a correct pair becomes a wrong grid.

## Why the deletion is forced

Call the cells A and B and the digits X and Y. If A is X, B is Y. If A is Y, B is X. Both legal fillings already put X and Y in the unit. A third cell set to X or Y would repeat a digit. No step chooses the filling. Both notes stay on both cells, and both notes leave every other cell in the shared unit.

## Common mistakes

Deleting the pair digits from the two cells, instead of from the others, empties the homes and throws the lock away. Two matching lists on opposite corners of the grid are not a pair unless you can name the row, column, or box that contains both.

Three cells that all read {2, 9} are not a pair and not a [naked triple](/guides/naked-triples). Three cells cannot hold two digits. That is a bad note or an earlier mistake. If the two cells also share a box, clean the box as well as the line. And if one cell is missing a legal third candidate, the lists only look matched. Restore it and let the pattern go.

## Frequently asked questions

### Does a naked pair tell me which cell is which digit?

No. The two digits occupy those two cells in unknown order. Cells outside the pair, inside the shared unit, lose both digits. The order is a later deduction.

### Can the two cells be diagonal inside a box?

Yes. Diagonal cells in one box share the box, so they are a box pair. They do not share a line, so you clear the other cells of the box and not a whole row.

### Is {2, 9} next to {2, 9, 4} close enough?

No. The second cell can be 4, so 2 and 9 are not reserved. A [hidden pair](/guides/hidden-pairs) is a different test: it asks where the digits can go, not whether the cells are already naked.

## Related techniques

[Hidden pairs](/guides/hidden-pairs) lock two digits into two busier cells and delete the extras. [Naked triples](/guides/naked-triples) use three cells and three digits. [XY-Wing](/guides/xy-wing) can use bivalue cells after the pair’s own deletions are done. All of them follow singles in [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing).

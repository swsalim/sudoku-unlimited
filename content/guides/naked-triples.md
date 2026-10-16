---
slug: "naked-triples"
page_type: "blog"
title: "Naked Triples"
meta_title: "Naked Triples in Sudoku"
meta_description: "A naked triple is three cells in one unit whose candidates use only three digits. See the patterns that qualify, a worked example, and the mistakes that do not."
primary_keyword: "naked triples sudoku"
secondary_keywords: ["naked triple", "sudoku triples"]
word_count: 1010
status: "published"
brief: "naked-triples"
---

A naked triple reserves three digits for three cells in one unit. Delete those three digits from every other cell in the unit. You do not learn the order inside the triple. As with a [naked pair](/guides/naked-pairs), the lock is the technique, and the next placement is usually a single the lock creates.

The three cells rarely show the same three-digit list. The everyday shape is three shorter lists whose combined digits are three. Waiting to see {1, 4, 8} written three times means you will almost never find a triple. Triples sit after pairs in [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing).

## What a naked triple is

Three cells lie in one row, one column, or one box. Every candidate in those cells belongs to a set of three digits. Each cell has two or three candidates, not one: a one-candidate cell is a [naked single](/guides/naked-singles) and should already be placed. Together the cells use all three digits. If they used only two, two digits would be asked to fill three cells, which is impossible.

All of these qualify in one unit:

- {1, 4, 8}, {1, 4, 8}, {1, 4, 8}
- {1, 4, 8}, {1, 4}, {4, 8}
- {1, 4}, {1, 8}, {4, 8}

The last line is the one solvers reject by mistake. No cell contains all three digits. The union is still {1, 4, 8}, and there are three cells. That is a naked triple. Delete 1, 4, and 8 from the other cells in the unit. Do not delete them from the triple cells.

## When it applies

Search only after singles and naked pairs in that unit are done. A pair is smaller and often removes the extra cell before you finish drawing a triple. Triples show up on [medium](/medium) puzzles and become regular on [hard](/hard) ones, including bent sets inside a box. The cells need not form a neat line. They need to share one unit.

## How to spot it

Start from a bivalue cell, say {1, 4}. In the same unit, test a third digit X taken from a neighbor. If another cell is {1, 8}, try X = 8 and look for a third cell that uses only 1, 4, and 8. Stop at exactly three cells with nothing outside those digits. Confirm the union really contains three digits. Three copies of {1, 4} are not a legal triple.

Reject the set if a fourth cell is also confined to the same three digits. Four cells cannot hold three digits. Either the set is too big or a note is corrupt.

## Worked example

Row 6 has a naked triple on {1, 4, 8}: r6c1 is {1, 4}, r6c3 is {1, 8}, and r6c5 is {4, 8}. r6c7 is {1, 6}. It is not in the triple, because of the 6, but it still contains 1.

```grid
caption: Naked triple {1, 4, 8} in r6c1, r6c3, and r6c5. r6c7 loses 1.
highlight: r6c1 r6c3 r6c5
eliminate: r6c7
r6: {1,4} 2 {1,8} 3 {4,8} 5 {1,6} 7 9
```

Delete 1 from r6c7. The cell becomes {6}, a naked single. Place 6 and clear it from column 7 and from that cell’s box. The triple cells do not change. If r6c3 had been {1, 8, 9}, the union would have been four digits and this would not be a triple.

## Why the short lists still lock the digits

Try to avoid using 8. Then r6c3 must be 1 and r6c5 must be 4, so r6c1 has neither candidate left. Avoiding 1 or avoiding 4 fails the same way. Every legal filling uses all three digits inside the three cells, so the rest of the row cannot use them. You do not test the six permutations on the grid. The subset count is the proof. A cell that already shows {1, 4, 8} does not change the lock. It only adds choices inside the set.

## Common mistakes

Insisting that each cell display all three digits throws away {1, 4}, {1, 8}, {4, 8}. Deleting from a second row that merely looks similar is also wrong. The three cells define the unit.

Do not pad the set with a naked single to “make three cells.” Place the single first. {1, 4}, {1, 8}, {4, 8, 9} is not a triple on {1, 4, 8}. Rebuild the set instead of crossing out 9 because the other cells look tidy.

If two of the cells are exactly {1, 4} and {1, 4}, they are already a naked pair, even if a third cell contains {1, 4, 8}. Clean the pair first. The third cell then loses 1 and 4 and may become a single, which is a stronger result than the triple.

A hidden triple is the digit-first twin: three digits appear in only three cells, and you delete the extras from those cells, just as a [hidden pair](/guides/hidden-pairs) does for two. In a fully noted unit it is the complement of a naked subset. Learn the naked union test on this page first.

## Frequently asked questions

### Do the three cells have to show the same candidates?

No. Each list must be a subset of the same three digits, with two or three candidates per cell. {1, 4}, {1, 8}, and {4, 8} is a standard naked triple.

### Can a naked triple be bent?

Yes, inside a box. Bent only means the cells are not on one straight line. They still share the box, so the box is what you clean. Similar notes that share no unit are not a triple.

### What do I place after I find one?

Nothing, until a cleaned cell has one candidate or a digit has one home. Leave the three cells as they are. Choosing an order inside the triple is a guess.

## Related techniques

[Naked pairs](/guides/naked-pairs) stay first in the search. [Hidden pairs](/guides/hidden-pairs) are the digit-first view of a two-digit lock. When triples stop appearing, move to [pointing pairs](/guides/pointing-pairs) and the rest of [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing).

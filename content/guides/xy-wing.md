---
slug: "xy-wing"
page_type: "blog"
title: "XY-Wing"
meta_title: "XY-Wing Sudoku Technique"
meta_description: "An XY-Wing uses three bivalue cells — a pivot and two wings — to delete one candidate from every cell that sees both wings. Worked example, how to spot it, and common mistakes."
primary_keyword: "xy-wing sudoku"
secondary_keywords: ["y-wing sudoku", "xy wing"]
word_count: 1176
status: "published"
brief: "xy-wing"
---

An XY-Wing, also called a Y-Wing, uses three bivalue cells to delete one candidate. The pivot holds {X, Y}. One wing holds {X, Z}. The other holds {Y, Z}. The pivot sees both wings. Whatever the pivot becomes, one wing has to be Z. Any other cell that sees both wings loses Z.

The pattern places nothing by itself. It is the shortest chain most solvers learn on purpose, after pairs and after single-digit fish such as [X-Wing](/guides/x-wing) and [Swordfish](/guides/swordfish). Longer chains and the XYZ-Wing are in [9 advanced Sudoku techniques](/guides/9-advanced-sudoku-techniques-that-experienced-solvers-use). When to switch from fish to a wing is part of [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing).

## What an XY-Wing is

The pivot is a bivalue cell. In the example, r4c4 is {2, 7}, so X is 2 and Y is 7. One wing is another bivalue cell the pivot can see, containing X and a new digit Z. r4c8 is {2, 9}, so Z is 9. The other wing contains Y and that same Z, and the pivot can see it too. r7c4 is {7, 9}.

A target is any other cell that sees both wings. It loses Z. It does not need to see the pivot, and the wings do not need to see each other. “Sees” means a shared row, column, or box. r4c9 contains 9 and shares a row with one wing, but it does not share a unit with r7c4, so its 9 stays.

Each of the three cells must have exactly two candidates. A pivot with a third digit is an XYZ-Wing. There the target must see the pivot as well as both wings. Do not use the looser XY-Wing test on that shape.

## When it applies

Look when the grid has many bivalue cells and single-digit patterns have gone quiet. [Pointing pairs](/guides/pointing-pairs), [box-line reduction](/guides/box-line-reduction), and a pass for X-Wing should already be done. Wings earn their place on [hard](/hard) and [expert](/expert) puzzles once notes are trustworthy.

The pattern clears only Z, and only in cells that see both wings. It does not clear X or Y nearby, and it does not clear Z from the pivot. The pivot does not contain Z.

## How to spot it

Search from pivots. List bivalue cells, and if two of them are a [naked pair](/guides/naked-pairs) — the same two digits — resolve that pair first. Pick a remaining cell {X, Y} as a pivot. In its row, column, and box, look for a bivalue cell that reuses exactly one pivot digit and introduces Z. Then look for the other wing: the other pivot digit paired with the same Z, also seen by the pivot.

Cells that share a unit with the first wing and a unit with the second lose Z. Two wings with different third digits, {2, 9} and {7, 8}, do not force anything. After the deletion, check the target for a naked single before you start a second wing.

## Worked example

X is 2, Y is 7, and Z is 9. Pivot r4c4 is {2, 7}. It sees r4c8 {2, 9} along row 4 and r7c4 {7, 9} along column 4. Target r7c8 is {4, 9}. It shares column 8 with r4c8 and row 7 with r7c4, so it loses 9 and becomes {4}.

r4c9 is {7, 9}. It sees r4c8 and does not see r7c4, so it is not a target.

```grid
caption: XY-Wing. Pivot r4c4 is {2, 7}. Wings r4c8 {2, 9} and r7c4 {7, 9} force 9 off r7c8.
highlight: r4c4 r4c8 r7c4
eliminate: r7c8
r4: 1 5 6 {2,7} 3 8 4 {2,9} {7,9}
r7: 8 6 1 {7,9} 2 5 3 {4,9} {4,7}
```

If the pivot is 2, r4c8 cannot be 2, so r4c8 is 9. If the pivot is 7, r7c4 cannot be 7, so r7c4 is 9. The pivot is one of those two, so one wing is 9. r7c8 sees both wings and cannot be 9. Nothing in that trace says which wing is 9. Leave the three amber cells as they are. The only edit is the rose cell.

## Why a cell must see both wings

A cell that sees only r4c8 is safe in the branch where the pivot is 7. In that branch r4c8 is 2, and the 9 sits in r7c4, which this cell cannot see. One branch is not a ban. Both branches have to put a 9 in sight.

The wings are not targets. Each wing is the cell providing Z in one branch. Deleting 9 from r4c8 or r7c4 destroys the pattern. The pivot is not a target either. It does not contain Z.

## Common mistakes

Deleting Z from every neighbor of the pivot is the standard miss. The wings are the source of Z, not the pivot. r4c9 is the cell to remember: it touches one wing and keeps 9.

A pivot of {2, 7, 9} with wings {2, 9} and {7, 9} can be an XYZ-Wing if the target sees all three cells. Using the XY-Wing test there removes 9 from cells the logic does not cover. Wings that carry different extra digits do not form a pattern, and you do not delete both extras “to be safe.”

The wings do not have to see each other. In this example they share neither row, column, nor box. The pivot is the hinge. Sharing a box does count as seeing, so name the unit for each wing before you erase. A “bivalue” cell with a third candidate you stopped writing is not bivalue. Restore the candidate and let the wing go.

An X-Wing locks one digit into a rectangle. An XY-Wing locks a consequence across three digits and three cells. A fish deletion can create the bivalue cell a wing needs. They are not variations of each other. If you cannot say which pattern you verified, you have not finished the count.

## Frequently asked questions

### Are XY-Wing and Y-Wing different?

No. Y-Wing is another name for the same three cells. XY-Wing names the candidates: the pivot is XY, and the wings are XZ and YZ. A third candidate on the pivot means an XYZ-Wing instead.

### Does the target have to see the pivot?

Not in an XY-Wing. It has to see both wings. In the example, r7c8 does not share a unit with the pivot r4c4. The deletion still holds, because r7c8 sees r4c8 and r7c4.

### Can I place Z in the wing that looks more likely?

No. Both branches stay open. The only shared fact is that some wing is Z, so a cell seeing both cannot be Z. Placing 9 in r4c8 because it has to go somewhere is a guess. Leave 9 on both wings.

## Related techniques

[Naked pairs](/guides/naked-pairs) produce many of the bivalue cells a wing uses, and they come first when the two cells match. [X-Wing](/guides/x-wing) and [Swordfish](/guides/swordfish) are the single-digit searches to exhaust beforehand. The [advanced techniques guide](/guides/9-advanced-sudoku-techniques-that-experienced-solvers-use) continues with XYZ-Wing, coloring, and chains. The switch is described in [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing).

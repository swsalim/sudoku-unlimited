---
slug: "solve-sudoku-without-guessing"
page_type: "blog"
title: "How to Solve Sudoku Without Guessing"
meta_title: "How to Solve Sudoku Without Guessing"
meta_description: "A logical Sudoku solving workflow: scanning, pencil marks, singles, pairs, triples, pointing, claiming, fish, and chains, with worked grid examples."
primary_keyword: "how to solve sudoku without guessing"
secondary_keywords: ["sudoku solving techniques", "sudoku pencil marks", "sudoku logic"]
word_count: 2283
status: "published"
brief: "solve-sudoku-without-guessing"
---

A stalled Sudoku grid is usually a missed check, not an invitation to guess. The workflow below is an order: scan the units, write candidates, place singles, then delete candidates with pairs, locked lines, fish, and a short chain. Each step earns the next one. After every placement or deletion, scan the touched units again.

This page is the order of work under [the complete guide to how Sudoku works](/guides/the-complete-guide-to-how-sudoku-works), which states the row, column, and box rules. Each named pattern has its own page, linked from the section where it belongs. Patterns past this workflow are collected in [9 advanced Sudoku techniques](/guides/9-advanced-sudoku-techniques-that-experienced-solvers-use).

**Quick answer:** Place [naked singles](/guides/naked-singles) and [hidden singles](/guides/hidden-singles) first. When nothing is forced, delete candidates with [naked pairs](/guides/naked-pairs), [hidden pairs](/guides/hidden-pairs), [naked triples](/guides/naked-triples), [pointing pairs](/guides/pointing-pairs), and [box-line reduction](/guides/box-line-reduction). Only then look for an [X-Wing](/guides/x-wing), a [Swordfish](/guides/swordfish), or an [XY-Wing](/guides/xy-wing).

## Scan before you fill in pencil marks

A scan asks one question of one unit: “Where can 4 go in this row?” Do that before you cover an easy grid with tiny numbers.

**r4c7** means row 4, column 7. Boxes are numbered 1–9, left to right and top to bottom. A *unit* is one row, one column, or one box. Every cell sits in three units, and a digit has to be legal in all three.

1. For each digit from 1 to 9, mark the units that already contain it.
2. In a unit that still lacks it, list empty cells that do not see a placed copy.
3. One cell left means you place the digit.
4. Two or three cells on one line inside a box are the seed of a pointing pair or a claim.

After a placement, rescan the three units you just changed. A new 6 in r2c2 deletes 6 from row 2, column 2, and box 1. [Easy](/easy) and [Medium](/medium) grids are full of these direct placements. [Hard](/hard) hides them between deletions.

## Candidates and pencil marks

A candidate is a digit not yet ruled out of a cell. Pencil marks are that list. They are not a guess. Write them for cells a direct scan cannot solve, in a fixed order: 1 2 3, then 4 5 6, then 7 8 9. Notes mode does the same job. Pairs and fish are patterns in those marks.

When you place 4, delete 4 from the rest of its row, column, and box. When a technique deletes 4 without a placement, delete only that mark. Erase a mark when you can name the unit and the pattern. If you cannot name them, the mark stays.

A *bivalue* cell has two candidates, such as {2, 7}. A *bilocal* digit has exactly two cells left in one unit. Bivalue cells feed wings. Bilocal digits feed pointing, X-Wings, and strong links.

## Singles: the only placements this order needs

A placement is allowed when a cell has one candidate, or when a digit has one home in a unit. Everything else on this page only deletes candidates so that one of those two events can happen.

A [naked single](/guides/naked-singles) is a cell whose list has shrunk to one digit. In the fragment below, column 4 already holds every digit except 4, and row 4’s other cells are filled with everything except 4. r4c4 is {4}. Place it.

```grid
caption: Naked single. r4c4 has only 4 left.
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

A naked single can also sit among other empty cells. You place it because that cell’s list has one digit, not because the row is full.

A [hidden single](/guides/hidden-singles) is a digit with one remaining cell in a unit, even if that cell still lists other digits. In this row, 4 appears only in r1c7. The cell also allows 8, but 4 has nowhere else in the row, so r1c7 is 4 and 8 comes off that cell.

```grid
caption: Hidden single. In row 1, candidate 4 appears only in r1c7.
highlight: r1c7
r1: {2,8} {2,9} 3 {8,9} 5 6 {4,8} 1 7
```

Stale marks invent fake singles, which is why the scan comes first. Use singles until they stop before you keep a pair “for later.”

## Pairs and triples

When singles dry up, look for a small set of cells that has reserved a small set of digits.

A [naked pair](/guides/naked-pairs) is two cells in one unit whose lists are exactly the same two digits. In row 3, r3c2 and r3c7 are both {2, 9}. Those cells will be 2 and 9 in some order, so every other 2 or 9 in the row is impossible. r3c4 is left with {5}, a new naked single. r3c8 is left with {3, 5}.

```grid
caption: Naked pair {2, 9} in r3c2 and r3c7. Delete 2 and 9 from the rest of row 3.
highlight: r3c2 r3c7
eliminate: r3c4 r3c8
r3: 1 {2,9} 4 {2,5,9} 6 7 {2,9} {3,5,9} 8
```

If those two cells also share a box, delete the pair from both units. Leave the order unknown.

A [hidden pair](/guides/hidden-pairs) is the inward cut: two digits live in only two cells, and you delete the extra candidates from those cells. A [naked triple](/guides/naked-triples) is three cells whose candidates use only three digits. {1, 4}, {1, 8}, and {4, 8} in one row qualify, even though no cell holds all three. Delete those digits from the other cells in the unit. Take a pair before a triple when both are present. The pair is smaller.

## Pointing and claiming

Locked candidates delete marks. They do not place a digit by themselves. A [pointing pair](/guides/pointing-pairs) or triple starts in one box: if a digit’s remaining cells in the box share a row or column, delete it from the rest of that line, outside the box. Box 1 below holds 6 only in r1c1 and r1c2, so r1c6 and r1c8 lose 6.

```grid
caption: Pointing pair. 6 in box 1 is confined to row 1, so row 1 loses 6 outside the box.
highlight: r1c1 r1c2
eliminate: r1c6 r1c8
r1: {6,8} {6,9} 2 3 4 {1,6,7} 5 {6,7} {1,8,9}
r2: 4 5 7 . . . . . .
r3: 3 1 8 . . . . . .
```

[Box-line reduction](/guides/box-line-reduction), or claiming, runs the other way. If every remaining cell for a digit on a line sits inside one box, delete the digit from the rest of that box. Row 8’s 5s all sit in columns 7 and 9, which are in box 9. r8c8 is in that box and does not contain 5; a claim does not need every cell of the band to hold the digit. Box 9 cannot also place 5 in r7c8 or r9c7.

```grid
caption: Claiming. Every 5 in row 8 sits in box 9, so the rest of box 9 loses 5.
highlight: r8c7 r8c9
eliminate: r7c8 r9c7
r7: . . . . . . 2 {5,6} 4
r8: 1 2 3 6 7 8 {4,5} {4,9} {5,9}
r9: . . . . . . {3,5} 7 {3,6}
```

Pointing clears the line outside the box. Claiming clears the box off the line. Do both before any fish.

## Fish

A fish locks one digit across more than one line. An [X-Wing](/guides/x-wing) is two rows that each hold the digit in the same two columns, or the column version of that rectangle. Those columns lose the digit outside the two rows. Rows 2 and 6 below each contain 7 only in columns 3 and 8, so r4c3 and r9c8 lose 7. r4c5 keeps 7: column 5 is not in the fish.

```grid
caption: X-Wing on 7. Rows 2 and 6 lock columns 3 and 8.
highlight: r2c3 r2c8 r6c3 r6c8
eliminate: r4c3 r9c8
r2: 1 2 {4,7} 5 6 8 9 {4,7} 3
r4: 4 5 {2,7} 1 {2,7} 3 8 6 9
r6: 2 1 {5,7} 6 8 9 3 {5,7} 4
r9: 8 9 6 3 4 1 5 {2,7} {2,7}
```

A [Swordfish](/guides/swordfish) uses three rows and three columns. A base row may use two or three of those columns, so empty corners are allowed. A fourth column in a base row breaks it. Delete the digit from the three columns outside the three rows. Jellyfish and finned fish are in the [advanced techniques guide](/guides/9-advanced-sudoku-techniques-that-experienced-solvers-use). Check one digit at a time. A rectangle of mixed candidates is not an X-Wing.

## Chains

A chain is a sequence of links you can point at. A **strong link** means at least one end is true: a digit with exactly two cells in a unit, or the two candidates in a bivalue cell. A **weak link** means both ends cannot be true, which is any two candidates in one cell, or two cells in one unit that both might hold the same digit.

An [XY-Wing](/guides/xy-wing) is the short chain to learn first. The pivot is {X, Y}. One wing the pivot sees is {X, Z}. The other wing the pivot sees is {Y, Z}. One of those wings must be Z, so any other cell that sees both wings loses Z.

```grid
caption: XY-Wing. Pivot r4c4 is {2, 7}; wings r4c8 {2, 9} and r7c4 {7, 9}. r7c8 sees both wings, so it loses 9.
highlight: r4c4 r4c8 r7c4
eliminate: r7c8
r4: 1 5 6 {2,7} 3 8 4 {2,9} {7,9}
r7: 8 6 1 {7,9} 2 5 3 {4,9} {4,7}
```

Here X is 2, Y is 7, and Z is 9. r4c9 contains 9 but does not see r7c4, so that 9 stays. The wings do not have to see each other. Coloring, XY-chains, and alternating inference chains are the same links on a longer path, in the [advanced techniques guide](/guides/9-advanced-sudoku-techniques-that-experienced-solvers-use). Make the deletion, then go back to singles.

## When each technique applies

Skip a step only when you are sure that pattern is absent.

| Situation | Technique | Guide |
| --- | --- | --- |
| A cell lists one digit | Naked single | [Naked singles](/guides/naked-singles) |
| A digit has one cell in a unit | Hidden single | [Hidden singles](/guides/hidden-singles) |
| Two cells in a unit list the same two digits | Naked pair | [Naked pairs](/guides/naked-pairs) |
| Two digits share the same two cells | Hidden pair | [Hidden pairs](/guides/hidden-pairs) |
| Three cells use only three digits | Naked triple | [Naked triples](/guides/naked-triples) |
| A digit in a box lies on one line | Pointing pair or triple | [Pointing pairs](/guides/pointing-pairs) |
| A digit on a line lies in one box | Claiming | [Box-line reduction](/guides/box-line-reduction) |
| Two rows lock a digit into two columns | X-Wing | [X-Wing](/guides/x-wing) |
| Three rows lock a digit into three columns | Swordfish | [Swordfish](/guides/swordfish) |
| Three bivalue cells form a pivot and two wings | XY-Wing | [XY-Wing](/guides/xy-wing) |
| You can trace links but no shorter pattern fits | Coloring and chains | [Advanced techniques](/guides/9-advanced-sudoku-techniques-that-experienced-solvers-use) |

Return to the top after every deletion. The pointing pair above is the whole method in miniature: deleting 6 from r1c8 leaves {7}, a naked single. Fish and chains filter candidates. Singles make the placements.

## Where to practice

[Easy](/easy) and [Medium](/medium) puzzles make singles and pencil marks automatic. [Hard](/hard) is where pointing, claiming, and pairs keep a puzzle moving. [Expert](/expert), [Master](/master), and [Extreme](/extreme) assume those tools and add fish and chains. The [daily challenge](/daily) is one shared puzzle per UTC day when you want a single grid instead of a stream of new ones.

The [Sudoku solver](/sudoku-solver) can confirm a placement you have already justified. Use it after you can name the technique. If the solver is the first thing that finds the digit, you skipped a scan. None of these techniques adds a fourth rule to [how Sudoku works](/guides/the-complete-guide-to-how-sudoku-works). Each one is a consequence of rows, columns, and boxes containing 1–9 once.

## Frequently asked questions

### Can every Sudoku be solved without guessing?

A puzzle with one solution can be solved by deductions, sometimes deeper than singles and pairs. A grid with two solutions cannot, once the shared steps run out, because both endings are legal. On a published puzzle, walk the table above before you test a cell.

### Should every pencil mark go in at the start?

Mark the cells a direct scan cannot solve, and keep the marks exact. A missing candidate hides a single. An extra candidate invents a pair.

### What comes after XY-Wing?

Re-scan for singles, learn Swordfish once X-Wing is easy to see, then use the advanced guide for coloring and longer chains. Unique rectangles assume one solution, so they are a separate family.

### Is erasing a trial digit a chain?

A trial with no link is a guess. A chain follows a strong link, such as the only two cells for 7 in a row, and deletes only what both branches forbid. If you cannot point at every step, it is not ready.

Open a [medium puzzle](/medium) or today’s [daily challenge](/daily) and run one pass in this order. When the grid stops, name the last pattern you finished. That name is the next page to open.

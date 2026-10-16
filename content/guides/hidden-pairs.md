---
slug: "hidden-pairs"
page_type: "blog"
title: "Hidden Pairs"
meta_title: "Hidden Pairs in Sudoku"
meta_description: "A hidden pair is two digits that share only two cells in a unit. Learn how the elimination differs from a naked pair, with a worked example and common mistakes."
primary_keyword: "hidden pairs sudoku"
secondary_keywords: ["hidden pair", "sudoku hidden pair"]
word_count: 994
status: "published"
brief: "hidden-pairs"
---

A hidden pair is two digits with only two cells left between them in one unit. Those cells usually show extra candidates, so the pair is hidden inside longer lists. Delete the extras. Keep the two digits. After that, the cells are often an ordinary [naked pair](/guides/naked-pairs).

This is a deletion, not a placement. You do not know the order yet. Hidden pairs belong with naked pairs in [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing), after singles and before fish.

## What a hidden pair is

In one unit, find a digit that appears in exactly two empty cells. Find a second digit that appears in those same two cells and nowhere else in the unit. Those two digits are the hidden pair. Strip every other candidate from the two cells. Do not strip the pair digits from the rest of the unit. The rest of the unit does not contain them, which is how you found the pair.

If the cells already contain only those two digits, you are looking at a naked pair and there is nothing left to delete.

## When it applies

Use it when singles are exhausted and you are scanning digit by digit. It shows up in busy [medium](/medium) and [hard](/hard) units, especially boxes, where the two cells need not share a row. Do not reach for it while a [hidden single](/guides/hidden-singles) is still available.

In a fully noted unit, a hidden pair and the naked subset on the other digits are the same cut seen from the other side. If that naked subset is easier to see, take it. The hidden-pair view is for when you were following two digits and noticed they share a home.

## How to spot it

Pick a digit with exactly two homes in the unit. If it has one home, place a hidden single. Read the other candidates in those two cells. A second digit joins the pair only if it, too, is absent from the rest of the unit. You need exactly one partner. Then delete every other candidate from both cells, including a digit that appears in only one of the two cells.

Two homes of one digit are not yet a pair. They may be a [pointing pair](/guides/pointing-pairs) if they lie on one line of a box. Check that simpler pattern when the geometry is there.

## Worked example

Row 2 places 5, 6, 8, and 9. Digits 4 and 7 appear only in r2c1 and r2c2. Digit 1 also sits in r2c1, and digit 2 also sits in r2c2. Both of those extras have other homes later in the row.

```grid
caption: Hidden pair 4 and 7 in r2c1 and r2c2. Struck digits are the extras those cells lose.
highlight: r2c1 r2c2
r2: {4,7,~1} {4,7,~2} {1,2,3} 5 6 8 9 {1,3} {2,3}
```

The struck 1 and 2 are the extras. Both cells become {4, 7}. They are now a naked pair, and 4 and 7 were already absent from the rest of the row, so the new pair has nothing further to delete along the row.

The same cut is visible the other way. r2c3, r2c8, and r2c9 use only {1, 2, 3}. That is a [naked triple](/guides/naked-triples), and it removes 1, 2, and 3 from every other empty cell. Here that means the 1 in r2c1 and the 2 in r2c2. Same deletions. On a messier unit you will often see the two confined digits before you see the triple. Either reading is valid. Doing both is not a second step.

You still cannot say that r2c1 is 4. Either order can be true.

## Why the extras are impossible

The unit must place 4 and 7, and only r2c1 and r2c2 remain for both jobs. Two cells cannot absorb a third digit. If r2c1 were 1, both 4 and 7 would have to fit in r2c2. The same collision hits 2 and 3. Those extras are not candidates anymore. One confined digit is not enough to evict the other notes. Both digits have to be locked to the same two cells.

## Common mistakes

Deleting 4 and 7 from the rest of the row is the naked-pair rule applied too early. The cells that need editing are the pair cells. A partner with a third home is not a partner. “Mostly in these two cells” leaves a real escape.

A digit that sits in only one of the two cells is still extra. In the example, 1 is only on r2c1, and it still goes. Leaving it there prevents the cell from becoming {4, 7}.

Incomplete notes invent the pattern. If a third cell should still carry 4, the deletion removes a true candidate. And do not also delete 4 and 7 from the complementary triple. Each subset loses the other subset’s digits, not its own.

## Frequently asked questions

### How is a hidden pair different from a naked pair?

A naked pair is two cells that already show only two digits, and you delete those digits elsewhere in the unit. A hidden pair is two digits that have only two cells, and you delete the other digits from those cells. In a fully noted unit they are complementary sets.

### Can the two cells hold different extras?

Yes. {1, 4, 7} and {2, 4, 7} can hide the pair 4 and 7. Remove 1 from the first cell and 2 from the second. The extras do not have to match.

### Does a hidden pair place either digit?

No. It only reduces the two cells to the two digits. Placing one of them immediately is a guess. A later single, often in a column or box you just changed, decides the order.

## Related techniques

[Naked pairs](/guides/naked-pairs) are the outward deletion to learn first. [Hidden singles](/guides/hidden-singles) are the one-digit version of this scan. [Naked triples](/guides/naked-triples) are the complement you will sometimes see instead. The order is in [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing).

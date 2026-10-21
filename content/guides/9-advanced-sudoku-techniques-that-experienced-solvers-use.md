---
slug: "9-advanced-sudoku-techniques-that-experienced-solvers-use"
page_type: "blog"
title: "9 Advanced Sudoku Techniques That Experienced Solvers Use"
meta_title: "9 Advanced Sudoku Techniques for Hard Sudoku Puzzles"
meta_description: "Learn 9 advanced Sudoku techniques, including X-Wing, Swordfish, XY-Wing, coloring, chains, and unique rectangles, with practical examples."
primary_keyword: "advanced sudoku techniques"
secondary_keywords: []
word_count: 2293
status: "draft"
brief: "9-advanced-sudoku-techniques-that-experienced-solvers-use"
---

You reach a hard Sudoku grid, scan every row, column, and box, and still find no number to place. The usual notes are there, but the puzzle has stopped giving up progress. That is where advanced Sudoku techniques help: they prove that certain candidates cannot stay, creating the next opening without guessing.

**Quick answer:** Start with fish patterns such as X-Wing, Swordfish, and Jellyfish. Then check wings, unique rectangles, coloring, XY-chains, and alternating inference chains. Each method depends on a specific candidate relationship, so mark the pattern first and eliminate only candidates that the pattern proves impossible.

## How to read this list of advanced Sudoku techniques

For a single overview from beginner scans through intermediate pairs and box-line work, start with [Sudoku strategy: 10 techniques to solve puzzles faster](/guides/sudoku-strategy). These advanced Sudoku strategies assume you already know candidate notation and the earlier technique guides: [naked singles](/guides/naked-singles), [hidden singles](/guides/hidden-singles), [naked pairs](/guides/naked-pairs), [hidden pairs](/guides/hidden-pairs), [naked triples](/guides/naked-triples), [pointing pairs](/guides/pointing-pairs), and [box-line reduction](/guides/box-line-reduction). The methods below remove candidates rather than select a value because it looks likely. The fish and wing patterns in this list also have their own pages: [X-Wing](/guides/x-wing), [Swordfish](/guides/swordfish), and [XY-Wing](/guides/xy-wing). The order for choosing among all of them is [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing).

Coordinates use **r4c7** for row 4, column 7. A set such as **{2, 5, 9}** lists the candidates remaining in one cell. HoDoKu groups related methods into families such as fish, wings, coloring, uniqueness, chains, and loops; that classification gives you a sensible way to learn hard Sudoku solving techniques instead of memorizing disconnected names.

Speed depends on the grid and your practice. A technique may be present but harder to spot than a simpler deduction created by an earlier elimination.

## 1. X-Wing: remove a candidate locked into two matching rows

An X-Wing occurs when one candidate appears in exactly two useful positions in each of two rows, and those positions fall in the same two columns. The [X-Wing guide](/guides/x-wing) walks through that rectangle on its own. The four cells form the corners of a rectangle. The equivalent pattern can run through two columns and two rows.

Suppose candidate 7 appears in r2c3, r2c8, r6c3, and r6c8. In rows 2 and 6, every possible 7 in the selected pattern lies in columns 3 or 8. Therefore one of those rows must place 7 in column 3, and the other must place 7 in column 8, in either order.

```
 c3 c8
r2 {7} {7}
r6 {7} {7}
```

Remove 7 from other cells in columns 3 and 8, such as r4c3, if that cell contains 7. The rectangle alone does not permit removing 7 from a cell that fails to share one of those columns. Extra candidate positions in the selected rows require careful checking; the two chosen columns must still confine the candidate correctly. See [SudokuWiki's X-Wing strategy](https://www.sudokuwiki.org/X_Wing_Strategy) for the formal fish rule.

## 2. Swordfish: extend the fish pattern across three rows or columns

A Swordfish extends the same idea across three rows. See the [Swordfish guide](/guides/swordfish) for a full cover-column example, including a legal empty corner. For one candidate, each selected row contains two or three possible positions, and the combined positions occupy no more than the same three columns. Those columns then hold the candidate for the three selected rows, in some order.

For candidate 4, imagine these positions:

```
r1: c2, c5
r4: c2, c5, c9
r8: c5, c9
```

The three rows use only columns 2, 5, and 9. Candidate 4 can therefore be removed from other cells in those columns outside rows 1, 4, and 8. For example, remove 4 from r6c5 or r9c9 when those candidates are present.

A Swordfish is not simply any six cells containing the same number. The candidate positions must fit the three selected rows and the same three intersecting columns. [SudokuWiki's Swordfish reference](https://www.sudokuwiki.org/Sword_Fish_Strategy) describes this unit-intersection rule. Check the columns before making an elimination.

## 3. Jellyfish: apply a four-unit fish when smaller patterns fail

Jellyfish uses four rows or four columns. One candidate is restricted to no more than four matching columns across four selected rows, allowing the candidate to be removed from those columns in every unselected row.

Here is a compact row-based example for candidate 6:

```
r1: c1, c4
r3: c1, c4, c7
r6: c4, c7, c9
r9: c1, c7, c9
```

All listed positions fall in columns 1, 4, 7, and 9. Remove candidate 6 from other rows in those four columns, such as r5c7, if r5 is not one of the selected rows. The deduction works because the four selected rows must claim the four available columns between them.

Check X-Wing and Swordfish first. A smaller fish may produce the same elimination with less work. Jellyfish is easy to overread, so reject any pattern that uses a fifth column or a candidate position outside the selected four rows. HoDoKu's solving-technique references place Jellyfish within the broader fish family.

## 4. XY-Wing: force an elimination through three bivalue cells

An XY-Wing, also called a Y-Wing, uses three bivalue cells. The [XY-Wing guide](/guides/xy-wing) isolates the pivot, the two wings, and the cells that actually lose a candidate. The pivot contains {X, Y}; one wing contains {X, Z}; the other contains {Y, Z}. The pivot must see both wings through a shared row, column, or box.

Use this example: pivot r4c4 is {2, 7}, wing r4c8 is {2, 9}, and wing r7c4 is {7, 9}. The pivot sees both wings through its row and column. A target such as r7c8 sees r4c8 in column 8 and r7c4 in row 7, so it sees both wings.

If the pivot takes 2, the first wing cannot take 2 and must take 9. If the pivot takes 7, the second wing cannot take 7 and must take 9. Either way, one wing contains 9. Remove 9 from r7c8, but do not remove 9 from every cell near the three-cell shape. Only cells that see both wings qualify. The [SudokuWiki Y-Wing reference](https://www.sudokuwiki.org/y_wing_strategy) covers the same structure under the alternate name.

## 5. XYZ-Wing: add a third candidate to the pivot without losing the deduction

An XYZ-Wing resembles an XY-Wing, but its pivot has three candidates: {X, Y, Z}. The two wings contain {X, Z} and {Y, Z}. The target must see the pivot and both wings, which makes the visibility test stricter.

For example, let the pivot r4c4 be {2, 7, 9}, with wings r4c8 {2, 9} and r7c4 {7, 9}. A target r4c7 would see the pivot and the first wing in row 4, but it would not see r7c4, so it cannot receive the elimination. A target that shares a unit with all three cells can lose candidate 9.

Why does it work? If the pivot takes 2, the first wing must take 9; if it takes 7, the second wing must take 9; and if it takes 9 itself, the target cannot take 9 because it sees the pivot. Thus 9 is impossible in a cell visible to all three. HoDoKu lists XYZ-Wing among its wing techniques. Confirm every row, column, and box relationship before crossing out a candidate.

## 6. Unique rectangles: prevent a deadly pattern with a uniqueness deduction

A basic unique rectangle uses four cells at the corners of two rows and two columns. The four cells occupy two boxes and share the same two candidates. The method assumes the puzzle has one solution.

Consider a rectangle with three cells containing {A, B} and a fourth containing {A, B, C}:

```
r2c2 {A,B} r2c5 {A,B}
r5c2 {A,B} r5c5 {A,B,C}
```

If the fourth cell kept A or B, the rectangle could permit two completions by swapping A and B. A properly formed single-solution Sudoku must break that pattern, so remove A and B from r5c5, leaving {C}. This is the common Type 1 unique-rectangle deduction.

The rectangle must occupy the correct boxes and use the same candidate pair in the other three cells. Uniqueness techniques do not apply safely to a puzzle that may have multiple solutions or to every puzzle format. HoDoKu classifies uniqueness separately from fish and chains; treat the one-solution assumption as a condition, not a universal rule.

## 7. Simple coloring: turn strong links into a contradiction or elimination

Simple coloring follows one candidate through connected strong links. A strong link means that, within a unit, the candidate must appear in one of two cells. Color one cell A, its linked partner B, then continue alternating colors through the chain.

Suppose candidate 5 forms this chain: r1c2(A) — r1c8(B) — r4c8(A). If two cells of the same color see each other, that color cannot be true. For instance, if another A-colored 5 lies in the same box as r4c8(A), eliminate 5 from both A cells. A different result occurs when an uncolored cell sees one A-colored cell and one B-colored cell: that uncolored cell cannot contain 5, because either color would already place 5 in its unit.

Color one candidate at a time. A weak link, where two cells merely could both contain the candidate, does not create the same forced alternation. HoDoKu's [chains and loops documentation](https://hodoku.sourceforge.net/en/tech_chains.php) describes strong links, coloring, and contradiction-based chain deductions.

## 8. XY-chains: connect bivalue cells to force an endpoint elimination

An XY-chain is a sequence of bivalue cells in which each neighboring pair shares a candidate. The chain starts and ends with the same candidate. If the endpoints see a common target, that repeated candidate can be removed from the target.

Use this candidate sequence:

```
r1c1 {A,B} → r1c6 {B,C} → r5c6 {C,D} → r5c2 {D,A}
```

Every adjacent pair shares one candidate: B, then C, then D. The endpoints both contain A. One endpoint must take A, so any cell that sees both endpoints, such as a correctly positioned r3c2, cannot contain A. Confirm that r3c2 shares a unit with r1c1 and r5c2; proximity on the page means nothing.

To search, start with a bivalue cell, follow a shared candidate into another bivalue cell, and stop when the chain returns to the starting candidate. Reject a chain if an adjacent pair does not share a candidate or if the proposed target sees only one endpoint. HoDoKu documents XY-chains within its chain and loop techniques.

## 9. AICs and forcing chains: test linked assumptions without guessing

An alternating inference chain, or AIC, connects strong and weak links in an alternating sequence. A strong link says one of two alternatives must be true; a weak link says both cannot be true. The chain carries that either-or relationship through rows, columns, boxes, or candidate links.

A compact notation might look like this:

```
r2c3 = 4 — r2c8 = 4 - r6c8 = 7 — r6c1 = 7
```

Mark each link before concluding. A single dash can represent a weak relationship, while a double or otherwise marked link represents a strong relationship in your notes. If following one branch creates two 7s in a unit, that branch is false and the alternative gains force. If two branches both lead to the same candidate, you can place that candidate or remove it elsewhere.

Forcing chains use the same discipline across explicit branches. They are logical deductions, not permission to guess: every link must be checkable from the displayed candidates. Use AICs after fish, wings, coloring, and direct eliminations have been checked. HoDoKu's chains-and-loops reference covers AIC types and forcing-chain logic.

## How to choose the right technique when a puzzle stalls

A fixed search order prevents you from spending ten minutes hunting a Jellyfish while a simple locked candidate is sitting in the same box. No universal order fits every grid, but this sequence works as a practical default.

1. Refresh singles, pairs, triples, and locked candidates.
2. Choose one candidate and scan for X-Wing, Swordfish, then Jellyfish.
3. Check XY-Wing, XYZ-Wing, and unique rectangles.
4. Use coloring and XY-chains to connect strong candidate relationships.
5. Reserve AICs and forcing chains for a grid that still has a complete, documented proof.

For example, if candidate 4 appears in two positions across two rows, test an X-Wing before searching all bivalue cells. After an elimination, rescan the affected rows, columns, and boxes. A fish removal may create a bivalue wing; a wing removal may create a single.

Record each elimination. Abandon a pattern when one candidate position falls outside its required units or when the target cell does not see every required part of the pattern.

## Practice advanced Sudoku techniques without relying on guesses

Practice one technique at a time. A puzzle that contains an X-Wing is a better lesson for X-Wing practice than a grid that also requires several unrelated chain types before you can see the pattern.

- Write candidates consistently, especially in bivalue cells.
- Record the pattern before making an elimination.
- Check visibility through the exact row, column, or box.
- Rescan the grid after every confirmed deduction.
- Compare your work with a solver or analyzer only after making your own proof.

HoDoKu is a free, open-source generator, solver, trainer, and analyzer that includes fish, wings, uniqueness, coloring, chains, and ALS techniques. Its training and analysis features can help you review a missed step, while the manual candidate check remains the skill you are building.

## Use the technique that proves the next move

Advanced solving becomes manageable when you treat every pattern as a proof. Fish restrict a candidate across units; wings connect small candidate sets; uniqueness uses a single-solution assumption; coloring and chains connect strong and weak links.

Choose a difficult puzzle on **SudokuUnlimited.com**, keep candidate notes, and test one technique at a time. Move to the next number only after the grid itself proves the elimination.

## References

- [X-Wing Strategy](https://www.sudokuwiki.org/X_Wing_Strategy)
- [Swordfish Strategy](https://www.sudokuwiki.org/Sword_Fish_Strategy)
- [Y-Wing Strategy](https://www.sudokuwiki.org/y_wing_strategy)
- [HoDoKu: Solving Techniques - Chains and Loops](https://hodoku.sourceforge.net/en/tech_chains.php)
- [HoDoKu: Sudoku Generator, Solver, Trainer & Analyzer](https://hodoku.dev/)

---
slug: "how-to-solve-sudoku-step-by-step"
page_type: "blog"
title: "How to Solve Sudoku Step by Step"
meta_title: "How to Solve Sudoku Step by Step"
meta_description: "A beginner walkthrough for the first Sudoku placements: start in the fullest unit, name the missing digit, check the other two units, then hand off to the technique guides."
primary_keyword: "how to solve sudoku step by step"
secondary_keywords: ["sudoku for beginners", "sudoku walkthrough", "first sudoku placements"]
word_count: 1164
status: "published"
brief: "how-to-solve-sudoku-step-by-step"
---

How to solve Sudoku step by step, for a first sitting, is five moves you can point at. Find the unit with the fewest blanks. Name the digit it is missing. Check the other two units. Write the digit only if those units allow it. Then look again at the units that digit just changed.

This page stops when that loop stops. It does not teach pairs, pointing, fish, or chains. Those patterns, in the order to use them, are in [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing). For a full sudoku strategy that walks beginner scans through advanced patterns, see [Sudoku strategy: 10 techniques to solve puzzles faster](/guides/sudoku-strategy). The row, column, and box rules underneath every step are in [the complete guide to how Sudoku works](/guides/the-complete-guide-to-how-sudoku-works). A short list of habits around the same rules is [5 ways to approach number puzzles like Sudoku](/guides/5-ways-to-approach-number-puzzles-like-sudoku). Entering the digit you have proved is [how to play Sudoku with numbers](/guides/how-do-you-play-sudoku-with-numbers).

Open an [easy](/easy) puzzle for this loop. A [4×4 kids grid](/kids-sudoku/4x4) uses the same loop with digits 1–4 if you want a shorter first board.

## Step 1: Start where the fewest cells are empty

A unit is one row, one column, or one 3×3 box. Count empty cells before you write. The top-left cell is a fine place to look only when it sits in a unit that is nearly full. A row with one blank is a better start than a row with six blanks, wherever that row sits.

Givens are the digits already on the grid. Count them as filled. Your steps happen in the blanks.

## Step 2: Name the digit that unit is missing

A finished unit holds 1 through 9 once. Read the digits that are present and see which labels are absent. If eight digits are present, one label is absent, and there is one blank, that blank is the candidate. You still owe the other two units a check. You do not pick a digit because it “fits the pattern” of the neighborhood.

Row 4 below has one blank, at r4c5. The digits already in the row are 1, 2, 3, 4, 6, 7, 8, and 9. The absent digit is 5.

```grid
caption: Row 4 has one blank at r4c5. The row is missing 5. Column 5 and the center box still have to allow it.
highlight: r4c5
r4: 1 2 3 4 . 6 7 8 9
```

Say the sentence out loud once: “Row 4 is missing 5, and the blank is r4c5.” That sentence is the whole step. If you cannot name both the digit and the cell, you are not ready to write.

## Step 3: Check the other two units

r4c5 also belongs to column 5 and to the center box, rows 4–6 and columns 4–6. Look down column 5 for a 5. Look through the center box for a 5. If either unit already has a 5, leave r4c5 blank and reread row 4 from the left. A real missing digit that is legal in all three units can be written. A clash means a given was skipped or an earlier entry is in the wrong cell.

If column 5 and the center box are both clear of 5, write 5 in r4c5. On this site, select the cell and press 5 with notes turned off. On paper, write 5 at the same size as the givens.

The same step works on a box. Take the bottom-left box, rows 7–9 and columns 1–3, filled like this:

```grid
caption: The bottom-left box is missing 9, and the only blank inside it is r9c3.
highlight: r9c3
r7: 2 3 4 . . . . . .
r8: 5 6 7 . . . . . .
r9: 8 1 . . . . . . .
```

The box contains 1, 2, 3, 4, 5, 6, 7, and 8. It is missing 9, and r9c3 is the only blank in the box. Check row 9 and column 3. Write 9 only when both are clear of 9. The box named the digit. The row and the column have to agree.

## Step 4: Rescan only the units you changed

A new 5 in r4c5 deletes 5 from the rest of row 4, from column 5, and from the center box. Row 4 is already full, so the new information lives in the column and the box. Do not restart at row 1. Look at column 5. If it now has a single blank, repeat steps 2 and 3 on that blank: name the digit the column is missing, then check that cell’s row and its box.

One proved digit earns the next look. Keep a short list of units you touched so you do not wander. After the box example, the touched units are row 9, column 3, and the bottom-left box.

## Step 5: Stop when nothing in those units is forced

The loop ends when every unit you are watching still has two or more blanks, and you cannot point at a digit with a single legal cell. That is a normal place to be, including on easy puzzles after the obvious rows are finished. Do not try a digit to see whether the grid complains.

Write the candidates you can still defend, as small notes, and leave this page. From here:

- A cell whose list has shrunk to one digit is a [naked single](/guides/naked-singles). Place it.
- A digit that has one legal cell left in a unit, even inside a longer note list, is a [hidden single](/guides/hidden-singles). Place it and clear the other notes.
- Pairs, triples, pointing, claiming, fish, and a short chain, in that order, are the workflow in [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing).

[Medium](/medium) is where that handoff usually arrives while the grid is still young. [Hard](/hard) arrives there sooner. Stay on [easy](/easy) until step 3 is automatic. The difference between those levels is the generator’s removal target, described in [easy vs medium vs hard](/guides/easy-vs-medium-vs-hard-sudoku).

The [daily challenge](/daily) is the same walkthrough on one shared grid. The [Sudoku solver](/sudoku-solver) can confirm a digit after you can name the unit that forced it. If the solver is the first thing that finds the digit, go back to step 1 on a fuller unit.

## Frequently asked questions

### Which row should I start on?

Start on any unit that has a single blank. If several rows are in that state, finish any one of them, then the next. The order among equally empty units does not change the digit you will write.

### What if the missing digit is already in the column?

Leave the cell blank. Read the row again, digit by digit, including the givens. The column check exists so a row reading cannot override the rest of the grid.

### Where do I go when every unit has several blanks?

Open the no-guessing workflow and the singles pages linked above. This walkthrough is the opening pass. The named techniques are the continuation, and they live on those pages so the two jobs stay separate.

---
slug: "what-are-the-rules-of-sudoku"
page_type: "blog"
title: "What Are the Rules of Sudoku? A Player FAQ"
meta_title: "What Are the Rules of Sudoku? A Player FAQ"
meta_description: "What are the rules of Sudoku: the 9×9 grid, the one placement rule, givens, a single solution, and how Killer Sudoku and guessing fit."
primary_keyword: "what are the rules of sudoku"
secondary_keywords: ["sudoku rules", "sudoku grid rules", "sudoku givens", "killer sudoku rules"]
word_count: 2480
status: "published"
brief: "what-are-the-rules-of-sudoku"
---

What are the rules of Sudoku? Fill every empty cell with a digit from 1 to 9 so that each row, each column, and each 3×3 box contains every digit once. The digits already on the grid stay where they are. A finished grid that meets those constraints is a solution. A puzzle that has been properly set has one such grid.

[Nikoli’s rules page](https://www.nikoli.co.jp/en/puzzles/sudoku/) states that job in two lines: place a number from 1 to 9 in each empty cell, and make each row, each column, and each bold 3×3 block contain all of those numbers. [GNOME Sudoku’s rules](https://help.gnome.org/gnome-sudoku/rules.html) state the same fill, and add a line this page returns to later: each puzzle has only one solution.

How those constraints become a solving loop is [the complete guide to how Sudoku works](/guides/the-complete-guide-to-how-sudoku-works). Entering a digit you have already checked is [how to play Sudoku with numbers](/guides/how-do-you-play-sudoku-with-numbers). The first placements, in order, are [how to solve Sudoku step by step](/guides/how-to-solve-sudoku-step-by-step). This page stays on the rules: the grid, the givens, what counts as a solution, and the questions that come up when a variant or a guess appears.

## What does the grid contain?

A classic board has 81 cells. Nine rows run across. Nine columns run down. Thick lines group the cells into nine boxes, each three cells wide and three cells tall. Every cell sits in one row, one column, and one box. Solvers call any of those three a unit.

Row 4, column 7 is one cell. It belongs to row 4, to column 7, and to the box covering rows 4–6 and columns 7–9. A digit can be unused in the row and already present in the column or the box. The rule reads all three units together.

The boxes are drawn on the grid. Nikoli describes them as the nine blocks bounded by bold lines. A 4 in the top-left box is the same kind of fact as a 4 in the bottom-right box: that box has used 4, so its other eight cells lose 4.

Smaller boards on this site keep the same shape of rule and shorten the list. [Kids Sudoku](/kids-sudoku) has a 4×4 grid and a 6×6 grid. The 4×4 uses digits 1 through 4, and each box is 2×2. The 6×6 uses digits 1 through 6, and each box is 2 rows by 3 columns. Playable copies are on [4×4](/kids-sudoku/4x4) and [6×6](/kids-sudoku/6x6). A classic puzzle is that rule with digits 1 through 9 and boxes of 3×3.

## What do you have to place?

You place one digit in each cell that started empty. The digits are 1, 2, 3, 4, 5, 6, 7, 8, and 9. Zero sits outside that set. When the last empty cell is filled and every unit holds each digit once, the grid is solved. A blank left behind leaves the puzzle unfinished, even when the digits you did write never repeat.

A finished unit is a full set. A row that contains two 6s has broken the rule. A row that finished with no 6 has broken it too. Columns and boxes take the same test. GNOME states the rule as a ban on repeats and, for a solved grid, as each unit containing 1 through 9.

Try it on one cell. Suppose row 2 already shows a 6 and column 5 already shows a 6, while the box that holds row 2, column 5 is still missing 6. That cell cannot be 6. The row and the column have each spent the digit. A different empty cell in the same box, outside row 2 and outside column 5, can still be 6 when its own row and its own column are free of 6.

## What are givens?

Givens are the digits printed before you start. On Nikoli’s account of how the company sets Sudoku, those starting digits are the clues. They belong to the puzzle in the same way the bold lines belong to the grid. You fill the cells around them. Moving a given to a friendlier cell, or erasing one because it blocks a digit you hoped to write, produces a different puzzle.

On Sudoku Unlimited, the digits present when the puzzle opens are those givens. The cells you fill are the ones that started empty. When a given seems to leave some cell with no digit at all, the digit to undo is one you entered earlier.

How many givens you see depends on the puzzle and on the level. This site’s generator starts from a finished grid and tries to clear a fixed number of cells: 30 on [Easy](/easy), 40 on [Medium](/medium), 50 on [Hard](/hard), then 55, 60, and 65 for Expert, Master, and Extreme. If clearing a cell would leave more than one way to finish the grid, that cell is restored. A published puzzle can therefore show more givens than 81 minus the target. What those level names change is in [easy vs medium vs hard](/guides/easy-vs-medium-vs-hard-sudoku). The placement rule stays the one on this page.

## Does a legal grid have one solution?

A solution is any completion in which every row, column, and box holds 1 through 9 once. Some sets of givens allow two completions. Some allow none, because the givens already repeat inside a unit, or because they leave a set of cells that cannot hold the remaining digits. The placement rule describes a finished grid. A promise of exactly one completion is a separate property of the clues.

GNOME Sudoku’s rules page makes that promise for the puzzles it ships: each puzzle has only one solution. Nikoli’s rules page states the placement rule. Alongside it, Nikoli describes a 1986 decision about setting: clues are arranged in a symmetrical pattern. Symmetry is a choice about how a puzzle looks, a maker’s convention for Nikoli’s own puzzles. The player’s job remains the placement rule. Sudoku Unlimited’s generator does not require symmetric givens. It does require a single completion, and it puts back any cell whose removal would open a second solution.

Four empty cells can show what a second solution looks like. Place them at the corners of a rectangle that uses two rows, two columns, and two boxes. Suppose the rest of the grid is already filled, and each of those four cells can still be either 2 or 7. Writing 2 and 7 in one order, and writing them in the swapped order, both finish the grid with every unit legal. The givens never chose between the two orders. A puzzle set to a single solution does not leave that rectangle standing. The advanced guide treats the same shape as a [unique rectangle](/guides/9-advanced-sudoku-techniques-that-experienced-solvers-use) when you are eliminating candidates. Here it is only a picture of two legal completions.

That single-completion property is why a stuck cell matters. You followed the placement rule, and a cell has no digit left. An earlier digit disagrees with the one finished grid the clues allow. Undo that digit in the units it touched, and scan those units again. A grid you half-erased, or copied from a scrap of paper, stays unproved until you know it has one solution.

## Do the rules ask for arithmetic?

They ask you to place distinct digits. Nikoli’s description of Sudoku says the puzzle requires no calculations. The size of a digit does no work. A 9 has no duty to sit beside an 8. A row has no duty to read 1, 2, 3, 4, 5, 6, 7, 8, 9 from left to right. Any order is a legal row when each digit appears once.

Adding a row, or hunting a sequence, can agree with a grid that is already finished and legal. Those checks still fail to name which empty cell receives which digit. The cell receives the digit its three units still lack.

[Killer Sudoku](/killer-sudoku) is the puzzle on this site that does add. The classic rules stay in force: each row, column, and 3×3 box contains 1–9 once. Cages add two further rules. A cage is a connected group of cells with a sum printed in the corner, and the group may cross a box boundary. The digits inside the cage add up to that sum, in any order. Those digits also stay unique inside the cage, including when the cage crosses several boxes. Easier Killer levels include some given digits along with the cages. Extreme starts from the cages alone. Classic Sudoku, including the [daily challenge](/daily), has no cage sums. The daily puzzle is one classic grid per UTC day, shared by every player, under the same placement rule.

## What is a legal digit, and what is a forced digit?

A digit is legal in an empty cell when that digit is missing from the cell’s row, missing from its column, and missing from its box. Legal means the placement rule still permits it. Two or three digits can be legal in the same cell at the same time. Writing one of them because it looks likely is a choice, and the next section says what that choice is.

A digit is forced when the rule leaves a single option you can point at. Two cases cover almost every early placement:

1. The cell’s three units, taken together, have removed eight digits, so one digit remains.
2. A unit is missing a digit, and only one of its empty cells can still hold that digit.

Both cases are the placement rule applied until one candidate survives. Take column 2 with eight digits filled and r9c2 empty. The column is missing 9. Row 9 and the box that contains r9c2 still have to be missing 9 as well. When they are, r9c2 is 9. When row 9 already has a 9, the column reading and the row reading disagree, and an earlier digit is wrong.

The walkthrough that starts from the fullest unit is the step-by-step guide. Writing small candidate digits, and telling those notes apart from a placed answer, is the numbers guide.

## Do notes, hints, or guesses break the rules?

Pencil marks record digits the rule has yet to eliminate. They are ordinary play. A small 4 means “4 is still legal here,” and a later scan should read it as a note. When you place 4 for real, 4 comes out of the notes in the rest of that row, column, and box, because those cells lost 4 under the same rule.

A hint on Sudoku Unlimited lists the digits still legal in the selected cell. The site gives 3 free hints each local day, and finishing a puzzle can add another. The list is the placement rule applied to one cell. It leaves the digit unplaced, and it leaves the row, the column, and the box as strict as they were.

The [Sudoku solver](/sudoku-solver) can check a grid or step through one. Copying its digits into cells you have not deduced is looking the solution up. The finished grid is still accepted or rejected by the same three units.

Guessing means writing a digit while at least one other digit is still legal in that cell. The placement rule, read at that moment, accepts any of those digits: none of them repeats yet. On a puzzle with one solution, the guess that disagrees with that solution later produces a repeat or a cell with nothing left.

On this site the mistake counter reaches further than a repeat check. A digit that conflicts with the row, column, or box is marked wrong. A digit that does not match the puzzle’s stored solution is marked wrong too, including a guess that has not repeated yet. Three marked mistakes end the puzzle. Zen mode keeps the same placement rule and stops that limit from ending the game.

The path that writes a digit only when a unit forces it is [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing).

## Which habits sit beside the rules?

Play can start in any cell. The top-left corner is a habit. A unit with one empty cell is usually a faster opening, and that choice is strategy, laid out in the step-by-step guide.

Scanning can run in any order you can repeat. Chasing 1 through every unit, then 2, is a common habit. Finishing the fullest row first is another. The grid requires each digit to land once in each unit, whichever order you hunt them.

Symmetric givens are a setting choice. Nikoli adopted symmetrical clues in 1986 for the puzzles it makes. A puzzle whose givens sit mostly on one side can still have a single legal completion. This site’s generator keeps the uniqueness check and skips the symmetry requirement.

Level names share one rule. [Easy](/easy) and Extreme ask for the same kind of completed grid. The level records how many cells the generator tried to clear. Sheets for Easy through Expert, with a solution page, are on [printable Sudoku](/printable). Use the solution page to check a digit you have already justified from its row, column, and box.

## What should you check before the first digit?

Open an [Easy](/easy) puzzle and find a row, column, or box with one empty cell. Name the digit that unit is missing. Look through the other two units that contain that cell. Write the digit when both of them are missing it as well. That single check is the rule, applied once.

## Frequently asked questions

### What are the rules of Sudoku in one sentence?

Fill every empty cell with a digit from 1 to 9 so each row, each column, and each 3×3 box contains each digit once, and leave the given digits where they are.

### Do Sudoku rules include addition?

Classic Sudoku has no sums. Killer Sudoku keeps the classic rule and adds cage sums, with no repeated digit inside a cage.

### Can a Sudoku puzzle have two solutions?

A completion that follows the placement rule can be one of several if the givens allow it. GNOME Sudoku states that each of its puzzles has only one solution. Puzzles on this site put a cleared cell back when removing it would leave a second solution.

### Is guessing against the rules?

A guess writes one digit while another digit is still legal in that cell. Any digit still missing from the row, column, and box passes the placement rule at that moment. A wrong guess on a single-solution puzzle runs into a contradiction later. Notes, and a hint that lists legal digits, are ordinary play.

### Do 4×4 and 6×6 puzzles follow a different rule?

They follow the same idea on a shorter grid. A 4×4 uses 1 through 4 and 2×2 boxes. A 6×6 uses 1 through 6 and boxes of 2 by 3. The classic board uses 1 through 9 and boxes of 3×3.

## References

- [Sudoku](https://www.nikoli.co.jp/en/puzzles/sudoku/), Nikoli
- [Game rules](https://help.gnome.org/gnome-sudoku/rules.html), GNOME Sudoku

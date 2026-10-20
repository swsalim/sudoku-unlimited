---
slug: "the-complete-guide-to-how-sudoku-works"
page_type: "blog"
title: "The Complete Guide to How Sudoku Works"
meta_title: "How Does Sudoku Work? Complete Rules and Solving Guide"
meta_description: "Learn how Sudoku works, including the 9x9 grid rules, candidate notes, elimination methods, difficulty levels, and a practical solving example."
primary_keyword: "how does sudoku work"
secondary_keywords: ["sudoku grid rules", "sudoku 9x9 grid", "sudoku elimination method", "sudoku pencil marks", "sudoku single possibility", "online sudoku difficulty levels"]
word_count: 3199
status: "draft"
brief: "the-complete-guide-to-how-sudoku-works"
---

A Sudoku puzzle can look like a wall of random numbers. You find an empty square, spot two or three digits that seem possible, and then discover that the surrounding 3x3 box rules out the number you wanted. That confusion disappears once you treat every empty cell as three checks at once: its row, its column, and its box.

So, how does Sudoku work? Sudoku works by placing the digits 1 through 9 so that no digit repeats in any row, column, or 3x3 box. The sections below turn that rule into a repeatable solving process you can use on paper or in a browser. For the opening placements only, follow [how to solve Sudoku step by step](/guides/how-to-solve-sudoku-step-by-step). Entering a digit is covered in [how to play Sudoku with numbers](/guides/how-do-you-play-sudoku-with-numbers). What Easy, Medium, and Hard change is in [what the difficulty levels mean](/guides/easy-vs-medium-vs-hard-sudoku). If you want the motivation behind the habit, read [what is the point of Sudoku](/guides/what-is-the-point-of-sudoku).

## Quick answer

To play Sudoku, fill every empty cell with a digit from 1 through 9. Each row, each column, and each 3x3 box must contain every digit exactly once. Start with numbers that have only one legal location, write possible candidates in harder cells, remove candidates when new digits appear, and repeat the scan.

The starting numbers are called givens. You don’t change them. Every other number must come from a deduction that follows the three Sudoku grid rules. Cornell’s mathematics materials describe this candidate-based approach as a basic solving strategy, while the standard rules are also stated by [GNOME Sudoku’s rules page](https://help.gnome.org/gnome-sudoku/rules.html).

## What Sudoku asks you to do

A standard Sudoku gives you a partially completed grid. Your job is to fill the empty cells with the digits 1 through 9 so that every row, column, and 3x3 box contains each digit once. The digits don’t represent quantities, calculations, or a sequence. You could replace them with nine symbols and the logic would still work, as Cornell explains in its [introduction to Sudoku](https://pi.math.cornell.edu/~mec/Summer2009/Mahmood/Intro.html).

That makes Sudoku a logic puzzle rather than an arithmetic exercise. A given number supplies a constraint; your later placements follow from the constraints already on the board. In a well-constructed beginner puzzle, you can usually avoid guessing by finding a cell or unit where the rules force the next move.

For example, if a row already contains 1, 2, 4, 7, 8, and 9, its missing digits are 3, 5, and 6. If a particular empty cell’s column already contains 3 and its box already contains 5, that cell must be 6. The move feels certain because two legal alternatives have been removed.

Every confirmed Sudoku digit must survive three checks: its row, its column, and its 3x3 box.

## How the Sudoku 9x9 grid is organized

The standard Sudoku 9x9 grid contains 81 cells. Nine horizontal rows cross nine vertical columns, and thick lines divide the board into nine smaller 3x3 boxes. Each box contains nine cells, so the whole grid can be viewed as nine rows of boxes as well as 81 individual spaces.

Solvers call a row, column, or box a *unit*. Every empty cell belongs to three units at the same time. A cell in row 4, column 7 sits in row 4, column 7, and the 3x3 box covering rows 4–6 and columns 7–9. A number that fits one of those units can still fail in either of the other two.

Use coordinates when a puzzle gets busy. “R4C7” means row 4, column 7. “Box 6” can mean the bottom-middle box if you number boxes left to right and top to bottom. The exact labels matter less than using them consistently.

| Grid term | What it means | What to check |
| --- | --- | --- |
| Cell | One of the 81 individual spaces | Which digits survive its row, column, and box |
| Row | One horizontal unit of nine cells | Each digit 1–9 appears once |
| Column | One vertical unit of nine cells | Each digit 1–9 appears once |
| 3x3 box | One block of nine cells | Each digit 1–9 appears once |

Imagine an empty cell at R4C7. If row 4 contains 1, 3, and 7, column 7 contains 2 and 8, and its box contains 4 and 9, the excluded digits are 1, 2, 3, 4, 7, 8, and 9. The only candidates left are 5 and 6. That is the basic unit of Sudoku reasoning.

The [GNOME rules explanation](https://help.gnome.org/gnome-sudoku/rules.html) uses the same row, column, and 3x3 box structure. Learn to see those three units before you learn named techniques. Most beginner errors happen because a player checks the row and column, then forgets the box.

## The three Sudoku grid rules that control every move

Sudoku has three formal rules, and every placement must satisfy all three. They sound simple; applying them in the right order is the skill.

1. **Each row contains 1 through 9 once.** A row can’t contain two 6s, and it can’t finish with a missing digit.
2. **Each column contains 1 through 9 once.** A number that fits its row remains illegal if the same number already appears above or below it.
3. **Each 3x3 box contains 1 through 9 once.** This rule catches placements that look perfectly safe when you scan only horizontally and vertically.

Suppose a row needs a 6 and has two empty cells that could take it. The left cell may pass the row check, but if its 3x3 box already contains a 6, that placement fails. The other cell becomes the only legal location for 6 in the row.

Competition instructions also refer to applying classic Sudoku rules. The [World Puzzle Federation competition material](https://gp.worldpuzzle.org/content/competition-puzzles-156) distinguishes classic Sudoku rules from extra rules used by variants such as Arrow Sudoku. For a standard puzzle, keep the test simple: row, column, box.

A number that fits its row is only a possibility until its column and box also approve it.

## Why a valid Sudoku solution is a logic problem

A completed Sudoku solution is a full 9x9 grid in which every row, column, and box satisfies the rules. A computer could search through possible completions until it finds one. A human solver usually takes a more useful route: deduce one placement, update the affected units, and use the new information to force another placement.

That distinction matters because a valid completion and the intended solving path are different things. The rules alone don’t promise that every arbitrary collection of starting numbers has one solution. A properly constructed standard puzzle is generally designed with one solution, a property stated in the [GNOME Sudoku rules](https://help.gnome.org/gnome-sudoku/rules.html).

Sudoku needs no arithmetic. It needs careful elimination. A solution becomes visible as candidates disappear.

## A reliable solving loop for a new puzzle

Use one loop instead of jumping between random tricks. This keeps every placement traceable and makes mistakes easier to repair.

1. **Scan for obvious placements.** Look across rows, columns, and boxes for a unit with one missing digit or a cell with one legal digit.
2. **Record candidates.** For cells that remain uncertain, list digits that survive all three unit checks.
3. **Apply exclusions.** Remove a candidate when the same digit is placed in the cell’s row, column, or box.
4. **Rescan affected units.** A new digit can create a single in its row, its column, or its box, so check those units immediately.

Suppose you place 6 at R4C7. Delete 6 from every other candidate list in row 4, column 7, and the box containing R4C7. A nearby cell with candidates {2, 6} becomes {2}; a cell with {1, 4, 6} becomes {1, 4}. The first cell is now forced, while the second still needs another deduction.

Cornell’s [Sudoku solving strategy](https://pi.math.cornell.edu/~mec/Summer2009/Mahmood/Solve.html) describes the same cycle: list entries that don’t contradict the existing units, fill forced entries, and eliminate that digit from neighboring possibilities. The process is mechanical in the best sense. New information changes the next scan.

### How candidates reveal the next legal move

A candidate is a digit that has not been ruled out by the target cell’s row, column, or box. The Sudoku elimination method starts with the full set {1, 2, 3, 4, 5, 6, 7, 8, 9} and removes digits already used by those three units.

Take a cell whose row contains 1, 3, and 7; whose column contains 2 and 8; and whose box contains 4 and 9. Remove those seven digits. The candidate set is {5, 6}.

That list doesn’t confirm either digit. It records two live possibilities. If another cell in the same box later receives 5, this cell’s list changes to {6}, creating a forced placement.

### How a single possibility solves a cell

A **sudoku single possibility** occurs when a cell has one remaining candidate. You may also hear “naked single” or “single candidate.” If R4C7 has the candidate set {6}, place 6 there because every other digit would break at least one Sudoku rule.

Then update the three connected units. Remove 6 from the candidate lists of the other cells in row 4, column 7, and the same box. Cornell calls this a forced entry because the candidate check leaves only one legal choice.

A hidden single works differently. The cell might still list {2, 5, 8}, but if 5 appears as a candidate nowhere else in its box, that cell must hold 5. The cell has several notes, yet the unit has only one location for the digit.

### How the Sudoku elimination method works across a unit

Choose one digit and scan a whole row, column, or box. If that digit has only one legal destination, place it. This is the hidden-single version of the Sudoku elimination method.

Here is a checked box example. In a 3x3 box, suppose the candidate locations for 4 are R1C2, R1C3, and R1C1. All three locations lie in row 1. Because the box must contain only one 4, row 1 cannot place another 4 outside that box. Delete 4 from R1C4 through R1C9 wherever it appears as a candidate. This is a locked candidate.

Locked candidates can produce the next single, but beginners don’t need them on every move. Start with direct singles and hidden singles. Add this technique when a scan finds no immediate progress.

## How to use Sudoku pencil marks without creating confusion

Sudoku pencil marks are temporary candidate notes, not miniature answers. Add them after checking the obvious singles; otherwise you can spend time writing candidates into cells that a simple scan would have solved. A beginner-oriented walkthrough of that note-taking loop is [how to use Sudoku pencil marks as a beginner](/guides/sudoku-pencil-marks).

For each uncertain cell, check all three units before writing a note. Then update the note immediately after a related placement. If a cell shows {3, 7} and a 7 enters its row, erase 7 and leave {3}.

- Write only candidates that pass the row, column, and box checks.
- Delete a candidate as soon as a connected unit receives that digit.
- Recheck old notes after an unexpected contradiction.
- Never treat a pencil mark as a confirmed number.

Stale notes create false logic. A candidate list can be correct when you write it and wrong two moves later. Digital notes work the same way if the website supports them, so the habit stays the same: notes must be current.

## A worked example from candidates to a confirmed digit

Use this compact example to see the full chain. Row 5 contains 1, 3, 4, 7, 8, and 9, so its missing digits are {2, 5, 6}. Focus on R5C6.

1. Column 6 already contains 2. Remove 2 from R5C6, leaving {5, 6}.
2. The box covering rows 4–6 and columns 4–6 already contains 5. Remove 5, leaving {6}.
3. Place 6 at R5C6. The cell’s sudoku single possibility is confirmed by the row, column, and box checks.
4. Remove 6 from every other candidate list in row 5, column 6, and that 3x3 box.

The candidate removals have exact reasons. The row supplied the starting missing set, the column removed 2, and the box removed 5. No guess entered the process.

Now consider the same box after the placement. Suppose its remaining empty cells have these candidates for digit 8: R4C4 {1, 8}, R4C5 {2, 8}, and no other cell contains 8 as a candidate. The box has only one location for 8, so place 8 at one of those cells only if the row checks identify which location survives. If R4 already contains 8 elsewhere, both notes would be stale and must be corrected before placing anything.

A cleaner hidden-single example is this: a box has three empty cells, with candidate sets {1, 3}, {2, 3}, and {2, 5}. Digit 5 appears in only the third cell, so that cell receives 5 even though its candidate set contains more than one number initially.

After every placement, repeat the update. In a real puzzle, the removal of 6 might turn a neighboring {4, 6} into {4}, while the hidden 5 might remove 5 from a row and expose another single. That is how Sudoku works in practice: each confirmed digit changes the next question.

Pencil marks describe the current state of a puzzle; they never replace the row, column, and box checks.

## What online Sudoku difficulty levels usually change

Online Sudoku difficulty levels describe the solving path selected by a site, not one universal international scale. Labels such as Easy, Medium, Hard, and Expert can relate to clue distribution, the amount of direct information, or the deductions needed after the opening scan.

Easy Sudoku puzzles often provide many direct singles. Medium puzzles commonly require more candidate tracking and hidden singles. Hard and Expert puzzles can require locked candidates or other patterns. Those descriptions are practical guidance, not fixed promises about solving time or one shared scoring system.

Formal competition puzzles follow their own instructions and standards, as the [World Puzzle Federation material](https://gp.worldpuzzle.org/content/competition-puzzles-156) shows. Casual online labels don’t automatically use those standards.

| Level | Useful practice target | What to try first |
| --- | --- | --- |
| Easy | Learn the three unit checks | Direct singles |
| Medium | Maintain accurate candidates | Singles and hidden singles |
| Hard | Track interactions between units | Locked candidates |
| Expert | Handle longer deduction chains | Careful candidate analysis |

Choose a level based on the next skill you want to practice. If Easy puzzles still leave many uncertain cells, stay there until row, column, and box scans feel automatic.

## How to play Sudoku online without losing the logic

Online Sudoku removes the need to draw a grid, but it can also make random clicking tempting. Keep the same reasoning routine you would use with a pencil.

1. Select a suitable level, such as Easy for a first puzzle.
2. Scan the starting clues for missing digits and direct singles.
3. Enter only confirmed numbers.
4. Use notes for candidates that passed all three checks.
5. Pause before using any available hint or undo control and identify the deduction you missed.

SudokuUnlimited.com offers free web Sudoku puzzles across Easy to Expert levels, so you can start with a beginner-friendly board and move upward as the deductions become familiar. The site also lists Daily, Solver, and Killer Sudoku options, but standard Sudoku practice should come first if the three basic rules still feel new. For a single entry point to those levels and formats, see [Sudoku brain game: how to play free Sudoku online](/guides/sudoku-brain-game).

Don’t assume an online board’s interface will maintain your notes or explain every move unless the site confirms those features. The logic belongs to the puzzle, not the button you press.

## Mistakes that make Sudoku seem harder than it is

Most early errors break one of the three Sudoku grid rules or leave old notes in place. Spotting the error becomes easier when you trace the exact unit involved.

- **Forgetting the box:** A digit fits the row and column but already appears in the 3x3 box. Remove it before placing.
- **Placing a likely number:** “It looks right” is not a deduction. Wait until the cell has one candidate or the unit has one legal location for the digit.
- **Leaving stale pencil marks:** A note that was valid before a placement can become impossible afterward. Update connected notes immediately.
- **Guessing too early:** A wrong guess can create several later contradictions, making the first error hard to find.

Suppose you place 4 because it fits the row, then later discover two 4s in the same box. Undo the unsupported placement, rebuild candidates in that row, column, and box, and scan again for singles. This recovery method is faster than trying to repair every consequence of the guess.

## When not to guess in Sudoku

Deduction should be your default, but a blind guess is especially unhelpful in these situations:

- You haven’t checked the target cell’s 3x3 box.
- Several pencil marks are stale or incomplete.
- A row, column, or box still contains an obvious single.
- You can’t state which rule proves the proposed placement.

Some advanced solving methods use controlled assumptions, but beginners should postpone them. First restore accurate candidates and complete the basic scan. A puzzle that seems impossible may simply contain one forgotten exclusion. The repeatable order for that scan — singles, then pairs and locked candidates, then fish and short chains — is [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing).

## A practical practice plan for learning Sudoku

Start with Easy puzzles until the three unit scans become automatic. Then move up one level at a time rather than jumping straight to Expert and blaming yourself for a puzzle designed around deeper deductions.

1. Choose Easy and scan every row, column, and box for direct singles.
2. Record the reason for each placement: single possibility, hidden single, or locked candidate.
3. After each number, update the three affected units.
4. Move to Medium when you can maintain clean candidates without repeated contradictions.
5. Try Hard or Expert when you want to practice interactions between units.

These online sudoku difficulty levels work best as practice settings. They tell you which kind of solving experience to expect, not how skilled you are.

To answer how does sudoku work in one usable rule, make no placement without a stated reason. Choose a beginner puzzle, apply the row-column-box scan, and write down the deduction behind your first ten confirmed digits.

## Frequently asked questions

### Can Sudoku be solved without guessing?

Sudoku can often be solved without guessing by using candidate elimination, direct singles, hidden singles, and other logical deductions. A properly constructed standard puzzle is generally intended to have one solution, although arbitrary starting grids do not automatically guarantee uniqueness.

### What is the difference between a naked single and a hidden single in Sudoku?

A naked single is a cell with only one remaining candidate, such as {6}. A hidden single occurs when a digit has only one possible location within a row, column, or box, even though that cell’s candidate list contains other digits.

## References

- [Game rules](https://help.gnome.org/gnome-sudoku/rules.html)
- [The Math Behind Sudoku: Introduction to Sudoku](https://pi.math.cornell.edu/~mec/Summer2009/Mahmood/Intro.html)
- [The Math Behind Sudoku: Solving Strategy](https://pi.math.cornell.edu/~mec/Summer2009/Mahmood/Solve.html)
- [Taking Sudoku Seriously: The Math behind the World’s Most Popular Pencil Puzzle](https://old.maa.org/node/112203)
- [Competition Puzzles](https://gp.worldpuzzle.org/content/competition-puzzles-156)

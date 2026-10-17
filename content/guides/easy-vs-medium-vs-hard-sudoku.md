---
slug: "easy-vs-medium-vs-hard-sudoku"
page_type: "blog"
title: "Easy vs Medium vs Hard Sudoku: What the Difficulty Levels Mean"
meta_title: "Easy vs Medium vs Hard Sudoku: What the Levels Mean"
meta_description: "What Easy, Medium, and Hard Sudoku mean on Sudoku Unlimited: the same rules, different removal targets, and which techniques each level starts to need."
primary_keyword: "easy vs medium vs hard sudoku"
secondary_keywords: ["sudoku difficulty levels", "sudoku easy medium hard", "what sudoku levels mean"]
word_count: 1193
status: "published"
brief: "easy-vs-medium-vs-hard-sudoku"
---

Easy, Medium, and Hard Sudoku are the same puzzle with fewer givens as the name goes up. Every level asks you to place the digits 1–9 so each row, each column, and each 3×3 box contains them once. The level name tells you how hard the generator tried to make the opening, and which solving ideas tend to show up before the grid is finished.

Sudoku Unlimited also has Expert, Master, and Extreme. They continue the same scale. This page is what those names refer to on this site, and which technique guide matches the point where a level usually stalls. The first placements themselves are in [how to solve Sudoku step by step](/guides/how-to-solve-sudoku-step-by-step). The rules under every level are in [how Sudoku works](/guides/the-complete-guide-to-how-sudoku-works).

## What the generator changes

A classic grid has 81 cells. The generator fills a completed grid, then tries to clear a fixed number of cells:

| Level | Cells the generator tries to clear |
| --- | --- |
| [Easy](/easy) | 30 |
| [Medium](/medium) | 40 |
| [Hard](/hard) | 50 |
| [Expert](/expert) | 55 |
| [Master](/master) | 60 |
| [Extreme](/extreme) | 65 |

If clearing a cell would leave more than one completed grid, that cell is restored and the generator tries a different cell. A published puzzle can therefore keep more givens than 81 minus the target. The target is the attempt. It is not a promise that every Easy grid shows exactly 51 givens, or that two Easy grids will take the same path.

The positions of the givens matter as much as the count. Two grids with a similar number of givens can force different techniques, because a digit’s last cell depends on where the other copies sit. The level name groups puzzles by that removal target.

## Easy

[Easy](/easy) aims to clear 30 cells, so most units still show several digits at the start. The useful work is scanning: find a row, column, or box with one blank, name the missing digit, and confirm the other two units. That loop is the whole of [how to solve Sudoku step by step](/guides/how-to-solve-sudoku-step-by-step).

You will also meet a [naked single](/guides/naked-singles): an empty cell whose own candidate list has fallen to one digit, even while neighboring cells are still empty. Notes help once a cell has two legal digits, and they are optional while the board is still full of one-blank units. Entering those digits is covered in [how to play Sudoku with numbers](/guides/how-do-you-play-sudoku-with-numbers).

Stay here until you can finish a grid by that scan. Printable copies are on [printable easy Sudoku](/printable/easy). A shorter alphabet is [4×4 kids Sudoku](/kids-sudoku/4x4).

## Medium

[Medium](/medium) aims to clear 40 cells. The one-blank units run out earlier. You still place singles first. The new events are a [hidden single](/guides/hidden-singles), a digit with one legal cell inside a unit that still looks busy, and a [naked pair](/guides/naked-pairs), two cells in one unit that share the same two candidates and nothing else.

Those two patterns are why Medium feels like a different puzzle even though the rules did not change. The scan from Easy still comes first. The pair is what you look for when the scan stops producing a placement. [5 ways to approach number puzzles like Sudoku](/guides/5-ways-to-approach-number-puzzles-like-sudoku) puts that order into a short routine. Paper copies are on [printable medium Sudoku](/printable/medium).

Move up from Easy when Easy grids are mostly one-blank units and you can explain a naked pair on a unit you have already marked. Drop back if Medium is a string of erased digits. Erasing means a candidate was deleted without a unit to name.

## Hard

[Hard](/hard) aims to clear 50 cells. Singles and pairs still do a large share of the work, and they stop being enough on their own. The patterns that show up next are about one digit locked to a line:

- A [pointing pair](/guides/pointing-pairs) (or triple) confines a digit to one row or column inside a single box, so the rest of that line, outside the box, loses the digit.
- [Box-line reduction](/guides/box-line-reduction) runs the other way. If every remaining cell for a digit on a line sits inside one box, the rest of that box loses the digit.

Neither pattern places a digit by itself. Each one deletes candidates so a single can appear on the next pass. The order is singles, then pairs, then these locks, as laid out in [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing). Sheets are on [printable hard Sudoku](/printable/hard).

## Expert, Master, and Extreme

The three names past Hard are the same generator with higher removal targets, 55, 60, and 65. The technique that becomes worth learning changes with them.

[Expert](/expert) is where a single digit locked across two rows and two columns, an [X-Wing](/guides/x-wing), starts to matter, and sometimes a [Swordfish](/guides/swordfish) across three. Clear singles, pairs, and pointing before you look for either fish. Printable expert sheets are on [printable expert Sudoku](/printable/expert).

[Master](/master) pushes the removal target to 60. After the fish, an [XY-Wing](/guides/xy-wing) is the short chain on this site’s technique list: three bivalue cells arranged so one digit can be deleted from cells that see both wings.

[Extreme](/extreme) aims to clear 65 cells. The earlier techniques show up in combination, and the first placement takes more looking. The survey past the individual technique pages is [9 advanced Sudoku techniques](/guides/9-advanced-sudoku-techniques-that-experienced-solvers-use).

Killer Sudoku reuses these six names under [Killer Sudoku](/killer-sudoku), with cage sums added. A Killer Easy puzzle is not the same opening as classic Easy. The classic levels on this page have no cages.

## Which level to open

Open [Easy](/easy) while the three-unit check is still something you have to remember. Open [Medium](/medium) when you want hidden singles and pairs while the grid still has a clear scan at the start. Open [Hard](/hard) when pairs are familiar and you want pointing and claiming to be the reason a single appears.

The [daily challenge](/daily) rotates through all six names on a fixed UTC date cycle, one shared grid per day. You do not pick the level. The rotation is the date.

If a grid at your usual level stalls, name the last technique you used, then open the next page in the no-guessing workflow. The level only told you how many cells the generator tried to clear.

## Frequently asked questions

### Do Easy, Medium, and Hard follow different rules?

They follow one rule set. Each row, column, and box contains 1–9 once. The generator’s removal target is 30, 40, or 50 cells, and a removal that would create a second solution is undone.

### Why can one Easy puzzle feel harder than another Easy puzzle?

The uniqueness check can keep extra givens, and the positions of the givens decide which technique appears first. Two puzzles with the same target can ask for a different pattern before the first pair shows up.

### Should I skip Medium?

Learn the Easy scan until one-blank units are routine, and until you can mark a naked pair without erasing it a minute later. Medium is the level that introduces that pair while plenty of singles remain. Hard assumes you already use it.

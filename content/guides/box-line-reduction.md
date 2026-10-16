---
slug: "box-line-reduction"
page_type: "blog"
title: "Box-Line Reduction"
meta_title: "Box-Line Reduction (Claiming)"
meta_description: "Box-line reduction, or claiming, locks a Sudoku digit on one row or column into a single box. See a worked example, how to spot it, and how it differs from pointing."
primary_keyword: "box line reduction sudoku"
secondary_keywords: ["claiming sudoku", "locked candidates", "box line reduction"]
word_count: 1182
status: "published"
brief: "box-line-reduction"
---

Box-line reduction locks a digit on one row or column into a single box. Solvers also call it claiming: the line has claimed that box as the place its digit must go. You then delete the digit from the rest of the box, off the line. You do not delete it from the rest of the line. Those other line cells are not homes.

This is the partner of a [pointing pair](/guides/pointing-pairs). Pointing starts in the box and clears the line outside. Claiming starts on the line and clears the box off the line. Both sit after pairs, and before fish, in [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing).

## What claiming is

List every cell in one row where a digit can still go. If every cell on that list sits inside the same box, the row’s digit is trapped in that box. The box must not also place the digit in one of its other two rows. Those off-line cells lose the candidate.

The column version is the same. If every remaining 5 in column 7 lies in rows 1–3, delete 5 from the other columns of that box, still inside rows 1–3. Two homes or three are enough. One home is a [hidden single](/guides/hidden-singles), and you place the digit. The claim is only as wide as the box. You cannot clear a second box “while you are here.”

## When it applies

Look when a digit’s notes on a line have retreated into one band of three cells. That is common on [medium](/medium) puzzles and a staple of [hard](/hard) ones. Place singles on the line first, because a single changes the homes you are about to count. Check a claim before an [X-Wing](/guides/x-wing) or a [Swordfish](/guides/swordfish). Those fish are claims stretched across several lines.

If it is easier to see from inside the box — all the box’s homes already lie on this line — you have pointing, and the deletion runs the other way. “Homes in the box” and “homes on the line” are different lists. Only the list you verified tells you which cells to edit.

## How to spot it

Choose a digit this row does not yet contain. Cross out filled cells and cells whose column or box already contains the digit. If the remaining columns all fall inside 1–3, or 4–6, or 7–9, the matching box is claimed. Delete the digit from the other two rows of that box. Repeat down the columns when the row pass goes quiet.

The line’s cells outside the box should not still show the digit. If they do, there is no claim, and you must not delete anything inside the box. In notes, a glance is enough: if row 8 shows 5 only in columns 7–9, box 9 owns that 5. Then inspect rows 7 and 9 inside columns 7–9.

## Worked example

Row 8 places 1, 2, 3, 6, 7, and 8. Its empty cells are r8c7 {4, 5}, r8c8 {4, 9}, and r8c9 {5, 9}. Candidate 5 appears only in r8c7 and r8c9, both in box 9 (rows 7–9, columns 7–9). Row 8 has claimed box 9 for 5.

Inside the rest of the box, 5 is still written in r7c8 {5, 6} and r9c7 {3, 5}. Both lose 5. r7c8 becomes {6}. r9c7 becomes {3}.

```grid
caption: Box-line reduction. Row 8 claims box 9 for candidate 5. r7c8 and r9c7 lose 5.
highlight: r8c7 r8c9
eliminate: r7c8 r9c7
r7: . . . . . . 2 {5,6} 4
r8: 1 2 3 6 7 8 {4,5} {4,9} {5,9}
r9: . . . . . . {3,5} 7 {3,6}
```

Row 8 is drawn in full, so you can see that 5 has no home in columns 1–6. The dot cells are outside box 9. They are not targets. r8c8 sits in the claimed box and on the claiming line, and it does not contain 5. That is allowed. A claim does not require every cell of the band to hold the digit. It requires every cell that does hold the digit to sit inside the box.

Leave {4, 5} and {5, 9} on row 8. The row still needs a 5 there. Placing it in a favorite cell is the guess this technique avoids.

## Why the off-line cells are impossible

Row 8 must contain one 5, and every surviving address is in box 9. The box and the row will share that 5. A box cannot contain two 5s, so a 5 in row 7 or row 9 inside box 9 cannot survive, whichever of r8c7 or r8c9 is the true cell. The argument does not use row 7’s other cells. Column logic is a separate scan.

## Common mistakes

Reversing the deletion is the main one. Rose cells are off the line, inside the box. Cells on the line but outside the box are not cleared by a claim. If the digit is still sitting there, you do not have a claim. Pointing is the pattern that clears the outside of the line, and only when the box list is confined to the line.

Two candidates on the line are enough. A gap, such as 5 in columns 7 and 9 but not 8, is still one box. “Most of the digits are in the box” is not a claim. An outside home can be the true cell. Also check the band: row 8’s right-hand three cells are box 9, not box 8. Boxes 7, 8, and 9 are the bottom band.

Then place the single you just made. r7c8 becoming {6} is a placement. Hunting the next claim while {6} sits as a note skips the result.

Sometimes both descriptions are true at once: every box-home is on the line, and every line-home is in the box. Do both deletions. Their target zones do not overlap. The example above is claiming only, because box 9 still has 5s off row 8 until you delete them.

## Frequently asked questions

### Is box-line reduction the same as a pointing pair?

No. Pointing locks the box’s digit onto a line and clears the rest of the line. Claiming locks the line’s digit into a box and clears the rest of the box. The cells you erase are different.

### Can a claim run down a column?

Yes. If a digit’s remaining cells in one column all sit in the same box, clear that digit from the rest of the box. The worked example uses a row because a row is easier to read in one strip.

### What is left on the line after the claim?

The original homes on the line stay. You have not chosen among them. You have only stopped the box from spending the same digit off the line. A later single decides which home survives.

## Related techniques

Keep [pointing pairs](/guides/pointing-pairs) beside this page until the direction is obvious. [Hidden singles](/guides/hidden-singles) are the one-home case. When one digit locks two or three lines at once, move to [X-Wing](/guides/x-wing) and [Swordfish](/guides/swordfish), in the order from [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing).

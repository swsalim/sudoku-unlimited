---
slug: "swordfish"
page_type: "blog"
title: "Swordfish"
meta_title: "Swordfish Sudoku Technique"
meta_description: "A Swordfish locks one Sudoku digit to three columns across three rows, or three rows across three columns. See a worked example, how to spot it, and common mistakes."
primary_keyword: "swordfish sudoku"
secondary_keywords: ["sudoku swordfish", "sudoku fish"]
word_count: 1213
status: "published"
brief: "swordfish"
---

A Swordfish is an [X-Wing](/guides/x-wing) with three lines instead of two. One digit is confined to the same three columns across three rows. Those rows must place the digit in three different columns among the three, so each column is used once. The digit comes out of those columns everywhere else. Swap rows and columns and you have the column-based Swordfish.

Empty corners are allowed. That is the difference beginners miss. Swordfish sits after locked candidates and X-Wing in [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing). Finned fish and Jellyfish stay in [9 advanced Sudoku techniques](/guides/9-advanced-sudoku-techniques-that-experienced-solvers-use).

## What a Swordfish is

For a row-based Swordfish on digit D you need three base rows and three cover columns. In each base row, every candidate D lies inside those columns. Each base row has at least two homes. A row with one home is a hidden single, and you should have placed it. Between them, the rows actually use all three columns. If they only used two, you are looking at an X-Wing, possibly with a spare row that does not belong.

Then remove D from the three cover columns in every row that is not a base row. A base row may use two of the columns and skip one. The hole is legal. What is not legal is a D in a fourth column of a base row. That extra home means the three columns do not cover the row.

## When it applies

Reach for a Swordfish when an X-Wing search on that digit has failed, and when [pointing pairs](/guides/pointing-pairs) and [box-line reduction](/guides/box-line-reduction) are not available either. This is an [expert](/expert) and [master](/master) tool. It applies to one digit. Three busy rows are not a Swordfish. Three rows where 4 is confined to columns 2, 6, and 9 are.

Do not add a third row to an X-Wing that already works, especially if that row still holds the digit in a fourth column. The X-Wing was the deletion. The extra row spoils the larger pattern and was never needed.

## How to spot it

List rows in which D appears two or three times, and write the column numbers. Search that list for three rows whose column sets all fit inside one three-column set. A row on columns 2 and 6 fits with a row on 6 and 9 and a row on 2, 6, and 9. The cover is {2, 6, 9}. A row that also uses column 8 does not fit. Do not drop the 8 to force it.

When a cover works, clear D from those three columns in the other rows. If no trio works, repeat the count with columns as the base. Write the sets down. A Swordfish held only in your head is easy to widen by one column. Holes are expected. In the example, row 8 does not use column 6. The definition asks each base row to stay inside the cover, not to fill every intersection.

## Worked example

Candidate 4 is confined like this: row 1 and row 5 each have 4 only in columns 2, 6, and 9. Row 8 has 4 only in columns 2 and 9. Column 6 of row 8 is the placed 3, a legal hole. The cover is columns 2, 6, and 9, and all three columns are used somewhere in the three rows.

r3c6 lists {2, 4} and r9c9 lists {1, 4}. Both sit in cover columns outside the base rows, so both lose 4. r3c6 becomes {2}. r9c9 becomes {1}.

```grid
caption: Swordfish on 4. Rows 1, 5, and 8 stay inside columns 2, 6, and 9. r3c6 and r9c9 lose 4.
highlight: r1c2 r1c6 r1c9 r5c2 r5c6 r5c9 r8c2 r8c9
eliminate: r3c6 r9c9
r1: 5 {4,8} 1 2 3 {4,6} 9 7 {4,8}
r3: . . . . . {2,4} . . .
r5: 6 {4,8} 2 1 7 {4,9} 5 3 {4,8}
r8: 1 {4,2} 5 6 9 3 7 {2,8} {4,8}
r9: . . . . . . . . {1,4}
```

Rows 1 and 5 still use column 6, so that cover column is real even though row 8 skips it. On a full grid you would clear every other 4 in columns 2, 6, and 9, not only the two rose cells. Corner notes may carry other digits. r1c2 can be 8 as well as 4. Swordfish does not ask the intersections to be naked singles.

## Why the three columns lose 4

Each base row must place a 4 in the cover, and no two of those rows can share a column. Three rows and three columns means every cover column is taken by one base row, even though you cannot yet name the matching. A 4 in column 6 outside the base rows collides with whichever base row is matched to column 6. The hole does not weaken this. Row 8 cannot be the row matched to column 6, so one of row 1 or row 5 is. A fourth column in any base row lets that row spend its 4 outside the cover and leaves a cover column unclaimed.

## Common mistakes

Refusing the pattern because a corner is empty is the usual miss. Check the column sets, not the silhouette of a solid block. Dropping an inconvenient candidate to force a cover is the dangerous miss. If row 8 also contained 4 in column 4, this cover would be false.

Delete 4 only from the cover columns outside the three rows. A 4 in a non-cover column of a non-base row is untouched. If two rows already form an X-Wing, take that deletion first. Mixed digits are not part of the fish: the 2 beside the 4 in r3c6 stays because it was the other candidate, not because Swordfish knows about 2.

An X-Wing is the same statement with two lines and no holes. Swordfish allows six to nine occupied intersections out of nine. If the three column sets in fact use only two columns, play the X-Wing. If one base row has a single home, play the hidden single. Jellyfish and finned Swordfish are easier to misread than the plain cover test on this page.

## Frequently asked questions

### Can a Swordfish have an empty corner?

Yes. Each base row needs two or three homes inside the three cover columns. Row 8 in the example uses two of the three columns. The missing intersection is not a broken fish.

### Does a Swordfish place any digit?

No. It proves each cover column contains the digit in one of the base rows, without saying which. A placement happens only if some cell is reduced to one candidate by the deletion.

### How is this different from three pointing pairs?

A pointing pair lives in one box. A Swordfish does not care which boxes the candidates occupy. If a pointing pair is available, do it first. The fish may then collapse into an X-Wing or a single, which is a better result.

## Related techniques

[X-Wing](/guides/x-wing) is the two-line fish to learn before this one. [Pointing pairs](/guides/pointing-pairs) and [box-line reduction](/guides/box-line-reduction) should already be done. [XY-Wing](/guides/xy-wing) is a three-digit pattern for the grid a fish does not crack. The order is in [how to solve Sudoku without guessing](/guides/solve-sudoku-without-guessing).

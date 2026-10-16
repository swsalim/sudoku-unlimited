export type GuideHeadingOffset = {
  id: string;
  /** Distance from the viewport top, in CSS pixels. */
  top: number;
};

/**
 * The heading that owns the reading position.
 *
 * A heading becomes active once its top crosses `line` (the scroll-margin
 * resting place, just under the sticky header). Headings that have not
 * reached that line yet stay inactive, including the first one.
 *
 * When the page is pinned to the bottom, a later heading can be unable to
 * reach `line`. In that case the heading closest to the line wins, so the
 * final section still highlights without stealing a heading that is already
 * sitting on the line.
 */
export function pickActiveGuideHeading(
  headings: GuideHeadingOffset[],
  line: number,
  atBottom: boolean,
): string | null {
  if (headings.length === 0) return null;

  let currentIndex = -1;
  for (let i = 0; i < headings.length; i++) {
    if (headings[i].top <= line) currentIndex = i;
    else break;
  }

  if (currentIndex < 0) return null;
  if (!atBottom || currentIndex === headings.length - 1) {
    return headings[currentIndex].id;
  }

  let best = currentIndex;
  let bestDistance = line - headings[currentIndex].top;
  for (let i = currentIndex + 1; i < headings.length; i++) {
    const distance = headings[i].top - line;
    if (distance < bestDistance) {
      best = i;
      bestDistance = distance;
    } else {
      break;
    }
  }

  return headings[best].id;
}

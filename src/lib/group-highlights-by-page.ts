import { GhostHighlight, Highlight } from "../types";

type GroupedHighlights = {
  [pageNumber: number]: Array<Highlight | GhostHighlight>;
};

const groupHighlightsByPage = (
  highlights: Array<Highlight | GhostHighlight | null>
): GroupedHighlights => {
  const grouped: GroupedHighlights = {};

  for (const highlight of highlights) {
    if (!highlight) {
      continue;
    }

    // Collect all page numbers that the highlight spans
    // And add that highlight to keys corresponding to all those page numbers (also filtering out any rects from other pages)
    // Use Set to avoid adding copy of highlight for each rect
    const pageNumbersSet = new Set<number>();
    pageNumbersSet.add(highlight.position.boundingRect.pageNumber);
    for (const rect of highlight.position.rects) {
      pageNumbersSet.add(rect.pageNumber || 0);
    }
    const pageNumbers = Array.from(pageNumbersSet);

    for (const pageNumber of pageNumbers) {
      grouped[pageNumber] ||= [];

      const pageSpecificHighlight = {
        ...highlight,
        position: {
          ...highlight.position,
          rects: highlight.position.rects.filter(
            (rect) => pageNumber === rect.pageNumber
          )
        }
      };
      grouped[pageNumber].push(pageSpecificHighlight);
    }
  }

  console.log('grouped highlights', grouped);
  return grouped;
};


export default groupHighlightsByPage;

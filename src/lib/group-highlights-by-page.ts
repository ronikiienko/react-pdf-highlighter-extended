import { GhostHighlight, Highlight } from "../types";

type GroupedHighlights = {
  [pageNumber: number]: Array<Highlight | GhostHighlight>;
};

const groupHighlightsByPage = (
  highlights: Array<Highlight | GhostHighlight | null>,
): GroupedHighlights => {
  const grouped: GroupedHighlights = {};

  for (const highlight of highlights) {
    if (!highlight) {
      continue;
    }
    const pageNumbers = [
      highlight.position.boundingRect.pageNumber,
      ...highlight.position.rects.map((rect) => rect.pageNumber || 0),
    ];
    for (const pageNumber of pageNumbers) {
      grouped[pageNumber] ||= [];

      const pageSpecificHighlight = {
        ...highlight,
        position: {
          ...highlight.position,
          rects: highlight.position.rects.filter(
            (rect) => pageNumber === rect.pageNumber,
          ),
        },
      };
      grouped[pageNumber].push(pageSpecificHighlight);
    }
  }

  return grouped;
}


export default groupHighlightsByPage;

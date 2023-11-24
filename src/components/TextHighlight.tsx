import React, { CSSProperties, MouseEvent } from "react";

import "../style/TextHighlight.css";

import type { ViewportPosition } from "../types.js";

interface TextHighlightProps {
  position: ViewportPosition;
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;

  /** Indicates whether the component is autoscrolled into view. */
  isScrolledTo: boolean;

  // TODO: DOC
  onContextMenu?: (event: MouseEvent<HTMLDivElement>) => void;

  style?: CSSProperties;
}

/**
 * A component for displaying a highlighted text area
 */
const TextHighlight = ({
  position,
  onClick,
  onMouseOver,
  onMouseOut,
  isScrolledTo,
  onContextMenu,
  style,
}: TextHighlightProps) => {
  const highlightClass = isScrolledTo ? "TextHighlight--scrolledTo" : "";
  const { rects } = position;

  return (
    <div
      className={`TextHighlight ${highlightClass}`}
      onContextMenu={onContextMenu}
    >
      <div className="TextHighlight__parts">
        {rects.map((rect, index) => (
          <div
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onClick={onClick}
            key={index}
            style={{ ...rect, ...style }}
            className={`TextHighlight__part`}
          />
        ))}
      </div>
    </div>
  );
};

export default TextHighlight;

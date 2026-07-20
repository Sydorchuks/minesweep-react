import { type RefObject, useCallback, useEffect, useState } from "react";

interface BoardMetricsRefs {
  boardFrameRef: RefObject<HTMLElement>;
  consoleRef: RefObject<HTMLElement>;
  shellRef: RefObject<HTMLElement>;
}

const getMaxCellSize = (viewportWidth: number, columns: number): number => {
  if (viewportWidth >= 2200) {
    if (columns <= 9) {
      return 64;
    }

    if (columns <= 16) {
      return 56;
    }

    return 48;
  }

  if (viewportWidth >= 1600) {
    if (columns <= 9) {
      return 56;
    }

    if (columns <= 16) {
      return 50;
    }

    return 44;
  }

  if (viewportWidth >= 1200) {
    if (columns <= 9) {
      return 46;
    }

    if (columns <= 16) {
      return 42;
    }

    return 38;
  }

  return 36;
};

export const useBoardMetrics = (
  columns: number,
  zoom: number,
  { boardFrameRef, consoleRef, shellRef }: BoardMetricsRefs
) => {
  const [cellSize, setCellSize] = useState(32);
  const [frameWidth, setFrameWidth] = useState<string>("100%");

  const measure = useCallback(() => {
    const frame = boardFrameRef.current;
    const shell = shellRef.current;
    const consoleElement = consoleRef.current;

    if (!frame || !shell) {
      return;
    }

    const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
    const isPhone = viewportWidth <= 480;
    const shellWidth = shell.clientWidth || viewportWidth;
    const consoleWidth = consoleElement?.getBoundingClientRect().width ?? 760;
    const gap = window.matchMedia("(max-width: 640px)").matches ? 3 : 4;
    const boardPadding = window.matchMedia("(max-width: 640px)").matches ? 6 : 8;
    const frameStyle = getComputedStyle(frame);
    const framePadding =
      Number.parseFloat(frameStyle.paddingLeft) + Number.parseFloat(frameStyle.paddingRight);
    const frameBorder =
      Number.parseFloat(frameStyle.borderLeftWidth) + Number.parseFloat(frameStyle.borderRightWidth);
    const availableWidth = Math.max(180, shellWidth - framePadding - frameBorder);
    const availableForCells = availableWidth - boardPadding * 2 - gap * (columns - 1);
    const fittedSize = Math.floor(availableForCells / columns);
    const maxCellSize = isPhone ? 30 : getMaxCellSize(viewportWidth, columns);
    const baseSize = Math.max(18, Math.min(maxCellSize, fittedSize));
    const nextCellSize = Math.max(16, Math.round(baseSize * zoom));
    const boardWidth = columns * nextCellSize + gap * (columns - 1) + boardPadding * 2;

    setCellSize(nextCellSize);
    setFrameWidth(
      isPhone
        ? "100%"
        : `${Math.round(Math.min(shellWidth, Math.max(consoleWidth, boardWidth + framePadding + frameBorder)))}px`
    );
  }, [boardFrameRef, columns, consoleRef, shellRef, zoom]);

  useEffect(() => {
    measure();
    const onResize = () => window.requestAnimationFrame(measure);
    const resizeObserver = new ResizeObserver(onResize);

    window.addEventListener("resize", onResize);
    resizeObserver.observe(document.body);
    if (boardFrameRef.current) {
      resizeObserver.observe(boardFrameRef.current);
    }
    if (consoleRef.current) {
      resizeObserver.observe(consoleRef.current);
    }
    if (shellRef.current) {
      resizeObserver.observe(shellRef.current);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();
    };
  }, [boardFrameRef, consoleRef, measure, shellRef]);

  return { cellSize, frameWidth };
};

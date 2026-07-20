import { useEffect, useState } from "react";

const getWindowWidth = () =>
  typeof window === "undefined" ? 1200 : document.documentElement.clientWidth || window.innerWidth;

const getBaseCellSize = (columns: number, width: number) => {
  if (width >= 2200) {
    if (columns <= 9) {
      return 64;
    }

    if (columns <= 16) {
      return 56;
    }

    return 48;
  }

  if (width >= 1600) {
    if (columns <= 9) {
      return 56;
    }

    if (columns <= 16) {
      return 50;
    }

    return 44;
  }

  if (width >= 1200) {
    if (columns <= 9) {
      return 46;
    }

    if (columns <= 16) {
      return 42;
    }

    return 38;
  }

  if (width <= 480 && columns <= 9) {
    return 28;
  }

  return 32;
};

const getFramePadding = (width: number) => {
  if (width <= 360) {
    return 6;
  }

  if (width <= 480) {
    return 8;
  }

  if (width <= 640) {
    return 10;
  }

  if (width >= 2200) {
    return 30;
  }

  if (width >= 1600) {
    return 26;
  }

  return Math.min(22, Math.max(12, width * 0.024));
};

const getBoardPadding = (width: number) => {
  if (width <= 480) {
    return 5;
  }

  if (width <= 640) {
    return 6;
  }

  return 8;
};

export const useBoardSize = (columns: number, zoom: number) => {
  const [width, setWidth] = useState(getWindowWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(getWindowWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cellSize = Math.round(getBaseCellSize(columns, width) * zoom);
  const gap = width <= 640 ? 3 : 4;
  const boardPadding = getBoardPadding(width);
  const framePadding = getFramePadding(width);
  const boardWidth =
    columns * cellSize + (columns - 1) * gap + boardPadding * 2 + framePadding * 2 + 2;

  return {
    cellSize,
    width: Math.round(boardWidth)
  };
};

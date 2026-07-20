import type { GameStatus } from "../domain/models";

export const uiText = {
  dark: "Dark",
  light: "Light",
  switchTheme: "Switch light theme",
  title: "Minesweeper",
  gamePanel: "Game panel",
  level: "Level",
  beginner: "Beginner 9x9",
  intermediate: "Intermediate 16x16",
  expert: "Expert 30x16",
  zoom: "Zoom",
  minesLeft: "Mines left",
  mines: "mines",
  newGame: "new game",
  newGameLabel: "New game",
  gameTime: "Game time",
  seconds: "seconds",
  gameZone: "Game zone",
  board: "Minesweeper board",
  hint: "Left click to reveal a cell - Right click to place a flag",
  cell: "Cell",
  devShowMines: "Show mines",
  resultDialog: "Game result",
  playAgain: "Play again"
};

export const statusMessages: Record<GameStatus, string> = {
  ready: "Open the first cell",
  playing: "Game in progress",
  won: "Victory!",
  lost: "Boom. Try again"
};

export const faceByStatus: Record<GameStatus, string> = {
  ready: ":)",
  playing: ":)",
  won: "B)",
  lost: "X"
};

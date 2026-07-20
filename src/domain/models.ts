export type DifficultyKey = "beginner" | "intermediate" | "expert";

export type GameStatus = "ready" | "playing" | "won" | "lost";

export interface BoardConfig {
  rows: number;
  columns: number;
  mines: number;
}

export interface Position {
  row: number;
  column: number;
}

export const DIFFICULTIES: Record<DifficultyKey, BoardConfig> = {
  beginner: { rows: 9, columns: 9, mines: 10 },
  intermediate: { rows: 16, columns: 16, mines: 40 },
  expert: { rows: 16, columns: 30, mines: 99 }
};

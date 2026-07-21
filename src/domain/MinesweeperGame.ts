import { Board } from "./Board";
import type { BoardConfig, GameStatus, Position } from "./models";

type GameListener = () => void;

export class MinesweeperGame {
  public board: Board;
  public status: GameStatus = "ready";
  private hasPlacedMines = false;
  private listeners = new Set<GameListener>();

  constructor(private readonly config: BoardConfig) {
    this.board = new Board(config);
  }

  subscribe(listener: GameListener): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  reveal(position: Position): void {
    if (this.isFinished()) {
      return;
    }

    if (!this.hasPlacedMines) {
      this.board.placeMines(position);
      this.hasPlacedMines = true;
      this.status = "playing";
    }

    const cell = this.board.getCell(position);
    if (cell.hasMine && !cell.isFlagged) {
      cell.reveal();
      this.board.revealAllMines();
      this.status = "lost";
      this.notify();
      return;
    }

    this.board.reveal(position);

    if (this.board.hasWon()) {
      this.status = "won";
    }

    this.notify();
  }

  toggleFlag(position: Position): void {
    if (this.isFinished()) {
      return;
    }

    const cell = this.board.getCell(position);
    if (!cell.isFlagged && this.board.countFlags() >= this.config.mines) {
      return;
    }

    this.board.toggleFlag(position);
    this.notify();
  }

  getMinesLeft(): number {
    return this.config.mines - this.board.countFlags();
  }

  private isFinished(): boolean {
    return this.status === "won" || this.status === "lost";
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }
}

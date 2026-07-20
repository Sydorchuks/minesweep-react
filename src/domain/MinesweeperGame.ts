import { Board } from "./Board";
import type { BoardConfig, GameStatus, Position } from "./models";

export class MinesweeperGame {
  public board: Board;
  public status: GameStatus = "ready";
  private hasPlacedMines = false;

  constructor(private readonly config: BoardConfig) {
    this.board = new Board(config);
  }

  reveal(position: Position): void {
    if (this.status === "won" || this.status === "lost") {
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
      return;
    }

    this.board.reveal(position);

    if (this.board.hasWon()) {
      this.status = "won";
    }
  }

  toggleFlag(position: Position): void {
    if (this.status === "won" || this.status === "lost") {
      return;
    }

    this.board.toggleFlag(position);
  }

  getMinesLeft(): number {
    return this.config.mines - this.board.countFlags();
  }
}

import type { Position } from "./models";

export class Cell {
  public isRevealed = false;
  public isFlagged = false;
  public adjacentMines = 0;

  constructor(
    public readonly position: Position,
    public hasMine = false
  ) {}

  reveal(): void {
    if (!this.isFlagged) {
      this.isRevealed = true;
    }
  }

  toggleFlag(): void {
    if (!this.isRevealed) {
      this.isFlagged = !this.isFlagged;
    }
  }
}

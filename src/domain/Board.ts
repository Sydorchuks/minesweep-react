import { Cell } from "./Cell";
import { Mine } from "./Mine";
import type { BoardConfig, Position } from "./models";

export class Board {
  private readonly cells: Cell[][];
  private mines: Mine[] = [];

  constructor(private readonly config: BoardConfig) {
    this.cells = this.createCells();
  }

  get rows(): number {
    return this.config.rows;
  }

  get columns(): number {
    return this.config.columns;
  }

  get mineCount(): number {
    return this.config.mines;
  }

  getCells(): Cell[][] {
    return this.cells;
  }

  getCell(position: Position): Cell {
    return this.cells[position.row][position.column];
  }

  placeMines(safePosition: Position): void {
    const safeKey = this.key(safePosition);

    const available: Position[] = [];
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        const position = { row, column };
        if (this.key(position) !== safeKey) {
          available.push(position);
        }
      }
    }

    for (let index = 0; index < this.mineCount && available.length > 0; index++) {
      const randomIndex = Math.floor(Math.random() * available.length);
      const minePosition = available[randomIndex];
      available[randomIndex] = available[available.length - 1];
      available.pop();

      this.addMine(minePosition);
    }
  }

  reveal(position: Position): void {
    const start = this.getCell(position);
    if (start.isFlagged || start.isRevealed) {
      return;
    }

    const queue: Position[] = [position];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const current = queue.shift()!;
      const key = this.key(current);
      if (visited.has(key)) {
        continue;
      }

      visited.add(key);
      const cell = this.getCell(current);
      if (cell.isFlagged || cell.isRevealed) {
        continue;
      }

      cell.reveal();

      if (!cell.hasMine && cell.adjacentMines === 0) {
        queue.push(...this.getNeighbors(current));
      }
    }
  }

  revealAllMines(): void {
    for (const mine of this.mines) {
      this.getCell(mine.getPosition()).isRevealed = true;
    }
  }

  toggleFlag(position: Position): void {
    this.getCell(position).toggleFlag();
  }

  hasWon(): boolean {
    return this.cells.flat().every((cell) => cell.hasMine || cell.isRevealed);
  }

  countFlags(): number {
    return this.cells.flat().filter((cell) => cell.isFlagged).length;
  }

  private createCells(): Cell[][] {
    return Array.from({ length: this.config.rows }, (_, row) =>
      Array.from({ length: this.config.columns }, (_, column) => new Cell({ row, column }))
    );
  }

  private addMine(position: Position): void {
    this.mines.push(new Mine(position));
    this.getCell(position).hasMine = true;

    for (const neighbor of this.getNeighbors(position)) {
      this.getCell(neighbor).adjacentMines += 1;
    }
  }

  private getNeighbors(position: Position): Position[] {
    const neighbors: Position[] = [];

    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
      for (let columnOffset = -1; columnOffset <= 1; columnOffset++) {
        if (rowOffset === 0 && columnOffset === 0) {
          continue;
        }

        const neighbor = {
          row: position.row + rowOffset,
          column: position.column + columnOffset
        };

        if (this.isInside(neighbor)) {
          neighbors.push(neighbor);
        }
      }
    }

    return neighbors;
  }

  private isInside(position: Position): boolean {
    return (
      position.row >= 0 &&
      position.row < this.rows &&
      position.column >= 0 &&
      position.column < this.columns
    );
  }

  private key(position: Position): string {
    return `${position.row}:${position.column}`;
  }
}

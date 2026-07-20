import type { Position } from "./models";

export class Mine {
  constructor(private readonly position: Position) {}

  isAt(position: Position): boolean {
    return this.position.row === position.row && this.position.column === position.column;
  }

  getPosition(): Position {
    return { ...this.position };
  }
}

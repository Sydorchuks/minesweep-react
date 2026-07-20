import type { Position } from "./models";

export class Mine {
  constructor(private readonly position: Position) {}

  getPosition(): Position {
    return { ...this.position };
  }
}

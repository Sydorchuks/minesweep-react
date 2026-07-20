import type { CSSProperties } from "react";
import { uiText } from "../../constants/uiText";
import type { Cell } from "../../domain/Cell";
import type { Position } from "../../domain/models";
import { CellButton } from "../CellButton/CellButton";
import "./BoardView.css";

interface BoardViewProps {
  cells: Cell[][];
  cellSize: number;
  columns: number;
  onFlag: (position: Position) => void;
  onReveal: (position: Position) => void;
  showMines: boolean;
}

export const BoardView = ({
  cells,
  cellSize,
  columns,
  onFlag,
  onReveal,
  showMines
}: BoardViewProps) => (
  <section id="board-frame" className="board-frame" aria-label={uiText.gameZone}>
    <section
      className="board"
      aria-label={uiText.board}
      style={
        {
          "--cell-size": `${cellSize}px`,
          "--columns": columns
        } as CSSProperties
      }
    >
      {cells.flat().map((cell) => (
        <CellButton
          cell={cell}
          key={`${cell.position.row}:${cell.position.column}`}
          onFlag={onFlag}
          onReveal={onReveal}
          showMine={showMines}
        />
      ))}
    </section>
  </section>
);

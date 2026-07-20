import { uiText } from "../../constants/uiText";
import type { Cell } from "../../domain/Cell";
import type { Position } from "../../domain/models";
import "./CellButton.css";

interface CellButtonProps {
  cell: Cell;
  onFlag: (position: Position) => void;
  onReveal: (position: Position) => void;
  showMine: boolean;
}

export const CellButton = ({ cell, onFlag, onReveal, showMine }: CellButtonProps) => {
  const classes = ["cell"];
  let content = "";
  let value: number | undefined;

  if (cell.isRevealed) {
    classes.push("revealed");
    if (cell.hasMine) {
      classes.push("mine");
      content = "*";
    } else if (cell.adjacentMines > 0) {
      content = String(cell.adjacentMines);
      value = cell.adjacentMines;
    }
  } else if (cell.isFlagged) {
    classes.push("flagged");
    content = "!";
  }

  if (showMine && cell.hasMine && !cell.isRevealed) {
    classes.push("debug-mine");
  }

  return (
    <button
      aria-label={`${uiText.cell} ${cell.position.row + 1}, ${cell.position.column + 1}`}
      className={classes.join(" ")}
      data-value={value}
      onClick={() => onReveal(cell.position)}
      onContextMenu={(event) => {
        event.preventDefault();
        onFlag(cell.position);
      }}
      type="button"
    >
      {content}
    </button>
  );
};

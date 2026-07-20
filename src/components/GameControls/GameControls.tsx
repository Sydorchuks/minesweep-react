import { faceByStatus, uiText } from "../../constants/uiText";
import type { DifficultyKey, GameStatus } from "../../domain/models";
import { formatCounter } from "../../utils/formatCounter";
import "./GameControls.css";

interface GameControlsProps {
  difficulty: DifficultyKey;
  elapsedSeconds: number;
  minesLeft: number;
  status: GameStatus;
  zoom: number;
  onDifficultyChange: (difficulty: DifficultyKey) => void;
  onReset: () => void;
  onZoomChange: (zoom: number) => void;
}

export const GameControls = ({
  difficulty,
  elapsedSeconds,
  minesLeft,
  status,
  zoom,
  onDifficultyChange,
  onReset,
  onZoomChange
}: GameControlsProps) => (
  <section className="console" aria-label={uiText.gamePanel}>
    <label className="level-control">
      <span>{uiText.level}</span>
      <select
        onChange={(event) => onDifficultyChange(event.target.value as DifficultyKey)}
        value={difficulty}
      >
        <option value="beginner">{uiText.beginner}</option>
        <option value="intermediate">{uiText.intermediate}</option>
        <option value="expert">{uiText.expert}</option>
      </select>
    </label>

    <label className="zoom-control">
      <span>{uiText.zoom}</span>
      <input
        max="150"
        min="50"
        onChange={(event) => onZoomChange(Number(event.target.value) / 100)}
        step="10"
        type="range"
        value={Math.round(zoom * 100)}
      />
      <strong>{Math.round(zoom * 100)}%</strong>
    </label>

    <div className="counter" aria-label={uiText.minesLeft}>
      <span className="lcd">{formatCounter(minesLeft)}</span>
      <small>{uiText.mines}</small>
    </div>

    <button className={`face-button ${status}`} onClick={onReset} type="button" aria-label={uiText.newGameLabel}>
      <span className="face-icon" aria-hidden="true">
        {faceByStatus[status]}
      </span>
      <span>{uiText.newGame}</span>
    </button>

    <div className="counter" aria-label={uiText.gameTime}>
      <span className="lcd">{formatCounter(elapsedSeconds)}</span>
      <small>{uiText.seconds}</small>
    </div>
  </section>
);

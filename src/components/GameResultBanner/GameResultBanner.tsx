import { statusMessages, uiText } from "../../constants/uiText";
import type { GameStatus } from "../../domain/models";
import { formatCounter } from "../../utils/formatCounter";
import "./GameResultBanner.css";

interface GameResultBannerProps {
  elapsedSeconds: number;
  minesLeft: number;
  onReset: () => void;
  status: Extract<GameStatus, "won" | "lost">;
}

const resultCopy = {
  won: {
    icon: "WIN",
    title: statusMessages.won,
    subtitle: "Every safe cell is open.",
    tone: "success"
  },
  lost: {
    icon: "!",
    title: "You hit a mine",
    subtitle: "Try again and take it slower.",
    tone: "danger"
  }
} as const;

export const GameResultBanner = ({
  elapsedSeconds,
  minesLeft,
  onReset,
  status
}: GameResultBannerProps) => {
  const copy = resultCopy[status];

  return (
    <div className="result-backdrop" role="presentation">
      <section
        className={`result-banner ${copy.tone}`}
        aria-label={uiText.resultDialog}
        aria-live="polite"
        aria-modal="true"
        role="dialog"
      >
        <div className="result-icon" aria-hidden="true">
          {copy.icon}
        </div>
        <h2>{copy.title}</h2>
        <p>{copy.subtitle}</p>

        <div className="result-stats">
          <div>
            <strong>{formatCounter(elapsedSeconds)}</strong>
            <span>{uiText.seconds}</span>
          </div>
          <div>
            <strong>{formatCounter(minesLeft)}</strong>
            <span>{uiText.mines}</span>
          </div>
        </div>

        <button className="result-action" onClick={onReset} type="button">
          {uiText.playAgain}
        </button>
      </section>
    </div>
  );
};

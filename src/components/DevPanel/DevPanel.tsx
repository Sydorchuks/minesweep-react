import { uiText } from "../../constants/uiText";
import "./DevPanel.css";

interface DevPanelProps {
  showMines: boolean;
  onShowMinesChange: (showMines: boolean) => void;
}

export const DevPanel = ({ showMines, onShowMinesChange }: DevPanelProps) => (
  <section className="dev-panel" aria-label="Dev mode">
    <span>DEV</span>
    <label className="dev-toggle">
      <input
        checked={showMines}
        onChange={(event) => onShowMinesChange(event.target.checked)}
        type="checkbox"
      />
      <span>{uiText.devShowMines}</span>
    </label>
  </section>
);

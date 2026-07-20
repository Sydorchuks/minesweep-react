import { uiText, statusMessages } from "../../constants/uiText";
import type { GameStatus } from "../../domain/models";
import "./Hero.css";

interface HeroProps {
  status: GameStatus;
  theme: "dark" | "light";
  onThemeChange: (theme: "dark" | "light") => void;
}

export const Hero = ({ status, theme, onThemeChange }: HeroProps) => (
  <header className="hero">
    <div className="theme-switch">
      <span>{uiText.dark}</span>
      <label className="switch" aria-label={uiText.switchTheme}>
        <input
          checked={theme === "light"}
          onChange={(event) => onThemeChange(event.target.checked ? "light" : "dark")}
          type="checkbox"
        />
        <span />
      </label>
      <span>{uiText.light}</span>
    </div>
    <h1>{uiText.title}</h1>
    <p>{statusMessages[status]}</p>
  </header>
);

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { BoardView } from "./components/BoardView/BoardView";
import { DevPanel } from "./components/DevPanel/DevPanel";
import { GameControls } from "./components/GameControls/GameControls";
import { GameResultBanner } from "./components/GameResultBanner/GameResultBanner";
import { Hero } from "./components/Hero/Hero";
import { uiText } from "./constants/uiText";
import { type DifficultyKey } from "./domain/models";
import { useBoardSize } from "./hooks/useBoardSize";
import { useElapsedSeconds } from "./hooks/useElapsedSeconds";
import { useMinesweeper } from "./hooks/useMinesweeper";
import "./App.css";

export const App = () => {
  const isDev = import.meta.env.DEV;
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [zoom, setZoom] = useState(1);
  const [showMines, setShowMines] = useState(false);
  const game = useMinesweeper();
  const elapsedSeconds = useElapsedSeconds(game.status);
  const boardSize = useBoardSize(game.columns, zoom);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const handleDifficultyChange = (difficulty: DifficultyKey) => {
    game.reset(difficulty);
  };
  const finishedStatus = game.status === "won" || game.status === "lost" ? game.status : null;

  return (
    <main className="shell">
      <Hero status={game.status} theme={theme} onThemeChange={setTheme} />

      <div className="game-area" style={{ "--game-width": `${boardSize.width}px` } as CSSProperties}>
        <GameControls
          difficulty={game.difficulty}
          elapsedSeconds={elapsedSeconds}
          minesLeft={game.minesLeft}
          onDifficultyChange={handleDifficultyChange}
          onReset={() => game.reset()}
          onZoomChange={setZoom}
          status={game.status}
          zoom={zoom}
        />

        {isDev && <DevPanel showMines={showMines} onShowMinesChange={setShowMines} />}

        <BoardView
          cells={game.cells}
          cellSize={boardSize.cellSize}
          columns={game.columns}
          onFlag={game.toggleFlag}
          onReveal={game.revealCell}
          showMines={isDev && showMines}
        />
      </div>

      <p className="hint">{uiText.hint}</p>

      {finishedStatus && (
        <GameResultBanner
          elapsedSeconds={elapsedSeconds}
          minesLeft={game.minesLeft}
          onReset={() => game.reset()}
          status={finishedStatus}
        />
      )}
    </main>
  );
};

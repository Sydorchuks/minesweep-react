import { useEffect, useRef, useState } from "react";
import { BoardView } from "./components/BoardView/BoardView";
import { DevPanel } from "./components/DevPanel/DevPanel";
import { GameControls } from "./components/GameControls/GameControls";
import { GameResultBanner } from "./components/GameResultBanner/GameResultBanner";
import { Hero } from "./components/Hero/Hero";
import { uiText } from "./constants/uiText";
import { type DifficultyKey } from "./domain/models";
import { useBoardMetrics } from "./hooks/useBoardMetrics";
import { useElapsedSeconds } from "./hooks/useElapsedSeconds";
import { useMinesweeper } from "./hooks/useMinesweeper";
import "./App.css";

export const App = () => {
  const isDev = import.meta.env.DEV;
  const shellRef = useRef<HTMLElement>(null);
  const consoleRef = useRef<HTMLElement>(null);
  const boardFrameRef = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [zoom, setZoom] = useState(1);
  const [showMines, setShowMines] = useState(false);
  const game = useMinesweeper();
  const elapsedSeconds = useElapsedSeconds(game.status, game.revision);
  const { cellSize, frameWidth } = useBoardMetrics(game.columns, zoom, {
    boardFrameRef,
    consoleRef,
    shellRef
  });

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const handleDifficultyChange = (difficulty: DifficultyKey) => {
    game.reset(difficulty);
  };
  const finishedStatus = game.status === "won" || game.status === "lost" ? game.status : null;

  return (
    <main className="shell" ref={shellRef}>
      <Hero status={game.status} theme={theme} onThemeChange={setTheme} />

      <GameControls
        consoleRef={consoleRef}
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
        boardFrameRef={boardFrameRef}
        cells={game.cells}
        cellSize={cellSize}
        columns={game.columns}
        frameWidth={frameWidth}
        onFlag={game.toggleFlag}
        onReveal={game.revealCell}
        showMines={isDev && showMines}
      />

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

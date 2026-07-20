import { useCallback, useMemo, useRef, useState } from "react";
import { MinesweeperGame } from "../domain/MinesweeperGame";
import { DIFFICULTIES, type DifficultyKey, type GameStatus, type Position } from "../domain/models";

const createGame = (difficulty: DifficultyKey): MinesweeperGame =>
  new MinesweeperGame(DIFFICULTIES[difficulty]);

export const useMinesweeper = (initialDifficulty: DifficultyKey = "beginner") => {
  const [difficulty, setDifficulty] = useState<DifficultyKey>(initialDifficulty);
  const [revision, setRevision] = useState(0);
  const gameRef = useRef<MinesweeperGame | null>(null);

  if (gameRef.current === null) {
    gameRef.current = createGame(initialDifficulty);
  }

  const forceRender = useCallback(() => {
    setRevision((current) => current + 1);
  }, []);

  const reset = useCallback(
    (nextDifficulty = difficulty) => {
      setDifficulty(nextDifficulty);
      gameRef.current = createGame(nextDifficulty);
      forceRender();
    },
    [difficulty, forceRender]
  );

  const revealCell = useCallback(
    (position: Position) => {
      gameRef.current!.reveal(position);
      forceRender();
    },
    [forceRender]
  );

  const toggleFlag = useCallback(
    (position: Position) => {
      gameRef.current!.toggleFlag(position);
      forceRender();
    },
    [forceRender]
  );

  return useMemo(() => {
    const game = gameRef.current!;
    const board = game.board;

    return {
      cells: board.getCells(),
      columns: board.columns,
      difficulty,
      minesLeft: game.getMinesLeft(),
      reset,
      revealCell,
      revision,
      rows: board.rows,
      status: game.status as GameStatus,
      toggleFlag
    };
  }, [difficulty, reset, revealCell, revision, toggleFlag]);
};

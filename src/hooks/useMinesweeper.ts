import { useCallback, useRef, useState } from "react";
import { MinesweeperGame } from "../domain/MinesweeperGame";
import { DIFFICULTIES, type DifficultyKey, type GameStatus, type Position } from "../domain/models";

const createGame = (difficulty: DifficultyKey): MinesweeperGame =>
  new MinesweeperGame(DIFFICULTIES[difficulty]);

const getGameState = (game: MinesweeperGame, difficulty: DifficultyKey) => {
  const board = game.board;

  return {
    cells: board.getCells(),
    columns: board.columns,
    difficulty,
    minesLeft: game.getMinesLeft(),
    status: game.status as GameStatus
  };
};

export const useMinesweeper = (initialDifficulty: DifficultyKey = "beginner") => {
  const [difficulty, setDifficulty] = useState<DifficultyKey>(initialDifficulty);
  const gameRef = useRef<MinesweeperGame | null>(null);

  if (gameRef.current === null) {
    gameRef.current = createGame(initialDifficulty);
  }

  const [gameState, setGameState] = useState(() => getGameState(gameRef.current!, initialDifficulty));

  const syncGameState = useCallback(() => {
    setGameState(getGameState(gameRef.current!, difficulty));
  }, [difficulty]);

  const reset = useCallback(
    (nextDifficulty = difficulty) => {
      const nextGame = createGame(nextDifficulty);

      setDifficulty(nextDifficulty);
      gameRef.current = nextGame;
      setGameState(getGameState(nextGame, nextDifficulty));
    },
    [difficulty]
  );

  const revealCell = useCallback(
    (position: Position) => {
      gameRef.current!.reveal(position);
      syncGameState();
    },
    [syncGameState]
  );

  const toggleFlag = useCallback(
    (position: Position) => {
      gameRef.current!.toggleFlag(position);
      syncGameState();
    },
    [syncGameState]
  );

  return {
    ...gameState,
    reset,
    revealCell,
    toggleFlag
  };
};

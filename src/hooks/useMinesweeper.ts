import { useCallback, useEffect, useState } from "react";
import { MinesweeperGame } from "../domain/MinesweeperGame";
import { DIFFICULTIES, type DifficultyKey, type GameStatus, type Position } from "../domain/models";

const createGame = (difficulty: DifficultyKey): MinesweeperGame =>
  new MinesweeperGame(difficulty, DIFFICULTIES[difficulty]);

const getGameState = (game: MinesweeperGame) => {
  const board = game.board;

  return {
    cells: board.getCells(),
    columns: board.columns,
    difficulty: game.difficulty,
    minesLeft: game.getMinesLeft(),
    status: game.status as GameStatus
  };
};

export const useMinesweeper = (initialDifficulty: DifficultyKey = "beginner") => {
  const [game, setGame] = useState(() => createGame(initialDifficulty));
  const [gameState, setGameState] = useState(() => getGameState(game));

  useEffect(() => {
    const updateGameState = () => {
      setGameState(getGameState(game));
    };

    game.subscribe(updateGameState);
    updateGameState();

    return () => {
      game.unsubscribe(updateGameState);
    };
  }, [game]);

  const reset = useCallback(
    (nextDifficulty = gameState.difficulty) => {
      const nextGame = createGame(nextDifficulty);

      setGame(nextGame);
      setGameState(getGameState(nextGame));
    },
    [gameState.difficulty]
  );

  const revealCell = useCallback(
    (position: Position) => {
      game.reveal(position);
    },
    [game]
  );

  const toggleFlag = useCallback(
    (position: Position) => {
      game.toggleFlag(position);
    },
    [game]
  );

  return {
    ...gameState,
    reset,
    revealCell,
    toggleFlag
  };
};

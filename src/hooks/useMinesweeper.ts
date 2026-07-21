import { useCallback, useEffect, useState } from "react";
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
  const [game, setGame] = useState(() => createGame(initialDifficulty));
  const [gameState, setGameState] = useState(() => getGameState(game, initialDifficulty));

  useEffect(() => {
    setGameState(getGameState(game, difficulty));

    return game.subscribe(() => {
      setGameState(getGameState(game, difficulty));
    });
  }, [difficulty, game]);

  const reset = useCallback(
    (nextDifficulty = difficulty) => {
      const nextGame = createGame(nextDifficulty);

      setDifficulty(nextDifficulty);
      setGame(nextGame);
      setGameState(getGameState(nextGame, nextDifficulty));
    },
    [difficulty]
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

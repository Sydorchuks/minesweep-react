import { useEffect, useState } from "react";
import type { GameStatus } from "../domain/models";

export const useElapsedSeconds = (status: GameStatus, revision: number): number => {
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (status === "ready") {
      setStartedAt(null);
      setSeconds(0);
      return;
    }

    if (status === "playing" && startedAt === null) {
      setStartedAt(Date.now());
    }
  }, [startedAt, status, revision]);

  useEffect(() => {
    if (status !== "playing" || startedAt === null) {
      return;
    }

    const update = () => setSeconds(Math.floor((Date.now() - startedAt) / 1000));
    update();
    const timerId = window.setInterval(update, 500);

    return () => window.clearInterval(timerId);
  }, [startedAt, status]);

  return seconds;
};

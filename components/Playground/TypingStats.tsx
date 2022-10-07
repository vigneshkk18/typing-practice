import React, { useContext, useEffect, useState } from "react";
import { apiToUrlMap, formatString } from "../../apiToUrlMap";
import { PlaygroundCtx } from "../../Context/PlaygroundContext";
import useFetch from "../../hooks/useFetch";
import { capitialize } from "../../utils/utils";
import { difficultyOptionsMap } from "./utils";
import { UserSessionCtx } from "../../Context/UserSessionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faGaugeHigh,
  faPlay,
  faSquareCheck,
  faStopwatch20,
} from "@fortawesome/free-solid-svg-icons";
import { DifficultyCtx } from "../../Context/DifficultyContext";

let isOnLoad = true;

const TypingStats = () => {
  const [loading, setLoading] = useState(false);
  const { typeStatus, setParaToType, replay } = useContext(PlaygroundCtx);
  const { difficulty, setDifficulty, difficultyOptions } =
    useContext(DifficultyCtx);
  const { stats, timeOver } = useContext(UserSessionCtx);
  const { makeRequest, cancelRequest } = useFetch();

  useEffect(() => {
    if (isOnLoad) {
      isOnLoad = false;
      return;
    }

    const timer = setTimeout(async () => {
      const reqUrl = formatString(apiToUrlMap.generateParagraph, {
        difficulty,
      });
      const [{ data }] = await makeRequest(reqUrl);
      setParaToType(data);
    }, 500);

    return () => {
      clearTimeout(timer);
      cancelRequest();
    };
  }, [difficulty]);

  const onDifficultyChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setDifficulty(
      difficultyOptionsMap[event.target.value as difficultyOptionsMap]
    );
  };

  const replaySession = async () => {
    setLoading(true);
    await replay();
    setLoading(false);
  };

  return (
    <div className="flex items-center flex-col gap-4 py-4">
      <div className="flex gap-16 pb-4 border-b-[1px] border-separator w-full">
        <div className="flex items-center gap-4">
          <span className="text-faded text-xl">Speed (WPM): </span>
          <span className="flex gap-2 items-center text-xl">
            <FontAwesomeIcon color="orange" icon={faGaugeHigh} />
            {stats.speed || "--"}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-faded text-xl">Accuracy (%): </span>
          <span className="flex gap-2 items-center text-xl">
            <FontAwesomeIcon color="orange" icon={faCircleCheck} />
            {stats.accuracy || "--"}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-faded text-xl">Difficulty: </span>
          <select
            className="px-2 py-1 bg-transparent border-2 rounded-md border-orange-400 outline-0"
            onChange={onDifficultyChange}
            value={difficulty}
          >
            {difficultyOptions.map((option) => (
              <option key={option} value={option}>
                {capitialize(option)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-faded text-xl">Time (mm:ss): </span>
          <span className="flex items-center justify-center gap-2 text-xl">
            <FontAwesomeIcon color="orange" icon={faStopwatch20} />
            {stats.timer}
          </span>
        </div>
        {((typeStatus.isCompleted && !typeStatus.isSessionRunning) ||
          (!typeStatus.isCompleted &&
            typeStatus.isSessionRunning &&
            timeOver)) && (
          <button
            className="border-2 border-separator p-2 shadow-md bg-orange-400 text-white font-bold min-w-[100px] rounded-md"
            onClick={replaySession}
          >
            <span className="flex gap-2 items-center justify-center">
              {loading ? (
                <svg
                  className="animate-spin -inline-block w-4 h-4 rounded-full"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <FontAwesomeIcon icon={faPlay} />
              )}
              Replay
            </span>
          </button>
        )}
      </div>
      <div className="flex items-center gap-8 pb-4 border-b-[1px] border-separator w-full">
        <span className="text-faded text-xl">Progress: </span>
        <div className="w-full bg-gray-500 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-orange-400 transition-colors duration-200 h-2.5 rounded-full"
            style={{ width: typeStatus.progress + "%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TypingStats;

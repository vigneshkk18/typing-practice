import React, { useContext, useEffect, useState } from "react";

import {
  faCircleCheck,
  faGaugeHigh,
  faPlay,
  faStopwatch20,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useFetch from "../../hooks/useFetch";
import { capitialize } from "../../utils/utils";
import { apiToUrlMap, formatString } from "../../apiToUrlMap";
import { DifficultyCtx, PlaygroundCtx, UserSessionCtx } from "../../Context";

import { difficultyOptionsMap } from "../../types/IPlaygroundContext";
import LoadingPrimaryButton from "../LoadingPrimaryButton";
import { isTimerOver, isUserCompleted } from "../../utils/rules";

let isOnLoad = true;

const TypingStats = () => {
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
        {(isUserCompleted(typeStatus) || isTimerOver(typeStatus, timeOver)) && (
          <LoadingPrimaryButton onClick={replay} icon={faPlay}>
            Replay
          </LoadingPrimaryButton>
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

import { faHandPointer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect } from "react";
import { PlaygroundCtx } from "../../Context/PlaygroundContext";
import { UserSessionCtx } from "../../Context/UserSessionContext";
import Line from "./Line";

const Content = () => {
  const { timeOver, startTimer } = useContext(UserSessionCtx);
  const { para, typeStatus, startTypingSession } = useContext(PlaygroundCtx);

  useEffect(() => {
    const lineEl = document.getElementById("line-" + typeStatus.line);
    lineEl?.scrollIntoView({
      behavior: "smooth",
    });
  }, [typeStatus.line]);

  const startSession = () => {
    startTypingSession();
    startTimer();
  };

  return (
    <div className="relative select-none">
      <div
        className={`h-[12rem] pb-9 text-2xl leading-loose  overflow-y-scroll  hide-scrollbar ${
          typeStatus.isSessionRunning && !timeOver ? "" : "blur-sm"
        }`}
      >
        {para.map((line, idx) => (
          <Line lineIdx={idx} line={line} key={idx} />
        ))}
      </div>
      {!typeStatus.isSessionRunning && !typeStatus.isCompleted && !timeOver && (
        <span
          onClick={startSession}
          className="absolute cursor-pointer flex gap-8 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-4xl font-bold"
        >
          <FontAwesomeIcon icon={faHandPointer} />
          Click to Start Session.
        </span>
      )}
    </div>
  );
};

export default Content;

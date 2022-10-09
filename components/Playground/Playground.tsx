import React, { useContext, useEffect, useRef } from "react";

import TypingContent from "./Content";
import Keyboard from "../Keyboard/Keyboard";
import PlaygroundSuccessModal from "./PlaygroundSuccessModal";
import PlaygroundWarningModal from "./PlaygroundWarningModal";

import useFetch from "../../hooks/useFetch";

import { apiToUrlMap } from "../../apiToUrlMap";
import { DifficultyCtx, PlaygroundCtx, UserSessionCtx } from "../../Context";

import { ModalRef } from "../../types/IModal";
import { isTimerOver, isUserCompleted, isUserTyping } from "../../utils/rules";

const Playground = () => {
  const { makeRequest, cancelRequest } = useFetch();

  const { difficulty } = useContext(DifficultyCtx);
  const { typeStatus, replay, setTimeOver } = useContext(PlaygroundCtx);
  const { email, stats, timeOver, stopTimer } = useContext(UserSessionCtx);

  const playgroundSuccessModalRef = useRef<ModalRef>();
  const playgroundWarningModalRef = useRef<ModalRef>();

  // save user stats once session is completed and user has typed all para. Then open modal.
  useEffect(() => {
    if (!isUserCompleted(typeStatus)) return;
    const timer = setTimeout(
      () =>
        makeRequest(apiToUrlMap.createUserActivity, {
          method: "POST",
          body: JSON.stringify({
            email: email.trim() !== "" ? email : "Default User",
            completedIn: stats.timer,
            accuracy: stats.accuracy,
            wpm: stats.speed,
            difficulty,
          }),
        }),
      1000
    );

    return () => {
      clearTimeout(timer);
      cancelRequest();
    };
  }, [typeStatus, stats]);

  useEffect(() => {
    if (!isUserCompleted(typeStatus)) return;
    playgroundSuccessModalRef.current?.openModal();
    stopTimer();
  }, [typeStatus, stats]);

  // if user exceeds time and session is running. Then show warning modal.
  useEffect(() => {
    if (!isTimerOver(typeStatus, timeOver)) return;
    setTimeOver();
    playgroundWarningModalRef.current?.openModal();
  }, [typeStatus.isSessionRunning, typeStatus.isCompleted, timeOver]);

  return (
    <div className="min-w-[1494px] border-l-separator border-r-separator border-l-[1px] border-r-[1px]">
      <PlaygroundWarningModal replay={replay} ref={playgroundWarningModalRef} />
      <PlaygroundSuccessModal
        stats={{ ...stats, difficulty }}
        replay={replay}
        ref={playgroundSuccessModalRef}
      />
      <TypingContent />
      <Keyboard />
    </div>
  );
};

export default Playground;

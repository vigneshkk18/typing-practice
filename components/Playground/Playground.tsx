import React, { useContext, useEffect, useRef } from "react";
import { apiToUrlMap } from "../../apiToUrlMap";
import { DifficultyCtx } from "../../Context/DifficultyContext";
import { PlaygroundCtx } from "../../Context/PlaygroundContext";
import { UserSessionCtx } from "../../Context/UserSessionContext";
import useFetch from "../../hooks/useFetch";
import { ModalRef } from "../../types/IModal";
import Keyboard from "../Keyboard/Keyboard";
import PlaygroundSuccessModal from "./PlaygroundSuccessModal";
import PlaygroundWarningModal from "./PlaygroundWarningModal";
import TypingContent from "./TypingContent";

const Playground = () => {
  const { makeRequest } = useFetch();

  const { email, stats, timeOver, stopTimer } = useContext(UserSessionCtx);
  const { difficulty } = useContext(DifficultyCtx);
  const { typeStatus, replay, setTimeOver } = useContext(PlaygroundCtx);

  const playgroundSuccessModalRef = useRef<ModalRef>();
  const playgroundWarningModalRef = useRef<ModalRef>();

  useEffect(() => {
    if (!typeStatus.isCompleted || typeStatus.isSessionRunning) return;
    makeRequest(apiToUrlMap.createUserActivity, {
      method: "POST",
      body: JSON.stringify({
        email: email.trim() !== "" ? email : "Default User",
        completedIn: stats.timer,
        accuracy: stats.accuracy,
        wpm: stats.speed,
        difficulty,
      }),
    });
  }, [typeStatus, stats]);

  useEffect(() => {
    if (typeStatus.isSessionRunning || !typeStatus.isCompleted) return;
    playgroundSuccessModalRef.current?.openModal();
    stopTimer();
  }, [typeStatus.isSessionRunning, typeStatus.isCompleted]);

  useEffect(() => {
    if (!typeStatus.isSessionRunning || typeStatus.isCompleted || !timeOver)
      return;
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

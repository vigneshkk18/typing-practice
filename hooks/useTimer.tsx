import { useState, useRef } from "react";
import { formatNumber } from "../utils/utils";

let clearTimer: NodeJS.Timer | null;

const useTimer = (maxTime: string = "59:59") => {
  const [timeOver, setTimeOver] = useState(false);
  const [timer, setTimer] = useState("00:00");
  let timerRef = useRef(timer);

  const updateTimer = () => {
    let [min, sec] = timerRef.current.split(":").map((str) => +str);
    if (sec + 1 >= 60 && min + 1 >= 60) {
      stopTimer();
      return;
    }

    sec++;
    if (sec >= 60) {
      min++;
      sec = 0;
    }

    const newTimerStr = formatNumber(min, 2) + ":" + formatNumber(sec, 2);
    timerRef.current = newTimerStr;
    setTimer(newTimerStr);
    if (maxTime === newTimerStr) {
      setTimeOver(true);
      stopTimer();
    }
  };

  const startTimer = () => {
    if (clearTimer) clearInterval(clearTimer);
    clearTimer = setInterval(updateTimer, 1000);
  };

  const stopTimer = () => {
    if (!clearTimer) return;
    clearInterval(clearTimer);
    clearTimer = null;
  };

  const resetTimer = () => {
    setTimer("00:00");
  };

  return {
    timer,
    timeOver,
    startTimer,
    stopTimer,
    resetTimer,
  };
};

export default useTimer;

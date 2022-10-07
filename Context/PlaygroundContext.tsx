import { createContext, useContext, useEffect, useReducer } from "react";
import { apiToUrlMap, formatString } from "../apiToUrlMap";
import {
  initialState,
  PlaygroundReducer,
} from "../components/Playground/PlaygroundReducer";
import { getWPMAndAccuracy } from "../components/Playground/utils";
import useFetch from "../hooks/useFetch";
import { ILetter } from "../types/IPlaygroundContext";
import { DifficultyCtx } from "./DifficultyContext";
import { initialStats, UserSessionCtx } from "./UserSessionContext";

export const PlaygroundCtx = createContext({
  // para will be transformed into line -> words -> letters.
  para: [] as ILetter[][][],
  setParaToType: (_para: string) => {},

  // keeps track of current line, word and letter.
  typeStatus: {
    line: 0,
    word: 0,
    letter: 0,
    // typedLetters to caculate wpm.
    typedLetters: 0,
    totalLetters: 0,

    progress: 0,
    // user typed all the contents in para
    isCompleted: false,
    // typing sessions is completed.
    isSessionRunning: false,
    // indicates user has ran out-of-time.
    isTimeOver: false,
  },
  // updates the user typed letter and changes the next type position.
  updateUserTypeStatus: (
    _typedLetter: string,
    _direction: "forward" | "backward"
  ) => {},

  startTypingSession: () => {},
  stopTypingSession: () => {},
  setTimeOver: () => {},

  replay: async () => {},
});

const PlaygroundCtxWrapper = ({ children }: any) => {
  const { makeRequest } = useFetch();

  const { stats, updateStats, resetTimer } = useContext(UserSessionCtx);
  const { difficulty } = useContext(DifficultyCtx);

  const [state, dispatch] = useReducer(PlaygroundReducer, initialState);

  const setParaToType = (para: string) => {
    dispatch({ type: "setPara", payload: { para } });
  };

  const updateUserTypeStatus = (
    typedLetter: string,
    direction: "forward" | "backward"
  ) => {
    dispatch({
      type: "updatePara",
      payload: { typedLetter, direction },
    });
    dispatch({ type: "updateTypeStatus", payload: { direction } });
  };

  const startTypingSession = () => {
    dispatch({ type: "startTypingSession" });
  };

  const stopTypingSession = () => {
    dispatch({ type: "startTypingSession" });
  };

  const setTimeOver = () => {
    dispatch({ type: "setTimeOver" });
  };

  const replay = async () => {
    const reqUrl = formatString(apiToUrlMap.generateParagraph, {
      difficulty,
    });
    const [{ data }] = await makeRequest(reqUrl);
    updateStats(initialStats);
    resetTimer();
    dispatch({ type: "reset", payload: { para: data } });
  };

  useEffect(() => {
    const { speed, accuracy } = getWPMAndAccuracy(
      state.para.slice(0, state.typeStatus.line),
      stats.timer
    );
    updateStats({
      speed,
      accuracy,
    });
  }, [state.typeStatus.line]);

  return (
    <PlaygroundCtx.Provider
      value={{
        para: state.para,
        typeStatus: state.typeStatus,
        startTypingSession,
        stopTypingSession,
        setTimeOver,
        setParaToType,
        updateUserTypeStatus,
        replay,
      }}
    >
      {children}
    </PlaygroundCtx.Provider>
  );
};

export default PlaygroundCtxWrapper;

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { apiToUrlMap, formatString } from "../apiToUrlMap";
import {
  initialState,
  PlaygroundReducer,
} from "../components/Playground/PlaygroundReducer";
import {
  difficultyOptionsMap,
  getWPMAndAccuracy,
  processParagraph,
} from "../components/Playground/utils";
import useFetch from "../hooks/useFetch";
import { ILetter } from "../types/IPlaygroundContext";
import { initialStats, UserSessionContext } from "./UserSessionContext";

export const PlaygroundContext = createContext({
  para: [] as ILetter[][][],
  typeStatus: {
    line: 0,
    word: 0,
    letter: 0,
    typedLines: 0,
    typedWords: 0,
    typedLetters: 0,
    totalLines: 0,
    totalWords: 0,
    totalLetters: 0,
    progress: 0,
    isCompleted: false,
    isSessionRunning: false,
    isTimeOver: false,
  },
  updateUserTypeStatus: (
    _typedLetter: string,
    _direction: "forward" | "backward"
  ) => {},
  startTypingSession: () => {},
  stopTypingSession: () => {},
  setTimeOver: () => {},
  difficulty: difficultyOptionsMap.easy,
  setDifficulty: (_diffculty: difficultyOptionsMap) => {},
  difficultyOptions: [] as string[],
  setDifficultyOptions: (_difficultyOptions: string[]) => {},
  setParaToType: (_para: string) => {},
  replay: async () => {},
});

export const PlaygroundWrapper = ({ children }: any) => {
  const { stats, updateStats, resetTimer } = useContext(UserSessionContext);
  const { makeRequest } = useFetch();

  const [state, dispatch] = useReducer(PlaygroundReducer, initialState);
  const [difficulty, setDifficulty] = useState<difficultyOptionsMap>(
    difficultyOptionsMap.easy
  );
  const [difficultyOptions, setDifficultyOptions] = useState<string[]>([]);

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
    if (state.typeStatus.line === 0) return;
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
    <PlaygroundContext.Provider
      value={{
        para: state.para,
        typeStatus: state.typeStatus,
        startTypingSession,
        stopTypingSession,
        setTimeOver,
        difficulty,
        setDifficulty,
        difficultyOptions,
        setDifficultyOptions,
        setParaToType,
        updateUserTypeStatus,
        replay,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
};

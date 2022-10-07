import { ILetter } from "../../types/IPlaygroundContext";
import {
  getNextTypeStatus,
  getPrevTypeStatus,
  getUpdatedPara,
  processParagraph,
  revertLastUpdatedPara,
} from "./utils";

export const initialState = {
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
  para: [] as ILetter[][][],
};

interface Action {
  type:
    | "updateTypeStatus"
    | "updatePara"
    | "setPara"
    | "startTypingSession"
    | "stopTypingSession"
    | "setTimeOver"
    | "reset";
  payload?: {
    typedLetter?: string;
    direction?: "forward" | "backward";
    para?: string;
  };
}

export function PlaygroundReducer(state = initialState, action: Action) {
  switch (action.type) {
    case "setPara": {
      if (!action.payload || !action.payload.para) return { ...state };
      const { para, totalLines, totalWords, totalLetters } = processParagraph(
        action.payload.para
      );
      return {
        ...state,
        para,
        typeStatus: {
          ...state.typeStatus,
          totalLines,
          totalWords,
          totalLetters,
        },
      };
    }
    case "updatePara":
      if (
        !action.payload ||
        !action.payload.typedLetter ||
        !state.typeStatus.isSessionRunning ||
        state.typeStatus.isTimeOver
      )
        return { ...state };

      let updatedPara = state.para;
      if (action.payload.direction === "forward") {
        updatedPara = getUpdatedPara(
          state.para,
          state.typeStatus,
          action.payload.typedLetter
        );
      }
      if (action.payload.direction === "backward") {
        updatedPara = revertLastUpdatedPara(state.para, state.typeStatus);
      }
      return { ...state, para: updatedPara };
    case "updateTypeStatus":
      if (
        !action.payload ||
        !state.typeStatus.isSessionRunning ||
        state.typeStatus.isTimeOver
      )
        return { ...state };
      let updatedTypeStatus = state.typeStatus;
      if (action.payload.direction === "forward") {
        updatedTypeStatus = getNextTypeStatus(state.typeStatus, state.para);
      }
      if (action.payload.direction === "backward") {
        updatedTypeStatus = getPrevTypeStatus(state.typeStatus, state.para);
      }
      return { ...state, typeStatus: updatedTypeStatus };
    case "startTypingSession":
      return {
        ...state,
        typeStatus: { ...state.typeStatus, isSessionRunning: true },
      };
    case "stopTypingSession":
      return {
        ...state,
        typeStatus: { ...state.typeStatus, isSessionRunning: false },
      };
    case "setTimeOver":
      return {
        ...state,
        typeStatus: { ...state.typeStatus, isTimeOver: true },
      };
    case "reset":
      if (!action.payload || !action.payload.para) return { ...initialState };
      const { para, totalLines, totalWords, totalLetters } = processParagraph(
        action.payload.para
      );
      return {
        ...initialState,
        para,
        typeStatus: {
          ...initialState.typeStatus,
          totalLines,
          totalWords,
          totalLetters,
        },
      };
    default:
      throw new Error();
  }
}

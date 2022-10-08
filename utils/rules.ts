import { ITypeStatus } from "../types/IPlaygroundContext";

export const isUserCompleted = (typeStatus: ITypeStatus) =>
  typeStatus.isCompleted && !typeStatus.isSessionRunning;

export const isTimerOver = (typeStatus: ITypeStatus, timeOver: boolean) =>
  !typeStatus.isCompleted && typeStatus.isSessionRunning && timeOver;

export const isUserTyping = (typeStatus: ITypeStatus) =>
  !typeStatus.isCompleted && typeStatus.isSessionRunning;

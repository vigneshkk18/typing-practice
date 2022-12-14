import { createContext, useState } from "react";

import useMount from "../hooks/useMount";
import useTimer from "../hooks/useTimer";

export interface IStats {
  speed: number;
  accuracy: number;
}

export const initialStats: IStats = {
  speed: 0,
  accuracy: 0,
};

export const UserSessionCtx = createContext({
  email: "",
  isLoggedIn: false,
  stats: { ...initialStats, timer: "00:00" },
  timeOver: false,

  updateEmail: (_email: string) => {},
  updateStats: (_newStats: Partial<IStats>) => {},
  logOutUser: () => {},

  startTimer: () => {},
  stopTimer: () => {},
  resetTimer: () => {},
});

const UserSessionCtxWrapper = ({ children }: any) => {
  const [userState, setUserState] = useState({ email: "", isLoggedIn: false });
  const [stats, setStats] = useState(initialStats);
  const { timer, timeOver, startTimer, stopTimer, resetTimer } = useTimer();

  useMount(() => {
    const userEmail = localStorage.getItem("email") || "";
    if (userEmail.trim() === "") return;
    setUserState({
      email: userEmail,
      isLoggedIn: true,
    });
  });

  const updateEmail = (email: string) => {
    localStorage.setItem("email", email);
    setUserState({
      email,
      isLoggedIn: true,
    });
  };

  const updateStats = (newStats: Partial<IStats>) => {
    setStats({ ...stats, ...newStats });
  };

  const logOutUser = () => {
    localStorage.removeItem("email");
    setUserState({ email: "", isLoggedIn: false });
  };

  return (
    <UserSessionCtx.Provider
      value={{
        ...userState,
        stats: { ...stats, timer },
        timeOver,
        updateStats,
        updateEmail,
        logOutUser,
        startTimer,
        stopTimer,
        resetTimer,
      }}
    >
      {children}
    </UserSessionCtx.Provider>
  );
};

export default UserSessionCtxWrapper;

import { createContext, useEffect, useState } from "react";
import { difficultyOptionsMap } from "../components/Playground/utils";
import useMount from "../hooks/useMount";
import useTimer from "../hooks/useTimer";

export interface IStats {
  speed: number;
  accuracy: number;
  difficulty: difficultyOptionsMap;
}

export const initialStats: IStats = {
  speed: 0,
  accuracy: 0,
  difficulty: difficultyOptionsMap.easy,
};

export const UserSessionContext = createContext({
  email: "",
  isLoggedIn: false,
  stats: { ...initialStats, timer: "00:00" },
  timeOver: false,
  updateEmail: (email: string) => {},
  updateStats: (newStats: Partial<IStats>) => {},
  logOutUser: () => {},
  startTimer: () => {},
  stopTimer: () => {},
  resetTimer: () => {},
});

const UserSessionContextWrapper = ({ children }: any) => {
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
    <UserSessionContext.Provider
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
    </UserSessionContext.Provider>
  );
};

export default UserSessionContextWrapper;

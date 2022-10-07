import { createContext, useState } from "react";

import { difficultyOptionsMap } from "../types/IPlaygroundContext";

export const DifficultyCtx = createContext({
  difficultyOptions: [] as string[],
  setDifficultyOptions: (_options: string[]) => {},
  difficulty: difficultyOptionsMap.easy,
  setDifficulty: (_difficulty: difficultyOptionsMap) => {},
});

const DifficultyCtxWrapper = ({ children }: any) => {
  const [difficultyOptions, setDifficultyOptions] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState(difficultyOptionsMap.easy);

  return (
    <DifficultyCtx.Provider
      value={{
        difficulty,
        difficultyOptions,
        setDifficulty,
        setDifficultyOptions,
      }}
    >
      {children}
    </DifficultyCtx.Provider>
  );
};

export default DifficultyCtxWrapper;

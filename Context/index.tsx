import React from "react";
import DifficultyCtxWrapper from "./DifficultyContext";
import PlaygroundCtxWrapper from "./PlaygroundContext";
import UserSessionCtxWrapper from "./UserSessionContext";

const ContextWrapper = ({ children }: any) => {
  return (
    <UserSessionCtxWrapper>
      <PlaygroundCtxWrapper>
        <DifficultyCtxWrapper>{children}</DifficultyCtxWrapper>
      </PlaygroundCtxWrapper>
    </UserSessionCtxWrapper>
  );
};

export default ContextWrapper;

export { DifficultyCtx } from "./DifficultyContext";
export { PlaygroundCtx } from "./PlaygroundContext";
export { UserSessionCtx } from "./UserSessionContext";

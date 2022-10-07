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

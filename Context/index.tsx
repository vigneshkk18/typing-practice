import React from "react";
import PlaygroundCtxWrapper from "./PlaygroundContext";
import UserSessionCtxWrapper from "./UserSessionContext";

const ContextWrapper = ({ children }: any) => {
  return (
    <UserSessionCtxWrapper>
      <PlaygroundCtxWrapper>{children}</PlaygroundCtxWrapper>
    </UserSessionCtxWrapper>
  );
};

export default ContextWrapper;

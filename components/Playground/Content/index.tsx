import React from "react";

import Content from "./Content";
import TypingStats from "../TypingStats";

const TypingContent = () => {
  return (
    <div className="h-[48%] px-12">
      <TypingStats />
      <Content />
    </div>
  );
};

export default TypingContent;

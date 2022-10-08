import React from "react";

import Word from "./Word";

import { ILetter } from "../../../types/IPlaygroundContext";

interface LineProps {
  line: ILetter[][];
  lineIdx: number;
}

const Line = ({ line, lineIdx }: LineProps) => {
  return (
    <div id={`line-${lineIdx}`} className="flex flex-wrap">
      {line.map((word, idx) => (
        <Word lineIdx={lineIdx} wordIdx={idx} word={word} key={idx} />
      ))}
    </div>
  );
};

export default Line;

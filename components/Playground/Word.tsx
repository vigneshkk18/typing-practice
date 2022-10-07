import React, { useContext } from "react";
import { PlaygroundCtx } from "../../Context/PlaygroundContext";
import { ComparisonType, ILetter } from "../../types/IPlaygroundContext";

interface WordProps {
  word: ILetter[];
  lineIdx: number;
  wordIdx: number;
}

interface LetterProps {
  letter: ILetter;
  lineIdx: number;
  wordIdx: number;
  letterIdx: number;
}

const Letter = ({
  letter: { isTyped, comparisonType, originalChar },
  lineIdx,
  wordIdx,
  letterIdx,
}: LetterProps) => {
  const { typeStatus } = useContext(PlaygroundCtx);

  const showCursor =
    typeStatus.line === lineIdx &&
    typeStatus.word === wordIdx &&
    typeStatus.letter === letterIdx;
  const letterColorClass =
    comparisonType === ComparisonType.same ? "text-hit" : "text-miss";

  const charToDisplay = () => {
    if (originalChar === " ") return "␣";
    if (originalChar === "Enter") return "⏎";
    return originalChar;
  };

  return (
    <span
      className={`w-4 ${isTyped ? letterColorClass : "text-midFaded"} ${
        showCursor ? "animate-hide-show border-b-[0.30em]" : ""
      }`}
    >
      {charToDisplay()}
    </span>
  );
};

const Word = ({ word, lineIdx, wordIdx }: WordProps) => {
  return (
    <span className="tracking-wider">
      {word.map((letter, idx) => (
        <Letter
          letter={letter}
          lineIdx={lineIdx}
          wordIdx={wordIdx}
          letterIdx={idx}
          key={idx}
        />
      ))}
    </span>
  );
};

export default Word;

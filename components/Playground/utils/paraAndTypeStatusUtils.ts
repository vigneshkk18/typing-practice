import {
  ILetter,
  ITypeStatus,
  ComparisonType,
} from "../../../types/IPlaygroundContext";
import { getLetterObj, calculateProgress } from "./calculations";

// convert para -> lines[] -> words[] -> letters[]
export const processParagraph = (para: string) => {
  const processedPara = [] as ILetter[][][];
  let totalLetters = 0;

  for (let line of para.split(".")) {
    if (line.trim() === "") continue;
    line = line.trim().concat(".");

    const lineWords = [] as ILetter[][];
    let word = [] as ILetter[];
    for (let letter of line) {
      // when encountering space append captured letters as a word to line array, and add space as a separate word.
      if (letter === " ") {
        lineWords.push(word);
        word = [];
        lineWords.push([getLetterObj(letter)]);
        continue;
      }
      word.push(getLetterObj(letter));
    }
    lineWords.push(word);
    // capture enter as a separate word
    lineWords.push([getLetterObj("Enter")]);
    processedPara.push(lineWords);

    totalLetters += line.length + 1;
  }

  return { para: processedPara, totalLetters };
};

// update user typed letter based on current user type position.
export const getUpdatedPara = (
  para: ILetter[][][],
  typeStatus: ITypeStatus,
  typedLetter: string
) => {
  const {
    line: currLineIdx,
    word: currWordIdx,
    letter: currLetterIdx,
  } = typeStatus;
  return para.map((line, lineIdx) => {
    if (lineIdx !== currLineIdx) return line;
    return line.map((word, wordIdx) => {
      if (wordIdx !== currWordIdx) return word;
      return word.map((letter, letterIdx) => {
        if (letterIdx !== currLetterIdx) return letter;
        const isSame = letter.originalChar === typedLetter;
        return {
          ...letter,
          userTypedChar: typedLetter,
          isTyped: true,
          comparisonType: isSame
            ? ComparisonType.same
            : ComparisonType.different,
        };
      });
    });
  });
};

// revert last updated letter.
export const revertLastUpdatedPara = (
  para: ILetter[][][],
  typeStatus: ITypeStatus
) => {
  const {
    line: currLineIdx,
    word: currWordIdx,
    letter: currLetterIdx,
  } = getPrevTypeStatus(typeStatus, para);

  return para.map((line, lineIdx) => {
    if (lineIdx !== currLineIdx) return line;
    return line.map((word, wordIdx) => {
      if (wordIdx !== currWordIdx) return word;
      return word.map((letter, letterIdx) => {
        if (letterIdx !== currLetterIdx) return letter;
        return {
          ...letter,
          userTypedChar: letter.userTypedChar,
          isTyped: false,
          comparisonType: ComparisonType.same,
        };
      });
    });
  });
};

// get next type position.
export const getNextTypeStatus = (
  typeStatus: ITypeStatus,
  para: ILetter[][][]
) => {
  const updatedTypeStatus = { ...typeStatus };
  if (!para) return updatedTypeStatus;

  const {
    line: currLineIdx,
    word: currWordIdx,
    letter: currLetterIdx,
  } = typeStatus;

  const lineWords = para[currLineIdx];
  const word = lineWords[currWordIdx];

  const lastLinesIdx = para.length - 1;
  const lastWordIdx = lineWords.length - 1;
  const lastLetterIdx = word.length - 1;

  // check if all the lines are typed. then mark it as completed
  if (
    currLineIdx === lastLinesIdx &&
    currWordIdx === lastWordIdx &&
    currLetterIdx === lastLetterIdx
  ) {
    updatedTypeStatus.isCompleted = true;
    updatedTypeStatus.isSessionRunning = false;
  }

  // if last letter is typed.
  if (currLetterIdx === lastLetterIdx) {
    // go to next line if it is the last word in the line or go to next word
    if (currWordIdx === lastWordIdx) {
      updatedTypeStatus.line++;
      updatedTypeStatus.word = 0;
      updatedTypeStatus.letter = 0;
    } else {
      updatedTypeStatus.word++;
      updatedTypeStatus.letter = 0;
    }

    // update total typed letters.
    updatedTypeStatus.typedLetters++;
    return updatedTypeStatus;
  }

  updatedTypeStatus.letter++;
  updatedTypeStatus.typedLetters++;

  // update progress based on typed letters
  updatedTypeStatus.progress = calculateProgress(
    updatedTypeStatus.typedLetters,
    updatedTypeStatus.totalLetters
  );
  return updatedTypeStatus;
};

export const getPrevTypeStatus = (
  typeStatus: ITypeStatus,
  para: ILetter[][][]
) => {
  const updatedTypeStatus = { ...typeStatus };
  if (!para) return updatedTypeStatus;

  const {
    line: currLineIdx,
    word: currWordIdx,
    letter: currLetterIdx,
  } = typeStatus;

  if (currLineIdx === 0 && currWordIdx === 0 && currLetterIdx === 0) {
    return updatedTypeStatus;
  }

  // if last letter is typed.
  if (currLetterIdx === 0) {
    // go to next line if it is the last word in the line or go to next word
    if (currWordIdx === 0) {
      updatedTypeStatus.line--;
      const line = para[updatedTypeStatus.line];
      const word = line[line.length - 1];
      updatedTypeStatus.word = line.length - 1;
      updatedTypeStatus.letter = word.length - 1;
    } else {
      updatedTypeStatus.word--;
      const line = para[updatedTypeStatus.line];
      const word = line[updatedTypeStatus.word];

      // update total typed letters.
      updatedTypeStatus.typedLetters--;
      updatedTypeStatus.letter = word.length - 1;
    }

    return updatedTypeStatus;
  }

  updatedTypeStatus.letter--;
  updatedTypeStatus.typedLetters--;

  // update progress based on typed letters
  updatedTypeStatus.progress = calculateProgress(
    updatedTypeStatus.typedLetters,
    updatedTypeStatus.totalLetters
  );

  return updatedTypeStatus;
};

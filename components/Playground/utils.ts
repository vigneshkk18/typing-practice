import {
  ComparisonType,
  ILetter,
  ITypeStatus,
} from "../../types/IPlaygroundContext";
import { getMins } from "../../utils/utils";

export enum difficultyOptionsMap {
  easy = "easy",
  medium = "medium",
  hard = "hard",
  expert = "expert",
}

export const getLetterObj = (letter: string) => ({
  originalChar: letter,
  userTypedChar: letter,
  isTyped: false,
  comparisonType: ComparisonType.same,
});

export const calculateProgress = (
  currentTypedLetter: number,
  totalTypedLetter: number
) => {
  return +((currentTypedLetter / totalTypedLetter) * 100).toFixed(2);
};

export const processParagraph = (para: string) => {
  const processedPara = [] as ILetter[][][];
  let totalLines = 0,
    totalWords = 0,
    totalLetters = 0;

  for (let line of para.split(".")) {
    if (line.trim() === "") continue;
    line = line.trim().concat(".");
    const transformedWords = [] as ILetter[][];
    let word = [] as ILetter[];
    for (let letter of line) {
      if (letter === " ") {
        transformedWords.push(word);
        word = [];
        transformedWords.push([getLetterObj(letter)]);
        continue;
      }
      word.push(getLetterObj(letter));
    }
    transformedWords.push(word);
    transformedWords.push([getLetterObj("Enter")]);
    processedPara.push(transformedWords);
    totalLines++;
    totalWords += transformedWords.length;
    totalLetters += line.length + 1;
  }

  return { para: processedPara, totalLines, totalWords, totalLetters };
};

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

  // check if all the lines are typed.
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
      updatedTypeStatus.typedLines++;
      updatedTypeStatus.word = 0;
      updatedTypeStatus.letter = 0;
    } else {
      updatedTypeStatus.word++;
      updatedTypeStatus.typedWords++;
      updatedTypeStatus.letter = 0;
    }

    updatedTypeStatus.typedLetters++;
    return updatedTypeStatus;
  }

  updatedTypeStatus.letter++;
  updatedTypeStatus.typedLetters++;

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
      updatedTypeStatus.typedLines--;
      const line = para[updatedTypeStatus.line];
      const word = line[line.length - 1];
      updatedTypeStatus.word = line.length - 1;
      updatedTypeStatus.letter = word.length - 1;
    } else {
      updatedTypeStatus.word--;
      updatedTypeStatus.typedWords--;
      const line = para[updatedTypeStatus.line];
      const word = line[updatedTypeStatus.word];
      updatedTypeStatus.letter = word.length - 1;
    }

    return updatedTypeStatus;
  }

  updatedTypeStatus.letter--;
  updatedTypeStatus.typedLetters--;

  updatedTypeStatus.progress = calculateProgress(
    updatedTypeStatus.typedLetters,
    updatedTypeStatus.totalLetters
  );

  return updatedTypeStatus;
};

const getTotalAndCorrectWordsCount = (para: ILetter[][][]) => {
  let totalWords = 0,
    typedChars = 0,
    correctWords = 0;
  for (let line of para) {
    for (let word of line) {
      const hasError = word.some(
        (letter) =>
          letter.comparisonType === ComparisonType.different && letter.isTyped
      );
      totalWords++;
      typedChars += word.length;
      if (!hasError) correctWords++;
    }
  }
  return { typedChars, totalWords, correctWords };
};

export const getWPMAndAccuracy = (para: ILetter[][][], time: string) => {
  const { typedChars, totalWords, correctWords } =
    getTotalAndCorrectWordsCount(para);
  const [min, sec] = time.split(":").map((str) => +str);

  const speed = +(typedChars / 5 / getMins(min, sec)).toFixed(2);
  const accuracy = +((correctWords / totalWords) * 100).toFixed(2);
  return { speed, accuracy };
};

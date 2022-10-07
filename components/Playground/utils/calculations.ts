import { getMins } from "../../../utils/utils";
import { ComparisonType, ILetter } from "../../../types/IPlaygroundContext";

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

export const getTotalAndCorrectWordsCount = (para: ILetter[][][]) => {
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

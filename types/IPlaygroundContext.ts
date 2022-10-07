export enum ComparisonType {
  same = "same",
  different = "different",
}

export interface ITypeStatus {
  line: number;
  word: number;
  letter: number;
  typedLines: number;
  typedWords: number;
  typedLetters: number;
  totalLines: number;
  totalWords: number;
  totalLetters: number;
  progress: number;
  isCompleted: boolean;
  isSessionRunning: boolean;
  isTimeOver: boolean;
}

export interface ILetter {
  originalChar: string;
  userTypedChar: string;
  isTyped: boolean;
  comparisonType: ComparisonType;
}

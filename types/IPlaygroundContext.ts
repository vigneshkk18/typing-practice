export enum ComparisonType {
  same = "same",
  different = "different",
}

export enum difficultyOptionsMap {
  easy = "easy",
  medium = "medium",
  hard = "hard",
  expert = "expert",
}

export interface ITypeStatus {
  line: number;
  word: number;
  letter: number;
  typedLetters: number;
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

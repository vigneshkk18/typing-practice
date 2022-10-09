export interface IActivity {
  timeTaken: number;
  wpm: number;
  accuracy: number;
  difficulty: string;
}

export type IActivityKeys = keyof Omit<IActivity, "difficulty">;

export enum ActivityLabel {
  wpm = "Speed (WPM)",
  accuracy = "Accuracy (%)",
  timeTaken = "Time taken (mm:ss)",
}

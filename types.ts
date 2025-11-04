
export type GameState = 'START' | 'PLAYING' | 'FINISHED';

export interface Question {
  question: string;
  options: string[];
  answer: string;
}

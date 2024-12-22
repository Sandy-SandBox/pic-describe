export interface ImageEntry {
  id: string;
  url: string;
  photographer: string;
  photographerUrl: string;
  topic: string;
  description: string;
  grammarScore: number;
  createdAt: string;
  timeTaken: number;
}

export interface GrammarError {
  message: string;
  offset: number;
  length: number;
  suggestions: string[];
}

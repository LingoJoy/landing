export interface IWord {
  explanation: string;
  transcription: string;
  translate: string;
  word: string;
}

export interface IBook {
  book: string;
  name: string;
  author: string;
  category: string;
  createdAt: string;
  level: string;
  page: string;
  updatedAt: string;
  words: IWord[];
  __v: number;
  _id: string;
}

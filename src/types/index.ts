// types/index.ts
export type Article = {
  id: number;
  title: string;
  text: string;
  category: string;
  similarity?: number;
};
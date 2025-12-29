export interface NewsArticle {
  id: string;
  category: string;
  title: string;
  content: string;
  staticGK: string[];
  sources: Array<{ title: string; url: string }>;
}

export interface DaySummary {
  date: string;
  articles: NewsArticle[];
}

export enum FetchStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export type Category = 'All' | 'National' | 'International' | 'Banking & Business' | 'Sports' | 'Science & Tech';

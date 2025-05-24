export type Book = {
  id: string;
  title: string;
  author: string;
  aiSummary: string;
  productUrl: string;
  valueScore: string;
  description: string;
  currentPrice: string;
  originalPrice: string;
  discountAmount: string;
  relevanceScore: string;
  discountPercentage: string;
};

export interface ScrapeResponse {
  message: string;
  data: {
    jobId: string;
    status: BookStatus;
  };
}

export type BookStatus = "failed" | "pending" | "processing" | "completed";

export interface HistoryEntry {
  jobId: string;
  theme: string;
  books: Book[];
}

export interface BooksResponse {
  message: string;
  data: {
    books: Book[];
    status: BookStatus;
  };
}

export interface HistoryResponse {
  message: string;
  data: HistoryEntry[];
}

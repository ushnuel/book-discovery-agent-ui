"use client";

import { toast } from "sonner";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import { useSort } from "@/hooks/useSort";
import { usePoll } from "@/hooks/usePoll";
import { useSearch } from "@/hooks/useSearch";
import { Book, BookStatus, HistoryEntry } from "@/types/books";
import { scrapeData, fetchBooks, getHistory, deleteBook } from "@/lib/data";

type SortOption = "" | "bestMatch" | "relevance";

interface BooksContextType {
  books: Book[];
  search: string;
  filtered: Book[];
  isLoading: boolean;
  isHistoryLoading: boolean;
  scrapeStatus: BookStatus;
  history: HistoryEntry[];
  refreshHistory: () => Promise<void>;
  setSearch: (search: string) => void;
  setSortBy: (sort: SortOption) => void;
  deleteBookById: (jobId: string) => void;
  getBooksByJobId: (jobId: string) => void;
  loadBooks: (query: string) => Promise<void>;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export function BooksProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  const { search, setSearch, filtered: searchedBooks } = useSearch(books);
  const { setSortBy, sortBooks } = useSort();

  const {
    isPolling,
    startPolling,
    data: pollData,
    error: pollError,
  } = usePoll(fetchBooks, {
    onSuccess: ({ books: newBooks }) => {
      setBooks(newBooks);
    },
    onError: (error) => {
      console.error("Error fetching books:", error);
      setIsLoading(false);
    },
    onComplete: () => {
      setIsLoading(false);
      refreshHistory();
      toast.success("Books recommendation completed!");
    },
  });

  const scrapeStatus = pollData?.status ?? "pending";

  const fetchHistory = useCallback(async () => {
    try {
      setIsHistoryLoading(true);
      const response = await getHistory();
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
      toast.error("Failed to load history");
    } finally {
      setIsHistoryLoading(false);
    }
  }, []);

  // Load history on initial render
  useEffect(() => {
    fetchHistory();
  }, []);

  const refreshHistory = useCallback(async () => {
    await fetchHistory();
  }, [fetchHistory]);

  const loadBooks = useCallback(
    async (query: string) => {
      setIsLoading(true);
      try {
        const { data: scrapeRes } = await scrapeData(query);
        startPolling(scrapeRes.jobId);
      } catch (error) {
        setIsLoading(false);
        console.error("Error initiating scraping:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to initiate scraping"
        );
      }
    },
    [startPolling]
  );

  useEffect(() => {
    if (pollError) {
      console.error("Polling error:", pollError);
      toast.error("An error occurred while fetching book data");
    }
  }, [pollError]);

  useEffect(() => {
    setIsLoading(isPolling);
  }, [isPolling]);

  // Sort books when sort changes or books are updated
  const filtered = useMemo(() => {
    return sortBooks(searchedBooks);
  }, [searchedBooks, sortBooks]);

  const getBooksByJobId = useCallback(
    (jobId: string) => {
      try {
        setIsLoading(true);
        const historyEntry = history.find((entry) => entry.jobId === jobId);
        if (!historyEntry?.books) {
          setBooks([]);
          return;
        }
        setBooks(historyEntry.books);
      } catch (error) {
        console.error("Error getting books by jobId:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [history]
  );

  const deleteBookById = useCallback(
    async (jobId: string) => {
      try {
        setHistory((prev) => prev.filter((entry) => entry.jobId !== jobId));

        await deleteBook(jobId);

        toast.success("Book removed from history");
      } catch (error) {
        console.error("Error deleting book:", error);
        toast.error("Failed to remove book from history");
        refreshHistory();
      }
    },
    [books, refreshHistory]
  );

  const value = useMemo(
    () => ({
      books,
      search,
      history,
      filtered,
      isLoading,
      setSearch,
      setSortBy,
      loadBooks,
      scrapeStatus,
      refreshHistory,
      deleteBookById,
      getBooksByJobId,
      isHistoryLoading,
    }),
    [
      books,
      search,
      history,
      filtered,
      isLoading,
      setSortBy,
      loadBooks,
      scrapeStatus,
      refreshHistory,
      deleteBookById,
      getBooksByJobId,
      isHistoryLoading,
    ]
  );

  return (
    <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
}

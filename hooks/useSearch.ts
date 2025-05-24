import { useState, useEffect, useCallback } from "react";
import { Book } from "@/types/books";

export const useSearch = (initialBooks: Book[] = []) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filtered, setFiltered] = useState<Book[]>(initialBooks);

  // Debounce search input
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [search]);

  // Filter books when search or books change
  const filterBooks = useCallback((books: Book[], query: string) => {
    if (!query.trim()) return [...books];

    const lowerQuery = query.toLowerCase();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery)
    );
  }, []);

  // Update filtered books when debouncedSearch or initialBooks change
  useEffect(() => {
    setFiltered(filterBooks(initialBooks, debouncedSearch));
  }, [debouncedSearch, initialBooks, filterBooks]);

  return {
    search,
    setSearch,
    filtered,
  };
};

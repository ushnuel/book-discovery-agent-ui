"use client";

import { useState, useCallback } from "react";
import { Book } from "@/types/books";

type SortOption = "" | "bestMatch" | "relevance";

export const useSort = () => {
  const [sortBy, setSortBy] = useState<SortOption>("");

  const sortBooks = useCallback(
    (books: Book[]) => {
      if (!sortBy) return [...books];

      return [...books].sort((a, b) => {
        if (sortBy === "bestMatch") {
          return parseFloat(b.valueScore) - parseFloat(a.valueScore);
        } else if (sortBy === "relevance") {
          return parseFloat(b.relevanceScore) - parseFloat(a.relevanceScore);
        }
        return 0;
      });
    },
    [sortBy]
  );

  return {
    sortBy,
    setSortBy,
    sortBooks,
  };
};

"use client";

import { useState, useEffect, useCallback } from "react";
import { Book, BookStatus } from "@/types/books";

interface PollOptions {
  interval?: number;
  onComplete?: () => void;
  onError?: (error: Error) => void;
  onSuccess?: (data: { books: Book[]; status: BookStatus }) => void;
}

export const usePoll = (
  fetchData: (
    jobId: string
  ) => Promise<{ data: { books: Book[]; status: BookStatus } }>,
  options: PollOptions = {}
) => {
  const { interval = 2000, onSuccess, onError, onComplete } = options;

  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [data, setData] = useState<{
    books: Book[];
    status: BookStatus;
  } | null>(null);

  const startPolling = useCallback((id: string) => {
    setJobId(id);
    setData(null);
    setError(null);
    setIsPolling(true);
  }, []);

  const stopPolling = useCallback(() => {
    setIsPolling(false);
  }, []);

  useEffect(() => {
    if (!jobId || !isPolling) return;

    let isMounted = true;

    const poll = async () => {
      try {
        const response = await fetchData(jobId);

        if (!isMounted) return;

        const { books, status } = response.data;
        const result = { books, status };

        if (status === "failed") {
          setIsPolling(false);
          onError?.(new Error("Please try again later"));
          return;
        }

        setData(result);
        onSuccess?.(result);

        if (status === "completed") {
          setIsPolling(false);
          onComplete?.();
        }
      } catch (err) {
        if (!isMounted) return;
        const error =
          err instanceof Error ? err : new Error("Failed to fetch books");
        setError(error);
        onError?.(error);
        setIsPolling(false);
      }
    };

    // Start polling at interval
    const intervalId = setInterval(() => {
      if (isPolling) poll();
    }, interval);

    // Run the first poll immediately
    poll();

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [jobId, isPolling, fetchData, interval, onSuccess, onError, onComplete]);

  return {
    jobId,
    data,
    error,
    isPolling,
    startPolling,
    stopPolling,
  };
};

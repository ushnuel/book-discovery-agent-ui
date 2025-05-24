import { BooksResponse, HistoryResponse, ScrapeResponse } from "@/types/books";

export async function scrapeData(theme: string): Promise<ScrapeResponse> {
  try {
    const scrapeRes = await fetch(`/api/scrape`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme }),
    });

    const scrapeData: ScrapeResponse = await scrapeRes.json();
    if (scrapeRes.status !== 202 && scrapeData.message) {
      throw new Error(scrapeData.message);
    }

    if (!scrapeRes.ok) {
      throw new Error("Failed to launch scraping");
    }

    return scrapeData;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to initiate scraping"
    );
  }
}

export async function fetchBooks(jobId: string): Promise<BooksResponse> {
  try {
    const booksRes = await fetch(`/api/books/?jobId=${jobId}`);
    const booksData: BooksResponse = await booksRes.json();

    // Handle 429 status code (Too Many Requests) without throwing an error
    if (booksRes.status === 429) {
      return {
        message: "Rate limit exceeded. Please try again later.",
        data: { books: [], status: "processing" },
      };
    }

    if (booksRes.status !== 200 && booksData.message) {
      throw new Error(booksData.message);
    }

    if (!booksRes.ok) {
      throw new Error("Failed to fetch books");
    }

    const { books } = booksData.data;

    if (!books || books.length <= 0) {
      return {
        message: "",
        data: { books: [], status: "processing" },
      };
    }

    const booksResponse: BooksResponse = {
      message: "Books fetched successfully",
      data: {
        books,
        status: booksData.data.status,
      },
    };

    return booksResponse;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch books"
    );
  }
}

export async function getHistory(): Promise<HistoryResponse> {
  try {
    const historyRes = await fetch(`/api/scrape`);

    const historyData: HistoryResponse = await historyRes.json();
    if (historyRes.status !== 200 && historyData.message) {
      throw new Error(historyData.message);
    }

    if (!historyRes.ok) {
      throw new Error("Failed to fetch history");
    }

    return historyData;
  } catch (error) {
    console.error("Error fetching history:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch history"
    );
  }
}

// delete book by id
export async function deleteBook(jobId: string): Promise<void> {
  try {
    const deleteRes = await fetch(`/api/scrape/?jobId=${jobId}`, {
      method: "DELETE",
    });

    if (!deleteRes.ok) {
      throw new Error("Failed to delete book");
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete book"
    );
  }
}

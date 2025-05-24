"use client";

import { useState } from "react";

import { Book } from "@/types/books";
import { Input } from "@/components/ui/input";
import { BookCard } from "@/components/BookCard";
import { Pagination } from "@/components/Pagination";
import { NoBooksFound } from "@/components/NoBookCard";
import { BookCardSkeleton } from "@/components/BookCardSkeleton";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { Sidebar } from "@/components/Sidebar";
import { useBooks } from "../context/BooksContext";
import { OpenModalButton } from "@/components/OpenModalButton";

const PAGE_SIZE = 8;

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { search, filtered, isLoading, setSearch, setSortBy } = useBooks();

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (isLoading) {
    return (
      <div className="flex-1 flex h-screen">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <div className="flex-1 space-y-6 p-6">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 animate-pulse">
            <div className="flex items-center justify-center space-x-3">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700"></div>
              <h4 className="font-medium text-blue-800">
                Gathering your reading recommendations...
              </h4>
            </div>
          </div>
          <BookCardSkeleton />
        </div>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="flex-1 flex h-screen">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <div className="flex-1 flex items-center justify-center h-full">
          <NoBooksFound />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <main className="flex-1 flex flex-col p-6 space-y-6 h-full border-l border-sidebar-border">
        <div className="flex justify-end w-full">
          <OpenModalButton
            buttonText="Refresh"
            buttonClassName="bg-black hover:bg-black "
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search by title or author"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />

          <Select onValueChange={setSortBy} defaultValue="">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bestMatch">Optimal Value</SelectItem>
              <SelectItem value="relevance">Relevance Score</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginated.map((book: Book, i) => (
            <BookCard key={i + 1} book={book} />
          ))}
        </div>

        <Pagination
          page={page}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
          total={filtered.length}
        />
      </main>
    </div>
  );
}

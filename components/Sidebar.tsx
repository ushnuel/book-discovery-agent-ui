"use client";
import React from "react";
import { useRouter } from "next/navigation";

import {
  Clock,
  Trash2,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBooks } from "@/app/context/BooksContext";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export function Sidebar({
  onToggle,
  className,
  isCollapsed,
}: Readonly<SidebarProps>) {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = React.useState<string | null>(null);
  const { history, isHistoryLoading, getBooksByJobId, deleteBookById } =
    useBooks();

  const handleHistoryClick = (jobId: string, theme: string) => {
    setSelectedTheme(theme);
    getBooksByJobId(jobId);
  };

  return (
    <aside
      className={cn(
        "bg-sidebar text-sidebar-foreground relative transition-all duration-300 ease-in-out flex flex-col border-r border-sidebar-border",
        isCollapsed ? "w-16" : "w-56",
        className
      )}
    >
      <div className="flex h-16 items-center ml-4 border-b border-sidebar-border">
        <h2
          className={cn(
            "font-semibold tracking-tight transition-opacity duration-200",
            isCollapsed ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="p-2">
            <BookOpen
              className="h-8 w-8 text-blue-400 cursor-pointer"
              onClick={() => router.push("/")}
            />
          </div>
        </h2>

        <Button
          size="icon"
          variant="ghost"
          onClick={onToggle}
          className={cn(
            "absolute right-2 text-sidebar-foreground h-8 w-8",
            isCollapsed ? "right-2" : "right-4"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1 py-4">
        {isCollapsed ? (
          <div className="flex items-center justify-center hover:bg-sidebar-accent p-2">
            <Clock className="h-6 w-6 shrink-0" onClick={onToggle} />
          </div>
        ) : (
          <nav className="grid gap-1 px-2">
            <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
              Recent Searches
            </div>
            {isHistoryLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i + 1}
                    className="flex items-center gap-3 px-3 py-2"
                  >
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))
              : history.map((item, i) => (
                  <div
                    key={i + 1}
                    className={cn(
                      "group relative flex items-center rounded-md text-sm font-medium transition-colors",
                      isCollapsed && "justify-center"
                    )}
                  >
                    <button
                      onClick={() =>
                        item.jobId && handleHistoryClick(item.jobId, item.theme)
                      }
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isCollapsed && "justify-center px-0",
                        !item.jobId && "opacity-50 cursor-not-allowed",
                        selectedTheme === item.theme &&
                          "bg-sidebar-accent text-sidebar-accent-foreground"
                      )}
                      disabled={!item.jobId}
                    >
                      <span className={cn("truncate", isCollapsed && "hidden")}>
                        {item.theme}
                      </span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (item.jobId) {
                          deleteBookById(item.jobId);
                        }
                      }}
                      className={cn(
                        "absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100",
                        isCollapsed && "hidden"
                      )}
                      aria-label="Remove from history"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
            {!isHistoryLoading && history.length === 0 && (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                Your searches will appear here
              </div>
            )}
          </nav>
        )}
      </ScrollArea>
    </aside>
  );
}

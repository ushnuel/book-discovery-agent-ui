"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
} from "@/components/ui/dialog";
import { useBooks } from "@/app/context/BooksContext";

interface RefreshModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RefreshModal = ({ isOpen, onClose }: RefreshModalProps) => {
  const [query, setQuery] = useState("");
  const { loadBooks, isLoading } = useBooks();

  const handleSubmit = async () => {
    await loadBooks(query);
    setQuery("");

    // add a 2 second delay before closing the modal
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Refresh Books</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="climate change"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !query.trim()}>
            {isLoading ? "Refreshing..." : "Refresh"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

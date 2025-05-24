import { Book } from "@/types/books";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const StarRating = ({ score }: { score: string }) => {
  const rating = Math.round(parseFloat(score) / 20);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i + 1}
          className={`w-4 h-4 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export const BookCard = ({ book }: { book: Book }) => (
  <Card className="p-4 h-full">
    <CardContent className="flex flex-col h-full">
      <h2 className="text-lg font-semibold">{book.title}</h2>
      <p className="text-md text-muted-foreground mt-1">{book.author}</p>
      <div className="mt-2">
        <StarRating score={book.relevanceScore} />
      </div>
      <p className="mt-3 text-sm flex-grow">{book.aiSummary}</p>
      <a
        target="_blank"
        className="mt-4"
        href={book.productUrl}
        rel="noopener noreferrer"
      >
        <Button className="w-full">View Product</Button>
      </a>
    </CardContent>
  </Card>
);

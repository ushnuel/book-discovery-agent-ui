import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface BookCardSkeletonProps {
  count?: number;
}

export const BookCardSkeleton = ({ count = 8 }: BookCardSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Card className="p-4 w-full h-full" key={index + 1}>
          <CardContent className="flex flex-col h-full w-full">
            <Skeleton className="w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
            <Skeleton className="h-36 w-full mt-2 flex-grow" />
            <div className="mt-4 flex gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-10 w-full mt-4" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

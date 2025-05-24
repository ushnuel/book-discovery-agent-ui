import { Button } from "@/components/ui/button";

export const Pagination = ({
  total,
  page,
  pageSize,
  onPageChange,
}: {
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) => {
  const totalPages = Math.ceil(total / pageSize);
  return (
    <div className="flex justify-center items-center space-x-4 mt-6">
      <Button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        Prev
      </Button>
      <span>
        Page {page} of {totalPages}
      </span>
      <Button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
};

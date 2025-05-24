"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";
import { RefreshModal } from "./RefreshModal";

interface OpenModalButtonProps {
  buttonText: string;
  buttonClassName?: string;
}

export const OpenModalButton = ({
  buttonText,
  buttonClassName,
}: OpenModalButtonProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className={cn(
          "bg-blue-500 hover:bg-blue-600 text-white p-4 md:p-6 text-xl rounded-3xl cursor-pointer",
          buttonClassName
        )}
      >
        {buttonText}
      </Button>
      <RefreshModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

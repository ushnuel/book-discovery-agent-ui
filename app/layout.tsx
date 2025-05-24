import "./globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { BooksProvider } from "./context/BooksContext";

export const metadata: Metadata = {
  title: "Book Discovery",
  description: "Discover books with the best discounts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BooksProvider>
          {children}
          <Toaster richColors />
        </BooksProvider>
      </body>
    </html>
  );
}

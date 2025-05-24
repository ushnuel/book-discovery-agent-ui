import { BookOpen } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center gap-4 items-center">
          <BookOpen className="h-8 w-8 text-blue-400" />
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {currentYear} Book Discovery. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

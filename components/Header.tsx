import { BookOpen } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 fixed w-full top-0 z-50">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <div className="text-2xl font-bold text-white">BookAgent</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

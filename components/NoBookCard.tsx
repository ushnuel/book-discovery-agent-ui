import { OpenModalButton } from "./OpenModalButton";

export const NoBooksFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <h2 className="text-lg md:text-2xl font-bold mb-8 text-gray-500">
        No New Books
      </h2>
      <OpenModalButton buttonText="Search New" />
    </div>
  );
};

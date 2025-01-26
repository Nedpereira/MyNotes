import { BookText } from "lucide-react";

export const renderHeader = () => (
  <>
    <div className="flex items-center justify-center gap-2 mb-6">
      <BookText className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 hover:scale-110 transition-transform" />
      <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        MyNotes
      </h1>
    </div>
  </>
);

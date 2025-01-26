import { BookText, ChevronLeft, Sparkles } from "lucide-react";
import { memo } from "react";
import { renderMarkdown } from "../../utils/renderMakdown";

interface Note {
  id: number;
  title: string;
  content: string;
}

type RenderViewProps = {
  handleGoBack: React.MouseEventHandler<HTMLButtonElement>;
  selectedNote: Note | null;
};

const renderView = ({ handleGoBack, selectedNote }: RenderViewProps) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 shadow-lg">
    <div className="border-b border-gray-700/50 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
        <div className="flex items-center gap-2">
          <BookText className="w-5 h-5 text-blue-500" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 font-semibold">
            MyNotes
          </span>
        </div>
      </div>
    </div>
    <div className="p-5 sm:p-6">
      <h1 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
        <Sparkles className="w-6 h-6 text-purple-500" />
        {selectedNote?.title}
      </h1>
      <div
        className="prose prose-invert prose-md max-w-none prose-headings:text-gray-100 prose-p:text-gray-300 prose-a:text-blue-400 prose-strong:text-gray-100 prose-code:text-gray-100 prose-pre:bg-gray-900/50 prose-pre:border prose-pre:border-gray-700/50"
        dangerouslySetInnerHTML={renderMarkdown(selectedNote?.content || "")}
      />
    </div>
  </div>
);

export default memo(renderView);

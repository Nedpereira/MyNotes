import { BookText, ChevronLeft, HelpCircle, Save } from "lucide-react";
import { useState } from "react";

type RenderCreateProps = {
  handleGoBack: React.MouseEventHandler<HTMLButtonElement>;
};

const renderCreate = ({ handleGoBack }: RenderCreateProps) => {
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCreateNote = () => {
    console.log("Creating note:", newNote);
    setNewNote({ title: "", content: "" });
    handleGoBack;
  };

  return (
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
        <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
          Nova Nota
        </h1>
        <div className="space-y-5">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-1.5"
            >
              Título
            </label>
            <input
              type="text"
              id="title"
              value={newNote.title}
              onChange={(e) =>
                setNewNote({ ...newNote, title: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-gray-700/50 bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-100"
              placeholder="Digite o título da nota..."
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-300"
              >
                Conteúdo (Markdown)
              </label>
              <div className="relative">
                <button
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <HelpCircle size={18} />
                </button>
                {showTooltip && (
                  <div className="absolute right-0 w-72 sm:w-80 p-4 mt-2 bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-700/50 shadow-xl z-10">
                    <h3 className="text-sm font-semibold text-gray-200 mb-2">
                      Guia Rápido de Markdown
                    </h3>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p>
                        <code className="text-blue-400"># Título</code> - Título
                        principal
                      </p>
                      <p>
                        <code className="text-blue-400">## Subtítulo</code> -
                        Subtítulo
                      </p>
                      <p>
                        <code className="text-blue-400">**texto**</code> - Texto
                        em negrito
                      </p>
                      <p>
                        <code className="text-blue-400">*texto*</code> - Texto
                        em itálico
                      </p>
                      <p>
                        <code className="text-blue-400">[link](url)</code> -
                        Link
                      </p>
                      <p>
                        <code className="text-blue-400">- item</code> - Item de
                        lista
                      </p>
                      <p>
                        <code className="text-blue-400">`código`</code> - Código
                        inline
                      </p>
                      <p>
                        <code className="text-blue-400">```código```</code> -
                        Bloco de código
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <textarea
              id="content"
              value={newNote.content}
              onChange={(e) =>
                setNewNote({ ...newNote, content: e.target.value })
              }
              className="w-full h-44 px-3 py-2 rounded-lg border border-gray-700/50 bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-100 font-mono text-sm"
              placeholder="Digite o conteúdo da nota em markdown..."
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleCreateNote}
              className="px-4 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-blue-500/20"
            >
              <Save size={18} />
              Salvar Nota
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default renderCreate;

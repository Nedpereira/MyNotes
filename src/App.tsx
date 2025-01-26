import { useState, useEffect, useCallback } from "react";
import { Search, PlusCircle } from "lucide-react";
import RenderView from "./components/View";
import { renderHeader } from "./components/Header";
import RenderCreate from "./components/Create";
import { RenderFooter } from "./components/Footer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { normalizeText } from "./utils/normalizeText";
import Loading from "./components/Loading";

interface Note {
  id: number;
  title: string;
  content: string;
}

type View = "list" | "view" | "create";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentView, setCurrentView] = useState<View>("list");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filterNotes = useCallback(async () => {
    if (!debouncedSearch.trim()) {
      setFilteredNotes([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const searchLower = normalizeText(debouncedSearch);

    try {
      const notesRef = collection(db, "notes");
      const querySnapshot = await getDocs(notesRef);

      const filtered = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          titleLower: doc.data().titleLower,
          content: doc.data().content,
        }))
        .filter((note) =>
          normalizeText(note?.titleLower).includes(searchLower)
        ) as unknown as Note[];

      setFilteredNotes(filtered);
    } catch {
      alert("Erro ao buscar notas!");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    filterNotes();
  }, [debouncedSearch, filterNotes]);

  const handleGoBack = () => {
    setSelectedNote(null);
    setCurrentView("list");
  };

  const renderList = () => (
    <>
      {renderHeader()}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar notas por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 sm:py-3 pl-10 rounded-lg border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-100 placeholder-gray-500"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
        </div>
        <button
          onClick={() => setCurrentView("create")}
          className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-500/20"
        >
          <PlusCircle size={18} />
          <span>Nova Nota</span>
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : debouncedSearch.trim() && filteredNotes.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          Nenhuma nota encontrada.
        </p>
      ) : filteredNotes.length > 0 ? (
        <div className="space-y-3">
          {filteredNotes.map((note) => (
            <div
              tabIndex={0}
              key={note.id}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSelectedNote(note);
                  setCurrentView("view");
                  setSearchTerm("");
                }
              }}
              onClick={() => {
                setSelectedNote(note);
                setCurrentView("view");
                setSearchTerm("");
              }}
              className="group bg-gray-800/50 backdrop-blur-sm p-5 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all cursor-pointer hover:shadow-lg hover:shadow-blue-500/10"
            >
              <h2 className="text-lg font-semibold text-gray-100 mb-2 group-hover:text-blue-400 transition-colors">
                {note.title}
              </h2>
              <p className="text-gray-400 text-sm line-clamp-2">
                {note.content.substring(0, 150)}...
              </p>
            </div>
          ))}
        </div>
      ) : null}{" "}
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8 sm:py-6 max-w-4xl flex-1">
        {currentView === "list" && renderList()}
        {currentView === "view" && (
          <RenderView handleGoBack={handleGoBack} selectedNote={selectedNote} />
        )}
        {currentView === "create" && (
          <RenderCreate handleGoBack={handleGoBack} />
        )}
      </div>
      <RenderFooter />
    </div>
  );
}

export default App;

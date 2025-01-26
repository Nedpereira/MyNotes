import { Github } from "lucide-react";
import { Linkedin } from "lucide-react";

export const RenderFooter = () => (
  <footer className="text-center py-4 bg-gray-800/50 border-t border-gray-700/50">
    <p className="text-sm text-gray-300">
      &copy; {new Date().getFullYear()} Criado por{" "}
      <a
        href="https://github.com/nedpereira"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 transition-colors"
      >
        Neder "Ned" Pereira
      </a>
    </p>
    <div className="flex justify-center gap-4 mt-2">
      <a
        href="https://github.com/nedpereira"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-blue-400 transition-colors"
      >
        <Github />
      </a>
      <a
        href="https://linkedin.com/in/nederpereira"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-blue-400 transition-colors"
      >
        <Linkedin />
      </a>
    </div>
  </footer>
);

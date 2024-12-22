import React from "react";
import { Coffee } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white dark:bg-gray-800 shadow-lg mt-8">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-gray-600 dark:text-gray-300">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/sushantz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-500 hover:text-blue-600 transition-colors"
            >
              Sushant
            </a>
          </div>

          <a
            href="https://buymeacoffee.com/sushantz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-black rounded-lg transition-all transform hover:scale-105 shadow-md"
          >
            <Coffee className="w-5 h-5" />
            <span className="font-medium">Buy me a coffee</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

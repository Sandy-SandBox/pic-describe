import React, { useState } from "react";
import {
  History,
  Sun,
  Moon,
  Github,
  Image,
  Type,
  HelpCircle,
} from "lucide-react";
import { GuideModal } from "./GuideModal";

interface Props {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onShowSaved: () => void;
}

export const Navbar: React.FC<Props> = ({
  isDarkMode,
  toggleDarkMode,
  onShowSaved,
}) => {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center gap-2 group">
                {/* <div className="flex items-center space-x-1">
                  <Image className="w-6 h-6 text-blue-500 group-hover:text-blue-400 transition-colors" />
                  <Type className="w-6 h-6 text-purple-500 group-hover:text-purple-400 transition-colors" />
                </div> */}
                <h1
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 
                  bg-clip-text text-transparent bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500
                  font-display tracking-tight"
                >
                  PicDescribe
                </h1>
                <span
                  className="hidden sm:inline-block text-xs px-2 py-1 rounded-full bg-gradient-to-r 
                  from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 
                  text-blue-700 dark:text-blue-300 font-medium"
                >
                  AI
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={onShowSaved}
                className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium text-white 
                  bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500
                  rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105
                  border border-purple-400/20"
              >
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">View Saved</span>
              </button>

              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>

              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200
                  transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                  dark:focus:ring-offset-gray-800"
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500 transform rotate-0 transition-transform duration-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300 transform rotate-0 transition-transform duration-500" />
                )}
              </button>

              <a
                href="https://github.com/yourusername/your-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200
                  transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                  dark:focus:ring-offset-gray-800"
                aria-label="View on GitHub"
              >
                <Github className="w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" />
              </a>

              <button
                onClick={() => setIsGuideOpen(true)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200
                  transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                  dark:focus:ring-offset-gray-800"
                aria-label="How to use"
              >
                <HelpCircle className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced gradient border */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      </nav>

      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </>
  );
};

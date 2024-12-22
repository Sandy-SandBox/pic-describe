import React, { useState, useMemo } from "react";
import { ImageEntry } from "../types";
import {
  Calendar,
  Tag,
  Download,
  FileDown,
  Trash2,
  Search,
  Timer as TimerIcon,
} from "lucide-react";
import { exportSingleEntryToPDF, exportAllToPDF } from "../utils/pdf";
import { useStore } from "../store/useStore";
import { SearchBar } from "./SearchBar";
import { GrammarScore } from "./GrammarScore";

interface Props {
  entries: ImageEntry[];
  onClose: () => void;
}

export const SavedEntries: React.FC<Props> = ({ entries, onClose }) => {
  const { deleteEntry, deleteAllEntries } = useStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEntries = useMemo(() => {
    if (!searchQuery) return entries;
    const query = searchQuery.toLowerCase();
    return entries.filter(
      (entry) =>
        entry.description.toLowerCase().includes(query) ||
        entry.topic.toLowerCase().includes(query)
    );
  }, [entries, searchQuery]);

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all entries?")) {
      deleteAllEntries();
    }
  };

  const handleDeleteEntry = (id: string) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      deleteEntry(id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto custom-scrollbar">
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col mt-4 sm:mt-0">
            <div className="p-3 sm:p-4 border-b dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-bold">
                  Saved Descriptions
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ×
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {entries.length > 0 && (
                    <>
                      <button
                        onClick={() => exportAllToPDF(entries)}
                        className="flex items-center gap-1 px-2 sm:px-3 py-1.5 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors w-full sm:w-auto justify-center"
                      >
                        <FileDown className="w-4 h-4" />
                        <span>Export All</span>
                      </button>
                      <button
                        onClick={handleDeleteAll}
                        className="flex items-center gap-1 px-2 sm:px-3 py-1.5 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors w-full sm:w-auto justify-center"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete All</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {filteredEntries.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  {entries.length === 0
                    ? "No saved descriptions yet"
                    : "No matching entries found"}
                </p>
              ) : (
                filteredEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="border dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    <img
                      src={entry.url}
                      alt="Described"
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex flex-col gap-4 mb-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">
                              {new Date(entry.createdAt).toLocaleDateString()}
                            </span>
                          </span>
                          <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <Tag className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{entry.topic}</span>
                          </span>
                          <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <TimerIcon className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">
                              {Math.floor(entry.timeTaken / 60)}:
                              {(entry.timeTaken % 60)
                                .toString()
                                .padStart(2, "0")}
                            </span>
                          </span>
                          <div className="flex items-center">
                            <GrammarScore score={entry.grammarScore} />
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => exportSingleEntryToPDF(entry)}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors whitespace-nowrap flex-1 sm:flex-none justify-center"
                          >
                            <Download className="w-3 h-3" />
                            <span>Export PDF</span>
                          </button>
                          <button
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors whitespace-nowrap flex-1 sm:flex-none justify-center"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 border-t dark:border-gray-700 pt-4">
                        {entry.description}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

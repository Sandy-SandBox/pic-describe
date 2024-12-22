import React, { useState, useEffect } from "react";
import { Lightbulb, Loader2, ChevronRight } from "lucide-react";
import { generateImageDescription } from "../services/gemini";

interface Props {
  imageUrl: string;
  onSuggestionSelect: (suggestion: string) => void;
}

export const DescriptionSuggestions: React.FC<Props> = ({
  imageUrl,
  onSuggestionSelect,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSuggestions([]);
    setError(null);
    setLoading(false);
  }, [imageUrl]);

  const generateSuggestions = async () => {
    setLoading(true);
    setError(null);

    try {
      const descriptions = await generateImageDescription(imageUrl);
      setSuggestions(descriptions);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate suggestions"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center text-sm font-medium text-purple-800 dark:text-purple-200">
          <Lightbulb className="w-4 h-4 mr-2" />
          Need writing inspiration?
        </h3>
        <button
          onClick={generateSuggestions}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-md transition-all duration-300 disabled:opacity-50 transform hover:scale-105 custom-scrollbar"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {/* <span>Generating ideas...</span> */}
            </>
          ) : (
            <>
              <Lightbulb className="w-4 h-4" />
              {/* <span>Get AI Suggestions</span> */}
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="text-red-500 dark:text-red-400 text-sm mb-4 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
          {error}
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => onSuggestionSelect(suggestion)}
              className="group p-4 bg-white dark:bg-gray-800 rounded-md shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-purple-100 dark:border-purple-900 hover:border-purple-300 dark:hover:border-purple-700"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-purple-500 dark:text-purple-400">
                  Style {index + 1}
                </span>
                <ChevronRight className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                {suggestion}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

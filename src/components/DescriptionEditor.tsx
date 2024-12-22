import React, { useState, useEffect, useRef } from "react";
import {
  Check,
  AlertCircle,
  Save,
  Wand2,
  Timer as TimerIcon,
  TimerOff,
} from "lucide-react";
import { GrammarError } from "../types";
import { WordCounter } from "./WordCounter";
import { SentenceStarters } from "./SentenceStarters";
import { VoiceInput } from "./VoiceInput";

interface Props {
  onDescriptionChange: (text: string) => void;
  onSave: (description: string, timeTaken: number) => void;
  grammarErrors: GrammarError[];
  topic: string;
}

export const DescriptionEditor: React.FC<Props> = ({
  onDescriptionChange,
  onSave,
  grammarErrors,
  topic,
}) => {
  const [description, setDescription] = useState("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    onDescriptionChange(description);
  }, [description, onDescriptionChange]);

  useEffect(() => {
    if (isTimerRunning) {
      startTimeRef.current = Date.now() - elapsedTime * 1000;
      timerRef.current = setInterval(() => {
        setElapsedTime(
          Math.floor((Date.now() - (startTimeRef.current || 0)) / 1000)
        );
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning]);

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleSave = () => {
    if (description.trim()) {
      onSave(description, elapsedTime);
      setDescription("");
      setIsTimerRunning(false);
      setElapsedTime(0);
    }
  };

  const handlePromptSelect = (prompt: string) => {
    setDescription((prev) => prev + (prev ? "\n" : "") + prompt);
  };

  const handleVoiceInput = (transcript: string) => {
    setDescription((prev) => prev + (prev ? " " : "") + transcript);
  };

  const handleAutoFix = () => {
    let fixedText = description;

    // Sort errors by their position from end to start to avoid offset issues
    const sortedErrors = [...grammarErrors].sort((a, b) => b.offset - a.offset);

    // Apply corrections one by one
    sortedErrors.forEach((error) => {
      if (error.suggestions && error.suggestions.length > 0) {
        const errorText = fixedText.slice(
          error.offset,
          error.offset + error.length
        );
        const suggestion = error.suggestions[0];

        // Only apply the suggestion if it's not drastically different from the original
        if (suggestion.length <= errorText.length * 2) {
          fixedText =
            fixedText.slice(0, error.offset) +
            suggestion +
            fixedText.slice(error.offset + error.length);
        }
      }
    });

    // Basic formatting fixes that won't affect word content
    fixedText = fixedText
      // Fix double spaces
      .replace(/\s{2,}/g, " ")
      // Fix spacing after punctuation
      .replace(/([.!?])\s*(\w)/g, "$1 $2")
      // Capitalize first letter of sentences
      .replace(/(^\w|[.!?]\s+\w)/g, (letter) => letter.toUpperCase())
      // Capitalize 'I' when it's a word
      .replace(/\b(i)\b/g, "I")
      // Trim extra spaces
      .trim();

    setDescription(fixedText);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Your Description
        </label>
        <div className="flex items-center gap-4">
          <WordCounter text={description} />
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTimer}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${
                isTimerRunning
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
              title={isTimerRunning ? "Stop timer" : "Start timer"}
            >
              {isTimerRunning ? (
                <>
                  <TimerOff className="w-4 h-4" />
                  <span>
                    {Math.floor(elapsedTime / 60)}:
                    {(elapsedTime % 60).toString().padStart(2, "0")}
                  </span>
                </>
              ) : (
                <>
                  <TimerIcon className="w-4 h-4" />
                  <span>Start Timer</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <SentenceStarters topic={topic} onSelect={handlePromptSelect} />

      <div className="mt-4 relative">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your description here... Try to be as detailed as possible!"
          className="w-full h-32 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 pr-12"
        />
        <div className="absolute right-2 bottom-2">
          <VoiceInput onTranscript={handleVoiceInput} />
        </div>
      </div>

      {grammarErrors.length > 0 && (
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="flex items-center text-sm font-medium text-yellow-800 dark:text-yellow-200">
              <AlertCircle className="w-4 h-4 mr-2" />
              Grammar Suggestions
            </h3>
            <button
              onClick={handleAutoFix}
              className="flex items-center gap-1 px-2 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition-colors"
              title="Auto-fix all grammar issues"
            >
              <Wand2 className="w-4 h-4" />
              <span>Auto-fix All</span>
            </button>
          </div>
          <ul className="space-y-2">
            {grammarErrors.map((error, index) => (
              <li
                key={index}
                className="text-sm text-yellow-700 dark:text-yellow-300 flex items-center justify-between"
              >
                <span>{error.message}</span>
                {error.suggestions && error.suggestions.length > 0 && (
                  <span className="text-yellow-600 dark:text-yellow-400">
                    Suggestion: {error.suggestions[0]}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          disabled={!description.trim()}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          <span>Save Description</span>
        </button>
      </div>
    </div>
  );
};

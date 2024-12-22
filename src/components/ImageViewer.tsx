import React, { useState, useEffect } from "react";
import { RefreshCw, Camera } from "lucide-react";
import { getRandomImage } from "../utils/pixabay";

interface Props {
  currentImage: string;
  topic: string;
  onTopicChange: (topic: string) => void;
  onNewImage: () => void;
}

export const ImageViewer: React.FC<Props> = ({
  currentImage,
  topic,
  onTopicChange,
  onNewImage,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const topics = [
    "Nature",
    "Technology",
    "Travel",
    "Food",
    "Architecture",
    "People",
    "Sports",
  ];

  const handleTopicChange = (newTopic: string) => {
    onTopicChange(newTopic);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Camera className="w-5 h-5 text-blue-500" />
          <select
            value={topic}
            onChange={(e) => handleTopicChange(e.target.value)}
            className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1"
          >
            <option value="">Random</option>
            {topics.map((t) => (
              <option key={t} value={t.toLowerCase()}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={onNewImage}
          className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>New Image</span>
        </button>
      </div>
      <div className="relative aspect-video">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50 dark:bg-red-900/20">
            <p className="text-red-500 dark:text-red-400">{error}</p>
          </div>
        ) : (
          <img
            src={currentImage}
            alt="Random"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

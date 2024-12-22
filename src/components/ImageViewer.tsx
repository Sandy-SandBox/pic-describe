import React, { useState, useEffect } from "react";
import { RefreshCw, Camera } from "lucide-react";
import { getRandomImage } from "../utils/pixabay";

interface Props {
  currentImage: string;
  topic: string;
  onTopicChange: (topic: string) => void;
  onNewImage: () => Promise<void>;
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

  const handleNewImage = async () => {
    setLoading(true);
    setError(null);
    try {
      await onNewImage();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load image");
    } finally {
      setLoading(false);
    }
  };

  const handleTopicChange = async (newTopic: string) => {
    onTopicChange(newTopic);
    await handleNewImage();
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Camera className="w-5 h-5 text-blue-500" />
          <select
            value={topic}
            onChange={(e) => handleTopicChange(e.target.value)}
            disabled={loading}
            className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 disabled:opacity-50"
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
          onClick={handleNewImage}
          disabled={loading}
          className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span>{loading ? "Loading..." : "New Image"}</span>
        </button>
      </div>
      <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mb-2" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Loading new image...
            </span>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 dark:bg-red-900/20 p-4">
            <p className="text-red-500 dark:text-red-400 text-center mb-2">
              {error}
            </p>
            <button
              onClick={handleNewImage}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
            >
              Try Again
            </button>
          </div>
        ) : currentImage ? (
          <img
            src={currentImage}
            alt="Random"
            className="w-full h-full object-cover transition-opacity duration-300"
            onLoad={() => setLoading(false)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              No image available
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

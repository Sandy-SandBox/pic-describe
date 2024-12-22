import { useState, useEffect } from "react";
import { getRandomImage } from "../services/pixabay";

interface RandomImage {
  id: string;
  urls: {
    regular: string;
    full: string;
  };
  alt_description: string;
  user: {
    name: string;
    links: {
      html: string;
    };
  };
}

export const useRandomImage = (topic?: string) => {
  const [image, setImage] = useState<RandomImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTopic, setCurrentTopic] = useState(topic);

  const fetchRandomImage = async (searchTopic?: string) => {
    try {
      setLoading(true);
      setError(null);
      const randomImage = await getRandomImage(searchTopic || currentTopic);
      setImage(randomImage);
    } catch (err) {
      setError("Failed to fetch random image");
      console.error("Error fetching random image:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentTopic(topic);
    fetchRandomImage(topic);
  }, [topic]);

  return {
    image,
    loading,
    error,
    refetch: () => fetchRandomImage(currentTopic),
  };
};

import React, { useState, useCallback } from "react";
import { ImageViewer } from "./components/ImageViewer";
import { DescriptionEditor } from "./components/DescriptionEditor";
import { Dashboard } from "./components/Dashboard";
import { SavedEntries } from "./components/SavedEntries";
import { Navbar } from "./components/Navbar";
import { useStore } from "./store/useStore";
import { GrammarError } from "./types";
import { getRandomImage } from "./utils/pixabay";
import { Footer } from "./components/Footer";

function App() {
  const { entries, isDarkMode, addEntry, toggleDarkMode } = useStore();
  const [currentImage, setCurrentImage] = useState<{
    url: string;
    photographer: string;
    photographerUrl: string;
  } | null>(null);
  const [topic, setTopic] = useState("");
  const [grammarErrors, setGrammarErrors] = useState<GrammarError[]>([]);
  const [showSaved, setShowSaved] = useState(false);

  const handleNewImage = useCallback(async () => {
    try {
      const imageData = await getRandomImage(topic);
      if (imageData) {
        setGrammarErrors([]);
        setCurrentImage({
          url: imageData.urls.full,
          photographer: imageData.user.name,
          photographerUrl: imageData.user.links.html,
        });
      }
    } catch (error) {
      console.error("Failed to load image:", error);
      throw error;
    }
  }, [topic]);

  React.useEffect(() => {
    handleNewImage();
  }, [handleNewImage]);

  const handleDescriptionChange = async (text: string) => {
    try {
      const response = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `text=${encodeURIComponent(text)}&language=en-US`,
      });

      const data = await response.json();
      setGrammarErrors(
        data.matches.map((match: any) => ({
          message: match.message,
          offset: match.offset,
          length: match.length,
          suggestions: match.replacements.map((r: any) => r.value),
        }))
      );
    } catch (error) {
      console.error("Grammar check failed:", error);
    }
  };

  const handleSave = (description: string, timeTaken: number) => {
    if (currentImage) {
      const entry = {
        id: Date.now().toString(),
        url: currentImage.url,
        photographer: currentImage.photographer,
        photographerUrl: currentImage.photographerUrl,
        topic: topic || "random",
        description,
        grammarScore: 100 - grammarErrors.length * 10,
        createdAt: new Date().toISOString(),
        timeTaken,
      };
      addEntry(entry);
      handleNewImage();
    }
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
        <Navbar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          onShowSaved={() => setShowSaved(true)}
        />

        <main className="flex-grow max-w-4xl mx-auto pt-24 pb-8 px-4 space-y-6">
          <ImageViewer
            currentImage={currentImage?.url || ""}
            topic={topic}
            onTopicChange={setTopic}
            onNewImage={handleNewImage}
          />

          <DescriptionEditor
            onDescriptionChange={handleDescriptionChange}
            onSave={handleSave}
            grammarErrors={grammarErrors}
            topic={topic}
            currentImage={currentImage?.url || ""}
          />

          <Dashboard entries={entries} />

          {showSaved && (
            <SavedEntries
              entries={entries}
              onClose={() => setShowSaved(false)}
            />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;

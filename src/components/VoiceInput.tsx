import React, { useState, useCallback } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";

interface Props {
  onTranscript: (text: string) => void;
  className?: string;
}

export const VoiceInput: React.FC<Props> = ({
  onTranscript,
  className = "",
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const startListening = useCallback(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert(
        "Speech recognition is not supported in your browser. Please use Chrome."
      );
      return;
    }

    setIsLoading(true);
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setIsLoading(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event);
      if (event.error === "no-speech") {
        recognition.stop();
        recognition.start();
        return;
      }
      setIsListening(false);
      setIsLoading(false);
    };

    recognition.onend = () => {
      if (isListening && !isLoading) {
        recognition.start();
        return;
      }
      setIsListening(false);
      setIsLoading(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      onTranscript(transcript + " ");
    };

    recognition.start();
    return recognition;
  }, [onTranscript, isListening, isLoading]);

  const stopListening = useCallback((recognition: any) => {
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening(window.recognition);
    } else {
      window.recognition = startListening();
    }
  }, [isListening, startListening, stopListening]);

  return (
    <button
      onClick={toggleListening}
      disabled={isLoading}
      className={`${className} p-2 rounded-full transition-colors ${
        isListening
          ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          : "text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      title={
        isLoading
          ? "Starting..."
          : isListening
          ? "Stop recording"
          : "Start recording"
      }
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : isListening ? (
        <MicOff className="w-5 h-5" />
      ) : (
        <Mic className="w-5 h-5" />
      )}
    </button>
  );
};

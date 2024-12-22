import React from 'react';
import { Lightbulb } from 'lucide-react';
import { getPrompts } from '../utils/prompts';

interface Props {
  topic?: string;
  onSelect: (prompt: string) => void;
}

export const SentenceStarters: React.FC<Props> = ({ topic, onSelect }) => {
  const prompts = getPrompts(topic);

  return (
    <div className="space-y-2">
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <Lightbulb className="w-4 h-4 mr-1" />
        <span>Sentence Starters</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onSelect(prompt)}
            className="text-sm px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};
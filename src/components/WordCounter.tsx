import React from 'react';
import { AlignJustify } from 'lucide-react';

interface Props {
  text: string;
}

export const WordCounter: React.FC<Props> = ({ text }) => {
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
      <AlignJustify className="w-4 h-4 mr-1" />
      <span>{wordCount} words</span>
    </div>
  );
};
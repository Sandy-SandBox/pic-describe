import React from 'react';
import { Clock, Book, Award } from 'lucide-react';
import { ImageEntry } from '../types';

interface Props {
  entries: ImageEntry[];
}

export const Dashboard: React.FC<Props> = ({ entries }) => {
  const totalWords = entries.reduce(
    (acc, entry) => acc + entry.description.split(/\s+/).length,
    0
  );

  const averageScore = entries.length
    ? entries.reduce((acc, entry) => acc + entry.grammarScore, 0) / entries.length
    : 0;

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-5 h-5 text-blue-500" />
          <h3 className="font-medium">Total Entries</h3>
        </div>
        <p className="text-2xl font-bold">{entries.length}</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Book className="w-5 h-5 text-green-500" />
          <h3 className="font-medium">Total Words</h3>
        </div>
        <p className="text-2xl font-bold">{totalWords}</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Award className="w-5 h-5 text-purple-500" />
          <h3 className="font-medium">Avg. Score</h3>
        </div>
        <p className="text-2xl font-bold">{averageScore.toFixed(1)}</p>
      </div>
    </div>
  );
};
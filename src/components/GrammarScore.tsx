import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface Props {
  score: number;
}

export const GrammarScore: React.FC<Props> = ({ score }) => {
  const stars = Math.floor(score / 20); // Convert 100-based score to 5 stars
  const hasHalfStar = score % 20 >= 10;

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => {
        if (i < stars) {
          return (
            <Star
              key={i}
              className="w-4 h-4 fill-yellow-400 text-yellow-400"
            />
          );
        } else if (i === stars && hasHalfStar) {
          return (
            <StarHalf
              key={i}
              className="w-4 h-4 fill-yellow-400 text-yellow-400"
            />
          );
        }
        return (
          <Star
            key={i}
            className="w-4 h-4 text-gray-300 dark:text-gray-600"
          />
        );
      })}
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { Timer as TimerIcon, Play, Pause, RotateCcw } from 'lucide-react';

interface Props {
  duration: number;
  onTimeUp?: () => void;
}

export const Timer: React.FC<Props> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            onTimeUp?.();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onTimeUp]);

  const reset = () => {
    setTimeLeft(duration);
    setIsActive(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center space-x-2 text-sm">
      <TimerIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      <span className="font-mono w-16">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
      <button
        onClick={() => setIsActive(!isActive)}
        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {isActive ? (
          <Pause className="w-4 h-4 text-yellow-500" />
        ) : (
          <Play className="w-4 h-4 text-green-500" />
        )}
      </button>
      <button
        onClick={reset}
        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <RotateCcw className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </button>
    </div>
  );
};
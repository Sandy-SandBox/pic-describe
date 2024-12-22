import React from "react";
import {
  X,
  Image,
  Type,
  Lightbulb,
  Brain,
  Timer,
  History,
  MessageSquare,
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      icon: Image,
      title: "Select an Image",
      description:
        "Choose from various categories like nature, technology, or travel. Each image is carefully selected to inspire descriptive writing.",
    },
    {
      icon: Brain,
      title: "AI Assistance",
      description:
        "Not sure where to start? Click 'Get AI Suggestions' to receive three unique perspectives on describing the image, powered by advanced AI.",
    },
    {
      icon: MessageSquare,
      title: "Writing Tips",
      items: [
        "Start with the main subject or focal point",
        "Describe the mood and atmosphere",
        "Include colors and lighting details",
        "Mention spatial relationships",
        "Add sensory details when relevant",
      ],
    },
    {
      icon: Timer,
      title: "Practice Makes Perfect",
      description:
        "Use the built-in timer to challenge yourself. Regular timed practice helps improve your descriptive writing speed and quality.",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto custom-scrollbar">
      <div className="min-h-screen py-8">
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="relative p-6 border-b dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  How to Write Great Image Descriptions
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Master the art of descriptive writing with our AI-powered
                platform
              </p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    {step.description ? (
                      <p className="text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                    ) : step.items ? (
                      <ul className="space-y-2">
                        {step.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                          >
                            <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-blue-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              ))}

              {/* Pro Tips Section */}
              <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Pro Tips
                  </h3>
                </div>
                <ul className="space-y-2">
                  <li className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                    Use the timer to build writing speed
                  </li>
                  <li className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                    Save your best descriptions for reference
                  </li>
                  <li className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                    Try different writing styles for variety
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Remember: The best descriptions paint a picture in the reader's
                mind. Practice regularly to improve your skills!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

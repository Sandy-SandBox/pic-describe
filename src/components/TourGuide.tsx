import React from "react";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";

interface Props {
  run: boolean;
  onComplete: () => void;
}

export const TourGuide: React.FC<Props> = ({ run, onComplete }) => {
  const steps = [
    {
      target: '[data-tour="topic-selector"]',
      content:
        "Choose from different topics to get relevant images for your descriptions.",
      placement: "bottom",
      disableBeacon: true,
    },
    {
      target: '[data-tour="new-image"]',
      content:
        "Generate a new random image from the selected topic to describe.",
      placement: "bottom",
    },
    {
      target: '[data-tour="ai-suggestions"]',
      content:
        "Need inspiration? Get AI-powered suggestions to help you describe the image.",
      placement: "top",
    },
    {
      target: '[data-tour="timer"]',
      content:
        "Use the timer to practice timed descriptions and track your writing speed.",
      placement: "left",
    },
    {
      target: '[data-tour="description-area"]',
      content:
        "Write your descriptions here. Try to be as detailed as possible!",
      placement: "top",
    },
    {
      target: '[data-tour="save"]',
      content: "Save your descriptions to build a collection of your work.",
      placement: "left",
    },
    {
      target: '[data-tour="view-saved"]',
      content:
        "View all your saved descriptions and track your progress over time.",
      placement: "bottom",
    },
  ];

  const handleJoyrideCallback = (data: any) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      onComplete();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      spotlightPadding={4}
      hideCloseButton
      styles={{
        options: {
          primaryColor: "#6366f1",
          textColor: "#1f2937",
          backgroundColor: "#ffffff",
          arrowColor: "#ffffff",
          overlayColor: "rgba(0, 0, 0, 0.5)",
        },
        spotlight: {
          borderRadius: "8px",
        },
        tooltip: {
          padding: "1rem",
          borderRadius: "0.5rem",
        },
        buttonNext: {
          backgroundColor: "#6366f1",
          padding: "0.5rem 1rem",
          fontSize: "0.875rem",
          borderRadius: "0.375rem",
        },
        buttonBack: {
          marginRight: "0.5rem",
          color: "#6366f1",
        },
        buttonSkip: {
          color: "#6b7280",
        },
      }}
    />
  );
};

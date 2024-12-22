interface TopicPrompts {
  [key: string]: string[];
}

export const getPrompts = (topic?: string): string[] => {
  const defaultPrompts = [
    "This picture shows...",
    "What stands out to me is...",
    "I can observe that...",
  ];

  if (!topic) {
    return defaultPrompts;
  }

  const topicPrompts: TopicPrompts = {
    nature: [
      "The natural landscape features...",
      "The flora and fauna visible include...",
      "The environmental conditions appear...",
      "This natural setting reminds me of...",
      "The ecosystem shown here seems to be...",
    ],
    technology: [
      "This technological device appears to...",
      "The innovative features I notice are...",
      "From a technical perspective...",
      "This gadget's design suggests...",
      "The user interface shows...",
    ],
    food: [
      "This culinary creation consists of...",
      "The presentation style indicates...",
      "The cooking technique used seems to be...",
      "The combination of ingredients includes...",
      "This dish represents the cuisine of...",
    ],
    travel: [
      "This destination showcases...",
      "The local culture is reflected in...",
      "The tourist attractions visible are...",
      "The atmosphere of this place is...",
      "This location is characteristic of...",
    ],
    architecture: [
      "The building's design features...",
      "The architectural style represents...",
      "The structural elements include...",
      "The facade demonstrates...",
      "This construction exemplifies...",
    ],
    people: [
      "The person's expression conveys...",
      "The body language suggests...",
      "The interaction between people shows...",
      "The cultural elements visible are...",
      "The scene captures a moment of...",
    ],
  };

  const normalizedTopic = topic.toLowerCase();
  return [...defaultPrompts, ...(topicPrompts[normalizedTopic] || [])];
};

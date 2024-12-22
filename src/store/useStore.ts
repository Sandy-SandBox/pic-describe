import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ImageEntry {
  id: string;
  url: string;
  photographer: string;
  photographerUrl: string;
  topic: string;
  description: string;
  grammarScore: number;
  createdAt: string;
  timeTaken: number;
}

interface Store {
  entries: ImageEntry[];
  isDarkMode: boolean;
  addEntry: (entry: ImageEntry) => void;
  deleteEntry: (id: string) => void;
  deleteAllEntries: () => void;
  toggleDarkMode: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      entries: [],
      isDarkMode: true,
      addEntry: (entry) =>
        set((state) => ({ entries: [entry, ...state.entries] })),
      deleteEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== id),
        })),
      deleteAllEntries: () => set({ entries: [] }),
      toggleDarkMode: () =>
        set((state) => {
          const newIsDarkMode = !state.isDarkMode;
          // Update the document class when dark mode changes
          if (newIsDarkMode) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          return { isDarkMode: newIsDarkMode };
        }),
    }),
    {
      name: "image-description-store",
      onRehydrateStorage: () => (state) => {
        // Apply dark mode class on initial load
        if (state?.isDarkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
    }
  )
);

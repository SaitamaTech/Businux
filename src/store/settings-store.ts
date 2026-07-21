import { create } from "zustand";
import { persist } from "zustand/middleware";

type LanguageOption = "English (US)" | "English (UK)" | "Français" | "Español";

type RegionOption = "GMT+00:00" | "GMT+01:00" | "GMT+02:00" | "GMT-05:00";

interface SettingsState {
  notificationsEnabled: boolean;
  aiSuggestionsEnabled: boolean;
  language: LanguageOption;
  region: RegionOption;
  setNotificationsEnabled: (enabled: boolean) => void;
  setAiSuggestionsEnabled: (enabled: boolean) => void;
  setLanguage: (language: LanguageOption) => void;
  setRegion: (region: RegionOption) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      notificationsEnabled: true,
      aiSuggestionsEnabled: true,
      language: "English (US)",
      region: "GMT+01:00",
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      setAiSuggestionsEnabled: (enabled) => set({ aiSuggestionsEnabled: enabled }),
      setLanguage: (language) => set({ language }),
      setRegion: (region) => set({ region }),
    }),
    {
      name: "businux-quick-settings",
    }
  )
);

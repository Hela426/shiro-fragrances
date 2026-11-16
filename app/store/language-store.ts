import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Language = "en" | "es";

type LanguageStore = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "en",

      setLanguage: (language) => set({ language }),

      toggleLanguage: () =>
        set((state) => ({
          language: state.language === "en" ? "es" : "en",
        })),
    }),
    {
      name: "shiro-language",
      skipHydration: true,

      partialize: (state) => ({
        language: state.language,
      }),
    }
  )
);

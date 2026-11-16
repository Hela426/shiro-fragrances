"use client";

import { useLanguageStore } from "../store/language-store";
import { translations } from "../data/translations";
import { shopTranslations } from "../data/shop-translations";

export function useTranslation() {
  const language = useLanguageStore(
    (state) => state.language
  );

  return {
    language,
    t: {
      ...translations[language],
      ...shopTranslations[language],
    },
  };
}

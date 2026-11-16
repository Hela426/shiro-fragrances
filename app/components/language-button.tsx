"use client";

import { Globe } from "lucide-react";
import { useLanguageStore } from "../store/language-store";
import styles from "./language-button.module.css";

export default function LanguageButton() {
  const language = useLanguageStore(
    (state) => state.language
  );

  const toggleLanguage = useLanguageStore(
    (state) => state.toggleLanguage
  );

  const label =
    language === "en"
      ? "Cambiar a español"
      : "Switch to English";

  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggleLanguage}
      aria-label={label}
      title={label}
    >
      <Globe size={18} strokeWidth={1.5} />

      <span>{language.toUpperCase()}</span>
    </button>
  );
}

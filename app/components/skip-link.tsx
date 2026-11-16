"use client";

import { useTranslation } from "../lib/use-translation";

export default function SkipLink() {
  const { language } = useTranslation();

  return (
    <a
      href="#main-content"
      className="skip-link"
    >
      {language === "es"
        ? "Saltar al contenido principal"
        : "Skip to main content"}
    </a>
  );
}
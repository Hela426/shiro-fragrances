"use client";

import Link from "next/link";
import Logo from "./logo";
import { useTranslation } from "../lib/use-translation";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Logo />
          <p>{t.footer.slogan}</p>
        </div>

        <div className="footer-links">
          <h4>{t.footer.explore}</h4>

          <Link href="/">{t.nav.home}</Link>

          <Link href="/collection">
            {t.nav.collection}
          </Link>

          <Link href="/#philosophy">
            {t.nav.philosophy}
          </Link>
        </div>

        <div className="footer-links">
          <h4>{t.footer.credits}</h4>

          <a
            href="https://karenbaron-portfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.footer.portfolio}
          </a>

          <a
            href="https://github.com/Hela426/shiro-fragrances"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.footer.sourceCode}
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>{t.footer.copyright}</span>
        <span>{t.footer.disclaimer}</span>
      </div>
    </footer>
  );
}
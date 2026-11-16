import Link from "next/link";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Logo />
          <p>The essence of simplicity.</p>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>

          <Link href="/">Home</Link>

          <Link href="/collection">
            Collection
          </Link>

          <Link href="/#philosophy">
            Our philosophy
          </Link>
        </div>

        <div className="footer-links">
          <h4>Credits</h4>

          <a
            href="https://karenbaron-portfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Developer portfolio
          </a>

          <a
            href="https://github.com/Hela426/shiro-fragrances"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 SHIRO — Concept project.</span>
        <span>No real transactions are processed.</span>
      </div>
    </footer>
  );
}
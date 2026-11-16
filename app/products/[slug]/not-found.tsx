import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProductNotFound() {
  return (
    <main className="fragrance-not-found">
      <span className="eyebrow">404 — SHIRO</span>

      <span className="missing-kanji" lang="ja">
        空
      </span>

      <h1>A moment of emptiness.</h1>

      <p>
        The fragrance you are looking for
        could not be found.
      </p>

      <Link
        href="/collection"
        className="primary-button"
      >
        <ArrowLeft size={16} />
        Explore the collection
      </Link>
    </main>
  );
}
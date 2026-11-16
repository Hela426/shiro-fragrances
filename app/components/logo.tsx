import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="brand-logo" aria-label="Shiro home">
      <span className="brand-name">SHIRO</span>
      <span className="brand-subtitle">FRAGRANCES</span>
    </Link>
  );
}
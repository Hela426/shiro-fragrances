"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./logo";

const links = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/collection" },
  { label: "Our philosophy", href: "/#philosophy" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="announcement">
        COMPLIMENTARY SHIPPING ON ORDERS OVER $150
      </div>

      <nav className="navbar" aria-label="Main navigation">
        <button
          type="button"
          className="mobile-menu-button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className="nav-links">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <Logo />

        <div className="nav-actions">
          <span>EST. 2026</span>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="mobile-navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}